import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('group-selector')
export class GroupSelector extends LitElement {
  static override styles = [baseStyles, css`:host { display: block; }`];
  @property({ type: String }) value = '';
  @state() private selected = '';
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'group-selector': GroupSelector; } }
