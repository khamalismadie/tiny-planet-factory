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

## Validasi ulang folder

```bash
npm run qa:evidence:batch -- qa-evidence \
  --expect-version 0.21.0 \
  --expect-bundle index-BiS1XGVG.js
```

Perintah ini hanya memeriksa konsistensi format dan angka. Penutupan issue #5–#8 tetap memerlukan lampiran asli dan interpretasi manusia.
