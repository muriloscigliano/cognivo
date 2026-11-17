// @vitest-environment node
/**
 * Dashboard design audit, 2026-11-17 (P1-11, P1-12, P2-6, P2-16, P3-2, P3-5):
 * badges came in three sizes with saturated tints and a border; the dialog
 * blurred and dimmed the page hard; errors were a saturated pink callout;
 * loading was a word and a spinner, empty states varied; the segmented
 * control's 24 px options sat in a 32 px track next to 32 px pills; the
 * pager was a third radius at 36 px.
 *
 * Now, read in real Chromium: one 28 px pill badge with ~8 % tints and no
 * border; a 12 px-radius dialog over a 32 % backdrop with no blur, 36 px
 * buttons; `cg-callout quiet` (panel surface, hairline, 16 px status icon,
 * 14 px title, 13 px muted line); `cg-empty-state compact` (no icon, 14 px
 * title, 13 px muted line, optional pill); `cg-skeleton variant="row"` list
 * rows at the list density, one status for the whole group; a 32 px
 * segmented track with 26 px options inset 3 px; 28 px pager pills with an
 * "1–25 of 90" summary.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function open(tags: string[], body: string, theme: 'light' | 'dark' = 'light'): Promise<Page> {
  const page = await openPage(tags, body);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.addStyleTag({ content: 'body { background: var(--cg-color-surface-panel-background); color: var(--cg-color-state-text) }' });
  if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await settleStyles(page);
  return page;
}

const inner = (page: Page, host: string, sel: string) =>
  page.evaluate(([host, sel]) => {
    const el = document.querySelector(host)!.shadowRoot!.querySelector(sel)!;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return { top: r.top, left: r.left, height: r.height, width: r.width, radius: s.borderTopLeftRadius, bg: s.backgroundColor, color: s.color,
      borderWidth: s.borderTopWidth, borderColor: s.borderTopColor, fontSize: s.fontSize, fontWeight: s.fontWeight, filter: s.backdropFilter, display: s.display };
  }, [host, sel] as const);

const token = (page: Page, prop: string, name: string) =>
  page.evaluate(([prop, name]) => {
    const p = document.createElement('div');
    (p.style as unknown as Record<string, string>)[prop] = `var(${name})`;
    document.body.append(p);
    const v = (getComputedStyle(p) as unknown as Record<string, string>)[prop]!;
    p.remove();
    return v;
  }, [prop, name] as const);

const alpha = (c: string) => { const m = /rgba\([^)]*,\s*([\d.]+)\)$/.exec(c); return m ? Number(m[1]) : 1; };

describe.skipIf(!browserAvailable)('quiet surfaces (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  for (const theme of ['light', 'dark'] as const) {
    it(`cg-badge (${theme}): one 28 px pill at every size, tints at most 10 %, no border`, async () => {
      const page = await open(['cg-badge'], `
        <cg-badge id="a" variant="success" size="sm">Confirmed</cg-badge>
        <cg-badge id="b" variant="warning" size="md">Waiting</cg-badge>
        <cg-badge id="c" variant="danger" size="lg">Bounces</cg-badge>
        <cg-badge id="d" variant="neutral">Draft</cg-badge>`, theme);
      for (const id of ['#a', '#b', '#c', '#d']) {
        const b = await inner(page, id, '.badge');
        expect(b.height, id).toBe(28);
        expect(b.radius, id).toBe(await token(page, 'borderTopLeftRadius', '--cg-border-radius-full'));
        expect(b.fontSize, id).toBe('12px');
        expect(b.borderWidth === '0px' || alpha(b.borderColor) === 0, `${id} border ${b.borderColor}`).toBe(true);
        expect(alpha(b.bg), `${id} tint ${b.bg}`).toBeLessThanOrEqual(0.1);
        expect(alpha(b.bg), `${id} tint ${b.bg}`).toBeGreaterThan(0);
      }
      expect(await axeViolations(page)).toEqual([]);
      await page.close();
    });
  }

  it('cg-modal: radius 12, backdrop black 32 % (dark 56 %) with no blur, 36 px footer buttons', async () => {
    const page = await open(['cg-modal', 'cg-button'], `
      <cg-modal id="m" open title="Delete Quinn?" size="sm">Their purchases stay as evidence.
        <div slot="footer"><cg-button variant="secondary">Cancel</cg-button><cg-button type="danger" variant="primary">Delete</cg-button></div></cg-modal>`);
    const modal = await inner(page, '#m', '.modal');
    expect(modal.radius).toBe('12px');
    const back = await inner(page, '#m', '.backdrop');
    expect(back.filter).toBe('none');
    expect(back.bg).toBe('rgba(0, 0, 0, 0.32)');
    const h = await page.evaluate(() => Array.from(document.querySelectorAll('cg-button'), (b) => b.shadowRoot!.querySelector('.btn')!.getBoundingClientRect().height));
    expect(h).toEqual([36, 36]);
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await settleStyles(page);
    expect((await inner(page, '#m', '.backdrop')).bg).toBe('rgba(0, 0, 0, 0.56)');
    await page.close();
  });

  for (const theme of ['light', 'dark'] as const) {
    it(`cg-callout quiet (${theme}): panel surface, hairline border, 16 px status icon, 14 px title, 13 px muted line`, async () => {
      const page = await open(['cg-callout'], `
        <cg-callout id="q" quiet variant="danger" title="Could not load contacts" description="Check the connection and try again."></cg-callout>`, theme);
      const c = await inner(page, '#q', '.callout');
      expect(c.bg).toBe(await token(page, 'backgroundColor', '--cg-color-surface-panel-background'));
      expect(c.borderColor).toBe(await token(page, 'borderTopColor', '--cg-color-surface-hairline'));
      const icon = await inner(page, '#q', '.icon svg');
      expect(icon.width).toBe(16);
      expect(icon.color).toBe(await token(page, 'color', '--cg-color-message-icon-error'));
      const title = await inner(page, '#q', '.title');
      expect(title.fontSize).toBe('14px');
      expect(title.color).toBe(await token(page, 'color', '--cg-color-state-text'));
      const desc = await inner(page, '#q', '.description');
      expect(desc.fontSize).toBe('13px');
      expect(desc.color).toBe(await token(page, 'color', '--cg-color-on-surface-container-default'));
      expect(await axeViolations(page)).toEqual([]);
      await page.close();
    });
  }

  it('cg-empty-state compact: no icon, start-aligned, 14 px / 500 title, 13 px muted line, the action pill below', async () => {
    const page = await open(['cg-empty-state', 'cg-button'], `
      <cg-empty-state id="e" compact title="No contacts match these filters" description="Clear them to see everyone.">
        <cg-button slot="actions" size="sm" variant="secondary" rounded="full">Clear filters</cg-button></cg-empty-state>`);
    expect((await inner(page, '#e', '.icon-wrap')).display).toBe('none');
    const title = await inner(page, '#e', '.title');
    expect([title.fontSize, title.fontWeight]).toEqual(['14px', '500']);
    const desc = await inner(page, '#e', '.description');
    expect(desc.fontSize).toBe('13px');
    expect(desc.color).toBe(await token(page, 'color', '--cg-color-on-surface-container-default'));
    const root = await inner(page, '#e', '.root');
    expect(Math.round(title.left)).toBe(Math.round(root.left));
    await expect(page.getByRole('button', { name: 'Clear filters' }).count()).resolves.toBe(1);
    await page.close();
  });

  it('cg-skeleton variant="row": count rows at the list density, decorative inside, one status for the group', async () => {
    const page = await open(['cg-skeleton'], '<div style="width:600px"><cg-skeleton id="s" variant="row" count="4"></cg-skeleton></div>');
    const rows = await page.evaluate(() => Array.from(document.getElementById('s')!.shadowRoot!.querySelectorAll('.row'), (r) => r.getBoundingClientRect().height));
    expect(rows).toEqual([60, 60, 60, 60]);
    await expect(page.getByRole('status').count()).resolves.toBe(1);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('cg-segmented-control: 32 px track, 26 px options inset 3 px from the track edge', async () => {
    const page = await open(['cg-segmented-control'], '<cg-segmented-control id="g" label="Period" value="30d"></cg-segmented-control>');
    await page.evaluate(() => { (document.getElementById('g') as HTMLElement & { options: unknown }).options = [{ value: 'all', label: 'All time' }, { value: '30d', label: '30 days' }]; });
    await settleStyles(page);
    const track = await inner(page, '#g', '.track');
    const seg = await inner(page, '#g', '.segment');
    const ind = await inner(page, '#g', '.indicator');
    expect(track.height).toBe(32);
    expect(seg.height).toBe(26);
    expect(seg.top - track.top).toBe(3);
    expect(ind.height).toBe(26);
    expect(ind.top - track.top).toBe(3);
    await page.close();
  });

  it('cg-pagination: 28 px grey pills, and "1–25 of 90" at the left (13 px muted) when page-size and total-items are set', async () => {
    const page = await open(['cg-pagination'], '<cg-pagination id="p" total="4" current="1" page-size="25" total-items="90"></cg-pagination>');
    const btn = await inner(page, '#p', '.page-btn:not(.active)');
    expect(btn.height).toBe(28);
    expect(btn.radius).toBe(await token(page, 'borderTopLeftRadius', '--cg-border-radius-full'));
    expect(btn.bg).toBe(await token(page, 'backgroundColor', '--cg-color-action-secondary-background-default'));
    const sum = await page.evaluate(() => {
      const el = document.getElementById('p')!.shadowRoot!.querySelector('.summary')!;
      const s = getComputedStyle(el);
      return { text: el.textContent!.trim(), size: s.fontSize };
    });
    expect(sum).toEqual({ text: '1–25 of 90', size: '13px' });
    await page.evaluate(() => { (document.getElementById('p') as HTMLElement & { current: number }).current = 4; });
    await settleStyles(page);
    expect(await page.evaluate(() => document.getElementById('p')!.shadowRoot!.querySelector('.summary')!.textContent!.trim())).toBe('76–90 of 90');
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });
});
