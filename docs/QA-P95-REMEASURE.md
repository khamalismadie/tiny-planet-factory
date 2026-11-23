# Ukur ulang p95 — v0.21.0

Dokumen ini hanya paket pengukuran. **Target tetap p95 ≤ 33 ms** seperti issue #7 dan `scripts/qa-evidence.mjs`. Baseline `33,40 ms` di `docs/QA-DEVICE.md` berasal dari v0.15.4/0.15.5, sebelum perubahan v0.15.6–v0.21.0, jadi tidak boleh dipakai untuk menutup #7.

## Build yang diukur

| Item | Nilai |
|---|---|
| Kandidat | `v0.21.0` (`main`; commit aktif via `git rev-parse HEAD`) |
| URL | <https://deploy-preview-41--tinyplanetfactory.netlify.app/> |
| Bundle | `assets/index-BiS1XGVG.js` |
| Cache SW | `tpf-shell-v0-21-0` |
| Produksi | masih `v0.16.0` / `index-Cl2SK4zO.js` — **jangan dipakai untuk pengukuran ini** |

Paket ini terikat pada preview #41. Build lokal `main` pasca-commit `71a8809`–`3c10434` menghasilkan `index-CB17xFLc.js` dan belum punya evidence p95; lihat `docs/LOCAL-FEATURE-WAVES.md`. Jangan mencampur laporan dari dua bundle tersebut.

Verifikasi build sebelum mulai:

```bash
curl -s https://deploy-preview-41--tinyplanetfactory.netlify.app/ | grep -oE 'index-[A-Za-z0-9_-]+\.js'
curl -s https://deploy-preview-41--tinyplanetfactory.netlify.app/sw.js | grep -oE 'tpf-shell-v[0-9-]+'
```

Keduanya harus mengembalikan `index-BiS1XGVG.js` dan `tpf-shell-v0-21-0`.

## URL probe

Buka di perangkat nyata:

```text
https://deploy-preview-41--tinyplanetfactory.netlify.app/?debug=1&perf=1&quality=medium&qa=1&qaObjects=94&qaSeconds=180&seed=1
```

Kondisi ini menyamakan beban deterministik `test:qa-load`: 94 objek, tier medium, seed 1, cuaca dimajukan ke Hujan/Badai/Salju.

## Langkah

1. Di perangkat Itel S686LN, buka URL probe di Chrome. Tutup tab lain dan matikan battery saver agar penjadwalan frame tidak berubah.
2. Setelah `window.__game` tersedia, jalankan di console:
   ```js
   window.__game.tick(16)
   ```
   Ini memaksa transisi cuaca ke fase hujan seperti gate deterministik.
3. Biarkan probe berjalan penuh 180 detik. Jangan mengganti orientasi atau menyentuh layar.
4. Salin laporan lewat tombol **Salin hasil QA**, atau:
   ```js
   JSON.stringify(window.__game.qaReport(), null, 2)
   ```
5. Simpan sebagai `report-p95-v021-run1.json`.
6. Ulangi minimal **3 kali** dengan tab/browser ditutup antara run: `run2`, `run3`.
7. Isi `docs/QA-EVIDENCE-TEMPLATE.json` per run. Untuk pengukuran p95 ini, flag wajib hanya konsistensi build; `standalone`/`offline`/`landscape` bukan syarat #7.
8. Jalankan:
   ```bash
   npm run qa:evidence -- report-p95-v021-run1.json
   ```
9. Lampirkan ketiga JSON, screenshot overlay `perf`, dan output validator ke issue **#7**.

## Kriteria pencatatan

Catat angka apa adanya. Jangan membulatkan atau memilih run terbaik saja.

| Field | Wajib |
|---|---|
| `appVersion` | `0.21.0` |
| `runtime.scriptSrc` | mengandung `index-BiS1XGVG.js` |
| `runtime.serviceWorker.scriptUrl` | preview #41 `/sw.js` |
| `quality.tier` | `medium` |
| `quality.downgrades` | `0` |
| `scene.objects` | `94` |
| `scene.drawCalls` | `≤ 20` pada Hujan/Badai/Salju |
| `scene.contextLost` | `false` |
| `frames` | `> 0` |
| `p50ms`, `p95ms`, `fps` | dari laporan asli |

## Interpretasi

- **p95 ≤ 33,00 ms**: #7 boleh ditutup bila laporan + screenshot asli ada dan field di atas terpenuhi.
- **p95 ≈ 33,40 ms lagi**: catat sebagai kuantisasi vsync 60 Hz, tetapi **#7 tetap OPEN** karena target tertulis belum tercapai. Target tidak diturunkan; gate headless sudah diselaraskan ke ≤ 33 ms.
- **p50 ≈ 33,20 ms**: FPS masih ≈30,1 dan memenuhi lapses minimum 30 FPS, tetapi p95 tetap harus dinilai terhadap 33 ms.
- **Ada context loss / downgrade / draw call > 20**: ini bukan pengukuran p95 yang bersih; perbaiki kondisi dan ulangi.
- **Build berbeda**: ulangi dari awal. Jangan mencampur angka produksi v0.16.0, preview #39, atau preview #41.

Validator hanya memeriksa konsistensi format dan angka. Penutupan #7 tetap memerlukan interpretasi manusia dan lampiran asli.
