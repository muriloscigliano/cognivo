import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface PaymentFormData {
  email: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

@customElement('payment-form')
export class PaymentForm extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .form-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.xl};
      }

      .form-section {
        margin-bottom: ${tokens.spacing.xl};
      }

      .section-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0 0 ${tokens.spacing.md} 0;
      }

      .form-actions {
        display: flex;
        gap: ${tokens.spacing.md};
        margin-top: ${tokens.spacing.xl};
      }

      .submit-button {
        flex: 1;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: ${tokens.color.primaryMain};
        color: white;
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .submit-button:hover:not(:disabled) {
        background: ${tokens.color.primaryDark};
      }

      .submit-button:disabled {
        background: ${tokens.color.gray100};
        cursor: not-allowed;
      }

      .cancel-button {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: white;
        color: ${tokens.color.gray900};
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .cancel-button:hover {
        background: ${tokens.color.gray50};
        border-color: ${tokens.color.gray100};
      }

      .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `
  ];

  @property({ type: Number })
  amount = 0;

  @property({ type: String })
  currency = 'USD';

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  showBillingAddress = false;

  @state()
  private formData: Partial<PaymentFormData> = {};

  @state()
  private formValid = false;

  private handleCardChange(e: CustomEvent) {
    this.formData = {
      ...this.formData,
      cardNumber: e.detail.cardNumber,
      cardholderName: e.detail.cardholderName,
      expiryDate: e.detail.expiryDate,
      cvv: e.detail.cvv
    };
    this.formValid = e.detail.valid && !!this.formData.email;
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.formValid || this.loading) return;

    this.dispatchEvent(new CustomEvent('payment-submit', {
      detail: { formData: this.formData, amount: this.amount, currency: this.currency },
      bubbles: true,
      composed: true
    }));
  }

  private handleCancel() {
    this.dispatchEvent(new CustomEvent('payment-cancel', {
      bubbles: true,
      composed: true
    }));
  }

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  override render() {
    return html`
      <form class="form-container" @submit="${this.handleSubmit}">
        <div class="form-section">
          <h3 class="section-title">Payment Details</h3>
          <credit-card-input
            ?disabled="${this.loading}"
            @card-change="${this.handleCardChange}"
          ></credit-card-input>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="cancel-button"
            @click="${this.handleCancel}"
            ?disabled="${this.loading}"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="submit-button"
            ?disabled="${!this.formValid || this.loading}"
          >
            ${this.loading ? html`
              <span class="loading-spinner"></span>
            ` : html`
              Pay ${this.formatCurrency(this.amount, this.currency)}
            `}
          </button>
        </div>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'payment-form': PaymentForm;
  }
}
