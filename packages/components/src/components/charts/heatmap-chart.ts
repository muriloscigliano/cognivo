import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('heatmap-chart')
export class Heatmap-chart extends LitElement {
  static override styles = [baseStyles, css`:host { display: block; width: 100%; height: 200px; }`];
  @property({ type: Array }) data = [];
  override render() {
    return html`<svg width="100%" height="100%"><slot></slot></svg>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'heatmap-chart': Heatmap-chart; } }
