import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-loading-indicator')
export class AiLoadingIndicator extends LitElement {
  static override styles = [baseStyles, css`:host { display: block; }`];
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'ai-loading-indicator': AiLoadingIndicator; } }
