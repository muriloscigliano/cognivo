import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { getDeepActiveElement, getFocusableElements, focusEntry } from '../../utils/focus-trap.js';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scroll-lock.js';

/** Below this width the sidebar is an overlay drawer, not a column. */
const PHONE_QUERY = '(max-width: 768px)';

/**
 * @element cg-app-shell
 * Top-level application scaffold composing header, sidebar, content, and
 * footer regions with landmark roles and a responsive collapsible sidebar.
 *
 * Desktop: the sidebar column is viewport-height and sticks under the header
 * while the page scrolls; it scrolls on its own, so `position: sticky`
 * content and a slotted sidebar's bottom footer work inside it. Collapsed,
 * the column is `inert`.
 *
 * `panel`: the dashboard layout — the header and sidebar sit on the canvas
 * (`--cg-color-surface-canvas-background`) and the content is one raised
 * panel (`--cg-color-surface-panel-*`, radius
 * `--cg-component-app-shell-panel-radius`, inset
 * `--cg-component-app-shell-panel-inset`), separated by surfaces and a
 * hairline instead of divider lines. Without a top bar (nothing in the
 * header slot) the header row takes no space and the panel sits
 * `--cg-component-app-shell-panel-top` (default: the inset) from the top.
 *
 * Phone (≤ 768px): the sidebar is an overlay drawer, open when not
 * `sidebar-collapsed`. It starts closed: on first load at phone width, and
 * when the window narrows from desktop (widening back restores the desktop
 * column as it was). While open: a backdrop covers the page (click closes),
 * Escape closes, the page behind does not scroll, the header, content and
 * footer are `inert` (focus stays in the drawer), and focus moves into the
 * sidebar when it opens and back to where it was when it closes. Closing
 * from the backdrop or Escape, and the breakpoint changes, fire
 * `cg-app-shell-toggle` like `toggleSidebar()`.
 *
 * Right-to-left: the drawer slides from the inline-start edge (the right in
 * `dir="rtl"`), and the panel's inset and the column's divider follow the
 * writing direction.
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
      /* Where the sticky sidebar column starts: under a sticky header, or at the top. */
      --_cg-shell-sidebar-top: 0px;
      /* 1 in left-to-right, -1 in right-to-left: the drawer slide follows the inline direction. */
      --_cg-shell-dir: 1;
      font-family: var(--cg-font-family-primary);
    }
    :host([sticky-header]) {
      --_cg-shell-sidebar-top: var(--_cg-shell-header-h);
    }
    :host(:dir(rtl)) {
      --_cg-shell-dir: -1;
    }

    .shell {
      display: grid;
      height: 100%;
      grid-template-rows: var(--_cg-shell-header-h) 1fr auto;
      grid-template-columns: 1fr;
      grid-template-areas:
        "header"
        "main"
        "footer";
      background: var(--cg-color-surface-base-background);
      color: var(--cg-color-surface-base-text);
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
      overscroll-behavior: contain;
      background: var(--cg-color-surface-sidebar-background);
      color: var(--cg-color-surface-sidebar-text);
      min-width: 0;
      /* The slotted sidebar fills the column, so its footer sits at the bottom. */
      display: flex;
      flex-direction: column;
    }
    ::slotted([slot="sidebar"]) {
      flex: 1 0 auto;
      min-height: 0;
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

    /* ── panel: canvas + one raised content panel ── */
    :host([panel]) .shell {
      background: var(--cg-color-surface-canvas-background);
    }
    :host([panel]) header,
    :host([panel]) footer { border: none; }
    :host([panel]) main {
      margin-block: 0 var(--cg-component-app-shell-panel-inset);
      margin-inline: var(--cg-component-app-shell-panel-inset);
      background: var(--cg-color-surface-panel-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-panel-border);
      border-radius: var(--cg-component-app-shell-panel-radius);
    }
    :host([panel][sidebar-position="end"]) main {
      margin-inline: var(--cg-component-app-shell-panel-inset) 0;
    }
    /* No top bar (empty header slot): the header row takes no space, and the
       panel sits --cg-component-app-shell-panel-top from the window top. */
    :host([panel]) .shell.no-header {
      --_cg-shell-header-h: 0px;
      --_cg-shell-sidebar-top: 0px;
    }
    :host([panel]) .no-header header { display: none; }
    :host([panel]) .no-header main { margin-top: var(--cg-component-app-shell-panel-top); }

    /* Empty regions collapse so they don't reserve borders */
    footer.empty { display: none; }

    .backdrop { display: none; }

    /* ── Desktop: the sidebar is a column ── */
    @media (min-width: 769px) {
      .shell {
        grid-template-columns: var(--_cg-shell-sidebar-w) 1fr;
        grid-template-areas:
          "header header"
          "sidebar main"
          "footer footer";
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

      /* Viewport-height column that stays in view while the page scrolls and
         scrolls on its own (in a height-bounded shell it fills its row). */
      aside {
        position: sticky;
        top: var(--_cg-shell-sidebar-top);
        align-self: start;
        height: 100%;
        max-height: calc(100dvh - var(--_cg-shell-sidebar-top));
        border-inline-end: var(--cg-border-width-50) solid var(--cg-color-surface-base-divider);
      }
      :host([sidebar-position="end"]) aside {
        border-inline-end: none;
        border-inline-start: var(--cg-border-width-50) solid var(--cg-color-surface-base-divider);
      }
      /* Collapsed: out of sight, the tab order and the accessibility tree (also inert). */
      :host([sidebar-collapsed]) aside { border: none; visibility: hidden; }
      :host([panel]) aside { border: none; }
    }

    /* ── Phone: the sidebar is an overlay drawer ── */
    @media (max-width: 768px) {
      aside {
        position: fixed;
        top: var(--_cg-shell-header-h);
        bottom: 0;
        inset-inline-start: 0;
        width: var(--_cg-shell-sidebar-w);
        max-width: 100%;
        z-index: var(--cg-z-index-300);
        box-shadow: var(--cg-shadow-elevation-xl);
        /* Opening: visible at once, so focus can move in. */
        transition:
          transform var(--cg-transition-duration-slow) var(--cg-transition-easing-default),
          visibility 0s;
      }
      /* Closing: hidden once it has slid away. */
      :host([sidebar-collapsed]) aside {
        visibility: hidden;
        transition:
          transform var(--cg-transition-duration-slow) var(--cg-transition-easing-default),
          visibility 0s linear var(--cg-transition-duration-slow);
      }
      :host([sidebar-position="end"]) aside {
        inset-inline-start: auto;
        inset-inline-end: 0;
      }
      /* Slide out past the inline-start (or, for end, inline-end) edge. */
      :host([sidebar-collapsed]) aside {
        transform: translateX(calc(-1 * var(--_cg-shell-dir) * (var(--_cg-shell-sidebar-w) + var(--cg-spacing-16))));
      }
      :host([sidebar-position="end"][sidebar-collapsed]) aside {
        transform: translateX(calc(var(--_cg-shell-dir) * (var(--_cg-shell-sidebar-w) + var(--cg-spacing-16))));
      }

      .backdrop {
        display: block;
        position: fixed;
        inset: 0;
        z-index: var(--cg-z-index-300);
        background: var(--cg-color-modal-overlay-background);
        transition:
          opacity var(--cg-transition-duration-slow) var(--cg-transition-easing-default),
          visibility var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
      }
      :host([sidebar-collapsed]) .backdrop {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    }
  `];

  @property({ attribute: 'sidebar-position', reflect: true }) sidebarPosition: 'start' | 'end' = 'start';
  @property({ attribute: 'sidebar-width', reflect: true }) sidebarWidth = '260px';
  @property({ type: Boolean, attribute: 'sidebar-collapsed', reflect: true }) sidebarCollapsed = false;
  @property({ attribute: 'header-height', reflect: true }) headerHeight = '56px';
  @property({ type: Boolean, attribute: 'sticky-header', reflect: true }) stickyHeader = true;
  /** Dashboard layout: canvas with the sidebar on it + one raised content panel. */
  @property({ type: Boolean, reflect: true }) panel = false;

  /** True below the phone breakpoint, where the sidebar is an overlay drawer. */
  @state() private _phone = false;

  private _hasFooter = false;
  @state() private _hasHeader = false;
  private _media: MediaQueryList | null = null;
  /** The desktop column's collapsed state before the window narrowed to a phone. */
  private _desktopCollapsed: boolean | null = null;
  /** Focus to restore when the phone drawer closes. */
  private _returnFocus: HTMLElement | null = null;

  /** The phone drawer is showing. */
  private get _drawerOpen(): boolean {
    return this._phone && !this.sidebarCollapsed;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this._media = window.matchMedia?.(PHONE_QUERY) ?? null;
    this._phone = this._media?.matches ?? false;
    // A phone drawer starts closed (not covering the page on first load);
    // widening to desktop later restores the column as authored. Closing it
    // fires cg-app-shell-toggle, the same as a breakpoint change.
    if (this._phone && this._desktopCollapsed === null) {
      this._desktopCollapsed = this.sidebarCollapsed;
      this._setCollapsed(true);
    }
    this._media?.addEventListener('change', this._onMediaChange);
    document.addEventListener('keydown', this._onKeydown);
    // Moved in the page while the phone drawer is open: disconnectedCallback
    // released the lock; take it back.
    if (this.hasUpdated && this._drawerOpen) lockBodyScroll(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._media?.removeEventListener('change', this._onMediaChange);
    document.removeEventListener('keydown', this._onKeydown);
    unlockBodyScroll(this);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('sidebarWidth')) {
      this.style.setProperty('--_cg-shell-sidebar-w', this.sidebarWidth || '260px');
    }
    if (changed.has('headerHeight')) {
      this.style.setProperty('--_cg-shell-header-h', this.headerHeight || '56px');
    }
    if (changed.has('sidebarCollapsed') || changed.has('_phone')) {
      if (this._drawerOpen) lockBodyScroll(this);
      else unlockBodyScroll(this);
    }
    // Focus follows the drawer only when it opens or closes on a phone (not on
    // first render, and not when a desktop column collapses).
    if (changed.has('sidebarCollapsed') && changed.get('sidebarCollapsed') !== undefined && this._phone) {
      if (this.sidebarCollapsed) this._restoreFocus();
      else this._focusSidebar();
    }
  }

  /** Flip the sidebar collapse state. */
  toggleSidebar(): void {
    this._setCollapsed(!this.sidebarCollapsed);
  }

  private _setCollapsed(collapsed: boolean): void {
    if (collapsed === this.sidebarCollapsed) return;
    this.sidebarCollapsed = collapsed;
    this.dispatchEvent(new CustomEvent('cg-app-shell-toggle', {
      detail: { collapsed: this.sidebarCollapsed },
      bubbles: true,
      composed: true,
    }));
  }

  private _onMediaChange = (e: MediaQueryListEvent): void => {
    this._phone = e.matches;
    if (e.matches) {
      // Narrowed to a phone: the drawer starts closed; remember the desktop column.
      this._desktopCollapsed = this.sidebarCollapsed;
      this._setCollapsed(true);
    } else if (this._desktopCollapsed !== null) {
      // Widened back: the desktop column as it was.
      this._setCollapsed(this._desktopCollapsed);
      this._desktopCollapsed = null;
    }
  };

  private _onKeydown = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape' || !this._drawerOpen || e.defaultPrevented) return;
    e.preventDefault();
    this._setCollapsed(true);
  };

  private _focusSidebar(): void {
    this._returnFocus = getDeepActiveElement();
    const aside = this.renderRoot.querySelector('aside');
    if (!aside) return;
    // Focus once the drawer is visible (a visibility transition, even a
    // reduced-motion one, can keep it hidden for a frame or two).
    let frames = 10;
    const tryFocus = (): void => {
      if (this.sidebarCollapsed || !this._phone) return;
      const first = getFocusableElements(aside)[0];
      if (first) focusEntry(first);
      else if (frames-- > 0) requestAnimationFrame(tryFocus);
    };
    requestAnimationFrame(tryFocus);
  }

  private _restoreFocus(): void {
    const target = this._returnFocus;
    this._returnFocus = null;
    const aside = this.renderRoot.querySelector('aside');
    const active = getDeepActiveElement();
    // Only pull focus back if it is still inside the closing drawer (or lost).
    const inDrawer = !active || active === document.body || (aside !== null && this._contains(aside, active));
    if (target?.isConnected && inDrawer) target.focus();
  }

  private _contains(aside: Element, node: Element): boolean {
    if (aside.contains(node)) return true;
    const slot = aside.querySelector('slot');
    return (slot?.assignedElements({ flatten: true }) ?? []).some((el) => el === node || el.contains(node) || this._shadowContains(el, node));
  }

  private _shadowContains(host: Element, node: Node): boolean {
    let el: Node | null = node;
    while (el) {
      if (el === host) return true;
      el = el instanceof ShadowRoot ? el.host : el.parentNode;
    }
    return false;
  }

  private _onFooterSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    const has = slot.assignedNodes({ flatten: true }).length > 0;
    if (has !== this._hasFooter) {
      this._hasFooter = has;
      this.requestUpdate();
    }
  }

  private _onHeaderSlotChange(e: Event): void {
    this._hasHeader = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  override render() {
    // While the phone drawer is open, the rest of the page is inert: focus stays in the drawer.
    const behind = this._drawerOpen;
    return html`
      <div class="shell ${this._hasHeader ? '' : 'no-header'}">
        <header ?inert=${behind}><slot name="header" @slotchange=${this._onHeaderSlotChange}></slot></header>
        <div class="backdrop" @click=${() => this._setCollapsed(true)}></div>
        <aside ?inert=${this.sidebarCollapsed}>
          <slot name="sidebar"></slot>
        </aside>
        <main ?inert=${behind}><slot></slot></main>
        <footer class=${this._hasFooter ? '' : 'empty'} ?inert=${behind}>
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
