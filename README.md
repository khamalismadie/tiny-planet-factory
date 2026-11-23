# Tiny Planet Factory — Vertical Slice v0.17.0

Prototipe web 3D tempat pemain membangun planet bulat kecil, mengubah permukaannya, dan menjaga ekosistemnya tetap hidup. Fokus slice ini adalah satu transformasi yang terasa jelas dalam ~3–5 menit: batu tandus → planet berair dan hijau.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview    # http://localhost:4173 (mode PWA aktif)
npm test           # 8 gate: sim, scale, terrain, smoke, device, qa-load, menu, layout
npm run qa:evidence -- laporan.json --offline --standalone --landscape
```

Build memakai `NODE_OPTIONS=--max-old-space-size=4096` karena bundler PixiJS 3D membutuhkan heap lebih besar dari default Node.

Kode `main` adalah `v0.21.0` (**belum di-deploy**). Rilisan produksi aktif tetap `v0.16.0` di <https://tinyplanetfactory.netlify.app/>. Hook QA: `?debug=1`, `?perf=1`, `?quality=low|medium|high`, `?eco=1`, `?menu=0`, `?campaign=1`, `?planet=...`, `?seed=N`, `?tutorial=0|1`, dan `?qa=1&qaSeconds=45&qaObjects=N` (`qaObjects` maks 96, `qaSeconds` maks 180). Saat `?debug=1`, varian dibaca lewat `window.__game.variants()`, progresi lewat `window.__game.campaign()`, dan status panduan lewat `window.__game.tutorial()`.

### Cek cepat varian

```bash
npm run preview
# Buka http://127.0.0.1:4173/?debug=1&seed=1&planet=dune&menu=0
```

Lalu di konsol browser:

```js
window.__game.variants()
// { indices: { props: {...}, species: {...} }, labels: { props: {...}, species: {...} } }
```

### Cek cepat campaign

```bash
npm run preview
# Buka http://127.0.0.1:4173/?debug=1&campaign=1&menu=0
```

```js
window.__game.campaign()
// { level, maxLevel: 100, era, mission: {...}, total: 100, eras: 10, lockedFrom: null, systems: {...} }
```

Dengan seed `1`, Dune memakai `sand: Dune`, `rock: Sandstone`, `tree: Oak`, dan `bush: Cactus`. Katalog lengkap ada di `docs/ASSET-CATALOG.md`.

### Cek cepat tutorial

```bash
npm run preview
# Buka http://127.0.0.1:4173/?debug=1&tutorial=1&menu=0
```

```js
window.__game.tutorial()
// { active, step, total: 3, label, instruction, focus, completed }
```

FTUE otomatis berjalan untuk save baru. `?tutorial=1` memaksa ulang dari langkah 1, `?tutorial=0` mematikan panduan untuk QA. Modal **Menu → Cara pakai UI → Ulangi panduan** juga bisa memulai ulang.

## Kontrol

- Geser / drag: memutar kamera 360°.
- Scroll / pinch: zoom.
- Ketuk permukaan: meletakkan objek yang sedang dipilih.
- Tahan lama (~0,5 s): melihat ringkasan kondisi di area tersebut.
- Ketukan sukses memberi scale-pop objek `0,45 → 1,0` dalam 0,32 s dan cincin aksen hijau `#6fd39b` di titik kontak selama 0,65 s; reset/import DNA tidak memicu pop massal.
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
- FTUE 3 langkah untuk player baru + tips one-shot saat cuaca, fauna, unlock level, era lanjutan, dan DNA pertama; status disimpan terpisah di `localStorage` `tpf.tutorial.v1`, bukan di DNA.
- Save/load otomatis ke IndexedDB (fallback memori bila tidak tersedia).
- Planet DNA v2: payload binary ringkas + Crockford base32 + CRC16, termasuk agen fauna, `planetId`, dan CRC; kode base64 v1 serta DNA v2 tanpa `planetId` tetap bisa dibaca sebagai Terra.
- Sembilan ekosistem aktif (Nine Worlds lengkap): Terra, Dune, Glaciera, Inferna, Aquaria, Mycelia, Sakura, Aurelia, dan Cosmos. Akses QA lewat `?planet=terra|dune|glaciere|inferna|aquaria|mycelia|sakura|aurelia|cosmos` atau `window.__game.setPlanet(id, seed?)`.
- `schemaVersion`, `revision`, `terrainConfig`, `biome`, dan `eventLog` di state; migrasi otomatis untuk save lama.
- Event mutasi deterministik (`planet.created`, `object.placed`, `clock.tick`) yang bisa di-replay.
- PWA: manifest, ikon 192/512, service worker cache-first/stale-while-revalidate dengan cache `tpf-shell-v0-19-0` di kode `main` (produksi v0.16.0 masih memakai `tpf-shell-v0-16-0`), precache seluruh chunk, fallback offline, dan notifikasi pembaruan.
- Responsive portrait/landscape; UI memakai overlay DOM di atas kanvas PixiJS.
- Quality tier (`low`/`medium`/`high`) + adaptive downgrade otomatis bila p95 frame time > 34 ms.
- Overlay performa (`?perf=1`), hook QA (`?debug=1`), dan probe `?qa=1&qaSeconds=45` yang menghasilkan laporan p50/p95 + info perangkat siap disalin.
- Vendor PixiJS dipisah menjadi `pixi-core` + `pixi-3d`; data konten dan codec DNA berbagi chunk `planet-configs` untuk menghindari inisialisasi circular. App chunk v0.21.0 adalah 80,49 kB (gzip 26,42 kB).
- Telemetri opt-in (tersimpan lokal, tanpa server) dengan modal penjelasan, ekspor JSON, dan hapus data.
- Visual polish v0.15.9: satu merged geometry per tipe dengan warna per-facet, AO vertikal + bayangan kontak baked, shade lereng planet, awan 10×6, ground contact dari ekstent geometri, rim light, dan topbar mobile tanpa overflow. Standar visual ada di `docs/ART-DIRECTION.md`.
- Asset varian v0.16.0: 49 pilihan (39 prop + 10 fauna) dari 43 builder unik, dipilih deterministik dari `seed + planetId`, satu geometri aktif per tipe, bias visual 9 planet, tanpa tekstur/DNA/draw call baru. Katalog ada di `docs/ASSET-CATALOG.md`.
- Campaign v0.17.0–v0.18.0: 100 level / 10 era, kurva XP kuadratik, 100 main mission dengan 6 tipe quest, HUD era+level+progress, panel `?campaign=1`, dan hook `window.__game.campaign()`. Semua 100 misi aktif sejak v0.18.0; DNA Points/Bio Energy tetap derived. Detail: `docs/CAMPAIGN.md`.
- Wave fitur etis lokal pasca-preview #41: kompendium + insight habitat/cuaca, tren dan aksi restorasi, milestone/snapshot/jurnal lokal, advisory risiko-respons, ekspor jurnal, pratinjau dampak objek, panel kesiapan offline, lencana ekologi lokal, Indeks Kesehatan Planet (`#70`), advisory Kebun Penyerbuk/Hutan (`#34` + `#3`), dan advisory Perlindungan Satwa/Konservasi (`#6` + `#45`). Semua turunan dari state existing, lokal/unreleased, tanpa schema/gate baru. Katalog sumber: `docs/PLANET-CARE-FEATURE-DATABASE.md`; status bundle: `docs/LOCAL-FEATURE-WAVES.md`.

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

`npm test` menjalankan 8 gate:

1. **Unit simulasi** — penempatan objek, 150 ticks, misi selesai, level minimal, satwa/populasi, 3 event opsional, kemunculan fauna, determinisme fauna, kepunahan, migrasi state lama, DNA v1/v2 round-trip termasuk fauna, checksum rusak, replay event deterministik, 9 planet, dan siklus musim 100–120 tick.
2. **Art scale** — budget triangle, facet, tekstur nol, spacing, dan determinisme untuk 49 varian (43 builder unik) di 9 planet.
3. **Terrain render** — normalisasi idempoten dan radius 0,85–1,15 untuk kesembilan planet.
4. **Smoke browser** (Chromium headless) — WebGL2 boot, 13 tombol objek, klik menanam objek, feedback placement aktif, akselerasi 120 ticks, fauna muncul, misi selesai, HUD berubah, persistensi setelah reload, DNA round-trip lewat UI, service worker terdaftar, resize mobile, dan boot/simulasi untuk kesembilan planet.
5. **Device check** (emulasi mobile Chromium) — quality override, overlay performa, pinch dua jari lewat CDP, dan adaptive downgrade. Context loss/restore tetap diverifikasi manual di perangkat nyata (checklist `docs/QA-DEVICE.md` #6).
6. **QA load** — seed 1, 94 objek, tier medium, 16 tick ke cuaca Hujan, p95 ≤ 33 ms, dan draw call ≤18 saat Cerah / ≤20 saat Hujan-Badai-Salju.
7. **Menu** — 9 planet, switching, guide 4 langkah, dan perilaku pause-safe.
8. **Layout** — target sentuh ≥48 dp di 360×640, 390×844, dan 844×390 tanpa overflow.

Checklist rilis ada di `docs/RELEASE.md`, alur produk/sprint ada di `docs/PRODUCT-TO-PRODUCTION.md` dan `docs/SPRINT.md`, KPI/telemetri ada di `docs/KPI.md`, dan art direction ada di `docs/ART-DIRECTION.md`.

Audit visual mandiri:

```bash
npm run capture:visual -- /tmp/opencode/after.png 1337   # screenshot deterministik seed 1337
npm run audit:layout                                   # bounding box UI pada 360x640, 390x844, dan 844x390
```

Angka headless terbaru (v0.16.0, `test:qa-load`, seed 1/medium/94 objek/Hujan): p50 16,70 ms, p95 16,80 ms, 59,9 FPS, draw call 20, boot 386–561 ms tergantung run, tanpa downgrade. Smoke grown scene masih ~15 draw call dengan 26 objek dan 41 agen fauna. **Ini bukan bukti performa Android.**

Catatan: Chromium headless di lingkungan ini dapat melepaskan konteks WebGL (`CONTEXT_LOST_WEBGL`), sehingga muncul error shader saat variant baru dikompilasi. Error tersebut difilter hanya ketika `contextLost === true`; error aplikasi lain tetap menggagalkan tes. Belum ada gate otomatis untuk restore sungguhan; hook `restoreContext()` tersedia untuk QA, tetapi checklist #6 di `docs/QA-DEVICE.md` wajib di perangkat nyata.

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
| `v0.12` | **Sakura + Floral Biome** — pulau melayang, mekar, angin langit, dan konektivitas vertikal. *(selesai)* |
| `v0.13` | **Aurelia + Autumn Biome** — serasah, simpanan makanan, hibernasi, dan embun beku. *(selesai)* |
| `v0.14` | **Cosmos + Crystal Biome** — kristal, radiasi, gravitasi, dan fase meteor; Nine Worlds lengkap. *(selesai)* |
| `v0.14.1–v0.14.3` | **PWA Portability** — base relatif, manifest/scope relatif, precache seluruh chunk, dan `ignoreVary` untuk offline reload. *(selesai; deploy HTTPS aktif — Netlify)* |
| `v0.15` | **Main Menu & Instrument UI** — menu utama, kontrol kualitas, pause-safe, dan bahasa visual peta kebun planet. *(selesai)* |
| `v0.15.1` | **Habitat Proportion Balance** — hierarki gunung/pohon, silhouette bunga, dan soft spacing deterministik. *(selesai)* |
| `v0.15.2` | **First-Visit SW Fix** — tidak ada reload paksa saat install PWA pertama kali. *(selesai)* |
| `v0.15.3` | **Balanced World Scale** — hierarki ukuran gunung, bukit, pohon, fauna, dan prop mengikuti logika dunia nyata. *(selesai)* |
| `v0.15.4` | **Reachable Progression & Mobile UX** — stage/level bisa dicapai, target sentuh 48 dp, objective strip, siklus musim 4 menit, telemetri funnel. *(selesai)* |
| `v0.15.5` | **Device QA Load Harness** — `qaObjects` untuk mengukur beban 25+ objek di perangkat nyata. *(selesai)* |
| `v0.15.6` | **Planet Shape Fix** — normalisasi terrain di renderer, silhouette semua planet seukuran kamera dan prop. *(selesai)* |
| `v0.15.7` | **Menu & Tutorial** — menu observatorium, pemilih 9 planet, panduan UI 4 langkah. *(selesai)* |
| `v0.15.8` | **Weather Scale Fix** — badai proporsional, lebih basah & gelap dari hujan, gate rasio cuaca. *(selesai)* |
| `v0.15.9` | **Faceted Diorama Polish** — facet lowpoly + AO per-facet, kontak baked, warna lereng, awan 10×6; 8 gate test, chunk 65,43 kB, cache `tpf-shell-v0-15-9`. *(selesai)* |
| `v0.16.0` | **Deterministic Asset Variants** — 49 pilihan varian, 43 builder unik, resolver `seed + planetId`, bias visual per planet, satu geometri aktif per tipe, tanpa draw call baru; chunk 72,65 kB, cache `tpf-shell-v0-16-0`. *(implemented; QA real-device still open)* |
| `v0.17.0` | **Campaign & Leveling** — 100 level / 10 era, 100 main mission, 6 tipe quest, HUD campaign, dan panel QA. Misi 61–100 saat itu masih locked; aktif sejak v0.18.0. Produksi masih v0.16.0. *(implemented on main; unreleased)* |

## Langkah berikutnya

1. Yang tersisa adalah QA Android nyata: p50/p95, cold start 4G dari ikon PWA, pinch, context loss/restore, landscape, dan PWA offline/update. Verifikasi localhost **dan** remote HTTPS sudah PASS, tetapi bukan pengganti perangkat nyata.
2. Ulangi `?debug=1&qa=1&qaSeconds=45&seed=1&qaObjects=94&quality=medium` dari Android menengah; untuk target 5 menit, jalankan dua sesi 180 s karena aplikasi memotong `qaSeconds` ke maks 180.
3. Ikuti `docs/SPRINT.md` (Sprint 09) dan jangan tambah biome sebelum P0 QA ditutup. Varian v0.16.0 tidak menambah tipe objek/DNA.
4. Setelah QA ditutup, evaluasi Supabase cloud/gallery/social dan katalog referensi lanjutan di `docs/ASSET-CATALOG.md` sebagai fase terpisah.
