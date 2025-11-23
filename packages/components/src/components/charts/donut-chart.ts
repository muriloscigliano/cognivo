import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface DonutChartData {
  label: string;
  value: number;
  color?: string;
}

/**
 * Donut Chart Component
 *
 * Displays data as donut chart with center label
 *
 * @element donut-chart
 */
@customElement('donut-chart')
export class DonutChart extends LitElement {
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
        position: relative;
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

      .center-label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        fill: ${tokens.color.gray900};
        text-anchor: middle;
      }

      .center-subtitle {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        fill: ${tokens.color.gray500};
        text-anchor: middle;
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
    `,
  ];

  @property({ type: Array })
  data: DonutChartData[] = [];

  @property({ type: String, attribute: 'center-label' })
  centerLabel = '';

  @property({ type: Boolean, attribute: 'show-legend' })
  showLegend = true;

  private readonly defaultColors = [
    tokens.color.primaryMain,
    tokens.color.success,
    tokens.color.warning,
    tokens.color.danger,
    tokens.color.info,
    'var(--pa-blue-300)',
    'var(--pa-green-300)',
  ];

  private getTotal(): number {
    return this.data.reduce((sum, d) => sum + d.value, 0);
  }

  private createDonutPath(startAngle: number, endAngle: number, outerRadius: number, innerRadius: number, cx: number, cy: number): string {
    const startOuter = this.polarToCartesian(cx, cy, outerRadius, endAngle);
    const endOuter = this.polarToCartesian(cx, cy, outerRadius, startAngle);
    const startInner = this.polarToCartesian(cx, cy, innerRadius, endAngle);
    const endInner = this.polarToCartesian(cx, cy, innerRadius, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${startInner.x} ${startInner.y}`,
      'Z'
    ].join(' ');
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
    const outerRadius = 100;
    const innerRadius = 60;
    let currentAngle = 0;

    const slices = this.data.map((item, index) => {
      const angle = (item.value / total) * 360;
      const color = item.color || this.defaultColors[index % this.defaultColors.length];
      const path = this.createDonutPath(currentAngle, currentAngle + angle, outerRadius, innerRadius, cx, cy);
      currentAngle += angle;
      return { path, color };
    });

    return html`
      <div class="container">
        <div class="chart">
          ${svg`
            <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
              ${slices.map(slice => svg`
                <path class="slice" d="${slice.path}" fill="${slice.color}" />
              `)}
              ${this.centerLabel ? svg`
                <text class="center-label" x="${cx}" y="${cy - 5}">${this.centerLabel}</text>
                <text class="center-subtitle" x="${cx}" y="${cy + 15}">Total</text>
              ` : svg`
                <text class="center-label" x="${cx}" y="${cy + 5}">${total}</text>
              `}
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
    'donut-chart': DonutChart;
  }
}
