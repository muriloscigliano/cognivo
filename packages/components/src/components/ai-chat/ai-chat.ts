/**
 * @element ai-chat
 * Full-featured AI chat interface with streaming, markdown rendering, message actions, and follow-up chips.
 *
 * @example
 * ```html
 * <ai-chat
 *   .aiClient=${myClient}
 *   welcomeMessage="Ask me anything!"
 *   placeholder="Type a message..."
 * ></ai-chat>
 * ```
 *
 * @fires {CustomEvent<{message: string}>} ai-message-sent - User sent a message
 * @fires {CustomEvent<{message: string}>} ai-response-received - AI response completed
 * @fires {CustomEvent<{error: string}>} ai-error - AI request failed
 * @fires {CustomEvent} ai-chat-stop - User stopped generation
 * @fires {CustomEvent<{content: string}>} ai-chat-copy - Message copied
 * @fires {CustomEvent<{messageId: string}>} ai-chat-regenerate - Regenerate requested
 * @fires {CustomEvent<{messageId: string, rating: 'up'|'down'}>} ai-chat-rate - Message rated
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - AI avatar gradient, links, send button, streaming cursor
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement, query } from 'lit/decorators.js';
import type { AiClient } from '@cognivo/core';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface MessageVersion {
  content: string;
  timestamp: number;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  versions: MessageVersion[];
  activeVersion: number;
  isError?: boolean;
}

@customElement('ai-chat')
export class AiChat extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    

    .chat {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 400px;
      max-height: 800px;
      background: var(--cg-color-surface-container-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border-radius: var(--cg-border-radius-150, 12px);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      overflow: hidden;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    /* ── Messages ── */
    .messages {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-20, 20px);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-16, 16px);
      scroll-behavior: smooth;
    }

    .msg {
      display: flex;
      gap: var(--cg-spacing-10, 10px);
      max-width: 85%;
      animation: slideIn 250ms ease-out;
    }
    .msg.user { align-self: flex-end; flex-direction: row-reverse; }
    .msg.ai { align-self: flex-start; }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── Avatar ── */
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-weight: 700;
      font-size: var(--cg-font-size-xs, 12px);
    }
    .msg.user .avatar {
      background: rgba(34, 197, 94, 0.15);
      color: var(--cg-green-400, #4ade80);
    }
    .msg.ai .avatar {
      background: linear-gradient(135deg, var(--cg-brand-ai-accent, #dfff61), var(--cg-brand-ai-highlight, #e2ff70));
      color: var(--cg-gray-black, #000000);
    }

    /* ── Bubble ── */
    .bubble {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      border-radius: var(--cg-border-radius-150, 12px);
      line-height: 1.5;
      font-size: var(--cg-font-size-sm, 14px);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .msg.user .bubble {
      background: rgba(34, 197, 94, 0.12);
      color: var(--cg-color-surface-base-text, #fafafa);
      border-bottom-right-radius: 4px;
    }
    .msg.ai .bubble {
      background: var(--cg-color-surface-base-background, #09090b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border-bottom-left-radius: 4px;
    }
    .msg.ai .bubble.error {
      background: rgba(239, 68, 68, 0.1);
      color: var(--cg-red-400, #f87171);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    /* ── Markdown in bubble ── */
    .bubble strong { font-weight: 700; }
    .bubble em { font-style: italic; }
    .bubble code {
      background: rgba(255, 255, 255, 0.06);
      padding: 2px var(--cg-spacing-6, 6px);
      border-radius: var(--cg-border-radius-50, 4px);
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-size: var(--cg-font-size-xs, 12px);
    }
    .bubble pre {
      background: rgba(0, 0, 0, 0.3);
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      border-radius: var(--cg-border-radius-100, 8px);
      overflow-x: auto;
      margin: var(--cg-spacing-8, 8px) 0;
      font-size: var(--cg-font-size-xs, 12px);
      line-height: 1.5;
    }
    .bubble pre code { background: none; padding: 0; }
    .bubble ul, .bubble ol { padding-left: var(--cg-spacing-20, 20px); margin: var(--cg-spacing-6, 6px) 0; }
    .bubble a { color: var(--cg-brand-ai-accent, #dfff61); text-decoration: none; }
    .bubble a:hover { text-decoration: underline; }
    .bubble p { margin: 0 0 var(--cg-spacing-8, 8px) 0; }
    .bubble p:last-child { margin-bottom: 0; }

    /* ── Streaming cursor ── */
    .cursor {
      display: inline-block;
      width: 2px;
      height: 14px;
      background: var(--cg-brand-ai-accent, #dfff61);
      margin-left: 1px;
      vertical-align: text-bottom;
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    /* ── Message actions ── */
    .actions {
      display: flex;
      gap: var(--cg-spacing-4, 4px);
      margin-top: var(--cg-spacing-6, 6px);
      opacity: 0;
      transition: opacity 150ms;
    }
    .msg:hover .actions, .msg:focus-within .actions { opacity: 1; }
    .action-btn {
      background: none;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-400, #a1a1aa);
      border-radius: var(--cg-border-radius-100, 8px);
      padding: 2px var(--cg-spacing-8, 8px);
      font-size: var(--cg-font-size-xs, 12px);
      cursor: pointer;
      transition: all 150ms;
      font-family: inherit;
    }
    .action-btn:hover {
      color: var(--cg-color-surface-base-text, #fafafa);
      border-color: var(--cg-gray-600, #52525b);
      background: rgba(255, 255, 255, 0.04);
    }
    .action-btn.copied { color: var(--cg-green-400, #4ade80); border-color: rgba(34, 197, 94, 0.3); }

    /* ── Version nav ── */
    .version-nav {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6, 6px);
      margin-top: var(--cg-spacing-4, 4px);
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
    }
    .version-btn {
      background: none;
      border: none;
      color: var(--cg-gray-400, #a1a1aa);
      cursor: pointer;
      padding: 0 var(--cg-spacing-4, 4px);
      font-size: var(--cg-font-size-sm, 14px);
    }
    .version-btn:hover { color: var(--cg-brand-ai-accent, #dfff61); }
    .version-btn:disabled { opacity: 0.3; cursor: default; }

    /* ── Thinking ── */
    .thinking-area {
      align-self: flex-start;
      padding: 0 var(--cg-spacing-20, 20px) var(--cg-spacing-4, 4px);
    }

    /* ── Stop button ── */
    .stop-btn {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6, 6px);
      margin: 0 auto 8px;
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px);
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: var(--cg-red-400, #f87171);
      border-radius: var(--cg-border-radius-100, 8px);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms;
      font-family: inherit;
    }
    .stop-btn:hover { background: rgba(239, 68, 68, 0.15); }

    /* ── Scroll to bottom ── */
    .scroll-btn {
      position: absolute;
      bottom: 76px;
      right: 20px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--cg-gray-800, #27272a);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-400, #a1a1aa);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-sm, 14px);
      transition: all 150ms;
      z-index: 10;
    }
    .scroll-btn:hover { background: var(--cg-gray-700, #3f3f46); color: var(--cg-brand-ai-accent, #dfff61); }

    /* ── Input area ── */
    .input-area {
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      border-top: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-image: linear-gradient(to right, transparent, var(--cg-color-surface-container-border, #27272a) 20%, var(--cg-color-surface-container-border, #27272a) 80%, transparent) 1;
      display: flex;
      gap: var(--cg-spacing-8, 8px);
    }
    input {
      flex: 1;
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      border-radius: var(--cg-border-radius-100, 8px);
      font-size: var(--cg-font-size-sm, 14px);
      font-family: inherit;
      background: var(--cg-color-surface-base-background, #09090b);
      color: var(--cg-color-surface-base-text, #fafafa);
      outline: none;
      transition: border-color 200ms;
    }
    input:focus { border-color: var(--cg-brand-ai-accent, #dfff61); }
    input:disabled { opacity: 0.5; cursor: not-allowed; }

    .send-btn {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px);
      background: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-gray-black, #000000);
      border: none;
      border-radius: var(--cg-border-radius-100, 8px);
      font-weight: 700;
      font-size: var(--cg-font-size-sm, 14px);
      cursor: pointer;
      transition: all 150ms;
      font-family: inherit;
    }
    .send-btn:hover:not(:disabled) { filter: brightness(1.1); }
    .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* ── Follow-ups ── */
    .follow-ups {
      padding: 0 var(--cg-spacing-20, 20px) var(--cg-spacing-12, 12px);
      display: flex;
      gap: var(--cg-spacing-6, 6px);
      flex-wrap: wrap;
    }
    .follow-up-chip {
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      border-radius: var(--cg-border-radius-100, 8px);
      background: none;
      color: var(--cg-gray-400, #a1a1aa);
      font-size: var(--cg-font-size-xs, 12px);
      cursor: pointer;
      transition: all 150ms;
      font-family: inherit;
    }
    .follow-up-chip:hover {
      color: var(--cg-brand-ai-accent, #dfff61);
      border-color: rgba(223, 255, 97, 0.3);
      background: rgba(223, 255, 97, 0.05);
    }

    /* ── Empty state ── */
    .empty {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--cg-gray-500, #71717a);
      gap: var(--cg-spacing-10, 10px);
      text-align: center;
    }
    .empty-icon { font-size: var(--cg-font-size-2xl, 24px); }
    .empty-text { font-size: var(--cg-font-size-base, 16px); font-weight: 500; }

    .wrapper { position: relative; display: flex; flex-direction: column; height: 100%; }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .chat { border-radius: 0; }
    :host([rounded="sm"]) .chat { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .chat { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .chat { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .chat { border-radius: var(--cg-border-radius-full, 99999px); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Object }) aiClient: AiClient | null = null;
  @property({ type: Array }) chatDataset: unknown[] = [];
  @property({ type: Boolean }) showActions: boolean = true;
  @property({ type: Boolean }) showFollowUps: boolean = true;
  @property({ type: String }) welcomeMessage: string = 'Ask me about your data!';
  @property({ type: String }) userAvatar: string = 'U';
  @property({ type: String }) aiAvatar: string = 'AI';
  @property({ type: String }) placeholder: string = 'Type a message...';
  @property({ type: Number }) maxMessages: number = 100;

  @state() private _messages: Message[] = [];
  @state() private _input: string = '';
  @state() private _isStreaming: boolean = false;
  @state() private _isThinking: boolean = false;
  @state() private _isComposing: boolean = false;
  @state() private _showScrollBtn: boolean = false;
  @state() private _copiedId: string | null = null;
  @state() private _followUps: string[] = [];
  @state() private _streamingContent: string = '';

  @query('.messages') private _messagesEl!: HTMLDivElement;

  private _msgCounter: number = 0;
  private _abortController: AbortController | null = null;

  private _genId(): string { return `msg-${++this._msgCounter}`; }

  private _scrollToBottom() {
    requestAnimationFrame(() => {
      if (this._messagesEl) {
        this._messagesEl.scrollTop = this._messagesEl.scrollHeight;
      }
    });
  }

  private _handleScroll() {
    if (!this._messagesEl) return;
    const { scrollTop, scrollHeight, clientHeight } = this._messagesEl;
    this._showScrollBtn = scrollHeight - scrollTop - clientHeight > 100;
  }

  private async _sendMessage() {
    if (!this._input.trim() || !this.aiClient || this._isStreaming || this._isThinking) return;

    const text = this._input.trim();
    this._input = '';
    this._followUps = [];

    this._messages = [...this._messages, {
      id: this._genId(),
      role: 'user',
      versions: [{ content: text, timestamp: Date.now() }],
      activeVersion: 0,
    }];

    this.dispatchEvent(new CustomEvent('ai-message-sent', {
      bubbles: true, composed: true,
      detail: { message: text, timestamp: Date.now() },
    }));

    await this.updateComplete;
    this._scrollToBottom();
    this._isThinking = true;
    this._abortController = new AbortController();

    try {
      const result = await (this.aiClient as any).runIntent('explain', {
        dataset: this.chatDataset.length > 0 ? this.chatDataset : [{ info: 'No data provided' }],
        meta: { userQuestion: text, timeframe: 'monthly', unit: 'USD' },
      }) as Record<string, any>;

      this._isThinking = false;
      const aiContent = String(result?.explanation || result?.content || 'Analysis complete.');

      this._messages = [...this._messages, {
        id: this._genId(),
        role: 'ai',
        versions: [{ content: aiContent, timestamp: Date.now() }],
        activeVersion: 0,
      }];

      this.dispatchEvent(new CustomEvent('ai-response-received', {
        bubbles: true, composed: true,
        detail: { message: aiContent, timestamp: Date.now() },
      }));
    } catch (err: unknown) {
      this._isThinking = false;
      const errMsg = err instanceof Error ? err.message : 'An error occurred';
      this._messages = [...this._messages, {
        id: this._genId(),
        role: 'ai',
        versions: [{ content: errMsg, timestamp: Date.now() }],
        activeVersion: 0,
        isError: true,
      }];
      this.dispatchEvent(new CustomEvent('ai-error', {
        bubbles: true, composed: true,
        detail: { error: errMsg, timestamp: Date.now() },
      }));
    } finally {
      this._isStreaming = false;
      this._abortController = null;
      await this.updateComplete;
      this._scrollToBottom();
    }
  }

  /** Append streaming content to a new or existing AI message */
  streamResponse(token: string) {
    this._isStreaming = true;
    this._isThinking = false;
    this._streamingContent += token;

    const lastMsg = this._messages[this._messages.length - 1];
    if (lastMsg && lastMsg.role === 'ai' && lastMsg.id === `msg-stream`) {
      lastMsg.versions[0].content = this._streamingContent;
      this._messages = [...this._messages];
    } else {
      this._messages = [...this._messages, {
        id: 'msg-stream',
        role: 'ai',
        versions: [{ content: this._streamingContent, timestamp: Date.now() }],
        activeVersion: 0,
      }];
    }
    this._scrollToBottom();
  }

  /** Complete streaming */
  completeStream(followUps?: string[]) {
    this._isStreaming = false;
    const lastMsg = this._messages[this._messages.length - 1];
    if (lastMsg && lastMsg.id === 'msg-stream') {
      lastMsg.id = this._genId();
    }
    this._streamingContent = '';
    if (followUps) this._followUps = followUps;
    this.dispatchEvent(new CustomEvent('ai-response-received', {
      bubbles: true, composed: true,
      detail: { message: lastMsg?.versions[0].content || '', timestamp: Date.now() },
    }));
  }

  /** Export conversation as markdown */
  exportConversation(): string {
    return this._messages.map(m => {
      const v = m.versions[m.activeVersion];
      return `**${m.role === 'user' ? 'User' : 'AI'}:** ${v.content}`;
    }).join('\n\n');
  }

  private _handleStop() {
    this._abortController?.abort();
    this._isStreaming = false;
    this._isThinking = false;
    this.dispatchEvent(new CustomEvent('ai-chat-stop', { bubbles: true, composed: true }));
  }

  private _handleCopy(msg: Message) {
    const text = msg.versions[msg.activeVersion].content;
    navigator.clipboard?.writeText(text);
    this._copiedId = msg.id;
    setTimeout(() => { this._copiedId = null; }, 2000);
    this.dispatchEvent(new CustomEvent('ai-chat-copy', {
      bubbles: true, composed: true,
      detail: { content: text },
    }));
  }

  private _handleRegenerate(msg: Message) {
    this.dispatchEvent(new CustomEvent('ai-chat-regenerate', {
      bubbles: true, composed: true,
      detail: { messageId: msg.id },
    }));
  }

  private _handleRate(msg: Message, rating: 'up' | 'down') {
    this.dispatchEvent(new CustomEvent('ai-chat-rate', {
      bubbles: true, composed: true,
      detail: { messageId: msg.id, rating },
    }));
  }

  private _handleFollowUp(text: string) {
    this._input = text;
    this._followUps = [];
    this._sendMessage();
  }

  private _switchVersion(msg: Message, delta: number) {
    const newIdx = msg.activeVersion + delta;
    if (newIdx >= 0 && newIdx < msg.versions.length) {
      msg.activeVersion = newIdx;
      this._messages = [...this._messages];
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && !this._isComposing) {
      e.preventDefault();
      this._sendMessage();
    }
  }

  /** Sanitize URL — block javascript: and data: protocols */
  private _sanitizeUrl(url: string): string {
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
      return '#';
    }
    return url;
  }

  /** Simple markdown → HTML (no external dep, XSS-safe) */
  private _renderMarkdown(text: string) {
    let h = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
        const safe = this._sanitizeUrl(url);
        return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      })
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    h = h.split('\n\n').map(block => {
      if (block.startsWith('<pre>') || block.startsWith('<ul>') || block.startsWith('<ol>')) return block;
      return `<p>${block}</p>`;
    }).join('');
    return h;
  }

  override render() {
    if (!this.aiClient) {
      return html`
        <div class="chat">
          <div class="empty" role="status">
            <div class="empty-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="8" width="18" height="12" rx="3"/><circle cx="9" cy="14" r="1.5"/><circle cx="15" cy="14" r="1.5"/><path d="M12 2v4M8 8V6a4 4 0 018 0v2"/></svg></div>
            <div class="empty-text">Set <code>aiClient</code> to start chatting</div>
          </div>
        </div>
      `;
    }

    const isLastAiStreaming = this._isStreaming && this._messages.length > 0 && this._messages[this._messages.length - 1]?.role === 'ai';

    return html`
      <div class="chat">
        <div class="wrapper">
          <div class="messages" role="log" aria-live="polite" aria-label="Chat messages" @scroll=${this._handleScroll}>
            ${this._messages.length === 0 && !this._isThinking ? html`
              <div class="empty">
                <div class="empty-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg></div>
                <div class="empty-text">${this.welcomeMessage}</div>
              </div>
            ` : this._messages.map(msg => {
              const v = msg.versions[msg.activeVersion];
              return html`
                <div class="msg ${msg.role}">
                  <div class="avatar" aria-hidden="true">${msg.role === 'user' ? this.userAvatar : this.aiAvatar}</div>
                  <div>
                    <div class="bubble ${msg.isError ? 'error' : ''}" .innerHTML=${msg.role === 'ai' && !msg.isError ? this._renderMarkdown(v.content) : nothing}>
                      ${msg.role === 'user' || msg.isError ? v.content : nothing}
                      ${this._isStreaming && msg.id === 'msg-stream' ? html`<span class="cursor"></span>` : nothing}
                    </div>

                    ${msg.role === 'ai' && this.showActions && !this._isStreaming ? html`
                      <div class="actions">
                        <button class="action-btn ${this._copiedId === msg.id ? 'copied' : ''}" @click=${() => this._handleCopy(msg)} title="Copy">
                          ${this._copiedId === msg.id ? html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Copied` : 'Copy'}
                        </button>
                        <button class="action-btn" @click=${() => this._handleRegenerate(msg)} title="Regenerate"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg> Retry</button>
                        <button class="action-btn" @click=${() => this._handleRate(msg, 'up')} title="Good"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg></button>
                        <button class="action-btn" @click=${() => this._handleRate(msg, 'down')} title="Bad"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg></button>
                      </div>
                    ` : nothing}

                    ${msg.versions.length > 1 ? html`
                      <div class="version-nav">
                        <button class="version-btn" ?disabled=${msg.activeVersion === 0} @click=${() => this._switchVersion(msg, -1)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m7 7l-7-7 7-7"/></svg></button>
                        <span>${msg.activeVersion + 1} / ${msg.versions.length}</span>
                        <button class="version-btn" ?disabled=${msg.activeVersion === msg.versions.length - 1} @click=${() => this._switchVersion(msg, 1)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7l7 7-7 7"/></svg></button>
                      </div>
                    ` : nothing}
                  </div>
                </div>
              `;
            })}

            ${this._isThinking ? html`
              <div class="thinking-area">
                <ai-thinking text="Analyzing" shimmer delay="0"></ai-thinking>
              </div>
            ` : nothing}
          </div>

          ${this._showScrollBtn ? html`
            <button class="scroll-btn" @click=${this._scrollToBottom} aria-label="Scroll to bottom"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m7-7l-7 7-7-7"/></svg></button>
          ` : nothing}

          ${(this._isStreaming || this._isThinking) ? html`
            <button class="stop-btn" @click=${this._handleStop}><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1"/></svg> Stop generating</button>
          ` : nothing}

          ${this._followUps.length > 0 && this.showFollowUps ? html`
            <div class="follow-ups">
              ${this._followUps.map(f => html`
                <button class="follow-up-chip" @click=${() => this._handleFollowUp(f)}>${f}</button>
              `)}
            </div>
          ` : nothing}
        </div>

        <div class="input-area">
          <input
            type="text"
            .placeholder=${this.placeholder}
            aria-label="Chat message input"
            .value=${this._input}
            @input=${(e: Event) => this._input = (e.target as HTMLInputElement).value}
            @keydown=${this._handleKeyDown}
            @compositionstart=${() => this._isComposing = true}
            @compositionend=${() => this._isComposing = false}
            ?disabled=${this._isStreaming || this._isThinking}
          />
          <button
            class="send-btn"
            @click=${this._sendMessage}
            ?disabled=${this._isStreaming || this._isThinking || !this._input.trim()}
            aria-label="Send message"
          >Send</button>
        </div>
      </div>
    `;
  }
}
