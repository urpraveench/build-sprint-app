import { cpSync, mkdirSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");

for (const file of ["index.html", "styles.css", "script.js"]) {
  cpSync(file, `dist/${file}`);
}

console.log("Built landing page in dist/");
