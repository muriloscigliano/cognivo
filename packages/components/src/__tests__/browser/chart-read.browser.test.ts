// @vitest-environment node
/**
 * Dashboard design audit, 2026-11-17 (P2-10): the chart could not be read —
 * no hover value, no y reference, sparse daily counts drawn as a spiky
 * line, a flat accent line at zero for "Today" — and its colours were fixed
 * hex values resolved once (a theme switch never reached them).
 *
 * Now, in real Chromium:
 * - colours are tokens, live: a theme switch repaints the marks;
 * - `type="auto"`: bars (one series colour) for up to 30 points, a line
 *   above that;
 * - one dashed grid line at the maximum, its value at 12 px muted;
 * - a crosshair and a small tooltip card (label, value) follow the pointer,
 *   and the arrow keys on the focused chart;
 * - no data, or only zeros: the card keeps its shape and shows the empty
 *   title and line at the bottom, no chart.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const SOURCE = resolve(__dirname, '..', '..', 'components', 'cg-chart', 'cg-chart.ts');

const days = (n: number, f: (i: number) => number) =>
  Array.from({ length: n }, (_, i) => ({ label: `Nov ${i + 1}`, value: f(i) }));

async function chart(attrs: string, data: unknown): Promise<Page> {
  const page = await openPage(['cg-chart'], `<div style="width:600px"><cg-chart id="c" ${attrs}></cg-chart></div>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.addStyleTag({ content: 'body { background: var(--cg-color-surface-panel-background); }' });
  await page.evaluate((data) => { (document.getElementById('c') as HTMLElement & { data: unknown }).data = data; }, data);
  await settleStyles(page);
  return page;
}

const token = (page: Page, name: string) =>
  page.evaluate((name) => {
    const p = document.createElement('div');
    p.style.color = `var(${name})`;
    document.body.append(p);
    const v = getComputedStyle(p).color;
    p.remove();
    return v;
  }, name);

describe('cg-chart source', () => {
  it('has no fixed hex colours', () => {
    const code = readFileSync(SOURCE, 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
    expect(code.match(/#[0-9a-f]{3,8}\b/gi) ?? []).toEqual([]);
  });
});

describe.skipIf(!browserAvailable)('cg-chart reads (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('type="auto": up to 30 points are bars in one token colour that follows the theme; more are a line', async () => {
    const page = await chart('type="auto" height="200"', days(14, (i) => (i % 3) * 4));
    const fills = () => page.evaluate(() => Array.from(document.getElementById('c')!.shadowRoot!.querySelectorAll('rect.bar'), (r) => getComputedStyle(r).fill));
    const light = await fills();
    expect(light.length).toBe(14);
    expect(new Set(light).size).toBe(1);
    expect(light[0]).toBe(await token(page, '--cg-color-chart-1-background'));
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await settleStyles(page);
    expect((await fills())[0]).toBe(await token(page, '--cg-color-chart-1-background'));
    await page.evaluate((d) => { (document.getElementById('c') as HTMLElement & { data: unknown }).data = d; }, days(60, (i) => i % 7));
    await settleStyles(page);
    expect(await page.evaluate(() => {
      const root = document.getElementById('c')!.shadowRoot!;
      return { bars: root.querySelectorAll('rect.bar').length, line: root.querySelectorAll('path.series-line').length };
    })).toEqual({ bars: 0, line: 1 });
    await page.close();
  });

  it('one dashed grid line at the maximum, with its value at 12 px muted', async () => {
    const page = await chart('type="auto" height="200"', days(10, (i) => i * 3));
    const r = await page.evaluate(() => {
      const root = document.getElementById('c')!.shadowRoot!;
      const lines = Array.from(root.querySelectorAll('line.grid'));
      const label = root.querySelector('.max-label')!;
      const ls = getComputedStyle(label);
      return { count: lines.length, dash: lines.map((l) => getComputedStyle(l).strokeDasharray), text: label.textContent!.trim(), size: ls.fontSize, color: ls.color };
    });
    expect(r.count).toBe(1);
    expect(r.dash[0]).not.toBe('none');
    expect(r.text).toBe('27');
    expect(r.size).toBe('12px');
    expect(r.color).toBe(await token(page, '--cg-color-on-surface-container-default'));
    await page.close();
  });

  it('crosshair and tooltip card follow the pointer and the arrow keys', async () => {
    const page = await chart('type="auto" height="200" title="Sign-ups"', days(10, (i) => i + 1));
    const box = await page.evaluate(() => document.getElementById('c')!.shadowRoot!.querySelector('rect.bar:nth-of-type(6)')!.getBoundingClientRect().toJSON());
    await page.mouse.move(box.x + box.width / 2, box.y + box.height - 2);
    await settleStyles(page);
    const shown = await page.evaluate(() => {
      const root = document.getElementById('c')!.shadowRoot!;
      const tip = root.querySelector('.tip')!;
      const cross = root.querySelector('line.crosshair');
      return { tip: getComputedStyle(tip).display, text: tip.textContent!.replace(/\s+/g, ' ').trim(), cross: !!cross, crossX: cross ? cross.getBoundingClientRect().x : -1 };
    });
    expect(shown.tip).not.toBe('none');
    expect(shown.text).toBe('Nov 6 6');
    expect(shown.cross).toBe(true);
    expect(Math.abs(shown.crossX - (box.x + box.width / 2))).toBeLessThanOrEqual(2);
    await page.mouse.move(0, 0);
    await settleStyles(page);
    expect(await page.evaluate(() => getComputedStyle(document.getElementById('c')!.shadowRoot!.querySelector('.tip')!).display)).toBe('none');
    // Keyboard: focus the chart, arrows move the reading.
    await page.evaluate(() => (document.getElementById('c')!.shadowRoot!.querySelector('svg') as SVGElement).focus());
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await settleStyles(page);
    expect(await page.evaluate(() => document.getElementById('c')!.shadowRoot!.querySelector('.tip')!.textContent!.replace(/\s+/g, ' ').trim())).toBe('Nov 2 2');
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('the reading\'s live region is always there (never display: none), so the first reading is announced', async () => {
    const page = await chart('type="auto" height="200" title="Sign-ups"', days(5, (i) => i + 1));
    const live = () => page.evaluate(() => {
      const el = document.getElementById('c')!.shadowRoot!.querySelector('[aria-live]') as HTMLElement | null;
      let hidden = false;
      for (let n: Element | null = el; n; n = n.parentElement) if (getComputedStyle(n).display === 'none' || getComputedStyle(n).visibility === 'hidden') hidden = true;
      return { exists: !!el, hidden, text: el?.textContent!.replace(/\s+/g, ' ').trim() ?? '' };
    });
    expect(await live()).toEqual({ exists: true, hidden: false, text: '' });
    await page.evaluate(() => (document.getElementById('c')!.shadowRoot!.querySelector('svg') as SVGElement).focus());
    await page.keyboard.press('ArrowRight');
    await settleStyles(page);
    expect(await live()).toEqual({ exists: true, hidden: false, text: 'Nov 1: 1' });
    // The visual card is not a second announcement.
    expect(await page.evaluate(() => document.getElementById('c')!.shadowRoot!.querySelector('.tip')!.getAttribute('aria-hidden'))).toBe('true');
    await page.close();
  });

  it('a tap reads the point under the finger (bars) or the slice (pie)', async () => {
    const page = await chart('type="auto" height="200" title="Sign-ups"', days(8, (i) => i + 1));
    const box = await page.evaluate(() => document.getElementById('c')!.shadowRoot!.querySelector('rect.bar:nth-of-type(4)')!.getBoundingClientRect().toJSON());
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
    const tap = async (x: number, y: number) => {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] } as never);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] } as never);
    };
    await tap(box.x + box.width / 2, box.y + box.height - 2);
    await settleStyles(page);
    const read = () => page.evaluate(() => {
      const root = document.getElementById('c')!.shadowRoot!;
      return { tip: getComputedStyle(root.querySelector('.tip')!).display, live: root.querySelector('[aria-live]')!.textContent!.replace(/\s+/g, ' ').trim() };
    });
    expect(await read()).toEqual({ tip: 'flex', live: 'Nov 4: 4' });
    await page.evaluate(() => { const c = document.getElementById('c') as HTMLElement & { type: string; data: unknown }; c.type = 'pie'; c.data = [{ label: 'Open', value: 3 }, { label: 'Closed', value: 1 }]; });
    await settleStyles(page);
    const slice = await page.evaluate(() => document.getElementById('c')!.shadowRoot!.querySelector('path.anim-slice')!.getBoundingClientRect().toJSON());
    await tap(slice.x + slice.width * 0.6, slice.y + slice.height * 0.5);
    await settleStyles(page);
    expect(await read()).toEqual({ tip: 'flex', live: 'Open: 3' });
    await page.close();
  });

  it('a visually hidden data table holds the same numbers for assistive tech', async () => {
    const page = await chart('type="auto" height="200" title="Sign-ups"', days(3, (i) => (i + 1) * 10));
    const t = page.getByRole('table', { name: 'Sign-ups' });
    await expect(t.count()).resolves.toBe(1);
    const rows = await page.evaluate(() => Array.from(document.getElementById('c')!.shadowRoot!.querySelectorAll('table tr'), (r) => Array.from(r.children, (c) => c.textContent!.trim())));
    expect(rows).toEqual([['Label', 'Value'], ['Nov 1', '10'], ['Nov 2', '20'], ['Nov 3', '30']]);
    // Clipped to a 1 px box: nothing of it shows.
    const clip = await page.evaluate(() => {
      const box = document.getElementById('c')!.shadowRoot!.querySelector('table')!.parentElement!;
      const r = box.getBoundingClientRect();
      return { area: r.width * r.height, overflow: getComputedStyle(box).overflow };
    });
    expect(clip).toEqual({ area: 1, overflow: 'hidden' });
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('zero data: the card keeps its height and shows the empty title and line at the bottom, no chart', async () => {
    const page = await chart('type="auto" height="200" contained title="Today" empty-text="No activity yet" empty-description="Sign-ups show here as they come in."', days(9, () => 0));
    const r = await page.evaluate(() => {
      const root = document.getElementById('c')!.shadowRoot!;
      const wrap = root.querySelector('.wrap')!.getBoundingClientRect();
      const empty = root.querySelector('.empty')!;
      const e = empty.getBoundingClientRect();
      return { svg: !!root.querySelector('svg'), title: root.querySelector('.title')?.textContent?.trim(), text: empty.textContent!.replace(/\s+/g, ' ').trim(), bottomGap: Math.round(wrap.bottom - e.bottom), height: Math.round(wrap.height) };
    });
    expect(r.svg).toBe(false);
    expect(r.title).toBe('Today');
    expect(r.text).toBe('No activity yet Sign-ups show here as they come in.');
    expect(r.bottomGap).toBeLessThanOrEqual(24);
    expect(r.height).toBeGreaterThanOrEqual(200);
    await page.close();
  });
});
