// @vitest-environment node
/**
 * Dashboard swap onto Cognivo, 2026-11-18: a row-level condition
 * ("Stop when [field] [is not] [value]") needs small selects that sit in a
 * line of text. cg-select always filled its container.
 *
 * Now, in real Chromium: `width="auto"` makes cg-select inline and as wide
 * as its longest option (so the width does not jump when the value changes),
 * up to its container; with `size="sm"` the trigger is 32 px. Without
 * `width`, cg-select still fills its container.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const OPS = [{ value: 'is', label: 'is' }, { value: 'not', label: 'is not' }, { value: 'contains', label: 'contains' }];

async function open(): Promise<Page> {
  const page = await openPage(['cg-select'], `<div style="width:600px">
    <p id="row" style="margin:0">Stop when <cg-select id="field" size="sm" width="auto" aria-label="Field"></cg-select>
      <cg-select id="op" size="sm" width="auto" aria-label="Operator" value="is"></cg-select></p>
    <cg-select id="full" aria-label="Full"></cg-select>
  </div>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate((ops) => {
    const set = (id: string, o: unknown) => Object.assign(document.getElementById(id)!, { options: o });
    set('field', [{ value: 'plan', label: 'Plan' }, { value: 'country', label: 'Country' }]);
    set('op', ops);
    set('full', ops);
  }, OPS);
  await settleStyles(page);
  return page;
}

const box = (page: Page, id: string) => page.evaluate((id) => {
  const el = document.getElementById(id)!;
  const t = el.shadowRoot!.querySelector('.trigger')!.getBoundingClientRect();
  const text = el.shadowRoot!.querySelector('.trigger-text') as HTMLElement;
  return { width: el.getBoundingClientRect().width, top: Math.round(el.getBoundingClientRect().top), h: t.height, cut: text.scrollWidth > text.clientWidth + 0.5, shown: text.textContent!.trim() };
}, id);

describe.skipIf(!browserAvailable)('cg-select width="auto" size="sm" (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('inline, 32 px, as wide as its longest option; the width holds when the value changes', async () => {
    const page = await open();
    const op = await box(page, 'op');
    expect(op.h).toBe(32);
    expect(op.width).toBeLessThan(160);
    expect(op.shown).toBe('is');
    expect(op.cut).toBe(false);
    // Both row selects share the text line.
    expect((await box(page, 'field')).top).toBe(op.top);
    await page.evaluate(() => { (document.getElementById('op') as HTMLElement & { value: string }).value = 'contains'; });
    await settleStyles(page);
    const after = await box(page, 'op');
    expect(after.shown).toBe('contains');
    expect(after.cut).toBe(false);
    expect(after.width).toBe(op.width);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('without width, cg-select still fills its container', async () => {
    const page = await open();
    expect((await box(page, 'full')).width).toBe(600);
    await page.close();
  });
});
