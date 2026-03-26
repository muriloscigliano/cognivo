/**
 * <ai-ab-test> — Side-by-side A/B comparison with vote buttons
 *
 * Props: variantA, variantB, labelA, labelB, title
 * Events: ai-ab-vote (detail: {winner}), ai-ab-compare
 * Features: Two columns, vote buttons, swap, visual highlight on vote
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

@customElement('ai-ab-test')
export class AiAbTest extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([hidden]) { display: none; }

    .container {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 20px;
      color: #fafafa;
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
      color: #fafafa;
    }

    .swap-btn {
      background: transparent;
      border: 1px solid #27272a;
      color: #a1a1aa;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .swap-btn:hover { border-color: #dfff61; color: #dfff61; }
    .swap-btn:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }

    .variants {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }

    .variant {
      background: #09090b;
      border: 2px solid #27272a;
      border-radius: 8px;
      padding: 16px;
      transition: border-color 200ms ease;
      min-height: 80px;
    }
    .variant.winner-a { border-color: #dfff61; }
    .variant.winner-b { border-color: #dfff61; }

    .variant-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #71717a;
      margin-bottom: 8px;
    }
    .variant.winner-a .variant-label,
    .variant.winner-b .variant-label {
      color: #dfff61;
    }

    .variant-content {
      font-size: 13px;
      color: #d4d4d8;
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
      border: 1px solid #27272a;
      color: #a1a1aa;
      font-size: 12px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .vote-btn:hover {
      border-color: #dfff61;
      color: #dfff61;
    }
    .vote-btn:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }
    .vote-btn.selected {
      background: #dfff61;
      color: #18181b;
      border-color: #dfff61;
    }

    .compare-btn {
      background: #dfff61;
      border: none;
      color: #18181b;
      font-size: 12px;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .compare-btn:hover { filter: brightness(0.9); }
    .compare-btn:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      .variant, .vote-btn, .swap-btn, .compare-btn { transition: none; }
    }
  `;

  @property({ type: String }) variantA = '';
  @property({ type: String }) variantB = '';
  @property({ type: String }) labelA = 'A';
  @property({ type: String }) labelB = 'B';
  @property({ type: String }) title = 'A/B Comparison';

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
