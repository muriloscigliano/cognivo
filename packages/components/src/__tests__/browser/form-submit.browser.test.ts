// @vitest-environment node
/**
 * Issue: `<cg-button type="submit">` and Enter inside `<cg-input>` did not
 * submit the surrounding native <form> (the spike counted 0 submits for both),
 * because the real <button>/<input> live in shadow roots that a light-DOM
 * form never sees.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { browserAvailable, openPage, closeBrowser } from './harness.js';

const TAGS = ['cg-input', 'cg-button'];

describe.skipIf(!browserAvailable)('native form submission (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  const FORM = `
    <form id="f">
      <cg-input name="email" label="E-mail"></cg-input>
      <cg-button id="submit" type="submit">Send</cg-button>
      <cg-button id="reset" type="reset" variant="secondary">Reset</cg-button>
      <cg-button id="plain" variant="tertiary">Plain</cg-button>
    </form>`;

  const instrument = `
    window.__submits = 0;
    document.getElementById('f').addEventListener('submit', (e) => { e.preventDefault(); window.__submits++; });`;

  it('clicking cg-button type="submit" submits the form once (submit event + validation)', async () => {
    const page = await openPage(TAGS, FORM);
    await page.evaluate(instrument);
    await page.click('#submit');
    expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits)).toBe(1);
    await page.close();
  });

  it('pressing Enter inside cg-input submits the form', async () => {
    const page = await openPage(TAGS, FORM);
    await page.evaluate(instrument);
    await page.locator('cg-input input').fill('ana@example.com');
    await page.locator('cg-input input').press('Enter');
    expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits)).toBe(1);
    await page.close();
  });

  it('a cg-button without type does not submit; type="reset" resets the form', async () => {
    const page = await openPage(TAGS, FORM);
    await page.evaluate(instrument);
    await page.click('#plain');
    expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits)).toBe(0);
    await page.locator('cg-input input').fill('typed');
    await page.click('#reset');
    expect(await page.evaluate(() => (document.querySelector('cg-input') as HTMLElement & { value: string }).value)).toBe('');
    await page.close();
  });

  it('a submit blocked by an invalid required field does not fire submit', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input name="n" label="Name" required></cg-input><cg-button id="submit" type="submit">Go</cg-button></form>`);
    await page.evaluate(instrument);
    await page.click('#submit');
    expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits)).toBe(0);
    await page.close();
  });

  it('type="danger" keeps its danger styling meaning and does not submit', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-button id="d" type="danger">Delete</cg-button></form>`);
    await page.evaluate(instrument);
    await page.click('#d');
    expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits)).toBe(0);
    await page.close();
  });
});
