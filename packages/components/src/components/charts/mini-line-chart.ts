import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('mini-line-chart')
export class MiniLineChart extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host { display: inline-block; width: 100px; height: 40px; }
      svg { width: 100%; height: 100%; }
      .line { fill: none; stroke: ${tokens.color.primaryMain}; stroke-width: 2; stroke-linecap: round; }
      .area { fill: ${tokens.color.primaryMain}; opacity: 0.1; }
    `,
  ];

  @property({ type: Array }) data: number[] = [];

  override render() {
    if (!this.data || this.data.length === 0) return html``;
    const max = Math.max(...this.data);
    const stepX = 100 / (this.data.length - 1 || 1);
    const points = this.data.map((value, i) => ({ x: i * stepX, y: 40 - (value / max) * 35 }));
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L 100 40 L 0 40 Z`;

    return svg`
      <svg viewBox="0 0 100 40">
        <path class="area" d="${areaPath}" />
        <path class="line" d="${linePath}" />
      </svg>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'mini-line-chart': MiniLineChart; } }
