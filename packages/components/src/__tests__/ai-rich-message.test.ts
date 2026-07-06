import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiRichMessage } from '../components/ai-rich-message/ai-rich-message.js';

if (!customElements.get('ai-rich-message')) {
  customElements.define('ai-rich-message', AiRichMessage);
}

describe('ai-rich-message', () => {
  let element: AiRichMessage;

  beforeEach(async () => {
    element = document.createElement('ai-rich-message') as AiRichMessage;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders with a shadow root and article role', () => {
    const message = element.shadowRoot!.querySelector('.message')!;
    expect(message).not.toBeNull();
    expect(message.getAttribute('role')).toBe('article');
  });

  it('does not make the static message a tab stop (no tabindex)', () => {
    const message = element.shadowRoot!.querySelector('.message')!;
    expect(message.hasAttribute('tabindex')).toBe(false);
    // aria-label is retained for AT navigation
    expect(message.getAttribute('aria-label')).toBe('assistant message');
  });

  it('renders text content split into paragraphs', async () => {
    element.text = 'First para\n\nSecond para';
    await element.updateComplete;

    const paras = element.shadowRoot!.querySelectorAll('.text p');
    expect(paras.length).toBe(2);
    expect(paras[0]!.textContent).toBe('First para');
    expect(paras[1]!.textContent).toBe('Second para');
  });

  it('renders action buttons with accessible labels', async () => {
    element.actions = [{ label: 'Regenerate', id: 'regen' }];
    await element.updateComplete;

    const btn = element.shadowRoot!.querySelector('.action-btn')!;
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('aria-label')).toBe('Regenerate');
  });

  it('dispatches ai-message-action when an action button is clicked', async () => {
    element.actions = [{ label: 'Retry', id: 'retry' }];
    await element.updateComplete;

    let detail: unknown;
    element.addEventListener('ai-message-action', (e) => { detail = (e as CustomEvent).detail; });
    (element.shadowRoot!.querySelector('.action-btn') as HTMLButtonElement).click();

    expect(detail).toEqual({ actionId: 'retry' });
  });

  it('applies role-specific class to the message wrapper', async () => {
    element.role = 'user';
    await element.updateComplete;

    const message = element.shadowRoot!.querySelector('.message')!;
    expect(message.classList.contains('user')).toBe(true);
  });
});
