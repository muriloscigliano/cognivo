import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Cognivo',
      formats: ['es', 'iife'],
      fileName: (format) => format === 'iife' ? 'cognivo.min.js' : 'index.js',
    },
    rollupOptions: {
      // DON'T mark lit as external - bundle it so browser can use it!
      // external: ['lit'],  ← Removed this line
    },
    sourcemap: true,
    target: 'es2020',
  },
});
