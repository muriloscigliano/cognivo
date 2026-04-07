import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { entranceStagger } from '../../styles/index.js';

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
  static override styles = [entranceStagger, css`
    :host {
      transition: color var(--cg-transition-duration-fast) var(--cg-motion-easing-color);
      display: inline-block;
      position: relative;
      font-family: var(--cg-font-family-primary);
    }

    .trigger {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }

    .menu {
      position: absolute;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      min-width: 200px;
      max-width: 320px;
      padding: var(--cg-spacing-6);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-100);
      box-shadow:
        0 var(--cg-shadow-md-y) var(--cg-shadow-md-blur) var(--cg-shadow-md-spread) rgba(0, 0, 0, 0.12),
        0 var(--cg-shadow-sm-y) var(--cg-shadow-sm-blur) var(--cg-shadow-sm-spread) rgba(0, 0, 0, 0.06);
      /* Animation — scale+fade entrance */
      opacity: 0;
      transform: scale(0.96);
      transform-origin: top left;
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-motion-easing-default),
        transform var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }

    @keyframes dropdown-enter {
      0% { transform: scale(0.96); }
      60% { transform: scale(1.03); }
      100% { transform: scale(1); }
    }

    :host([open]) .menu {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
      animation: dropdown-enter var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }

    /* Position variants */
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

    /* ── Closing animation ── */
    @keyframes dropdown-exit {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.95); }
    }
    .menu.closing {
      animation: dropdown-exit var(--cg-transition-duration-fast) var(--cg-motion-easing-exit) forwards;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .menu {
        transition: opacity var(--cg-transition-duration-fast) ease;
        transform: scale(1) !important;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-text);
      background: transparent;
      border: none;
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      cursor: pointer;
      font-family: inherit;
      line-height: var(--cg-line-height-snug);
      white-space: nowrap;
      transition: background-color var(--cg-transition-duration-fast) ease, color var(--cg-transition-duration-fast) ease;
      -webkit-font-smoothing: antialiased;
      animation: staggerFadeIn var(--cg-transition-duration-fast) ease-out both;
      animation-delay: calc(var(--stagger-index, 0) * 40ms);
    }

    .menu-item:hover:not(.disabled) {
      background: var(--cg-color-action-tertiary-background-hover);
    }

    .menu-item:active:not(.disabled) {
      background: var(--cg-color-action-tertiary-background-active);
    }

    .menu-item:focus-visible {
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
      outline: none;
    }

    .menu-item.active {
      background: var(--cg-color-action-tertiary-background-hover);
      font-weight: var(--cg-font-weight-medium);
    }

    .menu-item.disabled {
      color: var(--cg-color-surface-container-outlined);
      cursor: not-allowed;
      opacity: 0.5;
    }

    .menu-item-icon {
      flex-shrink: 0;
      opacity: 0.7;
    }
    .menu-item:hover:not(.disabled) .menu-item-icon {
      opacity: 1;
    }

    .menu-item-shortcut {
      margin-left: auto;
      padding-left: var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      font-family: inherit;
      pointer-events: none;
    }

    .divider {
      height: var(--cg-border-width-50);
      margin: var(--cg-spacing-4) 0;
      background: var(--cg-color-modal-container-border);
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
      animation: spin var(--cg-motion-duration-slow) linear infinite;
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

    /* Rounded variants */
    :host([rounded="none"]) .menu { border-radius: 0; }
    :host([rounded="none"]) .menu-item { border-radius: 0; }
    :host([rounded="sm"]) .menu { border-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) .menu-item { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .menu { border-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) .menu-item { border-radius: var(--cg-border-radius-50); }
    :host([rounded="lg"]) .menu { border-radius: var(--cg-border-radius-150); }
    :host([rounded="lg"]) .menu-item { border-radius: var(--cg-border-radius-100); }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) position: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Array }) items: DropdownItem[] = [];
  @property({ type: Boolean, reflect: true }) loading = false;

  @state() private _activeIndex = -1;
  @state() private _closing = false;
  @query('.menu') private _menu!: HTMLElement;

  private _outsideClickHandler = this._handleOutsideClick.bind(this);

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open') && !this.open && changed.get('open') === true) {
      this._closing = true;
      setTimeout(() => { this._closing = false; }, 100);
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._outsideClickHandler);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideClickHandler);
  }

  private _handleOutsideClick(e: MouseEvent) {
    if (this.open && !this.contains(e.target as Node)) {
      this._close();
    }
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

    const enabled = this._enabledItems;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this._close();
        this._focusTrigger();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this._activeIndex = this._activeIndex < enabled.length - 1 ? this._activeIndex + 1 : 0;
        this._focusActiveItem();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._activeIndex = this._activeIndex > 0 ? this._activeIndex - 1 : enabled.length - 1;
        this._focusActiveItem();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this._activeIndex >= 0 && this._activeIndex < enabled.length) {
          const item = enabled[this._activeIndex];
          if (item) this._selectItem(item);
          this._focusTrigger();
        }
        break;
      case 'Home':
        e.preventDefault();
        this._activeIndex = 0;
        this._focusActiveItem();
        break;
      case 'End':
        e.preventDefault();
        this._activeIndex = enabled.length - 1;
        this._focusActiveItem();
        break;
      case 'Tab':
        this._close();
        break;
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
