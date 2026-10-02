# Inkplate 13SPECTRA photo frame

The frame fetches `https://cutedogs.org/api/random-color-photo.png`. The server provides the complete 1600 × 1200 canvas: uncropped photo, white matte, one-pixel black border, and filename / capture date in Gnomon sans-serif at the bottom right.

The shared renderer also serves `/api/random-photo.jpeg` (tag `bw`) and `/api/random-color-photo.jpeg` (tag `color`). Both have `.png` equivalents. BW endpoints render an **800 × 480** canvas for the [TRMNL OG](https://docs.trmnl.com/go/private-plugins/templates); color endpoints remain **1600 × 1200** for the Inkplate. The [TRMNL Image Display plugin](https://help.usetrmnl.com/en/articles/11479051-image-display) uses cover-fit, so sending the old 4:3 canvas to its 5:3 screen cropped the matte and caption. Each frame now uses the target's aspect ratio, with proportional caption sizing and no photo cropping.

PNG is used by the Inkplate because its JPEG decoder does not support Cloudflare's progressive JPEG output. Random responses use `Cache-Control: no-store`; completed frames are cached internally for one day per photo/version/format/font-time/canvas-size. `X-Frame-Width` and `X-Frame-Height` expose the rendered dimensions.

Minimum matte margins total approximately 5% of the canvas width and height, with a 5%-height caption area. Aspect-ratio differences add white space rather than cropping or stretching the photo.

## Display tone tuning

[Soldered identifies the panel](https://community.soldered.com/t/inkplate-13spectra-panel-model-number/158) as E Ink's [EL133UF1](https://www.eink.com/product/detail/EL133UF1). The ED2208-NCA (EL133UF1) specification, optical characteristics on pages 23–24, lists six native color states, 34% typical white reflectance and 22:1 typical contrast at 25 °C. A [publicly mirrored specification](https://upbd645.myueeshop.com/u_file/2411/09/file/ED2208-NCAEL133UF1ProductSpecVer10.pdf) was consulted; it bears a confidentiality notice and is not redistributed here.

These measurements do not specify a photographic gamma curve. The final setting uses unadjusted source tones and explicitly selects `ImageColor::FloydSteinberg` in firmware, for both normal photos and calibration. Unlike the library's default `ReducedDiffusion`, it retains the full 16/16 diffusion error. The user could distinguish every shadow, highlight and color patch on chart B and selected that algorithm for normal operation.

The provisional server-side contrast/gamma settings were removed, and the frame cache was bumped to v4 to avoid serving old tone-adjusted frames. The white matte, border, caption, BW endpoint and website galleries are unchanged. This is a visual calibration result under the user's usual viewing conditions, not a measured ICC profile.

## Interactive calibration

`/frame/calibration.png` is the active calibration canvas, restored to chart B. The preserved `/frame/calibration-chart-b.png` shows unadjusted sRGB ramps through the same PNG decoder used for photos: T (full range, 0–255), S (shadows, 0–64), H (highlights, 191–255), and red/green/blue/yellow ramps. Compare neighboring numbered patch interiors at the normal viewing distance and lighting, not individual dither dots. Human comparisons guide empirical tuning; they are not reflectance measurements. Both normal and calibration firmware use full Floyd–Steinberg dithering. Findings and observations are recorded in [calibration-notes.md](calibration-notes.md).

Compile with `--build-property compiler.cpp.extra_flags=-DPHOTO_FRAME_CALIBRATION` into a separate build directory and upload to temporarily show the calibration canvas instead of random photos. On success, calibration firmware deep-sleeps without a timer, retaining the canvas. Reset reloads the active canvas; it does **not** resume random photos. To resume the 30-minute photo cycle, upload the normal firmware built without that flag.

The final normal build is at `/tmp/cutedogs-tools/normal-full-diffusion-build` during this session. The older `/tmp/cutedogs-tools/firmware-build` uses the library's default ReducedDiffusion and should not be used to restore the final setting.

The fixed unadjusted photo is preserved as `/frame/calibration-photo-original.png`. Both comparison versions should use the same photo and caption, with tone changes restricted to the photo interior.

The chart generator uses an isolated rendering dependency, never the website's frontend dependencies. Running it replaces the active canvas with the chart:

`npm install --prefix /tmp/cutedogs-calibration @resvg/resvg-js --package-lock=false`

`NODE_PATH=/tmp/cutedogs-calibration/node_modules node scripts/calibration-chart.cjs`

Then deploy with `npm run deploy` and reset the calibration firmware to reload the updated chart. The generator uses the system Arial font; the pre-rendered PNG avoids font differences on the device.

## Time-dependent font

Gnomon's time-of-day axis follows `America/Los_Angeles`, automatically using PST in winter and PDT in summer. It advances in half-hour steps with the display refresh. Nighttime wraps through the 6–18 axis like the original demo at https://indestructibletype.com/Gnomon.html. The date in the caption remains the photo's capture date.

Cloudflare Images cannot set variable-font axes directly, so `scripts/build-gnomon.py` bakes 25 static font variants at shadow distance 0.35. It adds the filename underscore and date separator missing from the original font. To rebuild:

`python3 -m venv .venv`

`.venv/bin/pip install --no-binary fonttools -r scripts/requirements-fonts.txt`

`.venv/bin/python scripts/build-gnomon.py`

The bundled source is Gnomon Simple by Owen Earl, from https://github.com/indestructible-type/Gnomon at revision `7517c821773e1df27a04288fa1cf31f8abea36e7`. The modified instances are named Frame Gnomon and retain the SIL Open Font License.

## Setup

Install Arduino CLI, Soldered Inkplate Boards **4.0.0**, and InkplateLibrary **11.2.0**. On macOS, install and enable the CH340 driver as described in https://docs.soldered.com/inkplate/13spectra/quick-start-guide/.

Copy `PhotoFrame/secrets.example.h` to `PhotoFrame/secrets.h` and fill in the Wi-Fi password there. `secrets.h` is git-ignored; do not put credentials in the example header.

`arduino-cli core install soldered-inkplate-boards:esp32@4.0.0 --additional-urls https://raw.githubusercontent.com/SolderedElectronics/Inkplate-Board-Definitions-for-Arduino-IDE/refs/heads/main/package_Inkplate_Boards_index.json`

`arduino-cli lib install InkplateLibrary@11.2.0`

`arduino-cli compile --fqbn soldered-inkplate-boards:esp32:Inkplate13SPECTRA --build-path /tmp/inkplate-frame-build firmware/PhotoFrame`

`arduino-cli upload --fqbn soldered-inkplate-boards:esp32:Inkplate13SPECTRA --port /dev/cu.wchusbserial10 --input-dir /tmp/inkplate-frame-build firmware/PhotoFrame`

Press POWER ON and verify the blue LED before uploading. If the uploader reports no serial data, press the manual reset button and retry. The serial port name may differ on another computer.

The device verifies HTTPS with the ESP32 certificate bundle after synchronizing its clock via NTP. It refreshes every 30 minutes from boot/wake, then deep-sleeps for the remainder of that interval. Failed connections or downloads retain the previous photo and retry after 5 minutes. Serial logs use 115200 baud and never print credentials.

Press the onboard **WAKE** button (not POWER ON) while the frame is sleeping to immediately fetch another random photo. The active-low GPIO18 button is enabled alongside the timer using [EXT0 wake](https://docs.soldered.com/inkplate/13spectra/low-power/deep-sleep/). Each button wake starts a fresh 30-minute cycle. Firmware waits for button release before sleeping to prevent a held-button refresh loop; presses during an update do not queue another update. Successful calibration mode still holds its canvas without timer/button wake. Serial confirms `WAKE button enabled.`; physical button operation should be checked on the device after flashing.

## Server checks and deployment

`npx bun test src/worker src/static/browser-bundles.test.ts`

`npx tsc --noEmit --allowImportingTsExtensions --skipLibCheck --strict --target esnext --module preserve --moduleResolution bundler --types node worker-configuration.d.ts src/worker/index.ts src/worker/photo-frame.ts src/worker/photo-frame.test.ts src/worker/photo-tone.test.ts src/static/browser-bundles.test.ts`

`npm run deploy`

Cloudflare Images performs resizing, compositing and text rendering through the `IMAGES` binding; its normal transformation quota and billing apply. The `ASSETS` binding supplies the white canvas and black border; the public font has its OFL license alongside it in `public/frame/gnomon/`.
