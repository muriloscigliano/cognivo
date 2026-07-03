import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-app-shell
 * Top-level application scaffold composing header, sidebar, content, and
 * footer regions with landmark roles and a responsive collapsible sidebar.
 *
 * @example
 * ```html
 * <cg-app-shell>
 *   <cg-navbar slot="header">…</cg-navbar>
 *   <cg-sidebar slot="sidebar">…</cg-sidebar>
 *   <main-content></main-content>
 *   <div slot="footer">© Cognivo</div>
 * </cg-app-shell>
 * ```
 *
 * @slot header - Top bar (banner landmark).
 * @slot sidebar - Navigation rail (complementary landmark).
 * @slot - Main content.
 * @slot footer - Bottom bar (contentinfo landmark).
 *
 * @fires {CustomEvent<{collapsed: boolean}>} cg-app-shell-toggle
 */
@customElement('cg-app-shell')
export class CgAppShell extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      height: 100%;
      --_cg-shell-sidebar-w: 260px;
      --_cg-shell-header-h: 56px;
      font-family: var(--cg-font-family-primary);
    }

    .shell {
      display: grid;
      height: 100%;
      grid-template-rows: var(--_cg-shell-header-h) 1fr auto;
      grid-template-columns: var(--_cg-shell-sidebar-w) 1fr;
      grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
      background: var(--cg-color-surface-base-background);
      color: var(--cg-color-surface-base-text);
      transition: grid-template-columns var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    /* Sidebar on the end side swaps the columns/areas */
    :host([sidebar-position="end"]) .shell {
      grid-template-columns: 1fr var(--_cg-shell-sidebar-w);
      grid-template-areas:
        "header header"
        "main sidebar"
        "footer footer";
    }

    /* Collapsed → sidebar column shrinks to 0 */
    :host([sidebar-collapsed]) .shell {
      grid-template-columns: 0 1fr;
    }
    :host([sidebar-collapsed][sidebar-position="end"]) .shell {
      grid-template-columns: 1fr 0;
    }

    header {
      grid-area: header;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-base-divider);
      min-width: 0;
    }
    :host([sticky-header]) header { position: sticky; top: 0; z-index: var(--cg-z-index-200); }

    aside {
      grid-area: sidebar;
      overflow: hidden auto;
      background: var(--cg-color-surface-sidebar-background);
      color: var(--cg-color-surface-sidebar-text);
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-base-divider);
      min-width: 0;
    }
    :host([sidebar-position="end"]) aside {
      border-right: none;
      border-left: var(--cg-border-width-50) solid var(--cg-color-surface-base-divider);
    }

    main {
      grid-area: main;
      overflow: auto;
      min-width: 0;
    }

    footer {
      grid-area: footer;
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-base-divider);
      min-width: 0;
    }

    /* Empty regions collapse so they don't reserve borders */
    footer.empty { display: none; }

    /* Mobile: sidebar overlays instead of taking a column */
    @media (max-width: 768px) {
      .shell {
        grid-template-columns: 1fr;
        grid-template-areas:
          "header"
          "main"
          "footer";
      }
      aside {
        position: fixed;
        top: var(--_cg-shell-header-h);
        bottom: 0;
        inset-inline-start: 0;
        width: var(--_cg-shell-sidebar-w);
        z-index: var(--cg-z-index-300);
        box-shadow: var(--cg-shadow-lg);
      }
      :host([sidebar-position="end"]) aside {
        inset-inline-start: auto;
        inset-inline-end: 0;
      }
      :host([sidebar-collapsed]) aside {
        transform: translateX(calc(-1 * (var(--_cg-shell-sidebar-w) + var(--cg-spacing-16))));
      }
      :host([sidebar-position="end"][sidebar-collapsed]) aside {
        transform: translateX(calc(var(--_cg-shell-sidebar-w) + var(--cg-spacing-16)));
      }
    }
  `];

  @property({ attribute: 'sidebar-position', reflect: true }) sidebarPosition: 'start' | 'end' = 'start';
  @property({ attribute: 'sidebar-width', reflect: true }) sidebarWidth = '260px';
  @property({ type: Boolean, attribute: 'sidebar-collapsed', reflect: true }) sidebarCollapsed = false;
  @property({ attribute: 'header-height', reflect: true }) headerHeight = '56px';
  @property({ type: Boolean, attribute: 'sticky-header', reflect: true }) stickyHeader = true;

  private _hasFooter = false;

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('sidebarWidth')) {
      this.style.setProperty('--_cg-shell-sidebar-w', this.sidebarWidth || '260px');
    }
    if (changed.has('headerHeight')) {
      this.style.setProperty('--_cg-shell-header-h', this.headerHeight || '56px');
    }
  }

  /** Flip the sidebar collapse state. */
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.dispatchEvent(new CustomEvent('cg-app-shell-toggle', {
      detail: { collapsed: this.sidebarCollapsed },
      bubbles: true,
      composed: true,
    }));
  }

  private _onFooterSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    const has = slot.assignedNodes({ flatten: true }).length > 0;
    if (has !== this._hasFooter) {
      this._hasFooter = has;
      this.requestUpdate();
    }
  }

  override render() {
    return html`
      <div class="shell">
        <header><slot name="header"></slot></header>
        <aside aria-hidden=${this.sidebarCollapsed ? 'true' : 'false'}>
          <slot name="sidebar"></slot>
        </aside>
        <main><slot></slot></main>
        <footer class=${this._hasFooter ? '' : 'empty'}>
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </footer>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-app-shell': CgAppShell;
  }
}
