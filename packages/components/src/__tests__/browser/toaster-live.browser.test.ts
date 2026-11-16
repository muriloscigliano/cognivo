// @vitest-environment node
/**
 * cg-toaster announcements, checked on the accessibility tree (Playwright's
 * aria snapshot): every toast is announced once, through a polite live region
 * (status) — or an assertive one (alert) for errors — that exists before the
 * toast does; the visible toast cards are not live regions themselves, so the
 * message is not announced twice.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

type Toaster = HTMLElement & { show(o: { title: string; description?: string; variant?: string; duration?: number }): string };

async function show(page: Page, opts: Record<string, unknown>): Promise<void> {
  await page.evaluate((opts) => { (document.querySelector('cg-toaster') as Toaster).show(opts as never); }, opts);
  await settle(page);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

/** Live regions in the accessibility tree: role + text, as an aria snapshot reports them. */
async function liveRegions(page: Page): Promise<{ status: string[]; alert: string[] }> {
  const snap = await page.locator('body').ariaSnapshot();
  const pick = (role: string) =>
    [...snap.matchAll(new RegExp(`^[ \\t]*- ${role}(?: "[^"]*")?(?::[ \\t]*(.*))?$`, 'gm'))].map((m) => (m[1] ?? '').trim());
  return { status: pick('status'), alert: pick('alert') };
}

describe.skipIf(!browserAvailable)('cg-toaster live announcements (real browser, aria snapshot)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('the live regions exist (empty) before any toast, so the first toast is announced', async () => {
    const page = await openPage(['cg-toaster'], '<cg-toaster></cg-toaster>');
    const live = await page.evaluate(() =>
      [...document.querySelector('cg-toaster')!.shadowRoot!.querySelectorAll('[aria-live]')].map((el) => el.getAttribute('aria-live')).sort());
    expect(live).toEqual(['assertive', 'polite']);
    await page.close();
  });

  it('a toast is announced once, politely, with its title and description', async () => {
    const page = await openPage(['cg-toaster'], '<cg-toaster></cg-toaster>');
    await show(page, { title: 'Deal saved', description: 'Acme, R$ 1.200', duration: 0 });
    const regions = await liveRegions(page);
    expect(regions.alert.filter(Boolean)).toEqual([]);
    expect(regions.status.filter((t) => t.includes('Deal saved'))).toEqual(['Deal saved. Acme, R$ 1.200']);
    // The visible card is still in the tree as text, not as another live region.
    const snap = await page.locator('body').ariaSnapshot();
    expect(snap.match(/Deal saved/g)!.length).toBe(2); // the announcement + the card's text
    await page.close();
  });

  it('an error is announced assertively (alert), not also politely', async () => {
    const page = await openPage(['cg-toaster'], '<cg-toaster></cg-toaster>');
    await show(page, { title: 'Could not save the deal', variant: 'error', duration: 0 });
    const regions = await liveRegions(page);
    expect(regions.alert).toEqual(['Could not save the deal']);
    expect(regions.status.filter((t) => t.includes('Could not save'))).toEqual([]);
    await page.close();
  });

  it('the same message twice is a new addition to the region (announced again); a dismissed toast leaves it', async () => {
    const page = await openPage(['cg-toaster'], '<cg-toaster></cg-toaster>');
    await show(page, { title: 'Copied', duration: 0 });
    await page.evaluate(() => {
      const region = document.querySelector('cg-toaster')!.shadowRoot!.querySelector('[aria-live="polite"]')!;
      (window as unknown as { added: number }).added = 0;
      new MutationObserver((ms) => { for (const m of ms) (window as unknown as { added: number }).added += m.addedNodes.length; })
        .observe(region, { childList: true, subtree: true });
    });
    await show(page, { title: 'Copied', duration: 0 });
    expect(await page.evaluate(() => (window as unknown as { added: number }).added)).toBeGreaterThan(0);
    // One entry per toast on screen — the region mirrors the stack, it never repeats a toast.
    expect((await liveRegions(page)).status).toEqual(['Copied Copied']);
    await page.evaluate(() => {
      const t = document.querySelector('cg-toaster') as HTMLElement & { dismiss(id: string): void; _toasts: Array<{ id: string }> };
      t.dismiss(t._toasts[0]!.id);
    });
    await settle(page);
    expect((await liveRegions(page)).status).toEqual(['Copied']);
    await page.close();
  });
});
