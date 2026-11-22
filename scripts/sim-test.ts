import { QUALITY, suggestQuality } from '../src/app/quality.ts';
import { CAMPAIGN_TARGETS, campaignCopy } from '../src/content/campaignCopy.ts';
import { ensureEventState } from '../src/content/missions.ts';
import { WEATHER_DEFS } from '../src/content/weather.ts';
import { OBJECT_DEFS, OBJECT_ORDER } from '../src/content/objects.ts';
import { SPECIES_ORDER } from '../src/content/species.ts';
import { PLANET_CONFIGS, PLANET_IDS } from '../src/content/planets/index.ts';
import { completeCampaignMission, missionProgress, syncCampaignMission } from '../src/sim/campaign.ts';
import { CAMPAIGN, CAMPAIGN_BY_LEVEL, campaignMissionForLevel, MISSION_TYPE_LABELS } from '../src/sim/campaignRules.ts';
import { decodePlanetDna, encodePlanetDna, encodePlanetDnaLegacy } from '../src/sim/dna.ts';
import { ecosystemConfigFor, guildAgentCapacity, guildFoodSourceIds, guildStatus, isSupportedPlanet } from '../src/sim/eco/guilds.ts';
import { HabitatManager } from '../src/sim/eco/habitat.ts';
import { validateAllPlanetConfigs, speciesRegistry } from '../src/sim/eco/registry.ts';
import { createEcoState } from '../src/sim/eco/state.ts';
import {
  computeStage,
  createPlanet,
  decodeDna,
  encodeDna,
  placeObject,
  simulateTick,
} from '../src/sim/engine.ts';
import { migratePlanet, CURRENT_SCHEMA_VERSION } from '../src/sim/migrate.ts';
import { cumulativeXp, eraForLevel, levelForXp, MAX_LEVEL, xpStep } from '../src/sim/progression.ts';
import { replayEvents } from '../src/sim/replay.ts';
import { deserializePlanet, serializePlanet } from '../src/sim/serialize.ts';
import type { PlanetState } from '../src/sim/types.ts';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function tickN(planet: PlanetState, count: number): void {
  for (let i = 0; i < count; i++) simulateTick(planet, false);
}

function agentCount(planet: PlanetState, species: string): number {
  return planet.fauna.agents.filter((agent) => agent.species === species).length;
}

function producerTotal(planet: PlanetState): number {
  return ['terra_oak', 'terra_pine', 'terra_wildflower', 'terra_river_reed']
    .reduce((sum, id) => sum + (planet.eco.populations[id]?.estimate ?? 0), 0);
}

function assertBoundedEco(planet: PlanetState, label: string): void {
  for (const [id, entry] of Object.entries(planet.eco.populations)) {
    assert(
      Number.isFinite(entry.estimate) && entry.estimate >= 0 && entry.estimate <= entry.capacity * 1.01,
      `${label}: populasi ${id} di luar batas`,
    );
  }
  assert(planet.eco.detritus >= 0 && planet.eco.detritus <= 500, `${label}: detritus di luar batas`);
}

const dirs: Array<[number, number, number]> = [
  [0.9, 0.2, 0.1], [-0.8, 0.3, 0.4], [0.1, -0.7, 0.9], [0.3, 0.8, -0.6],
  [-0.4, -0.5, -0.8], [0.7, 0.5, 0.5], [-0.6, 0.6, -0.5], [0.2, -0.9, -0.3],
  [0.99, 0.1, 0], [-0.99, 0.1, 0], [0, 0.1, 0.99], [0, 0.1, -0.99],
  [0.5, 0.7, 0.5], [-0.5, -0.7, 0.5], [0.6, -0.6, -0.5], [-0.7, 0.4, 0.6],
  [0.4, 0.3, -0.85], [-0.3, -0.4, 0.85], [0.85, -0.4, 0.3], [-0.85, 0.4, -0.3],
];
function seasonEnd(config: { climate: { seasons: Array<{ durationTicks: number }> } }, index: number): number {
  return config.climate.seasons.slice(0, index + 1).reduce((sum, season) => sum + season.durationTicks, 0);
}

function seasonCycle(config: { climate: { seasons: Array<{ durationTicks: number }> } }): number {
  return config.climate.seasons.reduce((sum, season) => sum + season.durationTicks, 0);
}

function goldenDirs(count: number): Array<[number, number, number]> {
  const result: Array<[number, number, number]> = [];
  const angle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - 2 * (i + 0.5) / count;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = angle * i;
    result.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
  }
  return result;
}

const plan = [
  'ocean', 'ocean', 'ocean', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree',
  'bush', 'bush', 'bush', 'bush', 'grass', 'grass', 'grass', 'flower', 'flower', 'rock', 'rock',
  'lake', 'hill', 'mountain',
] as const;

const planet = createPlanet(1337, 'Tes');
assert(planet.objects.length === 0, 'planet awal harus kosong');
assert(planet.mission.status === 'active', 'misi awal harus aktif');

for (let i = 0; i < plan.length; i++) {
  const placed = placeObject(planet, plan[i], dirs[i % dirs.length]);
  assert(placed, `objek ${plan[i]} harus bisa ditempatkan`);
}
assert(planet.objects.length === plan.length, 'jumlah objek tidak sesuai');

let maxStability = 0;
for (let i = 0; i < 150; i++) {
  simulateTick(planet);
  maxStability = Math.max(maxStability, planet.environment.stability);
}
console.log('sim state', {
  environment: planet.environment,
  ecosystem: planet.ecosystem,
  atmosphere: planet.atmosphere,
  weather: planet.weather,
  mission: planet.mission,
  stage: planet.stage,
});
assert(planet.tick === 150, 'tick harus maju');
assert(planet.environment.oxygen >= 45, `oksigen terlalu rendah: ${planet.environment.oxygen}`);
assert(planet.environment.water >= 40, `air terlalu rendah: ${planet.environment.water}`);
assert(maxStability >= 60, `stabilitas pernah mencapai 60: ${maxStability}`);
assert(planet.mission.status === 'complete', 'misi harus selesai');
assert(planet.progression.level >= 2, `level terlalu rendah: ${planet.progression.level}`);
assert(planet.stage >= 3, `tahap terlalu rendah: ${planet.stage}`);

const code = encodeDna(planet);
const decoded = decodeDna(code);
assert(decoded, 'DNA harus bisa didekode');
assert(decoded!.seed === planet.seed, 'seed DNA harus sama');
assert(decoded!.name === planet.name, 'nama DNA harus sama');
assert(decodeDna('!!!invalid!!!') === null, 'DNA invalid harus null');

// v0.1.1: serialisasi penuh, migrasi, dan replay event.
const codes = encodePlanetDna(planet);
assert(codes.short.startsWith('TPF-') && codes.short.split('-').length === 4, 'kode pendek harus TPF-XXXX-XXXX-XXXX');
assert(codes.full.startsWith('TPF-') && codes.full.length > codes.short.length, 'kode lengkap harus lebih panjang');
const restored = decodePlanetDna(codes.full);
assert(restored, 'DNA lengkap harus bisa didekode');
assert(restored!.seed === planet.seed, 'seed DNA lengkap harus sama');
assert(restored!.name === planet.name, 'nama DNA lengkap harus sama');
assert(restored!.tick === planet.tick, 'tick DNA lengkap harus sama');
assert(restored!.objects.length === planet.objects.length, 'jumlah objek DNA lengkap harus sama');
assert(restored!.progression.level === planet.progression.level, 'level DNA lengkap harus sama');
assert(restored!.biome === planet.biome, 'biome DNA lengkap harus sama');
assert(Math.abs(restored!.environment.oxygen - planet.environment.oxygen) < 0.5, 'environment DNA lengkap harus mirip');
assert(
  restored!.objects.every((object, index) =>
    object.type === planet.objects[index].type &&
    Math.abs(object.dir[0] - planet.objects[index].dir[0]) < 0.001 &&
    Math.abs(object.scale - planet.objects[index].scale) < 0.001,
  ),
  'penempatan objek DNA lengkap harus sama',
);
assert(restored!.fauna.agents.length === planet.fauna.agents.length, 'DNA lengkap harus mempertahankan agen fauna');
assert(
  restored!.fauna.discovered.length === planet.fauna.discovered.length &&
    planet.fauna.discovered.every((id) => restored!.fauna.discovered.includes(id)),
  'DNA lengkap harus mempertahankan spesies ditemukan',
);
const restoredShort = decodePlanetDna(codes.short);
assert(restoredShort?.seed === planet.seed, 'kode pendek harus menghasilkan seed yang sama');
const legacyRestored = decodePlanetDna(encodePlanetDnaLegacy(planet));
assert(legacyRestored?.planetId === 'terra', 'DNA v2 tanpa planet id harus tetap terbaca sebagai Terra');
const dnaDune = createPlanet(321, 'DNA Dune', 'dune');
const dnaGlaciere = createPlanet(322, 'DNA Es', 'glaciere');
const dnaInferna = createPlanet(323, 'DNA Api', 'inferna');
const dnaAquaria = createPlanet(324, 'DNA Laut', 'aquaria');
const dnaMycelia = createPlanet(325, 'DNA Jamur', 'mycelia');
const dnaSakura = createPlanet(326, 'DNA Sakura', 'sakura');
const dnaAurelia = createPlanet(327, 'DNA Aurelia', 'aurelia');
const dnaCosmos = createPlanet(328, 'DNA Cosmos', 'cosmos');
for (const [source, id] of [[dnaDune, 'dune'], [dnaGlaciere, 'glaciere'], [dnaInferna, 'inferna'], [dnaAquaria, 'aquaria'], [dnaMycelia, 'mycelia'], [dnaSakura, 'sakura'], [dnaAurelia, 'aurelia'], [dnaCosmos, 'cosmos']] as const) {
  const roundTrip = decodePlanetDna(encodePlanetDna(source).full);
  assert(roundTrip?.planetId === id, `DNA lengkap ${id} harus mempertahankan planetId`);
  const expected = ecosystemConfigFor(id)?.species.length ?? 12;
  assert(
    Object.keys(roundTrip?.eco.populations ?? {}).length === expected,
    `DNA lengkap ${id} harus memulihkan ${expected} populasi`,
  );
}
const brokenBody = codes.full.slice(4);
const brokenCode = `TPF-${(brokenBody[0] === 'A' ? 'B' : 'A') + brokenBody.slice(1)}`;
assert(decodePlanetDna(brokenCode) === null, 'checksum rusak harus ditolak');

const legacyRaw = JSON.parse(JSON.stringify(planet)) as Record<string, unknown>;
delete legacyRaw.schemaVersion;
delete legacyRaw.revision;
delete legacyRaw.terrainConfig;
delete legacyRaw.biome;
delete legacyRaw.startingEnvironment;
delete legacyRaw.eventLog;
delete legacyRaw.fauna;
const migrated = migratePlanet(legacyRaw);
assert(migrated, 'save lama harus bisa dimigrasikan');
assert(migrated!.schemaVersion === CURRENT_SCHEMA_VERSION, 'schemaVersion hasil migrasi harus 3');
assert(migrated!.objects.length === planet.objects.length, 'migrasi harus mempertahankan objek');
assert(migrated!.eventLog.some((event) => event.type === 'planet.created'), 'migrasi harus membuat event awal');
assert(migrated!.fauna.agents.length === 0, 'migrasi save lama harus membuat fauna kosong');

const configErrors = validateAllPlanetConfigs();
assert(configErrors.length === 0, `konfigurasi planet invalid: ${configErrors.join('; ')}`);
assert(PLANET_CONFIGS.length === 9 && PLANET_IDS.length === 9, 'harus ada 9 konfigurasi planet');
for (const id of PLANET_IDS) {
  const config = ecosystemConfigFor(id);
  assert(config, `konfigurasi ${id} harus tersedia`);
  const cycle = config!.climate.seasons.reduce((sum, season) => sum + season.durationTicks, 0);
  assert(cycle <= 120, `siklus musim ${id} terlalu panjang untuk sesi mobile: ${cycle} tick`);
  assert(cycle >= 100, `siklus musim ${id} terlalu pendek: ${cycle} tick`);
}

const determinismPlan = ['tree', 'rock', 'grass', 'bush', 'hill', 'lake'] as const;
const determinismDirs = goldenDirs(determinismPlan.length);
for (const id of PLANET_IDS) {
  for (let seed = 1; seed <= 50; seed++) {
    const left = createPlanet(seed, 'Deterministik', id);
    const right = createPlanet(seed, 'Deterministik', id);
    for (let i = 0; i < determinismPlan.length; i++) {
      placeObject(left, determinismPlan[i], determinismDirs[i]);
      placeObject(right, determinismPlan[i], determinismDirs[i]);
    }
    tickN(left, 20);
    tickN(right, 20);
    const snapshot = (planet: PlanetState) => ({ ...planet, id: '', updatedAt: 0 });
    assert(JSON.stringify(snapshot(left)) === JSON.stringify(snapshot(right)), `determinisme gagal: ${id} seed ${seed}`);
  }
}
assert(speciesRegistry.list().length >= 100, 'registry harus berisi subset spesies semua planet');
const terraConfig = speciesRegistry.planet('terra');
assert(terraConfig?.species.length === 12, 'Terra slice harus berisi 12 spesies kunci');
assert(migrated!.planetId === 'terra', 'migrasi save lama harus memilih planet default');
assert(migrated!.ecosystemVersion >= 1, 'migrasi harus menyetel ecosystemVersion');
assert(migrated!.eco.planetId === 'terra', 'migrasi harus membuat eco state default');

const habitat = new HabitatManager(speciesRegistry);
const habitatContext = {
  environment: planet.environment,
  ecosystem: planet.ecosystem,
  biomeTags: ['temperate-forest', 'river'],
};
const habitatBadContext = {
  environment: { ...planet.environment, temperature: -8, water: 4, humidity: 8, fertility: 2, stability: 5 },
  ecosystem: { ...planet.ecosystem, vegetation: 0, health: 5 },
  biomeTags: ['barren'],
};
const oakScore = habitat.score('terra_oak', habitatContext);
assert(oakScore !== null, 'terra_oak harus dikenal HabitatManager');
assert(oakScore!.suitability > 0, 'habitat cocok harus memberi skor positif');
assert(
  JSON.stringify(oakScore) === JSON.stringify(habitat.score('terra_oak', habitatContext)),
  'skor habitat harus deterministik',
);
assert(
  habitat.score('terra_oak', habitatBadContext)!.suitability < oakScore!.suitability,
  'habitat buruk harus menurunkan skor',
);

const ecoPlanet = createPlanet(99, 'Eco Save', 'terra');
ecoPlanet.eco.discovered.push('terra_oak');
ecoPlanet.eco.populations.terra_oak = {
  estimate: 42,
  trend: 1,
  births: 3,
  deaths: 1,
  capacity: 140,
};
const ecoLoaded = deserializePlanet(serializePlanet(ecoPlanet));
assert(ecoLoaded?.eco.discovered.includes('terra_oak'), 'save/load harus mempertahankan discovery eco');
assert(ecoLoaded?.eco.populations.terra_oak?.estimate === 42, 'save/load harus mempertahankan populasi eco');
assert(ecoLoaded?.schemaVersion === 3, 'save/load harus memakai schema v3');

const longA = createPlanet(7777, 'Long A');
const longB = createPlanet(7777, 'Long B');
for (let i = 0; i < 10000; i++) {
  simulateTick(longA, false);
  simulateTick(longB, false);
}
const ecoEntries = Object.values(longA.eco.populations);
assert(longA.tick === 10000, 'long-run test harus mencapai 10.000 tick');
assert(ecoEntries.length === 12, 'Terra core harus mengelola 12 populasi spesies');
assert(
  ecoEntries.every((entry) => entry.estimate > 0 && entry.estimate <= entry.capacity * 1.01),
  'populasi harus tetap positif dan dalam kapasitas setelah 10.000 tick',
);
assert(
  ecoEntries.every((entry) => Number.isFinite(entry.estimate) && Number.isFinite(entry.trend)),
  'populasi tidak boleh mengandung nilai non-finite',
);
assert(longA.eco.metrics.speciesCount === 12, 'semua 12 spesies harus bertahan di long-run');
assert(longA.eco.discovered.length === 12, 'semua spesies Terra harus tercatat ditemukan');
assert(longA.eco.populations.terra_oak.births > 0, 'producer harus bereproduksi');
assert(longA.eco.populations.terra_mushroom.births > 0, 'decomposer harus berkembang');
assert(longA.eco.detritus >= 0 && longA.eco.detritus <= 500, 'detritus harus terikat');
assert(
  longA.environment.fertility > longA.startingEnvironment.fertility,
  'daur ulang decomposer harus meningkatkan kesuburan',
);
assert(
  JSON.stringify(longA.eco) === JSON.stringify(longB.eco),
  'simulasi ekosistem harus deterministik untuk seed yang sama',
);

// Stress scenarios: disturbance must stay bounded and recovery must be measurable.
const overpop = createPlanet(101, 'Overpop');
tickN(overpop, 40);
overpop.eco.populations.terra_rabbit.estimate = 220;
tickN(overpop, 300);
assertBoundedEco(overpop, 'overpopulasi herbivora');
assert(
  overpop.eco.populations.terra_rabbit.estimate < 220,
  'overpopulasi herbivora harus ditekan kembali oleh kapasitas dan predator',
);
assert(producerTotal(overpop) > 0, 'vegetasi harus bertahan setelah overpopulasi herbivora');

const predatorOut = createPlanet(202, 'Predator Out');
tickN(predatorOut, 40);
const rabbitBeforePredatorOut = predatorOut.eco.populations.terra_rabbit.estimate;
predatorOut.eco.populations.terra_wolf.estimate = 0;
predatorOut.eco.populations.terra_fox.estimate = 0;
tickN(predatorOut, 300);
assertBoundedEco(predatorOut, 'predator punah');
assert(
  predatorOut.eco.populations.terra_rabbit.estimate > rabbitBeforePredatorOut,
  'populasi herbivora harus naik saat predator hilang',
);
assert(
  predatorOut.eco.populations.terra_rabbit.estimate <= predatorOut.eco.populations.terra_rabbit.capacity * 1.01,
  'herbivora tanpa predator tetap tidak boleh meledak tanpa batas',
);

const shortage = createPlanet(303, 'Food Shortage');
tickN(shortage, 40);
const foodBeforeShortage = shortage.eco.metrics.foodAvailability;
for (const id of ['terra_oak', 'terra_pine', 'terra_wildflower', 'terra_river_reed']) {
  shortage.eco.populations[id].estimate = 0.2;
}
tickN(shortage, 1);
assert(
  shortage.eco.metrics.foodAvailability < foodBeforeShortage,
  'kelangkaan produsen harus menurunkan food availability',
);
tickN(shortage, 300);
assertBoundedEco(shortage, 'kelangkaan makanan');
assert(producerTotal(shortage) > 10, 'produsen harus pulih setelah kelangkaan makanan');

const drought = createPlanet(404, 'Drought');
tickN(drought, 40);
const habitatBeforeDrought = drought.eco.metrics.habitatHealth;
drought.environment.water = 5;
tickN(drought, 1);
const habitatDry = drought.eco.metrics.habitatHealth;
assert(habitatDry < habitatBeforeDrought, 'kekeringan harus menurunkan habitat health');
tickN(drought, 99);
drought.environment.water = 85;
tickN(drought, 300);
assertBoundedEco(drought, 'kekeringan');
assert(drought.eco.metrics.habitatHealth > habitatDry, 'habitat health harus pulih setelah air kembali');

const habitatLoss = createPlanet(505, 'Habitat Loss');
tickN(habitatLoss, 40);
const habitatBeforeLoss = habitatLoss.eco.metrics.habitatHealth;
habitatLoss.environment.fertility = 2;
habitatLoss.ecosystem.vegetation = 2;
habitatLoss.environment.stability = 10;
tickN(habitatLoss, 1);
const habitatDamaged = habitatLoss.eco.metrics.habitatHealth;
assert(habitatDamaged < habitatBeforeLoss, 'kerusakan habitat harus menurunkan habitat health');
tickN(habitatLoss, 99);
habitatLoss.environment.fertility = 75;
habitatLoss.ecosystem.vegetation = 75;
habitatLoss.environment.stability = 75;
tickN(habitatLoss, 300);
assertBoundedEco(habitatLoss, 'kerusakan habitat');
assert(habitatLoss.eco.metrics.habitatHealth > habitatDamaged, 'habitat health harus pulih setelah restorasi');

const replayed = replayEvents(planet.eventLog);
assert(replayed, 'event log harus bisa di-replay');
assert(replayed!.seed === planet.seed, 'replay seed harus sama');
assert(replayed!.tick === planet.tick, 'replay tick harus sama');
assert(replayed!.objects.length === planet.objects.length, 'replay jumlah objek harus sama');
assert(Math.abs(replayed!.environment.oxygen - planet.environment.oxygen) < 0.01, 'replay environment harus deterministik');
assert(JSON.stringify(replayed!.fauna) === JSON.stringify(planet.fauna), 'replay fauna harus deterministik');

const serialized = serializePlanet(planet);
assert(serialized.format === 'tpf-planet' && serialized.version === CURRENT_SCHEMA_VERSION, 'format serialize benar');
assert(deserializePlanet(serialized)?.seed === planet.seed, 'deserialize harus mempertahankan seed');

const wildlifePlanet = createPlanet(4242, 'Satwa');
for (const type of ['deer', 'fox', 'bird'] as const) {
  assert(placeObject(wildlifePlanet, type, [1, 0.2, 0.3]), `${type} harus bisa ditempatkan`);
}
for (let i = 0; i < 40; i++) simulateTick(wildlifePlanet);
assert(wildlifePlanet.ecosystem.wildlife > 0, 'satwa harus terhitung dalam ekosistem');
assert(wildlifePlanet.ecosystem.population > 0, 'populasi harus terhitung dari satwa');
assert(wildlifePlanet.fauna.agents.length > 0, 'agen fauna harus muncul dari objek satwa');
assert(wildlifePlanet.fauna.discovered.includes('deer'), 'kijang harus ter-discover');
assert(wildlifePlanet.fauna.discovered.includes('fox'), 'rubah harus ter-discover');

const habitatPlanet = createPlanet(555, 'Habitat');
for (const type of ['ocean', 'lake', 'tree', 'flower', 'grass', 'bush'] as const) {
  assert(placeObject(habitatPlanet, type, [0.8, 0.3, 0.5]), `${type} harus bisa ditempatkan di habitat`);
}
for (let i = 0; i < 80; i++) simulateTick(habitatPlanet);
assert(habitatPlanet.fauna.discovered.includes('fish'), 'ikan harus muncul dari laut/danau');
assert(habitatPlanet.fauna.discovered.includes('insect'), 'serangga harus muncul dari vegetasi');

const deterministicA = createPlanet(999, 'Deterministik');
const deterministicB = createPlanet(999, 'Deterministik');
for (const planetRef of [deterministicA, deterministicB]) {
  for (const type of ['grass', 'tree', 'flower', 'ocean', 'deer'] as const) {
    placeObject(planetRef, type, [0.7, 0.4, 0.6]);
  }
  for (let i = 0; i < 80; i++) simulateTick(planetRef);
}
assert(
  JSON.stringify(deterministicA.fauna) === JSON.stringify(deterministicB.fauna),
  'dua planet dengan seed sama harus menghasilkan fauna identik',
);

const extinctPlanet = createPlanet(778, 'Punah');
extinctPlanet.fauna.discovered = ['deer'];
extinctPlanet.fauna.agents = [];
for (let i = 0; i < 9; i++) simulateTick(extinctPlanet);
assert(extinctPlanet.fauna.extinct.includes('deer'), 'spesies tanpa habitat harus punah');

// Food web ↔ wildlife coupling: visual guilds are capped and fed by eco populations.
const foodWebPlanet = createPlanet(9090, 'Rantai Makanan');
for (const type of ['grass', 'tree', 'flower', 'ocean', 'lake', 'deer', 'fox', 'bird'] as const) {
  assert(placeObject(foodWebPlanet, type, [0.6, 0.35, 0.7]), `${type} harus ditempatkan untuk uji food web`);
}
tickN(foodWebPlanet, 120);
assert(guildFoodSourceIds(foodWebPlanet, 'fox').includes('terra_rabbit'), 'rubah harus berburu kelinci dari food web');
assert(guildFoodSourceIds(foodWebPlanet, 'bird').includes('terra_fish'), 'elang harus memakan ikan dari food web');
assert(guildFoodSourceIds(foodWebPlanet, 'insect').includes('terra_wildflower'), 'lebah harus menyerbuki bunga liar dari food web');
for (const species of SPECIES_ORDER) {
  const status = guildStatus(foodWebPlanet, species);
  assert(status !== null, `guild ${species} harus memiliki status ekologis`);
  assert(status!.foodSources.length > 0, `guild ${species} harus memiliki sumber makanan dari food web`);
  assert(
    agentCount(foodWebPlanet, species) <= guildAgentCapacity(foodWebPlanet, species, 48),
    `agen ${species} tidak boleh melebihi kapasitas ekologis`,
  );
}

const grazerBefore = agentCount(foodWebPlanet, 'deer');
const grazerSupplyBefore = guildStatus(foodWebPlanet, 'deer')!.foodFactor;
for (const id of ['terra_oak', 'terra_pine', 'terra_wildflower', 'terra_river_reed']) {
  foodWebPlanet.eco.populations[id].estimate = 0;
}
tickN(foodWebPlanet, 60);
const grazerSupplyAfter = guildStatus(foodWebPlanet, 'deer')!.foodFactor;
assert(grazerSupplyAfter < grazerSupplyBefore, 'runtuhnya produsen harus menurunkan suplai herbivora');
assert(agentCount(foodWebPlanet, 'deer') <= grazerBefore, 'jumlah herbivora tidak boleh naik saat makanan habis');

const predatorPlanet = createPlanet(9091, 'Predator Web');
for (const type of ['grass', 'tree', 'flower', 'deer', 'fox', 'bird'] as const) {
  assert(placeObject(predatorPlanet, type, [0.65, 0.3, 0.68]), `${type} harus ditempatkan untuk uji predator`);
}
tickN(predatorPlanet, 120);
const foxBefore = agentCount(predatorPlanet, 'fox');
const foxSupplyBefore = guildStatus(predatorPlanet, 'fox')!.foodFactor;
predatorPlanet.eco.populations.terra_rabbit.estimate = 0;
predatorPlanet.eco.populations.terra_deer.estimate = 0;
tickN(predatorPlanet, 60);
const foxSupplyAfter = guildStatus(predatorPlanet, 'fox')!.foodFactor;
assert(foxSupplyAfter < foxSupplyBefore, 'runtuhnya mangsa harus menurunkan suplai predator');
assert(agentCount(predatorPlanet, 'fox') <= foxBefore, 'jumlah predator tidak boleh naik saat mangsa habis');

// Dune is the second active ecosystem with its own climate and guild mapping.
assert(isSupportedPlanet('dune') && isSupportedPlanet('glaciere') && isSupportedPlanet('inferna') && isSupportedPlanet('aquaria') && isSupportedPlanet('mycelia') && isSupportedPlanet('sakura') && isSupportedPlanet('aurelia') && isSupportedPlanet('cosmos'), 'Terra, Dune, Glaciera, Inferna, Aquaria, Mycelia, Sakura, Aurelia, dan Cosmos aktif');
const duneConfig = ecosystemConfigFor('dune');
assert(duneConfig !== null && duneConfig.species.length === 12, 'Dune harus membawa 12 spesies');
const dunePlanet = createPlanet(6161, 'Dune Uji', 'dune');
assert(dunePlanet.planetId === 'dune', 'createPlanet harus mempertahankan planetId Dune');
assert(dunePlanet.environment.temperature > 30, 'Dune harus mulai dengan suhu gurun');
assert(dunePlanet.environment.water < 25, 'Dune harus mulai dengan air langka');
assert(dunePlanet.eco.populations.dune_camel, 'populasi Dune harus diinisialisasi');
assert(!dunePlanet.eco.populations.terra_oak, 'populasi Terra tidak boleh bocor ke Dune');
for (const type of ['sand', 'rock', 'grass', 'tree', 'bush', 'fox', 'bird'] as const) {
  assert(placeObject(dunePlanet, type, [0.55, 0.35, 0.75]), `${type} harus bisa ditempatkan di Dune`);
}
tickN(dunePlanet, 200);
assert(dunePlanet.environment.temperature > 25, 'suhu Dune harus tetap gurun setelah 200 tick');
assert(dunePlanet.environment.water < 45, 'air Dune harus tetap langka setelah 200 tick');
assert(dunePlanet.eco.metrics.speciesCount > 0, 'ekosistem Dune harus hidup');
const duneDeer = guildStatus(dunePlanet, 'deer');
assert(duneDeer !== null && duneDeer.speciesIds.includes('dune_camel'), 'guild herbivora Dune harus memetakan unta');
assert(duneDeer.foodSources.includes('dune_desert_grass'), 'herbivora Dune harus mendapat rumput gurun dari food web');
assert(agentCount(dunePlanet, 'deer') <= guildAgentCapacity(dunePlanet, 'deer', 48), 'agen Dune harus bounded');
assert(agentCount(dunePlanet, 'fish') === 0, 'Dune tidak boleh memunculkan ikan tanpa spesies akuatik');
const duneLoaded = deserializePlanet(serializePlanet(dunePlanet));
assert(duneLoaded?.planetId === 'dune' && !!duneLoaded.eco.populations.dune_camel, 'save/load Dune harus mempertahankan identitas dan populasi');

const duneTwin = createPlanet(6161, 'Dune Uji', 'dune');
for (const type of ['sand', 'rock', 'grass', 'tree', 'bush', 'fox', 'bird'] as const) {
  placeObject(duneTwin, type, [0.55, 0.35, 0.75]);
}
tickN(duneTwin, 200);
assert(JSON.stringify(dunePlanet.fauna) === JSON.stringify(duneTwin.fauna), 'fauna Dune harus deterministik untuk seed sama');
assert(JSON.stringify(dunePlanet.eco) === JSON.stringify(duneTwin.eco), 'ekosistem Dune harus deterministik untuk seed sama');

// Glaciera is the third active ecosystem with seasons and freeze/thaw state.
const iceConfig = ecosystemConfigFor('glaciere');
assert(iceConfig !== null && iceConfig.species.length === 12, 'Glaciera harus membawa 12 spesies');
assert(iceConfig.climate.seasons.length === 4, 'Glaciera harus membawa empat musim');
const icePlanet = createPlanet(7777, 'Glaciera Uji', 'glaciere');
assert(icePlanet.planetId === 'glaciere', 'createPlanet harus mempertahankan planetId Glaciera');
assert(icePlanet.environment.temperature < 0, 'Glaciera harus mulai dengan suhu below zero');
assert(icePlanet.environment.water > 55, 'Glaciera harus mulai dengan cadangan air es');
assert(icePlanet.eco.populations.glaciere_ice_fish, 'populasi Glaciera harus diinisialisasi');
assert(!icePlanet.eco.populations.terra_oak && !icePlanet.eco.populations.dune_camel, 'tidak boleh ada kebocoran spesies planet lain');
for (const type of ['grass', 'tree', 'rock', 'lake', 'ocean', 'deer', 'fox', 'bird'] as const) {
  assert(placeObject(icePlanet, type, [0.5, 0.4, 0.75]), `${type} harus bisa ditempatkan di Glaciera`);
}
tickN(icePlanet, seasonEnd(iceConfig!, 0));
const polarCryo = { ...icePlanet.eco.cryo };
assert(polarCryo.seasonId === 'polar-night', 'akhir musim pertama harus polar night');
assert(polarCryo.freeze > 40, 'polar night harus membekukan permukaan');
tickN(icePlanet, seasonEnd(iceConfig!, 1) - seasonEnd(iceConfig!, 0));
const thawCryo = { ...icePlanet.eco.cryo };
assert(thawCryo.seasonId === 'thaw', 'musim kedua harus cair');
assert(thawCryo.freeze < polarCryo.freeze, 'musim cair harus menurunkan freeze');
tickN(icePlanet, seasonEnd(iceConfig!, 2) - seasonEnd(iceConfig!, 1));
assert(icePlanet.eco.cryo.seasonId === 'short-summer', 'musim ketiga harus panas singkat');
assert(icePlanet.eco.cryo.freeze < thawCryo.freeze, 'musim panas singkat harus mencairkan lebih lanjut');
assert(icePlanet.eco.cryo.iceCoverage > 0, 'danau beku harus menghasilkan ice coverage');
const iceFishStatus = guildStatus(icePlanet, 'fish');
assert(iceFishStatus !== null && iceFishStatus.speciesIds.includes('glaciere_ice_fish'), 'guild fish Glaciera harus memetakan ikan es');
assert(guildFoodSourceIds(icePlanet, 'fox').includes('glaciere_arctic_hare'), 'rubah arktik harus berburu kelinci dari food web');
assert(agentCount(icePlanet, 'fish') <= 10, 'agen akuatik Glaciera harus bounded');
const iceLoaded = deserializePlanet(serializePlanet(icePlanet));
assert(
  iceLoaded?.planetId === 'glaciere' &&
    iceLoaded.eco.cryo.seasonId === 'short-summer' &&
    !!iceLoaded.eco.populations.glaciere_polar_bear,
  'save/load Glaciera harus mempertahankan identitas, musim, dan populasi',
);
const iceTwin = createPlanet(7777, 'Glaciera Uji', 'glaciere');
for (const type of ['grass', 'tree', 'rock', 'lake', 'ocean', 'deer', 'fox', 'bird'] as const) {
  placeObject(iceTwin, type, [0.5, 0.4, 0.75]);
}
tickN(iceTwin, seasonEnd(iceConfig!, 2));
assert(JSON.stringify(icePlanet.fauna) === JSON.stringify(iceTwin.fauna), 'fauna Glaciera harus deterministik');
assert(JSON.stringify(icePlanet.eco) === JSON.stringify(iceTwin.eco), 'ekosistem Glaciera harus deterministik');

// Inferna is the fourth active ecosystem with heat, lava, ash, and eruption phases.
const fireConfig = ecosystemConfigFor('inferna');
assert(fireConfig !== null && fireConfig.species.length === 12, 'Inferna harus membawa 12 spesies');
assert(fireConfig.climate.seasons.length === 4, 'Inferna harus membawa empat musim');
const firePlanet = createPlanet(8888, 'Inferna Uji', 'inferna');
assert(firePlanet.planetId === 'inferna', 'createPlanet harus mempertahankan planetId Inferna');
assert(firePlanet.environment.temperature > 60, 'Inferna harus mulai dengan suhu vulkanik');
assert(firePlanet.environment.water < 25, 'Inferna harus mulai dengan air langka');
assert(firePlanet.eco.populations.inferna_ember_moss, 'populasi Inferna harus diinisialisasi');
assert(!firePlanet.eco.populations.terra_oak && !firePlanet.eco.populations.dune_camel && !firePlanet.eco.populations.glaciere_ice_fish, 'tidak boleh ada kebocoran spesies planet lain');
for (const type of ['grass', 'tree', 'rock', 'mountain', 'bush', 'deer', 'fox', 'bird'] as const) {
  assert(placeObject(firePlanet, type, [0.5, 0.4, 0.75]), `${type} harus bisa ditempatkan di Inferna`);
}
tickN(firePlanet, seasonEnd(fireConfig!, 0));
const quietVolcano = { ...firePlanet.eco.volcano };
assert(quietVolcano.seasonId === 'quiet-phase', 'akhir musim pertama harus masa tenang');
assert(quietVolcano.heat > 30, 'gunung berapi harus menyimpan panas sejak awal');
assert(quietVolcano.ash < 30, 'masa tenang harus memiliki abu rendah');
tickN(firePlanet, seasonEnd(fireConfig!, 1) - seasonEnd(fireConfig!, 0));
const ashVolcano = { ...firePlanet.eco.volcano };
assert(ashVolcano.seasonId === 'ash-fall', 'musim kedua harus hujan abu');
assert(ashVolcano.ash > quietVolcano.ash && ashVolcano.ash > 40, 'hujan abu harus menaikkan abu');
tickN(firePlanet, seasonEnd(fireConfig!, 2) - seasonEnd(fireConfig!, 1));
const eruptionVolcano = { ...firePlanet.eco.volcano };
assert(eruptionVolcano.seasonId === 'eruption-phase', 'musim ketiga harus masa letusan');
assert(eruptionVolcano.heat > quietVolcano.heat, 'letusan harus menaikkan panas');
assert(eruptionVolcano.lavaFlow > quietVolcano.lavaFlow, 'letusan harus menaikkan aliran lava');
assert(eruptionVolcano.eruptionStress > 60, 'letusan harus memicu stres erupsi');
assert(firePlanet.environment.temperature > 75, 'letusan harus mendorong suhu vulkanik lebih tinggi');
tickN(firePlanet, seasonEnd(fireConfig!, 3) - seasonEnd(fireConfig!, 2));
const regrowthVolcano = { ...firePlanet.eco.volcano };
assert(regrowthVolcano.seasonId === 'regrowth', 'musim keempat harus tumbuh kembali');
assert(regrowthVolcano.ash < eruptionVolcano.ash, 'musim tumbuh kembali harus menurunkan abu');
assert(regrowthVolcano.eruptionStress < eruptionVolcano.eruptionStress, 'stres erupsi harus mereda');
assert(firePlanet.eco.metrics.speciesCount === 12, 'ekosistem Inferna harus tetap memiliki 12 spesies');
assertBoundedEco(firePlanet, 'Inferna');
const fireDeer = guildStatus(firePlanet, 'deer');
assert(fireDeer !== null && fireDeer.speciesIds.includes('inferna_ash_grazer'), 'guild herbivora Inferna harus memetakan penggembala abu');
assert(guildFoodSourceIds(firePlanet, 'fox').includes('inferna_ember_beetle'), 'serigala abu harus berburu kumbang bara dari food web');
assert(guildStatus(firePlanet, 'fish') === null, 'Inferna tidak boleh memiliki guild ikan');
assert(agentCount(firePlanet, 'fish') === 0, 'Inferna tidak boleh memunculkan ikan');
assert(agentCount(firePlanet, 'insect') <= guildAgentCapacity(firePlanet, 'insect', 24), 'agen Inferna harus bounded');
const fireLoaded = deserializePlanet(serializePlanet(firePlanet));
assert(
  fireLoaded?.planetId === 'inferna' &&
    fireLoaded.eco.volcano.seasonId === 'regrowth' &&
    !!fireLoaded.eco.populations.inferna_fire_hawk,
  'save/load Inferna harus mempertahankan identitas, musim, dan populasi',
);
const fireTwin = createPlanet(8888, 'Inferna Uji', 'inferna');
for (const type of ['grass', 'tree', 'rock', 'mountain', 'bush', 'deer', 'fox', 'bird'] as const) {
  placeObject(fireTwin, type, [0.5, 0.4, 0.75]);
}
tickN(fireTwin, seasonEnd(fireConfig!, 3));
assert(JSON.stringify(firePlanet.fauna) === JSON.stringify(fireTwin.fauna), 'fauna Inferna harus deterministik');
assert(JSON.stringify(firePlanet.eco) === JSON.stringify(fireTwin.eco), 'ekosistem Inferna harus deterministik');

// Aquaria is the fifth active ecosystem with currents, reefs, plankton, and bleaching.
const waterConfig = ecosystemConfigFor('aquaria');
assert(waterConfig !== null && waterConfig.species.length === 12, 'Aquaria harus membawa 12 spesies');
assert(waterConfig.climate.seasons.length === 4, 'Aquaria harus membawa empat musim');
assert(waterConfig.aquatic !== undefined && waterConfig.aquatic.depth > 100, 'Aquaria harus membawa profil laut dalam');
const waterPlanet = createPlanet(9999, 'Aquaria Uji', 'aquaria');
assert(waterPlanet.planetId === 'aquaria', 'createPlanet harus mempertahankan planetId Aquaria');
assert(waterPlanet.environment.temperature > 20 && waterPlanet.environment.temperature < 32, 'Aquaria harus mulai dengan suhu tropis');
assert(waterPlanet.environment.water > 80, 'Aquaria harus mulai dengan laut melimpah');
assert(waterPlanet.eco.populations.aquaria_kelp, 'populasi Aquaria harus diinisialisasi');
assert(!waterPlanet.eco.populations.terra_oak && !waterPlanet.eco.populations.inferna_ember_moss, 'tidak boleh ada kebocoran spesies planet lain');
for (const type of ['ocean', 'lake', 'grass', 'tree', 'rock', 'deer', 'fox', 'bird'] as const) {
  assert(placeObject(waterPlanet, type, [0.5, 0.4, 0.75]), `${type} harus bisa ditempatkan di Aquaria`);
}
tickN(waterPlanet, seasonEnd(waterConfig!, 0));
const calmOcean = { ...waterPlanet.eco.ocean };
assert(calmOcean.seasonId === 'calm-current', 'akhir musim pertama harus arus tenang');
assert(calmOcean.reefHealth > 50, 'terumbu harus sehat di awal');
assert(calmOcean.plankton > 50, 'plankton harus tersedia di awal');
tickN(waterPlanet, seasonEnd(waterConfig!, 1) - seasonEnd(waterConfig!, 0));
const warmOcean = { ...waterPlanet.eco.ocean };
assert(warmOcean.seasonId === 'warm-water', 'musim kedua harus air hangat');
assert(warmOcean.bleaching > calmOcean.bleaching, 'air hangat harus menaikkan pemutihan');
tickN(waterPlanet, seasonEnd(waterConfig!, 2) - seasonEnd(waterConfig!, 1));
const bloomOcean = { ...waterPlanet.eco.ocean };
assert(bloomOcean.seasonId === 'plankton-bloom', 'musim ketiga harus ledakan plankton');
assert(bloomOcean.plankton > warmOcean.plankton, 'ledakan plankton harus menaikkan plankton');
assert(bloomOcean.bleaching < warmOcean.bleaching, 'ledakan plankton harus menurunkan pemutihan');
tickN(waterPlanet, seasonEnd(waterConfig!, 3) - seasonEnd(waterConfig!, 2));
const surgeOcean = { ...waterPlanet.eco.ocean };
assert(surgeOcean.seasonId === 'storm-surge', 'musim keempat harus badai laut');
assert(surgeOcean.current > calmOcean.current, 'badai laut harus memperkuat arus');
tickN(waterPlanet, 1);
assert(waterPlanet.eco.ocean.seasonId === 'calm-current', 'siklus penuh harus kembali ke arus tenang');
assert(waterPlanet.eco.ocean.reefHealth > 0, 'terumbu harus bertahan setelah siklus penuh');
assert(waterPlanet.eco.metrics.speciesCount === 12, 'ekosistem Aquaria harus tetap memiliki 12 spesies');
assertBoundedEco(waterPlanet, 'Aquaria');
const waterFish = guildStatus(waterPlanet, 'fish');
assert(waterFish !== null && waterFish.speciesIds.includes('aquaria_reef_fish'), 'guild fish Aquaria harus memetakan ikan terumbu');
assert(guildFoodSourceIds(waterPlanet, 'fox').includes('aquaria_reef_fish'), 'guild predator Aquaria harus berburu ikan dari food web');
assert(agentCount(waterPlanet, 'fish') > 0, 'Aquaria harus memunculkan agen ikan');
assert(agentCount(waterPlanet, 'insect') > 0, 'Aquaria harus memunculkan agen mikroba');
const waterLoaded = deserializePlanet(serializePlanet(waterPlanet));
assert(
  waterLoaded?.planetId === 'aquaria' &&
    waterLoaded.eco.ocean.seasonId === 'calm-current' &&
    !!waterLoaded.eco.populations.aquaria_shark,
  'save/load Aquaria harus mempertahankan identitas, musim, dan populasi',
);
const waterTwin = createPlanet(9999, 'Aquaria Uji', 'aquaria');
for (const type of ['ocean', 'lake', 'grass', 'tree', 'rock', 'deer', 'fox', 'bird'] as const) {
  placeObject(waterTwin, type, [0.5, 0.4, 0.75]);
}
tickN(waterTwin, seasonCycle(waterConfig!) + 1);
assert(JSON.stringify(waterPlanet.fauna) === JSON.stringify(waterTwin.fauna), 'fauna Aquaria harus deterministik');
assert(JSON.stringify(waterPlanet.eco) === JSON.stringify(waterTwin.eco), 'ekosistem Aquaria harus deterministik');

// Mycelia is the sixth active ecosystem with fungal networks and bioluminescence.
const fungalConfig = ecosystemConfigFor('mycelia');
assert(fungalConfig !== null && fungalConfig.species.length === 11, 'Mycelia harus membawa 11 spesies');
assert(fungalConfig.climate.seasons.length === 4, 'Mycelia harus membawa empat musim');
assert(fungalConfig.specialSystems.includes('fungal-network'), 'Mycelia harus membawa sistem fungal-network');
const fungalPlanet = createPlanet(4321, 'Mycelia Uji', 'mycelia');
assert(fungalPlanet.planetId === 'mycelia', 'createPlanet harus mempertahankan planetId Mycelia');
assert(fungalPlanet.environment.humidity > 80, 'Mycelia harus mulai lembap');
assert(fungalPlanet.eco.populations.mycelia_network, 'populasi Mycelia harus diinisialisasi');
assert(!fungalPlanet.eco.populations.aquaria_kelp && !fungalPlanet.eco.populations.inferna_ember_moss, 'tidak boleh ada kebocoran spesies planet lain');
for (const type of ['tree', 'grass', 'bush', 'rock', 'deer', 'fox', 'bird'] as const) {
  assert(placeObject(fungalPlanet, type, [0.5, 0.4, 0.75]), `${type} harus bisa ditempatkan di Mycelia`);
}
tickN(fungalPlanet, seasonEnd(fungalConfig!, 0));
const sporeSeason = { ...fungalPlanet.eco.fungal };
assert(sporeSeason.seasonId === 'spore-spring', 'akhir musim pertama harus spora');
assert(sporeSeason.spores > 60, 'musim spora harus menghasilkan spora tinggi');
assert(sporeSeason.network > 50, 'jaringan harus aktif di awal');
tickN(fungalPlanet, seasonEnd(fungalConfig!, 1) - seasonEnd(fungalConfig!, 0));
const glowSeason = { ...fungalPlanet.eco.fungal };
assert(glowSeason.seasonId === 'glow-summer', 'musim kedua harus cahaya');
assert(glowSeason.glow > sporeSeason.glow, 'musim cahaya harus menaikkan bioluminesensi');
tickN(fungalPlanet, seasonEnd(fungalConfig!, 2) - seasonEnd(fungalConfig!, 1));
const dampSeason = { ...fungalPlanet.eco.fungal };
assert(dampSeason.seasonId === 'damp-autumn', 'musim ketiga harus lembap');
assert(dampSeason.nutrients > glowSeason.nutrients, 'musim lembap harus menaikkan nutrisi');
tickN(fungalPlanet, seasonEnd(fungalConfig!, 3) - seasonEnd(fungalConfig!, 2));
const quietSeason = { ...fungalPlanet.eco.fungal };
assert(quietSeason.seasonId === 'quiet-winter', 'musim keempat harus tenang');
assert(quietSeason.networkStress > sporeSeason.networkStress, 'musim tenang harus menaikkan stres jaringan');
tickN(fungalPlanet, 1);
assert(fungalPlanet.eco.fungal.seasonId === 'spore-spring', 'siklus penuh harus kembali ke spora');
assert(fungalPlanet.eco.fungal.network > 0, 'jaringan harus bertahan setelah siklus penuh');
assert(fungalPlanet.eco.metrics.speciesCount === 11, 'ekosistem Mycelia harus tetap memiliki 11 spesies');
assertBoundedEco(fungalPlanet, 'Mycelia');
const fungalDeer = guildStatus(fungalPlanet, 'deer');
assert(fungalDeer !== null && fungalDeer.speciesIds.includes('mycelia_spore_deer'), 'guild deer Mycelia harus memetakan kijang spora');
assert(guildFoodSourceIds(fungalPlanet, 'fox').includes('mycelia_spore_deer'), 'guild predator Mycelia harus terhubung ke food web');
assert(agentCount(fungalPlanet, 'bird') > 0, 'Mycelia harus memunculkan agen kelelawar sebagai guild burung');
assert(fungalPlanet.fauna.discovered.includes('insect'), 'Mycelia harus pernah memunculkan agen ngengat');
const fungalLoaded = deserializePlanet(serializePlanet(fungalPlanet));
assert(
  fungalLoaded?.planetId === 'mycelia' &&
    fungalLoaded.eco.fungal.seasonId === 'spore-spring' &&
    !!fungalLoaded.eco.populations.mycelia_night_stalker,
  'save/load Mycelia harus mempertahankan identitas, musim, dan populasi',
);
const fungalTwin = createPlanet(4321, 'Mycelia Uji', 'mycelia');
for (const type of ['tree', 'grass', 'bush', 'rock', 'deer', 'fox', 'bird'] as const) {
  placeObject(fungalTwin, type, [0.5, 0.4, 0.75]);
}
tickN(fungalTwin, seasonCycle(fungalConfig!) + 1);
assert(JSON.stringify(fungalPlanet.fauna) === JSON.stringify(fungalTwin.fauna), 'fauna Mycelia harus deterministik');
assert(JSON.stringify(fungalPlanet.eco) === JSON.stringify(fungalTwin.eco), 'ekosistem Mycelia harus deterministik');

// Sakura is the seventh active ecosystem with floating islands and blossom cycles.
const skyConfig = ecosystemConfigFor('sakura');
assert(skyConfig !== null && skyConfig.species.length === 11, 'Sakura harus membawa 11 spesies');
assert(skyConfig.climate.seasons.length === 4, 'Sakura harus membawa empat musim');
assert(skyConfig.specialSystems.includes('floating-connectivity'), 'Sakura harus membawa sistem floating-connectivity');
const skyPlanet = createPlanet(5678, 'Sakura Uji', 'sakura');
assert(skyPlanet.planetId === 'sakura', 'createPlanet harus mempertahankan planetId Sakura');
assert(skyPlanet.environment.water > 50 && skyPlanet.environment.humidity > 60, 'Sakura harus mulai dengan awan lembap');
assert(skyPlanet.eco.populations.sakura_tree, 'populasi Sakura harus diinisialisasi');
assert(!skyPlanet.eco.populations.mycelia_network && !skyPlanet.eco.populations.aquaria_kelp, 'tidak boleh ada kebocoran spesies planet lain');
for (const type of ['tree', 'grass', 'flower', 'bush', 'rock', 'deer', 'fox', 'bird'] as const) {
  assert(placeObject(skyPlanet, type, [0.5, 0.4, 0.75]), `${type} harus bisa ditempatkan di Sakura`);
}
tickN(skyPlanet, seasonEnd(skyConfig!, 0));
const blossomSky = { ...skyPlanet.eco.sky };
assert(blossomSky.seasonId === 'blossom-season', 'akhir musim pertama harus mekar');
assert(blossomSky.blossom > 60, 'musim mekar harus menaikkan mekar');
assert(blossomSky.connectivity > 50, 'konektivitas pulau harus sehat di awal');
tickN(skyPlanet, seasonEnd(skyConfig!, 1) - seasonEnd(skyConfig!, 0));
const petalSky = { ...skyPlanet.eco.sky };
assert(petalSky.seasonId === 'petal-fall', 'musim kedua harus gugur kelopak');
assert(petalSky.blossom < blossomSky.blossom, 'gugur kelopak harus menurunkan mekar');
tickN(skyPlanet, seasonEnd(skyConfig!, 2) - seasonEnd(skyConfig!, 1));
const windSky = { ...skyPlanet.eco.sky };
assert(windSky.seasonId === 'sky-winds', 'musim ketiga harus angin langit');
assert(windSky.wind > blossomSky.wind, 'angin langit harus memperkuat angin');
assert(windSky.connectivity < blossomSky.connectivity, 'angin langit harus melemahkan konektivitas');
assert(windSky.isolationStress > blossomSky.isolationStress, 'angin langit harus menaikkan stres isolasi');
tickN(skyPlanet, seasonEnd(skyConfig!, 3) - seasonEnd(skyConfig!, 2));
const quietSky = { ...skyPlanet.eco.sky };
assert(quietSky.seasonId === 'quiet-sky', 'musim keempat harus langit tenang');
assert(quietSky.connectivity > windSky.connectivity, 'langit tenang harus memulihkan konektivitas');
tickN(skyPlanet, 1);
assert(skyPlanet.eco.sky.seasonId === 'blossom-season', 'siklus penuh harus kembali ke mekar');
assert(skyPlanet.eco.sky.connectivity > 0, 'pulau melayang harus tetap terhubung');
assert(skyPlanet.eco.metrics.speciesCount === 11, 'ekosistem Sakura harus tetap memiliki 11 spesies');
assertBoundedEco(skyPlanet, 'Sakura');
const skyDeer = guildStatus(skyPlanet, 'deer');
assert(skyDeer !== null && skyDeer.speciesIds.includes('sakura_blossom_deer'), 'guild deer Sakura harus memetakan kijang bunga');
assert(guildFoodSourceIds(skyPlanet, 'fox').includes('sakura_sky_rabbit'), 'guild predator Sakura harus terhubung ke food web');
assert(agentCount(skyPlanet, 'bird') > 0, 'Sakura harus memunculkan agen elang/kolibri');
assert(agentCount(skyPlanet, 'insect') > 0, 'Sakura harus memunculkan agen kupu-kupu');
const skyLoaded = deserializePlanet(serializePlanet(skyPlanet));
assert(
  skyLoaded?.planetId === 'sakura' &&
    skyLoaded.eco.sky.seasonId === 'blossom-season' &&
    !!skyLoaded.eco.populations.sakura_sky_hawk,
  'save/load Sakura harus mempertahankan identitas, musim, dan populasi',
);
const skyTwin = createPlanet(5678, 'Sakura Uji', 'sakura');
for (const type of ['tree', 'grass', 'flower', 'bush', 'rock', 'deer', 'fox', 'bird'] as const) {
  placeObject(skyTwin, type, [0.5, 0.4, 0.75]);
}
tickN(skyTwin, seasonCycle(skyConfig!) + 1);
assert(JSON.stringify(skyPlanet.fauna) === JSON.stringify(skyTwin.fauna), 'fauna Sakura harus deterministik');
assert(JSON.stringify(skyPlanet.eco) === JSON.stringify(skyTwin.eco), 'ekosistem Sakura harus deterministik');

// Aurelia is the eighth active ecosystem with leaf litter, food storage, and hibernation.
const forestConfig = ecosystemConfigFor('aurelia');
assert(forestConfig !== null && forestConfig.species.length === 11, 'Aurelia harus membawa 11 spesies');
assert(forestConfig.climate.seasons.length === 4, 'Aurelia harus membawa empat musim');
assert(forestConfig.specialSystems.includes('leaf-fall'), 'Aurelia harus membawa sistem leaf-fall');
const forestPlanet = createPlanet(8765, 'Aurelia Uji', 'aurelia');
assert(forestPlanet.planetId === 'aurelia', 'createPlanet harus mempertahankan planetId Aurelia');
assert(forestPlanet.eco.populations.aurelia_golden_maple, 'populasi Aurelia harus diinisialisasi');
assert(!forestPlanet.eco.populations.sakura_tree && !forestPlanet.eco.populations.mycelia_network, 'tidak boleh ada kebocoran spesies planet lain');
for (const type of ['tree', 'grass', 'bush', 'rock', 'deer', 'fox', 'bird'] as const) {
  assert(placeObject(forestPlanet, type, [0.5, 0.4, 0.75]), `${type} harus bisa ditempatkan di Aurelia`);
}
tickN(forestPlanet, seasonEnd(forestConfig!, 0));
const springForest = { ...forestPlanet.eco.forest };
assert(springForest.seasonId === 'spring', 'akhir musim pertama harus semi');
assert(springForest.storage > 20, 'musim semi harus punya simpanan');
tickN(forestPlanet, seasonEnd(forestConfig!, 1) - seasonEnd(forestConfig!, 0));
const summerForest = { ...forestPlanet.eco.forest };
assert(summerForest.seasonId === 'summer', 'musim kedua harus panas');
assert(summerForest.storage > springForest.storage, 'musim panas harus menambah simpanan');
tickN(forestPlanet, seasonEnd(forestConfig!, 2) - seasonEnd(forestConfig!, 1));
const autumnForest = { ...forestPlanet.eco.forest };
assert(autumnForest.seasonId === 'autumn', 'musim ketiga harus gugur');
assert(autumnForest.leafLitter > summerForest.leafLitter, 'musim gugur harus menambah serasah');
assert(autumnForest.storage > summerForest.storage, 'musim gugur harus memaksimalkan simpanan');
tickN(forestPlanet, seasonEnd(forestConfig!, 3) - seasonEnd(forestConfig!, 2));
const winterForest = { ...forestPlanet.eco.forest };
assert(winterForest.seasonId === 'winter', 'musim keempat harus dingin');
assert(winterForest.hibernation > autumnForest.hibernation, 'musim dingin harus menaikkan hibernasi');
assert(winterForest.frostStress > autumnForest.frostStress, 'musim dingin harus menaikkan stres embun');
tickN(forestPlanet, 1);
assert(forestPlanet.eco.forest.seasonId === 'spring', 'siklus penuh harus kembali ke semi');
assert(forestPlanet.eco.forest.storage > 0, 'simpanan harus bertahan setelah siklus penuh');
assert(forestPlanet.eco.metrics.speciesCount === 11, 'ekosistem Aurelia harus tetap memiliki 11 spesies');
assertBoundedEco(forestPlanet, 'Aurelia');
const forestDeer = guildStatus(forestPlanet, 'deer');
assert(forestDeer !== null && forestDeer.speciesIds.includes('aurelia_deer'), 'guild deer Aurelia harus memetakan kijang musim gugur');
assert(guildFoodSourceIds(forestPlanet, 'fox').includes('aurelia_rabbit'), 'guild predator Aurelia harus terhubung ke food web');
assert(agentCount(forestPlanet, 'bird') > 0, 'Aurelia harus memunculkan agen burung hantu');
const forestLoaded = deserializePlanet(serializePlanet(forestPlanet));
assert(
  forestLoaded?.planetId === 'aurelia' &&
    forestLoaded.eco.forest.seasonId === 'spring' &&
    !!forestLoaded.eco.populations.aurelia_lynx,
  'save/load Aurelia harus mempertahankan identitas, musim, dan populasi',
);
const forestTwin = createPlanet(8765, 'Aurelia Uji', 'aurelia');
for (const type of ['tree', 'grass', 'bush', 'rock', 'deer', 'fox', 'bird'] as const) {
  placeObject(forestTwin, type, [0.5, 0.4, 0.75]);
}
tickN(forestTwin, seasonCycle(forestConfig!) + 1);
assert(JSON.stringify(forestPlanet.fauna) === JSON.stringify(forestTwin.fauna), 'fauna Aurelia harus deterministik');
assert(JSON.stringify(forestPlanet.eco) === JSON.stringify(forestTwin.eco), 'ekosistem Aurelia harus deterministik');

// Cosmos is the ninth active ecosystem. It reuses the eco.sky slot for cosmic telemetry.
const cosmicConfig = ecosystemConfigFor('cosmos');
assert(cosmicConfig !== null && cosmicConfig.species.length === 10, 'Cosmos harus membawa 10 spesies');
assert(cosmicConfig.climate.seasons.length === 4, 'Cosmos harus membawa empat fase');
assert(cosmicConfig.specialSystems.includes('crystal-storage'), 'Cosmos harus membawa sistem crystal-storage');
const cosmicPlanet = createPlanet(9987, 'Cosmos Uji', 'cosmos');
assert(cosmicPlanet.planetId === 'cosmos', 'createPlanet harus mempertahankan planetId Cosmos');
assert(cosmicPlanet.environment.energy > 70, 'Cosmos harus mulai dengan energi tinggi');
assert(cosmicPlanet.eco.populations.cosmos_star_bloom, 'populasi Cosmos harus diinisialisasi');
assert(!cosmicPlanet.eco.populations.aurelia_deer && !cosmicPlanet.eco.populations.sakura_tree, 'tidak boleh ada kebocoran spesies planet lain');
for (const type of ['tree', 'grass', 'flower', 'bush', 'rock', 'deer', 'fox', 'bird'] as const) {
  assert(placeObject(cosmicPlanet, type, [0.5, 0.4, 0.75]), `${type} harus bisa ditempatkan di Cosmos`);
}
tickN(cosmicPlanet, seasonEnd(cosmicConfig!, 0));
const lightSky = { ...cosmicPlanet.eco.sky };
assert(lightSky.seasonId === 'luminous-phase', 'akhir fase pertama harus cahaya');
assert(lightSky.blossom > 60, 'fase cahaya harus menaikkan fluks cahaya');
tickN(cosmicPlanet, seasonEnd(cosmicConfig!, 1) - seasonEnd(cosmicConfig!, 0));
const resonanceSky = { ...cosmicPlanet.eco.sky };
assert(resonanceSky.seasonId === 'crystal-resonance', 'fase kedua harus resonansi kristal');
assert(resonanceSky.connectivity > lightSky.connectivity, 'resonansi kristal harus memperkuat kisi');
tickN(cosmicPlanet, seasonEnd(cosmicConfig!, 2) - seasonEnd(cosmicConfig!, 1));
const voidSky = { ...cosmicPlanet.eco.sky };
assert(voidSky.seasonId === 'void-tide', 'fase ketiga harus pasang hampa');
assert(voidSky.wind > lightSky.wind, 'pasang hampa harus menaikkan radiasi');
assert(voidSky.uplift > lightSky.uplift, 'pasang hampa harus menaikkan anomali gravitasi');
tickN(cosmicPlanet, seasonEnd(cosmicConfig!, 3) - seasonEnd(cosmicConfig!, 2));
const meteorSky = { ...cosmicPlanet.eco.sky };
assert(meteorSky.seasonId === 'meteor-shower', 'fase keempat harus hujan meteor');
assert(meteorSky.wind > resonanceSky.wind, 'hujan meteor harus menaikkan radiasi');
tickN(cosmicPlanet, 1);
assert(cosmicPlanet.eco.sky.seasonId === 'luminous-phase', 'siklus penuh harus kembali ke cahaya');
assert(cosmicPlanet.eco.sky.connectivity > 0, 'kisi kristal harus bertahan setelah siklus penuh');
assert(cosmicPlanet.eco.metrics.speciesCount === 10, 'ekosistem Cosmos harus tetap memiliki 10 spesies');
assertBoundedEco(cosmicPlanet, 'Cosmos');
const cosmicDeer = guildStatus(cosmicPlanet, 'deer');
assert(cosmicDeer !== null && cosmicDeer.speciesIds.includes('cosmos_star_rabbit'), 'guild deer Cosmos harus memetakan kelinci bintang');
assert(guildFoodSourceIds(cosmicPlanet, 'fox').includes('cosmos_crystal_grazer'), 'guild predator Cosmos harus terhubung ke food web');
assert(agentCount(cosmicPlanet, 'bird') > 0, 'Cosmos harus memunculkan agen elang astral');
assert(cosmicPlanet.fauna.discovered.includes('insect'), 'Cosmos harus pernah memunculkan agen ngengat komet');
const cosmicLoaded = deserializePlanet(serializePlanet(cosmicPlanet));
assert(
  cosmicLoaded?.planetId === 'cosmos' &&
    cosmicLoaded.eco.sky.seasonId === 'luminous-phase' &&
    !!cosmicLoaded.eco.populations.cosmos_void_panther,
  'save/load Cosmos harus mempertahankan identitas, fase, dan populasi',
);
const cosmicTwin = createPlanet(9987, 'Cosmos Uji', 'cosmos');
for (const type of ['tree', 'grass', 'flower', 'bush', 'rock', 'deer', 'fox', 'bird'] as const) {
  placeObject(cosmicTwin, type, [0.5, 0.4, 0.75]);
}
tickN(cosmicTwin, seasonCycle(cosmicConfig!) + 1);
assert(JSON.stringify(cosmicPlanet.fauna) === JSON.stringify(cosmicTwin.fauna), 'fauna Cosmos harus deterministik');
assert(JSON.stringify(cosmicPlanet.eco) === JSON.stringify(cosmicTwin.eco), 'ekosistem Cosmos harus deterministik');

const rainPlanet = createPlanet(7001, 'Hujan');
rainPlanet.weather = { type: 'rain', intensity: 0.8, remainingTicks: 5 };
simulateTick(rainPlanet);
assert(rainPlanet.events['first-rain'].status === 'complete', 'event hujan pertama harus selesai');

const stormPlanet = createPlanet(7002, 'Badai');
stormPlanet.environment.stability = 80;
for (let i = 0; i < 3; i++) {
  stormPlanet.weather = { type: 'storm', intensity: 0.6, remainingTicks: 10 };
  simulateTick(stormPlanet);
}
assert(stormPlanet.events['storm-tested'].status === 'complete', 'event uji badai harus selesai');

const droughtPlanet = createPlanet(7003, 'Kekeringan');
droughtPlanet.environment.water = 20;
simulateTick(droughtPlanet);
assert(droughtPlanet.events['drought-recovery'].progress === 1, 'kekeringan harus tercatat');
droughtPlanet.environment.water = 60;
simulateTick(droughtPlanet);
assert(droughtPlanet.events['drought-recovery'].status === 'complete', 'event pemulihan harus selesai');

const eventMigration = ensureEventState(undefined);
assert(eventMigration['first-rain'].status === 'active', 'event state lama harus dimigrasikan');

const spacingPlanet = createPlanet(7004, 'Rapat');
const stackedTypes = Array.from({ length: OBJECT_ORDER.length * 3 }, (_, index) => OBJECT_ORDER[index % OBJECT_ORDER.length]);
for (const type of stackedTypes) {
  assert(placeObject(spacingPlanet, type, [0, 1, 0]), `${type} harus tetap ditempatkan meski menumpuk`);
}
let minSpacingMargin = Infinity;
for (let i = 0; i < spacingPlanet.objects.length; i++) {
  for (let j = i + 1; j < spacingPlanet.objects.length; j++) {
    const a = spacingPlanet.objects[i];
    const b = spacingPlanet.objects[j];
    const dot = Math.max(-1, Math.min(1, a.dir[0] * b.dir[0] + a.dir[1] * b.dir[1] + a.dir[2] * b.dir[2]));
    const angle = Math.acos(dot);
    const footprint = OBJECT_DEFS[a.type].spacingRadius + OBJECT_DEFS[b.type].spacingRadius;
    minSpacingMargin = Math.min(minSpacingMargin, angle - footprint);
  }
}
assert(minSpacingMargin >= -1e-6, `soft spacing gagal: margin ${minSpacingMargin}`);
const spacingTwin = createPlanet(7004, 'Rapat');
for (const type of stackedTypes) placeObject(spacingTwin, type, [0, 1, 0]);
assert(
  JSON.stringify(spacingPlanet.objects.map((object) => object.dir)) === JSON.stringify(spacingTwin.objects.map((object) => object.dir)),
  'soft spacing harus deterministik',
);

// v0.15.4: tangga stage dan level harus benar-benar bisa dicapai.
const masteryPlan = [
  'sand', 'sand', 'rock', 'rock', 'rock', 'hill', 'lake', 'lake',
  'tree', 'tree', 'tree', 'tree', 'tree', 'tree',
  'bush', 'bush', 'bush', 'bird',
] as const;
const mastery = createPlanet(1337, 'Surga');
const masteryDirs = goldenDirs(masteryPlan.length);
for (let i = 0; i < masteryPlan.length; i++) {
  assert(placeObject(mastery, masteryPlan[i], masteryDirs[i]), `mastery: ${masteryPlan[i]} gagal ditempatkan`);
}
tickN(mastery, 100);
assert(mastery.stage === 6, `tahap tertinggi harus bisa dicapai: ${mastery.stage}`);
assert(
  (Object.keys(mastery.environment) as Array<keyof typeof mastery.environment>)
    .every((key) => mastery.environment[key] >= 0 && mastery.environment[key] <= 100),
  'environment mastery harus tetap terikat 0-100',
);
const idealPlanet = createPlanet(1338, 'Surga Ideal');
for (const type of ['sand', 'rock', 'hill', 'lake', 'tree'] as const) {
  placeObject(idealPlanet, type, [0.5, 0.4, 0.75]);
}
Object.assign(idealPlanet.environment, {
  temperature: 21,
  water: 59,
  humidity: 55,
  oxygen: 65,
  fertility: 60,
  biodiversity: 60,
  energy: 57,
  stability: 90,
});
idealPlanet.ecosystem.vegetation = 60;
assert(computeStage(idealPlanet) === 6, 'semua metrik ideal harus melaporkan stage 6');
const xpMastery = createPlanet(9001, 'Level Enam');
xpMastery.progression.xp = cumulativeXp(6);
simulateTick(xpMastery, false);
assert(xpMastery.progression.level === 6, `ambang level 6 harus terbuka: ${xpMastery.progression.level}`);

assert(WEATHER_DEFS.storm.rain > WEATHER_DEFS.rain.rain, 'badai harus lebih basah dari hujan');
assert(WEATHER_DEFS.storm.sunlight < WEATHER_DEFS.rain.sunlight, 'badai harus lebih gelap dari hujan');
assert(WEATHER_DEFS.storm.stabilityDelta < WEATHER_DEFS.rain.stabilityDelta, 'badai harus lebih mengganggu stabilitas');

const recovery = createPlanet(4242, 'Pemulihan');
recovery.weather = { type: 'storm', intensity: 0.8, remainingTicks: 1 };
simulateTick(recovery, false);
assert(recovery.weather.type === 'sunny', 'badai harus diikuti cuaca cerah');
assert(recovery.weather.remainingTicks === 2, `recovery harus 2 tick: ${recovery.weather.remainingTicks}`);
simulateTick(recovery, false);
assert(recovery.weather.type === 'sunny', 'tick recovery kedua harus tetap cerah');

assert(QUALITY.low.planetDetail < QUALITY.medium.planetDetail, 'detail low harus lebih rendah');
assert(QUALITY.medium.maxDrops < QUALITY.high.maxDrops, 'budget drop medium harus lebih kecil');
assert(QUALITY.low.wildlifeCapacity < QUALITY.medium.wildlifeCapacity, 'budget fauna low harus lebih kecil');
assert(suggestQuality(40, 'high', 'high') === 'medium', 'p95 tinggi harus menurunkan kualitas');
assert(suggestQuality(40, 'low', 'low') === null, 'kualitas low tidak bisa turun lagi');
assert(suggestQuality(12, 'medium', 'high') === 'high', 'p95 rendah boleh naik sampai baseline');
assert(suggestQuality(12, 'medium', 'medium') === null, 'tidak boleh naik melewati baseline');

// v0.17.0: kurva 100 level dan 10 era harus deterministik.
assert(xpStep(1) === 100, 'XP 1→2 harus 100');
assert(xpStep(10) === 730, 'XP 10→11 harus 730');
assert(xpStep(25) === 3580, 'XP 25→26 harus 3580 sesuai rumus');
assert(xpStep(50) === 13330, 'XP 50→51 harus 13330 sesuai rumus');
assert(xpStep(99) === 50570, 'XP 99→100 harus 50570 sesuai rumus');
assert(levelForXp(0) === 1, 'XP nol harus level 1');
assert(levelForXp(cumulativeXp(MAX_LEVEL)) === MAX_LEVEL, 'ambang terakhir harus level 100');
assert(cumulativeXp(MAX_LEVEL) < 0xffffffff, 'total XP harus muat di u32 DNA');
for (let level = 2; level <= MAX_LEVEL; level++) {
  assert(xpStep(level) > xpStep(level - 1), `kurva XP harus naik di level ${level}`);
}
assert(eraForLevel(1).name === 'Genesis', 'era 1 harus Genesis');
assert(eraForLevel(10).name === 'Genesis', 'level 10 masih Genesis');
assert(eraForLevel(11).name === 'Primordial', 'level 11 harus Primordial');
assert(eraForLevel(100).name === 'Cosmic Age', 'level 100 harus Cosmic Age');

const legacyLevel6 = migratePlanet({
  ...JSON.parse(JSON.stringify(createPlanet(4242, 'Save Lama'))),
  progression: { level: 6, xp: 260, unlockedObjects: [] },
});
assert(legacyLevel6 && legacyLevel6.progression.level === 6, 'migrasi tidak boleh menurunkan level lama');
assert(
  legacyLevel6 && legacyLevel6.progression.xp >= cumulativeXp(6),
  'migrasi harus menaikkan XP ke ambang level lama',
);

// v0.17.0: katalog campaign, runtime misi, dan batas era terkunci.
assert(CAMPAIGN.length === 100, 'katalog campaign harus 100 misi');
assert(CAMPAIGN_TARGETS.length === 100, 'copy campaign harus 100 entri');
assert(new Set(CAMPAIGN.map((mission) => mission.id)).size === 100, 'id misi harus unik');
assert(CAMPAIGN.every((mission, index) => mission.level === index + 1), 'level misi harus 1..100');
assert(CAMPAIGN_BY_LEVEL[0].id === 'era1-01', 'misi pertama harus era1-01');
assert(campaignMissionForLevel(100).id === 'era10-10', 'misi terakhir harus era10-10');
assert(CAMPAIGN.filter((mission) => mission.locked).length === 40, 'misi 61-100 harus terkunci');
assert(Object.keys(MISSION_TYPE_LABELS).length === 6, 'harus ada 6 tipe quest');
assert(campaignCopy(61).note.includes('Terkunci'), 'copy misi terkunci harus jelas');

const campaignPlanet = createPlanet(5150, 'Kampanye');
assert(campaignPlanet.mission.id === 'era1-01', 'planet baru harus memakai misi era1-01');
tickN(campaignPlanet, 3);
assert(campaignPlanet.progression.xp >= 100, 'misi pertama harus memberi 100 XP dalam 3 tick');
assert(campaignPlanet.progression.level >= 2, 'reward misi pertama harus membuka level 2');
assert(campaignPlanet.mission.id === 'era1-02', 'level 2 harus otomatis mengaktifkan misi berikutnya');
const nextMissionPlanet = createPlanet(5151, 'Lanjut Misi');
nextMissionPlanet.progression.level = 2;
syncCampaignMission(nextMissionPlanet);
assert(nextMissionPlanet.mission.id === 'era1-02', 'level 2 harus mengaktifkan misi era1-02');

const oceanProgressPlanet = createPlanet(5152, 'Progres Laut');
assert(placeObject(oceanProgressPlanet, 'ocean', [0, 1, 0]), 'misi laut: ocean harus terpasang');
assert(
  missionProgress(oceanProgressPlanet, campaignMissionForLevel(41)) >= 1,
  'misi level 41 harus progres dari objek ocean',
);

const lockedPlanet = createPlanet(5153, 'Era Terkunci');
lockedPlanet.progression.level = 61;
syncCampaignMission(lockedPlanet);
assert(lockedPlanet.mission.id === 'era7-01', 'level 61 harus memakai misi era7-01');
assert(completeCampaignMission(lockedPlanet) === null, 'misi terkunci tidak boleh memberi reward');

console.log('PASS: sim');
