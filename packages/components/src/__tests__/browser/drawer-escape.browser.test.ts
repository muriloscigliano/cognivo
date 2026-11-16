// @vitest-environment node
/**
 * Issue: inside the open cg-app-shell phone drawer, pressing Escape to close
 * an open select (or combobox, date picker, menu…) closed the whole drawer
 * too — the popup closed itself but let the key reach the shell's document
 * listener. An open popup now consumes its Escape (preventDefault +
 * stopPropagation); the next Escape, with nothing open, closes the drawer.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

interface Case {
  tag: string;
  attrs?: string;
  /** Set after render (options, items…). */
  props?: Record<string, unknown>;
  /** Light-DOM children (e.g. a slotted trigger). */
  inner?: string;
  /** How to open it once its trigger has focus. Default: click the trigger. */
  open?: (page: Page) => Promise<void>;
}

const OPTIONS = [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }];
const CASES: Case[] = [
  { tag: 'cg-select', attrs: 'label="Stage"', props: { options: OPTIONS } },
  { tag: 'cg-combobox', attrs: 'label="Owner"', props: { options: OPTIONS }, open: (p) => p.keyboard.press('ArrowDown') },
  { tag: 'cg-autocomplete', attrs: 'label="Company"', props: { options: OPTIONS }, open: (p) => p.keyboard.type('a') },
  { tag: 'cg-date-picker', attrs: 'label="Due"' },
  { tag: 'cg-date-range-picker', attrs: 'label="Period"' },
  { tag: 'cg-date-time-picker', attrs: 'label="Meeting"' },
  { tag: 'cg-time-picker', attrs: 'label="Time"' },
  { tag: 'cg-color-picker', attrs: 'label="Colour"' },
  { tag: 'cg-phone-input', attrs: 'label="Phone"' },
  {
    tag: 'cg-dropdown',
    inner: '<button slot="trigger" id="trigger">Actions</button>',
    props: { items: [{ id: 'edit', label: 'Edit' }, { id: 'delete', label: 'Delete' }] },
    open: (p) => p.locator('#trigger').click(),
  },
  { tag: 'cg-menubar', props: { items: [{ label: 'File', children: [{ label: 'New' }, { label: 'Open' }] }] } },
];

async function drawerWith(c: Case): Promise<Page> {
  const page = await openPage(['cg-app-shell', c.tag], `
    <cg-app-shell>
      <div slot="header">App</div>
      <div slot="sidebar"><a href="#a" id="first">Deals</a><${c.tag} id="popup" ${c.attrs ?? ''}>${c.inner ?? ''}</${c.tag}></div>
      <div>Content</div>
    </cg-app-shell>`);
  await page.setViewportSize({ width: 390, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await settleStyles(page); // the phone breakpoint has applied (the drawer starts closed)
  await page.evaluate((props) => Object.assign(document.getElementById('popup')!, props ?? {}), c.props);
  await page.evaluate(() => { (document.querySelector('cg-app-shell') as HTMLElement & { sidebarCollapsed: boolean }).sidebarCollapsed = false; });
  // Opening moves focus to the drawer's first control (after a frame or two); let that land first.
  await page.waitForFunction(() => document.activeElement?.id === 'first');
  await settleStyles(page);
  return page;
}

const drawerOpen = (page: Page) =>
  page.evaluate(() => !(document.querySelector('cg-app-shell') as HTMLElement & { sidebarCollapsed: boolean }).sidebarCollapsed);
const expanded = (page: Page) =>
  page.evaluate(() => {
    const popup = document.getElementById('popup')!;
    // cg-dropdown puts the state on its slotted trigger; the others on their own shadow control.
    return (popup.querySelector('[aria-expanded]') ?? popup.shadowRoot!.querySelector('[aria-expanded]'))!.getAttribute('aria-expanded');
  });

describe.skipIf(!browserAvailable)('Escape in a popup inside the phone drawer (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  for (const c of CASES) {
    it(`${c.tag}: Escape closes the open popup and leaves the drawer open; the next Escape closes the drawer`, async () => {
      const page = await drawerWith(c);
      expect(await drawerOpen(page)).toBe(true);
      const trigger = page.locator('#popup').locator('[aria-expanded]').first();
      await trigger.focus();
      if (c.open) await c.open(page);
      else await trigger.click();
      await settleStyles(page);
      expect(await expanded(page), 'popup opened').toBe('true');
      await page.keyboard.press('Escape');
      await settleStyles(page);
      expect(await expanded(page), 'popup closed').toBe('false');
      expect(await drawerOpen(page), 'drawer still open').toBe(true);
      await page.keyboard.press('Escape');
      await settleStyles(page);
      expect(await drawerOpen(page), 'drawer closed by the next Escape').toBe(false);
      await page.close();
    });
  }
});
