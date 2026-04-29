import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../styles/index.js';

/**
 * @element cg-kbd
 * Keyboard shortcut display chip. Use for showing keyboard combinations like ⌘K.
 *
 * @example
 * ```html
 * <cg-kbd keys="⌘K"></cg-kbd>
 * <cg-kbd keys="Shift,⌘,P"></cg-kbd>
 * <cg-kbd>Esc</cg-kbd>
 * ```
 *
 * @slot - Key content (alternative to keys property)
 */
@customElement('cg-kbd')
export class CgKbd extends LitElement {
  static override styles = [hostBase, css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
    }

    kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--cg-color-action-tertiary-background-hover);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-bottom-width: var(--cg-border-width-100);
      border-radius: var(--cg-component-kbd-radius);
      color: var(--cg-color-surface-base-text);
      font-family: var(--cg-font-family-mono);
      font-weight: var(--cg-font-weight-medium);
      line-height: var(--cg-line-height-tight);
      box-shadow:
        inset 0 var(--cg-border-width-50) 0 var(--cg-overlay-accent-subtle),
        0 var(--cg-border-width-50) 0 var(--cg-color-surface-cards-border);
    }

    /* Sizes — driven entirely by Tier-3 tokens for system-wide consistency. */
    :host([size="sm"]) kbd {
      min-width: var(--cg-component-kbd-min-width-sm);
      padding: var(--cg-component-kbd-padding-y-sm) var(--cg-component-kbd-padding-x-sm);
      font-size: var(--cg-component-kbd-font-size-sm);
    }
    :host([size="md"]) kbd {
      min-width: var(--cg-component-kbd-min-width-md);
      padding: var(--cg-component-kbd-padding-y-md) var(--cg-component-kbd-padding-x-md);
      font-size: var(--cg-component-kbd-font-size-md);
    }
    :host([size="lg"]) kbd {
      min-width: var(--cg-component-kbd-min-width-lg);
      padding: var(--cg-component-kbd-padding-y-lg) var(--cg-component-kbd-padding-x-lg);
      font-size: var(--cg-component-kbd-font-size-lg);
    }

    :host([variant="outline"]) kbd {
      background: transparent;
    }

    .plus {
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
    }
  `];

  @property() keys: string = '';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) variant: 'default' | 'outline' = 'default';

  override render() {
    if (this.keys) {
      const keyArr = this.keys.split(',').map(k => k.trim()).filter(Boolean);
      return html`
        ${keyArr.map((key, i) => html`
          ${i > 0 ? html`<span class="plus">+</span>` : nothing}
          <kbd>${key}</kbd>
        `)}
      `;
    }
    return html`<kbd><slot></slot></kbd>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-kbd': CgKbd;
  }
}
