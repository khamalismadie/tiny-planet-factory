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

function mergeParts(parts: Part[], baseLift: number): AssetGeometry {
  const prepared = parts.map((part) => {
    const positions = getAttributeData(part.geometry, 'aPosition', 3);
    const normals = getAttributeData(part.geometry, 'aNormal', 3);
    const uvs = getAttributeData(part.geometry, 'aUV', 2);
    return { part, positions, normals, uvs, indices: part.geometry.indices };
  });

  let vertexCount = 0;
  let indexCount = 0;
  for (const item of prepared) {
    vertexCount += item.positions.length / 3;
    indexCount += item.indices?.length ?? 0;
  }

  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const colors = new Float32Array(vertexCount * 4);
  const indices = new Uint32Array(indexCount);

  let vertexOffset = 0;
  let indexOffset = 0;
  let minY = Number.POSITIVE_INFINITY;

  for (const item of prepared) {
    const [px, py, pz] = item.part.position ?? [0, 0, 0];
    const [sx, sy, sz] = item.part.scale ?? [1, 1, 1];
    const rotationY = item.part.rotationY ?? 0;
    const rotationZ = item.part.rotationZ ?? 0;
    const [cr, cg, cb] = linearColor(item.part.color);
    const count = item.positions.length / 3;

    for (let v = 0; v < count; v++) {
      const source = v * 3;
      let x = item.positions[source] * sx;
      let y = item.positions[source + 1] * sy;
      let z = item.positions[source + 2] * sz;
      [x, y] = rotateZ(x, y, rotationZ);
      [x, z] = rotateY(x, z, rotationY);
      x += px;
      y += py;
      z += pz;
      minY = Math.min(minY, y);

      let nx = item.normals[source] / sx;
      let ny = item.normals[source + 1] / sy;
      let nz = item.normals[source + 2] / sz;
      [nx, ny] = rotateZ(nx, ny, rotationZ);
      [nx, nz] = rotateY(nx, nz, rotationY);
      const nLength = Math.hypot(nx, ny, nz) || 1;

      const target = (vertexOffset + v) * 3;
      positions[target] = x;
      positions[target + 1] = y;
      positions[target + 2] = z;
      normals[target] = nx / nLength;
      normals[target + 1] = ny / nLength;
      normals[target + 2] = nz / nLength;
      uvs[(vertexOffset + v) * 2] = item.uvs[v * 2] ?? 0;
      uvs[(vertexOffset + v) * 2 + 1] = item.uvs[v * 2 + 1] ?? 0;
      const colorTarget = (vertexOffset + v) * 4;
      colors[colorTarget] = cr;
      colors[colorTarget + 1] = cg;
      colors[colorTarget + 2] = cb;
      colors[colorTarget + 3] = 1;
    }

    if (item.indices) {
      for (let i = 0; i < item.indices.length; i++) {
        indices[indexOffset + i] = vertexOffset + item.indices[i];
      }
      indexOffset += item.indices.length;
    }
    vertexOffset += count;
  }

  // Base of every asset sits at local y = 0, so renderers only need a tiny lift.
  for (let v = 0; v < vertexCount; v++) {
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
): Part => ({
  geometry: new IcosahedronGeometry({ radius, detail: 0 }),
  color,
  position,
  scale,
});

function defineAsset(parts: Part[], baseLift = 0.004): AssetGeometry {
  return mergeParts(parts, baseLift);
}

function buildTree(): AssetGeometry {
  return defineAsset([
    cylinder(0.016, 0.022, 0.114, 6, PALETTE.bark, [0, 0.057, 0]),
    cone(0.08, 0.152, 6, PALETTE.leafDark, [0, 0.12, 0]),
    cone(0.065, 0.139, 6, PALETTE.leaf, [0, 0.183, 0]),
    cone(0.048, 0.12, 6, PALETTE.leafLight, [0, 0.24, 0]),
  ]);
}

function buildFlower(): AssetGeometry {
  const parts: Part[] = [cylinder(0.005, 0.006, 0.11, 4, PALETTE.stem, [0, 0.055, 0])];
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    parts.push(
      sphere(0.019, 5, 3, i % 2 ? PALETTE.petalLight : PALETTE.petal, [
        Math.cos(angle) * 0.023,
        0.125,
        Math.sin(angle) * 0.023,
      ], [1, 0.45, 1]),
    );
  }
  parts.push(sphere(0.012, 6, 4, PALETTE.pollen, [0, 0.132, 0]));
  return defineAsset(parts);
}

function buildDeer(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.045, 7, 5, PALETTE.deer, [0, 0.06, 0], [1.45, 0.8, 0.8]),
    cylinder(0.011, 0.014, 0.06, 5, PALETTE.deer, [0.05, 0.093, 0], undefined, -0.4),
    sphere(0.021, 6, 4, PALETTE.deerLight, [0.073, 0.12, 0]),
  ];
  for (const side of [-1, 1]) {
    parts.push(cone(0.008, 0.02, 4, PALETTE.deerLight, [0.073, 0.138, side * 0.017], undefined, undefined, side * 0.5));
  }
  for (const x of [-0.038, 0.038]) {
    for (const z of [-0.019, 0.019]) {
      parts.push(cylinder(0.005, 0.006, 0.052, 4, PALETTE.deer, [x, 0.026, z]));
    }
  }
  parts.push(cone(0.011, 0.028, 4, PALETTE.deerLight, [-0.068, 0.073, 0], undefined, undefined, 1.35));
  return defineAsset(parts);
}

function buildFox(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.04, 7, 5, PALETTE.fox, [0, 0.047, 0], [1.45, 0.8, 0.8]),
    cone(0.03, 0.053, 5, PALETTE.fox, [0.06, 0.071, 0], undefined, undefined, -Math.PI / 2),
  ];
  for (const side of [-1, 1]) {
    parts.push(cone(0.012, 0.028, 4, PALETTE.fox, [0.046, 0.095, side * 0.02], undefined, undefined, side * 0.25));
  }
  parts.push(cone(0.024, 0.073, 5, PALETTE.fox, [-0.07, 0.065, 0], undefined, undefined, 1.2));
  parts.push(cone(0.017, 0.026, 5, PALETTE.foxLight, [-0.108, 0.095, 0], undefined, undefined, 1.2));
  for (const x of [-0.035, 0.035]) {
    for (const z of [-0.017, 0.017]) {
      parts.push(cylinder(0.005, 0.006, 0.041, 4, PALETTE.fox, [x, 0.021, z]));
    }
  }
  return defineAsset(parts);
}

function buildBird(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.03, 7, 5, PALETTE.bird, [0, 0.061, 0], [1.3, 0.75, 0.8]),
    sphere(0.018, 6, 4, PALETTE.birdLight, [0.036, 0.088, 0]),
    cone(0.008, 0.022, 4, PALETTE.beak, [0.056, 0.084, 0], undefined, undefined, -Math.PI / 2),
  ];
  for (const side of [-1, 1]) {
    parts.push(sphere(0.021, 5, 3, PALETTE.birdLight, [0, 0.076, side * 0.026], [1.1, 0.18, 0.7]));
  }
  parts.push(cone(0.012, 0.03, 4, PALETTE.bird, [-0.042, 0.068, 0], undefined, undefined, Math.PI / 2));
  return defineAsset(parts);
}

function buildFish(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.034, 7, 5, PALETTE.fish, [0, 0.045, 0], [1.65, 0.85, 0.7]),
    cone(0.025, 0.055, 4, PALETTE.fishLight, [-0.068, 0.045, 0], undefined, undefined, Math.PI / 2),
    cone(0.017, 0.036, 4, PALETTE.fishLight, [0, 0.077, 0], undefined, undefined, 0),
  ];
  for (const side of [-1, 1]) {
    parts.push(sphere(0.014, 5, 3, PALETTE.fishLight, [0.005, 0.042, side * 0.026], [1, 0.2, 0.8]));
  }
  return defineAsset(parts, 0.012);
}

function buildInsect(): AssetGeometry {
  const parts: Part[] = [
    sphere(0.019, 6, 4, PALETTE.insect, [0, 0.032, 0], [1.5, 0.8, 0.8]),
    sphere(0.012, 5, 4, PALETTE.insectLight, [0.031, 0.036, 0]),
  ];
  for (const side of [-1, 1]) {
    parts.push(sphere(0.021, 5, 3, PALETTE.insectLight, [0.002, 0.055, side * 0.018], [1, 0.15, 0.6]));
    parts.push(cylinder(0.002, 0.002, 0.022, 3, PALETTE.insect, [0.04, 0.052, side * 0.008], undefined, side * 0.5));
  }
  for (const x of [-0.012, 0.012]) {
    for (const z of [-0.014, 0.014]) {
      parts.push(cylinder(0.002, 0.002, 0.03, 3, PALETTE.insect, [x, 0.015, z], undefined, z > 0 ? 0.35 : -0.35));
    }
  }
  return defineAsset(parts);
}

export const ASSET_GEOMETRY: Record<ObjectType, AssetGeometry> = {
  grass: defineAsset([
    cone(0.012, 0.1, 3, 0x7fb44e, [-0.018, 0.05, 0], undefined, undefined, 0.22),
    cone(0.012, 0.11, 3, 0x9acb62, [0.018, 0.055, 0.008], undefined, undefined, -0.2),
    cone(0.011, 0.09, 3, 0x6fa543, [0, 0.045, -0.02], undefined, undefined, 0.12),
  ]),
  sand: defineAsset([
    rock(0.036, PALETTE.sand, [-0.02, 0.014, 0], [1, 0.38, 1]),
    rock(0.03, PALETTE.sandLight, [0.022, 0.012, 0.015], [1, 0.4, 1]),
    rock(0.024, PALETTE.sand, [0.005, 0.01, -0.026], [1, 0.42, 1]),
  ]),
  rock: defineAsset([
    rock(0.052, PALETTE.stone, [0, 0.045, 0]),
    rock(0.034, PALETTE.stoneLight, [-0.038, 0.03, 0.018]),
    rock(0.028, PALETTE.stoneDark, [0.036, 0.025, -0.014]),
  ]),
  hill: defineAsset([
    sphere(0.09, 8, 4, PALETTE.leaf, [0, 0.075, 0], [1, 0.95, 1]),
    sphere(0.055, 7, 4, PALETTE.leafDark, [-0.05, 0.05, 0.025], [1, 0.9, 1]),
    sphere(0.05, 7, 4, PALETTE.leafLight, [0.05, 0.045, -0.02], [1, 0.85, 1]),
  ]),
  mountain: defineAsset([
    cone(0.1, 0.5, 5, PALETTE.stone, [0, 0.25, 0]),
    cone(0.068, 0.34, 5, PALETTE.stoneDark, [-0.055, 0.17, 0.02], undefined, undefined, 0.12),
    cone(0.06, 0.3, 5, PALETTE.stoneLight, [0.055, 0.15, -0.015], undefined, undefined, -0.1),
    cone(0.045, 0.14, 5, PALETTE.snow, [0, 0.43, 0]),
  ]),
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
    sphere(0.06, 7, 4, PALETTE.leaf, [-0.035, 0.075, 0], [1, 1.25, 1]),
    sphere(0.065, 7, 4, PALETTE.leafLight, [0.035, 0.082, 0.015], [1, 1.31, 1]),
    sphere(0.05, 6, 4, PALETTE.leafDark, [0, 0.095, -0.035], [1, 1.3, 1]),
  ]),
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
