import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'ai-thinking-indicator': resolve(__dirname, 'src/components/ai-thinking-indicator/index.ts'),
        'ai-confidence-badge': resolve(__dirname, 'src/components/ai-confidence-badge/index.ts'),
        'ai-insight-card': resolve(__dirname, 'src/components/ai-insight-card/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['lit', '@cognivo/core', '@cognivo/tokens'],
      output: {
        preserveModules: false,
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2022',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
