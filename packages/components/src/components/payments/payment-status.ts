import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export type PaymentStatusType = 'success' | 'pending' | 'failed' | 'processing' | 'refunded' | 'cancelled';

@customElement('payment-status')
export class PaymentStatus extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
        font-family: ${tokens.fontFamily.primary};
      }

      .status {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: 4px ${tokens.spacing.md};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        white-space: nowrap;
      }

      .status.success {
        background: rgba(34, 197, 94, 0.1);
        color: ${tokens.color.success};
      }

      .status.pending {
        background: rgba(251, 191, 36, 0.1);
        color: #f59e0b;
      }

      .status.failed {
        background: rgba(239, 68, 68, 0.1);
        color: ${tokens.color.error};
      }

      .status.processing {
        background: rgba(59, 130, 246, 0.1);
        color: ${tokens.color.primary};
      }

      .status.refunded {
        background: rgba(168, 85, 247, 0.1);
        color: #a855f7;
      }

      .status.cancelled {
        background: rgba(107, 114, 128, 0.1);
        color: ${tokens.color.gray500};
      }

      .icon {
        font-size: 16px;
        line-height: 1;
      }

      .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .label {
        text-transform: capitalize;
      }
    `
  ];

  @property({ type: String })
  status: PaymentStatusType = 'pending';

  @property({ type: String })
  label = '';

  @property({ type: Boolean })
  showIcon = true;

  private getIcon(status: PaymentStatusType): string {
    const icons: Record<PaymentStatusType, string> = {
      success: '✓',
      pending: '⏱',
      failed: '✕',
      processing: '',
      refunded: '↩',
      cancelled: '✕'
    };
    return icons[status];
  }

  private getLabel(status: PaymentStatusType): string {
    if (this.label) return this.label;

    const labels: Record<PaymentStatusType, string> = {
      success: 'Paid',
      pending: 'Pending',
      failed: 'Failed',
      processing: 'Processing',
      refunded: 'Refunded',
      cancelled: 'Cancelled'
    };
    return labels[status];
  }

  override render() {
    return html`
      <div class="status ${this.status}">
        ${this.showIcon ? html`
          ${this.status === 'processing' ? html`
            <span class="spinner"></span>
          ` : html`
            <span class="icon">${this.getIcon(this.status)}</span>
          `}
        ` : ''}
        <span class="label">${this.getLabel(this.status)}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'payment-status': PaymentStatus;
  }
}
