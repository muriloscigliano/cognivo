import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-card> — Container with header/body/footer slots.
 *
 * Better than OpenUI's Card + CardHeader:
 * - Single component (no separate CardHeader)
 * - Named slots: header, default (body), footer
 * - Hover elevation variant (for clickable cards)
 * - 3 visual variants: elevated, outlined, filled
 * - Padding control
 */
@customElement('cg-card')
export class CgCard extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .card {
      border-radius: var(--cg-border-radius-200, 24px);
      overflow: hidden;
      transition: all var(--cg-motion-duration-normal, 150ms) ease;
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
      transform: translateY(-1px);
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
  

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

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
