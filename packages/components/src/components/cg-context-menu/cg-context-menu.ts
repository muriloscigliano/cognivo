import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { applyFloatingPosition } from '../../utils/floating.js';
import { bindOutsideClick } from '../../utils/outside-click.js';
import { handleRovingKey } from '../../utils/roving-index.js';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

/**
 * @element cg-context-menu
 * Right-click context menu with keyboard navigation, shortcuts, and danger variants.
 *
 * @example
 * ```html
 * <cg-context-menu .items=${[
 *   { id: 'copy', label: 'Copy', shortcut: '⌘C' },
 *   { id: 'cut', label: 'Cut', shortcut: '⌘X' },
 *   { separator: true, id: 'sep1', label: '' },
 *   { id: 'delete', label: 'Delete', danger: true },
 * ]}>
 *   <div>Right-click me</div>
 * </cg-context-menu>
 * ```
 *
 * @slot - Element to attach contextmenu listener to
 *
 * @fires {CustomEvent<{id: string, item: ContextMenuItem}>} cg-context-menu-select
 * @fires {CustomEvent} cg-context-menu-open
 * @fires {CustomEvent} cg-context-menu-close
 */
@customElement('cg-context-menu')
export class CgContextMenu extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger { display: inline-flex; }

    .menu {
      position: fixed;
      z-index: var(--cg-z-index-500);
      min-width: var(--cg-component-context-menu-min-width);
      padding: var(--cg-spacing-6);
      background: var(--cg-color-surface-popover-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-popover-border);
      border-radius: var(--cg-component-context-menu-radius);
      box-shadow: var(--cg-shadow-elevation-xl);
      opacity: 0;
      transform: scale(0.96) translateY(4px);
      transform-origin: top left;
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
      list-style: none;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
    }
    :host([open]) .menu {
      opacity: 1;
      transform: scale(1);
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
      background: none;
      color: var(--cg-color-surface-popover-text);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-snug);
      text-align: left;
      cursor: pointer;
      border-radius: var(--cg-border-radius-50);
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .item:hover:not([disabled]),
    .item[data-active]:not([disabled]) {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .item:active:not([disabled]) {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .item:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .item[disabled] {
      opacity: 0.45;
      cursor: not-allowed;
    }
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
      margin: var(--cg-spacing-6) var(--cg-spacing-6);
      background: var(--cg-color-surface-popover-border);
      opacity: 0.6;
      border: none;
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) items: ContextMenuItem[] = [];
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _activeIndex = -1;

  @query('.menu') private _menuEl!: HTMLElement;

  private _disposeOutsideClick: (() => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('contextmenu', this._onContextMenu);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('contextmenu', this._onContextMenu);
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
  }

  private _onContextMenu = (e: Event): void => {
    if (this.disabled) return;
    const mouseEvent = e as MouseEvent;
    mouseEvent.preventDefault();

    this.open = true;
    this._activeIndex = -1;
    this.dispatchEvent(new CustomEvent('cg-context-menu-open', { bubbles: true, composed: true }));

    // Position at mouse coords — use a synthetic "reference" element positioned at the pointer.
    requestAnimationFrame(() => {
      if (!this._menuEl) return;
      const pointRef = {
        getBoundingClientRect: () => ({
          top: mouseEvent.clientY, left: mouseEvent.clientX,
          width: 1, height: 1,
          bottom: mouseEvent.clientY + 1, right: mouseEvent.clientX + 1,
          x: mouseEvent.clientX, y: mouseEvent.clientY,
          toJSON() { return this; },
        }) as DOMRect,
      } as Element;
      applyFloatingPosition(pointRef, this._menuEl, {
        placement: 'bottom-start', offset: 0, flip: true, shift: true,
      });
    });

    this._disposeOutsideClick?.();
    this._disposeOutsideClick = bindOutsideClick(this, () => this._close());
  };

  private _close(): void {
    this.open = false;
    this._activeIndex = -1;
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
    this.dispatchEvent(new CustomEvent('cg-context-menu-close', { bubbles: true, composed: true }));
  }

  private _handleItemClick(item: ContextMenuItem): void {
    if (item.disabled || item.separator) return;
    this.dispatchEvent(new CustomEvent('cg-context-menu-select', {
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
      onSelect: item => this._handleItemClick(item),
      onEscape: () => this._close(),
    });
    if (handled) {
      e.preventDefault();
      this._activeIndex = index;
    }
  };

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        document.addEventListener('keydown', this._handleKeydown);
      } else {
        document.removeEventListener('keydown', this._handleKeydown);
      }
    }
  }

  override render() {
    let selectableIdx = -1;
    return html`
      <div class="trigger">
        <slot></slot>
      </div>
      <ul
        class="menu"
        role="menu"
        aria-orientation="vertical"
        ?hidden=${!this.open}
      >
        ${this.items.map(item => {
          if (item.separator) {
            return html`<li role="separator" class="separator"></li>`;
          }
          selectableIdx++;
          const isActive = selectableIdx === this._activeIndex;
          return html`
            <li role="none">
              <button
                class="item ${item.danger ? 'danger' : ''}"
                role="menuitem"
                ?disabled=${item.disabled}
                data-active=${isActive ? 'true' : nothing}
                @click=${() => this._handleItemClick(item)}
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
    'cg-context-menu': CgContextMenu;
  }
}
