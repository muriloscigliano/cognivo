import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * KPI Card Component
 *
 * Displays KPI with trend indicator and sparkline
 *
 * @element kpi-card
 *
 * @attr {string} title - KPI title
 * @attr {string} value - Current value
 * @attr {string} change - Change percentage (e.g., "+12.5")
 * @attr {string} trend - Trend direction: 'up' | 'down' | 'neutral'
 * @attr {string} period - Time period (e.g., "vs last month")
 *
 * @example
 * ```html
 * <kpi-card
 *   title="Revenue"
 *   value="$45,231"
 *   change="+12.5%"
 *   trend="up"
 *   period="vs last month"
 * ></kpi-card>
 * ```
 */
@customElement('kpi-card')
export class KpiCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.lg};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all ${tokens.transition.default};
      }

      :host(:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .title {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .value {
        font-family: ${tokens.fontFamily.display};
        font-size: ${tokens.fontSize['3xl']};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0;
        line-height: 1;
      }

      .metrics {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        margin-top: ${tokens.spacing.xs};
      }

      .change {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border-radius: ${tokens.radius.sm};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .change.trend-up {
        background: rgba(56, 161, 81, 0.1);
        color: ${tokens.color.success};
      }

      .change.trend-down {
        background: rgba(244, 47, 47, 0.1);
        color: ${tokens.color.danger};
      }

      .change.trend-neutral {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray500};
      }

      .arrow {
        font-size: 12px;
        line-height: 1;
      }

      .period {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      ::slotted(*) {
        margin-top: ${tokens.spacing.md};
      }
    `,
  ];

  @property({ type: String })
  override title = '';

  @property({ type: String })
  value = '';

  @property({ type: String })
  change = '';

  @property({ type: String })
  trend: 'up' | 'down' | 'neutral' = 'neutral';

  @property({ type: String })
  period = '';

  private getTrendIcon(): string {
    switch (this.trend) {
      case 'up':
        return '▲';
      case 'down':
        return '▼';
      default:
        return '—';
    }
  }

  override render() {
    return html`
      <div class="container">
        ${this.title ? html`<div class="title">${this.title}</div>` : null}

        ${this.value ? html`<div class="value">${this.value}</div>` : null}

        ${this.change || this.period ? html`
          <div class="metrics">
            ${this.change ? html`
              <span class="change trend-${this.trend}">
                <span class="arrow">${this.getTrendIcon()}</span>
                <span>${this.change}</span>
              </span>
            ` : null}
            ${this.period ? html`<span class="period">${this.period}</span>` : null}
          </div>
        ` : null}

        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kpi-card': KpiCard;
  }
}
