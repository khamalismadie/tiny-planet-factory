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

interface Batch {
  batch: BatchedMesh3D;
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
      for (let slot = 0; slot < this.capacity; slot++) {
        batch.setGeometryAt(slot, asset.geometry);
        batch.setMaterialAt(slot, material);
        batch.setPassesAt(slot, RenderPassBit.OPAQUE);
        batch.setVisibleAt(slot, false);
      }
      view.root.addChild(batch);
      this.batches.set(type, { batch });
    }
  }

  setSeed(seed: number, terrain: TerrainConfig = this.terrain): void {
    this.seed = seed;
    this.terrain = { ...terrain };
  }

  sync(objects: PlacedObject[], env: Environment): void {
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
          entry.batch.setVisibleAt(slot, false);
          continue;
        }
        const [x, y, z] = object.dir;
        const length = Math.hypot(x, y, z) || 1;
        this.normal.set(x / length, y / length, z / length);
        const radius = terrainRadius(this.normal.x, this.normal.y, this.normal.z, this.seed, this.terrain);
        const def = OBJECT_DEFS[type];
        const growth = type === 'tree' || type === 'bush' || type === 'flower' || type === 'grass' ? vegetationScale : 1;
        const size = def.scale * object.scale * growth;
        const contact = radius + size * asset.baseLift;
        this.position.set(this.normal.x * contact, this.normal.y * contact, this.normal.z * contact);
        this.q.setFromUnitVectors(this.up, this.normal);
        this.spin.setFromAxisAngle(this.up, object.rotation);
        this.q.multiply(this.spin);
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
