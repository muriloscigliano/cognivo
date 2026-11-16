// @vitest-environment node
/**
 * cg-textarea selection passthroughs in real Chromium: read the caret,
 * set a selection, and insert text at the cursor (a "variable" chip button)
 * with `value` and the form value kept in sync.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

type TA = HTMLElement & {
  value: string;
  selectionStart: number | null;
  selectionEnd: number | null;
  selectionDirection: string | null;
  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none'): void;
  setRangeText(replacement: string, start?: number, end?: number, selectMode?: SelectionMode): void;
  focus(options?: FocusOptions): void;
};

async function open(): Promise<Page> {
  const page = await openPage(['cg-textarea'], `
    <form id="f"><cg-textarea name="body" label="Message"></cg-textarea></form>
    <button id="insert" type="button">Insert first name</button>`);
  await page.evaluate(() => {
    document.getElementById('insert')!.addEventListener('mousedown', (e) => e.preventDefault()); // keep the caret
    document.getElementById('insert')!.addEventListener('click', () => {
      const ta = document.querySelector('cg-textarea') as unknown as TA;
      ta.setRangeText('{{first_name}}', ta.selectionStart!, ta.selectionEnd!, 'end');
      ta.focus();
    });
  });
  return page;
}

describe.skipIf(!browserAvailable)('cg-textarea selection API (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('selectionStart / selectionEnd follow the caret the user places', async () => {
    const page = await open();
    await page.locator('cg-textarea textarea').fill('Hello there');
    await page.keyboard.press('Home');
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
    const sel = await page.evaluate(() => {
      const ta = document.querySelector('cg-textarea') as unknown as TA;
      return [ta.selectionStart, ta.selectionEnd];
    });
    expect(sel).toEqual([5, 5]);
    await page.close();
  });

  it('setSelectionRange selects in the inner textarea', async () => {
    const page = await open();
    const r = await page.evaluate(async () => {
      const ta = document.querySelector('cg-textarea') as unknown as TA;
      ta.value = 'Hello there';
      await (ta as unknown as { updateComplete: Promise<unknown> }).updateComplete;
      ta.setSelectionRange(6, 11, 'backward');
      const inner = ta.shadowRoot!.querySelector('textarea')!;
      return [ta.selectionStart, ta.selectionEnd, ta.selectionDirection, inner.selectionStart, inner.selectionEnd];
    });
    expect(r).toEqual([6, 11, 'backward', 6, 11]);
    await page.close();
  });

  it('setRangeText inserts at the cursor; value, form value and caret follow', async () => {
    const page = await open();
    await page.locator('cg-textarea textarea').fill('Hi , welcome');
    await page.keyboard.press('Home');
    for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight');
    await page.locator('#insert').click();
    await settle(page);
    const r = await page.evaluate(() => {
      const ta = document.querySelector('cg-textarea') as unknown as TA;
      return {
        value: ta.value,
        form: new FormData(document.getElementById('f') as HTMLFormElement).get('body'),
        caret: [ta.selectionStart, ta.selectionEnd],
      };
    });
    expect(r).toEqual({ value: 'Hi {{first_name}}, welcome', form: 'Hi {{first_name}}, welcome', caret: [17, 17] });
    // Typing continues at the caret, in the field.
    await page.keyboard.type('!');
    await expect(page.evaluate(() => (document.querySelector('cg-textarea') as unknown as TA).value)).resolves.toBe('Hi {{first_name}}!, welcome');
    await page.close();
  });

  it('setRangeText with one argument replaces the current selection', async () => {
    const page = await open();
    const value = await page.evaluate(async () => {
      const ta = document.querySelector('cg-textarea') as unknown as TA;
      ta.value = 'Dear NAME,';
      await (ta as unknown as { updateComplete: Promise<unknown> }).updateComplete;
      ta.setSelectionRange(5, 9);
      ta.setRangeText('{{name}}');
      return ta.value;
    });
    expect(value).toBe('Dear {{name}},');
    await page.close();
  });
});
