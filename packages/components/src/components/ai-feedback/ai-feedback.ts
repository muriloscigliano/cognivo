/**
 * <ai-feedback> — User Feedback Widget
 *
 * Modes: thumbs (👍/👎), stars (1-5), emoji, custom.
 * Optional comment textarea, issue tags, submitted state.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

@customElement('ai-feedback')
export class AiFeedback extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    

    .container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* Rating row */
    .rating-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .rating-label {
      font-size: 12px;
      color: var(--cg-gray-400, #a1a1aa);
      margin-right: 4px;
    }

    /* Thumbs */
    .thumb-btn {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none;
      color: var(--cg-gray-400, #a1a1aa);
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 150ms;
    }
    .thumb-btn:hover { border-color: var(--cg-gray-600, #52525b); background: rgba(255, 255, 255, 0.04); }
    .thumb-btn.selected-up { border-color: var(--cg-green-400, #4ade80); background: rgba(34, 197, 94, 0.1); color: var(--cg-green-400, #4ade80); }
    .thumb-btn.selected-down { border-color: var(--cg-red-400, #f87171); background: rgba(239, 68, 68, 0.1); color: var(--cg-red-400, #f87171); }
    .thumb-btn:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 2px; }

    /* Stars */
    .star-btn {
      background: none;
      border: none;
      color: var(--cg-gray-700, #3f3f46);
      font-size: 20px;
      cursor: pointer;
      padding: 2px;
      transition: color 150ms;
    }
    .star-btn.active { color: var(--cg-yellow-400, #fbbf24); }
    .star-btn:hover { color: var(--cg-yellow-300, #fcd34d); }
    .star-btn:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 2px; }

    /* Emoji */
    .emoji-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid transparent;
      background: none;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 150ms;
      opacity: 0.5;
    }
    .emoji-btn:hover { opacity: 0.8; background: rgba(255, 255, 255, 0.04); }
    .emoji-btn.selected { opacity: 1; border-color: var(--cg-brand-ai-accent, #dfff61); background: rgba(223, 255, 97, 0.06); }
    .emoji-btn:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 2px; }

    /* Tags */
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .tag {
      padding: 4px 12px;
      border-radius: 6px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none;
      color: var(--cg-gray-400, #a1a1aa);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms;
      font-family: inherit;
    }
    .tag:hover { border-color: var(--cg-gray-600, #52525b); color: var(--cg-color-surface-base-text, #fafafa); }
    .tag.selected { border-color: var(--cg-brand-ai-accent, #dfff61); color: var(--cg-brand-ai-accent, #dfff61); background: rgba(223, 255, 97, 0.06); }

    /* Comment */
    textarea {
      width: 100%;
      min-height: 60px;
      padding: 8px 12px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      border-radius: 8px;
      background: var(--cg-color-surface-base-background, #09090b);
      color: var(--cg-color-surface-base-text, #fafafa);
      font: inherit;
      font-size: 12px;
      resize: vertical;
      outline: none;
      transition: border-color 200ms;
    }
    textarea:focus { border-color: var(--cg-brand-ai-accent, #dfff61); }
    textarea::placeholder { color: var(--cg-gray-600, #52525b); }

    /* Submit */
    .submit-btn {
      align-self: flex-start;
      padding: 6px 16px;
      border-radius: 8px;
      border: none;
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #000;
      font: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 150ms;
    }
    .submit-btn:hover { filter: brightness(1.1); }
    .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* Submitted state */
    .submitted {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--cg-green-400, #4ade80);
      font-weight: 500;
    }
    .submitted-icon { font-size: 16px; }
    }
  `];
  /** Feedback mode */
  @property({ type: String }) mode: 'thumbs' | 'stars' | 'emoji' = 'thumbs';

  /** Issue tags for negative feedback */
  @property({ type: Array }) tags: string[] = ['Inaccurate', 'Irrelevant', 'Too long', 'Offensive'];

  /** Associated message ID */
  @property({ type: String }) messageId: string = '';

  /** Show comment textarea */
  @property({ type: Boolean }) showComment: boolean = false;

  @state() private _rating: number | null = null;
  @state() private _selectedTags: Set<string> = new Set();
  @state() private _comment: string = '';
  @state() private _submitted: boolean = false;
  @state() private _hoverStar: number = 0;

  private _emojis = ['😡', '😕', '😐', '🙂', '😄'];

  private _handleThumb(value: number) {
    this._rating = this._rating === value ? null : value;
    if (value === 0) this.showComment = true;
  }

  private _handleStar(value: number) {
    this._rating = value;
    if (value <= 2) this.showComment = true;
  }

  private _handleEmoji(index: number) {
    this._rating = index;
    if (index <= 1) this.showComment = true;
  }

  private _toggleTag(tag: string) {
    if (this._selectedTags.has(tag)) this._selectedTags.delete(tag);
    else this._selectedTags.add(tag);
    this._selectedTags = new Set(this._selectedTags);
  }

  private _handleSubmit() {
    if (this._rating === null) return;
    this._submitted = true;
    this.dispatchEvent(new CustomEvent('ai-feedback-submit', {
      bubbles: true, composed: true,
      detail: {
        rating: this._rating,
        mode: this.mode,
        tags: [...this._selectedTags],
        comment: this._comment || undefined,
        messageId: this.messageId || undefined,
      },
    }));
  }

  private _isNegative(): boolean {
    if (this._rating === null) return false;
    if (this.mode === 'thumbs') return this._rating === 0;
    if (this.mode === 'stars') return this._rating <= 2;
    return this._rating <= 1;
  }

  override render() {
    if (this._submitted) {
      return html`
        <div class="submitted" aria-live="polite" role="status">
          <span class="submitted-icon">✓</span>
          <span>Thank you for your feedback!</span>
        </div>
      `;
    }

    return html`
      <div class="container" role="group" aria-label="Rate this response">
        <div class="rating-row">
          <span class="rating-label">Rate:</span>
          ${this.mode === 'thumbs' ? html`
            <button class="thumb-btn ${this._rating === 1 ? 'selected-up' : ''}" @click=${() => this._handleThumb(1)} aria-label="Good" title="Good">👍</button>
            <button class="thumb-btn ${this._rating === 0 ? 'selected-down' : ''}" @click=${() => this._handleThumb(0)} aria-label="Bad" title="Bad">👎</button>
          ` : nothing}

          ${this.mode === 'stars' ? html`
            ${[1, 2, 3, 4, 5].map(n => html`
              <button class="star-btn ${(this._rating ?? 0) >= n || this._hoverStar >= n ? 'active' : ''}"
                @click=${() => this._handleStar(n)}
                @mouseenter=${() => { this._hoverStar = n; }}
                @mouseleave=${() => { this._hoverStar = 0; }}
                aria-label="${n} star${n > 1 ? 's' : ''}">★</button>
            `)}
          ` : nothing}

          ${this.mode === 'emoji' ? html`
            ${this._emojis.map((e, i) => html`
              <button class="emoji-btn ${this._rating === i ? 'selected' : ''}"
                @click=${() => this._handleEmoji(i)}
                aria-label="Rating ${i + 1} of 5: ${e}">${e}</button>
            `)}
          ` : nothing}
        </div>

        ${this._isNegative() && this.tags.length > 0 ? html`
          <div class="tags" role="group" aria-label="Select issues">
            ${this.tags.map(tag => html`
              <button class="tag ${this._selectedTags.has(tag) ? 'selected' : ''}"
                @click=${() => this._toggleTag(tag)}>${tag}</button>
            `)}
          </div>
        ` : nothing}

        ${(this.showComment || this._isNegative()) ? html`
          <textarea placeholder="What could be improved?" aria-label="Additional feedback"
            .value=${this._comment}
            @input=${(e: Event) => { this._comment = (e.target as HTMLTextAreaElement).value; }}></textarea>
        ` : nothing}

        ${this._rating !== null ? html`
          <button class="submit-btn" @click=${this._handleSubmit}>Submit feedback</button>
        ` : nothing}
      </div>
    `;
  }
}
