import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ForecastCurveData {
  x: number;
  actual?: number;
  forecast?: number;
  confidence?: { upper: number; lower: number };
}

@customElement('forecast-curve')
export class ForecastCurve extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host { display: block; width: 100%; height: 250px; background: ${tokens.color.grayWhite}; border-radius: ${tokens.radius.md}; padding: ${tokens.spacing.md}; }
      svg { width: 100%; height: 100%; }
      .actual-line { fill: none; stroke: ${tokens.color.primaryMain}; stroke-width: 2; }
      .forecast-line { fill: none; stroke: ${tokens.color.warning}; stroke-width: 2; stroke-dasharray: 4, 4; }
      .confidence-band { fill: ${tokens.color.warning}; opacity: 0.2; }
      .label { font-family: ${tokens.fontFamily.primary}; font-size: ${tokens.fontSize.xs}; fill: ${tokens.color.gray900}; }
    `,
  ];

  @property({ type: Array }) data: ForecastCurveData[] = [];

  override render() {
    if (!this.data || this.data.length === 0) return html`<div style="text-align:center;padding:60px;color:${tokens.color.gray500}">No data</div>`;

    const width = 500;
    const height = 220;
    const padding = { left: 50, right: 20, top: 20, bottom: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const allValues = this.data.flatMap(d => [d.actual, d.forecast, d.confidence?.upper, d.confidence?.lower].filter(v => v !== undefined) as number[]);
    const maxY = Math.max(...allValues);
    const stepX = chartWidth / (this.data.length - 1 || 1);

    const actualPoints = this.data.filter(d => d.actual !== undefined).map((d, i) => ({
      x: padding.left + i * stepX,
      y: height - padding.bottom - (d.actual! / maxY) * chartHeight
    }));

    const forecastPoints = this.data.filter(d => d.forecast !== undefined).map((d, i) => {
      const index = this.data.indexOf(d);
      return {
        x: padding.left + index * stepX,
        y: height - padding.bottom - (d.forecast! / maxY) * chartHeight
      };
    });

    const actualPath = actualPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const forecastPath = forecastPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return svg`
      <svg viewBox="0 0 ${width} ${height}">
        ${actualPath ? svg`<path class="actual-line" d="${actualPath}" />` : null}
        ${forecastPath ? svg`<path class="forecast-line" d="${forecastPath}" />` : null}
        <text class="label" x="${padding.left}" y="${height - 5}" fill="${tokens.color.primaryMain}">● Actual</text>
        <text class="label" x="${padding.left + 80}" y="${height - 5}" fill="${tokens.color.warning}">● Forecast</text>
      </svg>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'forecast-curve': ForecastCurve; } }
