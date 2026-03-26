import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CognivoOpenAI',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      // Bundle openai for browser, but keep @cognivo/core external
      external: ['@cognivo/core'],
    },
    sourcemap: true,
    minify: false,
    target: 'es2022',
  },
});
