import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion, menuListStyles } from '../../styles/index.js';
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
  static override styles = [hostBlock, reducedMotion, menuListStyles, css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger { display: inline-flex; }

    /* Context-menu-specific positioning. Visual styling (surface, items,
       icons, shortcut, divider, animation, rounded variants) inherited
       from menuListStyles for consistency with cg-dropdown / cg-menubar /
       cg-split-button. */
    .menu {
      position: fixed;
      z-index: var(--cg-z-index-500);
      list-style: none;
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) items: ContextMenuItem[] = [];
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _activeIndex = -1;

  @query('.menu') private _menuEl!: HTMLElement;

  private _disposeOutsideClick: (() => void) | null = null;

  /** Long-press support — touch equivalent of right-click. Opens the menu
   * after 500ms of stationary press. Auto-cancels if the pointer moves more
   * than a few pixels (a drag, not a press). */
  private _pressTimer: number | null = null;
  private _pressStartX = 0;
  private _pressStartY = 0;
  private static readonly LONG_PRESS_MS = 500;
  private static readonly LONG_PRESS_TOLERANCE_PX = 8;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('contextmenu', this._onContextMenu);
    this.addEventListener('pointerdown', this._onPointerDown);
    this.addEventListener('pointermove', this._onPointerMove);
    this.addEventListener('pointerup', this._cancelLongPress);
    this.addEventListener('pointercancel', this._cancelLongPress);
    this.addEventListener('pointerleave', this._cancelLongPress);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('contextmenu', this._onContextMenu);
    this.removeEventListener('pointerdown', this._onPointerDown);
    this.removeEventListener('pointermove', this._onPointerMove);
    this.removeEventListener('pointerup', this._cancelLongPress);
    this.removeEventListener('pointercancel', this._cancelLongPress);
    this.removeEventListener('pointerleave', this._cancelLongPress);
    this._cancelLongPress();
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
  }

  private _onPointerDown = (e: PointerEvent): void => {
    // Only touch / pen — mouse uses contextmenu.
    if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
    if (this.disabled) return;
    this._pressStartX = e.clientX;
    this._pressStartY = e.clientY;
    this._pressTimer = window.setTimeout(() => {
      // Synthesize a contextmenu-equivalent event at the press location.
      const synthetic = new MouseEvent('contextmenu', {
        clientX: this._pressStartX,
        clientY: this._pressStartY,
        bubbles: true,
      });
      this._onContextMenu(synthetic);
    }, CgContextMenu.LONG_PRESS_MS);
  };

  private _onPointerMove = (e: PointerEvent): void => {
    if (this._pressTimer === null) return;
    const dx = Math.abs(e.clientX - this._pressStartX);
    const dy = Math.abs(e.clientY - this._pressStartY);
    if (dx > CgContextMenu.LONG_PRESS_TOLERANCE_PX || dy > CgContextMenu.LONG_PRESS_TOLERANCE_PX) {
      this._cancelLongPress();
    }
  };

  private _cancelLongPress = (): void => {
    if (this._pressTimer !== null) {
      window.clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
  };

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
        ${this.items.map((item, idx) => {
          if (item.separator) {
            return html`<li role="separator" class="divider"></li>`;
          }
          selectableIdx++;
          const isActive = selectableIdx === this._activeIndex;
          return html`
            <li role="none">
              <button
                class="menu-item ${item.danger ? 'danger' : ''}"
                role="menuitem"
                ?disabled=${item.disabled}
                data-active=${isActive ? 'true' : nothing}
                style="--stagger-index: ${idx}"
                @click=${() => this._handleItemClick(item)}
              >
                ${item.icon ? html`<cg-icon class="menu-item-icon" name=${item.icon} size="sm"></cg-icon>` : nothing}
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
    'cg-context-menu': CgContextMenu;
  }
}
