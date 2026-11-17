/**
 * Issue (review of the in-place invalid state): `checkValidity()` — on a
 * field or on its form — showed the error and moved focus, like
 * `reportValidity()`. `checkValidity()` is a question, not a report: it must
 * not move focus or show errors. Only a submit attempt and `reportValidity()`
 * do. And only four fields handled `invalid` themselves: a required
 * cg-checkbox after an invalid cg-input got the browser's bubble and no
 * inline message.
 *
 * Checked in Chromium with a mixed form (cg-input, cg-checkbox, cg-radio,
 * cg-number-input, cg-password-input, cg-otp-input, cg-phone-input,
 * cg-select): every field is routed through the shared helper.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

const TAGS = ['cg-input', 'cg-checkbox', 'cg-radio', 'cg-number-input', 'cg-password-input', 'cg-otp-input', 'cg-phone-input', 'cg-select', 'cg-button'];
// cg-number-input is routed too (it is in the form) but a number field holds 0, never empty.
const IDS = ['name', 'terms', 'plan', 'pw', 'otp', 'phone', 'country'];

const BODY = `
  <button id="outside">outside</button>
  <form id="f">
    <cg-input id="name" name="name" label="Name" required></cg-input>
    <cg-checkbox id="terms" name="terms" label="I agree" required></cg-checkbox>
    <cg-radio id="plan" name="plan" value="a" label="Plan A" required></cg-radio>
    <cg-number-input id="qty" name="qty" label="Quantity" required></cg-number-input>
    <cg-password-input id="pw" name="pw" label="Password" required></cg-password-input>
    <cg-otp-input id="otp" name="otp" length="4" required></cg-otp-input>
    <cg-phone-input id="phone" name="phone" label="Phone" required></cg-phone-input>
    <cg-select id="country" name="country" label="Country" required></cg-select>
    <cg-button id="go" type="submit">Send</cg-button>
  </form>`;

async function open(): Promise<Page> {
  const page = await openPage(TAGS, BODY);
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate(() => {
    (document.getElementById('country') as HTMLElement & { options: unknown }).options = [{ value: 'br', label: 'Brazil' }];
    // Record whether each field's invalid event left the browser bubble on (not cancelled).
    const w = window as unknown as { bubbles: string[] };
    w.bubbles = [];
    for (const el of document.querySelectorAll('form > *')) el.addEventListener('invalid', (e) => { if (!e.defaultPrevented) w.bubbles.push(el.id); });
    (document.getElementById('outside') as HTMLButtonElement).focus();
  });
  await settle(page);
  return page;
}

/** Which fields show the in-place error (data-invalid + a visible message), and where focus is. */
const state = (page: Page) => page.evaluate((ids) => {
  const shown = ids.filter((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const msg = el.shadowRoot!.querySelector('[id="helper"], .error-message, .helper');
    return el.hasAttribute('data-invalid') && !!msg && msg.textContent!.trim() !== '' && msg.getBoundingClientRect().height > 0;
  });
  let a: Element | null = document.activeElement;
  while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
  return { shown, focus: document.activeElement?.id ?? '', inner: a?.localName ?? '', bubbles: (window as unknown as { bubbles: string[] }).bubbles };
}, IDS);

describe.skipIf(!browserAvailable)('checkValidity() is quiet; submit / reportValidity() report in place (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('form.checkValidity() and each field\'s checkValidity() return false without moving focus or showing errors', async () => {
    const page = await open();
    const results = await page.evaluate((ids) => [
      (document.getElementById('f') as HTMLFormElement).checkValidity(),
      ...ids.map((id) => (document.getElementById(id) as HTMLElement & { checkValidity(): boolean }).checkValidity()),
    ], IDS);
    await settle(page);
    expect(results).toEqual([false, ...IDS.map(() => false)]);
    // (checkValidity() never shows a bubble, cancelled or not.)
    const { bubbles: _ignored, ...quiet } = await state(page);
    expect(quiet).toEqual({ shown: [], focus: 'outside', inner: 'button' });
    await page.close();
  });

  it('form.reportValidity(): every field shows its message in place (no bubble) and the first takes focus', async () => {
    const page = await open();
    expect(await page.evaluate(() => (document.getElementById('f') as HTMLFormElement).reportValidity())).toBe(false);
    await settle(page);
    expect(await state(page)).toEqual({ shown: IDS, focus: 'name', inner: 'input', bubbles: [] });
    await page.close();
  });

  it('submit: a required cg-checkbox after a now-valid cg-input gets the same inline error and focus, no bubble', async () => {
    const page = await open();
    await page.evaluate(() => {
      const f = document.getElementById('f')!;
      for (const id of ['plan', 'qty', 'pw', 'otp', 'phone', 'country']) f.removeChild(document.getElementById(id)!);
    });
    await page.locator('#name input').fill('Ana');
    await page.evaluate(() => (document.getElementById('f') as HTMLFormElement).requestSubmit());
    await settle(page);
    const s = await state(page);
    expect(s).toEqual({ shown: ['terms'], focus: 'terms', inner: s.inner, bubbles: [] });
    // Its field element names the error: aria-invalid and the message as its description.
    const a11y = await page.evaluate(() => {
      const el = document.getElementById('terms')!;
      const ctl = el.shadowRoot!.querySelector('[aria-invalid]')!;
      const desc = ctl.getAttribute('aria-describedby') ?? '';
      return { invalid: ctl.getAttribute('aria-invalid'), described: desc.split(/\s+/).some((id) => (el.shadowRoot!.getElementById(id)?.textContent ?? '').trim() === el.validationMessage) };
    });
    expect(a11y).toEqual({ invalid: 'true', described: true });
    // Checked: valid, the message clears.
    await page.evaluate(() => { (document.getElementById('terms') as HTMLElement & { checked: boolean }).checked = true; });
    await settle(page);
    await settle(page);
    expect((await state(page)).shown).toEqual([]);
    await page.close();
  });
});
