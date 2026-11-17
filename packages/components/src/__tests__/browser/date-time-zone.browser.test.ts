// @vitest-environment node
/**
 * Dashboard design audit, 2026-11-17 (P1-3, P2-18): a dated sequence step
 * was a free-text ISO string (`2027-01-31T09:00:00-03:00`) with a paragraph
 * explaining the format. cg-date-time-picker could not stand in: it was not
 * a form field, the calendar had no keyboard path, and it never said which
 * time zone the time was in.
 *
 * Now, in real Chromium: cg-date-time-picker is form-associated (`name`,
 * `required`, reset, FormData, the in-place invalid state); with
 * `time-zone` (IANA) its value carries that zone's offset
 * (`2027-01-31T09:00:00-03:00`) and the trigger reads
 * "Jan 31, 2027, 9:00 AM (GMT-3)" in the page's locale; the calendar is a
 * keyboard grid (arrows, Page Up / Down, Home / End, Enter, Escape back to
 * the trigger) and the time columns move with the arrow keys.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function open(body: string, lang = 'en-US'): Promise<Page> {
  const page = await openPage(['cg-date-time-picker'], body);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate((lang) => { document.documentElement.lang = lang; }, lang);
  await settleStyles(page);
  return page;
}

const text = (page: Page) => page.evaluate(() => document.querySelector('cg-date-time-picker')!.shadowRoot!.querySelector('.trigger-text')!.textContent!.trim());
const formValue = (page: Page) => page.evaluate(() => new FormData(document.querySelector('form')!).get('send'));

describe.skipIf(!browserAvailable)('cg-date-time-picker for dated steps (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('time-zone: the value carries the zone offset and the trigger shows the zone, in the page locale', async () => {
    const page = await open(`<form><cg-date-time-picker name="send" label="Send on" time-zone="America/Sao_Paulo" value="2027-01-31T09:00"></cg-date-time-picker></form>`);
    expect(await formValue(page)).toBe('2027-01-31T09:00:00-03:00');
    expect(await text(page)).toBe('Jan 31, 2027, 9:00 AM (GMT-3)');
    await page.evaluate(() => { document.documentElement.lang = 'pt-BR'; (document.querySelector('cg-date-time-picker') as HTMLElement & { requestUpdate(): void }).requestUpdate(); });
    await settleStyles(page);
    expect(await text(page)).toBe('31 de jan. de 2027, 9:00 (GMT-3)');
    await page.close();
  });

  it('an instant with an offset is shown as wall time in the time zone', async () => {
    const page = await open(`<form><cg-date-time-picker name="send" time-zone="America/Sao_Paulo" value="2027-01-31T12:00:00Z"></cg-date-time-picker></form>`);
    expect(await text(page)).toBe('Jan 31, 2027, 9:00 AM (GMT-3)');
    expect(await formValue(page)).toBe('2027-01-31T09:00:00-03:00');
    await page.close();
  });

  it('form-associated: required is valueMissing with the in-place error (no bubble), reset restores the value', async () => {
    const page = await open(`<form><cg-date-time-picker name="send" label="Send on" required></cg-date-time-picker></form>`);
    const r = await page.evaluate(() => {
      const el = document.querySelector('cg-date-time-picker') as HTMLElement & { validity: ValidityState };
      let prevented = false;
      el.addEventListener('invalid', (e) => { prevented = e.defaultPrevented; });
      const valid = document.querySelector('form')!.reportValidity();
      return { valid, missing: el.validity.valueMissing, prevented };
    });
    expect(r).toEqual({ valid: false, missing: true, prevented: true });
    await settleStyles(page);
    expect(await page.evaluate(() => {
      const el = document.querySelector('cg-date-time-picker')!;
      return { attr: el.hasAttribute('data-invalid'), msg: !!el.shadowRoot!.querySelector('.helper')?.textContent?.trim() };
    })).toEqual({ attr: true, msg: true });
    await page.evaluate(() => { const el = document.querySelector('cg-date-time-picker') as HTMLElement & { value: string }; el.setAttribute('value', '2027-03-01T10:30'); el.value = '2027-04-01T11:00'; });
    await settleStyles(page);
    expect(await formValue(page)).toBe('2027-04-01T11:00');
    await page.evaluate(() => document.querySelector('form')!.reset());
    await settleStyles(page);
    expect(await formValue(page)).toBe('2027-03-01T10:30');
    await page.close();
  });

  it('keyboard: the calendar is a grid (arrows, Page Down, Enter), Escape returns to the trigger; the time columns move with the arrows', async () => {
    const page = await open(`<form><cg-date-time-picker name="send" label="Send on" time-zone="America/Sao_Paulo" value="2027-01-31T09:00"></cg-date-time-picker></form>`);
    const focused = () => page.evaluate(() => {
      const root = document.querySelector('cg-date-time-picker')!.shadowRoot!;
      const a = root.activeElement as HTMLElement | null;
      return a ? (a.getAttribute('aria-label') ?? a.textContent!.trim()) : null;
    });
    await page.locator('cg-date-time-picker [role="combobox"]').focus();
    await page.keyboard.press('ArrowDown');
    await settleStyles(page);
    expect(await focused()).toBe('Sunday, January 31, 2027');
    await page.keyboard.press('ArrowRight');
    expect(await focused()).toBe('Monday, February 1, 2027');
    await page.keyboard.press('PageDown');
    expect(await focused()).toBe('Monday, March 1, 2027');
    await page.keyboard.press('ArrowUp');
    expect(await focused()).toBe('Monday, February 22, 2027');
    await page.keyboard.press('Enter');
    await settleStyles(page);
    expect(await formValue(page)).toBe('2027-02-22T09:00:00-03:00');
    // Time: the hour column is a listbox; arrows change the hour.
    await page.evaluate(() => (document.querySelector('cg-date-time-picker')!.shadowRoot!.querySelector('[role="listbox"] [aria-selected="true"]') as HTMLElement).focus());
    await page.keyboard.press('ArrowDown');
    await settleStyles(page);
    expect(await formValue(page)).toBe('2027-02-22T10:00:00-03:00');
    await page.keyboard.press('Escape');
    await settleStyles(page);
    expect(await page.evaluate(() => document.querySelector('cg-date-time-picker')!.shadowRoot!.activeElement?.getAttribute('role'))).toBe('combobox');
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });
});
