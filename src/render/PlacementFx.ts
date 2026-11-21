import {
  BatchedMesh3D,
  Material3D,
  Matrix4,
  Quaternion,
  RenderPassBit,
  TorusGeometry,
  Vector3,
  View3D,
} from '@pixi/3d';
import type { TerrainConfig } from '../sim/types';
import { terrainRadius } from './terrain';

const CAPACITY = 6;
const DURATION = 0.65;

interface Pulse {
  active: boolean;
  age: number;
  normal: [number, number, number];
  contact: number;
}

/** Brief accent ring at the exact surface point the player tapped. */
export class PlacementFx {
  private readonly batch: BatchedMesh3D;
  private readonly pulses: Pulse[] = [];
  private readonly up = new Vector3(0, 1, 0);
  private readonly q = new Quaternion();
  private readonly matrix = new Matrix4();
  private readonly normal = new Vector3();
  private readonly position = new Vector3();
  private readonly scale = new Vector3();
  private cursor = 0;

  constructor(view: View3D) {
    const geometry = new TorusGeometry({ radius: 0.085, tube: 0.008, radialSegments: 4, tubularSegments: 16 });
    const material = new Material3D({ baseColor: 0x6fd39b, roughness: 0.5, flatShading: true });
    this.batch = new BatchedMesh3D({ size: CAPACITY });
    for (let slot = 0; slot < CAPACITY; slot++) {
      this.batch.setGeometryAt(slot, geometry);
      this.batch.setMaterialAt(slot, material);
      this.batch.setPassesAt(slot, RenderPassBit.OPAQUE);
      this.batch.setVisibleAt(slot, false);
      this.pulses.push({ active: false, age: DURATION, normal: [0, 1, 0], contact: 1 });
    }
    view.root.addChild(this.batch);
  }

  trigger(dir: [number, number, number], terrain: TerrainConfig, seed: number): void {
    const length = Math.hypot(dir[0], dir[1], dir[2]) || 1;
    const x = dir[0] / length;
    const y = dir[1] / length;
    const z = dir[2] / length;
    const slot = this.cursor;
    const pulse = this.pulses[slot];
    pulse.active = true;
    pulse.age = 0;
    pulse.normal = [x, y, z];
    pulse.contact = terrainRadius(x, y, z, seed, terrain) + 0.014;
    this.cursor = (slot + 1) % CAPACITY;
    this.writeSlot(slot, pulse);
  }

  reset(): void {
    for (let slot = 0; slot < CAPACITY; slot++) {
      this.pulses[slot].active = false;
      this.pulses[slot].age = DURATION;
      this.batch.setVisibleAt(slot, false);
    }
    this.cursor = 0;
  }

  snapshot(): Array<{ active: boolean; age: number; progress: number }> {
    return this.pulses.map((pulse) => ({
      active: pulse.active,
      age: Number(pulse.age.toFixed(3)),
      progress: Number(Math.min(1, pulse.age / DURATION).toFixed(3)),
    }));
  }

  update(deltaSeconds: number): void {
    for (let slot = 0; slot < CAPACITY; slot++) {
      const pulse = this.pulses[slot];
      if (!pulse.active) continue;
      pulse.age += deltaSeconds;
      if (pulse.age >= DURATION) {
        pulse.active = false;
        this.batch.setVisibleAt(slot, false);
        continue;
      }
      this.writeSlot(slot, pulse);
    }
  }

  private writeSlot(slot: number, pulse: Pulse): void {
    const progress = Math.min(1, Math.max(0, pulse.age / DURATION));
    const grow = 0.55 + Math.sin(progress * Math.PI) * 0.85;
    this.normal.set(...pulse.normal);
    this.position.set(this.normal.x * pulse.contact, this.normal.y * pulse.contact, this.normal.z * pulse.contact);
    this.q.setFromUnitVectors(this.up, this.normal);
    this.matrix.makeRotationFromQuaternion(this.q);
    this.scale.set(grow, grow, grow);
    this.matrix.scale(this.scale);
    this.matrix.setPosition(this.position);
    this.batch.setMatrixAt(slot, this.matrix);
    this.batch.setVisibleAt(slot, true);
  }
}
