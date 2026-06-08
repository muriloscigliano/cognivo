import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-chip
 * Pill-shaped tag/chip with neutral default, color variants, optional icon,
 * removable X button, and toggleable selected state.
 *
 * @example
 * ```html
 * <cg-chip label="TypeScript"></cg-chip>
 * <cg-chip label="Bug" variant="error" removable></cg-chip>
 * <cg-chip label="Active" selected></cg-chip>
 * ```
 *
 * @fires {CustomEvent<{label: string, selected: boolean}>} cg-chip-click - When the chip is clicked
 * @fires {CustomEvent<{label: string}>} cg-chip-remove - When the remove button is clicked
 */
@customElement('cg-chip')
export class CgChip extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-background);
      color: var(--cg-color-surface-base-text);
      cursor: pointer;
      font-family: inherit;
      font-weight: var(--cg-font-weight-medium);
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-font-smoothing: antialiased;
      transition:
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    /* ── Sizes ── */
    :host([size="sm"]) .chip {
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      height: var(--cg-spacing-24);
    }
    :host([size="md"]) .chip {
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      font-size: var(--cg-font-size-sm);
      height: var(--cg-spacing-32);
    }

    /* ── Hover ── */
    .chip:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover);
      transform: scale(1.02);
    }

    /* ── Press ── */
    .chip:active:not(.disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }

    /* ── Focus ring ── */
    .chip:focus-visible {
      box-shadow:
        0 0 0 var(--cg-spacing-2) var(--cg-overlay-accent-strong);
      outline: none;
      outline-offset: var(--cg-outline-offset-default);
    }

    /* ── Disabled ── */
    .chip.disabled {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Variant: success ── */
    :host([variant="success"]) .chip {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
      border-color: var(--cg-color-status-success-border-default);
    }
    :host([variant="success"]) .chip:hover:not(.disabled) {
      background: var(--cg-color-status-success-background-hover);
    }

    /* ── Variant: warning ── */
    :host([variant="warning"]) .chip {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text-default);
      border-color: var(--cg-color-status-warning-border-default);
    }
    :host([variant="warning"]) .chip:hover:not(.disabled) {
      background: var(--cg-color-status-warning-background-hover);
    }

    /* ── Variant: error ── */
    :host([variant="error"]) .chip {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([variant="error"]) .chip:hover:not(.disabled) {
      background: var(--cg-color-status-error-background-hover);
    }

    /* ── Variant: info ── */
    :host([variant="info"]) .chip {
      background: var(--cg-color-status-info-background-default);
      color: var(--cg-color-status-info-text-default);
      border-color: var(--cg-color-status-info-border-default);
    }
    :host([variant="info"]) .chip:hover:not(.disabled) {
      background: var(--cg-color-status-info-background-hover);
    }

    /* ── Selected state ── */
    :host([selected]) .chip {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-background-default);
    }
    :host([selected]) .chip:hover:not(.disabled) {
      background: var(--cg-color-action-primary-background-hover);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .chip { border-radius: 0; }
    :host([rounded="sm"]) .chip { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .chip { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .chip { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .chip { border-radius: var(--cg-border-radius-full); }

    /* ── Icon ── */
    .chip-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      font-size: var(--cg-font-size-xs);
    }

    /* ── Label ── */
    .chip-label {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: var(--cg-spacing-192);
    }

    /* ── Remove button ── */
    .remove-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      margin-left: var(--cg-spacing-2);
      margin-right: calc(-1 * var(--cg-spacing-4));
      border: none;
      border-radius: 50%;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      opacity: 0.6;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .remove-btn:hover { opacity: 1; }
    .remove-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .remove-btn:focus-visible {
      box-shadow: 0 0 0 var(--cg-spacing-2) var(--cg-overlay-accent-strong);
      outline: none;
    }
  `];

  @property({ type: String }) label = '';
  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';
  @property({ type: Boolean }) removable = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'full';
  @property({ type: String }) icon = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) selected = false;

  private _handleClick() {
    if (this.disabled) return;
    this.selected = !this.selected;
    this.dispatchEvent(new CustomEvent('cg-chip-click', {
      bubbles: true,
      composed: true,
      detail: { label: this.label, selected: this.selected },
    }));
  }

  private _handleRemove(e: Event) {
    e.stopPropagation();
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('cg-chip-remove', {
      bubbles: true,
      composed: true,
      detail: { label: this.label },
    }));
  }

  override render() {
    return html`
      <span
        class="chip ${this.disabled ? 'disabled' : ''}"
        role="button"
        tabindex="${this.disabled ? '-1' : '0'}"
        aria-disabled="${this.disabled}"
        aria-pressed="${this.selected}"
        aria-label="${this.label ? nothing : (this.icon || nothing)}"
        @click="${this._handleClick}"
        @keydown="${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._handleClick();
          }
          if ((e.key === 'Delete' || e.key === 'Backspace') && this.removable) {
            e.preventDefault();
            this._handleRemove(e);
          }
        }}"
      >
        ${this.icon ? html`<span class="chip-icon">${this.icon}</span>` : nothing}
        <span class="chip-label">${this.label}</span>
        ${this.removable && !this.disabled ? html`
          <button
            class="remove-btn"
            aria-label="Remove ${this.label}"
            tabindex="-1"
            @click="${this._handleRemove}"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M7.5 2.5L2.5 7.5M2.5 2.5l5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
            </svg>
          </button>
        ` : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-chip': CgChip;
  }
}
