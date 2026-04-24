import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { entranceStagger, menuListStyles } from '../../styles/index.js';
import { bindOutsideClick } from '../../utils/outside-click.js';
import { handleRovingKey } from '../../utils/roving-index.js';

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
 * @slot trigger - The element that toggles the dropdown on click
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
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
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

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) position: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Array }) items: DropdownItem[] = [];
  @property({ type: Boolean, reflect: true }) loading = false;

  @state() private _activeIndex = -1;
  @state() private _closing = false;
  @query('.menu') private _menu!: HTMLElement;

  private _disposeOutsideClick: (() => void) | null = null;

  override updated(changed: Map<string, unknown>) {
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

  private _open() {
    this.open = true;
    this._activeIndex = -1;
    this.dispatchEvent(new CustomEvent('cg-dropdown-open', { bubbles: true, composed: true }));
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
  }

  private get _enabledItems(): DropdownItem[] {
    return this.items.filter(i => !i.divider && !i.disabled);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (!this.open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        this._open();
        // Focus first item after open
        this.updateComplete.then(() => {
          this._activeIndex = 0;
          this._focusActiveItem();
        });
      }
      return;
    }

    if (e.key === 'Tab') {
      this._close();
      return;
    }

    const { index, handled } = handleRovingKey(e, {
      items: this.items,
      activeIndex: this._activeIndex,
      isSkippable: i => Boolean(i.divider || i.disabled),
      onSelect: item => {
        this._selectItem(item);
        this._focusTrigger();
      },
      onEscape: () => {
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
      const items = this.shadowRoot?.querySelectorAll('.menu-item:not(.disabled)');
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
        aria-haspopup="menu"
        aria-expanded="${this.open}"
        @click="${this._toggle}"
        @keydown="${this._handleKeydown}"
      >
        <slot name="trigger"></slot>
      </div>
      <div
        class="menu ${this._closing ? 'closing' : ''}"
        role="menu"
        aria-label="Dropdown menu"
        @keydown="${this._handleKeydown}"
      >
        ${this.loading ? html`
          <div class="menu-loading" aria-busy="true">
            <span class="menu-loading-spinner"></span>
            <span>Loading...</span>
          </div>
        ` : this.items.length === 0 ? html`
          <div class="menu-empty">No items</div>
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
              tabindex="${this.open && !item.disabled ? '0' : '-1'}"
              aria-disabled="${item.disabled ? 'true' : 'false'}"
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
