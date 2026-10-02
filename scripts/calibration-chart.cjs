// Render with @resvg/resvg-js; this tool does not rebuild the website bundles.
const { Resvg } = require('@resvg/resvg-js');
const { writeFileSync } = require('node:fs');

const WIDTH = 1600;
const HEIGHT = 1200;
const LEFT = 202;
const STEP = 78;
const PATCH_WIDTH = 70;
const values = Array.from({ length: 17 }, (_, i) => Math.round(i * 255 / 16));
const svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">`,
    '<rect width="1600" height="1200" fill="white"/>'];
function text(x, y, label, size = 22, anchor = 'start') {
    svg.push(`<text x="${x}" y="${y}" font-family="Arial" font-size="${size}" text-anchor="${anchor}" fill="black">${label}</text>`);
}
function patches(label, y, codes, color, height = 120, showNumbers = true) {
    text(40, y + height / 2, label);
    codes.forEach((code, i) => {
        const x = LEFT + i * STEP;
        if (showNumbers) text(x + PATCH_WIDTH / 2, y - 15, String(i + 1).padStart(2, '0'), 22, 'middle');
        svg.push(`<rect x="${x}" y="${y}" width="${PATCH_WIDTH}" height="${height}" fill="rgb(${color(code).join(',')})"/>`);
        if (showNumbers) text(x + PATCH_WIDTH / 2, y + height + 28, String(code), 18, 'middle');
    });
}
text(40, 54, 'TONE CALIBRATION B - FULL DIFFUSION', 36);
text(40, 94, 'Compare neighboring patches, not their dither texture. Keep your normal lighting and viewing distance.', 23);
patches('T  Full range', 185, values, code => [code, code, code]);
patches('S  Shadows', 400, values.map((_, i) => i * 4), code => [code, code, code]);
patches('H  Highlights', 615, values.map((_, i) => 191 + i * 4), code => [code, code, code]);
text(40, 806, 'COLOR RAMPS - same columns 01-17, dark to saturated color', 22);
patches('R  Red', 830, values, code => [code, 0, 0], 48, false);
patches('G  Green', 890, values, code => [0, code, 0], 48, false);
patches('B  Blue', 950, values, code => [0, 0, code], 48, false);
patches('Y  Yellow', 1010, values, code => [code, code, 0], 48, false);
text(40, 1130, 'Start with T: which neighboring numbered patches look the same?', 26);
text(40, 1170, 'Same raw input as chart A; full Floyd-Steinberg dithering on device. No photo tone correction applied.', 20);
svg.push('</svg>');
const source = svg.join('\n');
writeFileSync('public/frame/calibration.svg', source);
const image = new Resvg(source, { font: { loadSystemFonts: true, defaultFontFamily: 'Arial' } });
writeFileSync('public/frame/calibration.png', image.render().asPng());
console.log('Created 1600 x 1200 calibration chart B (same unadjusted sRGB patches).');
