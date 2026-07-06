import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiAssistantWidget } from '../components/ai-assistant-widget/ai-assistant-widget.js';

if (!customElements.get('ai-assistant-widget')) {
  customElements.define('ai-assistant-widget', AiAssistantWidget);
}

describe('ai-assistant-widget', () => {
  let el: AiAssistantWidget;

  beforeEach(async () => {
    el = document.createElement('ai-assistant-widget') as AiAssistantWidget;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  async function expand() {
    el.expanded = true;
    await el.updateComplete;
  }

  it('FAB advertises the dialog popup and panel is a non-modal dialog', async () => {
    const fab = el.shadowRoot!.querySelector('.fab')!;
    expect(fab.getAttribute('aria-haspopup')).toBe('dialog');
    expect(fab.className.trim()).toBe('fab'); // dead "open" class removed
    await expand();
    const panel = el.shadowRoot!.querySelector('.panel')!;
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(panel.hasAttribute('aria-modal')).toBe(false);
  });

  it('one Escape press dispatches exactly one ai-assistant-close', async () => {
    await expand();
    let closes = 0;
    el.addEventListener('ai-assistant-close', () => { closes += 1; });
    const input = el.shadowRoot!.querySelector('.input-field') as HTMLInputElement;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(closes).toBe(1);
    expect(el.expanded).toBe(false);
  });

  it('returns focus to the FAB when the panel closes', async () => {
    await expand();
    (el.shadowRoot!.querySelector('.close-btn') as HTMLElement).click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(el.shadowRoot!.activeElement).toBe(el.shadowRoot!.querySelector('.fab'));
  });

  it('announces sender via visually hidden prefix instead of aria-label on a div', async () => {
    el.messages = [
      { role: 'user', content: 'Hi' },
      { role: 'ai', content: 'Hello!' },
    ];
    await expand();
    const msgs = el.shadowRoot!.querySelectorAll('.msg');
    expect(msgs.length).toBe(2);
    expect(msgs[0].hasAttribute('aria-label')).toBe(false);
    expect(msgs[0].querySelector('.sr-only')!.textContent).toBe('You:');
    expect(msgs[1].querySelector('.sr-only')!.textContent).toBe('Assistant:');
  });

  it('sends a trimmed message and clears the input', async () => {
    await expand();
    let detail: { message: string } | null = null;
    el.addEventListener('ai-assistant-send', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const input = el.shadowRoot!.querySelector('.input-field') as HTMLInputElement;
    input.value = '  hello  ';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(detail).toEqual({ message: 'hello' });
    expect((el.shadowRoot!.querySelector('.input-field') as HTMLInputElement).value).toBe('');
  });

  it('hover and focus styles use semantic tokens (no brightness filter, two-layer focus ring)', () => {
    const cssText = (AiAssistantWidget.styles as { cssText?: string }[])
      .map((s) => s.cssText ?? '')
      .join('\n');
    expect(cssText).not.toContain('brightness(');
    expect(cssText).toContain('var(--cg-color-action-primary-background-hover)');
    expect(cssText).toContain('calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width))');
    expect(cssText).toContain('border-color: var(--cg-color-input-border-focus)');
    expect(cssText).toContain('transform-origin: bottom right');
    expect(cssText).toContain('transform-origin: bottom left');
  });
});
