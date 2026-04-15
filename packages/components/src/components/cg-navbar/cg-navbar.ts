import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-navbar
 * Modern top navigation bar with glass morphism, animated hover states,
 * sliding underline indicator, and responsive mobile menu.
 *
 * @example
 * ```html
 * <cg-navbar sticky variant="glass">
 *   <span slot="brand">Cognivo</span>
 *   <a slot="start" href="/docs" class="active">Docs</a>
 *   <a slot="start" href="/components">Components</a>
 *   <cg-button slot="end" variant="primary">Sign in</cg-button>
 * </cg-navbar>
 * ```
 *
 * @slot brand - Logo/brand area (leftmost)
 * @slot start - Primary navigation links
 * @slot center - Optional center content (search, etc.)
 * @slot end - Actions (buttons, profile)
 */
@customElement('cg-navbar')
export class CgNavbar extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      width: 100%;
    }

    nav {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-24);
      height: var(--cg-component-navbar-height);
      padding: 0 var(--cg-component-navbar-padding-x);
      background: var(--cg-color-surface-base-background);
      color: var(--cg-color-surface-base-text);
      transition: backdrop-filter var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }

    :host([sticky]) nav {
      position: sticky;
      top: 0;
      z-index: var(--cg-z-index-500);
    }

    :host([bordered]) nav {
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    :host([elevated]) nav {
      box-shadow: var(--cg-shadow-elevation-md);
    }

    /* Glass morphism — default modern look */
    :host([variant="glass"]) nav {
      background: color-mix(in srgb, var(--cg-color-surface-base-background) 72%, transparent);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    :host([variant="transparent"]) nav {
      background: transparent;
    }

    /* Gradient border accent — premium variant */
    :host([variant="gradient"]) nav {
      background: var(--cg-color-surface-base-background);
      position: relative;
    }
    :host([variant="gradient"]) nav::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--cg-border-width-50);
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--cg-color-action-primary-background-default) 50%,
        transparent 100%
      );
      opacity: 0.6;
    }

    /* Pill variant — wraps nav in a floating pill container */
    :host([variant="pill"]) nav {
      margin: var(--cg-spacing-12) var(--cg-spacing-16);
      height: calc(var(--cg-component-navbar-height) - var(--cg-spacing-16));
      padding: 0 var(--cg-spacing-20);
      background: color-mix(in srgb, var(--cg-color-surface-base-background) 80%, transparent);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      box-shadow: var(--cg-shadow-elevation-lg);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-semibold);
      letter-spacing: -0.01em;
      flex-shrink: 0;
      color: var(--cg-color-surface-base-text);
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .brand:hover { opacity: 0.8; }

    .start {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-2);
      padding: var(--cg-spacing-4);
      background: color-mix(in srgb, var(--cg-color-surface-container-background) 50%, transparent);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      position: relative;
    }

    /* Minimal nav (no pill container) */
    :host([nav-style="minimal"]) .start {
      padding: 0;
      background: transparent;
      border: none;
      gap: var(--cg-spacing-6);
    }

    .center {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 0;
    }

    .end {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      flex-shrink: 0;
      margin-left: auto;
    }

    /* Nav link styles — default (inside pill container) */
    ::slotted(a[slot="start"]) {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      text-decoration: none;
      border-radius: var(--cg-border-radius-full);
      transition:
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    ::slotted(a[slot="start"]:hover) {
      color: var(--cg-color-surface-base-text);
      background: color-mix(in srgb, var(--cg-color-surface-cards-background) 60%, transparent);
    }
    ::slotted(a[slot="start"]:active) {
      transform: scale(0.97);
    }
    ::slotted(a[slot="start"].active) {
      color: var(--cg-color-surface-base-text);
      background: var(--cg-color-surface-cards-background);
      box-shadow: var(--cg-shadow-elevation-sm);
    }
    .menu-btn:active { transform: scale(0.92); }

    /* Underline variant — classic sliding underline */
    :host([nav-style="underline"]) .start {
      padding: 0;
      background: transparent;
      border: none;
      gap: var(--cg-spacing-24);
    }
    :host([nav-style="underline"]) ::slotted(a[slot="start"]) {
      padding: var(--cg-spacing-20) 0;
      border-radius: 0;
      position: relative;
    }
    :host([nav-style="underline"]) ::slotted(a[slot="start"]:hover) {
      background: transparent;
    }
    /* Underline variant — uses border-bottom since ::after on slotted isn't supported */
    :host([nav-style="underline"]) ::slotted(a[slot="start"]) {
      border-bottom: var(--cg-border-width-100) solid transparent;
      padding-bottom: calc(var(--cg-spacing-20) - var(--cg-border-width-100));
    }
    :host([nav-style="underline"]) ::slotted(a[slot="start"]:hover) {
      border-bottom-color: var(--cg-color-action-primary-background-default);
      background: transparent;
    }
    :host([nav-style="underline"]) ::slotted(a[slot="start"].active) {
      border-bottom-color: var(--cg-color-action-primary-background-default);
      background: transparent;
      box-shadow: none;
      color: var(--cg-color-surface-base-text);
    }

    /* Mobile menu button */
    .menu-btn {
      display: none;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      padding: 0;
      border: none;
      background: transparent;
      color: var(--cg-color-surface-base-text);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .menu-btn:hover {
      background: var(--cg-color-surface-cards-background);
    }
    .menu-btn:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    /* Mobile menu panel */
    .mobile-panel {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      padding: var(--cg-spacing-16);
      background: var(--cg-color-surface-base-background);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      box-shadow: var(--cg-shadow-elevation-xl);
      flex-direction: column;
      gap: var(--cg-spacing-6);
      animation: slideDown var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }

    :host([mobile-open]) .mobile-panel {
      display: flex;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(calc(-1 * var(--cg-spacing-8))); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 768px) {
      :host([responsive]) .start,
      :host([responsive]) .center {
        display: none;
      }
      :host([responsive]) .menu-btn {
        display: inline-flex;
      }
    }
  `];

  @property({ type: Boolean, reflect: true }) sticky = false;
  @property({ type: Boolean, reflect: true }) bordered = false;
  @property({ type: Boolean, reflect: true }) elevated = false;
  @property({ type: Boolean, reflect: true }) responsive = false;
  @property({ reflect: true }) variant: 'default' | 'transparent' | 'glass' | 'gradient' | 'pill' = 'default';
  @property({ reflect: true, attribute: 'nav-style' }) navStyle: 'default' | 'minimal' | 'underline' = 'default';
  @property({ type: Boolean, reflect: true, attribute: 'mobile-open' }) mobileOpen = false;

  private _toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
    this.dispatchEvent(new CustomEvent('cg-navbar-toggle', {
      detail: { open: this.mobileOpen },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <nav role="navigation" aria-label="Main navigation">
        <div class="brand"><slot name="brand"></slot></div>
        <div class="start"><slot name="start"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="end">
          <slot name="end"></slot>
          <button
            class="menu-btn"
            type="button"
            aria-label="Toggle menu"
            aria-expanded=${this.mobileOpen ? 'true' : 'false'}
            @click=${this._toggleMobile}
          >
            ${this.mobileOpen
              ? html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`
              : html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`
            }
          </button>
        </div>
        <div class="mobile-panel">
          <slot name="mobile-menu"></slot>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-navbar': CgNavbar;
  }
}
