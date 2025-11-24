import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('trial-banner')
export class TrialBanner extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .banner {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-radius: ${tokens.radius.lg};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.md};
        position: relative;
        overflow: hidden;
      }

      .banner::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
        animation: shimmer 3s infinite;
      }

      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      .content {
        flex: 1;
        z-index: 1;
      }

      .banner-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        margin: 0 0 4px 0;
      }

      .banner-message {
        font-size: ${tokens.fontSize.sm};
        opacity: 0.9;
        margin: 0;
      }

      .days-remaining {
        font-weight: ${tokens.fontWeight.bold};
        color: #fbbf24;
      }

      .actions {
        display: flex;
        gap: ${tokens.spacing.sm};
        z-index: 1;
      }

      .upgrade-button {
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
        background: white;
        color: #667eea;
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.bold};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        white-space: nowrap;
      }

      .upgrade-button:hover {
        background: rgba(255, 255, 255, 0.9);
        transform: scale(1.05);
      }

      .dismiss-button {
        padding: ${tokens.spacing.sm};
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .dismiss-button:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      @media (max-width: 640px) {
        .banner {
          flex-direction: column;
          text-align: center;
        }

        .actions {
          width: 100%;
          flex-direction: column;
        }

        .upgrade-button {
          width: 100%;
        }
      }
    `
  ];

  @property({ type: Number })
  daysRemaining = 7;

  @property({ type: String })
  override title: string = 'Free Trial Active';

  @property({ type: String })
  message = '';

  @property({ type: Boolean })
  dismissible = true;

  @property({ type: Boolean })
  showUpgradeButton = true;

  private handleUpgrade() {
    this.dispatchEvent(new CustomEvent('upgrade-click', {
      bubbles: true,
      composed: true
    }));
  }

  private handleDismiss() {
    this.dispatchEvent(new CustomEvent('banner-dismiss', {
      bubbles: true,
      composed: true
    }));
  }

  private getMessage(): string {
    if (this.message) return this.message;

    if (this.daysRemaining === 0) {
      return 'Your trial ends today. Upgrade now to keep access.';
    } else if (this.daysRemaining === 1) {
      return 'Your trial ends tomorrow. Upgrade to continue.';
    } else {
      return `You have <span class="days-remaining">${this.daysRemaining} days</span> left in your free trial.`;
    }
  }

  override render() {
    return html`
      <div class="banner">
        <div class="content">
          <h3 class="banner-title">${this.title}</h3>
          <p class="banner-message" .innerHTML="${this.getMessage()}"></p>
        </div>

        <div class="actions">
          ${this.showUpgradeButton ? html`
            <button class="upgrade-button" @click="${this.handleUpgrade}">
              Upgrade Now
            </button>
          ` : ''}

          ${this.dismissible ? html`
            <button class="dismiss-button" @click="${this.handleDismiss}" aria-label="Dismiss">
              ✕
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'trial-banner': TrialBanner;
  }
}
