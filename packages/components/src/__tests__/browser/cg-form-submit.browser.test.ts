// @vitest-environment node
/**
 * Issue: cg-form renders its own <form> in its shadow root, and slotted
 * controls are in the light DOM, so they have no form owner: a slotted
 * `cg-button type="submit"` did nothing and Enter in a slotted cg-input did
 * nothing — `cg-submit` only fired for controls that do not exist in practice.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser } from './harness.js';

const TAGS = ['cg-form', 'cg-input', 'cg-password-input', 'cg-button'];

const instrument = `
  window.__submits = 0; window.__resets = 0; window.__clicks = 0;
  const f = document.getElementById('f');
  f.addEventListener('cg-submit', () => { window.__submits++; });
  f.addEventListener('cg-reset', () => { window.__resets++; });
  const d = document.getElementById('go');
  if (d) d.addEventListener('click', () => { window.__clicks++; });`;

type W = { __submits: number; __resets: number; __clicks: number };
const count = (p: Page, k: keyof W) => p.evaluate((k) => (window as unknown as W)[k], k);

async function open(body: string): Promise<Page> {
  const page = await openPage(TAGS, body);
  await page.evaluate(instrument);
  return page;
}

describe.skipIf(!browserAvailable)('cg-form with slotted controls (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('clicking a slotted cg-button type="submit" fires cg-submit once', async () => {
    const page = await open(`<cg-form id="f" name="signup"><cg-input name="a" label="A"></cg-input><cg-button id="go" type="submit">Go</cg-button></cg-form>`);
    await page.click('#go');
    expect(await count(page, '__submits')).toBe(1);
    await page.close();
  });

  it('Enter in a slotted cg-input clicks the default button and fires cg-submit once', async () => {
    const page = await open(`<cg-form id="f"><cg-input id="x" name="a" label="A"></cg-input><cg-button id="go" type="submit">Go</cg-button></cg-form>`);
    await page.locator('#x input').focus();
    await page.keyboard.press('Enter');
    expect(await count(page, '__submits')).toBe(1);
    expect(await count(page, '__clicks')).toBe(1);
    await page.close();
  });

  it('a slotted native <button> submits; a plain cg-button does not', async () => {
    const page = await open(`<cg-form id="f"><cg-input name="a" label="A"></cg-input><cg-button id="plain">Plain</cg-button><button id="go">Go</button></cg-form>`);
    await page.click('#plain');
    expect(await count(page, '__submits')).toBe(0);
    await page.click('#go');
    expect(await count(page, '__submits')).toBe(1);
    await page.close();
  });

  it('nothing submits while cg-form is loading, or when the default button is disabled', async () => {
    const page = await open(`<cg-form id="f" loading><cg-input id="x" name="a" label="A"></cg-input><cg-button id="go" type="submit">Go</cg-button></cg-form>`);
    await page.evaluate(() => (document.getElementById('go') as HTMLElement).click());
    await page.locator('#x input').focus();
    await page.keyboard.press('Enter');
    expect(await count(page, '__submits')).toBe(0);
    await page.evaluate(async () => {
      const f = document.getElementById('f') as HTMLElement & { loading: boolean; updateComplete: Promise<unknown> };
      f.loading = false;
      const go = document.getElementById('go') as HTMLElement & { disabled: boolean; updateComplete: Promise<unknown> };
      go.disabled = true;
      await go.updateComplete;
      go.click();
    });
    await page.locator('#x input').focus();
    await page.keyboard.press('Enter');
    expect(await count(page, '__submits')).toBe(0);
    await page.close();
  });

  it('no submit button: Enter submits with one text field, not with two', async () => {
    const one = await open(`<cg-form id="f"><cg-input id="x" name="a" label="A"></cg-input></cg-form>`);
    await one.locator('#x input').focus();
    await one.keyboard.press('Enter');
    expect(await count(one, '__submits')).toBe(1);
    await one.close();
    const two = await open(`<cg-form id="f"><cg-input id="x" name="a" label="A"></cg-input><cg-password-input name="p" label="P"></cg-password-input></cg-form>`);
    await two.locator('#x input').focus();
    await two.keyboard.press('Enter');
    expect(await count(two, '__submits')).toBe(0);
    await two.close();
  });

  it('a slotted cg-button type="reset" resets the slotted fields', async () => {
    const page = await open(`<cg-form id="f"><cg-input id="x" name="a" label="A"></cg-input><cg-button id="r" type="reset">Reset</cg-button></cg-form>`);
    await page.locator('#x input').fill('typed');
    await page.click('#r');
    expect(await page.evaluate(() => (document.getElementById('x') as HTMLElement & { value: string }).value)).toBe('');
    expect(await count(page, '__resets')).toBe(1);
    await page.close();
  });
});
