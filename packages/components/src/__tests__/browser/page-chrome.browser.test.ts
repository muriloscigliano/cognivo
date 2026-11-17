// @vitest-environment node
/**
 * Dashboard design audit, 2026-11-17 (P1-3, P1-13, P2-2):
 * - on a phone the top bar was the word "Menu" in a 58×32 px grey button —
 *   no icon, no page title, under the 44 px touch target;
 * - page titles sat at four different heights, sub-lines wrapped to two
 *   lines and the primary button centred on the whole block;
 * - the editors' Save button was 1,500 px away from the last field, with
 *   nothing marking the form as changed.
 *
 * Now, read in real Chromium:
 * - `cg-app-shell` `mobile-header` slot: at phone width a real 48 px top bar
 *   with a 44 px menu icon button (`--cg-size-touch-target`) that opens and
 *   closes the drawer (it stays usable while the drawer is open) and the
 *   slotted page title at 16 px / 500; hidden on desktop;
 * - `cg-page-header`: optional back link (13 px, 16 px above the title),
 *   title 24 px / 400, a one-line 13 px muted description that never wraps,
 *   actions on the title's baseline, 28 px below;
 * - `cg-action-bar`: a bar that sticks to the bottom of its scroll container
 *   with a polite status ("Unsaved changes") and 36 px actions.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function open(tags: string[], body: string, width = 1200): Promise<Page> {
  const page = await openPage(tags, body);
  await page.setViewportSize({ width, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.addStyleTag({ content: 'html, body { margin: 0; }' });
  await settleStyles(page);
  return page;
}

const SHELL = `
  <cg-app-shell panel style="height:100vh">
    <span slot="mobile-header">Contacts</span>
    <nav slot="sidebar" id="side"><a href="#a">Overview</a></nav>
    <div>Content</div>
  </cg-app-shell>`;

describe.skipIf(!browserAvailable)('page chrome (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('cg-app-shell mobile-header: a 48 px top bar with a 44 px menu button and the page title on a phone', async () => {
    const page = await open(['cg-app-shell'], SHELL, 390);
    const bar = await page.evaluate(() => {
      const root = document.querySelector('cg-app-shell')!.shadowRoot!;
      const b = root.querySelector('.mobile-bar')!;
      const btn = root.querySelector('.mobile-bar button')!;
      const r = b.getBoundingClientRect();
      const br = btn.getBoundingClientRect();
      const s = getComputedStyle(b);
      return { top: r.top, height: r.height, btn: [br.width, br.height], size: s.fontSize, weight: s.fontWeight, mainTop: root.querySelector('main')!.getBoundingClientRect().top };
    });
    expect(bar.top).toBe(0);
    expect(bar.height).toBe(48);
    expect(bar.btn).toEqual([44, 44]);
    expect([bar.size, bar.weight]).toEqual(['16px', '500']);
    expect(bar.mainTop).toBeGreaterThanOrEqual(48);
    const menu = page.getByRole('button', { name: 'Menu' });
    await expect(menu.getAttribute('aria-expanded')).resolves.toBe('false');
    await menu.click();
    await settleStyles(page);
    expect(await page.evaluate(() => document.querySelector('cg-app-shell')!.hasAttribute('sidebar-collapsed'))).toBe(false);
    await expect(menu.getAttribute('aria-expanded')).resolves.toBe('true');
    // The bar is not inert while the drawer is open: the same button closes it.
    await menu.click();
    await settleStyles(page);
    expect(await page.evaluate(() => document.querySelector('cg-app-shell')!.hasAttribute('sidebar-collapsed'))).toBe(true);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('cg-app-shell mobile-header: no bar on desktop (the panel keeps its top inset)', async () => {
    const page = await open(['cg-app-shell'], SHELL, 1200);
    const r = await page.evaluate(() => {
      const root = document.querySelector('cg-app-shell')!.shadowRoot!;
      return { bar: getComputedStyle(root.querySelector('.mobile-bar')!).display, mainTop: root.querySelector('main')!.getBoundingClientRect().top };
    });
    expect(r).toEqual({ bar: 'none', mainTop: 8 });
    await page.close();
  });

  it('cg-page-header: back link 13 px 16 px above, title 24 / 400, one-line 13 px muted description, actions on the title baseline, 28 px below', async () => {
    const page = await open(['cg-page-header', 'cg-button'], `
      <div style="width:560px">
        <cg-page-header id="h" heading="Comeback" back-href="#sequences" back-label="Sequences"
          description="Starts after 30 days without an open or click, and stops when they buy or unsubscribe from the newsletter list.">
          <cg-button slot="actions" variant="secondary">Pause</cg-button><cg-button slot="actions">Save</cg-button>
        </cg-page-header>
        <div id="next">toolbar</div>
      </div>`);
    const r = await page.evaluate(() => {
      const host = document.getElementById('h')!;
      const root = host.shadowRoot!;
      const back = root.querySelector('a')!;
      const h = root.querySelector('.title')!;
      const desc = root.querySelector('.description')!;
      const probe = () => { const p = document.createElement('span'); p.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; return p; };
      const hp = probe(); h.append(hp);
      // The probe sits on the label's text line (inside a span: a bare flex item would be centred, not on the baseline).
      const label = document.querySelector('cg-button[slot="actions"]:last-child')!;
      label.innerHTML = '<span>Save</span>';
      const bp = probe(); label.firstElementChild!.append(bp);
      const lines = (() => { const range = document.createRange(); range.selectNodeContents(desc); return new Set(Array.from(range.getClientRects(), (c) => Math.round(c.top))).size; })();
      const hs = getComputedStyle(h), ds = getComputedStyle(desc), bs = getComputedStyle(back);
      return {
        backSize: bs.fontSize, backGap: Math.round(h.getBoundingClientRect().top - back.getBoundingClientRect().bottom),
        title: [hs.fontSize, hs.fontWeight], desc: [ds.fontSize, ds.whiteSpace, lines],
        baseline: Math.round(hp.getBoundingClientRect().bottom - bp.getBoundingClientRect().bottom),
        below: Math.round(document.getElementById('next')!.getBoundingClientRect().top - host.getBoundingClientRect().bottom),
      };
    });
    expect(r.backSize).toBe('13px');
    expect(r.backGap).toBe(16);
    expect(r.title).toEqual(['24px', '400']);
    expect(r.desc).toEqual(['13px', 'nowrap', 1]);
    expect(Math.abs(r.baseline)).toBeLessThanOrEqual(1);
    expect(r.below).toBe(28);
    await expect(page.getByRole('heading', { level: 1, name: 'Comeback' }).count()).resolves.toBe(1);
    await expect(page.getByRole('link', { name: 'Sequences' }).getAttribute('href')).resolves.toBe('#sequences');
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('cg-action-bar: sticks to the bottom of its scroll container with a polite status and 36 px actions', async () => {
    const page = await open(['cg-action-bar', 'cg-button'], `
      <div id="scroller" style="height:400px; overflow:auto">
        <div style="height:1500px">Long form</div>
        <cg-action-bar id="bar" status="Unsaved changes"><cg-button slot="actions" variant="secondary">Discard</cg-button><cg-button slot="actions">Save</cg-button></cg-action-bar>
      </div>`);
    const at = () => page.evaluate(() => {
      const s = document.getElementById('scroller')!.getBoundingClientRect();
      const b = document.getElementById('bar')!.getBoundingClientRect();
      return Math.round(s.bottom - b.bottom);
    });
    expect(await at()).toBe(0);
    await page.evaluate(() => { document.getElementById('scroller')!.scrollTop = 600; });
    expect(await at()).toBe(0);
    await expect(page.getByRole('status').textContent()).resolves.toContain('Unsaved changes');
    const r = await page.evaluate(() => {
      const bar = document.getElementById('bar')!;
      const inner = bar.shadowRoot!.querySelector('.bar')!;
      const s = getComputedStyle(inner);
      return { bg: s.backgroundColor, border: s.borderTopWidth, heights: Array.from(bar.querySelectorAll('cg-button'), (b) => b.shadowRoot!.querySelector('.btn')!.getBoundingClientRect().height) };
    });
    expect(r.border).toBe('1px');
    expect(r.bg).not.toBe('rgba(0, 0, 0, 0)');
    expect(r.heights).toEqual([36, 36]);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });
});
