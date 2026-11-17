// @vitest-environment node
/**
 * Independent review, 2026-11-18: on a phone the open cg-date-range-picker
 * was a bottom sheet only in looks — `position: fixed` inside the host, so a
 * transformed or overflow-hidden ancestor moved or clipped it; no backdrop,
 * the page behind scrolled, focus stayed on the trigger, and its 90vh ran
 * under a phone's browser bars.
 *
 * Now, in real Chromium at 390 × 844, the sheet is a real modal: in the top
 * layer (popover), with a backdrop, the shared body scroll lock, focus moved
 * into it and returned to the trigger on close, Escape and a backdrop tap
 * close it, `aria-modal`, and at most 90dvh tall — also under a transformed,
 * overflow-hidden ancestor.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function open(): Promise<Page> {
  const page = await openPage(['cg-date-range-picker'],
    `<div id="card" style="transform: translateX(0); overflow: hidden; height: 80px; margin: 40px 16px">
      <cg-date-range-picker id="r" label="Period" variant="pill" presets='["7d","30d"]' from="2026-11-01" to="2026-11-14"></cg-date-range-picker>
    </div><div style="height: 3000px"></div>`);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate(() => { document.documentElement.lang = 'en-US'; });
  await settleStyles(page);
  await page.locator('#r').locator('.trigger').click();
  await settleStyles(page);
  return page;
}

const state = (page: Page) => page.evaluate(() => {
  const host = document.getElementById('r')!;
  const root = host.shadowRoot!;
  const sheet = root.querySelector('.dropdown') as HTMLElement;
  const r = sheet.getBoundingClientRect();
  const cal = root.querySelector('cg-calendar')!;
  const day = cal.shadowRoot!.querySelector('.day')!.getBoundingClientRect();
  let deep: Element | null = document.activeElement;
  while (deep?.shadowRoot?.activeElement) deep = deep.shadowRoot.activeElement;
  const inSheet = (n: Node | null): boolean => {
    for (let x: Node | null = n; x; x = (x as Node).parentNode ?? ((x as ShadowRoot).host ?? null)) if (x === sheet) return true;
    return false;
  };
  return {
    open: host.hasAttribute('open'),
    topLayer: sheet.matches(':popover-open'),
    modal: sheet.getAttribute('aria-modal'),
    left: r.left, right: r.right, bottom: r.bottom,
    maxHeight: getComputedStyle(sheet).maxHeight,
    backdrop: getComputedStyle(sheet, '::backdrop').backgroundColor,
    // A day is hit-testable (not clipped by the overflow-hidden card).
    dayHit: document.elementFromPoint(day.left + day.width / 2, day.top + day.height / 2) === host,
    bodyOverflow: document.body.style.overflow,
    focusInside: inSheet(deep),
    focusOnTrigger: deep === root.querySelector('.trigger'),
  };
});

describe.skipIf(!browserAvailable)('cg-date-range-picker phone sheet is a modal (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('top layer, backdrop, scroll lock, focus in, aria-modal, 90dvh — under a transformed, overflow-hidden ancestor', async () => {
    const page = await open();
    const s = await state(page);
    expect(s.open).toBe(true);
    expect(s.topLayer).toBe(true);
    expect(s.modal).toBe('true');
    expect(s.left).toBe(0);
    expect(s.right).toBe(390);
    expect(s.bottom).toBe(844);
    expect(s.dayHit).toBe(true);
    expect(s.maxHeight).toBe(`${0.9 * 844}px`);
    expect(s.backdrop).not.toBe('rgba(0, 0, 0, 0)');
    expect(s.bodyOverflow).toBe('hidden');
    expect(s.focusInside).toBe(true);
    await page.close();
  });

  it('Escape closes it, releases the scroll lock and returns focus to the trigger', async () => {
    const page = await open();
    const before = await state(page);
    expect(before.focusInside && before.bodyOverflow === 'hidden').toBe(true);
    await page.keyboard.press('Escape');
    await settleStyles(page);
    const s = await state(page);
    expect(s.open).toBe(false);
    expect(s.topLayer).toBe(false);
    expect(s.bodyOverflow).toBe('');
    expect(s.focusOnTrigger).toBe(true);
    await page.close();
  });

  it('a tap on the backdrop closes it', async () => {
    const page = await open();
    expect((await state(page)).topLayer).toBe(true);
    await page.mouse.click(195, 20);
    await settleStyles(page);
    const s = await state(page);
    expect(s.open).toBe(false);
    expect(s.bodyOverflow).toBe('');
    await page.close();
  });
});
