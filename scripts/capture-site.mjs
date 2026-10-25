import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { routes, widths, routeName, revealPage, inspectLayout } from "../tests/site-helpers.js";

const stage = process.argv[2] || "updated";
if (!["baseline", "updated"].includes(stage)) throw new Error("Use baseline or updated");
const directory = `qa-artifacts/${stage}`;
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ baseURL: "http://127.0.0.1:4173", reducedMotion: "reduce" });
const report = [];
try {
  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
      await revealPage(page);
      const layout = await inspectLayout(page);
      report.push({ route, ...layout });
      if ([320, 768, 1440].includes(width)) {
        await page.screenshot({ path: `${directory}/${routeName(route)}-${width}.png`, fullPage: true });
      }
    }
    const content = await page.locator("body").innerText();
    await writeFile(`${directory}/${routeName(route)}.txt`, content);
    if (stage === "updated") {
      const baseline = await readFile(`qa-artifacts/baseline/${routeName(route)}.txt`, "utf8");
      const expected = baseline.replaceAll("kudamalana@gmail.com", "kudamalana.info@kudamalana.lk")
        .replaceAll("091 4203 449", "(+94) 91 4203 449").replaceAll("071 1254 964", "(+94) 71 1254 964");
      if (content !== expected) throw new Error(`Unexpected visible content change on ${route}`);
    }
    console.log(`${stage}: ${route}`);
  }
  await writeFile(`${directory}/layout.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ cases: report.length, failures: report.filter((item) => item.scrollWidth > item.width + 1 || item.clippedText.length || item.brokenImages.length) }, null, 2));
} finally {
  await browser.close();
}
