import type { Mesh3D, View3D } from '@pixi/3d';
import type { ObjectType } from '../sim/types';

export interface SurfaceInputCallbacks {
  getSelectedType: () => ObjectType | null;
  onPlace: (type: ObjectType, dir: [number, number, number]) => void;
  onInspect: (dir: [number, number, number]) => void;
}

export class SurfaceInput {
  private readonly view: View3D;
  private readonly planet: Mesh3D;
  private readonly callbacks: SurfaceInputCallbacks;
  private down: { x: number; y: number } | null = null;
  private longPressTimer = 0;
  private longPressed = false;

  constructor(view: View3D, planet: Mesh3D, callbacks: SurfaceInputCallbacks) {
    this.view = view;
    this.planet = planet;
    this.callbacks = callbacks;

    view.on('pointerdown', (event) => {
      this.down = { x: event.global.x, y: event.global.y };
      this.longPressed = false;
      window.clearTimeout(this.longPressTimer);
      this.longPressTimer = window.setTimeout(() => {
        const dir = this.hit(event.global.x, event.global.y);
        if (dir) {
          this.longPressed = true;
          this.callbacks.onInspect(dir);
        }
      }, 550);
    });

    const cancelLongPress = () => window.clearTimeout(this.longPressTimer);

    view.on('globalpointermove', (event) => {
      if (!this.down) return;
      if (Math.hypot(event.global.x - this.down.x, event.global.y - this.down.y) > 6) cancelLongPress();
    });

    view.on('pointerup', (event) => {
      cancelLongPress();
      if (!this.down) return;
      const moved = Math.hypot(event.global.x - this.down.x, event.global.y - this.down.y);
      this.down = null;
      const wasLongPress = this.longPressed;
      this.longPressed = false;
      if (moved > 6 || wasLongPress) return;
      const dir = this.hit(event.global.x, event.global.y);
      if (!dir) return;
      const type = this.callbacks.getSelectedType();
      if (type) this.callbacks.onPlace(type, dir);
      else this.callbacks.onInspect(dir);
    });

    view.on('pointerupoutside', cancelLongPress);
  }

  private hit(x: number, y: number): [number, number, number] | null {
    const hit = this.view.raycast({ x, y });
    if (!hit || hit.target !== this.planet) return null;
    const length = Math.hypot(hit.point.x, hit.point.y, hit.point.z) || 1;
    return [hit.point.x / length, hit.point.y / length, hit.point.z / length];
  }
}
