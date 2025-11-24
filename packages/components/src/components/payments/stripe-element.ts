import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('stripe-element')
export class StripeElement extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .stripe-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.lg};
      }

      .stripe-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0 0 ${tokens.spacing.md} 0;
      }

      .stripe-element-wrapper {
        padding: ${tokens.spacing.md};
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        background: white;
        min-height: 40px;
        transition: all ${tokens.transition.fast};
      }

      .stripe-element-wrapper:focus-within {
        border-color: ${tokens.color.primary};
        box-shadow: 0 0 0 3px rgba(0, 100, 255, 0.1);
      }

      .stripe-element-wrapper.error {
        border-color: ${tokens.color.error};
      }

      .error-message {
        margin-top: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.error};
      }

      .security-note {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        margin-top: ${tokens.spacing.md};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .security-icon {
        color: ${tokens.color.success};
      }

      .powered-by {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${tokens.spacing.xs};
        margin-top: ${tokens.spacing.md};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray400};
      }

      .stripe-logo {
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.primary};
      }
    `
  ];

  @property({ type: String })
  elementType: 'card' | 'cardNumber' | 'cardExpiry' | 'cardCvc' = 'card';

  @property({ type: String })
  errorMessage = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  title = 'Payment Details';

  @property({ type: Boolean })
  showSecurityNote = true;

  @property({ type: Boolean })
  showPoweredBy = true;

  override render() {
    const hasError = !!this.errorMessage;

    return html`
      <div class="stripe-container">
        ${this.title ? html`
          <h3 class="stripe-title">${this.title}</h3>
        ` : ''}

        <div class="stripe-element-wrapper ${hasError ? 'error' : ''}">
          <slot></slot>
        </div>

        ${hasError ? html`
          <div class="error-message">${this.errorMessage}</div>
        ` : ''}

        ${this.showSecurityNote ? html`
          <div class="security-note">
            <span class="security-icon">🔒</span>
            <span>Your payment information is securely processed by Stripe</span>
          </div>
        ` : ''}

        ${this.showPoweredBy ? html`
          <div class="powered-by">
            <span>Powered by</span>
            <span class="stripe-logo">Stripe</span>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stripe-element': StripeElement;
  }
}
