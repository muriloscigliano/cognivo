import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element bias-reciprocity
 * Value-first framing around a CTA. Presents a "gift" (free shipping, bonus,
 * trial) as an inbound favor, triggering reciprocity. Three prominence levels.
 *
 * @example
 * ```html
 * <bias-reciprocity gift="Free shipping" prominence="standard">
 *   <cg-button>Buy now</cg-button>
 * </bias-reciprocity>
 * ```
 *
 * @cssprop --cg-component-bias-reciprocity-radius
 * @cssprop --cg-component-bias-reciprocity-padding
 */
@customElement('bias-reciprocity')
export class BiasReciprocity extends LitElement {
  static biasId = 'reciprocity' as const;

  static override styles = [hostBlock, reducedMotion, css`
    .wrap {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-12);
      padding: var(--cg-component-bias-reciprocity-padding);
      border-radius: var(--cg-component-bias-reciprocity-radius);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }

    .gift {
      display: inline-flex;
      align-items: center;
      align-self: flex-start;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      background: var(--cg-color-accent-background);
      color: var(--cg-color-accent-text);
      border: var(--cg-border-width-50) solid var(--cg-color-accent-border);
    }

    .icon { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); flex-shrink: 0; }

    :host([prominence="subtle"]) .wrap {
      background: transparent;
      border-color: transparent;
      padding: var(--cg-spacing-4);
    }
    :host([prominence="subtle"]) .gift {
      background: transparent;
      border-color: var(--cg-color-accent-border);
    }

    :host([prominence="hero"]) .wrap {
      background: var(--cg-color-accent-background);
      border-color: var(--cg-color-accent-border);
      padding: var(--cg-spacing-20);
    }
    :host([prominence="hero"]) .gift {
      font-size: var(--cg-font-size-base);
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
    }
  `];

  @property() gift = '';
  @property() icon = '';
  @property({ reflect: true }) prominence: 'subtle' | 'standard' | 'hero' = 'standard';

  override render() {
    const giftIcon = svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H8a2 2 0 01-2-2 2 2 0 012-2c3 0 4 4 4 4z M12 7h4a2 2 0 002-2 2 2 0 00-2-2c-3 0-4 4-4 4z"></path></svg>`;

    return html`
      <div class="wrap" role="group" aria-label=${`You are getting: ${this.gift}`}>
        ${this.gift ? html`<span class="gift">${giftIcon}<span>You're getting: ${this.gift}</span></span>` : ''}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bias-reciprocity': BiasReciprocity;
  }
}
