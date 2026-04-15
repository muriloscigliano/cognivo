import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-collapsible
 * Simple expand/collapse with smooth grid-template-rows animation.
 * Lighter than cg-accordion (single section only).
 *
 * @example
 * ```html
 * <cg-collapsible>
 *   <span slot="trigger">Show details</span>
 *   <p>Additional content...</p>
 * </cg-collapsible>
 * ```
 *
 * @slot trigger - Clickable header element
 * @slot - Collapsible body content
 *
 * @fires {CustomEvent<{open: boolean}>} cg-collapsible-toggle
 */
@customElement('cg-collapsible')
export class CgCollapsible extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .trigger {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      width: 100%;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-collapsible-radius);
      color: var(--cg-color-surface-base-text);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      text-align: left;
      cursor: pointer;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .trigger:hover:not(:disabled) {
      background: var(--cg-color-action-tertiary-background-hover);
      border-color: var(--cg-color-input-border-hover);
    }
    .trigger:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 4px var(--cg-color-focus-ring);
    }
    .trigger:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .chevron {
      margin-left: auto;
      color: var(--cg-color-surface-container-outlined);
      transition:
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .trigger:hover .chevron { color: var(--cg-color-surface-base-text); }
    :host([open]) .chevron { color: var(--cg-color-action-primary-background-default); }
    .trigger:active:not(:disabled) { transform: scale(0.995); }
    :host([open]) .chevron {
      transform: rotate(180deg);
    }

    .body-wrap {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    :host([open]) .body-wrap {
      grid-template-rows: 1fr;
    }
    .body {
      overflow: hidden;
      padding: 0 var(--cg-spacing-16);
    }
    :host([open]) .body {
      padding: var(--cg-spacing-16);
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _toggle(): void {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('cg-collapsible-toggle', {
      detail: { open: this.open },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <button
        type="button"
        class="trigger"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls="body"
        ?disabled=${this.disabled}
        @click=${this._toggle}
      >
        <slot name="trigger">Toggle</slot>
        <svg class="chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 5l4 4 4-4"/>
        </svg>
      </button>
      <div class="body-wrap">
        <div class="body" id="body" role="region">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-collapsible': CgCollapsible;
  }
}
