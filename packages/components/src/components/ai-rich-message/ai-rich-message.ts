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
import { hostBlock, reducedMotion } from '../../styles/index.js';

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
  static override styles = [hostBlock, reducedMotion, css`

    .message {
      display: flex;
      gap: 12px;
      max-width: 100%;
    }
    .message.user { flex-direction: row-reverse; }

    /* ── Avatar ── */
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      flex-shrink: 0;
      overflow: hidden;
    }
    .avatar.assistant {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #09090b;
    }
    .avatar.user {
      background: var(--cg-gray-700, #3f3f46);
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .avatar.system {
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-gray-400, #a1a1aa);
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
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .message.assistant .bubble-body {
      background: var(--cg-color-surface-cards-background, #18181b);
      border: 1px solid var(--cg-color-surface-cards-border, #27272a);
    }
    .message.user .bubble-body {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #09090b;
      border-radius: 12px 12px 4px 12px;
    }
    .message.system .bubble-body {
      background: var(--cg-gray-900, #09090b);
      border: 1px dashed var(--cg-gray-700, #3f3f46);
      font-size: 13px;
      color: var(--cg-gray-400, #a1a1aa);
      font-style: italic;
    }

    /* ── Text ── */
    .text {
      white-space: pre-wrap;
      word-break: break-word;
    }
    .text p { margin: 0 0 8px; }
    .text p:last-child { margin-bottom: 0; }
    .text code {
      background: rgba(255, 255, 255, 0.08);
      padding: 1px 5px;
      border-radius: 4px;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-size: 13px;
    }
    .message.user .text code {
      background: rgba(0, 0, 0, 0.1);
    }

    /* ── Cards section ── */
    .cards {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 10px;
    }

    /* ── Action buttons ── */
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }
    .action-btn {
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      cursor: pointer;
      transition: all 150ms ease;
    }
    .action-btn:hover {
      background: var(--cg-gray-700, #3f3f46);
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    /* ── Timestamp ── */
    .timestamp {
      font-size: 11px;
      color: var(--cg-gray-500, #71717a);
      margin-top: 6px;
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
            const el = document.createElement(card.type);
            (el as Record<string, unknown>)['data'] = card.data;
            (el as Record<string, unknown>)['toolData'] = card.data;
            el.addEventListener('ai-tool-card-action', ((e: CustomEvent) => {
              this._dispatch('ai-message-card-action', {
                cardIndex: idx, action: e.detail?.action, data: e.detail?.data,
              });
            }) as EventListener, { signal });
            return el;
          } catch {
            return html`<div style="padding:8px;font-size:12px;color:var(--cg-gray-500,#71717a);">Card unavailable</div>`;
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
