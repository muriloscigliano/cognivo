import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('cg-chip')
export class CgChip extends LitElement {
  static override styles = [baseStyles, css`:host { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: var(--cg-Border-radius-full); font-size: var(--cg-font-size-sm); background: var(--cg-gray-100); color: inherit; }`];
  @property({ type: Boolean }) removable = false;
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'cg-chip': CgChip; } }
