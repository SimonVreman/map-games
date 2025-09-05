import { geoguessrGames } from "@/lib/games/geoguessr-registry";
import { chromium } from "playwright";

const screenshotPath = "public/img/games/";
const filtered = process.argv.slice(2);
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({
  viewport: { width: 900, height: 600 },
  deviceScaleFactor: 3,
});

// Get rid of dev indicator if present
await page
  .locator("button#next-logo")
  .click({ timeout: 1000 })
  .then(async () => {
    await page.locator("div[data-preferences=true]").click();
    await page.locator("button[name=hide-dev-tools]").click();
  })
  .catch(() => {});

for (const game of geoguessrGames) {
  if (filtered.length > 0 && !filtered.includes(game.slug)) continue;

  await page.goto(`http://localhost:3000/${game.slug}/play`);
  await page.emulateMedia({ colorScheme: "light" });

  const loader = page.locator("div", { hasText: "Initializing map" }).nth(0);
  await loader.waitFor({ state: "attached" });
  await loader.waitFor({ state: "detached" });

  await page.locator("button", { hasText: "Infinite" }).click();
  await page.locator("button", { hasText: "Start" }).click();

  await new Promise((r) => setTimeout(r, 500));
  await page.keyboard.press("H");

  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `${screenshotPath}${game.slug}-light.png` });

  await page.emulateMedia({ colorScheme: "dark" });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: `${screenshotPath}${game.slug}-dark.png` });
}

await browser.close();
