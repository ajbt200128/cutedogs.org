import type { Options, TileSource } from "openseadragon";
import OpenSeadragon from "openseadragon";
// @ts-ignore
import { enableGeoTIFFTileSource } from "geotiff-tilesource";
import initSqlJs, { type BindParams } from "sql.js";
import { type Database } from "sql.js";

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
function showNotfound() {
    const notfound = document.getElementById("nophotos");
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
    if (notfound) {
        notfound.style.display = "block";
    }
}

async function getTileSources(url: String): Promise<Array<TileSource>> {
    // @ts-ignore
    return OpenSeadragon.GeoTIFFTileSource.getAllTileSources(url, {
        logLatency: false,
    });
}
function imageNameToUrl(name: string): string {
    // replace .tif with _pyr.tif
    const namePyr = name.replace(".tif", "_pyr.tif");
    return `https://live.cutedogs.org/${namePyr}`;
}

function getPhotosByQuery(
    db: Database,
    query: string,
    bindParams?: BindParams,
): string[] {
    const stmt = db.prepare(query);
    if (bindParams) stmt.bind(bindParams);
    const images: string[] = [];
    while (stmt.step()) {
        const row = stmt.getAsObject();
        images.push(imageNameToUrl(row.name as string));
    }
    stmt.free();
    return images;
}

// exported
export async function fetchPhotoDB(): Promise<Database> {
    const SQL = await initSqlJs({
        locateFile: (file) =>
            `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/${file}`,
    });
    const resp = await fetch("/api/db", {
        method: "GET",
    });
    const arrayBuffer = await resp.arrayBuffer();
    const u8Array = new Uint8Array(arrayBuffer);
    const db = new SQL.Database(u8Array);
    return db;
}

// query the database for image names with specific tags
export function getImageWithTags(db: Database, tags: string[]): string[] {
    // images are in the images table, with a field 'tags' that is a comma-separated list of tags
    // we can use the LIKE operator to find images with specific tags
    // e.g. WHERE tags LIKE '%tag1%' AND tags LIKE '%tag2%'
    // build the query
    let query = "SELECT name FROM images WHERE 1=1";
    for (let i = 0; i < tags.length; i++) {
        query += ` AND keywords LIKE $TAG${i}`;
    }
    const tagParams: BindParams = tags.map((tag) => `%${tag}%`);
    return getPhotosByQuery(db, query, tagParams);
}

export function getImagesWithPrefix(db: Database, prefix: string): string[] {
    const query = "SELECT name FROM images WHERE name LIKE $PREFIX";
    const prefixParams: BindParams = [`${prefix}%`];
    return getPhotosByQuery(db, query, prefixParams);
}
export function getAllImages(db: Database): string[] {
    const query = "SELECT name FROM images";
    return getPhotosByQuery(db, query);
}
export async function initViewer(photoUrls: string[]) {
    if (photoUrls.length === 0) {
        showNotfound();
        return;
    }
    console.log(`Initializing viewer with ${photoUrls.length} photos...`);
    // setup libs
    enableGeoTIFFTileSource(OpenSeadragon);

    // constants
    const isPrimaryTouch = window.matchMedia("(pointer: coarse)").matches;
    const isIOSDevice =
        /iPad|iPhone|iPod|Max/.test(navigator.userAgent) && isPrimaryTouch;
    const isAndroidDevice =
        /Android/.test(navigator.userAgent) && isPrimaryTouch;

    // setup tiles
    const tileSourcesPromises = photoUrls.map((url) => getTileSources(url));
    const tileSourcesArrays = await Promise.all(tileSourcesPromises);
    const tileSources = tileSourcesArrays.flat();

    const windowRatio = window.innerWidth / window.innerHeight;
    // let's try to fit as close to a rectangle that's the ratio of the window as possible
    let collectionRows = Math.round(
        Math.sqrt(tileSources.length / windowRatio),
    );

    let options: Options = {
        id: "seadragon-viewer",
        tileSources: tileSources,
        collectionMode: true,
        collectionRows,
        collectionTileSize: 256,
        collectionTileMargin: 5,
        crossOriginPolicy: "Anonymous",
        showNavigator: true,
        showNavigationControl: false,
        drawer: isIOSDevice || isAndroidDevice ? "canvas" : "webgl",
        immediateRender: isIOSDevice || isAndroidDevice,
    };

    console.log("OpenSeadragon options:", options);
    const viewer = OpenSeadragon(options);
    let item_count = 0;
    const allItemsAddedPromise = new Promise<void>((resolve) => {
        viewer.world.addHandler("add-item", () => {
            item_count++;
            if (item_count === tileSources.length) {
                resolve();
            }
        });
    });
    console.log("Viewer created:", viewer);
    await allItemsAddedPromise;
    for (let i = 0; i < 100; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        viewer.viewport.goHome(true);
    }
    hideLoader();
}
