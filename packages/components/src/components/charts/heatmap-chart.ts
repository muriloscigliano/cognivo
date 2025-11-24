import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface HeatmapCell {
  x: number;
  y: number;
  value: number;
}

@customElement('heatmap-chart')
export class HeatmapChart extends LitElement {
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
      .cell { transition: opacity ${tokens.transition.default}; cursor: pointer; }
      .cell:hover { opacity: 0.7; }
      .label { font-family: ${tokens.fontFamily.primary}; font-size: ${tokens.fontSize.xs}; fill: ${tokens.color.gray900}; }
    `,
  ];

  @property({ type: Array }) data: HeatmapCell[] = [];
  @property({ type: Array }) xLabels: string[] = [];
  @property({ type: Array }) yLabels: string[] = [];

  private getColor(value: number, min: number, max: number): string {
    const ratio = (value - min) / (max - min);
    if (ratio > 0.75) return 'var(--pa-red-500)';
    if (ratio > 0.5) return 'var(--pa-yellow-500)';
    if (ratio > 0.25) return 'var(--pa-blue-300)';
    return 'var(--pa-blue-100)';
  }

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:${tokens.color.gray500}">No data</div>`;
    }

    const minValue = Math.min(...this.data.map(d => d.value));
    const maxValue = Math.max(...this.data.map(d => d.value));
    const cellWidth = 40;
    const cellHeight = 30;
    const padding = { left: 80, top: 60 };

    return svg`
      <svg viewBox="0 0 ${padding.left + this.xLabels.length * cellWidth + 20} ${padding.top + this.yLabels.length * cellHeight + 20}">
        ${this.xLabels.map((label, i) => svg`
          <text class="label" x="${padding.left + i * cellWidth + cellWidth/2}" y="${padding.top - 10}" text-anchor="middle">${label}</text>
        `)}
        ${this.yLabels.map((label, i) => svg`
          <text class="label" x="${padding.left - 10}" y="${padding.top + i * cellHeight + cellHeight/2 + 5}" text-anchor="end">${label}</text>
        `)}
        ${this.data.map(cell => svg`
          <rect
            class="cell"
            x="${padding.left + cell.x * cellWidth}"
            y="${padding.top + cell.y * cellHeight}"
            width="${cellWidth - 2}"
            height="${cellHeight - 2}"
            fill="${this.getColor(cell.value, minValue, maxValue)}"
          />
          <text class="label" x="${padding.left + cell.x * cellWidth + cellWidth/2}" y="${padding.top + cell.y * cellHeight + cellHeight/2 + 5}" text-anchor="middle" fill="white">${cell.value}</text>
        `)}
      </svg>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'heatmap-chart': HeatmapChart; } }
