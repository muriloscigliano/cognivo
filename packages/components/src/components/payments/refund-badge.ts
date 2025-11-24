import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export type RefundStatus = 'pending' | 'approved' | 'rejected' | 'completed';

@customElement('refund-badge')
export class RefundBadge extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
        font-family: ${tokens.fontFamily.primary};
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: 4px ${tokens.spacing.md};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        white-space: nowrap;
      }

      .badge.pending {
        background: rgba(251, 191, 36, 0.1);
        color: #f59e0b;
      }

      .badge.approved {
        background: rgba(34, 197, 94, 0.1);
        color: ${tokens.color.success};
      }

      .badge.rejected {
        background: rgba(239, 68, 68, 0.1);
        color: ${tokens.color.error};
      }

      .badge.completed {
        background: rgba(168, 85, 247, 0.1);
        color: #a855f7;
      }

      .badge-icon {
        font-size: 16px;
      }
    `
  ];

  @property({ type: String })
  status: RefundStatus = 'pending';

  @property({ type: String })
  label = '';

  @property({ type: Boolean })
  showIcon = true;

  private getIcon(status: RefundStatus): string {
    const icons: Record<RefundStatus, string> = {
      pending: '⏱',
      approved: '✓',
      rejected: '✕',
      completed: '↩'
    };
    return icons[status];
  }

  private getLabel(status: RefundStatus): string {
    if (this.label) return this.label;

    const labels: Record<RefundStatus, string> = {
      pending: 'Refund Pending',
      approved: 'Refund Approved',
      rejected: 'Refund Rejected',
      completed: 'Refunded'
    };
    return labels[status];
  }

  override render() {
    return html`
      <div class="badge ${this.status}">
        ${this.showIcon ? html`
          <span class="badge-icon">${this.getIcon(this.status)}</span>
        ` : ''}
        <span>${this.getLabel(this.status)}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'refund-badge': RefundBadge;
  }
}
