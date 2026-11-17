// @vitest-environment node
/**
 * Issue (spike evidence/dashboard-closed-modal.json): a CLOSED cg-modal left
 * its dialog and every slotted field in the tab order and the accessibility
 * tree; when OPEN, Tab never left the close button because the trap tried to
 * .focus() slotted custom-element hosts that are not focusable themselves.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

const TAGS = ['cg-modal', 'cg-input', 'cg-button', 'cg-icon'];

const BODY = `
  <cg-button id="opener">Add contact</cg-button>
  <cg-modal id="m" title="Add contact">
    <cg-input id="name" name="name" label="Name"></cg-input>
    <cg-input id="email" name="email" label="E-mail"></cg-input>
    <div slot="footer"><cg-button id="save">Save</cg-button></div>
  </cg-modal>
  <button id="after">after</button>`;

/** Describe what has focus: the deepest active element and its host chain. */
function focusPath(page: Page): Promise<string> {
  return page.evaluate(() => {
    let el: Element | null = document.activeElement;
    const parts: string[] = [];
    while (el) {
      parts.push(el.id ? `${el.tagName.toLowerCase()}#${el.id}` : el.tagName.toLowerCase());
      el = el.shadowRoot?.activeElement ?? null;
    }
    return parts.join('>');
  });
}

async function tabTrail(page: Page, n: number, key = 'Tab'): Promise<string[]> {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    await page.keyboard.press(key);
    out.push(await focusPath(page));
  }
  return out;
}

describe.skipIf(!browserAvailable)('cg-modal focus and visibility (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('closed: neither the dialog nor slotted fields are in the tab order or the accessibility tree', async () => {
    const page = await openPage(TAGS, BODY);
    await page.locator('#opener button').focus();
    expect(await tabTrail(page, 1)).toEqual(['button#after']);
    const tree = await page.locator('body').ariaSnapshot();
    expect(tree).not.toContain('dialog');
    expect(tree).not.toContain('textbox');
    await page.close();
  });

  it('open: Tab and Shift+Tab cycle through the close button, slotted fields and footer, never leaving the dialog', async () => {
    const page = await openPage(TAGS, BODY);
    await page.locator('#opener button').focus();
    await page.evaluate(() => { (document.getElementById('m') as HTMLElement & { open: boolean }).open = true; });
    await settle(page);
    await page.waitForFunction(() => {
      let el: Element | null = document.activeElement;
      while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
      return el?.tagName === 'BUTTON' && el.classList.contains('close-btn');
    });
    expect(await tabTrail(page, 4)).toEqual([
      'cg-input#name>input#i',
      'cg-input#email>input#i',
      'cg-button#save>button',
      'cg-modal#m>button', // wraps to the close button
    ]);
    expect(await tabTrail(page, 2, 'Shift+Tab')).toEqual(['cg-button#save>button', 'cg-input#email>input#i']);
    await page.close();
  });

  it('Escape from a slotted field closes it and focus returns to the opener\'s inner button', async () => {
    const page = await openPage(TAGS, BODY);
    await page.locator('#opener button').focus();
    await page.evaluate(() => { (document.getElementById('m') as HTMLElement & { open: boolean }).open = true; });
    await settle(page);
    await page.locator('#email input').focus();
    await page.keyboard.press('Escape');
    await settle(page);
    const open = await page.evaluate(() => (document.getElementById('m') as HTMLElement & { open: boolean }).open);
    expect(open).toBe(false);
    expect(await focusPath(page)).toBe('cg-button#opener>button');
    await page.close();
  });
});
