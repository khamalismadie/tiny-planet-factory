import { getAttributeData } from '@pixi/3d';
import { OBJECT_DEFS, OBJECT_ORDER } from '../src/content/objects';
import { SPECIES_ORDER } from '../src/content/species';
import { ASSET_GEOMETRY, SPECIES_GEOMETRY, SPECIES_SCALE } from '../src/render/assetGeometry';

function assert(condition: unknown, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
}

function measure(geometry: (typeof ASSET_GEOMETRY)[keyof typeof ASSET_GEOMETRY]['geometry']) {
  const positions = getAttributeData(geometry, 'aPosition', 3);
  let minY = Infinity;
  let maxY = -Infinity;
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (let i = 0; i < positions.length; i += 3) {
    minY = Math.min(minY, positions[i + 1]);
    maxY = Math.max(maxY, positions[i + 1]);
    minX = Math.min(minX, positions[i]);
    maxX = Math.max(maxX, positions[i]);
    minZ = Math.min(minZ, positions[i + 2]);
    maxZ = Math.max(maxZ, positions[i + 2]);
  }
  return {
    localH: maxY - minY,
    localW: Math.max(maxX - minX, maxZ - minZ),
    triangles: geometry.indices.length / 3,
    textures: Object.keys(geometry.textures ?? {}).length,
  };
}

const targets: Record<string, number> = {
  grass: 0.005,
  sand: 0.0019,
  rock: 0.0065,
  hill: 0.06,
  mountain: 0.115,
  ocean: 0.0045,
  lake: 0.0027,
  tree: 0.045,
  bush: 0.015,
  flower: 0.0065,
  deer: 0.0105,
  fox: 0.007,
  bird: 0.004,
};

const props: Record<string, { height: number; footprint: number; triangles: number; textures: number }> = {};
for (const type of OBJECT_ORDER) {
  const asset = measure(ASSET_GEOMETRY[type].geometry);
  const scale = OBJECT_DEFS[type].scale;
  const height = asset.localH * scale;
  const footprint = asset.localW * scale;
  props[type] = { height, footprint, triangles: asset.triangles, textures: asset.textures };
  const target = targets[type];
  assert(Math.abs(height - target) <= target * 0.05, `${type} tinggi ${height.toFixed(4)} menyimpang dari target ${target}`);
  assert(asset.triangles >= 18 && asset.triangles <= 200, `${type} triangle ${asset.triangles} di luar budget 18-200`);
  assert(asset.textures === 0, `${type} tidak boleh memakai tekstur`);
  assert(OBJECT_DEFS[type].spacingRadius >= footprint * 0.475, `${type} spacingRadius terlalu kecil untuk footprint ${footprint.toFixed(4)}`);
}

const order = [
  ['mountain', 'hill'],
  ['hill', 'tree'],
  ['tree', 'bush'],
  ['bush', 'deer'],
  ['deer', 'fox'],
  ['fox', 'rock'],
  ['flower', 'grass'],
  ['grass', 'bird'],
] as const;
for (const [bigger, smaller] of order) {
  assert(props[bigger].height > props[smaller].height, `${bigger} harus lebih tinggi dari ${smaller}`);
}
assert(Math.abs(props.rock.height - props.flower.height) < 1e-4, 'batu dan bunga harus setara');
assert(props.fox.height > props.flower.height, 'rubah harus lebih tinggi dari bunga');

const treeMax = props.tree.height * 1.3 * 1.15;
const ratios = {
  mountainMinPerTreeMax: (props.mountain.height * 0.85) / treeMax,
  hillPerTree: props.hill.height / props.tree.height,
  treePerDeer: props.tree.height / props.deer.height,
  deerPerFox: props.deer.height / props.fox.height,
  deerPerBird: props.deer.height / props.bird.height,
};
assert(ratios.mountainMinPerTreeMax >= 1.4, `gunung/pohon terlalu rendah: ${ratios.mountainMinPerTreeMax.toFixed(2)}`);
assert(ratios.hillPerTree >= 1.2 && ratios.hillPerTree <= 1.5, `bukit/pohon di luar rentang: ${ratios.hillPerTree.toFixed(2)}`);
assert(ratios.treePerDeer >= 4 && ratios.treePerDeer <= 5, `pohon/rusa di luar rentang: ${ratios.treePerDeer.toFixed(2)}`);
assert(ratios.deerPerFox >= 1.4 && ratios.deerPerFox <= 1.6, `rusa/rubah di luar rentang: ${ratios.deerPerFox.toFixed(2)}`);
assert(ratios.deerPerBird >= 2.5 && ratios.deerPerBird <= 3, `rusa/burung di luar rentang: ${ratios.deerPerBird.toFixed(2)}`);

for (const species of SPECIES_ORDER) {
  const asset = measure(SPECIES_GEOMETRY[species].geometry);
  const wildlifeHeight = asset.localH * SPECIES_SCALE[species];
  if (species in props) {
    assert(Math.abs(wildlifeHeight - props[species].height) < 1e-6, `${species} wildlife harus sama dengan prop`);
  }
  assert(wildlifeHeight < props.tree.height, `${species} wildlife tidak boleh lebih tinggi dari pohon`);
}

console.log(JSON.stringify({
  props: Object.fromEntries(Object.entries(props).map(([type, value]) => [type, +value.height.toFixed(4)])),
  ratios: Object.fromEntries(Object.entries(ratios).map(([key, value]) => [key, +value.toFixed(2)])),
}, null, 2));
console.log('PASS: art scale');
