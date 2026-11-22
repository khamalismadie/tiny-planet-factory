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
  ecoPanelHiddenByDefault: getComputedStyle(document.getElementById('eco-detail')).display === 'none',
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
}, { dirs });
const placementActive = await page.evaluate(() => window.__game.placement().filter((pulse) => pulse.active).length);
await page.evaluate(() => window.__game.tick(120));
await page.waitForTimeout(250);
const grown = await state();
const grownFauna = await page.evaluate(() => window.__game.wildlife());
const ecoProbe = await page.evaluate(() => ({
  hasHook: typeof window.__game.eco === 'function',
  populations: Object.keys(window.__game.eco?.().populations ?? {}).length,
  score: window.__game.ecoScore?.('terra_oak') ?? null,
  foodWebGuilds: window.__game.foodWeb?.().guilds.length ?? 0,
}));
const grownDom = await page.evaluate(() => ({
  mission: document.getElementById('mission')?.textContent ?? '',
  weather: document.getElementById('weather')?.textContent ?? '',
  events: document.getElementById('events')?.textContent ?? '',
  ecosystem: document.getElementById('ecosystem')?.textContent ?? '',
  campaign: window.__game.campaign?.() ?? null,
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

// Dune boot + per-planet ecosystem switching.
phase = 'dune';
await page.evaluate(() => {
  window.__game.setPlanet('dune', 6161);
  window.__game.tick(2);
});
const duneProbe = await page.evaluate(() => {
  const next = window.__game.state();
  return {
    planetId: next.planetId,
    temperature: next.environment.temperature,
    water: next.environment.water,
    ecoSpecies: Object.keys(next.eco.populations).length,
    score: window.__game.ecoScore('dune_camel'),
  };
});

// Glaciera boot + freeze/thaw telemetry.
phase = 'glaciere';
await page.evaluate(() => {
  window.__game.setPlanet('glaciere', 7777);
  window.__game.tick(30);
});
const iceProbe = await page.evaluate(() => {
  const next = window.__game.state();
  return {
    planetId: next.planetId,
    temperature: next.environment.temperature,
    water: next.environment.water,
    ecoSpecies: Object.keys(next.eco.populations).length,
    cryo: window.__game.cryo(),
    score: window.__game.ecoScore('glaciere_ice_fish'),
  };
});

// Inferna boot + eruption telemetry.
phase = 'inferna';
await page.evaluate(() => {
  window.__game.setPlanet('inferna', 8888);
  window.__game.tick(70);
});
const fireProbe = await page.evaluate(() => {
  const next = window.__game.state();
  return {
    planetId: next.planetId,
    temperature: next.environment.temperature,
    water: next.environment.water,
    ecoSpecies: Object.keys(next.eco.populations).length,
    volcano: window.__game.volcano(),
    score: window.__game.ecoScore('inferna_fire_hawk'),
  };
});

// Aquaria boot + ocean telemetry.
phase = 'aquaria';
await page.evaluate(() => {
  window.__game.setPlanet('aquaria', 9999);
  window.__game.tick(78);
});
const waterProbe = await page.evaluate(() => {
  const next = window.__game.state();
  return {
    planetId: next.planetId,
    temperature: next.environment.temperature,
    water: next.environment.water,
    ecoSpecies: Object.keys(next.eco.populations).length,
    ocean: window.__game.ocean(),
    score: window.__game.ecoScore('aquaria_reef_fish'),
  };
});

// Mycelia boot + fungal telemetry.
phase = 'mycelia';
await page.evaluate(() => {
  window.__game.setPlanet('mycelia', 4321);
  window.__game.tick(45);
});
const fungalProbe = await page.evaluate(() => {
  const next = window.__game.state();
  return {
    planetId: next.planetId,
    humidity: next.environment.humidity,
    ecoSpecies: Object.keys(next.eco.populations).length,
    fungal: window.__game.fungal(),
    score: window.__game.ecoScore('mycelia_spore_deer'),
  };
});

// Sakura boot + sky telemetry.
phase = 'sakura';
await page.evaluate(() => {
  window.__game.setPlanet('sakura', 5678);
  window.__game.tick(22);
});
const skyProbe = await page.evaluate(() => {
  const next = window.__game.state();
  return {
    planetId: next.planetId,
    water: next.environment.water,
    ecoSpecies: Object.keys(next.eco.populations).length,
    sky: window.__game.sky(),
    score: window.__game.ecoScore('sakura_blossom_deer'),
  };
});

// Aurelia boot + forest telemetry.
phase = 'aurelia';
await page.evaluate(() => {
  window.__game.setPlanet('aurelia', 8765);
  window.__game.tick(75);
});
const forestProbe = await page.evaluate(() => {
  const next = window.__game.state();
  return {
    planetId: next.planetId,
    temperature: next.environment.temperature,
    ecoSpecies: Object.keys(next.eco.populations).length,
    forest: window.__game.forest(),
    score: window.__game.ecoScore('aurelia_deer'),
  };
});

// Cosmos boot + cosmic telemetry (reuses eco.sky slot).
phase = 'cosmos';
await page.evaluate(() => {
  window.__game.setPlanet('cosmos', 9987);
  window.__game.tick(22);
});
const cosmicProbe = await page.evaluate(() => {
  const next = window.__game.state();
  return {
    planetId: next.planetId,
    energy: next.environment.energy,
    ecoSpecies: Object.keys(next.eco.populations).length,
    sky: window.__game.sky(),
    score: window.__game.ecoScore('cosmos_star_rabbit'),
  };
});

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
  placementFeedbackActive: placementActive > 0,
  simulationAdvanced: grown.tick >= 120,
  levelUnlocked: grown.progression.level >= 2,
  campaignHookReady: grownDom.campaign?.maxLevel === 100 && grownDom.campaign?.total === 100,
  advancedSystemsHook: grownDom.campaign?.lockedFrom === null
    && Object.values(grownDom.campaign?.systems?.scores ?? {}).every((score) => score >= 0 && score <= 100)
    && Object.values(grownDom.campaign?.systems?.tiers ?? {}).every((tier) => tier >= 1 && tier <= 5),
  ecosystemGrew: grown.environment.oxygen > initialState.environment.oxygen && grown.ecosystem.vegetation > initialState.ecosystem.vegetation,
  campaignMissionTracked: grown.mission.status === 'complete' || (grownDom.campaign?.mission.progress ?? 0) > 0,
  missionUiUpdated: /Misi/.test(grownDom.mission) && !/terkunci/.test(grownDom.mission),
  weatherUiUpdated: /Cuaca:/.test(grownDom.weather) && /Intensitas/.test(grownDom.weather),
  eventsUiUpdated: grownDom.events.includes('Event Opsional') && grownDom.events.includes('Hujan Pertama'),
  ecosystemUiUpdated: grownDom.ecosystem.includes('Vegetasi') && grownDom.ecosystem.includes('Satwa'),
  wildlifeAgentsPresent: grownFauna.agents > 0 && grownFauna.discovered.length > 0,
  wildlifeUiUpdated: grownDom.ecosystem.includes('Fauna'),
  ecoDebugHooks: ecoProbe.hasHook && ecoProbe.populations === 12 && ecoProbe.score !== null,
  foodWebDebugHook: ecoProbe.foodWebGuilds === 5,
  ecoPanelHiddenByDefault: dom.ecoPanelHiddenByDefault,
  statePersisted: reloaded.tick >= grown.tick && reloaded.objects.length === grown.objects.length,
  dnaShortCode: /^TPF-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(dnaShort),
  dnaCodeGenerated: dnaCode.length > dnaShort.length,
  newPlanetReset: newState.objects.length === 0,
  dnaRoundTrip:
    dnaState.seed === beforeDnaState.seed &&
    dnaState.planetId === beforeDnaState.planetId &&
    dnaState.tick === beforeDnaState.tick &&
    dnaState.objects.length === beforeDnaState.objects.length &&
    dnaState.progression.level === beforeDnaState.progression.level &&
    dnaFauna.agents === beforeDnaFauna.agents,
  serviceWorkerRegistered: sw.registered,
  mobileStillRendering: mobile.drawCalls > 0,
  dunePlanetActive:
    duneProbe.planetId === 'dune' &&
    duneProbe.temperature > 30 &&
    duneProbe.water < 25 &&
    duneProbe.ecoSpecies === 12 &&
    duneProbe.score !== null,
  glacierePlanetActive:
    iceProbe.planetId === 'glaciere' &&
    iceProbe.temperature < 0 &&
    iceProbe.water > 55 &&
    iceProbe.ecoSpecies === 12 &&
    iceProbe.cryo.seasonId === 'polar-night' &&
    iceProbe.cryo.freeze > 40 &&
    iceProbe.score !== null,
  infernaPlanetActive:
    fireProbe.planetId === 'inferna' &&
    fireProbe.temperature > 75 &&
    fireProbe.water < 25 &&
    fireProbe.ecoSpecies === 12 &&
    fireProbe.volcano.seasonId === 'eruption-phase' &&
    fireProbe.volcano.eruptionStress > 60 &&
    fireProbe.score !== null,
  aquariaPlanetActive:
    waterProbe.planetId === 'aquaria' &&
    waterProbe.water > 80 &&
    waterProbe.ecoSpecies === 12 &&
    waterProbe.ocean.seasonId === 'plankton-bloom' &&
    waterProbe.ocean.plankton > 70 &&
    waterProbe.ocean.reefHealth > 50 &&
    waterProbe.score !== null,
  myceliaPlanetActive:
    fungalProbe.planetId === 'mycelia' &&
    fungalProbe.humidity > 80 &&
    fungalProbe.ecoSpecies === 11 &&
    fungalProbe.fungal.seasonId === 'glow-summer' &&
    fungalProbe.fungal.glow > 70 &&
    fungalProbe.fungal.network > 50 &&
    fungalProbe.score !== null,
  sakuraPlanetActive:
    skyProbe.planetId === 'sakura' &&
    skyProbe.water > 50 &&
    skyProbe.ecoSpecies === 11 &&
    skyProbe.sky.seasonId === 'blossom-season' &&
    skyProbe.sky.blossom > 60 &&
    skyProbe.sky.connectivity > 50 &&
    skyProbe.score !== null,
  aureliaPlanetActive:
    forestProbe.planetId === 'aurelia' &&
    forestProbe.ecoSpecies === 11 &&
    forestProbe.forest.seasonId === 'autumn' &&
    forestProbe.forest.leafLitter > 50 &&
    forestProbe.forest.storage > 60 &&
    forestProbe.score !== null,
  cosmosPlanetActive:
    cosmicProbe.planetId === 'cosmos' &&
    cosmicProbe.energy > 60 &&
    cosmicProbe.ecoSpecies === 10 &&
    cosmicProbe.sky.seasonId === 'luminous-phase' &&
    cosmicProbe.sky.blossom > 60 &&
    cosmicProbe.score !== null,
};

console.log(JSON.stringify({ boot, initialTick: initialState.tick, placementActive, contextLossErrors, appErrors, grown: {
  tick: grown.tick,
  level: grown.progression.level,
  stage: grown.stage,
  environment: grown.environment,
  mission: grown.mission,
  campaign: grownDom.campaign,
  objects: grown.objects.length,
  fauna: grownFauna,
  eco: ecoProbe,
}, grownMetrics, reloadedTick: reloaded.tick, reloadedObjects: reloaded.objects.length, sw, dune: duneProbe, glaciere: iceProbe, inferna: fireProbe, aquaria: waterProbe, mycelia: fungalProbe, sakura: skyProbe, aurelia: forestProbe, cosmos: cosmicProbe, errors, checks }, null, 2));

await browser.close();
const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) {
  console.error(`FAIL: ${failed.join(', ')}`);
  process.exit(1);
}
console.log('PASS: vertical slice smoke');
