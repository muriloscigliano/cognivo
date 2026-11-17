import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { reducedMotion, nativeFont } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';
import { slotHasContent, observeLightDom } from '../../utils/slot-content.js';

const MESSAGES = defineMessages('cg-sidebar', {
  label: 'Primary navigation',
  expand: 'Expand sidebar',
  collapse: 'Collapse sidebar',
});

/**
 * @element cg-sidebar
 * Modern collapsible side navigation panel. Sits on the app canvas
 * (`--cg-color-surface-sidebar-*`); the active item is a subtle filled pill;
 * items marked `data-sub` are indented under their parent with a thin guide line
 * (`--cg-color-surface-sidebar-guide`); the outer edge is
 * `--cg-color-surface-sidebar-edge` (set it `transparent` on the canvas — the
 * guide line stays). Two states (expanded ↔ icon-only),
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
 *   <a href="/settings/team" data-sub>Team</a>
 *
 *   <div slot="footer">User</div>
 * </cg-sidebar>
 * ```
 *
 * @slot header - Branding/header area (collapses when empty: nothing slotted, or an
 *   empty wrapper — unless it holds the `collapsible` toggle)
 * @slot - Navigation content (`<a>` / `<button>` get modern default styling)
 * @slot footer - Footer area (collapses when empty)
 *
 * @fires {CustomEvent<{collapsed: boolean}>} cg-sidebar-toggle
 */
@customElement('cg-sidebar')
export class CgSidebar extends LitElement {
  static override styles = [nativeFont, reducedMotion, css`
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
      background: var(--cg-color-surface-sidebar-background);
      color: var(--cg-color-surface-sidebar-text);
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-sidebar-edge);
    }
    :host([side="right"]) .nav {
      border-right: none;
      border-left: var(--cg-border-width-50) solid var(--cg-color-surface-sidebar-edge);
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
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-sidebar-border);
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
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-sidebar-border);
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
    @media (hover: hover) {
      .toggle:hover {
        background: var(--cg-color-state-hover);
        color: var(--cg-color-state-text);
      }
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
      /* Interaction states: colour only, 150ms ease-out. */
      transition:
        background-color var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out),
        color var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
    }
    /* Hover (devices that hover): a neutral fill one step off the canvas,
       near-black text. The current item does not change on hover. */
    @media (hover: hover) {
      ::slotted(a:hover:not([aria-current], .active, [data-sub])),
      ::slotted(button:hover:not([aria-current], .active, [data-sub])) {
        background: var(--cg-color-surface-sidebar-hover-background);
        color: var(--cg-color-state-text);
      }
      /* Sub-items: text only, no fill. */
      ::slotted([data-sub]:hover) { color: var(--cg-color-state-text); }
    }
    ::slotted(a:active:not([aria-current], .active, [data-sub])),
    ::slotted(button:active:not([aria-current], .active, [data-sub])) {
      background: var(--cg-color-surface-sidebar-active-background);
    }
    /* Icon sizing contract: the leading icon (aria-hidden span or [data-icon])
       gets a fixed square box so every row's label starts at the same x —
       consumers no longer have to hand-fix alignment with inline widths. */
    ::slotted(a) > [aria-hidden="true"],
    ::slotted(button) > [aria-hidden="true"],
    ::slotted(a) > [data-icon],
    ::slotted(button) > [data-icon] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-icon-size-100);
      flex-shrink: 0;
      text-align: center;
    }
    /* Current: a white (dark: panel) pill with a hairline, near-black text —
       a surface, never a coloured bar. */
    ::slotted(a[aria-current]),
    ::slotted(button[aria-current]),
    ::slotted(a.active),
    ::slotted(button.active) {
      background: var(--cg-color-surface-sidebar-selected-background);
      box-shadow: 0 0 0 var(--cg-border-width-50) var(--cg-color-state-pill-border);
      color: var(--cg-color-state-text);
    }
    /* A current sub-item: near-black text, no pill. */
    ::slotted([data-sub][aria-current]),
    ::slotted([data-sub].active) {
      background: transparent;
      box-shadow: none;
    }

    /* Sub-items: indented under their parent, joined by a thin guide line. */
    ::slotted([data-sub]) {
      position: relative;
      margin-left: var(--cg-spacing-24);
      width: calc(100% - var(--cg-spacing-24));
    }
    ::slotted([data-sub])::before {
      content: '';
      position: absolute;
      left: calc(-1 * var(--cg-spacing-4));
      top: calc(-1 * var(--cg-spacing-2));
      bottom: 0;
      width: var(--cg-border-width-50);
      background: var(--cg-color-surface-sidebar-guide);
    }
    :host([collapsed]) ::slotted([data-sub]) { margin-left: auto; }
    :host([collapsed]) ::slotted([data-sub])::before { display: none; }

    /* Keyboard focus: the neutral ring, 2px, 2px off the item, same radius. */
    ::slotted(a:focus-visible),
    ::slotted(button:focus-visible) {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-border-width-100);
    }

    /* ── Section labels ──
       Scaffolding, not content — kept quiet (medium weight, muted color) so
       they group the nav without competing with the items for attention. */
    ::slotted(.section-title),
    ::slotted([data-section-title]) {
      display: block;
      padding: var(--cg-spacing-12) var(--cg-spacing-12) var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    /* The first section title shouldn't add a big gap under the header. */
    ::slotted(.section-title:first-child),
    ::slotted([data-section-title]:first-child) {
      padding-top: var(--cg-spacing-4);
    }

    /* ── Collapsed: collapse to an icon-only rail ──
       Robust by default: we do NOT depend on the consumer wrapping every
       label in <span data-label>. In collapsed mode the slotted item is
       clipped to icon width and its text is zeroed out, so plain
       <a href>Dashboard</a> markup collapses cleanly instead of bleeding
       half-clipped text into the rail. The icon (first child, or an explicit
       [data-icon] / aria-hidden span) is restored to a fixed size. */
    :host([collapsed]) ::slotted(a),
    :host([collapsed]) ::slotted(button) {
      justify-content: center;
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      margin: 0 auto;
      padding: 0;
      gap: 0;
      overflow: hidden;
      white-space: nowrap;
      font-size: 0; /* zero out bare text nodes / unwrapped labels */
    }
    /* Restore the icon glyph at a real size, centered in the rail. */
    :host([collapsed]) ::slotted(a) > [aria-hidden="true"],
    :host([collapsed]) ::slotted(button) > [aria-hidden="true"],
    :host([collapsed]) ::slotted(a) > [data-icon],
    :host([collapsed]) ::slotted(button) > [data-icon] {
      font-size: var(--cg-font-size-md);
      width: auto;
    }
    /* Explicit labels and section titles are still hidden outright. */
    :host([collapsed]) ::slotted([data-label]),
    :host([collapsed]) ::slotted(.label),
    :host([collapsed]) ::slotted(.section-title),
    :host([collapsed]) ::slotted([data-section-title]) {
      display: none;
    }
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

  @property({ type: Boolean, reflect: true }) collapsed = false;
  @property({ type: Boolean }) collapsible = false;
  @property({ reflect: true }) side: 'left' | 'right' = 'left';
  @property({ type: Boolean, reflect: true }) sticky = false;
  @property() width = '';

  // Default to *visible* — slotchange flips to hidden if empty (avoids first-paint flicker).
  @state() private _headerEmpty = false;
  @state() private _footerEmpty = false;

  private _unobserve: (() => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.width) {
      this.style.setProperty('--cg-component-sidebar-width', this.width);
    }
    // slotchange misses an unused slot and edits inside a slotted wrapper.
    this._unobserve = observeLightDom(this, () => this._syncSlots());
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unobserve?.();
    this._unobserve = null;
  }

  override firstUpdated(): void {
    this._syncSlots();
  }

  /** Header is empty when it shows nothing and there is no toggle button. */
  private _syncSlots(): void {
    const root = this.renderRoot as ShadowRoot | undefined;
    if (!root?.querySelector) return;
    this._headerEmpty = !slotHasContent(root.querySelector<HTMLSlotElement>('slot[name="header"]')) && !this.collapsible;
    this._footerEmpty = !slotHasContent(root.querySelector<HTMLSlotElement>('slot[name="footer"]'));
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('collapsible') && this.hasUpdated) this._syncSlots();
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

  private _onHeaderSlotChange = () => this._syncSlots();

  private _onFooterSlotChange = () => this._syncSlots();

  override render() {
    return html`
      <nav class="nav" role="navigation" aria-label=${this.i18n.t('label')}>
        <div class="header">
          <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
          ${this.collapsible ? html`
            <button
              class="toggle"
              type="button"
              aria-label=${this.collapsed ? this.i18n.t('expand') : this.i18n.t('collapse')}
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
