import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('dashboard-grid')
export class DashboardGrid extends LitElement {
  static override styles = [
    baseStyles,
    css`:host { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: ${tokens.spacing.lg}; padding: ${tokens.spacing.lg}; }`
  ];
  override render() { return html`<slot></slot>`; }
}

declare global { interface HTMLElementTagNameMap { 'dashboard-grid': DashboardGrid; } }
