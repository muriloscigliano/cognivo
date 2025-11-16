import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('layout-section')
export class LayoutSection extends LitElement {
  static override styles = [baseStyles, css`:host { display: block; padding: var(--cg-spacing-32) 0; }`];
  override render() { return html`<slot></slot>`; }
}

declare global { interface HTMLElementTagNameMap { 'layout-section': LayoutSection; } }
