import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('layout-stack')
export class LayoutStack extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: var(--stack-direction, column);
        gap: var(--stack-gap, ${tokens.spacing.md});
        align-items: var(--stack-align, stretch);
        justify-content: var(--stack-justify, flex-start);
      }

      :host([direction='row']) { --stack-direction: row; }
      :host([direction='column']) { --stack-direction: column; }
      :host([align='start']) { --stack-align: flex-start; }
      :host([align='center']) { --stack-align: center; }
      :host([align='end']) { --stack-align: flex-end; }
      :host([justify='start']) { --stack-justify: flex-start; }
      :host([justify='center']) { --stack-justify: center; }
      :host([justify='end']) { --stack-justify: flex-end; }
      :host([justify='between']) { --stack-justify: space-between; }
    `,
  ];

  @property({ type: String, reflect: true }) direction: 'row' | 'column' = 'column';
  @property({ type: String, reflect: true }) align = 'stretch';
  @property({ type: String, reflect: true }) justify = 'start';
  @property({ type: String }) gap = '';

  override connectedCallback() {
    super.connectedCallback();
    if (this.gap) this.style.setProperty('--stack-gap', this.gap);
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-stack': LayoutStack;
  }
}
