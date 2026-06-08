import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Breadcrumb segment for cg-breadcrumbs, with label, optional href, and optional icon. */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

/**
 * @element cg-breadcrumbs
 * Navigation breadcrumb trail with responsive collapse and custom separators.
 *
 * @example
 * ```html
 * <cg-breadcrumbs
 *   separator="/"
 *   .items=${[
 *     {label:'Home', href:'/'},
 *     {label:'Products', href:'/products'},
 *     {label:'Widget'},
 *   ]}
 * ></cg-breadcrumbs>
 * <cg-breadcrumbs maxVisible="3" .items=${longTrail}></cg-breadcrumbs>
 * ```
 *
 * @fires {CustomEvent<{label: string, href?: string, index: number}>} cg-breadcrumb-click - When a breadcrumb link is clicked
 *
 * @cssprop [--cg-color-text-secondary=#a1a1aa] - Link text color
 * @cssprop [--cg-color-text-primary=#fafafa] - Current page text color
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Focus ring color
 * @cssprop [--cg-font-size-sm=14px] - Breadcrumb font size (md)
 */
@customElement('cg-breadcrumbs')
export class CgBreadcrumbs extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    nav {
      display: flex;
      align-items: center;
    }

    .breadcrumb-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0;
      list-style: none;
      margin: 0;
      padding: 0;
      min-width: 0;
    }

    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
      min-width: 0;
    }

    .separator {
      display: inline-flex;
      align-items: center;
      padding: 0 var(--cg-spacing-8);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      user-select: none;
      flex-shrink: 0;
    }

    .crumb-link {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-2) 0;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-text);
      text-decoration: none;
      text-underline-offset: var(--cg-spacing-4);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
      cursor: pointer;
      border: none;
      background: transparent;
      font-family: inherit;
      line-height: var(--cg-line-height-snug);
      border-radius: var(--cg-border-radius-50);
      -webkit-font-smoothing: antialiased;
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .crumb-link:hover {
      color: var(--cg-color-surface-base-text);
      text-decoration: underline;
    }

    .crumb-link:active {
      transform: scale(var(--cg-interaction-press-scale));
    }

    .crumb-link:focus-visible {
      box-shadow:
        0 0 0 var(--cg-border-width-100) var(--cg-color-surface-base-background),
        0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
      outline: none;
    }

    /* Current (last) item */
    .crumb-current {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-4);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
      line-height: var(--cg-line-height-snug);
    }

    .crumb-icon {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      font-size: var(--cg-font-size-sm);
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      justify-content: center;
    }

    /* ── Ellipsis button ── */
    .ellipsis {
      display: inline-flex;
      align-items: center;
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      padding: var(--cg-spacing-2) var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-50);
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-snug);
      letter-spacing: var(--cg-letter-spacing-widest);
    }

    .ellipsis:hover {
      color: var(--cg-color-surface-base-text);
    }

    .ellipsis:focus-visible {
      box-shadow:
        0 0 0 var(--cg-border-width-100) var(--cg-color-surface-base-background),
        0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
      outline: none;
    }

    /* Size variants */
    :host([size="sm"]) .crumb-link,
    :host([size="sm"]) .crumb-current { font-size: var(--cg-font-size-xs); }
    :host([size="sm"]) .separator { padding: 0 var(--cg-spacing-4); font-size: var(--cg-font-size-xs); }
    :host([size="sm"]) .ellipsis { font-size: var(--cg-font-size-xs); }

    :host([size="lg"]) .crumb-link,
    :host([size="lg"]) .crumb-current { font-size: var(--cg-font-size-base); }
    :host([size="lg"]) .separator { padding: 0 var(--cg-spacing-8); font-size: var(--cg-font-size-sm); }
    :host([size="lg"]) .ellipsis { font-size: var(--cg-font-size-base); }

    /* ── Responsive collapse on small screens ── */
    @media (max-width: 640px) {
      .breadcrumb-item.collapsible-middle {
        display: none;
      }

      .breadcrumb-item.ellipsis-item-auto {
        display: inline-flex;
      }

      .crumb-link,
      .crumb-current {
        max-width: 120px;
      }
    }

    /* When not on small screen, hide the auto-collapse ellipsis */
    @media (min-width: 641px) {
      .breadcrumb-item.ellipsis-item-auto {
        display: none;
      }
    }
  `];

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Array }) items: BreadcrumbItem[] = [];
  @property({ type: String }) separator = '/';

  /** Max visible items (0 = show all). Always shows first + last (maxVisible - 1) items. */
  @property({ type: Number }) maxVisible = 0;

  @state() private _expanded = false;

  private _handleClick(item: BreadcrumbItem, index: number) {
    this.dispatchEvent(new CustomEvent('cg-breadcrumb-click', {
      bubbles: true,
      composed: true,
      detail: { label: item.label, href: item.href, index },
    }));
  }

  private _expandCollapsed() {
    this._expanded = true;
  }

  private _renderCrumb(item: BreadcrumbItem, index: number, isLast: boolean) {
    if (isLast) {
      return html`
        <span class="crumb-current" aria-current="page">
          ${item.icon ? html`<span class="crumb-icon">${item.icon}</span>` : nothing}
          ${item.label}
        </span>
      `;
    }

    if (item.href) {
      return html`
        <a
          class="crumb-link"
          href="${item.href}"
          @click="${(e: Event) => { e.preventDefault(); this._handleClick(item, index); }}"
        >
          ${item.icon ? html`<span class="crumb-icon">${item.icon}</span>` : nothing}
          ${item.label}
        </a>
      `;
    }

    return html`
      <button
        class="crumb-link"
        @click="${() => this._handleClick(item, index)}"
      >
        ${item.icon ? html`<span class="crumb-icon">${item.icon}</span>` : nothing}
        ${item.label}
      </button>
    `;
  }

  private _renderItem(item: BreadcrumbItem, index: number, isLast: boolean, extraClass = '') {
    return html`
      <li class="breadcrumb-item ${extraClass}">
        ${this._renderCrumb(item, index, isLast)}
        ${!isLast ? html`
          <span class="separator" aria-hidden="true">${this.separator}</span>
        ` : nothing}
      </li>
    `;
  }

  private _renderEllipsis(cssClass = '') {
    return html`
      <li class="breadcrumb-item ${cssClass}">
        <button
          class="ellipsis"
          @click="${this._expandCollapsed}"
          aria-label="Show all breadcrumb items"
        >&hellip;</button>
        <span class="separator" aria-hidden="true">${this.separator}</span>
      </li>
    `;
  }

  override render() {
    if (!this.items.length) return nothing;

    const items = this.items;
    const shouldCollapse = this.maxVisible > 0 && items.length > this.maxVisible && !this._expanded;

    if (shouldCollapse) {
      // Show first item, ellipsis, then last (maxVisible - 1) items
      const tailCount = Math.max(1, this.maxVisible - 1);
      const firstItem = items[0]!;
      const tailItems = items.slice(items.length - tailCount);

      return html`
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb-list">
            ${this._renderItem(firstItem, 0, false)}
            ${this._renderEllipsis()}
            ${tailItems.map((item, i) => {
              const originalIndex = items.length - tailCount + i;
              const isLast = originalIndex === items.length - 1;
              return this._renderItem(item, originalIndex, isLast);
            })}
          </ol>
        </nav>
      `;
    }

    // Full render — with auto-collapse classes for CSS media query on small screens
    const hasAutoCollapsibleMiddle = items.length > 3;

    return html`
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          ${items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;
            const isMiddle = !isFirst && !isLast && hasAutoCollapsibleMiddle;
            return html`
              ${this._renderItem(item, index, isLast, isMiddle ? 'collapsible-middle' : '')}
              ${isFirst && hasAutoCollapsibleMiddle ? this._renderEllipsis('ellipsis-item-auto') : nothing}
            `;
          })}
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-breadcrumbs': CgBreadcrumbs;
  }
}
