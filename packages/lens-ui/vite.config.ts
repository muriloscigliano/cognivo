import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'cg-lens': resolve(__dirname, 'src/cg-lens.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) =>
        id.startsWith('@cognivo/') || id.startsWith('lit') || id.startsWith('@lit/'),
      output: {
        // Each component its own chunk so consumers can tree-shake the parts
        // they don't use (e.g. embedding only the toolbar).
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
