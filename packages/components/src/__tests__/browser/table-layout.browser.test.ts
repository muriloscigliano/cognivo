// @vitest-environment node
/**
 * Dashboard design audit, 2026-11-17 (P1-6, P1-7, P2-3, P2-4): tables came in
 * three rhythms (30 / 45 / 64 px rows), a table inside a card drew a third
 * frame, a wide table was cut mid-column with no hint that it scrolls (and
 * lost its row names when scrolled), and on a phone every table was clipped.
 *
 * Now, read in real Chromium:
 * - two densities: `density="list"` (default, 60 px rows) and
 *   `density="data"` (40 px rows at 13 px; `compact` is data); the header row
 *   is 36 px;
 * - `variant="flush"`: no outer border, background or radius (a table inside
 *   a card), hairlines between rows, edge cells aligned to the card padding;
 * - `sticky-first`: the first column stays put while the table scrolls
 *   sideways, on an opaque fill;
 * - a fade on each edge that has more table behind it;
 * - `stack-below="768"`: below that width each row is a stacked list row
 *   (title line, muted meta line, `stack: 'end'` column at the right,
 *   `stack: 'hidden'` columns visually hidden, still read), still a table to assistive tech.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

const COLUMNS = [
  { key: 'name', label: 'Name', rowHeader: true },
  { key: 'email', label: 'E-mail' },
  { key: 'changed', label: 'Last changed' },
  { key: 'version', label: 'Version', align: 'right', stack: 'hidden' },
  { key: 'status', label: 'Status', stack: 'end' },
];
const ROWS = [
  ['Comeback hello', 'comeback@example.com', 'Nov 20, 2026', '1', 'Active'],
  ['Course welcome', 'course@example.com', 'Nov 18, 2026', '3', 'Paused'],
  ['Launch day', 'launch@example.com', 'Nov 2, 2026', '2', 'Draft'],
];

async function table(attrs: string, width: string): Promise<Page> {
  const page = await openPage(['cg-table'], `<div id="box" style="width:${width}"><cg-table id="t" label="E-mails" ${attrs}></cg-table></div>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate(([columns, rows]) => {
    const t = document.getElementById('t') as HTMLElement & { columns: unknown; rows: unknown };
    t.columns = columns;
    t.rows = rows;
  }, [COLUMNS, ROWS] as const);
  await settleStyles(page);
  return page;
}

const rowHeights = (page: Page, part: 'thead' | 'tbody') =>
  page.evaluate((part) => Array.from(document.getElementById('t')!.shadowRoot!.querySelectorAll(`${part} tr`), (r) => r.getBoundingClientRect().height), part);

const alpha = (c: string) => { const m = /rgba\([^)]*,\s*([\d.]+)\)$/.exec(c); return m ? Number(m[1]) : 1; };

describe.skipIf(!browserAvailable)('cg-table layout (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('density: list rows are 60 px by default, data rows 40 px at 13 px (also via compact); the header row is 36 px', async () => {
    const page = await table('', '900px');
    expect(await rowHeights(page, 'tbody')).toEqual([60, 60, 60]);
    expect(await rowHeights(page, 'thead')).toEqual([36]);
    for (const attr of ['density', 'compact']) {
      await page.evaluate((attr) => { const t = document.getElementById('t')!; if (attr === 'density') t.setAttribute('density', 'data'); else { t.removeAttribute('density'); t.setAttribute('compact', ''); } }, attr);
      await settleStyles(page);
      expect(await rowHeights(page, 'tbody'), attr).toEqual([40, 40, 40]);
      expect(await rowHeights(page, 'thead'), attr).toEqual([36]);
      expect(await page.evaluate(() => getComputedStyle(document.getElementById('t')!.shadowRoot!.querySelector('tbody td')!).fontSize), attr).toBe('13px');
    }
    await page.close();
  });

  it('variant="flush": no outer border, fill or radius; hairlines between rows; edge cells flush with the card padding', async () => {
    const page = await table('variant="flush"', '900px');
    const r = await page.evaluate(() => {
      const root = document.getElementById('t')!.shadowRoot!;
      const w = getComputedStyle(root.querySelector('.table-wrapper')!);
      const cells = root.querySelectorAll<HTMLElement>('tbody tr');
      const first = getComputedStyle(cells[0]!.firstElementChild!);
      const last = getComputedStyle(cells[0]!.lastElementChild!);
      return {
        border: w.borderTopWidth, bg: w.backgroundColor, radius: w.borderTopLeftRadius,
        rowLine: first.borderBottomWidth, lastRowLine: getComputedStyle(cells[2]!.firstElementChild!).borderBottomWidth,
        padStart: first.paddingLeft, padEnd: last.paddingRight,
        tableLeft: root.querySelector('table')!.getBoundingClientRect().left - document.getElementById('t')!.getBoundingClientRect().left,
      };
    });
    expect(r).toEqual({ border: '0px', bg: 'rgba(0, 0, 0, 0)', radius: '0px', rowLine: '1px', lastRowLine: '0px', padStart: '0px', padEnd: '0px', tableLeft: 0 });
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('sticky-first: the first column stays at the left edge on an opaque fill while the table scrolls sideways', async () => {
    const page = await table('sticky-first', '360px');
    await page.evaluate(() => { document.getElementById('t')!.shadowRoot!.querySelector('.table-scroll')!.scrollLeft = 200; });
    await settleStyles(page);
    const r = await page.evaluate(() => {
      const root = document.getElementById('t')!.shadowRoot!;
      const box = root.querySelector('.table-scroll')!.getBoundingClientRect();
      const head = root.querySelector('thead th')!.getBoundingClientRect();
      const cell = root.querySelector('tbody tr > *')!;
      return { scrolled: root.querySelector('.table-scroll')!.scrollLeft, head: Math.round(head.left - box.left), cell: Math.round(cell.getBoundingClientRect().left - box.left), bg: getComputedStyle(cell).backgroundColor };
    });
    expect(r.scrolled).toBeGreaterThan(0);
    expect(r.head).toBe(0);
    expect(r.cell).toBe(0);
    expect(alpha(r.bg), r.bg).toBe(1);
    // Hovered, the pinned cell shows the hover state over its opaque fill.
    const cellBox = await page.evaluate(() => document.getElementById('t')!.shadowRoot!.querySelector('tbody tr > *')!.getBoundingClientRect().toJSON());
    await page.mouse.move(cellBox.x + 4, cellBox.y + cellBox.height / 2);
    await settleStyles(page);
    const hovered = await page.evaluate(() => {
      const cell = document.getElementById('t')!.shadowRoot!.querySelector('tbody tr > *')!;
      const s = getComputedStyle(cell);
      return { color: s.backgroundColor, image: s.backgroundImage };
    });
    expect(alpha(hovered.color), hovered.color).toBe(1);
    expect(hovered.image).toContain('linear-gradient');
    expect(hovered.image).not.toContain('rgba(0, 0, 0, 0)');
    await page.close();
  });

  it('sticky-first in a right-to-left page: the first column pins to the right edge; the start fade sits after it on the right', async () => {
    const page = await table('sticky-first', '360px');
    await page.evaluate(() => { document.getElementById('box')!.dir = 'rtl'; });
    await settleStyles(page);
    // RTL scrollLeft runs from 0 (start, right) to negative (end, left).
    await page.evaluate(() => { const s = document.getElementById('t')!.shadowRoot!.querySelector('.table-scroll')!; s.scrollLeft = -200; s.dispatchEvent(new Event('scroll')); });
    await settleStyles(page);
    const r = await page.evaluate(() => {
      const root = document.getElementById('t')!.shadowRoot!;
      const box = root.querySelector('.table-scroll')!.getBoundingClientRect();
      const head = root.querySelector('thead th')!.getBoundingClientRect();
      const cell = root.querySelector('tbody tr > *')!.getBoundingClientRect();
      const start = root.querySelector('.fade-start')!;
      const end = root.querySelector('.fade-end')!;
      const fs = start.getBoundingClientRect();
      return {
        head: Math.round(box.right - head.right),
        cell: Math.round(box.right - cell.right),
        startAfterPin: Math.round(head.left - fs.right),
        startOn: getComputedStyle(start).opacity,
        endAtLeft: Math.round(end.getBoundingClientRect().left - box.left),
        endOn: getComputedStyle(end).opacity,
      };
    });
    expect(r).toEqual({ head: 0, cell: 0, startAfterPin: 0, startOn: '1', endAtLeft: 0, endOn: '1' });
    await page.close();
  });

  it('sticky-first: a focused cell next to the pinned column scrolls out from under it (scroll-padding)', async () => {
    const page = await table('sticky-first', '360px');
    await page.evaluate(() => {
      const t = document.getElementById('t') as HTMLElement & { columns: Array<Record<string, unknown>> };
      t.columns = t.columns.map((c, i) => (i === 1 ? { ...c, render: (v: unknown) => Object.assign(document.createElement('button'), { textContent: String(v) }) } : c));
    });
    await settleStyles(page);
    await page.evaluate(() => { const s = document.getElementById('t')!.shadowRoot!.querySelector('.table-scroll')!; s.scrollLeft = s.scrollWidth; });
    await settleStyles(page);
    const r = await page.evaluate(() => {
      const root = document.getElementById('t')!.shadowRoot!;
      const btn = root.querySelector('tbody tr button') as HTMLButtonElement;
      btn.focus();
      const pin = root.querySelector('tbody tr > .sticky')!.getBoundingClientRect();
      return { focused: root.activeElement === btn, gap: Math.round(btn.getBoundingClientRect().left - pin.right) };
    });
    expect(r.focused).toBe(true);
    expect(r.gap).toBeGreaterThanOrEqual(0);
    await page.close();
  });

  it('overflow fade: the edge with more table behind it fades; none when the table fits', async () => {
    const page = await table('', '360px');
    const fades = () => page.evaluate(() => {
      const root = document.getElementById('t')!.shadowRoot!;
      return ['.fade-start', '.fade-end'].map((s) => getComputedStyle(root.querySelector(s)!).opacity);
    });
    expect(await fades()).toEqual(['0', '1']);
    await page.evaluate(() => { const s = document.getElementById('t')!.shadowRoot!.querySelector('.table-scroll')!; s.scrollLeft = s.scrollWidth; s.dispatchEvent(new Event('scroll')); });
    await settleStyles(page);
    expect(await fades()).toEqual(['1', '0']);
    await page.evaluate(() => { document.getElementById('box')!.style.width = '1200px'; });
    await page.waitForFunction(() => getComputedStyle(document.getElementById('t')!.shadowRoot!.querySelector('.fade-start')!).opacity === '0');
    await settleStyles(page);
    expect(await fades()).toEqual(['0', '0']);
    await page.close();
  });

  it('stack-below="768": stacked list rows on a phone (no sideways scroll), a table to assistive tech; a table again when wide', async () => {
    const page = await table('stack-below="768"', '390px');
    await page.waitForFunction(() => document.getElementById('t')!.hasAttribute('stacked'));
    await settleStyles(page);
    const r = await page.evaluate(() => {
      const root = document.getElementById('t')!.shadowRoot!;
      const scroll = root.querySelector('.table-scroll')!;
      const row = root.querySelector('tbody tr')!;
      const rr = row.getBoundingClientRect();
      const [title, email, changed, version, status] = Array.from(row.children) as HTMLElement[];
      const b = (e: Element) => e.getBoundingClientRect();
      return {
        overflow: scroll.scrollWidth - scroll.clientWidth,
        headHeight: b(root.querySelector('thead')!).height,
        titleFull: b(title!).width > rr.width * 0.6,
        metaBelow: b(email!).top >= b(title!).bottom - 1 && Math.abs(b(changed!).top - b(email!).top) < 2,
        metaColour: getComputedStyle(email!).color !== getComputedStyle(title!).color,
        versionHidden: getComputedStyle(version!).clipPath,
        statusRight: Math.round(rr.right - b(status!).right) <= 16 && b(status!).left > b(email!).right,
      };
    });
    expect(r).toEqual({ overflow: 0, headHeight: 1, titleFull: true, metaBelow: true, metaColour: true, versionHidden: 'inset(50%)', statusRight: true });
    await expect(page.getByRole('row').count()).resolves.toBe(4);
    await expect(page.getByRole('columnheader', { name: 'E-mail' }).count()).resolves.toBe(1);
    await expect(page.getByRole('rowheader', { name: 'Comeback hello' }).count()).resolves.toBe(1);
    expect(await axeViolations(page)).toEqual([]);
    await page.evaluate(() => { document.getElementById('box')!.style.width = '900px'; });
    await page.waitForFunction(() => !document.getElementById('t')!.hasAttribute('stacked'));
    await settleStyles(page);
    expect(await rowHeights(page, 'thead')).toEqual([36]);
    await page.close();
  });
});
