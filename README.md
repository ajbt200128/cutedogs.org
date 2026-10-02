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
