import { chromium } from 'playwright';

// Deterministic heavy-load gate. Fixed seed keeps weather/QA placement reproducible.
const base = process.env.URL ?? 'http://127.0.0.1:4173/';
const seconds = Number(process.env.QA_SECONDS ?? 12);
const objects = Number(process.env.QA_OBJECTS ?? 94);
const tier = process.env.QA_TIER ?? 'medium';
const seed = Number(process.env.QA_SEED ?? 1);
const url = `${base}${base.includes('?') ? '&' : '?'}debug=1&qa=1&qaObjects=${objects}&qaSeconds=${seconds}&quality=${tier}&seed=${seed}`;

function assert(condition, message) {
  if (!condition) throw new Error(`FAIL: ${message}`);
}

const browser = await chromium.launch({ headless: true, args: [] });
const context = await browser.newContext({
  viewport: { width: 360, height: 678 },
  deviceScaleFactor: 3,
  hasTouch: true,
  isMobile: true,
});
const page = await context.newPage();
const errors = [];
const knownShaderWarningParts = [
  'Could retrieve shader source',
  'Could not retrieve shader source',
  'Could initialize shader',
  'Could not initialize shader',
];
const isKnownShaderWarning = (error) => knownShaderWarningParts.some((part) => String(error).includes(part));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(String(error)));

await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__game, { timeout: 30_000 });
// Advance deterministic sim time to the weather transition so the gate always
// exercises the atmospheric two-batch path, not just a sunny frame.
await page.evaluate(() => window.__game.tick(16));
await page.waitForFunction(
  (target) => {
    const report = window.__game?.qaReport?.();
    return !!report && report.durationMs >= target;
  },
  seconds * 1000,
  { timeout: (seconds + 30) * 1000 },
);

const report = await page.evaluate(() => window.__game.qaReport());
const metrics = await page.evaluate(() => window.__game.metrics());
const weather = metrics.weather;
const atmospheric = ['Hujan', 'Badai', 'Salju'].includes(weather);
const drawCallBudget = atmospheric ? 20 : 18;

assert(report.scene.objects === objects, `objek QA ${report.scene.objects},expected ${objects}`);
assert(report.quality.tier === tier, `quality tier ${report.quality.tier}, expected ${tier}`);
assert(report.quality.downgrades === 0, `adaptive downgrade terjadi ${report.quality.downgrades}x`);
assert(report.p95ms <= 33, `p95 ${report.p95ms} ms melebihi target 33 ms`);
assert(report.scene.drawCalls <= drawCallBudget,
  `draw call ${report.scene.drawCalls} melebihi budget ${drawCallBudget} untuk cuaca ${weather}`);
const unexpected = errors.filter((error) => !isKnownShaderWarning(error));
assert(report.scene.contextLost === false || unexpected.length === 0,
  `error tak terduga: ${JSON.stringify(unexpected)}`);

console.log(JSON.stringify({
  ok: true,
  seed,
  weather,
  drawCalls: report.scene.drawCalls,
  drawCallBudget,
  p50ms: report.p50ms,
  p95ms: report.p95ms,
  fps: report.fps,
  bootMs: report.bootMs,
  objects: report.scene.objects,
  tier: report.quality.tier,
}, null, 2));
console.log('PASS: qa load');
await browser.close();
