import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Layout Grid
 *
 * Responsive grid layout with configurable columns and gaps
 */
@customElement('layout-grid')
export class LayoutGrid extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: var(--grid-columns, repeat(auto-fit, minmax(300px, 1fr)));
        gap: var(--grid-gap, var(--cg-spacing-24));
        width: 100%;
      }

      :host([cols='1']) { grid-template-columns: 1fr; }
      :host([cols='2']) { grid-template-columns: repeat(2, 1fr); }
      :host([cols='3']) { grid-template-columns: repeat(3, 1fr); }
      :host([cols='4']) { grid-template-columns: repeat(4, 1fr); }
      :host([cols='6']) { grid-template-columns: repeat(6, 1fr); }
      :host([cols='12']) { grid-template-columns: repeat(12, 1fr); }

      @media (max-width: 768px) {
        :host {
          grid-template-columns: 1fr;
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  cols = 'auto';

  @property({ type: String })
  gap = '';

  override connectedCallback() {
    super.connectedCallback();
    if (this.gap) {
      this.style.setProperty('--grid-gap', this.gap);
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-grid': LayoutGrid;
  }
}
