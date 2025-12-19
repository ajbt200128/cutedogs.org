import type { AddItemWorldEvent, Options, TileSource } from "openseadragon";
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

function setLoaderProgressText(text: string) {
    const loaderText = document.getElementById("loaderprogress");
    if (loaderText) {
        loaderText.innerText = text;
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

type ImageInfo = {
    colorKind: string;
    rollNumber: number;
    frame: number;
    originalName: string;
};

function parseImageName(name: string): ImageInfo | null {
    // name is COLORKIND_ROLLNUMBER_FRAME.tif
    const regex = /^([A-Za-z]+)_(\d+)_(\d+)\.tif$/;
    const match = name.match(regex);
    if (!match) return null;
    return {
        colorKind: match[1] || "",
        rollNumber: parseInt(match[2] || "0", 10),
        frame: parseInt(match[3] || "0", 10),
        originalName: name,
    };
}

function sortImagesByRoll(images: string[]): string[] {
    // all images are COLORKIND_ROLLNUMBER_FRAME_pyr.tif
    // we want to sort by FRAME THEN ROLLNUMBER
    const parsedImages: ImageInfo[] = images
        .map(parseImageName)
        .filter((info): info is ImageInfo => info !== null);
    parsedImages.sort((a, b) => {
        if (a.rollNumber == b.rollNumber) {
            return a.frame - b.frame;
        }
        return a.rollNumber - b.rollNumber;
    });
    return parsedImages.map((info) => info.originalName);
}

function getPhotosByQuery(
    db: Database,
    query: string,
    bindParams?: BindParams,
    sort: boolean = true,
): string[] {
    const stmt = db.prepare(query);
    if (bindParams) stmt.bind(bindParams);
    let images: string[] = [];
    while (stmt.step()) {
        const row = stmt.getAsObject();
        images.push(row.name as string);
    }
    if (sort) {
        images = sortImagesByRoll(images);
    }
    stmt.free();
    return images.map(imageNameToUrl);
}

// exported
export async function fetchPhotoDB(): Promise<Database> {
    setLoaderProgressText("loading photo database");

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
    setLoaderProgressText("Photo database loaded");
    return db;
}

// query the database for image names with specific tags
export function getImageWithTags(db: Database, tags: string[]): string[] {
    // images are in the images table, with a field 'tags' that is a comma-separated list of tags
    // we can use the LIKE operator to find images with specific tags
    // e.g. WHERE tags LIKE '%tag1%' AND tags LIKE '%tag2%'
    // build the query
    setLoaderProgressText(`querying photos with ${tags.length} tags`);
    let query = "SELECT name FROM images WHERE 1=1";
    for (let i = 0; i < tags.length; i++) {
        query += ` AND keywords LIKE $TAG${i}`;
    }
    const tagParams: BindParams = tags.map((tag) => `%${tag}%`);
    setLoaderProgressText(`found photos with ${tags.length} tags`);
    return getPhotosByQuery(db, query, tagParams);
}

export function getImagesWithPrefix(db: Database, prefix: string): string[] {
    setLoaderProgressText(`Querying photos with prefix "${prefix}"`);
    const query = "SELECT name FROM images WHERE name LIKE $PREFIX";
    const prefixParams: BindParams = [`${prefix}%`];
    setLoaderProgressText(`Found photos with prefix "${prefix}"`);
    return getPhotosByQuery(db, query, prefixParams);
}
export function getAllImages(db: Database): string[] {
    setLoaderProgressText("Querying all photos");
    const query = "SELECT name FROM images";
    setLoaderProgressText("Found all photos");
    return getPhotosByQuery(db, query);
}
export async function initViewer(photoUrls: string[]) {
    if (photoUrls.length === 0) {
        showNotfound();
        return;
    }
    console.log(`initializing viewer with ${photoUrls.length} photos...`);
    // setup libs
    enableGeoTIFFTileSource(OpenSeadragon);

    // constants
    const isPrimaryTouch = window.matchMedia("(pointer: coarse)").matches;
    const isIOSDevice =
        /iPad|iPhone|iPod|Max/.test(navigator.userAgent) && isPrimaryTouch;
    const isAndroidDevice =
        /Android/.test(navigator.userAgent) && isPrimaryTouch;

    // setup tiles
    setLoaderProgressText("Loading tile sources for photos");
    let tileSourceCounter = 0;
    setLoaderProgressText(
        `loaded 0 tile sources of ${photoUrls.length} photos`,
    );
    const tileSourcesPromises = photoUrls.map(async (url) => {
        const tileSource = (await getTileSources(url))[0]!;
        tileSourceCounter++;
        setLoaderProgressText(
            `loaded ${tileSourceCounter} tile sources of ${photoUrls.length} photos`,
        );
        return tileSource;
    });
    const tileSources = await Promise.all(tileSourcesPromises);

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

    setLoaderProgressText(`Loading ${tileSources.length} photos into viewer`);
    const viewer = OpenSeadragon(options);
    let item_count = 0;
    tileSources.forEach((ts) => {
        ts.addOnceHandler("ready", () => {
            console.log("Tile source ready:", ts);
        });
    });
    viewer.addHandler("tile-loaded", () => {
        console.log("Tile drawn");
    });
    const allItemsAddedPromise = new Promise<void>((resolve) => {
        viewer.world.addHandler("add-item", (i: AddItemWorldEvent) => {
            i.item.addOnceHandler("fully-loaded-change", () => {
                setLoaderProgressText(
                    `Loaded ${item_count + 1} of ${tileSources.length} photos`,
                );
                item_count++;
                if (item_count === tileSources.length) {
                    resolve();
                }
            });
        });
    });
    await allItemsAddedPromise;
    setLoaderProgressText("Moving you to a good viewpoint");
    viewer.viewport.goHome(true);
    hideLoader();
}
