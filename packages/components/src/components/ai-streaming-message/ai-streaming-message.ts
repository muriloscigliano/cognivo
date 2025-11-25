import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface MessageSource {
  title: string;
  url?: string;
  snippet?: string;
}

/**
 * AI Streaming Message
 *
 * Displays AI-generated messages with streaming animation,
 * markdown support, and source citations.
 *
 * @element ai-streaming-message
 *
 * @fires ai:stream-complete - Fired when streaming animation completes
 * @fires ai:source-click - Fired when a source citation is clicked
 * @fires ai:action - Fired when an action button is clicked
 */
@customElement('ai-streaming-message')
export class AiStreamingMessage extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .message-container {
        display: flex;
        gap: ${tokens.spacing.md};
        align-items: flex-start;
      }

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: ${tokens.radius.full};
        background: linear-gradient(135deg, ${tokens.color.aiAccent}, #8b5cf6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
      }

      .content-wrapper {
        flex: 1;
        min-width: 0;
      }

      .header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.xs};
      }

      .sender-name {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 2px 6px;
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.full};
        font-size: 9px;
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
      }

      .timestamp {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        margin-left: auto;
      }

      .message-content {
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.lg};
        border-top-left-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
        line-height: 1.6;
        color: ${tokens.color.gray800};
      }

      /* Markdown-like styling */
      .message-content p {
        margin: 0 0 ${tokens.spacing.sm} 0;
      }

      .message-content p:last-child {
        margin-bottom: 0;
      }

      .message-content strong {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .message-content code {
        padding: 2px 6px;
        background: ${tokens.color.gray200};
        border-radius: ${tokens.radius.sm};
        font-family: monospace;
        font-size: 0.9em;
      }

      .message-content pre {
        margin: ${tokens.spacing.sm} 0;
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray900};
        color: ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        overflow-x: auto;
        font-family: monospace;
        font-size: 12px;
        line-height: 1.5;
      }

      .message-content ul, .message-content ol {
        margin: ${tokens.spacing.sm} 0;
        padding-left: ${tokens.spacing.lg};
      }

      .message-content li {
        margin-bottom: ${tokens.spacing.xs};
      }

      /* Streaming cursor */
      .cursor {
        display: inline-block;
        width: 8px;
        height: 16px;
        background: ${tokens.color.aiAccent};
        margin-left: 2px;
        animation: blink 1s infinite;
        vertical-align: text-bottom;
        border-radius: 1px;
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      /* Loading state */
      .loading-state {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.lg};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
      }

      .loading-dots {
        display: flex;
        gap: 4px;
      }

      .loading-dot {
        width: 6px;
        height: 6px;
        background: ${tokens.color.aiAccent};
        border-radius: 50%;
        animation: loadingBounce 1.4s infinite;
      }

      .loading-dot:nth-child(2) { animation-delay: 0.2s; }
      .loading-dot:nth-child(3) { animation-delay: 0.4s; }

      @keyframes loadingBounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-6px); }
      }

      /* Sources */
      .sources {
        margin-top: ${tokens.spacing.md};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
      }

      .sources-header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray500};
        margin-bottom: ${tokens.spacing.xs};
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .source-list {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.xs};
      }

      .source-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray700};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        text-decoration: none;
      }

      .source-chip:hover {
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
      }

      .source-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        background: ${tokens.color.gray200};
        border-radius: 50%;
        font-size: 10px;
        font-weight: ${tokens.fontWeight.bold};
      }

      /* Actions */
      .actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        margin-top: ${tokens.spacing.sm};
        padding-top: ${tokens.spacing.sm};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .action-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: none;
        border: none;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .action-btn:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray700};
      }

      .action-btn.active {
        color: ${tokens.color.aiAccent};
      }

      /* Regenerate button */
      .regenerate-btn {
        margin-left: auto;
        color: ${tokens.color.aiAccent};
      }

      .regenerate-btn:hover {
        background: ${tokens.color.aiBackground};
      }

      /* Confidence indicator */
      .confidence {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        margin-top: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .confidence-bar {
        width: 60px;
        height: 4px;
        background: ${tokens.color.gray200};
        border-radius: 2px;
        overflow: hidden;
      }

      .confidence-fill {
        height: 100%;
        background: ${tokens.color.aiAccent};
        border-radius: 2px;
        transition: width ${tokens.transition.default};
      }
    `
  ];

  @property({ type: String }) content = '';
  @property({ type: String }) sender = 'AI Assistant';
  @property({ type: String }) avatar = '✨';
  @property({ type: String }) timestamp = '';
  @property({ type: Boolean }) streaming = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Array }) sources: MessageSource[] = [];
  @property({ type: Number }) confidence = 0;
  @property({ type: Boolean, attribute: 'show-actions' }) showActions = true;
  @property({ type: Boolean, attribute: 'show-confidence' }) showConfidence = false;

  @state() private liked = false;
  @state() private disliked = false;
  @state() private copied = false;

  private parseMarkdown(text: string): string {
    // Simple markdown parsing
    let parsed = text
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Bold
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Unordered lists
      .replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>')
      // Line breaks to paragraphs
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Wrap list items
    parsed = parsed.replace(/(<li>.*?<\/li>)+/gs, '<ul>$&</ul>');

    // Wrap in paragraph if not already wrapped
    if (!parsed.startsWith('<')) {
      parsed = `<p>${parsed}</p>`;
    }

    return parsed;
  }

  private handleCopy() {
    navigator.clipboard.writeText(this.content);
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }

  private handleLike() {
    this.liked = !this.liked;
    if (this.liked) this.disliked = false;
    this.dispatchEvent(new CustomEvent('ai:action', {
      detail: { action: 'like', value: this.liked },
      bubbles: true,
      composed: true
    }));
  }

  private handleDislike() {
    this.disliked = !this.disliked;
    if (this.disliked) this.liked = false;
    this.dispatchEvent(new CustomEvent('ai:action', {
      detail: { action: 'dislike', value: this.disliked },
      bubbles: true,
      composed: true
    }));
  }

  private handleRegenerate() {
    this.dispatchEvent(new CustomEvent('ai:action', {
      detail: { action: 'regenerate' },
      bubbles: true,
      composed: true
    }));
  }

  private handleSourceClick(source: MessageSource, index: number) {
    this.dispatchEvent(new CustomEvent('ai:source-click', {
      detail: { source, index },
      bubbles: true,
      composed: true
    }));
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('streaming') && !this.streaming && changedProperties.get('streaming') === true) {
      this.dispatchEvent(new CustomEvent('ai:stream-complete', {
        bubbles: true,
        composed: true
      }));
    }
  }

  override render() {
    return html`
      <div class="message-container">
        <div class="avatar">${this.avatar}</div>

        <div class="content-wrapper">
          <div class="header">
            <span class="sender-name">${this.sender}</span>
            <span class="ai-badge">
              <span>✨</span>
              <span>AI</span>
            </span>
            ${this.timestamp ? html`
              <span class="timestamp">${this.timestamp}</span>
            ` : null}
          </div>

          ${this.loading ? html`
            <div class="loading-state">
              <div class="loading-dots">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
              </div>
              <span>Thinking...</span>
            </div>
          ` : html`
            <div class="message-content">
              ${unsafeHTML(this.parseMarkdown(this.content))}
              ${this.streaming ? html`<span class="cursor"></span>` : null}
            </div>
          `}

          ${this.sources.length > 0 && !this.loading ? html`
            <div class="sources">
              <div class="sources-header">
                <span>📚</span>
                <span>Sources</span>
              </div>
              <div class="source-list">
                ${this.sources.map((source, i) => html`
                  <a
                    class="source-chip"
                    href=${source.url || '#'}
                    @click=${(e: Event) => {
                      if (!source.url) e.preventDefault();
                      this.handleSourceClick(source, i);
                    }}
                  >
                    <span class="source-number">${i + 1}</span>
                    <span>${source.title}</span>
                  </a>
                `)}
              </div>
            </div>
          ` : null}

          ${this.showConfidence && this.confidence > 0 && !this.loading ? html`
            <div class="confidence">
              <span>Confidence:</span>
              <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${this.confidence * 100}%"></div>
              </div>
              <span>${Math.round(this.confidence * 100)}%</span>
            </div>
          ` : null}

          ${this.showActions && this.content && !this.loading ? html`
            <div class="actions">
              <button
                class="action-btn ${this.copied ? 'active' : ''}"
                @click=${this.handleCopy}
                title="Copy to clipboard"
              >
                ${this.copied ? '✓' : '📋'} ${this.copied ? 'Copied' : 'Copy'}
              </button>
              <button
                class="action-btn ${this.liked ? 'active' : ''}"
                @click=${this.handleLike}
                title="Good response"
              >
                👍
              </button>
              <button
                class="action-btn ${this.disliked ? 'active' : ''}"
                @click=${this.handleDislike}
                title="Poor response"
              >
                👎
              </button>
              <button
                class="action-btn regenerate-btn"
                @click=${this.handleRegenerate}
                title="Regenerate response"
              >
                🔄 Regenerate
              </button>
            </div>
          ` : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-streaming-message': AiStreamingMessage;
  }
}
