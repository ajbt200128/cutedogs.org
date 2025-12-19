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
    const db = await fetchPhotoDB();
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
    return photoUrls;
}
collectionPhotos().then(async (photoUrls) => {
    await initViewer(photoUrls);
});
