import { chromium } from "playwright";
import path from "path";
import fs from "node:fs/promises";

const OUT = "/private/tmp/claude-501/-Users-livia-Documents-medeor/dc3281f6-e766-4574-92f9-7d4b690a9be3/scratchpad/shots";
await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });

await page.goto("http://localhost:5183", { waitUntil: "networkidle" });
await page.waitForTimeout(300);
await page.click('button[aria-label="Modo escuro"]');
await page.waitForTimeout(300);

await page.keyboard.press("Meta+k");
await page.waitForTimeout(300);

// scroll the suggestions list to reveal "Páginas" items
await page.mouse.move(800, 450);
await page.mouse.wheel(0, 600);
await page.waitForTimeout(200);
await page.screenshot({ path: path.join(OUT, "12-dark-search-paginas.png") });

await browser.close();
console.log("DONE2");
