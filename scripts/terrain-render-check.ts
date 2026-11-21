import { getAttributeData, IcosahedronGeometry } from '@pixi/3d';
import { PLANET_CONFIGS } from '../src/content/planets';
import { normalizeTerrainForRender, terrainRadius } from '../src/render/terrain';
import { DEFAULT_TERRAIN_CONFIG } from '../src/sim/types';

function assert(condition: unknown, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
}

const base = new IcosahedronGeometry({ radius: 1, detail: 4 });
const source = getAttributeData(base, 'aPosition', 3);
const directions: Array<[number, number, number]> = [];
for (let i = 0; i < source.length; i += 3) {
  const length = Math.hypot(source[i], source[i + 1], source[i + 2]) || 1;
  directions.push([source[i] / length, source[i + 1] / length, source[i + 2] / length]);
}

const seeds = [1, 12345, 0x7fffffff, 0xffffffff];
const configs = [{ id: 'default', terrain: DEFAULT_TERRAIN_CONFIG }, ...PLANET_CONFIGS];
const report: Record<string, { min: number; max: number; amplitude: number; frequency: number; seaLevel: number; hash: number }> = {};

for (const config of configs) {
  const terrain = normalizeTerrainForRender(config.terrain);
  const repeated = normalizeTerrainForRender(terrain);
  for (const key of ['amplitude', 'frequency', 'ridge', 'seaLevel'] as const) {
    assert(Math.abs(terrain[key] - repeated[key]) < 1e-9, `${config.id}: normalisasi tidak idempoten pada ${key}`);
  }
  assert(terrain.amplitude >= 0.012 && terrain.amplitude <= 0.06, `${config.id}: amplitude render di luar rentang`);
  assert(terrain.frequency >= 0.6 && terrain.frequency <= 2.4, `${config.id}: frequency render di luar rentang`);
  assert(terrain.seaLevel >= 0.92 && terrain.seaLevel <= 1.08, `${config.id}: seaLevel render di luar rentang`);
  assert(terrain.ridge >= 0 && terrain.ridge <= terrain.amplitude * 0.6 + 1e-9, `${config.id}: ridge render terlalu besar`);

  let min = Infinity;
  let max = -Infinity;
  let hash = 2166136261;
  for (const seed of seeds) {
    for (const [nx, ny, nz] of directions) {
      const radius = terrainRadius(nx, ny, nz, seed, terrain);
      assert(Number.isFinite(radius), `${config.id}: radius tidak finite`);
      min = Math.min(min, radius);
      max = Math.max(max, radius);
      hash = (Math.imul(hash, 31) + Math.round(radius * 100000)) >>> 0;
    }
  }
  assert(min >= 0.85, `${config.id}: radius minimum ${min.toFixed(3)} terlalu kecil`);
  assert(max <= 1.15, `${config.id}: radius maksimum ${max.toFixed(3)} terlalu besar`);
  assert(max + 0.5 < 2.2, `${config.id}: planet bisa menyentuh kamera saat zoom maksimal`);

  report[config.id] = {
    min: +min.toFixed(3),
    max: +max.toFixed(3),
    amplitude: +terrain.amplitude.toFixed(4),
    frequency: +terrain.frequency.toFixed(3),
    seaLevel: +terrain.seaLevel.toFixed(3),
    hash,
  };
}

console.log(JSON.stringify(report, null, 2));
console.log('PASS: terrain render');
