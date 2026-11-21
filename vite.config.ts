import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset URLs keep the build portable across LAN root, GitHub Pages
  // subpaths, and any future custom domain without a rebuild.
  base: './',
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
