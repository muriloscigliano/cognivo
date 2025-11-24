import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ComparisonItem {
  label: string;
  value: number;
  previousValue?: number;
  unit?: string;
}

@customElement('comparison-card')
export class ComparisonCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.lg};
      }

      .header {
        margin-bottom: ${tokens.spacing.lg};
      }

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.xs};
      }

      .subtitle {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .comparison-list {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }

      .comparison-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.sm};
      }

      .item-label {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        font-weight: ${tokens.fontWeight.medium};
      }

      .item-values {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
      }

      .item-value {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .item-change {
        font-size: ${tokens.fontSize.sm};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border-radius: ${tokens.radius.sm};
      }

      .item-change.positive {
        color: ${tokens.color.success};
        background: rgba(76, 175, 80, 0.1);
      }

      .item-change.negative {
        color: ${tokens.color.danger};
        background: rgba(244, 67, 54, 0.1);
      }

      .item-change.neutral {
        color: ${tokens.color.gray500};
        background: ${tokens.color.gray100};
      }
    `,
  ];

  @property({ type: String }) title = '';
  @property({ type: String }) subtitle = '';
  @property({ type: Array }) data: ComparisonItem[] = [];

  private _calculateChange(current: number, previous?: number): { percent: number; direction: 'positive' | 'negative' | 'neutral' } {
    if (!previous || previous === 0) return { percent: 0, direction: 'neutral' };

    const change = ((current - previous) / previous) * 100;
    return {
      percent: Math.abs(change),
      direction: change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral',
    };
  }

  override render() {
    return html`
      <div class="header">
        ${this.title ? html`<div class="title">${this.title}</div>` : ''}
        ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : ''}
        <slot name="header"></slot>
      </div>
      <div class="comparison-list">
        ${this.data.map((item) => {
          const change = this._calculateChange(item.value, item.previousValue);
          return html`
            <div class="comparison-item">
              <div class="item-label">${item.label}</div>
              <div class="item-values">
                <div class="item-value">
                  ${item.value}${item.unit ? ` ${item.unit}` : ''}
                </div>
                ${item.previousValue !== undefined
                  ? html`
                      <div class="item-change ${change.direction}">
                        ${change.direction === 'positive' ? '↑' : change.direction === 'negative' ? '↓' : '→'}
                        ${change.percent.toFixed(1)}%
                      </div>
                    `
                  : ''}
              </div>
            </div>
          `;
        })}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comparison-card': ComparisonCard;
  }
}
