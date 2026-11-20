import {
  BatchedMesh3D,
  ConeGeometry,
  CylinderGeometry,
  Geometry3D,
  IcosahedronGeometry,
  Material3D,
  Matrix4,
  Quaternion,
  RenderPassBit,
  SphereGeometry,
  Vector3,
  View3D,
} from '@pixi/3d';
import { OBJECT_DEFS, OBJECT_ORDER } from '../content/objects';
import { DEFAULT_TERRAIN_CONFIG, type Environment, type ObjectType, type PlacedObject, type TerrainConfig } from '../sim/types';
import { terrainRadius } from './terrain';

const CAPACITY = 96;

type GeometryFactory = () => Geometry3D;

const GEOMETRY: Record<ObjectType, GeometryFactory> = {
  grass: () => new ConeGeometry({ radius: 0.035, height: 0.12, radialSegments: 3 }),
  sand: () => new IcosahedronGeometry({ radius: 0.06, detail: 0 }),
  rock: () => new IcosahedronGeometry({ radius: 0.07, detail: 0 }),
  hill: () => new SphereGeometry({ radius: 0.12, widthSegments: 8, heightSegments: 4 }),
  mountain: () => new ConeGeometry({ radius: 0.12, height: 0.3, radialSegments: 5 }),
  ocean: () => new CylinderGeometry({ radiusTop: 0.22, radiusBottom: 0.22, height: 0.02, radialSegments: 16 }),
  lake: () => new CylinderGeometry({ radiusTop: 0.13, radiusBottom: 0.13, height: 0.02, radialSegments: 12 }),
  tree: () => new ConeGeometry({ radius: 0.07, height: 0.26, radialSegments: 6 }),
  bush: () => new SphereGeometry({ radius: 0.09, widthSegments: 8, heightSegments: 5 }),
  flower: () => new SphereGeometry({ radius: 0.04, widthSegments: 6, heightSegments: 4 }),
  deer: () => new SphereGeometry({ radius: 0.05, widthSegments: 8, heightSegments: 5 }),
  fox: () => new ConeGeometry({ radius: 0.055, height: 0.13, radialSegments: 5 }),
  bird: () => new SphereGeometry({ radius: 0.035, widthSegments: 6, heightSegments: 4 }),
};

const SHAPE_SCALE: Partial<Record<ObjectType, [number, number, number]>> = {
  hill: [1, 0.35, 1],
  deer: [1.7, 0.9, 0.9],
  fox: [1, 1.2, 1],
  bird: [1.6, 0.55, 0.8],
};

// Distance from each geometry's centre to its base along local +Y, already
// including SHAPE_SCALE.y. Cone/cylinder primitives are centred at the origin,
// so half their height is the correct ground-contact offset (verified against
// the installed @pixi/3d ConeGeometry/CylinderGeometry sources).
const GROUND_OFFSET: Record<ObjectType, number> = {
  grass: 0.06,   // cone height 0.12
  sand: 0.06,    // icosahedron radius 0.06
  rock: 0.07,    // icosahedron radius 0.07
  hill: 0.042,   // sphere 0.12 * 0.35
  mountain: 0.15,// cone height 0.30
  ocean: 0.01,   // cylinder height 0.02
  lake: 0.01,    // cylinder height 0.02
  tree: 0.13,    // cone height 0.26
  bush: 0.09,    // sphere radius 0.09
  flower: 0.04,  // sphere radius 0.04
  deer: 0.045,   // sphere 0.05 * 0.9
  fox: 0.078,    // cone 0.13 * 1.2
  bird: 0.01925, // sphere 0.035 * 0.55
};

interface Batch {
  batch: BatchedMesh3D;
  material: Material3D;
}

export class PropRenderer {
  private readonly batches = new Map<ObjectType, Batch>();
  private readonly capacity: number;
  private readonly up = new Vector3(0, 1, 0);
  private readonly q = new Quaternion();
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
      const def = OBJECT_DEFS[type];
      const material = new Material3D({ baseColor: def.color, roughness: 0.9, flatShading: true });
      const batch = new BatchedMesh3D({ size: this.capacity });
      const geometry = GEOMETRY[type]();
      for (let slot = 0; slot < this.capacity; slot++) {
        batch.setGeometryAt(slot, geometry);
        batch.setMaterialAt(slot, material);
        batch.setPassesAt(slot, RenderPassBit.OPAQUE);
        batch.setVisibleAt(slot, false);
      }
      view.root.addChild(batch);
      this.batches.set(type, { batch, material });
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
        const contact = radius + size * GROUND_OFFSET[type];
        this.position.set(this.normal.x * contact, this.normal.y * contact, this.normal.z * contact);
        this.q.setFromUnitVectors(this.up, this.normal);
        this.matrix.makeRotationFromQuaternion(this.q);
        const [sx, sy, sz] = SHAPE_SCALE[type] ?? [1, 1, 1];
        this.scale.set(size * sx, size * sy, size * sz);
        this.matrix.scale(this.scale);
        this.matrix.setPosition(this.position);
        entry.batch.setMatrixAt(slot, this.matrix);
        entry.batch.setVisibleAt(slot, true);
      }
    }
  }
}
