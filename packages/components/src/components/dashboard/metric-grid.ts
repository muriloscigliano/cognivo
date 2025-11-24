import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Metric Card Data
 */
export interface MetricCardData {
  id?: string;
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
  color?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

/**
 * Metric Grid - Grid of metric cards
 *
 * Features:
 * - Responsive grid layout
 * - Individual metric cards
 * - Status indicators
 * - Trend visualization
 * - Customizable columns
 */
@customElement('metric-grid')
export class MetricGrid extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.md};
      }

      .metric-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: ${tokens.spacing.lg};
      }

      :host([columns='1']) .metric-grid {
        grid-template-columns: 1fr;
      }

      :host([columns='2']) .metric-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      :host([columns='3']) .metric-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      :host([columns='4']) .metric-grid {
        grid-template-columns: repeat(4, 1fr);
      }

      @media (max-width: 1024px) {
        .metric-grid {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
      }

      @media (max-width: 768px) {
        .metric-grid {
          grid-template-columns: 1fr;
        }
      }

      .metric-card {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        transition: all ${tokens.transition.base};
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }

      .metric-card:hover {
        box-shadow: ${tokens.shadow.md};
        transform: translateY(-2px);
        border-color: ${tokens.color.gray100};
      }

      .metric-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--metric-color, ${tokens.color.primaryMain});
      }

      .metric-card[data-status='success']::before {
        background: ${tokens.color.success};
      }

      .metric-card[data-status='warning']::before {
        background: ${tokens.color.warning};
      }

      .metric-card[data-status='error']::before {
        background: ${tokens.color.danger};
      }

      .metric-card[data-status='info']::before {
        background: ${tokens.color.info};
      }

      .card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
      }

      .card-title-area {
        flex: 1;
        min-width: 0;
      }

      .card-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin: 0;
      }

      .card-description {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        margin-top: ${tokens.spacing.xxs};
      }

      .card-icon {
        font-size: ${tokens.fontSize.xl};
        opacity: 0.7;
        flex-shrink: 0;
      }

      .card-value {
        font-size: ${tokens.fontSize['3xl']};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        line-height: 1.2;
      }

      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
        padding-top: ${tokens.spacing.sm};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .trend-indicator {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .trend-indicator[data-trend='up'] {
        color: ${tokens.color.success};
      }

      .trend-indicator[data-trend='down'] {
        color: ${tokens.color.danger};
      }

      .trend-indicator[data-trend='neutral'] {
        color: ${tokens.color.gray500};
      }

      .empty-state {
        grid-column: 1 / -1;
        padding: ${tokens.spacing.xxl};
        text-align: center;
        color: ${tokens.color.gray500};
      }
    `
  ];

  @property({ type: Array })
  metrics: MetricCardData[] = [];

  @property({ type: Number, reflect: true })
  columns: 1 | 2 | 3 | 4 | undefined = undefined;

  private _getTrendIcon(trend?: 'up' | 'down' | 'neutral'): string {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  }

  private _formatChange(change: number): string {
    const absChange = Math.abs(change);
    return `${change > 0 ? '+' : ''}${absChange.toFixed(1)}%`;
  }

  private _getTrend(change?: number): 'up' | 'down' | 'neutral' {
    if (change === undefined) return 'neutral';
    if (change > 0) return 'up';
    if (change < 0) return 'down';
    return 'neutral';
  }

  private _handleCardClick(metric: MetricCardData) {
    this.dispatchEvent(new CustomEvent('metric-click', {
      bubbles: true,
      composed: true,
      detail: { metric }
    }));
  }

  override render() {
    if (this.metrics.length === 0) {
      return html`
        <div class="metric-grid">
          <div class="empty-state">
            No metrics available
          </div>
        </div>
      `;
    }

    return html`
      <div class="metric-grid">
        ${this.metrics.map(metric => html`
          <div
            class="metric-card"
            data-status="${metric.status || 'info'}"
            style="${metric.color ? `--metric-color: ${metric.color}` : ''}"
            @click=${() => this._handleCardClick(metric)}
          >
            <div class="card-header">
              <div class="card-title-area">
                <h3 class="card-title">${metric.title}</h3>
                ${metric.description ? html`
                  <div class="card-description">${metric.description}</div>
                ` : ''}
              </div>
              ${metric.icon ? html`
                <div class="card-icon">${metric.icon}</div>
              ` : ''}
            </div>

            <div class="card-value">${metric.value}</div>

            ${metric.change !== undefined ? html`
              <div class="card-footer">
                <div class="trend-indicator" data-trend="${metric.trend || this._getTrend(metric.change)}">
                  <span>${this._getTrendIcon(metric.trend || this._getTrend(metric.change))}</span>
                  <span>${this._formatChange(metric.change)}</span>
                </div>
              </div>
            ` : ''}
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'metric-grid': MetricGrid;
  }
}
