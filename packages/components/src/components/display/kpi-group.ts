import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('kpi-group')
export class KpiGroup extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: grid;
        gap: ${tokens.spacing.md};
      }

      :host([columns='2']) {
        grid-template-columns: repeat(2, 1fr);
      }

      :host([columns='3']) {
        grid-template-columns: repeat(3, 1fr);
      }

      :host([columns='4']) {
        grid-template-columns: repeat(4, 1fr);
      }

      :host([columns='auto']) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }

      @media (max-width: 768px) {
        :host {
          grid-template-columns: 1fr;
        }
      }
    `,
  ];

  @property({ type: String, reflect: true }) columns: '2' | '3' | '4' | 'auto' = '3';

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kpi-group': KpiGroup;
  }
}
