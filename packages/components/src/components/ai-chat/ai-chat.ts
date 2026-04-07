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
 * @cssprop --cg-component-ai-chat-radius - Chat container border radius
 * @cssprop --cg-component-ai-chat-textarea-max-height - Max height for the input textarea
 * @cssprop --cg-color-surface-cards-background - Chat background
 * @cssprop --cg-color-action-primary-background-default - Send button, links, AI avatar
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
      min-height: var(--cg-component-ai-chat-min-height);
      max-height: var(--cg-component-ai-chat-max-height);
      background: var(--cg-color-surface-cards-background);
      border-radius: var(--cg-component-ai-chat-radius);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      overflow: hidden;
    }

    .wrapper { position: relative; display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden; }

    /* ── Messages ── */
    .messages {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-24);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-16);
      scroll-behavior: smooth;
    }

    .msg {
      max-width: 85%;
      animation: slideIn var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }
    .msg.user { align-self: flex-end; }
    .msg.ai { align-self: flex-start; }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(var(--cg-spacing-8)); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── Bubble ── */
    .bubble {
      padding: var(--cg-spacing-12) var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-200);
      line-height: var(--cg-line-height-relaxed);
      font-size: var(--cg-font-size-sm);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .msg.user .bubble {
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-base-text);
      border-bottom-right-radius: var(--cg-spacing-4);
      border-color: var(--cg-overlay-accent-medium);
    }
    .msg.ai .bubble {
      background: var(--cg-color-surface-cards-background);
      color: var(--cg-color-surface-base-text);
      border-bottom-left-radius: var(--cg-spacing-4);
    }
    .msg.ai .bubble.error {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }

    /* ── Streaming cursor ── */
    .cursor {
      display: inline-block;
      width: var(--cg-spacing-2);
      height: var(--cg-spacing-16);
      background: var(--cg-color-action-primary-background-default);
      margin-left: var(--cg-spacing-1);
      vertical-align: text-bottom;
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    /* ── Message actions (layout only — buttons are cg-button) ── */
    .actions {
      display: flex;
      gap: var(--cg-spacing-4);
      margin-top: var(--cg-spacing-6);
      opacity: 0;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-motion-easing-default);
    }
    .msg:hover .actions, .msg:focus-within .actions { opacity: 1; }

    /* ── Version nav ── */
    .version-nav {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      margin-top: var(--cg-spacing-4);
    }
    .version-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }

    /* ── Thinking ── */
    .thinking-area {
      align-self: flex-start;
      padding: 0 var(--cg-spacing-20) var(--cg-spacing-4);
    }

    /* ── Positioned elements ── */
    .stop-btn { margin: 0 auto var(--cg-spacing-8); }
    .scroll-btn { position: absolute; bottom: var(--cg-spacing-80); right: var(--cg-spacing-20); z-index: 10; }
    .follow-ups { padding: 0 var(--cg-spacing-20) var(--cg-spacing-12); }

    /* ── Input area — fused container like ChatGPT/Claude ── */
    .input-area {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      flex-shrink: 0;
    }
    .input-box {
      display: flex;
      align-items: flex-end;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-8) var(--cg-spacing-8) var(--cg-spacing-16);
      background: var(--cg-color-input-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-border-radius-200);
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-motion-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-motion-easing-default);
    }
    .input-box:focus-within {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .input-box textarea {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--cg-color-input-text-default);
      font: inherit;
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
      resize: none;
      padding: var(--cg-spacing-4) 0;
      min-height: var(--cg-spacing-24);
      max-height: var(--cg-component-ai-chat-textarea-max-height, 10rem);
    }
    .input-box textarea::placeholder {
      color: var(--cg-color-input-text-placeholder);
    }
    /* Shared icon button style for send + mic */
    .icon-btn {
      flex-shrink: 0;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border-radius: var(--cg-border-radius-full);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-motion-easing-default),
        opacity var(--cg-transition-duration-fast) var(--cg-motion-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-motion-easing-default);
    }
    .icon-btn:active:not(:disabled) { transform: scale(var(--cg-interaction-press-scale)); }
    .icon-btn:disabled { opacity: 0.3; cursor: default; }

    .send-btn {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
    }
    .send-btn:hover:not(:disabled) {
      background: var(--cg-color-action-primary-background-hover);
    }

    .mic-btn {
      background: transparent;
      color: var(--cg-color-input-text-placeholder);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .mic-btn:hover:not(:disabled) {
      color: var(--cg-color-surface-base-text);
      border-color: var(--cg-color-input-border-hover);
    }
    .mic-btn.recording {
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-text-default);
      background: var(--cg-color-status-error-background-default);
      animation: micPulse 1.5s ease-in-out infinite;
    }
    @keyframes micPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    /* ── Empty state ── */
    .empty {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--cg-color-surface-container-outlined);
      gap: var(--cg-spacing-12);
      text-align: center;
    }
    .empty-text {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-medium);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .chat { border-radius: 0; }
    :host([rounded="sm"]) .chat { border-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) .chat { border-radius: var(--cg-border-radius-150); }
    :host([rounded="lg"]) .chat { border-radius: var(--cg-component-ai-chat-radius); }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .msg { animation: none; }
      .cursor { animation: none; opacity: 1; }
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Object }) aiClient: AiClient | null = null;
  @property({ type: Array }) chatDataset: unknown[] = [];
  @property({ type: Boolean }) showActions: boolean = true;
  @property({ type: Boolean }) showFollowUps: boolean = true;
  @property({ type: String }) welcomeMessage: string = 'Ask me about your data!';
  @property({ type: String }) placeholder: string = 'Type a message...';
  @property({ type: Number }) maxMessages: number = 100;
  /** AI intent to invoke (default: 'chat'). Override for domain-specific intents. */
  @property({ type: String }) intent: string = 'chat';
  /** When true and aiClient.streamIntent exists, uses streaming instead of runIntent */
  @property({ type: Boolean }) useStreaming: boolean = false;
  /** Show mic button for voice input (uses Web Speech API) */
  @property({ type: Boolean }) showVoice: boolean = false;
  /** BCP-47 language for voice recognition */
  @property({ type: String }) voiceLanguage: string = 'en-US';

  @state() private _messages: Message[] = [];
  @state() private _isRecording: boolean = false;
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
  private _recognition: SpeechRecognition | null = null;

  private _genId(): string { return `msg-${++this._msgCounter}`; }

  // ── Voice input ──

  private _getSpeechRecognition(): typeof SpeechRecognition | null {
    if (typeof window === 'undefined') return null;
    return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
  }

  private _toggleVoice() {
    if (this._isRecording) {
      this._stopVoice();
    } else {
      this._startVoice();
    }
  }

  private _startVoice() {
    const Ctor = this._getSpeechRecognition();
    if (!Ctor) return;

    this._stopVoice();
    const recognition = new Ctor();
    recognition.lang = this.voiceLanguage;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      this._isRecording = true;
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      if (final) {
        this._input = (this._input ? this._input + ' ' : '') + final.trim();
      } else if (interim) {
        // Show interim in textarea placeholder feel — append to input temporarily
        const textarea = this.shadowRoot?.querySelector('textarea');
        if (textarea) textarea.placeholder = interim + '...';
      }
    };

    recognition.onend = () => {
      this._isRecording = false;
      this._recognition = null;
      // Restore placeholder
      const textarea = this.shadowRoot?.querySelector('textarea');
      if (textarea) textarea.placeholder = this.placeholder;
    };

    recognition.onerror = () => {
      this._isRecording = false;
      this._recognition = null;
    };

    this._recognition = recognition;
    try {
      recognition.start();
    } catch {
      this._isRecording = false;
    }
  }

  private _stopVoice() {
    if (this._recognition) {
      try { this._recognition.stop(); } catch { /* ignore */ }
      this._recognition = null;
    }
    this._isRecording = false;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._stopVoice();
  }

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

  /** Build conversation history for AI context */
  private _buildHistory(): Array<{ role: string; content: string }> {
    return this._messages.map(m => ({
      role: m.role,
      content: m.versions[m.activeVersion].content,
    }));
  }

  /** Enforce maxMessages limit by trimming oldest messages */
  private _trimMessages() {
    if (this._messages.length > this.maxMessages) {
      this._messages = this._messages.slice(this._messages.length - this.maxMessages);
    }
  }

  /** Add a message programmatically from outside the component */
  addMessage(role: 'user' | 'ai', content: string): string {
    const id = this._genId();
    this._messages = [...this._messages, {
      id,
      role,
      versions: [{ content, timestamp: Date.now() }],
      activeVersion: 0,
    }];
    this._trimMessages();
    this._scrollToBottom();
    return id;
  }

  /** Clear all messages */
  clearMessages() {
    this._messages = [];
    this._followUps = [];
    this._streamingContent = '';
  }

  private async _sendMessage() {
    if (!this._input.trim() || !this.aiClient || this._isStreaming || this._isThinking) return;

    const text = this._input.trim();
    this._input = '';
    this._followUps = [];

    // Reset textarea height after clearing
    const textarea = this.shadowRoot?.querySelector('.input-box textarea') as HTMLTextAreaElement | null;
    if (textarea) { textarea.value = ''; textarea.style.height = 'auto'; }

    this._messages = [...this._messages, {
      id: this._genId(),
      role: 'user',
      versions: [{ content: text, timestamp: Date.now() }],
      activeVersion: 0,
    }];
    this._trimMessages();

    this.dispatchEvent(new CustomEvent('ai-message-sent', {
      bubbles: true, composed: true,
      detail: { message: text, timestamp: Date.now() },
    }));

    await this.updateComplete;
    this._scrollToBottom();
    this._isThinking = true;
    this._abortController = new AbortController();

    const context = {
      dataset: this.chatDataset.length > 0 ? this.chatDataset : [{ info: 'No data provided' }],
      meta: {
        userQuestion: text,
        history: this._buildHistory(),
      },
    };

    try {
      if (this.useStreaming && this.aiClient.streamIntent) {
        await this._sendStreaming(context);
      } else {
        await this._sendNonStreaming(context);
      }
    } catch (err: unknown) {
      if (this._abortController?.signal.aborted) return;
      this._isThinking = false;
      this._isStreaming = false;
      const errMsg = err instanceof Error ? err.message : 'An error occurred';
      this._messages = [...this._messages, {
        id: this._genId(),
        role: 'ai',
        versions: [{ content: errMsg, timestamp: Date.now() }],
        activeVersion: 0,
        isError: true,
      }];
      this._trimMessages();
      this.dispatchEvent(new CustomEvent('ai-error', {
        bubbles: true, composed: true,
        detail: { error: errMsg, timestamp: Date.now() },
      }));
    } finally {
      this._isStreaming = false;
      this._isThinking = false;
      this._abortController = null;
      await this.updateComplete;
      this._scrollToBottom();
    }
  }

  private async _sendNonStreaming(context: Record<string, unknown>) {
    const result = await (this.aiClient as AiClient).runIntent(
      this.intent as any,
      context as any,
      { signal: this._abortController!.signal } as any,
    );

    this._isThinking = false;
    const aiContent = String(
      (result as any)?.explanation
      || (result as any)?.content
      || (result as any)?.text
      || 'Analysis complete.'
    );

    this._messages = [...this._messages, {
      id: this._genId(),
      role: 'ai',
      versions: [{ content: aiContent, timestamp: Date.now() }],
      activeVersion: 0,
    }];
    this._trimMessages();

    this.dispatchEvent(new CustomEvent('ai-response-received', {
      bubbles: true, composed: true,
      detail: { message: aiContent, timestamp: Date.now() },
    }));
  }

  private async _sendStreaming(context: Record<string, unknown>) {
    this._isThinking = false;
    this._isStreaming = true;
    this._streamingContent = '';

    const streamId = 'msg-stream';
    this._messages = [...this._messages, {
      id: streamId,
      role: 'ai',
      versions: [{ content: '', timestamp: Date.now() }],
      activeVersion: 0,
    }];

    const generator = this.aiClient!.streamIntent!(
      this.intent as any,
      context as any,
      { signal: this._abortController!.signal } as any,
    );

    for await (const partial of generator) {
      if (this._abortController?.signal.aborted) break;
      const token = String((partial as any)?.content || (partial as any)?.text || '');
      this._streamingContent += token;

      this._messages = this._messages.map(m =>
        m.id === streamId
          ? { ...m, versions: [{ content: this._streamingContent, timestamp: Date.now() }] }
          : m
      );
      this._scrollToBottom();
    }

    this.completeStream();
  }

  /** Append streaming content to a new or existing AI message (for external streaming control) */
  streamResponse(token: string) {
    this._isStreaming = true;
    this._isThinking = false;
    this._streamingContent += token;

    const streamId = 'msg-stream';
    const hasStream = this._messages.some(m => m.id === streamId);

    if (hasStream) {
      this._messages = this._messages.map(m =>
        m.id === streamId
          ? { ...m, versions: [{ content: this._streamingContent, timestamp: Date.now() }] }
          : m
      );
    } else {
      this._messages = [...this._messages, {
        id: streamId,
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
    const newId = this._genId();

    // Immutable update — replace stream id with permanent id
    this._messages = this._messages.map(m =>
      m.id === 'msg-stream' ? { ...m, id: newId } : m
    );
    this._trimMessages();

    const lastMsg = this._messages[this._messages.length - 1];
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
      // Immutable update — don't mutate the message directly
      this._messages = this._messages.map(m =>
        m.id === msg.id ? { ...m, activeVersion: newIdx } : m
      );
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && !this._isComposing) {
      e.preventDefault();
      this._sendMessage();
    }
  }

  override render() {
    if (!this.aiClient) {
      return html`
        <div class="chat">
          <div class="empty" role="status">
            <cg-icon name="settings" size="lg"></cg-icon>
            <div class="empty-text">Set <code>aiClient</code> to start chatting</div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="chat">
        <div class="wrapper">
          <div class="messages" role="log" aria-live="polite" aria-label="Chat messages" @scroll=${this._handleScroll}>
            ${this._messages.length === 0 && !this._isThinking ? html`
              <div class="empty">
                <cg-icon name="chat" size="lg"></cg-icon>
                <div class="empty-text">${this.welcomeMessage}</div>
              </div>
            ` : this._messages.map(msg => {
              const v = msg.versions[msg.activeVersion];
              return html`
                <div class="msg ${msg.role}" role="article" aria-label="${msg.role === 'user' ? 'Your message' : 'AI response'}">
                  <div class="msg-content">
                    <div class="bubble ${msg.isError ? 'error' : ''}">
                      ${msg.role === 'ai' && !msg.isError
                        ? html`<cg-markdown .text=${v.content}></cg-markdown>`
                        : v.content}
                      ${this._isStreaming && msg.id === 'msg-stream' ? html`<span class="cursor" aria-hidden="true"></span>` : nothing}
                    </div>

                    ${msg.role === 'ai' && this.showActions && !this._isStreaming ? html`
                      <div class="actions">
                        <cg-button variant="tertiary" size="sm"
                          status=${this._copiedId === msg.id ? 'success' : 'idle'}
                          @click=${() => this._handleCopy(msg)}
                          aria-label=${this._copiedId === msg.id ? 'Copied to clipboard' : 'Copy message'}>
                          <cg-icon slot="prefix" name=${this._copiedId === msg.id ? 'check' : 'copy'} size="xs"></cg-icon>
                          ${this._copiedId === msg.id ? 'Copied' : 'Copy'}
                        </cg-button>
                        <cg-button variant="tertiary" size="sm" @click=${() => this._handleRegenerate(msg)} aria-label="Regenerate response">
                          <cg-icon slot="prefix" name="refresh" size="xs"></cg-icon> Retry
                        </cg-button>
                        <cg-button variant="tertiary" size="sm" @click=${() => this._handleRate(msg, 'up')} aria-label="Rate good">
                          <cg-icon name="star" size="xs"></cg-icon>
                        </cg-button>
                        <cg-button variant="tertiary" size="sm" @click=${() => this._handleRate(msg, 'down')} aria-label="Rate bad">
                          <cg-icon name="warning" size="xs"></cg-icon>
                        </cg-button>
                      </div>
                    ` : nothing}

                    ${msg.versions.length > 1 ? html`
                      <nav class="version-nav" aria-label="Message versions">
                        <cg-button variant="tertiary" size="sm" ?disabled=${msg.activeVersion === 0} @click=${() => this._switchVersion(msg, -1)} aria-label="Previous version">
                          <cg-icon name="chevron-left" size="xs"></cg-icon>
                        </cg-button>
                        <span class="version-label">${msg.activeVersion + 1} / ${msg.versions.length}</span>
                        <cg-button variant="tertiary" size="sm" ?disabled=${msg.activeVersion === msg.versions.length - 1} @click=${() => this._switchVersion(msg, 1)} aria-label="Next version">
                          <cg-icon name="chevron-right" size="xs"></cg-icon>
                        </cg-button>
                      </nav>
                    ` : nothing}
                  </div>
                </div>
              `;
            })}

            ${this._isThinking ? html`
              <div class="thinking-area" role="status" aria-label="AI is thinking">
                <ai-thinking text="Analyzing" shimmer delay="0"></ai-thinking>
              </div>
            ` : nothing}
          </div>

          ${this._showScrollBtn ? html`
            <cg-button class="scroll-btn" variant="secondary" size="sm" rounded="full"
              @click=${this._scrollToBottom} aria-label="Scroll to bottom">
              <cg-icon name="arrow-down" size="xs"></cg-icon>
            </cg-button>
          ` : nothing}

          ${(this._isStreaming || this._isThinking) ? html`
            <cg-button class="stop-btn" type="danger" size="sm" @click=${this._handleStop} aria-label="Stop generating">
              <cg-icon slot="prefix" name="close" size="xs"></cg-icon> Stop generating
            </cg-button>
          ` : nothing}

          ${this._followUps.length > 0 && this.showFollowUps ? html`
            <cg-follow-up
              class="follow-ups"
              .items=${this._followUps}
              hideLabel
              variant="chips"
              ?disabled=${this._isStreaming || this._isThinking}
              @cg-follow-up-click=${(e: CustomEvent<{text: string}>) => this._handleFollowUp(e.detail.text)}
            ></cg-follow-up>
          ` : nothing}
        </div>

        <div class="input-area">
          <div class="input-box">
            <textarea
              rows="1"
              placeholder=${this.placeholder}
              .value=${this._input}
              ?disabled=${this._isStreaming || this._isThinking}
              @input=${(e: Event) => {
                const ta = e.target as HTMLTextAreaElement;
                this._input = ta.value;
                ta.style.height = 'auto';
                ta.style.height = ta.scrollHeight + 'px';
              }}
              @keydown=${this._handleKeyDown}
              @compositionstart=${() => this._isComposing = true}
              @compositionend=${() => this._isComposing = false}
              aria-label="Chat message"
            ></textarea>
            ${this.showVoice && this._getSpeechRecognition() ? html`
              <button
                class="icon-btn mic-btn ${this._isRecording ? 'recording' : ''}"
                @click=${this._toggleVoice}
                ?disabled=${this._isStreaming || this._isThinking}
                aria-label="${this._isRecording ? 'Stop voice input' : 'Start voice input'}"
                aria-pressed="${this._isRecording ? 'true' : 'false'}"
              >
                <cg-icon name=${this._isRecording ? 'close' : 'mic'} size="sm"></cg-icon>
              </button>
            ` : nothing}
            <button
              class="icon-btn send-btn"
              @click=${this._sendMessage}
              ?disabled=${this._isStreaming || this._isThinking || !this._input.trim()}
              aria-label="Send message"
            >
              <cg-icon name="arrow-up" size="sm"></cg-icon>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
