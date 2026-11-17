// @vitest-environment node
/**
 * Dashboard swap onto Cognivo, 2026-11-18: cg-date-time-picker's trigger
 * filled its container and cut its text with an ellipsis, so at normal
 * widths the zone read "Jan 31, 2027, 9:00 AM (GMT…" — and in a narrower
 * column the time itself was cut.
 *
 * Now, in real Chromium:
 * - the zone is a compact muted suffix ("GMT−3", a real minus, no brackets)
 *   after the date and time;
 * - the trigger is as wide as its content, up to its container;
 * - the date and time are never cut (only the zone suffix gives way when the
 *   container is too narrow for both).
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function open(width: number, zone = 'America/Sao_Paulo', value = '2027-01-31T09:00'): Promise<Page> {
  const page = await openPage(['cg-date-time-picker'],
    `<div id="box" style="width:${width}px"><cg-date-time-picker label="Send on" time-zone="${zone}" value="${value}"></cg-date-time-picker></div>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate(() => { document.documentElement.lang = 'en-US'; (document.querySelector('cg-date-time-picker') as HTMLElement & { requestUpdate(): void }).requestUpdate(); });
  await settleStyles(page);
  return page;
}

const measure = (page: Page) => page.evaluate(() => {
  const root = document.querySelector('cg-date-time-picker')!.shadowRoot!;
  const trigger = root.querySelector('.trigger')!;
  const value = root.querySelector('.trigger-value') as HTMLElement | null;
  const zone = root.querySelector('.trigger-zone') as HTMLElement | null;
  const t = trigger.getBoundingClientRect();
  const v = value?.getBoundingClientRect();
  return {
    value: value?.textContent!.trim() ?? '',
    zone: zone?.textContent!.trim() ?? '',
    zoneColor: zone ? getComputedStyle(zone).color : '',
    /** The value's text fits its own box and its box sits inside the trigger. */
    valueWhole: !!value && value.scrollWidth <= value.clientWidth + 0.5 && !!v && v.right <= t.right + 0.5,
    zoneWhole: !!zone && zone.scrollWidth <= zone.clientWidth + 0.5 && zone.getBoundingClientRect().right <= t.right + 0.5,
    /** The zone suffix is either wholly visible or wholly hidden (never a cut offset). */
    zoneShown: (() => {
      if (!zone) return 'none';
      const z = zone.getBoundingClientRect();
      const c = root.querySelector('.trigger-text')!.getBoundingClientRect();
      const inside = z.top >= c.top - 0.5 && z.bottom <= c.bottom + 0.5 && z.left >= c.left - 0.5 && z.right <= c.right + 0.5 && zone.scrollWidth <= zone.clientWidth + 0.5;
      const outside = z.top >= c.bottom - 0.5 || z.left >= c.right - 0.5 || z.width === 0;
      return inside ? 'whole' : outside ? 'hidden' : 'cut';
    })(),
    valueEllipsis: !!value && getComputedStyle(value).textOverflow === 'ellipsis' && value.scrollWidth > value.clientWidth,
    name: trigger.getAttribute('aria-label') ?? '',
    tooltip: trigger.getAttribute('title') ?? '',
    trigger: t.width,
    box: document.getElementById('box')!.getBoundingClientRect().width,
  };
});

describe.skipIf(!browserAvailable)('cg-date-time-picker trigger fits its content (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('the zone is a compact muted suffix after the whole date and time', async () => {
    const page = await open(400);
    const r = await measure(page);
    expect(r.value).toBe('Jan 31, 2027, 9:00 AM');
    expect(r.zone).toBe('GMT−3');
    expect(r.valueWhole).toBe(true);
    expect(r.zoneWhole).toBe(true);
    expect(r.zoneColor).toBe(await page.evaluate(() => {
      const p = document.createElement('div'); p.style.color = 'var(--cg-color-input-text-placeholder)'; document.body.append(p);
      const c = getComputedStyle(p).color; p.remove(); return c;
    }));
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('in a wide container the trigger is as wide as its content, not the container', async () => {
    const page = await open(720);
    const r = await measure(page);
    expect(r.trigger).toBeLessThan(360);
    expect(r.valueWhole && r.zoneWhole).toBe(true);
    await page.close();
  });

  it('in a narrow container the trigger stays inside it and the date and time are never cut', async () => {
    for (const width of [260, 230]) {
      const page = await open(width);
      const r = await measure(page);
      expect(r.trigger, `${width}`).toBeLessThanOrEqual(r.box);
      expect(r.valueWhole, `${width}: date and time whole`).toBe(true);
      await page.close();
    }
  });

  it('Asia/Kolkata at 260 px: the zone "GMT+5:30" is whole or hidden, never cut to a wrong offset; the name and tooltip carry it', async () => {
    const page = await open(260, 'Asia/Kolkata');
    const r = await measure(page);
    expect(r.zone).toBe('GMT+5:30');
    expect(r.zoneShown).not.toBe('cut');
    expect(r.valueWhole).toBe(true);
    expect(r.name).toBe('Send on, Jan 31, 2027, 9:00 AM GMT+5:30');
    expect(r.tooltip).toBe('Jan 31, 2027, 9:00 AM GMT+5:30');
    await page.close();
  });

  it('below ~205 px the value ends in an ellipsis inside the trigger (no hard clip); the name carries the whole value', async () => {
    const page = await open(180);
    const r = await measure(page);
    expect(r.trigger).toBeLessThanOrEqual(r.box);
    expect(r.valueEllipsis).toBe(true);
    expect(r.zoneShown).not.toBe('cut');
    expect(r.name).toBe('Send on, Jan 31, 2027, 9:00 AM GMT\u22123');
    await page.close();
  });

  it('the trigger keeps its width between empty and filled', async () => {
    const page = await open(600, 'America/Sao_Paulo', '');
    const empty = (await measure(page)).trigger;
    await page.evaluate(() => { (document.querySelector('cg-date-time-picker') as HTMLElement & { value: string }).value = '2027-01-31T09:00'; });
    await settleStyles(page);
    const filled = await measure(page);
    expect(filled.value).toBe('Jan 31, 2027, 9:00 AM');
    expect(Math.abs(filled.trigger - empty)).toBeLessThanOrEqual(1);
    await page.close();
  });
});
