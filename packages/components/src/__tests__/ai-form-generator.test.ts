import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../components/ai-form-generator/ai-form-generator.js';
import type { AiFormGenerator } from '../components/ai-form-generator/ai-form-generator.js';

describe('ai-form-generator', () => {
  let element: AiFormGenerator;

  beforeEach(async () => {
    element = document.createElement('ai-form-generator') as AiFormGenerator;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('registers ai-thinking so the loading overlay is not blank (F1)', async () => {
    element.loading = true;
    await element.updateComplete;
    expect(customElements.get('ai-thinking')).toBeDefined();
    const thinking = element.shadowRoot!.querySelector('ai-thinking');
    expect(thinking).not.toBeNull();
  });

  it('registers cg-label so select errors render (F2)', () => {
    expect(customElements.get('cg-label')).toBeDefined();
  });

  it('renders empty state when no schema', () => {
    const empty = element.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
  });

  it('submits when valid and dispatches ai-form-submit', async () => {
    element.schema = { fields: [{ name: 'a', type: 'text', label: 'A' }] };
    element.values = { a: 'hi' };
    await element.updateComplete;
    let fired = false;
    element.addEventListener('ai-form-submit', () => { fired = true; });
    const btn = element.shadowRoot!.querySelector('cg-button') as HTMLElement;
    btn.click();
    await element.updateComplete;
    expect(fired).toBe(true);
  });

  it('shows an error summary and does not submit when invalid (F8)', async () => {
    element.schema = { fields: [{ name: 'a', type: 'text', label: 'A', required: true }] };
    await element.updateComplete;
    let fired = false;
    element.addEventListener('ai-form-submit', () => { fired = true; });
    const btn = element.shadowRoot!.querySelector('cg-button') as HTMLElement;
    btn.click();
    await element.updateComplete;
    expect(fired).toBe(false);
    const summary = element.shadowRoot!.querySelector('.form-error-summary');
    expect(summary).not.toBeNull();
    expect(summary!.getAttribute('role')).toBe('alert');
  });

  it('tags rendered fields with data-field for focus targeting (F8)', async () => {
    element.schema = { fields: [{ name: 'email', type: 'email', label: 'Email' }] };
    await element.updateComplete;
    const field = element.shadowRoot!.querySelector('[data-field="email"]');
    expect(field).not.toBeNull();
  });
});
