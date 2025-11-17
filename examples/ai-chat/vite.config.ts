import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@cognivo/components': path.resolve(__dirname, '../../packages/components/src/index.ts'),
      '@cognivo/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@cognivo/tokens': path.resolve(__dirname, '../../packages/tokens/dist/index.css'),
    },
  },
  optimizeDeps: {
    include: ['@cognivo/components', '@cognivo/core'],
  },
});
