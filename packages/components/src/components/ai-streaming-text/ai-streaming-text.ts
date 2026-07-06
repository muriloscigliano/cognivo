/**
 * @element ai-streaming-text
 * Token-by-token text renderer that delegates markdown rendering to
 * <cg-markdown> for consistency with non-streaming messages. Use the
 * `appendText()` method to stream content incrementally and `complete()`
 * to finish. Call `reset()` to clear.
 *
 * @example
 * ```html
 * <ai-streaming-text content="Hello **world**" streaming markdown></ai-streaming-text>
 * ```
 *
 * @prop {string} content - Current text content
 * @prop {boolean} streaming - Whether content is actively streaming
 * @prop {boolean} markdown - Render as markdown (default true)
 *
 * @method appendText(text: string) - Append a text chunk and set streaming=true
 * @method complete() - Mark streaming as finished
 * @method reset() - Clear all content
 *
 * @fires {CustomEvent<{chunk: string, total: string}>} ai-streaming-chunk - On each appended chunk
 * @fires {CustomEvent<{content: string}>} ai-streaming-complete - When streaming completes
 */
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-markdown/cg-markdown.js';

@customElement('ai-streaming-text')
export class AiStreamingText extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .container {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-relaxed);
      overflow-wrap: break-word;
    }

    .empty {
      color: var(--cg-color-input-text-placeholder);
      font-style: italic;
    }

    /* Plain-text fallback when markdown is disabled */
    .plain {
      white-space: pre-wrap;
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

  override render() {
    const isEmpty = !this.content && !this.streaming;
    // Always render the live region so screen readers catch the first streamed chunk.
    return html`
      <div class="container" role="status" aria-live="polite" aria-busy=${this.streaming ? 'true' : 'false'}>
        ${isEmpty
          ? html`<span class="empty">Waiting for content...</span>`
          : this.markdown
            ? html`<cg-markdown .text=${this.content}></cg-markdown>`
            : html`<span class="plain">${this.content}</span>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-streaming-text': AiStreamingText;
  }
}
