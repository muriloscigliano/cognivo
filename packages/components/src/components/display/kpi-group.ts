import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('kpi-group')
export class KpiGroup extends LitElement {
  static override styles = [baseStyles, css`:host { display: inline-block; }`];
  @property({ type: String }) value = '';
  override render() { return html`<slot>${this.value}</slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'kpi-group': KpiGroup; } }
