# Low-Poly Asset Catalog — Tiny Planet Factory

> **Status v0.16.0:** 49 pilihan varian prosedural sudah diimplementasikan. Katalog 1.000 aset dari user adalah **referensi desain**, bukan asset pack produksi.

## 1. Keputusan produksi

- Renderer tetap **PixiJS 3D**, bukan React Three.js.
- Aset tetap **prosedural** di `src/render/assetGeometry.ts`, bukan GLB/GLTF.
- Satu varian aktif per tipe dipilih dari `seed + planetId`.
- Hanya geometri varian terpilih yang dibangun saat boot.
- Tetap satu `BatchedMesh3D` per prop/species type; draw call tidak bertambah.
- Tanpa tekstur, tanpa material baru, tanpa perubahan sim/DNA/schema.
- Skala tetap memakai tinggi prop `0,005–0,115` radius planet, bukan 1 unit = 1 meter.
- Wind sway per objek dan loader GLB **ditunda**.

Katalog marketplace yang dikirim user dipakai hanya sebagai inspirasi siluet dan palet generik. Model, tekstur, atau aset berbayar tidak disalin.

## 2. Varian yang sudah aktif

### Prop — 39 varian

| Tipe | Varian |
|---|---|
| `grass` | Meadow, Golden, Reed |
| `sand` | Dune, Coastal, Volcanic |
| `rock` | Granite, Sandstone, Obsidian |
| `hill` | Forest, Rocky, Mossy |
| `mountain` | Alpine, Volcanic, Crystal |
| `ocean` | Tropical, Storm, Frozen |
| `lake` | Clear, Reef, Crystal |
| `tree` | Oak, Pine, Sakura |
| `bush` | Fern, Lavender, Cactus |
| `flower` | Sunflower, Tulip, Lotus |
| `deer` | Kijang, Antelope, Rusa |
| `fox` | Rubah, Arctic, Fennec |
| `bird` | Burung, Parrot, Swallow |

### Fauna — 10 pilihan

| Species | Varian |
|---|---|
| `deer` | Kijang, Antelope *(shared builder dengan prop)* |
| `fox` | Rubah, Arctic *(shared builder dengan prop)* |
| `bird` | Burung, Parrot *(shared builder dengan prop)* |
| `fish` | Reef, Koi |
| `insect` | Beetle, Butterfly |

Total **49 pilihan varian** dengan **43 builder unik**.

## 3. Bias planet

Beberapa tipe di-pin agar identitas planet tetap terbaca:

| Planet | Varian yang di-pin |
|---|---|
| `terra` | Oak, Granite, Tropical, Clear |
| `dune` | Dune, Sandstone, Golden, Cactus, Oak |
| `glaciere` | Frozen, Crystal, Pine, Obsidian |
| `inferna` | Volcanic mountain, Sandstone/Volcanic sand, Storm ocean |
| `aquaria` | Tropical ocean, Reef lake, Lotus, Reed, Coastal sand |
| `mycelia` | Cactus/Fern bush, Mossy hill, Lotus |
| `sakura` | Sakura tree, Lavender bush, Tulip |
| `aurelia` | Pine tree, Lavender bush, Mossy hill |
| `cosmos` | Crystal mountain/rock/lake, Frozen ocean |

Tipe lain tetap deterministik dari hash `seed + planetId + type`.

## 4. Implementasi

API utama ada di `src/render/assetGeometry.ts`:

```ts
createAssetResolvers(seed, planetId)
propVariantIndex(type, seed, planetId)
speciesVariantIndex(id, seed, planetId)
PROP_VARIANT_LABELS
SPECIES_VARIANT_LABELS
```

Konsumen:

- `PropRenderer` memakai `resolver.props`.
- `WildlifeRenderer` memakai `resolver.species`.
- `GameScene.reseed(seed, terrain, planetId)` mengganti varian saat reset/planet switch.
- Hook QA `?debug=1` → `window.__game.variants()` (indices + labels).

## 5. Gate

`test:scale` sekarang mengaudit semua varian:

- tinggi ±5% dari target tiap tipe,
- triangle dalam `facetRanges`,
- facet sudut unik ≥20% triangle,
- tekstur 0,
- `spacingRadius` masih cukup,
- wildlife `deer/fox/bird` sama dengan prop,
- resolver deterministik untuk seed `1` dan `1337` di 9 planet.

## 6. Katalog referensi user

Dalam sesi ini, daftar yang diterima mencakup 4 kategori pertama dari rencana 14 kategori:

1. Pohon dan tanaman besar — 100 nama.
2. Tanaman kecil, rumput, dan bunga — 100 nama.
3. Buah, sayuran, dan tanaman pangan — 75 nama.
4. Mamalia darat — daftar sedang berjalan saat input terpotong.

Kategori 5–14 belum diterima lengkap, sehingga tidak dimasukkan ke dokumen ini. Nama-nama dari keempat kategori tersebut tetap menjadi referensi siluet untuk varian berikutnya bila QA P0 sudah ditutup.

## 7. Deferred

- 1.000 aset aktif.
- Import GLB/GLTF.
- Wind sway per instance.
- Sim object type baru.
- Biome/planet baru.
- UI picker varian 1.000 aset.

Semua item di atas tidak mengubah save/DNA saat ini dan tidak masuk rilis v0.16.0.
