import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBase, reducedMotion, entranceStagger, menuListStyles } from '../../styles/index.js';
import { applyFloatingPosition } from '../../utils/floating.js';
import { bindOutsideClick } from '../../utils/outside-click.js';
import { handleRovingKey } from '../../utils/roving-index.js';

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
  static override styles = [hostBase, reducedMotion, entranceStagger, menuListStyles, css`
    :host {
      display: inline-flex;
      position: relative;
    }

    /* Outer group — carries the border-radius so inner buttons inherit corners. */
    .group {
      display: inline-flex;
      align-items: stretch;
      border-radius: var(--cg-component-button-radius-md);
    }
    :host([size="sm"]) .group { border-radius: var(--cg-component-button-radius-sm); }
    :host([size="lg"]) .group { border-radius: var(--cg-component-button-radius-lg); }

    /* Rounded prop overrides the size-derived radius (matches cg-button). */
    :host([rounded="none"]) .group { border-radius: 0; }
    :host([rounded="sm"]) .group { border-radius: var(--cg-component-button-radius-sm); }
    :host([rounded="md"]) .group { border-radius: var(--cg-component-button-radius-md); }
    :host([rounded="lg"]) .group { border-radius: var(--cg-component-button-radius-lg); }

    /* Group-button baseline — scoped to .group so it doesn't hit menu items. */
    .group > button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-8);
      height: var(--cg-component-button-height-md);
      padding: 0 var(--cg-spacing-16);
      border: var(--cg-border-width-50) solid transparent;
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      position: relative;
      -webkit-font-smoothing: antialiased;
      transition:
        background-color var(--cg-transition-duration-fast) ease,
        border-color var(--cg-transition-duration-fast) ease,
        box-shadow var(--cg-transition-duration-fast) ease,
        transform var(--cg-transition-duration-fast) ease;
    }
    .group > button:active:not(:disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .group > button:focus-visible {
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
      outline: none;
      z-index: 1;
    }
    /* Themeable per-variant disabled colors (scoped with :host to win over variant rules). */
    .group > button:disabled { pointer-events: none; }
    :host([variant="primary"]) .group > button:disabled,
    :host([type="danger"][variant="primary"]) .group > button:disabled {
      background: var(--cg-color-action-primary-background-disable);
      color: var(--cg-color-action-primary-text-disable);
    }
    :host([variant="secondary"]) .group > button:disabled {
      background: var(--cg-color-action-secondary-background-disable);
      color: var(--cg-color-action-secondary-text-disable);
    }
    :host([variant="tertiary"]) .group > button:disabled {
      background: var(--cg-color-action-tertiary-background-disable);
      color: var(--cg-color-action-tertiary-text-disable);
    }

    /* Sizes — scoped to .group. */
    :host([size="sm"]) .group > button { height: var(--cg-component-button-height-sm); padding: 0 var(--cg-spacing-12); font-size: var(--cg-font-size-xs); }
    :host([size="lg"]) .group > button { height: var(--cg-component-button-height-lg); padding: 0 var(--cg-spacing-24); font-size: var(--cg-font-size-base); }

    /* Chevron stays narrow at every size (placed after the size rules to win). */
    .group > button.chevron { padding: 0 var(--cg-spacing-8); }
    :host([size="sm"]) .group > button.chevron { padding: 0 var(--cg-spacing-8); }
    :host([size="lg"]) .group > button.chevron { padding: 0 var(--cg-spacing-12); }

    .primary {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    }
    /* Divider between primary and chevron — a dedicated line rendered as a pseudo
       element, so it's not fighting the button's own border shorthand. */
    .primary::after {
      content: '';
      position: absolute;
      top: 18%;
      right: calc(-1 * var(--cg-border-width-50));
      width: var(--cg-border-width-50);
      height: 64%;
      background: color-mix(in srgb, var(--cg-color-action-primary-text-default) 22%, transparent);
      pointer-events: none;
      z-index: 1;
    }

    .chevron {
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }
    .chevron svg {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      transition: transform var(--cg-transition-duration-fast) ease;
    }
    :host([open]) .chevron svg { transform: rotate(180deg); }

    /* ── Primary variant (default) ── */
    :host([variant="primary"]) .group > button {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-border-default);
    }
    :host([variant="primary"]) .group > button:not(:disabled):hover {
      background: var(--cg-color-action-primary-background-hover);
    }

    /* ── Secondary variant ── */
    :host([variant="secondary"]) .group > button {
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-action-secondary-text-default);
      border-color: var(--cg-color-action-secondary-border-default);
    }
    :host([variant="secondary"]) .group > button:not(:disabled):hover {
      background: var(--cg-color-action-secondary-background-hover);
    }
    :host([variant="secondary"]) .primary::after {
      background: var(--cg-color-action-secondary-border-default);
    }

    /* ── Tertiary (ghost) variant ── */
    :host([variant="tertiary"]) .group > button {
      background: transparent;
      color: var(--cg-color-action-tertiary-text-default);
      border-color: transparent;
    }
    :host([variant="tertiary"]) .group > button:not(:disabled):hover {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    :host([variant="tertiary"]) .primary::after {
      background: var(--cg-color-surface-cards-border);
    }

    /* ── Danger type ── */
    :host([type="danger"]) .group > button {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([type="danger"][variant="primary"]) .group > button {
      background: var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-inverse);
      border-color: transparent;
    }
    :host([type="danger"]) .group > button:not(:disabled):hover,
    :host([type="danger"][variant="primary"]) .group > button:not(:disabled):hover {
      background: var(--cg-color-status-error-background-hover);
      color: var(--cg-color-status-error-text-inverse);
    }
    :host([type="danger"]) .primary::after { background: color-mix(in srgb, var(--cg-color-status-error-text-default) 25%, transparent); }

    /* Loading spinner on primary button */
    .spinner {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      border: var(--cg-border-width-100) solid currentColor;
      border-right-color: transparent;
      border-radius: var(--cg-border-radius-full);
      animation: spin var(--cg-transition-duration-slow) linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    :host([loading]) .primary { pointer-events: none; }

    /* Menu positioning — visual styling inherited from menuListStyles.
       cg-split-button uses fixed positioning + floating-ui placement computed in JS. */
    .menu {
      position: fixed;
      z-index: var(--cg-z-index-500);
    }
    :host([menu-placement="bottom-start"]) .menu { transform-origin: top left; }
    :host([menu-placement="bottom-end"]) .menu { transform-origin: top right; }
    :host([menu-placement="top-start"]) .menu { transform-origin: bottom left; }
    :host([menu-placement="top-end"]) .menu { transform-origin: bottom right; }
  `];

  @property() label = '';
  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) type: 'normal' | 'danger' = 'normal';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Array }) items: SplitButtonItem[] = [];
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ attribute: 'menu-placement', reflect: true }) menuPlacement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-end';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'md';

  @state() private _activeIndex = -1;
  @query('.menu') private _menuEl!: HTMLElement;
  @query('.chevron') private _chevronEl!: HTMLElement;

  private _disposeOutsideClick: (() => void) | null = null;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
    document.removeEventListener('keydown', this._handleKeydown);
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
    if (this.open) return;
    this.open = true;
    this._activeIndex = -1;
    this.dispatchEvent(new CustomEvent('cg-split-button-open', { bubbles: true, composed: true }));
  }

  private _close(): void {
    if (!this.open) return;
    this.open = false;
    this._activeIndex = -1;
    this.dispatchEvent(new CustomEvent('cg-split-button-close', { bubbles: true, composed: true }));
  }

  /* Positioning + listener wiring keyed on `open` so external property/attribute
     toggles behave the same as _openMenu/_close (mirrors cg-dropdown). */
  override updated(changed: PropertyValues): void {
    if (!changed.has('open')) return;
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
    document.removeEventListener('keydown', this._handleKeydown);
    if (this.open) {
      requestAnimationFrame(() => {
        if (!this._menuEl || !this._chevronEl) return;
        applyFloatingPosition(this._chevronEl, this._menuEl, {
          placement: this.menuPlacement, offset: 4, flip: true, shift: true,
        });
      });
      this._disposeOutsideClick = bindOutsideClick(this, () => this._close());
      setTimeout(() => {
        if (this.open) document.addEventListener('keydown', this._handleKeydown);
      }, 0);
    }
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
    const { index, handled } = handleRovingKey(e, {
      items: this.items,
      activeIndex: this._activeIndex,
      isSkippable: i => Boolean(i.separator || i.disabled),
      onSelect: item => this._select(item),
      onEscape: () => this._close(),
    });
    if (handled) {
      e.preventDefault();
      this._activeIndex = index;
      this.updateComplete.then(() => {
        this.shadowRoot?.querySelector<HTMLElement>('.menu-item[data-active]')?.focus();
      });
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
      <ul class="menu" role="menu" ?inert=${!this.open}>
        ${this.items.map((item, index) => {
          if (item.separator) return html`<li role="separator" class="divider"></li>`;
          selectableIdx++;
          const isActive = selectableIdx === this._activeIndex;
          return html`
            <li role="none">
              <button
                class="menu-item ${item.danger ? 'danger' : ''}"
                role="menuitem"
                ?disabled=${item.disabled}
                data-active=${isActive ? 'true' : nothing}
                style="--stagger-index: ${index}"
                @click=${() => this._select(item)}
              >
                ${item.icon ? html`<cg-icon class="menu-item-icon" name="${item.icon}" size="sm"></cg-icon>` : nothing}
                <span>${item.label}</span>
                ${item.shortcut ? html`<span class="menu-item-shortcut">${item.shortcut}</span>` : nothing}
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
