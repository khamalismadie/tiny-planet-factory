# Wave fitur etis lokal pasca-preview #41

Dokumen ini mencatat fitur-fitur kecil yang dikembangkan **lokal di `main` setelah kandidat QA preview #41**. Fitur-fitur ini **belum di-deploy ke produksi** dan **belum memiliki bukti QA perangkat nyata**. Produksi tetap v0.16.0; issue #5–#8 tetap OPEN.

## Status

| Item | Nilai |
|---|---|
| Commit fitur terakhir | `37b2559` |
| `package.json` | `0.21.0` |
| Cache SW | `tpf-shell-v0-21-0` |
| Bundle lokal pada commit ini | `index-Dh6P2L_r.js` |
| App chunk | 92,85 kB / gzip 30,32 kB |
| Chunk lazy `ecopediaView` | 8,94 kB / gzip 2,92 kB |
| `npm test` | 8/8 PASS |

Hash bundle di atas **hanya berlaku untuk commit ini**. Setiap build berikutnya harus dibaca ulang dari `dist/index.html` dan dipakai secara konsisten pada validator evidence.

## Daftar wave

### Wave 1 — `71a8809`

- Kompendium ekologi berisi daftar spesies, status penemuan/kepunahan, estimasi populasi, faktor pembatas, dan saran habitat.
- Panel faktor pembatas dan saran lingkungan memakai helper murni `src/sim/insights.ts`.
- Cuaca menampilkan efek aktif, cautions, dan kecenderungan berikutnya lewat `weatherTendencies()` dari `src/sim/engine.ts`.
- Semua informasi diturunkan dari state sim yang sudah ada.

### Wave 2 — `8a9fa58`

- Tooltip/toast dampak objek saat memilih dan menempatkan objek.
- Tren pemulihan menampilkan delta kesuburan, air, biodiversitas, dan kesehatan dari riwayat sesi.
- Aksi restorasi cepat menyarankan objek yang sudah terbuka dan relevan dengan kondisi saat ini.
- `#object-info` disembunyikan pada layout kompak agar audit layout tetap bersih.

### Wave 3 — `15c1d82`

- Milestone restorasi non-punitif: indikator pencapaian lokal tanpa hukuman, streak, atau pressure.
- Before/after snapshot membandingkan kondisi ekologis sebelum dan sesudah aksi.
- Jurnal ekologi tersimpan di `localStorage['tpf.journal.v1']`, maksimal 50 entri, menampilkan 8 entri terbaru.
- Jurnal dan milestone tidak masuk DNA/save schema.

### Wave 4 — `a81e5a8`

- Panel **Risiko & Respons**: advisory untuk kekeringan, banjir/kelebihan air, panas/dingin ekstrem, degradasi tanah, ketidakstabilan badai, dan kesehatan ekosistem rendah.
- Respons memetakan ke objek dan mekanik yang sudah ada; bukan simulasi bencana baru.
- Render kompendium dipindah ke chunk lazy `src/ui/ecopediaView.ts` agar app chunk tetap di bawah 100 kB.

### Wave 4 lanjutan — `37b2559`

- Tombol **Salin jurnal** mengekspor jurnal lokal sebagai JSON ke clipboard.
- Toast pemilihan objek kini merangkum efek per tick dari `OBJECT_DEFS`.
- Tooltip objek menggunakan label `efek/tick` agar estimasi tidak disalahartikan sebagai hasil yang dijamin.

## Batasan yang dipertahankan

- Tidak ada planet, biome, objek, unlock, misi campaign, field DNA, atau `schemaVersion` baru.
- Tidak ada gate tambahan; `npm test` tetap delapan gate.
- Tidak ada dark pattern, punitive streak, monetisasi eksploitatif, atau statistik buatan.
- Tidak ada klaim performa/perangkat nyata dari perubahan ini.
- Tidak ada perubahan target QA: p95 tetap `≤ 33 ms`, draw call tetap `≤18` cerah / `≤20` cuaca berat.

## Hubungan dengan evidence QA #5–#8

Laporan yang sudah terarsip di `qa-evidence/` dibuat terhadap bundle preview #41 `index-BiS1XGVG.js`. Laporan itu **tidak membuktikan** build lokal pasca-wave ini.

Jika QA fisik dijalankan pada build `37b2559`, gunakan:

```bash
npm run qa:evidence -- laporan.json \
  --expect-version 0.21.0 \
  --expect-bundle index-Dh6P2L_r.js
```

Untuk `qa:evidence:batch`, pakai flag yang sama. Jangan menurunkan target atau mengabaikan `--expect-bundle` agar laporan dari build lain tidak diterima.

## Belum dilakukan

- Belum ada push/PR untuk commit `71a8809`–`37b2559`.
- Belum ada deploy produksi.
- Belum ada bukti fisik #5–#8 untuk build ini.
- Wave 5 tetap tertunda karena risiko mekanik/schema dan tidak boleh masuk hanya karena wave lokal sebelumnya lulus headless.
