import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AiChat } from '../components/ai-chat/ai-chat.js';

if (!customElements.get('ai-chat')) {
  customElements.define('ai-chat', AiChat);
}

const mockClient = () => ({ runIntent: vi.fn(async () => ({ explanation: 'test response' })) } as any);

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
    element.aiClient = mockClient();
    await element.updateComplete;
    const inputArea = element.shadowRoot!.querySelector('.input-area');
    expect(inputArea).not.toBeNull();
  });

  it('renders a textarea when aiClient is set', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    const textarea = element.shadowRoot!.querySelector('textarea');
    expect(textarea).not.toBeNull();
  });

  it('textarea has default placeholder', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    const textarea = element.shadowRoot!.querySelector('textarea');
    expect(textarea!.placeholder).toBe('Type a message...');
  });

  it('textarea has aria-label', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    const textarea = element.shadowRoot!.querySelector('textarea');
    expect(textarea!.getAttribute('aria-label')).toBe('Chat message');
  });

  it('renders a send button when aiClient is set', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    const btn = element.shadowRoot!.querySelector('.send-btn');
    expect(btn).not.toBeNull();
  });

  it('send button has aria-label', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    const btn = element.shadowRoot!.querySelector('.send-btn');
    expect(btn!.getAttribute('aria-label')).toBe('Send message');
  });

  it('shows empty state when aiClient is set but no messages', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    const empty = element.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('Ask me about your data');
  });

  it('messages area has role="log" and aria-live', async () => {
    element.aiClient = mockClient();
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
    element.aiClient = mockClient();
    element.placeholder = 'Custom placeholder';
    await element.updateComplete;
    const textarea = element.shadowRoot!.querySelector('textarea');
    expect(textarea!.placeholder).toBe('Custom placeholder');
  });

  it('defaults intent to chat', () => {
    expect(element.intent).toBe('chat');
  });

  it('defaults useStreaming to false', () => {
    expect(element.useStreaming).toBe(false);
  });

  it('defaults maxMessages to 100', () => {
    expect(element.maxMessages).toBe(100);
  });

  it('addMessage adds a user message', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    const id = element.addMessage('user', 'Hello');
    await element.updateComplete;
    expect(id).toMatch(/^msg-/);
    const msgs = element.shadowRoot!.querySelectorAll('.msg.user');
    expect(msgs.length).toBe(1);
    expect(msgs[0].textContent).toContain('Hello');
  });

  it('addMessage adds an AI message', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    element.addMessage('ai', 'Hi there');
    await element.updateComplete;
    const msgs = element.shadowRoot!.querySelectorAll('.msg.ai');
    expect(msgs.length).toBe(1);
  });

  it('clearMessages removes all messages', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    element.addMessage('user', 'Hello');
    element.addMessage('ai', 'Hi');
    await element.updateComplete;
    element.clearMessages();
    await element.updateComplete;
    const msgs = element.shadowRoot!.querySelectorAll('.msg');
    expect(msgs.length).toBe(0);
  });

  it('exportConversation formats messages as markdown', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    element.addMessage('user', 'Question');
    element.addMessage('ai', 'Answer');
    const md = element.exportConversation();
    expect(md).toContain('**User:** Question');
    expect(md).toContain('**AI:** Answer');
  });

  it('messages have role="article" with aria-label', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    element.addMessage('user', 'Test');
    element.addMessage('ai', 'Reply');
    await element.updateComplete;
    const articles = element.shadowRoot!.querySelectorAll('[role="article"]');
    expect(articles.length).toBe(2);
    expect(articles[0].getAttribute('aria-label')).toBe('Your message');
    expect(articles[1].getAttribute('aria-label')).toBe('AI response');
  });

  it('shows action buttons on AI messages when showActions is true', async () => {
    element.aiClient = mockClient();
    element.showActions = true;
    await element.updateComplete;
    element.addMessage('ai', 'Response text');
    await element.updateComplete;
    const actions = element.shadowRoot!.querySelector('.actions');
    expect(actions).not.toBeNull();
  });

  it('hides action buttons when showActions is false', async () => {
    element.aiClient = mockClient();
    element.showActions = false;
    await element.updateComplete;
    element.addMessage('ai', 'Response text');
    await element.updateComplete;
    const actions = element.shadowRoot!.querySelector('.actions');
    expect(actions).toBeNull();
  });

  it('streamResponse adds streaming content', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    element.streamResponse('Hello');
    element.streamResponse(' world');
    await element.updateComplete;
    const streamMsg = element.shadowRoot!.querySelector('.msg.ai');
    expect(streamMsg).not.toBeNull();
  });

  it('completeStream finalizes the streaming message', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    element.streamResponse('Streamed content');
    element.completeStream(['Follow up 1']);
    await element.updateComplete;
    const streamMsg = element.shadowRoot!.querySelector('[id^="msg-stream"]');
    expect(streamMsg).toBeNull(); // stream id should be replaced
  });

  it('send button is disabled when input is empty', async () => {
    element.aiClient = mockClient();
    await element.updateComplete;
    const btn = element.shadowRoot!.querySelector('.send-btn') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });
});
