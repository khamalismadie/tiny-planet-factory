# Bukti QA fisik mentah

Folder ini menyimpan laporan hasil `window.__game.qaReport()` dari perangkat nyata. File di sini adalah **bukti mentah**, bukan fixture dan bukan contoh laporan lulus.

Jangan mengubah isi file setelah disalin. Simpan satu file per sesi.

## Isi saat ini

### `report-p95-v021-run1.json`

- Build: v0.21.0 preview #41 — `index-BiS1XGVG.js`, `tpf-shell-v0-21-0`.
- Sumber: Android 10, Chrome 157, viewport `360x678`, DPR 3.
- Durasi probe: `172560` ms dengan `284` frame.
- p50 **33,2 ms**, p95 **33,5 ms**, FPS **30,1**.
- Draw call `20`, objek `399`, tier `medium`, tanpa adaptive downgrade.
- Save persisten: tick `87`, objek `399`, level `4`.
- SW controller aktif; `standalone: false`.
- **`scene.contextLost: true`**.

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
