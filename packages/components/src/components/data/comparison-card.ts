import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('comparison-card')
export class Comparison-card extends LitElement {
  static override styles = [baseStyles, css`:host { display: block; }`];
  @property({ type: Array }) data = [];
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'comparison-card': Comparison-card; } }
