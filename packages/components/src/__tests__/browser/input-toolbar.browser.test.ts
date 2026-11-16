// @vitest-environment node
/**
 * Issue: a dashboard toolbar could not use cg-input for its search field.
 * Without a floating label the placeholder was transparent (it only showed
 * once the field had focus), a prefix icon was drawn in a separate grey box
 * with a divider, and there was no compact height for toolbars. Now: the
 * placeholder shows whenever there is no label to stand in for it,
 * `affix="plain"` draws prefix / suffix content inside the field with no box,
 * and `size="sm"` is a 32 px toolbar field.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const ICON = '<svg slot="prefix" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor"/></svg>';

async function field(attrs: string, inner = ''): Promise<Page> {
  const page = await openPage(['cg-input'], `<cg-input id="f" ${attrs}>${inner}</cg-input>`);
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await settleStyles(page);
  return page;
}

const placeholderColour = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.getElementById('f')!.shadowRoot!.querySelector('input')!, '::placeholder').color);

const transparent = (c: string) => c === 'transparent' || /rgba\(.*,\s*0\)$/.test(c);

describe.skipIf(!browserAvailable)('cg-input in a toolbar (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('without a label the placeholder is visible at rest', async () => {
    const page = await field('placeholder="Search contacts"');
    expect(transparent(await placeholderColour(page)), await placeholderColour(page)).toBe(false);
    await page.close();
  });

  it('with a floating label the placeholder stays hidden until the label floats', async () => {
    const page = await field('label="E-mail" placeholder="you@example.com"');
    expect(transparent(await placeholderColour(page))).toBe(true);
    await page.locator('#f input').focus();
    await settleStyles(page);
    expect(transparent(await placeholderColour(page))).toBe(false);
    await page.close();
  });

  it('affix="plain": the prefix icon sits inside the field, no grey box or divider', async () => {
    const page = await field('affix="plain" size="sm" placeholder="Search contacts"', ICON);
    const prefix = await page.evaluate(() => {
      const root = document.getElementById('f')!.shadowRoot!;
      const s = getComputedStyle(root.querySelector('.prefix')!);
      const wrap = root.querySelector('.wrapper')!.getBoundingClientRect();
      const icon = document.querySelector('svg')!.getBoundingClientRect();
      return { bg: s.backgroundColor, divider: s.borderRightWidth, insetLeft: icon.left - wrap.left };
    });
    expect(transparent(prefix.bg), prefix.bg).toBe(true);
    expect(prefix.divider).toBe('0px');
    // The icon sits inside the border, not flush against it.
    expect(prefix.insetLeft).toBeGreaterThanOrEqual(8);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('the default affix keeps the boxed prefix', async () => {
    const page = await field('placeholder="Amount"', ICON);
    const bg = await page.evaluate(() => getComputedStyle(document.getElementById('f')!.shadowRoot!.querySelector('.prefix')!).backgroundColor);
    expect(transparent(bg), bg).toBe(false);
    await page.close();
  });

  it('size="sm" is a compact toolbar field (32–36 px tall)', async () => {
    const page = await field('size="sm" placeholder="Search contacts"');
    const h = await page.evaluate(() => document.getElementById('f')!.shadowRoot!.querySelector('.wrapper')!.getBoundingClientRect().height);
    expect(h).toBeGreaterThanOrEqual(32);
    expect(h).toBeLessThanOrEqual(36);
    await page.close();
  });
});
