/**
 * @element ai-app-sidebar
 * Data-driven application sidebar with grouped sections, item icons, badges,
 * and a collapse-to-icon-only mode. Renamed from `<ai-sidebar>` to clarify that
 * it is the *AI app shell* sidebar (data-driven via `sections` prop), distinct
 * from the slot-based foundation `<cg-sidebar>`.
 *
 * @example
 * ```html
 * <ai-app-sidebar
 *   active-id="chat"
 *   .sections=${[{
 *     title: 'Tools',
 *     items: [
 *       { id: 'chat', label: 'Chat', icon: '[chat icon]', badge: '3' },
 *       { id: 'search', label: 'Search', icon: '[search icon]' }
 *     ]
 *   }]}
 * ></ai-app-sidebar>
 * ```
 *
 * @prop {SidebarSection[]} sections - Array of section groups with title and items
 * @prop {boolean} collapsed - Whether sidebar is in icon-only mode
 * @prop {string} activeId - ID of the currently active item
 *
 * @fires {CustomEvent<{id: string, label: string}>} ai-app-sidebar-item-click - When an item is clicked
 * @fires {CustomEvent<{collapsed: boolean}>} ai-app-sidebar-collapse - When collapse state toggles
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

@customElement('ai-app-sidebar')
export class AiAppSidebar extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([hidden]) { display: none; }

    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--cg-color-surface-sidebar-background);
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-sidebar-border);
      width: var(--ai-sidebar-width, 240px);
      overflow: hidden;
      transition: width var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    :host([collapsed]) .sidebar {
      width: var(--ai-sidebar-collapsed-width, 56px);
    }

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-sidebar-border);
      color: var(--cg-color-surface-sidebar-text);
      padding: var(--cg-spacing-12);
      cursor: pointer;
      font-size: var(--cg-font-size-sm);
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .collapse-btn:hover {
      color: var(--cg-color-surface-base-text);
    }
    .collapse-btn:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: calc(-1 * var(--cg-border-width-100));
    }

    .sections {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-8) 0;
    }

    .section-title {
      padding: var(--cg-spacing-8) var(--cg-spacing-16) var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      color: var(--cg-color-surface-sidebar-text);
      white-space: nowrap;
      overflow: hidden;
    }
    :host([collapsed]) .section-title {
      opacity: 0;
      height: 0;
      padding: 0;
    }

    .item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      width: 100%;
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      background: none;
      border: none;
      color: var(--cg-color-surface-sidebar-text);
      font-size: var(--cg-font-size-sm);
      font-family: inherit;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([collapsed]) .item {
      justify-content: center;
      padding: var(--cg-spacing-8) 0;
    }
    .item:hover {
      background: var(--cg-color-surface-sidebar-hover-background);
      color: var(--cg-color-surface-base-text);
    }
    .item:active { transform: scale(var(--cg-interaction-press-scale)); }
    .item:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: calc(-1 * var(--cg-border-width-100));
    }
    .item[aria-current="true"] {
      background: var(--cg-color-surface-sidebar-active-background);
      color: var(--cg-color-surface-base-text);
    }

    .item-icon {
      flex-shrink: 0;
      width: var(--cg-spacing-16);
      text-align: center;
      font-size: var(--cg-font-size-sm);
      color: inherit;
    }

    .item-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host([collapsed]) .item-label {
      display: none;
    }

    .item-badge {
      flex-shrink: 0;
      padding: var(--cg-spacing-1) var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-overlay-accent-strong);
      color: var(--cg-color-surface-base-text);
    }
    :host([collapsed]) .item-badge {
      display: none;
    }
  `];

  @property({ type: Array }) sections: SidebarSection[] = [];
  @property({ type: Boolean, reflect: true }) collapsed = false;
  @property({ type: String, attribute: 'active-id' }) activeId = '';

  private _handleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('ai-app-sidebar-collapse', {
      detail: { collapsed: this.collapsed },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleItemClick(item: SidebarItem): void {
    this.dispatchEvent(new CustomEvent('ai-app-sidebar-item-click', {
      detail: { id: item.id, label: item.label },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    const chevron = this.collapsed ? '\u25B6' : '\u25C0';
    return html`
      <nav class="sidebar" role="navigation" aria-label="Sidebar navigation">
        <button
          class="collapse-btn"
          @click=${this._handleCollapse}
          aria-label=${this.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >${chevron}</button>

        <div class="sections">
          ${this.sections.map(section => html`
            ${!this.collapsed ? html`<div class="section-title">${section.title}</div>` : nothing}
            ${section.items.map(item => html`
              <button
                class="item"
                role="menuitem"
                tabindex="0"
                aria-current=${item.id === this.activeId ? 'true' : 'false'}
                aria-label=${item.label}
                @click=${() => this._handleItemClick(item)}
              >
                ${item.icon ? html`<span class="item-icon">${item.icon}</span>` : nothing}
                <span class="item-label">${item.label}</span>
                ${item.badge ? html`<span class="item-badge">${item.badge}</span>` : nothing}
              </button>
            `)}
          `)}
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-app-sidebar': AiAppSidebar;
  }
}
