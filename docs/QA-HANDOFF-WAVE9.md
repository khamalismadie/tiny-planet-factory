# Handoff QA fisik #5–#8 — build Wave 9

Dokumen ini adalah paket serah terima untuk pengumpulan bukti **di perangkat Android nyata**. Saya tidak memiliki akses perangkat fisik, jadi dokumen ini **tidak menutup issue** dan **bukan hasil QA**.

## Build yang harus diuji

| Item | Nilai |
|---|---|
| Versi aplikasi | `0.21.0` |
| Commit fitur | commit terbaru di `main` (UI colorful + aset low-poly colorful) |
| Commit fix #8 | `index.html` — sembunyikan `#hint` pada landscape |
| Bundle | `index-CdugdwDq.js` |
| Cache SW | `tpf-shell-v0-21-0` |
| Preview HTTPS | `https://sparkling-cheesecake-8582e4.netlify.app/` (Netlify Drop, password `My-Drop-Site`, **unclaimed**, kedaluwarsa ±1 jam, bukan produksi) |
| Produksi saat ini | v0.16.0 — jangan dipakai sebagai build uji |
| Evidence lama | `index-BnlhvdGl.js`, `index-BiS1XGVG.js`, `index-wiHAa9uT.js`, dan `index-DUYnopCk.js` — **tidak berlaku** untuk build ini |

Build harus di-hosting lewat HTTPS. Preferable: preview Netlify draft di atas; bisa memakai Netlify Drop untuk `dist/`, lalu buka URL hasil deploy dari perangkat.

## Verifikasi build sebelum mengukur

```bash
curl -s https://<host>/ | grep -oE 'index-[A-Za-z0-9_-]+\.js'
curl -s https://<host>/sw.js | grep -oE 'tpf-shell-v[0-9-]+'
```

Keduanya harus mengembalikan:

```text
index-CdugdwDq.js
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
| #7 | `report-p95-run1/2/3.json` | `--expect-version 0.21.0 --expect-bundle index-CdugdwDq.js` | Minimal 3 run; `p95 ≤ 33 ms`; `objects 94`; `quality.tier medium`; `downgrades 0`; `contextLost false` |
| #8 | `qa-evidence/wave9/report-landscape.json` (dipakai setelah fix landscape) | `--landscape` | `layout.planetCenterVisible === true`; tanpa overlap panel; screenshot asli landscape disertakan; laporan lama dengan `BUTTON` masih tidak lulus |
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
  --expect-version 0.21.0 --expect-bundle index-CdugdwDq.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run2.json \
  --expect-version 0.21.0 --expect-bundle index-CdugdwDq.js
npm run qa:evidence -- qa-evidence/wave9/report-p95-run3.json \
  --expect-version 0.21.0 --expect-bundle index-CdugdwDq.js

# #8 — landscape
npm run qa:evidence -- qa-evidence/wave9/report-landscape.json \
  --expect-version 0.21.0 --expect-bundle index-CdugdwDq.js \
  --landscape

# #6 — offline + standalone
npm run qa:evidence -- qa-evidence/wave9/report-offline.json \
  --expect-version 0.21.0 --expect-bundle index-CdugdwDq.js \
  --offline --standalone

# #6 — update
npm run qa:evidence -- qa-evidence/wave9/report-update.json \
  --expect-version 0.21.0 --expect-bundle index-CdugdwDq.js \
  --standalone

# Batch semua laporan Wave 9 saja; jangan campur dengan qa-evidence/ lama
npm run qa:evidence:batch -- qa-evidence/wave9 \
  --expect-version 0.21.0 --expect-bundle index-CdugdwDq.js
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

## Hasil run 1–2

Kedua laporan dikumpulkan dari perangkat nyata lewat bridge OpenCode pada `http://127.0.0.1:4173/` dan divalidasi dengan bundle yang benar.

| Run | p50 | p95 | FPS | Objek | Quality | Hasil |
|---|---:|---:|---:|---:|---|---|
| 1 | 16,9 ms | 33,4 ms | 59,2 | 94 | low / 1 downgrade | REVIEW |
| 2 | 33,1 ms | 33,4 ms | 30,2 | 188 | medium / 0 downgrade | REVIEW |
| 3 | 33,3 ms | 66,7 ms | 30,0 | 94 | low / 1 downgrade | REVIEW — UA desktop, tidak valid |
| 4 | 33,3 ms | 66,7 ms | 30,0 | 94 | low / 1 downgrade | REVIEW — UA desktop, tidak valid |
| 5 | 33,2 ms | 33,4 ms | 30,1 | 94 | medium / 0 downgrade | REVIEW — valid, p95 saja |
| 6 | 33,2 ms | 33,4 ms | 30,1 | 94 | medium / 0 downgrade | REVIEW — valid, p95 saja |
| 7 | 33,2 ms | 33,4 ms | 30,1 | 94 | medium / 0 downgrade | REVIEW — valid, p95 saja |

Run 3–4 tidak dihitung karena UA desktop. **Run 5–7 valid**: UA Android, viewport `360x678`, objek `94`, `medium / 0 downgrade`, tanpa overlap, tetapi ketiganya p95 `33,4 ms`. Minimal 3 run valid sudah terkumpul, namun #7 tetap OPEN karena target `≤ 33 ms` tidak tercapai. Target tidak diturunkan.

Helper sementara ada di `http://127.0.0.1:4173/qa-helper.html` selama preview lokal berjalan; tombol **Salin laporan QA** menyalin `qaReport()` langsung ke clipboard perangkat. Untuk run berikutnya gunakan `http://127.0.0.1:4173/qa-helper.html?fresh=1`: helper menghapus `indexedDB` bernama `tiny-planet-factory` sebelum memuat probe, sehingga `qaObjects=94` tidak menumpuk di save lama.

## Status saat ini

- Semua fitur Wave 1–9 sudah di-push, tetapi **belum di-deploy**.
- Tujuh evidence p95 untuk `index-CdugdwDq.js` sudah ada, semuanya **REVIEW / TIDAK LULUS**; run 5–7 valid tetapi p95 `33,4 ms`.
- Evidence landscape sudah ada, tetapi `planetCenterVisible: false` pada viewport `734x280`; #8 **belum lulus**.
- Issue `#5–#8` masih OPEN.
- Produksi tetap v0.16.0.
