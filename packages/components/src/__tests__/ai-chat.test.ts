import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiChat } from '../components/ai-chat/ai-chat.js';

if (!customElements.get('ai-chat')) {
  customElements.define('ai-chat', AiChat);
}

describe('ai-chat', () => {
  let element: AiChat;

  beforeEach(async () => {
    element = document.createElement('ai-chat') as AiChat;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders in the DOM with a shadow root', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('renders chat div', () => {
    const container = element.shadowRoot!.querySelector('.chat');
    expect(container).not.toBeNull();
  });

  it('shows empty state when no aiClient is provided', () => {
    const empty = element.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('aiClient');
  });

  it('empty state has role="status"', () => {
    const empty = element.shadowRoot!.querySelector('.empty');
    expect(empty!.getAttribute('role')).toBe('status');
  });

  it('does not render input area when no aiClient', () => {
    const inputArea = element.shadowRoot!.querySelector('.input-area');
    expect(inputArea).toBeNull();
  });

  it('renders input area when aiClient is provided', async () => {
    element.aiClient = { runIntent: async () => ({ explanation: 'test' }) } as any;
    await element.updateComplete;
    const inputArea = element.shadowRoot!.querySelector('.input-area');
    expect(inputArea).not.toBeNull();
  });

  it('renders an input field when aiClient is set', async () => {
    element.aiClient = { runIntent: async () => ({ explanation: 'test' }) } as any;
    await element.updateComplete;
    const input = element.shadowRoot!.querySelector('input');
    expect(input).not.toBeNull();
    expect(input!.getAttribute('type')).toBe('text');
  });

  it('input field has default placeholder', async () => {
    element.aiClient = { runIntent: async () => ({ explanation: 'test' }) } as any;
    await element.updateComplete;
    const input = element.shadowRoot!.querySelector('input');
    expect(input!.placeholder).toBe('Type a message...');
  });

  it('input field has aria-label', async () => {
    element.aiClient = { runIntent: async () => ({ explanation: 'test' }) } as any;
    await element.updateComplete;
    const input = element.shadowRoot!.querySelector('input');
    expect(input!.getAttribute('aria-label')).toBe('Chat message input');
  });

  it('renders a Send button when aiClient is set', async () => {
    element.aiClient = { runIntent: async () => ({ explanation: 'test' }) } as any;
    await element.updateComplete;
    const btn = element.shadowRoot!.querySelector('.send-btn');
    expect(btn).not.toBeNull();
    expect(btn!.textContent?.trim()).toBe('Send');
  });

  it('send button has aria-label', async () => {
    element.aiClient = { runIntent: async () => ({ explanation: 'test' }) } as any;
    await element.updateComplete;
    const btn = element.shadowRoot!.querySelector('.send-btn');
    expect(btn!.getAttribute('aria-label')).toBe('Send message');
  });

  it('shows empty state when aiClient is set but no messages', async () => {
    element.aiClient = { runIntent: async () => ({ explanation: 'test' }) } as any;
    await element.updateComplete;
    const empty = element.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('Ask me about your data');
  });

  it('messages area has role="log" and aria-live', async () => {
    element.aiClient = { runIntent: async () => ({ explanation: 'test' }) } as any;
    await element.updateComplete;
    const messages = element.shadowRoot!.querySelector('.messages');
    expect(messages!.getAttribute('role')).toBe('log');
    expect(messages!.getAttribute('aria-live')).toBe('polite');
  });

  it('defaults aiClient to null', () => {
    expect(element.aiClient).toBeNull();
  });

  it('exportConversation returns empty string with no messages', () => {
    expect(element.exportConversation()).toBe('');
  });

  it('has customizable placeholder', async () => {
    element.aiClient = { runIntent: async () => ({ explanation: 'test' }) } as any;
    element.placeholder = 'Custom placeholder';
    await element.updateComplete;
    const input = element.shadowRoot!.querySelector('input');
    expect(input!.placeholder).toBe('Custom placeholder');
  });
});
