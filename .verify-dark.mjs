import { chromium } from "playwright";
import path from "path";
import fs from "node:fs/promises";

const OUT = "/private/tmp/claude-501/-Users-livia-Documents-medeor/dc3281f6-e766-4574-92f9-7d4b690a9be3/scratchpad/shots";
await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });

await page.goto("http://localhost:5183", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// 1. Light mode baseline
await page.screenshot({ path: path.join(OUT, "01-light-full.png"), fullPage: true });

// Toggle dark mode
await page.click('button[aria-label="Modo escuro"]');
await page.waitForTimeout(400);

await page.screenshot({ path: path.join(OUT, "02-dark-full.png"), fullPage: true });

async function shotFull(filename) {
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(OUT, filename), fullPage: true });
}

// AgendaSemana (week view, default)
await shotFull("03-dark-agenda-week.png");

const monthBtn = page.locator('button[aria-label="Button - Mês"]');
if (await monthBtn.count()) {
  await monthBtn.click();
  await page.waitForTimeout(300);
  await shotFull("04-dark-agenda-month.png");
}

const listBtn = page.locator('button[aria-label="Button - Lista"]');
if (await listBtn.count()) {
  await listBtn.click();
  await page.waitForTimeout(300);
  await shotFull("05-dark-agenda-list.png");
}

const weekBtn = page.locator('button[aria-label="Button - Semana"]');
if (await weekBtn.count()) {
  await weekBtn.click();
  await page.waitForTimeout(300);
}

const plusBtn = page.locator('button[aria-label="Novo compromisso"]');
await plusBtn.click();
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(OUT, "06-dark-novo-compromisso.png") });
await page.keyboard.press("Escape");
await page.waitForTimeout(200);

await shotFull("07-dark-questao-e-acoes.png");

await page.keyboard.press("Meta+k");
await page.waitForTimeout(300);
let searchVisible = await page.locator('input[placeholder="Busque qualquer coisa..."]').count();
if (!searchVisible) {
  const searchIcon = page.locator('[aria-label*="usca" i], [aria-label*="earch" i]').first();
  if (await searchIcon.count()) await searchIcon.click();
  await page.waitForTimeout(300);
}
await page.screenshot({ path: path.join(OUT, "09-dark-search-dialog.png") });
await page.keyboard.press("Escape");
await page.waitForTimeout(200);

const bellBtn = page.locator('button[aria-label*="otifica" i], button[aria-label*="Bell" i]').first();
if (await bellBtn.count()) {
  await bellBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, "10-dark-notifications.png") });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
} else {
  console.log("BELL BUTTON NOT FOUND");
}

const accountBtn = page.locator("text=Arthur Taylor").first();
if (await accountBtn.count()) {
  await accountBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, "11-dark-account-menu.png") });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
} else {
  console.log("ACCOUNT BUTTON NOT FOUND");
}

await browser.close();
console.log("DONE");
