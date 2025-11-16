import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles, animations } from '../../styles/base.js';

@customElement('ai-thinking-animation')
export class Ai-thinking-animation extends LitElement {
  static override styles = [baseStyles, animations];
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'ai-thinking-animation': Ai-thinking-animation; } }
