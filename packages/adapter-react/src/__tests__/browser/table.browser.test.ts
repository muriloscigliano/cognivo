// @vitest-environment node
/**
 * CgTable under real React + react-dom in Chromium: the element connects and
 * renders, a rich-cell child (`slot="cell-{rowIndex}-{key}"`) shows in its own
 * cell and moves with its row, and a real header click reaches `onSortChange`
 * (a controlled sort held in React state).
 *
 * Bundles the adapter SOURCE with React and the built `@cognivo/components`
 * (turbo builds dependencies before `test`). Locally the suite skips when
 * Playwright Chromium is missing; in CI that is an error.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import { chromium, type Browser, type Page } from '@playwright/test';

const installed = (() => {
  try {
    return existsSync(chromium.executablePath());
  } catch {
    return false;
  }
})();
const ci = process.env.CI && process.env.CI !== 'false' && process.env.CI !== '0';
if (!installed && ci) {
  throw new Error('Browser tests need Playwright Chromium in CI: run `pnpm exec playwright install --with-deps chromium`.');
}

const APP = `
import { createElement as h, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@cognivo/components/cg-table';
import '@cognivo/components/cg-checkbox';
import '@cognivo/components/cg-icon';
import { CgTable } from './index.ts';

const columns = [
  { key: 'company', label: 'Company', sortable: true, rowHeader: true, slotted: true },
  { key: 'amount', label: 'Amount', sortable: true },
];
const rows = [['Acme', 300], ['Globex', 1200], ['Initech', 50]];
window.__asked = [];

function App() {
  const [sort, setSort] = useState(null);
  return h('div', null,
    h('h2', { id: 'deals-h' }, 'Pipeline'),
    h(CgTable, {
      labelledby: 'deals-h', columns, rows, sort,
      onSortChange: (e) => { window.__asked.push(e.detail); setSort(e.detail); },
    }, rows.map(([name], i) => h('a', { key: name, slot: 'cell-' + i + '-company', href: '#' + name.toLowerCase() }, name))),
  );
}
createRoot(document.getElementById('root')).render(h(App));
`;

let browser: Browser | undefined;

async function openApp(): Promise<Page> {
  const out = await build({
    stdin: { contents: APP, resolveDir: resolve(__dirname, '..', '..'), loader: 'ts' },
    bundle: true,
    format: 'esm',
    write: false,
    target: 'es2022',
    define: { 'process.env.NODE_ENV': '"development"' },
    logLevel: 'silent',
  });
  browser ??= await chromium.launch();
  const page = await (await browser.newContext()).newPage();
  await page.setContent('<!doctype html><html lang="en"><head><title>t</title></head><body><div id="root"></div></body></html>');
  await page.addScriptTag({ type: 'module', content: out.outputFiles[0]!.text });
  await page.waitForFunction(() => {
    const t = document.querySelector('cg-table') as (HTMLElement & { updateComplete?: Promise<unknown> }) | null;
    return !!t?.shadowRoot?.querySelector('tbody tr');
  });
  return page;
}

/** Each displayed row: its row-header text, the slotted link shown there, and the amount. */
const displayed = (page: Page) =>
  page.evaluate(() => {
    const table = document.querySelector('cg-table')!;
    return [...table.shadowRoot!.querySelectorAll('tbody tr')].map((tr) => {
      const slot = tr.querySelector('th slot') as HTMLSlotElement;
      const link = slot.assignedElements()[0] as HTMLAnchorElement | undefined;
      return { link: link?.getAttribute('href'), linkText: link?.textContent, amount: tr.querySelector('td:last-child')!.textContent!.trim() };
    });
  });

describe.skipIf(!installed)('CgTable in React (real browser)', { timeout: 30_000 }, () => {
  afterAll(async () => { await browser?.close(); });

  it('slotted links render in their cells; a header click calls onSortChange and the controlled sort reorders rows with their links', async () => {
    const page = await openApp();
    await expect(page.getByRole('table', { name: 'Pipeline' }).count()).resolves.toBe(1);
    // The React child shows (a visible, named link) and names its row header.
    await expect(page.getByRole('link', { name: 'Globex' }).isVisible()).resolves.toBe(true);
    await expect(page.getByRole('rowheader', { name: 'Globex' }).count()).resolves.toBe(1);
    // ...assigned to the slot in its own row's header cell:
    expect(await displayed(page)).toEqual([
      { link: '#acme', linkText: 'Acme', amount: '300' },
      { link: '#globex', linkText: 'Globex', amount: '1200' },
      { link: '#initech', linkText: 'Initech', amount: '50' },
    ]);

    await page.getByRole('button', { name: 'Amount' }).click();
    // React re-renders with the new sort, then the element updates: wait for it.
    await expect.poll(() => page.getByRole('columnheader', { name: 'Amount' }).getAttribute('aria-sort')).toBe('ascending');
    expect(await page.evaluate(() => (window as unknown as { __asked: unknown[] }).__asked)).toEqual([{ key: 'amount', direction: 'asc' }]);
    expect(await displayed(page)).toEqual([
      { link: '#initech', linkText: 'Initech', amount: '50' },
      { link: '#acme', linkText: 'Acme', amount: '300' },
      { link: '#globex', linkText: 'Globex', amount: '1200' },
    ]);
    await page.close();
  });
});
