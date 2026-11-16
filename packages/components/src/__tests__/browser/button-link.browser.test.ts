// @vitest-environment node
/**
 * cg-button link mode in real Chromium: `href` renders a real `<a>` (link
 * role, navigation, target/rel kept) with the button's styling; a disabled
 * link is announced as a disabled link and is not focusable.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function open(body: string): Promise<Page> {
  const page = await openPage(['cg-button'], body);
  await page.addStyleTag({ path: TOKENS_CSS });
  await settle(page);
  return page;
}

const inner = (page: Page, sel: string) =>
  page.evaluate((sel) => {
    const el = document.querySelector(sel)!.shadowRoot!.querySelector('[part="button"]') as HTMLElement;
    const cs = getComputedStyle(el);
    return {
      tag: el.localName,
      href: el.getAttribute('href'),
      target: el.getAttribute('target'),
      rel: el.getAttribute('rel'),
      ariaDisabled: el.getAttribute('aria-disabled'),
      style: { bg: cs.backgroundColor, color: cs.color, height: cs.height, radius: cs.borderRadius, deco: cs.textDecorationLine, display: cs.display },
    };
  }, sel);

describe.skipIf(!browserAvailable)('cg-button link mode (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('href renders a link with the button styling and keeps target / rel', async () => {
    const page = await open(`
      <cg-button id="b">New deal</cg-button>
      <cg-button id="l" href="/deals/new" target="_blank" rel="noopener noreferrer">New deal</cg-button>`);
    await expect(page.getByRole('link', { name: 'New deal' }).count()).resolves.toBe(1);
    await expect(page.getByRole('button', { name: 'New deal' }).count()).resolves.toBe(1); // only #b
    const link = await inner(page, '#l');
    const button = await inner(page, '#b');
    expect(link).toMatchObject({ tag: 'a', href: '/deals/new', target: '_blank', rel: 'noopener noreferrer', ariaDisabled: null });
    expect(link.style).toEqual(button.style);
    await page.close();
  });

  it('navigates like a link and is in the tab order', async () => {
    const page = await open(`<button id="before">Before</button><cg-button id="l" href="#target">Go</cg-button><div id="target"></div>`);
    await page.locator('#before').focus();
    await page.keyboard.press('Tab');
    await expect(page.evaluate(() => document.activeElement?.id)).resolves.toBe('l');
    await page.keyboard.press('Enter');
    await expect(page.evaluate(() => location.hash)).resolves.toBe('#target');
    await page.close();
  });

  it('a disabled link is a disabled link, not focusable, and does not navigate', async () => {
    const page = await open(`<button id="before">Before</button><cg-button id="l" href="#nope" disabled>Go</cg-button><button id="after">After</button>`);
    const link = page.getByRole('link', { name: 'Go' });
    await expect(link.count()).resolves.toBe(1);
    await expect(link.getAttribute('aria-disabled')).resolves.toBe('true');
    expect((await inner(page, '#l')).href).toBeNull();
    await page.locator('#before').focus();
    await page.keyboard.press('Tab');
    await expect(page.evaluate(() => document.activeElement?.id)).resolves.toBe('after');
    await page.locator('#l').click({ force: true });
    await expect(page.evaluate(() => location.hash)).resolves.toBe('');
    await page.close();
  });

  it('a plain button host has no href attribute, and host.focus() reaches the inner control (focus traps call it)', async () => {
    const page = await open(`<cg-button id="b">Save</cg-button><cg-button id="l" href="/x">Go</cg-button>`);
    expect(await page.evaluate(() => document.querySelector('#b')!.hasAttribute('href'))).toBe(false);
    const focused = await page.evaluate(() => ['#b', '#l'].map((s) => {
      (document.querySelector(s) as HTMLElement).focus();
      return document.querySelector(s)!.shadowRoot!.activeElement?.localName ?? null;
    }));
    expect(focused).toEqual(['button', 'a']);
    await page.close();
  });

  it('removing href renders a button again', async () => {
    const page = await open(`<cg-button id="l" href="/x">Go</cg-button>`);
    await page.evaluate(() => { (document.querySelector('#l') as HTMLElement & { href: string }).href = ''; });
    await settle(page);
    expect((await inner(page, '#l')).tag).toBe('button');
    await page.close();
  });
});
