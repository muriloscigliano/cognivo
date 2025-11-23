import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Stat Data Interface
 */
export interface StatData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
  subtitle?: string;
}

/**
 * Stats Widget - Statistics widget showing metrics with trends
 *
 * Features:
 * - Single metric display with trend indicator
 * - Percentage change display
 * - Positive/negative trend styling
 * - Icon support
 * - Comparison period display
 */
@customElement('stats-widget')
export class StatsWidget extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.lg};
        transition: all ${tokens.transition.base};
      }

      :host(:hover) {
        box-shadow: ${tokens.shadow.md};
        transform: translateY(-2px);
      }

      .stat-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }

      .stat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
      }

      .stat-label {
        font-size: ${tokens.font.size.sm};
        color: ${tokens.color.gray600};
        font-weight: ${tokens.font.weight.medium};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .stat-icon {
        font-size: ${tokens.font.size.xl};
        opacity: 0.8;
      }

      .stat-value {
        font-size: ${tokens.font.size.xxxl};
        font-weight: ${tokens.font.weight.bold};
        color: ${tokens.color.gray900};
        line-height: 1.2;
      }

      .stat-subtitle {
        font-size: ${tokens.font.size.xs};
        color: ${tokens.color.gray500};
        margin-top: ${tokens.spacing.xs};
      }

      .stat-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.md};
        padding-top: ${tokens.spacing.sm};
        border-top: 1px solid ${tokens.color.gray200};
      }

      .trend {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.font.size.sm};
        font-weight: ${tokens.font.weight.semibold};
      }

      .trend[data-trend='up'] {
        color: ${tokens.color.success};
      }

      .trend[data-trend='down'] {
        color: ${tokens.color.error};
      }

      .trend[data-trend='neutral'] {
        color: ${tokens.color.gray600};
      }

      .trend-icon {
        font-size: ${tokens.font.size.md};
      }

      .change-label {
        font-size: ${tokens.font.size.xs};
        color: ${tokens.color.gray500};
        font-weight: ${tokens.font.weight.normal};
      }

      /* Variants */
      :host([variant='success']) {
        border-color: ${tokens.color.success};
        background: linear-gradient(135deg, ${tokens.color.grayWhite} 0%, rgba(34, 197, 94, 0.05) 100%);
      }

      :host([variant='warning']) {
        border-color: ${tokens.color.warning};
        background: linear-gradient(135deg, ${tokens.color.grayWhite} 0%, rgba(251, 191, 36, 0.05) 100%);
      }

      :host([variant='error']) {
        border-color: ${tokens.color.error};
        background: linear-gradient(135deg, ${tokens.color.grayWhite} 0%, rgba(239, 68, 68, 0.05) 100%);
      }

      :host([variant='primary']) {
        border-color: ${tokens.color.primary};
        background: linear-gradient(135deg, ${tokens.color.grayWhite} 0%, rgba(99, 102, 241, 0.05) 100%);
      }
    `
  ];

  @property({ type: String })
  label = '';

  @property({ type: String })
  value = '';

  @property({ type: Number })
  change = 0;

  @property({ type: String })
  changeLabel = 'vs last period';

  @property({ type: String })
  trend: 'up' | 'down' | 'neutral' = 'neutral';

  @property({ type: String })
  icon = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String, reflect: true })
  variant: 'default' | 'success' | 'warning' | 'error' | 'primary' = 'default';

  @property({ type: Object })
  data: StatData | null = null;

  private _getTrendIcon(): string {
    if (!this.data && this.trend === 'neutral') {
      if (this.change > 0) return '↑';
      if (this.change < 0) return '↓';
      return '→';
    }

    const activeTrend = this.data?.trend || this.trend;
    switch (activeTrend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  }

  private _getActiveTrend(): 'up' | 'down' | 'neutral' {
    if (this.data?.trend) return this.data.trend;
    if (this.change > 0) return 'up';
    if (this.change < 0) return 'down';
    return 'neutral';
  }

  private _formatChange(change: number): string {
    const absChange = Math.abs(change);
    return `${change > 0 ? '+' : ''}${absChange.toFixed(1)}%`;
  }

  override render() {
    const activeData = this.data || {
      label: this.label,
      value: this.value,
      change: this.change,
      changeLabel: this.changeLabel,
      trend: this.trend,
      icon: this.icon,
      subtitle: this.subtitle
    };

    return html`
      <div class="stat-container">
        <div class="stat-header">
          <div class="stat-label">${activeData.label}</div>
          ${activeData.icon ? html`
            <div class="stat-icon">${activeData.icon}</div>
          ` : ''}
        </div>

        <div class="stat-value">${activeData.value}</div>

        ${activeData.subtitle ? html`
          <div class="stat-subtitle">${activeData.subtitle}</div>
        ` : ''}

        ${activeData.change !== undefined && activeData.change !== 0 ? html`
          <div class="stat-footer">
            <div class="trend" data-trend="${this._getActiveTrend()}">
              <span class="trend-icon">${this._getTrendIcon()}</span>
              <span>${this._formatChange(activeData.change)}</span>
            </div>
            <div class="change-label">${activeData.changeLabel || this.changeLabel}</div>
          </div>
        ` : ''}

        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stats-widget': StatsWidget;
  }
}
