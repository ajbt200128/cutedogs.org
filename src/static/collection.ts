import type { Options, TileSource, Viewer } from "openseadragon";
import OpenSeadragon from "openseadragon";
import { enableGeoTIFFTileSource } from "geotiff-tilesource";
import { hideLoader } from "./util";

enableGeoTIFFTileSource(OpenSeadragon);
const queryParams = new URLSearchParams(window.location.search);
const collection = queryParams.get("q");

async function fetchPhotos(collection: String): Promise<Array<String>> {
    const resp = await fetch("/api/collection/" + collection, {
        method: "GET",
    });
    const respJson: Array<String> = await resp.json();

    return respJson;
}
async function getTileSources(url: String): Promise<Array<TileSource>> {
    return OpenSeadragon.GeoTIFFTileSource.getAllTileSources(url, {
        logLatency: false,
    });
}
async function initViewer(collection: String) {
    const photoUrls = await fetchPhotos(collection);
    console.log("photoUrls:", photoUrls);
    const tileSourcesPromises = photoUrls.map((url) => getTileSources(url));
    const tileSourcesArrays = await Promise.all(tileSourcesPromises);
    const tileSources = tileSourcesArrays.flat();
    const isPrimaryTouch = window.matchMedia("(pointer: coarse)").matches;
    const isIOSDevice =
        /iPad|iPhone|iPod|Max/.test(navigator.userAgent) && isPrimaryTouch;
    const isAndroidDevice =
        /Android/.test(navigator.userAgent) && isPrimaryTouch;

    let options: Options = {
        id: "seadragon-viewer",
        tileSources: tileSources,
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
        drawer: isIOSDevice || isAndroidDevice ? "canvas" : "webgl",
    };

    let viewer: Viewer = OpenSeadragon(options);
    hideLoader();
    // lol wtf
    for (let i = 0; i < 100; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        viewer.viewport.goHome(true);
    }
}

if (collection) {
    initViewer(collection);
}
