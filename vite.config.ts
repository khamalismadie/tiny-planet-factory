import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

function pwaPrecache() {
  return {
    name: 'pwa-precache',
    apply: 'build' as const,
    closeBundle() {
      const outDir = path.resolve('dist');
      const swPath = path.join(outDir, 'sw.js');
      if (!fs.existsSync(swPath)) return;
      const files = ['', 'index.html', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'];
      const assetsDir = path.join(outDir, 'assets');
      if (fs.existsSync(assetsDir)) {
        for (const file of fs.readdirSync(assetsDir).sort()) files.push(`assets/${file}`);
      }
      const precache = `const PRECACHE = [\n${files.map((file) => `  ${JSON.stringify(file)},`).join('\n')}\n];`;
      const source = fs.readFileSync(swPath, 'utf8');
      fs.writeFileSync(swPath, source.replace('const PRECACHE = [];', precache));
    },
  };
}

export default defineConfig({
  // Relative asset URLs keep the build portable across LAN root, GitHub Pages
  // subpaths, and any future custom domain without a rebuild.
  base: './',
  plugins: [pwaPrecache()],
  build: {
    // PixiJS is intentionally split into two cacheable vendor chunks (~540 kB
    // each). Content data (planet configs, guild mappings, objects, missions,
    // species, weather, and the eco factory) is split separately; the DNA codec has its own cacheable chunk.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@pixi/3d')) return 'pixi-3d';
          if (id.includes('node_modules/@pixi') || id.includes('node_modules/pixi.js')) return 'pixi-core';
          if (id.includes('src/content/') || id.includes('src/sim/eco/factory.ts')) return 'planet-configs';
          if (id.includes('src/sim/dna.ts')) return 'dna';
          return undefined;
        },
      },
    },
  },
});
