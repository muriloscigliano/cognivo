import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-badge> — Semantic status badge with variants.
 *
 * Better than OpenUI's Tag:
 * - Dot indicator variant
 * - Removable (x button)
 * - 6 semantic colors
 * - Size variants
 */
@customElement('cg-badge')
export class CgBadge extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: inline-flex;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
      font-weight: var(--cg-font-weight-semibold, 600);
      white-space: nowrap;
      border: 1px solid transparent;
      transition: all var(--cg-transition-duration-fast, 100ms) ease;
    }

    /* Sizes */
    :host([size="sm"]) .badge {
      padding: 1px 6px;
      font-size: 0.65rem;
      border-radius: var(--cg-border-radius-100, 8px);
    }
    :host([size="md"]) .badge {
      padding: 2px 8px;
      font-size: var(--cg-font-size-xs, 12px);
      border-radius: var(--cg-border-radius-100, 8px);
    }
    :host([size="lg"]) .badge {
      padding: 4px 12px;
      font-size: var(--cg-font-size-sm, 14px);
      border-radius: var(--cg-border-radius-150, 12px);
    }

    /* Variants — using badge semantic tokens */
    :host([variant="neutral"]) .badge {
      background: var(--cg-color-badge-background-default, rgba(59, 130, 246, 0.12));
      color: var(--cg-color-badge-text-default, #60a5fa);
      border-color: var(--cg-color-surface-base-border, #27272a);
    }
    :host([variant="info"]) .badge {
      background: var(--cg-color-status-info-background-default, rgba(59, 130, 246, 0.12));
      color: var(--cg-color-status-info-text-default, #60a5fa);
      border-color: var(--cg-color-status-info-border-default, rgba(59, 130, 246, 0.25));
    }
    :host([variant="success"]) .badge {
      background: var(--cg-color-badge-background-success, rgba(34, 197, 94, 0.12));
      color: var(--cg-color-badge-text-success, #4ade80);
      border-color: var(--cg-color-status-success-border-default, rgba(34, 197, 94, 0.25));
    }
    :host([variant="warning"]) .badge {
      background: var(--cg-color-badge-background-warning, rgba(245, 158, 11, 0.12));
      color: var(--cg-color-badge-text-warning, #fbbf24);
      border-color: var(--cg-color-status-warning-border-default, rgba(245, 158, 11, 0.25));
    }
    :host([variant="danger"]) .badge {
      background: var(--cg-color-badge-background-error, rgba(239, 68, 68, 0.12));
      color: var(--cg-color-badge-text-error, #f87171);
      border-color: var(--cg-color-status-error-border-default, rgba(239, 68, 68, 0.25));
    }
    :host([variant="accent"]) .badge {
      background: var(--cg-color-status-info-background-default, rgba(59, 130, 246, 0.12));
      color: var(--cg-text-accent, #e5ff6b);
      border-color: var(--cg-color-status-info-border-default, rgba(59, 130, 246, 0.25));
    }

    /* Dot indicator */
    .dot {
      width: 6px;
      height: 6px;
      border-radius: var(--cg-border-radius-full, 99999px);
      background: currentColor;
      flex-shrink: 0;
    }

    /* Remove button */
    .remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border: none;
      background: none;
      color: currentColor;
      opacity: 0.6;
      cursor: pointer;
      padding: 0;
      border-radius: var(--cg-border-radius-full, 99999px);
      transition: opacity var(--cg-transition-duration-fast, 100ms);
      flex-shrink: 0;
    }
    .remove:hover { opacity: 1; }
    .remove:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 1px;
    }
    .remove svg {
      width: 10px;
      height: 10px;
    }
  

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }
  `;

  @property({ reflect: true }) variant: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent' = 'neutral';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property() label = '';
  @property({ type: Boolean }) dot = false;
  @property({ type: Boolean }) removable = false;

  private _handleRemove() {
    this.dispatchEvent(new CustomEvent('cg-badge-remove', {
      detail: { label: this.label },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <span class="badge" role="status">
        ${this.dot ? html`<span class="dot"></span>` : nothing}
        <span class="text">${this.label}<slot></slot></span>
        ${this.removable ? html`
          <button class="remove" @click=${this._handleRemove} aria-label="Remove ${this.label}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        ` : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-badge': CgBadge;
  }
}
