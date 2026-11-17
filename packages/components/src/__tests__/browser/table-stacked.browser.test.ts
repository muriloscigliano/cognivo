/**
 * Issue (review of the stacked phone rows): a `stack: 'hidden'` cell was
 * `display: none`, so it left the accessibility tree and every cell after it
 * was announced under the previous column's header ("Version: Active").
 * And the header row is clipped to 1 px when stacked, so its sort buttons and
 * select-all checkbox were invisible — sorting and select-all were lost.
 *
 * Checked in Chromium's accessibility tree (CDP): every body cell sits under
 * its own column header; stacked tables show a visible sort select and a
 * visible select-all above the rows, and nothing in the clipped header row is
 * a tab stop.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

const COLUMNS = [
  { key: 'name', label: 'Name', rowHeader: true, sortable: true },
  { key: 'email', label: 'E-mail', sortable: true },
  { key: 'version', label: 'Version', align: 'right', stack: 'hidden' },
  { key: 'status', label: 'Status', stack: 'end' },
];
const ROWS = [
  ['Comeback hello', 'b@example.com', '1', 'Active'],
  ['Course welcome', 'c@example.com', '3', 'Paused'],
  ['Launch day', 'a@example.com', '2', 'Draft'],
];

async function table(attrs: string): Promise<Page> {
  const page = await openPage(['cg-table', 'cg-checkbox'], `<div id="box" style="width:390px"><cg-table id="t" label="E-mails" stack-below="768" ${attrs}></cg-table></div>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate(([columns, rows]) => {
    const t = document.getElementById('t') as HTMLElement & { columns: unknown; rows: unknown };
    t.columns = columns;
    t.rows = rows;
  }, [COLUMNS, ROWS] as const);
  await page.waitForFunction(() => document.getElementById('t')!.hasAttribute('stacked'));
  await settleStyles(page);
  return page;
}

interface AXNode { nodeId: string; ignored?: boolean; role?: { value: string }; name?: { value: string }; childIds?: string[] }

/** For each body row of the accessibility tree: [column header name, cell name] per cell. */
async function headerOfEachCell(page: Page): Promise<string[][][]> {
  const cdp = await page.context().newCDPSession(page);
  const { nodes } = (await cdp.send('Accessibility.getFullAXTree')) as { nodes: AXNode[] };
  const byId = new Map(nodes.map((n) => [n.nodeId, n]));
  const role = (n: AXNode) => n.role?.value ?? '';
  const kids = (n: AXNode): AXNode[] => (n.childIds ?? []).map((id) => byId.get(id)!).filter(Boolean).flatMap((c) => (c.ignored || role(c) === 'generic' || role(c) === 'none' ? kids(c) : [c]));
  const cells = (r: AXNode) => kids(r).filter((c) => ['cell', 'gridcell', 'rowheader', 'columnheader'].includes(role(c)));
  const rows = nodes.filter((n) => !n.ignored && role(n) === 'row');
  const [head, ...body] = rows;
  const headers = cells(head!).map((c) => c.name?.value ?? '');
  return body.map((r) => cells(r).map((c, i) => [headers[i] ?? '(no header)', c.name?.value ?? '']));
}

describe.skipIf(!browserAvailable)('cg-table stacked rows (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('every cell keeps its own column header in the accessibility tree, hidden-in-stack cells included', async () => {
    const page = await table('');
    expect(await headerOfEachCell(page)).toEqual(ROWS.map((r) => [
      ['Name', r[0]], ['E-mail', r[1]], ['Version', r[2]], ['Status', r[3]],
    ]));
    // Still out of sight: the hidden column is a clipped 1 px box in the stacked row.
    const box = await page.evaluate(() => {
      const td = document.getElementById('t')!.shadowRoot!.querySelectorAll('tbody tr:first-child > *')[2]!;
      const b = td.getBoundingClientRect();
      return b.width * b.height;
    });
    expect(box).toBeLessThanOrEqual(2);
    await page.close();
  });

  it('a visible sort select and select-all above the stack; nothing in the clipped header row is a tab stop', async () => {
    const page = await table('selectable');
    const sort = page.getByRole('combobox', { name: 'Sort by' });
    const all = page.getByRole('checkbox', { name: 'Select all rows' });
    await expect(sort.count()).resolves.toBe(1);
    await expect(all.count()).resolves.toBe(1);
    for (const l of [sort, all]) expect((await l.boundingBox())!.width).toBeGreaterThan(16);

    // Tab through the whole table: focus never lands inside the clipped header row.
    const inHead: string[] = [];
    const visited: string[] = [];
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      const where = await page.evaluate(() => {
        let a: Element | null = document.activeElement;
        while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
        const host = document.activeElement;
        const inT = host?.id === 't' || !!host?.closest('#t');
        return { tag: a?.tagName.toLowerCase() ?? '', head: inT && !!a?.closest('thead'), label: a?.getAttribute('aria-label') ?? '' };
      });
      visited.push(where.tag + (where.label ? `:${where.label}` : ''));
      if (where.head) inHead.push(where.tag);
    }
    expect(inHead).toEqual([]);
    expect(visited.some((v) => v === 'select')).toBe(true);

    // The sort select sorts (and asks with cg-sort-change).
    await page.evaluate(() => {
      const t = document.getElementById('t')!;
      (window as unknown as { asked: unknown[] }).asked = [];
      t.addEventListener('cg-sort-change', (e) => (window as unknown as { asked: unknown[] }).asked.push((e as CustomEvent).detail));
    });
    await sort.selectOption({ label: 'E-mail, descending' });
    await settleStyles(page);
    expect(await page.evaluate(() => (window as unknown as { asked: unknown[] }).asked)).toEqual([{ key: 'email', direction: 'desc' }]);
    const firstTitles = await page.evaluate(() => Array.from(document.getElementById('t')!.shadowRoot!.querySelectorAll('tbody tr > :is(th,td):nth-child(2)'), (c) => c.textContent!.trim()));
    expect(firstTitles).toEqual(['Course welcome', 'Comeback hello', 'Launch day']);

    // The visible select-all selects every row.
    await all.click();
    await settleStyles(page);
    expect(await page.evaluate(() => document.getElementById('t')!.shadowRoot!.querySelectorAll('tbody tr.selected').length)).toBe(3);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });
});
