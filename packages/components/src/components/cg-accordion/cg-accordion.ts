import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Item definition for cg-accordion. */
export interface AccordionItem {
  value: string;
  trigger: string;
  content: string;
  icon?: string;
  disabled?: boolean;
}

/**
 * @element cg-accordion
 * Expandable content sections with smooth CSS grid height animation.
 *
 * @fires {CustomEvent<{open: string[], toggled: string}>} cg-accordion-change - When an item is toggled
 */
@customElement('cg-accordion')
export class CgAccordion extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`

    /* ── Default variant — minimal dividers, transparent ── */
    .item {
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-base-divider);
    }
    .item:last-child { border-bottom: none; }

    /* ── Card variant — separated elevated cards ── */
    :host([variant="card"]) .item {
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      margin-bottom: var(--cg-spacing-8);
      background: var(--cg-color-surface-cards-background);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      overflow: hidden;
    }
    :host([variant="card"]) .item:last-child { margin-bottom: 0; }

    /* ── Bordered variant — single grouped container ── */
    :host([variant="bordered"]) {
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      background: var(--cg-color-surface-cards-background);
      overflow: hidden;
    }
    :host([variant="bordered"]) .item {
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    :host([variant="bordered"]) .item:last-child {
      border-bottom: none;
    }

    /* ── Trigger ── */
    .trigger {
      width: 100%;
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-16);
      background: transparent;
      border: none;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      cursor: pointer;
      text-align: left;
      transition: background var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }

    .trigger:hover:not(:disabled) {
      background: var(--cg-overlay-dark-subtle);
    }

    .trigger:active:not(:disabled) .chevron {
      transform: scale(0.85);
    }

    .trigger:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring-offset), inset 0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
    }

    .trigger:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .trigger-text {
      flex: 1;
      min-width: 0;
    }

    /* ── Chevron — only active signal ── */
    .chevron {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      flex-shrink: 0;
      color: var(--cg-color-surface-container-outlined);
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out), color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .item.open .chevron {
      transform: rotate(180deg);
      color: var(--cg-color-surface-base-text);
    }
    /* ── Open trigger: subtle accent so the active section is scannable ──
       The chevron flip alone was the only signal; add a faint accent wash +
       a brand leading edge + brighter title text. */
    .item.open .trigger {
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-base-text);
      box-shadow: inset var(--cg-border-width-100) 0 0 0 var(--cg-color-action-primary-background-default);
    }

    /* ── Content — CSS grid smooth height ── */
    .content-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    .item.open .content-wrapper {
      grid-template-rows: 1fr;
    }

    .content {
      overflow: hidden;
    }

    .content-inner {
      padding: 0 var(--cg-spacing-16) var(--cg-spacing-16);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-relaxed);
      opacity: 0;
      transition: opacity var(--cg-transition-duration-default) var(--cg-transition-easing-default);
      transition-delay: 50ms;
    }
    .item.open .content-inner {
      opacity: 1;
    }

    /* ── Size variants ── */
    :host([size="sm"]) .trigger { font-size: var(--cg-font-size-xs); padding: var(--cg-spacing-12); }
    :host([size="sm"]) .content-inner { font-size: var(--cg-font-size-xs); padding: 0 var(--cg-spacing-12) var(--cg-spacing-12); }

    :host([size="lg"]) .trigger { font-size: var(--cg-font-size-base); padding: var(--cg-spacing-20); }
    :host([size="lg"]) .content-inner { font-size: var(--cg-font-size-base); padding: 0 var(--cg-spacing-20) var(--cg-spacing-20); }
  `];

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
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

  private _handleTriggerKeydown(e: KeyboardEvent) {
    const triggers = this.shadowRoot!.querySelectorAll('.trigger:not(:disabled)') as NodeListOf<HTMLElement>;
    const triggerArr = Array.from(triggers);
    const currentIdx = triggerArr.indexOf(e.currentTarget as HTMLElement);
    let nextIdx = currentIdx;

    switch (e.key) {
      case 'ArrowDown': nextIdx = (currentIdx + 1) % triggerArr.length; break;
      case 'ArrowUp': nextIdx = (currentIdx - 1 + triggerArr.length) % triggerArr.length; break;
      case 'Home': nextIdx = 0; break;
      case 'End': nextIdx = triggerArr.length - 1; break;
      default: return;
    }

    e.preventDefault();
    triggerArr[nextIdx]?.focus();
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
            id="trigger-${item.value}"
            aria-expanded=${isOpen}
            aria-controls="panel-${item.value}"
            ?disabled=${item.disabled}
            @click=${() => this._toggle(item.value)}
            @keydown=${this._handleTriggerKeydown}
          >
            <span class="trigger-text">${item.trigger}</span>
            <svg class="chevron" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </button>
          <div class="content-wrapper">
            <div class="content" id="panel-${item.value}" role="region" aria-labelledby="trigger-${item.value}">
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
