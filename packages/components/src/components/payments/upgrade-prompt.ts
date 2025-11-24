import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('upgrade-prompt')
export class UpgradePrompt extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .prompt-container {
        background: linear-gradient(135deg, ${tokens.color.primary} 0%, ${tokens.color.primaryDark} 100%);
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.xl};
        color: white;
        position: relative;
        overflow: hidden;
      }

      .prompt-container::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        pointer-events: none;
      }

      .content {
        position: relative;
        z-index: 1;
      }

      .prompt-icon {
        font-size: 48px;
        margin-bottom: ${tokens.spacing.md};
      }

      .prompt-title {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        margin: 0 0 ${tokens.spacing.sm} 0;
      }

      .prompt-description {
        font-size: ${tokens.fontSize.base};
        opacity: 0.9;
        margin: 0 0 ${tokens.spacing.md} 0;
        line-height: 1.5;
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin: 0 0 ${tokens.spacing.lg} 0;
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .feature-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
      }

      .feature-icon {
        font-weight: bold;
      }

      .cta-button {
        width: 100%;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: white;
        color: ${tokens.color.primary};
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.bold};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .cta-button:hover {
        background: rgba(255, 255, 255, 0.9);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .dismiss-button {
        position: absolute;
        top: ${tokens.spacing.md};
        right: ${tokens.spacing.md};
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all ${tokens.transition.fast};
        z-index: 2;
      }

      .dismiss-button:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `
  ];

  @property({ type: String })
  title = 'Upgrade to Premium';

  @property({ type: String })
  description = 'Unlock all premium features and take your experience to the next level';

  @property({ type: Array })
  features: string[] = [];

  @property({ type: String })
  ctaText = 'Upgrade Now';

  @property({ type: Boolean })
  dismissible = true;

  private handleUpgrade() {
    this.dispatchEvent(new CustomEvent('upgrade-click', {
      bubbles: true,
      composed: true
    }));
  }

  private handleDismiss() {
    this.dispatchEvent(new CustomEvent('prompt-dismiss', {
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="prompt-container">
        ${this.dismissible ? html`
          <button class="dismiss-button" @click="${this.handleDismiss}" aria-label="Dismiss">
            ✕
          </button>
        ` : ''}

        <div class="content">
          <div class="prompt-icon">⭐</div>
          <h3 class="prompt-title">${this.title}</h3>
          <p class="prompt-description">${this.description}</p>

          ${this.features.length > 0 ? html`
            <ul class="features-list">
              ${this.features.map(feature => html`
                <li class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span>${feature}</span>
                </li>
              `)}
            </ul>
          ` : ''}

          <button class="cta-button" @click="${this.handleUpgrade}">
            ${this.ctaText}
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'upgrade-prompt': UpgradePrompt;
  }
}
