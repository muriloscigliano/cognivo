import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('cg-badge')
export class CgBadge extends LitElement {
  static override styles = [baseStyles, css`:host { display: inline-flex; align-items: center; padding: 4px 8px; border-radius: var(--cg-Border-radius-full); font-size: inherit; font-weight: inherit; background: var(--cg-gray-100); color: inherit; }
    :host([variant='primary']) { background: inherit; color: white; }
    :host([variant='success']) { background: inherit; color: white; }
    :host([variant='warning']) { background: inherit; color: white; }
    :host([variant='danger']) { background: inherit; color: white; }`];
  @property({ type: String, reflect: true }) variant = 'default';
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'cg-badge': CgBadge; } }
