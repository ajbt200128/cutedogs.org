await Bun.build({
    entrypoints: ["./src/static/index.ts", "./src/static/collection.ts"],
    outdir: "./public",
});

// await Bun.build({
//     entrypoints: ["./src/worker/index.ts"],
//     outdir: "./functions",
// });
