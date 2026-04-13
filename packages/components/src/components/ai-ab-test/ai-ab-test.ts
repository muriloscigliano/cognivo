/**
 * @element ai-ab-test
 * Side-by-side A/B comparison card with cg-button vote controls and swap.
 *
 * @example
 * ```html
 * <ai-ab-test
 *   variantA="Response using GPT-4"
 *   variantB="Response using Claude"
 *   labelA="GPT-4" labelB="Claude"
 *   title="Model Comparison"
 * ></ai-ab-test>
 * ```
 *
 * @fires {CustomEvent<{winner: 'a'|'b'|'tie'}>} ai-ab-vote - User voted
 * @fires {CustomEvent} ai-ab-compare - Compare clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

@customElement('ai-ab-test')
export class AiAbTest extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      padding: var(--cg-spacing-20);
      color: var(--cg-color-surface-base-text);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-16);
      padding-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
    }

    .variants {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-16);
    }

    .variant {
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-16);
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      min-height: var(--cg-spacing-80);
    }
    .variant.winner {
      border-color: var(--cg-color-action-primary-background-default);
      background: var(--cg-overlay-accent-subtle);
    }

    .variant cg-badge { margin-bottom: var(--cg-spacing-8); }

    .variant-content {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-relaxed);
      white-space: pre-wrap;
      word-break: break-word;
    }

    .actions {
      display: flex;
      gap: var(--cg-spacing-8);
      justify-content: center;
      align-items: center;
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-200); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: String }) variantA = '';
  @property({ type: String }) variantB = '';
  @property({ type: String }) labelA = 'A';
  @property({ type: String }) labelB = 'B';
  @property({ type: String }) override title = 'A/B Comparison';

  @state() private _winner: 'a' | 'b' | 'tie' | null = null;
  @state() private _swapped = false;

  private _vote(winner: 'a' | 'b' | 'tie') {
    this._winner = winner;
    this.dispatchEvent(new CustomEvent('ai-ab-vote', {
      detail: { winner },
      bubbles: true, composed: true,
    }));
  }

  private _swap() {
    this._swapped = !this._swapped;
    this._winner = null;
  }

  private _compare() {
    this.dispatchEvent(new CustomEvent('ai-ab-compare', {
      bubbles: true, composed: true,
    }));
  }

  override render() {
    const leftContent = this._swapped ? this.variantB : this.variantA;
    const rightContent = this._swapped ? this.variantA : this.variantB;
    const leftLabel = this._swapped ? this.labelB : this.labelA;
    const rightLabel = this._swapped ? this.labelA : this.labelB;

    const leftWin = (!this._swapped && this._winner === 'a') || (this._swapped && this._winner === 'b');
    const rightWin = (!this._swapped && this._winner === 'b') || (this._swapped && this._winner === 'a');

    return html`
      <div class="container" role="group" aria-label="${this.title}">
        <div class="header">
          <span class="title">${this.title}</span>
          <cg-button variant="tertiary" size="sm" @click=${this._swap} label="Swap variants">
            <cg-icon slot="prefix" name="refresh" size="xs"></cg-icon> Swap
          </cg-button>
        </div>

        <div class="variants">
          <div class="variant ${leftWin ? 'winner' : ''}" role="region" aria-label="Variant ${leftLabel}">
            <cg-badge variant=${leftWin ? 'accent' : 'neutral'} label=${leftLabel} size="sm" rounded="full"></cg-badge>
            <div class="variant-content">${leftContent}</div>
          </div>
          <div class="variant ${rightWin ? 'winner' : ''}" role="region" aria-label="Variant ${rightLabel}">
            <cg-badge variant=${rightWin ? 'accent' : 'neutral'} label=${rightLabel} size="sm" rounded="full"></cg-badge>
            <div class="variant-content">${rightContent}</div>
          </div>
        </div>

        <div class="actions" role="group" aria-label="Vote for best variant">
          <cg-button
            variant=${this._winner === 'a' ? 'primary' : 'secondary'}
            size="sm"
            @click=${() => this._vote('a')}
            aria-pressed=${this._winner === 'a' ? 'true' : 'false'}
          >${this.labelA} Wins</cg-button>
          <cg-button
            variant=${this._winner === 'tie' ? 'primary' : 'secondary'}
            size="sm"
            @click=${() => this._vote('tie')}
            aria-pressed=${this._winner === 'tie' ? 'true' : 'false'}
          >Tie</cg-button>
          <cg-button
            variant=${this._winner === 'b' ? 'primary' : 'secondary'}
            size="sm"
            @click=${() => this._vote('b')}
            aria-pressed=${this._winner === 'b' ? 'true' : 'false'}
          >${this.labelB} Wins</cg-button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-ab-test': AiAbTest;
  }
}
