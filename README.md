# franz_collage

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Build and deploy

The frontend bundles in `public/` are checked in. Deployments upload them as-is rather than implicitly rebuilding the gallery when a Worker endpoint changes.

`npm run build`

This explicitly installs the versions pinned in `bun.lock` before rebuilding the frontend. Do not rebuild with dependency versions resolved by `npm install` instead: newer GeoTIFF builds may emit browser-module syntax or require additional worker assets.

`npm run deploy`

Deployment first checks that both gallery bundles parse as classic scripts, matching their HTML pages. After frontend changes, verify the homepage and collection gallery in a browser as well.

Inkplate setup and photo endpoint details: [firmware/README.md](firmware/README.md).

## Time-varying frame captions

Captions use Gnomon with a stationary outlined face and a moving shadow, changing every half hour in `America/Los_Angeles`. The shadow-only source font must not be used alone: its letterforms merely move rather than changing shape. The generator combines both layers into monochrome outlines for Cloudflare Images.

The generated fonts in `public/frame/gnomon/` are checked in. To regenerate them, install `scripts/requirements-fonts.txt` in a Python virtual environment and run `python scripts/build-gnomon.py`. Verify them with `python -m unittest discover -s scripts -p 'test_*.py'`.

When changing the generated fonts, bump `FRAME_RENDER_VERSION` in `src/worker/photo-frame.ts` so font URLs, cached images, and ETags all invalidate together.
