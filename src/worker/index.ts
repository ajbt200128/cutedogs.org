/// <reference types="@cloudflare/workers-types" />
import { Router, type RouterType } from "itty-router";
import { createFlickr, type Flickr } from "flickr-sdk";
import { type PhotosRequest } from "../shared/types";
import { randomInt } from "crypto";
import { renderPhotoFrame } from "./photo-frame.ts";

export interface Env {
    router?: RouterType;
    FLICKR_KEY: string;
    FLICKR_SECRET: string;
    PHOTO_BUCKET: R2Bucket;
    IMAGES: ImagesBinding;
    ASSETS: Fetcher;
    flickr?: Flickr;
}

const PER_PAGE = 12;
const flickrSdk = (env: Env): Flickr => {
    return createFlickr(env.FLICKR_KEY).flickr;
};

const searchFlickr = async (
    flickr: Flickr,
    page?: number,
    reverse: boolean = false,
    minTakenDate?: Date,
    perPage: number = PER_PAGE,
    tags: string = "franz",
): Promise<any> => {
    return await flickr("flickr.photos.search", {
        user_id: "201682256@N04",
        tags: tags,
        sort: reverse ? "date-taken-asc" : "date-taken-desc",
        min_taken_date: minTakenDate
            ? minTakenDate.toISOString().slice(0, 19).replace("T", " ")
            : undefined,
        per_page: `${perPage}`,
        page: page ? `${page}` : undefined,
        extras: ["url_o", "url_c", "url_h", "url_l", "date_taken", "last_update", "tags"].join(","),
    });
};

function buildRouter(env: Env): RouterType {
    const router = Router();
    const randomPhoto = (tag: "bw" | "color") => async (request: Request) => {
        try {
            const first = await searchFlickr(env.flickr!, 1, false, undefined, 1, tag);
            const total = Number(first.photos.total);
            if (!Number.isSafeInteger(total) || total < 1) {
                return new Response("Photo not found.", { status: 404 });
            }
            const page = randomInt(total) + 1;
            const result = page === 1 ? first :
                await searchFlickr(env.flickr!, page, false, undefined, 1, tag);
            const photo = result.photos.photo[0];
            if (!photo) return new Response("Photo not found.", { status: 404 });
            return await renderPhotoFrame(request, env, photo, tag);
        } catch (error) {
            console.error("Random photo failed", error);
            return new Response("Failed to render photo.", { status: 502 });
        }
    };
    router.get("/api/random-photo.jpeg", randomPhoto("bw"));
    router.get("/api/random-color-photo.jpeg", randomPhoto("color"));
    // Inkplate's JPEG decoder does not support progressive JPEGs.
    router.get("/api/random-photo.png", randomPhoto("bw"));
    router.get("/api/random-color-photo.png", randomPhoto("color"));
    router.post("/api/photos", async (request) => {
        const flickr = env.flickr!;
        const body: PhotosRequest = await request.json();

        let response = await searchFlickr(flickr, body.page);

        let photoInfos: any[] = [];
        for (const photo of response.photos.photo) {
            console.log(photo);
            photoInfos.push(photo);
        }

        const photos = photoInfos.map((info) => {
            return {
                url: info.url_o,
            };
        });
        return Response.json({ photos });
    });
    // expose the photo db file
    router.get("/api/db", async () => {
        const obj = await env.PHOTO_BUCKET.get("photos.db");
        if (!obj || !obj.body) {
            return new Response("Database not found.", { status: 404 });
        }
        return new Response(obj.body, {
            headers: {
                "Content-Type": "application/octet-stream",
            },
        });
    });

    router.all("*", () => new Response("Not Found.", { status: 404 }));
    return router;
}
export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (env.router === undefined) {
            env.router = buildRouter(env);
        }
        if (env.flickr === undefined) {
            env.flickr = flickrSdk(env);
        }

        return env.router.fetch(request);
    },
} satisfies ExportedHandler<Env>;
