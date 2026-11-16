// @vitest-environment node
/**
 * cg-button link mode in real Chromium: `href` renders a real `<a>` (link
 * role, navigation, target/rel kept) with the button's styling; a disabled
 * link is announced as a disabled link and is not focusable.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function open(body: string): Promise<Page> {
  const page = await openPage(['cg-button'], body);
  // Tokens arrive after the first render: compare end states, not colour transitions.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await settleStyles(page);
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
    await settleStyles(page);
    expect((await inner(page, '#l')).tag).toBe('button');
    await page.close();
  });

  it('a bare `download` attribute is kept (the browser picks the file name); a value names the file', async () => {
    const page = await open(`<cg-button id="bare" href="/report.csv" download>Export</cg-button><cg-button id="named" href="/r" download="deals.csv">Export</cg-button><cg-button id="none" href="/r">Open</cg-button>`);
    const attr = (sel: string) => page.evaluate((sel) => document.querySelector(sel)!.shadowRoot!.querySelector('a')!.getAttribute('download'), sel);
    expect(await attr('#bare')).toBe('');
    expect(await attr('#named')).toBe('deals.csv');
    expect(await attr('#none')).toBeNull();
    await page.evaluate(() => document.querySelector('#bare')!.removeAttribute('download'));
    await settleStyles(page);
    expect(await attr('#bare')).toBeNull();
    await page.close();
  });

  for (const href of ['javascript:alert(1)', ' JaVaScRiPt:alert(1)', 'java\tscript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'vbscript:msgbox(1)']) {
    it(`refuses a dangerous href (${JSON.stringify(href)}): rendered as a disabled link, nothing runs`, async () => {
      const page = await open(`<button id="before">Before</button><cg-button id="l">Go</cg-button><button id="after">After</button>`);
      await page.evaluate((href) => {
        (window as unknown as { ran: boolean }).ran = false;
        (window as unknown as { alert: () => void }).alert = () => { (window as unknown as { ran: boolean }).ran = true; };
        (document.querySelector('#l') as HTMLElement & { href: string }).href = href.replace('\\t', '\t');
      }, href);
      await settleStyles(page);
      const a = await inner(page, '#l');
      expect(a).toMatchObject({ tag: 'a', href: null, ariaDisabled: 'true' });
      await page.locator('#before').focus();
      await page.keyboard.press('Tab');
      await expect(page.evaluate(() => document.activeElement?.id)).resolves.toBe('after');
      await page.locator('#l').click({ force: true });
      await expect(page.evaluate(() => (window as unknown as { ran: boolean }).ran)).resolves.toBe(false);
      await page.close();
    });
  }

  it('target="_blank" gets rel="noopener noreferrer" unless a rel is given', async () => {
    const page = await open(`
      <cg-button id="blank" href="/x" target="_blank">A</cg-button>
      <cg-button id="own" href="/x" target="_blank" rel="external">B</cg-button>
      <cg-button id="self" href="/x">C</cg-button>`);
    expect((await inner(page, '#blank')).rel).toBe('noopener noreferrer');
    expect((await inner(page, '#own')).rel).toBe('external');
    expect((await inner(page, '#self')).rel).toBeNull();
    await page.close();
  });

  it('a link-mode button is never the form\'s default button: Enter in a field does not follow or submit through it', async () => {
    const page = await openPage(['cg-button', 'cg-input'], `
      <form id="f">
        <cg-input id="q" name="q" label="Search"></cg-input>
        <cg-button id="l" href="#followed" type="submit">Help</cg-button>
      </form>`);
    await page.evaluate(() => {
      (window as unknown as { submits: number }).submits = 0;
      document.getElementById('f')!.addEventListener('submit', (e) => { e.preventDefault(); (window as unknown as { submits: number }).submits++; });
    });
    await page.locator('#q input').focus();
    await page.keyboard.press('Enter');
    await settleStyles(page);
    await expect(page.evaluate(() => location.hash)).resolves.toBe('');
    // With no submit button, a single field submits the form itself (HTML implicit submission).
    await expect(page.evaluate(() => (window as unknown as { submits: number }).submits)).resolves.toBe(1);
    await page.close();
  });
});
