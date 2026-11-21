import { EVENT_DEFS } from '../content/missions';
import { OBJECT_ORDER } from '../content/objects';
import { SPECIES_INDEX, SPECIES_ORDER } from '../content/species';
import { BIOMES } from './biome';
import { PLANET_IDS } from '../content/planets/ids';
import { createPlanet, decodeDna as decodeLegacyDna, planetNameFromSeed, unlockedForLevel } from './engine';
import { migratePlanet } from './migrate';
import { createFauna } from './wildlife';
import type {
  Biome,
  EcoKey,
  Environment,
  EnvKey,
  FaunaState,
  ObjectType,
  PlanetState,
  PlacedObject,
  SpeciesId,
  TerrainConfig,
  WildlifeAgent,
  WeatherState,
  WeatherType,
} from './types';

const BASE32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const ENV_KEYS: EnvKey[] = [
  'temperature', 'water', 'humidity', 'oxygen',
  'fertility', 'biodiversity', 'energy', 'stability',
];
const ECO_KEYS: EcoKey[] = ['vegetation', 'wildlife', 'population', 'health'];
const ATM_KEYS: Array<keyof PlanetState['atmosphere']> = ['cloudCoverage', 'windStrength', 'precipitation'];
const WEATHER_TYPES: WeatherType[] = ['sunny', 'rain', 'snow', 'storm'];
const SEED_KIND = 1;
const FULL_KIND = 2;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export interface PlanetDnaCodes {
  short: string;
  full: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function quantize(value: number, min: number, max: number): number {
  return Math.round(clamp((value - min) / (max - min), 0, 1) * 65535);
}

function dequantize(value: number, min: number, max: number): number {
  return min + (value / 65535) * (max - min);
}

function crc16(bytes: Uint8Array): number {
  let crc = 0xffff;
  for (const byte of bytes) {
    crc ^= byte << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc & 0xffff;
}

class ByteWriter {
  private readonly bytes: number[] = [];

  u8(value: number): this {
    this.bytes.push(value & 0xff);
    return this;
  }

  i16(value: number): this {
    const v = Math.round(clamp(value, -32768, 32767));
    this.bytes.push(v & 0xff, (v >> 8) & 0xff);
    return this;
  }

  u16(value: number): this {
    const v = Math.round(clamp(value, 0, 65535));
    this.bytes.push(v & 0xff, (v >> 8) & 0xff);
    return this;
  }

  u32(value: number): this {
    const v = value >>> 0;
    this.bytes.push(v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff);
    return this;
  }

  string(value: string): this {
    const data = encoder.encode(value.slice(0, 255));
    this.u8(data.length);
    for (const byte of data) this.u8(byte);
    return this;
  }

  payload(): Uint8Array {
    return Uint8Array.from(this.bytes);
  }
}

class ByteReader {
  private offset = 0;

  constructor(private readonly data: Uint8Array) {}

  get remaining(): number {
    return this.data.length - this.offset;
  }

  private take(count: number): void {
    if (this.offset + count > this.data.length) throw new Error('DNA terlalu pendek');
    this.offset += count;
  }

  u8(): number {
    this.take(1);
    return this.data[this.offset - 1];
  }

  i16(): number {
    const low = this.u8();
    const high = this.u8();
    const value = low | (high << 8);
    return value > 32767 ? value - 65536 : value;
  }

  u16(): number {
    return this.u8() | (this.u8() << 8);
  }

  u32(): number {
    return (this.u8() | (this.u8() << 8) | (this.u8() << 16) | (this.u8() << 24)) >>> 0;
  }

  string(): string {
    const length = this.u8();
    this.take(length);
    return decoder.decode(this.data.subarray(this.offset - length, this.offset));
  }
}

function bytesToBase32(bytes: Uint8Array): string {
  let value = 0;
  let bits = 0;
  let out = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += BASE32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
    value &= 0xffff;
  }
  if (bits > 0) out += BASE32[(value << (5 - bits)) & 31];
  return out;
}

function base32ToBytes(text: string): Uint8Array {
  let value = 0;
  let bits = 0;
  const bytes: number[] = [];
  for (const char of text) {
    const index = BASE32.indexOf(char);
    if (index < 0) throw new Error('Karakter DNA tidak valid');
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
    value &= 0xffff;
  }
  return Uint8Array.from(bytes);
}

function withChecksum(payload: Uint8Array): Uint8Array {
  const checksum = crc16(payload);
  const result = new Uint8Array(payload.length + 2);
  result.set(payload);
  result[payload.length] = (checksum >> 8) & 0xff;
  result[payload.length + 1] = checksum & 0xff;
  return result;
}

function formatCode(bytes: Uint8Array): string {
  const body = bytesToBase32(bytes);
  const groups: string[] = [];
  for (let i = 0; i < body.length; i += 4) groups.push(body.slice(i, i + 4));
  return `TPF-${groups.join('-')}`;
}

function verifiedBytes(code: string): Uint8Array {
  const normalized = code
    .trim()
    .replace(/^TPF-/i, '')
    .replace(/[-\s]/g, '')
    .toUpperCase()
    .replace(/I/g, '1')
    .replace(/L/g, '1')
    .replace(/O/g, '0');
  const bytes = base32ToBytes(normalized);
  if (bytes.length < 3) throw new Error('Kode DNA terlalu pendek');
  const payload = bytes.subarray(0, bytes.length - 2);
  const expected = (bytes[bytes.length - 2] << 8) | bytes[bytes.length - 1];
  if (crc16(payload) !== expected) throw new Error('Checksum DNA tidak cocok');
  return bytes;
}

function encodeShort(state: PlanetState): string {
  const writer = new ByteWriter();
  writer.u8(SEED_KIND).u32(state.seed);
  return formatCode(withChecksum(writer.payload()));
}

function encodeFull(state: PlanetState, includePlanetId = true): string {
  const writer = new ByteWriter();
  writer.u8(FULL_KIND).u32(state.seed);
  writer.string(state.name);
  writer.u8(Math.max(0, BIOMES.indexOf(state.biome)));
  writer
    .u16(quantize(state.terrainConfig.amplitude, 0, 0.2))
    .u16(quantize(state.terrainConfig.frequency, 0, 3))
    .u16(quantize(state.terrainConfig.ridge, 0, 2))
    .u16(quantize(state.terrainConfig.seaLevel, 0.8, 1.2));
  for (const key of ENV_KEYS) writer.u16(quantize(state.environment[key], -20, 120));
  for (const key of ENV_KEYS) writer.u16(quantize(state.startingEnvironment[key], -20, 120));
  for (const key of ECO_KEYS) writer.u16(quantize(state.ecosystem[key], 0, 200));
  for (const key of ATM_KEYS) writer.u16(quantize(state.atmosphere[key], 0, 100));
  writer
    .u8(Math.max(0, WEATHER_TYPES.indexOf(state.weather.type)))
    .u16(quantize(state.weather.intensity, 0, 1))
    .u16(quantize(state.weather.remainingTicks, 0, 1000));
  writer.u8(clamp(state.progression.level, 1, 255)).u32(clamp(state.progression.xp, 0, 0xffffffff));
  writer.u8(state.mission.status === 'complete' ? 1 : 0).u16(quantize(state.mission.holdTicks, 0, 1000));
  writer.u8(Math.min(255, EVENT_DEFS.length));
  for (const def of EVENT_DEFS) {
    const progress = state.events?.[def.id] ?? { status: 'active', progress: 0 };
    writer.u8(progress.status === 'complete' ? 1 : 0).u16(quantize(progress.progress, 0, def.target));
  }
  writer.string(state.warning ?? '');
  writer.u8(clamp(state.stage, 0, 255));
  writer.u16(Math.min(65535, state.objects.length));
  for (const object of state.objects) {
    const typeIndex = OBJECT_ORDER.indexOf(object.type);
    writer.u8(Math.max(0, typeIndex));
    writer.i16(object.dir[0] * 32767).i16(object.dir[1] * 32767).i16(object.dir[2] * 32767);
    writer.u16(quantize(object.scale, 0.5, 1.5));
    writer.u16(quantize(object.rotation, 0, Math.PI * 2));
  }
  const fauna = state.fauna ?? createFauna();
  writer.u16(Math.min(65535, fauna.agents.length));
  for (const agent of fauna.agents) {
    writer.u8(SPECIES_INDEX[agent.species] ?? 0);
    writer.i16(agent.dir[0] * 32767).i16(agent.dir[1] * 32767).i16(agent.dir[2] * 32767);
    writer.u16(quantize(agent.energy, 0, 100));
    writer.u16(clamp(agent.age, 0, 65535));
    writer.u16(clamp(agent.cooldown, 0, 65535));
    writer.u16(clamp(agent.generation, 0, 65535));
    writer.string(agent.id);
  }
  const mask = (species: SpeciesId[]): number =>
    species.reduce((value, id) => value | (1 << (SPECIES_INDEX[id] ?? 0)), 0);
  writer.u16(mask(fauna.discovered)).u16(mask(fauna.extinct));
  for (const species of SPECIES_ORDER) writer.u8(clamp(fauna.zeroTicks[species] ?? 0, 0, 255));
  writer.u32(clamp(fauna.nextId, 0, 0xffffffff));

  writer.u32(clamp(state.tick, 0, 0xffffffff));
  if (includePlanetId) writer.u8(Math.max(0, PLANET_IDS.indexOf(state.planetId)));
  return formatCode(withChecksum(writer.payload()));
}

export function encodePlanetDna(state: PlanetState): PlanetDnaCodes {
  return { short: encodeShort(state), full: encodeFull(state) };
}

/** Legacy v2 fixture writer: same payload without the trailing planet id. */
export function encodePlanetDnaLegacy(state: PlanetState): string {
  return encodeFull(state, false);
}

function decodeFull(bytes: Uint8Array): PlanetState | null {
  try {
    const reader = new ByteReader(bytes);
    const seed = reader.u32() >>> 0;
    const name = reader.string();
    const biome = BIOMES[reader.u8()] ?? 'barren';
    const terrain: TerrainConfig = {
      amplitude: dequantize(reader.u16(), 0, 0.2),
      frequency: dequantize(reader.u16(), 0, 3),
      ridge: dequantize(reader.u16(), 0, 2),
      seaLevel: dequantize(reader.u16(), 0.8, 1.2),
    };
    const environment = Object.fromEntries(ENV_KEYS.map((key) => [key, dequantize(reader.u16(), -20, 120)])) as Environment;
    const startingEnvironment = Object.fromEntries(
      ENV_KEYS.map((key) => [key, dequantize(reader.u16(), -20, 120)]),
    ) as Environment;
    const ecosystem = Object.fromEntries(
      ECO_KEYS.map((key) => [key, dequantize(reader.u16(), 0, 200)]),
    ) as unknown as PlanetState['ecosystem'];
    const atmosphere = Object.fromEntries(
      ATM_KEYS.map((key) => [key, dequantize(reader.u16(), 0, 100)]),
    ) as unknown as PlanetState['atmosphere'];
    const weather: WeatherState = {
      type: WEATHER_TYPES[reader.u8()] ?? 'sunny',
      intensity: dequantize(reader.u16(), 0, 1),
      remainingTicks: dequantize(reader.u16(), 0, 1000),
    };
    const level = reader.u8();
    const xp = reader.u32();
    const missionStatus = reader.u8() === 1 ? 'complete' : 'active';
    const holdTicks = dequantize(reader.u16(), 0, 1000);
    const eventCount = reader.u8();
    const events: Record<string, { status: 'active' | 'complete'; progress: number }> = {};
    for (let i = 0; i < eventCount; i++) {
      const def = EVENT_DEFS[i];
      if (!def) break;
      events[def.id] = {
        status: reader.u8() === 1 ? 'complete' : 'active',
        progress: dequantize(reader.u16(), 0, def.target),
      };
    }
    const warning = reader.string() || null;
    const stage = reader.u8();
    const objectCount = reader.u16();
    const objects: PlacedObject[] = [];
    for (let i = 0; i < objectCount; i++) {
      const type = OBJECT_ORDER[reader.u8()] as ObjectType | undefined;
      if (!type) return null;
      const dir: [number, number, number] = [reader.i16() / 32767, reader.i16() / 32767, reader.i16() / 32767];
      objects.push({
        id: `obj-dna-${i}`,
        type,
        dir,
        scale: dequantize(reader.u16(), 0.5, 1.5),
        rotation: dequantize(reader.u16(), 0, Math.PI * 2),
      });
    }
    const fauna: FaunaState = createFauna();
    const agentCount = reader.u16();
    for (let i = 0; i < agentCount; i++) {
      const species = SPECIES_ORDER[reader.u8()];
      if (!species) return null;
      const dir: [number, number, number] = [reader.i16() / 32767, reader.i16() / 32767, reader.i16() / 32767];
      const energy = dequantize(reader.u16(), 0, 100);
      const age = reader.u16();
      const cooldown = reader.u16();
      const generation = reader.u16();
      const id = reader.string() || `fauna-${i}`;
      const agent: WildlifeAgent = { id, species, dir, energy, age, cooldown, generation };
      fauna.agents.push(agent);
    }
    const discoveredMask = reader.u16();
    const extinctMask = reader.u16();
    const fromMask = (mask: number): SpeciesId[] =>
      SPECIES_ORDER.filter((species) => (mask & (1 << (SPECIES_INDEX[species] ?? 0))) !== 0);
    fauna.discovered = fromMask(discoveredMask);
    fauna.extinct = fromMask(extinctMask);
    for (const species of SPECIES_ORDER) fauna.zeroTicks[species] = reader.u8();
    fauna.nextId = reader.u32();

    const tick = reader.u32();
    const planetId = reader.remaining > 0 ? PLANET_IDS[reader.u8()] ?? 'terra' : 'terra';
    if (reader.remaining !== 0) return null;

    const planet = migratePlanet({
      planetId,
      seed,
      name,
      tick,
      objects,
      environment,
      startingEnvironment,
      terrainConfig: terrain,
      biome: biome as Biome,
      fauna,
      ecosystem,
      atmosphere,
      weather,
      progression: { level, xp, unlockedObjects: unlockedForLevel(level) },
      mission: { id: 'mission-hijaukan', status: missionStatus, holdTicks },
      events,
      warning,
      stage,
    });
    if (planet) planet.progression.unlockedObjects = unlockedForLevel(level);
    return planet;
  } catch {
    return null;
  }
}

export function decodePlanetDna(code: string): PlanetState | null {
  if (!code || !code.trim()) return null;
  if (!/^TPF-/i.test(code.trim())) return decodeLegacyDna(code);

  try {
    const bytes = verifiedBytes(code);
    const kind = bytes[0];
    if (kind === SEED_KIND) {
      if (bytes.length !== 7) return null;
      const reader = new ByteReader(bytes.subarray(1, 5));
      const seed = reader.u32() >>> 0;
      return createPlanet(seed, planetNameFromSeed(seed));
    }
    if (kind !== FULL_KIND) return null;
    return decodeFull(bytes.subarray(1, bytes.length - 2));
  } catch {
    return null;
  }
}
