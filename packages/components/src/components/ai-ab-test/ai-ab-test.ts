/**
 * @element ai-ab-test
 * Side-by-side A/B comparison card with vote buttons and swap control.
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
 * @fires {CustomEvent<{winner: 'a'|'b'|'tie'}>} ai-ab-vote - User voted for a winner
 * @fires {CustomEvent} ai-ab-compare - User clicked the Compare button
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Accent color for selected vote and hover states
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-ab-test')
export class AiAbTest extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-enter) both;
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      color: var(--cg-color-surface-base-text);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-16);
      padding-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    .swap-btn {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), color var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      font-family: inherit;
    }
    .swap-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .swap-btn:hover { border-color: var(--cg-color-surface-base-text); color: var(--cg-color-surface-base-text); }
    .swap-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .variants {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-16);
    }

    .variant {
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-16);
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      min-height: var(--cg-spacing-80);
    }
    .variant.winner-a { border-color: var(--cg-color-surface-base-text); }
    .variant.winner-b { border-color: var(--cg-color-surface-base-text); }

    .variant-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-8);
    }
    .variant.winner-a .variant-label,
    .variant.winner-b .variant-label {
      color: var(--cg-color-surface-base-text);
    }

    .variant-content {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .actions {
      display: flex;
      gap: var(--cg-spacing-8);
      justify-content: center;
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    .vote-btn {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      font-family: inherit;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .vote-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .vote-btn:hover {
      border-color: var(--cg-color-surface-base-text);
      color: var(--cg-color-surface-base-text);
    }
    .vote-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .vote-btn.selected {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
      border-color: var(--cg-color-surface-base-text);
    }

    .compare-btn {
      background: var(--cg-color-action-primary-background-default);
      border: none;
      color: var(--cg-color-surface-container-background);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      font-family: inherit;
      transition: filter var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .compare-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .compare-btn:hover { filter: brightness(0.9); }
    .compare-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

  `];

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
      bubbles: true,
      composed: true,
    }));
  }

  private _swap() {
    this._swapped = !this._swapped;
    this._winner = null;
  }

  private _compare() {
    this.dispatchEvent(new CustomEvent('ai-ab-compare', {
      bubbles: true,
      composed: true,
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
          <button class="swap-btn" @click=${this._swap} aria-label="Swap variants" tabindex="0">
            Swap
          </button>
        </div>

        <div class="variants">
          <div class="variant ${leftWin ? 'winner-a' : ''}" role="region" aria-label="Variant ${leftLabel}">
            <div class="variant-label">${leftLabel}</div>
            <div class="variant-content">${leftContent}</div>
          </div>
          <div class="variant ${rightWin ? 'winner-b' : ''}" role="region" aria-label="Variant ${rightLabel}">
            <div class="variant-label">${rightLabel}</div>
            <div class="variant-content">${rightContent}</div>
          </div>
        </div>

        <div class="actions" role="group" aria-label="Vote for best variant">
          <button
            class="vote-btn ${this._winner === 'a' ? 'selected' : ''}"
            @click=${() => this._vote('a')}
            aria-pressed=${this._winner === 'a' ? 'true' : 'false'}
            tabindex="0"
          >${this.labelA} Wins</button>
          <button
            class="vote-btn ${this._winner === 'tie' ? 'selected' : ''}"
            @click=${() => this._vote('tie')}
            aria-pressed=${this._winner === 'tie' ? 'true' : 'false'}
            tabindex="0"
          >Tie</button>
          <button
            class="vote-btn ${this._winner === 'b' ? 'selected' : ''}"
            @click=${() => this._vote('b')}
            aria-pressed=${this._winner === 'b' ? 'true' : 'false'}
            tabindex="0"
          >${this.labelB} Wins</button>
          <button class="compare-btn" @click=${this._compare} tabindex="0">
            Compare
          </button>
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
