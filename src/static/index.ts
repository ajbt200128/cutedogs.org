import { fetchPhotoDB, getImageWithTags, initViewer } from "./util";

const num_photos = 36;
async function collectionPhotos(): Promise<string[]> {
    console.log("Fetching photo database...");
    const db = await fetchPhotoDB();
    console.log("Photo database loaded");
    console.log("Querying photos for franz...");
    let photoUrls = await getImageWithTags(db, ["franz"]);
    console.log(`Found ${photoUrls.length} photos from query`);
    // choose a random consecutive subset of num_photos photos
    const startIndex = Math.floor(
        Math.random() * (photoUrls.length - num_photos + 1),
    );
    const endIndex = startIndex + num_photos;

    photoUrls = photoUrls.slice(startIndex, endIndex);
    return photoUrls;
}
collectionPhotos().then((photoUrls) => {
    console.log("Initializing viewer...");
    initViewer(photoUrls);
    console.log("Viewer initialized.");
});
