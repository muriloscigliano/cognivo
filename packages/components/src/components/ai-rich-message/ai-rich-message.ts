/**
 * @element ai-rich-message
 * Chat message bubble supporting user, assistant, and system roles.
 * Renders avatar, text with paragraph splitting, embedded tool cards,
 * action buttons, and timestamp. User messages get accent styling.
 *
 * @example
 * ```html
 * <ai-rich-message
 *   role="assistant"
 *   text="Here are the results of my analysis."
 *   timestamp="2:34 PM"
 *   .actions=${[{ label: 'Regenerate', id: 'regen' }]}
 * ></ai-rich-message>
 * ```
 *
 * @prop {'user'|'assistant'|'system'} role - Message sender role
 * @prop {string} text - Message text content
 * @prop {string} avatar - Avatar image URL (falls back to initials)
 * @prop {string} timestamp - Display timestamp
 * @prop {CardRef[]} cards - Embedded tool card components to render
 * @prop {ActionRef[]} actions - Action buttons shown below the message
 *
 * @fires {CustomEvent<{actionId: string}>} ai-message-action - When an action button is clicked
 * @fires {CustomEvent<{cardIndex: number}>} ai-message-card-action - When a card emits an action
 *
 * @slot - Additional content inside the message bubble
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface CardRef {
  type: string;
  data: unknown;
}

interface ActionRef {
  label: string;
  id: string;
}

@customElement('ai-rich-message')
export class AiRichMessage extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }

    .message {
      display: flex;
      gap: var(--cg-spacing-12);
      max-width: 100%;
    }
    .message.user { flex-direction: row-reverse; }

    /* ── Avatar ── */
    .avatar {
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-bold);
      flex-shrink: 0;
      overflow: hidden;
    }
    .avatar.assistant {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-base-background);
    }
    .avatar.user {
      background: var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
    }
    .avatar.system {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-input-text-placeholder);
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ── Bubble ── */
    .bubble {
      flex: 1;
      min-width: 0;
      max-width: 80%;
    }
    .message.user .bubble { max-width: 70%; }

    .bubble-body {
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      font-size: var(--cg-font-size-sm);
      line-height: 1.6;
      color: var(--cg-color-surface-base-text);
    }
    .message.assistant .bubble-body {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .message.user .bubble-body {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-base-background);
      border-radius: var(--cg-border-radius-150) var(--cg-border-radius-150) var(--cg-border-radius-50) var(--cg-border-radius-150);
    }
    .message.system .bubble-body {
      background: var(--cg-color-surface-base-background);
      border: 1px dashed var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      font-style: italic;
    }

    /* ── Text ── */
    .text {
      white-space: pre-wrap;
      word-break: break-word;
    }
    .text p { margin: 0 0 var(--cg-spacing-8); }
    .text p:last-child { margin-bottom: 0; }
    .text code {
      background: var(--cg-overlay-dark-medium);
      padding: var(--cg-spacing-1) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-50);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-sm);
    }
    .message.user .text code {
      background: var(--cg-overlay-dark-subtle);
    }

    /* ── Cards section ── */
    .cards {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-8);
    }

    /* ── Action buttons ── */
    .actions {
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-6);
      margin-top: var(--cg-spacing-8);
    }
    .action-btn {
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      cursor: pointer;
      transition: background-color var(--cg-motion-duration-normal) var(--cg-motion-easing-color), color var(--cg-motion-duration-normal) var(--cg-motion-easing-color), border-color var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
    }
    .action-btn:hover {
      background: var(--cg-color-surface-cards-border);
      border-color: var(--cg-color-surface-base-text);
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    /* ── Timestamp ── */
    .timestamp {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-6);
    }
    .message.user .timestamp { text-align: right; }

  `];

  @property({ type: String }) override role: 'user' | 'assistant' | 'system' = 'assistant';
  @property({ type: String }) text = '';
  @property({ attribute: false }) cards: CardRef[] = [];
  @property({ type: String }) avatar = '';
  @property({ type: String }) timestamp = '';
  @property({ attribute: false }) actions: ActionRef[] = [];

  private _dispatch(name: string, detail: unknown) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
  }

  private _handleAction(actionId: string) {
    this._dispatch('ai-message-action', { actionId });
  }

  private _avatarFallback(): string {
    if (this.role === 'assistant') return 'AI';
    if (this.role === 'user') return 'U';
    return 'S';
  }

  private _renderAvatar() {
    return html`
      <div class="avatar ${this.role}" aria-hidden="true">
        ${this.avatar
          ? html`<img src=${this.avatar} alt="${this.role} avatar">`
          : this._avatarFallback()}
      </div>
    `;
  }

  private _renderText() {
    if (!this.text) return nothing;
    // Simple paragraph splitting (no innerHTML — safe text rendering)
    const paragraphs = this.text.split('\n\n').filter(Boolean);
    return html`
      <div class="text">
        ${paragraphs.map(p => html`<p>${p}</p>`)}
      </div>
    `;
  }

  private _cardAbort?: AbortController;

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cardAbort?.abort();
  }

  /** Allowlist of known component tag names that can be created as cards. */
  private static _allowedCardTypes = new Set([
    'ai-tool-card', 'ai-chart-card', 'ai-code-card', 'ai-data-card',
    'ai-file-card', 'ai-image-card', 'ai-link-card', 'ai-map-card',
    'ai-search-card', 'ai-weather-card', 'ai-progress-card',
    'ai-summary-card', 'ai-table-card', 'ai-metric-card',
  ]);

  private _isValidCardType(type: string): boolean {
    // Must be a valid custom element name (contains hyphen) and be in the allowlist
    return typeof type === 'string'
      && type.includes('-')
      && AiRichMessage._allowedCardTypes.has(type);
  }

  private _renderCards() {
    if (this.cards.length === 0) return nothing;
    // Clean up previous card listeners
    this._cardAbort?.abort();
    this._cardAbort = new AbortController();
    const signal = this._cardAbort.signal;

    return html`
      <div class="cards">
        ${this.cards.map((card, idx) => {
          try {
            if (!this._isValidCardType(card.type)) {
              console.warn(`[ai-rich-message] Blocked unknown card type: "${card.type}"`);
              return html`<div style="padding:8px;font-size:12px;color:var(--cg-color-input-text-placeholder,#71717a);">Card unavailable</div>`;
            }
            const el = document.createElement(card.type);
            (el as unknown as Record<string, unknown>)['data'] = card.data;
            (el as unknown as Record<string, unknown>)['toolData'] = card.data;
            el.addEventListener('ai-tool-card-action', ((e: CustomEvent) => {
              this._dispatch('ai-message-card-action', {
                cardIndex: idx, action: e.detail?.action, data: e.detail?.data,
              });
            }) as EventListener, { signal });
            return el;
          } catch {
            return html`<div style="padding:8px;font-size:12px;color:var(--cg-color-input-text-placeholder,#71717a);">Card unavailable</div>`;
          }
        })}
      </div>
    `;
  }

  private _renderActions() {
    if (this.actions.length === 0) return nothing;
    return html`
      <div class="actions" role="group" aria-label="Message actions">
        ${this.actions.map(a => html`
          <button
            class="action-btn"
            @click=${() => this._handleAction(a.id)}
            aria-label="${a.label}"
          >${a.label}</button>
        `)}
      </div>
    `;
  }

  override render() {
    return html`
      <div
        class="message ${this.role}"
        role="article"
        aria-label="${this.role} message"
        tabindex="0"
      >
        ${this._renderAvatar()}
        <div class="bubble">
          <div class="bubble-body">
            ${this._renderText()}
            <slot></slot>
          </div>
          ${this._renderCards()}
          ${this._renderActions()}
          ${this.timestamp ? html`<div class="timestamp">${this.timestamp}</div>` : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-rich-message': AiRichMessage;
  }
}
