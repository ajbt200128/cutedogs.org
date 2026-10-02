# Interactive tone calibration

## Chart A — 2026-10-01 Pacific time

Raw sRGB input, native InkplateLibrary 11.2.0 default `ReducedDiffusion`, usual viewing conditions.

User observations:
- T01–05 (codes 0, 16, 32, 48, 64): nearly identical.
- T13–17 (codes 191, 207, 223, 239, 255): identical.
- T05 differs from T06 (64 → 80); T12 differs from T13 (175 → 191).
- S01–17 (0–64): nearly identical.
- H01–17 (191–255): identical.
- Red, green, blue and yellow ramps broadly behave like T.

The installed library's `ImageColor::begin()` explicitly selects `ReducedDiffusion`. Its kernel weights sum to 11 and divisor is 26, retaining only about 42% of error. This intentionally posterizes the image. For a constant neutral patch, ignoring finite-patch effects and integer rounding, that weak feedback predicts near-flat extremes below roughly 74 and above roughly 181. The user's transition intervals bracket those values. Therefore the observations should not yet be treated as physical panel tone limits.

## Chart B — full error diffusion

Same 51 gray patch inputs and the same color ramps. Calibration firmware explicitly selects `ImageColor::FloydSteinberg`, whose kernel weights sum to its divisor (16/16). No photo gamma/contrast adjustment is applied to the chart. Full Floyd–Steinberg was subsequently selected for normal photo firmware as well.

User result: all T, S, H, red, green, blue and yellow patches are distinguishable. This supports changing the dither kernel before fitting a tone curve, rather than treating chart A's plateaus as physical panel limits.

## Fixed photo comparison

The initial crane photo was too flat for a useful comparison. After several random photos, the user selected `Color_85_30`, capture date 2025-12-03: a sailboat, bright sail and sky, dark cockpit, sea and distant island. Its unadjusted 1600 × 1200 canvas is preserved as `/frame/calibration-photo-original.png`, with frozen Gnomon caption/font time 8.5. The photo interior is x=126, y=31, width=1347, height=1078.

Both versions used full Floyd–Steinberg dithering:
- A: unadjusted photo. User reported slightly lacking highlight and shadow detail.
- B: same image with contrast 0.90, no gamma adjustment. Live PNG comparison verified every matte, border and caption pixel unchanged. Device download confirmed 2,279,221 bytes. User said it looked slightly better but could not really tell.

## Final choice

The user chose chart B's algorithm rather than continuing subtle photo tone comparisons: full Floyd–Steinberg dithering with no server-side contrast or gamma adjustment. Normal firmware now explicitly selects that kernel, and the provisional contrast 0.94 / gamma 1.04 treatment was removed. Frame-cache v4 prevents reuse of those old adjusted frames.

Normal firmware was rebuilt without the calibration flag and flashed successfully. Serial verified a new random color photo (1,465,071 bytes), successful display, and 1,753 seconds of sleep after the 47-second wake/update: a 30-minute cycle. The live color endpoint reports `X-Photo-Tone: unchanged`; all 20 worker/browser tests and the TypeScript check pass. The active calibration canvas `/frame/calibration.png` has been restored to the raw chart B; `/frame/calibration-chart-b.png` remains its preserved copy. Calibration mode is available only when explicitly compiled with its flag.
