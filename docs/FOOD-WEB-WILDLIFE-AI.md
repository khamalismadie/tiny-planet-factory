# Food Web + Wildlife AI — v0.6.0

Tujuan: menyatukan agen fauna visual dengan populasi ekologis v0.5 tanpa menambah aset baru atau mengubah format DNA.

## Guild visual

Renderer hanya memiliki lima model fauna. Kelima model itu dipakai sebagai **guild** yang mewakili 12 spesies Terra:

| Guild visual | Populasi ekologis sumber |
|---|---|
| `deer` | `terra_deer`, `terra_rabbit` |
| `fox` | `terra_fox`, `terra_wolf` |
| `bird` | `terra_eagle` |
| `fish` | `terra_fish` |
| `insect` | `terra_bee` |

`terra_mushroom` tetap berupa dekomposer populasi; jamur tidak punya agen visual di v0.6. Ini adalah kompromi desain yang disengaja, bukan klaim bahwa kelinci dan kijang terlihat identik di alam.

## Status guild

Untuk setiap guild, `guildStatus()` menghitung:

- `availability = clamp(populasi / kapasitas, 0, 1.2)`
- `foodSources` diambil dari `PlanetConfig.foodWeb` untuk relasi `grazing`, `hunting`, `scavenging`, dan `pollination`.
- `foodFactor = clamp(populasiMakanan / (0.25 * kapasitasMakanan), 0, 1.2)`

Contoh: rubah mendapat sumber `terra_rabbit` dan `terra_deer`; lebah mendapat `terra_wildflower` dan `terra_oak`; elang mendapat `terra_rabbit` dan `terra_fish`.

## Kapasitas agen

Kapasitas lama dari objek yang ditempatkan tetap dipakai sebagai pembatas habitat, lalu diperketat oleh ekosistem:

```
agenCapacity = min(habitatCapacity, floor(ecoEstimate / divisor) * (0.25 + 0.75 * foodFactor))
```

Divisor per guild:

| Guild | Divisor |
|---|---|
| `deer` | 8 |
| `fox` | 4 |
| `bird` | 2 |
| `fish` | 8 |
| `insect` | 10 |

Jika tidak ada habitat visual, kapasitas tetap 0 sehingga test kepunahan lama masih berlaku. Jika populasi ekologis runtuh, kapasitas agen ikut turun.

## Perilaku

- Agen herbivora, ikan, dan serangga bergerak ke objek yang sesuai dengan target food web, lalu fallback ke habitat lama.
- Rubah mengejar agen `deer`; elang mengejar agen `fish`/`insect` bila suplai mangsa tersedia.
- Energi makanan diskalakan oleh `foodFactor`. Saat makanan habis, agen tidak bisa "makan gratis" hanya karena objek masih ada.
- Kontribusi `grazing` dan `pollination` ke vegetasi/kesuburan juga diskalakan oleh `foodFactor`.
- Predasi agen tidak dimasukkan lagi sebagai mortalitas ekologis tambahan; model populasi v0.5 sudah punya `predationPressure()`. Ini mencegah double-counting dan ketidakstabilan.
- Agen membaca state ekologis dari tick sebelumnya (one-tick lag). Ini membuat urutan `simulateWildlife()` → climate → `EcosystemManager.step()` tetap deterministik.

## Observability

- `window.__game.foodWeb()` mengembalikan status 5 guild, jumlah agen, dan seluruh link `terraConfig.foodWeb`.
- Panel `?eco=1` menampilkan ringkasan guild di bawah daftar 12 spesies.
- Debug hook lama `wildlife()` tetap tersedia.

## Gate

- Dua planet seed-identik menghasilkan `fauna` identik.
- Jumlah agen per guild tidak pernah melebihi kapasitas ekologis.
- Runtuhnya produsen menurunkan suplai guild `deer`.
- Runtuhnya `terra_rabbit` dan `terra_deer` menurunkan suplai guild `fox`.
- Semua test lama tetap lulus: DNA fauna, migrasi save lama, replay deterministik, kepunahan tanpa habitat, dan quality tier.

## Batas

- Ini bukan AI individu dengan memori, rute, atau imperative planning; ini adalah perilaku deterministik berbasis food web + energi.
- Belum ada agen visual untuk kelinci, serigala, elang, lebah, dan jamur secara terpisah.
- Belum ada audio, animasi transisi, atau predasi yang mengubah geometry lawan.
- Sejak v0.12, Terra, Dune, Glaciera, Inferna, Aquaria, Mycelia, dan Sakura memakai guild ekologis; dua planet lain masih memakai fallback kapasitas lama sampai mendapat `EcosystemManager`-nya sendiri.
