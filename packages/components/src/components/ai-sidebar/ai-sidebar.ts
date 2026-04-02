/**
 * @element ai-sidebar
 * Collapsible application sidebar with grouped sections. Each item
 * supports an icon, label, and badge. Collapses to icon-only mode
 * with a smooth width transition.
 *
 * @example
 * ```html
 * <ai-sidebar
 *   active-id="chat"
 *   .sections=${[{
 *     title: 'Tools',
 *     items: [
 *       { id: 'chat', label: 'Chat', icon: '[chat icon]', badge: '3' },
 *       { id: 'search', label: 'Search', icon: '[search icon]' }
 *     ]
 *   }]}
 * ></ai-sidebar>
 * ```
 *
 * @prop {SidebarSection[]} sections - Array of section groups with title and items
 * @prop {boolean} collapsed - Whether sidebar is in icon-only mode
 * @prop {string} activeId - ID of the currently active item
 *
 * @fires {CustomEvent<{id: string, label: string}>} ai-sidebar-item-click - When an item is clicked
 * @fires {CustomEvent<{collapsed: boolean}>} ai-sidebar-collapse - When collapse state toggles
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

@customElement('ai-sidebar')
export class AiSidebar extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }
    :host([hidden]) { display: none; }

    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--cg-color-surface, #18181b);
      border-right: 1px solid var(--cg-color-border, #27272a);
      width: 240px;
      overflow: hidden;
      transition: width 200ms ease;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }
    :host([collapsed]) .sidebar {
      width: 56px;
    }

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-bottom: 1px solid var(--cg-color-border, #27272a);
      color: var(--cg-color-text-secondary, #a1a1aa);
      padding: var(--cg-spacing-12, 12px);
      cursor: pointer;
      font-size: var(--cg-font-size-sm, 14px);
      transition: color 150ms ease;
    }
    .collapse-btn:hover {
      color: var(--cg-color-text-primary, #fafafa);
    }
    .collapse-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: -2px;
    }

    .sections {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-8, 8px) 0;
    }

    .section-title {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px) var(--cg-spacing-4, 4px);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cg-color-text-tertiary, #71717a);
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
      gap: var(--cg-spacing-8, 8px);
      width: 100%;
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px);
      background: none;
      border: none;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: var(--cg-font-size-sm, 14px);
      font-family: inherit;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
      transition: background 150ms ease, color 150ms ease;
    }
    :host([collapsed]) .item {
      justify-content: center;
      padding: var(--cg-spacing-8, 8px) 0;
    }
    .item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--cg-color-text-primary, #fafafa);
    }
    .item:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: -2px;
    }
    .item[aria-current="true"] {
      background: rgba(223, 255, 97, 0.08);
      color: var(--cg-color-accent, #dfff61);
    }

    .item-icon {
      flex-shrink: 0;
      width: 18px;
      text-align: center;
      font-size: var(--cg-font-size-sm, 14px);
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
      padding: 1px 6px;
      font-size: 10px;
      font-weight: 600;
      border-radius: var(--cg-border-radius-100, 8px);
      background: rgba(223, 255, 97, 0.15);
      color: var(--cg-color-accent, #dfff61);
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
    this.dispatchEvent(new CustomEvent('ai-sidebar-collapse', {
      detail: { collapsed: this.collapsed },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleItemClick(item: SidebarItem): void {
    this.dispatchEvent(new CustomEvent('ai-sidebar-item-click', {
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
    'ai-sidebar': AiSidebar;
  }
}
