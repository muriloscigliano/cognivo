import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * <cg-section> — Foldable content section with streaming awareness.
 *
 * Features:
 * - Foldable with smooth animation
 * - Auto-open during streaming (new content appears → section opens)
 * - Description text below title
 * - Badge count indicator
 * - Keyboard accessible
 * - Icon slot
 */
@customElement('cg-section')
export class CgSection extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    :host([bordered]) {
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      padding: 0 var(--cg-spacing-16, 16px);
    }

    :host(:not([bordered])) {
      border-bottom: 1px solid var(--cg-color-surface-container-border, #27272a);
    }
    :host(:not([bordered]):last-child) {
      border-bottom: none;
    }

    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      padding: var(--cg-spacing-16, 16px) 0;
      user-select: none;
    }

    :host([foldable]) .header {
      cursor: pointer;
    }
    :host([foldable]) .header:hover .title {
      color: var(--cg-text-accent, #e5ff6b);
    }

    .header:focus-visible {
      outline: 2px solid var(--cg-focus-ring-color, #c8e650);
      outline-offset: -2px;
      border-radius: 4px;
    }

    .icon-slot {
      display: flex;
      align-items: center;
      color: var(--cg-gray-500, #71717a);
    }

    .title-group {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-surface-base-text, #fafafa);
      transition: color var(--cg-motion-duration-normal, 150ms) ease;
      line-height: 1.3;
    }

    .description {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      margin-top: 2px;
      line-height: 1.3;
    }

    .badge {
      font-size: 0.65rem;
      font-weight: var(--cg-font-weight-bold, 700);
      background: var(--cg-gray-200, #e4e4e7);
      color: var(--cg-gray-600, #52525b);
      padding: 2px 7px;
      border-radius: var(--cg-border-radius-full, 99999px);
      flex-shrink: 0;
    }

    .chevron {
      width: 16px;
      height: 16px;
      color: var(--cg-gray-400, #a1a1aa);
      transition: transform var(--cg-motion-duration-slow, 250ms) ease;
      flex-shrink: 0;
    }
    .chevron.open {
      transform: rotate(90deg);
    }

    .content {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.25s ease-out, opacity 0.2s ease;
      opacity: 0;
    }
    .content.open {
      max-height: 3000px;
      opacity: 1;
      transition: max-height 0.4s ease-in, opacity 0.2s ease;
    }

    .content-inner {
      padding: 0 0 var(--cg-spacing-16, 16px);
    }

    @media (prefers-reduced-motion: reduce) {
      .content, .chevron { transition: none; }
    }
  
    .header { transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)); }
    .header:hover { color: var(--cg-brand-ai-accent, #dfff61); }
  `;

  @property() title = '';
  @property() description = '';
  @property({ type: Boolean, reflect: true }) foldable = true;
  @property({ type: Boolean }) open = false;
  @property({ type: Boolean, reflect: true }) bordered = false;
  @property({ type: Number }) count = 0;

  @state() private _open = false;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('open')) this._open = this.open;
  }

  private _toggle() {
    if (!this.foldable) return;
    this._open = !this._open;
    this.dispatchEvent(new CustomEvent('cg-section-toggle', {
      detail: { open: this._open, title: this.title },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.foldable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._toggle();
    }
  }

  override render() {
    const isOpen = !this.foldable || this._open;

    return html`
      <div
        class="header"
        tabindex=${this.foldable ? '0' : nothing}
        role=${this.foldable ? 'button' : 'heading'}
        aria-expanded=${this.foldable ? this._open : nothing}
        @click=${this._toggle}
        @keydown=${this._handleKeydown}
      >
        <span class="icon-slot"><slot name="icon"></slot></span>
        <div class="title-group">
          <div class="title">${this.title}</div>
          ${this.description ? html`<div class="description">${this.description}</div>` : nothing}
        </div>
        ${this.count > 0 ? html`<span class="badge">${this.count}</span>` : nothing}
        ${this.foldable ? html`
          <svg class="chevron ${this._open ? 'open' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        ` : nothing}
      </div>
      <div class="content ${isOpen ? 'open' : ''}">
        <div class="content-inner"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-section': CgSection; }
}
