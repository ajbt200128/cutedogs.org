/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { frameLayout, gnomonTime, photoCaption } from "./photo-frame";
import worker, { type Env } from "./index";

describe("photo frame", () => {
    for (const [width, height] of [[6000, 4000], [4000, 6000], [1200, 1200], [16000, 1000], [1, 1000]]) {
        test(`fits the entire ${width} × ${height} photo above the caption`, () => {
            const layout = frameLayout(width!, height!);
            expect(layout.left).toBeGreaterThanOrEqual(40);
            expect(layout.top).toBeGreaterThanOrEqual(30);
            expect(layout.left + layout.width).toBeLessThanOrEqual(1560);
            expect(layout.top + layout.height).toBeLessThanOrEqual(1110);
            expect(Math.abs(layout.width - layout.height * width! / height!)).toBeLessThanOrEqual(width! / height! + 1);
        });
    }
    test("rejects invalid dimensions", () => {
        expect(() => frameLayout(0, 100)).toThrow();
        expect(() => frameLayout(100, NaN)).toThrow();
    });
    test("uses the filename and capture date, not today's date", () => {
        expect(photoCaption({ title: "Color_22_29", datetaken: "2025-03-04 12:34:56" }))
            .toBe("Color_22_29.jpeg  ·  2025-03-04");
        expect(photoCaption({ title: "Digital_10_01.jpeg" })).toBe("Digital_10_01.jpeg");
    });
});

describe("Gnomon Pacific time", () => {
    test("uses PST in winter and PDT in summer", () => {
        expect(gnomonTime(new Date("2026-01-15T18:30:00Z"))).toBe(21); // 10:30 PST
        expect(gnomonTime(new Date("2026-07-15T18:30:00Z"))).toBe(23); // 11:30 PDT
    });
    test("advances in half-hour steps", () => {
        expect(gnomonTime(new Date("2026-07-15T18:29:00Z"))).toBe(22);
        expect(gnomonTime(new Date("2026-07-15T18:30:00Z"))).toBe(23);
    });
    test("wraps nighttime like Gnomon's original demo", () => {
        expect(gnomonTime(new Date("2026-07-16T07:00:00Z"))).toBe(24); // midnight → noon
        expect(gnomonTime(new Date("2026-07-16T04:30:00Z"))).toBe(19); // 21:30 → 9:30
    });
    test("follows the daylight-saving transitions", () => {
        expect(gnomonTime(new Date("2026-03-08T09:30:00Z"))).toBe(27); // 01:30 PST
        expect(gnomonTime(new Date("2026-03-08T10:30:00Z"))).toBe(31); // 03:30 PDT
        expect(gnomonTime(new Date("2026-11-01T08:30:00Z"))).toBe(27); // 01:30 PDT
        expect(gnomonTime(new Date("2026-11-01T09:30:00Z"))).toBe(27); // 01:30 PST
    });
});

describe("random endpoints", () => {
    for (const [path, tag] of [["random-photo.jpeg", "bw"], ["random-color-photo.jpeg", "color"], ["random-color-photo.png", "color"]]) {
        test(`${path} searches the ${tag} tag and handles an empty collection`, async () => {
            const flickr = async (_method: string, args: any) => {
                expect(args.tags).toBe(tag);
                expect(args.per_page).toBe("1");
                return { photos: { total: "0", photo: [] } };
            };
            const env = { flickr } as unknown as Env;
            const response = await worker.fetch(new Request(`https://cutedogs.org/api/${path}`), env);
            expect(response.status).toBe(404);
        });
    }
    test("selects a single-photo collection without an invalid random range", async () => {
        let calls = 0;
        const flickr = async (_method: string, args: any) => {
            calls++;
            expect(args.page).toBe("1");
            return { photos: { total: "1", photo: [] } };
        };
        const env = { flickr } as unknown as Env;
        const response = await worker.fetch(new Request("https://cutedogs.org/api/random-color-photo.jpeg"), env);
        expect(calls).toBe(1);
        expect(response.status).toBe(404);
    });
});
