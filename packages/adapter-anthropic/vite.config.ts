import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CognivoAnthropic',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['@anthropic-ai/sdk', '@cognivo/core'],
    },
    sourcemap: true,
    minify: false,
    target: 'es2022',
  },
});
