import { chromium } from 'playwright';

// Deterministic visual capture for before/after comparisons.
// Usage: node scripts/capture-visual.mjs [output.png] [seed]
const output = process.argv[2] ?? '/tmp/opencode/visual.png';
const seed = Number(process.argv[3] ?? 1337);
const base = process.env.URL ?? 'http://127.0.0.1:4173/';
const url = `${base}${base.includes('?') ? '&' : '?'}debug=1&quality=medium`;

const browser = await chromium.launch({ headless: true, args: [] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForFunction(() => !!window.__game, { timeout: 30_000 });
await page.evaluate((value) => window.__game.reset(value), seed);

const dirs = [
  [0.9, 0.2, 0.1], [-0.8, 0.3, 0.4], [0.1, -0.7, 0.9], [0.3, 0.8, -0.6],
  [-0.4, -0.5, -0.8], [0.7, 0.5, 0.5], [-0.6, 0.6, -0.5], [0.2, -0.9, -0.3],
  [0.99, 0.1, 0], [-0.99, 0.1, 0], [0, 0.1, 0.99], [0, 0.1, -0.99],
];
const plan = [
  ...Array(3).fill('ocean'), ...Array(8).fill('tree'), ...Array(4).fill('bush'),
  ...Array(3).fill('grass'), ...Array(2).fill('flower'), ...Array(2).fill('rock'),
  'lake', 'hill', 'mountain', 'deer', 'fox', 'bird',
];
await page.evaluate(({ dirs, plan }) => {
  plan.forEach((type, index) => window.__game.place(type, dirs[index % dirs.length]));
  window.__game.tick(60);
}, { dirs, plan });
await page.waitForTimeout(1200);
await page.screenshot({ path: output });
console.log(JSON.stringify({ output, seed, metrics: await page.evaluate(() => window.__game.metrics()) }, null, 2));
await browser.close();
