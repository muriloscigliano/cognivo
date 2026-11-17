// @vitest-environment node
/**
 * Dashboard swap onto Cognivo, 2026-11-18 (Campaigns, P1-6): at 390 px the
 * open `cg-date-range-picker` (a pill at the right of the toolbar, presets
 * beside the calendar) ran past the right edge of the screen.
 *
 * Now, in real Chromium at 390 × 844: the open panel is a bottom sheet — the
 * full width of the screen, on screen top to bottom, the presets in a row
 * above one month that fills the sheet's width, with 44 px day targets. At
 * desktop width the panel is still the dropdown under the trigger.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function open(width: number, attrs: string): Promise<Page> {
  const page = await openPage(['cg-date-range-picker'],
    `<div style="display:flex; justify-content:flex-end; padding:16px"><cg-date-range-picker id="r" label="Period" ${attrs}></cg-date-range-picker></div>`);
  await page.setViewportSize({ width, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate(() => { document.documentElement.lang = 'en-US'; });
  await settleStyles(page);
  await page.locator('#r').locator('.trigger').click();
  await settleStyles(page);
  return page;
}

const panel = (page: Page) => page.evaluate(() => {
  const root = document.getElementById('r')!.shadowRoot!;
  const d = root.querySelector('.dropdown')!.getBoundingClientRect();
  const cal = root.querySelector('cg-calendar')!;
  const c = cal.getBoundingClientRect();
  const day = cal.shadowRoot!.querySelector('.day')!.getBoundingClientRect();
  const presets = Array.from(root.querySelectorAll('.preset'), (p) => p.getBoundingClientRect().top);
  return {
    left: d.left, right: d.right, top: d.top, bottom: d.bottom, width: d.width,
    calWidth: c.width, calTop: c.top, months: root.querySelectorAll('cg-calendar').length,
    day: Math.round(day.width), presetRow: new Set(presets.map(Math.round)).size, presetsAbove: presets.every((t) => t < c.top),
  };
});

describe.skipIf(!browserAvailable)('cg-date-range-picker on a phone (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  for (const [name, attrs] of [
    ['pill with presets', `variant="pill" presets='["7d","30d","90d"]' from="2026-11-01" to="2026-11-14"`],
    ['field', `from="2026-11-01" to="2026-11-14"`],
  ] as const) {
    it(`${name} at 390 px: a full-width bottom sheet with one month filling it, on screen`, async () => {
      const page = await open(390, attrs);
      const r = await panel(page);
      expect(r.left).toBe(0);
      expect(r.right).toBe(390);
      expect(r.bottom).toBe(844);
      expect(r.top).toBeGreaterThanOrEqual(0);
      expect(r.months).toBe(1);
      // One month, the sheet's width less its padding.
      expect(r.calWidth).toBeGreaterThanOrEqual(390 - 2 * 16 - 1);
      expect(r.day).toBeGreaterThanOrEqual(44);
      if (name.startsWith('pill')) {
        expect(r.presetRow).toBe(1);
        expect(r.presetsAbove).toBe(true);
      }
      await page.close();
    });
  }

  it('at 1440 px the panel is still the dropdown under the trigger', async () => {
    const page = await open(1440, `variant="pill" presets='["7d","30d"]' from="2026-11-01" to="2026-11-14"`);
    const r = await panel(page);
    const trigger = await page.evaluate(() => document.getElementById('r')!.shadowRoot!.querySelector('.trigger')!.getBoundingClientRect().toJSON());
    expect(r.top).toBeGreaterThanOrEqual(trigger.bottom);
    expect(r.width).toBeLessThan(600);
    expect(r.presetsAbove).toBe(false);
    await page.close();
  });
});
