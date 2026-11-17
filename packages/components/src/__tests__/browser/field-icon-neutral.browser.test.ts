// @vitest-environment node
/**
 * Independent review, 2026-11-18: the date pickers stopped using
 * `--cg-color-input-icon-default` because it resolves to an accent (red-500
 * in light, the brand lime in dark) — but every other field icon still used
 * it: cg-input's prefix / suffix, cg-time-picker's clock, cg-autocomplete's
 * chevron, cg-file-input, ai-search.
 *
 * Now the token itself is the field's muted grey (the placeholder colour),
 * so, in real Chromium, both presets and both themes: those icons are grey.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist');

async function open(preset: 'default' | 'neutral', theme: 'light' | 'dark'): Promise<Page> {
  const page = await openPage(['cg-input', 'cg-time-picker', 'cg-autocomplete'], `<div style="padding:24px; display:grid; gap:16px; width:400px">
    <cg-input id="input" label="Search"><span slot="prefix">@</span></cg-input>
    <cg-time-picker id="time" label="At"></cg-time-picker>
    <cg-autocomplete id="auto" label="Pick"></cg-autocomplete>
  </div>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: resolve(TOKENS, 'index.css') });
  if (preset === 'neutral') await page.addStyleTag({ path: resolve(TOKENS, 'themes', 'neutral.css') });
  if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await settleStyles(page);
  return page;
}

const isGrey = (c: string) => {
  const [r, g, b] = c.match(/[\d.]+/g)!.map(Number);
  return Math.max(r!, g!, b!) - Math.min(r!, g!, b!) <= 12;
};

describe.skipIf(!browserAvailable)('field icons are a neutral grey (real browser)', { timeout: 90_000 }, () => {
  afterAll(closeBrowser);

  for (const preset of ['default', 'neutral'] as const) {
    for (const theme of ['light', 'dark'] as const) {
      it(`${preset} preset, ${theme}: input prefix, time-picker clock and autocomplete chevron are grey`, async () => {
        const page = await open(preset, theme);
        const colours = await page.evaluate(() => ({
          input: getComputedStyle(document.getElementById('input')!.shadowRoot!.querySelector('.prefix')!).color,
          time: getComputedStyle(document.getElementById('time')!.shadowRoot!.querySelector('.trigger-icon')!).color,
          auto: getComputedStyle(document.getElementById('auto')!.shadowRoot!.querySelector('.chevron')!).color,
        }));
        for (const [name, c] of Object.entries(colours)) expect(isGrey(c), `${name} = ${c}`).toBe(true);
        await page.close();
      });
    }
  }
});
