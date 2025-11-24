import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';

@customElement('cg-icon')
export class CgIcon extends LitElement {
  static override styles = [baseStyles, css`
host { display: inline-flex; width: 24px; height: 24px; }`];
  @property({ type: String }) name = '';
  override render() { return html`<slot>${this.name}</slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'cg-icon': CgIcon; } }
