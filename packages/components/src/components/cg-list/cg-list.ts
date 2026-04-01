import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, entranceStagger } from '../../styles/index.js';

/** Item definition for cg-list, with title, subtitle, image/icon, and optional action. */
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
 * @element cg-list
 * Data list with bullet, number, image, or plain variants and optional item actions.
 *
 * @example
 * ```html
 * <cg-list
 *   variant="image"
 *   clickable
 *   .items=${[
 *     {title:'Alice', subtitle:'Engineer', image:'/alice.jpg', meta:'Online'},
 *     {title:'Bob', subtitle:'Designer', image:'/bob.jpg', actionLabel:'View'},
 *   ]}
 * ></cg-list>
 * ```
 *
 * @fires {CustomEvent<{item: ListItem, index: number}>} cg-list-click - When a clickable item is clicked
 * @fires {CustomEvent<{item: ListItem, index: number, action: string}>} cg-list-action - When an item action button is clicked
 *
 * @cssprop [--cg-overlay-accent-subtle=rgba(223,255,97,0.06)] - Hover background
 * @cssprop [--cg-text-accent=#e5ff6b] - Action button text color
 * @cssprop [--cg-color-surface-container-border=#27272a] - Divider color
 * @cssprop [--cg-color-surface-base-text=#fafafa] - Item title color
 */
@customElement('cg-list')
export class CgList extends LitElement {
  static override styles = [hostBlock, reducedMotion, entranceStagger, css`
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
      background: var(--cg-overlay-accent-subtle, rgba(223, 255, 97, 0.06));
    }

    :host([clickable]) .item {
      cursor: pointer;
    }
    :host([clickable]) .item:hover {
      background: var(--cg-overlay-accent-subtle, rgba(223, 255, 97, 0.06));
    }
    :host([clickable]) .item:active {
      background: var(--cg-overlay-accent-light, rgba(223, 255, 97, 0.12));
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
      line-height: var(--cg-line-height-snug, 1.375);
    }

    .subtitle {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      margin-top: 2px;
      line-height: var(--cg-line-height-snug, 1.375);
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
    .action-btn:hover { background: var(--cg-overlay-accent-light, rgba(223, 255, 97, 0.12)); text-decoration: underline; }
    .action-btn:focus-visible { outline: 2px solid var(--cg-focus-ring-color, #c8e650); outline-offset: 1px; }

    .chevron {
      width: 16px;
      height: 16px;
      color: var(--cg-gray-400, #a1a1aa);
      flex-shrink: 0;
    }
  
    .item { transition: background-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)), transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)); animation: staggerFadeIn 200ms ease-out both; animation-delay: calc(var(--stagger-index, 0) * 40ms); }
    .item:hover { transform: translateX(2px); background: var(--cg-overlay-accent-subtle, rgba(223, 255, 97, 0.06)); }

    /* Rounded variants */
    :host([rounded="none"]) .item { border-radius: 0; }
    :host([rounded="sm"]) .item { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .item { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .item { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .item { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ type: Array }) items: ListItem[] = [];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
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
        style="--stagger-index: ${i}"
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
