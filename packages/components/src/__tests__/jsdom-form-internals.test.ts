// @vitest-environment jsdom
/**
 * jsdom (Jest / Vitest / React Testing Library default) implements
 * `attachInternals()` with the ARIA mixin only: no `setFormValue`,
 * `setValidity`, `form` or `validity`. Form-associated components must
 * degrade to plain elements there — render, take values, fire events — and
 * never throw from an update.
 */
import { describe, it, expect, afterEach, vi } from 'vitest';

const FORM_ASSOCIATED = [
  'cg-button', 'cg-calendar', 'cg-checkbox', 'cg-combobox', 'cg-date-range-picker',
  'cg-file-input', 'cg-input', 'cg-number-input', 'cg-otp-input', 'cg-password-input',
  'cg-phone-input', 'cg-radio', 'cg-rating', 'cg-segmented-control', 'cg-select',
  'cg-slider', 'cg-switch', 'cg-tag-input', 'cg-textarea', 'cg-toggle',
];

/** A value each component accepts (string by default). */
const VALUES: Record<string, unknown> = {
  'cg-number-input': 3,
  'cg-rating': 2,
  'cg-slider': 40,
  'cg-tag-input': ['a'],
  'cg-date-range-picker': undefined,
  'cg-file-input': undefined,
};

type Field = HTMLElement & {
  updateComplete: Promise<boolean>;
  value?: unknown;
  required?: boolean;
  checkValidity?: () => boolean;
  reportValidity?: () => boolean;
  validity?: unknown;
};

describe('form-associated components in jsdom (no ElementInternals form API)', () => {
  afterEach(() => { document.body.innerHTML = ''; });

  it('jsdom really lacks setFormValue (the environment this guards)', () => {
    class Probe extends HTMLElement { static formAssociated = true; }
    customElements.define('x-jsdom-probe', Probe);
    const internals = new Probe().attachInternals();
    expect(typeof (internals as Partial<ElementInternals>).setFormValue).toBe('undefined');
  });

  it.each(FORM_ASSOCIATED)('%s renders, takes a value inside a form and validates without throwing', async (tag) => {
    await import(`../components/${tag}/${tag}.ts`);
    const errors: unknown[] = [];
    const onError = (e: ErrorEvent) => errors.push(e.error);
    window.addEventListener('error', onError);
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      const form = document.createElement('form');
      const el = document.createElement(tag) as Field;
      el.setAttribute('name', 'f');
      form.append(el);
      document.body.append(form);
      await el.updateComplete;
      if (tag in VALUES ? VALUES[tag] !== undefined : true) el.value = VALUES[tag] ?? 'x';
      el.required = true;
      await el.updateComplete;
      expect(el.checkValidity?.() ?? true).toBe(true);
      expect(el.reportValidity?.() ?? true).toBe(true);
      // Enter in the field (implicit submission) must not throw either.
      const inner = el.shadowRoot?.querySelector('input, textarea, button');
      inner?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
      form.reset();
      await el.updateComplete;
      expect(errors).toEqual([]);
      expect(spy.mock.calls.filter((c) => String(c[0]).includes('setFormValue') || String(c[0]).includes('setValidity'))).toEqual([]);
    } finally {
      window.removeEventListener('error', onError);
      spy.mockRestore();
    }
  });
});
