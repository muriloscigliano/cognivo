import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('recurring-badge')
export class RecurringBadge extends LitElement {
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
        background: rgba(59, 130, 246, 0.1);
        color: ${tokens.color.primary};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        white-space: nowrap;
      }

      .badge-icon {
        font-size: 14px;
        animation: rotate 2s linear infinite;
      }

      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .badge.paused {
        background: rgba(107, 114, 128, 0.1);
        color: ${tokens.color.gray500};
      }

      .badge.paused .badge-icon {
        animation: none;
      }
    `
  ];

  @property({ type: String })
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly';

  @property({ type: Boolean })
  active = true;

  @property({ type: Boolean })
  showIcon = true;

  @property({ type: String })
  nextDate = '';

  private getLabel(): string {
    if (!this.active) {
      return 'Subscription Paused';
    }

    const labels: Record<string, string> = {
      daily: 'Renews Daily',
      weekly: 'Renews Weekly',
      monthly: 'Renews Monthly',
      yearly: 'Renews Yearly'
    };

    let label = labels[this.interval] || 'Recurring';

    if (this.nextDate) {
      const date = new Date(this.nextDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      label += ` (${date})`;
    }

    return label;
  }

  override render() {
    const classes = ['badge', !this.active ? 'paused' : ''].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        ${this.showIcon ? html`
          <span class="badge-icon">🔄</span>
        ` : ''}
        <span>${this.getLabel()}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'recurring-badge': RecurringBadge;
  }
}
