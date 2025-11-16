import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('forecast-badge')
export class ForecastBadge extends LitElement {
  static override styles = [baseStyles, css`:host { display: block; }`];
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'forecast-badge': ForecastBadge; } }
