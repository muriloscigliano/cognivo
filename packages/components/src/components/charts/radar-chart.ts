import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface RadarChartData {
  label: string;
  value: number;
}

export interface RadarChartSeries {
  name: string;
  data: RadarChartData[];
  color?: string;
}

@customElement('radar-chart')
export class RadarChart extends LitElement {
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
      }
      svg { width: 100%; height: 100%; }
      .polygon { fill-opacity: 0.2; stroke-width: 2; }
      .grid-polygon { fill: none; stroke: ${tokens.color.gray100}; stroke-width: 1; }
      .axis-line { stroke: ${tokens.color.gray100}; stroke-width: 1; }
      .label { font-family: ${tokens.fontFamily.primary}; font-size: ${tokens.fontSize.xs}; fill: ${tokens.color.gray900}; }
    `,
  ];

  @property({ type: Array }) series: RadarChartSeries[] = [];

  private polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(angleInRadians), y: cy + r * Math.sin(angleInRadians) };
  }

  override render() {
    if (!this.series || this.series.length === 0) {
      return html`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:${tokens.color.gray500}">No data</div>`;
    }

    const cx = 150, cy = 150, maxRadius = 100;
    const labels = this.series[0].data.map(d => d.label);
    const maxValue = Math.max(...this.series.flatMap(s => s.data.map(d => d.value)));
    const angleStep = 360 / labels.length;
    const colors = [tokens.color.primaryMain, tokens.color.success, tokens.color.warning];

    return svg`
      <svg viewBox="0 0 300 300">
        ${[0.25, 0.5, 0.75, 1].map(scale => {
          const points = labels.map((_, i) => this.polarToCartesian(cx, cy, maxRadius * scale, i * angleStep));
          return svg`<polygon class="grid-polygon" points="${points.map(p => `${p.x},${p.y}`).join(' ')}" />`;
        })}
        ${labels.map((label, i) => {
          const angle = i * angleStep;
          const end = this.polarToCartesian(cx, cy, maxRadius, angle);
          const labelPos = this.polarToCartesian(cx, cy, maxRadius + 20, angle);
          return svg`
            <line class="axis-line" x1="${cx}" y1="${cy}" x2="${end.x}" y2="${end.y}" />
            <text class="label" x="${labelPos.x}" y="${labelPos.y}" text-anchor="middle">${label}</text>
          `;
        })}
        ${this.series.map((s, idx) => {
          const points = s.data.map((d, i) => {
            const r = (d.value / maxValue) * maxRadius;
            return this.polarToCartesian(cx, cy, r, i * angleStep);
          });
          const color = s.color || colors[idx % colors.length];
          return svg`<polygon class="polygon" points="${points.map(p => `${p.x},${p.y}`).join(' ')}" fill="${color}" stroke="${color}" />`;
        })}
      </svg>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'radar-chart': RadarChart; } }
