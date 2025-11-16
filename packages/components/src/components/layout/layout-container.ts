import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('layout-container')
export class LayoutContainer extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: var(--container-max-width, 1200px);
        margin: 0 auto;
        padding: var(--container-padding, var(--cg-spacing-24));
      }

      :host([size='sm']) { --container-max-width: 640px; }
      :host([size='md']) { --container-max-width: 768px; }
      :host([size='lg']) { --container-max-width: 1024px; }
      :host([size='xl']) { --container-max-width: 1280px; }
      :host([size='2xl']) { --container-max-width: 1536px; }
      :host([size='full']) { --container-max-width: 100%; }
    `,
  ];

  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' = 'lg';

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-container': LayoutContainer;
  }
}
