import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Tab definition for cg-tabs, with value, label, optional icon, disabled state, and badge count. */
export interface TabItem {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  count?: number;
}

/**
 * @element cg-tabs
 * Tabbed navigation with animated sliding indicator, count badges, and keyboard nav.
 *
 * @example
 * ```html
 * <cg-tabs
 *   .tabs=${[{value:'all',label:'All',count:12},{value:'active',label:'Active'}]}
 *   value="all"
 * >
 *   <div slot="all">All items</div>
 *   <div slot="active">Active items</div>
 * </cg-tabs>
 * ```
 *
 * @slot - Default fallback panel content
 * @slot [value] - Named slot per tab value for panel content
 *
 * @fires {CustomEvent<{value: string, label: string}>} cg-tab-change - When a tab is selected
 *
 * @cssprop [--cg-focus-ring-color=#c8e650] - Indicator bar and focus outline color
 * @cssprop [--cg-text-accent=#e5ff6b] - Active tab text color
 * @cssprop [--cg-color-surface-container-background=#18181b] - Pills variant background
 */
@customElement('cg-tabs')
export class CgTabs extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .tab-list {
      display: flex;
      position: relative;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .tab-list::-webkit-scrollbar { display: none; }

    /* Underline variant (default) */
    :host(:not([variant="pills"])) .tab-list {
      border-bottom: 2px solid var(--cg-color-surface-container-border, #27272a);
    }

    :host(:not([variant="pills"])) .indicator {
      position: absolute;
      bottom: -2px;
      height: 2px;
      background: var(--cg-focus-ring-color, #c8e650);
      border-radius: 1px;
      transition: left var(--cg-motion-duration-slow, 0.25s) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)), width var(--cg-motion-duration-slow, 0.25s) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    .tab {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px var(--cg-spacing-16, 16px);
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-medium, 500);
      color: var(--cg-gray-500, #71717a);
      background: none;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      transition: color var(--cg-motion-duration-normal, 150ms) ease;
      font-family: inherit;
      position: relative;
    }

    .tab:hover:not(.disabled) { color: var(--cg-color-surface-base-text, #fafafa); background: var(--cg-overlay-accent-subtle, rgba(223, 255, 97, 0.06)); border-radius: var(--cg-border-radius-100, 8px); }
    .tab.active { color: var(--cg-text-accent, #e5ff6b); font-weight: var(--cg-font-weight-semibold, 600); }
    .tab.disabled { opacity: 0.4; cursor: not-allowed; }

    .tab:focus-visible {
      outline: 2px solid var(--cg-focus-ring-color, #c8e650);
      outline-offset: -2px;
      border-radius: 4px;
    }

    /* Count badge */
    .tab-count {
      font-size: 0.65rem;
      font-weight: var(--cg-font-weight-bold, 700);
      background: var(--cg-gray-200, #e4e4e7);
      color: var(--cg-gray-600, #52525b);
      padding: 1px 6px;
      border-radius: var(--cg-border-radius-full, 99999px);
      line-height: var(--cg-line-height-snug, 1.375);
    }
    .tab.active .tab-count {
      background: var(--cg-overlay-accent-medium, rgba(223, 255, 97, 0.18));
      color: var(--cg-text-accent, #e5ff6b);
    }

    /* Pills variant */
    :host([variant="pills"]) .tab-list {
      gap: var(--cg-spacing-4, 4px);
      background: var(--cg-color-surface-container-background, #18181b);
      padding: var(--cg-spacing-4, 4px);
      border-radius: var(--cg-border-radius-150, 12px);
    }
    :host([variant="pills"]) .tab {
      border-radius: 6px;
      padding: var(--cg-spacing-8, 8px) 14px;
    }
    :host([variant="pills"]) .tab.active {
      background: var(--cg-color-surface-raised-background, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
      box-shadow: var(--cg-shadow-sm-x, 0px) var(--cg-shadow-sm-y, 1px) var(--cg-shadow-sm-blur, 4px) var(--cg-shadow-sm-spread, 0px) var(--cg-shadow-sm-Color, #616161);
    }
    :host([variant="pills"]) .indicator { display: none; }

    /* Panel */
    .panel {
      padding: var(--cg-spacing-16, 16px) 0;
    }

    /* Size variants */
    :host([size="sm"]) .tab { font-size: 12px; padding: 6px 12px; }
    :host([size="sm"]:not([variant="pills"])) .indicator { height: 2px; }

    :host([size="lg"]) .tab { font-size: 16px; padding: 10px 20px; }
    :host([size="lg"]:not([variant="pills"])) .indicator { height: 3px; }
  `];

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Array }) tabs: TabItem[] = [];
  @property() value = '';
  @property({ reflect: true }) variant: 'underline' | 'pills' = 'underline';

  @state() private _active = '';
  @state() private _indicatorLeft = 0;
  @state() private _indicatorWidth = 0;

  @query('.tab-list') private _tabList!: HTMLElement;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('value') || changed.has('tabs')) {
      this._active = this.value || (this.tabs.length > 0 ? this.tabs[0]!.value : '');
    }
  }

  override updated() {
    this._updateIndicator();
  }

  private _updateIndicator() {
    if (this.variant === 'pills' || !this._tabList) return;
    const activeBtn = this._tabList.querySelector('.tab.active') as HTMLElement | null;
    if (activeBtn) {
      this._indicatorLeft = activeBtn.offsetLeft;
      this._indicatorWidth = activeBtn.offsetWidth;
    }
  }

  private _select(tab: TabItem) {
    if (tab.disabled) return;
    this._active = tab.value;
    this.dispatchEvent(new CustomEvent('cg-tab-change', {
      detail: { value: tab.value, label: tab.label },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    const enabled = this.tabs.filter(t => !t.disabled);
    const idx = enabled.findIndex(t => t.value === this._active);
    let next = idx;

    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': next = (idx + 1) % enabled.length; break;
      case 'ArrowLeft': case 'ArrowUp': next = (idx - 1 + enabled.length) % enabled.length; break;
      case 'Home': next = 0; break;
      case 'End': next = enabled.length - 1; break;
      default: return;
    }

    e.preventDefault();
    this._select(enabled[next]!);

    // Focus the new active tab button
    requestAnimationFrame(() => {
      const btns = this._tabList.querySelectorAll('.tab:not(.disabled)');
      (btns[next] as HTMLElement)?.focus();
    });
  }

  override render() {
    return html`
      <div class="tab-list" role="tablist" @keydown=${this._handleKeydown}>
        ${this.tabs.map(tab => html`
          <button
            class="tab ${tab.value === this._active ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}"
            role="tab"
            tabindex=${tab.value === this._active ? '0' : '-1'}
            aria-selected=${tab.value === this._active}
            ?disabled=${tab.disabled}
            @click=${() => this._select(tab)}
          >
            <span>${tab.label}</span>
            ${tab.count !== undefined ? html`<span class="tab-count">${tab.count}</span>` : nothing}
          </button>
        `)}
        ${this.variant === 'underline' ? html`
          <div class="indicator" style="left: ${this._indicatorLeft}px; width: ${this._indicatorWidth}px;"></div>
        ` : nothing}
      </div>
      <div class="panel" role="tabpanel">
        <slot name=${this._active}></slot>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-tabs': CgTabs; }
}
