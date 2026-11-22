# Product → Production Pipeline — Tiny Planet Factory

> **Status:** living document  
> **Versi produk terkait:** `v0.17.0` (`main`, unreleased) · produksi `v0.16.0`  
> **Terakhir diverifikasi:** 2026-11-22  
> **Production:** <https://tinyplanetfactory.netlify.app/>  
> **Commit rilis v0.15.9:** `ea8f9b9`  
> **Commit rilis v0.16.0:** `e71e6c1`  
> **Commit dokumentasi QA v0.15.9:** `0c6b658`  
> **Commit docs pipeline & sprint:** `421c8d6`

Dokumen ini adalah satu jalur resmi dari ide/product backlog sampai rilis produksi. Ia tidak menggantikan doc fitur yang sudah ada, tetapi menyatukan gate, artefak, dan aturan keputusan agar setiap perubahan bisa dilacak dari product requirement ke bukti produksi.

---

## 1. Tujuan & scope

### Tujuan

- Menjadi **source of truth untuk proses**, bukan source of truth untuk detail implementasi.
- Memastikan setiap fitur yang masuk produksi memiliki:
  - requirement yang jelas,
  - desain/arsitektur yang sesuai batas performa,
  - test gate yang dijalankan,
  - bukti QA lokal dan remote,
  - catatan rilis dan status KPI.
- Mencegah klaim “production ready” sebelum checklist perangkat nyata selesai.

### Scope

Termasuk:

- product brief & backlog,
- perencanaan fitur,
- implementasi di `src/`,
- gate otomatis di `scripts/`,
- QA manual/perangkat,
- versioning, deploy, monitoring, rollback.

Tidak termasuk:

- implementasi fitur baru di dalam dokumen ini,
- penggantian arsitektur render,
- penambahan planet baru sebelum QA ditutup,
- klaim keberhasilan PWA fisik tanpa verifikasi di perangkat nyata.

---

## 2. Peta sumber kebenaran

Repo ini belum memiliki file `PRD.md` tunggal. Yang dipakai sebagai product requirement dan backlog adalah kumpulan dokumen berikut.

| Peran | Sumber resmi | Catatan |
|---|---|---|
| Product brief + inventory fitur | `README.md` → “Yang sudah ada” | Ringkasan kemampuan vertical slice |
| Product roadmap/backlog | `README.md` → “Roadmap pasca-MVP”, “Langkah berikutnya” | Prioritas fitur dan phase rilis |
| Fondasi data/ekosistem | `docs/ECOSYSTEM-DATA-FOUNDATION.md`, `docs/TERRA-CORE.md`, `docs/FOOD-WEB-WILDLIFE-AI.md` | Schema, populasi, food web |
| Spesifikasi biome | `docs/TERRA-CORE.md` dan 8 doc biome lainnya | Satu doc per planet |
| Standar visual | `docs/ART-DIRECTION.md`, `docs/VISUAL-AUDIT-2026-11-20.md` | Shape language, palet, budget |
| KPI & telemetri | `docs/KPI.md` | Event, target, privasi |
| Riwayat rilis & gate | `docs/RELEASE.md` | Ledger rilis v0.15.x |
| QA perangkat | `docs/QA-DEVICE.md` | Checklist device nyata dan baseline |
| Sprint plan & eksekusi | `docs/SPRINT.md` | Backlog aktif, kapasitas, dan status closure |
| Reality check kode | `src/`, `scripts/`, `package.json`, `public/sw.js` | Menangkal dokumentasi yang tertinggal |

### Urutan resolusi konflik

Jika dua sumber bertentangan, pakai urutan ini:

1. **Kode + gate test yang dijalankan** — misalnya `test:scale`, `test:qa-load`.
2. **Laporan QA terbaru** di `docs/QA-DEVICE.md` / `docs/RELEASE.md`.
3. **Spesifikasi fitur/detail** di doc biome atau doc modul.
4. **Art direction**.
5. **README/roadmap lama**.

Setiap konflik yang ditemukan harus dicatat di bagian **Known documentation drift** dokumen ini, lalu diperbaiki di source doc terkait pada commit berikutnya.

---

## 3. Status produk saat ini

### 3.1 Ringkasan fitur aktif

- Vertical slice 3–5 menit: batu tandus → planet berair dan hijau.
- Planet icosphere seeded dengan displacement, normal, dan warna vertex dinamis.
- **Nine Worlds lengkap**: Terra, Dune, Glaciera, Inferna, Aquaria, Mycelia, Sakura, Aurelia, Cosmos.
- 13 objek: rumput, pasir, batu, bukit, gunung, laut, danau, pohon, semak, bunga, kijang, rubah, burung.
- 5 agen fauna visual: kijang, rubah, burung, ikan, serangga.
- Registry 103 spesies ekologis; subset dipakai pada simulasi populasi dan habitat.
- Simulasi deterministik murni TypeScript: suhu, air, kelembapan, oksigen, kesuburan, biodiversitas, energi, stabilitas, vegetasi, cuaca, XP/level, tahap evolusi, `TICK_MS = 2000`.
- Tidak ada `Math.random()` di runtime sim; rng berasal dari `seed + tick`.
- 4 cuaca: cerah, hujan, salju, badai.
- Misi **Hijaukan Planet**, 3 event opsional, indikator ekosistem/cuaca/fauna.
- Planet DNA: kode pendek `TPF-XXXX-XXXX-XXXX`, kode lengkap Crockford base32 + CRC16, pratinjau, duplikat, remix, Web Share; DNA base64 v1 masih bisa dibaca.
- Save/load otomatis IndexedDB dengan fallback memori; migrasi `schemaVersion: 3`.
- `eventLog` deterministik: `planet.created`, `object.placed`, `clock.tick`.
- Menu observatorium dengan pemilih 9 planet dan modal tutorial 4 langkah.
- UI DOM overlay di atas canvas PixiJS; portrait/landscape responsif.
- Quality tier `low`/`medium`/`high` dengan adaptive downgrade saat p95 > 34 ms.
- PWA: manifest, ikon, service worker cache-first/stale-while-revalidate, fallback offline, update prompt.
- Telemetri **opt-in**, local-only, tanpa server.
- Hook QA: `?debug=1`, `?perf=1`, `?qa=1`, `?qaObjects=N`, `?eco=1`, `?campaign=1`, `?planet=...`, `?menu=0`, `?seed=N`, `window.__game`.
- Low-poly v0.15.9: satu merged geometry per tipe, vertex colors, AO per-facet, bayangan kontak baked, facet bertahap, warna lereng, awan 10×6.
- Asset variants v0.16.0: 49 pilihan / 43 builder unik, resolver `seed + planetId`, bias visual 9 planet, satu geometri aktif per tipe, tanpa perubahan sim/DNA/schema. Katalog: `docs/ASSET-CATALOG.md`.
- Campaign v0.17.0: 100 level / 10 era, 100 main mission, 6 tipe quest, kurva XP kuadratik, HUD campaign, hook `?campaign=1`, dan `window.__game.campaign()`. DNA Points/Bio Energy masih derived; misi 61–100 locked. Katalog: `docs/CAMPAIGN.md`.

### 3.2 Backlog terbuka

| Prioritas | Item | Status |
|---|---|---|
| P0 | QA Android nyata: p50/p95, cold start 4G, pinch jari, context loss/restore | **Open** |
| P0 | PWA fisik: install → airplane mode → boot/save/place → update | **Open** |
| P0 | Landscape Android: panel tidak menutup planet | **Open** |
| P0 | Verifikasi visual real-device untuk shape fix v0.15.6 dan weather v0.15.8 | **Open** |
| P0 | Tutup gap p95: baseline device `33,40 ms`, target `33 ms` | **Open** |
| P0 | Verifikasi visual real-device + konfirmasi screenshot before/after v0.15.9 oleh manusia | **Open** |
| P2 | Cloud save / gallery / social via Supabase | **Deferred** |
| P2 | Planet baru | **Ditahan sampai QA ditutup** |
| P2 | Katalog referensi 1.000 aset aktif + wind sway | **Deferred** |

Aturan backlog: **tidak ada planet atau biome baru sebelum checklist P0 selesai.** Eksekusi dan status terkini tercatat di `docs/SPRINT.md`.

---

## 4. Definition of Ready

Sebuah item masuk pipeline hanya jika:

- [ ] Dinyatakan sebagai perilaku pemain, bukan hanya solusi teknis.
- [ ] Terhubung ke KPI/event telemetri bila relevan. Tidak ada angka dashboard hardcode.
- [ ] Punya acceptance criteria yang bisa diuji.
- [ ] Punya estimasi dampak: sim / render / UI / content / PWA.
- [ ] Punya budget awal: draw call, triangle, app chunk, determinisme.
- [ ] Untuk perubahan visual: ada rencana screenshot before/after pada seed yang sama.
- [ ] Tidak melanggar keputusan arsitektur di bagian 6.
- [ ] Untuk fitur besar: ada doc pendukung di `docs/` atau update doc yang sudah ada.

---

## 5. Definition of Done

Sebuah item dinyatakan selesai jika semua berikut terpenuhi.

### Umum

- [ ] Kode dibangun dengan `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.
- [ ] `npm test` lokal lulus **8/8 gate**.
- [ ] Remote test di produksi lulus **8/8 gate**.
- [ ] Perubahan UI berbahasa Indonesia.
- [ ] Tidak ada error aplikasi baru di konsol.
- [ ] Commit mengikuti konvensi bagian 8.
- [ ] Doc terkait diperbarui: minimal `README.md`, `docs/RELEASE.md`; tambahkan `docs/QA-DEVICE.md`, `docs/KPI.md`, atau `docs/ART-DIRECTION.md` bila relevan.

### Sim & data

- [ ] `src/sim/` tetap renderer-agnostic.
- [ ] Deterministik untuk seed yang sama.
- [ ] Save lama tetap bisa dimigrasikan.
- [ ] DNA round-trip tetap lolos.
- [ ] `schemaVersion` hanya berubah lewat keputusan eksplisit dan gate migrasi.

### Render & visual

- [ ] Satu merged geometry per prop/species type.
- [ ] Vertex colors, tanpa tekstur.
- [ ] Batching tidak berubah.
- [ ] Draw call tidak naik tanpa alasan terukur.
- [ ] Screenshot before/after pada seed/kamera/resolusi sama.
- [ ] `test:scale` dan `test:terrain` tetap lulus.

### QA & rilis

- [ ] `test:qa-load` lolos dengan seed deterministik.
- [ ] QA report/local dan remote disimpan atau dicatat.
- [ ] Versi dan cache SW dinaikkan.
- [ ] Deploy diverifikasi lewat hash bundle, bukan hanya asumsi auto-deploy.
- [ ] Status device nyata dicatat jujur: lulus, gagal, atau belum diuji.

---

## 6. Guardrails arsitektur & desain

Ini bukan preferensi; ini batas produksi.

| Area | Aturan |
|---|---|
| Sim | `sim/` tidak import `@pixi/3d`, tidak memakai `Math.random()` saat runtime |
| Renderer | PixiJS `8.23.0` + `@pixi/3d` `0.1.0`; tidak ada migrasi Three.js |
| Batching | Satu `BatchedMesh3D` per tipe; tidak menambah material/pass baru |
| Geometry | Composite low-poly di-merge jadi satu geometry per tipe; vertex colors linear; tanpa tekstur |
| Ground contact | `minY = 0` lokal; renderer hanya menambah `baseLift` |
| View lifecycle | `View3D` tidak di-destroy saat reset/new planet/DNA |
| UI | DOM overlay di atas canvas; tidak world-space text |
| Bahasa | Semua copy UI/misi Bahasa Indonesia |
| Aksesibilitas | Target sentuh aktif **48 dp** (menggantikan angka lama 36 px) |
| Performa | Target Android menengah 30 FPS, desktop 60 FPS, boot < 5 s |
| Budget | App chunk < 100 kB; draw call ≤18 saat Cerah, ≤20 saat Hujan/Badai/Salju |
| Offline | PWA installable/offline-capable; klaim hanya setelah verifikasi |
| Telemetri | Opt-in, local-only, tidak dikirim ke server |

### Prioritas visual

`silhouette > readability > spacing`

Artinya: jika ada konflik, perbesar/perjelas bentuk dulu sebelum merapikan jarak. Jangan mengorbankan siluet demi detail kecil yang hilang di layar 390 px.

### Scale philosophy

Pakai **rasio seimbang sesuai logika diorama**, bukan skala Bumi literal. Fauna punya visibility floor agar tetap terbaca. Lihat keputusan di `docs/ART-DIRECTION.md`, `docs/RELEASE.md` v0.15.3 dan v0.15.9.

---

## 7. Pipeline stages

| Stage | Entry | Aktivitas | Exit | Artefak |
|---|---|---|---|---|
| 1. Discover | Masukan user/issue/KPI | Riset perilaku, cek KPI, cek backlog | Requirement jelas | Feature brief |
| 2. Product review | Feature brief | Prioritas, dampak, keputusan fitur | Masuk backlog atau ditolak | Backlog entry |
| 3. Design | DoR terpenuhi | UI sketch, acceptance criteria, budget | Spesifikasi disetujui | Tech/design note |
| 4. Implement | Spec siap | Kode `sim`/`render`/`ui`/`content` | Build lokal lolos | Commit feature |
| 5. Automated verify | Build lolos | 8 gate `npm test`, screenshot, layout audit | Semua PASS | Test log |
| 6. QA verify | Automated PASS | QA deterministik, device checklist, visual review | QA sign-off atau blocker | QA report |
| 7. RC | QA sign-off | Version bump, release note, SW cache | RC siap deploy | RC commit |
| 8. Deploy | RC di `main` | Netlify auto-deploy, hash check, remote test | Produksi terverifikasi | Deploy log |
| 9. Operate | Produksi aktif | KPI, telemetri, QA report, isu baru | Loop ke stage 1 | Monitoring note |
| 10. Rollback | Insiden | Aktifkan prosedur bagian 13 | Produksi stabil | Postmortem |

**Gate keras:** stage 6 tidak boleh dianggap lulus hanya dari headless. Checklist device nyata tetap wajib.

---

## 8. Commit & versioning convention

### Commit

Gunakan format:

```text
<type>: <ringkasan pendek>
```

Type yang dipakai:

- `feat:` fitur baru
- `fix:` perbaikan bug
- `perf:` perubahan performa terukur
- `refactor:` perubahan struktur tanpa perilaku baru
- `docs:` dokumentasi
- `test:` gate/test
- `chore:` dependency/build/tooling

Contoh:

```text
v0.15.9: faceted diorama polish
docs: record v0.15.9 remote QA
v0.16.0: deterministic asset variants (49 pilihan / 43 builder)
v0.17.0: campaign 100 level / 10 era (unreleased on main)
v0.18.0: misi 61-100 aktif lewat skor sistem lanjutan (unreleased on main)
v0.19.0: FTUE hybrid + tips in-game (unreleased on main)
v0.20.0: QA device evidence pack (unreleased on main)
v0.21.0: planet mechanic/copy sync audit (unreleased on main)
```

### Versioning

Semver ringan:

- patch: fix, polish, gate, doc rilis
- minor: fitur besar/phase baru
- major: perubahan schema atau kontrak yang memaksa migrasi pengguna

Sebelum rilis, samakan:

- `package.json` → `version`
- `package-lock.json` → `version`
- `public/sw.js` → `tpf-shell-vX-Y-Z`
- `README.md` → tabel versi
- `docs/RELEASE.md` → bagian rilis baru
- `docs/QA-DEVICE.md` → hasil QA terbaru

---

## 9. Test & QA gates

### 9.1 Gate lokal

```bash
PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright npm test
```

Delapan gate yang dijalankan:

| Gate | Script | Yang dikunci |
|---|---|---|
| Sim | `test:sim` | determinisme, misi, DNA, fauna, migrasi, replay |
| Scale | `test:scale` | triangle per tipe, facet unik, tekstur nol, rasio cuaca |
| Terrain | `test:terrain` | normalisasi render, radius, idempoten, 9 planet |
| Smoke | `test:smoke` | vertical slice browser, WebGL2, UI, persistensi |
| Device | `test:device` | mobile emulasi, quality, pinch sintetis, context loss |
| QA load | `test:qa-load` | 94 objek, seed 1, p95 ≤33 ms, draw call budget |
| Menu | `test:menu` | 9 planet, switching, tutorial, layout |
| Layout | `test:layout` | bounding box UI 390×844 dan 1280×800 |

Gate tambahan:

```bash
npm run capture:visual -- /tmp/opencode/after.png 1337
npm run audit:layout
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### 9.2 Gate remote

```bash
URL=https://tinyplanetfactory.netlify.app/ \
PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright \
npm test
```

Verifikasi tambahan:

- `curl -I https://tinyplanetfactory.netlify.app/` → 200
- `curl -I https://tinyplanetfactory.netlify.app/manifest.webmanifest` → 200
- `curl -I https://tinyplanetfactory.netlify.app/sw.js` → 200
- `sw.js` mengandung cache versi rilis
- offline reload menampilkan canvas + menu

### 9.3 QA deterministik

`test:qa-load` memakai:

```text
?debug=1&qa=1&qaObjects=94&qaSeconds=12&quality=medium&seed=1
```

Lalu memajukan 16 tick agar cuaca Hujan aktif. Ini memastikan gate selalu menguji jalur atmosfer dua batch, bukan hanya frame cerah.

Target gate:

- p50 ≈ 16,7 ms pada headless
- p95 ≤ 33 ms
- 94 objek
- tier medium tanpa downgrade
- draw call ≤20 saat Hujan/Badai/Salju, ≤18 saat Cerah

### 9.4 QA perangkat nyata

Wajib sebelum status produksi ditutup:

1. Android menengah: p50 frame time ≤33,3 ms (≈30 FPS), `fps ≥30`, p95 ≤33 ms selama 5 menit (2 run `qaSeconds=180`).
2. Cold start <5 s dari ikon PWA pada 4G.
3. Pinch zoom dan drag 360° dengan jari.
4. Background 30 s → kembali → render lanjut tanpa crash.
5. Install PWA → airplane mode → buka → save terbaca → bisa menanam objek.
6. Update PWA → prompt muncul → save IndexedDB utuh.
7. Portrait/landscape tidak menutup planet.
8. Tidak ada error aplikasi; error shader saat context loss dicatat terpisah.

Parameter QA yang tersedia:

| Param | Fungsi |
|---|---|
| `debug=1` | membuka `window.__game` |
| `perf=1` | overlay FPS/p50/p95/draw call |
| `qa=1&qaSeconds=N` | probe performa, maks 180 s |
| `qaObjects=N` | menanam hingga 96 objek sebelum probe |
| `quality=low\|medium\|high` | mengunci tier awal |
| `eco=1` | panel diagnostik ekosistem |
| `planet=id` | memilih planet, menu dilewati |
| `menu=0` | melewati menu |
| `seed=N` | seed deterministik untuk QA |

### 9.5 Hook `window.__game`

Hook yang dipakai QA:

```text
state(), eco(), cryo(), volcano(), ocean(), fungal(), sky(), forest()
foodWeb(), ecoScore(id), metrics(), qaReport(), telemetry()
camera(), orbitDebug(), gl(), loseContext(), restoreContext()
setQuality(tier), menuOpen(), openMenu(), closeMenu()
tick(count), place(type, dir), placement(), select(type)
reset(seed), setPlanet(id, seed?), dna(), previewDna(code)
commitDna(code), restoreDna(), wildlife()
```

Invalid `?planet=` atau `setPlanet(id)` jatuh ke `terra`.

---

## 10. Performance & budget gate

| Metrik | Target | Status terkini |
|---|---|---|
| Android p50 | ≥30 FPS | Device baseline 30,1–59,2 FPS |
| Android p95 | ≤33 ms | Device baseline 33,40 ms — **belum lulus** |
| Headless p95 | ≤33 ms | 16,80 ms pada `test:qa-load` |
| Desktop | 60 FPS | Terpenuhi pada headless |
| Boot | <5 s | QA boot 0,24–2,03 s device; bukan cold-start 4G penuh |
| App chunk | <100 kB | 80,49 kB / gzip 26,42 kB |
| Draw call cerah | ≤18 | 15 pada emulasi `test:device`; 19 adalah baseline pra-facet; gate pasca-facet memakai ≤18 |
| Draw call hujan | ≤20 | 20, sama dengan baseline sebelum facet |
| Triangle per tipe | Gate `test:scale` | 34–276 triangle tergantung tipe |
| Adaptif | Turun bila p95 >34 ms / 120 frame | Tidak ada downgrade pada QA seed 1 |

Catatan: angka headless bukan pengganti angka device nyata.

---

## 11. Release procedure

1. Pastikan status P0 dicatat jujur. P0 OPEN bukan blocker untuk deploy RC, tetapi blocker untuk klaim `production-ready` (§18).
2. Tentukan versi baru dan samakan seluruh file versi.
3. Tulis bagian rilis baru di `docs/RELEASE.md`.
4. Perbarui `README.md` bila perlu:
   - tabel versi,
   - fitur aktif,
   - jumlah gate test,
   - angka chunk terbaru.
5. Perbarui `docs/QA-DEVICE.md` dengan hasil lokal/remote/device.
6. Perbarui `docs/KPI.md` jika event telemetri baru ditambahkan.
7. Perbarui `docs/ART-DIRECTION.md` jika standar visual berubah.
8. Build:

   ```bash
   NODE_OPTIONS=--max-old-space-size=4096 npm run build
   ```

9. Jalankan test lokal 8/8.
10. Commit dan push ke `main`.
11. Tunggu Netlify auto-deploy.
12. Verifikasi hash bundle di URL produksi, bukan hanya status 200.
13. Jalankan remote test 8/8.
14. Jalankan PWA check: manifest/sw 200, cache versi benar, offline reload berhasil.
15. Rebuild artefak:

    ```bash
    rm -f /root/GAMEDEV/tiny-planet-factory-dist.zip
    (cd dist && zip -qr /root/GAMEDEV/tiny-planet-factory-dist.zip .)
    ```

16. Tulis status akhir: lulus / gagal / belum diverifikasi device.

### 11a. Gate khusus v0.21.0

Rilis v0.21.0 **tidak boleh di-deploy ke produksi** sebelum issue #5–#8 benar-benar closed dengan laporan QA fisik dan screenshot/video asli. Ini mengikat lebih ketat daripada catatan umum di §11 bahwa P0 OPEN masih memperbolehkan RC: untuk v0.21.0, P0 OPEN adalah blocker deploy produksi.

Sebelum trigger Netlify produksi:

- [ ] #7 closed: minimal 3 run p95 v0.21.0 ≤ 33 ms dari `docs/QA-P95-REMEASURE.md`.
- [ ] #6 closed: install → airplane mode → save terbaca → place → update dengan save utuh.
- [ ] #8 closed: landscape `844×390` dan `layout.planetCenterVisible === true` tanpa overlap.
- [ ] #5 closed: cold start 4G, pinch/drag, context loss/restore nyata, dan konsol bersih.
- [ ] `package.json` = `0.21.0`; `public/sw.js` = `tpf-shell-v0-21-0`.
- [ ] Build lokal sesuai: app chunk `index-BiS1XGVG.js`, 80,49 kB / gzip 26,42 kB.

Sesaat setelah produksi berpindah:

- [ ] `curl -s https://tinyplanetfactory.netlify.app/ | grep -oE 'index-[A-Za-z0-9_-]+\.js'` → `index-BiS1XGVG.js`.
- [ ] `curl -s https://tinyplanetfactory.netlify.app/sw.js | grep -oE 'tpf-shell-v[0-9-]+'` → `tpf-shell-v0-21-0`.
- [ ] `URL=https://tinyplanetfactory.netlify.app/ PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright npm test` → 8/8 PASS.
- [ ] Manifest, `sw.js`, dan offline reload terverifikasi di produksi.
- [ ] `docs/RELEASE.md` dan `docs/SPRINT.md` diperbarui dari “unreleased” menjadi status deploy aktif beserta commit produksi.

Rollback v0.21.0 harus kembali ke artefak produksi v0.16.0:

| Item | v0.21.0 | Rollback |
|---|---|---|
| Commit | `ec8f251` atau commit produksi yang dipilih | `e71e6c1` |
| Bundle | `index-BiS1XGVG.js` | `index-Cl2SK4zO.js` |
| SW cache | `tpf-shell-v0-21-0` | `tpf-shell-v0-16-0` |
| Save/IndexedDB | kompatibel via migrasi `schemaVersion: 3` | tetap kompatibel |

Jangan menggunakan preview #41 sebagai rollback; rollback harus ke build produksi v0.16.0 yang sebelumnya terverifikasi.

---

## 12. KPI & feedback loop

Telemetri opt-in local-only dengan kunci `tpf.telemetry.v1`. Event utama:

- `boot`
- `placement`
- `mission_complete`
- `event_complete`
- `context_loss`
- `quality_downgrade`
- `qa_report`
- `dna_import`, `dna_preview`, `dna_duplicate`, `dna_remix`
- `species_discovered`, `species_extinct`

KPI turunan:

| KPI | Target |
|---|---|
| TTFF | <5 s pada 4G |
| Frame health | p95 ≤33 ms Android |
| Core-loop completion | ≥60% sesi aktif ≥3 menit selesai misi |
| Stability | 0 `context_loss` per 100 sesi |
| Adaptive rate | <30% sesi downgrade di Android menengah |
| Ecosystem depth | 5 spesies ditemukan sebelum misi, 0 kepunahan di sesi sehat |

Loop:

```text
telemetri/QA report → KPI review → backlog entry → feature brief → pipeline
```

---

## 13. Rollback & incident response

Jika crash/regresi pasca-deploy:

1. Tandai commit dan hash bundle yang bermasalah.
2. Matikan/nonaktifkan service worker versi baru lewat hosting/CDN bila perlu.
3. Deploy ulang artefak `dist/` commit sebelumnya.
4. Pastikan `sw.js` versi lama kembali aktif dan cache lama bisa melayani shell.
5. Verifikasi remote smoke + PWA check.
6. Tulis postmortem singkat di `docs/RELEASE.md`: gejala, sebab, dampak, perbaikan, pencegahan.

Rollback aman karena:

- service worker lama masih bisa melayani app shell,
- save berada di IndexedDB terpisah dari cache,
- DNA/save lama kompatibel lewat migrasi.

---

## 14. Known documentation drift

Tabel ini adalah **audit trail**. Seluruh nilai lama di bawah sudah disinkronkan ke doc sumber pada commit dokumentasi ini; kolom nilai kanan adalah fakta aktif yang dipakai pipeline.

| Sumber | Nilai lama | Nilai kanan (status) |
|---|---|---|
| `docs/ART-DIRECTION.md` | target sentuh ≥36 px | **48 dp** sejak v0.15.4 — resolved |
| `docs/ART-DIRECTION.md` | orbit awan ≈1,55 | **orbit 1,08**, radius 0,045 sejak v0.15.8 — resolved |
| `README.md` | app chunk ~56,2 kB | **65,43 kB / gzip 21,47 kB** sejak v0.15.9 — resolved |
| `README.md` | `npm test` 3 grup | **8 gate** sejak v0.15.9 — resolved |
| `README.md` | deploy HTTPS tertunda | **produksi aktif** di Netlify — resolved |
| `docs/RELEASE.md` checklist | target p95 ≤33 ms tanpa penjelasan | baseline 33,40 ms + alasan baris #1/#2 — resolved |
| `docs/QA-DEVICE.md` | hasil device v0.15.5 | ditandai baseline pra-v0.15.6; v0.15.9 headless lokal/remote dicatat terpisah — resolved |
| Doc biome v0.8–v0.14 | siklus 360 tick, planet data-only, tanpa UI selector | siklus aktual 106–120 tick, 9 planet aktif, selector di menu sejak v0.15.7 — resolved via addendum |
| Doc core v0.4–v0.6 | subset spesies, hook Terra-centric, `FoodWebManager`/`PopulationManager` | 103 spesies, hook planet aktif, `EcosystemManager` + `guilds.ts` — resolved via addendum |

---

## 15. Decision log

Keputusan yang mengikat pipeline:

| Keputusan | Alasan |
|---|---|
| Netlify sebagai host produksi; GitHub Pages ditunda | Deploy HTTPS aktif dan auto-deploy dari `main` |
| Nine Worlds lengkap; tidak tambah planet sebelum QA | QA P0 lebih penting daripada konten baru |
| Prioritas visual `silhouette > readability > spacing` | Layar mobile 390 px menyembunyikan detail kecil |
| Rasio diorama, bukan skala Bumi literal | Prop tetap terbaca dan proporsional |
| Satu renderer untuk semua planet | Config hanya mengubah data |
| DOM overlay, bukan PixiJS 2D | Aksesibilitas dan kecepatan implementasi |
| Telemetri opt-in local-only | Privasi; tidak ada server |
| Supabase cloud/gallery/social ditunda | Fokus ke QA dan stabilitas produksi |
| Tidak migrasi ke Three.js | Ekosistem PixiJS 3D sudah terintegrasi |
| Facet lowpoly bertahap +30–40% | Hindariregresi performa; batching unchanged |

---

## 16. Templates

### 16.1 Feature brief

```md
## Judul
<Nama fitur>

## Masalah pemain
<Perilaku yang ingin diubah>

## KPI yang didukung
<Event/target dari docs/KPI.md>

## Acceptance criteria
- [ ] ...
- [ ] ...

## Dampak
- Sim: <ya/tidak + detail>
- Render: ...
- UI: ...
- Content: ...
- PWA: ...

## Budget
- Draw call:
- Triangle:
- App chunk:
- Determinism:

## Doc yang perlu diubah
- README.md
- docs/RELEASE.md
- ...
```

### 16.2 PR checklist

```md
- [ ] DoR terpenuhi
- [ ] Build lokal lolos
- [ ] `npm test` 8/8 PASS
- [ ] Screenshot before/after ada untuk perubahan visual
- [ ] `test:qa-load` lolos
- [ ] Remote test 8/8 PASS
- [ ] Versi & SW cache diperbarui
- [ ] README/RELEASE/QA-DEVICE diperbarui
- [ ] Tidak ada klaim device nyata tanpa bukti
```

### 16.3 Release checklist

```md
- [ ] Versi: vX.Y.Z
- [ ] Cache SW: tpf-shell-vX-Y-Z
- [ ] Commit aplikasi: <hash>
- [ ] Build: PASS
- [ ] Local test: 8/8 PASS
- [ ] Remote test: 8/8 PASS
- [ ] PWA check: PASS
- [ ] QA device: PASS / OPEN / FAILED
- [ ] Artefak ZIP: <path>
- [ ] Catatan rilis: docs/RELEASE.md
```

### 16.4 QA report template

```md
Perangkat:
Build:
Seed:
Durasi:
Objek:
Tier:

p50:
p95:
FPS:
Draw call:
Boot:
Context lost:
Standalone:
Service worker:

Status:
- [ ] PASS
- [ ] OPEN
- [ ] FAILED

Catatan:
```

---

## 17. Command reference

```bash
# Development
npm install
npm run dev

# Build produksi
NODE_OPTIONS=--max-old-space-size=4096 npm run build
npm run preview

# Full test lokal
PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright npm test

# Full test remote
URL=https://tinyplanetfactory.netlify.app/ \
PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright \
npm test

# Gate individual
npm run test:sim
npm run test:scale
npm run test:terrain
npm run test:smoke
npm run test:device
npm run test:qa-load
npm run test:menu
npm run test:layout

# Visual & layout
npm run capture:visual -- /tmp/opencode/after.png 1337
npm run audit:layout

# QA cepat di browser
# ?qa=1&qaSeconds=45
# ?qa=1&qaObjects=94&qaSeconds=180&quality=medium&seed=1
# ?planet=dune&menu=0
# ?debug=1&perf=1&quality=high
```

---

## 18. Definisi “production ready”

Produk dinyatakan **production ready** hanya jika:

- [ ] Semua gate otomatis lokal dan remote PASS.
- [ ] PWA check produksi PASS.
- [ ] Checklist P0 perangkat nyata PASS, termasuk p95 ≤33 ms dan install/offline/update.
- [ ] Landscape terverifikasi.
- [ ] Tidak ada documentation drift blocker.
- [ ] Rollback path terverifikasi atau setidaknya artefak sebelumnya tersedia.

Sampai saat itu, status jujur adalah:

> **Deployed to production, device QA still open.**

Bukan “fully production-ready”.
