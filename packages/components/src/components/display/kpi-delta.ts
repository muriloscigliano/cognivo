import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('kpi-delta')
export class KpiDelta extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
      }

      .arrow {
        font-size: ${tokens.fontSize.md};
      }

      :host([trend='up']) {
        color: ${tokens.color.success};
      }

      :host([trend='down']) {
        color: ${tokens.color.danger};
      }

      :host([trend='neutral']) {
        color: ${tokens.color.gray500};
      }

      :host([inverted][trend='up']) {
        color: ${tokens.color.danger};
      }

      :host([inverted][trend='down']) {
        color: ${tokens.color.success};
      }
    `,
  ];

  @property({ type: Number }) value = 0;
  @property({ type: String, reflect: true }) trend: 'up' | 'down' | 'neutral' = 'neutral';
  @property({ type: Boolean }) inverted = false;
  @property({ type: Boolean, attribute: 'show-arrow' }) showArrow = true;

  override connectedCallback() {
    super.connectedCallback();
    if (this.value > 0 && this.trend === 'neutral') {
      this.trend = 'up';
    } else if (this.value < 0 && this.trend === 'neutral') {
      this.trend = 'down';
    }
  }

  override render() {
    const arrow = this.trend === 'up' ? '↑' : this.trend === 'down' ? '↓' : '→';
    const displayValue = Math.abs(this.value);

    return html`
      ${this.showArrow ? html`<span class="arrow">${arrow}</span>` : ''}
      <span>${displayValue}%</span>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kpi-delta': KpiDelta;
  }
}
