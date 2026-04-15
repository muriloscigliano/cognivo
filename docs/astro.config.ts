import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import type { Plugin } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

// Resolve @cognivo/components to its TypeScript SOURCE instead of the
// built dist/. This makes Vite watch the source files directly so any
// edit triggers an immediate rebuild — no manual refresh and no separate
// watch process needed.
const componentsSrc = resolve(repoRoot, 'packages/components/src/index.ts');
const componentsSrcDir = resolve(repoRoot, 'packages/components/src');

/**
 * Web Components have one inherent constraint: customElements.define()
 * can only run once per tag name. Vite's normal HMR tries to patch
 * modules in place — but a re-imported component module will throw
 * "already defined" or simply do nothing visible.
 *
 * This plugin attaches Vite's existing chokidar watcher to the entire
 * components/src tree (not just modules already in the graph) and
 * forces a full browser page reload on any change. This clears the
 * custom elements registry and re-registers fresh classes on reload.
 */
function cognivoComponentReload(): Plugin {
  return {
    name: 'cognivo-component-full-reload',
    enforce: 'post',
    configureServer(server) {
      // Add the entire components src dir to Vite's chokidar watcher,
      // not just the files that happen to be in the module graph.
      server.watcher.add(componentsSrcDir);
      server.config.logger.info(
        `[cognivo] watching components src for full-reload: ${componentsSrcDir}`,
      );

      const onChange = (file: string) => {
        if (file.startsWith(componentsSrcDir) && /\.(ts|js|css)$/.test(file)) {
          const rel = file.slice(componentsSrcDir.length + 1);
          server.config.logger.info(
            `\x1b[36m[cognivo]\x1b[0m component changed → full reload: ${rel}`,
          );
          server.ws.send({ type: 'full-reload', path: '*' });
        }
      };

      server.watcher.on('change', onChange);
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
    },
    // Belt-and-suspenders: also intercept HMR for any component file
    // that DID make it into the graph.
    handleHotUpdate({ file, server }) {
      if (file.startsWith(componentsSrcDir)) {
        server.ws.send({ type: 'full-reload', path: '*' });
        return [];
      }
      return undefined;
    },
  };
}

export default defineConfig({
  site: 'https://cognivo.dev',
  outDir: './dist',
  vite: {
    plugins: [cognivoComponentReload()],
    resolve: {
      alias: [
        // Match the bare specifier exactly; subpath imports like
        // '@cognivo/tokens/dist/index.css' are unaffected.
        { find: /^@cognivo\/components$/, replacement: componentsSrc },
      ],
    },
    server: {
      fs: {
        // Allow Vite to read files outside the docs/ dir (the workspace root)
        allow: [repoRoot],
      },
      watch: {
        // Explicitly watch the components source tree (Vite ignores
        // anything outside the project root by default).
        ignored: ['!**/packages/components/src/**'],
      },
    },
    // Don't pre-bundle the components package — we want Vite to process
    // each source file individually so the watch + reload plugin works.
    optimizeDeps: {
      exclude: ['@cognivo/components'],
    },
  },
});
