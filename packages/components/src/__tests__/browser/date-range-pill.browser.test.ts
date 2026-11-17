// @vitest-environment node
/**
 * Dashboard design audit, 2026-11-17 (P1-6): the Campaigns header used two
 * 48 px native date inputs ("19/10/2026") and a "Show" button top-aligned to
 * their labels. The fix is one 36 px date-range pill ("Oct 19 – Nov 17 ⌄")
 * with presets that applies on change.
 *
 * Now, in real Chromium: `cg-date-range-picker variant="pill"` is a 36 px
 * full pill in the toolbar (no visible label; `label` names it) showing the
 * range compactly (the year only when it is not this year); `presets`
 * ("7d", "30d", "90d", "12m", "ytd" or `{ label, from, to }`) sit beside the
 * calendar and apply at once (event, form value, the panel closes); the
 * matching preset is marked pressed; the closed panel is out of the
 * accessibility tree.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const Y = new Date().getFullYear();
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

async function open(attrs: string): Promise<Page> {
  const page = await openPage(['cg-date-range-picker'], `<form><cg-date-range-picker id="r" name="period" variant="pill" label="Period" ${attrs}></cg-date-range-picker></form>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate(() => { document.documentElement.lang = 'en-US'; });
  await settleStyles(page);
  return page;
}

describe.skipIf(!browserAvailable)('cg-date-range-picker variant="pill" (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('a 36 px full pill named by its label, the range written compactly (no year when it is this year)', async () => {
    const page = await open(`from="${Y}-10-19" to="${Y}-11-17"`);
    const r = await page.evaluate(() => {
      const root = document.getElementById('r')!.shadowRoot!;
      const t = root.querySelector('.trigger')!;
      const s = getComputedStyle(t);
      return { h: t.getBoundingClientRect().height, radius: s.borderTopLeftRadius, text: t.textContent!.replace(/\s+/g, ' ').trim(), label: !!root.querySelector('.label') };
    });
    expect(r.h).toBe(36);
    expect(r.radius).toBe(await page.evaluate(() => { const p = document.createElement('div'); p.style.borderRadius = 'var(--cg-border-radius-full)'; document.body.append(p); const v = getComputedStyle(p).borderTopLeftRadius; p.remove(); return v; }));
    expect(r.text).toBe('Oct 19 – Nov 17');
    expect(r.label).toBe(false);
    await expect(page.getByRole('combobox', { name: 'Period' }).count()).resolves.toBe(1);
    await page.evaluate((y) => { const el = document.getElementById('r')!; el.setAttribute('from', `${y - 1}-12-20`); }, Y);
    await settleStyles(page);
    expect(await page.evaluate(() => document.getElementById('r')!.shadowRoot!.querySelector('.trigger')!.textContent!.replace(/\s+/g, ' ').trim()))
      .toBe(`Dec 20, ${Y - 1} – Nov 17, ${Y}`);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('presets apply at once: event, form value, the panel closes; the matching preset is pressed', async () => {
    const page = await open(`presets='["7d","30d","90d"]'`);
    await page.evaluate(() => {
      (window as unknown as { got: unknown[] }).got = [];
      document.getElementById('r')!.addEventListener('cg-date-range-change', (e) => (window as unknown as { got: unknown[] }).got.push((e as CustomEvent).detail));
    });
    await page.getByRole('combobox', { name: 'Period' }).click();
    await settleStyles(page);
    await expect(page.getByRole('button', { name: 'Last 30 days' }).count()).resolves.toBe(1);
    await page.getByRole('button', { name: 'Last 7 days' }).click();
    await settleStyles(page);
    const today = new Date();
    const from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    expect(await page.evaluate(() => (window as unknown as { got: unknown[] }).got)).toEqual([{ from: iso(from), to: iso(today) }]);
    expect(await page.evaluate(() => document.getElementById('r')!.hasAttribute('open'))).toBe(false);
    expect(await page.evaluate(() => Array.from(new FormData(document.querySelector('form')!).entries()))).toEqual([['from', iso(from)], ['to', iso(today)]]);
    await page.getByRole('combobox', { name: 'Period' }).click();
    await settleStyles(page);
    await expect(page.getByRole('button', { name: 'Last 7 days' }).getAttribute('aria-pressed')).resolves.toBe('true');
    await expect(page.getByRole('button', { name: 'Last 30 days' }).getAttribute('aria-pressed')).resolves.toBe('false');
    await page.close();
  });

  it('closed: the panel is out of the accessibility tree', async () => {
    const page = await open(`presets='["7d"]'`);
    await expect(page.getByRole('button', { name: 'Last 7 days' }).count()).resolves.toBe(0);
    await page.close();
  });
});
