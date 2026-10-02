#ifndef ARDUINO_INKPLATE13SPECTRA
#error "Select Soldered Inkplate 13SPECTRA"
#endif

#include <Inkplate.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <time.h>
#include <esp_sleep.h>
#include "secrets.h"

Inkplate display;
#ifdef PHOTO_FRAME_CALIBRATION
const char *PHOTO_URL = "https://cutedogs.org/frame/calibration.png";
#else
const char *PHOTO_URL = "https://cutedogs.org/api/random-color-photo.png";
#endif
constexpr gpio_num_t WAKE_BUTTON = GPIO_NUM_18;
constexpr uint64_t REFRESH_US = 30ULL * 60 * 1000000;
constexpr uint64_t RETRY_US = 5ULL * 60 * 1000000;
constexpr size_t MAX_IMAGE_BYTES = 8 * 1024 * 1024;
extern const uint8_t certificateBundleStart[] asm("_binary_x509_crt_bundle_start");
extern const uint8_t certificateBundleEnd[] asm("_binary_x509_crt_bundle_end");

// HTTPClient handles both Content-Length and chunked responses through this sink.
class ImageBuffer : public Stream {
public:
    ImageBuffer(uint8_t *bytes, size_t capacity) : bytes(bytes), capacity(capacity) {}
    size_t write(uint8_t value) override { return write(&value, 1); }
    size_t write(const uint8_t *source, size_t length) override {
        if (length > capacity - used) return 0;
        memcpy(bytes + used, source, length);
        used += length;
        return length;
    }
    int available() override { return 0; }
    int read() override { return -1; }
    int peek() override { return -1; }
    size_t used = 0;
private:
    uint8_t *bytes;
    size_t capacity;
};

bool connectInternet() {
    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    uint32_t started = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - started < 45000) delay(250);
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("Wi-Fi connection failed; keeping previous photo.");
        return false;
    }
    Serial.println("Wi-Fi connected.");
    configTime(0, 0, "pool.ntp.org", "time.cloudflare.com");
    started = millis();
    while (time(nullptr) < 1700000000 && millis() - started < 20000) delay(250);
    return time(nullptr) >= 1700000000;
}

bool updatePhoto() {
    WiFiClientSecure client;
    client.setCACertBundle(certificateBundleStart, certificateBundleEnd - certificateBundleStart);
    HTTPClient http;
    http.setConnectTimeout(15000);
    http.setTimeout(60000);
    if (!http.begin(client, PHOTO_URL)) return false;
    int status = http.GET();
    if (status != HTTP_CODE_OK) {
        Serial.printf("Photo HTTP error: %d\n", status);
        http.end();
        return false;
    }
    int length = http.getSize();
    size_t capacity = length > 0 ? size_t(length) : MAX_IMAGE_BYTES;
    if (capacity > MAX_IMAGE_BYTES || capacity == 0) {
        http.end();
        return false;
    }
    uint8_t *bytes = static_cast<uint8_t *>(ps_malloc(capacity));
    if (!bytes) {
        http.end();
        return false;
    }
    ImageBuffer buffer(bytes, capacity);
    int received = http.writeToStream(&buffer);
    http.end();
    bool complete = received > 0 && (length < 0 || buffer.used == size_t(length));
    bool validPng = buffer.used >= 24 && memcmp(bytes, "\x89PNG\r\n\x1a\n", 8) == 0;
    // Reject unexpected canvas sizes instead of cropping them on the device.
    const uint8_t dimensions[] = {0, 0, 6, 64, 0, 0, 4, 176}; // 1600 × 1200, big-endian
    validPng = validPng && memcmp(bytes + 16, dimensions, sizeof(dimensions)) == 0;
    bool drawn = false;
    if (complete && validPng) {
        Serial.printf("Downloaded %u bytes; decoding color photo.\n", unsigned(buffer.used));
        display.clearDisplay();
        drawn = display.image.drawPngFromBuffer(bytes, buffer.used, 0, 0, true, false);
    }
    free(bytes);
    if (!drawn) {
        Serial.println("Photo download or decoding failed; keeping previous photo.");
        return false;
    }
    Serial.println("Refreshing display.");
    display.display();
    Serial.println("Photo displayed successfully.");
    return true;
}

void setup() {
    Serial.begin(115200);
    pinMode(WAKE_BUTTON, INPUT_PULLUP);
    if (esp_sleep_get_wakeup_cause() == ESP_SLEEP_WAKEUP_EXT0) {
        Serial.println("WAKE button pressed; fetching a new photo.");
    }
    display.begin();
    display.setRotation(1); // Landscape: 1600 × 1200.
    // ReducedDiffusion discards most error and flattened our calibration ramps.
    display.image.setDitherKernel(ImageColor::FloydSteinberg);
    Serial.println("Dithering: full Floyd-Steinberg.");
    bool success = connectInternet() && updatePhoto();
    WiFi.disconnect(true);
    WiFi.mode(WIFI_OFF);
#ifdef PHOTO_FRAME_CALIBRATION
    if (success) {
        Serial.println("Calibration chart displayed; rotation paused. Reset reloads chart; upload normal firmware to resume photos.");
        Serial.flush();
        esp_deep_sleep_start(); // No timer: retain the chart for an interactive session.
    }
#endif
    // EXT0 is level-triggered: a held button must not immediately wake us again.
    while (digitalRead(WAKE_BUTTON) == LOW) delay(20);
    delay(20);
    uint64_t interval = success ? REFRESH_US : RETRY_US;
    uint64_t elapsed = uint64_t(millis()) * 1000;
    uint64_t sleepTime = interval > elapsed ? interval - elapsed : 1000000;
    esp_sleep_enable_timer_wakeup(sleepTime);
    esp_err_t wakeStatus = esp_sleep_enable_ext0_wakeup(WAKE_BUTTON, LOW);
    if (wakeStatus == ESP_OK) Serial.println("WAKE button enabled.");
    else Serial.printf("WAKE button configuration failed: %d\n", wakeStatus);
    Serial.printf("Sleeping for %llu seconds.\n", sleepTime / 1000000);
    Serial.flush();
    esp_deep_sleep_start();
}

void loop() {}
