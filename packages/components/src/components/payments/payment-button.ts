import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('payment-button')
export class PaymentButton extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .button {
        width: 100%;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: ${tokens.color.primaryMain};
        color: white;
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${tokens.spacing.sm};
        position: relative;
        overflow: hidden;
      }

      .button:hover:not(:disabled) {
        background: ${tokens.color.primaryDark};
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 100, 255, 0.3);
      }

      .button:active:not(:disabled) {
        transform: translateY(0);
      }

      .button:disabled {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray500};
        cursor: not-allowed;
        transform: none;
      }

      .button.success {
        background: ${tokens.color.success};
      }

      .button.error {
        background: ${tokens.color.danger};
      }

      .button.secondary {
        background: white;
        color: ${tokens.color.primaryMain};
        border: 2px solid ${tokens.color.primaryMain};
      }

      .button.secondary:hover:not(:disabled) {
        background: ${tokens.color.gray50};
      }

      .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .button-content {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .icon {
        font-size: ${tokens.fontSize.lg};
      }

      .amount {
        font-weight: ${tokens.fontWeight.bold};
      }

      .secure-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: ${tokens.fontSize.xs};
        opacity: 0.9;
      }
    `
  ];

  @property({ type: String })
  label = 'Pay Now';

  @property({ type: Number })
  amount = 0;

  @property({ type: String })
  currency = 'USD';

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  variant: 'primary' | 'secondary' | 'success' | 'error' = 'primary';

  @property({ type: Boolean })
  showSecureBadge = true;

  @property({ type: Boolean })
  showAmount = true;

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  private handleClick() {
    if (this.loading || this.disabled) return;

    this.dispatchEvent(new CustomEvent('payment-click', {
      detail: { amount: this.amount, currency: this.currency },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    const classes = ['button', this.variant].filter(Boolean).join(' ');

    return html`
      <button
        class="${classes}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this.handleClick}"
      >
        ${this.loading ? html`
          <span class="loading-spinner"></span>
          <span>Processing...</span>
        ` : html`
          <div class="button-content">
            ${this.showSecureBadge ? html`
              <span class="icon">🔒</span>
            ` : ''}
            <span>
              ${this.label}
              ${this.showAmount && this.amount > 0 ? html`
                <span class="amount"> ${this.formatCurrency(this.amount, this.currency)}</span>
              ` : ''}
            </span>
          </div>
        `}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'payment-button': PaymentButton;
  }
}
