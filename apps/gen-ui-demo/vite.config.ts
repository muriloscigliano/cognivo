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
});
