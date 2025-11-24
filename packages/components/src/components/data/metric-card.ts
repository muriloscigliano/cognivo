import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('metric-card')
export class MetricCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.lg};
        transition: all ${tokens.transition.default};
      }

      :host(:hover) {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      .metric-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: ${tokens.spacing.md};
      }

      .metric-title {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        font-weight: ${tokens.fontWeight.medium};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .metric-icon {
        width: 36px;
        height: 36px;
        border-radius: ${tokens.radius.md};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${tokens.fontSize.lg};
      }

      .metric-value {
        font-size: ${tokens.fontSize['2xl']};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.sm};
      }

      .metric-footer {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
      }

      .metric-change {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border-radius: ${tokens.radius.sm};
        font-weight: ${tokens.fontWeight.medium};
      }

      .metric-change.positive {
        color: ${tokens.color.success};
        background: rgba(76, 175, 80, 0.1);
      }

      .metric-change.negative {
        color: ${tokens.color.danger};
        background: rgba(244, 67, 54, 0.1);
      }

      .metric-change.neutral {
        color: ${tokens.color.gray500};
        background: ${tokens.color.gray100};
      }

      .metric-label {
        color: ${tokens.color.gray500};
      }

      .metric-chart {
        margin-top: ${tokens.spacing.md};
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }

      :host([variant='primary']) .metric-icon {
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryMain};
      }

      :host([variant='success']) .metric-icon {
        background: rgba(76, 175, 80, 0.1);
        color: ${tokens.color.success};
      }

      :host([variant='warning']) .metric-icon {
        background: rgba(255, 193, 7, 0.1);
        color: ${tokens.color.warning};
      }

      :host([variant='danger']) .metric-icon {
        background: rgba(244, 67, 54, 0.1);
        color: ${tokens.color.danger};
      }
    `,
  ];

  @property({ type: String }) title = '';
  @property({ type: String }) value = '';
  @property({ type: Number }) change = 0;
  @property({ type: String }) changeLabel = 'vs last period';
  @property({ type: String }) icon = '';
  @property({ type: String }) variant: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

  private _getChangeDirection(): 'positive' | 'negative' | 'neutral' {
    if (this.change > 0) return 'positive';
    if (this.change < 0) return 'negative';
    return 'neutral';
  }

  override render() {
    const direction = this._getChangeDirection();

    return html`
      <div class="metric-header">
        <div class="metric-title">${this.title}</div>
        ${this.icon ? html`<div class="metric-icon">${this.icon}</div>` : ''}
      </div>
      <div class="metric-value">${this.value}</div>
      <div class="metric-footer">
        ${this.change !== 0
          ? html`
              <div class="metric-change ${direction}">
                <span>${direction === 'positive' ? '↑' : direction === 'negative' ? '↓' : '→'}</span>
                <span>${Math.abs(this.change)}%</span>
              </div>
            `
          : ''}
        <div class="metric-label">${this.changeLabel}</div>
      </div>
      <div class="metric-chart">
        <slot name="chart"></slot>
      </div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'metric-card': MetricCard;
  }
}
