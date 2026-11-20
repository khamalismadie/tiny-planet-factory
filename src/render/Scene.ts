import { AmbientLight, DirectionalLight, View3D } from '@pixi/3d';
import { OrbitCamera } from '@pixi/3d/extras';
import type { QualitySettings } from '../app/quality';
import { DEFAULT_TERRAIN_CONFIG, type Environment, type PlacedObject, type TerrainConfig, type WeatherType, type WildlifeAgent } from '../sim/types';
import { PlanetMesh } from './PlanetMesh';
import { PropRenderer } from './PropRenderer';
import { WeatherFx } from './WeatherFx';
import { WildlifeRenderer } from './WildlifeRenderer';

export class GameScene {
  readonly view: View3D;
  readonly orbit: OrbitCamera;
  readonly planet: PlanetMesh;
  readonly quality: QualitySettings;
  private readonly props: PropRenderer;
  private readonly wildlife: WildlifeRenderer;
  private readonly weatherFx: WeatherFx;
  private seed: number;
  private readonly sun: DirectionalLight;
  private readonly rim: DirectionalLight;

  constructor(seed: number, settings: QualitySettings, terrain: TerrainConfig = DEFAULT_TERRAIN_CONFIG) {
    this.quality = settings;
    this.seed = seed;
    this.view = new View3D({
      autoResize: true,
      toneMapping: 'aces',
      environment: { skyColor: 0xcfe0ff, groundColor: 0x6b6250, intensity: 0.8 },
    });
    this.view.camera.fov = 45;
    this.view.camera.near = 0.1;
    this.view.camera.far = 100;
    this.view.camera.position.set(0, 1.8, 4.4);
    this.view.camera.lookAt({ x: 0, y: 0, z: 0 });

    this.orbit = new OrbitCamera({
      view: this.view,
      target: { x: 0, y: 0, z: 0 },
      enableDamping: true,
      enablePan: false,
      minDistance: 2.2,
      maxDistance: 9,
      minPolarAngle: 0.05,
      maxPolarAngle: Math.PI - 0.05,
      touches: { one: 'rotate', two: 'zoom-rotate' },
      autoUpdate: false,
    });

    this.sun = new DirectionalLight({ color: 0xfff2dc, intensity: 3 });
    this.sun.position.set(4, 6, 5);
    this.sun.lookAt({ x: 0, y: 0, z: 0 });
    // Cool counter-light separates the planet silhouette from the dark background.
    this.rim = new DirectionalLight({ color: 0x8fc4ff, intensity: 0.9 });
    this.rim.position.set(-5, 2, -4);
    this.rim.lookAt({ x: 0, y: 0, z: 0 });
    this.view.root.addChild(this.sun, this.rim, new AmbientLight({ color: 0x8090ff, intensity: 0.3 }));

    this.planet = new PlanetMesh(seed, settings.planetDetail, terrain);
    this.props = new PropRenderer(this.view, seed, settings.propCapacity, terrain);
    this.wildlife = new WildlifeRenderer(this.view, settings.wildlifeCapacity);
    this.weatherFx = new WeatherFx(this.view, seed, settings.maxClouds, settings.maxDrops);
    this.view.root.addChild(this.planet.mesh);
  }

  reseed(seed: number, terrain: TerrainConfig = DEFAULT_TERRAIN_CONFIG): void {
    this.seed = seed;
    this.planet.reseed(seed, terrain);
    this.props.setSeed(seed, terrain);
  }

  setQuality(settings: QualitySettings): void {
    this.weatherFx.setBudget(settings.maxClouds, settings.maxDrops);
    this.wildlife.setBudget(settings.wildlifeCapacity);
  }

  setEnvironment(env: Environment): void {
    this.planet.update(env);
  }

  syncObjects(objects: PlacedObject[], env: Environment): void {
    this.props.sync(objects, env);
  }

  syncWildlife(agents: WildlifeAgent[], terrain: TerrainConfig): void {
    this.wildlife.sync(agents, terrain, this.seed);
  }

  setWeather(type: WeatherType, intensity: number): void {
    this.weatherFx.setWeather(type, intensity);
    this.sun.intensity = type === 'storm' ? 1.6 : type === 'snow' ? 2 : type === 'rain' ? 2.3 : 3;
  }

  update(deltaSeconds: number): void {
    this.weatherFx.update(deltaSeconds);
  }

  updateCamera(): void {
    this.orbit.update();
  }
}
