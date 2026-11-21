import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // PixiJS is intentionally split into two cacheable vendor chunks (~540 kB
    // each). Planet configs are split separately so the app chunk stays <100 kB
    // while Terra and Dune ecological data remain available synchronously.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@pixi/3d')) return 'pixi-3d';
          if (id.includes('node_modules/@pixi') || id.includes('node_modules/pixi.js')) return 'pixi-core';
          if (id.includes('src/content/planets/')) return 'planet-configs';
          return undefined;
        },
      },
    },
  },
});
