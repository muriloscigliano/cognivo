import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: { index: resolve(__dirname, 'src/index.ts') },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['@cognivo/lens-core'],
      output: {
        // Preserve the source module shape so each rule ships as its own chunk.
        // Spec §3.1 promises one-chunk-per-rule: disabling a rule must remove
        // its code from the consumer's bundle, not just gate it at runtime.
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
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
