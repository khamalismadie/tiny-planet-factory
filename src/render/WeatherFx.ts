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

// Render-space proportions. The planet radius is ~1 and a tree is ~0.045,
// so clouds stay just above the surface and precipitation stays below tree height.
export const WEATHER_VISUAL = {
  cloudRadius: 0.045,
  cloudOrbit: 1.08,
  cloudOrbitStep: 0.028,
  cloudLift: 0.2,
  cloudStormScale: 1.32,
  rainRadius: 0.0011,
  rainLength: 0.03,
  snowRadius: 0.003,
  dropAltitude: 0.12,
} as const;

export class WeatherFx {
  private readonly clouds: BatchedMesh3D;
  private readonly drops: BatchedMesh3D;
  private readonly cloudGeometry = new SphereGeometry({
    radius: WEATHER_VISUAL.cloudRadius,
    widthSegments: 10,
    heightSegments: 6,
  });
  private readonly cloudLight = new Material3D({ baseColor: 0xf2f6ff, roughness: 1, flatShading: true });
  private readonly cloudDark = new Material3D({ baseColor: 0x69748a, roughness: 1, flatShading: true });
  private readonly rainMaterial = new Material3D({ baseColor: 0x8fd0ff, roughness: 0.4 });
  private readonly snowMaterial = new Material3D({ baseColor: 0xffffff, roughness: 1 });
  private readonly rainGeometry = new CylinderGeometry({
    radiusTop: WEATHER_VISUAL.rainRadius,
    radiusBottom: WEATHER_VISUAL.rainRadius,
    height: WEATHER_VISUAL.rainLength,
    radialSegments: 4,
  });
  private readonly snowGeometry = new SphereGeometry({
    radius: WEATHER_VISUAL.snowRadius,
    widthSegments: 4,
    heightSegments: 3,
  });
  private readonly matrix = new Matrix4();
  private readonly position = new Vector3();
  private readonly scale = new Vector3();
  private readonly phases: Float32Array;
  private readonly dropDirections: Float32Array;
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
    this.dropDirections = new Float32Array(maxDrops * 3);
    this.clouds = new BatchedMesh3D({ size: maxClouds });
    this.drops = new BatchedMesh3D({ size: maxDrops });
    view.root.addChild(this.clouds, this.drops);

    for (let i = 0; i < maxClouds; i++) {
      this.clouds.setGeometryAt(i, this.cloudGeometry);
      this.clouds.setPassesAt(i, RenderPassBit.OPAQUE);
    }

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < maxDrops; i++) {
      this.phases[i] = ((i * 2654435761 + seed) >>> 0) / 4294967296;
      const y = 1 - 2 * (i + 0.5) / maxDrops;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      this.dropDirections[i * 3] = Math.cos(theta) * ring;
      this.dropDirections[i * 3 + 1] = y;
      this.dropDirections[i * 3 + 2] = Math.sin(theta) * ring;
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

    const storm = this.type === 'storm';
    const snow = this.type === 'snow';
    const cloudFraction = storm ? 1 : this.type === 'sunny' ? 0.4 : snow ? 0.7 : 0.8;
    const visibleClouds = Math.max(1, Math.round(this.cloudCount * cloudFraction));
    const cloudScale = storm ? WEATHER_VISUAL.cloudStormScale : this.type === 'sunny' ? 0.82 : 1;

    for (let i = 0; i < this.cloudCount; i++) {
      if (i >= visibleClouds) {
        this.clouds.setVisibleAt(i, false);
        continue;
      }
      const phase = (i / visibleClouds) * Math.PI * 2 + this.time * (storm ? 0.075 : 0.045);
      const tilt = Math.sin(i * 1.7) * 0.12;
      const orbit = WEATHER_VISUAL.cloudOrbit + (i % 3) * WEATHER_VISUAL.cloudOrbitStep;
      const lift = WEATHER_VISUAL.cloudLift - (storm ? 0.05 : 0) + tilt;
      this.position.set(Math.cos(phase) * orbit, lift, Math.sin(phase) * orbit);
      this.scale.set(cloudScale, 0.42 * cloudScale, cloudScale);
      this.matrix.makeTranslation(this.position.x, this.position.y, this.position.z).scale(this.scale);
      this.clouds.setMatrixAt(i, this.matrix);
      this.clouds.setVisibleAt(i, true);
    }
    for (let i = this.cloudCount; i < this.clouds.size; i++) this.clouds.setVisibleAt(i, false);

    const active = this.type === 'rain' || snow || storm;
    const geometry = snow ? this.snowGeometry : this.rainGeometry;
    const material = snow ? this.snowMaterial : this.rainMaterial;
    const density = storm ? 0.75 + this.intensity * 0.25 : 0.35 + this.intensity * (snow ? 0.4 : 0.55);
    const count = active ? Math.round(this.dropCount * density) : 0;
    const speed = storm ? 3.2 : snow ? 0.8 : 2.2;
    const slant = storm ? -0.3 : snow ? -0.08 : -0.12;
    const lengthScale = snow ? 1 : storm ? 1.15 : 0.85 + this.intensity * 0.25;

    for (let i = 0; i < this.dropCount; i++) {
      if (i >= count) {
        this.drops.setVisibleAt(i, false);
        continue;
      }
      const progress = (this.phases[i] + this.time * speed) % 1;
      const radius = 1 + WEATHER_VISUAL.dropAltitude * (1 - progress);
      const dir = i * 3;
      this.position.set(
        this.dropDirections[dir] * radius,
        this.dropDirections[dir + 1] * radius,
        this.dropDirections[dir + 2] * radius,
      );
      this.scale.set(1, lengthScale, 1);
      this.matrix.makeRotationZ(slant).scale(this.scale).setPosition(this.position);
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
