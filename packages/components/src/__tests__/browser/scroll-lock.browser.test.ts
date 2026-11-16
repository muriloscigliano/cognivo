// @vitest-environment node
/**
 * Issue: every overlay saved `document.body.style.overflow` when it opened and
 * wrote that saved value back when it closed. With two open at once — the
 * cg-app-shell phone drawer, then a cg-modal from a drawer link — closing the
 * drawer first wrote back the value it saw ('') while the modal was still
 * open, so the page behind the modal scrolled; closing out of order could
 * also leave the page locked for good. One shared, reference-counted lock:
 * the page stays locked while any overlay holds it, and the original value
 * comes back only when the last one lets go.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle, settleStyles } from './harness.js';

const TAGS = ['cg-app-shell', 'cg-modal', 'cg-drawer', 'cg-sheet', 'cg-alert-dialog', 'cg-lightbox'];
const BODY = `
  <cg-app-shell sidebar-collapsed>
    <div slot="header">App</div>
    <nav slot="sidebar"><a href="#a">Deals</a></nav>
    <div>Content</div>
  </cg-app-shell>
  <cg-modal id="modal" title="Contact"><p>Body</p></cg-modal>
  <cg-drawer id="drawer" title="Filters"><p>Body</p></cg-drawer>
  <cg-sheet id="sheet"><p>Body</p></cg-sheet>
  <cg-alert-dialog id="alert" title="Delete?"></cg-alert-dialog>
  <cg-lightbox id="lightbox"></cg-lightbox>`;

type Opener = { open?: boolean; sidebarCollapsed?: boolean };

async function phone(): Promise<Page> {
  const page = await openPage(TAGS, BODY);
  await page.setViewportSize({ width: 390, height: 800 });
  // An author's own inline value, which must come back unchanged at the end.
  await page.evaluate(() => { document.body.style.overflow = 'clip'; });
  await settleStyles(page); // the phone media query has fired
  expect(await page.evaluate(() => matchMedia('(max-width: 768px)').matches)).toBe(true);
  return page;
}

/** Open (true) or close (false) one overlay; `shell` is the phone drawer. */
async function set(page: Page, which: string, open: boolean): Promise<void> {
  await page.evaluate(({ which, open }) => {
    if (which === 'shell') (document.querySelector('cg-app-shell') as HTMLElement & Opener).sidebarCollapsed = !open;
    else (document.getElementById(which) as HTMLElement & Opener).open = open;
  }, { which, open });
  await settle(page);
}

const overflow = (page: Page) => page.evaluate(() => document.body.style.overflow);

describe.skipIf(!browserAvailable)('shared body scroll lock (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('drawer → modal: closing the drawer while the modal is open keeps the page locked; closing the modal restores it', async () => {
    const page = await phone();
    await set(page, 'shell', true);
    expect(await overflow(page)).toBe('hidden');
    await set(page, 'modal', true);
    await set(page, 'shell', false);
    expect(await overflow(page)).toBe('hidden');
    await set(page, 'modal', false);
    expect(await overflow(page)).toBe('clip');
    await page.close();
  });

  it('modal → drawer: closing the modal first keeps the drawer locking; closing the drawer restores it', async () => {
    const page = await phone();
    await set(page, 'modal', true);
    await set(page, 'shell', true);
    await set(page, 'modal', false);
    expect(await overflow(page)).toBe('hidden');
    await set(page, 'shell', false);
    expect(await overflow(page)).toBe('clip');
    await page.close();
  });

  it('every overlay shares the lock: open all, close in any order, locked until the last closes', async () => {
    const page = await phone();
    const all = ['shell', 'modal', 'drawer', 'sheet', 'alert', 'lightbox'];
    for (const w of all) await set(page, w, true);
    for (const w of ['modal', 'shell', 'lightbox', 'drawer', 'alert']) {
      await set(page, w, false);
      expect(await overflow(page), `after closing ${w}`).toBe('hidden');
    }
    await set(page, 'sheet', false);
    expect(await overflow(page)).toBe('clip');
    await page.close();
  });

  it('an overlay moved in the page while open (disconnect + connect) takes its hold again', async () => {
    const page = await phone();
    for (const w of ['shell', 'modal', 'drawer', 'sheet', 'alert', 'lightbox']) {
      await set(page, w, true);
      await page.evaluate((w) => {
        const el = w === 'shell' ? document.querySelector('cg-app-shell')! : document.getElementById(w)!;
        const box = document.createElement('div');
        document.body.append(box);
        box.append(el); // a move: disconnectedCallback, then connectedCallback
      }, w);
      await settle(page);
      expect(await overflow(page), `${w} moved while open`).toBe('hidden');
      await set(page, w, false);
      expect(await overflow(page), `${w} closed after the move`).toBe('clip');
    }
    await page.close();
  });

  it('a modal moved while open still closes on Escape (its focus trap is back)', async () => {
    const page = await phone();
    await page.evaluate(() => { const b = document.createElement('button'); b.textContent = 'OK'; document.getElementById('modal')!.append(b); });
    await set(page, 'modal', true);
    await page.evaluate(() => { const box = document.createElement('div'); document.body.append(box); box.append(document.getElementById('modal')!); });
    await settle(page);
    await page.locator('#modal button', { hasText: 'OK' }).focus();
    await page.keyboard.press('Escape');
    await settle(page);
    expect(await page.evaluate(() => (document.getElementById('modal') as HTMLElement & Opener).open)).toBe(false);
    expect(await overflow(page)).toBe('clip');
    await page.close();
  });

  it('an overlay removed from the page while open releases its hold', async () => {
    const page = await phone();
    await set(page, 'modal', true);
    await set(page, 'drawer', true);
    await page.evaluate(() => document.getElementById('modal')!.remove());
    expect(await overflow(page)).toBe('hidden');
    await page.evaluate(() => document.getElementById('drawer')!.remove());
    expect(await overflow(page)).toBe('clip');
    await page.close();
  });
});
