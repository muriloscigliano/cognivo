import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3456,
    open: true,
    fs: {
      // Allow serving files from the monorepo root (for token CSS)
      allow: [resolve(__dirname, '../..')],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'gen-ui': resolve(__dirname, 'gen-ui.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
      },
    },
  },
});
