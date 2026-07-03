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
  hot?: { send(event: string, data?: unknown): void };
  ws?: { send(event: string, data?: unknown): void };
  watcher: { add(p: string): void; on(e: string, cb: (file: string) => void): void };
  config: { logger: { info(msg: string): void } };
};

/**
 * Emit our DEDICATED reload event. We do NOT use Vite's built-in
 * `{ type: 'full-reload' }` because:
 *   1. With `path: '*'` it routes through Astro 7's server-module reload
 *      pipeline and fails on the `astro:server-app.js` virtual module.
 *   2. Even pathless, Astro's <ClientRouter> (View Transitions) intercepts a
 *      full-reload as a SOFT swap — the JS realm survives, so a re-imported
 *      component's customElements.define() no-ops and the page stays stale.
 * The client (BaseLayout) listens for `cognivo:reload` and does a TRUE
 * location.reload(), tearing down the realm so fresh classes re-register.
 */
function pushReload(server: ViteServerLike): void {
  (server.hot ?? server.ws)?.send('cognivo:reload');
}

/**
 * Web Components register once per tag per JS realm via customElements.define().
 * This plugin watches the components/src tree and — on any change — tells the
 * client to hard-reload, clearing the registry so the edited component actually
 * re-renders. No manual refresh needed.
 *
 * Driven from a SINGLE source (the chokidar watcher); no `hotUpdate` hook, which
 * under Astro 7 double-fired and surfaced the `astro:server-app.js` error.
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
        `[cognivo] watching components src for hard-reload: ${componentsSrcDir}`,
      );

      const onChange = (file: string) => {
        if (file.startsWith(componentsSrcDir) && /\.(ts|js|css)$/.test(file)) {
          const rel = file.slice(componentsSrcDir.length + 1);
          server.config.logger.info(
            `\x1b[36m[cognivo]\x1b[0m component changed → hard reload: ${rel}`,
          );
          pushReload(server);
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
