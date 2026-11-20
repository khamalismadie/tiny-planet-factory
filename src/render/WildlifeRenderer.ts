import {
  BatchedMesh3D,
  Material3D,
  Matrix4,
  Quaternion,
  RenderPassBit,
  Vector3,
  View3D,
} from '@pixi/3d';
import { SPECIES_ORDER } from '../content/species';
import type { SpeciesId, TerrainConfig, WildlifeAgent } from '../sim/types';
import { SPECIES_GEOMETRY } from './assetGeometry';
import { terrainRadius } from './terrain';

const PER_SPECIES_CAPACITY = 12;
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
        baseColor: 0xffffff,
        vertexColors: true,
        roughness: 0.85,
        flatShading: true,
      });
      const batch = new BatchedMesh3D({ size: PER_SPECIES_CAPACITY });
      const asset = SPECIES_GEOMETRY[species];
      for (let slot = 0; slot < PER_SPECIES_CAPACITY; slot++) {
        batch.setGeometryAt(slot, asset.geometry);
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
      const asset = SPECIES_GEOMETRY[species];
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
        const size = 0.9 + agent.energy / 500;
        const contact = radius + asset.baseLift * size + (HOVER[species] ?? 0);
        this.position.set(this.normal.x * contact, this.normal.y * contact, this.normal.z * contact);
        this.q.setFromUnitVectors(this.up, this.normal);
        this.matrix.makeRotationFromQuaternion(this.q);
        this.scale.set(size, size, size);
        this.matrix.scale(this.scale);
        this.matrix.setPosition(this.position);
        entry.batch.setMatrixAt(slot, this.matrix);
        entry.batch.setVisibleAt(slot, true);
      }
    }
  }
}
