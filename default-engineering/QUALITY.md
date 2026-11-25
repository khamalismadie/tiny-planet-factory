# QUALITY

Definition of Done untuk setiap perubahan.

## Wajib

- [ ] Delapan gate `npm test` PASS; gate tidak ditambah, dilemahkan, atau dihapus.
- [ ] `npm run build` PASS dan app chunk `< 100 kB`.
- [ ] Bundle hash dicatat; dokumentasi yang menyebut bundle lama diperbarui.
- [ ] Determinisme tidak berubah untuk seed yang sama.
- [ ] Draw call cerah `≤ 18`, cuaca `≤ 20`.
- [ ] p95 target tetap `≤ 33 ms`; pengukuran baru dicatat, target tidak diturunkan.
- [ ] UI baru berbahasa Indonesia dan dapat dibaca di portrait/landscape.
- [ ] Tidak ada data pribadi, `sessionId`, atau event telemetry diekspor sebagai bukti.
- [ ] Arsip bukti tidak ditimpa; laporan baru masuk folder baru.
- [ ] Dokumen terkait diperbarui; klaim PASS harus memiliki bukti.

## Khusus rilis

- [ ] #6, #7, #8 PASS lebih dulu; #5 ditutup terakhir.
- [ ] Human sign-off tersedia untuk perubahan visual perangkat nyata.
- [ ] Produksi hanya berubah setelah guard rilis terpenuhi dan approval manusia.

Validator `scripts/qa-evidence.mjs` hanya memeriksa konsistensi laporan. Ia tidak dapat menggantikan keputusan QA manusia.
