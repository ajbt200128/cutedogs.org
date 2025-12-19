import {
    fetchPhotoDB,
    getAllImages,
    getImagesWithPrefix,
    getImageWithTags,
    initViewer,
} from "./util";

const queryParams = new URLSearchParams(window.location.search);
const tags = queryParams.get("tags")?.split(",") || undefined;
const prefix = queryParams.get("prefix") || undefined;

async function collectionPhotos(): Promise<string[]> {
    console.log("Fetching photo database...");
    const db = await fetchPhotoDB();
    console.log("Photo database loaded");

    console.log("Querying photos...");
    // get photo urls
    let photoUrls: string[] = [];
    if (prefix) {
        photoUrls = getImagesWithPrefix(db, prefix);
    } else if (tags && tags.length > 0) {
        photoUrls = getImageWithTags(db, tags);
    } else {
        // get all images
        photoUrls = getAllImages(db);
    }
    console.log(`Found ${photoUrls.length} photos from query`);
    return photoUrls;
}
collectionPhotos().then(async (photoUrls) => {
    console.log("Initializing viewer?...");
    await initViewer(photoUrls);

    console.log("Viewer initialized.");
});
