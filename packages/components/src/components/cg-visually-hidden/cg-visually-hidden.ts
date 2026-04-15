import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * @element cg-visually-hidden
 * Accessibility helper that renders children for assistive technology but hides them visually.
 *
 * @slot - Content to be visually hidden but accessible to screen readers.
 */
@customElement('cg-visually-hidden')
export class CgVisuallyHidden extends LitElement {
  static override styles = css`
    :host {
      display: inline;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  override render() {
    return html`<span class="sr-only"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-visually-hidden': CgVisuallyHidden;
  }
}
