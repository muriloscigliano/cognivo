// @vitest-environment node
/**
 * Issue: React 19 (and any framework or script) sets `name` as a PROPERTY.
 * A form-associated custom element contributes to FormData under its `name`
 * CONTENT ATTRIBUTE, so a property-only `name` silently dropped the field
 * (the spike's dialog form produced `{}`).
 */
import { describe, it, expect, afterAll } from 'vitest';
import { browserAvailable, openPage, closeBrowser } from './harness.js';

// tag -> how to give it a value through properties only
const CASES: Record<string, { set: string; expected: string }> = {
  'cg-input': { set: 'el.value = "ana@example.com"', expected: 'ana@example.com' },
  'cg-textarea': { set: 'el.value = "hello"', expected: 'hello' },
  'cg-password-input': { set: 'el.value = "s3cret"', expected: 's3cret' },
  'cg-number-input': { set: 'el.value = 7', expected: '7' },
  'cg-checkbox': { set: 'el.value = "yes"; el.checked = true', expected: 'yes' },
  'cg-select': { set: 'el.options = [{ value: "a", label: "A" }]; el.value = "a"', expected: 'a' },
  'cg-combobox': { set: 'el.options = [{ value: "b", label: "B" }]; el.value = "b"', expected: 'b' },
  'cg-slider': { set: 'el.value = 30', expected: '30' },
  'cg-rating': { set: 'el.value = 4', expected: '4' },
  'cg-calendar': { set: 'el.value = "2026-11-16"', expected: '2026-11-16' },
  'cg-phone-input': { set: 'el.value = "+5511999990000"', expected: '+5511999990000' },
  'cg-tag-input': { set: 'el.value = ["x", "y"]', expected: 'x,y' },
  'cg-otp-input': { set: 'el.value = "123456"', expected: '123456' },
};

describe.skipIf(!browserAvailable)('form-associated fields set purely through properties (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('every field contributes to FormData under its property-set name', async () => {
    const tags = Object.keys(CASES);
    const page = await openPage(tags, '<form id="f"></form>');
    const result = await page.evaluate(async (cases) => {
      const form = document.getElementById('f') as HTMLFormElement;
      for (const [tag, c] of Object.entries(cases)) {
        const el = document.createElement(tag) as HTMLElement & { updateComplete: Promise<unknown>; name: string };
        el.name = `f-${tag}`; // property only — never setAttribute
        new Function('el', c.set)(el);
        form.appendChild(el);
        await el.updateComplete;
        await el.updateComplete;
      }
      return Object.fromEntries(Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]));
    }, CASES);
    const expected = Object.fromEntries(Object.entries(CASES).map(([t, c]) => [`f-${t}`, c.expected]));
    expect(result).toEqual(expected);
    await page.close();
  });

  it('name set as a property is reflected to the attribute', async () => {
    const page = await openPage(['cg-input', 'cg-checkbox'], '');
    const attrs = await page.evaluate(async () => {
      const out: Record<string, string | null> = {};
      for (const tag of ['cg-input', 'cg-checkbox']) {
        const el = document.createElement(tag) as HTMLElement & { updateComplete: Promise<unknown>; name: string };
        el.name = 'n';
        document.body.appendChild(el);
        await el.updateComplete;
        out[tag] = el.getAttribute('name');
      }
      return out;
    });
    expect(attrs).toEqual({ 'cg-input': 'n', 'cg-checkbox': 'n' });
    await page.close();
  });
});
