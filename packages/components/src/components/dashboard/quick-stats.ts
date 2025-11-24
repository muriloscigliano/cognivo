import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * KPI Data Interface
 */
export interface KPIData {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
  color?: string;
}

/**
 * Quick Stats - Quick stats overview with multiple KPIs
 *
 * Features:
 * - Multiple KPI display in compact format
 * - Grid layout with responsive columns
 * - Trend indicators
 * - Color coding
 * - Icon support
 */
@customElement('quick-stats')
export class QuickStats extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 0;
      }

      :host([columns='2']) .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      :host([columns='3']) .stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      :host([columns='4']) .stats-grid {
        grid-template-columns: repeat(4, 1fr);
      }

      @media (max-width: 768px) {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 480px) {
        .stats-grid {
          grid-template-columns: 1fr;
        }
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.lg};
        border-right: 1px solid ${tokens.color.gray100};
        border-bottom: 1px solid ${tokens.color.gray100};
        transition: all ${tokens.transition.fast};
        position: relative;
        overflow: hidden;
      }

      .stat-item:hover {
        background: ${tokens.color.gray50};
      }

      .stat-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background: var(--stat-color, ${tokens.color.primaryMain});
        opacity: 0;
        transition: opacity ${tokens.transition.fast};
      }

      .stat-item:hover::before {
        opacity: 1;
      }

      .stat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.xs};
      }

      .stat-label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        font-weight: ${tokens.fontWeight.medium};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .stat-icon {
        font-size: ${tokens.fontSize.md};
        opacity: 0.6;
      }

      .stat-value {
        font-size: ${tokens.fontSize['2xl']};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        line-height: 1.2;
      }

      .stat-change {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xxs};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .stat-change[data-trend='up'] {
        color: ${tokens.color.success};
      }

      .stat-change[data-trend='down'] {
        color: ${tokens.color.danger};
      }

      .stat-change[data-trend='neutral'] {
        color: ${tokens.color.gray500};
      }

      .empty-state {
        padding: ${tokens.spacing.xxl};
        text-align: center;
        color: ${tokens.color.gray500};
      }
    `
  ];

  @property({ type: Array })
  stats: KPIData[] = [];

  @property({ type: Number, reflect: true })
  columns: 2 | 3 | 4 | undefined = undefined;

  private _getTrendIcon(trend?: 'up' | 'down' | 'neutral'): string {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
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

  override render() {
    if (this.stats.length === 0) {
      return html`
        <div class="empty-state">
          No statistics available
        </div>
      `;
    }

    return html`
      <div class="stats-grid">
        ${this.stats.map(stat => html`
          <div
            class="stat-item"
            style="${stat.color ? `--stat-color: ${stat.color}` : ''}"
          >
            <div class="stat-header">
              <div class="stat-label">${stat.label}</div>
              ${stat.icon ? html`
                <div class="stat-icon">${stat.icon}</div>
              ` : ''}
            </div>

            <div class="stat-value">${stat.value}</div>

            ${stat.change !== undefined ? html`
              <div class="stat-change" data-trend="${stat.trend || this._getTrend(stat.change)}">
                <span>${this._getTrendIcon(stat.trend || this._getTrend(stat.change))}</span>
                <span>${this._formatChange(stat.change)}</span>
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
    'quick-stats': QuickStats;
  }
}
