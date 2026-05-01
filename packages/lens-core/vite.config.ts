import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'worker/worker-entry': resolve(__dirname, 'src/worker/worker-entry.ts'),
        'fixtures/index': resolve(__dirname, 'src/fixtures/index.ts'),
        'agent/index': resolve(__dirname, 'src/agent/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // Externalize the @cognivo/* peer deps so lens-core's bundle stays
      // independent of token-pack updates (consumers pin tokens separately).
      external: (id) => id === '@cognivo/core' || id === 'zod' || id.startsWith('@cognivo/tokens'),
      output: { preserveModules: false },
    },
    sourcemap: true,
    minify: false,
    target: 'es2022',
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['**/*.test.ts', '**/__tests__/**'],
      rollupTypes: false,
    }),
  ],
});
