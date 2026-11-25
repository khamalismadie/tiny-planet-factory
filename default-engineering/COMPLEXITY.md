# COMPLEXITY

Kompleksitas baru hanya boleh masuk bila menggantikan kompleksitas lama atau membuka nilai yang tidak bisa dicapai dengan cara yang sudah ada.

## Aturan

- Sebelum membuat modul baru, cek apakah `assetGeometry.ts`, `Game.ts`, atau token CSS sudah bisa menampung kebutuhan. Modul palet baru ditolak; palet memakai `PlanetConfig`.
- Fitur “advanced DB” harus derived-only dari state sim. Tidak ada schema baru, tabel baru, atau angka buatan.
- Prop baru harus masuk ke builder yang ada dan lolos gate tinggi/footprint/facet/triangle.
- Tidak ada tipe objek, biome, planet, atau unlock baru sebelum P0 QA selesai.
- Tidak ada draw call baru. Bila perlu efek baru, pakai vertex colors, geometri gabungan, atau state material yang sudah ada.
- App chunk sangat mepet. Perubahan JS harus diukur; penghapusan kode mati lebih disukai daripada penambahan abstraksi.
- Dokumen baru boleh dibuat hanya bila duplikasinya diminimalisir. Setiap doc baru harus punya tautan masuk dari peta dokumentasi.

## Contoh keputusan

- Kamera FPS: perbaikan dilakukan dengan mematikan input orbit dan mengganti `walkUpdate()`, bukan menambah sistem kamera paralel.
- Gunung: bentuk tak beraturan dibuat dengan ring tersampel deterministik di builder yang sama, bukan menambah tekstur atau mesh pass.
- UI berwarna: memakai `body[data-planet]` dan warna yang sudah ada, bukan module palet tambahan.
