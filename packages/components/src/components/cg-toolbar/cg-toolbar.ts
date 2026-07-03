import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-toolbar
 * Grouped-action container implementing the ARIA `toolbar` roving-tabindex pattern:
 * a single tab stop, arrow keys move between actions.
 *
 * @example
 * ```html
 * <cg-toolbar label="Text formatting">
 *   <cg-button>Bold</cg-button>
 *   <cg-button>Italic</cg-button>
 *   <cg-separator orientation="vertical"></cg-separator>
 *   <cg-button>Link</cg-button>
 * </cg-toolbar>
 * ```
 *
 * @slot - Interactive actions (cg-button, cg-toggle, cg-separator, …).
 */
@customElement('cg-toolbar')
export class CgToolbar extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-component-toolbar-gap-md);
      padding: var(--cg-component-toolbar-padding-md);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-toolbar-radius);
      font-family: var(--cg-font-family-primary);
    }

    /* ── Orientation ── */
    :host([orientation="vertical"]) {
      display: inline-flex;
      flex-direction: column;
      align-items: stretch;
    }

    /* ── Wrap ── */
    :host([wrap]) { flex-wrap: wrap; }

    /* ── Sizes ── */
    :host([size="sm"]) {
      gap: var(--cg-component-toolbar-gap-sm);
      padding: var(--cg-component-toolbar-padding-sm);
    }
    :host([size="lg"]) {
      gap: var(--cg-component-toolbar-gap-lg);
      padding: var(--cg-component-toolbar-padding-lg);
    }

    .root {
      display: contents;
    }
  `];

  /** Arrow-key axis + flex direction. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** aria-label for the toolbar landmark. */
  @property() label = '';

  /** Gap/padding scale. */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Allow items to wrap. */
  @property({ type: Boolean, reflect: true }) wrap = false;

  @queryAssignedElements({ flatten: true }) private _items!: HTMLElement[];

  /** Index of the current roving item within _focusable(). */
  private _rovingIndex = 0;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focusin', this._onFocusIn);
    this.addEventListener('keydown', this._onKeydown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focusin', this._onFocusIn);
    this.removeEventListener('keydown', this._onKeydown);
  }

  /** Focusable items = slotted, not disabled, not aria-hidden, not a separator. */
  private _focusable(): HTMLElement[] {
    return (this._items ?? []).filter((el) => {
      if (el.hasAttribute('disabled')) return false;
      if (el.getAttribute('aria-disabled') === 'true') return false;
      if (el.hasAttribute('aria-hidden')) return false;
      const role = el.getAttribute('role');
      const tag = el.tagName.toLowerCase();
      if (role === 'separator' || tag === 'cg-separator') return false;
      return true;
    });
  }

  /** Apply roving tabindex: only the roving item is tabbable. */
  private _syncTabindex(): void {
    const items = this._focusable();
    if (items.length === 0) return;
    if (this._rovingIndex >= items.length) this._rovingIndex = 0;
    items.forEach((el, i) => {
      el.tabIndex = i === this._rovingIndex ? 0 : -1;
    });
  }

  override firstUpdated(): void {
    // slotchange is unreliable in some test environments; sync once on first paint.
    this._syncTabindex();
  }

  private _onSlotChange(): void {
    this._syncTabindex();
  }

  private _onFocusIn = (e: FocusEvent): void => {
    const items = this._focusable();
    const target = e.target as HTMLElement;
    // Map the focused element (or its host ancestor) to a roving index.
    const idx = items.findIndex((el) => el === target || el.contains(target));
    if (idx >= 0) {
      this._rovingIndex = idx;
      this._syncTabindex();
    }
  };

  private _onKeydown = (e: KeyboardEvent): void => {
    const items = this._focusable();
    if (items.length === 0) return;

    const horizontal = this.orientation !== 'vertical';
    const next = horizontal ? 'ArrowRight' : 'ArrowDown';
    const prev = horizontal ? 'ArrowLeft' : 'ArrowUp';

    let target = -1;
    if (e.key === next) target = (this._rovingIndex + 1) % items.length;
    else if (e.key === prev) target = (this._rovingIndex - 1 + items.length) % items.length;
    else if (e.key === 'Home') target = 0;
    else if (e.key === 'End') target = items.length - 1;
    else return;

    e.preventDefault();
    this._rovingIndex = target;
    this._syncTabindex();
    items[target]?.focus();
  };

  /** Move focus to the current roving item. */
  override focus(): void {
    const items = this._focusable();
    items[this._rovingIndex]?.focus();
  }

  override render() {
    return html`
      <div
        class="root"
        role="toolbar"
        aria-label=${this.label || 'Toolbar'}
        aria-orientation=${this.orientation}
      >
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-toolbar': CgToolbar;
  }
}
