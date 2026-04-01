import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion, spinKeyframes } from '../../styles/index.js';

/**
 * <cg-spinner> — Spinning loading indicator.
 *
 * Features:
 * - CSS-only spinning ring (border-top colored)
 * - Smooth rotation animation
 * - Size variants (xs, sm, md, lg, xl)
 * - Color variants (default, accent, white)
 * - aria-label for screen readers
 * - prefers-reduced-motion: pulsing instead of spinning
 */
@customElement('cg-spinner')
export class CgSpinner extends LitElement {
  static override styles = [hostBase, reducedMotion, spinKeyframes, css`
    :host {
      align-items: center;
      justify-content: center;
    }

    .spinner {
      border-radius: 50%;
      border-style: solid;
      border-color: var(--cg-color-surface-base-border, #27272a);
      animation: spin 0.8s linear infinite;
    }

    /* ── Sizes ── */
    :host([size="xs"]) .spinner {
      width: 14px;
      height: 14px;
      border-width: 2px;
    }
    :host([size="sm"]) .spinner {
      width: 20px;
      height: 20px;
      border-width: 2px;
    }
    :host([size="md"]) .spinner {
      width: 28px;
      height: 28px;
      border-width: 3px;
    }
    :host([size="lg"]) .spinner {
      width: 40px;
      height: 40px;
      border-width: 3px;
    }
    :host([size="xl"]) .spinner {
      width: 56px;
      height: 56px;
      border-width: 4px;
    }

    /* ── Color variants ── */
    :host([color="default"]) .spinner {
      border-top-color: var(--cg-color-text-secondary, #a1a1aa);
    }
    :host([color="accent"]) .spinner {
      border-top-color: var(--cg-brand-ai-accent, #dfff61);
    }
    :host([color="white"]) .spinner {
      border-top-color: var(--cg-color-text-primary, #fafafa);
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
