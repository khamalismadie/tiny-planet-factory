# Template bukti QA fisik #5–#8

File ini bukan hasil QA. Ini hanya wadah agar laporan dari tombol **Salin hasil QA** tidak berantakan saat dilampirkan ke issue.

- Template laporan: `docs/QA-EVIDENCE-TEMPLATE.json`
- Prosedur lengkap: `docs/QA-DEVICE.md`
- Validator: `npm run qa:evidence -- <file> [--standalone] [--offline] [--landscape]`

Template sengaja berisi `0`, `null`, dan `<ISI: ...>`. Validator akan menolaknya sampai benar-benar diganti dengan data dari perangkat. Jangan mengarang angka atau mencentang issue hanya karena format lulus.

## Sebelum mulai

1. Catat commit/build yang diuji: `appVersion`, `runtime.scriptSrc`, dan `runtime.serviceWorker.scriptUrl`.
2. Pastikan perangkat nyata, bukan headless: isi `device.userAgent`, `device.cores`, `device.dpr`, dan `device.viewport`.
3. Simpan satu file JSON per sesi. Jangan menimpa laporan sebelumnya.
4. Lampirkan screenshot asli bersama file JSON di issue terkait.

## Nama file yang disarankan

| Sesi | File | Issue | Flag validator |
|---|---|---|---|
| A — portrait, beban 94 objek | `report-portrait.json` | #5, #7 bila p95 > 33 ms | tidak ada |
| B — landscape `844×390` | `report-landscape.json` | #8 | `--landscape` |
| C — offline dari ikon PWA | `report-offline.json` | #6 | `--standalone --offline` |
| D — update PWA & save utuh | `report-update.json` | #6 | `--standalone` |
| E — context loss nyata | `report-context-loss.json` | #5 | tidak ada |

## Checklist lampiran issue

Salin blok ini ke komentar issue yang sesuai, lalu isi tanpa menghapus baris yang gagal.

```markdown
### Bukti perangkat nyata

- Issue: #<5|6|7|8>
- Build/appVersion: <dari laporan>
- Perangkat: <mereka + model + Android + Chrome>
- viewport/DPR: <dari laporan>
- Sesi: <A portrait | B landscape | C offline | D update | E context loss>
- URL + query string: <mis. https://.../?debug=1&perf=1&quality=medium&qa=1&qaObjects=94&qaSeconds=180>
- File laporan: <lampirkan JSON asli>
- Screenshot: <lampirkan gambar asli>

### Angka kunci

- frames: <dari laporan>
- p50 ms: <dari laporan>
- p95 ms: <dari laporan>
- FPS: <dari laporan>
- boot ms: <dari laporan, bukan cold start 4G penuh>
- quality tier / downgrades: <dari laporan>
- draw calls / objek: <dari laporan>
- save tick/objek/level sebelum: <dari laporan>
- save tick/objek/level sesudah: <dari laporan>
- standalone / SW controller / online: <dari laporan>
- layout planetCenterVisible / overlap: <dari laporan>
- context lost/restore: <dari observasi nyata>

### Validator

Perintah:
`npm run qa:evidence -- <file> [flag]`

Hasil:
<tempel output lengkap, termasuk EVIDENCE OK atau EVIDENCE REVIEW>

### Interpretasi jujur

- <Apa yang benar-benar terbukti dari sesi ini>
- <Apa yang masih belum terbukti>
- <Apakah p95 ≤ 33 ms; jika tidak, sebut angka pastinya>
- <Apakah issue boleh ditutup? Jangan tutup bila bukti belum lengkap>
```

## Validasi cepat

```bash
# Template kosong harus ditolak.
npm run qa:evidence -- docs/QA-EVIDENCE-TEMPLATE.json

# Contoh sesi landscape setelah diisi dari perangkat.
npm run qa:evidence -- report-landscape.json --landscape
```

`EVIDENCE OK` hanya berarti format dan angka dalam laporan konsisten dengan target. Penutupan issue #5–#8 tetap memerlukan lampiran asli dan interpretasi manusia.
