// @vitest-environment node
/**
 * cg-table `truncate` columns in real Chromium with the real tokens: one line
 * with an ellipsis inside the table's width, the full text on hover (title)
 * and complete in the accessibility tree.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const LONG = 'Globex Corporation — renewal of the enterprise plan with three regional add-ons and a migration package';

async function table(columns: unknown[], rows: unknown[][], body = '<div style="width: 420px"><cg-table></cg-table></div>'): Promise<Page> {
  const page = await openPage(['cg-table'], body);
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate(({ columns, rows }) => Object.assign(document.querySelector('cg-table')!, { columns, rows }), { columns, rows });
  await settle(page);
  return page;
}

const truncated = (page: Page) =>
  page.evaluate(() => {
    const t = document.querySelector('cg-table')!.shadowRoot!;
    const scroll = t.querySelector('.table-scroll')!;
    const cell = t.querySelector('tbody tr > :first-child') as HTMLElement;
    const inner = cell.querySelector('.cell-truncate') as HTMLElement | null;
    const box = inner ?? cell;
    const cs = getComputedStyle(box);
    return {
      tableFits: scroll.scrollWidth <= scroll.clientWidth,
      oneLine: box.getBoundingClientRect().height < parseFloat(cs.fontSize) * 2,
      clipped: box.scrollWidth > box.clientWidth,
      ellipsis: cs.textOverflow,
      title: box.title || cell.title,
    };
  });

describe.skipIf(!browserAvailable)('cg-table truncate column (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('a long value stays on one line with an ellipsis, inside the table width, and the full text is the title', async () => {
    const page = await table(
      [{ key: 'deal', label: 'Deal', truncate: true }, { key: 'amount', label: 'Amount', align: 'right' }],
      [[LONG, 1200]],
    );
    expect(await truncated(page)).toEqual({ tableFits: true, oneLine: true, clipped: true, ellipsis: 'ellipsis', title: LONG });
    // The whole text stays in the accessibility tree (truncation is visual).
    await expect(page.getByRole('cell', { name: LONG }).count()).resolves.toBe(1);
    await page.close();
  });

  it('works for a row-header column, and the title follows the value', async () => {
    const page = await table([{ key: 'deal', label: 'Deal', truncate: true, rowHeader: true }, { key: 'amount', label: 'Amount' }], [[LONG, 1]]);
    expect((await truncated(page)).ellipsis).toBe('ellipsis');
    await expect(page.getByRole('rowheader', { name: LONG }).count()).resolves.toBe(1);
    await page.evaluate(() => { (document.querySelector('cg-table') as HTMLElement & { rows: unknown[][] }).rows = [['Initech', 1]]; });
    await settle(page);
    expect((await truncated(page)).title).toBe('Initech');
    await page.close();
  });

  it('a slotted cell (a link) is truncated too and titled with its text', async () => {
    const page = await table(
      [{ key: 'deal', label: 'Deal', truncate: true, slotted: true }, { key: 'amount', label: 'Amount' }],
      [['', 5]],
      `<div style="width: 420px"><cg-table><a slot="cell-0-deal" href="#d">${LONG}</a></cg-table></div>`,
    );
    const r = await truncated(page);
    expect(r.tableFits).toBe(true);
    expect(r.title).toBe(LONG);
    await page.close();
  });

  it('without truncate, long text wraps (unchanged)', async () => {
    const page = await table([{ key: 'deal', label: 'Deal' }, { key: 'amount', label: 'Amount' }], [[LONG, 1]]);
    expect((await truncated(page)).oneLine).toBe(false);
    await page.close();
  });
});
