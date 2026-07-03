import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state, query, queryAssignedElements } from 'lit/decorators.js';
import { hostBlock, reducedMotion, focusRingDual } from '../../styles/index.js';

/**
 * @element cg-overflow-list
 * Lays out slotted items in a single row and collapses those that don't fit
 * into a trailing "more" menu.
 *
 * @example
 * ```html
 * <cg-overflow-list more-label="More actions">
 *   <cg-button>Cut</cg-button>
 *   <cg-button>Copy</cg-button>
 *   <cg-button>Paste</cg-button>
 *   <cg-button>Delete</cg-button>
 * </cg-overflow-list>
 * ```
 *
 * @slot - Items to lay out.
 * @slot more - Optional custom overflow trigger.
 *
 * @fires {CustomEvent<{hiddenCount: number, hiddenIndices: number[]}>} cg-overflow-change
 * @fires {CustomEvent<{index: number}>} cg-overflow-select
 */
@customElement('cg-overflow-list')
export class CgOverflowList extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .row {
      display: flex;
      align-items: center;
      gap: var(--_cg-of-gap, var(--cg-spacing-8));
      flex-wrap: nowrap;
      overflow: hidden;
    }

    :host([gap="none"]) .row { --_cg-of-gap: 0; }
    :host([gap="xs"]) .row { --_cg-of-gap: var(--cg-spacing-4); }
    :host([gap="sm"]) .row { --_cg-of-gap: var(--cg-spacing-8); }
    :host([gap="md"]) .row { --_cg-of-gap: var(--cg-spacing-16); }
    :host([gap="lg"]) .row { --_cg-of-gap: var(--cg-spacing-24); }

    ::slotted([hidden]) { display: none !important; }

    .more-wrap { position: relative; flex: 0 0 auto; }

    .more {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--cg-spacing-32);
      min-width: var(--cg-spacing-32);
      padding: 0 var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-150);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-cards-text);
      cursor: pointer;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .more:hover { border-color: var(--cg-color-action-primary-border-default); }
    .more:active { transform: scale(var(--cg-interaction-press-scale)); }
    .more:focus-visible { ${focusRingDual} }
    .more svg { width: var(--cg-spacing-16); height: var(--cg-spacing-16); }
    .more[hidden] { display: none; }

    .menu {
      position: absolute;
      top: calc(100% + var(--cg-spacing-4));
      right: 0;
      min-width: var(--cg-spacing-160);
      padding: var(--cg-spacing-4);
      background: var(--cg-color-surface-popover-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      box-shadow: var(--cg-shadow-lg);
      z-index: var(--cg-z-index-300);
      list-style: none;
      margin: 0;
    }
    .menu[hidden] { display: none; }

    .menu-item {
      display: block;
      width: 100%;
      text-align: left;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border: none;
      background: transparent;
      color: var(--cg-color-surface-popover-text);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      font-family: var(--cg-font-family-primary);
      font-size: var(--cg-font-size-sm);
    }
    .menu-item:hover { background: var(--cg-color-action-tertiary-background-hover); }
    .menu-item:focus-visible { ${focusRingDual} }
  `];

  @property({ reflect: true }) gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' = 'sm';
  @property({ attribute: 'more-label' }) moreLabel = 'More';
  @property({ type: Number, reflect: true, attribute: 'min-visible' }) minVisible = 0;

  @state() private _hiddenIndices: number[] = [];
  @state() private _menuOpen = false;

  @query('.row') private _rowEl!: HTMLElement;
  @query('.more') private _moreEl?: HTMLElement;
  @queryAssignedElements({ flatten: true }) private _items!: HTMLElement[];

  private _resizeObserver: ResizeObserver | undefined;

  override connectedCallback(): void {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() => this._measure());
    this._resizeObserver.observe(this);
    document.addEventListener('click', this._onDocClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    document.removeEventListener('click', this._onDocClick);
  }

  override firstUpdated(): void {
    this._measure();
  }

  private _onDocClick = (e: MouseEvent): void => {
    if (!this._menuOpen) return;
    if (!e.composedPath().includes(this)) this._menuOpen = false;
  };

  /** Measure children and hide the trailing ones that overflow. */
  private _measure(): void {
    const items = this._items ?? [];
    if (items.length === 0 || !this._rowEl) return;

    // Reset: show everything, then measure.
    items.forEach((el) => { el.hidden = false; el.removeAttribute('aria-hidden'); });

    const available = this._rowEl.clientWidth;
    const gap = parseFloat(getComputedStyle(this._rowEl).columnGap || '0') || 0;
    const moreWidth = this._moreEl ? this._moreEl.offsetWidth + gap : 0;

    // First pass: does everything fit without a more button?
    let total = 0;
    items.forEach((el, i) => { total += el.offsetWidth + (i > 0 ? gap : 0); });

    const hidden: number[] = [];
    if (total > available) {
      // Reserve space for the more button and fit as many leading items as possible.
      let used = 0;
      const budget = available - moreWidth;
      items.forEach((el, i) => {
        const w = el.offsetWidth + (i > 0 ? gap : 0);
        if (i < this.minVisible) { used += w; return; }
        if (used + w <= budget) { used += w; }
        else { hidden.push(i); }
      });
    }

    // Apply visibility.
    items.forEach((el, i) => {
      const isHidden = hidden.includes(i);
      el.hidden = isHidden;
      if (isHidden) el.setAttribute('aria-hidden', 'true');
      else el.removeAttribute('aria-hidden');
    });

    const changed =
      hidden.length !== this._hiddenIndices.length ||
      hidden.some((v, i) => v !== this._hiddenIndices[i]);

    if (changed) {
      this._hiddenIndices = hidden;
      this.dispatchEvent(new CustomEvent('cg-overflow-change', {
        detail: { hiddenCount: hidden.length, hiddenIndices: hidden },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _onSlotChange(): void {
    // Re-measure after DOM settles.
    requestAnimationFrame(() => this._measure());
  }

  private _toggleMenu(): void {
    this._menuOpen = !this._menuOpen;
  }

  private _selectHidden(index: number): void {
    this._menuOpen = false;
    this.dispatchEvent(new CustomEvent('cg-overflow-select', {
      detail: { index },
      bubbles: true,
      composed: true,
    }));
  }

  private _hiddenLabel(index: number): string {
    const el = this._items?.[index];
    return (el?.textContent || '').trim() || `Item ${index + 1}`;
  }

  override render() {
    const hasOverflow = this._hiddenIndices.length > 0;
    return html`
      <div class="row">
        <slot @slotchange=${this._onSlotChange}></slot>
        <span class="more-wrap">
          <button
            class="more"
            type="button"
            ?hidden=${!hasOverflow}
            aria-haspopup="menu"
            aria-expanded=${this._menuOpen ? 'true' : 'false'}
            aria-label=${this.moreLabel}
            @click=${this._toggleMenu}
          >
            <slot name="more">
              ${svg`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>`}
            </slot>
          </button>
          <ul class="menu" role="menu" ?hidden=${!this._menuOpen}>
            ${this._hiddenIndices.map((i) => html`
              <li role="none">
                <button class="menu-item" role="menuitem" type="button" @click=${() => this._selectHidden(i)}>
                  ${this._hiddenLabel(i)}
                </button>
              </li>
            `)}
          </ul>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-overflow-list': CgOverflowList;
  }
}
