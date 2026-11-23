# Bukti QA fisik mentah

Folder ini menyimpan laporan hasil `window.__game.qaReport()` dari perangkat nyata. File di sini adalah **bukti mentah**, bukan fixture dan bukan contoh laporan lulus.

Jangan mengubah isi file setelah disalin. Simpan satu file per sesi.

## Build Wave 9 — 7 laporan REVIEW

Tujuh laporan untuk bundle `index-BnlhvdGl.js` sudah masuk di `qa-evidence/wave9/` dan semuanya berstatus **REVIEW / TIDAK LULUS**. Run 5–7 valid secara Android; sisanya tidak valid atau gagal pada konfigurasi. Paket pengumpulan buktinya ada di `docs/QA-HANDOFF-WAVE9.md`. Simpan laporan berikutnya di folder yang sama agar tidak tercampur dengan arsip preview #41, lalu validasi dengan `--expect-bundle index-BnlhvdGl.js`.

### `wave9/report-p95-run1.json`

- Build: v0.21.0 Wave 9 — `index-BnlhvdGl.js`, `tpf-shell-v0-21-0`.
- Sumber: perangkat nyata via bridge OpenCode, viewport `360x678`, DPR 3, portrait.
- Host: `http://127.0.0.1:4173/` — loopback aman di perangkat, bukan URL produksi.
- Durasi probe: `180014` ms dengan `7159` frame.
- p50 **16,9 ms**, p95 **33,4 ms**, FPS **59,2**, boot **2578 ms**.
- Draw call `17`, objek `94`, tier `low`, 1 adaptive downgrade, `contextLost: false`.
- Save persisten: tick `89`, objek `94`, level `4`.
- SW controller aktif; `standalone: false`.
- Layout portrait: planet center visible, tanpa overlap.

```bash
npm run qa:evidence -- qa-evidence/wave9/report-p95-run1.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js
```

Hasil:

```text
EVIDENCE REVIEW: p95MasihDiAtas33ms
```

Laporan ini **tidak** menutup #7 maupun #5: p95 `33,4 ms` melebihi target `≤ 33 ms`, dan kualitas adaptif turun ke `low` dengan 1 downgrade meski probe memakai `?quality=medium`.

### `wave9/report-p95-run2.json`

- Build: v0.21.0 Wave 9 — `index-BnlhvdGl.js`, `tpf-shell-v0-21-0`.
- Sumber: perangkat nyata via bridge OpenCode, viewport `360x622`, DPR 3, portrait.
- Durasi probe: `180029` ms dengan `7181` frame.
- p50 **33,1 ms**, p95 **33,4 ms**, FPS **30,2**, boot **607 ms**.
- Draw call `19`, objek `188`, tier **medium / 0 downgrade**, `contextLost: false`.
- Save persisten: tick `186`, objek `188`, level `4`.
- SW controller aktif; `standalone: false`.

```bash
npm run qa:evidence -- qa-evidence/wave9/report-p95-run2.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js
```

Hasil: `EVIDENCE REVIEW: p95MasihDiAtas33ms`.

Run 2 tidak menutup #7 karena p95 tetap `33,4 ms` dan objek `188`, bukan `94`. Objek membengkak karena save run 1 tidak dihapus sebelum `qaObjects=94` ditambahkan; `populateQaObjects()` menambah ke state yang sudah ada. Run berikutnya harus memakai origin baru atau save kosong.

### `wave9/report-p95-run3.json`

- Build: v0.21.0 Wave 9 — `index-BnlhvdGl.js`, origin port `4174`.
- UA: `X11; Linux x86_64` Chrome/157 — **bukan UA Android**.
- Viewport `980x1845`, DPR 3, `objectiveOverlapsInventory: true`.
- Durasi probe: `180045` ms dengan `4896` frame.
- p50 **33,3 ms**, p95 **66,7 ms**, FPS **30,0**, boot **556 ms**.
- Draw call `18`, objek `94`, tier `low`, 1 downgrade, `contextLost: false`.
- SW controller aktif; `standalone: false`; `installPromptSeen: true`.

```bash
npm run qa:evidence -- qa-evidence/wave9/report-p95-run3.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js
```

Hasil: `EVIDENCE REVIEW: p95MasihDiAtas33ms`.

Run 3 **tidak dihitung** sebagai pengukuran p95 Android yang valid: UA desktop, viewport bukan `360x678`, dan layout overlap. Ini tetap diarsipkan sebagai bukti mentah, bukan fixture.

### `wave9/report-p95-run4.json`

- Build: v0.21.0 Wave 9 — `index-BnlhvdGl.js`, origin port `4175`.
- UA tetap `X11; Linux x86_64`, viewport `980x1845`, overlap layout — mode Desktop site masih aktif di Chrome.
- p50 `33,3 ms`, p95 **66,7 ms**, FPS `30,0`, objek `94`, draw call `17`, tier `low / 1 downgrade`, `contextLost: false`.
- SW controller aktif.

Hasil validator: `EVIDENCE REVIEW: p95MasihDiAtas33ms`.

Run 4 juga **tidak dihitung**. Sebelum mengulang, matikan **Desktop site** di menu Chrome perangkat.

### `wave9/report-p95-run5.json` — run valid pertama

- Build: v0.21.0 Wave 9 — `index-BnlhvdGl.js`, origin port `4176`.
- UA Android, viewport `360x678`, DPR 3, portrait, tanpa overlap.
- Durasi probe: `180001` ms dengan `7171` frame.
- p50 **33,2 ms**, p95 **33,4 ms**, FPS **30,1**, boot **473 ms**.
- Draw call `20`, objek `94`, tier **medium / 0 downgrade**, `contextLost: false`.
- Save persisten: tick `89`, objek `94`, level `4`.
- SW controller aktif; `standalone: false`; `installPromptSeen: true`.

```bash
npm run qa:evidence -- qa-evidence/wave9/report-p95-run5.json \
  --expect-version 0.21.0 --expect-bundle index-BnlhvdGl.js
```

Hasil: `EVIDENCE REVIEW: p95MasihDiAtas33ms`.

Run 5 memenuhi semua syarat konfigurasi tetapi tetap gagal pada p95 `33,4 ms` (dan draw call `20` berada di batas atas). #7 tetap OPEN.

### `wave9/report-p95-run6.json`

- Sama seperti run 5, tetapi origin port `4177`; UA Android, viewport `360x678`, tanpa overlap.
- `180011` ms, `7152` frame, p50 `33,2 ms`, p95 **33,4 ms**, FPS `30,1`, boot `1450 ms`.
- Objek `94`, draw call `20`, tier `medium / 0 downgrade`, `contextLost: false`, SW controller aktif.

Hasil: `EVIDENCE REVIEW: p95MasihDiAtas33ms`. #7 tetap OPEN.

### `wave9/report-p95-run7.json`

- Run valid ketiga, origin port `4178`; UA Android, viewport `360x678`, tanpa overlap.
- `180025` ms, `7173` frame, p50 `33,2 ms`, p95 **33,4 ms**, FPS `30,1`, boot `752 ms`.
- Objek `94`, draw call `20`, tier `medium / 0 downgrade`, `contextLost: false`, SW controller aktif.

Batch Wave 9: `0 OK, 7 REVIEW, 7 file`. Tiga run valid semua p95 `33,4 ms`; #7 tetap OPEN.

### `wave9/report-landscape-attempt1.json`

Laporan landscape pertama dan kedua masih `portrait-primary` dan viewport `360x678`, sehingga **tidak memenuhi #8**. Kemungkinan auto-rotate perangkat masih mati. Disimpan sebagai bukti mentah, bukan hasil lulus.

## Isi saat ini — arsip preview #41

Semua laporan di bawah berasal dari preview #41 `index-BiS1XGVG.js`.

### `report-p95-v021-run1.json`

- Build: v0.21.0 preview #41 — `index-BiS1XGVG.js`, `tpf-shell-v0-21-0`.
- Sumber: Android 10, Chrome 157, viewport `360x678`, DPR 3.
- Durasi probe: `172560` ms dengan `284` frame.
- p50 **33,2 ms**, p95 **33,5 ms**, FPS **30,1**.
- Draw call `20`, objek `399`, tier `medium`, tanpa adaptive downgrade.
- Save persisten: tick `87`, objek `399`, level `4`.
- SW controller aktif; `standalone: false`.
- **`scene.contextLost: true`**.
- Rincian `contextEventLost` / `glContextLost` tidak tersimpan di format `qaReport()` saat run ini dibuat, sehingga penyebabnya tidak bisa dipastikan dari file ini saja.

Status: **REVIEW / TIDAK LULUS**.

```bash
npm run qa:evidence -- qa-evidence/report-p95-v021-run1.json \
  --expect-version 0.21.0 --expect-bundle index-BiS1XGVG.js
```

Hasil:

```text
EVIDENCE REVIEW: tanpaContextLoss, p95MasihDiAtas33ms
```

Laporan ini **tidak** menutup #7 maupun #5:

- p95 `33,5 ms` melebihi target `≤ 33 ms`;
- `contextLost: true` membuat pengukuran tidak bersih;
- objek `399` bukan beban remeasure standar `94`;
- `standalone: false` belum membuktikan #6.

Ringkasan juga tercatat di:

- <https://github.com/khamalismadie/tiny-planet-factory/issues/7#issuecomment-7087727894>
- <https://github.com/khamalismadie/tiny-planet-factory/issues/5#issuecomment-7087727856>

### `report-p95-v021-run2.json`

- Build: v0.21.0 preview #41 — `index-BiS1XGVG.js`, `tpf-shell-v0-21-0`.
- Sumber: Android 10, Chrome 157, viewport `360x678`, DPR 3.
- Durasi probe: `180026` ms dengan `5597` frame.
- p50 **33,2 ms**, p95 **33,4 ms**, FPS **30,1**, boot `424` ms.
- Draw call `17`, objek `493`, **`quality.tier: low`, `downgrades: 1`**.
- Save persisten: tick `163`, objek `493`, level `4`.
- SW controller aktif; `standalone: false`.
- `scene.contextLost: false` — tidak mengulang masalah run 1.

Status: **REVIEW / TIDAK LULUS**.

```bash
npm run qa:evidence -- qa-evidence/report-p95-v021-run2.json \
  --expect-version 0.21.0 --expect-bundle index-BiS1XGVG.js
```

Hasil:

```text
EVIDENCE REVIEW: p95MasihDiAtas33ms
```

Laporan ini **tidak** menutup #7:

- p95 `33,4 ms` masih `0,4 ms` di atas target `≤ 33 ms`;
- objek `493` bukan beban remeasure standar `94` — save belum terhapus;
- adaptif quality turun ke tier `low` dengan `downgrades: 1`, bukan pengukuran `medium` stabil;
- `standalone: false` juga belum membuktikan #6.

Ringkasan: <https://github.com/khamalismadie/tiny-planet-factory/issues/7#issuecomment-7088296570>

### `report-p95-v021-run3.json` dan `report-p95-v021-run4.json`

- Build: v0.21.0 preview #41 — `index-BiS1XGVG.js`, `tpf-shell-v0-21-0`.
- Sumber: Android 10, Chrome 157, viewport `360x678`, DPR 3.
- Run 3: `2026-11-23T00:00:37.872Z`, `180021` ms, `8037` frame, boot `533` ms.
- Run 4: `2026-11-23T00:20:51.523Z`, `180022` ms, `8025` frame, boot `448` ms.
- p50 **16,7 ms**, p95 **33,4 ms**, FPS **59,9** pada kedua run.
- Draw call `17`, **objek `94`**, `contextLost: false` pada kedua run.
- Tier **`low`, `downgrades: 1`** pada kedua run.
- SW controller aktif; `standalone: false`; layout portrait tanpa overlap.

Status keduanya: **REVIEW / TIDAK LULUS**.

```bash
npm run qa:evidence -- qa-evidence/report-p95-v021-run3.json \
  --expect-version 0.21.0 --expect-bundle index-BiS1XGVG.js
npm run qa:evidence -- qa-evidence/report-p95-v021-run4.json \
  --expect-version 0.21.0 --expect-bundle index-BiS1XGVG.js
```

Hasil keduanya:

```text
EVIDENCE REVIEW: p95MasihDiAtas33ms
```

Ini adalah run paling bersih sejauh ini: objek dan context loss sudah sesuai prosedur. Namun:

- p95 `33,4 ms` masih di atas target `≤ 33 ms`;
- `docs/QA-P95-REMEASURE.md` sudah menyebut 33,40 ms sebagai kuantisasi VSync 60 Hz dan tetap meminta #7 dibuka;
- adaptive quality masih turun ke `low` (`downgrades: 1`), jadi bukan pengukuran `medium` yang diminta;
- target dan gate **tidak** diturunkan.

Ringkasan: <https://github.com/khamalismadie/tiny-planet-factory/issues/7#issuecomment-7088330795>

## Validasi ulang folder

```bash
npm run qa:evidence:batch -- qa-evidence \
  --expect-version 0.21.0 \
  --expect-bundle index-BiS1XGVG.js
```

Hasil saat ini: `0 OK, 4 REVIEW, 4 file dari qa-evidence`.

Perintah ini hanya memeriksa konsistensi format dan angka. Penutupan issue #5–#8 tetap memerlukan lampiran asli dan interpretasi manusia.
