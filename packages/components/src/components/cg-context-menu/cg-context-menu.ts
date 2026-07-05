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

    .menu-empty {
      padding: var(--cg-spacing-8);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
      text-align: center;
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) items: ContextMenuItem[] = [];
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Accessible name for the menu (bound as aria-label on role="menu"). */
  @property() label = 'Context menu';

  @state() private _activeIndex = -1;
  @state() private _closing = false;

  @query('.menu') private _menuEl!: HTMLElement;

  private _disposeOutsideClick: (() => void) | null = null;
  /** Element focused before the menu opened — restored on Escape / select. */
  private _previousFocus: HTMLElement | null = null;
  private _closeTimer: number | null = null;

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
    document.removeEventListener('keydown', this._handleKeydown);
    if (this._closeTimer !== null) {
      window.clearTimeout(this._closeTimer);
      this._closeTimer = null;
    }
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

  /** Deepest focused element, pierced through open shadow roots. */
  private static _deepActiveElement(): HTMLElement | null {
    let active: Element | null = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active as HTMLElement | null;
  }

  private _onContextMenu = (e: Event): void => {
    if (this.disabled) return;
    const mouseEvent = e as MouseEvent;
    mouseEvent.preventDefault();

    if (!this.open) {
      this._previousFocus = CgContextMenu._deepActiveElement();
    }
    this.open = true;
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

  private _close(restoreFocus = false): void {
    if (!this.open) return;
    this.open = false;
    this._activeIndex = -1;
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
    this.dispatchEvent(new CustomEvent('cg-context-menu-close', { bubbles: true, composed: true }));
    if (restoreFocus) this._previousFocus?.focus();
    this._previousFocus = null;
  }

  private _handleItemClick(item: ContextMenuItem): void {
    if (item.disabled || item.separator) return;
    this.dispatchEvent(new CustomEvent('cg-context-menu-select', {
      detail: { id: item.id, item },
      bubbles: true,
      composed: true,
    }));
    this._close(true);
  }

  /** Selectable = keyboard-navigable: not a separator, not disabled. */
  private get _selectableItems(): ContextMenuItem[] {
    return this.items.filter(i => !i.separator && !i.disabled);
  }

  /** Move real DOM focus to the selectable item at `index` (roving focus). */
  private _focusItem(index: number): void {
    this.updateComplete.then(() => {
      const items = this.shadowRoot?.querySelectorAll<HTMLElement>('.menu-item:not([disabled])');
      items?.[index]?.focus();
    });
  }

  private _handleKeydown = (e: KeyboardEvent): void => {
    if (!this.open) return;
    if (e.key === 'Tab') {
      // No focus trap — Tab dismisses and lets focus move on naturally.
      this._close();
      return;
    }
    const { index, handled } = handleRovingKey(e, {
      items: this.items,
      activeIndex: this._activeIndex,
      isSkippable: i => Boolean(i.separator || i.disabled),
      onSelect: item => this._handleItemClick(item),
      onEscape: () => this._close(true),
    });
    if (handled) {
      e.preventDefault();
      if (this.open) {
        this._activeIndex = index;
        this._focusItem(index);
      }
      return;
    }
    this._typeahead(e);
  };

  /** Jump focus to the next item whose label starts with the typed character. */
  private _typeahead(e: KeyboardEvent): void {
    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
    const char = e.key.toLowerCase();
    if (!/\S/.test(char)) return;
    const selectable = this._selectableItems;
    if (selectable.length === 0) return;
    const start = this._activeIndex >= 0 ? this._activeIndex + 1 : 0;
    for (let offset = 0; offset < selectable.length; offset++) {
      const idx = (start + offset) % selectable.length;
      const item = selectable[idx];
      if (item && item.label.toLowerCase().startsWith(char)) {
        e.preventDefault();
        this._activeIndex = idx;
        this._focusItem(idx);
        return;
      }
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (!changed.has('open')) return;
    if (this.open) {
      // Reopening cancels any in-flight exit animation.
      if (this._closeTimer !== null) {
        window.clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      this._closing = false;
      document.addEventListener('keydown', this._handleKeydown);
      // Roving focus: real DOM focus lands on the first selectable item
      // (same pattern as cg-dropdown / cg-split-button).
      if (this._activeIndex < 0 && this._selectableItems.length > 0) {
        this._activeIndex = 0;
      }
      if (this._activeIndex >= 0) this._focusItem(this._activeIndex);
    } else {
      document.removeEventListener('keydown', this._handleKeydown);
      if (changed.get('open') === true) this._startClosing();
    }
  }

  /** Exit animation: `.closing` plays cg-menu-exit (menuListStyles), cleared
   * on animationend with a timeout fallback — cg-modal / cg-tooltip pattern. */
  private _startClosing(): void {
    this._closing = true;
    const finish = (): void => {
      if (this._closeTimer !== null) {
        window.clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      this._closing = false;
    };
    const menu = this.shadowRoot?.querySelector('.menu');
    menu?.addEventListener('animationend', (e) => {
      if ((e as AnimationEvent).animationName === 'cg-menu-exit') finish();
    }, { once: true });
    // Fallback for prefers-reduced-motion / detached nodes.
    this._closeTimer = window.setTimeout(finish, 300);
  }

  override render() {
    let selectableIdx = -1;
    return html`
      <div class="trigger">
        <slot></slot>
      </div>
      <ul
        class="menu ${this._closing ? 'closing' : ''}"
        role="menu"
        aria-label=${this.label}
        aria-orientation="vertical"
        ?inert=${!this.open}
      >
        ${this.items.length === 0 ? html`
          <li class="menu-empty" role="presentation">No actions</li>
        ` : nothing}
        ${this.items.map((item, idx) => {
          if (item.separator) {
            return html`<li role="separator" class="divider"></li>`;
          }
          // _activeIndex indexes the *selectable* sub-list (no separators,
          // no disabled items) — matches handleRovingKey's contract.
          if (!item.disabled) selectableIdx++;
          const isActive = !item.disabled && selectableIdx === this._activeIndex;
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
