# QA Evidence Policy

## Sumber tunggal

Satu-satunya export bukti yang diterima:

```js
JSON.stringify(window.__game.qaReport(), null, 2)
```

Laporan dengan field `sessionId` atau `events` dari telemetry ditolak. Itu bukan bukti QA.

## Penyimpanan

- `qa-evidence/` adalah arsip mentah. Jangan mengubah isi file setelah disalin.
- Satu file per sesi.
- Laporan baru untuk bundle baru masuk folder baru: `qa-evidence/wave10/`, `wave11/`, dan seterusnya.
- Jangan menimpa `qa-evidence/wave9/` atau laporan root lama.

## Validasi

```bash
npm run qa:evidence -- <file> \
  --expect-version 0.21.0 \
  --expect-bundle index-DJTYXXt9.js
```

Tambahkan flag sesuai skenario:

| Skenario | Flag |
|---|---|
| PWA dari ikon home screen | `--standalone` |
| Airplane mode/offline | `--offline` |
| Landscape | `--landscape` |

Validator hanya memeriksa konsistensi laporan terhadap bundel dan flag. Ia **tidak** membuktikan bahwa perangkat nyata diuji, dan tidak menutup issue.

## Penutupan issue

- #7: minimal 3 run p95 valid dengan target `≤ 33 ms`; disarankan margin `≤ 32 ms`.
- #6: `standalone:true`, service worker controller aktif, offline boot/save/place, lalu update tanpa kehilangan save.
- #8: landscape `planetCenterVisible:true`, tanpa overlap panel.
- #5: ditutup terakhir setelah #6–#8, cold start 4G `< 5 s`, pinch/drag, dan context loss/restore terverifikasi.

Human sign-off wajib untuk perubahan visual. Model tidak boleh mengklaim telah melihat screenshot bila tidak bisa.
