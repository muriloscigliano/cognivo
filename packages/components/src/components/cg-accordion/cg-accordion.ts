import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface AccordionItem {
  value: string;
  trigger: string;
  content: string;
  icon?: string;
  disabled?: boolean;
}

/**
 * <cg-accordion> — Expandable content sections.
 *
 * Features:
 * - Single or multiple open mode
 * - Smooth height animation (no max-height hack — uses CSS grid trick)
 * - 3 visual variants: default, card, bordered
 * - Disabled items
 * - Default open items
 * - Keyboard accessible
 * - Active indicator on the left
 */
@customElement('cg-accordion')
export class CgAccordion extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .item {
      border-bottom: 1px solid var(--cg-color-surface-container-border, #27272a);
    }
    .item:last-child { border-bottom: none; }

    /* Card variant */
    :host([variant="card"]) .item {
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      margin-bottom: var(--cg-spacing-8, 8px);
      overflow: hidden;
    }
    :host([variant="card"]) .item:last-child { margin-bottom: 0; }

    /* Bordered variant */
    :host([variant="bordered"]) .item {
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-bottom: none;
      overflow: hidden;
    }
    :host([variant="bordered"]) .item:first-child {
      border-radius: var(--cg-border-radius-150, 12px) var(--cg-border-radius-150, 12px) 0 0;
    }
    :host([variant="bordered"]) .item:last-child {
      border-bottom: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 0 0 var(--cg-border-radius-150, 12px) var(--cg-border-radius-150, 12px);
    }

    /* Trigger button */
    .trigger {
      width: 100%;
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      padding: var(--cg-spacing-16, 16px);
      background: none;
      border: none;
      font: inherit;
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-medium, 500);
      color: var(--cg-color-surface-base-text, #fafafa);
      cursor: pointer;
      text-align: left;
      transition: color var(--cg-motion-duration-normal, 150ms) ease;
    }

    :host(:not([variant])) .trigger,
    :host([variant="default"]) .trigger {
      padding: var(--cg-spacing-16, 16px) 0;
    }

    .trigger:hover:not(:disabled) {
      color: var(--cg-text-accent, #e5ff6b);
    }

    .trigger:focus-visible {
      outline: 2px solid var(--cg-focus-ring-color, #c8e650);
      outline-offset: -2px;
      border-radius: 4px;
    }

    .trigger:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Active left indicator */
    .indicator {
      width: 3px;
      height: 16px;
      border-radius: 2px;
      background: transparent;
      flex-shrink: 0;
      transition: background var(--cg-motion-duration-normal, 150ms) ease;
    }
    .item.open .indicator {
      background: var(--cg-focus-ring-color, #c8e650);
    }

    .trigger-text {
      flex: 1;
      min-width: 0;
    }

    /* Chevron */
    .chevron {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--cg-gray-400, #a1a1aa);
      transition: transform var(--cg-motion-duration-slow, 250ms) cubic-bezier(0.4, 0, 0.2, 1);
    }
    .item.open .chevron {
      transform: rotate(180deg);
      color: var(--cg-text-accent, #e5ff6b);
    }

    /* Content — CSS grid trick for smooth height animation */
    .content-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .item.open .content-wrapper {
      grid-template-rows: 1fr;
    }

    .content {
      overflow: hidden;
    }

    .content-inner {
      padding: 0 var(--cg-spacing-16, 16px) var(--cg-spacing-16, 16px);
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-gray-600, #52525b);
      line-height: 1.65;
    }

    :host(:not([variant])) .content-inner,
    :host([variant="default"]) .content-inner {
      padding: 0 0 var(--cg-spacing-16, 16px);
    }

    @media (prefers-reduced-motion: reduce) {
      .content-wrapper, .chevron, .indicator { transition: none; }
    }
  `;

  @property({ type: Array }) items: AccordionItem[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ reflect: true }) variant: 'default' | 'card' | 'bordered' = 'default';
  @property({ type: Array }) defaultOpen: string[] = [];

  @state() private _openItems = new Set<string>();

  override firstUpdated() {
    if (this.defaultOpen.length > 0) {
      this._openItems = new Set(this.multiple ? this.defaultOpen : [this.defaultOpen[0]!]);
    }
  }

  private _toggle(value: string) {
    const next = new Set(this._openItems);
    if (next.has(value)) {
      next.delete(value);
    } else {
      if (!this.multiple) next.clear();
      next.add(value);
    }
    this._openItems = next;
    this.dispatchEvent(new CustomEvent('cg-accordion-change', {
      detail: { open: [...next], toggled: value },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`${this.items.map(item => {
      const isOpen = this._openItems.has(item.value);
      return html`
        <div class="item ${isOpen ? 'open' : ''}">
          <button
            class="trigger"
            aria-expanded=${isOpen}
            aria-controls="panel-${item.value}"
            ?disabled=${item.disabled}
            @click=${() => this._toggle(item.value)}
          >
            <span class="indicator"></span>
            <span class="trigger-text">${item.trigger}</span>
            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </button>
          <div class="content-wrapper">
            <div class="content" id="panel-${item.value}" role="region">
              <div class="content-inner">${item.content}</div>
            </div>
          </div>
        </div>
      `;
    })}`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-accordion': CgAccordion; }
}
