import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");

for (const file of ["index.html", "styles.css", "script.js"]) {
  cpSync(file, `dist/${file}`);
}

// Content-based URLs prevent browsers from reusing assets from an older release.
const { createHash } = await import("node:crypto");
let html = readFileSync("dist/index.html", "utf8");
for (const file of ["styles.css", "script.js"]) {
  const hash = createHash("sha256").update(readFileSync(`dist/${file}`)).digest("hex").slice(0, 12);
  const versioned = file.replace(/(\.[^.]+)$/, `.${hash}$1`);
  cpSync(`dist/${file}`, `dist/${versioned}`);
  rmSync(`dist/${file}`);
  html = html.replace(`./${file}`, `./${versioned}`);
}
writeFileSync("dist/index.html", html);
console.log("Built landing page in dist/");
