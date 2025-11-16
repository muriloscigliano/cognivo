import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('layout-header')
export class LayoutHeader extends LitElement {
  static override styles = [
    baseStyles,
    css`:host { display: flex; align-items: center; justify-content: space-between; padding: var(--cg-spacing-16) var(--cg-spacing-24); border-bottom: 1px solid var(--cg-gray-100); background: inherit; }`
  ];
  override render() { return html`<slot></slot>`; }
}

declare global { interface HTMLElementTagNameMap { 'layout-header': LayoutHeader; } }
