import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion, spinKeyframes } from '../../styles/index.js';

/**
 * @element cg-button
 * A button with variants, sizes, loading state, and press feedback.
 *
 * @example
 * ```html
 * <cg-button variant="primary" size="md">Click me</cg-button>
 * <cg-button variant="secondary" loading>Saving...</cg-button>
 * <cg-button type="danger"><span slot="prefix">[trash icon]</span>Delete</cg-button>
 * ```
 *
 * @slot - Default slot for button text/content
 * @slot prefix - Icon or content before the label
 * @slot suffix - Icon or content after the label
 *
 * @cssprop --cg-color-action-primary-background-default - Primary button background color
 * @cssprop --cg-component-button-height-md - Button height (md size, 48px)
 * @cssprop --cg-interaction-press-scale - Scale on press/active (0.97)
 * @cssprop --cg-transition-duration-fast - Color transition speed
 */
@customElement('cg-button')
export class CgButton extends LitElement {
  static override styles = [hostBase, reducedMotion, spinKeyframes, css`
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-8);
      border: var(--cg-border-width-50) solid transparent;
      cursor: pointer;
      font-family: inherit;
      font-weight: var(--cg-font-weight-medium);
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      transition:
        background-color var(--cg-transition-duration-fast) ease,
        border-color var(--cg-transition-duration-fast) ease,
        box-shadow var(--cg-transition-duration-fast) ease,
        transform var(--cg-transition-duration-fast) ease;
      -webkit-font-smoothing: antialiased;
      position: relative;
    }

    /* Press scale */
    button:active:not(:disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }

    /* Focus ring — dual-layer */
    button:focus-visible {
      box-shadow:
        0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
      outline: none;
    }

    /* ── Sizes ── */
    :host([size="sm"]) button {
      padding: 0 var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      border-radius: var(--cg-component-button-radius-sm);
      height: var(--cg-component-button-height-sm);
    }
    :host([size="md"]) button {
      padding: 0 var(--cg-spacing-16);
      font-size: var(--cg-font-size-sm);
      border-radius: var(--cg-component-button-radius-md);
      height: var(--cg-component-button-height-md);
    }
    :host([size="lg"]) button {
      padding: 0 var(--cg-spacing-24);
      font-size: var(--cg-font-size-base);
      border-radius: var(--cg-component-button-radius-lg);
      height: var(--cg-component-button-height-lg);
    }

    /* ── Rounded overrides ── */
    :host([rounded="none"]) button { border-radius: 0; }
    :host([rounded="sm"]) button { border-radius: var(--cg-component-button-radius-sm); }
    :host([rounded="md"]) button { border-radius: var(--cg-component-button-radius-md); }
    :host([rounded="lg"]) button { border-radius: var(--cg-component-button-radius-lg); }
    :host([rounded="full"]) button { border-radius: var(--cg-border-radius-full); }

    /* ── Primary variant ── */
    :host([variant="primary"]) button {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-border-default);
    }
    :host([variant="primary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-primary-background-hover);
    }

    /* ── Secondary variant ── */
    :host([variant="secondary"]) button {
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-action-secondary-text-default);
      border-color: var(--cg-color-action-secondary-border-default);
    }
    :host([variant="secondary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-secondary-background-hover);
    }

    /* ── Tertiary (ghost) variant ── */
    :host([variant="tertiary"]) button {
      background: transparent;
      color: var(--cg-color-action-tertiary-text-default);
      border-color: transparent;
    }
    :host([variant="tertiary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-tertiary-background-hover);
    }

    /* ── Danger type ── */
    :host([type="danger"]) button {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([type="danger"][variant="primary"]) button {
      background: var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-inverse);
      border-color: transparent;
    }
    :host([type="danger"]) button:not(:disabled):hover {
      background: var(--cg-color-status-error-background-hover);
    }
    :host([type="danger"][variant="primary"]) button:not(:disabled):hover {
      background: var(--cg-color-status-error-background-hover);
    }

    /* ── Disabled ── */
    button:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ── Loading ── */
    :host([loading]) button {
      color: transparent;
      pointer-events: none;
    }
    .spinner {
      position: absolute;
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      border: var(--cg-border-width-100) solid currentColor;
      border-right-color: transparent;
      border-radius: var(--cg-border-radius-full);
      animation: spin var(--cg-transition-duration-slow) linear infinite;
    }
    :host([loading]) .spinner { color: var(--cg-color-action-primary-text-default); }
    :host([loading][variant="secondary"]) .spinner { color: var(--cg-color-action-secondary-text-default); }
    :host([loading][variant="tertiary"]) .spinner { color: var(--cg-color-action-tertiary-text-default); }

    /* ── Error state ── */
    :host([status="error"]) button {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([status="error"]) button:not(:disabled):hover {
      background: var(--cg-color-status-error-background-hover);
    }
    :host([status="error"]) .spinner { color: var(--cg-color-status-error-text-default); }

    /* ── Success state ── */
    :host([status="success"]) button {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
      border-color: var(--cg-color-status-success-border-default);
    }
    :host([status="success"]) button:not(:disabled):hover {
      background: var(--cg-color-status-success-background-hover);
    }
    :host([status="success"]) .spinner { color: var(--cg-color-status-success-text-default); }

    /* ── Full width ── */
    :host([full]) {
      display: block;
      width: 100%;
    }
    :host([full]) button {
      width: 100%;
    }
  `];

  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ reflect: true }) type: 'normal' | 'danger' = 'normal';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) full = false;
  @property({ reflect: true }) status: 'idle' | 'error' | 'success' = 'idle';
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
// touch Mon Apr 13 18:29:50 AEST 2026
