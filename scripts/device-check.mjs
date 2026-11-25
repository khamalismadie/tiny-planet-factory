import { chromium } from 'playwright';

const base = process.env.URL ?? 'http://127.0.0.1:4173/';
const url = `${base}${base.includes('?') ? '&' : '?'}debug=1&quality=medium&perf=1`;
const browser = await chromium.launch({ headless: true, args: [] });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  hasTouch: true,
  isMobile: true,
});
const page = await context.newPage();
const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(String(error)));

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForFunction(() => !!window.__game, { timeout: 30_000 });
await page.waitForTimeout(1200);

const boot = await page.evaluate(() => window.__game.metrics());
const perfVisible = await page.evaluate(() => document.getElementById('perf')?.classList.contains('show') ?? false);
const topbarOverflow = await page.evaluate(() => {
  const width = window.innerWidth;
  return [...document.querySelectorAll('#topbar button')].filter((button) => button.getBoundingClientRect().right > width + 1).map((button) => button.textContent?.trim());
});

// Synthetic two-finger pinch through CDP (Playwright has no native pinch helper).
const client = await context.newCDPSession(page);
const distanceBefore = await page.evaluate(() => window.__game.camera().distance);
await client.send('Input.dispatchTouchEvent', {
  type: 'touchStart',
  touchPoints: [
    { x: 80, y: 420, id: 1, radiusX: 8, radiusY: 8, force: 1 },
    { x: 160, y: 420, id: 2, radiusX: 8, radiusY: 8, force: 1 },
  ],
});
for (let step = 1; step <= 6; step++) {
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [
      { x: 80 - step * 8, y: 420, id: 1, radiusX: 8, radiusY: 8, force: 1 },
      { x: 160 + step * 8, y: 420, id: 2, radiusX: 8, radiusY: 8, force: 1 },
    ],
  });
  await page.waitForTimeout(40);
}
await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
await page.waitForTimeout(500);
const distanceAfter = await page.evaluate(() => window.__game.camera().distance);

// Context loss/restore is verified manually on a real device (see docs/10-QA-TESTING/QA-DEVICE.md):
// headless Chromium's GPU process crashes when simulating it on this host.

// Runtime quality downgrade for constrained devices.
await page.evaluate(() => window.__game.setQuality('low'));
await page.waitForTimeout(400);
const low = await page.evaluate(() => window.__game.metrics());
const perfText = await page.textContent('#perf');

// QA probe generates an exportable device report without user interaction.
const qaUrl = `${base}${base.includes('?') ? '&' : '?'}debug=1&qa=1&qaObjects=30&qaSeconds=1&quality=low`;
const qaPage = await context.newPage();
await qaPage.goto(qaUrl, { waitUntil: 'networkidle' });
await qaPage.waitForFunction(() => !!window.__game, { timeout: 30_000 });
await qaPage.waitForTimeout(2500);
const qaReport = await qaPage.evaluate(() => window.__game.qaReport());
await qaPage.close();

const warnings = boot.glContextLost
  ? ['Konteks WebGL headless hilang saat boot; context loss/restore wajib dicek di perangkat nyata.']
  : [];

const contextErrors = errors.filter((message) => /WebGL context may be lost|Could not initialize shader/.test(message));
const appErrors = errors.filter((message) => !contextErrors.includes(message));

const checks = {
  noAppErrors: appErrors.length === 0,
  qualityOverride: boot.qualityTier === 'medium',
  perfOverlayVisible: perfVisible,
  topbarNoOverflow: topbarOverflow.length === 0,
  perfOverlayHasStats: /FPS/.test(perfText ?? '') && /Quality/.test(perfText ?? ''),
  pinchChangesZoom: Math.abs(distanceAfter - distanceBefore) > 0.02,
  qualityDowngrade: low.qualityTier === 'low',
  stillRenderingAfterQualityChange: low.drawCalls > 0,
  qaProbeWorks: !!qaReport && qaReport.frames > 0 && qaReport.p95ms > 0 && qaReport.quality.tier === 'low',
  qaLoadObjects: qaReport?.scene.objects === 30,
  qaEvidenceFields: typeof qaReport?.appVersion === 'string'
    && Number.isFinite(qaReport?.save?.tick)
    && typeof qaReport?.network?.online === 'boolean'
    && typeof qaReport?.orientation?.type === 'string'
    && typeof qaReport?.runtime?.scriptSrc === 'string',
  qaLayoutEvidence: qaReport?.layout?.centerElement === 'CANVAS'
    && qaReport?.layout?.planetCenterVisible === true
    && qaReport?.layout?.objectiveOverlapsInventory === false
    && qaReport?.layout?.topbarOverlapsBuild === false,
};

console.log(JSON.stringify({
  boot,
  distanceBefore,
  distanceAfter,
  topbarOverflow,
  low,
  perfText,
  qaReport,
  warnings,
  contextErrors,
  appErrors,
  checks,
}, null, 2));

await browser.close();
const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) {
  console.error(`FAIL: device-check: ${failed.join(', ')}`);
  process.exit(1);
}
console.log('PASS: device-check');
