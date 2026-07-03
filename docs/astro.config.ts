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

// Minimal shape of the Vite dev server we use.
type ViteServerLike = {
  hot?: { send(payload: { type: 'full-reload' }): void };
  ws?: { send(payload: { type: 'full-reload' }): void };
  watcher: { add(p: string): void; on(e: string, cb: (file: string) => void): void };
  config: { logger: { info(msg: string): void } };
};

/**
 * Push a plain full browser reload. IMPORTANT: send `{ type: 'full-reload' }`
 * WITHOUT `path`. Under Astro 7 / Vite 8, a `full-reload` carrying `path: '*'`
 * is routed through Astro's server-module reload pipeline, which then fails
 * to resolve the `astro:server-app.js` virtual module — the reload errors out
 * and the browser silently keeps the stale page (the "I must refresh manually"
 * bug). A pathless full-reload is a pure client page reload and sidesteps that.
 */
function fullReload(server: ViteServerLike): void {
  (server.hot ?? server.ws)?.send({ type: 'full-reload' });
}

/**
 * Web Components have one inherent constraint: customElements.define()
 * can only run once per tag name. Vite's normal HMR tries to patch
 * modules in place — but a re-imported component module will throw
 * "already defined" or simply do nothing visible.
 *
 * This plugin watches the components/src tree and forces a full browser page
 * reload on any change, so the custom-elements registry is cleared and fresh
 * classes re-register on reload — no manual refresh needed.
 *
 * We drive the reload from a SINGLE source (the chokidar watcher) and do NOT
 * also short-circuit `hotUpdate`. Firing from both places under Astro 7 caused
 * a reload storm that surfaced the `astro:server-app.js` load error.
 */
function cognivoComponentReload(): Plugin {
  return {
    name: 'cognivo-component-full-reload',
    enforce: 'post',
    configureServer(server: ViteServerLike) {
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
          fullReload(server);
        }
      };

      server.watcher.on('change', onChange);
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
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
