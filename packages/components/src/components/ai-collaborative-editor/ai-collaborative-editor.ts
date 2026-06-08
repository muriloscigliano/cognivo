/**
 * @element ai-collaborative-editor
 * Monospace text editor with multi-user cursor presence overlay, word/char counts, and live editing.
 *
 * @example
 * ```html
 * <ai-collaborative-editor
 *   content="Hello world"
 *   .cursors=${[{user:'Alice', position:5, color:'#60a5fa'}]}
 *   editable
 * ></ai-collaborative-editor>
 * ```
 *
 * @fires {CustomEvent<{content: string}>} ai-editor-change - Content changed
 * @fires {CustomEvent<{position, selectionStart, selectionEnd}>} ai-editor-cursor-move - Cursor moved
 *
 * @cssprop [--cg-color-accent=#dfff61] - Caret color and focus ring
 * @cssprop [--cg-font-family-mono] - Editor font family
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface EditorCursor {
  user: string;
  position: number;
  color: string;
}

@customElement('ai-collaborative-editor')
export class AiCollaborativeEditor extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .editor-wrap {
      position: relative;
      min-height: var(--cg-spacing-192);
    }

    textarea {
      display: block;
      width: 100%;
      min-height: var(--cg-spacing-192);
      background: transparent;
      color: var(--cg-color-surface-base-text);
      border: none;
      outline: none;
      resize: vertical;
      padding: var(--cg-spacing-12);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
      box-sizing: border-box;
      caret-color: var(--cg-color-surface-base-text);
    }

    textarea::placeholder {
      color: var(--cg-color-input-text-placeholder);
    }

    textarea:focus-visible {
      border-radius: var(--cg-border-radius-150);
      box-shadow: inset 0 0 0 var(--cg-border-width-100) var(--cg-overlay-accent-strong);
    }

    textarea:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .cursors-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .cursor-marker {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
      z-index: 2;
    }

    .cursor-line {
      width: var(--cg-spacing-2);
      height: var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-50);
    }

    .cursor-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      padding: var(--cg-spacing-1) var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-50);
      white-space: nowrap;
      margin-top: var(--cg-spacing-2);
      color: var(--cg-color-surface-container-background);
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .stats {
      display: flex;
      gap: var(--cg-spacing-12);
    }

    .presence {
      display: flex;
      gap: var(--cg-spacing-4);
      align-items: center;
    }

    .presence-dot {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: 50%;
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .presence-dot:hover {
      transform: scale(1.3);
    }

    /* Basic hover transitions on interactive elements */
    textarea:hover {
      border-color: var(--cg-color-surface-cards-border);
    }
  `];
  @property({ type: String }) content = '';
  @property({ type: Array }) cursors: EditorCursor[] = [];
  @property({ type: Boolean }) editable = true;
  @property({ type: String }) placeholder = 'Start typing...';

  @state() private _charCount = 0;
  @state() private _wordCount = 0;

  @query('textarea') private _textarea!: HTMLTextAreaElement;

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('content')) {
      this._updateCounts();
    }
  }

  private _updateCounts(): void {
    this._charCount = this.content.length;
    const trimmed = this.content.trim();
    this._wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  }

  private _onInput(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    this.content = target.value;
    this._updateCounts();
    this.dispatchEvent(new CustomEvent('ai-editor-change', {
      bubbles: true, composed: true,
      detail: { content: this.content },
    }));
  }

  private _onSelect(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    this.dispatchEvent(new CustomEvent('ai-editor-cursor-move', {
      bubbles: true, composed: true,
      detail: {
        position: target.selectionStart,
        selectionStart: target.selectionStart,
        selectionEnd: target.selectionEnd,
      },
    }));
  }

  private _getCursorPosition(position: number): { top: number; left: number } {
    const charWidth = 8.4;
    const lineHeight = 22.4;
    const padding = 12;
    const charsPerLine = this._textarea
      ? Math.floor((this._textarea.clientWidth - padding * 2) / charWidth)
      : 60;

    const textBefore = this.content.substring(0, position);
    const lines = textBefore.split('\n');
    let totalLines = 0;
    for (const line of lines) {
      totalLines += Math.max(1, Math.ceil((line.length || 1) / charsPerLine));
    }
    totalLines = Math.max(1, totalLines);
    const lastLine = lines[lines.length - 1] || '';
    const colInLine = lastLine.length % charsPerLine;

    return {
      top: padding + (totalLines - 1) * lineHeight,
      left: padding + colInLine * charWidth,
    };
  }

  override render() {
    return html`
      <div class="editor-wrap" role="group" aria-label="Collaborative text editor">
        <textarea
          .value=${this.content}
          ?disabled=${!this.editable}
          placeholder=${this.placeholder}
          @input=${this._onInput}
          @keyup=${this._onSelect}
          @click=${this._onSelect}
          aria-label="Editor content"
          tabindex="0"
        ></textarea>
        <div class="cursors-overlay" aria-hidden="true">
          ${this.cursors.map(c => {
            const pos = this._getCursorPosition(c.position);
            return html`
              <div class="cursor-marker" style="top:${pos.top}px;left:${pos.left}px">
                <div class="cursor-line" style="background:${c.color}"></div>
                <span class="cursor-label" style="background:${c.color}">${c.user}</span>
              </div>
            `;
          })}
        </div>
      </div>
      <div class="footer">
        <div class="stats">
          <span>${this._charCount} chars</span>
          <span>${this._wordCount} words</span>
        </div>
        ${this.cursors.length ? html`
          <div class="presence" aria-label="${this.cursors.length} users present">
            ${this.cursors.map(c => html`
              <span class="presence-dot" style="background:${c.color}" title="${c.user}"></span>
            `)}
            <span>${this.cursors.length} online</span>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-collaborative-editor': AiCollaborativeEditor;
  }
}
