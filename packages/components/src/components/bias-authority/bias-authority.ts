import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element bias-authority
 * Inline endorsement / trust badge ("Verified by X", "Certified", "Featured in").
 * Optional link mode via `href`. Slot hosts tooltip-style description.
 *
 * @example
 * ```html
 * <bias-authority source="Wirecutter" kind="featured"></bias-authority>
 * <bias-authority source="ISO 27001" kind="certified" href="#"></bias-authority>
 * ```
 *
 * @cssprop --cg-component-bias-authority-radius
 * @cssprop --cg-component-bias-authority-padding
 */
@customElement('bias-authority')
export class BiasAuthority extends LitElement {
  static biasId = 'authority-bias' as const;

  static override styles = [hostBase, reducedMotion, css`
    :host { align-items: center; position: relative; }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      padding: var(--cg-component-bias-authority-padding) var(--cg-spacing-12);
      border-radius: var(--cg-component-bias-authority-radius);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-container-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      text-decoration: none;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    a.badge:hover { border-color: var(--cg-color-input-border-hover); }
    a.badge:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring-offset), 0 0 0 4px var(--cg-color-focus-ring);
    }

    :host([kind="verified"]) .icon { color: var(--cg-color-status-success-text-default); }
    :host([kind="certified"]) .icon { color: var(--cg-color-status-info-text-default); }
    :host([kind="endorsed"]) .icon { color: var(--cg-color-status-warning-text-default); }
    :host([kind="featured"]) .icon { color: var(--cg-color-accent-text); }

    .icon { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); flex-shrink: 0; }

    .source { font-weight: var(--cg-font-weight-semibold); color: var(--cg-color-surface-base-text); }

    .tip {
      position: absolute;
      left: 0;
      top: calc(100% + var(--cg-spacing-4));
      z-index: 10;
      display: none;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      background: var(--cg-color-surface-cards-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-tooltip-radius);
      max-width: 280px;
      pointer-events: none;
      box-shadow: var(--cg-elevation-2);
    }
    :host(:hover) .tip,
    :host(:focus-within) .tip { display: block; }
  `];

  @property() source = '';
  @property({ reflect: true }) kind: 'verified' | 'endorsed' | 'certified' | 'featured' = 'verified';
  @property() icon = '';
  @property() href = '';

  private _iconSvg() {
    // Default icon per kind. Consumer can override via `icon` slot.
    if (this.kind === 'certified') {
      return svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2.5 5 5.5.8-4 4 1 5.5L12 14.8 7 17.3l1-5.5-4-4L9.5 7z"></path></svg>`;
    }
    if (this.kind === 'featured') {
      return svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v6a8 8 0 11-16 0V4z"></path><path d="M8 20h8"></path></svg>`;
    }
    if (this.kind === 'endorsed') {
      return svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 11V5a2 2 0 014 0v6h3l2 4v3a2 2 0 01-2 2H9l-2-5V11z"></path></svg>`;
    }
    // verified default
    return svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2 2 3-1 1 3 3 1-1 3 1 3-3 1-1 3-3-1-2 2-2-2-3 1-1-3-3-1 1-3-1-3 3-1 1-3 3 1z"></path><path d="M9 12l2 2 4-4"></path></svg>`;
  }

  override render() {
    const ariaLabel = `${this.kind} by ${this.source}`;
    const inner = html`
      <slot name="icon">${this._iconSvg()}</slot>
      <span aria-hidden="true"><span class="source">${this.source}</span></span>
    `;
    const badge = this.href
      ? html`<a class="badge" href=${this.href} role="note" aria-label=${ariaLabel}>${inner}</a>`
      : html`<span class="badge" role="note" aria-label=${ariaLabel} tabindex="0">${inner}</span>`;

    return html`
      ${badge}
      <span class="tip" role="tooltip"><slot>${nothing}</slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bias-authority': BiasAuthority;
  }
}
