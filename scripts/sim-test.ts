import { QUALITY, suggestQuality } from '../src/app/quality.ts';
import { ensureEventState } from '../src/content/missions.ts';
import { SPECIES_ORDER } from '../src/content/species.ts';
import { PLANET_CONFIGS, PLANET_IDS } from '../src/content/planets/index.ts';
import { decodePlanetDna, encodePlanetDna } from '../src/sim/dna.ts';
import { ecosystemConfigFor, guildAgentCapacity, guildFoodSourceIds, guildStatus, isSupportedPlanet } from '../src/sim/eco/guilds.ts';
import { HabitatManager } from '../src/sim/eco/habitat.ts';
import { validateAllPlanetConfigs, speciesRegistry } from '../src/sim/eco/registry.ts';
import { createEcoState } from '../src/sim/eco/state.ts';
import {
  createPlanet,
  decodeDna,
  encodeDna,
  placeObject,
  simulateTick,
} from '../src/sim/engine.ts';
import { migratePlanet, CURRENT_SCHEMA_VERSION } from '../src/sim/migrate.ts';
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
assert(planet.progression.level >= 3, `level terlalu rendah: ${planet.progression.level}`);
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
assert(isSupportedPlanet('dune') && !isSupportedPlanet('glaciere'), 'hanya Terra dan Dune yang aktif saat ini');
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

assert(QUALITY.low.planetDetail < QUALITY.medium.planetDetail, 'detail low harus lebih rendah');
assert(QUALITY.medium.maxDrops < QUALITY.high.maxDrops, 'budget drop medium harus lebih kecil');
assert(QUALITY.low.wildlifeCapacity < QUALITY.medium.wildlifeCapacity, 'budget fauna low harus lebih kecil');
assert(suggestQuality(40, 'high', 'high') === 'medium', 'p95 tinggi harus menurunkan kualitas');
assert(suggestQuality(40, 'low', 'low') === null, 'kualitas low tidak bisa turun lagi');
assert(suggestQuality(12, 'medium', 'high') === 'high', 'p95 rendah boleh naik sampai baseline');
assert(suggestQuality(12, 'medium', 'medium') === null, 'tidak boleh naik melewati baseline');

console.log('PASS: sim');
