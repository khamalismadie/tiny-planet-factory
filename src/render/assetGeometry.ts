import {
  ConeGeometry,
  CylinderGeometry,
  Geometry3D,
  IcosahedronGeometry,
  SphereGeometry,
  getAttributeData,
  srgbToLinear,
} from '@pixi/3d';
import { OBJECT_DEFS, OBJECT_ORDER } from '../content/objects';
import { SPECIES_ORDER } from '../content/species';
import type { ObjectType, SpeciesId } from '../sim/types';

export interface AssetGeometry {
  geometry: Geometry3D;
  /** Small local-space lift applied after contact alignment, to avoid z-fighting. */
  baseLift: number;
}

interface Part {
  geometry: Geometry3D;
  color: number;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotationY?: number;
  rotationZ?: number;
}

const PALETTE = {
  bark: 0x8a5a34,
  leafDark: 0x2f8a4f,
  leaf: 0x4fb765,
  leafLight: 0x7ed889,
  stone: 0xa8a094,
  stoneLight: 0xc8c0b2,
  stoneDark: 0x7c756b,
  sand: 0xf0d28b,
  sandLight: 0xffe8ae,
  water: 0x36a7e8,
  waterLight: 0x8adaf7,
  lake: 0x4fd0e8,
  snow: 0xf4f9ff,
  petal: 0xf294c0,
  petalLight: 0xffb7d6,
  pollen: 0xffd75e,
  stem: 0x5caf4f,
  deer: 0xd08a4f,
  deerLight: 0xf0c493,
  fox: 0xf4793c,
  foxLight: 0xffdcc2,
  bird: 0x5fd4f5,
  birdLight: 0xc8f0fb,
  beak: 0xffb43f,
  fish: 0x42c2df,
  fishLight: 0xa8edf2,
  insect: 0x6fd468,
  insectLight: 0xe6f58b,
  shadowCanopy: 0x3a5b4a,
  shadowSoil: 0x4a5542,
  shadowStone: 0x4e5254,
  shadowWater: 0x2b5f7a,
  leafPine: 0x34885f,
  leafSakura: 0xf4aecd,
  leafSakuraLight: 0xffd0e2,
  sunflower: 0xffd04d,
  sunflowerLight: 0xffe58a,
  lotus: 0xf0a2cf,
  lavender: 0xa98be0,
  lavenderLight: 0xd0b8f2,
  moss: 0x55a368,
  arctic: 0xf0f6fa,
  fennec: 0xf0cd94,
  parrot: 0x4fd6a0,
  swallow: 0x5485b8,
  koi: 0xf28a5e,
  butterfly: 0xd49ae8,
  crystal: 0xa48cf0,
  crystalLight: 0xcfbffa,
  ice: 0xb8e8fb,
  storm: 0x5a86a8,
  lava: 0xf36c3f,
  ash: 0x5a5a64,
};

function linearColor(hex: number): [number, number, number] {
  return [
    srgbToLinear(((hex >> 16) & 255) / 255),
    srgbToLinear(((hex >> 8) & 255) / 255),
    srgbToLinear((hex & 255) / 255),
  ];
}

function rotateY(x: number, z: number, angle: number): [number, number] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c + z * s, -x * s + z * c];
}

function rotateZ(x: number, y: number, angle: number): [number, number] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c - y * s, x * s + y * c];
}

function hash01(a: number, b: number): number {
  let h = Math.imul(a + 1, 374761393) ^ Math.imul(b + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Flat contact patch baked into geometry: grounds the prop without a new draw pass. */
function discGeometry(radius: number, segments: number): Geometry3D {
  const positions = new Float32Array((segments + 1) * 3);
  const normals = new Float32Array((segments + 1) * 3);
  const uvs = new Float32Array((segments + 1) * 2);
  const indices = new Uint32Array(segments * 3);
  normals[1] = 1;
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const offset = (i + 1) * 3;
    positions[offset] = Math.cos(angle) * radius;
    positions[offset + 1] = 0;
    positions[offset + 2] = Math.sin(angle) * radius;
    normals[offset + 1] = 1;
    indices[i * 3] = 0;
    indices[i * 3 + 1] = ((i + 1) % segments) + 1;
    indices[i * 3 + 2] = i + 1;
  }
  return new Geometry3D({ positions, normals, uvs, indices });
}

/** Cone with a shoulder ring, so each facet reads as a bevel instead of a smooth cone. */
function bevelConeGeometry(radius: number, height: number, segments: number): Geometry3D {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const push = (x: number, y: number, z: number, nx: number, ny: number, nz: number): number => {
    const index = positions.length / 3;
    positions.push(x, y, z);
    normals.push(nx, ny, nz);
    uvs.push(0, 0);
    return index;
  };
  const baseY = -height / 2;
  const shoulderY = baseY + height * 0.18;
  const baseRadius = radius * 0.72;
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    const c0 = Math.cos(a0);
    const s0 = Math.sin(a0);
    const c1 = Math.cos(a1);
    const s1 = Math.sin(a1);
    const b0 = push(c0 * baseRadius, baseY, s0 * baseRadius, c0, 0.2, s0);
    const b1 = push(c1 * baseRadius, baseY, s1 * baseRadius, c1, 0.2, s1);
    const p0 = push(c0 * radius, shoulderY, s0 * radius, c0 * 0.8, 0.6, s0 * 0.8);
    const p1 = push(c1 * radius, shoulderY, s1 * radius, c1 * 0.8, 0.6, s1 * 0.8);
    const apex = push(0, height / 2, 0, 0, 1, 0);
    indices.push(b0, p1, b1, b0, p0, p1, p0, apex, p1);
  }
  return new Geometry3D({
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint32Array(indices),
  });
}

/**
 * Merges every part into one indexed geometry with per-face vertex colors.
 * Faces are deliberately unshared so flat shading and facet tint stay stable.
 */
function mergeParts(parts: Part[], baseLift: number): AssetGeometry {
  const prepared = parts.map((part) => ({
    part,
    positions: getAttributeData(part.geometry, 'aPosition', 3),
    normals: getAttributeData(part.geometry, 'aNormal', 3),
    uvs: getAttributeData(part.geometry, 'aUV', 2),
    sourceIndices: part.geometry.indices
      ? new Uint32Array(part.geometry.indices)
      : null,
  }));

  let vertexCount = 0;
  for (const item of prepared) {
    vertexCount += item.sourceIndices
      ? item.sourceIndices.length
      : item.positions.length / 3;
  }

  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const colors = new Float32Array(vertexCount * 4);
  const indices = new Uint32Array(vertexCount);
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  let out = 0;

  for (let p = 0; p < prepared.length; p++) {
    const item = prepared[p];
    const [px, py, pz] = item.part.position ?? [0, 0, 0];
    const [sx, sy, sz] = item.part.scale ?? [1, 1, 1];
    const rotationY = item.part.rotationY ?? 0;
    const rotationZ = item.part.rotationZ ?? 0;
    const [cr, cg, cb] = linearColor(item.part.color);
    const faceCount = item.sourceIndices
      ? item.sourceIndices.length / 3
      : item.positions.length / 9;

    const transform = (index: number) => {
      const source = index * 3;
      let x = item.positions[source] * sx;
      let y = item.positions[source + 1] * sy;
      let z = item.positions[source + 2] * sz;
      [x, y] = rotateZ(x, y, rotationZ);
      [x, z] = rotateY(x, z, rotationY);
      let nx = item.normals[source] / sx;
      let ny = item.normals[source + 1] / sy;
      let nz = item.normals[source + 2] / sz;
      [nx, ny] = rotateZ(nx, ny, rotationZ);
      [nx, nz] = rotateY(nx, nz, rotationY);
      const length = Math.hypot(nx, ny, nz) || 1;
      return {
        x: x + px,
        y: y + py,
        z: z + pz,
        nx: nx / length,
        ny: ny / length,
        nz: nz / length,
        u: item.uvs[index * 2] ?? 0,
        v: item.uvs[index * 2 + 1] ?? 0,
      };
    };

    for (let face = 0; face < faceCount; face++) {
      const src = [0, 1, 2].map((corner) => {
        const index = item.sourceIndices
          ? item.sourceIndices[face * 3 + corner]
          : face * 3 + corner;
        return transform(index);
      });
      const upward = (src[0].ny + src[1].ny + src[2].ny) / 3;
      const facet = hash01(p, face);
      const shade = clamp(0.94 + upward * 0.08 + (facet - 0.5) * 0.06, 0.82, 1.1);
      for (const vertex of src) {
        positions[out * 3] = vertex.x;
        positions[out * 3 + 1] = vertex.y;
        positions[out * 3 + 2] = vertex.z;
        normals[out * 3] = vertex.nx;
        normals[out * 3 + 1] = vertex.ny;
        normals[out * 3 + 2] = vertex.nz;
        uvs[out * 2] = vertex.u;
        uvs[out * 2 + 1] = vertex.v;
        colors[out * 4] = cr * shade;
        colors[out * 4 + 1] = cg * shade;
        colors[out * 4 + 2] = cb * shade;
        colors[out * 4 + 3] = 1;
        indices[out] = out;
        minY = Math.min(minY, vertex.y);
        maxY = Math.max(maxY, vertex.y);
        out++;
      }
    }
  }

  const heightSpan = Math.max(1e-6, maxY - minY);
  for (let v = 0; v < vertexCount; v++) {
    const t = (positions[v * 3 + 1] - minY) / heightSpan;
    const heightShade = 0.9 + t * 0.12;
    colors[v * 4] *= heightShade;
    colors[v * 4 + 1] *= heightShade;
    colors[v * 4 + 2] *= heightShade;
    // Base of every asset sits at local y = 0, so renderers only need a tiny lift.
    positions[v * 3 + 1] -= minY;
  }

  return {
    geometry: new Geometry3D({ positions, normals, uvs, colors, indices }),
    baseLift,
  };
}

const cone = (
  radius: number,
  height: number,
  radialSegments: number,
  color: number,
  position?: [number, number, number],
  scale?: [number, number, number],
  rotationY?: number,
  rotationZ?: number,
): Part => ({
  geometry: new ConeGeometry({ radius, height, radialSegments }),
  color,
  position,
  scale,
  rotationY,
  rotationZ,
});

const bevelCone = (
  radius: number,
  height: number,
  radialSegments: number,
  color: number,
  position?: [number, number, number],
  scale?: [number, number, number],
  rotationY?: number,
  rotationZ?: number,
): Part => ({
  geometry: bevelConeGeometry(radius, height, radialSegments),
  color,
  position,
  scale,
  rotationY,
  rotationZ,
});

const cylinder = (
  radiusTop: number,
  radiusBottom: number,
  height: number,
  radialSegments: number,
  color: number,
  position?: [number, number, number],
  scale?: [number, number, number],
  rotationZ?: number,
): Part => ({
  geometry: new CylinderGeometry({ radiusTop, radiusBottom, height, radialSegments }),
  color,
  position,
  scale,
  rotationZ,
});

const sphere = (
  radius: number,
  widthSegments: number,
  heightSegments: number,
  color: number,
  position?: [number, number, number],
  scale?: [number, number, number],
): Part => ({
  geometry: new SphereGeometry({ radius, widthSegments, heightSegments }),
  color,
  position,
  scale,
});

const rock = (
  radius: number,
  color: number,
  position?: [number, number, number],
  scale?: [number, number, number],
  detail = 0,
): Part => ({
  geometry: new IcosahedronGeometry({ radius, detail }),
  color,
  position,
  scale,
});

const shadow = (radius: number, color: number): Part => ({
  geometry: discGeometry(radius * 0.9, 10),
  color,
  position: [0, 0.0004, 0],
});

function defineAsset(
  parts: Part[],
  baseLift = 0.004,
  contact?: { radius: number; color: number },
): AssetGeometry {
  const all = contact ? [...parts, shadow(contact.radius, contact.color)] : parts;
  return mergeParts(all, baseLift);
}

/** Widen only X/Z. Keeping Y untouched preserves the audited height target. */
function widen(part: Part, factor: number): Part {
  if (factor === 1) return part;
  const [x, y, z] = part.position ?? [0, 0, 0];
  const [sx, sy, sz] = part.scale ?? [1, 1, 1];
  return {
    ...part,
    position: [x * factor, y, z * factor],
    scale: [sx * factor, sy, sz * factor],
  };
}

function buildGrass(variant = 0): AssetGeometry {
  const colors = [
    [0x7fb44e, 0x9acb62, 0x6fa543],
    [0xb5a24e, 0xd0bb63, 0x8f8a43],
    [0x5f9b74, 0x8fc09a, 0x487f63],
  ][variant] ?? [0x7fb44e, 0x9acb62, 0x6fa543];
  const w = [1, 0.88, 1.04][variant] ?? 1;
  return defineAsset([
    widen(cone(0.012, 0.1, 4, colors[0], [-0.018, 0.05, 0], undefined, undefined, 0.22), w),
    widen(cone(0.012, 0.11, 4, colors[1], [0.018, 0.055, 0.008], undefined, undefined, -0.2), w),
    widen(cone(0.011, 0.09, 4, colors[2], [0, 0.045, -0.02], undefined, undefined, 0.12), w),
  ], 0.004, { radius: 0.008, color: PALETTE.shadowCanopy });
}

function buildSand(variant = 0): AssetGeometry {
  const colors = [
    [PALETTE.sand, PALETTE.sandLight, PALETTE.sand, PALETTE.sandLight],
    [0xd9cfa8, 0xeee3c2, 0xd2c49b, 0xe8dcc0],
    [PALETTE.ash, 0xa89a8d, 0x7c7168, 0x9b8e82],
  ][variant] ?? [PALETTE.sand, PALETTE.sandLight, PALETTE.sand, PALETTE.sandLight];
  const w = [1, 1.03, 0.9][variant] ?? 1;
  return defineAsset([
    widen(rock(0.036, colors[0], [-0.02, 0.014, 0], [1, 0.35, 1]), w),
    widen(rock(0.03, colors[1], [0.022, 0.012, 0.015], [1, 0.4, 1]), w),
    widen(rock(0.024, colors[2], [0.005, 0.01, -0.026], [1, 0.42, 1]), w),
    widen(rock(0.026, colors[3], [0.012, 0.009, -0.018], [0.7, 0.3, 0.7]), w),
  ], 0.004, { radius: 0.03, color: PALETTE.shadowSoil });
}

function buildRock(variant = 0): AssetGeometry {
  const colors = [
    [PALETTE.stone, PALETTE.stoneLight, PALETTE.stoneDark, PALETTE.stoneLight, PALETTE.stoneDark],
    [0xc2a878, 0xd8c39a, 0x9c8260, 0xe0cba4, 0x8f7659],
    [0x3d414a, 0x5a606c, 0x2b2e35, 0x6f7684, 0x25282e],
  ][variant] ?? [PALETTE.stone, PALETTE.stoneLight, PALETTE.stoneDark, PALETTE.stoneLight, PALETTE.stoneDark];
  const w = [1, 0.93, 1.03][variant] ?? 1;
  return defineAsset([
    widen(rock(0.052, colors[0], [0, 0.045, 0]), w),
    widen(rock(0.034, colors[1], [-0.038, 0.03, 0.018]), w),
    widen(rock(0.028, colors[2], [0.036, 0.025, -0.014]), w),
    widen(rock(0.02, colors[3], [-0.025, 0.018, 0.02], [0.8, 0.45, 0.8], 1), w),
    widen(rock(0.018, colors[4], [0.028, 0.016, -0.018], [0.8, 0.4, 0.8], 1), w),
  ], 0.004, { radius: 0.04, color: PALETTE.shadowStone });
}

function buildHill(variant = 0): AssetGeometry {
  const colors = [
    [PALETTE.leaf, PALETTE.leafDark, PALETTE.leafLight],
    [PALETTE.stone, PALETTE.stoneDark, PALETTE.stoneLight],
    [PALETTE.moss, PALETTE.leafDark, PALETTE.leafLight],
  ][variant] ?? [PALETTE.leaf, PALETTE.leafDark, PALETTE.leafLight];
  const w = [1, 0.92, 1.04][variant] ?? 1;
  return defineAsset([
    widen(sphere(0.09, 10, 6, colors[0], [0, 0.075, 0], [1, 0.95, 1]), w),
    widen(sphere(0.055, 8, 5, colors[1], [-0.05, 0.05, 0.025], [1, 0.9, 1]), w),
    widen(sphere(0.05, 8, 5, colors[2], [0.05, 0.045, -0.02], [1, 0.85, 1]), w),
  ], 0.004, { radius: 0.08, color: PALETTE.shadowCanopy });
}

const MTN_SEGS = 10;
const MTN_TIERS = 10;
type Point = [number, number, number];
function mountainPoint(variant: number, tier: number, seg: number): Point {
  const t = tier / (MTN_TIERS - 1);
  const angle = (seg / MTN_SEGS) * Math.PI * 2 + (hash01(variant * 17 + tier, seg) - 0.5) * 0.32;
  const taper = 0.015 + 0.225 * Math.pow(1 - t, 0.72);
  const radius = taper * (0.74 + hash01(variant * 31 + seg, tier) * 0.52);
  const lean = t * 0.06;
  return [
    (hash01(variant + 3, tier) - 0.5) * lean + Math.cos(angle) * radius,
    0.72 * t + (hash01(variant * 13 + seg, tier + 5) - 0.5) * 0.035 * (0.25 + t),
    (hash01(variant + 7, tier) - 0.5) * lean + Math.sin(angle) * radius,
  ];
}
function mountainBand(variant: number, from: number, to: number, cap = false): Geometry3D {
  const p: number[] = [];
  const n: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const tri = (a: Point, b: Point, c: Point) => {
    const ux = b[0] - a[0];
    const uy = b[1] - a[1];
    const uz = b[2] - a[2];
    const vx = c[0] - a[0];
    const vy = c[1] - a[1];
    const vz = c[2] - a[2];
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;
    for (const q of [a, b, c]) {
      p.push(q[0], q[1], q[2]);
      n.push(nx, ny, nz);
      uv.push(0, 0);
      idx.push(idx.length);
    }
  };
  for (let tier = from; tier < to; tier++) {
    for (let s = 0; s < MTN_SEGS; s++) {
      const e = (s + 1) % MTN_SEGS;
      const a = mountainPoint(variant, tier, s);
      const b = mountainPoint(variant, tier, e);
      const c = mountainPoint(variant, tier + 1, e);
      const d = mountainPoint(variant, tier + 1, s);
      tri(a, c, b);
      tri(a, d, c);
    }
  }
  if (cap) {
    const apex: Point = [0, 0.76, 0];
    for (let s = 0; s < MTN_SEGS; s++) tri(mountainPoint(variant, to, s), apex, mountainPoint(variant, to, (s + 1) % MTN_SEGS));
  }
  return new Geometry3D({
    positions: new Float32Array(p),
    normals: new Float32Array(n),
    uvs: new Float32Array(uv),
    indices: new Uint32Array(idx),
  });
}

function buildMountain(variant = 0): AssetGeometry {
  const colors = [
    [PALETTE.stone, PALETTE.stoneLight, PALETTE.stoneDark, PALETTE.stoneLight, PALETTE.snow, PALETTE.stoneDark],
    [PALETTE.ash, PALETTE.stone, PALETTE.stoneDark, PALETTE.ash, PALETTE.lava, PALETTE.stoneDark],
    [PALETTE.stone, PALETTE.stoneLight, PALETTE.crystal, PALETTE.crystalLight, PALETTE.crystal, PALETTE.stoneDark],
    [0xe8d9b8, 0xfff0cf, 0xc9b28e, 0xfff0cf, 0xffffff, 0xa89779],
    [0x51465f, 0x6c5c7d, 0x3c3448, 0x6c5c7d, 0xff9a52, 0x2e2a36],
  ][variant] ?? [PALETTE.stone, PALETTE.stoneLight, PALETTE.stoneDark, PALETTE.stoneLight, PALETTE.snow, PALETTE.stoneDark];
  return defineAsset([
    { geometry: mountainBand(variant, 0, 4), color: colors[0] },
    { geometry: mountainBand(variant, 4, 7), color: colors[1] },
    { geometry: mountainBand(variant, 7, MTN_TIERS - 1, true), color: colors[4] },
    rock(0.032, colors[2], [-0.085, 0.012, 0.04], [0.8, 0.55, 0.8]),
    rock(0.028, colors[5], [0.08, 0.01, -0.05], [0.9, 0.45, 0.9]),
  ], 0.004, { radius: 0.081, color: PALETTE.shadowStone });
}

function buildOcean(variant = 0): AssetGeometry {
  const colors = [
    [PALETTE.water, PALETTE.waterLight, PALETTE.waterLight],
    [PALETTE.storm, 0x6f97b8, 0xa8c6dc],
    [PALETTE.ice, PALETTE.snow, PALETTE.waterLight],
  ][variant] ?? [PALETTE.water, PALETTE.waterLight, PALETTE.waterLight];
  const w = [1, 0.98, 1.02][variant] ?? 1;
  return defineAsset([
    widen(cylinder(0.22, 0.22, 0.018, 16, colors[0], [0, 0.009, 0]), w),
    widen(cylinder(0.07, 0.07, 0.019, 12, colors[1], [-0.075, 0.011, 0.045]), w),
    widen(cylinder(0.05, 0.05, 0.019, 10, colors[2], [0.09, 0.011, -0.05]), w),
  ], 0.012);
}

function buildLake(variant = 0): AssetGeometry {
  const colors = [
    [PALETTE.lake, PALETTE.waterLight],
    [0x3fa9a0, 0x9fe0cf],
    [PALETTE.crystal, PALETTE.crystalLight],
  ][variant] ?? [PALETTE.lake, PALETTE.waterLight];
  const w = [1, 0.97, 1.02][variant] ?? 1;
  return defineAsset([
    widen(cylinder(0.13, 0.13, 0.018, 14, colors[0], [0, 0.009, 0]), w),
    widen(cylinder(0.045, 0.045, 0.019, 10, colors[1], [-0.04, 0.011, 0.025]), w),
  ], 0.012);
}

function buildTree(variant = 0): AssetGeometry {
  const colors = [
    { trunk: PALETTE.bark, dark: PALETTE.leafDark, mid: PALETTE.leaf, light: PALETTE.leafLight },
    { trunk: PALETTE.bark, dark: PALETTE.leafPine, mid: PALETTE.leafDark, light: PALETTE.leafPine },
    { trunk: 0x7a5a45, dark: PALETTE.leafSakura, mid: PALETTE.leafSakuraLight, light: PALETTE.petalLight },
  ][variant] ?? { trunk: PALETTE.bark, dark: PALETTE.leafDark, mid: PALETTE.leaf, light: PALETTE.leafLight };
  const w = [1, 0.86, 1.05][variant] ?? 1;
  return defineAsset([
    widen(cylinder(0.016, 0.022, 0.114, 8, colors.trunk, [0, 0.057, 0]), w),
    widen(cylinder(0.008, 0.011, 0.052, 6, colors.trunk, [-0.032, 0.108, 0], undefined, 0.6), w),
    widen(cylinder(0.008, 0.011, 0.052, 6, colors.trunk, [0.032, 0.114, 0.008], undefined, -0.6), w),
    widen(bevelCone(0.08, 0.152, 8, colors.dark, [0, 0.12, 0]), w),
    widen(bevelCone(0.065, 0.139, 8, colors.mid, [0, 0.183, 0], undefined, 0.24), w),
    widen(bevelCone(0.048, 0.12, 7, colors.light, [0, 0.24, 0], undefined, -0.31), w),
  ], 0.004, { radius: 0.05, color: PALETTE.shadowCanopy });
}

function buildBush(variant = 0): AssetGeometry {
  const colors = [
    [PALETTE.leaf, PALETTE.leafLight, PALETTE.leafDark],
    [PALETTE.lavender, PALETTE.lavenderLight, PALETTE.leafDark],
    [PALETTE.moss, PALETTE.leafLight, PALETTE.leafDark],
  ][variant] ?? [PALETTE.leaf, PALETTE.leafLight, PALETTE.leafDark];
  const w = [1, 0.9, 0.82][variant] ?? 1;
  return defineAsset([
    widen(sphere(0.06, 9, 6, colors[0], [-0.035, 0.075, 0], [1, 1.25, 1]), w),
    widen(sphere(0.065, 8, 5, colors[1], [0.035, 0.082, 0.015], [1, 1.31, 1]), w),
    widen(sphere(0.05, 8, 5, colors[2], [0, 0.095, -0.035], [1, 1.3, 1]), w),
  ], 0.004, { radius: 0.055, color: PALETTE.shadowCanopy });
}

function buildFlower(variant = 0): AssetGeometry {
  const colors = [
    { petal: PALETTE.petal, petalLight: PALETTE.petalLight, pollen: PALETTE.pollen },
    { petal: PALETTE.sunflower, petalLight: PALETTE.sunflowerLight, pollen: 0x7a4a2f },
    { petal: PALETTE.lotus, petalLight: PALETTE.petalLight, pollen: PALETTE.pollen },
  ][variant] ?? { petal: PALETTE.petal, petalLight: PALETTE.petalLight, pollen: PALETTE.pollen };
  const w = [1, 1.04, 0.94][variant] ?? 1;
  const parts: Part[] = [widen(cylinder(0.005, 0.006, 0.11, 6, PALETTE.stem, [0, 0.055, 0]), w)];
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    parts.push(
      widen(sphere(0.019, 6, 3, i % 2 ? colors.petalLight : colors.petal, [
        Math.cos(angle) * 0.023,
        0.125,
        Math.sin(angle) * 0.023,
      ], [1, 0.45, 1]), w),
    );
  }
  parts.push(widen(sphere(0.012, 6, 4, colors.pollen, [0, 0.132, 0]), w));
  return defineAsset(parts, 0.004, { radius: 0.022, color: PALETTE.shadowSoil });
}

function buildDeer(variant = 0): AssetGeometry {
  const colors = [
    { body: PALETTE.deer, light: PALETTE.deerLight },
    { body: 0xa97850, light: 0xd6b28a },
    { body: 0x8f6a4a, light: 0xc3a07c },
  ][variant] ?? { body: PALETTE.deer, light: PALETTE.deerLight };
  const w = [1, 0.94, 1.04][variant] ?? 1;
  const parts: Part[] = [
    widen(sphere(0.053, 12, 8, colors.body, [0, 0.076, 0], [1.7, 0.9, 0.9]), w),
    widen(sphere(0.032, 8, 6, colors.light, [0.045, 0.068, 0.018], [1.3, 1.1, 0.8]), w),
    widen(sphere(0.022, 7, 5, colors.light, [0.073, 0.12, 0]), w),
    widen(sphere(0.005, 5, 4, colors.light, [0, 0.162, 0]), w),
    widen(cone(0.008, 0.026, 6, colors.light, [0.073, 0.138, -0.006], undefined, undefined, 1.35), w),
    widen(cone(0.006, 0.022, 6, colors.light, [0.03, 0.16, -0.008], undefined, undefined, 0.6), w),
    widen(cone(0.006, 0.022, 6, colors.light, [-0.03, 0.16, 0.008], undefined, undefined, -0.6), w),
  ];
  for (const side of [-1, 1]) {
    parts.push(widen(cone(0.009, 0.024, 6, colors.light, [0.074, 0.145, side * 0.015], undefined, undefined, side * 0.5), w));
    parts.push(widen(cylinder(0.0045, 0.0055, 0.014, 6, colors.body, [0.07, 0.12, side * 0.008], undefined, side * 0.35), w));
  }
  for (const x of [-0.038, 0.038]) {
    for (const z of [-0.019, 0.019]) {
      parts.push(widen(cylinder(0.0055, 0.0065, 0.065, 6, colors.body, [x, 0.028, z]), w));
    }
  }
  parts.push(widen(cone(0.011, 0.029, 6, colors.light, [-0.068, 0.073, 0], undefined, undefined, 1.35), w));
  return defineAsset(parts, 0.005, { radius: 0.06, color: PALETTE.shadowSoil });
}

function buildFox(variant = 0): AssetGeometry {
  const colors = [
    { body: PALETTE.fox, light: PALETTE.foxLight },
    { body: PALETTE.arctic, light: 0xd9e6ee },
    { body: PALETTE.fennec, light: 0xf3dfbd },
  ][variant] ?? { body: PALETTE.fox, light: PALETTE.foxLight };
  const w = [1, 0.96, 0.88][variant] ?? 1;
  const parts: Part[] = [
    widen(sphere(0.048, 10, 7, colors.body, [0, 0.057, 0], [1.5, 0.85, 0.85]), w),
    widen(sphere(0.032, 6, 5, colors.light, [0.045, 0.081, 0]), w),
    widen(sphere(0.014, 5, 4, 0x202b3a, [0.073, 0.108, 0.01]), w),
    widen(sphere(0.004, 4, 3, 0xfff9e8, [0.085, 0.108, 0.01]), w),
    widen(cone(0.025, 0.054, 6, colors.body, [0.056, 0.061, 0], undefined, undefined, -Math.PI / 2), w),
    widen(cone(0.034, 0.074, 6, colors.body, [0.053, 0.07, 0.006], undefined, undefined, -Math.PI / 2), w),
    widen(sphere(0.008, 5, 4, colors.light, [0.006, 0.116, 0.018]), w),
  ];
  for (const side of [-1, 1]) {
    parts.push(widen(cone(0.012, 0.03, 6, colors.body, [0.052, 0.098, side * 0.018], undefined, undefined, side * 0.25), w));
    parts.push(widen(sphere(0.008, 5, 4, 0x202b3a, [0.066, 0.118, side * 0.032]), w));
  }
  parts.push(widen(bevelCone(0.027, 0.08, 7, colors.body, [-0.078, 0.071, 0], undefined, undefined, 1.25), w));
  parts.push(widen(cone(0.017, 0.028, 6, colors.light, [-0.108, 0.097, 0], undefined, undefined, 1.2), w));
  for (const x of [-0.035, 0.035]) {
    for (const z of [-0.017, 0.017]) {
      parts.push(widen(cylinder(0.0055, 0.0065, 0.045, 6, colors.body, [x, 0.023, z]), w));
    }
  }
  return defineAsset(parts, 0.005, { radius: 0.05, color: PALETTE.shadowSoil });
}

function buildBird(variant = 0): AssetGeometry {
  const colors = [
    { body: PALETTE.bird, light: PALETTE.birdLight, beak: PALETTE.beak },
    { body: PALETTE.parrot, light: 0xa9e3c7, beak: PALETTE.beak },
    { body: PALETTE.swallow, light: 0x9fb6cf, beak: PALETTE.beak },
  ][variant] ?? { body: PALETTE.bird, light: PALETTE.birdLight, beak: PALETTE.beak };
  const w = [1, 0.92, 1.05][variant] ?? 1;
  const parts: Part[] = [
    widen(sphere(0.034, 10, 7, colors.body, [0, 0.018, 0], [1.45, 0.55, 0.85]), w),
    widen(sphere(0.014, 5, 4, colors.light, [0.031, 0.052, 0]), w),
    widen(sphere(0.016, 5, 4, 0x202b3a, [0.062, 0.052, 0.006]), w),
    widen(sphere(0.005, 4, 3, 0xfff9e8, [0.075, 0.052, 0.006]), w),
    widen(cone(0.008, 0.022, 5, colors.beak, [0.061, 0.038, 0], undefined, undefined, -Math.PI / 2), w),
    widen(cone(0.022, 0.032, 6, colors.body, [-0.038, 0.018, 0], undefined, undefined, Math.PI / 2), w),
  ];
  for (const side of [-1, 1]) {
    parts.push(widen(sphere(0.022, 6, 3, colors.light, [0, 0.035, side * 0.026], [1.1, 0.18, 0.7]), w));
    parts.push(widen(sphere(0.01, 4, 3, colors.body, [0.036, 0.074, side * 0.018]), w));
    parts.push(widen(cylinder(0.004, 0.005, 0.035, 4, colors.body, [0.022, 0.042, side * 0.008], undefined, side * 0.8), w));
  }
  return defineAsset(parts, 0.005, { radius: 0.03, color: PALETTE.shadowSoil });
}

function buildFish(variant = 0): AssetGeometry {
  const colors = [
    { body: PALETTE.fish, light: PALETTE.fishLight },
    { body: PALETTE.koi, light: 0xf6d3bd },
  ][variant] ?? { body: PALETTE.fish, light: PALETTE.fishLight };
  const w = [1, 0.94][variant] ?? 1;
  const parts: Part[] = [
    widen(sphere(0.042, 9, 7, colors.body, [0, 0.05, 0], [1.8, 0.85, 0.7]), w),
    widen(cone(0.023, 0.048, 6, colors.light, [-0.073, 0.042, 0.012], undefined, undefined, Math.PI / 2), w),
    widen(cone(0.015, 0.032, 5, colors.light, [0, 0.074, 0]), w),
    widen(cone(0.036, 0.012, 6, colors.light, [0.018, 0.026, 0.06], undefined, undefined, 0.35), w),
  ];
  for (const side of [-1, 1]) {
    parts.push(widen(sphere(0.014, 6, 3, colors.light, [0.005, 0.042, side * 0.026], [1, 0.2, 0.8]), w));
    parts.push(widen(cylinder(0.002, 0.002, 0.042, 4, colors.body, [0.014, 0.028, side * 0.018], undefined, side * 0.6), w));
  }
  return defineAsset(parts, 0.014, { radius: 0.035, color: PALETTE.shadowWater });
}

function buildInsect(variant = 0): AssetGeometry {
  const colors = [
    { body: PALETTE.insect, light: PALETTE.insectLight },
    { body: PALETTE.butterfly, light: 0xf0c5e8 },
  ][variant] ?? { body: PALETTE.insect, light: PALETTE.insectLight };
  const w = [1, 0.9][variant] ?? 1;
  const parts: Part[] = [
    widen(sphere(0.023, 8, 6, colors.body, [0, 0.033, 0], [1.6, 0.82, 0.82]), w),
    widen(sphere(0.013, 6, 4, colors.light, [0.031, 0.036, 0]), w),
    widen(sphere(0.012, 4, 3, 0x202b3a, [0, 0.044, 0.006]), w),
    widen(sphere(0.004, 4, 2, 0xfff9e8, [0, 0.044, 0.015]), w),
  ];
  for (const side of [-1, 1]) {
    parts.push(widen(sphere(0.022, 6, 3, colors.light, [0.002, 0.055, side * 0.018], [1, 0.15, 0.6]), w));
    parts.push(widen(sphere(0.010, 4, 3, colors.body, [0.034, 0.056, side * 0.012]), w));
    parts.push(widen(cylinder(0.002, 0.002, 0.024, 4, colors.body, [0.042, 0.052, side * 0.008], undefined, side * 0.5), w));
  }
  for (const x of [-0.012, 0.012]) {
    for (const z of [-0.014, 0.014]) {
      parts.push(widen(cylinder(0.0021, 0.0021, 0.032, 4, colors.body, [x, 0.018, z], undefined, z > 0 ? 0.35 : -0.35), w));
    }
  }
  return defineAsset(parts, 0.005, { radius: 0.02, color: PALETTE.shadowSoil });
}

export type AssetBuilder = () => AssetGeometry;
export type PropResolver = (type: ObjectType) => AssetGeometry;
export type SpeciesResolver = (id: SpeciesId) => AssetGeometry;

export const PROP_VARIANT_LABELS: Record<ObjectType, string[]> = {
  grass: ['Meadow', 'Golden', 'Reed'],
  sand: ['Dune', 'Coastal', 'Volcanic'],
  rock: ['Granite', 'Sandstone', 'Obsidian'],
  hill: ['Forest', 'Rocky', 'Mossy'],
  mountain: ['Alpine', 'Volcanic', 'Crystal', 'Limestone', 'Basalt'],
  ocean: ['Tropical', 'Storm', 'Frozen'],
  lake: ['Clear', 'Reef', 'Crystal'],
  tree: ['Oak', 'Pine', 'Sakura'],
  bush: ['Fern', 'Lavender', 'Cactus'],
  flower: ['Sunflower', 'Tulip', 'Lotus'],
  deer: ['Kijang', 'Antelope', 'Rusa'],
  fox: ['Rubah', 'Arctic', 'Fennec'],
  bird: ['Burung', 'Parrot', 'Swallow'],
};

export const SPECIES_VARIANT_LABELS: Record<SpeciesId, string[]> = {
  deer: ['Kijang', 'Antelope'],
  fox: ['Rubah', 'Arctic'],
  bird: ['Burung', 'Parrot'],
  fish: ['Reef', 'Koi'],
  insect: ['Beetle', 'Butterfly'],
};

export const ASSET_BUILDERS: Record<ObjectType, AssetBuilder[]> = {
  grass: [() => buildGrass(0), () => buildGrass(1), () => buildGrass(2)],
  sand: [() => buildSand(0), () => buildSand(1), () => buildSand(2)],
  rock: [() => buildRock(0), () => buildRock(1), () => buildRock(2)],
  hill: [() => buildHill(0), () => buildHill(1), () => buildHill(2)],
  mountain: [() => buildMountain(0), () => buildMountain(1), () => buildMountain(2), () => buildMountain(3), () => buildMountain(4)],
  ocean: [() => buildOcean(0), () => buildOcean(1), () => buildOcean(2)],
  lake: [() => buildLake(0), () => buildLake(1), () => buildLake(2)],
  tree: [() => buildTree(0), () => buildTree(1), () => buildTree(2)],
  bush: [() => buildBush(0), () => buildBush(1), () => buildBush(2)],
  flower: [() => buildFlower(0), () => buildFlower(1), () => buildFlower(2)],
  deer: [() => buildDeer(0), () => buildDeer(1), () => buildDeer(2)],
  fox: [() => buildFox(0), () => buildFox(1), () => buildFox(2)],
  bird: [() => buildBird(0), () => buildBird(1), () => buildBird(2)],
};

export const SPECIES_BUILDERS: Record<SpeciesId, AssetBuilder[]> = {
  deer: [() => buildDeer(0), () => buildDeer(1)],
  fox: [() => buildFox(0), () => buildFox(1)],
  bird: [() => buildBird(0), () => buildBird(1)],
  fish: [() => buildFish(0), () => buildFish(1)],
  insect: [() => buildInsect(0), () => buildInsect(1)],
};

const PLANET_BIAS: Record<string, Partial<Record<ObjectType, number>>> = {
  terra: {},
  dune: { grass: 1, sand: 1, rock: 1, bush: 2 },
  glaciere: { grass: 2, rock: 2, ocean: 2, lake: 2, mountain: 2 },
  inferna: { sand: 2, rock: 1, mountain: 1, ocean: 1 },
  aquaria: { grass: 1, lake: 1, ocean: 1, flower: 2 },
  mycelia: { grass: 2, bush: 2, hill: 1, flower: 1 },
  sakura: { tree: 2, bush: 2, flower: 2 },
  aurelia: { tree: 1, bush: 1, hill: 1, flower: 1 },
  cosmos: { hill: 2, rock: 2, mountain: 2, lake: 2 },
};

const PLANET_FORCE: Record<string, Partial<Record<ObjectType, number>>> = {
  terra: { tree: 0, rock: 0, ocean: 0, lake: 0 },
  dune: { sand: 0, rock: 1, bush: 2, grass: 1, mountain: 0, ocean: 0, tree: 0 },
  glaciere: { grass: 2, rock: 2, ocean: 2, lake: 2, mountain: 2, tree: 1 },
  inferna: { sand: 2, rock: 2, mountain: 1, ocean: 1, lake: 0 },
  aquaria: { lake: 1, ocean: 0, flower: 2, grass: 2, mountain: 0, tree: 0, sand: 1 },
  mycelia: { bush: 2, grass: 2, hill: 2, flower: 1, tree: 0 },
  sakura: { tree: 2, bush: 1, flower: 1, hill: 0 },
  aurelia: { tree: 1, bush: 1, hill: 2, flower: 0 },
  cosmos: { mountain: 2, rock: 2, lake: 2, hill: 2, ocean: 2 },
};

const SPECIES_PLANET_BIAS: Record<string, Partial<Record<SpeciesId, number>>> = {
  aquaria: { fish: 1 },
  mycelia: { insect: 1 },
  sakura: { bird: 1, insect: 1 },
  cosmos: { fish: 1, insect: 1 },
};

const SPECIES_PLANET_FORCE: Record<string, Partial<Record<SpeciesId, number>>> = {
  aquaria: { fish: 1 },
  mycelia: { insect: 1 },
  sakura: { bird: 1, insect: 1 },
  cosmos: { fish: 1, insect: 1 },
};

function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function variantHash(seed: number, planetId: string, key: string): number {
  let h = hashString(`${planetId}:${key}`);
  h = Math.imul(h ^ (seed >>> 0), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return (h ^ (h >>> 16)) >>> 0;
}

export function propVariantIndex(type: ObjectType, seed: number, planetId: string): number {
  const count = ASSET_BUILDERS[type].length;
  const forced = PLANET_FORCE[planetId]?.[type];
  if (forced !== undefined) return forced % count;
  const bias = PLANET_BIAS[planetId]?.[type] ?? 0;
  return (variantHash(seed, planetId, `prop:${type}`) + bias) % count;
}

export function speciesVariantIndex(id: SpeciesId, seed: number, planetId: string): number {
  const count = SPECIES_BUILDERS[id].length;
  const forced = SPECIES_PLANET_FORCE[planetId]?.[id];
  if (forced !== undefined) return forced % count;
  const bias = SPECIES_PLANET_BIAS[planetId]?.[id] ?? PLANET_BIAS[planetId]?.[id as ObjectType] ?? 0;
  return (variantHash(seed, planetId, `species:${id}`) + bias) % count;
}

const VARIANT_CACHE = new Map<string, AssetGeometry>();

function cachedAsset(key: string, build: AssetBuilder): AssetGeometry {
  let asset = VARIANT_CACHE.get(key);
  if (!asset) {
    asset = build();
    VARIANT_CACHE.set(key, asset);
  }
  return asset;
}

export interface AssetResolvers {
  props: PropResolver;
  species: SpeciesResolver;
  indices: {
    props: Record<ObjectType, number>;
    species: Record<SpeciesId, number>;
  };
  labels: {
    props: Record<ObjectType, string>;
    species: Record<SpeciesId, string>;
  };
}

export function createAssetResolvers(seed: number, planetId: string): AssetResolvers {
  const propIndices = Object.fromEntries(
    OBJECT_ORDER.map((type) => [type, propVariantIndex(type, seed, planetId)]),
  ) as Record<ObjectType, number>;
  const speciesIndices = Object.fromEntries(
    SPECIES_ORDER.map((id) => [id, speciesVariantIndex(id, seed, planetId)]),
  ) as Record<SpeciesId, number>;

  const propAssets = Object.fromEntries(
    OBJECT_ORDER.map((type) => [
      type,
      cachedAsset(`prop:${type}:${propIndices[type]}`, ASSET_BUILDERS[type][propIndices[type]]),
    ]),
  ) as Record<ObjectType, AssetGeometry>;
  const speciesAssets = Object.fromEntries(
    SPECIES_ORDER.map((id) => [
      id,
      cachedAsset(`species:${id}:${speciesIndices[id]}`, SPECIES_BUILDERS[id][speciesIndices[id]]),
    ]),
  ) as Record<SpeciesId, AssetGeometry>;

  return {
    props: (type) => propAssets[type],
    species: (id) => speciesAssets[id],
    indices: { props: propIndices, species: speciesIndices },
    labels: {
      props: Object.fromEntries(
        OBJECT_ORDER.map((type) => [type, PROP_VARIANT_LABELS[type][propIndices[type]]]),
      ) as Record<ObjectType, string>,
      species: Object.fromEntries(
        SPECIES_ORDER.map((id) => [id, SPECIES_VARIANT_LABELS[id][speciesIndices[id]]]),
      ) as Record<SpeciesId, string>,
    },
  };
}

/** Backward-compatible index-0 geometry. Variant-aware code should use a resolver. */
export const ASSET_GEOMETRY: Record<ObjectType, AssetGeometry> = Object.fromEntries(
  OBJECT_ORDER.map((type) => [type, ASSET_BUILDERS[type][0]()]),
) as Record<ObjectType, AssetGeometry>;

export const SPECIES_GEOMETRY: Record<SpeciesId, AssetGeometry> = Object.fromEntries(
  SPECIES_ORDER.map((id) => [id, SPECIES_BUILDERS[id][0]()]),
) as Record<SpeciesId, AssetGeometry>;

/** World scale applied to wildlife agents so they match placed props and the rest of the scene. */
export const SPECIES_SCALE: Record<SpeciesId, number> = {
  deer: OBJECT_DEFS.deer.scale,
  fox: OBJECT_DEFS.fox.scale,
  bird: OBJECT_DEFS.bird.scale,
  fish: 0.08,
  insect: 0.064,
};
