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

Same 51 gray patch inputs and the same color ramps. Calibration firmware explicitly selects `ImageColor::FloydSteinberg`, whose kernel weights sum to its divisor (16/16). No photo gamma/contrast adjustment is applied to the chart. Normal photo firmware is unchanged pending comparison.

Next comparison: are T01–05 and T13–17 distinguishable now? Then inspect fine S/H ramps and compare perceived spacing of T midtones. Decide whether to enable full diffusion for photos before fitting any tone curve.
