// @vitest-environment node
/**
 * Issues from the dashboard: (1) cg-table always drew its body as an inset
 * bordered card inside the outer card (a second frame, side borders and
 * rounded inner corners), with no flat-rows option; (2) when the table was
 * wider than its box, its own scroll container could not take focus, so a
 * keyboard user could not scroll it (axe `scrollable-region-focusable`).
 * Now `variant="plain"` draws flat rows separated by full-width hairlines,
 * and an overflowing scroll box is a focusable, named region.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const COLUMNS = ['E-mail', 'Name', 'Source', 'Status', 'Signed up', 'Campaign'].map((label, i) => ({ key: `c${i}`, label, rowHeader: i === 0 }));
const ROWS = [
  ['ana@example.com', 'Ana Souza', 'Instagram', 'Subscribed', '2026-11-02', 'Launch'],
  ['bia@example.com', 'Bia Lima', 'Site', 'Bought', '2026-11-03', 'Launch'],
];

async function table(width: string, attrs = ''): Promise<Page> {
  const page = await openPage(['cg-table'], `<div id="box" style="width:${width}"><cg-table label="Contacts" ${attrs}></cg-table></div>`);
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.addStyleTag({ content: 'body { margin: 0; }' });
  await page.evaluate(({ columns, rows }) => Object.assign(document.querySelector('cg-table')!, { columns, rows }), { columns: COLUMNS, rows: ROWS });
  await settleStyles(page);
  return page;
}

const scrollBox = (page: Page) =>
  page.evaluate(() => {
    const box = document.querySelector('cg-table')!.shadowRoot!.querySelector('.table-scroll')!;
    return { tabindex: box.getAttribute('tabindex'), role: box.getAttribute('role'), label: box.getAttribute('aria-label') };
  });

describe.skipIf(!browserAvailable)('cg-table plain variant and scroll box (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('variant="plain": flat rows — no inset fill, side borders or inner radius; rows span the card', async () => {
    const page = await table('900px', 'variant="plain"');
    const r = await page.evaluate(() => {
      const root = document.querySelector('cg-table')!.shadowRoot!;
      const cell = getComputedStyle(root.querySelector('tbody tr:first-child > :first-child')!);
      const last = getComputedStyle(root.querySelector('tbody tr:last-child > :first-child')!);
      const wrapper = root.querySelector('.table-wrapper')!.getBoundingClientRect();
      const tbl = root.querySelector('table')!.getBoundingClientRect();
      return {
        tbody: getComputedStyle(root.querySelector('tbody')!).backgroundColor,
        left: cell.borderLeftWidth, radius: cell.borderTopLeftRadius,
        lastBottom: last.borderBottomWidth,
        divider: cell.borderBottomWidth,
        gap: wrapper.width - tbl.width,
      };
    });
    expect(r.tbody).toBe('rgba(0, 0, 0, 0)');
    expect(r.left).toBe('0px');
    expect(r.radius).toBe('0px');
    expect(r.divider).not.toBe('0px'); // rows are still separated by a hairline
    expect(r.lastBottom).toBe('0px'); // the card's own border closes the last row
    expect(r.gap).toBeLessThanOrEqual(2); // only the card's border
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('the default variant keeps the inset body', async () => {
    const page = await table('900px');
    const left = await page.evaluate(() =>
      getComputedStyle(document.querySelector('cg-table')!.shadowRoot!.querySelector('tbody tr:first-child > :first-child')!).borderLeftWidth);
    expect(left).not.toBe('0px');
    await page.close();
  });

  it('an overflowing table: the scroll box is a focusable region named after the table, and passes axe', async () => {
    const page = await table('240px', 'variant="plain"');
    expect(await scrollBox(page)).toEqual({ tabindex: '0', role: 'region', label: 'Contacts' });
    expect(await axeViolations(page)).toEqual([]);
    // Keyboard scrolls it.
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.querySelector('cg-table')!.shadowRoot!.activeElement?.className)).toBe('table-scroll');
    await page.keyboard.press('ArrowRight');
    // Scrolling may be smooth: wait for it rather than read it at once.
    await page.waitForFunction(() => document.querySelector('cg-table')!.shadowRoot!.querySelector('.table-scroll')!.scrollLeft > 0, undefined, { timeout: 5000 });
    await page.close();
  });

  it('a table that fits is not a tab stop; it becomes one when its box shrinks', async () => {
    const page = await table('1200px');
    expect((await scrollBox(page)).tabindex).toBeNull();
    await page.evaluate(() => { document.getElementById('box')!.style.width = '240px'; });
    await page.waitForFunction(() => document.querySelector('cg-table')!.shadowRoot!.querySelector('.table-scroll')!.getAttribute('tabindex') === '0');
    await page.close();
  });
});
