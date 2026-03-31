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
      padding: 0 var(--cg-spacing-8, 8px);
      color: var(--cg-color-text-disabled, #52525b);
      font-size: var(--cg-font-size-xs, 12px);
      user-select: none;
      flex-shrink: 0;
    }

    .crumb-link {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-4, 4px);
      border-radius: var(--cg-border-radius-050, 4px);
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-text-secondary, #a1a1aa);
      text-decoration: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
      cursor: pointer;
      border: none;
      background: transparent;
      font-family: inherit;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
    }

    .crumb-link:hover {
      color: var(--cg-color-text-primary, #fafafa);
      background: var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.06));
    }

    .crumb-link:active {
      transform: scale(var(--cg-interaction-press-scale, 0.97));
    }

    .crumb-link:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
    }

    /* Current (last) item */
    .crumb-current {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
      padding: var(--cg-spacing-4, 4px);
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-text-primary, #fafafa);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
      line-height: 1.4;
    }

    .crumb-icon {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      font-size: 14px;
      width: 16px;
      height: 16px;
      justify-content: center;
    }

    /* ── Ellipsis button ── */
    .ellipsis {
      display: inline-flex;
      align-items: center;
      color: var(--cg-color-text-disabled, #52525b);
      cursor: pointer;
      padding: var(--cg-spacing-2, 2px) var(--cg-spacing-4, 4px);
      border-radius: var(--cg-border-radius-050, 4px);
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: var(--cg-font-size-sm, 14px);
      line-height: 1.4;
      letter-spacing: 2px;
    }

    .ellipsis:hover {
      background: var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.06));
      color: var(--cg-color-text-secondary, #a1a1aa);
    }

    .ellipsis:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
    }

    /* Size variants */
    :host([size="sm"]) .crumb-link { font-size: 12px; padding: 2px 6px; }
    :host([size="sm"]) .crumb-current { font-size: 12px; padding: 2px 6px; }
    :host([size="sm"]) .separator { padding: 0 4px; font-size: 10px; }
    :host([size="sm"]) .ellipsis { font-size: 12px; padding: 2px 4px; }

    :host([size="lg"]) .crumb-link { font-size: 16px; padding: 6px 12px; }
    :host([size="lg"]) .crumb-current { font-size: 16px; padding: 6px 12px; }
    :host([size="lg"]) .separator { padding: 0 8px; font-size: 14px; }
    :host([size="lg"]) .ellipsis { font-size: 16px; padding: 4px 8px; }

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
        padding: var(--cg-spacing-2, 2px) var(--cg-spacing-4, 4px);
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
