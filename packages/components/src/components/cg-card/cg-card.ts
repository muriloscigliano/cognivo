import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
 * @cssprop [--cg-border-radius-200=16px] - Card border radius
 * @cssprop [--cg-interaction-hover-lift=-1px] - Clickable card hover lift
 */
@customElement('cg-card')
export class CgCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }

    .card {
      position: relative;
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
      transition: border-color var(--cg-motion-duration-normal) var(--cg-motion-easing-default), background var(--cg-motion-duration-normal) var(--cg-motion-easing-default), transform var(--cg-motion-duration-normal) var(--cg-motion-easing-default), box-shadow var(--cg-motion-duration-normal) var(--cg-motion-easing-default);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: var(--cg-color-surface-cards-background);
    }

    /* ── Variants ── */

    /* Elevated (default) — shadow lifts card off the surface */
    :host([variant="elevated"]) .card {
      background: var(--cg-color-surface-cards-background);
      border-color: var(--cg-color-surface-cards-border);
      box-shadow: var(--cg-elevation-1);
    }

    /* Outlined — transparent bg, border defines the container */
    :host([variant="outlined"]) .card {
      background: transparent;
      border-color: var(--cg-color-surface-cards-outlined);
      box-shadow: none;
    }

    /* Filled — heavier surface fill, no border, no shadow */
    :host([variant="filled"]) .card {
      background: var(--cg-color-surface-cards-emphasis);
      border-color: transparent;
      box-shadow: none;
    }

    /* ── Interactive (clickable) ── */
    :host([clickable]) .card {
      cursor: pointer;
    }
    :host([clickable]) .card:hover {
      border-color: var(--cg-color-surface-cards-hover-border);
      background: var(--cg-color-surface-cards-hover-background);
    }
    :host([clickable][variant="elevated"]) .card:hover {
      box-shadow: var(--cg-elevation-2);
      transform: translateY(var(--cg-interaction-hover-lift));
    }
    :host([clickable]) .card:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    :host([clickable]) .card:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring-offset), 0 0 0 4px var(--cg-color-focus-ring);
    }

    /* ── Padding ── */
    :host([padding="none"]) .body { padding: 0; }
    :host([padding="sm"]) .body { padding: var(--cg-component-card-padding-sm); }
    :host([padding="md"]) .body { padding: var(--cg-component-card-padding-md) var(--cg-spacing-24); }
    :host([padding="lg"]) .body { padding: var(--cg-component-card-padding-lg); }

    /* ── Content z-index ── */
    .header, .body, .footer {
      position: relative;
      z-index: 1;
    }

    /* ── Header slot ── */
    .header {
      padding: var(--cg-spacing-20) var(--cg-spacing-24) var(--cg-component-card-padding-md);
    }
    .header:not(.has-content) {
      display: none;
    }
    .header ::slotted(*) {
      margin: 0;
    }

    /* ── Body ── */
    .body {
      padding: var(--cg-component-card-padding-lg);
    }

    /* ── Footer slot ── */
    .footer {
      padding: var(--cg-component-card-padding-md) var(--cg-spacing-24);
    }
    .footer:not(.has-content) {
      display: none;
    }

    /* Disabled state */
    :host([disabled]) .card {
      background: var(--cg-color-surface-cards-disable-background);
      border-color: var(--cg-color-surface-cards-disable-border);
      color: var(--cg-color-surface-cards-disable-text);
      pointer-events: none;
    }

    /* Rounded variants */
    :host([rounded="none"]) .card { border-radius: 0; }
    :host([rounded="sm"]) .card { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .card { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .card { border-radius: var(--cg-component-card-radius); }
    :host([rounded="full"]) .card { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) variant: 'elevated' | 'outlined' | 'filled' = 'elevated';
  @property({ reflect: true }) padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _hasHeader = false;
  @state() private _hasFooter = false;

  private _onHeaderSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasHeader = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _onFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _handleClick() {
    if (this.disabled) return;
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('cg-card-click', { bubbles: true, composed: true }));
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (this.clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleClick();
    }
  }

  override render() {
    return html`
      <div
        class="card"
        @click=${this.clickable ? this._handleClick : nothing}
        @keydown=${this.clickable ? this._handleKeydown : nothing}
        role=${this.clickable ? 'button' : nothing}
        tabindex=${this.clickable && !this.disabled ? '0' : nothing}
        aria-disabled=${this.disabled ? 'true' : nothing}
      >
        <div class="header ${this._hasHeader ? 'has-content' : ''}"><slot name="header" @slotchange=${this._onHeaderSlotChange}></slot></div>
        <div class="body"><slot></slot></div>
        <div class="footer ${this._hasFooter ? 'has-content' : ''}"><slot name="footer" @slotchange=${this._onFooterSlotChange}></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-card': CgCard;
  }
}
