import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('layout-sidebar')
export class LayoutSidebar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host { display: flex; gap: var(--cg-spacing-24); }
      .sidebar { width: var(--sidebar-width, 250px); flex-shrink: 0; }
      .main { flex: 1; min-width: 0; }
      @media (max-width: 768px) { :host { flex-direction: column; } .sidebar { width: 100%; } }
    `,
  ];

  @property({ type: String }) position: 'left' | 'right' = 'left';

  override render() {
    return this.position === 'left'
      ? html`<aside class="sidebar"><slot name="sidebar"></slot></aside><main class="main"><slot></slot></main>`
      : html`<main class="main"><slot></slot></main><aside class="sidebar"><slot name="sidebar"></slot></aside>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'layout-sidebar': LayoutSidebar; } }
