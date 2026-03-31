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
 * <cg-chip label="Bug" variant="error" removable icon="🐛"></cg-chip>
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
      gap: var(--cg-spacing-4, 4px);
      border: 1px solid transparent;
      border-radius: 999px;
      cursor: pointer;
      font-family: inherit;
      font-weight: var(--cg-font-weight-medium, 500);
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-font-smoothing: antialiased;
      transition:
        transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        background-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        border-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        box-shadow var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        opacity var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    /* ── Sizes ── */
    :host([size="sm"]) .chip {
      padding: 2px 8px;
      font-size: var(--cg-font-size-xs, 12px);
      height: 24px;
    }
    :host([size="md"]) .chip {
      padding: 4px 12px;
      font-size: var(--cg-font-size-sm, 14px);
      height: 30px;
    }

    /* ── Press scale ── */
    .chip:active:not(.disabled) {
      transform: scale(var(--cg-interaction-press-scale, 0.97));
    }
      .chip:active:not(.disabled) {
        transform: none;
      }
    }

    /* ── Focus ring ── */
    .chip:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
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
      background: rgba(161, 161, 170, 0.12);
      color: var(--cg-color-text-secondary, #a1a1aa);
      border-color: var(--cg-color-surface-base-border, #27272a);
    }
    :host([variant="default"]) .chip:hover:not(.disabled) {
      background: rgba(161, 161, 170, 0.18);
      transform: scale(1.02);
    }

    /* ── Variant: success ── */
    :host([variant="success"]) .chip {
      background: rgba(34, 197, 94, 0.12);
      color: var(--cg-green-400, #4ade80);
      border-color: rgba(34, 197, 94, 0.25);
    }
    :host([variant="success"]) .chip:hover:not(.disabled) {
      background: rgba(34, 197, 94, 0.2);
      transform: scale(1.02);
    }

    /* ── Variant: warning ── */
    :host([variant="warning"]) .chip {
      background: rgba(245, 158, 11, 0.12);
      color: var(--cg-yellow-400, #fbbf24);
      border-color: rgba(245, 158, 11, 0.25);
    }
    :host([variant="warning"]) .chip:hover:not(.disabled) {
      background: rgba(245, 158, 11, 0.2);
      transform: scale(1.02);
    }

    /* ── Variant: error ── */
    :host([variant="error"]) .chip {
      background: rgba(239, 68, 68, 0.12);
      color: var(--cg-red-400, #f87171);
      border-color: rgba(239, 68, 68, 0.25);
    }
    :host([variant="error"]) .chip:hover:not(.disabled) {
      background: rgba(239, 68, 68, 0.2);
      transform: scale(1.02);
    }

    /* ── Variant: accent ── */
    :host([variant="accent"]) .chip {
      background: rgba(223, 255, 97, 0.12);
      color: var(--cg-brand-ai-accent, #dfff61);
      border-color: rgba(223, 255, 97, 0.25);
    }
    :host([variant="accent"]) .chip:hover:not(.disabled) {
      background: rgba(223, 255, 97, 0.2);
      transform: scale(1.02);
    }

    /* ── Icon ── */
    .chip-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      font-size: 12px;
    }

    /* ── Label ── */
    .chip-label {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 160px;
    }

    /* ── Remove button ── */
    .remove-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      margin-left: 2px;
      margin-right: -4px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      opacity: 0.6;
      transition:
        opacity 100ms ease,
        background-color 100ms ease,
        transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    .remove-btn:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1);
    }

    .remove-btn:active {
      transform: scale(0.9);
    }

    .remove-btn:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
    }
  `];

  @property({ type: String }) label = '';
  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'error' | 'accent' = 'default';
  @property({ type: Boolean }) removable = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
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
        role="option"
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
