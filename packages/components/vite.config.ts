import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // DON'T mark lit as external - bundle it so browser can use it!
      // external: ['lit'],  ← Removed this line
    },
    sourcemap: true,
    target: 'es2020',
  },
});
