import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ForecastPoint {
  label: string;
  actual?: number;
  predicted: number;
  confidenceLow?: number;
  confidenceHigh?: number;
}

@customElement('ai-forecast-chart')
export class AiForecastChart extends LitElement {
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

      .actual-line {
        fill: none;
        stroke: ${tokens.color.gray900};
        stroke-width: 2;
      }

      .predicted-line {
        fill: none;
        stroke: ${tokens.color.primaryMain};
        stroke-width: 2;
        stroke-dasharray: 5, 5;
      }

      .confidence-area {
        fill: ${tokens.color.primaryMain};
        opacity: 0.15;
      }

      .data-point {
        fill: ${tokens.color.gray900};
      }

      .predicted-point {
        fill: ${tokens.color.primaryMain};
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

      .legend {
        display: flex;
        gap: ${tokens.spacing.md};
        justify-content: center;
        margin-top: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .legend-line {
        width: 20px;
        height: 2px;
      }

      .legend-line.actual {
        background: ${tokens.color.gray900};
      }

      .legend-line.predicted {
        background: ${tokens.color.primaryMain};
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

  @property({ type: Array }) data: ForecastPoint[] = [];
  @property({ type: String }) title = 'Forecast Chart';

  private _getMaxValue(): number {
    const values: number[] = [];
    this.data.forEach(d => {
      if (d.actual !== undefined) values.push(d.actual);
      values.push(d.predicted);
      if (d.confidenceHigh !== undefined) values.push(d.confidenceHigh);
    });
    return Math.max(...values, 0);
  }

  private _getMinValue(): number {
    const values: number[] = [];
    this.data.forEach(d => {
      if (d.actual !== undefined) values.push(d.actual);
      values.push(d.predicted);
      if (d.confidenceLow !== undefined) values.push(d.confidenceLow);
    });
    return Math.min(...values, 0);
  }

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`
        <div class="header">
          <div class="title">${this.title}</div>
          <div class="ai-badge">
            <span>✨</span>
            <span>AI Forecast</span>
          </div>
        </div>
        <div class="empty-state">
          <div class="empty-icon">🔮</div>
          <div>No forecast data available</div>
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

    // Generate paths
    const actualPath = this.data
      .filter(p => p.actual !== undefined)
      .map((point, i) => {
        const x = padding.left + i * xStep;
        const y = padding.top + chartHeight - ((point.actual! - minValue) / valueRange) * chartHeight;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');

    const predictedPath = this.data.map((point, i) => {
      const x = padding.left + i * xStep;
      const y = padding.top + chartHeight - ((point.predicted - minValue) / valueRange) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return html`
      <div class="header">
        <div class="title">${this.title}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI Forecast</span>
        </div>
      </div>

      <div class="chart-container">
        ${svg`
          <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
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

            <!-- Actual line -->
            ${actualPath ? svg`<path class="actual-line" d="${actualPath}" />` : ''}

            <!-- Predicted line -->
            <path class="predicted-line" d="${predictedPath}" />

            <!-- Data points and labels -->
            ${this.data.map((point, i) => {
              const x = padding.left + i * xStep;
              const yPredicted = padding.top + chartHeight - ((point.predicted - minValue) / valueRange) * chartHeight;
              const yActual = point.actual !== undefined
                ? padding.top + chartHeight - ((point.actual - minValue) / valueRange) * chartHeight
                : null;

              return svg`
                ${yActual !== null ? svg`<circle class="data-point" cx="${x}" cy="${yActual}" r="4" />` : ''}
                <circle class="predicted-point" cx="${x}" cy="${yPredicted}" r="4" />
                <text class="label" x="${x}" y="${padding.top + chartHeight + 20}" text-anchor="middle">
                  ${point.label}
                </text>
              `;
            })}
          </svg>
        `}

        <div class="legend">
          <div class="legend-item">
            <div class="legend-line actual"></div>
            <span>Actual</span>
          </div>
          <div class="legend-item">
            <div class="legend-line predicted"></div>
            <span>Predicted</span>
          </div>
        </div>
      </div>

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-forecast-chart': AiForecastChart;
  }
}
