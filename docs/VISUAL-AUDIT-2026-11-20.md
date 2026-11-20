# Visual Audit & Polish Report — 2026-11-20

## 1. Executive summary

Audit dilakukan pada mode **DISCOVER → BASELINE → AUDIT → DESIGN → IMPLEMENT → VALIDATE**. Arsitektur render adalah **PixiJS `8.23.0` + `@pixi/3d` `0.1.0` (open beta)** dengan `View3D`, `BatchedMesh3D`, dan DOM overlay. Tidak ada migrasi ke Three.js.

Perubahan utama: semua prop dan agen satwa yang sebelumnya berupa **satu primitif placeholder** kini menjadi **aset komposit low-poly** yang di-merge menjadi satu geometry per tipe. Jumlah draw call tidak berubah. Sim, input, save, DNA, dan misi tidak disentuh.

**Batasan jujur:** model pada sesi ini tidak menerima input gambar, sehingga screenshot baseline/after tidak bisa dinilai secara visual oleh assistant. Screenshot tetap dihasilkan pada seed, kamera, resolusi, dan state yang sama untuk dibandingkan langsung oleh user. Tidak ada klaim perbaikan visual yang tidak bisa diamati.

## 2. Baseline (terukur)

Sumber: `scripts/capture-visual.mjs`, seed `1337`, viewport `1280×800`, `quality=medium`, dev server `http://127.0.0.1:5173/`.

| Metrik | Sebelum | Sesudah |
|---|---:|---:|
| Draw calls | 16 | 16 |
| Objects | 28 | 28 |
| Tick | 60 | 60 |
| p50 frame | 16.7 ms | 16.7 ms |
| p95 frame | 100 ms | 100 ms |
| FPS | 59.9 | 59.9 |
| Boot | 676 ms | 708 ms |
| `contextLost` (headless) | true | true |

Catatan: p95 100 ms adalah artefak headless dengan WebGL context loss, **bukan bukti performa perangkat nyata**. Angka device nyata masih kosong.

`npm test` setelah perubahan: `PASS: sim`, `PASS: vertical slice smoke`, `PASS: device-check`. Smoke grown scene tetap 26 objek, 41 agen fauna, 5 spesies ditemukan, 15 draw call.

## 3. Defect report

| ID | Defect | Severity | Evidence | Root cause | Gameplay impact | Correction | Acceptance |
|---|---|---|---|---|---|---|---|
| D1 | Prop hanya satu cone/sphere/icosahedron | High | `GEOMETRY` map lama di `PropRenderer.ts` | Placeholder spike dipertahankan sampai rilis | Siluet pohon, gunung, bunga, dan satwa sulit dibedakan | Aset komposit + vertex colors di `assetGeometry.ts` | Build/test lolos, draw call tidak naik, seed sama |
| D2 | Satwa hanya bola/kerucut generik | High | `GEOMETRY` map lama di `WildlifeRenderer.ts` | Budget draw call diinterpretasikan sebagai satu primitif | Fauna tidak terbaca sebagai kijang/rubah/burung | Siluet majemuk per spesies | 5 spesies tetap muncul di smoke test |
| D3 | Tidak ada variasi rotasi objek | Medium | `object.rotation` tidak dipakai renderer | Orientasi diabaikan saat align ke normal | Penempatan terlihat seragam | Spin quaternion lokal sebelum align normal | Sim `rotation` tidak berubah |
| D4 | Kontak tanah bergantung konstanta per tipe | Medium | `GROUND_OFFSET[type]` lama | Ekstent primitif berbeda-beda | Risiko melayang setelah bentuk berubah | Normalisasi `minY = 0` + `baseLift` | Ground contact ≤0.01 radius |
| D5 | Screenshot tidak bisa diinspeksi assistant | QA gap | Tool image input tidak tersedia di sesi | Limitasi lingkungan, bukan defect game | Validasi visual tertunda | Serahkan pasangan screenshot ke user | User konfirmasi perubahan terlihat |
| D6 | p95 perangkat nyata belum ada | Blocker | QA clipboard device tidak terbaca | Deploy HTTPS belum dilakukan | Release sign-off belum valid | Tetap ditandai belum terukur | QA HTTPS selesai |

**Tidak diklaim sebagai defect:** awan masih ellipsoid tunggal, dan tidak ada shadow map. Keduanya keputusan budget yang sudah ada di art direction.

## 4. Art direction yang diterapkan

- **Shape language:** komposit 2–11 primitif per aset, bukan satu placeholder. Kijang = tubuh + leher + kepala + telinga + 4 kaki + ekor; pohon = batang + 3 kanopi; gunung = 3 puncak + salju.
- **Warna:** `vertexColors` linear per bagian. Material memakai `baseColor: 0xffffff` agar warna aset tidak di-tint ulang.
- **Material:** `roughness` 0.85–0.9, `flatShading: true`, tanpa metal.
- **Ground contact:** semua geometry dinormalisasi ke `minY = 0`; lift hanya 0.004 daratan / 0.012 air dikali skala.
- **Batching:** satu `BatchedMesh3D` per tipe, satu material per batch. Tidak ada draw call tambahan.
- **Determinisme:** bentuk dibangun sekali saat konstruksi dari konstanta, bukan `Math.random()`.

## 5. Prioritas (skor skill)

`(Visual × Gameplay × Confidence) / (Cost × Risk)`:

1. Placement feedback — 15.0 (**belum diimplementasikan**)
2. Composite props/fauna — 12.5 (**diimplementasikan**)
3. Camera easing — 9.0 (belum)
4. Biome terrain — 6.67 (belum)
5. Cloud clusters — 5.0 (belum)
6. Contact shadows — 2.0 (belum, disengaja)

Composite props dipilih lebih dulu daripada skor tertinggi karena placement feedback memerlukan perubahan loop interaksi, sementara D1/D2 adalah defect visual aktif yang langsung terlihat dan risikonya rendah.

## 6. Files modified

- `src/render/assetGeometry.ts` — **baru**, helper merge + 13 prop asset + 5 species asset.
- `src/render/PropRenderer.ts` — konsumsi aset komposit, vertex colors, spin rotasi, `baseLift`.
- `src/render/WildlifeRenderer.ts` — konsumsi aset spesies komposit, vertex colors, `baseLift`.
- `docs/ART-DIRECTION.md` — standar bentuk/ground-contact diperbarui.

## 7. Validation executed

- `npx tsc --noEmit` — lolos, tanpa output.
- `NODE_OPTIONS=--max-old-space-size=4096 npm run build` — lolos. App chunk `71.82 kB` / gzip `24.10 kB` (naik `+4.74 kB` dari `67.08 kB` karena data geometri komposit).
- `PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright npm test` — 3/3 pass.
- Screenshot before/after: `/tmp/opencode/audit-before.png`, `/tmp/opencode/audit-after.png`.
- Quantified image diff (browser canvas, threshold RGB sum > 24): **0.04% piksel berubah**, bbox `[194,653,250,703]`. Ini berarti perubahan pada seed/kamera ini **subtil secara piksel** dan tidak boleh dianggap sebagai bukti perbaikan visual tanpa inspeksi user.

## 8. Performance findings

- Draw calls tetap 16 pada capture dan 15 pada smoke grown scene.
- p50 tetap 16.7 ms baik di capture maupun test.
- Boot 676 → 708 ms di capture (headless, variasi normal; bukan angka device).
- Tidak ada optimisasi performa lain yang dilakukan karena belum ada profil perangkat nyata.

## 9. Regression risks

- `vertexColors: true` bergantung pada dukungan shader `@pixi/3d@0.1.0`; sudah lolos di Chromium headless, belum di perangkat Android nyata.
- Normal dihitung dengan inverse-scale lokal; untuk rotasi Z/Y saja ini benar. Jika ada scale non-uniform baru di masa depan, helper perlu diperbarui.
- Geometri primitif sumber dibuat saat modul dimuat dan tidak di-dispose; biaya sekali saat boot, bukan per frame. Jika jumlah aset tumbuh besar, pindahkan ke lazy build.

## 10. Quality scores (dengan kaveat)

| Score | Nilai | Interpretasi | Justifikasi singkat |
|---|---:|---|---|
| Visual Quality | 64/100 | Production Ready (batas bawah) | Defect D1/D2 diperbaiki di kode, tetapi tidak ada inspeksi gambar oleh assistant; D5 masih terbuka |
| Technical Quality | 84/100 | Polished | Build/test lolos, arsitektur batch terjaga, kompatibilitas beta masih perlu device QA |
| Gameplay Integrity | 88/100 | Premium | Sim/input/save/DNA tidak berubah; smoke + device-check lolos |

Skor ini **bukan pengganti release gate**. Gate HTTPS + QA perangkat nyata tetap belum lolos.

## 11. Acceptance criteria berikutnya

1. User membandingkan `audit-before.png` dan `audit-after.png` pada seed 1337 dan menyatakan apakah siluet prop/fauna lebih terbaca.
2. Jika perubahan terlalu subtil, naikkan ukuran prop atau kontras warna per bagian — jangan menambah draw call.
3. Selesaikan QA HTTPS/device sebelum menyentuh biome terrain atau cloud clusters.
4. Placement feedback dan camera easing dikerjakan setelah gate device lolos.
