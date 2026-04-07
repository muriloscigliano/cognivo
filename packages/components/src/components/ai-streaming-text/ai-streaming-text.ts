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
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import { sanitizeHTML } from '../../utils/sanitize.js';

@customElement('ai-streaming-text')
export class AiStreamingText extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }

    .container {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-relaxed);
      word-wrap: break-word;
    }

    /* Markdown */
    .container strong { font-weight: var(--cg-font-weight-bold); }
    .container em { font-style: italic; }
    .container code {
      background: var(--cg-overlay-dark-subtle);
      padding: var(--cg-spacing-1) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-100);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
    }
    .container pre {
      background: var(--cg-overlay-dark-subtle);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      overflow-x: auto;
      margin: var(--cg-spacing-8) 0;
      font-size: var(--cg-font-size-xs);
      line-height: var(--cg-line-height-normal);
      position: relative;
    }
    .container pre code { background: none; padding: 0; }
    .container ul, .container ol { padding-left: var(--cg-spacing-20); margin: var(--cg-spacing-6) 0; }
    .container a { color: var(--cg-color-surface-base-text); text-decoration: none; }
    .container a:hover { text-decoration: underline; }
    .container p { margin: 0 0 var(--cg-spacing-8); }
    .container p:last-child { margin: 0; }
    .container h1, .container h2, .container h3 {
      font-weight: var(--cg-font-weight-bold);
      margin: var(--cg-spacing-12) 0 var(--cg-spacing-6);
      color: var(--cg-color-surface-base-text);
    }
    .container h1 { font-size: var(--cg-font-size-xl); }
    .container h2 { font-size: var(--cg-font-size-base); }
    .container h3 { font-size: var(--cg-font-size-sm); }

    /* Empty */
    .empty {
      color: var(--cg-color-input-text-placeholder);
      font-style: italic;
    }
  `];

  /** Content to display */
  @property({ type: String }) content: string = '';

  /** Is currently streaming */
  @property({ type: Boolean }) streaming: boolean = false;

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

    const rendered = sanitizeHTML(this.markdown ? this._renderMarkdown(this.content) : this.content);

    return html`
      <div class="container" role="status" aria-live="polite">
        <span .innerHTML=${rendered}></span>
      </div>
    `;
  }
}
