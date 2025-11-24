import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('cg-chip')
export class CgChip extends LitElement {
  static override styles = [baseStyles, css`
host { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: ${tokens.radius.full}; font-size: ${tokens.fontSize.sm}; background: ${tokens.color.gray100}; color: ${tokens.color.gray900}; }`];
  @property({ type: Boolean }) removable = false;
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'cg-chip': CgChip; } }
