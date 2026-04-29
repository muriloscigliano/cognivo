import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reducedMotion } from '../../styles/index.js';

/**
 * @element cg-sidebar
 * Modern collapsible side navigation panel. Two states (expanded ↔ icon-only),
 * smooth 200ms width transition, full-row hit targets on slotted `<a>` / `<button>`
 * items, `aria-current` active state, and section headers via `.section-title`.
 *
 * Modeled after the 2024–2025 consensus from shadcn/ui, Linear, Notion, and Cursor:
 * 8px grid, full-row click targets, no hover-peek, native `title` for collapsed
 * tooltips.
 *
 * @example
 * ```html
 * <cg-sidebar collapsible>
 *   <div slot="header">Logo</div>
 *
 *   <div class="section-title">Workspace</div>
 *   <a href="/dashboard" aria-current="page" title="Dashboard">
 *     <span aria-hidden="true">◐</span><span data-label>Dashboard</span>
 *   </a>
 *   <a href="/settings" title="Settings">
 *     <span aria-hidden="true">⚙</span><span data-label>Settings</span>
 *   </a>
 *
 *   <div slot="footer">User</div>
 * </cg-sidebar>
 * ```
 *
 * @slot header - Branding/header area (auto-hides when empty)
 * @slot - Navigation content (`<a>` / `<button>` get modern default styling)
 * @slot footer - Footer area (auto-hides when empty)
 *
 * @fires {CustomEvent<{collapsed: boolean}>} cg-sidebar-toggle
 */
@customElement('cg-sidebar')
export class CgSidebar extends LitElement {
  static override styles = [reducedMotion, css`
    :host {
      display: block;
      width: var(--cg-component-sidebar-width);
      height: 100%;
      font-family: var(--cg-font-family-primary);
      flex-shrink: 0;
      transition: width var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    :host([collapsed]) {
      width: var(--cg-component-sidebar-collapsed-width);
    }
    :host([sticky]) {
      position: sticky;
      top: 0;
      max-height: 100vh;
    }

    /* ── Panel ── */
    .nav {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-container-text);
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }
    :host([side="right"]) .nav {
      border-right: none;
      border-left: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }

    /* ── Header ── */
    .header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-8);
      min-height: var(--cg-spacing-56);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }
    :host([collapsed]) .header {
      padding: var(--cg-spacing-12) var(--cg-spacing-8);
      justify-content: center;
    }
    :host([data-header-empty]) .header { display: none; }

    /* ── Body ── */
    .body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--cg-spacing-8);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
    }
    :host([collapsed]) .body {
      padding: var(--cg-spacing-8) var(--cg-spacing-6);
    }

    /* ── Footer ── */
    .footer {
      flex-shrink: 0;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }
    :host([collapsed]) .footer {
      padding: var(--cg-spacing-12) var(--cg-spacing-8);
    }
    :host([data-footer-empty]) .footer { display: none; }

    /* ── Toggle button ── */
    .toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      padding: 0;
      border: none;
      border-radius: var(--cg-border-radius-100);
      background: transparent;
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      flex-shrink: 0;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .toggle:hover {
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-base-text);
    }
    .toggle:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-border-width-50);
    }
    .toggle svg {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    :host([collapsed]) .toggle svg {
      transform: rotate(180deg);
    }

    /* ── Modern nav-item defaults — applies to slotted <a> and <button> ── */
    ::slotted(a),
    ::slotted(button) {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      width: 100%;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border: none;
      border-radius: var(--cg-border-radius-100);
      background: transparent;
      color: var(--cg-color-surface-container-outlined);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      line-height: var(--cg-line-height-snug);
      text-decoration: none;
      text-align: left;
      cursor: pointer;
      box-sizing: border-box;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    ::slotted(a:hover),
    ::slotted(button:hover) {
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-base-text);
    }
    ::slotted(a[aria-current]),
    ::slotted(button[aria-current]),
    ::slotted(a.active),
    ::slotted(button.active) {
      background: var(--cg-color-surface-cards-active-background);
      color: var(--cg-color-surface-base-text);
    }
    ::slotted(a:focus-visible),
    ::slotted(button:focus-visible) {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: calc(-1 * var(--cg-border-width-100));
    }

    /* ── Section labels ── */
    ::slotted(.section-title),
    ::slotted([data-section-title]) {
      display: block;
      padding: var(--cg-spacing-12) var(--cg-spacing-12) var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    /* ── Collapsed: hide labels & section titles, center icons ── */
    :host([collapsed]) ::slotted([data-label]),
    :host([collapsed]) ::slotted(.label),
    :host([collapsed]) ::slotted(.section-title),
    :host([collapsed]) ::slotted([data-section-title]) {
      display: none;
    }
    :host([collapsed]) ::slotted(a),
    :host([collapsed]) ::slotted(button) {
      justify-content: center;
      padding: var(--cg-spacing-8);
      gap: 0;
    }
  `];

  @property({ type: Boolean, reflect: true }) collapsed = false;
  @property({ type: Boolean }) collapsible = false;
  @property({ reflect: true }) side: 'left' | 'right' = 'left';
  @property({ type: Boolean, reflect: true }) sticky = false;
  @property() width = '';

  // Default to *visible* — slotchange flips to hidden if empty (avoids first-paint flicker).
  @state() private _headerEmpty = false;
  @state() private _footerEmpty = false;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.width) {
      this.style.setProperty('--cg-component-sidebar-width', this.width);
    }
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('width') && this.width) {
      this.style.setProperty('--cg-component-sidebar-width', this.width);
    }
    if (changed.has('_headerEmpty')) {
      this.toggleAttribute('data-header-empty', this._headerEmpty);
    }
    if (changed.has('_footerEmpty')) {
      this.toggleAttribute('data-footer-empty', this._footerEmpty);
    }
  }

  private _toggle() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('cg-sidebar-toggle', {
      detail: { collapsed: this.collapsed },
      bubbles: true,
      composed: true,
    }));
  }

  private _onHeaderSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    // Header is "empty" only when slot has no content AND there's no toggle button.
    this._headerEmpty = slot.assignedNodes({ flatten: true }).length === 0 && !this.collapsible;
  };

  private _onFooterSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._footerEmpty = slot.assignedNodes({ flatten: true }).length === 0;
  };

  override render() {
    return html`
      <nav class="nav" role="navigation" aria-label="Primary navigation">
        <div class="header">
          <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
          ${this.collapsible ? html`
            <button
              class="toggle"
              type="button"
              aria-label=${this.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded=${this.collapsed ? 'false' : 'true'}
              aria-controls="sidebar-body"
              @click=${this._toggle}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
          ` : nothing}
        </div>
        <div class="body" id="sidebar-body">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-sidebar': CgSidebar;
  }
}
