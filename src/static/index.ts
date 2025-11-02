import OpenSeadragon, {
    ImageTileSource,
    Viewer,
    type Options,
} from "openseadragon";
import type { PhotosRequest, PhotosResponse } from "../shared/types";

const rough_max_image_pages = 1000 / 12; // assuming 9 images per page
const random_page = Math.floor(Math.random() * rough_max_image_pages) + 1;
console.log(`Fetching photos from page ${random_page}`);
async function fetchPhotos() {
    let req: PhotosRequest = {
        page: random_page,
    };
    const resp = await fetch("/api/photos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    });

    const data: PhotosResponse = await resp.json();
    return data;
}
function hideLoader() {
    const loader = document.getElementById("loader");
    const canvas = document.getElementById("seadragon-viewer");
    if (loader) {
        loader.style.display = "none";
    }
    if (canvas) {
        canvas.style.display = "block";
    }
}

let options: Options = {
    id: "seadragon-viewer",
    collectionMode: true,
    collectionRows: 3,
    collectionTileSize: 256,
    collectionTileMargin: 5,
    crossOriginPolicy: "Anonymous",
    // vertial layout if we are on a narrow screen
    collectionLayout:
        window.innerHeight > window.innerWidth ? "vertical" : "horizontal",
    showNavigator: true,
    showNavigationControl: false,
    drawer: "canvas",
};
let viewer: Viewer = OpenSeadragon(options);
let imagesOnCanvas = false;
fetchPhotos().then(async (resp: PhotosResponse) => {
    for (const photo of resp.photos) {
        const source = new ImageTileSource({
            url: photo.url,
        });
        viewer.addTiledImage({
            tileSource: source,
        });
        viewer.viewport.goHome(false);
        // wait a bit between adding images
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }
});

viewer.world.addHandler("add-item", (event) => {
    if (imagesOnCanvas) {
        return;
    }
    const item = event.item;
    item.addHandler("fully-loaded-change", (_loadEvent) => {
        imagesOnCanvas = true;
        hideLoader();
    });
});
