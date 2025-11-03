export function hideLoader() {
    const loader = document.getElementById("loader");
    const canvas = document.getElementById("seadragon-viewer");
    if (loader) {
        loader.style.display = "none";
    }
    if (canvas) {
        canvas.style.display = "block";
    }
}
