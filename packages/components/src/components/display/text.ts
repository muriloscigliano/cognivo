import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('cg-text')
export class CgText extends LitElement {
  static override styles = [
    baseStyles,
    css`:host { display: inline; font-family: inherit; font-size: var(--text-size, inherit); color: var(--text-color, inherit); }
    :host([size='xs']) { --text-size: inherit; }
    :host([size='sm']) { --text-size: var(--cg-font-size-sm); }
    :host([size='md']) { --text-size: var(--cg-font-size-md); }
    :host([size='lg']) { --text-size: var(--cg-font-size-lg); }
    :host([variant='secondary']) { --text-color: var(--cg-gray-500); }
    :host([variant='muted']) { --text-color: var(--cg-gray-500); opacity: 0.7; }`,
  ];
  @property({ type: String, reflect: true }) size = 'base';
  @property({ type: String, reflect: true }) variant = 'primary';
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'cg-text': CgText; } }
