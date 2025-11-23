import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

/**
 * Bar Chart Component
 *
 * Displays data as horizontal or vertical bars with smooth animations
 *
 * @element bar-chart
 *
 * @attr {Array} data - Array of data points
 * @attr {string} orientation - 'horizontal' or 'vertical'
 * @attr {boolean} show-values - Display values on bars
 * @attr {boolean} show-labels - Display labels
 * @attr {string} bar-color - Default bar color
 *
 * @example
 * ```html
 * <bar-chart
 *   .data="${[{label: 'Jan', value: 100}, {label: 'Feb', value: 150}]}"
 *   orientation="vertical"
 *   show-values
 * ></bar-chart>
 * ```
 */
@customElement('bar-chart')
export class BarChart extends LitElement {
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

      .bar {
        transition: all ${tokens.transition.default} ease-in-out;
        cursor: pointer;
      }

      .bar:hover {
        opacity: 0.8;
      }

      .bar-rect {
        animation: growBar 0.6s ease-out forwards;
        transform-origin: bottom;
      }

      @keyframes growBar {
        from {
          transform: scaleY(0);
        }
        to {
          transform: scaleY(1);
        }
      }

      .label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        fill: ${tokens.color.gray900};
        user-select: none;
      }

      .value {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
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

      .no-data {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: ${tokens.color.gray500};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
      }
    `,
  ];

  @property({ type: Array })
  data: BarChartData[] = [];

  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'vertical';

  @property({ type: Boolean, attribute: 'show-values' })
  showValues = true;

  @property({ type: Boolean, attribute: 'show-labels' })
  showLabels = true;

  @property({ type: String, attribute: 'bar-color' })
  barColor = tokens.color.primaryMain;

  private getMaxValue(): number {
    return Math.max(...this.data.map(d => d.value), 0);
  }

  private renderVerticalBars() {
    if (!this.data || this.data.length === 0) {
      return html`<div class="no-data">No data available</div>`;
    }

    const padding = { top: 40, right: 20, bottom: 60, left: 50 };
    const chartWidth = 400;
    const chartHeight = 250;
    const maxValue = this.getMaxValue();
    const barWidth = (chartWidth - padding.left - padding.right) / this.data.length * 0.7;
    const barGap = (chartWidth - padding.left - padding.right) / this.data.length * 0.3;

    return svg`
      <svg viewBox="0 0 ${chartWidth} ${chartHeight}" preserveAspectRatio="xMidYMid meet">
        <!-- Grid lines -->
        ${[0, 0.25, 0.5, 0.75, 1].map(tick => {
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
        })}

        <!-- Axis -->
        <line
          class="axis-line"
          x1="${padding.left}"
          y1="${chartHeight - padding.bottom}"
          x2="${chartWidth - padding.right}"
          y2="${chartHeight - padding.bottom}"
        />

        <!-- Bars -->
        ${this.data.map((item, index) => {
          const x = padding.left + index * (barWidth + barGap) + barGap / 2;
          const barHeight = maxValue > 0 ? (item.value / maxValue) * (chartHeight - padding.top - padding.bottom) : 0;
          const y = chartHeight - padding.bottom - barHeight;
          const color = item.color || this.barColor;

          return svg`
            <g class="bar">
              <rect
                class="bar-rect"
                x="${x}"
                y="${y}"
                width="${barWidth}"
                height="${barHeight}"
                fill="${color}"
                rx="4"
              />
              ${this.showValues ? svg`
                <text
                  class="value"
                  x="${x + barWidth / 2}"
                  y="${y - 8}"
                  text-anchor="middle"
                >
                  ${item.value}
                </text>
              ` : null}
              ${this.showLabels ? svg`
                <text
                  class="label"
                  x="${x + barWidth / 2}"
                  y="${chartHeight - padding.bottom + 20}"
                  text-anchor="middle"
                >
                  ${item.label}
                </text>
              ` : null}
            </g>
          `;
        })}
      </svg>
    `;
  }

  private renderHorizontalBars() {
    if (!this.data || this.data.length === 0) {
      return html`<div class="no-data">No data available</div>`;
    }

    const padding = { top: 20, right: 80, bottom: 20, left: 100 };
    const chartWidth = 400;
    const chartHeight = Math.max(250, this.data.length * 50);
    const maxValue = this.getMaxValue();
    const barHeight = (chartHeight - padding.top - padding.bottom) / this.data.length * 0.7;
    const barGap = (chartHeight - padding.top - padding.bottom) / this.data.length * 0.3;

    return svg`
      <svg viewBox="0 0 ${chartWidth} ${chartHeight}" preserveAspectRatio="xMidYMid meet">
        <!-- Grid lines -->
        ${[0, 0.25, 0.5, 0.75, 1].map(tick => {
          const x = padding.left + tick * (chartWidth - padding.left - padding.right);
          return svg`
            <line
              class="grid-line"
              x1="${x}"
              y1="${padding.top}"
              x2="${x}"
              y2="${chartHeight - padding.bottom}"
            />
          `;
        })}

        <!-- Axis -->
        <line
          class="axis-line"
          x1="${padding.left}"
          y1="${padding.top}"
          x2="${padding.left}"
          y2="${chartHeight - padding.bottom}"
        />

        <!-- Bars -->
        ${this.data.map((item, index) => {
          const y = padding.top + index * (barHeight + barGap) + barGap / 2;
          const barWidth = maxValue > 0 ? (item.value / maxValue) * (chartWidth - padding.left - padding.right) : 0;
          const x = padding.left;
          const color = item.color || this.barColor;

          return svg`
            <g class="bar">
              <rect
                class="bar-rect"
                x="${x}"
                y="${y}"
                width="${barWidth}"
                height="${barHeight}"
                fill="${color}"
                rx="4"
              />
              ${this.showLabels ? svg`
                <text
                  class="label"
                  x="${padding.left - 10}"
                  y="${y + barHeight / 2 + 4}"
                  text-anchor="end"
                >
                  ${item.label}
                </text>
              ` : null}
              ${this.showValues ? svg`
                <text
                  class="value"
                  x="${x + barWidth + 8}"
                  y="${y + barHeight / 2 + 4}"
                  text-anchor="start"
                >
                  ${item.value}
                </text>
              ` : null}
            </g>
          `;
        })}
      </svg>
    `;
  }

  override render() {
    return html`
      <div class="chart-container">
        ${this.orientation === 'vertical' ? this.renderVerticalBars() : this.renderHorizontalBars()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bar-chart': BarChart;
  }
}
