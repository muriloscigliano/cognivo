import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AnomalyPoint {
  x: number;
  y: number;
  isAnomaly: boolean;
  severity?: 'low' | 'medium' | 'high';
}

@customElement('anomaly-highlight')
export class AnomalyHighlight extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host { display: block; width: 100%; height: 200px; }
      svg { width: 100%; height: 100%; }
      .line { fill: none; stroke: ${tokens.color.gray500}; stroke-width: 2; }
      .normal-point { fill: ${tokens.color.primaryMain}; }
      .anomaly-low { fill: ${tokens.color.warning}; }
      .anomaly-medium { fill: 'var(--pa-red-300)'; }
      .anomaly-high { fill: ${tokens.color.danger}; animation: pulse 1s infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      .highlight-zone { fill: ${tokens.color.danger}; opacity: 0.1; }
    `,
  ];

  @property({ type: Array }) data: AnomalyPoint[] = [];

  override render() {
    if (!this.data || this.data.length === 0) return html``;

    const width = 400;
    const height = 180;
    const padding = { left: 30, right: 30, top: 20, bottom: 20 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxX = Math.max(...this.data.map(d => d.x));
    const maxY = Math.max(...this.data.map(d => d.y));

    const points = this.data.map(d => ({
      x: padding.left + (d.x / maxX) * chartWidth,
      y: height - padding.bottom - (d.y / maxY) * chartHeight,
      isAnomaly: d.isAnomaly,
      severity: d.severity || 'low'
    }));

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return svg`
      <svg viewBox="0 0 ${width} ${height}">
        <path class="line" d="${linePath}" />
        ${points.map(p => svg`
          <circle
            class="${p.isAnomaly ? `anomaly-${p.severity}` : 'normal-point'}"
            cx="${p.x}"
            cy="${p.y}"
            r="${p.isAnomaly ? 6 : 3}"
          />
        `)}
      </svg>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'anomaly-highlight': AnomalyHighlight; } }
