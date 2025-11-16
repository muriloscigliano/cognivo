import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles, animations } from '../../styles/base.js';

@customElement('confidence-display')
export class ConfidenceDisplay extends LitElement {
  static override styles = [baseStyles, animations];
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'confidence-display': ConfidenceDisplay; } }
