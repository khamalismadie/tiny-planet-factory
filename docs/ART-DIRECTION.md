# Art Direction Bible — Tiny Planet Factory

Dokumen ini adalah standar visual sebelum dekorasi atau efek baru ditambahkan. Setiap aset/perubahan harus mengikuti standar ini.

## 1. Identitas visual

**Premium stylized toy-planet.** Planet mini berbentuk bola yang dibaca seperti mainan meja: siluet jelas, warna cerah tapi tidak neon, permukaan low-poly yang rapi, dan skala objek yang konsisten. Tidak realistik, tidak kacau.

## 2. Palet warna

| Peran | Warna | Penggunaan |
|---|---|---|
| Background | `#0d1117` | Canvas/latar, kontras dengan planet |
| Panel | `rgba(16,22,30,.88)` | Overlay UI, selalu di atas world |
| Aksen utama | `#6fd39b` | Status hidup, misi, tombol aktif |
| Peringatan | `#ffb454` | Warning suhu/air, event gagal |
| Teks | `#e8eef6` | Teks utama |
| Teks sekunder | `#9fb0c2` | Label, metadata |
| Planet barren | `#b9a878` → `#d0b985` | Tanah kering sampai kaya |
| Planet hidup | `#6fa05a` → `#3f8f4a` | Vegetasi normal sampai subur |
| Air | `#3f86c4` | Ocean/lake |
| Batu/salju | `#8d8a82` / `#e6eef5` | Gunung, area dingin |

Fauna: kijang `#c99464`, rubah `#e06b3a`, burung `#74c7e8`, ikan `#4fb3d9`, serangga `#f2d24b`. Kelima warna ini memakai flat shading yang sama dengan prop agar agen terbaca sebagai bagian dari dunia mainan, bukan UI marker.

Aturan: warna vegetasi berubah **bertahap** mengikuti `oxygen`/`water`, bukan XOR hitam-putih. Kontras teks terhadap panel minimal 4.5:1.

## 3. Shape language

- Planet: bola icosahedron terdisplasi, **flat shading**, siluet tidak simetris sempurna.
- Props: **gabungan primitif** (cone, sphere, icosahedron, cylinder) yang di-merge menjadi satu geometri per tipe, bukan satu primitif placeholder. Semua memakai `flatShading: true`.
- Vegetasi: pohon berbatang + 3 lapis kanopi; semak 3 bola; bunga 5 kelopak + titik serbuk; rumput 3 helai.
- Batu/gunung: cluster icosahedron/cone dengan puncak salju untuk gunung; air: cakram tipis + permukaan lebih terang.
- Satwa: siluet majemuk — kijang bertubuh panjang + leher/kepala/kaki/telinga; rubah berekor dan telinga runcing; burung bersayap + paruh; ikan berekor/sirip; serangga bersayap + antena.
- Hindari detail kecil yang hilang pada 390px lebar layar.

## 4. Standar geometri & material

- Semua prop memakai `BatchedMesh3D` dengan geometri/material yang **dibagi** per tipe.
- Radius planet dasar ≈ 1; prop skala ±0.03–0.30 relatif terhadap radius.
- **Ground contact wajib**: setiap aset komposit dinormalisasi sehingga local `minY = 0`. Renderer hanya menambahkan `baseLift * scale` (0.004 untuk daratan, 0.012 untuk air) untuk menghindari z-fighting. Tidak ada lagi `GROUND_OFFSET`/`SHAPE_SCALE` per tipe.
- Material: `roughness` tinggi (0.9–1.0) untuk benda alami; tanpa logam mengkilap. Warna per bagian disimpan sebagai **vertex colors** linear, sehingga satu batch tetap satu material, satu draw call.
- `src/render/assetGeometry.ts` adalah satu-satunya sumber bentuk aset. `PropRenderer` dan `WildlifeRenderer` hanya mengonsumsi `ASSET_GEOMETRY` / `SPECIES_GEOMETRY`.

## 5. Pencahayaan

- Key light: `DirectionalLight` hangat (`0xfff2dc`), intensity 3 saat cerah.
- Ambient: `0x8090ff`, intensity 0.3 — memberi bayangan dingin di sisi gelap.
- Environment: `skyColor 0xcfe0ff`, `groundColor 0x6b6250`, intensity 0.8.
- Rim light: aksen biru dingin dari arah berlawanan key light untuk memisahkan siluet planet dari background gelap.
- Cuaca mengubah **intensity key light**, bukan mengganti seluruh skema: storm 1.6, snow 2, rain 2.3, sunny 3.
- Tanpa shadow map Mahal; kontak visual dijamin oleh geometri + warna, bukan shadow renderer.

## 6. Kamera & framing

- FOV 45°, near 0.1, far 100.
- Jarak orbit 2.2–9; default ≈4.75.
- Planet tetap menjadi focal point di tengah; panel UI tidak boleh menutupi area tengah.
- Drag = rotasi, pinch/scroll = zoom. Tidak ada camera shake yang mengganggu kontrol.

## 7. VFX & cuaca

- Awan: ellipsoid putih (cerah) / abu (storm), radius orbit ≈1.55, bergerak lambat.
- Hujan: silinder biru tipis; salju: bola putih kecil. Keduanya memakai pool `BatchedMesh3D`.
- Budget mengikuti quality tier: low 6 cloud/24 drop, medium 10/48, high 14/80.
- Setiap efek harus bisa dimatikan lewat budget tanpa merusak gameplay.

## 8. UI system

- DOM overlay di atas canvas, bukan world-space text.
- Mobile ≤820px: panel build ringkas di atas, stats di kanan, inventory di bawah.
- **Mobile ≤480px**: brand text dan stage label disembunyikan; tombol topbar harus muat dalam satu baris tanpa overflow. Target sentuh ≥36px.
- Toast tidak boleh menimpa header; posisi mobile di bawah topbar.
- Semua panel punya `backdrop-filter: blur(8px)` dan border halus untuk hierarchy.

## 9. Acceptance criteria untuk perubahan visual

1. Tidak ada kontrol yang keluar dari viewport pada 390×844 dan 1280×800.
2. Dasar setiap prop menyentuh permukaan planet (tidak melayang > 0.01 radius).
3. Build, `npm test`, dan smoke tetap lolos setelah perubahan.
4. Draw call tidak naik lebih dari +2 tanpa alasan terukur.
5. Perubahan dibuktikan dengan screenshot sebelum/sesudah pada seed yang sama.
