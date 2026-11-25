# Technical Architecture

## Data flow

```text
seed + planetId
    → config planet/spesies/objek
    → resolver variant deterministik
    → builder geometri low-poly
    → mergeParts (vertex colors + normal per facet + bayangan kontak)
    → satu mesh aktif per tipe
    → render PixiJS 3D
    → HUD/UI dari state sim yang sudah ada
```

`src/sim/` tidak mengimpor PixiJS atau DOM. `src/render/` tidak mengubah state sim. `src/ui/` hanya membaca state dan mengirim aksi ke `Game.ts`.

## Determinism

- RNG berasal dari seed; variant props dipilih dari `seed + planetId`.
- Tidak ada `Math.random()` untuk konten yang masuk ke save.
- Save/load dan populate QA objek harus menghasilkan world yang sama untuk seed yang sama.
- `schemaVersion` tidak berubah untuk perubahan visual.

## Render & asset

- Semua prop dibangun di `src/render/assetGeometry.ts` lalu digabung menjadi satu geometri per tipe.
- Warna disimpan sebagai vertex color; tidak ada tekstur atau GLB/GLTF.
- `GalleryPreview.ts` memproyeksikan geometri yang sama ke SVG untuk thumbnail; bukan WebGL context kedua.
- Gunung memakai ring 10 sisi × 10 tingkat dengan jitter deterministik per varian.

## Kamera

- Mode orbit biasa memakai `OrbitCamera`.
- Saat FPS aktif, input orbit dimatikan. `walkUpdate()` dipanggil setelah `updateCamera()` sehingga kamera spherical menimpa posisi orbit tanpa mengubah planet.
- Debug `window.__game.camera()` mengembalikan `walk`, `yaw`, `pitch`, `dist` hanya untuk verifikasi, bukan telemetry.

## PWA & offline

- `public/sw.js` meng-cache shell agar boot/menu/place/save bekerja offline.
- Update PWA harus menunjukkan prompt dan mempertahankan save lama.
- `standalone === true` wajib untuk bukti #6.

## Performance contract

| Metrik | Target |
|---|---:|
| App chunk | `< 100 kB` |
| Draw call cerah | `≤ 18` |
| Draw call hujan/badai/salju | `≤ 20` |
| p95 frame | `≤ 33 ms` |
| Cold start | `< 5 s` |
| Android menengah | `≥ 30 FPS` |
| Desktop | `≥ 60 FPS` |

Gate di `scripts/` menguji kontrak ini. Target tidak boleh diturunkan untuk membuat test lulus.
