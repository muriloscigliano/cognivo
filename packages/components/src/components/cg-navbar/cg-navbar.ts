import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface NavItem {
  /** Stable identifier — what `active` matches against. */
  value: string;
  /** Visible text. */
  label: string;
  /** Href for the underlying anchor. */
  href: string;
  /** Optional leading icon (SVG markup string). */
  icon?: string;
  /** Keyboard hint, rendered as a small `cg-kbd` chip on the right. */
  kbd?: string;
  /** Marks the item disabled. */
  disabled?: boolean;
  /** Optional badge text (e.g., "New"). */
  badge?: string;
  /** Open in a new tab. */
  external?: boolean;
}

/**
 * @element cg-navbar
 * Top navigation bar with animated sliding active indicator, programmatic
 * items API, three coherent variants (`solid` / `glass` / `floating`),
 * mobile responsive panel, scroll-aware compact mode, and full keyboard
 * navigation (arrow keys, Home, End, Escape).
 *
 * @example
 * ```html
 * <cg-navbar
 *   variant="glass"
 *   sticky
 *   active="docs"
 *   .items=${[
 *     { value: 'docs', label: 'Docs', href: '/docs' },
 *     { value: 'components', label: 'Components', href: '/components' },
 *     { value: 'tokens', label: 'Tokens', href: '/tokens', badge: 'New' },
 *   ]}
 * >
 *   <span slot="brand">Cognivo</span>
 *   <cg-button slot="end" variant="primary">Sign in</cg-button>
 * </cg-navbar>
 * ```
 *
 * @slot brand - Brand area (leftmost). Logo + name.
 * @slot center - Optional center content (search, breadcrumbs). Hidden below 768px.
 * @slot end - Right region for actions, profile, theme toggle.
 * @slot mobile-menu - Optional override for the mobile panel content.
 *
 * @fires {CustomEvent<{open: boolean}>} cg-navbar-toggle - Mobile menu toggled
 * @fires {CustomEvent<{value: string, item: NavItem}>} cg-navbar-select - A nav item activated
 */
@customElement('cg-navbar')
export class CgNavbar extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      width: 100%;
    }

    /* ── Outer nav container ─────────────────────────────────────── */
    nav {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-24);
      height: var(--cg-component-navbar-height);
      padding: 0 var(--cg-component-navbar-padding-x);
      background: var(--cg-color-surface-base-background);
      color: var(--cg-color-surface-base-text);
      transition:
        height var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        backdrop-filter var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }

    :host([sticky]) nav {
      position: sticky;
      top: 0;
      z-index: var(--cg-z-index-500);
    }

    :host([bordered]) nav {
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
    }

    /* Compact-on-scroll — applied via JS toggling the [data-compact] attribute */
    nav[data-compact="true"] {
      height: var(--cg-component-navbar-height-compact);
      box-shadow: var(--cg-shadow-elevation-md);
    }

    /* Variant: glass — translucent + blur */
    :host([variant="glass"]) nav {
      background: color-mix(in srgb, var(--cg-color-surface-base-background) 72%, transparent);
      backdrop-filter: saturate(180%) blur(var(--cg-blur-backdrop));
      -webkit-backdrop-filter: saturate(180%) blur(var(--cg-blur-backdrop));
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
    }

    /* Variant: floating — detached pill */
    :host([variant="floating"]) nav {
      margin: var(--cg-component-navbar-floating-margin);
      height: calc(var(--cg-component-navbar-height) - 2 * var(--cg-component-navbar-floating-margin));
      padding: 0 var(--cg-spacing-20);
      background: color-mix(in srgb, var(--cg-color-surface-base-background) 80%, transparent);
      backdrop-filter: saturate(180%) blur(var(--cg-blur-backdrop));
      -webkit-backdrop-filter: saturate(180%) blur(var(--cg-blur-backdrop));
      border: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
      border-radius: var(--cg-border-radius-full);
      box-shadow: var(--cg-shadow-elevation-lg);
    }
    :host([variant="floating"]) nav[data-compact="true"] {
      height: calc(var(--cg-component-navbar-height-compact) - 2 * var(--cg-component-navbar-floating-margin));
    }

    /* ── Brand ───────────────────────────────────────────────────── */
    .brand {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-semibold);
      letter-spacing: var(--cg-letter-spacing-tight);
      flex-shrink: 0;
      color: var(--cg-color-surface-base-text);
      text-decoration: none;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .brand:hover { opacity: 0.8; }

    /* ── Items list (tablist with sliding indicator) ─────────────── */
    .items {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--cg-component-navbar-item-gap);
      padding: var(--cg-spacing-4);
      background: color-mix(in srgb, var(--cg-color-surface-container-background) 50%, transparent);
      border: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
      border-radius: var(--cg-border-radius-full);
    }

    /* Floating variant strips the inner pill chrome (avoid card-in-card). */
    :host([variant="floating"]) .items {
      background: transparent;
      border: none;
      padding: 0;
    }

    /* Sliding active indicator */
    .indicator {
      position: absolute;
      top: var(--cg-spacing-4);
      left: 0;
      height: calc(100% - 2 * var(--cg-spacing-4));
      box-sizing: border-box;
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
      border-radius: var(--cg-border-radius-full);
      box-shadow: var(--cg-shadow-elevation-sm);
      transition:
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in-out),
        width var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in-out),
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      pointer-events: none;
      z-index: 0;
      opacity: 0;
    }
    .indicator[data-ready="true"] { opacity: 1; }

    :host([variant="floating"]) .indicator {
      top: 0;
      height: 100%;
    }

    /* Per-item anchor */
    .item {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      padding: var(--cg-component-navbar-item-padding-y) var(--cg-component-navbar-item-padding-x);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      text-decoration: none;
      border-radius: var(--cg-border-radius-full);
      cursor: pointer;
      transition:
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .item:hover:not([aria-disabled="true"]) {
      color: var(--cg-color-surface-base-text);
      background: var(--cg-color-action-tertiary-background-hover);
      transform: translateY(calc(var(--cg-spacing-1) * -1));
    }
    .item:active:not([aria-disabled="true"]) {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .item[aria-selected="true"] {
      color: var(--cg-color-surface-base-text);
    }
    .item[aria-disabled="true"] {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }
    .item:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    .item-icon {
      display: inline-flex;
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
    }
    .item-icon svg { width: 100%; height: 100%; }

    .item-badge {
      display: inline-flex;
      align-items: center;
      padding: 0 var(--cg-spacing-6);
      height: var(--cg-spacing-16);
      background: var(--cg-color-accent-text);
      color: var(--cg-color-action-primary-text-default);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    .item-kbd {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      padding: 0 var(--cg-spacing-4);
      border: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
      border-radius: var(--cg-border-radius-50);
      line-height: var(--cg-spacing-16);
    }

    /* ── Center / End ────────────────────────────────────────────── */
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 0;
    }
    .end {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      flex-shrink: 0;
      margin-left: auto;
    }

    /* ── Mobile menu button ──────────────────────────────────────── */
    .menu-btn {
      display: none;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      padding: 0;
      border: none;
      background: transparent;
      color: var(--cg-color-surface-base-text);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .menu-btn:hover { background: var(--cg-color-action-tertiary-background-hover); }
    .menu-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .menu-btn:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    /* ── Mobile slide-down panel ─────────────────────────────────── */
    .mobile-panel {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      padding: var(--cg-spacing-12);
      background: var(--cg-color-surface-base-background);
      border-top: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
      box-shadow: var(--cg-shadow-elevation-xl);
      flex-direction: column;
      gap: var(--cg-spacing-2);
      animation: slideDown var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    :host([mobile-open]) .mobile-panel { display: flex; }

    .mobile-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      text-decoration: none;
      border-radius: var(--cg-border-radius-100);
      transition:
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      animation: itemIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) backwards;
    }
    .mobile-item:hover { background: var(--cg-color-action-tertiary-background-hover); }
    .mobile-item:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .mobile-item:active:not([aria-disabled="true"]) {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .mobile-item[aria-selected="true"] {
      background: var(--cg-color-surface-container-background);
      box-shadow: var(--cg-shadow-elevation-sm);
    }
    .mobile-item[aria-disabled="true"] {
      opacity: 0.5;
      pointer-events: none;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(calc(-1 * var(--cg-spacing-8))); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes itemIn {
      from { opacity: 0; transform: translateX(calc(-1 * var(--cg-spacing-12))); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* Responsive — collapse below the breakpoint */
    @media (max-width: 768px) {
      .items, .center { display: none; }
      .menu-btn { display: inline-flex; }
    }
  `];

  // ─── Public API ─────────────────────────────────────────────────

  @property({ type: Array }) items: NavItem[] = [];
  @property() active = '';
  @property({ reflect: true }) variant: 'solid' | 'glass' | 'floating' = 'solid';
  @property({ type: Boolean, reflect: true }) sticky = false;
  @property({ type: Boolean, reflect: true }) bordered = false;
  @property({ type: Boolean, reflect: true, attribute: 'compact-on-scroll' }) compactOnScroll = false;
  @property({ type: Boolean, reflect: true, attribute: 'mobile-open' }) mobileOpen = false;
  @property() brandHref = '';

  // ─── Internal state ─────────────────────────────────────────────

  @state() private _scrolled = false;

  @query('.items') private _itemsEl?: HTMLElement;
  @query('.indicator') private _indicatorEl?: HTMLElement;
  @query('nav') private _navEl?: HTMLElement;

  private _resizeObserver: ResizeObserver | null = null;
  private _onScroll = (): void => {
    if (!this.compactOnScroll) return;
    const next = window.scrollY > 16;
    if (next !== this._scrolled) {
      this._scrolled = next;
      if (this._navEl) this._navEl.dataset.compact = String(this._scrolled);
    }
  };
  private _onDocClick = (e: MouseEvent): void => {
    if (!this.mobileOpen) return;
    if (!e.composedPath().includes(this)) this.closeMobileMenu();
  };
  private _onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.mobileOpen) {
      this.closeMobileMenu();
      // The panel goes display:none — restore focus to the toggle so
      // keyboard users aren't stranded on <body>.
      this.updateComplete.then(() =>
        this.renderRoot.querySelector<HTMLElement>('.menu-btn')?.focus());
    }
  };

  // ─── Lifecycle ──────────────────────────────────────────────────

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('scroll', this._onScroll, { passive: true });
    document.addEventListener('click', this._onDocClick);
    document.addEventListener('keydown', this._onKeydown);
    this._resizeObserver = new ResizeObserver(() => this._updateIndicator());
    requestAnimationFrame(() => {
      if (this._itemsEl && this._resizeObserver) this._resizeObserver.observe(this._itemsEl);
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._onScroll);
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('keydown', this._onKeydown);
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  override updated(changed: PropertyValues): void {
    if (changed.has('active') || changed.has('items') || changed.has('variant')) {
      requestAnimationFrame(() => this._updateIndicator());
    }
  }

  override firstUpdated(): void {
    requestAnimationFrame(() => this._updateIndicator());
  }

  // ─── Public methods ─────────────────────────────────────────────

  closeMobileMenu(): void {
    if (!this.mobileOpen) return;
    this.mobileOpen = false;
    this.dispatchEvent(new CustomEvent('cg-navbar-toggle', {
      detail: { open: false }, bubbles: true, composed: true,
    }));
  }

  // ─── Internals ──────────────────────────────────────────────────

  private _updateIndicator(): void {
    const idx = this.items.findIndex(i => i.value === this.active);
    if (idx < 0 || !this._itemsEl || !this._indicatorEl) {
      if (this._indicatorEl) this._indicatorEl.dataset.ready = 'false';
      return;
    }
    const itemEl = this._itemsEl.querySelectorAll<HTMLElement>('.item')[idx];
    if (!itemEl) return;
    this._indicatorEl.style.width = `${itemEl.offsetWidth}px`;
    this._indicatorEl.style.transform = `translateX(${itemEl.offsetLeft}px)`;
    this._indicatorEl.dataset.ready = 'true';
  }

  private _selectItem(item: NavItem, e?: MouseEvent | KeyboardEvent): void {
    if (item.disabled) {
      e?.preventDefault();
      return;
    }
    this.active = item.value;
    this.dispatchEvent(new CustomEvent('cg-navbar-select', {
      detail: { value: item.value, item },
      bubbles: true,
      composed: true,
    }));
    if (this.mobileOpen) this.closeMobileMenu();
  }

  private _toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
    this.dispatchEvent(new CustomEvent('cg-navbar-toggle', {
      detail: { open: this.mobileOpen },
      bubbles: true,
      composed: true,
    }));
  }

  private _onItemKeydown(e: KeyboardEvent, idx: number): void {
    const enabled = this.items.map((it, i) => ({ it, i })).filter(({ it }) => !it.disabled);
    const enabledIdx = enabled.findIndex(({ i }) => i === idx);
    let next = enabledIdx;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      next = (enabledIdx - 1 + enabled.length) % enabled.length;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      next = (enabledIdx + 1) % enabled.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = enabled.length - 1;
    }
    if (next !== enabledIdx) {
      const target = enabled[next];
      if (target) {
        // Roving focus only — arrowing must not select/navigate. Activation
        // stays on Enter/click via the anchor's native behavior.
        const items = this._itemsEl?.querySelectorAll<HTMLElement>('.item');
        items?.[target.i]?.focus();
      }
    }
  }

  // ─── Render helpers ─────────────────────────────────────────────

  private _renderItem(item: NavItem, idx: number, mobile = false) {
    const selected = item.value === this.active;
    const cls = mobile ? 'mobile-item' : 'item';
    const styleVar = mobile ? `animation-delay:calc(${idx} * var(--cg-transition-duration-fast) / 2);` : '';
    return html`
      <a
        class=${cls}
        href=${item.href}
        target=${item.external ? '_blank' : nothing}
        rel=${item.external ? 'noopener noreferrer' : nothing}
        role=${mobile ? nothing : 'tab'}
        aria-selected=${selected ? 'true' : 'false'}
        aria-disabled=${item.disabled ? 'true' : 'false'}
        tabindex=${selected || mobile ? '0' : '-1'}
        style=${styleVar}
        @click=${(e: MouseEvent) => this._selectItem(item, e)}
        @keydown=${(e: KeyboardEvent) => !mobile && this._onItemKeydown(e, idx)}
      >
        ${item.icon ? html`<span class="item-icon" aria-hidden="true" .innerHTML=${item.icon}></span>` : nothing}
        <span>${item.label}</span>
        ${item.badge ? html`<span class="item-badge">${item.badge}</span>` : nothing}
        ${item.kbd ? html`<span class="item-kbd">${item.kbd}</span>` : nothing}
      </a>
    `;
  }

  override render() {
    const hasItems = this.items.length > 0;
    return html`
      <nav role="navigation" aria-label="Main navigation">
        ${this.brandHref
          ? html`<a class="brand" href=${this.brandHref}><slot name="brand"></slot></a>`
          : html`<div class="brand"><slot name="brand"></slot></div>`}
        ${hasItems ? html`
          <div class="items" role="tablist">
            <span class="indicator" data-ready="false"></span>
            ${this.items.map((item, idx) => this._renderItem(item, idx, false))}
          </div>
        ` : nothing}
        <div class="center"><slot name="center"></slot></div>
        <div class="end">
          <slot name="end"></slot>
          <button
            class="menu-btn"
            type="button"
            aria-label="Toggle menu"
            aria-expanded=${this.mobileOpen ? 'true' : 'false'}
            aria-controls="cg-navbar-mobile-panel"
            @click=${this._toggleMobile}
          >
            ${this.mobileOpen
              ? html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`
              : html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`
            }
          </button>
        </div>
        <div id="cg-navbar-mobile-panel" class="mobile-panel">
          <slot name="mobile-menu">
            ${hasItems ? this.items.map((item, idx) => this._renderItem(item, idx, true)) : nothing}
          </slot>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-navbar': CgNavbar;
  }
}
