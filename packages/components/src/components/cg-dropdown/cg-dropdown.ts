import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
}

/**
 * <cg-dropdown> — Floating dropdown menu with scale+fade animation.
 *
 * Features:
 * - Click trigger to toggle, Escape to close
 * - Arrow key navigation through items
 * - Scale+fade entrance animation (scale 0.95->1, opacity 0->1, 200ms)
 * - Click outside to close
 * - Divider support, disabled items
 * - Full keyboard accessibility with ARIA
 * - HeroUI timing + dual-layer focus ring
 */
@customElement('cg-dropdown')
export class CgDropdown extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: inline-block;
      position: relative;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .trigger {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }

    .menu {
      position: absolute;
      z-index: 1000;
      min-width: 180px;
      max-width: 320px;
      padding: var(--cg-spacing-4, 4px);
      background: var(--cg-color-surface-raised-background, #1e1e22);
      border: 1px solid var(--cg-color-surface-base-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.3),
        0 10px 15px -3px rgba(0, 0, 0, 0.4);

      /* Animation — scale+fade entrance */
      opacity: 0;
      transform: scale(0.95);
      transform-origin: top left;
      pointer-events: none;
      transition:
        opacity var(--cg-motion-duration-slow, 200ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        transform var(--cg-motion-duration-slow, 200ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    :host([open]) .menu {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    /* Position variants */
    :host([position="bottom-start"]) .menu {
      top: 100%;
      left: 0;
      margin-top: var(--cg-spacing-4, 4px);
      transform-origin: top left;
    }
    :host([position="bottom-end"]) .menu {
      top: 100%;
      right: 0;
      margin-top: var(--cg-spacing-4, 4px);
      transform-origin: top right;
    }
    :host([position="top-start"]) .menu {
      bottom: 100%;
      left: 0;
      margin-bottom: var(--cg-spacing-4, 4px);
      transform-origin: bottom left;
    }
    :host([position="top-end"]) .menu {
      bottom: 100%;
      right: 0;
      margin-bottom: var(--cg-spacing-4, 4px);
      transform-origin: bottom right;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .menu {
        transition: opacity 100ms ease;
        transform: scale(1) !important;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      border-radius: var(--cg-border-radius-100, 8px);
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-text-primary, #fafafa);
      background: transparent;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      font-family: inherit;
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition:
        background-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      -webkit-font-smoothing: antialiased;
    }

    .menu-item:hover:not(.disabled) {
      background: var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.06));
    }

    .menu-item:active:not(.disabled) {
      transform: scale(var(--cg-interaction-press-scale, 0.97));
      background: var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.08));
    }

    .menu-item:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
    }

    .menu-item.active {
      background: var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.06));
    }

    .menu-item.disabled {
      color: var(--cg-color-text-disabled, #52525b);
      cursor: not-allowed;
      opacity: 0.5;
    }

    .menu-item-icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }

    .divider {
      height: 1px;
      margin: var(--cg-spacing-4, 4px) 0;
      background: var(--cg-color-surface-base-border, #27272a);
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) position: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';
  @property({ type: Array }) items: DropdownItem[] = [];

  @state() private _activeIndex = -1;
  @query('.menu') private _menu!: HTMLElement;

  private _outsideClickHandler = this._handleOutsideClick.bind(this);

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
      const trigger = this.shadowRoot?.querySelector('.trigger') as HTMLElement;
      trigger?.focus();
    });
  }

  override render() {
    return html`
      <div
        class="trigger"
        role="button"
        tabindex="0"
        aria-haspopup="menu"
        aria-expanded="${this.open}"
        @click="${this._toggle}"
        @keydown="${this._handleKeydown}"
      >
        <slot name="trigger"></slot>
      </div>
      <div
        class="menu"
        role="menu"
        aria-label="Dropdown menu"
        @keydown="${this._handleKeydown}"
      >
        ${this.items.map((item, index) => {
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
              @click="${() => this._selectItem(item)}"
            >
              ${item.icon ? html`<span class="menu-item-icon">${item.icon}</span>` : nothing}
              ${item.label}
            </button>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-dropdown': CgDropdown;
  }
}
