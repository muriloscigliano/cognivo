// @vitest-environment node
/**
 * Dashboard swap onto Cognivo, 2026-11-18: the date pickers' calendar icon
 * was painted with `--cg-color-input-icon-default`, which resolves to an
 * accent (red-500 in light, the brand lime in dark).
 *
 * Now, in real Chromium:
 * - both presets, both themes: the trigger's calendar icon of
 *   `cg-date-picker`, `cg-date-range-picker` (field and pill) and
 *   `cg-date-time-picker` is a grey;
 * - neutral preset, both themes: with each picker open on a selected value,
 *   every colour painted anywhere in the picker (text, fill, border, outline,
 *   SVG fill / stroke, shadow), nested calendars included, is a grey — the
 *   selected day is the neutral primary, never an accent.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist');
const TOKENS_CSS = resolve(TOKENS, 'index.css');
const NEUTRAL_CSS = resolve(TOKENS, 'themes', 'neutral.css');

const now = new Date();
const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
const DAY = `${ym}-${now.getDate() === 12 ? 13 : 12}`;

const PICKERS = ['cg-date-picker', 'cg-date-range-picker', 'cg-date-time-picker'];
const BODY = `<div style="padding:24px; display:grid; gap:16px; width:720px">
  <cg-date-picker id="date" label="Day" value="${DAY}"></cg-date-picker>
  <cg-date-range-picker id="range" label="Range" from="${ym}-10" to="${ym}-14"></cg-date-range-picker>
  <cg-date-range-picker id="pill" variant="pill" label="Period" from="${ym}-10" to="${ym}-14"></cg-date-range-picker>
  <cg-date-time-picker id="dt" label="When" value="${DAY}T09:30"></cg-date-time-picker>
</div>`;

async function open(preset: 'default' | 'neutral', theme: 'light' | 'dark'): Promise<Page> {
  const page = await openPage(PICKERS, BODY);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  if (preset === 'neutral') await page.addStyleTag({ path: NEUTRAL_CSS });
  if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await settleStyles(page);
  return page;
}

/** Grey: the channels within a small spread (any alpha). */
const grey = (c: string) => {
  const [r, g, b, a = 1] = c.match(/[\d.]+/g)!.map(Number);
  return a === 0 || Math.max(r!, g!, b!) - Math.min(r!, g!, b!) <= 12;
};

/** The computed colour of each picker's trigger calendar icon. */
const iconColours = (page: Page) => page.evaluate(() =>
  Object.fromEntries(['date', 'range', 'pill', 'dt'].map((id) => {
    const icon = document.getElementById(id)!.shadowRoot!.querySelector('.trigger svg, .trigger-icon svg, .pill-icon svg')!;
    return [id, getComputedStyle(icon).color];
  })));

/** Every non-grey colour painted inside the element's shadow tree (nested shadow roots too), as "selector prop = colour". */
const accents = (page: Page, id: string) => page.evaluate((id) => {
  const PROPS = ['color', 'background-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
    'outline-color', 'fill', 'stroke', 'box-shadow', 'background-image'];
  const out: string[] = [];
  const isGrey = (c: string) => {
    const [r, g, b, a = 1] = c.match(/[\d.]+/g)!.map(Number);
    return a === 0 || Math.max(r!, g!, b!) - Math.min(r!, g!, b!) <= 12;
  };
  const visit = (root: ShadowRoot) => {
    for (const el of Array.from(root.querySelectorAll('*'))) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      for (const p of PROPS) {
        const v = cs.getPropertyValue(p);
        if (p === 'outline-color' && cs.outlineStyle === 'none') continue;
        if (p.startsWith('border') && cs.getPropertyValue(p.replace('color', 'style')) === 'none') continue;
        for (const c of v.match(/rgba?\([^)]*\)/g) ?? []) {
          if (!isGrey(c)) out.push(`${el.tagName.toLowerCase()}.${el.getAttribute('class') ?? ''} ${p} = ${c}`);
        }
      }
      if (el.shadowRoot) visit(el.shadowRoot);
    }
  };
  visit(document.getElementById(id)!.shadowRoot!);
  return [...new Set(out)];
}, id);

describe.skipIf(!browserAvailable)('date pickers: neutral icon and neutral preset (real browser)', { timeout: 90_000 }, () => {
  afterAll(closeBrowser);

  for (const theme of ['light', 'dark'] as const) {
    for (const preset of ['default', 'neutral'] as const) {
      it(`${preset} preset, ${theme}: the calendar icon in every picker's trigger is grey`, async () => {
        const page = await open(preset, theme);
        const colours = await iconColours(page);
        for (const [id, c] of Object.entries(colours)) expect(grey(c), `${id}: ${c}`).toBe(true);
        await page.close();
      });
    }

    it(`neutral preset, ${theme}: an open picker paints no accent anywhere (the selected day is the neutral primary)`, async () => {
      const page = await open('neutral', theme);
      for (const id of ['date', 'range', 'pill', 'dt']) {
        await page.locator(`#${id}`).locator('.trigger').first().click();
        await settleStyles(page);
        expect(await accents(page, id), id).toEqual([]);
        await page.keyboard.press('Escape');
        await settleStyles(page);
      }
      await page.close();
    });

    it(`control, default preset, ${theme}: the same walk finds the accent of the selected day (it reaches the open calendars)`, async () => {
      const page = await open('default', theme);
      for (const id of ['date', 'range', 'pill', 'dt']) {
        await page.locator(`#${id}`).locator('.trigger').first().click();
        await settleStyles(page);
        expect((await accents(page, id)).some((a) => /selected|range-(start|end)/.test(a)), id).toBe(true);
        await page.keyboard.press('Escape');
        await settleStyles(page);
      }
      await page.close();
    });
  }
});
