// @vitest-environment node
/**
 * Issues: cg-segmented-control's options were `flex: 1` without `nowrap`, so
 * in a narrow space the control shrank below its labels and they wrapped onto
 * two lines; and an option could not have an accessible name other than its
 * visible text (a short "12m" read aloud as "12m, last 12 months" — the name
 * starts with the visible text, WCAG 2.5.3 label in name). Now options never
 * wrap or shrink below their text — the track scrolls sideways when the space
 * is too small — and an option's `ariaLabel` names it for assistive tech.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const OPTIONS = [
  { value: 'all', label: 'All time' },
  { value: '12m', label: '12m', ariaLabel: '12m, last 12 months' },
  { value: '3m', label: '3m', ariaLabel: '3m, last 3 months' },
  { value: '30d', label: '30 days' },
  { value: 'today', label: 'Today' },
];

async function control(width: string): Promise<Page> {
  const page = await openPage(['cg-segmented-control'], `<div id="box" style="width:${width}"><cg-segmented-control label="Period" value="30d"></cg-segmented-control></div>`);
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate((options) => { (document.querySelector('cg-segmented-control') as HTMLElement & { options: unknown }).options = options; }, OPTIONS);
  await settleStyles(page);
  return page;
}

const segments = (page: Page) =>
  page.evaluate(() =>
    Array.from(document.querySelector('cg-segmented-control')!.shadowRoot!.querySelectorAll<HTMLElement>('.segment'), (s) => {
      const range = document.createRange();
      range.selectNodeContents(s);
      return { lines: range.getClientRects().length, width: s.getBoundingClientRect().width, text: s.scrollWidth };
    }));

describe.skipIf(!browserAvailable)('cg-segmented-control in a narrow space (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('options stay on one line and never shrink below their text; the control stays inside its box and scrolls', async () => {
    const page = await control('200px');
    for (const s of await segments(page)) {
      expect(s.lines, 'one line').toBe(1);
      expect(s.width).toBeGreaterThanOrEqual(s.text - 1); // scrollWidth rounds to whole pixels
    }
    const box = await page.evaluate(() => {
      const host = document.querySelector('cg-segmented-control')!;
      const track = host.shadowRoot!.querySelector('.track')!;
      return { host: host.getBoundingClientRect().width, scrolls: track.scrollWidth > track.clientWidth };
    });
    expect(box.host).toBeLessThanOrEqual(200);
    expect(box.scrolls).toBe(true);
    await page.close();
  });

  it('an option with ariaLabel is named by it; the others by their text', async () => {
    const page = await control('600px');
    await expect(page.getByRole('radio', { name: '12m, last 12 months' }).count()).resolves.toBe(1);
    await expect(page.getByRole('radio', { name: '3m, last 3 months' }).count()).resolves.toBe(1);
    await expect(page.getByRole('radio', { name: '30 days' }).count()).resolves.toBe(1);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });
  it('setting value scrolls the selected option into view in a narrow track', async () => {
    const page = await control('200px');
    const visible = () => page.evaluate(() => {
      const host = document.querySelector('cg-segmented-control')!;
      const track = host.shadowRoot!.querySelector('.track')!.getBoundingClientRect();
      const seg = host.shadowRoot!.querySelector('[aria-checked="true"]')!.getBoundingClientRect();
      return seg.left >= track.left - 1 && seg.right <= track.right + 1;
    });
    // The initial value (30d, fourth) is already brought into view.
    expect(await visible()).toBe(true);
    await page.evaluate(() => { (document.querySelector('cg-segmented-control') as HTMLElement & { value: string }).value = 'today'; });
    await settleStyles(page);
    expect(await visible()).toBe(true);
    await page.evaluate(() => { (document.querySelector('cg-segmented-control') as HTMLElement & { value: string }).value = 'all'; });
    await settleStyles(page);
    expect(await visible()).toBe(true);
    expect(await page.evaluate(() => document.querySelector('cg-segmented-control')!.shadowRoot!.querySelector('.track')!.scrollLeft)).toBe(0);
    await page.close();
  });
});
