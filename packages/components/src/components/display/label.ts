import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('cg-label')
export class CgLabel extends LitElement {
  static override styles = [baseStyles, css`:host { display: inline-block; font-size: var(--cg-font-size-sm); font-weight: inherit; color: var(--cg-gray-500); margin-bottom: 4px; }`];
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'cg-label': CgLabel; } }
