import {
  BatchedMesh3D,
  Material3D,
  Matrix4,
  Quaternion,
  RenderPassBit,
  Vector3,
  View3D,
} from '@pixi/3d';
import { OBJECT_DEFS, OBJECT_ORDER } from '../content/objects';
import { DEFAULT_TERRAIN_CONFIG, type Environment, type ObjectType, type PlacedObject, type TerrainConfig } from '../sim/types';
import { ASSET_GEOMETRY } from './assetGeometry';
import { terrainRadius } from './terrain';

const CAPACITY = 96;
const POP_DURATION = 0.32;

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

interface Batch {
  batch: BatchedMesh3D;
  ids: (string | null)[];
  ages: Float32Array;
  sizes: Float32Array;
  positions: Float32Array;
  rotations: Float32Array;
}

export class PropRenderer {
  private readonly batches = new Map<ObjectType, Batch>();
  private readonly capacity: number;
  private readonly up = new Vector3(0, 1, 0);
  private readonly q = new Quaternion();
  private readonly spin = new Quaternion();
  private readonly matrix = new Matrix4();
  private readonly normal = new Vector3();
  private readonly position = new Vector3();
  private readonly scale = new Vector3();
  private seed: number;
  private terrain: TerrainConfig = { ...DEFAULT_TERRAIN_CONFIG };

  constructor(view: View3D, seed: number, capacity = CAPACITY, terrain: TerrainConfig = DEFAULT_TERRAIN_CONFIG) {
    this.seed = seed;
    this.terrain = { ...terrain };
    this.capacity = capacity;
    for (const type of OBJECT_ORDER) {
      const material = new Material3D({
        baseColor: 0xffffff,
        vertexColors: true,
        roughness: 0.9,
        flatShading: true,
      });
      const batch = new BatchedMesh3D({ size: this.capacity });
      const asset = ASSET_GEOMETRY[type];
      const ages = new Float32Array(this.capacity).fill(POP_DURATION);
      for (let slot = 0; slot < this.capacity; slot++) {
        batch.setGeometryAt(slot, asset.geometry);
        batch.setMaterialAt(slot, material);
        batch.setPassesAt(slot, RenderPassBit.OPAQUE);
        batch.setVisibleAt(slot, false);
      }
      view.root.addChild(batch);
      this.batches.set(type, {
        batch,
        ids: new Array(this.capacity).fill(null),
        ages,
        sizes: new Float32Array(this.capacity),
        positions: new Float32Array(this.capacity * 3),
        rotations: new Float32Array(this.capacity * 4),
      });
    }
  }

  setSeed(seed: number, terrain: TerrainConfig = this.terrain): void {
    this.seed = seed;
    this.terrain = { ...terrain };
  }

  sync(objects: PlacedObject[], env: Environment, animateNew = true): void {
    const byType = new Map<ObjectType, PlacedObject[]>();
    for (const type of OBJECT_ORDER) byType.set(type, []);
    for (const object of objects) byType.get(object.type)?.push(object);

    const vegetationScale = 0.55 + Math.max(0, Math.min(1, (env.oxygen - 8) / 70)) * 0.75;

    for (const type of OBJECT_ORDER) {
      const entry = this.batches.get(type)!;
      const list = byType.get(type)!;
      const asset = ASSET_GEOMETRY[type];
      for (let slot = 0; slot < this.capacity; slot++) {
        const object = list[slot];
        if (!object) {
          entry.ids[slot] = null;
          entry.batch.setVisibleAt(slot, false);
          continue;
        }
        if (entry.ids[slot] !== object.id) {
          entry.ids[slot] = object.id;
          entry.ages[slot] = animateNew ? 0 : POP_DURATION;
        }
        const [x, y, z] = object.dir;
        const length = Math.hypot(x, y, z) || 1;
        this.normal.set(x / length, y / length, z / length);
        const radius = terrainRadius(this.normal.x, this.normal.y, this.normal.z, this.seed, this.terrain);
        const def = OBJECT_DEFS[type];
        const growth = type === 'tree' || type === 'bush' || type === 'flower' || type === 'grass' ? vegetationScale : 1;
        const size = def.scale * object.scale * growth;
        const contact = radius + size * asset.baseLift;
        const p = slot * 3;
        entry.positions[p] = this.normal.x * contact;
        entry.positions[p + 1] = this.normal.y * contact;
        entry.positions[p + 2] = this.normal.z * contact;
        this.q.setFromUnitVectors(this.up, this.normal);
        this.spin.setFromAxisAngle(this.up, object.rotation);
        this.q.multiply(this.spin);
        const r = slot * 4;
        entry.rotations[r] = this.q.x;
        entry.rotations[r + 1] = this.q.y;
        entry.rotations[r + 2] = this.q.z;
        entry.rotations[r + 3] = this.q.w;
        entry.sizes[slot] = size;
        this.writeSlot(entry, slot);
      }
    }
  }

  update(deltaSeconds: number): void {
    for (const entry of this.batches.values()) {
      for (let slot = 0; slot < this.capacity; slot++) {
        if (!entry.ids[slot] || entry.ages[slot] >= POP_DURATION) continue;
        entry.ages[slot] = Math.min(POP_DURATION, entry.ages[slot] + deltaSeconds);
        this.writeSlot(entry, slot);
      }
    }
  }

  private writeSlot(entry: Batch, slot: number): void {
    const t = Math.min(1, Math.max(0, entry.ages[slot] / POP_DURATION));
    const pop = 0.45 + 0.55 * easeOutBack(t);
    const r = slot * 4;
    this.q.set(entry.rotations[r], entry.rotations[r + 1], entry.rotations[r + 2], entry.rotations[r + 3]);
    this.matrix.makeRotationFromQuaternion(this.q);
    const size = entry.sizes[slot] * pop;
    this.scale.set(size, size, size);
    this.matrix.scale(this.scale);
    const p = slot * 3;
    this.position.set(entry.positions[p], entry.positions[p + 1], entry.positions[p + 2]);
    this.matrix.setPosition(this.position);
    entry.batch.setMatrixAt(slot, this.matrix);
    entry.batch.setVisibleAt(slot, true);
  }
}
