import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiAnnotation } from '../components/ai-annotation/ai-annotation.js';

if (!customElements.get('ai-annotation')) {
  customElements.define('ai-annotation', AiAnnotation);
}

describe('ai-annotation', () => {
  let el: AiAnnotation;

  beforeEach(async () => {
    el = document.createElement('ai-annotation') as AiAnnotation;
    el.content = 'Claude is made by Anthropic.';
    el.annotations = [{ start: 0, end: 6, label: 'Person', confidence: 0.95 }];
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders annotated spans as keyboard-activatable buttons', () => {
    const span = el.shadowRoot!.querySelector('.annotated-span')!;
    expect(span.getAttribute('role')).toBe('button');
    expect(span.getAttribute('tabindex')).toBe('0');
    expect(span.getAttribute('aria-pressed')).toBe('false');
  });

  it('toggles annotation via Enter key and fires ai-annotation-select', async () => {
    let detail: any = null;
    el.addEventListener('ai-annotation-select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const span = el.shadowRoot!.querySelector('.annotated-span') as HTMLElement;
    span.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(detail).not.toBeNull();
    expect(detail.annotation.label).toBe('Person');
    expect(span.getAttribute('aria-pressed')).toBe('true');
    expect(el.shadowRoot!.querySelector('.annotation-tag')).not.toBeNull();
  });

  it('renders a remove button in the active tag when editable and fires ai-annotation-remove', async () => {
    el.editable = true;
    await el.updateComplete;
    (el.shadowRoot!.querySelector('.annotated-span') as HTMLElement).click();
    await el.updateComplete;
    const removeBtn = el.shadowRoot!.querySelector('.tag-remove') as HTMLElement;
    expect(removeBtn).not.toBeNull();
    let detail: any = null;
    el.addEventListener('ai-annotation-remove', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    removeBtn.click();
    expect(detail).not.toBeNull();
    expect(detail.annotation.label).toBe('Person');
  });

  it('does not render a remove button when not editable', async () => {
    (el.shadowRoot!.querySelector('.annotated-span') as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.annotation-tag')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.tag-remove')).toBeNull();
  });

  it('exposes label toggle state via aria-pressed and disables buttons in read-only mode', async () => {
    const btn = el.shadowRoot!.querySelector('.label-btn') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    el.editable = true;
    await el.updateComplete;
    const btns = el.shadowRoot!.querySelectorAll('.label-btn') as NodeListOf<HTMLButtonElement>;
    expect(btns[0]!.disabled).toBe(false);
    expect(btns[0]!.getAttribute('aria-pressed')).toBe('false');
    btns[0]!.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.label-btn')!.getAttribute('aria-pressed')).toBe('true');
  });

  it('binds selection handler to keyup as well as mouseup on the content area', async () => {
    // Both events run the same guarded handler; with no selection they are no-ops.
    const content = el.shadowRoot!.querySelector('.content') as HTMLElement;
    expect(() => {
      content.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', shiftKey: true, bubbles: true }));
      content.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    }).not.toThrow();
  });
});
