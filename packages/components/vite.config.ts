import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, existsSync, statSync } from 'node:fs';
import dts from 'vite-plugin-dts';

const componentsDir = resolve(__dirname, 'src/components');

/**
 * Build per-component entries so consumers can import
 * `@cognivo/components/cg-button` and pull in just that chunk.
 *
 * Each entry is keyed as `components/<name>/<name>` so the emitted file lands
 * at `dist/components/<name>/<name>.js`, matching the `./*` export wildcard in
 * package.json (which resolves `@cognivo/components/cg-button` →
 * `./dist/components/cg-button/cg-button.js`).
 */
function collectComponentEntries(): Record<string, string> {
  if (!existsSync(componentsDir)) return {};
  const entries: Record<string, string> = {};
  for (const dir of readdirSync(componentsDir)) {
    const full = resolve(componentsDir, dir);
    if (!statSync(full).isDirectory()) continue;
    const file = resolve(full, `${dir}.ts`);
    if (!existsSync(file)) continue;
    entries[`components/${dir}/${dir}`] = file;
  }
  return entries;
}

const componentEntries = collectComponentEntries();

export default defineConfig(({ mode }) => {
  // The legacy IIFE build (single `cognivo.min.js`) is kept as a separate mode
  // so it can be invoked with `vite build --mode iife` if ever needed for a
  // CDN-friendly drop-in bundle. The default build emits per-component ES
  // chunks alongside the barrel.
  if (mode === 'iife') {
    return {
      build: {
        emptyOutDir: false,
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'Cognivo',
          formats: ['iife'],
          fileName: () => 'cognivo.min.js',
        },
        sourcemap: true,
        target: 'es2020',
      },
    };
  }

  return {
    plugins: [
      dts({
        insertTypesEntry: true,
        // Don't roll up types — we want one .d.ts per component entry so that
        // `@cognivo/components/cg-button` resolves to its own type file.
        rollupTypes: false,
        exclude: ['**/__tests__/**', '**/*.test.ts'],
      }),
    ],
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, 'src/index.ts'),
          // Layered barrels so apps can opt into only the foundation (cg-*),
          // only the AI layer (ai-*), or only the behavioral primitives (bias-*)
          // instead of the full 182.
          foundation: resolve(__dirname, 'src/foundation.ts'),
          ai: resolve(__dirname, 'src/ai.ts'),
          bias: resolve(__dirname, 'src/bias.ts'),
          // On-demand custom-element registration helper (tree-shakable).
          lazy: resolve(__dirname, 'src/lazy.ts'),
          ...componentEntries,
        },
        formats: ['es'],
      },
      rollupOptions: {
        // Keep Lit external so per-component chunks stay small and consumers
        // dedupe a single Lit instance across the app. The full barrel
        // (`index.js`) also benefits — no Lit duplication inside the bundle.
        external: [/^lit($|\/)/, /^@cognivo\//],
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          preserveModules: false,
        },
      },
      sourcemap: true,
      target: 'es2020',
    },
  };
});
