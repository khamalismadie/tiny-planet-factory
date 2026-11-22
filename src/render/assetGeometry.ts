import {
  ConeGeometry,
  CylinderGeometry,
  Geometry3D,
  IcosahedronGeometry,
  SphereGeometry,
  getAttributeData,
  srgbToLinear,
} from '@pixi/3d';
import { OBJECT_DEFS } from '../content/objects';
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
  bark: 0x6b4a2f,
  leafDark: 0x347a43,
  leaf: 0x439251,
  leafLight: 0x5caf63,
  stone: 0x8d8a82,
  stoneLight: 0xa6a39b,
  stoneDark: 0x6f6d68,
  sand: 0xd8c389,
  sandLight: 0xe8d7a6,
  water: 0x3f8fd0,
  waterLight: 0x7fc4e8,
  lake: 0x63b7d8,
  snow: 0xe6eef5,
  petal: 0xe28ab0,
  petalLight: 0xf0a8c4,
  pollen: 0xf3c44f,
  stem: 0x4f8f43,
  deer: 0xb9804d,
  deerLight: 0xd8b184,
  fox: 0xd9733f,
  foxLight: 0xf1d8bd,
  bird: 0x6fc5e8,
  birdLight: 0xb9e6f4,
  beak: 0xf0a83c,
  fish: 0x4fa9c4,
  fishLight: 0x9fd8e4,
  insect: 0x6bbf6f,
  insectLight: 0xd8e88a,
  shadowCanopy: 0x283d32,
  shadowSoil: 0x354039,
  shadowStone: 0x373b3d,
  shadowWater: 0x1d3d50,
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
  geometry: discGeometry(radius, 10),
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

function buildTree(): AssetGeometry {
  return defineAsset([
    cylinder(0.016, 0.022, 0.114, 8, PALETTE.bark, [0, 0.057, 0]),
    cylinder(0.008, 0.011, 0.052, 6, PALETTE.bark, [-0.032, 0.108, 0], undefined, 0.6),
    cylinder(0.008, 0.011, 0.052, 6, PALETTE.bark, [0.032, 0.114, 0.008], undefined, -0.6),
    bevelCone(0.08, 0.152, 8, PALETTE.leafDark, [0, 0.12, 0]),
    bevelCone(0.065, 0.139, 8, PALETTE.leaf, [0, 0.183, 0], undefined, 0.24),
    bevelCone(0.048, 0.12, 7, PALETTE.leafLight, [0, 0.24, 0], undefined, -0.31),
  ], 0.004, { radius: 0.05, color: PALETTE.shadowCanopy });
}

function buildFlower(): AssetGeometry {
  const parts: Part[] = [cylinder(0.005, 0.006, 0.11, 6, PALETTE.stem, [0, 0.055, 0])];
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    parts.push(
      sphere(0.019, 6, 3, i % 2 ? PALETTE.petalLight : PALETTE.petal, [
        Math.cos(angle) * 0.023,
        0.125,
        Math.sin(angle) * 0.023,
      ], [1, 0.45, 1]),
    );
  }
  parts.push(sphere(0.012, 6, 4, PALETTE.pollen, [0, 0.132, 0]));
  return defineAsset(parts, 0.004, { radius: 0.022, color: PALETTE.shadowSoil });
}

function buildDeer(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.045, 8, 6, PALETTE.deer, [0, 0.06, 0], [1.45, 0.8, 0.8]),
    cylinder(0.011, 0.014, 0.06, 5, PALETTE.deer, [0.05, 0.093, 0], undefined, -0.4),
    sphere(0.021, 7, 5, PALETTE.deerLight, [0.073, 0.12, 0]),
  ];
  for (const side of [-1, 1]) {
    parts.push(cone(0.008, 0.02, 5, PALETTE.deerLight, [0.073, 0.138, side * 0.017], undefined, undefined, side * 0.5));
  }
  for (const x of [-0.038, 0.038]) {
    for (const z of [-0.019, 0.019]) {
      parts.push(cylinder(0.005, 0.006, 0.052, 5, PALETTE.deer, [x, 0.026, z]));
    }
  }
  parts.push(cone(0.011, 0.028, 5, PALETTE.deerLight, [-0.068, 0.073, 0], undefined, undefined, 1.35));
  return defineAsset(parts, 0.004, { radius: 0.05, color: PALETTE.shadowSoil });
}

function buildFox(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.04, 8, 6, PALETTE.fox, [0, 0.047, 0], [1.45, 0.8, 0.8]),
    cone(0.03, 0.053, 6, PALETTE.fox, [0.06, 0.071, 0], undefined, undefined, -Math.PI / 2),
  ];
  for (const side of [-1, 1]) {
    parts.push(cone(0.012, 0.028, 5, PALETTE.fox, [0.046, 0.095, side * 0.02], undefined, undefined, side * 0.25));
  }
  parts.push(bevelCone(0.024, 0.073, 6, PALETTE.fox, [-0.07, 0.065, 0], undefined, undefined, 1.2));
  parts.push(cone(0.017, 0.026, 6, PALETTE.foxLight, [-0.108, 0.095, 0], undefined, undefined, 1.2));
  for (const x of [-0.035, 0.035]) {
    for (const z of [-0.017, 0.017]) {
      parts.push(cylinder(0.005, 0.006, 0.041, 5, PALETTE.fox, [x, 0.021, z]));
    }
  }
  return defineAsset(parts, 0.004, { radius: 0.045, color: PALETTE.shadowSoil });
}

function buildBird(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.03, 8, 6, PALETTE.bird, [0, 0.015, 0], [1.3, 0.48, 0.8]),
    sphere(0.018, 7, 5, PALETTE.birdLight, [0.036, 0.049, 0]),
    cone(0.008, 0.022, 5, PALETTE.beak, [0.056, 0.044, 0], undefined, undefined, -Math.PI / 2),
  ];
  for (const side of [-1, 1]) {
    parts.push(sphere(0.021, 6, 3, PALETTE.birdLight, [0, 0.036, side * 0.026], [1.1, 0.18, 0.7]));
  }
  parts.push(cone(0.012, 0.03, 5, PALETTE.bird, [-0.042, 0.028, 0], undefined, undefined, Math.PI / 2));
  return defineAsset(parts, 0.004, { radius: 0.025, color: PALETTE.shadowSoil });
}

function buildFish(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.034, 8, 6, PALETTE.fish, [0, 0.045, 0], [1.65, 0.85, 0.7]),
    cone(0.025, 0.055, 5, PALETTE.fishLight, [-0.068, 0.045, 0], undefined, undefined, Math.PI / 2),
    cone(0.017, 0.036, 5, PALETTE.fishLight, [0, 0.077, 0]),
  ];
  for (const side of [-1, 1]) {
    parts.push(sphere(0.014, 6, 3, PALETTE.fishLight, [0.005, 0.042, side * 0.026], [1, 0.2, 0.8]));
  }
  return defineAsset(parts, 0.012, { radius: 0.03, color: PALETTE.shadowWater });
}

function buildInsect(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.019, 7, 5, PALETTE.insect, [0, 0.032, 0], [1.5, 0.8, 0.8]),
    sphere(0.012, 6, 4, PALETTE.insectLight, [0.031, 0.036, 0]),
  ];
  for (const side of [-1, 1]) {
    parts.push(sphere(0.021, 6, 3, PALETTE.insectLight, [0.002, 0.055, side * 0.018], [1, 0.15, 0.6]));
    parts.push(cylinder(0.002, 0.002, 0.022, 3, PALETTE.insect, [0.04, 0.052, side * 0.008], undefined, side * 0.5));
  }
  for (const x of [-0.012, 0.012]) {
    for (const z of [-0.014, 0.014]) {
      parts.push(cylinder(0.002, 0.002, 0.03, 3, PALETTE.insect, [x, 0.015, z], undefined, z > 0 ? 0.35 : -0.35));
    }
  }
  return defineAsset(parts, 0.004, { radius: 0.018, color: PALETTE.shadowSoil });
}

export const ASSET_GEOMETRY: Record<ObjectType, AssetGeometry> = {
  grass: defineAsset([
    cone(0.012, 0.1, 4, 0x7fb44e, [-0.018, 0.05, 0], undefined, undefined, 0.22),
    cone(0.012, 0.11, 4, 0x9acb62, [0.018, 0.055, 0.008], undefined, undefined, -0.2),
    cone(0.011, 0.09, 4, 0x6fa543, [0, 0.045, -0.02], undefined, undefined, 0.12),
  ], 0.004, { radius: 0.008, color: PALETTE.shadowCanopy }),
  sand: defineAsset([
    rock(0.036, PALETTE.sand, [-0.02, 0.014, 0], [1, 0.35, 1]),
    rock(0.03, PALETTE.sandLight, [0.022, 0.012, 0.015], [1, 0.4, 1]),
    rock(0.024, PALETTE.sand, [0.005, 0.01, -0.026], [1, 0.42, 1]),
    rock(0.026, PALETTE.sandLight, [0.012, 0.009, -0.018], [0.7, 0.3, 0.7]),
  ], 0.004, { radius: 0.03, color: PALETTE.shadowSoil }),
  rock: defineAsset([
    rock(0.052, PALETTE.stone, [0, 0.045, 0]),
    rock(0.034, PALETTE.stoneLight, [-0.038, 0.03, 0.018]),
    rock(0.028, PALETTE.stoneDark, [0.036, 0.025, -0.014]),
    rock(0.02, PALETTE.stoneLight, [-0.025, 0.018, 0.02], [0.8, 0.45, 0.8], 1),
    rock(0.018, PALETTE.stoneDark, [0.028, 0.016, -0.018], [0.8, 0.4, 0.8], 1),
  ], 0.004, { radius: 0.04, color: PALETTE.shadowStone }),
  hill: defineAsset([
    sphere(0.09, 10, 6, PALETTE.leaf, [0, 0.075, 0], [1, 0.95, 1]),
    sphere(0.055, 8, 5, PALETTE.leafDark, [-0.05, 0.05, 0.025], [1, 0.9, 1]),
    sphere(0.05, 8, 5, PALETTE.leafLight, [0.05, 0.045, -0.02], [1, 0.85, 1]),
  ], 0.004, { radius: 0.08, color: PALETTE.shadowCanopy }),
  mountain: defineAsset([
    bevelCone(0.1, 0.5, 9, PALETTE.stone, [0, 0.25, 0]),
    bevelCone(0.055, 0.16, 7, PALETTE.stoneLight, [0, 0.33, 0]),
    bevelCone(0.068, 0.34, 7, PALETTE.stoneDark, [-0.055, 0.17, 0.02], undefined, undefined, 0.12),
    bevelCone(0.06, 0.3, 7, PALETTE.stoneLight, [0.055, 0.15, -0.015], undefined, undefined, -0.1),
    bevelCone(0.045, 0.14, 7, PALETTE.snow, [0, 0.43, 0]),
    rock(0.052, PALETTE.stoneDark, [-0.05, 0.02, 0.02], [0.55, 0.28, 0.55], 1),
  ], 0.004, { radius: 0.09, color: PALETTE.shadowStone }),
  ocean: defineAsset([
    cylinder(0.22, 0.22, 0.018, 16, PALETTE.water, [0, 0.009, 0]),
    cylinder(0.07, 0.07, 0.019, 12, PALETTE.waterLight, [-0.075, 0.011, 0.045]),
    cylinder(0.05, 0.05, 0.019, 10, PALETTE.waterLight, [0.09, 0.011, -0.05]),
  ], 0.012),
  lake: defineAsset([
    cylinder(0.13, 0.13, 0.018, 14, PALETTE.lake, [0, 0.009, 0]),
    cylinder(0.045, 0.045, 0.019, 10, PALETTE.waterLight, [-0.04, 0.011, 0.025]),
  ], 0.012),
  tree: buildTree(),
  bush: defineAsset([
    sphere(0.06, 9, 6, PALETTE.leaf, [-0.035, 0.075, 0], [1, 1.25, 1]),
    sphere(0.065, 8, 5, PALETTE.leafLight, [0.035, 0.082, 0.015], [1, 1.31, 1]),
    sphere(0.05, 8, 5, PALETTE.leafDark, [0, 0.095, -0.035], [1, 1.3, 1]),
  ], 0.004, { radius: 0.055, color: PALETTE.shadowCanopy }),
  flower: buildFlower(),
  deer: buildDeer(),
  fox: buildFox(),
  bird: buildBird(),
};

export const SPECIES_GEOMETRY: Record<SpeciesId, AssetGeometry> = {
  deer: buildDeer(),
  fox: buildFox(),
  bird: buildBird(),
  fish: buildFish(),
  insect: buildInsect(),
};

/** World scale applied to wildlife agents so they match placed props and the rest of the scene. */
export const SPECIES_SCALE: Record<SpeciesId, number> = {
  deer: OBJECT_DEFS.deer.scale,
  fox: OBJECT_DEFS.fox.scale,
  bird: OBJECT_DEFS.bird.scale,
  fish: 0.08,
  insect: 0.064,
};
