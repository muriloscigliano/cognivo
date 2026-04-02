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
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      padding: 20px;
      color: var(--cg-color-surface-base-text, #fafafa);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
    }

    .swap-btn {
      background: transparent;
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      color: var(--cg-gray-400, #a1a1aa);
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .swap-btn:hover { border-color: var(--cg-brand-ai-accent, #dfff61); color: var(--cg-brand-ai-accent, #dfff61); }
    .swap-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .variants {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }

    .variant {
      background: var(--cg-color-surface-base-background, #09090b);
      border: 2px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 8px;
      padding: 16px;
      transition: border-color 200ms ease;
      min-height: 80px;
    }
    .variant.winner-a { border-color: var(--cg-brand-ai-accent, #dfff61); }
    .variant.winner-b { border-color: var(--cg-brand-ai-accent, #dfff61); }

    .variant-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cg-gray-500, #71717a);
      margin-bottom: 8px;
    }
    .variant.winner-a .variant-label,
    .variant.winner-b .variant-label {
      color: var(--cg-brand-ai-accent, #dfff61);
    }

    .variant-content {
      font-size: 13px;
      color: var(--cg-gray-300, #d4d4d8);
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .actions {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .vote-btn {
      background: transparent;
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      color: var(--cg-gray-400, #a1a1aa);
      font-size: 12px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .vote-btn:hover {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-brand-ai-accent, #dfff61);
    }
    .vote-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    .vote-btn.selected {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-color-surface-container-background, #18181b);
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }

    .compare-btn {
      background: var(--cg-brand-ai-accent, #dfff61);
      border: none;
      color: var(--cg-color-surface-container-background, #18181b);
      font-size: 12px;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .compare-btn:hover { filter: brightness(0.9); }
    .compare-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
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
