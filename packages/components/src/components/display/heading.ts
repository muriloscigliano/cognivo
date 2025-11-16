import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('cg-heading')
export class CgHeading extends LitElement {
  static override styles = [baseStyles, css`:host { display: block; font-family: inherit; font-weight: inherit; margin: 0; }
    :host([level='1']) { font-size: inherit; }
    :host([level='2']) { font-size: inherit; }
    :host([level='3']) { font-size: inherit; }
    :host([level='4']) { font-size: var(--cg-font-size-lg); }
    :host([level='5']) { font-size: inherit; }
    :host([level='6']) { font-size: var(--cg-font-size-sm); }`];
  @property({ type: String, reflect: true }) level: '1'|'2'|'3'|'4'|'5'|'6' = '2';
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'cg-heading': CgHeading; } }
