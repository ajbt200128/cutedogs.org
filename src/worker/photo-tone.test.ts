/// <reference types="bun" />
import { expect, spyOn, test } from "bun:test";
import type { Env } from "./index";
import { renderPhotoFrame } from "./photo-frame";

for (const tag of ["color", "bw"] as const) {
    test(`${tag} preserves source tones and does not tone-map the matte or caption`, async () => {
        const transforms: { layer: string; options: any }[] = [];
        let input = 0;
        let cacheUrl = "";
        const transformer = (layer: string): any => ({
            transform(options: any) { transforms.push({ layer, options }); return this; },
            draw() { return this; },
            async output() {
                return { response: ({ headers }: { headers: HeadersInit }) => new Response("frame", { headers }) };
            },
        });
        const env = {
            IMAGES: {
                async info() { return { width: 1600, height: 1200 }; },
                input() { return transformer(["matte", "border", "photo"][input++]!); },
                text() { return transformer("caption"); },
            },
            ASSETS: { async fetch() { return new Response(new Uint8Array([0])); } },
        } as unknown as Env;
        const originalCaches = Object.getOwnPropertyDescriptor(globalThis, "caches");
        Object.defineProperty(globalThis, "caches", {
            configurable: true,
            value: { async open() { return {
                async match(request: Request) { cacheUrl = request.url; return undefined; },
                async put() {},
            }; } },
        });
        const source = spyOn(globalThis, "fetch").mockResolvedValue(new Response(new Uint8Array([0])));
        try {
            const response = await renderPhotoFrame(
                new Request(`https://cutedogs.org/api/random${tag === "color" ? "-color" : ""}-photo.png`), env,
                { id: "photo", title: "Color_22_29", url_h: "https://example.com/photo.jpeg" }, tag,
            );
            expect(response.headers.get("X-Photo-Tone")).toBe("unchanged");
            for (const transform of transforms) {
                expect(transform.options.contrast).toBeUndefined();
                expect(transform.options.gamma).toBeUndefined();
            }
            expect(cacheUrl).toContain("/frame-cache/v4/");
            expect(response.headers.get("Cache-Control")).toBe("no-store");
        } finally {
            source.mockRestore();
            if (originalCaches) Object.defineProperty(globalThis, "caches", originalCaches);
            else Reflect.deleteProperty(globalThis, "caches");
        }
    });
}
