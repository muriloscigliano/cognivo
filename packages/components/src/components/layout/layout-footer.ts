import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('layout-footer')
export class LayoutFooter extends LitElement {
  static override styles = [
    baseStyles,
    css`:host { display: block; padding: ${tokens.spacing.xl} ${tokens.spacing.lg}; border-top: 1px solid ${tokens.color.gray100}; background: ${tokens.color.gray50}; }`
  ];
  override render() { return html`<slot></slot>`; }
}

declare global { interface HTMLElementTagNameMap { 'layout-footer': LayoutFooter; } }
