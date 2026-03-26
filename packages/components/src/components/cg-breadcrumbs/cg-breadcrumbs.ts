import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

/**
 * <cg-breadcrumbs> — Navigation breadcrumb trail.
 *
 * Features:
 * - Horizontal trail with customizable separator
 * - Last item is current page (no link, bold)
 * - Items are clickable links
 * - Icon support per item
 * - Overflow ellipsis for long trails
 * - aria-label="Breadcrumb" with proper landmark
 * - HeroUI timing + focus ring
 */
@customElement('cg-breadcrumbs')
export class CgBreadcrumbs extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

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
      transition:
        color 100ms cubic-bezier(0, 0, 0.58, 1),
        background-color 100ms cubic-bezier(0, 0, 0.58, 1);
      -webkit-font-smoothing: antialiased;
    }

    .crumb-link:hover {
      color: var(--cg-color-text-primary, #fafafa);
      background: var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.06));
    }

    .crumb-link:active {
      transform: scale(0.97);
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
  

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }
  `;

  @property({ type: Array }) items: BreadcrumbItem[] = [];
  @property({ type: String }) separator = '/';

  private _handleClick(item: BreadcrumbItem, index: number) {
    this.dispatchEvent(new CustomEvent('cg-breadcrumb-click', {
      bubbles: true,
      composed: true,
      detail: { label: item.label, href: item.href, index },
    }));
  }

  override render() {
    if (!this.items.length) return nothing;

    return html`
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          ${this.items.map((item, index) => {
            const isLast = index === this.items.length - 1;
            const showSep = index < this.items.length - 1;

            return html`
              <li class="breadcrumb-item">
                ${isLast ? html`
                  <span class="crumb-current" aria-current="page">
                    ${item.icon ? html`<span class="crumb-icon">${item.icon}</span>` : nothing}
                    ${item.label}
                  </span>
                ` : html`
                  ${item.href ? html`
                    <a
                      class="crumb-link"
                      href="${item.href}"
                      @click="${(e: Event) => { e.preventDefault(); this._handleClick(item, index); }}"
                    >
                      ${item.icon ? html`<span class="crumb-icon">${item.icon}</span>` : nothing}
                      ${item.label}
                    </a>
                  ` : html`
                    <button
                      class="crumb-link"
                      @click="${() => this._handleClick(item, index)}"
                    >
                      ${item.icon ? html`<span class="crumb-icon">${item.icon}</span>` : nothing}
                      ${item.label}
                    </button>
                  `}
                `}
                ${showSep ? html`
                  <span class="separator" aria-hidden="true">${this.separator}</span>
                ` : nothing}
              </li>
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
