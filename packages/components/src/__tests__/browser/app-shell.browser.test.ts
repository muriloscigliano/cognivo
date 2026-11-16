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
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

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

/** Let Lit render and every (0.01ms, reduced-motion) transition finish. */
const frames = settleStyles;

const collapsed = (page: Page) =>
  page.evaluate(() => (document.querySelector('cg-app-shell') as HTMLElement & { sidebarCollapsed: boolean }).sidebarCollapsed);
async function setCollapsed(page: Page, value: boolean): Promise<void> {
  await page.evaluate((value) => { (document.querySelector('cg-app-shell') as HTMLElement & { sidebarCollapsed: boolean }).sidebarCollapsed = value; }, value);
  await frames(page);
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

    it('paints the sidebar surface token in each theme (light: gray.100, dark: gray.950), not black', async () => {
      const page = await shell(DESKTOP);
      const read = () => page.evaluate((js) => {
        const aside = getComputedStyle(new Function(`return ${js}`)() as Element).backgroundColor;
        const probe = document.createElement('div');
        probe.style.background = 'var(--cg-color-surface-sidebar-background)';
        document.body.append(probe);
        const token = getComputedStyle(probe).backgroundColor;
        probe.remove();
        return { aside, token };
      }, ASIDE);
      expect(await read()).toEqual({ aside: 'rgb(244, 244, 245)', token: 'rgb(244, 244, 245)' }); // gray.100 #f4f4f5
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
      await frames(page);
      expect(await read()).toEqual({ aside: 'rgb(9, 9, 11)', token: 'rgb(9, 9, 11)' }); // gray.950 #09090b
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
      await setCollapsed(page, false);
      await page.mouse.click(380, 400);
      await frames(page);
      await expect(page.evaluate(() => (document.querySelector('cg-app-shell') as HTMLElement & { sidebarCollapsed: boolean }).sidebarCollapsed)).resolves.toBe(true);
      await page.close();
    });

    it('is closed by default on a phone: on first load and when the window narrows from desktop', async () => {
      // Narrowing: open on desktop (the default), then the window becomes phone-sized.
      const page = await shell(DESKTOP);
      expect(await collapsed(page)).toBe(false);
      await page.setViewportSize(PHONE);
      await frames(page);
      expect(await collapsed(page)).toBe(true);
      expect((await rect(page, ASIDE)).left + (await rect(page, ASIDE)).width).toBeLessThanOrEqual(0);
      // First load on a phone: a shell created at phone width starts closed.
      await page.evaluate((html) => { document.body.innerHTML = html; }, SHELL());
      await frames(page);
      expect(await collapsed(page)).toBe(true);
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
      await page.close();
    });

    it('the first-load close on a phone fires cg-app-shell-toggle, like a breakpoint change does', async () => {
      const page = await shell(DESKTOP);
      await page.evaluate(() => {
        const w = window as unknown as { events: unknown[] };
        w.events = [];
        document.addEventListener('cg-app-shell-toggle', (e) => w.events.push((e as CustomEvent).detail));
      });
      // Breakpoint change: desktop → phone.
      await page.setViewportSize(PHONE);
      await frames(page);
      expect(await page.evaluate(() => (window as unknown as { events: unknown[] }).events)).toEqual([{ collapsed: true }]);
      // First load at phone width: the same event.
      await page.evaluate((html) => { (window as unknown as { events: unknown[] }).events = []; document.body.innerHTML = html; }, SHELL());
      await frames(page);
      expect(await collapsed(page)).toBe(true);
      expect(await page.evaluate(() => (window as unknown as { events: unknown[] }).events)).toEqual([{ collapsed: true }]);
      // Already collapsed by the author: nothing changes, no event.
      await page.evaluate((html) => { (window as unknown as { events: unknown[] }).events = []; document.body.innerHTML = html; }, SHELL('sidebar-collapsed'));
      await frames(page);
      expect(await page.evaluate(() => (window as unknown as { events: unknown[] }).events)).toEqual([]);
      await page.close();
    });

    it('widening back to desktop restores the desktop column as it was', async () => {
      const page = await shell(DESKTOP);
      await page.setViewportSize(PHONE);
      await frames(page);
      await page.setViewportSize(DESKTOP);
      await frames(page);
      expect(await collapsed(page)).toBe(false);
      // Also after a first load at phone width.
      await page.setViewportSize(PHONE);
      await page.evaluate((html) => { document.body.innerHTML = html; }, SHELL());
      await frames(page);
      expect(await collapsed(page)).toBe(true);
      await page.setViewportSize(DESKTOP);
      await frames(page);
      expect(await collapsed(page)).toBe(false);
      await page.close();
    });

    it('open: the header, main content and footer are inert, so focus stays in the drawer; closing restores them', async () => {
      const page = await shell(PHONE);
      const inertRegions = () => page.evaluate(() => {
        const r = document.querySelector('cg-app-shell')!.shadowRoot!;
        return ['header', 'main', 'footer'].map((t) => (r.querySelector(t) as HTMLElement).inert);
      });
      expect(await inertRegions()).toEqual([false, false, false]);
      await setCollapsed(page, false);
      expect(await inertRegions()).toEqual([true, true, true]);
      await page.locator('#first-link').focus();
      const trail: string[] = [];
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('Tab');
        trail.push(await page.evaluate(() => document.activeElement?.id || document.activeElement?.textContent || ''));
      }
      expect(trail).not.toContain('in-main');
      expect(trail).not.toContain('menu');
      await setCollapsed(page, true);
      expect(await inertRegions()).toEqual([false, false, false]);
      await page.close();
    });
  });

  describe('right-to-left (dir="rtl")', () => {
    async function rtl(viewport: { width: number; height: number }, attrs = ''): Promise<Page> {
      const page = await shell(viewport, attrs);
      // An RTL page: the shell is created under dir="rtl" (it starts closed on a phone).
      await page.evaluate((html) => {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.innerHTML = html;
      }, SHELL(attrs));
      await frames(page);
      return page;
    }

    it('phone: the start-side drawer slides from the right edge and hides off the right edge', async () => {
      const page = await rtl(PHONE);
      const closed = await rect(page, ASIDE);
      expect(closed.left).toBeGreaterThanOrEqual(PHONE.width);
      await setCollapsed(page, false);
      const open = await rect(page, ASIDE);
      expect(open.left + open.width).toBe(PHONE.width);
      await page.close();
    });

    it('phone: an end-side drawer hides off the left edge', async () => {
      const page = await rtl(PHONE, 'sidebar-position="end"');
      const closed = await rect(page, ASIDE);
      expect(closed.left + closed.width).toBeLessThanOrEqual(0);
      await setCollapsed(page, false);
      expect((await rect(page, ASIDE)).left).toBe(0);
      await page.close();
    });

    it('desktop panel: the inset sits on the outer (inline-end) edge, flush against an end-side sidebar', async () => {
      const page = await rtl(DESKTOP, 'panel sidebar-position="end"');
      const main = await rect(page, `document.querySelector('cg-app-shell').shadowRoot.querySelector('main')`);
      const aside = await rect(page, ASIDE);
      // RTL + end: the sidebar is on the left; the panel's outer edge is the right one.
      expect(aside.left).toBe(0);
      expect(main.left).toBe(aside.left + aside.width);
      expect(main.left + main.width).toBe(DESKTOP.width - 8);
      await page.close();
    });
  });
});
