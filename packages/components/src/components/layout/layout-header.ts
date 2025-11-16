import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('layout-header')
export class LayoutHeader extends LitElement {
  static override styles = [
    baseStyles,
    css`:host { display: flex; align-items: center; justify-content: space-between; padding: ${tokens.spacing.md} ${tokens.spacing.lg}; border-bottom: 1px solid ${tokens.color.gray100}; background: ${tokens.color.grayWhite}; }`
  ];
  override render() { return html`<slot></slot>`; }
}

declare global { interface HTMLElementTagNameMap { 'layout-header': LayoutHeader; } }
