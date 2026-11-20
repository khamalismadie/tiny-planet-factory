import { chromium } from 'playwright';

const base = process.env.URL ?? 'http://127.0.0.1:4173/';
const url = `${base}${base.includes('?') ? '&' : '?'}debug=1`;
const browser = await chromium.launch({ headless: true, args: [] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
let phase = 'boot';
const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`${phase}: ${message.text()}`);
});
page.on('pageerror', (error) => errors.push(`${phase}: ${String(error)}`));

const snapshot = () => page.evaluate(() => window.__game.metrics());
const state = () => page.evaluate(() => window.__game.state());

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForFunction(() => !!window.__game, { timeout: 30_000 });
await page.waitForTimeout(2500);

const boot = await snapshot();
// Deterministic seed keeps weather/XP gates reproducible in CI.
await page.evaluate(() => window.__game.reset(1337));
await page.waitForTimeout(150);
const initialState = await state();
const dom = await page.evaluate(() => ({
  errorHidden: getComputedStyle(document.getElementById('error')).display === 'none',
  canvas: !!document.querySelector('#app canvas'),
  objectButtons: document.querySelectorAll('#object-list button').length,
  wildlifeButtons: ['deer', 'fox', 'bird'].every((type) => !!document.querySelector(`[data-object="${type}"]`)),
  telemetryUi: !!document.getElementById('telemetry-btn') && !!document.getElementById('telemetry-modal'),
  qaPanelHiddenByDefault: getComputedStyle(document.getElementById('qa')).display === 'none',
  centerElement: document.elementFromPoint(640, 400)?.tagName,
  manifest: !!document.querySelector('link[rel="manifest"]'),
}));

// Real pointer placement: default tool is grass.
phase = 'tap';
await page.mouse.click(640, 400);
await page.waitForTimeout(250);
const afterClick = await state();

// Accelerate the simulation and place a balanced ecosystem through the debug hook.
const dirs = [
  [0.9, 0.2, 0.1], [-0.8, 0.3, 0.4], [0.1, -0.7, 0.9], [0.3, 0.8, -0.6],
  [-0.4, -0.5, -0.8], [0.7, 0.5, 0.5], [-0.6, 0.6, -0.5], [0.2, -0.9, -0.3],
  [0.99, 0.1, 0], [-0.99, 0.1, 0], [0, 0.1, 0.99], [0, 0.1, -0.99],
  [0.5, 0.7, 0.5], [-0.5, -0.7, 0.5], [0.6, -0.6, -0.5], [-0.7, 0.4, 0.6],
  [0.4, 0.3, -0.85], [-0.3, -0.4, 0.85], [0.85, -0.4, 0.3], [-0.85, 0.4, -0.3],
];
phase = 'grow';
await page.evaluate(({ dirs }) => {
  const plan = [
    ...Array(3).fill('ocean'), ...Array(8).fill('tree'), ...Array(4).fill('bush'),
    ...Array(3).fill('grass'), ...Array(2).fill('flower'), ...Array(2).fill('rock'),
    'lake', 'hill', 'mountain',
  ];
  plan.forEach((type, index) => window.__game.place(type, dirs[index % dirs.length]));
  window.__game.tick(120);
}, { dirs });
await page.waitForTimeout(250);
const grown = await state();
const grownFauna = await page.evaluate(() => window.__game.wildlife());
const grownDom = await page.evaluate(() => ({
  mission: document.getElementById('mission')?.textContent ?? '',
  weather: document.getElementById('weather')?.textContent ?? '',
  events: document.getElementById('events')?.textContent ?? '',
  ecosystem: document.getElementById('ecosystem')?.textContent ?? '',
}));
const grownMetrics = await snapshot();

// Persistence: wait for the debounced IndexedDB write, then reload.
phase = 'reload';
await page.waitForTimeout(700);
await page.reload({ waitUntil: 'networkidle' });
await page.waitForFunction(() => !!window.__game, { timeout: 30_000 });
const reloaded = await state();

// DNA round-trip through the UI (pause so ticks cannot drift during the check).
phase = 'dna';
await page.click('#pause-btn');
const beforeDnaState = await state();
const beforeDnaFauna = await page.evaluate(() => window.__game.wildlife());
await page.click('#dna-btn');
const dnaShort = await page.inputValue('#dna-input');
const dnaCode = await page.inputValue('#dna-full');
await page.click('#dna-close');
await page.click('#new-btn');
await page.waitForTimeout(150);
const newState = await state();
await page.click('#dna-btn');
await page.fill('#dna-input', dnaCode);
await page.click('#dna-load');
await page.waitForTimeout(250);
const dnaState = await state();
const dnaFauna = await page.evaluate(() => window.__game.wildlife());
await page.click('#pause-btn');

// PWA registration and responsive rendering.
phase = 'pwa-mobile';
const sw = await page.evaluate(async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  return { registered: !!registration, scope: registration?.scope ?? null };
});
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(1200);
const mobile = await snapshot();

const contextLossErrors = boot.contextLost
  ? errors.filter((message) => /WebGL context may be lost|Could not initialize shader/.test(message))
  : [];
const appErrors = errors.filter((message) => !contextLossErrors.includes(message));

const checks = {
  noConsoleErrors: appErrors.length === 0,
  errorOverlayHidden: dom.errorHidden,
  canvasMounted: dom.canvas,
  objectPaletteReady: dom.objectButtons === 13 && dom.wildlifeButtons,
  telemetryUiReady: dom.telemetryUi && dom.qaPanelHiddenByDefault,
  centerIsCanvas: dom.centerElement === 'CANVAS',
  manifestLinked: dom.manifest,
  drawCallsPositive: boot.drawCalls > 0 && boot.drawCalls < 150,
  tapPlacedObject: afterClick.objects.length === initialState.objects.length + 1,
  simulationAdvanced: grown.tick >= 120,
  levelUnlocked: grown.progression.level >= 3,
  ecosystemGrew: grown.environment.oxygen > initialState.environment.oxygen && grown.ecosystem.vegetation > initialState.ecosystem.vegetation,
  missionComplete: grown.mission.status === 'complete',
  missionUiUpdated: grownDom.mission.includes('selesai'),
  weatherUiUpdated: /Cuaca:/.test(grownDom.weather) && /Intensitas/.test(grownDom.weather),
  eventsUiUpdated: grownDom.events.includes('Event Opsional') && grownDom.events.includes('Hujan Pertama'),
  ecosystemUiUpdated: grownDom.ecosystem.includes('Vegetasi') && grownDom.ecosystem.includes('Satwa'),
  wildlifeAgentsPresent: grownFauna.agents > 0 && grownFauna.discovered.length > 0,
  wildlifeUiUpdated: grownDom.ecosystem.includes('Fauna'),
  statePersisted: reloaded.tick >= grown.tick && reloaded.objects.length === grown.objects.length,
  dnaShortCode: /^TPF-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(dnaShort),
  dnaCodeGenerated: dnaCode.length > dnaShort.length,
  newPlanetReset: newState.objects.length === 0,
  dnaRoundTrip:
    dnaState.seed === beforeDnaState.seed &&
    dnaState.tick === beforeDnaState.tick &&
    dnaState.objects.length === beforeDnaState.objects.length &&
    dnaState.progression.level === beforeDnaState.progression.level &&
    dnaFauna.agents === beforeDnaFauna.agents,
  serviceWorkerRegistered: sw.registered,
  mobileStillRendering: mobile.drawCalls > 0,
};

console.log(JSON.stringify({ boot, initialTick: initialState.tick, contextLossErrors, appErrors, grown: {
  tick: grown.tick,
  level: grown.progression.level,
  stage: grown.stage,
  environment: grown.environment,
  mission: grown.mission,
  objects: grown.objects.length,
  fauna: grownFauna,
}, grownMetrics, reloadedTick: reloaded.tick, reloadedObjects: reloaded.objects.length, sw, errors, checks }, null, 2));

await browser.close();
const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) {
  console.error(`FAIL: ${failed.join(', ')}`);
  process.exit(1);
}
console.log('PASS: vertical slice smoke');
