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
 * @cssprop --cg-color-action-primary-background-default - Selected rating and submit button accent
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-feedback')
export class AiFeedback extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }

    /* ── Keyframes ── */

    @keyframes pop {
      0% { transform: scale(1); }
      40% { transform: scale(1.28); }
      70% { transform: scale(0.92); }
      100% { transform: scale(1); }
    }

    @keyframes jelly {
      0% { transform: scale(1, 1); }
      25% { transform: scale(0.9, 1.1); }
      50% { transform: scale(1.1, 0.9); }
      75% { transform: scale(0.95, 1.05); }
      100% { transform: scale(1, 1); }
    }

    @keyframes starCascade {
      0% { transform: scale(0.5) rotate(-15deg); opacity: 0; }
      60% { transform: scale(1.2) rotate(5deg); opacity: 1; }
      100% { transform: scale(1) rotate(0); opacity: 1; }
    }

    @keyframes chipIn {
      0% { transform: scale(0.8) translateY(4px); opacity: 0; }
      60% { transform: scale(1.04) translateY(-1px); }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }

    @keyframes checkDraw {
      from { stroke-dashoffset: 24; }
      to { stroke-dashoffset: 0; }
    }

    @keyframes successReveal {
      from { opacity: 0; transform: translateX(-8px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes sectionReveal {
      from { opacity: 0; transform: translateY(6px); max-height: 0; }
      to { opacity: 1; transform: translateY(0); max-height: 200px; }
    }

    @keyframes rippleOut {
      from { transform: scale(0); opacity: 0.4; }
      to { transform: scale(2.5); opacity: 0; }
    }

    /* Rating row */
    .rating-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      padding-bottom: var(--cg-spacing-8);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .rating-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-right: var(--cg-spacing-4);
    }

    /* ── Thumbs ── */
    .thumb-btn {
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: none;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-base);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .thumb-btn:hover {
      border-color: var(--cg-color-input-border-hover);
      background: var(--cg-overlay-dark-subtle);
      transform: translateY(-1px);
    }
    .thumb-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .thumb-btn.selected-up {
      border-color: var(--cg-color-status-success-text-default);
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
      animation: pop 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 0 12px var(--cg-color-status-success-background-default);
    }
    .thumb-btn.selected-down {
      border-color: var(--cg-color-status-error-text-default);
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      animation: pop 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 0 12px var(--cg-color-status-error-background-default);
    }
    .thumb-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); outline-offset: var(--cg-outline-offset-default); }

    /* ── Stars ── */
    .star-btn {
      background: none;
      border: none;
      color: var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-xl);
      cursor: pointer;
      padding: var(--cg-spacing-2);
      transition:
        color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .star-btn:hover { transform: scale(1.15); }
    .star-btn.active {
      color: var(--cg-color-status-warning-text-default);
      animation: starCascade 350ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
      animation-delay: calc(var(--star-index, 0) * 50ms);
    }
    .star-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .star-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); outline-offset: var(--cg-outline-offset-default); }

    /* Star SVG fill transition */
    .star-btn svg { transition: fill var(--cg-transition-duration-fast) var(--cg-transition-easing-default); }
    .star-btn.active svg { fill: var(--cg-color-status-warning-text-default); }

    /* ── Emoji ── */
    .emoji-btn {
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid transparent;
      background: none;
      font-size: var(--cg-font-size-xl);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      opacity: 0.5;
    }
    .emoji-btn:hover { opacity: 0.85; background: var(--cg-overlay-dark-subtle); transform: scale(1.1); }
    .emoji-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .emoji-btn.selected {
      opacity: 1;
      border-color: var(--cg-color-surface-base-text);
      background: var(--cg-overlay-accent-subtle);
      animation: jelly 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .emoji-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); outline-offset: var(--cg-outline-offset-default); }

    /* Dim unselected when one is chosen */
    .emoji-btn.dimmed { opacity: 0.3; }
    .emoji-btn.dimmed:hover { opacity: 0.6; }

    /* ── Tags ── */
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-6);
      animation: sectionReveal var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    .tag {
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: none;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      transition:
        border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      font-family: inherit;
      animation: chipIn 350ms var(--cg-transition-easing-ease-out) both;
      animation-delay: calc(var(--chip-index, 0) * 60ms);
    }
    .tag:hover {
      border-color: var(--cg-color-input-border-hover);
      color: var(--cg-color-surface-base-text);
      transform: translateY(-1px);
    }
    .tag:active { transform: scale(var(--cg-interaction-press-scale)); }
    .tag.selected {
      border-color: var(--cg-color-surface-base-text);
      color: var(--cg-color-surface-base-text);
      background: var(--cg-overlay-accent-subtle);
      box-shadow: 0 0 8px var(--cg-overlay-accent-medium);
      animation: pop 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .tag:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); outline-offset: var(--cg-outline-offset-default); }

    /* ── Comment ── */
    .comment-area {
      animation: sectionReveal var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
      overflow: hidden;
    }
    textarea {
      width: 100%;
      min-height: var(--cg-spacing-64);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-input-background-default);
      color: var(--cg-color-surface-base-text);
      font: inherit;
      font-size: var(--cg-font-size-xs);
      resize: vertical;
      outline: none;
      transition: border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    textarea:focus {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    textarea::placeholder { color: var(--cg-color-input-text-placeholder); }

    /* ── Submit ── */
    .submit-wrap {
      align-self: flex-start;
      animation: chipIn 300ms var(--cg-transition-easing-ease-out) both;
    }
    .submit-btn {
      position: relative;
      overflow: hidden;
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      border: none;
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      font: inherit;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      cursor: pointer;
      transition:
        background-color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        opacity var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .submit-btn:hover { background: var(--cg-color-action-primary-background-hover); }
    .submit-btn:active:not(:disabled) { transform: scale(var(--cg-interaction-press-scale)); }
    .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .submit-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); outline-offset: var(--cg-outline-offset-default); }

    /* Ripple pseudo-element */
    .submit-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 70%);
      opacity: 0;
      transform: scale(0);
      pointer-events: none;
    }
    .submit-btn:active:not(:disabled)::after {
      animation: rippleOut 500ms ease-out;
    }

    /* ── Submitted state ── */
    .submitted {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-status-success-text-default);
      font-weight: var(--cg-font-weight-medium);
    }
    .submitted-icon {
      font-size: var(--cg-font-size-base);
      animation: pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    .submitted-icon svg {
      stroke-dasharray: 24;
      stroke-dashoffset: 24;
      animation: checkDraw 400ms ease-out 200ms forwards;
    }
    .submitted-text {
      animation: successReveal 400ms var(--cg-transition-easing-ease-out) 350ms both;
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .container { border-radius: var(--cg-border-radius-full); }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      .thumb-btn.selected-up,
      .thumb-btn.selected-down,
      .star-btn.active,
      .emoji-btn.selected,
      .tag.selected,
      .tag,
      .submitted-icon,
      .submitted-text,
      .tags,
      .comment-area,
      .submit-wrap { animation: none; }
      .submitted-icon svg { stroke-dashoffset: 0; animation: none; }
    }
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
          <span class="submitted-text">Thank you for your feedback!</span>
        </div>
      `;
    }

    const hasRating = this._rating !== null;

    return html`
      <div class="container" role="group" aria-label="Rate this response">
        <div class="rating-row">
          <span class="rating-label">Rate:</span>
          ${this.mode === 'thumbs' ? html`
            <button class="thumb-btn ${this._rating === 1 ? 'selected-up' : ''}" @click=${() => this._handleThumb(1)} aria-label="Good" aria-pressed=${this._rating === 1 ? 'true' : 'false'} title="Good"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg></button>
            <button class="thumb-btn ${this._rating === 0 ? 'selected-down' : ''}" @click=${() => this._handleThumb(0)} aria-label="Bad" aria-pressed=${this._rating === 0 ? 'true' : 'false'} title="Bad"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg></button>
          ` : nothing}

          ${this.mode === 'stars' ? html`
            ${[1, 2, 3, 4, 5].map(n => html`
              <button class="star-btn ${(this._rating ?? 0) >= n || this._hoverStar >= n ? 'active' : ''}"
                style="--star-index: ${n - 1}"
                @click=${() => this._handleStar(n)}
                @mouseenter=${() => { this._hoverStar = n; }}
                @mouseleave=${() => { this._hoverStar = 0; }}
                aria-label="${n} star${n > 1 ? 's' : ''}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></button>
            `)}
          ` : nothing}

          ${this.mode === 'emoji' ? html`
            ${this._emojiLabels.map((label, i) => html`
              <button class="emoji-btn ${this._rating === i ? 'selected' : ''} ${hasRating && this._rating !== i ? 'dimmed' : ''}"
                @click=${() => this._handleEmoji(i)}
                aria-label="Rating ${i + 1} of 5: ${label}" aria-pressed=${this._rating === i ? 'true' : 'false'}>${this._renderEmoji(i)}</button>
            `)}
          ` : nothing}
        </div>

        ${this._isNegative() && this.tags.length > 0 ? html`
          <div class="tags" role="group" aria-label="Select issues">
            ${this.tags.map((tag, i) => html`
              <button class="tag ${this._selectedTags.has(tag) ? 'selected' : ''}"
                style="--chip-index: ${i}"
                @click=${() => this._toggleTag(tag)}
                aria-pressed=${this._selectedTags.has(tag) ? 'true' : 'false'}>${tag}</button>
            `)}
          </div>
        ` : nothing}

        ${(this.showComment || this._isNegative()) ? html`
          <div class="comment-area">
            <textarea placeholder="What could be improved?" aria-label="Additional feedback"
              .value=${this._comment}
              @input=${(e: Event) => { this._comment = (e.target as HTMLTextAreaElement).value; }}></textarea>
          </div>
        ` : nothing}

        ${this._rating !== null ? html`
          <div class="submit-wrap">
            <button class="submit-btn" @click=${this._handleSubmit}>Submit feedback</button>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
