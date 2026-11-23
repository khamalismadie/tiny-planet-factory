# Release Checklist — Tiny Planet Factory

Gunakan checklist ini sebelum publish build produksi.

> **Status pembacaan v0.15.9:** angka 360 tick pada phase v0.10–v0.14 adalah spesifikasi historis. Sejak v0.15.4, semua siklus musim aktif berada pada **106–120 tick** (divalidasi `test:sim`). Bagian bertanda v0.4–v0.14 adalah catatan rilis, bukan klaim kondisi saat ini; lihat §2u–§2ab untuk status terkini. `main` adalah v0.21.0 (unreleased; commit aktif selalu `git rev-parse HEAD`); produksi masih v0.16.0.
>
> **Status QA v0.21.0 (2026-11-23):** 4 laporan p95 preview #41 di `qa-evidence/` plus 7 laporan Wave 9 `index-BnlhvdGl.js` di `qa-evidence/wave9/`, semuanya **REVIEW** (run 5–7 valid dengan p95 33,4 ms; run 3–4 memakai UA desktop dan tidak valid). #7 belum lulus; #5, #6, dan #8 juga tetap OPEN. Deploy produksi ditahan sampai evidence asli lulus. Rincian: `docs/QA-ISSUE-PLAYBOOK.md`.

> **Status fitur lokal pasca-preview #41:** commit `71a8809`–`f0193de` menambahkan wave insight/restorasi/advisory/offline/lencana/indeks kesehatan/advisory habitat dan satwa etis di `main` tanpa schema, gate, planet, biome, atau misi baru. Build lokal pada `f0193de` memakai `index-BnlhvdGl.js`, app chunk 92,97 kB / gzip 30,34 kB, dan `npm test` 8/8 PASS. Tujuh laporan Wave 9 sudah ada di `qa-evidence/wave9/`, tetapi semuanya **REVIEW** dan **tidak** menutup #5–#8. Rincian: `docs/LOCAL-FEATURE-WAVES.md`. Paket pengumpulan bukti fisik untuk build ini: `docs/QA-HANDOFF-WAVE9.md`.

## 1. Prasyarat

- [ ] Node 20+ dan dependency terpasang (`npm install`).
- [ ] Version di `package.json` sudah dinaikkan.
- [ ] Host PWA mendukung **HTTPS** dan melayani `sw.js` pada scope aplikasi (root atau subpath).
- [ ] Ikon `icons/icon-192.png`, `icons/icon-512.png`, dan `icons/icon.svg` tersedia di scope aplikasi.
- [ ] `manifest.webmanifest` masih valid (name, short_name, start_url, display, icons).

## 2. Build & test

```bash
npm run build
PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright npm test
```

- [ ] `npm run build` tanpa error. Chunk vendor: `pixi-core` + `pixi-3d`, app chunk < 100 kB (v0.21.0: 80,49 kB / gzip 26,42 kB; produksi v0.16.0: 73,33 kB).
- [ ] `PASS: sim`
- [ ] `PASS: art scale`
- [ ] `PASS: terrain render`
- [ ] `PASS: vertical slice smoke`
- [ ] `PASS: device-check`
- [ ] `PASS: qa load`
- [ ] `PASS: menu check`
- [ ] `PASS: layout audit`
- [ ] Tidak ada error konsol aplikasi di gate browser.
- [ ] Unit test mencakup DNA v1/v2 round-trip (termasuk fauna), checksum rusak, migrasi save lama, replay event deterministik, kemunculan fauna, determinisme fauna, dan kepunahan.
- [ ] Smoke test memakai **kode DNA lengkap** (`#dna-full`), bukan hanya kode pendek, saat verifikasi round-trip, termasuk jumlah agen fauna.

## 2b. Data & DNA (v0.1.1 / v0.2)

- [ ] Save lama tanpa `schemaVersion` tetap terbuka setelah update.
- [ ] Kode DNA v1 (base64) lama masih bisa diimpor.
- [ ] Kode pendek berformat `TPF-XXXX-XXXX-XXXX`; kode lengkap diawali `TPF-` dan lebih panjang.
- [ ] Checksum rusak ditolak dengan pesan, bukan crash.
- [ ] Panel DNA menampilkan kode pendek + lengkap, Web Share, pratinjau, duplikat, remix, dan status pratinjau.
- [ ] Menutup panel saat pratinjau aktif mengembalikan planet asli tanpa menimpa save.
- [ ] `terrainConfig` dari DNA mengubah bentuk permukaan dan posisi prop secara konsisten.

## 2c. Living Planet (v0.3)

- [ ] Agen fauna muncul dari habitat: herba dari vegetasi, rubah dari kijang, burung dari pohon/bunga, ikan dari laut/danau, serangga dari bunga/semak.
- [ ] Fauna bergerak mengikuti `seed + tick`; dua planet dengan seed sama menghasilkan agen identik.
- [ ] Rantai makanan berjalan: kijang merumput, rubah berburu, serangga menyerbuki, ikan bergantung pada air.
- [ ] Penemuan spesies dan kepunahan tercatat di HUD, telemetri, dan laporan QA.
- [ ] Kode DNA lengkap mempertahankan agen fauna saat diimpor/diduplikat/remix.
- [ ] Quality tier membatasi jumlah fauna yang dirender (`low` 6, `medium` 12, `high` 24).
- [ ] Draw call total masih di bawah 150 dengan fauna aktif.

## 2d. Ecosystem Data Foundation (v0.4)

- [ ] `schemaVersion` = 3 dengan field `planetId`, `ecosystemVersion`, dan `eco`.
- [ ] Save lama v1/v2 tetap terbuka dan mendapat `eco` state default tanpa kehilangan objek/event/fauna.
- [ ] Semua 9 `PlanetConfig` lolos validasi: species unik, referensi flora/fauna/decomposer valid, food web valid, minimal satu season.
- [ ] `SpeciesRegistry` berisi 103 spesies untuk 9 planet dengan id global unik (angka awal v0.4 adalah subset; saat ini seluruhnya diinisialisasi).
- [ ] `HabitatManager` menghasilkan skor deterministik untuk input yang sama.
- [ ] `eco.discovered`, `eco.populations`, dan `eco.eventHistory` bertahan setelah save/load.
- [ ] DNA v1 base64 masih bisa dibaca. Binary saat ini adalah v2 + 1 byte `planetId` sebelum CRC16; DNA v3/evolusi **belum** diimplementasikan.

## 2e. Terra Core (v0.5)

- [ ] 12 spesies kunci Terra memiliki populasi awal dan metrik turunan di `eco`.
- [ ] Producer bereproduksi dan populasi tetap berada dalam kapasitas dinamis.
- [ ] Decomposer mengubah detritus menjadi fertility yang terukur.
- [ ] Habitat suitability memengaruhi kelahiran, kematian, dan kapasitas.
- [ ] Long-run test 10.000 tick: semua spesies bertahan, tidak ada nilai negatif/non-finite, detritus terikat.
- [ ] Dua planet dengan seed sama menghasilkan `eco` identik setelah 10.000 tick.
- [ ] App chunk tetap di bawah 100 kB meskipun profile Terra ikut ter-bundle.

## 2f. Observability & Stress Tests (v0.5.1)

- [ ] Debug hook `eco()` mengembalikan state ekosistem planet aktif; Terra 12 populasi, planet lain 10–12 populasi. Hook hanya tersedia di DEV atau `?debug=1`.
- [ ] Debug hook `ecoScore(id)` mengembalikan skor dan limiting factor habitat.
- [ ] Panel `?eco=1` menampilkan populasi, kapasitas, trend, detritus, dan metrik turunan.
- [ ] Panel eco tersembunyi secara default sehingga HUD normal tidak berubah.
- [ ] Skenario overpopulasi herbivora tetap bounded dan vegetasi bertahan.
- [ ] Skenario predator punah menaikkan herbivora tetapi tetap dalam kapasitas.
- [ ] Skenario kelangkaan makanan menurunkan food availability lalu produsen pulih.
- [ ] Skenario kekeringan dan kerusakan habitat menurunkan habitat health lalu pulih setelah restorasi.

## 2g. Food Web + Wildlife AI (v0.6)

- [ ] `guildStatus()` memetakan 5 guild visual ke 12 spesies Terra.
- [ ] `foodWeb()` debug hook mengembalikan 5 guild dan link food web Terra.
- [ ] Panel `?eco=1` menampilkan ringkasan agen dan suplai makanan per guild.
- [ ] Kapasitas agen dibatasi oleh habitat **dan** populasi ekologis.
- [ ] Runtuhnya produsen menurunkan suplai herbivora; runtuhnya mangsa menurunkan suplai predator.
- [ ] Predasi agen tidak dihitung dua kali sebagai mortalitas ekologis.
- [ ] DNA fauna dan seed-identik determinisme tidak berubah.

## 2h. Dune + Biome Expansion (v0.7)

- [x] `isSupportedPlanet()` menerima kesembilan `PLANET_IDS` (semua planet aktif sejak v0.14).
- [ ] `?planet=dune` dan `setPlanet('dune')` menghasilkan planet dengan 12 populasi Dune.
- [ ] Suhu/air Dune tetap dalam rentang gurun setelah 200 tick.
- [ ] Guild Dune memetakan unta, kelinci, gazel, kadal, rubah fennec, ular, nasar, dan kumbang.
- [ ] Tidak ada agen ikan di Dune.
- [ ] Save/load dan determinisme seed Dune lolos.
- [ ] App chunk <100 kB dengan `planet-configs` sebagai chunk terpisah.

## 2i. Glaciera + Cold Biome (v0.8)

- [ ] `?planet=glaciere` dan `setPlanet('glaciere')` menghasilkan 12 populasi Glaciera.
- [ ] Empat musim berjalan deterministik dari tick: polar-night → thaw → short-summer → freeze-up.
- [ ] `freeze` turun dari polar-night ke thaw ke short-summer.
- [ ] `iceCoverage > 0` saat danau/samudra ditempatkan.
- [ ] DNA lengkap mempertahankan `planetId` untuk Dune dan Glaciera; DNA v2 lawas tetap Terra.
- [ ] Save/load mempertahankan `eco.cryo`.
- [ ] Terra tidak berubah secara numerik dari gate v0.7.
- [ ] App chunk <100 kB.

## 2j. Inferna + Volcanic Biome (v0.9)

- [ ] `?planet=inferna` dan `setPlanet('inferna')` menghasilkan 12 populasi Inferna.
- [ ] Empat musim berjalan deterministik dari tick: quiet-phase → ash-fall → eruption-phase → regrowth.
- [ ] `heat`, `lavaFlow`, `ash`, dan `eruptionStress` naik saat letusan lalu turun saat regrowth.
- [ ] Suhu letusan >75°C dan air tetap <25.
- [ ] Tidak ada guild atau agen ikan di Inferna.
- [ ] Save/load mempertahankan `eco.volcano`.
- [ ] DNA lengkap mempertahankan `planetId` Inferna.
- [ ] Terra, Dune, dan Glaciera tidak berubah secara numerik dari gate v0.8.
- [ ] App chunk <100 kB.

## 2k. Aquaria + Aquatic Biome (v0.10)

- [ ] `?planet=aquaria` dan `setPlanet('aquaria')` menghasilkan 12 populasi Aquaria.
- [ ] Empat musim berjalan deterministik dari tick: calm-current → warm-water → plankton-bloom → storm-surge.
- [ ] Plankton naik saat bloom, pemutihan naik saat air hangat, arus naik saat badai laut.
- [ ] Air >80, terumbu tetap sehat setelah satu siklus 120 tick (v0.15.9; spec v0.10: 360 tick), dan 12 spesies tetap hidup.
- [ ] Guild laut memetakan ikan terumbu, kepiting, lumba-lumba, dan bakteri; agen ikan/mikroba muncul.
- [ ] Save/load mempertahankan `eco.ocean`.
- [ ] DNA lengkap mempertahankan `planetId` Aquaria.
- [ ] Terra, Dune, Glaciera, dan Inferna tidak berubah secara numerik dari gate v0.9.
- [ ] App chunk <100 kB.

## 2l. Mycelia + Fungal Biome (v0.11)

- [ ] `?planet=mycelia` dan `setPlanet('mycelia')` menghasilkan 11 populasi Mycelia.
- [ ] Empat musim berjalan deterministik: spore-spring → glow-summer → damp-autumn → quiet-winter.
- [ ] Spora naik saat Musim Spora, cahaya naik saat Musim Cahaya, nutrisi naik saat Musim Lembap, stres naik saat Musim Tenang.
- [ ] Jaringan tetap >0 dan 11 spesies tetap hidup setelah satu siklus 120 tick (v0.15.9; spec v0.11: 360 tick).
- [ ] Guild Mycelia memetakan kijang spora, kelelawar, dan ngengat; predator terhubung ke food web.
- [ ] Save/load mempertahankan `eco.fungal`.
- [ ] DNA lengkap mempertahankan `planetId` Mycelia.
- [ ] Terra, Dune, Glaciera, Inferna, dan Aquaria tidak berubah secara numerik dari gate v0.10.
- [ ] App chunk <100 kB.

## 2m. Sakura + Floral Biome (v0.12)

- [ ] `?planet=sakura` dan `setPlanet('sakura')` menghasilkan 11 populasi Sakura.
- [ ] Empat musim berjalan deterministik: blossom-season → petal-fall → sky-winds → quiet-sky.
- [ ] Mekar turun saat Gugur Kelopak, angin/stres isolasi naik saat Angin Langit, konektivitas pulih saat Langit Tenang.
- [ ] 11 spesies tetap hidup setelah satu siklus 120 tick pada v0.15.9 (spec historis: 360 tick).
- [ ] Guild Sakura memetakan kijang bunga, elang, dan kupu-kupu; predator terhubung ke food web.
- [ ] Save/load mempertahankan `eco.sky`.
- [ ] DNA lengkap mempertahankan `planetId` Sakura.
- [ ] Enam planet sebelumnya tidak berubah secara numerik dari gate v0.11.
- [ ] App chunk <100 kB.

## 2n. Aurelia + Autumn Biome (v0.13)

- [ ] `?planet=aurelia` dan `setPlanet('aurelia')` menghasilkan 11 populasi Aurelia.
- [ ] Empat musim berjalan deterministik: spring → summer → autumn → winter.
- [ ] Simpanan naik saat Panas/Gugur, serasah naik saat Gugur, hibernasi dan embun naik saat Dingin.
- [ ] 11 spesies tetap hidup setelah satu siklus 120 tick pada v0.15.9 (spec historis: 360 tick).
- [ ] Guild Aurelia memetakan kijang, rubah, lynx, dan burung hantu; predator terhubung ke food web.
- [ ] Save/load mempertahankan `eco.forest`.
- [ ] DNA lengkap mempertahankan `planetId` Aurelia.
- [ ] Tujuh planet sebelumnya tidak berubah secara numerik dari gate v0.12.
- [ ] App chunk <100 kB.

## 2o. Cosmos + Crystal Biome (v0.14)

- [ ] `?planet=cosmos` dan `setPlanet('cosmos')` menghasilkan 10 populasi Cosmos.
- [ ] Empat fase berjalan deterministik: luminous-phase → crystal-resonance → void-tide → meteor-shower.
- [ ] Kisi menguat saat Resonansi Kristal; radiasi/gravitasi naik saat Pasang Hampa; radiasi puncak saat Hujan Meteor.
- [ ] 10 spesies tetap hidup setelah satu siklus 110 tick pada v0.15.9 (spec historis: 360 tick).
- [ ] Guild Cosmos memetakan kelinci bintang, elang astral, dan ngengat komet; predator terhubung ke food web.
- [ ] Save/load mempertahankan `eco.sky` dengan mapping kosmik.
- [ ] DNA lengkap mempertahankan `planetId` Cosmos.
- [ ] Delapan planet sebelumnya tidak berubah secara numerik dari gate v0.13.
- [ ] App chunk <100 kB.

## 2p. Deploy HTTPS & PWA portability (v0.14.1–v0.14.3)

- [x] Build memakai `base: './'` sehingga asset bisa di-root LAN maupun subpath host.
- [x] Manifest memakai `start_url`/`scope` `./` dan ikon relatif.
- [x] `sw.js` menghitung cache path dari `self.registration.scope`.
- [x] Registrasi service worker memakai URL relatif terhadap `document.baseURI`.
- [x] Plugin `pwa-precache` menyuntik seluruh chunk hasil build ke `SHELL`.
- [x] `caches.match(request, { ignoreVary: true })` menangani header `Vary: Origin` dari Vite preview.
- [x] Verifikasi localhost secure-context: manifest installable shape, SW control, shell + chunk ter-cache, offline reload sukses, tanpa page error.
- [x] GitHub Pages ditunda (keputusan pipeline); produksi memakai Netlify. Alasan akun/repo bersifat eksternal dan tidak diverifikasi di repo ini.
- [x] Host HTTPS produksi: manifest dan `sw.js` mengembalikan 200 (verifikasi 2026-11-22, commit `ea8f9b9`; lihat `docs/QA-DEVICE.md`).
- [ ] Install prompt, offline, dan update di perangkat nyata.

## 2q. Main Menu & Instrument UI (v0.15)

- [x] Menu utama muncul saat boot normal; dilewati oleh `debug`, `qa`, `planet`, atau `menu=0`.
- [x] Aksi menu: lanjutkan save, planet baru, buka Planet DNA, ganti kualitas grafis, kembali ke planet.
- [x] Menu menghentikan simulasi dan mengembalikan status jeda saat ditutup.
- [x] Tombol `Menu` di topbar, Escape untuk menutup, fokus awal pada aksi utama.
- [x] Bahasa visual “peta kebun planet”: panel catatan lapangan, aksen hijau hayati/amber, tipografi display + data monospace.
- [x] Pemilih planet permanen hadir di menu observatorium sejak v0.15.7; `?planet=` tetap ada sebagai hook QA/deeplink.
- [x] Gate baru `npm run test:menu` untuk desktop + mobile, overflow, fokus, kualitas, pause, dan DNA.

## 2r. Habitat Proportion Balance (v0.15.1)

- [x] Gunung dinaikkan dan pohon dirapikan: minimum gunung ≈1.45× pohon maksimal pada oksigen sehat.
- [x] Bunga dinaikkan ±29% agar silhouette tidak menyatu dengan rumput.
- [x] `spacingRadius` ditambahkan ke `OBJECT_DEFS` sebagai data sim renderer-agnostic.
- [x] `placeObject()` memakai soft spacing deterministik berbasis sudut emas; objek tetap diterima.
- [x] Event `object.placed` menyimpan arah final hasil spacing agar replay sesuai.
- [x] Gate `test:sim` memeriksa margin spacing dan determinisme penumpukan 39 objek.
- [x] Budget tetap lolos: 18–200 triangle per prop, 0 tekstur.

## 2s. First-Visit SW Fix (v0.15.2)

- [x] `registerPwa()` hanya reload saat `controllerchange` jika sudah ada controller sebelumnya.
- [x] Install PWA pertama kali tidak memicu reload yang menutup/open ulang menu utama.
- [x] Gate `test:menu` menghitung navigasi first-load dan menggagalkan reload tak sengaja.
- [x] Deploy HTTPS produksi aktif di <https://tinyplanetfactory.netlify.app/> via auto-deploy Netlify dari `main`.
- [x] Deploy produksi diverifikasi lewat gate headless `test:smoke`, `test:device` (emulasi mobile Chromium), `test:menu`, `test:layout`, dan PWA check offline. QA perangkat nyata tetap OPEN (§3).

## 2t. Balanced World Scale (v0.15.3)

- [x] Hierarki final: gunung > bukit > pohon > semak > rusa > rubah > batu ≈ bunga > rumput > burung.
- [x] Tinggi dunia: gunung `0.115`, bukit `0.060`, pohon `0.045`, rusa `0.0105`, rubah `0.007`, burung `0.004`.
- [x] Gunung minimum ≈1.46× pohon maksimal pada vegetasi sehat.
- [x] Rasio kunci: bukit/pohon `1.33`, pohon/rusa `4.29`, rusa/rubah `1.49`, rusa/burung `2.64`.
- [x] Wildlife memakai `SPECIES_SCALE`; fauna wildlife seukuran prop fauna dan tidak lagi melebihi gunung.
- [x] `spacingRadius` dihitung ulang dari footprint baru; spacing deterministik tetap lolos.
- [x] Gate `test:scale` memeriksa target tinggi, urutan, rasio, wildlife, dan budget aset.

## 2u. Reachable Progression & Mobile UX (v0.15.4)

- [x] Stage 4/5/6 tidak lagi terkunci oleh early return di `computeStage()`; stage 6 terbukti reachable.
- [x] Off-by-one `LEVEL_XP` diperbaiki; 260 XP sekarang benar-benar membuka level 6.
- [x] Semua tombol yang terlihat minimal 48×48 dp di 360×640, 390×844, dan 844×390.
- [x] Objective strip menampilkan stage, tujuan berikutnya, dan progres misi tanpa scroll.
- [x] Siklus musim seluruh planet dipangkas menjadi 106–120 tick (≈3,5–4 menit) dengan proporsi relatif terjaga.
- [x] Badai selalu diikuti 2 tick cerah sebagai recovery beat.
- [x] Telemetri lokal menambah `session_start`, `session_end`, `objective_shown`, `stage_reached`, `level_reached`, `season_change`, dan `planet_switch`.
- [x] `test:layout` masuk ke `npm test` sebagai gate 48 dp + objective strip + tanpa horizontal overflow.
- [x] Gate determinisme 50 seed × 9 planet masuk ke `test:sim`.
- [x] Gate saat itu lolos: sim, art scale, smoke, device, menu, layout. Angka app chunk terbaru ada di §2z (65,43 kB / gzip 21,47 kB).

## 2v. Device QA Load Harness (v0.15.5)

- [x] Parameter `?qa=1&qaObjects=N` menanam hingga 96 objek sebelum QaProbe mulai mengukur.
- [x] Objek mengikuti urutan `OBJECT_ORDER` dan sebaran spiral deterministik, tanpa mengubah sim atau gameplay normal.
- [x] Dipakai pada QA v0.15.5 untuk beban 25+ objek di Android nyata (terukur 94 objek); ini baseline pra-v0.15.6 dan wajib diulang (§2w/§2y/§2z).

## 2w. Planet Shape Fix (v0.15.6)

- [x] Terrain dinormalisasi sekali di render boundary; data sim, DNA, dan save tidak berubah.
- [x] Radius render semua planet berada pada rentang 0,85–1,15 dengan tidak ada nilai negatif.
- [x] Prop, satwa, dan efek placement memakai terrain yang sama dengan mesh planet.
- [x] Gate `test:terrain` mengunci normalisasi, rentang radius, dan determinisme untuk 9 planet + default.
- [ ] Ulang QA perangkat karena skala kontak prop berubah setelah perbaikan bentuk.

## 2x. Menu & Tutorial (v0.15.7)

- [x] Menu utama direka ulang sebagai panel observatorium dua kolom dengan planet pilihan yang mengikuti palet tiap bioma.
- [x] Pemilih planet menampilkan 9 planet yang sudah ada dan langsung memuat planet yang dipilih tanpa menambah konten baru.
- [x] Deeplink QA (`debug`, `qa`, `planet`, `menu=0`) tetap melewati menu.
- [x] Modal “Cara pakai UI” berisi 4 langkah dan peta layar; dibuka dari menu dan bisa ditutup dengan Escape.
- [x] `test:menu` mengunci jumlah planet, status aktif, caption, perpindahan planet, panduan, dan layout desktop/mobile.

## 2y. Cuaca & Badai (v0.15.8)

- [x] Awan ellipsoid radius 0.045 planet dan orbit 1.08; tepi dalam awan badai tetap di atas permukaan.
- [x] Tetes hujan 0.03 (sekitar 2/3 tinggi pohon) dengan radius 0.0011; keping salju 0.003.
- [x] Presipitasi jatuh dari lapisan awan ke permukaan mengikuti arah radial, bukan menembus planet.
- [x] Badai memakai awan gelap, tetes lebih padat/cepat/miring; hujan biasa lebih renggang dan cerah hanya sebagian awan.
- [x] Badai lebih basah dari hujan (`rain` 0.85 vs 0.55) dan lebih gelap; recovery 2 tick cerah tetap utuh.
- [x] `test:scale` mengunci rasio cuaca terhadap pohon/planet; `test:sim` mengunci urutan logika badai > hujan.

## 2z. Faceted Diorama Polish (v0.15.9)

- [x] Geometry prop/spesies di-*de-index* menjadi satu merged mesh per tipe dengan warna per-facet; warna masih vertex color tanpa tekstur dan tanpa pass baru.
- [x] Facet bertambah bertahap: rumput, pasir, batu, bukit, gunung, pohon, semak, bunga, fauna, dan awan; rasio tinggi/footprint tidak berubah melewati toleransi 5%.
- [x] AO vertikal + bayangan kontak baked ditanam di geometry; bayangan tidak memakai transparansi, pass, atau draw call tambahan.
- [x] PlanetMesh memberi shade lereng halus tanpa mengubah normalisasi terrain; awan naik ke 10×6 segmen.
- [x] `test:scale` sekarang mengunci budget triangle per tipe, metrik sudut facet unik, tekstur nol, dan rasio cuaca.
- [x] QA deterministik memakai `?seed=N`; `test:qa-load` mengunci 94 objek, tier medium, seed 1, p95 ≤ 33,40 ms, dan budget draw call (≤18 cerah, ≤20 hujan/badai/salju).
- [x] App chunk 65,43 kB (gzip 21,47 kB) dan cache service worker `tpf-shell-v0-15-9`.
- [ ] QA perangkat nyata untuk bentuk planet, cuaca, landscape, dan PWA offline/update belum diulang.
- [x] Deploy produksi `main` @ `ea8f9b9` ke <https://tinyplanetfactory.netlify.app/>; remote `npm test` 8/8 PASS dan PWA check 200 + offline reload PASS.

## 2aa. Deterministic Asset Variants (v0.16.0)

- [x] 49 pilihan varian (39 prop + 10 fauna) dari 43 builder unik, tanpa GLB/GLTF/R3F dan tanpa tipe objek/DNA baru.
- [x] Resolver `createAssetResolvers(seed, planetId)` deterministik; satu geometri aktif per tipe dibangun lazy dan di-cache.
- [x] Bias visual 9 planet di-pin untuk varian kunci; sisanya hash `seed + planetId + type`.
- [x] `PropRenderer` / `WildlifeRenderer` menerima resolver; `GameScene.reseed(..., planetId)` mengganti varian saat reset/switch planet; `View3D` tidak di-destroy.
- [x] `test:scale` diperpanjang untuk semua varian: tinggi ±5%, budget triangle/facet, tekstur 0, spacing, wildlife = prop, dan determinisme 9 planet × 2 seed.
- [x] Hook QA `?debug=1` → `window.__game.variants()` (indices + labels); katalog di `docs/ASSET-CATALOG.md`.
- [x] App chunk 73,33 kB (gzip 23,96 kB) dan cache service worker `tpf-shell-v0-16-0`.
- [x] `npm test` lokal 8/8 PASS; draw call Hujan tetap 20, p95 headless 16,80 ms.
- [x] Deploy produksi `main` @ `e71e6c1` ke <https://tinyplanetfactory.netlify.app/>; bundle `index-Cl2SK4zO.js`; remote `npm test` 8/8 PASS; cache `tpf-shell-v0-16-0` dan offline reload PASS.
- [ ] QA perangkat nyata untuk v0.16.0 belum dijalankan; P0 Sprint 09 tetap OPEN.

Ringkasan status P0 pasca-v0.16.0:

| Gate | Status | Bukti / catatan |
|---|---|---|
| Build, 8 gate lokal, 8 gate remote | PASS | bundle `index-Cl2SK4zO.js`, cache `tpf-shell-v0-16-0` |
| Regresi determinisme/DNA/batching | PASS | tidak ada perubahan sim, schema, atau draw call |
| p95 device ≤ 33 ms | OPEN | baseline Itel S686LN 33,40 ms |
| PWA fisik install/offline/update | OPEN | baru lolos headless |
| Landscape, cold start 4G, context loss/restore | OPEN | wajib di perangkat nyata |

## 2ab. Campaign & Leveling (v0.17.0 — unreleased di `main`)

- [x] Kurva XP kuadratik `100+25(L-1)+5(L-1)^2`, 100 level, 10 era, ambang kumulatif 1.723.920 XP (masih `u32`).
- [x] Save/DNA lama dinormalisasi ke ambang level lama; `schemaVersion` tetap 3 dan tidak ada field DNA baru.
- [x] 100 main mission / 10 era / 6 tipe quest di `src/sim/campaignRules.ts`; teks target di `src/content/campaignCopy.ts`.
- [x] Misi 1–60 dievaluasi dari state sim yang ada; misi 61–100 locked, tidak memberi XP, dan tidak ditandai selesai (riwayat v0.17.0; aktif sejak v0.18.0).
- [x] DNA Points dan Bio Energy masih **derived**, bukan field tersimpan.
- [x] HUD menampilkan era, `Level x/100`, judul misi, dan progres; panel `?campaign=1` menampilkan 100 baris.
- [x] Hook QA `?debug=1` → `window.__game.campaign()`.
- [x] `npm test` lokal 8/8 PASS; `test:sim` memverifikasi rumus, era, 100 misi unik, migrasi, reward, dan misi terkunci.
- [x] Build lokal app chunk 75,00 kB (gzip 24,55 kB); cache SW `tpf-shell-v0-17-0`.
- [x] Chunk DNA digabung ke `planet-configs` untuk menghilangkan inisialisasi circular `dna ↔ planet-configs`.
- [ ] **Belum di-deploy.** Produksi tetap bundle v0.16.0 `index-Cl2SK4zO.js` / cache `tpf-shell-v0-16-0`.
- [ ] QA perangkat nyata v0.17.0 tidak dijalankan; P0 Sprint 09 tetap OPEN.

Status jujur: fitur campaign sudah ada di `main`, tetapi klaim produksi dan real-device masih mengacu ke v0.16.0.

## 2ac. Advanced Systems / Misi 61–100 (v0.18.0 — unreleased di `main`)

- [x] Misi 61–100 tidak lagi locked; `CAMPAIGN` tidak punya entri `locked: true`.
- [x] Era 7–10 memakai check nyata `civilization`, `industry`, `ai`, dan `cosmic` pada `src/sim/advanced.ts`.
- [x] Skor 0–100 dan tier 1–5 diturunkan dari state sim yang ada; tidak ada objek, planet, biome, atau field DNA baru. `schemaVersion` tetap 3.
- [x] Rumus: Peradaban = populasi + stabilitas + air + jaring makanan + level; Industri = energi + objek + populasi + level; AI = biodiversitas + agen + jaring makanan + stabilitas + level; Kosmik = tahap + energi + biodiversitas + level.
- [x] HUD menampilkan `Sistem <nama>: <skor>/100`; hook `window.__game.campaign()` menyertakan `systems.scores` dan `systems.tiers`.
- [x] Copy target 61–100 dan `docs/CAMPAIGN.md` menyebut skor turunan, bukan klaim manusia/alien literal.
- [x] `test:sim` memverifikasi 100/100 misi reachable, tidak ada `always` di level 61–100, skor terikat 0–100, tier 1–5, dan skor naik bersama level.
- [x] Build lokal app chunk 75,09 kB (gzip 24,59 kB); cache SW `tpf-shell-v0-18-0`.
- [x] PR #35 merge ke `main` @ `fa79f03`; issue #34 closed.
- [x] Preview `https://deploy-preview-35--tinyplanetfactory.netlify.app/` memakai bundle `index-9P4aUINi.js` / cache `tpf-shell-v0-18-0`; remote `npm test` 8/8 PASS (log `/tmp/opencode/npm-test-preview-35.log`).
- [ ] **Belum di-deploy.** Produksi tetap bundle v0.16.0 `index-Cl2SK4zO.js` / cache `tpf-shell-v0-16-0`.
- [ ] QA perangkat nyata v0.18.0 belum dijalankan; P0 Sprint 09 tetap OPEN.

Status jujur: 100 misi sekarang aktif di `main`, tetapi produksi dan real-device masih mengacu ke v0.16.0.

## 2ad. FTUE Hybrid & Tutorial In-Game (v0.19.0 — unreleased di `main`)

- [x] Modal **Cara pakai UI** tetap dipakai sebagai referensi manual, dengan tombol **Ulangi panduan**.
- [x] FTUE otomatis 3 langkah untuk save baru: tanam objek pertama, putar/zoom sambil menunggu 10 tick, lalu selesaikan misi pertama; progres panduan bisa dilanjutkan setelah reload.
- [x] Instruksi memakai elemen `#objective-strip` yang sudah ada; tidak menambah panel, modal blocking, atau tinggi strip beyond baseline.
- [x] Fokus ditandai dengan outline mint; animasi dihentikan bila `prefers-reduced-motion`.
- [x] Tips one-shot: cuaca pertama, agen pertama, unlock level 2, era lanjutan level 61, dan DNA pertama.
- [x] Status tutorial di `localStorage['tpf.tutorial.v1']`, terpisah dari DNA; `schemaVersion` tetap 3.
- [x] Hook QA `?tutorial=0|1` dan `window.__game.tutorial()`; mode `debug`/`qa`/`campaign`/`planet`/`menu=0` tidak menjalankan FTUE kecuali `tutorial=1`.
- [x] `test:smoke` memverifikasi FTUE mulai, maju saat placement, selesai setelah misi/level, dan objective kembali normal.
- [x] `test:menu` memverifikasi tombol **Ulangi panduan** dan `test:layout` memverifikasi objective tetap `53/53/48 px` dalam mode tutorial.
- [x] Build lokal app chunk 79,07 kB (gzip 25,88 kB); cache SW `tpf-shell-v0-19-0`.
- [x] PR #37 merge ke `main` @ `b540786`; issue #36 closed.
- [x] Preview `https://deploy-preview-37--tinyplanetfactory.netlify.app/` memakai bundle `index-Dm3TBpoL.js` / cache `tpf-shell-v0-19-0`; remote `npm test` 8/8 PASS (log `/tmp/opencode/npm-test-preview-37.log`).
- [ ] **Belum di-deploy.** Produksi tetap bundle v0.16.0 `index-Cl2SK4zO.js` / cache `tpf-shell-v0-16-0`.
- [ ] QA perangkat nyata v0.19.0 belum dijalankan; P0 Sprint 09 tetap OPEN.

Status jujur: tutorial berjalan di `main`, tetapi produksi dan real-device masih mengacu ke v0.16.0.

## 2ae. QA Device Enablement (v0.20.0 — unreleased di `main`)

- [x] Laporan QA menyertakan `appVersion`, snapshot save, status jaringan/visibilitas, orientasi, geometri layout, `scriptSrc`, dan SW controller/script URL.
- [x] Geometri layout membuktikan area planet tengah masih `CANVAS` dan panel tidak saling menimpa pada landscape.
- [x] `docs/QA-DEVICE.md` memuat runbook 4 sesi untuk #5–#8, termasuk airplane mode, update PWA, dan context loss nyata.
- [x] Validator manual `npm run qa:evidence -- <file> [--offline] [--standalone] [--landscape]` tidak masuk `npm test` dan tidak menutup issue otomatis.
- [x] `npm test` lokal tetap 8/8 PASS; gate tidak ditambah.
- [x] Build lokal app chunk 80,49 kB (gzip 26,41 kB); cache SW `tpf-shell-v0-20-0`.
- [x] PR #39 merge ke `main` @ `d51f3a6`; issue #38 closed.
- [x] Preview `https://deploy-preview-39--tinyplanetfactory.netlify.app/` memakai bundle `index-Btwodwou.js` / cache `tpf-shell-v0-20-0`; remote `npm test` 8/8 PASS (log `/tmp/opencode/npm-test-preview-39.log`).
- [ ] **Belum di-deploy.** Produksi tetap bundle v0.16.0 `index-Cl2SK4zO.js` / cache `tpf-shell-v0-16-0`.
- [ ] Issue #5–#8 tetap OPEN sampai laporan + screenshot perangkat nyata dilampirkan.

Status jujur: instrumentasi dan runbook sudah siap, tetapi tidak ada klaim QA fisik baru.

## 2af. Sinkronisasi Habitat & Mekanik Planet (v0.21.0 — unreleased di `main`)

| Planet | Spesies | Siklus musim | Hazard sinkron |
|---|---:|---:|---|
| Terra | 12 | 119 tick | ya (legacy climate sengaja dipertahankan) |
| Dune | 12 | 120 tick | ya (alias badai-pasir/kekeringan-ekstrem) |
| Glaciera | 12 | 120 tick | ya (alias badai-salju/gelombang-dingin-ekstrem) |
| Inferna | 12 | 106 tick | ya |
| Aquaria | 12 | 120 tick | ya |
| Mycelia | 11 | 120 tick | ya (alias gangguan-jaringan-miselium) |
| Sakura | 11 | 120 tick | ya |
| Aurelia | 11 | 120 tick | ya |
| Cosmos | 10 | 110 tick | ya |

- [x] `climate.hazards` tidak lagi metadata mati: resolver label generik dinormalisasi ke hazard yang dideklarasikan tiap planet (`badai-pasir`, `badai-salju`, `gelombang-dingin-ekstrem`, `kekeringan-ekstrem`, `gangguan-jaringan-miselium`, dll.).
- [x] `test:sim` membuktikan setiap hazard yang benar-benar dipakai `habitatContextFor()` masih terdaftar di `climate.hazards` planet bersangkutan.
- [x] 100 copy misi kini menyebut angka dan kata kunci yang sama dengan `MissionCheck`; klaim “spesies jamur/reptil” ditandai sebagai proxy, bukan mechanic baru.
- [x] `test:sim` menolak copy yang angkanya tidak cocok atau kata kunci mechanic-nya meleset; gate tetap 8 buah.
- [x] Perilaku reward saat XP pasif melompat level didokumentasikan di `docs/CAMPAIGN.md` dan diverifikasi `test:sim`: misi yang terlewat tidak dibayar mundur, misi aktif di level tujuan tetap memberi reward.
- [x] Tidak ada planet, biome, objek, unlock, field DNA, atau `schemaVersion` baru.
- [x] Build lokal app chunk 80,49 kB (gzip 26,42 kB); cache SW `tpf-shell-v0-21-0`.
- [x] Paket ukur ulang p95 v0.21.0 tersedia di `docs/QA-P95-REMEASURE.md` memakai preview #41; target #7 tetap ≤ 33 ms dan baseline lama 33,40 ms tidak dipakai sebagai kriteria lulus.
- [x] Gate headless `test:qa-load` dan `qa:evidence` kini memakai batas p95 yang sama, ≤ 33 ms; baseline device historis tidak ditulis ulang.
- [x] `npm run qa:evidence:batch -- <folder>` memvalidasi banyak `report-*.json` dengan flag otomatis; bukan gate tambahan.
- [x] Flag opsional `--expect-version` dan `--expect-bundle` tersedia di `qa:evidence` dan `qa:evidence:batch` untuk menolak laporan dari build lain.
- [x] `docs/QA-ISSUE-PLAYBOOK.md` memetakan bukti dan urutan penutupan #5, #6, dan #8; #7 tetap memakai paket khusus.
- [ ] **Belum di-deploy.** Produksi tetap bundle v0.16.0 `index-Cl2SK4zO.js` / cache `tpf-shell-v0-16-0`.
- [ ] Issue #5–#8 tetap OPEN; perubahan ini tidak menutup QA perangkat nyata.

Status jujur: audit sinkronisasi menyentuh data/config dan copy, bukan menambah sistem ekologis baru.

## 3. QA perangkat nyata

Jalankan seluruh baris di `docs/QA-DEVICE.md`, minimal untuk:

- [ ] Android menengah: p50 frame time ≤ 33,3 ms (≈30 FPS) dan `fps ≥ 30`, p95 ≤ 33 ms selama total 5 menit (2 run `qaSeconds=180`).
- [ ] Cold start < 5 s pada 4G.
- [ ] Pinch zoom, drag 360°, dan long-press berfungsi dengan jari.
- [ ] Context loss/restore: background 30 s → kembali → render lanjut tanpa crash.
- [ ] Install PWA → airplane mode → buka → save terbaca → bisa menanam objek.
- [ ] Update PWA: prompt muncul, save IndexedDB tetap utuh.
- [ ] Portrait/landscape tidak menutupi planet.

Untuk QA deterministik: buka `?debug=1&qa=1&qaSeconds=45&seed=1&qaObjects=94&quality=medium` di perangkat. Panel hasil QA akan muncul dan tombol **Salin hasil QA** menghasilkan JSON berisi p50/p95, boot time, quality tier, device info, status PWA, serta jumlah agen/spesies fauna.

Catatan 2026-11-21: lima run QA nyata di **Itel S686LN / Android 15**, termasuk tiga run dengan **94 objek** dan durasi hingga **180 s**, menghasilkan p50 **16,90–33,20 ms**, p95 **33,40 ms**, FPS **30,1–59,2**, draw call **6–18**, boot **0,24–2,03 s**, tier medium tanpa downgrade, service worker aktif, dan tidak ada context loss. p95 33,40 ms menggagalkan baris #2 (frame budget); baris #1 (cold start 4G dari ikon) belum pernah diukur. Keduanya tetap OPEN. Rincian ada di `docs/QA-DEVICE.md`.

## 4. Telemetri

- [ ] Telemetri **mati secara default**.
- [ ] Tombol **Telemetri** membuka modal dengan penjelasan bahwa data tidak dikirim ke server.
- [ ] Saat diaktifkan, peristiwa tercatat di localStorage (`tpf.telemetry.v1`).
- [ ] **Salin data** menghasilkan JSON; **Hapus data** mengosongkan event tetapi tidak menghapus save game.
- [ ] Tidak ada data pribadi/IP/nama perangkat yang dikirim atau disimpan telemetri. Lihat `docs/KPI.md`.

## 5. Rollback & monitoring

- [ ] Simpan artefak `dist/` dari build sebelumnya.
- [ ] Catat commit/tag build di release notes.
- [ ] Service worker versi lama masih bisa melayani app shell bila update gagal.
- [ ] Jika crash pasca-update: matikan service worker lama lewat mekanisme hosting/CDN, lalu deploy ulang artefak sebelumnya.
- [ ] Untuk v0.21.0, rollback berarti kembali ke produksi v0.16.0 (`e71e6c1`, `index-Cl2SK4zO.js`, `tpf-shell-v0-16-0`), bukan ke preview #41. Detail ada di `docs/PRODUCT-TO-PRODUCTION.md` §11a.

## 6. Publish

Produksi saat ini sudah stabil di Netlify (auto-deploy dari `main`, <https://tinyplanetfactory.netlify.app/>). Alur rilis normal ada di `docs/PRODUCT-TO-PRODUCTION.md` §11.

Fallback deploy cepat tanpa akun:

1. Buka `https://app.netlify.com/drop`.
2. Tarik folder `dist/` (atau ekstrak `tiny-planet-factory-dist.zip`) ke halaman tersebut.
3. Netlify akan memberi URL HTTPS acak, misalnya `https://random-name.netlify.app`.
4. Buka URL tersebut di Android dan jalankan `?debug=1&qa=1&qaSeconds=45&seed=1&qaObjects=94&quality=medium`.

Cloudflare Pages / Vercel / hosting sendiri hanya alternatif fallback. Pastikan HTTPS dan `sw.js` berada di scope root.

- [ ] Upload `dist/` ke host HTTPS.
- [ ] Verifikasi `https://<host>/manifest.webmanifest` dan `https://<host>/sw.js` mengembalikan 200.
- [ ] Buka URL produksi di desktop + Android, cek install prompt.
- [ ] Lakukan satu transaksi penuh: tanam objek → tunggu save → reload → objek kembali.
- [ ] Tandai rilis selesai.
