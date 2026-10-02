import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { Script } from "node:vm";

for (const name of ["index", "collection"]) {
    test(`${name} bundle parses as the classic script its page loads`, () => {
        const page = readFileSync(`public/${name}.html`, "utf8");
        expect(page).toContain(`<script src="./${name}.js"></script>`);
        const source = readFileSync(`public/${name}.js`, "utf8");
        expect(() => new Script(source, { filename: `${name}.js` })).not.toThrow();
    });
}

test("classic-script check rejects the import.meta regression", () => {
    expect(() => new Script("new Worker(new URL('worker.js', import.meta.url))")).toThrow();
});
