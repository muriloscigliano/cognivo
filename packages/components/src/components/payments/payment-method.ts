import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface PaymentMethodData {
  id: string;
  type: 'card' | 'bank' | 'paypal' | 'apple_pay' | 'google_pay';
  brand?: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  holderName?: string;
  isDefault?: boolean;
}

@customElement('payment-method')
export class PaymentMethod extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .method-container {
        background: white;
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.md};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        transition: all ${tokens.transition.fast};
        cursor: pointer;
      }

      .method-container:hover {
        border-color: ${tokens.color.primary};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .method-container.selected {
        border-color: ${tokens.color.primary};
        background: rgba(0, 100, 255, 0.05);
      }

      .method-icon {
        width: 48px;
        height: 48px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        flex-shrink: 0;
      }

      .method-info {
        flex: 1;
        min-width: 0;
      }

      .method-primary {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        margin-bottom: 4px;
      }

      .method-brand {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        text-transform: capitalize;
      }

      .default-badge {
        display: inline-block;
        padding: 2px ${tokens.spacing.xs};
        background: ${tokens.color.primary};
        color: white;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .method-details {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .expiry {
        margin-top: 2px;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray400};
      }

      .method-actions {
        display: flex;
        gap: ${tokens.spacing.xs};
      }

      .action-button {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: white;
        color: ${tokens.color.gray700};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .action-button:hover {
        background: ${tokens.color.gray50};
        border-color: ${tokens.color.gray300};
      }

      .delete-button {
        color: ${tokens.color.error};
      }
    `
  ];

  @property({ type: Object })
  method: PaymentMethodData = {
    id: '',
    type: 'card',
    last4: '',
    brand: 'visa'
  };

  @property({ type: Boolean })
  selected = false;

  @property({ type: Boolean })
  showActions = true;

  private getMethodIcon(method: PaymentMethodData): string {
    if (method.type === 'card') {
      const brandIcons: Record<string, string> = {
        visa: '💳',
        mastercard: '💳',
        amex: '💳',
        discover: '💳'
      };
      return brandIcons[method.brand || 'visa'];
    }

    const typeIcons: Record<string, string> = {
      bank: '🏦',
      paypal: 'P',
      apple_pay: '',
      google_pay: 'G'
    };
    return typeIcons[method.type] || '💳';
  }

  private getMethodLabel(method: PaymentMethodData): string {
    if (method.type === 'card' && method.brand) {
      return method.brand.charAt(0).toUpperCase() + method.brand.slice(1);
    }

    const typeLabels: Record<string, string> = {
      card: 'Card',
      bank: 'Bank Account',
      paypal: 'PayPal',
      apple_pay: 'Apple Pay',
      google_pay: 'Google Pay'
    };
    return typeLabels[method.type] || 'Payment Method';
  }

  private handleClick() {
    this.dispatchEvent(new CustomEvent('method-select', {
      detail: { method: this.method },
      bubbles: true,
      composed: true
    }));
  }

  private handleEdit(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('method-edit', {
      detail: { method: this.method },
      bubbles: true,
      composed: true
    }));
  }

  private handleDelete(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('method-delete', {
      detail: { method: this.method },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    const classes = ['method-container', this.selected ? 'selected' : ''].filter(Boolean).join(' ');

    return html`
      <div class="${classes}" @click="${this.handleClick}">
        <div class="method-icon">
          ${this.getMethodIcon(this.method)}
        </div>

        <div class="method-info">
          <div class="method-primary">
            <span class="method-brand">${this.getMethodLabel(this.method)}</span>
            ${this.method.isDefault ? html`
              <span class="default-badge">Default</span>
            ` : ''}
          </div>
          <div class="method-details">
            ${this.method.type === 'card' ? `•••• ${this.method.last4}` : this.method.holderName || `•••• ${this.method.last4}`}
          </div>
          ${this.method.expiryMonth && this.method.expiryYear ? html`
            <div class="expiry">
              Expires ${String(this.method.expiryMonth).padStart(2, '0')}/${String(this.method.expiryYear).slice(-2)}
            </div>
          ` : ''}
        </div>

        ${this.showActions ? html`
          <div class="method-actions">
            <button class="action-button" @click="${this.handleEdit}">
              Edit
            </button>
            <button class="action-button delete-button" @click="${this.handleDelete}">
              Remove
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'payment-method': PaymentMethod;
  }
}
