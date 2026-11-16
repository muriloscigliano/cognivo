// @vitest-environment node
/**
 * Issue: only cg-input submitted on Enter, and it called requestSubmit()
 * unconditionally — ignoring a disabled or loading default button and the
 * HTML rule that a form with no submit button and several text fields is not
 * submitted implicitly. Every single-line text field now shares one helper
 * that follows HTML §4.10.21.2 "Implicit submission".
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser } from './harness.js';

const TAGS = ['cg-input', 'cg-password-input', 'cg-number-input', 'cg-phone-input', 'cg-combobox', 'cg-tag-input', 'cg-checkbox', 'cg-button'];

const instrument = `
  window.__submits = 0; window.__submitter = null; window.__clicks = 0;
  document.getElementById('f').addEventListener('submit', (e) => {
    e.preventDefault(); window.__submits++; window.__submitter = e.submitter ? e.submitter.id : null;
  });
  const d = document.getElementById('default');
  if (d) d.addEventListener('click', () => { window.__clicks++; });`;

type W = { __submits: number; __submitter: string | null; __clicks: number };
const submits = (p: Page) => p.evaluate(() => (window as unknown as W).__submits);

async function enterIn(page: Page, selector: string): Promise<void> {
  await page.locator(selector).focus();
  await page.keyboard.press('Enter');
}

describe.skipIf(!browserAvailable)('implicit submission (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  const FIELDS: Array<[string, string, string]> = [
    ['cg-input', '<cg-input id="x" name="a" label="A"></cg-input>', '#x input'],
    ['cg-password-input', '<cg-password-input id="x" name="a" label="A"></cg-password-input>', '#x input'],
    ['cg-number-input', '<cg-number-input id="x" name="a" label="A"></cg-number-input>', '#x input'],
    ['cg-phone-input', '<cg-phone-input id="x" name="a" label="A"></cg-phone-input>', '#x input[type="tel"]'],
    ['cg-combobox (list closed)', '<cg-combobox id="x" name="a" label="A"></cg-combobox>', '#x input'],
    ['cg-tag-input (empty draft)', '<cg-tag-input id="x" name="a" label="A"></cg-tag-input>', '#x input'],
  ];

  for (const [name, field, sel] of FIELDS) {
    it(`Enter in ${name} clicks the default cg-button and submits once`, async () => {
      const page = await openPage(TAGS, `<form id="f">${field}<cg-button id="default" type="submit">Go</cg-button></form>`);
      await page.evaluate(instrument);
      await enterIn(page, sel);
      expect(await submits(page)).toBe(1);
      expect(await page.evaluate(() => (window as unknown as W).__clicks)).toBe(1);
      await page.close();
    });
  }

  it('a native <button> default button receives the click and is the submitter', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input id="x" name="a" label="A"></cg-input><button id="default">Go</button><cg-button type="submit">Other</cg-button></form>`);
    await page.evaluate(instrument);
    await enterIn(page, '#x input');
    expect(await submits(page)).toBe(1);
    expect(await page.evaluate(() => (window as unknown as W).__submitter)).toBe('default');
    await page.close();
  });

  it('a disabled default button blocks implicit submission (a later enabled one does not take over)', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input id="x" name="a" label="A"></cg-input><cg-button id="default" type="submit" disabled>Go</cg-button><cg-button type="submit">Other</cg-button></form>`);
    await page.evaluate(instrument);
    await enterIn(page, '#x input');
    expect(await submits(page)).toBe(0);
    await page.close();
  });

  it('a loading default button blocks implicit submission', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input id="x" name="a" label="A"></cg-input><cg-button id="default" type="submit" loading>Go</cg-button></form>`);
    await page.evaluate(instrument);
    await enterIn(page, '#x input');
    expect(await submits(page)).toBe(0);
    await page.close();
  });

  it('a disabled native default button blocks implicit submission', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input id="x" name="a" label="A"></cg-input><button id="default" disabled>Go</button></form>`);
    await page.evaluate(instrument);
    await enterIn(page, '#x input');
    expect(await submits(page)).toBe(0);
    await page.close();
  });

  it('no submit button and one text field: submits', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input id="x" name="a" label="A"></cg-input><cg-checkbox name="c" label="C"></cg-checkbox><cg-button>Not a submit button</cg-button></form>`);
    await page.evaluate(instrument);
    await enterIn(page, '#x input');
    expect(await submits(page)).toBe(1);
    await page.close();
  });

  it('no submit button and more than one field that blocks implicit submission: does not submit', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input id="x" name="a" label="A"></cg-input><input name="b" type="email"></form>`);
    await page.evaluate(instrument);
    await enterIn(page, '#x input');
    expect(await submits(page)).toBe(0);
    await page.close();
  });

  it('two cg text fields and no submit button: does not submit', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input id="x" name="a" label="A"></cg-input><cg-password-input name="p" label="P"></cg-password-input></form>`);
    await page.evaluate(instrument);
    await enterIn(page, '#x input');
    expect(await submits(page)).toBe(0);
    await page.close();
  });

  it('Enter in cg-tag-input with a draft adds a tag and does not submit', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-tag-input id="x" name="a" label="A"></cg-tag-input><cg-button id="default" type="submit">Go</cg-button></form>`);
    await page.evaluate(instrument);
    await page.locator('#x input').fill('ana');
    await page.keyboard.press('Enter');
    expect(await submits(page)).toBe(0);
    expect(await page.evaluate(() => (document.getElementById('x') as HTMLElement & { value: string[] }).value)).toEqual(['ana']);
    await page.close();
  });
});

describe.skipIf(!browserAvailable)('<fieldset disabled> (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('a cg-button submit inside a disabled fieldset neither submits on click nor on Enter', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input id="x" name="a" label="A"></cg-input><fieldset id="fs" disabled><cg-button id="default" type="submit">Go</cg-button></fieldset></form>`);
    await page.evaluate(instrument);
    await page.locator('#default').click({ force: true });
    await page.evaluate(() => (document.getElementById('default') as HTMLElement).click());
    await enterIn(page, '#x input');
    expect(await submits(page)).toBe(0);
    // Re-enabled: works again.
    await page.evaluate(() => { (document.getElementById('fs') as HTMLFieldSetElement).disabled = false; });
    await enterIn(page, '#x input');
    expect(await submits(page)).toBe(1);
    await page.close();
  });

  const FACE = [
    'cg-button', 'cg-input', 'cg-textarea', 'cg-password-input', 'cg-number-input', 'cg-phone-input',
    'cg-checkbox', 'cg-radio', 'cg-switch', 'cg-toggle', 'cg-select', 'cg-combobox', 'cg-tag-input',
    'cg-slider', 'cg-rating', 'cg-segmented-control', 'cg-file-input', 'cg-date-range-picker', 'cg-calendar',
  ];

  /** Every focusable control inside the element's shadow root. */
  const enabledInner = (page: Page, tag: string) =>
    page.evaluate((tag) => {
      const el = document.querySelector(tag)!;
      const sel = 'input, button, textarea, select, [tabindex]:not([tabindex="-1"])';
      return Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(sel))
        .filter((c) => !(c as HTMLButtonElement).disabled && c.getAttribute('aria-disabled') !== 'true' && c.checkVisibility({ visibilityProperty: true }))
        .map((c) => c.tagName.toLowerCase() + (c.className ? '.' + String(c.className).split(' ')[0] : ''));
    }, tag);

  for (const tag of FACE) {
    it(`${tag}: disabled by an ancestor fieldset, and re-enabled when the fieldset is`, async () => {
      const page = await openPage([tag], `<form><fieldset id="fs" disabled><${tag} name="n" label="L"></${tag}></fieldset></form>`);
      await page.evaluate(async (tag) => {
        const el = document.querySelector(tag) as HTMLElement & { updateComplete: Promise<unknown>; options?: unknown };
        if (tag === 'cg-segmented-control') el.options = [{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }];
        await el.updateComplete;
      }, tag);
      expect(await enabledInner(page, tag)).toEqual([]);
      await page.evaluate(async (tag) => {
        (document.getElementById('fs') as HTMLFieldSetElement).disabled = false;
        await (document.querySelector(tag) as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete;
      }, tag);
      expect((await enabledInner(page, tag)).length).toBeGreaterThan(0);
      await page.close();
    });
  }
});
