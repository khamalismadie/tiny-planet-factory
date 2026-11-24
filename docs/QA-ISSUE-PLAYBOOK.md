# Playbook penutupan QA #5–#8

Dokumen ini memetakan bukti yang harus dilampirkan ke tiap issue. Ia **bukan** hasil QA dan tidak menutup issue apa pun.

- Build kandidat: v0.21.0 — preview <https://6b045262361522f239ccf165--tinyplanetfactory.netlify.app/> (`index-wiHAa9uT.js`, `tpf-shell-v0-21-0`).
- Produksi tetap v0.16.0. Jangan mencampur bukti produksi dengan bukti v0.21.0.
- Template laporan: `docs/QA-EVIDENCE-TEMPLATE.json`.
- Checklist umum: `docs/QA-EVIDENCE-TEMPLATE.md`.
- Validasi banyak laporan: `npm run qa:evidence:batch -- <folder>`.
- Paket p95 / #7: `docs/QA-P95-REMEASURE.md`.
- Prosedur lengkap: `docs/QA-DEVICE.md`.

Catatan build: bundle lokal pada commit ini `index-wiHAa9uT.js`. Fix #8 pada `index.html`: `#hint` disembunyikan pada landscape. Laporan lama `index-BiS1XGVG.js` **tidak berlaku**. Jangan mencampur laporan dari bundle preview #41.

Semua langkah di bawah wajib di perangkat Android nyata. Headless hanya smoke.

## Status evidence v0.21.0 (2026-11-23)

| Run | File | p95 | `contextLost` | Objek | Quality | Hasil |
|---|---|---:|---|---:|---|---|
| 1 | `report-p95-v021-run1.json` | 33,5 ms | `true` | 399 | medium / 0 downgrade | REVIEW |
| 2 | `report-p95-v021-run2.json` | 33,4 ms | `false` | 493 | low / 1 downgrade | REVIEW |
| 3 | `report-p95-v021-run3.json` | 33,4 ms | `false` | 94 | low / 1 downgrade | REVIEW |
| 4 | `report-p95-v021-run4.json` | 33,4 ms | `false` | 94 | low / 1 downgrade | REVIEW |
| 5 | `wave9/report-p95-run1.json` | 33,4 ms | `false` | 94 | low / 1 downgrade | REVIEW |
| 6 | `wave9/report-p95-run2.json` | 33,4 ms | `false` | 188 | medium / 0 downgrade | REVIEW |
| 7 | `wave9/report-p95-run3.json` | 66,7 ms | `false` | 94 | low / 1 downgrade | REVIEW — UA desktop, overlap |
| 8 | `wave9/report-p95-run4.json` | 66,7 ms | `false` | 94 | low / 1 downgrade | REVIEW — UA desktop, overlap |
| 9 | `wave9/report-p95-run5.json` | 33,4 ms | `false` | 94 | medium / 0 downgrade | REVIEW — valid, p95 saja |
| 10 | `wave9/report-p95-run6.json` | 33,4 ms | `false` | 94 | medium / 0 downgrade | REVIEW — valid, p95 saja |
| 11 | `wave9/report-p95-run7.json` | 33,4 ms | `false` | 94 | medium / 0 downgrade | REVIEW — valid, p95 saja |

Batch arsip lama: `0 OK, 4 REVIEW, 4 file dari qa-evidence`. Run 5–9 berasal dari bundle Wave 9 `index-wiHAa9uT.js` dan divalidasi terpisah di `qa-evidence/wave9/`:

```bash
npm run qa:evidence -- qa-evidence/wave9/report-p95-run1.json \
  --expect-version 0.21.0 --expect-bundle index-wiHAa9uT.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run2.json \
  --expect-version 0.21.0 --expect-bundle index-wiHAa9uT.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run3.json \
  --expect-version 0.21.0 --expect-bundle index-wiHAa9uT.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run4.json \
  --expect-version 0.21.0 --expect-bundle index-wiHAa9uT.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run5.json \
  --expect-version 0.21.0 --expect-bundle index-wiHAa9uT.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run6.json \
  --expect-version 0.21.0 --expect-bundle index-wiHAa9uT.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run7.json \
  --expect-version 0.21.0 --expect-bundle index-wiHAa9uT.js
# EVIDENCE REVIEW: p95MasihDiAtas33ms
```

**Status:** p95 valid pertama terkumpul (run 5–7): UA Android, viewport `360x678`, objek `94`, `medium / 0 downgrade`, tanpa overlap, p95 `33,4 ms`. Namun target #7 tetap `≤ 33 ms` dan **#7 tetap OPEN** — run 5–7 valid, tetapi angka tepat-tepat pada batas tersebut; re-measure sampai ada ruang margin (misal ≤ 32 ms) sebelum dikatakan lulus.

`main` v0.21.0 unreleased; commit aktif selalu `git rev-parse HEAD`. Produksi tetap v0.16.0 (rollback dari sementara v0.21.0 di Netlify ke commit `e71e6c1`).

## Issue #5 — QA device nyata (umbrella)

#5 adalah payung. Jangan tutup sebelum #6, #7, dan #8 ditutup serta bukti berikut lengkap.

### Bukti wajib

| Bukti | File / lampiran | Catatan |
|---|---|---|
| Frame budget 30 FPS | `report-p95-v021-run1..4.json` + `wave9/report-p95-run1..7.json` | p95 tetap ≤ 33 ms; saat ini 11/11 REVIEW |
| Cold start 4G dari ikon PWA | video + angka waktu | Bukan `bootMs` QaProbe; itu hanya sejak hook mulai |
| Pinch zoom | video atau sebelum/sesudah `camera().distance` | Dua jari, tanpa rotasi liar |
| Drag 360° | video | Kamera tidak terbalik di kutub |
| Context loss/restore nyata | video + `qaReport()` sesudah | Background 30 s / ganti app / GPU reset |
| Landscape | `report-landscape.json` | Lihat #8 |
| Offline/update | `report-offline.json`, `report-update.json` | Lihat #6 |
| Konsol | tangkapan/log | Tidak ada app error; shader warning saat context loss dicatat terpisah |

### Langkah context loss

1. Buka preview v0.21.0 dengan `?debug=1&perf=1&quality=medium&seed=1`.
2. Pastikan game sedang render dan catat `window.__game.metrics().contextLost === false`.
3. Background aplikasi minimal 30 detik, atau pindah ke aplikasi lain, lalu kembali.
4. Periksa render lanjut, tidak crash, dan `contextLost` kembali `false`.
5. Ulangi dengan GPU reset/developer option bila tersedia.
6. Hook `window.__game.loseContext()` / `restoreContext()` hanya alat bantu; **bukan bukti** #5.

### Membedah context loss

`qaReport().contextLost` adalah gabungan dari `contextEventLost || glContextLost`. Ambil juga rincian ini sebelum dan sesudah percobaan:

```js
JSON.stringify({
  qa: window.__game.qaReport()?.contextLost ?? null,
  contextEventLost: window.__game.metrics().contextEventLost,
  glContextLost: window.__game.metrics().glContextLost,
  downgrades: window.__game.metrics().downgrades,
}, null, 2)
```

Artinya:

- `contextEventLost: true` — canvas menerima `webglcontextlost` dan belum menerima `webglcontextrestored`.
- `glContextLost: true` — `gl.isContextLost()` benar-benar mengembalikan `true` saat itu.
- `downgrades` — adaptive quality sudah pernah turun atau belum.

Run 1 hanya menyimpan gabungan `contextLost: true`, jadi penyebabnya **belum bisa dipastikan**: bisa background/GPU reset nyata, bisa event lost tanpa restore yang terekam. Jangan menyimpulkan root cause hanya dari FPS atau draw call yang tampak normal.

Simpan cuplikan `metrics()` sebagai lampiran pendukung #5. Ini bukan pengganti video/screenshot, dan bukan ekspor telemetri.

### Kriteria penutupan #5

- #6, #7, #8 sudah closed dengan bukti asli.
- p95 ≤ 33 ms pada minimal 3 run v0.21.0.
- Cold start 4G < 5 s terukur dari ikon PWA.
- Pinch, drag, dan context loss/restore terverifikasi di perangkat.
- Tidak ada app error yang tidak dijelaskan.

## Issue #6 — PWA install, offline, update

Lakukan dalam urutan ini. Jangan pakai `?qa=1` untuk pengukuran offline bila ingin mensimulasikan pemakaian normal; gunakan objek dari save lokal.

### A. Install + offline

1. Buka preview `https://6b045262361522f239ccf165--tinyplanetfactory.netlify.app/` dari Chrome Android melalui HTTPS.
2. Install via menu Chrome → **Add to Home screen**.
3. Buka dari ikon. Catat:
   - `device.standalone === true`;
   - `runtime.serviceWorker.controller === true`;
   - `runtime.serviceWorker.scriptUrl` mengandung preview draft `/sw.js`.
4. Catat `save.tick`, `save.objects`, dan `save.level` sebelum offline.
5. Aktifkan airplane mode. Buka ulang dari ikon PWA.
6. Tunggu canvas interaktif. Tanam satu objek.
7. Salin laporan sebagai `report-offline.json`.
8. Validasi:
   ```bash
   npm run qa:evidence -- qa-evidence/wave9/report-offline.json \
     --expect-version 0.21.0 --expect-bundle index-wiHAa9uT.js --standalone --offline
   ```
9. Lampirkan JSON, screenshot, dan output validator ke #6.

### B. Update PWA

1. Kembali online dengan aplikasi lama masih terpasang.
2. Siapkan build yang lebih baru dari v0.21.0. **Jangan memakai produksi v0.16.0 sebagai build update**; itu mundur, bukan update.
3. Buka aplikasi lama dari ikon. Catat apakah prompt update muncul.
4. Setelah update termuat, pastikan `save.tick`, `save.objects`, dan `save.level` tidak hilang.
5. Salin laporan sebagai `report-update.json`.
6. Validasi:
   ```bash
   npm run qa:evidence -- report-update.json --standalone
   ```
7. Lampirkan bukti ke #6.

Jika belum ada build yang lebih baru, sub-langkah update **masih belum terverifikasi** dan #6 tidak boleh ditutup.

## Issue #8 — Landscape 844×390

1. Buka preview `https://6b045262361522f239ccf165--tinyplanetfactory.netlify.app/` di perangkat nyata dengan orientasi landscape.
2. Gunakan URL:
   ```text
   http://127.0.0.1:4173/?debug=1&qa=1&qaObjects=30&qaSeconds=45&seed=1
   ```
   (sarana bantu lokal; laporan yang digunakan untuk #8 hanya memakai field `orientation` dan `layout`)
3. Amati apakah area planet tengah tetap terlihat dan tidak tertutup panel objective/inventory/topbar/build.
4. Salin laporan sebagai `qa-evidence/wave9/report-landscape.json`.
5. Validasi:
   ```bash
   npm run qa:evidence -- qa-evidence/wave9/report-landscape.json --landscape
   ```
6. Lampirkan screenshot landscape yang menampilkan planet di tengah.
7. Ulangi portrait → landscape → portrait saat aplikasi berjalan; pastikan tidak ada panel yang menutup planet sepenuhnya.

Kriteria #8: `orientation.type` landscape, `layout.planetCenterVisible === true`, `objectiveOverlapsInventory === false`, `topbarOverlapsBuild === false`, dan screenshot asli ada di issue.

Status build `index-wiHAa9uT.js`: laporan lama `qa-evidence/wave9/report-landscape.json` (commit `f53c1a0`) gagal (`centerElement: "DIV"`, `planetCenterVisible: false` pada viewport `734x280`). Fix dulu di `index.html`: sembunyikan `#hint` pada landscape. Setelah fix, ulangi tes dari preview HTTPS di atas; #8 **belum lulus** sampai ada laporan ulang dengan `planetCenterVisible: true`.

## Urutan penutupan yang aman

1. #7 — p95 v0.21.0 terukur ≤ 33 ms.
2. #6 — install/offline/update teruji.
3. #8 — landscape teruji.
4. #5 — payung ditutup terakhir setelah #6–#8 dan checklist context/cold start/pinch/drag lengkap.

Validator hanya memeriksa konsistensi laporan. Penutupan tetap keputusan manusia berdasarkan lampiran asli.
