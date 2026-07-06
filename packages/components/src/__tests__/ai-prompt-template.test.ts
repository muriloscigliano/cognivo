import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiPromptTemplate } from '../components/ai-prompt-template/ai-prompt-template.js';

if (!customElements.get('ai-prompt-template')) {
  customElements.define('ai-prompt-template', AiPromptTemplate);
}

describe('ai-prompt-template', () => {
  let el: AiPromptTemplate;

  beforeEach(async () => {
    el = document.createElement('ai-prompt-template') as AiPromptTemplate;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders with shadow root and region role', () => {
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('[role="region"]')).not.toBeNull();
  });

  it('mode toggle uses role=group with aria-pressed buttons (not radiogroup)', async () => {
    el.editable = true;
    await el.updateComplete;
    const toggle = el.shadowRoot!.querySelector('.mode-toggle')!;
    expect(toggle.getAttribute('role')).toBe('group');
    expect(el.shadowRoot!.querySelector('[role="radio"]')).toBeNull();
    const btns = el.shadowRoot!.querySelectorAll('.mode-btn');
    expect(btns.length).toBe(2);
    // default mode is edit → first button pressed
    expect(btns[0]!.getAttribute('aria-pressed')).toBe('true');
    expect(btns[1]!.getAttribute('aria-pressed')).toBe('false');
  });

  it('hides the mode toggle when not editable', async () => {
    el.editable = false;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.mode-toggle')).toBeNull();
  });

  it('template preview uses default (not placeholder) input text color', () => {
    const css = (el.constructor as typeof AiPromptTemplate).styles!.toString();
    expect(css).toContain('--cg-color-input-text-default');
    // placeholder token must not leak into primary content areas
    expect(css).not.toContain('--cg-color-input-border-hover');
  });

  it('detects variables and renders inputs', async () => {
    el.template = 'Summarize {{topic}} for {{audience}}.';
    await el.updateComplete;
    const inputs = el.shadowRoot!.querySelectorAll('.var-input');
    expect(inputs.length).toBe(2);
  });

  it('dispatches ai-template-variable-change on variable input', async () => {
    el.template = 'Hello {{name}}';
    await el.updateComplete;
    let detail: { variable: string; value: string } | null = null;
    el.addEventListener('ai-template-variable-change', (e) => {
      detail = (e as CustomEvent).detail;
    });
    const input = el.shadowRoot!.querySelector('.var-input') as HTMLInputElement;
    input.value = 'World';
    input.dispatchEvent(new Event('input'));
    expect(detail).not.toBeNull();
    expect(detail!.variable).toBe('name');
    expect(detail!.value).toBe('World');
  });
});
