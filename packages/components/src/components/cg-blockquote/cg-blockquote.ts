import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-blockquote
 * An editorial quotation primitive: a semantic `<blockquote>` anchored by an
 * oversized decorative quotation mark (magazine/pull-quote style), with an
 * optional attribution footer. No left rule — the glyph carries the emphasis.
 *
 * @example
 * ```html
 * <cg-blockquote variant="accent">
 *   Design tokens are the contract between design and code.
 *   <span slot="footer">Cognivo docs</span>
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
      position: relative;
      margin: 0;
      padding: var(--cg-spacing-8) 0 var(--cg-spacing-8) var(--cg-spacing-40);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-lg);
      line-height: var(--cg-line-height-relaxed);
      font-weight: var(--cg-font-weight-medium);
    }

    /* Oversized decorative opening quote — the editorial anchor, not a border. */
    blockquote::before {
      content: '\\201C';
      position: absolute;
      top: calc(-1 * var(--cg-spacing-8));
      left: calc(-1 * var(--cg-spacing-4));
      font-size: var(--cg-font-size-5xl);
      line-height: 1;
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-divider);
      pointer-events: none;
      user-select: none;
    }

    .content { display: block; }

    /* Accent: the glyph adopts the brand accent, quote gains slight scale. */
    :host([variant="accent"]) blockquote::before {
      color: var(--cg-color-action-primary-background-default);
    }
    :host([variant="accent"]) blockquote {
      font-size: var(--cg-font-size-xl);
    }

    /* Muted: soft filled card treatment — quote sits inside a panel. */
    :host([variant="muted"]) blockquote {
      padding: var(--cg-spacing-20) var(--cg-spacing-24) var(--cg-spacing-20) var(--cg-spacing-48);
      background: var(--cg-color-surface-inset-background);
      color: var(--cg-color-surface-inset-text);
      border-radius: var(--cg-border-radius-200);
      font-size: var(--cg-font-size-base);
    }
    :host([variant="muted"]) blockquote::before {
      top: var(--cg-spacing-4);
      left: var(--cg-spacing-16);
      color: var(--cg-color-surface-base-divider);
    }

    footer {
      display: block;
      margin-top: var(--cg-spacing-12);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    /* Em-dash lead-in for attribution, so authors slot just the name. */
    footer::before {
      content: '\\2014\\00A0';
      color: var(--cg-color-surface-base-divider);
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
        <span class="content"><slot></slot></span>
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
