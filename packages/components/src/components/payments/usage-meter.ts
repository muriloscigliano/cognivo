import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('usage-meter')
export class UsageMeter extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .meter-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.lg};
      }

      .meter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${tokens.spacing.sm};
      }

      .meter-label {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .meter-value {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
      }

      .meter-bar {
        width: 100%;
        height: 12px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        overflow: hidden;
        position: relative;
      }

      .meter-fill {
        height: 100%;
        background: ${tokens.color.primaryMain};
        border-radius: ${tokens.radius.full};
        transition: width ${tokens.transition.default}, background ${tokens.transition.default};
      }

      .meter-fill.warning {
        background: #f59e0b;
      }

      .meter-fill.danger {
        background: ${tokens.color.danger};
      }

      .meter-footer {
        display: flex;
        justify-content: space-between;
        margin-top: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .upgrade-prompt {
        margin-top: ${tokens.spacing.md};
        padding: ${tokens.spacing.sm};
        background: rgba(239, 68, 68, 0.1);
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.danger};
        text-align: center;
      }

      .upgrade-link {
        color: ${tokens.color.primaryMain};
        text-decoration: underline;
        cursor: pointer;
        font-weight: ${tokens.fontWeight.medium};
      }
    `
  ];

  @property({ type: Number })
  current = 0;

  @property({ type: Number })
  limit = 100;

  @property({ type: String })
  label = 'Usage';

  @property({ type: String })
  unit = 'units';

  @property({ type: Number })
  warningThreshold = 80;

  @property({ type: Number })
  dangerThreshold = 95;

  @property({ type: Boolean })
  showUpgradePrompt = true;

  private getPercentage(): number {
    return Math.min((this.current / this.limit) * 100, 100);
  }

  private getStatus(): 'normal' | 'warning' | 'danger' {
    const percentage = this.getPercentage();
    if (percentage >= this.dangerThreshold) return 'danger';
    if (percentage >= this.warningThreshold) return 'warning';
    return 'normal';
  }

  private handleUpgradeClick() {
    this.dispatchEvent(new CustomEvent('upgrade-click', {
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    const percentage = this.getPercentage();
    const status = this.getStatus();
    const isOverLimit = this.current >= this.limit;

    return html`
      <div class="meter-container">
        <div class="meter-header">
          <span class="meter-label">${this.label}</span>
          <span class="meter-value">
            ${this.current.toLocaleString()} / ${this.limit.toLocaleString()} ${this.unit}
          </span>
        </div>

        <div class="meter-bar">
          <div class="meter-fill ${status}" style="width: ${percentage}%"></div>
        </div>

        <div class="meter-footer">
          <span>${percentage.toFixed(0)}% used</span>
          <span>${(this.limit - this.current).toLocaleString()} ${this.unit} remaining</span>
        </div>

        ${isOverLimit && this.showUpgradePrompt ? html`
          <div class="upgrade-prompt">
            You've reached your limit.
            <span class="upgrade-link" @click="${this.handleUpgradeClick}">
              Upgrade now
            </span>
            to get more ${this.unit}.
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'usage-meter': UsageMeter;
  }
}
