# ENGINEERING

## Command wajib

```bash
npm ci
npm test
npm run build
npm run qa:evidence -- <file> --expect-version 0.21.0 --expect-bundle <hash>
```

`npm test` harus tetap delapan gate: `sim`, `art scale`, `terrain render`, `vertical slice smoke`, `device-check`, `qa load`, `menu check`, `layout audit`.

## Anggaran terkini

- Versi kandidat: `v0.21.0` (unreleased).
- Bundle kandidat: `index-DJTYXXt9.js`.
- App chunk: `99,51 kB` / gzip `32,39 kB` — sisa ruang sangat kecil.
- Produksi: `v0.16.0`, bundle `index-Cl2SK4zO.js`.

## Aturan build

1. `tsc --noEmit` harus lolos sebelum Vite build.
2. Ukur ulang chunk setelah setiap perubahan kode aplikasi.
3. Jika chunk melebihi `100 kB`, hapus atau pindahkan kode ke lazy chunk; jangan menaikkan batas.
4. Draw call dan determinisme diuji dengan seed identik, bukan seed acak.
5. Workflow CI hanya menjalankan gate yang sudah ada; workflow rilis tidak boleh deploy produksi tanpa bukti #5–#8 dan approval manual.

## Bukti

Gunakan `--standalone`, `--offline`, atau `--landscape` sesuai skenario. Flag hanya memeriksa konsistensi laporan; QA fisik tetap memerlukan perangkat nyata dan human sign-off.

Token Netlify tidak pernah disimpan di repo. Environment variable hanya tersedia di workflow, dan preview harus memakai alias draft, bukan `--prod`.
