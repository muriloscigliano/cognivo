/**
 * <ai-sidebar> — Collapsible app sidebar with sections.
 *
 * Props: sections, collapsed, activeId
 * Events: ai-sidebar-item-click, ai-sidebar-collapse
 * Features: section headers, optional icon+badge, collapse to icon-only,
 *           active item highlight, smooth width transition
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
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
      padding: 12px;
      cursor: pointer;
      font-size: 14px;
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
      padding: 8px 0;
    }

    .section-title {
      padding: 8px 16px 4px;
      font-size: 11px;
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
      gap: 10px;
      width: 100%;
      padding: 8px 16px;
      background: none;
      border: none;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 13px;
      font-family: inherit;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
      transition: background 150ms ease, color 150ms ease;
    }
    :host([collapsed]) .item {
      justify-content: center;
      padding: 10px 0;
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
      font-size: 15px;
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
      border-radius: 8px;
      background: rgba(223, 255, 97, 0.15);
      color: var(--cg-color-accent, #dfff61);
    }
    :host([collapsed]) .item-badge {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .sidebar { transition: none; }
    }
  `;

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
