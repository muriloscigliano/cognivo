import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Option for cg-listbox. */
export interface ListboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

/**
 * <cg-listbox> — Selectable option list with single or multi-select, keyboard nav, and type-ahead.
 *
 * @fires {CustomEvent<{value: string | string[]}>} cg-change - When selection changes
 */
@customElement('cg-listbox')
export class CgListbox extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      width: 100%;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      background: var(--cg-color-surface-cards-background);
      overflow: hidden;
      box-sizing: border-box;
    }

    .listbox {
      padding: var(--cg-spacing-6);
      overflow-y: auto;
      max-height: 320px;
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-150);
      cursor: pointer;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      transition: background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      border: var(--cg-border-width-50) solid transparent;
      min-height: 44px;
    }

    .option.highlighted {
      background: var(--cg-overlay-dark-subtle);
      border-color: var(--cg-color-surface-cards-border);
    }

    .option.selected {
      color: var(--cg-color-action-primary-background-default);
      font-weight: var(--cg-font-weight-semibold);
    }

    .option.disabled {
      opacity: 0.45;
      pointer-events: none;
      cursor: not-allowed;
    }

    .option:active:not(.disabled) {
      background: var(--cg-overlay-dark-light);
    }

    /* Checkmark tick */
    .check {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      flex-shrink: 0;
      color: var(--cg-color-action-primary-background-default);
      opacity: 0;
      transition: opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .option.selected .check {
      opacity: 1;
    }

    /* Right-aligned by default */
    :host(:not([checkPosition="left"])) .check {
      margin-left: auto;
    }

    /* Left position */
    :host([checkPosition="left"]) .check {
      order: -1;
      margin-left: 0;
    }

    .option-body {
      flex: 1;
      min-width: 0;
    }
    .option-label {
      line-height: var(--cg-line-height-snug);
    }
    .option-desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-snug);
      margin-top: var(--cg-spacing-2);
    }

    /* Group header */
    .group-header {
      padding: var(--cg-spacing-12) var(--cg-spacing-12) var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      pointer-events: none;
    }
    .group-header:not(:first-child) {
      margin-top: var(--cg-spacing-4);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      padding-top: var(--cg-spacing-12);
    }

    /* Empty */
    .empty {
      padding: var(--cg-spacing-24);
      text-align: center;
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
    }
  `];

  @property({ type: Array }) options: ListboxOption[] = [];
  @property() value: string | string[] = '';
  @property({ type: Boolean, reflect: true }) multiple = false;
  @property({ reflect: true }) checkPosition: 'left' | 'right' = 'right';
  @property() label = '';
  @property() emptyText = 'No options';

  @state() private _highlightedIndex = -1;
  private _typeBuffer = '';
  private _typeTimer = 0;

  private _getSelected(): Set<string> {
    if (Array.isArray(this.value)) return new Set(this.value);
    return this.value ? new Set([this.value]) : new Set();
  }

  private _enabledOptions(): ListboxOption[] {
    return this.options.filter(o => !o.disabled);
  }

  private _select(opt: ListboxOption) {
    if (opt.disabled) return;
    const selected = this._getSelected();

    if (this.multiple) {
      if (selected.has(opt.value)) {
        selected.delete(opt.value);
      } else {
        selected.add(opt.value);
      }
      this.value = [...selected];
    } else {
      this.value = opt.value;
    }

    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    const enabled = this._enabledOptions();
    if (enabled.length === 0) return;

    const allOptions = this.options;
    let currentEnabledIdx = -1;
    if (this._highlightedIndex >= 0) {
      const highlightedOpt = allOptions[this._highlightedIndex];
      if (highlightedOpt) currentEnabledIdx = enabled.indexOf(highlightedOpt);
    }

    let nextEnabledIdx = currentEnabledIdx;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextEnabledIdx = Math.min(currentEnabledIdx + 1, enabled.length - 1);
        if (currentEnabledIdx === -1) nextEnabledIdx = 0;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextEnabledIdx = Math.max(currentEnabledIdx - 1, 0);
        break;
      case 'Home':
        e.preventDefault();
        nextEnabledIdx = 0;
        break;
      case 'End':
        e.preventDefault();
        nextEnabledIdx = enabled.length - 1;
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        if (this._highlightedIndex >= 0 && allOptions[this._highlightedIndex]) {
          this._select(allOptions[this._highlightedIndex]!);
        }
        return;
      default:
        // Type-ahead
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          this._typeBuffer += e.key.toLowerCase();
          clearTimeout(this._typeTimer);
          this._typeTimer = window.setTimeout(() => { this._typeBuffer = ''; }, 500);
          const match = enabled.findIndex(o => o.label.toLowerCase().startsWith(this._typeBuffer));
          if (match >= 0) nextEnabledIdx = match;
        }
        return;
    }

    if (nextEnabledIdx >= 0 && nextEnabledIdx < enabled.length) {
      const nextOpt = enabled[nextEnabledIdx]!;
      this._highlightedIndex = allOptions.indexOf(nextOpt);
      this._scrollToHighlighted();
    }
  }

  private _scrollToHighlighted() {
    requestAnimationFrame(() => {
      const el = this.shadowRoot?.querySelector('.option.highlighted') as HTMLElement | null;
      el?.scrollIntoView({ block: 'nearest' });
    });
  }

  override render() {
    if (this.options.length === 0) {
      return html`<div class="empty">${this.emptyText}</div>`;
    }

    const selected = this._getSelected();
    let lastGroup = '';

    return html`
      <div
        class="listbox"
        role="listbox"
        aria-label=${this.label || nothing}
        aria-multiselectable=${this.multiple ? 'true' : nothing}
        tabindex="0"
        @keydown=${this._handleKeydown}
      >
        ${this.options.map((opt, i) => {
          const isSelected = selected.has(opt.value);
          const isHighlighted = i === this._highlightedIndex;
          const groupHeader = opt.group && opt.group !== lastGroup
            ? html`<div class="group-header" role="presentation">${(lastGroup = opt.group, opt.group)}</div>`
            : (opt.group && (lastGroup = opt.group), nothing);

          return html`
            ${groupHeader}
            <div
              class="option ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''} ${opt.disabled ? 'disabled' : ''}"
              role="option"
              id="opt-${opt.value}"
              aria-selected=${isSelected}
              aria-disabled=${opt.disabled ? 'true' : nothing}
              @click=${() => this._select(opt)}
              @mouseenter=${() => { this._highlightedIndex = i; }}
            >
              <span class="option-body">
                <span class="option-label">${opt.label}</span>
                ${opt.description ? html`<span class="option-desc">${opt.description}</span>` : nothing}
              </span>
              <span class="check" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              </span>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-listbox': CgListbox; }
}
