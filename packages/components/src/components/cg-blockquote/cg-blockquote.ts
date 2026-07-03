import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-blockquote
 * A styled quotation primitive rendering a semantic `<blockquote>` with an
 * accent border and optional attribution footer.
 *
 * @example
 * ```html
 * <cg-blockquote variant="accent">
 *   Design tokens are the contract between design and code.
 *   <span slot="footer">— Cognivo docs</span>
 * </cg-blockquote>
 * ```
 *
 * @slot - Quote content.
 * @slot footer - Attribution / source.
 */
@customElement('cg-blockquote')
export class CgBlockquote extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; font-family: var(--cg-font-family-primary); }

    blockquote {
      margin: 0;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-left: var(--cg-border-width-300) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      color: inherit;
      font-style: italic;
    }

    :host([variant="accent"]) blockquote {
      border-left-color: var(--cg-color-action-primary-border-default);
    }

    :host([variant="muted"]) blockquote {
      background: var(--cg-color-surface-inset-background);
      color: var(--cg-color-surface-inset-text);
      border-left-color: var(--cg-color-surface-cards-border);
    }

    footer {
      margin-top: var(--cg-spacing-8);
      font-style: normal;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-inset-text);
    }

    /* Hide footer wrapper when nothing is slotted */
    footer.empty { display: none; }
  `];

  @property() cite = '';
  @property({ reflect: true }) variant: 'default' | 'accent' | 'muted' = 'default';

  private _hasFooter = false;

  private _onFooterSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    const has = slot.assignedNodes({ flatten: true }).length > 0;
    if (has !== this._hasFooter) {
      this._hasFooter = has;
      this.requestUpdate();
    }
  }

  override render() {
    return html`
      <blockquote cite=${ifDefined(this.cite || undefined)}>
        <slot></slot>
        <footer class=${this._hasFooter ? '' : 'empty'}>
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </footer>
      </blockquote>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-blockquote': CgBlockquote;
  }
}
