import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Item definition for cg-list. */
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
 * Data list with bullet, number, image, or plain variants.
 *
 * @fires {CustomEvent<{item: ListItem, index: number}>} cg-list-click - When a clickable item is clicked
 * @fires {CustomEvent<{item: ListItem, index: number, action: string}>} cg-list-action - When an action button is clicked
 */
@customElement('cg-list')
export class CgList extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`

    /* ── Empty state ── */
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-48) var(--cg-spacing-24);
      color: var(--cg-color-surface-container-outlined);
    }
    .empty-icon {
      width: var(--cg-spacing-48);
      height: var(--cg-spacing-48);
      opacity: 0.3;
    }
    .empty-text {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
    }

    /* ── Item ── */
    .item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid transparent;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default), border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      min-height: 44px;
    }

    /* ── Contained variant — card wrapper ── */
    :host([contained]) {
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-spacing-4);
      background: var(--cg-color-surface-cards-background);
    }

    /* ── Dividers — inset past leading element ── */
    :host([dividers]) .item {
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
      position: relative;
    }
    :host([dividers]) .item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--cg-border-width-50);
      background: var(--cg-color-surface-base-divider);
    }
    :host([dividers]) .item:last-child::after { display: none; }

    /* Inset dividers when leading element present */
    :host([dividers][variant="image"]) .item::after,
    :host([dividers][variant="number"]) .item::after,
    :host([dividers][variant="bullet"]) .item::after {
      left: var(--cg-spacing-48);
    }

    /* ── Hover ── */
    :host([hoverable]) .item:hover,
    :host([clickable]) .item:hover {
      background: var(--cg-overlay-dark-subtle);
      border-color: var(--cg-color-surface-cards-border);
    }

    :host([clickable]) .item {
      cursor: pointer;
    }
    :host([clickable]) .item:active {
      background: var(--cg-overlay-accent-subtle);
    }
    :host([clickable]) .item:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--cg-color-focus-ring-offset), inset 0 0 0 4px var(--cg-color-focus-ring);
      border-radius: var(--cg-border-radius-100);
    }

    /* ── Number indicator — subtle, not heavy ── */
    .num {
      width: var(--cg-spacing-24);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    /* ── Bullet ── */
    .bullet {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-container-outlined);
      flex-shrink: 0;
      margin: 0 var(--cg-spacing-4);
    }

    /* ── Avatar ── */
    .avatar {
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      border-radius: var(--cg-border-radius-full);
      object-fit: cover;
      flex-shrink: 0;
      background: var(--cg-color-surface-container-background);
    }

    /* ── Body ── */
    .body {
      flex: 1;
      min-width: 0;
    }
    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-snug);
    }
    .subtitle {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      margin-top: var(--cg-spacing-2);
      line-height: var(--cg-line-height-snug);
    }

    /* ── Right side — actions appear on hover ── */
    .right {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      flex-shrink: 0;
    }
    .meta {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      white-space: nowrap;
    }

    .action-btn {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-action-primary-background-default);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      white-space: nowrap;
      background: none;
      border: none;
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      font-family: inherit;
      opacity: 0;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default), background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .item:hover .action-btn { opacity: 1; }
    .action-btn:hover { background: var(--cg-overlay-accent-light); }
    .action-btn:focus-visible {
      opacity: 1;
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring-offset), 0 0 0 4px var(--cg-color-focus-ring);
    }

    .chevron {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      color: var(--cg-color-surface-container-outlined);
      flex-shrink: 0;
      opacity: 0.5;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .item:hover .chevron { opacity: 1; }
  `];

  @property({ type: Array }) items: ListItem[] = [];
  @property({ reflect: true }) variant: 'number' | 'bullet' | 'image' | 'plain' = 'plain';
  @property({ type: Boolean, reflect: true }) dividers = false;
  @property({ type: Boolean, reflect: true }) hoverable = true;
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property({ type: Boolean, reflect: true }) contained = false;
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
      return html`
        <div class="empty">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <path d="M8 8h8M8 12h5M8 16h3"></path>
          </svg>
          <span class="empty-text">${this.emptyText}</span>
        </div>
      `;
    }

    return html`<div role="list">${this.items.map((item, i) => html`
      <div
        class="item"
        role="listitem"
        tabindex=${this.clickable ? '0' : nothing}
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
          ${this.clickable ? html`<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>` : nothing}
        </div>
      </div>
    `)}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-list': CgList; }
}
