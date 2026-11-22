import { getAttributeData } from '@pixi/3d';
import { OBJECT_DEFS, OBJECT_ORDER } from '../src/content/objects';
import { SPECIES_ORDER } from '../src/content/species';
import { ASSET_GEOMETRY, SPECIES_GEOMETRY, SPECIES_SCALE } from '../src/render/assetGeometry';
import { WEATHER_VISUAL } from '../src/render/WeatherFx';

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
  // Face normals, not source vertex normals: flat shading uses actual triangle planes.
  const distinctNormals = new Set<string>();
  for (let f = 0; f < geometry.indices.length; f += 3) {
    const ia = geometry.indices[f] * 3;
    const ib = geometry.indices[f + 1] * 3;
    const ic = geometry.indices[f + 2] * 3;
    const e1x = positions[ib] - positions[ia];
    const e1y = positions[ib + 1] - positions[ia + 1];
    const e1z = positions[ib + 2] - positions[ia + 2];
    const e2x = positions[ic] - positions[ia];
    const e2y = positions[ic + 1] - positions[ia + 1];
    const e2z = positions[ic + 2] - positions[ia + 2];
    const nx = e1y * e2z - e1z * e2y;
    const ny = e1z * e2x - e1x * e2z;
    const nz = e1x * e2y - e1y * e2x;
    const length = Math.hypot(nx, ny, nz) || 1;
    const key = [nx / length, ny / length, nz / length]
      .map((value) => Math.round(value * 10))
      .join(',');
    distinctNormals.add(key);
  }
  return {
    localH: maxY - minY,
    localW: Math.max(maxX - minX, maxZ - minZ),
    triangles: geometry.indices.length / 3,
    distinctNormals: distinctNormals.size,
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

// Facet budgets naik dari gate lama 18-200, tapi tetap per tipe dan tanpa tekstur.
const facetRanges: Record<string, [number, number]> = {
  grass: [24, 80],
  sand: [60, 140],
  rock: [180, 260],
  hill: [180, 280],
  mountain: [160, 260],
  ocean: [120, 200],
  lake: [80, 140],
  tree: [120, 220],
  bush: [180, 280],
  flower: [150, 240],
  deer: [240, 320],
  fox: [200, 280],
  bird: [180, 260],
  fish: [140, 220],
  insect: [180, 260],
};

const props: Record<string, { height: number; footprint: number; triangles: number; facets: number; textures: number }> = {};
for (const type of OBJECT_ORDER) {
  const asset = measure(ASSET_GEOMETRY[type].geometry);
  const scale = OBJECT_DEFS[type].scale;
  const height = asset.localH * scale;
  const footprint = asset.localW * scale;
  props[type] = { height, footprint, triangles: asset.triangles, facets: asset.distinctNormals, textures: asset.textures };
  const target = targets[type];
  const range = facetRanges[type];
  assert(Math.abs(height - target) <= target * 0.05, `${type} tinggi ${height.toFixed(4)} menyimpang dari target ${target}`);
  assert(asset.triangles >= range[0] && asset.triangles <= range[1], `${type} triangle ${asset.triangles} di luar budget ${range[0]}-${range[1]}`);
  assert(asset.distinctNormals >= asset.triangles * 0.2, `${type} sudut facet terlalu sedikit: ${asset.distinctNormals}/${asset.triangles}`);
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

const weatherRatios = {
  cloudPerTree: WEATHER_VISUAL.cloudRadius / props.tree.height,
  rainPerTree: WEATHER_VISUAL.rainLength / props.tree.height,
  snowPerRain: WEATHER_VISUAL.snowRadius / WEATHER_VISUAL.rainLength,
  rainWidthPerLength: WEATHER_VISUAL.rainRadius / WEATHER_VISUAL.rainLength,
  cloudInnerEdge: WEATHER_VISUAL.cloudOrbit - WEATHER_VISUAL.cloudRadius * WEATHER_VISUAL.cloudStormScale,
  dropStartPerCloudOuter: (1 + WEATHER_VISUAL.dropAltitude) /
    (WEATHER_VISUAL.cloudOrbit + WEATHER_VISUAL.cloudRadius * WEATHER_VISUAL.cloudStormScale),
};
assert(weatherRatios.cloudPerTree >= 0.7 && weatherRatios.cloudPerTree <= 1.3,
  `awan/pohon di luar rentang: ${weatherRatios.cloudPerTree.toFixed(2)}`);
assert(weatherRatios.rainPerTree >= 0.35 && weatherRatios.rainPerTree <= 0.85,
  `tetes hujan/pohon di luar rentang: ${weatherRatios.rainPerTree.toFixed(2)}`);
assert(weatherRatios.snowPerRain > 0 && weatherRatios.snowPerRain <= 0.2,
  `keping salju terlalu besar: ${weatherRatios.snowPerRain.toFixed(2)}`);
assert(weatherRatios.rainWidthPerLength <= 0.1,
  `tetes hujan terlalu gemuk: ${weatherRatios.rainWidthPerLength.toFixed(3)}`);
assert(weatherRatios.cloudInnerEdge > 1.01,
  `awan badai menembus permukaan planet: ${weatherRatios.cloudInnerEdge.toFixed(3)}`);
assert(weatherRatios.dropStartPerCloudOuter >= 0.95 && weatherRatios.dropStartPerCloudOuter <= 1.2,
  `hujan tidak mulai di lapisan awan: ${weatherRatios.dropStartPerCloudOuter.toFixed(2)}`);

for (const species of SPECIES_ORDER) {
  const asset = measure(SPECIES_GEOMETRY[species].geometry);
  const wildlifeHeight = asset.localH * SPECIES_SCALE[species];
  if (species in props) {
    assert(Math.abs(wildlifeHeight - props[species].height) < 1e-6, `${species} wildlife harus sama dengan prop`);
  }
  assert(wildlifeHeight < props.tree.height, `${species} wildlife tidak boleh lebih tinggi dari pohon`);
  const assetFacetRange = facetRanges[species];
  const assetFacet = measure(SPECIES_GEOMETRY[species].geometry);
  assert(assetFacet.triangles >= assetFacetRange[0] && assetFacet.triangles <= assetFacetRange[1],
    `${species} triangle ${assetFacet.triangles} di luar budget ${assetFacetRange[0]}-${assetFacetRange[1]}`);
  assert(assetFacet.distinctNormals >= assetFacet.triangles * 0.2,
    `${species} sudut facet terlalu sedikit: ${assetFacet.distinctNormals}/${assetFacet.triangles}`);
}

console.log(JSON.stringify({
  props: Object.fromEntries(Object.entries(props).map(([type, value]) => [type, +value.height.toFixed(4)])),
  facets: Object.fromEntries(Object.entries(props).map(([type, value]) => [type, `${value.triangles}t/${value.facets}f`])),
  ratios: Object.fromEntries(Object.entries(ratios).map(([key, value]) => [key, +value.toFixed(2)])),
  weather: Object.fromEntries(Object.entries(weatherRatios).map(([key, value]) => [key, +value.toFixed(3)])),
}, null, 2));
console.log('PASS: art scale');
