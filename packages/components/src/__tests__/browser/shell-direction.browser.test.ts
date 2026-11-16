// @vitest-environment node
/**
 * The dashboard direction, natively in cg-app-shell / cg-sidebar, with the
 * real tokens in both themes: a canvas with the sidebar on it and one raised
 * content panel (12–16px radius, hairline border, inset a few px); the active
 * sidebar item a subtle filled pill (no coloured bar); sub-items indented with
 * a thin guide line; a designed dark mode (near-black canvas, panel one step
 * lighter).
 */
import { describe, it, expect, afterAll } from 'vitest';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const BODY = `
  <cg-app-shell panel>
    <div slot="header">Acme CRM</div>
    <cg-sidebar slot="sidebar">
      <a href="#d" aria-current="page" id="active"><span aria-hidden="true">◐</span>Deals</a>
      <a href="#o" data-sub id="sub1">Open</a>
      <a href="#w" data-sub id="sub2">Won</a>
      <a href="#c" id="plain"><span aria-hidden="true">☺</span>Contacts</a>
    </cg-sidebar>
    <div id="content">Content</div>
  </cg-app-shell>`;

async function open(theme: 'light' | 'dark'): Promise<Page> {
  const page = await openPage(['cg-app-shell', 'cg-sidebar'], BODY);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.addStyleTag({ content: 'html, body { margin: 0; }' });
  if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await settleStyles(page);
  return page;
}

const styles = (page: Page) => page.evaluate(() => {
  const shell = document.querySelector('cg-app-shell')!.shadowRoot!;
  const sidebar = document.querySelector('cg-sidebar')!;
  const cs = (el: Element, pseudo?: string) => getComputedStyle(el, pseudo);
  const lum = (c: string) => {
    const [r, g, b] = c.match(/[\d.]+/g)!.map(Number).map((v) => v / 255);
    return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
  };
  const main = shell.querySelector('main')!;
  const canvas = cs(shell.querySelector('.shell')!).backgroundColor;
  const nav = cs(sidebar.shadowRoot!.querySelector('.nav')!).backgroundColor;
  const active = cs(document.getElementById('active')!);
  const plain = document.getElementById('plain')!.getBoundingClientRect();
  const sub = document.getElementById('sub1')!;
  return {
    canvas,
    panel: cs(main).backgroundColor,
    panelRadius: parseFloat(cs(main).borderTopLeftRadius),
    panelBorder: parseFloat(cs(main).borderTopWidth),
    panelInset: main.getBoundingClientRect().right <= innerWidth - 4 && main.getBoundingClientRect().bottom <= innerHeight - 4,
    sidebarOnCanvas: nav === canvas || nav === 'rgba(0, 0, 0, 0)',
    canvasLum: lum(canvas),
    panelLum: lum(cs(main).backgroundColor),
    activeBg: active.backgroundColor,
    activeBar: parseFloat(active.borderLeftWidth),
    activeRadius: parseFloat(active.borderTopLeftRadius),
    subIndent: sub.getBoundingClientRect().left - plain.left,
    guide: { content: cs(sub, '::before').content, width: parseFloat(cs(sub, '::before').width), height: parseFloat(cs(sub, '::before').height) },
  };
});

describe.skipIf(!browserAvailable)('dashboard direction in cg-app-shell / cg-sidebar (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  for (const theme of ['light', 'dark'] as const) {
    it(`${theme}: sidebar on the canvas, content on one raised, rounded, hairline-bordered, inset panel`, async () => {
      const page = await open(theme);
      const s = await styles(page);
      expect(s.sidebarOnCanvas).toBe(true);
      expect(s.panel).not.toBe(s.canvas);
      expect(s.panelRadius).toBeGreaterThanOrEqual(12);
      expect(s.panelRadius).toBeLessThanOrEqual(16);
      expect(s.panelBorder).toBeGreaterThan(0);
      expect(s.panelBorder).toBeLessThanOrEqual(1);
      expect(s.panelInset).toBe(true);
      // Light: canvas greyer than the white panel. Dark: near-black canvas, panel one step lighter.
      if (theme === 'light') expect(s.panelLum).toBeGreaterThan(s.canvasLum);
      else {
        expect(s.canvasLum).toBeLessThan(0.08); // near-black (gray.950)
        expect(s.panelLum).toBeGreaterThan(s.canvasLum);
      }
      await page.close();
    });

    it(`${theme}: the active item is a subtle filled pill, not a coloured bar; sub-items are indented with a guide line`, async () => {
      const page = await open(theme);
      const s = await styles(page);
      expect(s.activeBg).not.toBe('rgba(0, 0, 0, 0)');
      expect(s.activeBg).not.toBe(s.canvas);
      expect(s.activeBar).toBe(0);
      expect(s.activeRadius).toBeGreaterThan(0);
      expect(s.subIndent).toBeGreaterThanOrEqual(12);
      expect(s.guide.content).toBe('""');
      expect(s.guide.width).toBeGreaterThan(0);
      expect(s.guide.width).toBeLessThanOrEqual(1);
      expect(s.guide.height).toBeGreaterThan(0);
      await page.close();
    });
  }

  it('without `panel` the shell keeps its flat layout (opt-in)', async () => {
    const page = await openPage(['cg-app-shell'], '<cg-app-shell><div>x</div></cg-app-shell>');
    await page.addStyleTag({ path: TOKENS_CSS });
    await settleStyles(page);
    const radius = await page.evaluate(() => getComputedStyle(document.querySelector('cg-app-shell')!.shadowRoot!.querySelector('main')!).borderTopLeftRadius);
    expect(radius).toBe('0px');
    await page.close();
  });
});
