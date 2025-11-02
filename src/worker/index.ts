import { Router, type RouterType } from "itty-router";
import { createFlickr, type Flickr } from "flickr-sdk";
import { type PhotosRequest } from "../shared/types";
export interface Env {
    router?: RouterType;
    FLICKR_KEY: string;
    FLICKR_SECRET: string;
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
): Promise<any> => {
    console.log("page:", page);
    return await flickr("flickr.photos.search", {
        user_id: "201682256@N04",
        tags: "franz",
        sort: reverse ? "date-taken-asc" : "date-taken-desc",
        min_taken_date: minTakenDate
            ? minTakenDate.toISOString().slice(0, 19).replace("T", " ")
            : undefined,
        per_page: `${perPage}`,
        page: page ? `${page}` : undefined,
        extras: ["url_o", "tags"].join(","),
    });
};

function buildRouter(env: Env): RouterType {
    const router = Router();
    router.post("/api/photos", async (request) => {
        const flickr = env.flickr!;
        const body: PhotosRequest = await request.json();

        let response = await searchFlickr(flickr, body.page);

        let photoInfos: any[] = [];
        // while (response.photos.photo.length > 0) {
        // find next photo w/ date taken after minTakenDate
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
    router.all("*", () => new Response("Not Found.", { status: 404 }));
    return router;
}
export default {
    async fetch(request, env): Promise<Response> {
        if (env.router === undefined) {
            env.router = buildRouter(env);
        }
        if (env.flickr === undefined) {
            env.flickr = flickrSdk(env);
        }

        return env.router.fetch(request);
    },
} satisfies ExportedHandler<Env>;
