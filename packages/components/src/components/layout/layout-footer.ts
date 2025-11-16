import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('layout-footer')
export class LayoutFooter extends LitElement {
  static override styles = [
    baseStyles,
    css`:host { display: block; padding: var(--cg-spacing-32) var(--cg-spacing-24); border-top: 1px solid var(--cg-gray-100); background: inherit; }`
  ];
  override render() { return html`<slot></slot>`; }
}

declare global { interface HTMLElementTagNameMap { 'layout-footer': LayoutFooter; } }
