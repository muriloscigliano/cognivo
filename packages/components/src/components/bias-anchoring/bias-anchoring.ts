import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element bias-anchoring
 * Reference-price anchoring wrapper. Displays a struck-through "anchor" value
 * next to a prominently emphasized "current" value, with an optional savings
 * label. Used by retail (Shopify, Amazon) to frame the current price as a
 * discount from a perceived reference.
 *
 * @example
 * ```html
 * <bias-anchoring anchor="$199" current="$99" label="Save 50%"></bias-anchoring>
 * ```
 *
 * @cssprop --cg-component-bias-anchoring-radius
 * @cssprop --cg-component-bias-anchoring-padding
 * @cssprop --cg-component-bias-anchoring-gap
 */
@customElement('bias-anchoring')
export class BiasAnchoring extends LitElement {
  /** Canonical bias ID in @cognivo/design-advisor. */
  static biasId = 'anchoring-bias' as const;

  static override styles = [hostBlock, reducedMotion, css`
    :host { display: inline-block; }

    .wrap {
      display: inline-flex;
      align-items: baseline;
      gap: var(--cg-component-bias-anchoring-gap);
      padding: var(--cg-component-bias-anchoring-padding);
      border-radius: var(--cg-component-bias-anchoring-radius);
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    :host([orientation="vertical"]) .wrap {
      flex-direction: column;
      align-items: flex-start;
    }

    .anchor {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-text);
      text-decoration: line-through;
      opacity: 0.7;
    }

    .current {
      font-size: var(--cg-font-size-xl);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      letter-spacing: var(--cg-letter-spacing-tight);
      line-height: var(--cg-line-height-tight);
    }

    .label {
      display: inline-flex;
      align-items: center;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-success-border-default);
    }

    /* Variants */
    :host([variant="subtle"]) .current { font-size: var(--cg-font-size-lg); }
    :host([variant="subtle"]) .anchor { font-size: var(--cg-font-size-xs); }

    :host([variant="emphasized"]) .wrap {
      background: var(--cg-color-status-success-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-success-border-default);
    }
    :host([variant="emphasized"]) .current {
      color: var(--cg-color-status-success-text-default);
      font-size: var(--cg-font-size-2xl);
    }
  `];

  @property() anchor = '';
  @property() current = '';
  @property() label = '';
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ reflect: true }) variant: 'default' | 'subtle' | 'emphasized' = 'default';

  private get _ariaLabel(): string {
    const base = `Original ${this.anchor}, now ${this.current}`;
    return this.label ? `${base}. ${this.label}` : base;
  }

  override render() {
    return html`
      <div class="wrap" role="group" aria-label=${this._ariaLabel}>
        ${this.anchor ? html`<span class="anchor" aria-hidden="true">${this.anchor}</span>` : nothing}
        ${this.current ? html`<span class="current" aria-hidden="true">${this.current}</span>` : nothing}
        ${this.label ? html`<span class="label" aria-hidden="true">${this.label}</span>` : nothing}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bias-anchoring': BiasAnchoring;
  }
}
