import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-chip
 * Pill-shaped tag/chip with color variants, optional icon, and remove button.
 *
 * @example
 * ```html
 * <cg-chip label="TypeScript" variant="accent"></cg-chip>
 * <cg-chip label="Bug" variant="error" removable icon="[bug icon]"></cg-chip>
 * <cg-chip label="Done" variant="success" disabled></cg-chip>
 * ```
 *
 * @fires {CustomEvent<{label: string}>} cg-chip-click - When the chip is clicked
 * @fires {CustomEvent<{label: string}>} cg-chip-remove - When the remove button is clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Accent variant color
 * @cssprop [--cg-interaction-press-scale=0.97] - Press scale feedback
 * @cssprop [--cg-color-surface-base-border=#27272a] - Default variant border
 * @cssprop [--cg-font-size-sm=14px] - Chip font size (md)
 */
@customElement('cg-chip')
export class CgChip extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      border: var(--cg-border-width-50) solid transparent;
      border-radius: var(--cg-border-radius-full);
      cursor: pointer;
      font-family: inherit;
      font-weight: var(--cg-font-weight-medium);
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-font-smoothing: antialiased;
      transition:
        transform var(--cg-motion-duration-slow) var(--cg-motion-easing-default),
        background-color var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
        color var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
        border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
        box-shadow var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
        opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
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

    /* ── Press scale ── */
    .chip:active:not(.disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }

    /* ── Focus ring ── */
    .chip:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background),
        0 0 0 4px var(--cg-focus-ring-color);
      outline: none;
    }

    /* ── Disabled ── */
    .chip.disabled {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Variant: default ── */
    :host([variant="default"]) .chip {
      background: var(--cg-color-badge-background-default);
      color: var(--cg-color-surface-container-text);
      border-color: var(--cg-color-surface-base-border);
    }
    :host([variant="default"]) .chip:hover:not(.disabled) {
      background: var(--cg-color-action-secondary-background-hover);
      transform: scale(1.02);
    }

    /* ── Variant: success ── */
    :host([variant="success"]) .chip {
      background: var(--cg-color-badge-background-success);
      color: var(--cg-color-status-success-text-default);
      border-color: var(--cg-color-status-success-border-default);
    }
    :host([variant="success"]) .chip:hover:not(.disabled) {
      background: var(--cg-color-status-success-background-hover);
      color: var(--cg-color-status-success-text-inverse);
      transform: scale(1.02);
    }

    /* ── Variant: warning ── */
    :host([variant="warning"]) .chip {
      background: var(--cg-color-badge-background-warning);
      color: var(--cg-color-status-warning-text-default);
      border-color: var(--cg-color-status-warning-border-default);
    }
    :host([variant="warning"]) .chip:hover:not(.disabled) {
      background: var(--cg-color-status-warning-background-hover);
      color: var(--cg-color-status-warning-text-inverse);
      transform: scale(1.02);
    }

    /* ── Variant: error ── */
    :host([variant="error"]) .chip {
      background: var(--cg-color-badge-background-error);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([variant="error"]) .chip:hover:not(.disabled) {
      background: var(--cg-color-status-error-background-hover);
      color: var(--cg-color-status-error-text-inverse);
      transform: scale(1.02);
    }

    /* ── Variant: accent ── */
    :host([variant="accent"]) .chip {
      background: var(--cg-color-status-info-background-default);
      color: var(--cg-color-accent-text);
      border-color: var(--cg-color-status-info-border-default);
    }
    :host([variant="accent"]) .chip:hover:not(.disabled) {
      background: var(--cg-color-status-info-background-hover);
      color: var(--cg-color-status-info-text-inverse);
      transform: scale(1.02);
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
      max-width: 200px;
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
        opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
        background-color var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
        transform var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }

    .remove-btn:hover {
      opacity: 1;
      background: var(--cg-overlay-dark-light);
    }

    .remove-btn:active {
      transform: scale(0.9);
    }

    .remove-btn:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background),
        0 0 0 4px var(--cg-focus-ring-color);
      outline: none;
    }
  `];

  @property({ type: String }) label = '';
  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'error' | 'accent' = 'default';
  @property({ type: Boolean }) removable = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'full';
  @property({ type: String }) icon = '';
  @property({ type: Boolean }) disabled = false;

  private _handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('cg-chip-click', {
      bubbles: true,
      composed: true,
      detail: { label: this.label },
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
        aria-label="${this.label}"
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
