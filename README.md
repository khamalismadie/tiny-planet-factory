# Tiny Planet Factory — Vertical Slice

Prototipe web 3D tempat pemain membangun planet bulat kecil, mengubah permukaannya, dan menjaga ekosistemnya tetap hidup. Fokus slice ini adalah satu transformasi yang terasa jelas dalam ~3–5 menit: batu tandus → planet berair dan hijau.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview    # http://localhost:4173 (mode PWA aktif)
npm test           # simulasi murni + smoke test browser
```

Build memakai `NODE_OPTIONS=--max-old-space-size=4096` karena bundler PixiJS 3D membutuhkan heap lebih besar dari default Node.

## Kontrol

- Geser / drag: memutar kamera 360°.
- Scroll / pinch: zoom.
- Ketuk permukaan: meletakkan objek yang sedang dipilih.
- Tahan lama (~0,5 s): melihat ringkasan kondisi di area tersebut.
- Panel bawah / kiri: memilih 13 objek (rumput, pasir, batu, bukit, gunung, laut, danau, pohon, semak, bunga, kijang, rubah, burung).
- Tombol **Jeda**: menghentikan simulasi.
- Tombol **Planet DNA**: kode pendek `TPF-XXXX-XXXX-XXXX` (seed) dan kode lengkap (semua objek + fauna + environment + biome + terrain), dengan impor, pratinjau, duplikat, remix, dan Web Share.
- Tombol **Baru**: membuat planet baru.

## Yang sudah ada

- Planet icosphere seeded dengan displacement, normal, dan warna vertex dinamis.
- 13 jenis objek dengan efek simulasinya sendiri; 13 `BatchedMesh3D` untuk objek dan 5 batch fauna untuk menjaga draw call tetap rendah.
- Simulasi deterministik murni TypeScript: suhu, air, kelembapan, oksigen, kesuburan, biodiversitas, energi, stabilitas, vegetasi, satwa, cuaca, XP/level, dan tahap evolusi.
- Agen fauna otonom (kijang, rubah, burung, ikan, serangga) dari `seed + tick`: habitat, migrasi, energi, reproduksi, rantai makanan, penemuan spesies, dan kepunahan. Tidak ada `Math.random()` di runtime sim.
- 4 cuaca (cerah, hujan, salju, badai) dengan awan, presipitasi, dan perubahan pencahayaan.
- Misi **Hijaukan Planet**, 3 event opsional (hujan pertama, uji badai, pemulihan kekeringan), dan indikator ekosistem/cuaca waktu nyata.
- Save/load otomatis ke IndexedDB (fallback memori bila tidak tersedia).
- Planet DNA v2: payload binary ringkas + Crockford base32 + CRC16, termasuk agen fauna, `planetId`, dan CRC; kode base64 v1 serta DNA v2 tanpa `planetId` tetap bisa dibaca sebagai Terra.
- Enam ekosistem aktif: Terra, Dune, Glaciera, Inferna, Aquaria, dan Mycelia. Akses QA lewat `?planet=terra|dune|glaciere|inferna|aquaria|mycelia` atau `window.__game.setPlanet(id, seed?)`.
- `schemaVersion`, `revision`, `terrainConfig`, `biome`, dan `eventLog` di state; migrasi otomatis untuk save lama.
- Event mutasi deterministik (`planet.created`, `object.placed`, `clock.tick`) yang bisa di-replay.
- PWA: manifest, ikon 192/512, service worker cache-first/stale-while-revalidate, fallback offline, dan notifikasi pembaruan.
- Responsive portrait/landscape; UI memakai overlay DOM di atas kanvas PixiJS.
- Quality tier (`low`/`medium`/`high`) + adaptive downgrade otomatis bila p95 frame time > 34 ms.
- Overlay performa (`?perf=1`), hook QA (`?debug=1`), dan probe `?qa=1&qaSeconds=45` yang menghasilkan laporan p50/p95 + info perangkat siap disalin.
- Vendor PixiJS dipisah menjadi `pixi-core` + `pixi-3d`; app chunk ~94.1 kB (gzip ~31.3 kB) dan data konten menjadi chunk `planet-configs` terpisah ~50.4 kB.
- Telemetri opt-in (tersimpan lokal, tanpa server) dengan modal penjelasan, ekspor JSON, dan hapus data.
- Visual polish berbasis skill `pixi3d-visual-polish`: ground contact prop yang dihitung dari ekstent geometri, rim light, dan topbar mobile tanpa overflow. Standar visual ada di `docs/ART-DIRECTION.md`.

## Arsitektur

```
src/
  sim/          logika murni, tanpa import @pixi/3d
  content/      definisi objek & cuaca (data-driven)
  render/       View3D, planet mesh, prop batching, weather FX
  input/        tap/drag/long-press + raycast permukaan
  ui/           HUD/inventory/misi/DNA modal
  persistence/  IndexedDB save store
  pwa/          registrasi & update service worker
  app/          composition root + ticker
```

## Validasi

`npm test` menjalankan:

1. **Unit simulasi** — penempatan objek, 150 ticks, misi selesai, level minimal, satwa/populasi, 3 event opsional, kemunculan fauna, determinisme fauna, kepunahan, migrasi state lama, DNA v1/v2 round-trip termasuk fauna, checksum rusak, dan replay event deterministik.
2. **Smoke browser** (Chromium headless) — WebGL2 boot, 13 tombol objek, klik menanam objek, akselerasi 120 ticks, fauna muncul, misi selesai, HUD misi/cuaca/event/ekosistem/fauna berubah, persistensi setelah reload, DNA round-trip fauna lewat UI, service worker terdaftar, dan rendering tetap jalan setelah resize mobile.
3. **Device check** (emulasi mobile Chromium) — quality override, overlay performa, pinch dua jari lewat CDP, adaptive downgrade, dan handler context loss/restore.
4. Checklist rilis ada di `docs/RELEASE.md`; definisi KPI dan telemetri ada di `docs/KPI.md`; art direction ada di `docs/ART-DIRECTION.md`.

Audit visual mandiri:

```bash
npm run capture:visual -- /tmp/opencode/after.png 1337   # screenshot deterministik seed 1337
npm run audit:layout                                   # bounding box UI pada 390x844
```

Angka terakhir pada headless: draw call ~15 dengan 26 objek dan 41 agen fauna, p50 ~16,7 ms. **Ini bukan bukti performa Android.** Perlu pengukuran p50/p95 nyata di perangkat target.

Catatan: Chromium headless di lingkungan ini melepaskan konteks WebGL (`CONTEXT_LOST_WEBGL`), sehingga muncul 3 error shader saat shader variant baru dikompilasi. Error tersebut difilter dalam smoke test hanya ketika `contextLost === true`; error aplikasi lain tetap menggagalkan tes. Chromium headless juga tidak bisa mengembalikan konteks WebGL sungguhan setelah `restoreContext()`, jadi handler restore hanya diuji dengan event sintetis. Lihat `docs/QA-DEVICE.md` untuk checklist perangkat nyata.

## Asumsi & batas

- Target distribusi: PWA installable/offline-capable. Target performa diasumsikan **Android menengah** (30 FPS), bukan low-end; ini perlu dikonfirmasi.
- Gestur pinch dikonfigurasi lewat `touches: { two: 'zoom-rotate' }` dan diverifikasi dengan pinch sintetis di `test:device`; tetap perlu dicek dengan jari sungguhan.
- UI memakai DOM overlay, bukan PixiJS 2D seperti rencana awal — dipilih untuk aksesibilitas dan kecepatan slice.
- Di luar scope saat ini: multiplayer, cloud save, dan galeri sosial. Wildlife otonom sudah masuk di v0.3; DNA v2 menyimpan state penuh termasuk fauna, tetapi galeri publik masih menyusul.

## Roadmap pasca-MVP

Program Nine Worlds menggantikan roadmap lama: Terra diselesaikan lebih dulu, lalu engine yang sama diperluas ke delapan planet lain. Cloud/Gallery/Social ditunda ke fase setelah Nine Worlds.

| Versi | Fokus |
|---|---|
| `v0.1.1` | **Data Foundation** — `schemaVersion`, migrasi, event replay, serialisasi penuh, DNA v2. *(selesai)* |
| `v0.2` | **Planet DNA Sharing** — kode pendek/lengkap, pratinjau, duplikat, remix, Web Share. *(selesai)* |
| `v0.3` | **Living Planet** — agen satwa otonom, rantai makanan, habitat, migrasi, kepunahan, species discovery. *(selesai)* |
| `v0.4` | **Ecosystem Data Foundation** — schema v3, 9 konfigurasi planet, 103 spesies unik, validasi habitat. *(selesai)* |
| `v0.5` | **Terra Core** — simulasi populasi berbasis habitat, reproduksi/kematian, detritus, metrik turunan. *(selesai)* |
| `v0.5.1` | **Observability & Stress Tests** — hook `eco()`, panel `?eco=1`, lima skenario gangguan. *(selesai)* |
| `v0.6` | **Food Web + Wildlife AI** — agen fauna yang terhubung ke populasi ekologis. *(selesai)* |
| `v0.7` | **Dune + Biome Expansion** — planet kedua dengan iklim, food web, dan guild sendiri. *(selesai)* |
| `v0.8` | **Glaciera + Cold Biome** — musim, freeze/thaw, guild es, dan DNA sadar planet. *(selesai)* |
| `v0.9` | **Inferna + Volcanic Biome** — musim letusan, panas/lava/abu, guild vulkanik, dan hazard dinamis. *(selesai)* |
| `v0.10` | **Aquaria + Aquatic Biome** — arus, terumbu, plankton, pemutihan, guild laut, dan habitat akuatik dinamis. *(selesai)* |
| `v0.11` | **Mycelia + Fungal Biome** — jaringan miselium, spora, bioluminesensi, nutrisi, dan hazard fungal. *(selesai)* |
| `v0.12+` | **Nine Worlds lanjutan** — Sakura, Aurelia, Cosmos. |

## Langkah berikutnya

1. Selesaikan checklist `docs/QA-DEVICE.md` di Android menengah sungguhan: p50/p95, cold start, pinch, context loss/restore, PWA offline/update.
2. Deploy produksi HTTPS mengikuti `docs/RELEASE.md`, lalu jalankan `?qa=1&qaSeconds=45` dari perangkat.
3. Lanjut ke v0.12 (Sakura) setelah QA HTTPS/perangkat nyata selesai.
4. Baru setelah Nine Worlds selesai, evaluasi ulang Supabase cloud/gallery/social sebagai fase terpisah.
