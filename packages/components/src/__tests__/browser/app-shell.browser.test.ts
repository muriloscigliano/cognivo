// @vitest-environment node
/**
 * cg-app-shell layout and phone-drawer behaviour in real Chromium, with the
 * real tokens CSS: viewport-height sticky sidebar column (sticky content and
 * a bottom-pinned footer work inside it), phone layout after collapsing,
 * themed column colour, and the phone drawer's backdrop / Escape / focus /
 * scroll lock.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const TAGS = ['cg-app-shell', 'cg-sidebar'];

const SHELL = (attrs = '') => `
  <cg-app-shell ${attrs}>
    <div slot="header"><button id="menu">Menu</button></div>
    <cg-sidebar slot="sidebar">
      <a href="#a" id="first-link">Deals</a>
      <a href="#b">Contacts</a>
      <div slot="footer" id="side-footer">Signed in as Ana</div>
    </cg-sidebar>
    <div id="content" style="height: 3000px">Content <button id="in-main">Act</button></div>
  </cg-app-shell>`;

async function shell(viewport: { width: number; height: number }, attrs = ''): Promise<Page> {
  const page = await openPage(TAGS, SHELL(attrs));
  await page.emulateMedia({ reducedMotion: 'reduce' }); // measure end states, not transitions
  await page.setViewportSize(viewport);
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.addStyleTag({ content: 'html, body { margin: 0; }' });
  await frames(page);
  return page;
}

/** Let Lit render and (0.01ms, reduced-motion) transitions finish. */
async function frames(page: Page): Promise<void> {
  await settle(page);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 20)))));
}

const rect = (page: Page, js: string) =>
  page.evaluate((js) => {
    const el = new Function(`return ${js}`)() as Element;
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, left: r.left, width: r.width, height: r.height };
  }, js);
const ASIDE = `document.querySelector('cg-app-shell').shadowRoot.querySelector('aside')`;
const BACKDROP = `document.querySelector('cg-app-shell').shadowRoot.querySelector('.backdrop')`;
const DESKTOP = { width: 1200, height: 800 };
const PHONE = { width: 390, height: 800 };

describe.skipIf(!browserAvailable)('cg-app-shell (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  describe('desktop sidebar column', () => {
    it('is viewport-height under the header and stays in view while the page scrolls', async () => {
      const page = await shell(DESKTOP);
      const before = await rect(page, ASIDE);
      expect(before.top).toBe(56);
      expect(before.height).toBe(800 - 56);
      await page.evaluate(() => window.scrollTo(0, 1200));
      const after = await rect(page, ASIDE);
      expect(after.top).toBe(56);
      expect(after.bottom).toBe(800);
      await page.close();
    });

    it("puts the slotted sidebar's footer at the bottom of the viewport, not mid-page", async () => {
      const page = await shell(DESKTOP);
      const footer = await rect(page, `document.getElementById('side-footer')`);
      expect(footer.bottom).toBeGreaterThan(800 - 60);
      expect(footer.bottom).toBeLessThanOrEqual(800);
      await page.close();
    });

    it('sticky content inside the column sticks (the column is a bounded scroll container)', async () => {
      const page = await shell(DESKTOP);
      await page.evaluate(() => {
        const sb = document.querySelector('cg-sidebar')!;
        sb.remove();
        const col = document.createElement('div');
        col.slot = 'sidebar';
        col.innerHTML = '<div id="sticky" style="position: sticky; top: 0">Filters</div><div style="height: 2000px"></div>';
        document.querySelector('cg-app-shell')!.append(col);
      });
      await frames(page);
      const scrolled = await page.evaluate((js) => {
        const aside = new Function(`return ${js}`)() as Element;
        aside.scrollTop = 500;
        return aside.scrollTop;
      }, ASIDE);
      expect(scrolled).toBe(500);
      const aside = await rect(page, ASIDE);
      const sticky = await rect(page, `document.getElementById('sticky')`);
      expect(sticky.top).toBe(aside.top);
      await page.close();
    });

    it('uses the theme surface, not black, in the light theme', async () => {
      const page = await shell(DESKTOP);
      const bg = await page.evaluate((js) => getComputedStyle(new Function(`return ${js}`)() as Element).backgroundColor, ASIDE);
      expect(bg).not.toBe('rgb(0, 0, 0)');
      await page.close();
    });

    it('collapsed: the column is out of the tab order and the accessibility tree', async () => {
      const page = await shell(DESKTOP, 'sidebar-collapsed');
      await expect(page.getByRole('link', { name: 'Deals' }).count()).resolves.toBe(0);
      const inert = await page.evaluate((js) => (new Function(`return ${js}`)() as HTMLElement).inert, ASIDE);
      expect(inert).toBe(true);
      await page.close();
    });
  });

  describe('phone', () => {
    it('collapsing keeps the single-column phone layout (main is full width)', async () => {
      const page = await shell(PHONE, 'sidebar-collapsed');
      const main = await rect(page, `document.querySelector('cg-app-shell').shadowRoot.querySelector('main')`);
      expect(main.left).toBe(0);
      expect(main.width).toBe(390);
      const aside = await rect(page, ASIDE);
      expect(aside.left + aside.width).toBeLessThanOrEqual(0);
      await page.close();
    });

    it('open: a backdrop covers the page and the body cannot scroll; closed: neither', async () => {
      const page = await shell(PHONE, 'sidebar-collapsed');
      const backdropVisible = () =>
        page.evaluate((js) => getComputedStyle(new Function(`return ${js}`)() as Element).visibility === 'visible', BACKDROP);
      expect(await backdropVisible()).toBe(false);
      await page.evaluate(() => { (document.querySelector('cg-app-shell') as HTMLElement & { sidebarCollapsed: boolean }).sidebarCollapsed = false; });
      await frames(page);
      expect(await backdropVisible()).toBe(true);
      expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden');
      await page.evaluate(() => { (document.querySelector('cg-app-shell') as HTMLElement & { sidebarCollapsed: boolean }).sidebarCollapsed = true; });
      await frames(page);
      expect(await backdropVisible()).toBe(false);
      expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('visible');
      await page.close();
    });

    it('opening moves focus into the sidebar; Escape closes it, fires the toggle event and returns focus to the opener', async () => {
      const page = await shell(PHONE, 'sidebar-collapsed');
      await page.evaluate(() => {
        const s = document.querySelector('cg-app-shell') as HTMLElement & { toggleSidebar(): void };
        (window as unknown as { events: unknown[] }).events = [];
        s.addEventListener('cg-app-shell-toggle', (e) => (window as unknown as { events: unknown[] }).events.push((e as CustomEvent).detail));
        document.getElementById('menu')!.addEventListener('click', () => s.toggleSidebar());
      });
      await page.locator('#menu').focus();
      await page.keyboard.press('Enter');
      await frames(page);
      await expect(page.evaluate(() => document.activeElement?.id)).resolves.toBe('first-link');
      await page.keyboard.press('Escape');
      await frames(page);
      await expect(page.evaluate(() => (document.querySelector('cg-app-shell') as HTMLElement & { sidebarCollapsed: boolean }).sidebarCollapsed)).resolves.toBe(true);
      await expect(page.evaluate(() => document.activeElement?.id)).resolves.toBe('menu');
      await expect(page.evaluate(() => (window as unknown as { events: unknown[] }).events)).resolves.toEqual([{ collapsed: false }, { collapsed: true }]);
      await page.close();
    });

    it('clicking the backdrop closes the sidebar', async () => {
      const page = await shell(PHONE);
      await page.mouse.click(380, 400);
      await frames(page);
      await expect(page.evaluate(() => (document.querySelector('cg-app-shell') as HTMLElement & { sidebarCollapsed: boolean }).sidebarCollapsed)).resolves.toBe(true);
      await page.close();
    });
  });
});
