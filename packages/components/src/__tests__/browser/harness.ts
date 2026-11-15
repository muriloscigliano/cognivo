/**
 * Real-browser harness for behaviour happy-dom cannot model: ElementInternals
 * (form association, FormData, validity), implicit form submission, `inert`,
 * the accessibility tree and axe-core.
 *
 * Bundles component SOURCES with esbuild (same decorators/tsconfig as the
 * build), loads them into a blank Chromium page via Playwright, and hands the
 * page to the test. Suites skip (not fail) when no Playwright Chromium is
 * installed — run `npx playwright install chromium` to enable them.
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import { chromium, type Browser, type Page } from '@playwright/test';

const SRC = resolve(__dirname, '..', '..');

export const browserAvailable = (() => {
  try {
    return existsSync(chromium.executablePath());
  } catch {
    return false;
  }
})();

const bundleCache = new Map<string, string>();

/** Bundle `src/components/<tag>/<tag>.ts` for each tag (plus Lit) into one ES module string. */
export async function bundleComponents(tags: string[]): Promise<string> {
  const key = tags.join(',');
  const cached = bundleCache.get(key);
  if (cached) return cached;
  const contents = tags.map((t) => `import './components/${t}/${t}.ts';`).join('\n');
  const out = await build({
    stdin: { contents, resolveDir: SRC, loader: 'ts' },
    bundle: true,
    format: 'esm',
    write: false,
    target: 'es2022',
    tsconfig: resolve(SRC, '..', 'tsconfig.json'),
    logLevel: 'silent',
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
export async function openPage(tags: string[], body: string): Promise<Page> {
  const b = await launch();
  const page = await b.newPage();
  const code = await bundleComponents(tags);
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
