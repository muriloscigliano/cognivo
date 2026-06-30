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

// Minimal shape of the Vite dev server we use. `hot` is the unified channel
// added in Vite 6 (environment-aware); `ws` is the back-compat alias. Either
// works for a full-reload push, so we target whichever the running Vite exposes.
type ViteServerLike = {
  hot?: { send(payload: unknown): void };
  ws?: { send(payload: unknown): void };
  watcher: { add(p: string): void; on(e: string, cb: (file: string) => void): void };
  config: { logger: { info(msg: string): void } };
};

/** Push a full browser reload through whichever channel this Vite version has. */
function fullReload(server: ViteServerLike): void {
  (server.hot ?? server.ws)?.send({ type: 'full-reload', path: '*' });
}

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
    // Belt-and-suspenders: also intercept HMR for any component file that DID
    // make it into the graph. Vite 6+ renamed `handleHotUpdate` → `hotUpdate`
    // (environment-scoped); we keep both so the reload fires on Vite 5/6/7/8.
    hotUpdate(ctx: { file: string }) {
      if (ctx.file.startsWith(componentsSrcDir)) {
        this.environment.hot.send({ type: 'full-reload', path: '*' });
        return [];
      }
      return undefined;
    },
    handleHotUpdate(ctx: { file: string; server: ViteServerLike }) {
      if (ctx.file.startsWith(componentsSrcDir)) {
        fullReload(ctx.server);
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
