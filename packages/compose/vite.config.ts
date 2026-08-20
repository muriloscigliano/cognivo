import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CognivoCompose',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['zod', '@cognivo/gen-ui'],
    },
    sourcemap: true,
    minify: false,
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['**/__tests__/**'],
    }),
  ],
});
