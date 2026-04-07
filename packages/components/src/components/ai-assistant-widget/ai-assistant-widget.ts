/**
 * @element ai-assistant-widget
 * Floating embedded chat widget with FAB trigger, expandable chat panel, and message list.
 *
 * @example
 * ```html
 * <ai-assistant-widget
 *   title="AI Help"
 *   welcomeMessage="How can I help you today?"
 *   .messages=${[{role:'ai',content:'Hello!'}]}
 * ></ai-assistant-widget>
 * ```
 *
 * @fires {CustomEvent} ai-assistant-open - Widget expanded
 * @fires {CustomEvent} ai-assistant-close - Widget collapsed
 * @fires {CustomEvent<{message: string}>} ai-assistant-send - Message sent
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - FAB and send button accent
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes, scaleInKeyframes } from '../../styles/index.js';

export interface AssistantMessage {
  role: 'user' | 'ai';
  content: string;
}

@customElement('ai-assistant-widget')
export class AiAssistantWidget extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, scaleInKeyframes, css`
    :host {
      display: block;
      position: fixed;
      z-index: 9999;
    }
    :host([hidden]) { display: none; }
    :host([position="bottom-right"]), :host(:not([position])) {
      bottom: var(--cg-spacing-24);
      right: var(--cg-spacing-24);
    }
    :host([position="bottom-left"]) {
      bottom: var(--cg-spacing-24);
      left: var(--cg-spacing-24);
    }

    /* ── FAB ── */
    .fab {
      width: var(--cg-spacing-56);
      height: var(--cg-spacing-56);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-cards-background);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-xl);
      transition: transform var(--cg-motion-duration-fast) var(--cg-motion-easing-color), filter var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
      box-shadow: none;
    }
    .fab:hover {
      filter: brightness(0.9);
      transform: scale(1.05);
    }
    .fab:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .fab.open {
      transform: rotate(45deg);
    }
    .fab.open:hover {
      transform: rotate(45deg) scale(1.05);
    }

    /* ── Panel ── */
    .panel {
      position: absolute;
      bottom: var(--cg-spacing-64);
      width: var(360px);
      height: var(480px);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-200);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: scaleIn 200ms var(--cg-motion-easing-enter) both;
    }

    :host([position="bottom-right"]) .panel,
    :host(:not([position])) .panel {
      right: 0;
    }
    :host([position="bottom-left"]) .panel {
      left: 0;
    }

    /* ── Header ── */
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      flex-shrink: 0;
    }

    .panel-title {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    .close-btn {
      background: transparent;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      font-size: var(--cg-font-size-lg);
      padding: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-50);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .close-btn:hover {
      color: var(--cg-color-surface-base-text);
    }
    .close-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    /* ── Messages ── */
    .messages {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-16);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-12);
    }

    .welcome {
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
      padding: var(--cg-spacing-20) 0;
    }

    .msg {
      max-width: 85%;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-150);
      font-size: var(--cg-font-size-sm);
      line-height: 1.5;
      word-break: break-word;
    }

    .msg.user {
      align-self: flex-end;
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-modal-container-background);
      border-bottom-right-radius: var(--cg-border-radius-50);
    }

    .msg.ai {
      align-self: flex-start;
      background: var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
      border-bottom-left-radius: var(--cg-border-radius-50);
    }

    /* ── Input ── */
    .input-area {
      display: flex;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-top: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      flex-shrink: 0;
    }

    .input-field {
      flex: 1;
      background: var(--cg-color-surface-cards-border);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-family: inherit;
      outline: none;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .input-field::placeholder {
      color: var(--cg-color-input-text-placeholder);
    }
    .input-field:focus {
      border-color: var(--cg-color-surface-base-text);
    }

    .send-btn {
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      border-radius: var(--cg-border-radius-150);
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-modal-container-background);
      border: none;
      cursor: pointer;
      font-size: var(--cg-font-size-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: filter var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .send-btn:hover { filter: brightness(0.9); }
    .send-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .send-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    @media (prefers-reduced-motion: reduce) {
      .panel { animation: none !important; }
      .fab { transition: none !important; }
    }
  `];

  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: String, reflect: true }) position: 'bottom-right' | 'bottom-left' = 'bottom-right';
  @property({ type: String }) welcomeMessage = 'How can I help you?';
  @property({ type: String }) title = 'Assistant';
  @property({ attribute: false }) messages: AssistantMessage[] = [];

  @state() private _inputValue = '';
  @query('.messages') private _messagesEl!: HTMLElement;
  @query('.input-field') private _inputEl!: HTMLInputElement;

  private _toggle() {
    this.expanded = !this.expanded;
    const eventName = this.expanded ? 'ai-assistant-open' : 'ai-assistant-close';
    this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true }));
    if (this.expanded) {
      this.updateComplete.then(() => {
        this._inputEl?.focus();
        this._scrollToBottom();
      });
    }
  }

  private _close() {
    this.expanded = false;
    this.dispatchEvent(new CustomEvent('ai-assistant-close', { bubbles: true, composed: true }));
  }

  private _send() {
    const msg = this._inputValue.trim();
    if (!msg) return;
    this.dispatchEvent(new CustomEvent('ai-assistant-send', {
      detail: { message: msg },
      bubbles: true, composed: true,
    }));
    this._inputValue = '';
    this.updateComplete.then(() => this._scrollToBottom());
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this._send();
    }
    if (e.key === 'Escape') {
      this._close();
    }
  }

  private _scrollToBottom() {
    if (this._messagesEl) {
      this._messagesEl.scrollTop = this._messagesEl.scrollHeight;
    }
  }

  override render() {
    return html`
      ${this.expanded ? html`
        <div class="panel" role="dialog" aria-label="${this.title}">
          <div class="panel-header">
            <span class="panel-title">${this.title}</span>
            <button class="close-btn" @click=${this._close} aria-label="Close assistant">&#10005;</button>
          </div>

          <div class="messages" role="log" aria-live="polite">
            ${this.messages.length === 0 && this.welcomeMessage ? html`
              <div class="welcome">${this.welcomeMessage}</div>
            ` : nothing}
            ${this.messages.map(m => html`
              <div class="msg ${m.role}" aria-label="${m.role === 'user' ? 'You' : 'Assistant'}">${m.content}</div>
            `)}
          </div>

          <div class="input-area">
            <input
              class="input-field"
              type="text"
              placeholder="Type a message..."
              .value=${this._inputValue}
              @input=${(e: Event) => { this._inputValue = (e.target as HTMLInputElement).value; }}
              @keydown=${this._onKeydown}
              aria-label="Message input"
            />
            <button
              class="send-btn"
              @click=${this._send}
              ?disabled=${!this._inputValue.trim()}
              aria-label="Send message"
            >&#10148;</button>
          </div>
        </div>
      ` : nothing}

      <button
        class="fab ${this.expanded ? 'open' : ''}"
        @click=${this._toggle}
        aria-label="${this.expanded ? 'Close assistant' : 'Open assistant'}"
        aria-expanded=${this.expanded}
      >${this.expanded ? '+' : '\u{1F4AC}'}</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-assistant-widget': AiAssistantWidget;
  }
}
