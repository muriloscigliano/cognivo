import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, entranceStagger } from '../../styles/index.js';

/** Item definition for cg-accordion, with trigger label, content, and optional icon. */
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
 * @example
 * ```html
 * <cg-accordion
 *   variant="card"
 *   multiple
 *   .items=${[
 *     {value:'faq1', trigger:'What is Cognivo?', content:'An AI component library.'},
 *     {value:'faq2', trigger:'Is it free?', content:'Yes, MIT licensed.'},
 *   ]}
 *   .defaultOpen=${['faq1']}
 * ></cg-accordion>
 * ```
 *
 * @fires {CustomEvent<{open: string[], toggled: string}>} cg-accordion-change - When an item is toggled
 *
 * @cssprop [--cg-focus-ring-color=#c8e650] - Active indicator and focus ring color
 * @cssprop [--cg-text-accent=#e5ff6b] - Hover/active trigger text color
 * @cssprop [--cg-color-surface-container-border=#27272a] - Item borders
 * @cssprop [--cg-border-radius-150=12px] - Card/bordered variant radius
 */
@customElement('cg-accordion')
export class CgAccordion extends LitElement {
  static override styles = [hostBlock, reducedMotion, entranceStagger, css`
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
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
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
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
      border-radius: var(--cg-border-radius-100, 8px);
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
      transition: transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }
    .item.open .chevron {
      transform: rotate(180deg);
      color: var(--cg-text-accent, #e5ff6b);
    }

    /* Content — CSS grid trick for smooth height animation */
    .content-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--cg-motion-duration-slow, 0.25s) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
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

    .item.open .content-inner {
      animation: staggerFadeIn 200ms ease-out both;
    }

    :host(:not([variant])) .content-inner,
    :host([variant="default"]) .content-inner {
      padding: 0 0 var(--cg-spacing-16, 16px);
    }
  
    .header { transition: background-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)); }
    .header:hover { background: rgba(255, 255, 255, 0.03); }

    /* Size variants */
    :host([size="sm"]) .trigger { font-size: 13px; padding: 8px 12px; }
    :host([size="sm"]) .content-inner { font-size: 13px; }

    :host([size="lg"]) .trigger { font-size: 16px; padding: 16px 20px; }
    :host([size="lg"]) .content-inner { font-size: 16px; }

    /* Rounded variants */
    :host([rounded="none"]) .item { border-radius: 0; }
    :host([rounded="sm"]) .item { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .item { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .item { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .item { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
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
