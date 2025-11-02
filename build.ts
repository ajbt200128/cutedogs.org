await Bun.build({
    entrypoints: ["./src/static/index.ts"],
    outdir: "./public",
});

// await Bun.build({
//     entrypoints: ["./src/worker/index.ts"],
//     outdir: "./functions",
// });
