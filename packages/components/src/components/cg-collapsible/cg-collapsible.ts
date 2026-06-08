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
    :host {
      display: block;
      overflow: hidden;
    }

    /* ── Variant: card (default) — bordered surface ── */
    :host([variant="card"]) {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-collapsible-radius);
    }
    /* Open card: structural divider under the trigger so the expanded state
       reads beyond the chevron alone (card is the default variant). */
    :host([variant="card"][open]) .trigger {
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }

    /* ── Variant: flush — no chrome, just hover affordance ── */
    :host([variant="flush"]) .trigger {
      border-bottom: var(--cg-border-width-50) solid transparent;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    :host([variant="flush"][open]) .trigger {
      border-bottom-color: var(--cg-color-surface-cards-divider);
    }

    .trigger {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      width: 100%;
      background: transparent;
      border: none;
      color: var(--cg-color-surface-base-text);
      font-family: inherit;
      font-weight: var(--cg-font-weight-medium);
      text-align: left;
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    /* ── Sizes ── */
    :host([size="sm"]) .trigger {
      padding: var(--cg-component-collapsible-trigger-padding-y-sm) var(--cg-component-collapsible-trigger-padding-x-sm);
      font-size: var(--cg-component-collapsible-font-size-sm);
    }
    :host([size="md"]) .trigger {
      padding: var(--cg-component-collapsible-trigger-padding-y-md) var(--cg-component-collapsible-trigger-padding-x-md);
      font-size: var(--cg-component-collapsible-font-size-md);
    }
    :host([size="lg"]) .trigger {
      padding: var(--cg-component-collapsible-trigger-padding-y-lg) var(--cg-component-collapsible-trigger-padding-x-lg);
      font-size: var(--cg-component-collapsible-font-size-lg);
    }

    .trigger:hover:not(:disabled) {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .trigger:focus-visible {
      outline: none;
      box-shadow:
        inset 0 0 0 var(--cg-spacing-2) var(--cg-color-focus-ring-offset),
        inset 0 0 0 var(--cg-spacing-4) var(--cg-color-focus-ring);
    }
    .trigger:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .chevron {
      margin-left: auto;
      color: var(--cg-color-surface-container-outlined);
      transition:
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-spring),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .trigger:hover .chevron { color: var(--cg-color-surface-base-text); }
    .trigger:active:not(:disabled) { transform: scale(0.995); }
    :host([open]) .chevron {
      color: var(--cg-color-accent-text);
      transform: rotate(180deg);
    }

    .body-wrap {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    :host([open]) .body-wrap {
      grid-template-rows: 1fr;
    }
    .body {
      overflow: hidden;
    }
    :host([size="sm"]) .body { padding: 0 var(--cg-component-collapsible-body-padding-sm); }
    :host([size="md"]) .body { padding: 0 var(--cg-component-collapsible-body-padding-md); }
    :host([size="lg"]) .body { padding: 0 var(--cg-component-collapsible-body-padding-lg); }
    :host([open][size="sm"]) .body { padding: var(--cg-component-collapsible-body-padding-sm); }
    :host([open][size="md"]) .body { padding: var(--cg-component-collapsible-body-padding-md); }
    :host([open][size="lg"]) .body { padding: var(--cg-component-collapsible-body-padding-lg); }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) variant: 'card' | 'flush' = 'card';

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
        <div class="body" id="body">
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
