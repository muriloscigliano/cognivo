import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

/**
 * @element cg-card
 * Container with header/body/footer slots and three visual variants.
 *
 * @example
 * ```html
 * <cg-card variant="outlined" padding="md">
 *   <h3 slot="header">Title</h3>
 *   <p>Card body content here.</p>
 *   <div slot="footer"><cg-button>Action</cg-button></div>
 * </cg-card>
 * <cg-card variant="elevated" clickable>Clickable card</cg-card>
 * ```
 *
 * @slot - Default slot for body content
 * @slot header - Card header area (above body)
 * @slot footer - Card footer area (below body)
 *
 * @fires {CustomEvent} cg-card-click - When a clickable card is clicked
 *
 * @cssprop [--cg-color-surface-cards-background=#18181b] - Card background
 * @cssprop [--cg-color-surface-cards-border=#27272a] - Card border (outlined)
 * @cssprop [--cg-border-radius-200=24px] - Card border radius
 * @cssprop [--cg-interaction-hover-lift=-1px] - Clickable card hover lift
 */
@customElement('cg-card')
export class CgCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .card {
      border-radius: var(--cg-border-radius-200, 24px);
      overflow: hidden;
      transition: all var(--cg-motion-duration-normal, 150ms) ease;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    /* ── Variants ── */

    /* Elevated (default) — shadow, white bg */
    :host([variant="elevated"]) .card {
      background: var(--cg-color-surface-cards-background, #18181b);
      box-shadow:
        var(--cg-shadow-sm-x, 0px) var(--cg-shadow-sm-y, 1px) var(--cg-shadow-sm-blur, 4px) var(--cg-shadow-sm-spread, 0px) var(--cg-shadow-sm-Color, #616161);
    }

    /* Outlined — border, white bg */
    :host([variant="outlined"]) .card {
      background: var(--cg-color-surface-cards-background, #18181b);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-cards-border, #27272a);
    }

    /* Filled — subtle bg, no border */
    :host([variant="filled"]) .card {
      background: var(--cg-color-surface-container-background, #18181b);
    }

    /* ── Interactive (clickable) ── */
    :host([clickable]) .card {
      cursor: pointer;
    }
    :host([clickable]) .card:hover {
      box-shadow: var(--cg-shadow-md-x, 0px) var(--cg-shadow-md-y, 4px) var(--cg-shadow-md-blur, 12px) var(--cg-shadow-md-spread, 0px) var(--cg-shadow-md-Color, #000000);
      transform: translateY(var(--cg-interaction-hover-lift, -1px));
    }
    :host([clickable]) .card:active {
      transform: translateY(0);
      box-shadow: var(--cg-shadow-sm-x, 0px) var(--cg-shadow-sm-y, 1px) var(--cg-shadow-sm-blur, 4px) var(--cg-shadow-sm-spread, 0px) var(--cg-shadow-sm-Color, #616161);
    }
    :host([clickable]) .card:focus-within {
      outline: 2px solid var(--cg-focus-ring-color, #c8e650);
      outline-offset: 2px;
    }

    /* ── Padding ── */
    :host([padding="none"]) .body { padding: 0; }
    :host([padding="sm"]) .body { padding: var(--cg-spacing-12, 12px); }
    :host([padding="md"]) .body { padding: var(--cg-spacing-16, 16px) var(--cg-spacing-24, 24px); }
    :host([padding="lg"]) .body { padding: var(--cg-spacing-24, 24px); }

    /* ── Header slot ── */
    .header {
      padding: var(--cg-spacing-16, 16px) var(--cg-spacing-24, 24px) 0;
    }
    .header ::slotted(*) {
      margin: 0;
    }

    /* ── Body ── */
    .body {
      padding: var(--cg-spacing-16, 16px) var(--cg-spacing-24, 24px);
    }

    /* ── Footer slot ── */
    .footer {
      padding: 0 var(--cg-spacing-24, 24px) var(--cg-spacing-16, 16px);
    }
    .footer-divider {
      border-top: 1px solid var(--cg-color-surface-cards-border, #27272a);
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-24, 24px);
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `];

  @property({ reflect: true }) variant: 'elevated' | 'outlined' | 'filled' = 'elevated';
  @property({ reflect: true }) padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) clickable = false;

  private _handleClick() {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('cg-card-click', { bubbles: true, composed: true }));
    }
  }

  override render() {
    return html`
      <div
        class="card"
        @click=${this.clickable ? this._handleClick : nothing}
        role=${this.clickable ? 'button' : nothing}
        tabindex=${this.clickable ? '0' : nothing}
      >
        <div class="header"><slot name="header"></slot></div>
        <div class="body"><slot></slot></div>
        <div class="footer"><slot name="footer"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-card': CgCard;
  }
}
