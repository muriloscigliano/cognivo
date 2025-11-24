import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('mini-sparkline')
export class MiniSparkline extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host { display: inline-block; width: 80px; height: 30px; }
      svg { width: 100%; height: 100%; }
      .line { fill: none; stroke: ${tokens.color.success}; stroke-width: 1.5; stroke-linecap: round; }
      .dot { fill: ${tokens.color.success}; }
    `,
  ];

  @property({ type: Array }) data: number[] = [];

  override render() {
    if (!this.data || this.data.length === 0) return html``;
    const max = Math.max(...this.data);
    const min = Math.min(...this.data);
    const range = max - min || 1;
    const stepX = 80 / (this.data.length - 1 || 1);
    const points = this.data.map((value, i) => ({ x: i * stepX, y: 25 - ((value - min) / range) * 20 }));
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return svg`
      <svg viewBox="0 0 80 30">
        <path class="line" d="${path}" />
        ${points.length > 0 ? svg`<circle class="dot" cx="${points[points.length - 1]!.x}" cy="${points[points.length - 1]!.y}" r="2" />` : null}
      </svg>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'mini-sparkline': MiniSparkline; } }
