import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-button> — Interactive button with variants, sizes, types, and loading state.
 *
 * Better than OpenUI's Button:
 * - Loading state with spinner
 * - Icon slots (prefix/suffix)
 * - Full keyboard accessibility
 * - All 8 states: default, hover, active, focus-visible, disabled, loading
 * - 3 variants × 3 sizes × 2 types = 18 visual combinations
 */
@customElement('cg-button')
export class CgButton extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: inline-flex;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-8, 8px);
      border: 1px solid transparent;
      cursor: pointer;
      font-family: inherit;
      font-weight: var(--cg-font-weight-semibold, 600);
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      transition:
        transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        background-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        border-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        box-shadow var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      -webkit-font-smoothing: antialiased;
      position: relative;
      overflow: hidden;
    }

    /* Press scale — HeroUI pattern */
    button:active:not(:disabled) {
      transform: scale(var(--cg-interaction-press-scale, 0.97));
    }

    /* Focus ring — dual layer */
    button:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
    }

    /* ── Sizes ── */
    :host([size="sm"]) button {
      padding: var(--cg-spacing-6, 6px) var(--cg-spacing-12, 12px);
      font-size: var(--cg-font-size-xs, 12px);
      border-radius: var(--cg-border-radius-100, 8px);
      min-height: var(--cg-component-button-height-sm, 32px);
    }
    :host([size="md"]) button {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px);
      font-size: var(--cg-font-size-sm, 14px);
      border-radius: var(--cg-border-radius-150, 12px);
      min-height: var(--cg-component-button-height-md, 38px);
    }
    :host([size="lg"]) button {
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-24, 24px);
      font-size: var(--cg-font-size-md, 18px);
      border-radius: var(--cg-border-radius-150, 12px);
      min-height: var(--cg-component-button-height-lg, 44px);
    }

    /* ── Primary variant ── */
    :host([variant="primary"]) button {
      background: var(--cg-color-action-primary-background-default, #dfff61);
      color: var(--cg-color-action-primary-text-default, #000000);
      border-color: var(--cg-color-action-primary-border-default, #dfff61);
    }
    :host([variant="primary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-primary-background-hover, #e2ff70);
    }
    :host([variant="primary"]) button:not(:disabled):active {
      background: var(--cg-color-action-primary-background-active, #dfff61);
      transform: scale(var(--cg-interaction-press-scale, 0.97));
    }

    /* ── Secondary variant ── */
    :host([variant="secondary"]) button {
      background: var(--cg-color-action-secondary-background-default, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
      border-color: var(--cg-color-surface-container-border, #27272a);
    }
    :host([variant="secondary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-secondary-background-hover, #3f3f46);
    }
    :host([variant="secondary"]) button:not(:disabled):active {
      background: var(--cg-color-action-secondary-background-active, #3f3f46);
      transform: scale(var(--cg-interaction-press-scale, 0.97));
    }

    /* ── Tertiary (ghost) variant ── */
    :host([variant="tertiary"]) button {
      background: transparent;
      color: var(--cg-text-accent, #e5ff6b);
      border-color: transparent;
    }
    :host([variant="tertiary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-tertiary-background-hover, #27272a);
    }
    :host([variant="tertiary"]) button:not(:disabled):active {
      background: var(--cg-overlay-accent-medium, rgba(223, 255, 97, 0.18));
      transform: scale(var(--cg-interaction-press-scale, 0.97));
    }

    /* ── Danger type ── */
    :host([type="danger"]) button {
      background: var(--cg-color-status-error-background-default, rgba(239, 68, 68, 0.12));
      color: var(--cg-text-danger, #ef4444);
      border-color: var(--cg-color-status-error-border-default, rgba(239, 68, 68, 0.25));
    }
    :host([type="danger"][variant="primary"]) button {
      background: var(--cg-text-danger, #ef4444);
      color: var(--cg-gray-white, #ffffff);
      border-color: var(--cg-text-danger, #ef4444);
    }
    :host([type="danger"]) button:not(:disabled):hover {
      filter: brightness(0.95);
    }

    /* ── Disabled ── */
    button:disabled {
      opacity: 0.5;
      cursor: var(--cg-cursor-not-allowed, not-allowed);
      transform: none !important;
    }

    /* ── Loading ── */
    :host([loading]) button {
      color: transparent;
      pointer-events: none;
    }
    .spinner {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    :host([loading]) .spinner { color: var(--cg-color-action-primary-text-default, #000000); }
    :host([loading][variant="secondary"]) .spinner { color: var(--cg-color-surface-base-text, #fafafa); }
    :host([loading][variant="tertiary"]) .spinner { color: var(--cg-text-accent, #e5ff6b); }

    @keyframes spin { to { transform: rotate(360deg); } }
    @media (prefers-reduced-motion: reduce) {
      .spinner { animation-duration: 1.5s; }
      button { transition: none; }
    }

    /* ── Full width ── */
    :host([full]) { display: flex; width: 100%; }
    :host([full]) button { width: 100%; }

    /* ── Icon slots ── */
    ::slotted([slot="prefix"]), ::slotted([slot="suffix"]) {
      display: inline-flex;
      flex-shrink: 0;
    }
  `;

  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) type: 'normal' | 'danger' = 'normal';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) full = false;
  @property() label = '';

  override render() {
    return html`
      <button
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? 'true' : 'false'}
        aria-label=${this.label || nothing}
      >
        ${this.loading ? html`<span class="spinner"></span>` : nothing}
        <slot name="prefix"></slot>
        <slot>${this.label}</slot>
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-button': CgButton;
  }
}
