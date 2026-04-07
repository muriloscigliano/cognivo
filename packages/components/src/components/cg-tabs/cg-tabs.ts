import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Tab definition for cg-tabs. */
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
 * @fires {CustomEvent<{value: string, label: string}>} cg-tab-change - When a tab is selected
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
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-tabbar-border);
    }

    :host(:not([variant="pills"])) .indicator {
      position: absolute;
      bottom: calc(-1 * var(--cg-spacing-1));
      height: var(--cg-border-width-100);
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-full);
      transition: left var(--cg-motion-duration-normal) var(--cg-motion-easing-default), width var(--cg-motion-duration-normal) var(--cg-motion-easing-default);
    }

    .tab {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-outlined);
      background: none;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      transition: color var(--cg-motion-duration-normal) var(--cg-motion-easing-default), background var(--cg-motion-duration-normal) var(--cg-motion-easing-default), transform var(--cg-motion-duration-fast) var(--cg-motion-easing-bounce);
      font-family: inherit;
      position: relative;
    }

    .tab:hover:not(.disabled) {
      color: var(--cg-color-surface-base-text);
    }
    .tab.active {
      color: var(--cg-color-action-primary-background-default);
      font-weight: var(--cg-font-weight-semibold);
    }
    .tab.disabled { opacity: 0.5; cursor: not-allowed; }
    .tab:active:not(.disabled) { transform: scale(var(--cg-interaction-press-scale)); }

    .tab:focus-visible {
      outline: none;
      border-radius: var(--cg-border-radius-50);
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring-offset), 0 0 0 4px var(--cg-color-focus-ring);
    }

    /* Count badge */
    .tab-count {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-surface-container-outlined);
      padding: var(--cg-spacing-1) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      line-height: var(--cg-line-height-snug);
    }
    .tab.active .tab-count {
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-action-primary-background-default);
    }

    /* Pills variant */
    :host([variant="pills"]) .tab-list {
      gap: var(--cg-spacing-4);
      background: var(--cg-color-surface-tabbar-background);
      padding: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-150);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-tabbar-border);
    }
    :host([variant="pills"]) .tab {
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border: var(--cg-border-width-50) solid transparent;
    }
    :host([variant="pills"]) .tab.active {
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-semibold);
    }
    :host([variant="pills"]) .tab:hover:not(.active):not(.disabled) {
      background: var(--cg-color-surface-tabbar-hover-background);
    }

    /* Sliding pill indicator */
    :host([variant="pills"]) .indicator {
      position: absolute;
      top: var(--cg-spacing-4);
      bottom: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-surface-tabbar-selected-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      transition: left var(--cg-motion-duration-normal) var(--cg-motion-easing-bounce), width var(--cg-motion-duration-normal) var(--cg-motion-easing-bounce);
      z-index: 0;
    }
    :host([variant="pills"]) .tab { z-index: 1; }

    /* Full rounded pills */
    :host([variant="pills"][rounded="full"]) .tab-list {
      border-radius: var(--cg-border-radius-full);
    }
    :host([variant="pills"][rounded="full"]) .tab {
      border-radius: var(--cg-border-radius-full);
    }
    :host([variant="pills"][rounded="full"]) .indicator {
      border-radius: var(--cg-border-radius-full);
    }

    /* Panel */
    .panel {
      padding: var(--cg-spacing-16) 0;
    }

    /* Size variants */
    :host([size="sm"]) .tab { font-size: var(--cg-font-size-xs); padding: var(--cg-spacing-6) var(--cg-spacing-12); }
    :host([size="lg"]) .tab { font-size: var(--cg-font-size-base); padding: var(--cg-spacing-12) var(--cg-spacing-20); }
  `];

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Array }) tabs: TabItem[] = [];
  @property() value = '';
  @property({ reflect: true }) variant: 'underline' | 'pills' = 'underline';
  @property({ reflect: true }) rounded: 'default' | 'full' = 'default';

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
    if (!this._tabList) return;
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
            id="tab-${tab.value}"
            tabindex=${tab.value === this._active ? '0' : '-1'}
            aria-selected=${tab.value === this._active}
            aria-controls="panel-${tab.value}"
            ?disabled=${tab.disabled}
            @click=${() => this._select(tab)}
          >
            <span>${tab.label}</span>
            ${tab.count !== undefined ? html`<span class="tab-count">${tab.count}</span>` : nothing}
          </button>
        `)}
        <div class="indicator" style="left: ${this._indicatorLeft}px; width: ${this._indicatorWidth}px;"></div>
      </div>
      <div class="panel" role="tabpanel" id="panel-${this._active}" aria-labelledby="tab-${this._active}">
        <slot name=${this._active}></slot>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-tabs': CgTabs; }
}
