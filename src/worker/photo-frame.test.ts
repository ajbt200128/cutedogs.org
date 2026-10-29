/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { FRAME_SIZES, etagMatches, frameEtag, frameLayout, gnomonTime, photoCaption } from "./photo-frame";
import worker, { type Env } from "./index";

describe("photo frame", () => {
    test("uses native TRMNL and Spectra canvas sizes", () => {
        expect(FRAME_SIZES.bw).toEqual({ width: 800, height: 480 });
        expect(FRAME_SIZES.color).toEqual({ width: 1600, height: 1200 });
    });
    for (const [tag, frame] of Object.entries(FRAME_SIZES)) {
        for (const [width, height] of [[6000, 4000], [4000, 6000], [1200, 1200], [16000, 1000], [1, 1000]]) {
            test(`${tag} fits the entire ${width} × ${height} photo and border above the caption`, () => {
                const layout = frameLayout(width!, height!, frame);
                expect(layout.left - 1).toBeGreaterThanOrEqual(frame.width * 0.025);
                expect(layout.top - 1).toBeGreaterThanOrEqual(frame.height * 0.025);
                expect(layout.left + layout.width + 1).toBeLessThanOrEqual(frame.width * 0.975);
                expect(layout.top + layout.height + 1).toBeLessThanOrEqual(frame.height * 0.925);
                expect(Math.abs(layout.width - layout.height * width! / height!)).toBeLessThanOrEqual(width! / height! + 1);
            });
        }
    }
    test("preserves the existing Spectra layout", () => {
        expect(frameLayout(6000, 4000)).toEqual({ width: 1518, height: 1012, left: 41, top: 64 });
    });
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

describe("conditional requests", () => {
    const etag = frameEtag("123", "1700000000", "image/jpeg", FRAME_SIZES.bw, 20);

    test("changes when any rendering input changes", () => {
        const variants = [
            frameEtag("124", "1700000000", "image/jpeg", FRAME_SIZES.bw, 20),
            frameEtag("123", "1700000001", "image/jpeg", FRAME_SIZES.bw, 20),
            frameEtag("123", "1700000000", "image/png", FRAME_SIZES.bw, 20),
            frameEtag("123", "1700000000", "image/jpeg", FRAME_SIZES.color, 20),
            frameEtag("123", "1700000000", "image/jpeg", FRAME_SIZES.bw, 21),
        ];
        expect(new Set([etag, ...variants]).size).toBe(variants.length + 1);
    });
    test("matches exact, weak, wildcard and multi-valued If-None-Match", () => {
        expect(etagMatches(null, etag)).toBe(false);
        expect(etagMatches(etag, etag)).toBe(true);
        expect(etagMatches(`W/${etag}`, etag)).toBe(true);
        expect(etagMatches(`"other", ${etag}`, etag)).toBe(true);
        expect(etagMatches("*", etag)).toBe(true);
        expect(etagMatches('"other"', etag)).toBe(false);
    });
});

describe("random endpoints", () => {
    for (const [path, tag] of [["random-photo.jpeg", "bw"], ["random-color-photo.jpeg", "color"], ["random-photo.png", "bw"], ["random-color-photo.png", "color"]]) {
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
    test("answers 304 before any rendering work when the validator matches", async () => {
        const photo = { id: "900", title: "BW_1_1", datetaken: "2025-01-01 00:00:00", lastupdate: "1700000000" };
        const flickr = async () => ({ photos: { total: "1", photo: [photo] } });
        const env = { flickr } as unknown as Env;
        const etag = frameEtag(photo.id, photo.lastupdate, "image/jpeg", FRAME_SIZES.bw, gnomonTime(new Date()));
        const response = await worker.fetch(
            new Request("https://cutedogs.org/api/random-photo.jpeg", { headers: { "If-None-Match": etag } }),
            env,
        );
        expect(response.status).toBe(304);
        expect(response.headers.get("ETag")).toBe(etag);
        expect(response.body).toBeNull();
    });
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
