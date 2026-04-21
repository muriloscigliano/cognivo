import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';
import { computePosition } from '../../utils/floating.js';

export interface SplitButtonItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

/**
 * @element cg-split-button
 * Primary action button with an attached dropdown for related actions
 * (`Save ▼` → Save / Save As / Save a copy). Shares variant/size with cg-button.
 *
 * @example
 * ```html
 * <cg-split-button
 *   label="Save"
 *   variant="primary"
 *   .items=${[
 *     { id: 'save-as', label: 'Save as…', shortcut: '⌘⇧S' },
 *     { id: 'copy', label: 'Save a copy' },
 *     { separator: true, id: 's1', label: '' },
 *     { id: 'delete', label: 'Delete', danger: true },
 *   ]}
 * ></cg-split-button>
 * ```
 *
 * @fires {CustomEvent} cg-split-button-click  - Primary action triggered
 * @fires {CustomEvent<{id:string, item:SplitButtonItem}>} cg-split-button-select - Menu item selected
 * @fires {CustomEvent} cg-split-button-open   - Menu opened
 * @fires {CustomEvent} cg-split-button-close  - Menu closed
 */
@customElement('cg-split-button')
export class CgSplitButton extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-flex;
      position: relative;
    }

    .group {
      display: inline-flex;
      align-items: stretch;
      border-radius: var(--cg-component-button-radius-md);
      overflow: visible;
    }
    :host([size="sm"]) .group { border-radius: var(--cg-component-button-radius-sm); }
    :host([size="lg"]) .group { border-radius: var(--cg-component-button-radius-lg); }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--cg-component-button-height-md);
      padding: 0 var(--cg-spacing-16);
      border: var(--cg-border-width-50) solid transparent;
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      user-select: none;
      position: relative;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    button:active:not(:disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }
    button:focus-visible {
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
      outline: none;
      z-index: 1;
    }
    button:disabled { opacity: 0.45; cursor: not-allowed; }

    /* Sizes */
    :host([size="sm"]) button { height: var(--cg-component-button-height-sm); padding: 0 var(--cg-spacing-12); font-size: var(--cg-font-size-xs); }
    :host([size="lg"]) button { height: var(--cg-component-button-height-lg); padding: 0 var(--cg-spacing-24); font-size: var(--cg-font-size-base); }

    .primary {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      border-right: var(--cg-border-width-50) solid color-mix(in srgb, var(--cg-color-action-primary-text-default) 20%, transparent);
    }

    .chevron {
      padding: 0 var(--cg-spacing-8);
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }
    .chevron svg {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([open]) .chevron svg { transform: rotate(180deg); }

    /* Variant: secondary */
    :host([variant="secondary"]) button {
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-action-secondary-text-default);
      border-color: var(--cg-color-action-secondary-border-default);
    }
    :host([variant="secondary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-secondary-background-hover);
    }
    :host([variant="secondary"]) .primary {
      border-right-color: var(--cg-color-action-secondary-border-default);
    }

    /* Variant: tertiary */
    :host([variant="tertiary"]) button {
      background: transparent;
      color: var(--cg-color-surface-base-text);
    }
    :host([variant="tertiary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    :host([variant="tertiary"]) .primary {
      border-right-color: var(--cg-color-surface-cards-border);
    }

    /* Variant: primary hover */
    :host([variant="primary"]) button:not(:disabled):hover,
    :host(:not([variant])) button:not(:disabled):hover {
      background: var(--cg-color-action-primary-background-hover);
    }

    /* Type: danger */
    :host([type="danger"][variant="primary"]) button {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }
    :host([type="danger"][variant="primary"]) button:not(:disabled):hover {
      background: var(--cg-color-status-error-background-hover);
    }

    /* Loading spinner on primary button */
    .spinner {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid currentColor;
      border-right-color: transparent;
      border-radius: var(--cg-border-radius-full);
      animation: spin 600ms linear infinite;
      margin-right: var(--cg-spacing-8);
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    :host([loading]) .primary { pointer-events: none; }

    /* Menu */
    .menu {
      position: fixed;
      z-index: var(--cg-z-index-500);
      min-width: var(--cg-spacing-192);
      padding: var(--cg-spacing-6);
      background: var(--cg-color-surface-popover-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-popover-border);
      border-radius: var(--cg-component-context-menu-radius);
      box-shadow: var(--cg-shadow-elevation-xl);
      opacity: 0;
      transform: scale(0.96) translateY(-4px);
      transform-origin: top right;
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      list-style: none;
      margin: 0;
    }
    :host([open]) .menu {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }

    .item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      width: 100%;
      height: var(--cg-component-context-menu-item-height);
      padding: 0 var(--cg-spacing-12);
      border: none;
      background: transparent;
      color: var(--cg-color-surface-popover-text);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      text-align: left;
      cursor: pointer;
      border-radius: var(--cg-border-radius-50);
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .item:hover:not([disabled]),
    .item[data-active]:not([disabled]) {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .item[disabled] { opacity: 0.45; cursor: not-allowed; }
    .item.danger { color: var(--cg-color-status-error-text-default); }
    .item.danger:hover:not([disabled]),
    .item.danger[data-active]:not([disabled]) {
      background: var(--cg-color-status-error-background-default);
    }
    .shortcut {
      margin-left: auto;
      font: 500 var(--cg-font-size-xs) var(--cg-font-family-mono);
      color: var(--cg-color-surface-popover-text);
      opacity: 0.5;
    }
    .separator {
      height: var(--cg-border-width-50);
      margin: var(--cg-spacing-6) 0;
      background: var(--cg-color-surface-popover-border);
      border: none;
    }
  `];

  @property() label = '';
  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) type: 'normal' | 'danger' = 'normal';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Array }) items: SplitButtonItem[] = [];
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ attribute: 'menu-placement' }) menuPlacement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-end';

  @state() private _activeIndex = -1;
  @query('.menu') private _menuEl!: HTMLElement;
  @query('.chevron') private _chevronEl!: HTMLElement;

  private _outsideClickHandler = (e: MouseEvent) => this._onOutsideClick(e);

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideClickHandler);
    document.removeEventListener('keydown', this._handleKeydown);
  }

  private _onOutsideClick(e: MouseEvent): void {
    if (!e.composedPath().includes(this)) this._close();
  }

  private _onPrimaryClick(e: Event): void {
    e.stopPropagation();
    if (this.disabled || this.loading) return;
    this.dispatchEvent(new CustomEvent('cg-split-button-click', { bubbles: true, composed: true }));
  }

  private _toggle(): void {
    if (this.disabled) return;
    this.open ? this._close() : this._openMenu();
  }

  private _openMenu(): void {
    this.open = true;
    this._activeIndex = -1;
    this.dispatchEvent(new CustomEvent('cg-split-button-open', { bubbles: true, composed: true }));

    requestAnimationFrame(() => {
      if (!this._menuEl || !this._chevronEl) return;
      const triggerRect = this._chevronEl.getBoundingClientRect();
      const menuRect = this._menuEl.getBoundingClientRect();
      const result = computePosition(
        { top: triggerRect.top, left: triggerRect.left, width: triggerRect.width, height: triggerRect.height },
        { width: menuRect.width, height: menuRect.height },
        { placement: this.menuPlacement, offset: 4, flip: true, shift: true }
      );
      this._menuEl.style.top = `${result.y}px`;
      this._menuEl.style.left = `${result.x}px`;
    });

    setTimeout(() => {
      document.addEventListener('click', this._outsideClickHandler);
      document.addEventListener('keydown', this._handleKeydown);
    }, 0);
  }

  private _close(): void {
    if (!this.open) return;
    this.open = false;
    this._activeIndex = -1;
    document.removeEventListener('click', this._outsideClickHandler);
    document.removeEventListener('keydown', this._handleKeydown);
    this.dispatchEvent(new CustomEvent('cg-split-button-close', { bubbles: true, composed: true }));
  }

  private _select(item: SplitButtonItem): void {
    if (item.disabled || item.separator) return;
    this.dispatchEvent(new CustomEvent('cg-split-button-select', {
      detail: { id: item.id, item },
      bubbles: true,
      composed: true,
    }));
    this._close();
  }

  private _handleKeydown = (e: KeyboardEvent): void => {
    if (!this.open) return;
    const selectable = this.items.filter(i => !i.separator && !i.disabled);
    const count = selectable.length;
    if (count === 0) return;

    if (e.key === 'Escape') { e.preventDefault(); this._close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._activeIndex = (this._activeIndex + 1) % count;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._activeIndex = (this._activeIndex - 1 + count) % count;
    } else if (e.key === 'Home') {
      e.preventDefault();
      this._activeIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      this._activeIndex = count - 1;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const item = selectable[this._activeIndex];
      if (item) this._select(item);
    }
  };

  private _onPrimaryKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      this._openMenu();
    }
  }

  override render() {
    let selectableIdx = -1;
    return html`
      <div class="group">
        <button
          class="primary"
          type="button"
          aria-label=${this.label}
          ?disabled=${this.disabled || this.loading}
          @click=${this._onPrimaryClick}
          @keydown=${this._onPrimaryKeydown}
        >
          ${this.loading ? html`<span class="spinner" aria-hidden="true"></span>` : nothing}
          ${this.label}
        </button>
        <button
          class="chevron"
          type="button"
          aria-label="More actions"
          aria-haspopup="menu"
          aria-expanded=${this.open ? 'true' : 'false'}
          ?disabled=${this.disabled}
          @click=${this._toggle}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>
      <ul class="menu" role="menu" ?hidden=${!this.open}>
        ${this.items.map(item => {
          if (item.separator) return html`<li role="separator" class="separator"></li>`;
          selectableIdx++;
          const isActive = selectableIdx === this._activeIndex;
          return html`
            <li role="none">
              <button
                class="item ${item.danger ? 'danger' : ''}"
                role="menuitem"
                ?disabled=${item.disabled}
                data-active=${isActive ? 'true' : nothing}
                @click=${() => this._select(item)}
              >
                <span>${item.label}</span>
                ${item.shortcut ? html`<span class="shortcut">${item.shortcut}</span>` : nothing}
              </button>
            </li>
          `;
        })}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-split-button': CgSplitButton;
  }
}
