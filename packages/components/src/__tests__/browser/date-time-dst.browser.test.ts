// @vitest-environment node
/**
 * Issue (review of cg-date-time-picker): around daylight-saving transitions
 * the picker re-derived the instant from the wall time, so the second 1:30
 * of a fall-back night (EST) silently became the first (EDT) — an hour off —
 * without the user touching it. `min` / `max` compared dates only, a day
 * disabled by them lost the keyboard tab stop when the arrows reached it,
 * "today" was the browser's day instead of the zone's, and ArrowDown in an
 * empty hour list skipped the first hour.
 *
 * Now, in real Chromium, in America/New_York and Europe/London around both
 * transitions (2026):
 * - a value with an offset keeps its instant until the user edits it;
 * - an edited wall time that happens twice (fall back) takes the earlier
 *   offset; one that does not exist (spring forward) moves forward by the
 *   gap (02:30 → 03:30) — the same rule every time;
 * - `min` / `max` are instants (time and offset included): the value outside
 *   them is rangeUnderflow / rangeOverflow, days wholly outside are disabled
 *   but keep the roving tab stop;
 * - "today" and the default day are the configured zone's;
 * - ArrowDown on an hour list with no hour lands on the first hour.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

type Picker = HTMLElement & { value: string; min: string; max: string; validity: ValidityState; checkValidity(): boolean };

async function open(attrs: string): Promise<Page> {
  const page = await openPage(['cg-date-time-picker'], `<form><cg-date-time-picker name="send" label="Send on" ${attrs}></cg-date-time-picker></form>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await settleStyles(page);
  return page;
}

const formValue = (page: Page) => page.evaluate(() => new FormData(document.querySelector('form')!).get('send'));
const text = (page: Page) => page.evaluate(() => document.querySelector('cg-date-time-picker')!.shadowRoot!.querySelector('.trigger-text')!.textContent!.trim());
const set = (page: Page, props: Partial<Record<'value' | 'min' | 'max', string>>) => page.evaluate(async (props) => {
  const el = document.querySelector('cg-date-time-picker') as Picker;
  Object.assign(el, props);
  await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
}, props);
/** Pick an hour in the open panel's hour list (a user edit). */
const pickHour = (page: Page, hour: string) => page.evaluate((hour) => {
  const root = document.querySelector('cg-date-time-picker')!.shadowRoot!;
  const opt = Array.from(root.querySelectorAll<HTMLElement>('[aria-label="Hours"] [role="option"]')).find((o) => o.textContent!.trim() === hour)!;
  opt.click();
}, hour);
const openPanel = (page: Page) => page.evaluate(() => (document.querySelector('cg-date-time-picker')!.shadowRoot!.querySelector('.trigger') as HTMLElement).click());

describe.skipIf(!browserAvailable)('cg-date-time-picker around daylight saving (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  describe('a value with an offset keeps its instant', () => {
    for (const [zone, value, shown] of [
      // New York, fall back 2026-11-01: 1:30 happens twice; the second is EST.
      ['America/New_York', '2026-11-01T01:30:00-05:00', 'Nov 1, 2026, 1:30 AM GMT\u22125'],
      ['America/New_York', '2026-11-01T01:30:00-04:00', 'Nov 1, 2026, 1:30 AM GMT\u22124'],
      // London, fall back 2026-10-25: the second 1:30 is GMT.
      ['Europe/London', '2026-10-25T01:30:00+00:00', 'Oct 25, 2026, 1:30 AM GMT'],
      ['Europe/London', '2026-10-25T01:30:00+01:00', 'Oct 25, 2026, 1:30 AM GMT+1'],
    ] as const) {
      it(`${zone} ${value}`, async () => {
        const page = await open(`time-zone="${zone}" value="${value}"`);
        expect(await formValue(page)).toBe(value);
        expect(await text(page)).toBe(shown);
        await page.close();
      });
    }
  });

  describe('an edit: an hour that happens twice takes the earlier offset; one that does not exist moves forward', () => {
    for (const [zone, start, hour, expected] of [
      ['America/New_York', '2026-11-01T00:30:00-04:00', '01', '2026-11-01T01:30:00-04:00'],
      ['America/New_York', '2026-03-08T01:30:00-05:00', '02', '2026-03-08T03:30:00-04:00'],
      ['Europe/London', '2026-10-25T00:30:00+01:00', '01', '2026-10-25T01:30:00+01:00'],
      ['Europe/London', '2026-03-29T00:30:00+00:00', '01', '2026-03-29T02:30:00+01:00'],
    ] as const) {
      it(`${zone}: ${start} → hour ${hour} = ${expected}`, async () => {
        const page = await open(`time-zone="${zone}" value="${start}"`);
        await openPanel(page);
        await settleStyles(page);
        await pickHour(page, hour);
        await settleStyles(page);
        expect(await formValue(page)).toBe(expected);
        await page.close();
      });
    }
    it('a wall value without an offset in the gap resolves forward too (New York 02:30 → 03:30 EDT)', async () => {
      const page = await open(`time-zone="America/New_York" value="2026-03-08T02:30"`);
      expect(await formValue(page)).toBe('2026-03-08T03:30:00-04:00');
      await page.close();
    });
  });

  it('min / max are instants: the time and the offset count; outside is rangeUnderflow / rangeOverflow', async () => {
    const page = await open(`time-zone="America/New_York"`);
    const range = () => page.evaluate(() => {
      const el = document.querySelector('cg-date-time-picker') as Picker;
      return { under: el.validity.rangeUnderflow, over: el.validity.rangeOverflow, valid: el.checkValidity() };
    });
    // min is the second 1:30 (EST): the first 1:30 (EDT) is an hour earlier → under.
    await set(page, { min: '2026-11-01T01:30:00-05:00', value: '2026-11-01T01:30:00-04:00' });
    expect(await range()).toEqual({ under: true, over: false, valid: false });
    await set(page, { value: '2026-11-01T01:30:00-05:00' });
    expect(await range()).toEqual({ under: false, over: false, valid: true });
    // max in another zone's offset: 06:00Z = 01:00 EST.
    await set(page, { min: '', max: '2026-11-01T06:00:00Z', value: '2026-11-01T01:30:00-05:00' });
    expect(await range()).toEqual({ under: false, over: true, valid: false });
    // Same day, earlier time: valid.
    await set(page, { value: '2026-11-01T00:30:00-04:00' });
    expect(await range()).toEqual({ under: false, over: false, valid: true });
    await page.close();
  });

  it('a day disabled by min / max reachable by the arrows keeps the tab stop (focusable, not pickable)', async () => {
    const page = await open(`time-zone="Europe/London" value="2026-10-25T09:00:00+00:00" max="2026-10-25T23:59:00+00:00"`);
    await page.locator('cg-date-time-picker [role="combobox"]').focus();
    await page.keyboard.press('ArrowDown');
    await settleStyles(page);
    await page.keyboard.press('ArrowRight');
    await settleStyles(page);
    const r = await page.evaluate(() => {
      const a = document.querySelector('cg-date-time-picker')!.shadowRoot!.activeElement as HTMLElement | null;
      return { label: a?.getAttribute('aria-label'), disabled: a?.getAttribute('aria-disabled'), tab: a?.tabIndex };
    });
    expect(r).toEqual({ label: 'Monday, October 26, 2026', disabled: 'true', tab: 0 });
    await page.keyboard.press('Enter');
    await settleStyles(page);
    expect(await formValue(page)).toBe('2026-10-25T09:00:00+00:00');
    await page.close();
  });

  it('"today" and the default day are the time zone\'s, not the browser\'s', async () => {
    const page = await open(`time-zone="America/New_York"`);
    // 02:00 UTC on Nov 17 is still Nov 16 in New York (and Nov 17 in most of the world).
    await page.clock.setFixedTime(new Date('2026-11-17T02:00:00Z'));
    await openPanel(page);
    await settleStyles(page);
    const today = await page.evaluate(() => document.querySelector('cg-date-time-picker')!.shadowRoot!.querySelector('[aria-current="date"]')?.getAttribute('aria-label'));
    expect(today).toBe('Monday, November 16, 2026');
    // Picking a time with no date takes the zone's today.
    await pickHour(page, '09');
    await settleStyles(page);
    expect(String(await formValue(page))).toMatch(/^2026-11-16T09:00:00-05:00$/);
    await page.close();
  });

  it('ArrowDown on an hour list with no hour selected lands on the first hour', async () => {
    const page = await open(`time-zone="America/New_York" value="2026-11-20"`);
    await openPanel(page);
    await settleStyles(page);
    await page.evaluate(() => (document.querySelector('cg-date-time-picker')!.shadowRoot!.querySelector('[aria-label="Hours"] [tabindex="0"]') as HTMLElement).focus());
    await page.keyboard.press('ArrowDown');
    await settleStyles(page);
    expect(await page.evaluate(() => document.querySelector('cg-date-time-picker')!.shadowRoot!.querySelector('[aria-label="Hours"] [aria-selected="true"]')?.textContent!.trim())).toBe('00');
    await page.close();
  });
});
