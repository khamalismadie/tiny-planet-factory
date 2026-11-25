# ARCHITECTURE

Ringkasan arsitektur; detail teknis ada di `docs/04-TECHNICAL-ARCHITECTURE/ARCHITECTURE.md`.

## Lapisan

| Lapisan | Lokasi | Tanggung jawab |
|---|---|---|
| Sim | `src/sim/` | State deterministik, RNG ber-seed, aturan ekosistem; tidak tahu soal PixiJS/DOM |
| Konten | `src/content/` | Planet, spesies, objek, misi, dan palet sumber |
| Render | `src/render/` | Geometri low-poly, `PlanetMesh`, `WeatherFx`, pratinjau SVG galeri |
| UI | `src/ui/`, `index.html` | HUD/menu/modal Indonesia, token CSS per `body[data-planet]` |
| Orkestrasi | `src/app/Game.ts` | lifecycle, kamera FPS orbit, wiring galeri, debug API `window.__game` |
| Gate | `scripts/` | Delapan check otomatis + validator bukti QA |
| PWA | `public/` | manifest, ikon, service worker shell |
| Bukti | `qa-evidence/` | Laporan mentah `qaReport()`, tidak diubah setelah disalin |

## Alur utama

`seed + planetId` → konfigurasi konten → resolver variant → satu geometri aktif per tipe → merged mesh → satu draw call per tipe → HUD derived state.

Kamera FPS tidak mengubah planet. Planet diam; `OrbitCamera` input dimatikan selama FPS dan kamera spherical yang bergerak dengan yaw/pitch/zoom `1,15`–`6`.

## Batas keras

- Tanpa tekstur, GLB/GLTF, R3F, `schemaVersion: 4`, planet/biome/unlock baru.
- App chunk `< 100 kB`; draw call cerah `≤ 18`, cuaca `≤ 20`.
- QA report hanya dari `qaReport()`; telemetry `sessionId`/`events` bukan bukti.
