import {
  BatchedMesh3D,
  CylinderGeometry,
  Material3D,
  Matrix4,
  RenderPassBit,
  SphereGeometry,
  Vector3,
  View3D,
} from '@pixi/3d';
import type { WeatherType } from '../sim/types';

const DEFAULT_CLOUDS = 14;
const DEFAULT_DROPS = 80;

export class WeatherFx {
  private readonly clouds: BatchedMesh3D;
  private readonly drops: BatchedMesh3D;
  private readonly cloudGeometry = new SphereGeometry({ radius: 0.16, widthSegments: 8, heightSegments: 5 });
  private readonly cloudLight = new Material3D({ baseColor: 0xf2f6ff, roughness: 1, flatShading: true });
  private readonly cloudDark = new Material3D({ baseColor: 0x8a94a6, roughness: 1, flatShading: true });
  private readonly rainMaterial = new Material3D({ baseColor: 0x8fd0ff, roughness: 0.4 });
  private readonly snowMaterial = new Material3D({ baseColor: 0xffffff, roughness: 1 });
  private readonly rainGeometry = new CylinderGeometry({ radiusTop: 0.006, radiusBottom: 0.006, height: 0.14, radialSegments: 4 });
  private readonly snowGeometry = new SphereGeometry({ radius: 0.018, widthSegments: 4, heightSegments: 3 });
  private readonly matrix = new Matrix4();
  private readonly position = new Vector3();
  private readonly scale = new Vector3();
  private readonly phases: Float32Array;
  private cloudCount: number;
  private dropCount: number;
  private type: WeatherType = 'sunny';
  private intensity = 0.6;
  private time = 0;
  private needsReset = true;

  constructor(view: View3D, seed: number, maxClouds = DEFAULT_CLOUDS, maxDrops = DEFAULT_DROPS) {
    this.cloudCount = maxClouds;
    this.dropCount = maxDrops;
    this.phases = new Float32Array(maxDrops);
    this.clouds = new BatchedMesh3D({ size: maxClouds });
    this.drops = new BatchedMesh3D({ size: maxDrops });
    view.root.addChild(this.clouds, this.drops);

    for (let i = 0; i < maxClouds; i++) {
      this.clouds.setGeometryAt(i, this.cloudGeometry);
      this.clouds.setMaterialAt(i, this.cloudLight);
      this.clouds.setPassesAt(i, RenderPassBit.OPAQUE);
      this.clouds.setVisibleAt(i, true);
    }
    for (let i = 0; i < maxDrops; i++) {
      this.phases[i] = ((i * 2654435761 + seed) >>> 0) / 4294967296;
      this.drops.setGeometryAt(i, this.rainGeometry);
      this.drops.setMaterialAt(i, this.rainMaterial);
      this.drops.setPassesAt(i, RenderPassBit.OPAQUE);
      this.drops.setVisibleAt(i, false);
    }
  }

  setBudget(maxClouds: number, maxDrops: number): void {
    this.cloudCount = Math.min(this.cloudCount, maxClouds);
    this.dropCount = Math.min(this.dropCount, maxDrops);
    this.needsReset = true;
  }

  setWeather(type: WeatherType, intensity: number): void {
    if (this.type === type && this.intensity === intensity && !this.needsReset) return;
    this.type = type;
    this.intensity = intensity;
    this.needsReset = true;
    const material = type === 'storm' ? this.cloudDark : this.cloudLight;
    for (let i = 0; i < this.cloudCount; i++) this.clouds.setMaterialAt(i, material);
  }

  update(deltaSeconds: number): void {
    this.time += deltaSeconds;

    for (let i = 0; i < this.cloudCount; i++) {
      const phase = (i / this.cloudCount) * Math.PI * 2 + this.time * 0.045;
      const tilt = Math.sin(i * 1.7) * 0.55;
      const radius = 1.55 + (i % 3) * 0.06;
      this.position.set(Math.cos(phase) * radius, 0.7 + tilt, Math.sin(phase) * radius);
      this.scale.set(1, 0.35, 1);
      this.matrix.makeTranslation(this.position.x, this.position.y, this.position.z).scale(this.scale);
      this.clouds.setMatrixAt(i, this.matrix);
    }
    for (let i = this.cloudCount; i < this.clouds.size; i++) this.clouds.setVisibleAt(i, false);

    const active = this.type === 'rain' || this.type === 'snow' || this.type === 'storm';
    const snow = this.type === 'snow';
    const geometry = snow ? this.snowGeometry : this.rainGeometry;
    const material = snow ? this.snowMaterial : this.rainMaterial;
    const count = active ? Math.round(this.dropCount * (0.35 + this.intensity * 0.65)) : 0;

    for (let i = 0; i < this.dropCount; i++) {
      if (i >= count) {
        this.drops.setVisibleAt(i, false);
        continue;
      }
      const phase = (this.phases[i] + this.time * (snow ? 0.12 : 0.45)) % 1;
      const angle = this.phases[i] * Math.PI * 2;
      const radial = 0.35 + ((this.phases[i] * 37) % 1) * 1.05;
      this.position.set(Math.cos(angle) * radial, 1.5 - phase * 3, Math.sin(angle) * radial);
      this.scale.set(1, snow ? 1 : 0.7 + this.intensity, 1);
      this.matrix.makeTranslation(this.position.x, this.position.y, this.position.z).scale(this.scale);
      if (this.needsReset || !this.drops.getVisibleAt(i)) {
        this.drops.setGeometryAt(i, geometry);
        this.drops.setMaterialAt(i, material);
        this.drops.setPassesAt(i, RenderPassBit.OPAQUE);
      }
      this.drops.setMatrixAt(i, this.matrix);
      this.drops.setVisibleAt(i, true);
    }
    for (let i = this.dropCount; i < this.drops.size; i++) this.drops.setVisibleAt(i, false);
    this.needsReset = false;
  }
}
