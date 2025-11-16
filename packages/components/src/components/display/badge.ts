import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('cg-badge')
export class CgBadge extends LitElement {
  static override styles = [baseStyles, css`:host { display: inline-flex; align-items: center; padding: 4px 8px; border-radius: ${tokens.radius.full}; font-size: ${tokens.fontSize.xs}; font-weight: ${tokens.fontWeight.medium}; background: ${tokens.color.gray100}; color: ${tokens.color.gray900}; }
    :host([variant='primary']) { background: ${tokens.color.aiAccent}; color: white; }
    :host([variant='success']) { background: ${tokens.color.success}; color: white; }
    :host([variant='warning']) { background: ${tokens.color.warning}; color: white; }
    :host([variant='danger']) { background: ${tokens.color.danger}; color: white; }`];
  @property({ type: String, reflect: true }) variant = 'default';
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'cg-badge': CgBadge; } }
