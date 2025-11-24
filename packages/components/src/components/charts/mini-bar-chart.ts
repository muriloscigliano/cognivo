import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('mini-bar-chart')
export class MiniBarChart extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host { display: inline-block; width: 100px; height: 40px; }
      svg { width: 100%; height: 100%; }
      .bar { fill: ${tokens.color.primaryMain}; transition: opacity ${tokens.transition.default}; }
      .bar:hover { opacity: 0.7; }
    `,
  ];

  @property({ type: Array }) data: number[] = [];

  override render() {
    if (!this.data || this.data.length === 0) return html``;
    const max = Math.max(...this.data);
    const barWidth = 100 / this.data.length;
    return svg`
      <svg viewBox="0 0 100 40">
        ${this.data.map((value, i) => {
          const height = (value / max) * 35;
          return svg`<rect class="bar" x="${i * barWidth + 1}" y="${40 - height}" width="${barWidth - 2}" height="${height}" rx="1" />`;
        })}
      </svg>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'mini-bar-chart': MiniBarChart; } }
