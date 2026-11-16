/**
 * Real-browser harness for behaviour happy-dom cannot model: ElementInternals
 * (form association, FormData, validity), implicit form submission, `inert`,
 * the accessibility tree and axe-core.
 *
 * Bundles component SOURCES with esbuild (same decorators/tsconfig as the
 * build), loads them into a blank Chromium page via Playwright, and hands the
 * page to the test. Locally, suites skip when no Playwright Chromium is
 * installed — run `pnpm exec playwright install chromium` to enable them. In
 * CI (`CI` set) a missing Chromium is an error, so the suites can never be
 * skipped silently there.
 */
import { existsSync, readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import { chromium, type Browser, type Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
// @ts-expect-error -- plain ES module shared with the library build (vite.config.ts)
import { hoverOnlyWhereHoverInSource } from '../../../scripts/hover-media.mjs';

const SRC = resolve(__dirname, '..', '..');

/**
 * Whether the browser suites run. `true` when Chromium is installed; `false`
 * (skip) when it is missing locally; throws when it is missing in CI.
 */
export function browserGate(env: Record<string, string | undefined>, installed: boolean): boolean {
  if (installed) return true;
  const ci = env.CI;
  if (ci && ci !== 'false' && ci !== '0') {
    throw new Error(
      'Browser test suites need Playwright Chromium in CI, and it is not installed. ' +
        'Add `pnpm exec playwright install --with-deps chromium` before the test step.',
    );
  }
  return false;
}

export const browserAvailable = browserGate(
  process.env,
  (() => {
    try {
      return existsSync(chromium.executablePath());
    } catch {
      return false;
    }
  })(),
);

const bundleCache = new Map<string, string>();

/**
 * Bundle `src/components/<tag>/<tag>.ts` for each tag (plus Lit) into one ES
 * module string. `modules` (src-relative paths) are bundled too and their
 * exports merged onto `window.__cg` for the test to call.
 */
export async function bundleComponents(tags: string[], modules: string[] = []): Promise<string> {
  const key = [...tags, ...modules].join(',');
  const cached = bundleCache.get(key);
  if (cached) return cached;
  const contents = [
    ...tags.map((t) => `import './components/${t}/${t}.ts';`),
    ...modules.map((m, i) => `import * as m${i} from './${m}'; window.__cg = Object.assign(window.__cg || {}, m${i});`),
  ].join('\n');
  const out = await build({
    stdin: { contents, resolveDir: SRC, loader: 'ts' },
    bundle: true,
    format: 'esm',
    write: false,
    target: 'es2022',
    tsconfig: resolve(SRC, '..', 'tsconfig.json'),
    define: { __COGNIVO_VERSION__: JSON.stringify((JSON.parse(readFileSync(resolve(SRC, '..', 'package.json'), 'utf8')) as { version: string }).version) },
    logLevel: 'silent',
    // The same `:hover` → `@media (hover:hover)` transform as the library build.
    plugins: [{
      name: 'cognivo-hover-media',
      setup(b) {
        b.onLoad({ filter: /\/src\/.*\.ts$/ }, async (args) =>
          args.path.includes('/__tests__/')
            ? undefined
            : { contents: hoverOnlyWhereHoverInSource(await readFile(args.path, 'utf8')) as string, loader: 'ts' as const });
      },
    }],
  });
  const code = out.outputFiles[0]!.text;
  bundleCache.set(key, code);
  return code;
}

let browser: Browser | undefined;

export async function launch(): Promise<Browser> {
  browser ??= await chromium.launch();
  return browser;
}

export async function closeBrowser(): Promise<void> {
  await browser?.close();
  browser = undefined;
}

/**
 * Open a page with `tags` registered, then set `body` as the document body.
 * Resolves once every requested element is defined and has rendered.
 */
export async function openPage(tags: string[], body: string, modules: string[] = []): Promise<Page> {
  const b = await launch();
  // A dedicated context per page (axe-core's AxeBuilder requires one).
  const context = await b.newContext();
  const page = await context.newPage(); // contexts close with the browser
  const code = await bundleComponents(tags, modules);
  await page.setContent(`<!doctype html><html lang="en"><head><title>t</title></head><body></body></html>`);
  await page.addScriptTag({ type: 'module', content: code });
  await page.evaluate(async ({ tags, body }) => {
    await Promise.all(tags.map((t) => customElements.whenDefined(t)));
    document.body.innerHTML = body;
    const all = Array.from(document.querySelectorAll('*')) as Array<Element & { updateComplete?: Promise<unknown> }>;
    await Promise.all(all.map((el) => el.updateComplete));
  }, { tags, body });
  return page;
}

/** Wait for every Lit element on the page (light DOM) to finish updating. */
export async function settle(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const all = Array.from(document.querySelectorAll('*')) as Array<Element & { updateComplete?: Promise<unknown> }>;
    await Promise.all(all.map((el) => el.updateComplete));
  });
}

/**
 * Wait until the page is visually at rest before reading computed styles:
 * Lit has rendered and every CSS transition / animation has finished
 * (`document.getAnimations()` → `.finished`), including the 0.01ms
 * reduced-motion ones and any started by another finishing. Reading after a
 * fixed delay is racy under load: a theme or state change can still be
 * mid-transition. Chromium also keeps a transition's start value for up to a
 * frame after a near-zero transition ends, so each round waits two frames
 * before asking which animations are still running.
 */
export async function settleStyles(page: Page): Promise<void> {
  await settle(page);
  await page.evaluate(async () => {
    const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)));
    let quiet = 0;
    for (let round = 0; round < 20; round++) {
      await frame();
      await frame();
      // Finite, running (or about-to-run) animations only: an infinite spinner never finishes.
      const running = document
        .getAnimations()
        .filter((a) => (a.playState === 'running' || a.pending) && a.effect?.getTiming().iterations !== Infinity);
      if (running.length === 0) {
        // Quiet twice in a row (a frame and a task apart) before trusting it:
        // under load a just-finished near-zero transition can still be applied.
        if (quiet++) return;
        await new Promise((r) => setTimeout(r, 16));
        continue;
      }
      quiet = 0;
      await Promise.all(running.map((a) => a.finished.catch(() => undefined)));
    }
  });
}

/**
 * axe-core violations as `"rule-id: target, target"` strings. Page-structure
 * rules (one h1, landmarks) are off: fixtures are component snippets, not pages.
 */
export async function axeViolations(page: Page): Promise<string[]> {
  const { violations } = await new AxeBuilder({ page })
    .disableRules(['page-has-heading-one', 'region', 'landmark-one-main'])
    .analyze();
  return violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}
