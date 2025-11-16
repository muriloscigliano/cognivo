import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Chart data point
 */
export interface AiChartDataPoint {
  label: string;
  value: number;
  forecast?: boolean;
  anomaly?: boolean;
  confidence?: number;
}

/**
 * AI Mini Chart
 *
 * Lightweight SVG chart with AI annotations: forecast lines, anomaly markers,
 * confidence bands.
 *
 * @element ai-mini-chart
 *
 * @attr {string} type - Chart type: 'line' | 'bar' | 'area'
 * @attr {boolean} show-forecast - Show forecast line
 * @attr {boolean} show-anomalies - Show anomaly markers
 * @attr {boolean} show-grid - Show grid lines
 * @attr {string} height - Chart height (default: 200px)
 *
 * @example
 * ```html
 * <ai-mini-chart
 *   .data=${chartData}
 *   type="line"
 *   show-forecast
 *   show-anomalies
 * ></ai-mini-chart>
 * ```
 */
@customElement('ai-mini-chart')
export class AiMiniChart extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: inherit;
        border: 1px solid var(--cg-gray-100);
        border-radius: var(--cg-Border-radius-150);
        padding: var(--cg-spacing-16);
      }

      .chart-container {
        position: relative;
        width: 100%;
        height: var(--chart-height, 200px);
      }

      svg {
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      /* Chart elements */
      .grid-line {
        stroke: var(--cg-gray-100);
        stroke-width: 1;
        stroke-dasharray: 4 4;
      }

      .axis-line {
        stroke: var(--cg-gray-500);
        stroke-width: 2;
      }

      .axis-label {
        font-size: 11px;
        fill: var(--cg-gray-500);
        font-family: inherit;
      }

      /* Data line */
      .data-line {
        fill: none;
        stroke: inherit;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .data-area {
        fill: inherit;
        opacity: 0.1;
      }

      /* Forecast */
      .forecast-line {
        fill: none;
        stroke: inherit;
        stroke-width: 3;
        stroke-dasharray: 8 4;
        opacity: 0.7;
      }

      .confidence-band {
        fill: inherit;
        opacity: 0.3;
      }

      /* Data points */
      .data-point {
        fill: inherit;
        stroke: inherit;
        stroke-width: 2;
        cursor: pointer;
        transition: all inherit;
      }

      .data-point:hover {
        r: 6;
        fill: inherit;
        filter: brightness(1.2);
      }

      /* Anomaly markers */
      .anomaly-marker {
        fill: #ef4444;
        stroke: #ffffff;
        stroke-width: 2;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      /* Bars */
      .bar {
        fill: inherit;
        transition: all inherit;
      }

      .bar:hover {
        fill: inherit;
        filter: brightness(1.2);
      }

      /* Tooltip */
      .tooltip {
        position: absolute;
        background: inherit;
        color: white;
        padding: 8px 12px;
        border-radius: var(--cg-Border-radius-50);
        font-size: inherit;
        pointer-events: none;
        opacity: 0;
        transition: opacity inherit;
        z-index: 10;
        white-space: nowrap;
      }

      .tooltip.visible {
        opacity: 1;
      }

      .tooltip-label {
        font-weight: inherit;
        margin-bottom: 4px;
      }

      .tooltip-value {
        color: inherit;
      }

      /* Legend */
      .legend {
        display: flex;
        align-items: center;
        gap: var(--cg-spacing-16);
        margin-top: var(--cg-spacing-16);
        font-size: inherit;
        color: var(--cg-gray-500);
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .legend-line {
        width: 20px;
        height: 2px;
      }

      .legend-line.solid {
        background: inherit;
      }

      .legend-line.dashed {
        background: linear-gradient(to right, inherit 50%, transparent 50%);
        background-size: 8px 2px;
      }

      .legend-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ef4444;
      }

      /* Dark mode */
      @media (prefers-color-scheme: dark) {
        :host {
          background: #1f2937;
          border-color: #374151;
        }

        .grid-line {
          stroke: #374151;
        }

        .axis-line,
        .axis-label {
          stroke: #9ca3af;
          fill: #9ca3af;
        }

        .data-point {
          stroke: #1f2937;
        }

        .legend {
          color: #9ca3af;
        }
      }
    `,
  ];

  /**
   * Chart data
   */
  @property({ type: Array })
  data: AiChartDataPoint[] = [];

  /**
   * Chart type
   */
  @property({ type: String })
  type: 'line' | 'bar' | 'area' = 'line';

  /**
   * Show forecast line
   */
  @property({ type: Boolean, attribute: 'show-forecast' })
  showForecast = false;

  /**
   * Show anomaly markers
   */
  @property({ type: Boolean, attribute: 'show-anomalies' })
  showAnomalies = false;

  /**
   * Show grid lines
   */
  @property({ type: Boolean, attribute: 'show-grid' })
  showGrid = true;

  /**
   * Chart height
   */
  @property({ type: String })
  height = '200px';

  /**
   * Tooltip state
   */
  @state()
  private tooltipVisible = false;

  @state()
  private tooltipX = 0;

  @state()
  private tooltipY = 0;

  @state()
  private tooltipContent = '';

  /**
   * Get min/max values
   */
  private get valueRange(): { min: number; max: number } {
    const values = this.data.map((d) => d.value);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }

  /**
   * Map value to Y coordinate
   */
  private valueToY(value: number, height: number, padding: number = 40): number {
    const { min, max } = this.valueRange;
    const range = max - min || 1;
    const availableHeight = height - padding * 2;
    return padding + availableHeight - ((value - min) / range) * availableHeight;
  }

  /**
   * Map index to X coordinate
   */
  private indexToX(index: number, width: number, padding: number = 40): number {
    const count = this.data.length;
    const availableWidth = width - padding * 2;
    return padding + (index / (count - 1)) * availableWidth;
  }

  /**
   * Generate line path
   */
  private generateLinePath(width: number, height: number): string {
    if (this.data.length === 0) return '';

    const points = this.data.map((d, i) => {
      const x = this.indexToX(i, width);
      const y = this.valueToY(d.value, height);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    });

    return points.join(' ');
  }

  /**
   * Generate area path
   */
  private generateAreaPath(width: number, height: number): string {
    if (this.data.length === 0) return '';

    const linePath = this.generateLinePath(width, height);
    const firstX = this.indexToX(0, width);
    const lastX = this.indexToX(this.data.length - 1, width);
    const bottomY = height - 40;

    return `${linePath} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
  }

  /**
   * Handle point hover
   */
  private handlePointHover(event: MouseEvent, point: AiChartDataPoint) {
    this.tooltipVisible = true;
    this.tooltipX = event.clientX;
    this.tooltipY = event.clientY - 40;
    this.tooltipContent = `${point.label}: ${point.value}${point.forecast ? ' (forecast)' : ''}`;
  }

  /**
   * Handle point leave
   */
  private handlePointLeave() {
    this.tooltipVisible = false;
  }

  /**
   * Render chart
   */
  private renderChart() {
    const width = 600; // viewBox width
    const height = 200; // viewBox height

    return svg`
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        ${this.showGrid ? this.renderGrid(width, height) : null}
        ${this.renderAxes(width, height)}

        ${this.type === 'line' && svg`
          <path class="data-line" d="${this.generateLinePath(width, height)}" />
        `}

        ${this.type === 'area' && svg`
          <path class="data-area" d="${this.generateAreaPath(width, height)}" />
          <path class="data-line" d="${this.generateLinePath(width, height)}" />
        `}

        ${this.type === 'bar' && this.renderBars(width, height)}

        ${this.showForecast && this.renderForecast(width, height)}

        ${(this.type === 'line' || this.type === 'area') && this.renderDataPoints(width, height)}

        ${this.showAnomalies && this.renderAnomalies(width, height)}

        ${this.renderLabels(width, height)}
      </svg>
    `;
  }

  /**
   * Render grid
   */
  private renderGrid(width: number, height: number) {
    const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
      const y = 40 + (height - 80) * (1 - ratio);
      return svg`<line class="grid-line" x1="40" y1="${y}" x2="${width - 40}" y2="${y}" />`;
    });
    return gridLines;
  }

  /**
   * Render axes
   */
  private renderAxes(width: number, height: number) {
    return svg`
      <line class="axis-line" x1="40" y1="${height - 40}" x2="${width - 40}" y2="${height - 40}" />
      <line class="axis-line" x1="40" y1="40" x2="40" y2="${height - 40}" />
    `;
  }

  /**
   * Render bars
   */
  private renderBars(width: number, height: number) {
    const barWidth = (width - 80) / this.data.length * 0.8;
    return this.data.map((d, i) => {
      const x = this.indexToX(i, width) - barWidth / 2;
      const y = this.valueToY(d.value, height);
      const barHeight = (height - 40) - y;
      return svg`
        <rect
          class="bar"
          x="${x}"
          y="${y}"
          width="${barWidth}"
          height="${barHeight}"
        />
      `;
    });
  }

  /**
   * Render data points
   */
  private renderDataPoints(width: number, height: number) {
    return this.data.map((d, i) => {
      const x = this.indexToX(i, width);
      const y = this.valueToY(d.value, height);
      return svg`
        <circle
          class="data-point"
          cx="${x}"
          cy="${y}"
          r="4"
          @mouseenter="${(e: MouseEvent) => this.handlePointHover(e, d)}"
          @mouseleave="${() => this.handlePointLeave()}"
        />
      `;
    });
  }

  /**
   * Render forecast
   */
  private renderForecast(width: number, height: number) {
    const forecastData = this.data.filter((d) => d.forecast);
    if (forecastData.length === 0) return null;

    const points = forecastData.map((d, i) => {
      const index = this.data.indexOf(d);
      const x = this.indexToX(index, width);
      const y = this.valueToY(d.value, height);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    });

    return svg`<path class="forecast-line" d="${points.join(' ')}" />`;
  }

  /**
   * Render anomalies
   */
  private renderAnomalies(width: number, height: number) {
    return this.data
      .filter((d) => d.anomaly)
      .map((d, i) => {
        const index = this.data.indexOf(d);
        const x = this.indexToX(index, width);
        const y = this.valueToY(d.value, height);
        return svg`
          <circle class="anomaly-marker" cx="${x}" cy="${y}" r="6" />
        `;
      });
  }

  /**
   * Render labels
   */
  private renderLabels(width: number, height: number) {
    return this.data.map((d, i) => {
      const x = this.indexToX(i, width);
      const y = height - 20;
      if (i % Math.ceil(this.data.length / 6) === 0) {
        return svg`
          <text class="axis-label" x="${x}" y="${y}" text-anchor="middle">
            ${d.label}
          </text>
        `;
      }
      return null;
    });
  }

  override render() {
    return html`
      <div class="chart-container" style="--chart-height: ${this.height}">
        ${this.renderChart()}

        <div
          class="tooltip ${this.tooltipVisible ? 'visible' : ''}"
          style="left: ${this.tooltipX}px; top: ${this.tooltipY}px"
        >
          ${this.tooltipContent}
        </div>
      </div>

      ${this.showForecast || this.showAnomalies
        ? html`
            <div class="legend">
              <div class="legend-item">
                <div class="legend-line solid"></div>
                <span>Actual</span>
              </div>
              ${this.showForecast
                ? html`
                    <div class="legend-item">
                      <div class="legend-line dashed"></div>
                      <span>Forecast</span>
                    </div>
                  `
                : null}
              ${this.showAnomalies
                ? html`
                    <div class="legend-item">
                      <div class="legend-dot"></div>
                      <span>Anomaly</span>
                    </div>
                  `
                : null}
            </div>
          `
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-mini-chart': AiMiniChart;
  }
}
