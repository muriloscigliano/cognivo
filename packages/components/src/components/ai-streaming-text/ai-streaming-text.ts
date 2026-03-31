/**
 * @element ai-streaming-text
 * Token-by-token text renderer with blinking cursor and basic markdown
 * support. Use the `appendText()` method to stream content incrementally
 * and `complete()` to finish. Call `reset()` to clear.
 *
 * @example
 * ```html
 * <ai-streaming-text content="Hello **world**" streaming markdown showCursor></ai-streaming-text>
 * ```
 *
 * @prop {string} content - Current text content
 * @prop {boolean} streaming - Whether content is actively streaming
 * @prop {boolean} showCursor - Show blinking cursor (default true)
 * @prop {boolean} markdown - Render basic markdown (default true)
 *
 * @method appendText(text: string) - Append a text chunk and set streaming=true
 * @method complete() - Mark streaming as finished
 * @method reset() - Clear all content
 *
 * @fires {CustomEvent<{chunk: string, total: string}>} ai-streaming-chunk - On each appended chunk
 * @fires {CustomEvent<{content: string}>} ai-streaming-complete - When streaming completes
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

@customElement('ai-streaming-text')
export class AiStreamingText extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`

    .container {
      font-size: 14px;
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.6;
      word-wrap: break-word;
    }

    /* Markdown */
    .container strong { font-weight: 700; }
    .container em { font-style: italic; }
    .container code {
      background: rgba(255, 255, 255, 0.06);
      padding: 1px 5px;
      border-radius: 4px;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-size: 12px;
    }
    .container pre {
      background: rgba(0, 0, 0, 0.3);
      padding: 10px 12px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 8px 0;
      font-size: 12px;
      line-height: 1.5;
      position: relative;
    }
    .container pre code { background: none; padding: 0; }
    .container ul, .container ol { padding-left: 18px; margin: 6px 0; }
    .container a { color: var(--cg-brand-ai-accent, #dfff61); text-decoration: none; }
    .container a:hover { text-decoration: underline; }
    .container p { margin: 0 0 8px; }
    .container p:last-child { margin: 0; }
    .container h1, .container h2, .container h3 {
      font-weight: 700;
      margin: 12px 0 6px;
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .container h1 { font-size: 20px; }
    .container h2 { font-size: 17px; }
    .container h3 { font-size: 15px; }

    /* Cursor */
    .cursor {
      display: inline-block;
      width: 2px;
      height: 1em;
      background: var(--cg-brand-ai-accent, #dfff61);
      margin-left: 1px;
      vertical-align: text-bottom;
      animation: blink 1s step-end infinite;
    }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    /* Empty */
    .empty {
      color: var(--cg-gray-500, #71717a);
      font-style: italic;
    }

  `];

  /** Content to display */
  @property({ type: String }) content: string = '';

  /** Is currently streaming */
  @property({ type: Boolean }) streaming: boolean = false;

  /** Show cursor */
  @property({ type: Boolean }) showCursor: boolean = true;

  /** Render as markdown */
  @property({ type: Boolean }) markdown: boolean = true;

  /** Append text (for streaming) */
  appendText(text: string) {
    this.content += text;
    this.streaming = true;
    this.dispatchEvent(new CustomEvent('ai-streaming-chunk', {
      bubbles: true, composed: true,
      detail: { chunk: text, total: this.content },
    }));
  }

  /** Mark streaming as complete */
  complete() {
    this.streaming = false;
    this.dispatchEvent(new CustomEvent('ai-streaming-complete', {
      bubbles: true, composed: true,
      detail: { content: this.content },
    }));
  }

  /** Reset content */
  reset() {
    this.content = '';
    this.streaming = false;
  }

  private _sanitizeUrl(url: string): string {
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) return '#';
    return url;
  }

  private _renderMarkdown(text: string): string {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/### (.+)/g, '<h3>$1</h3>')
      .replace(/## (.+)/g, '<h2>$1</h2>')
      .replace(/# (.+)/g, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, url) => {
        const safe = this._sanitizeUrl(url);
        return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      })
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>').replace(/$/, '</p>')
      .replace(/<p><\/p>/g, '');
  }

  override render() {
    if (!this.content && !this.streaming) {
      return html`<div class="empty">Waiting for content...</div>`;
    }

    const rendered = this.markdown ? this._renderMarkdown(this.content) : this.content;

    return html`
      <div class="container" role="status" aria-live="polite">
        <span .innerHTML=${rendered}></span>${this.streaming && this.showCursor ? html`<span class="cursor" aria-hidden="true"></span>` : nothing}
      </div>
    `;
  }
}
