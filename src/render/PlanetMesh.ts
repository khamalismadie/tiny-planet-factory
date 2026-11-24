import {
  Geometry3D,
  getAttributeData,
  IcosahedronGeometry,
  Material3D,
  Mesh3D,
  Vector3,
  srgbToLinear,
} from '@pixi/3d';
import { DEFAULT_TERRAIN_CONFIG, type Environment, type TerrainConfig } from '../sim/types';
import { terrainRadius } from './terrain';

const PALETTE = {
  barren: 0xd2bd7e,
  dry: 0xe8cf93,
  ocean: 0x36a7e8,
  grass: 0x6fc45f,
  lush: 0x38a84e,
  rock: 0xa8a094,
  snow: 0xf4f9ff,
};

function linear(hex: number): [number, number, number] {
  return [
    srgbToLinear(((hex >> 16) & 255) / 255),
    srgbToLinear(((hex >> 8) & 255) / 255),
    srgbToLinear((hex & 255) / 255),
  ];
}

const INITIAL_ENV: Environment = {
  temperature: 18,
  water: 22,
  humidity: 25,
  oxygen: 10,
  fertility: 20,
  biodiversity: 5,
  energy: 50,
  stability: 38,
};

export class PlanetMesh {
  readonly mesh: Mesh3D;
  private readonly geometry: Geometry3D;
  private readonly colors: Float32Array;
  private readonly heights: Float32Array;
  private readonly sourceNormals: Float32Array;
  private readonly sourcePositions: Float32Array;
  private readonly positions: Float32Array;
  private readonly normals: Float32Array;
  private readonly uvs: Float32Array;
  private readonly indices: Uint32Array;
  private env: Environment = { ...INITIAL_ENV };
  private terrain: TerrainConfig = { ...DEFAULT_TERRAIN_CONFIG };

  constructor(seed: number, detail = 4, terrain: TerrainConfig = DEFAULT_TERRAIN_CONFIG) {
    this.terrain = { ...terrain };
    const base = new IcosahedronGeometry({ radius: 1, detail });
    this.sourcePositions = getAttributeData(base, 'aPosition', 3);
    this.sourceNormals = getAttributeData(base, 'aNormal', 3);
    this.uvs = getAttributeData(base, 'aUV', 2);
    this.indices = new Uint32Array(base.indices as Uint16Array | Uint32Array);

    this.positions = new Float32Array(this.sourcePositions.length);
    this.normals = new Float32Array(this.sourcePositions.length);
    this.colors = new Float32Array((this.sourcePositions.length / 3) * 4);
    this.heights = new Float32Array(this.sourcePositions.length / 3);

    this.geometry = new Geometry3D({
      positions: this.positions,
      normals: this.normals,
      uvs: new Float32Array(this.uvs),
      colors: this.colors,
      indices: this.indices,
      dynamic: true,
      quantizeNormals: false,
    });
    this.mesh = new Mesh3D({
      geometry: this.geometry,
      material: new Material3D({ baseColor: 0xffffff, vertexColors: true, roughness: 0.95, flatShading: true }),
      eventMode: 'static',
      hitVolume: 'geometry',
      castShadow: false,
    });

    this.rebuild(seed);
    this.update(this.env);
  }

  reseed(seed: number, terrain: TerrainConfig = this.terrain): void {
    this.terrain = { ...terrain };
    this.rebuild(seed);
    this.update(this.env);
  }

  private rebuild(seed: number): void {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;

    for (let i = 0; i < this.sourcePositions.length; i += 3) {
      const length = Math.hypot(this.sourcePositions[i], this.sourcePositions[i + 1], this.sourcePositions[i + 2]) || 1;
      const nx = this.sourcePositions[i] / length;
      const ny = this.sourcePositions[i + 1] / length;
      const nz = this.sourcePositions[i + 2] / length;
      const radius = terrainRadius(nx, ny, nz, seed, this.terrain);
      const px = nx * radius;
      const py = ny * radius;
      const pz = nz * radius;
      this.positions[i] = px;
      this.positions[i + 1] = py;
      this.positions[i + 2] = pz;
      const baseline = this.terrain.seaLevel - this.terrain.amplitude * 0.9;
      const span = Math.max(0.02, this.terrain.amplitude * 2 + this.terrain.ridge * 0.08);
      this.heights[i / 3] = (radius - baseline) / span;
      minX = Math.min(minX, px);
      minY = Math.min(minY, py);
      minZ = Math.min(minZ, pz);
      maxX = Math.max(maxX, px);
      maxY = Math.max(maxY, py);
      maxZ = Math.max(maxZ, pz);
    }

    this.geometry.bounds3D.set({ x: minX, y: minY, z: minZ }, { x: maxX, y: maxY, z: maxZ });
    this.geometry.boundsSphere.setFromBox(this.geometry.bounds3D);
    this.normals.fill(0);
    const a = new Vector3();
    const b = new Vector3();
    const c = new Vector3();
    const edge1 = new Vector3();
    const edge2 = new Vector3();
    const faceNormal = new Vector3();
    for (let i = 0; i < this.indices.length; i += 3) {
      const ia = this.indices[i] * 3;
      const ib = this.indices[i + 1] * 3;
      const ic = this.indices[i + 2] * 3;
      a.set(this.positions[ia], this.positions[ia + 1], this.positions[ia + 2]);
      b.set(this.positions[ib], this.positions[ib + 1], this.positions[ib + 2]);
      c.set(this.positions[ic], this.positions[ic + 1], this.positions[ic + 2]);
      edge1.copyFrom(b).subtract(a);
      edge2.copyFrom(c).subtract(a);
      faceNormal.cross(edge1, edge2);
      for (const offset of [ia, ib, ic]) {
        this.normals[offset] += faceNormal.x;
        this.normals[offset + 1] += faceNormal.y;
        this.normals[offset + 2] += faceNormal.z;
      }
    }
    for (let i = 0; i < this.normals.length; i += 3) {
      const length = Math.hypot(this.normals[i], this.normals[i + 1], this.normals[i + 2]) || 1;
      const dot =
        (this.normals[i] * this.sourceNormals[i] +
          this.normals[i + 1] * this.sourceNormals[i + 1] +
          this.normals[i + 2] * this.sourceNormals[i + 2]) /
        length;
      const sign = dot < 0 ? -1 : 1;
      this.normals[i] = (sign * this.normals[i]) / length;
      this.normals[i + 1] = (sign * this.normals[i + 1]) / length;
      this.normals[i + 2] = (sign * this.normals[i + 2]) / length;
    }

    this.geometry.attributes.aPosition.buffer.update();
    this.geometry.attributes.aNormal.buffer.update();
  }

  update(env: Environment): void {
    this.env = { ...env };
    const green = Math.max(0, Math.min(1, (env.oxygen - 10) / 55));
    const wet = Math.max(0, Math.min(1, (env.water - 20) / 45));
    const cold = Math.max(0, Math.min(1, (18 - env.temperature) / 25));
    const barren = linear(PALETTE.barren);
    const dry = linear(PALETTE.dry);
    const ocean = linear(PALETTE.ocean);
    const grass = linear(PALETTE.grass);
    const lush = linear(PALETTE.lush);
    const rock = linear(PALETTE.rock);
    const snow = linear(PALETTE.snow);

    for (let i = 0; i < this.heights.length; i++) {
      const h = this.heights[i];
      const lowland = h < 0.42;
      const waterLevel = 0.18 + (1 - wet) * 0.12;
      let from: [number, number, number];
      let to: [number, number, number];
      let mix: number;
      if (lowland && wet > 0.35 && h < waterLevel) {
        from = barren;
        to = ocean;
        mix = 0.85;
      } else if (h > 0.78) {
        from = rock;
        to = cold > 0.35 ? snow : rock;
        mix = cold > 0.35 ? cold : 0;
      } else {
        from = green > 0.25 ? dry : barren;
        to = green > 0.55 ? lush : grass;
        mix = Math.max(0, Math.min(1, green * 1.2));
      }
      const offset = i * 4;
      const upward = Math.max(0, this.normals[i * 3 + 1]);
      const slopeShade = 0.93 + upward * 0.07;
      for (let channel = 0; channel < 3; channel++) {
        const base = from[channel] + (to[channel] - from[channel]) * mix;
        this.colors[offset + channel] = base * slopeShade;
      }
      this.colors[offset + 3] = 1;
    }
    this.geometry.attributes.aColor.buffer.update();
  }
}
