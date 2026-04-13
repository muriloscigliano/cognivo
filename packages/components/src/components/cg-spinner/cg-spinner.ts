import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion, spinKeyframes } from '../../styles/index.js';

/**
 * <cg-spinner> — Spinning loading indicator.
 *
 * @example
 * ```html
 * <cg-spinner size="md"></cg-spinner>
 * <cg-spinner size="lg" color="accent"></cg-spinner>
 * <cg-spinner size="sm" color="white"></cg-spinner>
 * ```
 *
 * @cssprop --cg-component-spinner-size-md - Spinner diameter (20px)
 * @cssprop --cg-color-loading-spinner-primary - Active arc color
 * @cssprop --cg-color-loading-spinner-secondary - Track color
 */
@customElement('cg-spinner')
export class CgSpinner extends LitElement {
  static override styles = [hostBase, reducedMotion, spinKeyframes, css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    :host([hidden]) { display: none; }

    .spinner {
      border-radius: 50%;
      border-style: solid;
      border-color: var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      animation: spin var(--cg-transition-duration-slow) linear infinite;
    }

    /* ── Sizes (Tier 3) ── */
    :host([size="xs"]) .spinner {
      width: var(--cg-component-spinner-size-xs);
      height: var(--cg-component-spinner-size-xs);
      border-width: var(--cg-border-width-100);
    }
    :host([size="sm"]) .spinner {
      width: var(--cg-component-spinner-size-sm);
      height: var(--cg-component-spinner-size-sm);
      border-width: var(--cg-border-width-100);
    }
    :host([size="md"]) .spinner {
      width: var(--cg-component-spinner-size-md);
      height: var(--cg-component-spinner-size-md);
      border-width: var(--cg-border-width-100);
    }
    :host([size="lg"]) .spinner {
      width: var(--cg-component-spinner-size-lg);
      height: var(--cg-component-spinner-size-lg);
      border-width: var(--cg-border-width-100);
    }
    :host([size="xl"]) .spinner {
      width: var(--cg-component-spinner-size-xl);
      height: var(--cg-component-spinner-size-xl);
      border-width: var(--cg-border-width-300);
    }

    /* ── Color variants ── */
    :host([color="default"]) .spinner {
      border-top-color: var(--cg-color-loading-spinner-primary);
    }
    :host([color="accent"]) .spinner {
      border-top-color: var(--cg-color-action-primary-background-default);
    }
    :host([color="white"]) .spinner {
      border-color: rgba(255, 255, 255, 0.25);
      border-top-color: rgba(255, 255, 255, 0.9);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Reduced motion: replace spin with gentle opacity pulse */
    @media (prefers-reduced-motion: reduce) {
      .spinner {
        animation: spinnerPulse 2s ease-in-out infinite !important;
      }

      @keyframes spinnerPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    }
  `];

  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: String, reflect: true }) color: 'default' | 'accent' | 'white' = 'default';
  @property({ type: String }) label = 'Loading';

  override render() {
    return html`
      <div
        class="spinner"
        role="status"
        aria-label="${this.label}"
      >
        <span class="sr-only">${this.label}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-spinner': CgSpinner;
  }
}
