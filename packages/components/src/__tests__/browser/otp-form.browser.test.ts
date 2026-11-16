// @vitest-environment node
/**
 * Issue: cg-otp-input was not form-associated — a code typed into it never
 * reached FormData, `required` did nothing, a form reset left the digits, a
 * `<fieldset disabled>` did not disable it, and Enter did not submit. It now
 * behaves like the other Cognivo fields. `required` means a complete code:
 * fewer digits than `length` is `valueMissing`.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser } from './harness.js';

const TAGS = ['cg-otp-input', 'cg-input', 'cg-button'];

type Otp = HTMLElement & {
  value: string;
  name: string;
  required: boolean;
  updateComplete: Promise<unknown>;
  validity?: ValidityState;
  validationMessage: string;
  willValidate: boolean;
  checkValidity(): boolean;
  reportValidity(): boolean;
};

const formData = (page: Page) =>
  page.evaluate(() => Object.fromEntries(Array.from(new FormData(document.getElementById('f') as HTMLFormElement).entries()).map(([k, v]) => [k, String(v)])));

async function typeDigits(page: Page, digits: string): Promise<void> {
  await page.locator('#otp input >> nth=0').focus();
  await page.keyboard.type(digits);
  await page.evaluate(() => (document.getElementById('otp') as Otp).updateComplete);
}

describe.skipIf(!browserAvailable)('cg-otp-input in a form (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('is form-associated: typed digits reach FormData under its name', async () => {
    const page = await openPage(TAGS, '<form id="f"><cg-otp-input id="otp" name="code" length="4"></cg-otp-input></form>');
    expect(await page.evaluate(() => (customElements.get('cg-otp-input') as unknown as { formAssociated?: boolean }).formAssociated)).toBe(true);
    await typeDigits(page, '4821');
    expect(await formData(page)).toEqual({ code: '4821' });
    expect(await page.evaluate(() => (document.getElementById('otp') as Otp).willValidate)).toBe(true);
    await page.close();
  });

  it('required: empty and incomplete codes are valueMissing and block submit; a complete code is valid', async () => {
    const page = await openPage(TAGS, '<form id="f"><cg-otp-input id="otp" name="code" length="4" required></cg-otp-input></form>');
    await page.evaluate(() => {
      (window as unknown as { __submits: number }).__submits = 0;
      document.getElementById('f')!.addEventListener('submit', (e) => { e.preventDefault(); (window as unknown as { __submits: number }).__submits++; });
    });
    const state = () => page.evaluate(() => {
      const el = document.getElementById('otp') as Otp;
      return { valid: el.checkValidity(), missing: el.validity?.valueMissing, message: el.validationMessage !== '' };
    });
    const submit = () => page.evaluate(() => (document.getElementById('f') as HTMLFormElement).requestSubmit());

    expect(await state()).toEqual({ valid: false, missing: true, message: true });
    await typeDigits(page, '48');
    expect(await state()).toEqual({ valid: false, missing: true, message: true });
    await submit();
    expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits)).toBe(0);

    await page.evaluate(async () => { const el = document.getElementById('otp') as Otp; el.value = '4821'; await el.updateComplete; });
    expect(await state()).toEqual({ valid: true, missing: false, message: false });
    await submit();
    expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits)).toBe(1);
    await page.close();
  });

  it('not required: an empty code is valid', async () => {
    const page = await openPage(TAGS, '<form id="f"><cg-otp-input id="otp" name="code"></cg-otp-input></form>');
    expect(await page.evaluate(() => (document.getElementById('otp') as Otp).checkValidity())).toBe(true);
    await page.close();
  });

  it('form reset restores the value attribute and clears the boxes', async () => {
    const page = await openPage(TAGS, '<form id="f"><cg-otp-input id="otp" name="code" length="4" value="1234"></cg-otp-input></form>');
    await page.evaluate(async () => { const el = document.getElementById('otp') as Otp; el.value = '9876'; await el.updateComplete; });
    expect(await formData(page)).toEqual({ code: '9876' });
    const boxes = await page.evaluate(async () => {
      (document.getElementById('f') as HTMLFormElement).reset();
      const el = document.getElementById('otp') as Otp;
      await el.updateComplete;
      return { value: el.value, boxes: Array.from(el.shadowRoot!.querySelectorAll<HTMLInputElement>('input')).map((i) => i.value).join('') };
    });
    expect(boxes).toEqual({ value: '1234', boxes: '1234' });
    expect(await formData(page)).toEqual({ code: '1234' });
    await page.close();
  });

  it('a <fieldset disabled> disables every box and leaves the code out of FormData', async () => {
    const page = await openPage(TAGS, '<form id="f"><fieldset id="fs" disabled><cg-otp-input id="otp" name="code" length="4" value="1234"></cg-otp-input></fieldset></form>');
    const disabled = () => page.evaluate(async () => {
      const el = document.getElementById('otp') as Otp;
      await el.updateComplete;
      return Array.from(el.shadowRoot!.querySelectorAll<HTMLInputElement>('input')).map((i) => i.disabled);
    });
    expect(await disabled()).toEqual([true, true, true, true]);
    expect(await formData(page)).toEqual({});
    await page.evaluate(() => { (document.getElementById('fs') as HTMLFieldSetElement).disabled = false; });
    expect(await disabled()).toEqual([false, false, false, false]);
    expect(await formData(page)).toEqual({ code: '1234' });
    await page.close();
  });

  it('Enter with no submit button submits when it is the only text field, and not beside another one', async () => {
    for (const [extra, expected] of [['', 1], ['<cg-input name="e" label="E"></cg-input>', 0]] as const) {
      const page = await openPage(TAGS, `<form id="f"><cg-otp-input id="otp" name="code" length="4"></cg-otp-input>${extra}</form>`);
      await page.evaluate(() => {
        (window as unknown as { __submits: number }).__submits = 0;
        document.getElementById('f')!.addEventListener('submit', (e) => { e.preventDefault(); (window as unknown as { __submits: number }).__submits++; });
      });
      await page.locator('#otp input >> nth=1').focus();
      await page.keyboard.press('Enter');
      expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits), extra || 'alone').toBe(expected);
      await page.close();
    }
  });
});
