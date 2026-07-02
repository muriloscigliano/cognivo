import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, menuListStyles, entranceStagger } from '../../styles/index.js';

export interface MenubarChildItem {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
  id?: string;
}

export interface MenubarItem {
  label: string;
  id?: string;
  children: MenubarChildItem[];
}

/**
 * @element cg-menubar
 * App-style horizontal menu bar (File/Edit/View) with dropdown submenus.
 *
 * @fires {CustomEvent<{menu:string,item:string}>} cg-menubar-select
 */
@customElement('cg-menubar')
export class CgMenubar extends LitElement {
  static override styles = [hostBlock, reducedMotion, menuListStyles, entranceStagger, css`
    :host {
      display: block;
      color: var(--cg-color-surface-container-text);
    }

    /* Top-level horizontal bar containing the menu triggers. */
    [role="menubar"] {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-6);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      border-radius: var(--cg-border-radius-100);
      position: relative; /* anchor for the magnetic underline indicator */
    }

    /* Magnetic underline that slides under the active trigger. JS measures
       the trigger's position; CSS handles the smooth slide. */
    .indicator {
      position: absolute;
      bottom: calc(var(--cg-spacing-2) * -1);
      left: 0;
      height: var(--cg-spacing-2);
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-full);
      pointer-events: none;
      opacity: 0;
      transform: translateX(0);
      transition:
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-bounce),
        width var(--cg-transition-duration-default) var(--cg-transition-easing-bounce),
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .indicator.visible {
      opacity: 1;
    }
    @media (prefers-reduced-motion: reduce) {
      .indicator { transition: opacity var(--cg-transition-duration-fast) ease; }
    }
    /* Indicator can be disabled for the canonical macOS / VSCode app-menubar
       look — only the open trigger's background highlight remains. */
    :host([indicator="none"]) .indicator { display: none; }

    /* ── Rounded variants — match cg-button's rounded scale ── */
    :host([rounded="none"]) [role="menubar"] { border-radius: 0; }
    :host([rounded="sm"])   [role="menubar"] { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"])   [role="menubar"] { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"])   [role="menubar"] { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) [role="menubar"] { border-radius: var(--cg-border-radius-full); }
    /* Fully-rounded bar wants pill triggers too so corners don't clash. */
    :host([rounded="full"]) .top-trigger { border-radius: var(--cg-border-radius-full); }

    /* ── Size variants ── */
    :host([size="sm"]) [role="menubar"] {
      gap: var(--cg-spacing-2);
      padding: var(--cg-spacing-4);
    }
    :host([size="lg"]) [role="menubar"] {
      gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-8);
    }

    .top-trigger {
      display: inline-flex;
      align-items: center;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: transparent;
      border: none;
      color: inherit;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      border-radius: var(--cg-border-radius-50);
      cursor: pointer;
    }
    :host([size="sm"]) .top-trigger {
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
    }
    :host([size="lg"]) .top-trigger {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      font-size: var(--cg-font-size-base);
    }
    .top-trigger:hover,
    .top-trigger.open {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .top-trigger.open {
      color: var(--cg-color-surface-base-text);
    }
    .top-trigger:active:not([disabled]) {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .top-trigger {
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .top-trigger:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    /* Submenu positioning — visual styling (surface, items, divider, animation,
       rounded variants) inherited from menuListStyles for consistency with
       cg-dropdown / cg-split-button. */
    .menu-wrap {
      position: relative;
    }
    .menu {
      position: absolute;
      top: calc(100% + var(--cg-spacing-6));
      left: 0;
      z-index: var(--cg-z-index-500);
    }
  `];

  @property({ type: Array }) items: MenubarItem[] = [];
  /** Border-radius variant — matches cg-button's `rounded` scale. */
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  /** Size variant — drives padding, gap, and font size. */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  /**
   * Active-menu indicator style.
   * - `"underline"` (default): magnetic 2px bar slides between open menus —
   *    modern web menubars (Notion, Vercel, Linear) use this style.
   * - `"none"`: rely only on the open trigger's background highlight —
   *    canonical macOS / VSCode / Figma app-menubar look.
   */
  @property({ reflect: true }) indicator: 'underline' | 'none' = 'underline';
  /** Accessible name for the menubar (W3C APG requires a labeled menubar). */
  @property() label = 'Application menu';

  @state() private _openIndex = -1;
  /** Roving-tabindex: only the focused menubar item is in the tab order. */
  @state() private _focusedTopIndex = 0;
  /** Magnetic indicator geometry, measured from the active trigger. */
  @state() private _indicatorLeft = 0;
  @state() private _indicatorWidth = 0;

  private _outsideHandler = (e: MouseEvent) => {
    if (!e.composedPath().includes(this)) this._openIndex = -1;
  };

  /** Re-measure the indicator on resize so it doesn't drift while a menu is open. */
  private _resizeObserver: ResizeObserver | undefined;

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._outsideHandler);
    this._resizeObserver = new ResizeObserver(() => {
      if (this._openIndex >= 0) this._measureIndicator();
    });
    this._resizeObserver.observe(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideHandler);
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  /** Measure the active trigger and slide the underline indicator under it. */
  private _measureIndicator(): void {
    const triggers = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.top-trigger');
    const bar = this.shadowRoot?.querySelector<HTMLElement>('[role="menubar"]');
    const trigger = triggers?.[this._openIndex];
    if (trigger && bar) {
      const tRect = trigger.getBoundingClientRect();
      const bRect = bar.getBoundingClientRect();
      this._indicatorLeft = tRect.left - bRect.left;
      this._indicatorWidth = tRect.width;
    }
  }

  override updated(changed: Map<string, unknown>): void {
    // Reflect open state so menuListStyles' `:host([open]) .menu` reveal rule
    // (and the shared cg-menu-enter animation) activates — matches
    // cg-dropdown / cg-split-button. `open` is not a reactive property, so
    // this cannot trigger an update loop.
    this.toggleAttribute('open', this._openIndex >= 0);
    if (changed.has('_openIndex') && this._openIndex >= 0) {
      this._measureIndicator();
    }
  }

  /** Hover-switches: once a menu is open, hovering a sibling top-trigger
   * instantly switches to that menu. Standard app-bar behavior. Does NOT
   * activate on hover when no menu is open — that would be hostile. */
  private _onTopHover(idx: number): void {
    if (this._openIndex >= 0 && this._openIndex !== idx) {
      this._openIndex = idx;
      this._focusedTopIndex = idx;
    }
  }

  private _onTopKeydown(e: KeyboardEvent, idx: number): void {
    const n = this.items.length;
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this._focusTop((idx - 1 + n) % n);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this._focusTop((idx + 1) % n);
        break;
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._openIndex = idx;
        this.updateComplete.then(() => {
          const first = this.shadowRoot?.querySelector<HTMLButtonElement>('.menu .menu-item:not(.disabled)');
          first?.focus();
        });
        break;
      case 'Home':
        e.preventDefault();
        this._focusTop(0);
        break;
      case 'End':
        e.preventDefault();
        this._focusTop(n - 1);
        break;
      case 'ArrowUp':
        // W3C APG: ArrowUp on a menubar item opens its submenu and focuses
        // the LAST item (complement of ArrowDown-focuses-first).
        e.preventDefault();
        this._openIndex = idx;
        this.updateComplete.then(() => {
          const menuItems = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.menu .menu-item:not(.disabled)');
          menuItems?.[menuItems.length - 1]?.focus();
        });
        break;
      case 'Escape':
        e.preventDefault();
        this._openIndex = -1;
        break;
      default:
        // Typeahead — single printable character jumps to next menubar item
        // whose label starts with that character (W3C APG menubar pattern).
        if (e.key.length === 1 && /\S/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
          const target = this._findTypeaheadIndex(e.key, idx);
          if (target !== -1 && target !== idx) {
            e.preventDefault();
            this._focusTop(target);
          }
        }
    }
  }

  private _onSubmenuKeydown(e: KeyboardEvent, triggerIdx: number): void {
    const n = this.items.length;
    if (e.key === 'Escape') {
      e.preventDefault();
      this._openIndex = -1;
      this.updateComplete.then(() => {
        const btns = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.top-trigger');
        btns?.[triggerIdx]?.focus();
      });
      return;
    }
    if (e.key === 'Tab') {
      // Per W3C APG: Tab exits the menubar entirely. Synchronously move focus
      // back to the owning trigger (which holds the roving tabindex=0) before
      // the default Tab action runs, so Tab / Shift+Tab proceed from the
      // menubar to the adjacent tab-sequence element instead of dropping
      // focus to <body> when the submenu is removed. No preventDefault.
      this._focusedTopIndex = triggerIdx;
      this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.top-trigger')[triggerIdx]?.focus();
      this._openIndex = -1;
      return;
    }
    if (e.key === 'ArrowRight') {
      // Close current submenu, move to next menubar item, open its submenu.
      e.preventDefault();
      const next = (triggerIdx + 1) % n;
      this._openIndex = next;
      this._focusedTopIndex = next;
      this.updateComplete.then(() => {
        const first = this.shadowRoot?.querySelector<HTMLButtonElement>('.menu .menu-item:not(.disabled)');
        first?.focus();
      });
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (triggerIdx - 1 + n) % n;
      this._openIndex = prev;
      this._focusedTopIndex = prev;
      this.updateComplete.then(() => {
        const first = this.shadowRoot?.querySelector<HTMLButtonElement>('.menu .menu-item:not(.disabled)');
        first?.focus();
      });
      return;
    }
    const items = Array.from(
      this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.menu .menu-item:not(.disabled)') ?? [],
    );
    if (!items.length) return;
    const current = items.findIndex(el => el === this.shadowRoot?.activeElement);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      const next = (current + delta + items.length) % items.length;
      items[next]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key.length === 1 && /\S/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
      // Typeahead inside an open submenu.
      const ch = e.key.toLowerCase();
      const start = current >= 0 ? (current + 1) % items.length : 0;
      for (let i = 0; i < items.length; i++) {
        const j = (start + i) % items.length;
        if (items[j]?.textContent?.trim().toLowerCase().startsWith(ch)) {
          e.preventDefault();
          items[j]?.focus();
          break;
        }
      }
    }
  }

  /** Find the next menubar item whose label starts with the typed character,
   * starting AFTER `fromIdx`. Wraps around. Returns -1 if none match. */
  private _findTypeaheadIndex(char: string, fromIdx: number): number {
    const ch = char.toLowerCase();
    const n = this.items.length;
    for (let i = 1; i <= n; i++) {
      const j = (fromIdx + i) % n;
      if (this.items[j]?.label.toLowerCase().startsWith(ch)) return j;
    }
    return -1;
  }

  private _focusTop(idx: number): void {
    this._openIndex = this._openIndex >= 0 ? idx : -1;
    this._focusedTopIndex = idx;
    this.updateComplete.then(() => {
      const btns = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.top-trigger');
      btns?.[idx]?.focus();
    });
  }

  private _selectChild(menu: MenubarItem, child: MenubarChildItem): void {
    if (child.disabled || child.separator) return;
    this.dispatchEvent(new CustomEvent('cg-menubar-select', {
      bubbles: true, composed: true,
      detail: { menu: menu.id ?? menu.label, item: child.id ?? child.label },
    }));
    this._openIndex = -1;
  }

  override render() {
    const indicatorStyle = `transform: translateX(${this._indicatorLeft}px); width: ${this._indicatorWidth}px;`;
    return html`
      <div role="menubar" aria-label=${this.label}>
        <div class="indicator ${this._openIndex >= 0 ? 'visible' : ''}" style=${indicatorStyle} aria-hidden="true"></div>
        ${this.items.map((menu, i) => html`
          <div class="menu-wrap">
            <button
              class="top-trigger ${this._openIndex === i ? 'open' : ''}"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded=${this._openIndex === i ? 'true' : 'false'}
              tabindex=${this._focusedTopIndex === i ? 0 : -1}
              @click=${(e: MouseEvent) => { e.stopPropagation(); this._focusedTopIndex = i; this._openIndex = this._openIndex === i ? -1 : i; }}
              @focus=${() => { this._focusedTopIndex = i; }}
              @mouseenter=${() => this._onTopHover(i)}
              @keydown=${(e: KeyboardEvent) => this._onTopKeydown(e, i)}
            >${menu.label}</button>
            ${this._openIndex === i ? html`
              <div class="menu" role="menu" aria-label=${menu.label} @keydown=${(e: KeyboardEvent) => this._onSubmenuKeydown(e, i)}>
                ${menu.children.map((child, idx) => child.separator
                  ? html`<div class="divider" role="separator"></div>`
                  : html`
                    <button
                      class="menu-item ${child.disabled ? 'disabled' : ''} ${child.danger ? 'danger' : ''}"
                      role="menuitem"
                      aria-disabled=${child.disabled ? 'true' : 'false'}
                      style="--stagger-index: ${idx}"
                      @click=${() => this._selectChild(menu, child)}
                    >
                      <span>${child.label}</span>
                      ${child.shortcut ? html`<span class="menu-item-shortcut">${child.shortcut}</span>` : nothing}
                    </button>
                  `)}
              </div>
            ` : nothing}
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-menubar': CgMenubar;
  }
}
