import { LitElement, html, css, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { entranceStagger, menuListStyles, nativeFont } from '../../styles/index.js';
import { bindOutsideClick } from '../../utils/outside-click.js';
import { handleRovingKey } from '../../utils/roving-index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-dropdown', {
  label: 'Dropdown menu',
  loading: 'Loading…',
  empty: 'No items',
});

/** Menu item for cg-dropdown, with id, label, optional icon, keyboard shortcut, disabled state, and divider flag. */
export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  /** A destructive item ("Delete contact…"): red text; hover stays the neutral fill. */
  danger?: boolean;
}

/**
 * @element cg-dropdown
 * Floating dropdown menu with scale+fade animation and full keyboard navigation.
 *
 * @example
 * ```html
 * <cg-dropdown
 *   position="bottom-start"
 *   .items=${[{id:'edit',label:'Edit'},{id:'delete',label:'Delete…',danger:true}]}
 * >
 *   <cg-button slot="trigger" variant="secondary">Actions <cg-icon slot="suffix" name="chevron-down" size="sm"></cg-icon></cg-button>
 * </cg-dropdown>
 * <!-- or a native button; an icon-only trigger names the menu with its aria-label -->
 * <cg-dropdown .items=${items}><button slot="trigger" aria-label="Row actions">⋯</button></cg-dropdown>
 * ```
 *
 * @slot trigger - The element that toggles the dropdown on click: a
 *   `<cg-button>`, a native `<button>`, or an element with `role="button"`
 *   (or a wrapper holding one). The button gets `aria-haspopup="menu"` and
 *   `aria-expanded` — on a cg-button, through its `expanded` property, so
 *   they land on its inner `<button>`. Anything else warns in
 *   development. The attributes are removed when the trigger leaves the slot
 *   or the dropdown is removed. (No `aria-controls`: an id cannot point into
 *   the shadow root, Chromium drops `ariaControlsElements` across it, and the
 *   menu-button pattern does not require it — focus moves into the menu when
 *   it opens.)
 *
 * Keyboard (WAI-ARIA menu button): Enter / Space / ArrowDown on the trigger
 * open with focus on the first item, ArrowUp on the last; in the menu
 * ArrowUp / ArrowDown / Home / End move, a printable key jumps to the next
 * item starting with it, Enter / Space choose, Escape closes and returns
 * focus to the trigger, Tab / Shift+Tab close and move on from the trigger.
 * Closing in code (`open = false`) while focus is in the menu returns focus
 * to the trigger.
 *
 * @fires {CustomEvent} cg-dropdown-open - When the menu opens
 * @fires {CustomEvent} cg-dropdown-close - When the menu closes
 * @fires {CustomEvent<{id: string, label: string}>} cg-dropdown-select - When an item is selected
 *
 * @cssprop --cg-color-modal-container-background - Menu background
 * @cssprop --cg-border-radius-100 - Menu border radius (12px)
 * @cssprop --cg-color-focus-ring - Focus ring color
 */
@customElement('cg-dropdown')
export class CgDropdown extends LitElement {
  static override styles = [nativeFont, entranceStagger, menuListStyles, css`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--cg-font-family-primary);
    }

    .trigger {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }
    /* block: full width, the slotted trigger stretched across it (a grid item stretches). */
    :host([block]) { display: block; }
    :host([block]) .trigger { display: grid; }

    /* Positioning — unique to cg-dropdown (absolute to host, not fixed) */
    .menu {
      position: absolute;
      z-index: var(--cg-z-index-400);
    }
    /* A closed menu leaves the accessibility tree (it stays visible while its exit animation runs). */
    :host(:not([open])) .menu:not(.closing) {
      visibility: hidden;
    }
    :host([position="bottom-start"]) .menu {
      top: 100%;
      left: 0;
      margin-top: var(--cg-spacing-4);
      transform-origin: top left;
    }
    :host([position="bottom-end"]) .menu {
      top: 100%;
      right: 0;
      margin-top: var(--cg-spacing-4);
      transform-origin: top right;
    }
    :host([position="top-start"]) .menu {
      bottom: 100%;
      left: 0;
      margin-bottom: var(--cg-spacing-4);
      transform-origin: bottom left;
    }
    :host([position="top-end"]) .menu {
      bottom: 100%;
      right: 0;
      margin-bottom: var(--cg-spacing-4);
      transform-origin: bottom right;
    }

    /* ── Loading state ── */
    .menu-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-16) var(--cg-spacing-12);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
    }
    .menu-loading-spinner {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-base-border);
      border-top-color: var(--cg-color-surface-container-text);
      border-radius: var(--cg-border-radius-full);
      animation: spin var(--cg-transition-duration-slow) linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* ── Empty state ── */
    .menu-empty {
      padding: var(--cg-spacing-16) var(--cg-spacing-12);
      text-align: center;
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
    }

    /* Rounded variants — inherited from menuListStyles */
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) position: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Array }) items: DropdownItem[] = [];
  @property({ type: Boolean, reflect: true }) loading = false;
  /** Full width: the element is a block and the slotted trigger spans it. */
  @property({ type: Boolean, reflect: true }) block = false;
  /** Accessible name of the menu. Default: the trigger's aria-label /
   *  aria-labelledby / label, then its text, then "Dropdown menu". */
  @property() label = '';

  @state() private _activeIndex = -1;
  @state() private _closing = false;
  @query('.menu') private _menu!: HTMLElement;

  private _disposeOutsideClick: (() => void) | null = null;
  private _typeahead = '';
  private _typeaheadAt = 0;

  /** The trigger that carries the popup state now (removed from it on unslot / disconnect). */
  private _trigger: HTMLElement | null = null;

  private _slottedTrigger(): HTMLElement | null {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    return (slot?.assignedElements()[0] as HTMLElement | undefined) ?? null;
  }

  /** The button inside the trigger slot: the slotted element itself when it
   *  is a button (native, `role="button"`, or a cg-button), else the first
   *  one inside a wrapper. */
  private _triggerButton(): HTMLElement | null {
    const el = this._slottedTrigger();
    if (!el) return null;
    const BUTTON = 'button, [role="button"], cg-button';
    return el.matches(BUTTON) ? el : el.querySelector<HTMLElement>(BUTTON);
  }

  private static _setPopupState(el: HTMLElement, expanded: string | null): void {
    if (el.localName === 'cg-button') {
      // Forwarded to its inner <button> as aria-haspopup="menu" + aria-expanded (the host has no role).
      (el as HTMLElement & { expanded: string }).expanded = expanded ?? '';
    } else if (expanded === null) {
      el.removeAttribute('aria-haspopup');
      el.removeAttribute('aria-expanded');
    } else {
      el.setAttribute('aria-haspopup', 'menu');
      el.setAttribute('aria-expanded', expanded);
    }
  }

  /** ARIA popup state lives on the trigger's button — a role-less wrapper div
   *  is invisible to assistive tech (and fails axe `aria-allowed-attr`). */
  private _syncTrigger(): void {
    const el = this._triggerButton();
    if (this._trigger && this._trigger !== el) CgDropdown._setPopupState(this._trigger, null);
    this._trigger = el;
    if (el) CgDropdown._setPopupState(el, String(this.open));
    const slotted = this._slottedTrigger();
    if (slotted && !el && (typeof process === 'undefined' || process.env.NODE_ENV !== 'production')) {
      console.warn(
        '[cg-dropdown] the trigger is not a button: slot a <cg-button>, a <button> or an element with role="button", ' +
        'so assistive tech hears the menu button and its expanded state.',
      );
    }
    this.requestUpdate(); // the menu's name follows the trigger
  }

  /** The menu's name: `label`, else the trigger's own name, else its text. */
  private _menuName(): string {
    if (this.label) return this.label;
    const el = this._trigger ?? this._slottedTrigger();
    const own = el?.getAttribute('aria-label')
      || el?.getAttribute('aria-labelledby')?.split(/\s+/)
        .map((id) => (el.getRootNode() as Document).getElementById?.(id)?.textContent?.trim() ?? '')
        .filter(Boolean).join(' ')
      || (el as { label?: unknown } | null)?.label;
    return (typeof own === 'string' && own) || el?.textContent?.trim() || this.i18n.t('label');
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open') && this._trigger) CgDropdown._setPopupState(this._trigger, String(this.open));
    if (changed.has('open') && !this.open && changed.get('open') === true) {
      // Closed in code while focus was in the menu: focus would vanish with it.
      if (this._menu?.contains(this.shadowRoot!.activeElement)) this._focusTrigger();
      this._closing = true;
      setTimeout(() => { this._closing = false; }, 100);
    }
    if (changed.has('open')) {
      this._disposeOutsideClick?.();
      this._disposeOutsideClick = null;
      if (this.open) {
        this._disposeOutsideClick = bindOutsideClick(this, () => this._close());
      }
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    // Reconnected (moved): the slot has not changed, so no slotchange restores the state.
    if (this.hasUpdated) this._syncTrigger();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
    if (this._trigger) CgDropdown._setPopupState(this._trigger, null);
    this._trigger = null;
  }

  private _toggle() {
    if (this.open) {
      this._close();
    } else {
      this._open();
    }
  }

  /** Open and move focus into the menu: the first enabled item, or the last (`last`). */
  private _open(last = false) {
    this.open = true;
    this._activeIndex = -1;
    this.dispatchEvent(new CustomEvent('cg-dropdown-open', { bubbles: true, composed: true }));
    this.updateComplete.then(() => {
      const count = this._enabledItems.length;
      if (!this.open || !count) return;
      this._activeIndex = last ? count - 1 : 0;
      this._focusActiveItem();
    });
  }

  private _close() {
    this.open = false;
    this._activeIndex = -1;
    this.dispatchEvent(new CustomEvent('cg-dropdown-close', { bubbles: true, composed: true }));
  }

  private _selectItem(item: DropdownItem) {
    if (item.disabled) return;
    this.dispatchEvent(new CustomEvent('cg-dropdown-select', {
      bubbles: true,
      composed: true,
      detail: { id: item.id, label: item.label },
    }));
    this._close();
    this._focusTrigger();
  }

  private get _enabledItems(): DropdownItem[] {
    return this.items.filter(i => !i.divider && !i.disabled);
  }

  /** Printable key: the next enabled item whose label starts with the typed text (500 ms buffer). */
  private _typeaheadKey(e: KeyboardEvent): boolean {
    if (e.key.length !== 1 || e.key === ' ' || e.ctrlKey || e.metaKey || e.altKey) return false;
    const now = Date.now();
    this._typeahead = (now - this._typeaheadAt > 500 ? '' : this._typeahead) + e.key.toLowerCase();
    this._typeaheadAt = now;
    const items = this._enabledItems;
    const query = this._typeahead.split('').every((c) => c === this._typeahead[0]) ? this._typeahead[0]! : this._typeahead;
    // A repeated single letter cycles; a longer prefix starts from the current item.
    const start = query.length === 1 ? this._activeIndex + 1 : Math.max(this._activeIndex, 0);
    for (let n = 0; n < items.length; n++) {
      const i = (start + n) % items.length;
      if (items[i]!.label.toLowerCase().startsWith(query)) {
        this._activeIndex = i;
        this._focusActiveItem();
        break;
      }
    }
    return true;
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (!this.open) {
      // A native button opens on Space itself (its click, on key-up): opening on key-down
      // would move focus into the menu and the key-up would choose the first item.
      if (e.key === ' ' && e.target instanceof HTMLButtonElement) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this._open(e.key === 'ArrowUp');
      }
      return;
    }

    if (e.key === 'Tab') {
      // From the trigger, the browser's own Tab / Shift+Tab moves on past the dropdown.
      this._focusTriggerNow();
      this._close();
      return;
    }

    if (this._typeaheadKey(e)) {
      e.preventDefault();
      return;
    }

    const { index, handled } = handleRovingKey(e, {
      items: this.items,
      activeIndex: this._activeIndex,
      isSkippable: i => Boolean(i.divider || i.disabled),
      onSelect: item => this._selectItem(item),
      onEscape: () => {
        // The open menu consumes its Escape: document listeners (a drawer, a dialog) do not close too.
        e.stopPropagation();
        this._close();
        this._focusTrigger();
      },
    });
    if (handled) {
      e.preventDefault();
      if (this._activeIndex !== index) {
        this._activeIndex = index;
        this._focusActiveItem();
      }
    }
  }

  private _focusActiveItem() {
    this.updateComplete.then(() => {
      const items = this.shadowRoot?.querySelectorAll('.menu-item:not(.disabled):not(.menu-empty)');
      if (items && items[this._activeIndex]) {
        (items[this._activeIndex] as HTMLElement).focus();
      }
    });
  }

  private _focusTrigger() {
    this.updateComplete.then(() => this._focusTriggerNow());
  }

  /** Focus the slotted trigger, or the first focusable element inside a
   *  non-focusable wrapper. */
  private _focusTriggerNow() {
    const el = this._slottedTrigger();
    if (!el) return;
    el.focus();
    if (el.matches(':focus-within')) return;
    el.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), cg-button')?.focus();
  }

  override render() {
    return html`
      <div
        class="trigger"
        @click="${this._toggle}"
        @keydown="${this._handleKeydown}"
      >
        <slot name="trigger" @slotchange=${this._syncTrigger}></slot>
      </div>
      <div
        class="menu ${this._closing ? 'closing' : ''}"
        role="menu"
        aria-label=${this._menuName()}
        aria-busy=${this.loading ? 'true' : nothing}
        @keydown="${this._handleKeydown}"
      >
        ${this.loading ? html`
          <div class="menu-loading" role="none">
            <span class="menu-loading-spinner"></span>
            <span>${this.i18n.t('loading')}</span>
          </div>
        ` : this.items.length === 0 ? html`
          <div class="menu-item menu-empty" role="menuitem" aria-disabled="true">${this.i18n.t('empty')}</div>
        ` : nothing}
        ${!this.loading ? this.items.map((item, index) => {
          if (item.divider) {
            return html`<div class="divider" role="separator"></div>`;
          }
          const enabledIndex = this._enabledItems.indexOf(item);
          return html`
            <button
              class="menu-item ${item.disabled ? 'disabled' : ''} ${item.danger ? 'danger' : ''} ${enabledIndex === this._activeIndex ? 'active' : ''}"
              role="menuitem"
              tabindex="-1"
              aria-disabled=${item.disabled ? 'true' : nothing}
              style="--stagger-index: ${index}"
              @click="${() => this._selectItem(item)}"
            >
              ${item.icon ? html`<cg-icon class="menu-item-icon" name="${item.icon}" size="sm"></cg-icon>` : nothing}
              ${item.label}
              ${item.shortcut ? html`<span class="menu-item-shortcut">${item.shortcut}</span>` : nothing}
            </button>
          `;
        }) : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-dropdown': CgDropdown;
  }
}
