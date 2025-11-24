import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface TrendPoint {
  label: string;
  value: number;
}

@customElement('ai-trend-chart')
export class AiTrendChart extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 300px;
        padding: ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.md};
      }

      .chart-container {
        width: 100%;
        height: 100%;
        position: relative;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.sm};
      }

      .title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: 2px ${tokens.spacing.xs};
        background: linear-gradient(135deg, ${tokens.color.primaryMain} 0%, ${tokens.color.primaryDark} 100%);
        color: white;
        border-radius: ${tokens.radius.full};
        font-size: 10px;
        font-weight: ${tokens.fontWeight.medium};
      }

      svg {
        width: 100%;
        height: calc(100% - 40px);
      }

      .trend-line {
        fill: none;
        stroke: ${tokens.color.primaryMain};
        stroke-width: 2;
        stroke-linejoin: round;
      }

      .trend-area {
        fill: url(#trendGradient);
        opacity: 0.3;
      }

      .data-point {
        fill: ${tokens.color.primaryMain};
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .data-point:hover {
        fill: ${tokens.color.primaryDark};
        r: 6;
      }

      .grid-line {
        stroke: ${tokens.color.gray100};
        stroke-width: 1;
        stroke-dasharray: 2, 2;
      }

      .axis-line {
        stroke: ${tokens.color.gray100};
        stroke-width: 1;
      }

      .label {
        font-family: ${tokens.fontFamily.primary};
        font-size: 11px;
        fill: ${tokens.color.gray500};
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: ${tokens.color.gray500};
      }

      .empty-icon {
        font-size: ${tokens.fontSize['3xl']};
        margin-bottom: ${tokens.spacing.sm};
      }
    `
  ];

  @property({ type: Array }) data: TrendPoint[] = [];
  @property({ type: String }) override title = 'Trend Chart';

  private _getMaxValue(): number {
    return Math.max(...this.data.map(d => d.value), 0);
  }

  private _getMinValue(): number {
    return Math.min(...this.data.map(d => d.value), 0);
  }

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`
        <div class="header">
          <div class="title">${this.title}</div>
          <div class="ai-badge">
            <span>✨</span>
            <span>AI</span>
          </div>
        </div>
        <div class="empty-state">
          <div class="empty-icon">📈</div>
          <div>No trend data available</div>
        </div>
        <slot></slot>
      `;
    }

    const padding = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600;
    const height = 250;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxValue = this._getMaxValue();
    const minValue = this._getMinValue();
    const valueRange = maxValue - minValue || 1;

    const xStep = chartWidth / (this.data.length - 1 || 1);

    // Generate path for line
    const linePath = this.data.map((point, i) => {
      const x = padding.left + i * xStep;
      const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Generate path for area
    const areaPath = linePath +
      ` L ${padding.left + (this.data.length - 1) * xStep} ${padding.top + chartHeight}` +
      ` L ${padding.left} ${padding.top + chartHeight} Z`;

    return html`
      <div class="header">
        <div class="title">${this.title}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      <div class="chart-container">
        ${svg`
          <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:${tokens.color.primaryMain};stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:${tokens.color.primaryMain};stop-opacity:0.1" />
              </linearGradient>
            </defs>

            <!-- Grid lines -->
            ${[0, 0.25, 0.5, 0.75, 1].map(tick => {
              const y = padding.top + chartHeight - tick * chartHeight;
              const value = minValue + tick * valueRange;
              return svg`
                <line class="grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" />
                <text class="label" x="${padding.left - 10}" y="${y + 4}" text-anchor="end">
                  ${Math.round(value)}
                </text>
              `;
            })}

            <!-- Axes -->
            <line class="axis-line" x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + chartHeight}" />
            <line class="axis-line" x1="${padding.left}" y1="${padding.top + chartHeight}" x2="${width - padding.right}" y2="${padding.top + chartHeight}" />

            <!-- Area -->
            <path class="trend-area" d="${areaPath}" />

            <!-- Line -->
            <path class="trend-line" d="${linePath}" />

            <!-- Data points -->
            ${this.data.map((point, i) => {
              const x = padding.left + i * xStep;
              const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
              return svg`
                <circle class="data-point" cx="${x}" cy="${y}" r="4" />
                <text class="label" x="${x}" y="${padding.top + chartHeight + 20}" text-anchor="middle">
                  ${point.label}
                </text>
              `;
            })}
          </svg>
        `}
      </div>

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-trend-chart': AiTrendChart;
  }
}
