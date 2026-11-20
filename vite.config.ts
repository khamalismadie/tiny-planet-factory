import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // PixiJS is intentionally split into two cacheable vendor chunks (~540 kB
    // each). They gzip to ~160 kB apiece and load in parallel, while app code
    // stays at ~40 kB.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@pixi/3d')) return 'pixi-3d';
          if (id.includes('node_modules/@pixi') || id.includes('node_modules/pixi.js')) return 'pixi-core';
          return undefined;
        },
      },
    },
  },
});
