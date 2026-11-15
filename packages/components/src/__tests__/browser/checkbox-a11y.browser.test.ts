// @vitest-environment node
/**
 * Issue: cg-checkbox rendered a <label role="checkbox" tabindex="0"> — axe
 * reported `nested-interactive` (serious) and `aria-allowed-role` on every
 * page that used it. It must be a real <input type="checkbox">.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { browserAvailable, openPage, closeBrowser, settle, axeViolations } from './harness.js';

const TAGS = ['cg-checkbox'];

describe.skipIf(!browserAvailable)('cg-checkbox semantics (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('axe: no violations (nested-interactive, aria-allowed-role) in default, checked, described and aria-label-only forms', async () => {
    const page = await openPage(TAGS, `
      <main>
        <cg-checkbox name="a" label="Send me the course e-mails"></cg-checkbox>
        <cg-checkbox name="b" label="Checked" checked description="Helper text"></cg-checkbox>
        <cg-checkbox name="c" aria-label="Select row"></cg-checkbox>
        <cg-checkbox name="d" label="Mixed" indeterminate></cg-checkbox>
      </main>`);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('exposes one native checkbox with the right name, description and state', async () => {
    const page = await openPage(TAGS, `<cg-checkbox label="Consent" description="Required to continue" required></cg-checkbox>`);
    const info = await page.evaluate(() => {
      const root = document.querySelector('cg-checkbox')!.shadowRoot!;
      const inputs = root.querySelectorAll('input[type="checkbox"]');
      return {
        nativeCount: inputs.length,
        roleOverrides: root.querySelectorAll('[role="checkbox"]').length,
        required: (inputs[0] as HTMLInputElement | undefined)?.required,
      };
    });
    expect(info).toEqual({ nativeCount: 1, roleOverrides: 0, required: true });
    const snap = await page.locator('cg-checkbox').ariaSnapshot();
    expect(snap).toContain('checkbox "Consent"');
    await page.close();
  });

  it('keyboard: Tab reaches it once; Space toggles and fires one cg-change; click on the text toggles once', async () => {
    const page = await openPage(TAGS, `<button id="before">x</button><cg-checkbox label="Opt in" value="yes"></cg-checkbox>`);
    await page.evaluate(() => {
      (window as unknown as { __changes: boolean[] }).__changes = [];
      document.querySelector('cg-checkbox')!.addEventListener('cg-change', (e) =>
        (window as unknown as { __changes: boolean[] }).__changes.push((e as CustomEvent<{ checked: boolean }>).detail.checked));
    });
    await page.focus('#before');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.shadowRoot?.activeElement?.tagName);
    expect(focused).toBe('INPUT');
    await page.keyboard.press('Space');
    await settle(page);
    await page.getByText('Opt in').click();
    await settle(page);
    const state = await page.evaluate(() => ({
      changes: (window as unknown as { __changes: boolean[] }).__changes,
      checked: (document.querySelector('cg-checkbox') as HTMLElement & { checked: boolean }).checked,
    }));
    expect(state).toEqual({ changes: [true, false], checked: false });
    await page.close();
  });

  it('participates in a form: FormData when checked, valueMissing when required and unchecked', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-checkbox name="consent" value="marketing" required label="Consent"></cg-checkbox></form>`);
    const before = await page.evaluate(() => (document.getElementById('f') as HTMLFormElement).checkValidity());
    await page.getByText('Consent').click();
    await settle(page);
    const after = await page.evaluate(() => ({
      valid: (document.getElementById('f') as HTMLFormElement).checkValidity(),
      data: Object.fromEntries(new FormData(document.getElementById('f') as HTMLFormElement)),
    }));
    expect(before).toBe(false);
    expect(after).toEqual({ valid: true, data: { consent: 'marketing' } });
    await page.close();
  });
});
