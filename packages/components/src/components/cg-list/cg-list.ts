import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface ListItem {
  title: string;
  subtitle?: string;
  image?: string;
  icon?: string;
  action?: string;
  actionLabel?: string;
  meta?: string;
}

/**
 * <cg-list> — Rich list with multiple variants.
 *
 * Features:
 * - 3 variants: bullet, number, image
 * - Clickable items with hover state
 * - Action button per item
 * - Meta text (right-aligned, e.g. date/count)
 * - Divider control
 * - Empty state
 * - Keyboard accessible (items as buttons when clickable)
 */
@customElement('cg-list')
export class CgList extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24, 24px);
      color: var(--cg-gray-500, #71717a);
      font-size: var(--cg-font-size-sm, 14px);
    }

    .item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12, 12px);
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-8, 8px);
      border-radius: var(--cg-border-radius-100, 8px);
      transition: background var(--cg-motion-duration-fast, 80ms) ease;
    }

    :host([dividers]) .item {
      border-bottom: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
    }
    :host([dividers]) .item:last-child { border-bottom: none; }

    :host([hoverable]) .item:hover {
      background: var(--cg-overlay-accent-subtle, rgba(223, 255, 97, 0.06))))))))));
    }

    :host([clickable]) .item {
      cursor: pointer;
    }
    :host([clickable]) .item:hover {
      background: var(--cg-overlay-accent-subtle, rgba(223, 255, 97, 0.06)))))))));
    }
    :host([clickable]) .item:active {
      background: var(--cg-overlay-accent-light, rgba(223, 255, 97, 0.12)))))))));
    }
    :host([clickable]) .item:focus-visible {
      outline: 2px solid var(--cg-focus-ring-color, #c8e650);
      outline-offset: -2px;
    }

    /* Indicators */
    .num {
      width: 28px;
      height: 28px;
      border-radius: var(--cg-border-radius-full, 99999px);
      background: var(--cg-focus-ring-color, #c8e650);
      color: var(--cg-gray-white, #ffffff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: var(--cg-font-weight-bold, 700);
      flex-shrink: 0;
    }

    .bullet {
      width: 6px;
      height: 6px;
      border-radius: var(--cg-border-radius-full, 99999px);
      background: var(--cg-gray-400, #a1a1aa);
      flex-shrink: 0;
      margin: 0 4px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: var(--cg-border-radius-full, 99999px);
      object-fit: cover;
      flex-shrink: 0;
      background: var(--cg-color-surface-container-background, #18181b);
    }

    /* Body */
    .body {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-medium, 500);
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.3;
    }

    .subtitle {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      margin-top: 2px;
      line-height: 1.3;
    }

    /* Right side */
    .right {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      flex-shrink: 0;
    }

    .meta {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      white-space: nowrap;
    }

    .action-btn {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-text-accent, #e5ff6b);
      font-weight: var(--cg-font-weight-medium, 500);
      cursor: pointer;
      white-space: nowrap;
      background: none;
      border: none;
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-8, 8px);
      border-radius: var(--cg-border-radius-50, 4px);
      font-family: inherit;
      transition: background var(--cg-motion-duration-fast, 80ms);
    }
    .action-btn:hover { background: var(--cg-overlay-accent-light, rgba(223, 255, 97, 0.12)))))))))); text-decoration: underline; }
    .action-btn:focus-visible { outline: 2px solid var(--cg-focus-ring-color, #c8e650); outline-offset: 1px; }

    .chevron {
      width: 16px;
      height: 16px;
      color: var(--cg-gray-400, #a1a1aa);
      flex-shrink: 0;
    }
  

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }
  
    .item { transition: background-color 100ms cubic-bezier(0, 0, 0.58, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1); }
    .item:hover { transform: translateX(2px); }
  `;

  @property({ type: Array }) items: ListItem[] = [];
  @property() variant: 'number' | 'bullet' | 'image' | 'plain' = 'bullet';
  @property({ type: Boolean, reflect: true }) dividers = true;
  @property({ type: Boolean, reflect: true }) hoverable = false;
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property() emptyText = 'No items';

  private _handleItemClick(item: ListItem, index: number) {
    if (!this.clickable) return;
    this.dispatchEvent(new CustomEvent('cg-list-click', {
      detail: { item, index },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleAction(e: Event, item: ListItem, index: number) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('cg-list-action', {
      detail: { item, index, action: item.action },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    if (this.items.length === 0) {
      return html`<div class="empty">${this.emptyText}</div>`;
    }

    return html`${this.items.map((item, i) => html`
      <div
        class="item"
        tabindex=${this.clickable ? '0' : nothing}
        role=${this.clickable ? 'button' : nothing}
        @click=${() => this._handleItemClick(item, i)}
        @keydown=${(e: KeyboardEvent) => { if (this.clickable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this._handleItemClick(item, i); } }}
      >
        ${this.variant === 'number' ? html`<span class="num">${i + 1}</span>` : nothing}
        ${this.variant === 'bullet' ? html`<span class="bullet"></span>` : nothing}
        ${this.variant === 'image' && item.image ? html`<img class="avatar" src=${item.image} alt="" loading="lazy" />` : nothing}

        <div class="body">
          <div class="title">${item.title}</div>
          ${item.subtitle ? html`<div class="subtitle">${item.subtitle}</div>` : nothing}
        </div>

        <div class="right">
          ${item.meta ? html`<span class="meta">${item.meta}</span>` : nothing}
          ${item.actionLabel ? html`<button class="action-btn" @click=${(e: Event) => this._handleAction(e, item, i)}>${item.actionLabel}</button>` : nothing}
          ${this.clickable ? html`<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"></path></svg>` : nothing}
        </div>
      </div>
    `)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-list': CgList; }
}
