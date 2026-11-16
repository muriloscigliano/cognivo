// @vitest-environment node
/**
 * Every overlay that uses the shared focus trap (utils/focus-trap): closed,
 * neither the dialog nor its slotted content is in the tab order or the
 * accessibility tree; open, Tab and Shift+Tab never leave it; Escape closes
 * it and focus returns to the element that opened it. cg-modal has its own
 * suite (modal-focus.browser.test.ts).
 *
 * Issue: a closed cg-drawer kept its dialog, close button and slotted fields
 * in the tab order and the accessibility tree (it was only translated off
 * screen), the same defect cg-modal had.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

type Overlay = {
  tag: string;
  tags: string[];
  body: string;
  /** Slotted content name that must vanish from the a11y tree when closed. */
  slotted?: string;
  setup?: string;
};

const FIELDS = `<cg-input id="a" name="a" label="Inside field"></cg-input><cg-button id="b">Inside button</cg-button>`;

const OVERLAYS: Overlay[] = [
  { tag: 'cg-drawer', tags: ['cg-drawer', 'cg-input', 'cg-button', 'cg-icon'], body: `<cg-drawer id="o" title="Drawer" closable>${FIELDS}</cg-drawer>`, slotted: 'Inside' },
  { tag: 'cg-sheet', tags: ['cg-sheet', 'cg-input', 'cg-button'], body: `<cg-sheet id="o" label="Sheet">${FIELDS}</cg-sheet>`, slotted: 'Inside' },
  { tag: 'cg-alert-dialog', tags: ['cg-alert-dialog', 'cg-input', 'cg-button'], body: `<cg-alert-dialog id="o" title="Alert" closable>${FIELDS}</cg-alert-dialog>`, slotted: 'Inside' },
  { tag: 'cg-command', tags: ['cg-command', 'cg-input', 'cg-button', 'cg-icon'], body: `<cg-command id="o"><div slot="header">${FIELDS}</div></cg-command>`, slotted: 'Inside',
    setup: `document.getElementById('o').commands = [{ id: '1', label: 'First command' }, { id: '2', label: 'Second command' }];` },
  { tag: 'cg-lightbox', tags: ['cg-lightbox'], body: `<cg-lightbox id="o"></cg-lightbox>`,
    setup: `document.getElementById('o').images = [{ src: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=', alt: 'One' }, { src: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=', alt: 'Two' }];` },
  { tag: 'cg-popover', tags: ['cg-popover', 'cg-input', 'cg-button'], body: `<cg-popover id="o" label="Popover" trigger="manual"><span>anchor</span><div slot="content">${FIELDS}</div></cg-popover>`, slotted: 'Inside' },
];

async function open(o: Overlay): Promise<Page> {
  const page = await openPage(o.tags, `<button id="opener">Open</button>${o.body}<button id="after">after</button>`);
  if (o.setup) await page.evaluate(o.setup);
  await settle(page);
  return page;
}

const focusInside = (page: Page) =>
  page.evaluate(() => {
    const o = document.getElementById('o')!;
    const a = document.activeElement;
    return !!a && (a === o || o.contains(a));
  });

const focusedId = (page: Page) => page.evaluate(() => document.activeElement?.id ?? document.activeElement?.tagName ?? '');

describe.skipIf(!browserAvailable)('overlays using the shared focus trap (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  for (const o of OVERLAYS) {
    describe(o.tag, () => {
      it('closed: nothing inside is in the tab order or the accessibility tree', async () => {
        const page = await open(o);
        await page.locator('#opener').focus();
        await page.keyboard.press('Tab');
        expect(await focusedId(page)).toBe('after');
        const tree = await page.locator('body').ariaSnapshot();
        expect(tree).not.toMatch(/dialog/);
        expect(tree).not.toMatch(/textbox|combobox|listbox/);
        if (o.slotted) expect(tree).not.toContain(o.slotted);
        await page.close();
      });

      it('open: Tab and Shift+Tab stay inside; Escape closes and returns focus to the opener', async () => {
        const page = await open(o);
        await page.locator('#opener').focus();
        await page.evaluate(() => { (document.getElementById('o') as HTMLElement & { open: boolean }).open = true; });
        await settle(page);
        await page.waitForFunction(() => {
          const o = document.getElementById('o')!;
          const a = document.activeElement;
          return !!a && (a === o || o.contains(a));
        });
        for (let i = 0; i < 6; i++) {
          await page.keyboard.press('Tab');
          expect(await focusInside(page), `Tab #${i + 1}`).toBe(true);
        }
        for (let i = 0; i < 6; i++) {
          await page.keyboard.press('Shift+Tab');
          expect(await focusInside(page), `Shift+Tab #${i + 1}`).toBe(true);
        }
        await page.keyboard.press('Escape');
        await settle(page);
        expect(await page.evaluate(() => (document.getElementById('o') as HTMLElement & { open: boolean }).open)).toBe(false);
        expect(await focusedId(page)).toBe('opener');
        await page.close();
      });
    });
  }
});
