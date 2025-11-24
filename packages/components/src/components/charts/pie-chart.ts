import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface PieChartData {
  label: string;
  value: number;
  color?: string;
}

/**
 * Pie Chart Component
 *
 * Displays data as circular pie chart with labels
 *
 * @element pie-chart
 */
@customElement('pie-chart')
export class PieChart extends LitElement {
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

      .container {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.lg};
        height: 100%;
      }

      .chart {
        flex: 1;
        height: 100%;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      .slice {
        transition: opacity ${tokens.transition.default};
        cursor: pointer;
      }

      .slice:hover {
        opacity: 0.8;
      }

      .legend {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
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
        height: 16px;
        border-radius: 4px;
      }

      .legend-label {
        flex: 1;
      }

      .legend-value {
        font-weight: ${tokens.fontWeight.semibold};
      }

      .label-text {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        fill: ${tokens.color.gray900};
        font-weight: ${tokens.fontWeight.semibold};
      }
    `,
  ];

  @property({ type: Array })
  data: PieChartData[] = [];

  @property({ type: Boolean, attribute: 'show-labels' })
  showLabels = true;

  @property({ type: Boolean, attribute: 'show-legend' })
  showLegend = true;

  private readonly defaultColors = [
    tokens.color.primaryMain,
    tokens.color.success,
    tokens.color.warning,
    tokens.color.danger,
    tokens.color.info,
    'var(--cg-blue-300)',
    'var(--cg-green-300)',
    'var(--cg-yellow-300)',
  ];

  private getTotal(): number {
    return this.data.reduce((sum, d) => sum + d.value, 0);
  }

  private createSlicePath(startAngle: number, endAngle: number, radius: number, cx: number, cy: number): string {
    const start = this.polarToCartesian(cx, cy, radius, endAngle);
    const end = this.polarToCartesian(cx, cy, radius, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
  }

  private polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(angleInRadians),
      y: cy + radius * Math.sin(angleInRadians),
    };
  }

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:${tokens.color.gray500}">No data</div>`;
    }

    const total = this.getTotal();
    const cx = 150;
    const cy = 150;
    const radius = 100;
    let currentAngle = 0;

    const slices = this.data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 360;
      const color = item.color || this.defaultColors[index % this.defaultColors.length];
      const path = this.createSlicePath(currentAngle, currentAngle + angle, radius, cx, cy);

      const labelAngle = currentAngle + angle / 2;
      const labelRadius = radius * 0.7;
      const labelPos = this.polarToCartesian(cx, cy, labelRadius, labelAngle);

      currentAngle += angle;

      return { path, color, label: item.label, value: item.value, percentage, labelPos };
    });

    return html`
      <div class="container">
        <div class="chart">
          ${svg`
            <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
              ${slices.map(slice => svg`
                <path class="slice" d="${slice.path}" fill="${slice.color}" />
                ${this.showLabels ? svg`
                  <text class="label-text" x="${slice.labelPos.x}" y="${slice.labelPos.y}" text-anchor="middle">
                    ${slice.percentage.toFixed(1)}%
                  </text>
                ` : null}
              `)}
            </svg>
          `}
        </div>

        ${this.showLegend ? html`
          <div class="legend">
            ${this.data.map((item, index) => html`
              <div class="legend-item">
                <div class="legend-color" style="background: ${item.color || this.defaultColors[index % this.defaultColors.length]}"></div>
                <span class="legend-label">${item.label}</span>
                <span class="legend-value">${item.value}</span>
              </div>
            `)}
          </div>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pie-chart': PieChart;
  }
}
