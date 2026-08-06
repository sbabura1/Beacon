import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const htmlPath = path.join(distDir, "index.html");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function inlineDistHtml(initialRoute) {
  let html = read(htmlPath);
  const inlineScripts = [];

  html = html.replace(/<script type="module" crossorigin src="\.\/([^"]+)"><\/script>/g, (_, assetPath) => {
    const js = read(path.join(distDir, assetPath));
    inlineScripts.push(`<script>window.__SHINE_INITIAL_ROUTE=${initialRoute};</script>`);
    inlineScripts.push(`<script>${js}</script>`);
    return "";
  });

  html = html.replace(/<link rel="stylesheet" crossorigin href="\.\/([^"]+)">/g, (_, assetPath) => {
    const css = read(path.join(distDir, assetPath));
    return `<style>${css}</style>`;
  });

  html = html.replace("<!doctype html>", "<!DOCTYPE html>");
  html = html.replace("<head>", "<head>\n    <base target=\"_top\" />");
  html = html.replace("</body>", () => `    ${inlineScripts.join("\n    ")}\n  </body>`);

  return html;
}

fs.writeFileSync(path.join(root, "Dialog.html"), inlineDistHtml("<?!= JSON.stringify(initialRoute) ?>"));
fs.writeFileSync(path.join(root, "Sidebar.html"), inlineDistHtml(JSON.stringify("navigator")));

console.log("Generated GAS bundles: Dialog.html and Sidebar.html");
