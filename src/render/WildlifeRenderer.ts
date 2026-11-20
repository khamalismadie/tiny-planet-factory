import {
  BatchedMesh3D,
  ConeGeometry,
  Geometry3D,
  Material3D,
  Matrix4,
  Quaternion,
  RenderPassBit,
  SphereGeometry,
  Vector3,
  View3D,
} from '@pixi/3d';
import { SPECIES_DEFS, SPECIES_ORDER } from '../content/species';
import type { SpeciesId, TerrainConfig, WildlifeAgent } from '../sim/types';
import { terrainRadius } from './terrain';

const PER_SPECIES_CAPACITY = 12;

type GeometryFactory = () => Geometry3D;

const GEOMETRY: Record<SpeciesId, GeometryFactory> = {
  deer: () => new SphereGeometry({ radius: 0.05, widthSegments: 8, heightSegments: 5 }),
  fox: () => new ConeGeometry({ radius: 0.055, height: 0.13, radialSegments: 5 }),
  bird: () => new SphereGeometry({ radius: 0.035, widthSegments: 6, heightSegments: 4 }),
  fish: () => new SphereGeometry({ radius: 0.045, widthSegments: 8, heightSegments: 5 }),
  insect: () => new SphereGeometry({ radius: 0.025, widthSegments: 6, heightSegments: 4 }),
};

const SHAPE_SCALE: Record<SpeciesId, [number, number, number]> = {
  deer: [1.7, 0.9, 0.9],
  fox: [1, 1.2, 1],
  bird: [1.6, 0.55, 0.8],
  fish: [1.8, 0.6, 0.7],
  insect: [1, 0.7, 1.4],
};

const GROUND_OFFSET: Record<SpeciesId, number> = {
  deer: 0.045,
  fox: 0.078,
  bird: 0.01925,
  fish: 0.027,
  insect: 0.0175,
};

const HOVER: Partial<Record<SpeciesId, number>> = { bird: 0.07, fish: 0.02 };

interface Batch {
  batch: BatchedMesh3D;
}

export class WildlifeRenderer {
  private readonly batches = new Map<SpeciesId, Batch>();
  private readonly up = new Vector3(0, 1, 0);
  private readonly q = new Quaternion();
  private readonly matrix = new Matrix4();
  private readonly normal = new Vector3();
  private readonly position = new Vector3();
  private readonly scale = new Vector3();
  private budget: number;

  constructor(view: View3D, capacity: number) {
    this.budget = capacity;
    for (const species of SPECIES_ORDER) {
      const material = new Material3D({
        baseColor: SPECIES_DEFS[species].color,
        roughness: 0.85,
        flatShading: true,
      });
      const batch = new BatchedMesh3D({ size: PER_SPECIES_CAPACITY });
      const geometry = GEOMETRY[species]();
      for (let slot = 0; slot < PER_SPECIES_CAPACITY; slot++) {
        batch.setGeometryAt(slot, geometry);
        batch.setMaterialAt(slot, material);
        batch.setPassesAt(slot, RenderPassBit.OPAQUE);
        batch.setVisibleAt(slot, false);
      }
      view.root.addChild(batch);
      this.batches.set(species, { batch });
    }
  }

  setBudget(capacity: number): void {
    this.budget = capacity;
  }

  sync(agents: WildlifeAgent[], terrain: TerrainConfig, seed: number): void {
    const bySpecies = new Map<SpeciesId, WildlifeAgent[]>();
    for (const species of SPECIES_ORDER) bySpecies.set(species, []);
    for (const agent of agents) {
      if (bySpecies.has(agent.species)) bySpecies.get(agent.species)!.push(agent);
    }

    let rendered = 0;
    for (const species of SPECIES_ORDER) {
      const entry = this.batches.get(species)!;
      const list = bySpecies.get(species)!;
      for (let slot = 0; slot < PER_SPECIES_CAPACITY; slot++) {
        const agent = list[slot];
        if (!agent || rendered >= this.budget) {
          entry.batch.setVisibleAt(slot, false);
          continue;
        }
        rendered++;
        const length = Math.hypot(...agent.dir) || 1;
        this.normal.set(agent.dir[0] / length, agent.dir[1] / length, agent.dir[2] / length);
        const radius = terrainRadius(this.normal.x, this.normal.y, this.normal.z, seed, terrain);
        const [sx, sy, sz] = SHAPE_SCALE[species];
        const size = 0.9 + agent.energy / 500;
        const contact = radius + GROUND_OFFSET[species] * size + (HOVER[species] ?? 0);
        this.position.set(this.normal.x * contact, this.normal.y * contact, this.normal.z * contact);
        this.q.setFromUnitVectors(this.up, this.normal);
        this.matrix.makeRotationFromQuaternion(this.q);
        this.scale.set(size * sx, size * sy, size * sz);
        this.matrix.scale(this.scale);
        this.matrix.setPosition(this.position);
        entry.batch.setMatrixAt(slot, this.matrix);
        entry.batch.setVisibleAt(slot, true);
      }
    }
  }
}
