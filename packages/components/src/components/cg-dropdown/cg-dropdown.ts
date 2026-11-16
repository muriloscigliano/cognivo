import { LitElement, html, css, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { entranceStagger, menuListStyles } from '../../styles/index.js';
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
}

/**
 * @element cg-dropdown
 * Floating dropdown menu with scale+fade animation and full keyboard navigation.
 *
 * @example
 * ```html
 * <cg-dropdown
 *   position="bottom-start"
 *   .items=${[{id:'edit',label:'Edit'},{id:'delete',label:'Delete'}]}
 * >
 *   <cg-button slot="trigger">Actions <cg-icon slot="suffix" name="chevron-down" size="sm"></cg-icon></cg-button>
 * </cg-dropdown>
 * ```
 *
 * @slot trigger - The element that toggles the dropdown on click. Slot a
 *   native `<button>` (or an element with `role="button"`): it receives
 *   `aria-haspopup="menu"` and `aria-expanded`. (No `aria-controls`: an id
 *   cannot point into the shadow root, Chromium drops `ariaControlsElements`
 *   across it, and the menu-button pattern does not require it — focus moves
 *   into the menu when it opens.)
 *
 * Keyboard (WAI-ARIA menu button): Enter / Space / ArrowDown on the trigger
 * open with focus on the first item, ArrowUp on the last; in the menu
 * ArrowUp / ArrowDown / Home / End move, a printable key jumps to the next
 * item starting with it, Enter / Space choose, Escape closes and returns
 * focus to the trigger, Tab closes.
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
  static override styles = [entranceStagger, menuListStyles, css`
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
  /** Accessible name of the menu. Default: the trigger's text, then "Dropdown menu". */
  @property() label = '';

  @state() private _activeIndex = -1;
  @state() private _closing = false;
  @query('.menu') private _menu!: HTMLElement;

  private _disposeOutsideClick: (() => void) | null = null;
  private _typeahead = '';
  private _typeaheadAt = 0;

  private _slottedTrigger(): HTMLElement | null {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    return (slot?.assignedElements()[0] as HTMLElement | undefined) ?? null;
  }

  /** ARIA popup state lives on the slotted trigger — a role-less wrapper div
   *  is invisible to assistive tech (and fails axe `aria-allowed-attr`). */
  private _syncTrigger(): void {
    const el = this._slottedTrigger();
    el?.setAttribute('aria-haspopup', 'menu');
    el?.setAttribute('aria-expanded', String(this.open));
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) this._syncTrigger();
    if (changed.has('open') && !this.open && changed.get('open') === true) {
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

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
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
    this.updateComplete.then(() => {
      const slot = this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement;
      const assigned = slot?.assignedElements?.() ?? [];
      const focusable = assigned.find(el => (el as HTMLElement).focus) as HTMLElement | undefined;
      if (focusable) {
        focusable.focus();
      } else {
        const trigger = this.shadowRoot?.querySelector('.trigger') as HTMLElement;
        trigger?.focus();
      }
    });
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
        aria-label=${this.label || this._slottedTrigger()?.textContent?.trim() || this.i18n.t('label')}
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
              class="menu-item ${item.disabled ? 'disabled' : ''} ${enabledIndex === this._activeIndex ? 'active' : ''}"
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
