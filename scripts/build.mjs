import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

const localEnv = (() => {
  try { return readFileSync(".env.local", "utf8"); } catch { return ""; }
})();
const convexUrl = process.env.VITE_CONVEX_URL || process.env.CONVEX_URL || localEnv.match(/^CONVEX_URL=(.+)$/m)?.[1]?.trim();
if (!convexUrl) throw new Error("Missing CONVEX_URL. Configure your Convex deployment before building.");

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
cpSync("app.html", "dist/app.html");
cpSync("app.css", "dist/app.css");
await build({ entryPoints: ["src/app.jsx"], outfile: "dist/app.js", bundle: true, minify: true, format: "esm", target: "es2022", define: { CONVEX_URL: JSON.stringify(convexUrl), "process.env.NODE_ENV": '"production"' } });
let appHtml = readFileSync("dist/app.html", "utf8");
for (const file of ["app.css", "app.js"]) {
  const hash = createHash("sha256").update(readFileSync(`dist/${file}`)).digest("hex").slice(0, 12);
  const versioned = file.replace(/(\.[^.]+)$/, `.${hash}$1`);
  cpSync(`dist/${file}`, `dist/${versioned}`);
  // Keep app.js locally for the source HTML served by the dev server.
  appHtml = appHtml.replace(`./${file}`, `./${versioned}`);
}
writeFileSync("dist/app.html", appHtml);
console.log("Built landing page and buying companion in dist/");
