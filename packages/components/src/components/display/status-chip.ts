import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('status-chip')
export class StatusChip extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        line-height: 1;
      }

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: ${tokens.radius.full};
        flex-shrink: 0;
      }

      :host([status='active']) {
        background: rgba(76, 175, 80, 0.1);
        color: ${tokens.color.success};
      }

      :host([status='active']) .status-dot {
        background: ${tokens.color.success};
      }

      :host([status='inactive']) {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray500};
      }

      :host([status='inactive']) .status-dot {
        background: ${tokens.color.gray500};
      }

      :host([status='pending']) {
        background: rgba(255, 193, 7, 0.1);
        color: ${tokens.color.warning};
      }

      :host([status='pending']) .status-dot {
        background: ${tokens.color.warning};
      }

      :host([status='error']) {
        background: rgba(244, 67, 54, 0.1);
        color: ${tokens.color.danger};
      }

      :host([status='error']) .status-dot {
        background: ${tokens.color.danger};
      }

      :host([status='processing']) .status-dot {
        animation: pulse 1.5s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `,
  ];

  @property({ type: String, reflect: true }) status: 'active' | 'inactive' | 'pending' | 'error' | 'processing' = 'active';
  @property({ type: Boolean, attribute: 'show-dot' }) showDot = true;

  override render() {
    return html`
      ${this.showDot ? html`<span class="status-dot"></span>` : ''}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'status-chip': StatusChip;
  }
}
