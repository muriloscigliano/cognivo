// @vitest-environment node
/**
 * Issue: cg-dropdown failed axe (critical `aria-allowed-attr`): it put
 * `aria-haspopup` / `aria-expanded` on a role-less wrapper div, so screen
 * readers never heard the menu button's state; the closed menu stayed in the
 * accessibility tree; every item was a tab stop; a click did not move focus
 * into the menu; and there was no typeahead. It now follows the WAI-ARIA menu
 * button pattern, checked here in a real accessibility tree.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const ITEMS = [
  { id: 'open', label: 'Open contact' },
  { id: 'copy', label: 'Copy e-mail' },
  { id: 'sep', label: '', divider: true },
  { id: 'locked', label: 'Archive', disabled: true },
  { id: 'source', label: 'Contacts from this source' },
];

async function dropdown(): Promise<Page> {
  const page = await openPage(['cg-dropdown'], `
    <button id="before">Before</button>
    <cg-dropdown id="dd"><button slot="trigger" id="trigger">Actions</button></cg-dropdown>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate((items) => { (document.getElementById('dd') as HTMLElement & { items: unknown }).items = items; }, ITEMS);
  await settleStyles(page);
  return page;
}

/** The text of the focused element, looking through shadow roots. */
const focused = (page: Page) =>
  page.evaluate(() => {
    let el: Element | null = document.activeElement;
    while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
    return el?.textContent?.trim() ?? null;
  });

const expanded = (page: Page) => page.locator('#trigger').getAttribute('aria-expanded');

describe.skipIf(!browserAvailable)('cg-dropdown menu button (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('passes axe closed and open', async () => {
    const page = await dropdown();
    expect(await axeViolations(page), 'closed').toEqual([]);
    await page.locator('#trigger').click();
    await settleStyles(page);
    expect(await axeViolations(page), 'open').toEqual([]);
    await page.close();
  });

  it('the slotted trigger carries the popup state; the closed menu is not in the accessibility tree', async () => {
    const page = await dropdown();
    const trigger = page.locator('#trigger');
    expect(await trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(await expanded(page)).toBe('false');
    expect(await page.getByRole('menu').count()).toBe(0);
    expect(await page.getByRole('menuitem').count()).toBe(0);
    await trigger.click();
    await settleStyles(page);
    expect(await expanded(page)).toBe('true');
    expect(await page.getByRole('menu', { name: 'Actions' }).count()).toBe(1);
    expect(await page.getByRole('menuitem').count()).toBe(4);
    await page.close();
  });

  it('a click opens with focus on the first item; arrows, Home / End move it, skipping the divider and disabled item', async () => {
    const page = await dropdown();
    await page.locator('#trigger').click();
    await settleStyles(page);
    expect(await focused(page)).toBe('Open contact');
    await page.keyboard.press('ArrowDown');
    expect(await focused(page)).toBe('Copy e-mail');
    await page.keyboard.press('ArrowDown');
    expect(await focused(page)).toBe('Contacts from this source');
    await page.keyboard.press('ArrowDown');
    expect(await focused(page)).toBe('Open contact');
    await page.keyboard.press('ArrowUp');
    expect(await focused(page)).toBe('Contacts from this source');
    await page.keyboard.press('Home');
    expect(await focused(page)).toBe('Open contact');
    await page.keyboard.press('End');
    expect(await focused(page)).toBe('Contacts from this source');
    await page.close();
  });

  it('only one item is a tab stop: Tab from the open menu closes it and leaves the menu', async () => {
    const page = await dropdown();
    await page.locator('#trigger').click();
    await settleStyles(page);
    const stops = await page.evaluate(() =>
      Array.from(document.getElementById('dd')!.shadowRoot!.querySelectorAll('[role="menuitem"]'))
        .filter((i) => i.getAttribute('tabindex') !== '-1').length);
    expect(stops).toBeLessThanOrEqual(1);
    await page.keyboard.press('Tab');
    await settleStyles(page);
    expect(await expanded(page)).toBe('false');
    await page.close();
  });

  it('ArrowUp on the trigger opens on the last item; Enter / Space on the trigger open on the first', async () => {
    const page = await dropdown();
    await page.locator('#trigger').focus();
    await page.keyboard.press('ArrowUp');
    await settleStyles(page);
    expect(await focused(page)).toBe('Contacts from this source');
    await page.keyboard.press('Escape');
    await settleStyles(page);
    await page.keyboard.press('Enter');
    await settleStyles(page);
    expect(await focused(page)).toBe('Open contact');
    await page.keyboard.press('Escape');
    await settleStyles(page);
    await page.keyboard.press(' ');
    await settleStyles(page);
    expect(await focused(page)).toBe('Open contact');
    await page.close();
  });

  it('Escape closes, returns focus to the trigger and does not reach document listeners', async () => {
    const page = await dropdown();
    await page.evaluate(() => { (window as unknown as { esc: number }).esc = 0; document.addEventListener('keydown', (e) => { if (e.key === 'Escape') (window as unknown as { esc: number }).esc++; }); });
    await page.locator('#trigger').click();
    await settleStyles(page);
    await page.keyboard.press('Escape');
    await settleStyles(page);
    expect(await expanded(page)).toBe('false');
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('trigger');
    expect(await page.evaluate(() => (window as unknown as { esc: number }).esc)).toBe(0);
    await page.close();
  });

  it('typeahead: a letter moves to the next item starting with it; Enter selects it and closes', async () => {
    const page = await dropdown();
    await page.evaluate(() => document.getElementById('dd')!.addEventListener('cg-dropdown-select', (e) => {
      (window as unknown as { picked: string }).picked = (e as CustomEvent<{ id: string }>).detail.id;
    }));
    await page.locator('#trigger').click();
    await settleStyles(page);
    await page.keyboard.press('c');
    expect(await focused(page)).toBe('Copy e-mail');
    await page.keyboard.press('c');
    expect(await focused(page)).toBe('Contacts from this source');
    await page.keyboard.press('a'); // only the disabled "Archive" starts with a: focus stays
    expect(await focused(page)).toBe('Contacts from this source');
    await page.keyboard.press('Enter');
    await settleStyles(page);
    expect(await page.evaluate(() => (window as unknown as { picked: string }).picked)).toBe('source');
    expect(await expanded(page)).toBe('false');
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('trigger');
    await page.close();
  });
});
