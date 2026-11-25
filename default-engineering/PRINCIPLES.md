# PRINCIPLES

1. **Sim murni.** Tidak ada import render di `src/sim/`; tidak ada randomness di luar RNG ber-seed.
2. **Satu geometri per tipe.** Variant dipilih deterministik dari `seed + planetId`, lalu digabung menjadi satu mesh dengan vertex colors.
3. **UI dulu, aset kemudian.** Perubahan palet memakai token CSS dan warna `PlanetConfig` yang sudah ada, bukan modul palet baru.
4. **Budget sebelum fitur.** Jika chunk, draw call, atau p95 melebihi batas, fitur baru tidak masuk.
5. **Bukti sebelum klaim.** Validator hanya memeriksa konsistensi; penutupan issue tetap keputusan manusia dengan lampiran asli.
6. **Jangan perlemah gate.** Tidak menambah gate, tapi juga tidak menurunkan threshold, menghapus test, atau mengganti definisi PASS.
7. **Jangan tutup celah dengan data palsu.** File bukti yang belum ada tidak boleh dibuat hanya untuk memuaskan referensi dokumen.
8. **Perubahan inkremental.** Gunakan `git mv`, pertahankan path lama bila perlu, dan verifikasi link setelah migrasi.
9. **Privasi by default.** Telemetri tidak menyimpan identitas, session ID, atau event mentah.
10. **Produksi sakral.** Draft/preview boleh gagal; produksi tidak boleh berubah tanpa bukti #5–#8 dan approval.
