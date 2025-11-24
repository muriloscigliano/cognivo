import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface QuickReply {
  id: string;
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

@customElement('quick-replies')
export class QuickReplies extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .quick-replies-container {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm} 0;
      }

      .quick-reply-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        white-space: nowrap;
      }

      .quick-reply-chip:hover:not(.disabled) {
        background: ${tokens.color.aiBackground};
        border-color: ${tokens.color.aiAccent};
        color: ${tokens.color.aiAccent};
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .quick-reply-chip:active:not(.disabled) {
        transform: translateY(0);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      }

      .quick-reply-chip.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .chip-icon {
        font-size: ${tokens.fontSize.base};
        display: flex;
        align-items: center;
      }

      .chip-label {
        user-select: none;
      }

      /* Compact variant */
      :host([compact]) .quick-reply-chip {
        padding: 6px ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
      }

      /* Outlined variant */
      :host([variant='outlined']) .quick-reply-chip {
        border-width: 2px;
      }

      /* Filled variant */
      :host([variant='filled']) .quick-reply-chip {
        background: ${tokens.color.gray50};
        border-color: transparent;
      }

      :host([variant='filled']) .quick-reply-chip:hover:not(.disabled) {
        background: ${tokens.color.aiAccent};
        color: white;
        border-color: transparent;
      }

      /* Color variants */
      :host([color='primary']) .quick-reply-chip:hover:not(.disabled) {
        background: ${tokens.color.aiBackground};
        border-color: ${tokens.color.aiAccent};
        color: ${tokens.color.aiAccent};
      }

      :host([color='success']) .quick-reply-chip:hover:not(.disabled) {
        background: rgba(34, 197, 94, 0.1);
        border-color: ${tokens.color.success};
        color: ${tokens.color.success};
      }

      /* Slide in animation */
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      :host([animated]) .quick-reply-chip {
        animation: slideInUp 0.3s ease-out;
        animation-fill-mode: both;
      }

      :host([animated]) .quick-reply-chip:nth-child(1) {
        animation-delay: 0s;
      }

      :host([animated]) .quick-reply-chip:nth-child(2) {
        animation-delay: 0.05s;
      }

      :host([animated]) .quick-reply-chip:nth-child(3) {
        animation-delay: 0.1s;
      }

      :host([animated]) .quick-reply-chip:nth-child(4) {
        animation-delay: 0.15s;
      }

      :host([animated]) .quick-reply-chip:nth-child(5) {
        animation-delay: 0.2s;
      }

      .title {
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: ${tokens.spacing.xs};
      }
    `
  ];

  @property({ type: Array })
  replies: QuickReply[] = [];

  @property({ type: String })
  override title = '';

  @property({ type: String, reflect: true })
  variant: 'default' | 'outlined' | 'filled' = 'default';

  @property({ type: String, reflect: true })
  color: 'primary' | 'success' = 'primary';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: Boolean, reflect: true })
  animated = false;

  private handleReplyClick(reply: QuickReply) {
    if (reply.disabled) return;

    this.dispatchEvent(new CustomEvent('reply-select', {
      detail: reply,
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      ${this.title ? html`<div class="title">${this.title}</div>` : ''}
      <div class="quick-replies-container">
        ${this.replies.map(reply => html`
          <button
            class="quick-reply-chip ${reply.disabled ? 'disabled' : ''}"
            @click=${() => this.handleReplyClick(reply)}
            ?disabled=${reply.disabled}
          >
            ${reply.icon ? html`<span class="chip-icon">${reply.icon}</span>` : ''}
            <span class="chip-label">${reply.label}</span>
          </button>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quick-replies': QuickReplies;
  }
}
