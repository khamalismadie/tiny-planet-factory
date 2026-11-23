# Handoff QA fisik #5–#8 — build Wave 9

Dokumen ini adalah paket serah terima untuk pengumpulan bukti **di perangkat Android nyata**. Saya tidak memiliki akses perangkat fisik, jadi dokumen ini **tidak menutup issue** dan **bukan hasil QA**.

## Build yang harus diuji

| Item | Nilai |
|---|---|
| Versi aplikasi | `0.21.0` |
| Commit fitur | `f0193de` |
| Commit docs/status | `fd0fc3d` |
| Bundle | `index-BnlhvdGl.js` |
| Cache SW | `tpf-shell-v0-21-0` |
| Produksi saat ini | v0.16.0 — jangan dipakai sebagai build uji |
| Evidence lama | preview #41 `index-BiS1XGVG.js` — **tidak berlaku** untuk build ini |

Build harus di-hosting lewat HTTPS. Bisa memakai Netlify Drop untuk `dist/`, lalu buka URL hasil deploy dari perangkat.

## Verifikasi build sebelum mengukur

```bash
curl -s https://<host>/ | grep -oE 'index-[A-Za-z0-9_-]+\.js'
curl -s https://<host>/sw.js | grep -oE 'tpf-shell-v[0-9-]+'
```

Keduanya harus mengembalikan:

```text
index-BnlhvdGl.js
tpf-shell-v0-21-0
```

## URL probe

Portrait, untuk #5 dan #7:

```text
https://<host>/?debug=1&perf=1&quality=medium&qa=1&qaObjects=94&qaSeconds=180&seed=1
```

Landscape `844×390`, untuk #8:

```text
https://<host>/?debug=1&perf=1&quality=medium&qa=1&qaObjects=30&qaSeconds=45&seed=1
```

Catatan: `qaObjects` maksimal `96`, `qaSeconds` maksimal `180`.

## Mengambil laporan

Setelah probe selesai, di konsol browser/perangkat:

```js
JSON.stringify(window.__game.qaReport(), null, 2)
```

Simpan hasilnya satu file per sesi di folder khusus `qa-evidence/wave9/`. Nama file penting karena batch validator memilih flag dari nama:

```text
qa-evidence/wave9/report-p95-run1.json
qa-evidence/wave9/report-p95-run2.json
qa-evidence/wave9/report-p95-run3.json
qa-evidence/wave9/report-landscape.json
qa-evidence/wave9/report-offline.json
```

Tambahkan `qa-evidence/wave9/report-update.json` bila laporan update tersedia. Jangan pakai telemetry export. `sessionId`/`events` bukan bukti yang diterima.

## Matriks penutupan

| Issue | File bukti | Flag validator | Syarat utama |
|---|---|---|---|
| #7 | `report-p95-run1/2/3.json` | `--expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js` | Minimal 3 run; `p95 ≤ 33 ms`; `objects 94`; `quality.tier medium`; `downgrades 0`; `contextLost false` |
| #8 | `report-landscape.json` | flag #7 + `--landscape` | `844×390`; `layout.planetCenterVisible === true`; tanpa overlap panel; screenshot disertakan |
| #6 offline | `report-offline.json` | flag #7 + `--offline --standalone` | `device.standalone === true`; `sw.controller === true`; `network.online === false`; save terbaca; bisa menanam objek |
| #6 update | `report-update.json` + screenshot | flag #7 + `--standalone` | Prompt update muncul; save IndexedDB utuh setelah update |
| #5 | laporan #5/#7 + video/screenshot | flag #7 | Cold start 4G `< 5 s`; pinch/drag berfungsi; context loss/restore nyata; `metrics().contextEventLost === false`; `metrics().glContextLost === false`; konsol bersih |

Target tambahan yang tetap berlaku:

- p50 frame time `≤ 33,3 ms` dan `fps ≥ 30`.
- Draw call `≤ 18` saat cerah dan `≤ 20` saat hujan/badai/salju.
- Boot sebagaimana dilaporkan probe bukan pengganti cold-start 4G dari ikon PWA.

## Perintah validasi

Ganti nama file sesuai sesi.

```bash
# #7 — p95, tiga run
npm run qa:evidence -- qa-evidence/wave9/report-p95-run1.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run2.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run3.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js

# #8 — landscape
npm run qa:evidence -- qa-evidence/wave9/report-landscape.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js \
  --landscape

# #6 — offline + standalone
npm run qa:evidence -- qa-evidence/wave9/report-offline.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js \
  --offline --standalone

# #6 — update
npm run qa:evidence -- qa-evidence/wave9/report-update.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js \
  --standalone

# Batch semua laporan Wave 9 saja; jangan campur dengan qa-evidence/ lama
npm run qa:evidence:batch -- qa-evidence/wave9 \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js
```

`EVIDENCE OK` hanya berarti format dan build cocok. Issue tetap ditutup hanya jika laporan asli + screenshot/video dilampirkan dan angkanya memenuhi syarat.

## Context loss #5

Lakukan secara fisik:

1. Buka aplikasi dari ikon PWA dengan `?debug=1&perf=1`.
2. Catat `window.__game.metrics()` sebelum percobaan.
3. Background aplikasi minimal 30 s, ganti aplikasi, atau lakukan GPU reset perangkat.
4. Kembali ke aplikasi.
5. Catat apakah render lanjut tanpa crash dan apakah `webglcontextrestored` terjadi.
6. Salin `window.__game.metrics()` setelah percobaan.

Hook `loseContext()` / `restoreContext()` di `?debug=1` hanya alat bantu, **bukan bukti context restore nyata**.

## Urutan penutupan

1. Tutup `#7` hanya setelah 3 run p95 lulus dengan bundle ini.
2. Tutup `#8` setelah laporan landscape + screenshot lulus.
3. Tutup `#6` setelah offline dan update terverifikasi.
4. Tutup `#5` terakhir, setelah `#6/#7/#8` dan semua bukti umbrella lengkap.
5. Deploy produksi v0.21.0 hanya setelah keempatnya closed.

## Hasil run pertama

`qa-evidence/wave9/report-p95-run1.json` sudah dikumpulkan dari perangkat nyata lewat bridge OpenCode pada `http://127.0.0.1:4173/` dan divalidasi dengan bundle yang benar.

- p50 `16,9 ms`, p95 **33,4 ms**, FPS `59,2`.
- Objek `94`, draw call `17`, `contextLost: false`, save persisten.
- Tier turun ke `low` dengan 1 downgrade meski probe memakai `?quality=medium`.
- Validator: **EVIDENCE REVIEW: p95MasihDiAtas33ms**.

Ini **belum** menutup #7. Masih dibutuhkan minimal 3 run dengan `p95 ≤ 33 ms`, tier `medium`, dan 0 downgrade. Target tidak diturunkan.

Helper sementara ada di `http://127.0.0.1:4173/qa-helper.html` selama preview lokal berjalan; tombol **Salin laporan QA** menyalin `qaReport()` langsung ke clipboard perangkat.

## Status saat ini

- Semua fitur Wave 1–9 sudah di-push, tetapi **belum di-deploy**.
- Evidence pertama untuk `index-BnlhvdGl.js` sudah ada, tetapi **REVIEW / TIDAK LULUS**.
- Issue `#5–#8` masih OPEN.
- Produksi tetap v0.16.0.
