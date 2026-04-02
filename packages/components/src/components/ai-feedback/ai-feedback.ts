/**
 * @element ai-feedback
 * User feedback widget with thumbs/stars/emoji modes, selectable issue tags, and optional comment field.
 *
 * @example
 * ```html
 * <ai-feedback
 *   mode="thumbs"
 *   messageId="msg-42"
 *   .tags=${['Inaccurate','Too long','Offensive']}
 *   showComment
 * ></ai-feedback>
 * ```
 *
 * @fires {CustomEvent<{rating, tags, comment, messageId}>} ai-feedback-submit - Feedback submitted
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Selected rating and submit button accent
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-feedback')
export class AiFeedback extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: var(--cg-elevation-1, 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
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

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .container { border-radius: var(--cg-border-radius-full, 99999px); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
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

  private _emojiLabels = ['Angry', 'Confused', 'Neutral', 'Happy', 'Very Happy'];
  private _renderEmoji(index: number): unknown {
    if (index === 0) return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
    if (index === 1) return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-1-4-1-4 1-4 1"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
    if (index === 2) return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
    if (index === 3) return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
    return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 3 4 3 4-3 4-3"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
  }

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
          <span class="submitted-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
          <span>Thank you for your feedback!</span>
        </div>
      `;
    }

    return html`
      <div class="container" role="group" aria-label="Rate this response">
        <div class="rating-row">
          <span class="rating-label">Rate:</span>
          ${this.mode === 'thumbs' ? html`
            <button class="thumb-btn ${this._rating === 1 ? 'selected-up' : ''}" @click=${() => this._handleThumb(1)} aria-label="Good" title="Good"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg></button>
            <button class="thumb-btn ${this._rating === 0 ? 'selected-down' : ''}" @click=${() => this._handleThumb(0)} aria-label="Bad" title="Bad"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg></button>
          ` : nothing}

          ${this.mode === 'stars' ? html`
            ${[1, 2, 3, 4, 5].map(n => html`
              <button class="star-btn ${(this._rating ?? 0) >= n || this._hoverStar >= n ? 'active' : ''}"
                @click=${() => this._handleStar(n)}
                @mouseenter=${() => { this._hoverStar = n; }}
                @mouseleave=${() => { this._hoverStar = 0; }}
                aria-label="${n} star${n > 1 ? 's' : ''}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></button>
            `)}
          ` : nothing}

          ${this.mode === 'emoji' ? html`
            ${this._emojiLabels.map((label, i) => html`
              <button class="emoji-btn ${this._rating === i ? 'selected' : ''}"
                @click=${() => this._handleEmoji(i)}
                aria-label="Rating ${i + 1} of 5: ${label}">${this._renderEmoji(i)}</button>
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
