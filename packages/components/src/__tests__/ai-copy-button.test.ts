import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiCopyButton } from '../components/ai-copy-button/ai-copy-button.js';

if (!customElements.get('ai-copy-button')) {
  customElements.define('ai-copy-button', AiCopyButton);
}

describe('ai-copy-button', () => {
  let el: AiCopyButton;

  beforeEach(async () => {
    el = document.createElement('ai-copy-button') as AiCopyButton;
    el.value = 'hello world';
    el.label = 'Copy';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('marks the decorative icon glyph aria-hidden (acb-3)', () => {
    const icon = el.shadowRoot!.querySelector('.icon')!;
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('disables the button when value is empty (acb-4)', async () => {
    el.value = '';
    await el.updateComplete;
    const btn = el.shadowRoot!.querySelector('.copy-btn') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute('aria-disabled')).toBe('true');
  });

  it('omits aria-label for default variant so visible text names the button (acb-5)', () => {
    const btn = el.shadowRoot!.querySelector('.copy-btn')!;
    expect(btn.hasAttribute('aria-label')).toBe(false);
    expect(el.shadowRoot!.querySelector('.label-text')!.textContent).toContain('Copy');
  });

  it('retains aria-label for the icon-only variant where text is hidden (acb-5)', async () => {
    el.variant = 'icon-only';
    await el.updateComplete;
    const btn = el.shadowRoot!.querySelector('.copy-btn')!;
    expect(btn.getAttribute('aria-label')).toBe('Copy');
  });

  it('uses the tokenized disabled opacity and focus-ring token, no magic numbers (acb-1, acb-2)', () => {
    const cssText = (el.constructor as typeof AiCopyButton).styles
      .map(s => (s as { cssText?: string }).cssText ?? '')
      .join('\n');
    expect(cssText).toContain('opacity: var(--cg-opacity-50)');
    expect(cssText).toContain('var(--cg-color-focus-ring)');
    expect(cssText).not.toContain('opacity: 0.5');
  });

  it('copies value to clipboard and fires success event', async () => {
    let fired: { value: string } | null = null;
    el.addEventListener('ai-copy-success', (e) => {
      fired = (e as CustomEvent).detail;
    });
    const writeText = (text: string) => { void text; return Promise.resolve(); };
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    (el.shadowRoot!.querySelector('.copy-btn') as HTMLButtonElement).click();
    await el.updateComplete;
    await Promise.resolve();
    expect(fired).not.toBeNull();
    expect(fired!.value).toBe('hello world');
  });
});
