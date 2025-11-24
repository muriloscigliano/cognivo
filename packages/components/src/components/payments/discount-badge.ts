import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('discount-badge')
export class DiscountBadge extends LitElement {
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
        padding: 4px ${tokens.spacing.sm};
        background: rgba(34, 197, 94, 0.1);
        color: ${tokens.color.success};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.bold};
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .badge-icon {
        font-size: 14px;
      }
    `
  ];

  @property({ type: String })
  label = '';

  @property({ type: Number })
  amount = 0;

  @property({ type: Number })
  percentage = 0;

  @property({ type: String })
  currency = 'USD';

  @property({ type: Boolean })
  showIcon = true;

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  private getLabel(): string {
    if (this.label) return this.label;

    if (this.percentage > 0) {
      return `Save ${this.percentage}%`;
    }

    if (this.amount > 0) {
      return `Save ${this.formatCurrency(this.amount, this.currency)}`;
    }

    return 'Discount';
  }

  override render() {
    return html`
      <div class="badge">
        ${this.showIcon ? html`
          <span class="badge-icon">🏷️</span>
        ` : ''}
        <span>${this.getLabel()}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'discount-badge': DiscountBadge;
  }
}
