/// <reference types="bun" />
import { expect, spyOn, test } from "bun:test";
import type { Env } from "./index";
import { renderPhotoFrame } from "./photo-frame";

for (const [tag, format] of [["color", "png"], ["bw", "png"], ["color", "jpeg"], ["bw", "jpeg"]] as const) {
    test(`${tag} ${format} uses its native canvas and preserves source tones`, async () => {
        const transforms: { layer: string; options: any }[] = [];
        const draws: any[] = [];
        let input = 0;
        let cacheUrl = "";
        let textOptions: any;
        let outputOptions: any;
        const transformer = (layer: string): any => ({
            transform(options: any) { transforms.push({ layer, options }); return this; },
            draw(_image: any, options: any) { draws.push(options); return this; },
            async output(options: any) {
                outputOptions = options;
                return { response: ({ headers }: { headers: HeadersInit }) => new Response("frame", { headers }) };
            },
        });
        const env = {
            IMAGES: {
                async info() { return { width: 1600, height: 1200 }; },
                input() { return transformer(["matte", "border", "photo"][input++]!); },
                text(_caption: string, options: any) { textOptions = options; return transformer("caption"); },
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
                new Request(`https://cutedogs.org/api/random${tag === "color" ? "-color" : ""}-photo.${format}`), env,
                { id: "photo", title: "Color_22_29", url_h: "https://example.com/photo.jpeg" }, tag,
            );
            expect(response.headers.get("X-Photo-Tone")).toBe("unchanged");
            for (const transform of transforms) {
                expect(transform.options.contrast).toBeUndefined();
                expect(transform.options.gamma).toBeUndefined();
            }
            const width = tag === "bw" ? 800 : 1600;
            const height = tag === "bw" ? 480 : 1200;
            expect(transforms.find(transform => transform.layer === "matte")!.options)
                .toEqual({ width, height, fit: "squeeze" });
            expect(textOptions.size).toBe(tag === "bw" ? 12 : 24);
            expect(draws[2]).toEqual({ right: width * 0.025, bottom: tag === "bw" ? 9 : 18 });
            const caption = transforms.find(transform => transform.layer === "caption")!.options;
            expect(caption.width).toBe(width * 0.95);
            expect(caption.height + draws[2].bottom).toBeLessThan(height * 0.075);
            expect(outputOptions.format).toBe(`image/${format}`);
            expect(response.headers.get("X-Frame-Width")).toBe(`${width}`);
            expect(response.headers.get("X-Frame-Height")).toBe(`${height}`);
            expect(cacheUrl).toContain("/frame-cache/v4/");
            expect(cacheUrl).toContain(`canvas=${width}x${height}`);
            expect(response.headers.get("Cache-Control")).toBe("no-store");
        } finally {
            source.mockRestore();
            if (originalCaches) Object.defineProperty(globalThis, "caches", originalCaches);
            else Reflect.deleteProperty(globalThis, "caches");
        }
    });
}
