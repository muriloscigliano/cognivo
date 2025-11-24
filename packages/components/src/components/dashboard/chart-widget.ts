import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Chart Type
 */
export type ChartType = 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'scatter';

/**
 * Chart Data Point
 */
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

/**
 * Chart Dataset
 */
export interface ChartDataset {
  label: string;
  data: ChartDataPoint[];
  color?: string;
}

/**
 * Chart Widget - Chart container widget with chart type selector
 *
 * Features:
 * - Multiple chart types (line, bar, pie, donut, area, scatter)
 * - Chart type selector
 * - Legend support
 * - Responsive container
 * - Loading state
 * - Empty state
 * - Data export
 */
@customElement('chart-widget')
export class ChartWidget extends LitElement {
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

      .chart-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 300px;
      }

      .chart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      .chart-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin: 0;
      }

      .chart-type-selector {
        display: flex;
        gap: ${tokens.spacing.xs};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.xxs};
      }

      .chart-type-btn {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: transparent;
        border: none;
        border-radius: ${tokens.radius.sm};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.xs};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        font-weight: ${tokens.fontWeight.medium};
      }

      .chart-type-btn:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }

      .chart-type-btn[data-active='true'] {
        background: ${tokens.color.primaryMain};
        color: ${tokens.color.grayWhite};
      }

      .chart-body {
        flex: 1;
        padding: ${tokens.spacing.lg};
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
        position: relative;
      }

      .chart-canvas {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border: 2px dashed ${tokens.color.gray100};
      }

      .chart-placeholder {
        text-align: center;
        color: ${tokens.color.gray500};
        padding: ${tokens.spacing.xl};
      }

      .chart-placeholder-icon {
        font-size: 3rem;
        margin-bottom: ${tokens.spacing.md};
        opacity: 0.5;
      }

      .chart-legend {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.sm};
      }

      .legend-color {
        width: 12px;
        height: 12px;
        border-radius: ${tokens.radius.sm};
        flex-shrink: 0;
      }

      .legend-label {
        color: ${tokens.color.gray900};
      }

      .legend-value {
        color: ${tokens.color.gray900};
        font-weight: ${tokens.fontWeight.semibold};
        margin-left: ${tokens.spacing.xs};
      }

      /* Loading state */
      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.9);
        z-index: 10;
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid ${tokens.color.gray100};
        border-top-color: ${tokens.color.primaryMain};
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Empty state */
      .empty-state {
        padding: ${tokens.spacing.xxl};
        text-align: center;
        color: ${tokens.color.gray500};
      }

      /* Responsive */
      @media (max-width: 768px) {
        .chart-header {
          flex-direction: column;
          align-items: flex-start;
        }

        .chart-type-selector {
          width: 100%;
          justify-content: space-between;
        }
      }
    `
  ];

  @property({ type: String })
  title = '';

  @property({ type: String })
  chartType: ChartType = 'line';

  @property({ type: Array })
  availableTypes: ChartType[] = ['line', 'bar', 'pie', 'donut', 'area'];

  @property({ type: Array })
  data: ChartDataPoint[] = [];

  @property({ type: Array })
  datasets: ChartDataset[] = [];

  @property({ type: Boolean })
  showLegend = true;

  @property({ type: Boolean })
  showTypeSelector = true;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String })
  emptyText = 'No chart data available';

  private _handleTypeChange(type: ChartType) {
    this.chartType = type;
    this.dispatchEvent(new CustomEvent('chart-type-change', {
      bubbles: true,
      composed: true,
      detail: { type }
    }));
  }

  private _getChartIcon(type: ChartType): string {
    switch (type) {
      case 'line': return '📈';
      case 'bar': return '📊';
      case 'pie': return '🥧';
      case 'donut': return '🍩';
      case 'area': return '📉';
      case 'scatter': return '⚫';
      default: return '📊';
    }
  }

  private _getTypeLabel(type: ChartType): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  private _renderLegend() {
    if (!this.showLegend) return '';

    const legendData = this.datasets.length > 0
      ? this.datasets.flatMap(ds => ds.data)
      : this.data;

    if (legendData.length === 0) return '';

    return html`
      <div class="chart-legend">
        ${legendData.map((item, index) => {
          const color = item.color || this._getDefaultColor(index);
          return html`
            <div class="legend-item">
              <div
                class="legend-color"
                style="background: ${color}"
              ></div>
              <span class="legend-label">${item.label}</span>
              <span class="legend-value">${item.value}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _getDefaultColor(index: number): string {
    const colors = [
      tokens.color.primaryMain,
      tokens.color.success,
      tokens.color.warning,
      tokens.color.danger,
      tokens.color.info,
      '#9333EA', // purple
      '#EC4899', // pink
      '#F59E0B', // amber
    ];
    return colors[index % colors.length];
  }

  override render() {
    const hasData = this.data.length > 0 || this.datasets.length > 0;

    return html`
      <div class="chart-container">
        ${this.title || this.showTypeSelector ? html`
          <div class="chart-header">
            ${this.title ? html`
              <h3 class="chart-title">${this.title}</h3>
            ` : ''}

            ${this.showTypeSelector && this.availableTypes.length > 1 ? html`
              <div class="chart-type-selector">
                ${this.availableTypes.map(type => html`
                  <button
                    class="chart-type-btn"
                    data-active="${type === this.chartType}"
                    @click=${() => this._handleTypeChange(type)}
                    title="${this._getTypeLabel(type)}"
                  >
                    ${this._getChartIcon(type)}
                  </button>
                `)}
              </div>
            ` : ''}
          </div>
        ` : ''}

        <div class="chart-body">
          ${this.loading ? html`
            <div class="loading-overlay">
              <div class="spinner"></div>
            </div>
          ` : ''}

          ${!hasData ? html`
            <div class="empty-state">
              <div class="chart-placeholder-icon">📊</div>
              <div>${this.emptyText}</div>
            </div>
          ` : html`
            <div class="chart-canvas">
              <div class="chart-placeholder">
                <div class="chart-placeholder-icon">
                  ${this._getChartIcon(this.chartType)}
                </div>
                <div>
                  ${this._getTypeLabel(this.chartType)} Chart
                </div>
                <div style="font-size: ${tokens.fontSize.xs}; margin-top: ${tokens.spacing.xs};">
                  Slot for chart library integration
                </div>
              </div>
              <slot></slot>
            </div>

            ${this._renderLegend()}
          `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chart-widget': ChartWidget;
  }
}
