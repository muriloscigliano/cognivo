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
      background: var(--cg-color-surface-base, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      overflow: hidden;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .editor-wrap {
      position: relative;
      min-height: 120px;
    }

    textarea {
      display: block;
      width: 100%;
      min-height: 120px;
      background: transparent;
      color: var(--cg-color-surface-base-text, #fafafa);
      border: none;
      outline: none;
      resize: vertical;
      padding: var(--cg-spacing-12, 12px);
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', 'Fira Code', monospace);
      font-size: var(--cg-font-size-sm, 14px);
      line-height: 1.6;
      box-sizing: border-box;
      caret-color: var(--cg-color-accent, #dfff61);
    }

    textarea::placeholder {
      color: var(--cg-color-text-tertiary, #71717a);
    }

    textarea:focus-visible {
      box-shadow: inset 0 0 0 2px var(--cg-color-accent, #dfff61);
      border-radius: var(--cg-radius-lg, 12px);
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
      width: 2px;
      height: 18px;
      border-radius: 1px;
    }

    .cursor-label {
      font-size: 10px;
      font-weight: var(--cg-font-weight-semibold, 600);
      padding: 1px 4px;
      border-radius: var(--cg-radius-sm, 4px);
      white-space: nowrap;
      margin-top: 2px;
      color: #18181b;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;
      border-top: 1px solid var(--cg-color-border-default, #27272a);
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .stats {
      display: flex;
      gap: var(--cg-spacing-12, 12px);
    }

    .presence {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .presence-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      transition: transform 150ms ease;
    }
    .presence-dot:hover {
      transform: scale(1.3);
    }

    /* Basic hover transitions on interactive elements */
    textarea:hover {
      border-color: var(--cg-color-border-default, #3f3f46);
    }
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
