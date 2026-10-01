import type { Env } from "./index";

export const FRAME_WIDTH = 1600;
export const FRAME_HEIGHT = 1200;
const MARGIN_X = FRAME_WIDTH * 0.025;
const MARGIN_Y = FRAME_HEIGHT * 0.025;
const CAPTION_HEIGHT = FRAME_HEIGHT * 0.05;
const BORDER = 1;

export function frameLayout(width: number, height: number) {
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
        throw new Error("Invalid photo dimensions");
    }
    const availableWidth = FRAME_WIDTH - 2 * MARGIN_X - 2 * BORDER;
    const availableHeight = FRAME_HEIGHT - 2 * MARGIN_Y - CAPTION_HEIGHT - 2 * BORDER;
    const scale = Math.min(availableWidth / width, availableHeight / height);
    const photoWidth = Math.max(1, Math.floor(width * scale));
    const photoHeight = Math.max(1, Math.floor(height * scale));
    return {
        width: photoWidth,
        height: photoHeight,
        left: Math.floor((FRAME_WIDTH - photoWidth) / 2),
        top: Math.floor(MARGIN_Y + (availableHeight + 2 * BORDER - photoHeight) / 2),
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
    const cacheKey = new Request(`${origin}/frame-cache/v2/${tag}/${encodeURIComponent(photo.id)}?updated=${photo.lastupdate || ""}&format=${format}&fontTime=${fontTime}`);
    const cache = await caches.open("photo-frames");
    const cached = await cache.match(cacheKey);
    if (cached) {
        const response = new Response(cached.body, cached);
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
    const layout = frameLayout(info.width, info.height);
    const [white, black] = await Promise.all([
        env.ASSETS.fetch(`${origin}/frame/white.png`),
        env.ASSETS.fetch(`${origin}/frame/black.png`),
    ]);
    if (!white.ok || !white.body || !black.ok || !black.body) throw new Error("Frame assets missing");

    const result = await env.IMAGES.input(white.body)
        .draw(env.IMAGES.input(black.body).transform({ width: layout.width + 2, height: layout.height + 2, fit: "squeeze" }), {
            left: layout.left - BORDER, top: layout.top - BORDER,
        })
        .draw(env.IMAGES.input(stream()).transform({ width: layout.width, height: layout.height, fit: "contain" }), {
            left: layout.left, top: layout.top,
        })
        .draw(env.IMAGES.text(photoCaption(photo), {
            font: { url: `${origin}/frame/gnomon/time-${fontTime}.ttf` }, size: 24, color: "black",
        }).transform({ width: FRAME_WIDTH - 2 * MARGIN_X, height: CAPTION_HEIGHT - 12, fit: "scale-down" }), {
            right: MARGIN_X, bottom: 18,
        })
        .output({ format, quality: 95 });
    const response = result.response({ headers: {
        "Cache-Control": "public, max-age=86400",
        "X-Photo-Name": encodeURIComponent(photo.title || "Untitled"),
        "X-Photo-Date": photo.datetaken?.slice(0, 10) || "",
        "X-Gnomon-Time": (fontTime / 2).toFixed(1),
        "X-Frame-Timezone": "America/Los_Angeles",
    } });
    await cache.put(cacheKey, response.clone());
    response.headers.set("Cache-Control", "no-store");
    return response;
}
