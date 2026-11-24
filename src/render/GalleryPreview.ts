import { getAttributeData, type Geometry3D } from '@pixi/3d';
import type { AssetGeometry } from './assetGeometry';

/**
 * Lightweight isometric thumbnail for the ecosystem gallery.
 *
 * It projects the exact same low-poly geometry used in the 3D scene into an SVG, so the gallery
 * shows a real facet-by-facet preview without a second WebGL context or extra draw calls.
 */
const VIEW_WIDTH = 180;
const VIEW_HEIGHT = 148;
const PADDING = 13;
const YAW = -0.58;
const PITCH = 0.42;
const MAX_FACES = 1100;
const MIN_AREA = 1.4;
const LIGHT = (() => {
  const length = Math.hypot(0.45, 0.8, 0.65);
  return { x: 0.45 / length, y: 0.8 / length, z: 0.65 / length };
})();

interface Projected {
  x: number;
  y: number;
  depth: number;
  nx: number;
  ny: number;
  nz: number;
  r: number;
  g: number;
  b: number;
}

interface Face {
  depth: number;
  markup: string;
}

const CACHE = new WeakMap<Geometry3D, string>();

function toSrgb(value: number): number {
  const linear = Math.max(0, Math.min(1, value));
  return linear <= 0.0031308 ? linear * 12.92 : 1.055 * Math.pow(linear, 1 / 2.4) - 0.055;
}

function faceColor(red: number, green: number, blue: number, shade: number): string {
  const channel = (value: number): string =>
    Math.round(Math.max(0, Math.min(1, toSrgb(value * shade))) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${channel(red)}${channel(green)}${channel(blue)}`;
}

function project(
  x: number,
  y: number,
  z: number,
  nx: number,
  ny: number,
  nz: number,
  r: number,
  g: number,
  b: number,
): Projected {
  const cosYaw = Math.cos(YAW);
  const sinYaw = Math.sin(YAW);
  const turnedX = x * cosYaw + z * sinYaw;
  const turnedZ = -x * sinYaw + z * cosYaw;
  const turnedNx = nx * cosYaw + nz * sinYaw;
  const turnedNz = -nx * sinYaw + nz * cosYaw;
  const cosPitch = Math.cos(PITCH);
  const sinPitch = Math.sin(PITCH);
  return {
    x: turnedX,
    y: y * cosPitch - turnedZ * sinPitch,
    depth: y * sinPitch + turnedZ * cosPitch,
    nx: turnedNx,
    ny: ny * cosPitch - turnedNz * sinPitch,
    nz: ny * sinPitch + turnedNz * cosPitch,
    r,
    g,
    b,
  };
}

export function galleryPreviewSvg(asset: AssetGeometry): string {
  const geometry = asset.geometry;
  const cached = CACHE.get(geometry);
  if (cached) return cached;

  const positions = getAttributeData(geometry, 'aPosition', 3);
  const normals = getAttributeData(geometry, 'aNormal', 3);
  const colors = getAttributeData(geometry, 'aColor', 4);
  const indices: ArrayLike<number> = geometry.indices ?? positions;
  const vertexCount = positions.length / 3;
  const points = new Array<Projected>(vertexCount);

  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (let vertex = 0; vertex < vertexCount; vertex++) {
    const point = project(
      positions[vertex * 3],
      positions[vertex * 3 + 1],
      positions[vertex * 3 + 2],
      normals[vertex * 3],
      normals[vertex * 3 + 1],
      normals[vertex * 3 + 2],
      colors[vertex * 4],
      colors[vertex * 4 + 1],
      colors[vertex * 4 + 2],
    );
    points[vertex] = point;
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }

  const scale = Math.min(
    (VIEW_WIDTH - PADDING * 2) / Math.max(1e-6, maxX - minX),
    (VIEW_HEIGHT - PADDING * 2) / Math.max(1e-6, maxY - minY),
  );
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const screenX = (point: Projected): number => VIEW_WIDTH / 2 + (point.x - centerX) * scale;
  const screenY = (point: Projected): number => VIEW_HEIGHT / 2 - (point.y - centerY) * scale;

  const faces: Face[] = [];
  for (let index = 0; index + 2 < indices.length; index += 3) {
    const a = points[indices[index]];
    const b = points[indices[index + 1]];
    const c = points[indices[index + 2]];
    if (!a || !b || !c) continue;

    const ax = screenX(a);
    const ay = screenY(a);
    const bx = screenX(b);
    const by = screenY(b);
    const cx = screenX(c);
    const cy = screenY(c);
    const area = Math.abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay)) / 2;
    if (area < MIN_AREA) continue;

    let nx = (b.y - a.y) * (c.depth - a.depth) - (b.depth - a.depth) * (c.y - a.y);
    let ny = (b.depth - a.depth) * (c.x - a.x) - (b.x - a.x) * (c.depth - a.depth);
    let nz = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    const normalLength = Math.hypot(nx, ny, nz) || 1;
    nx /= normalLength;
    ny /= normalLength;
    nz /= normalLength;
    if (nz < 0) {
      nx = -nx;
      ny = -ny;
      nz = -nz;
    }
    const diffuse = Math.max(0, nx * LIGHT.x + ny * LIGHT.y + nz * LIGHT.z);
    const shade = 0.62 + diffuse * 0.48;
    const red = (a.r + b.r + c.r) / 3;
    const green = (a.g + b.g + c.g) / 3;
    const blue = (a.b + b.b + c.b) / 3;
    faces.push({
      depth: (a.depth + b.depth + c.depth) / 3,
      markup: `<polygon points="${ax.toFixed(1)},${ay.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)}" fill="${faceColor(red, green, blue, shade)}"/>`,
    });
  }

  faces.sort((left, right) => left.depth - right.depth);
  const visible = faces.length > MAX_FACES ? faces.slice(faces.length - MAX_FACES) : faces;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}" role="img" aria-label="Pratinjau model low-poly">${visible
    .map((face) => face.markup)
    .join('')}</svg>`;
  CACHE.set(geometry, svg);
  return svg;
}
