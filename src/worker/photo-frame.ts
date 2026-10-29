import type { Env } from "./index";

export const FRAME_SIZES = {
    bw: { width: 800, height: 480 }, // TRMNL OG.
    color: { width: 1600, height: 1200 }, // Inkplate 13SPECTRA.
};
const BORDER = 1;
/**
 * TRMNL's Image Display plugin only re-renders when the image's ETag changes.
 * Without a validator it treats the endpoint as unchanged and serves a cached
 * render, so a random-photo URL appears frozen for a day at a time.
 */
export function frameEtag(photoId: string, lastupdate: string | undefined, format: string, frame: { width: number; height: number }, fontTime: number): string {
    return `"${photoId}-${lastupdate || ""}-${format.replace("/", "_")}-${frame.width}x${frame.height}-${fontTime}"`;
}

export function etagMatches(header: string | null, etag: string): boolean {
    if (!header) return false;
    const bare = (tag: string) => tag.trim().replace(/^W\//, "");
    return header.split(",").some((candidate) => bare(candidate) === "*" || bare(candidate) === bare(etag));
}

export function frameLayout(width: number, height: number, frame = FRAME_SIZES.color) {
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
        throw new Error("Invalid photo dimensions");
    }
    const marginX = frame.width * 0.025;
    const marginY = frame.height * 0.025;
    const captionHeight = frame.height * 0.05;
    const availableWidth = frame.width - 2 * marginX - 2 * BORDER;
    const availableHeight = frame.height - 2 * marginY - captionHeight - 2 * BORDER;
    const scale = Math.min(availableWidth / width, availableHeight / height);
    const photoWidth = Math.max(1, Math.floor(width * scale));
    const photoHeight = Math.max(1, Math.floor(height * scale));
    return {
        width: photoWidth,
        height: photoHeight,
        left: Math.floor((frame.width - photoWidth) / 2),
        top: Math.floor(marginY + (availableHeight + 2 * BORDER - photoHeight) / 2),
    };
}

export function gnomonTime(date: Date): number {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles", hourCycle: "h23", hour: "2-digit", minute: "2-digit",
    }).formatToParts(date);
    const hour = Number(parts.find(part => part.type === "hour")?.value);
    const minute = Number(parts.find(part => part.type === "minute")?.value);
    let time = hour + minute / 60;
    // Match Gnomon's demo: its 6–18 axis repeats through the nighttime hours.
    if (time < 6) time += 12;
    else if (time > 18) time -= 12;
    return Math.floor(time * 2);
}

export function photoCaption(photo: { title?: string; datetaken?: string }) {
    const title = (photo.title || "Untitled").replace(/[\r\n\x00-\x1f]/g, " ").slice(0, 120);
    const name = /\.(jpe?g|png)$/i.test(title) ? title : `${title}.jpeg`;
    const date = /^\d{4}-\d{2}-\d{2}/.exec(photo.datetaken || "")?.[0];
    return date ? `${name}  ·  ${date}` : name;
}

export async function renderPhotoFrame(
    request: Request,
    env: Env,
    photo: { id: string; title?: string; datetaken?: string; lastupdate?: string; url_h?: string; url_l?: string; url_c?: string; url_o?: string },
    tag: "bw" | "color",
): Promise<Response> {
    const requestUrl = URL.parse(request.url);
    if (!requestUrl) throw new Error("Invalid request URL");
    const origin = requestUrl.origin;
    const format = requestUrl.pathname.endsWith(".png") ? "image/png" : "image/jpeg";
    const fontTime = gnomonTime(new Date());
    const frame = FRAME_SIZES[tag];
    const etag = frameEtag(photo.id, photo.lastupdate, format, frame, fontTime);
    if (etagMatches(request.headers.get("If-None-Match"), etag)) {
        return new Response(null, { status: 304, headers: { "ETag": etag, "Cache-Control": "no-store" } });
    }
    const marginX = frame.width * 0.025;
    const captionHeight = frame.height * 0.05;
    const captionScale = frame.width / FRAME_SIZES.color.width;
    const cacheKey = new Request(`${origin}/frame-cache/v4/${tag}/${encodeURIComponent(photo.id)}?updated=${photo.lastupdate || ""}&format=${format}&fontTime=${fontTime}&canvas=${frame.width}x${frame.height}`);
    const cache = await caches.open("photo-frames");
    const cached = await cache.match(cacheKey);
    if (cached) {
        const response = new Response(cached.body, cached);
        response.headers.set("ETag", etag);
        response.headers.set("Cache-Control", "no-store");
        return response;
    }

    const url = photo.url_h || photo.url_l || photo.url_c || photo.url_o;
    if (!url) throw new Error("Photo has no image URL");
    const source = await fetch(url);
    if (!source.ok || !source.body) throw new Error("Photo download failed");
    const bytes = await source.arrayBuffer();
    const stream = () => new Response(bytes).body!;
    const info = await env.IMAGES.info(stream());
    if (!("width" in info)) throw new Error("Unsupported image format");
    const layout = frameLayout(info.width, info.height, frame);
    const [white, black] = await Promise.all([
        env.ASSETS.fetch(`${origin}/frame/white.png`),
        env.ASSETS.fetch(`${origin}/frame/black.png`),
    ]);
    if (!white.ok || !white.body || !black.ok || !black.body) throw new Error("Frame assets missing");

    const result = await env.IMAGES.input(white.body)
        .transform({ width: frame.width, height: frame.height, fit: "squeeze" })
        .draw(env.IMAGES.input(black.body).transform({ width: layout.width + 2, height: layout.height + 2, fit: "squeeze" }), {
            left: layout.left - BORDER, top: layout.top - BORDER,
        })
        .draw(env.IMAGES.input(stream()).transform({
            width: layout.width, height: layout.height, fit: "contain",
        }), {
            left: layout.left, top: layout.top,
        })
        .draw(env.IMAGES.text(photoCaption(photo), {
            font: { url: `${origin}/frame/gnomon/time-${fontTime}.ttf` }, size: 24 * captionScale, color: "black",
        }).transform({ width: frame.width - 2 * marginX, height: captionHeight - 12 * captionScale, fit: "scale-down" }), {
            right: marginX, bottom: 18 * captionScale,
        })
        .output({ format, quality: 95 });
    const response = result.response({ headers: {
        "ETag": etag,
        "Cache-Control": "public, max-age=86400",
        "X-Photo-Name": encodeURIComponent(photo.title || "Untitled"),
        "X-Photo-Date": photo.datetaken?.slice(0, 10) || "",
        "X-Gnomon-Time": (fontTime / 2).toFixed(1),
        "X-Frame-Timezone": "America/Los_Angeles",
        "X-Photo-Tone": "unchanged",
        "X-Frame-Width": `${frame.width}`,
        "X-Frame-Height": `${frame.height}`,
    } });
    await cache.put(cacheKey, response.clone());
    response.headers.set("Cache-Control", "no-store");
    return response;
}
