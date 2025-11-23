import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface LineChartData {
  label: string;
  value: number;
}

export interface LineChartSeries {
  name: string;
  data: LineChartData[];
  color?: string;
}

/**
 * Line Chart Component
 *
 * Displays data as line chart with smooth curves and animations
 *
 * @element line-chart
 *
 * @attr {Array} series - Array of data series
 * @attr {boolean} smooth - Use smooth curves
 * @attr {boolean} show-points - Display data points
 * @attr {boolean} show-grid - Display grid lines
 * @attr {boolean} fill-area - Fill area under line
 *
 * @example
 * ```html
 * <line-chart
 *   .series="${[{name: 'Sales', data: [{label: 'Jan', value: 100}]}]}"
 *   smooth
 *   show-points
 * ></line-chart>
 * ```
 */
@customElement('line-chart')
export class LineChart extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 300px;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.md};
        box-sizing: border-box;
      }

      .chart-container {
        width: 100%;
        height: 100%;
        position: relative;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      .line-path {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: stroke-dashoffset ${tokens.transition.slow} ease-in-out;
      }

      .line-area {
        opacity: 0.1;
        transition: opacity ${tokens.transition.default};
      }

      .data-point {
        transition: all ${tokens.transition.default} ease-in-out;
        cursor: pointer;
      }

      .data-point:hover {
        r: 6;
      }

      .label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        fill: ${tokens.color.gray900};
        user-select: none;
      }

      .grid-line {
        stroke: ${tokens.color.gray100};
        stroke-width: 1;
        stroke-dasharray: 2, 2;
      }

      .axis-line {
        stroke: ${tokens.color.gray500};
        stroke-width: 1;
      }

      .legend {
        display: flex;
        gap: ${tokens.spacing.md};
        margin-bottom: ${tokens.spacing.sm};
        flex-wrap: wrap;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
      }

      .legend-color {
        width: 16px;
        height: 3px;
        border-radius: 2px;
      }

      .no-data {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: ${tokens.color.gray500};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
      }

      @keyframes drawLine {
        from {
          stroke-dashoffset: 1000;
        }
        to {
          stroke-dashoffset: 0;
        }
      }

      .line-path {
        stroke-dasharray: 1000;
        animation: drawLine 1s ease-in-out forwards;
      }
    `,
  ];

  @property({ type: Array })
  series: LineChartSeries[] = [];

  @property({ type: Boolean })
  smooth = true;

  @property({ type: Boolean, attribute: 'show-points' })
  showPoints = true;

  @property({ type: Boolean, attribute: 'show-grid' })
  showGrid = true;

  @property({ type: Boolean, attribute: 'fill-area' })
  fillArea = false;

  private readonly defaultColors = [
    tokens.color.primaryMain,
    tokens.color.success,
    tokens.color.warning,
    tokens.color.danger,
    tokens.color.info,
  ];

  private getMaxValue(): number {
    return Math.max(
      ...this.series.flatMap(s => s.data.map(d => d.value)),
      0
    );
  }

  private getLabels(): string[] {
    if (this.series.length === 0) return [];
    return this.series[0].data.map(d => d.label);
  }

  private createPath(data: LineChartData[], chartWidth: number, chartHeight: number, padding: any): string {
    if (data.length === 0) return '';

    const maxValue = this.getMaxValue();
    const xStep = (chartWidth - padding.left - padding.right) / (data.length - 1 || 1);

    const points = data.map((point, i) => {
      const x = padding.left + i * xStep;
      const y = chartHeight - padding.bottom - (point.value / maxValue) * (chartHeight - padding.top - padding.bottom);
      return { x, y };
    });

    if (!this.smooth || points.length < 3) {
      // Simple line path
      return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    }

    // Smooth curve using quadratic bezier
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      path += ` Q ${current.x} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
      if (i < points.length - 2) {
        path += ` T ${next.x} ${next.y}`;
      } else {
        path += ` Q ${next.x} ${next.y}, ${next.x} ${next.y}`;
      }
    }
    return path;
  }

  private renderChart() {
    if (!this.series || this.series.length === 0) {
      return html`<div class="no-data">No data available</div>`;
    }

    const padding = { top: 40, right: 20, bottom: 60, left: 50 };
    const chartWidth = 500;
    const chartHeight = 300;
    const maxValue = this.getMaxValue();
    const labels = this.getLabels();

    return html`
      ${this.series.length > 1 ? html`
        <div class="legend">
          ${this.series.map((s, i) => html`
            <div class="legend-item">
              <div class="legend-color" style="background: ${s.color || this.defaultColors[i % this.defaultColors.length]}"></div>
              <span>${s.name}</span>
            </div>
          `)}
        </div>
      ` : null}

      ${svg`
        <svg viewBox="0 0 ${chartWidth} ${chartHeight}" preserveAspectRatio="xMidYMid meet">
          <!-- Grid lines -->
          ${this.showGrid ? [0, 0.25, 0.5, 0.75, 1].map(tick => {
            const y = chartHeight - padding.bottom - tick * (chartHeight - padding.top - padding.bottom);
            return svg`
              <line
                class="grid-line"
                x1="${padding.left}"
                y1="${y}"
                x2="${chartWidth - padding.right}"
                y2="${y}"
              />
              <text class="label" x="${padding.left - 10}" y="${y + 4}" text-anchor="end">
                ${Math.round(maxValue * tick)}
              </text>
            `;
          }) : null}

          <!-- Axes -->
          <line
            class="axis-line"
            x1="${padding.left}"
            y1="${chartHeight - padding.bottom}"
            x2="${chartWidth - padding.right}"
            y2="${chartHeight - padding.bottom}"
          />
          <line
            class="axis-line"
            x1="${padding.left}"
            y1="${padding.top}"
            x2="${padding.left}"
            y2="${chartHeight - padding.bottom}"
          />

          <!-- X-axis labels -->
          ${labels.map((label, i) => {
            const x = padding.left + i * ((chartWidth - padding.left - padding.right) / (labels.length - 1 || 1));
            return svg`
              <text
                class="label"
                x="${x}"
                y="${chartHeight - padding.bottom + 20}"
                text-anchor="middle"
              >
                ${label}
              </text>
            `;
          })}

          <!-- Lines and areas -->
          ${this.series.map((series, seriesIndex) => {
            const color = series.color || this.defaultColors[seriesIndex % this.defaultColors.length];
            const path = this.createPath(series.data, chartWidth, chartHeight, padding);

            return svg`
              <!-- Area fill -->
              ${this.fillArea ? svg`
                <path
                  class="line-area"
                  d="${path} L ${chartWidth - padding.right} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z"
                  fill="${color}"
                />
              ` : null}

              <!-- Line -->
              <path
                class="line-path"
                d="${path}"
                stroke="${color}"
              />

              <!-- Data points -->
              ${this.showPoints ? series.data.map((point, i) => {
                const xStep = (chartWidth - padding.left - padding.right) / (series.data.length - 1 || 1);
                const x = padding.left + i * xStep;
                const y = chartHeight - padding.bottom - (point.value / maxValue) * (chartHeight - padding.top - padding.bottom);

                return svg`
                  <circle
                    class="data-point"
                    cx="${x}"
                    cy="${y}"
                    r="4"
                    fill="${color}"
                  />
                `;
              }) : null}
            `;
          })}
        </svg>
      `}
    `;
  }

  override render() {
    return html`
      <div class="chart-container">
        ${this.renderChart()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'line-chart': LineChart;
  }
}
