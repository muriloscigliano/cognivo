import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AreaChartData {
  label: string;
  value: number;
}

export interface AreaChartSeries {
  name: string;
  data: AreaChartData[];
  color?: string;
}

/**
 * Area Chart Component
 *
 * Displays data as filled area chart with smooth curves
 *
 * @element area-chart
 */
@customElement('area-chart')
export class AreaChart extends LitElement {
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

      svg {
        width: 100%;
        height: 100%;
      }

      .area-path {
        opacity: 0.3;
        transition: opacity ${tokens.transition.default};
      }

      .area-path:hover {
        opacity: 0.5;
      }

      .line-path {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
      }

      .label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        fill: ${tokens.color.gray900};
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
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
      }

      .legend-color {
        width: 16px;
        height: 3px;
        border-radius: 2px;
      }
    `,
  ];

  @property({ type: Array })
  series: AreaChartSeries[] = [];

  @property({ type: Boolean })
  smooth = true;

  @property({ type: Boolean, attribute: 'show-grid' })
  showGrid = true;

  private readonly defaultColors = [
    tokens.color.primaryMain,
    tokens.color.success,
    tokens.color.warning,
  ];

  private getMaxValue(): number {
    return Math.max(...this.series.flatMap(s => s.data.map(d => d.value)), 0);
  }

  private getLabels(): string[] {
    if (this.series.length === 0) return [];
    return this.series[0].data.map(d => d.label);
  }

  private createPath(data: AreaChartData[], chartWidth: number, chartHeight: number, padding: any): string {
    if (data.length === 0) return '';
    const maxValue = this.getMaxValue();
    const xStep = (chartWidth - padding.left - padding.right) / (data.length - 1 || 1);
    const points = data.map((point, i) => {
      const x = padding.left + i * xStep;
      const y = chartHeight - padding.bottom - (point.value / maxValue) * (chartHeight - padding.top - padding.bottom);
      return { x, y };
    });
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }

  override render() {
    if (!this.series || this.series.length === 0) {
      return html`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:${tokens.color.gray500}">No data</div>`;
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
          ${this.showGrid ? [0, 0.25, 0.5, 0.75, 1].map(tick => {
            const y = chartHeight - padding.bottom - tick * (chartHeight - padding.top - padding.bottom);
            return svg`
              <line class="grid-line" x1="${padding.left}" y1="${y}" x2="${chartWidth - padding.right}" y2="${y}" />
              <text class="label" x="${padding.left - 10}" y="${y + 4}" text-anchor="end">${Math.round(maxValue * tick)}</text>
            `;
          }) : null}

          <line class="axis-line" x1="${padding.left}" y1="${chartHeight - padding.bottom}" x2="${chartWidth - padding.right}" y2="${chartHeight - padding.bottom}" />
          <line class="axis-line" x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${chartHeight - padding.bottom}" />

          ${labels.map((label, i) => {
            const x = padding.left + i * ((chartWidth - padding.left - padding.right) / (labels.length - 1 || 1));
            return svg`<text class="label" x="${x}" y="${chartHeight - padding.bottom + 20}" text-anchor="middle">${label}</text>`;
          })}

          ${this.series.map((series, idx) => {
            const color = series.color || this.defaultColors[idx % this.defaultColors.length];
            const path = this.createPath(series.data, chartWidth, chartHeight, padding);
            return svg`
              <path class="area-path" d="${path} L ${chartWidth - padding.right} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z" fill="${color}" />
              <path class="line-path" d="${path}" stroke="${color}" />
            `;
          })}
        </svg>
      `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'area-chart': AreaChart;
  }
}
