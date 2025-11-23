import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('mini-donut')
export class MiniDonut extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host { display: inline-block; width: 50px; height: 50px; }
      svg { width: 100%; height: 100%; }
      .slice { transition: opacity ${tokens.transition.default}; }
      .slice:hover { opacity: 0.8; }
    `,
  ];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;

  override render() {
    const percentage = (this.value / this.max) * 100;
    const angle = (percentage / 100) * 360;
    const largeArc = angle > 180 ? 1 : 0;
    const radians = (angle * Math.PI) / 180;
    const x = 25 + 15 * Math.cos(radians - Math.PI / 2);
    const y = 25 + 15 * Math.sin(radians - Math.PI / 2);

    return svg`
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="15" fill="none" stroke="${tokens.color.gray100}" stroke-width="10" />
        <path d="M 25 10 A 15 15 0 ${largeArc} 1 ${x} ${y}" fill="none" stroke="${tokens.color.primaryMain}" stroke-width="10" stroke-linecap="round" class="slice" />
        <text x="25" y="28" font-size="12" font-weight="bold" text-anchor="middle" fill="${tokens.color.gray900}">${Math.round(percentage)}</text>
      </svg>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'mini-donut': MiniDonut; } }
