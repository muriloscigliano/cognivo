import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export type WalletType = 'apple_pay' | 'google_pay' | 'paypal';

@customElement('wallet-button')
export class WalletButton extends LitElement {
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
      }

      .button:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .button:active:not(:disabled) {
        transform: translateY(0);
      }

      .button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .button.apple_pay {
        background: #000;
        color: white;
      }

      .button.google_pay {
        background: #fff;
        color: #3c4043;
        border: 1px solid #dadce0;
      }

      .button.paypal {
        background: #0070ba;
        color: white;
      }

      .logo {
        height: 20px;
        font-weight: ${tokens.fontWeight.bold};
      }

      .apple-logo {
        font-size: 24px;
      }

      .divider {
        margin: ${tokens.spacing.md} 0;
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
      }

      .divider::before,
      .divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: ${tokens.color.gray100};
      }
    `
  ];

  @property({ type: String })
  type: WalletType = 'apple_pay';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  showDivider = false;

  @property({ type: String })
  dividerText = 'or';

  private getButtonContent() {
    const contents = {
      apple_pay: html`
        <span class="apple-logo"></span>
        <span>Pay</span>
      `,
      google_pay: html`
        <span class="logo">G</span>
        <span>Pay</span>
      `,
      paypal: html`
        <span class="logo">PayPal</span>
      `
    };

    return contents[this.type];
  }

  private handleClick() {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('wallet-click', {
      detail: { type: this.type },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      ${this.showDivider ? html`
        <div class="divider">${this.dividerText}</div>
      ` : ''}

      <button
        class="button ${this.type}"
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
      >
        ${this.getButtonContent()}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wallet-button': WalletButton;
  }
}
