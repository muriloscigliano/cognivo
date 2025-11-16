import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles, animations } from '../../styles/base.js';

@customElement('source-attribution')
export class SourceAttribution extends LitElement {
  static override styles = [baseStyles, animations];
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'source-attribution': SourceAttribution; } }
