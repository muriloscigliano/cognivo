import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AISource {
  id: string;
  title: string;
  url?: string;
  type: 'document' | 'web' | 'database' | 'api';
  confidence: number;
  relevance?: number;
  excerpt?: string;
  timestamp?: string;
}

@customElement('ai-source-list')
export class AiSourceList extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .source-list-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} 0;
        border-bottom: 2px solid ${tokens.color.gray100};
      }

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .ai-badge {
        font-size: 11px;
        padding: 3px 8px;
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.sm};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .count {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        font-weight: ${tokens.fontWeight.medium};
      }

      .source-items {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .source-item {
        padding: ${tokens.spacing.md};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        transition: all ${tokens.transition.default};
        cursor: pointer;
      }

      .source-item:hover {
        border-color: ${tokens.color.aiAccent};
        box-shadow: 0 2px 8px rgba(0, 100, 255, 0.1);
        transform: translateY(-2px);
      }

      .source-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.xs};
      }

      .source-title-section {
        flex: 1;
        min-width: 0;
      }

      .source-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: 4px;
      }

      .source-title a {
        color: ${tokens.color.aiAccent};
        text-decoration: none;
        transition: color ${tokens.transition.fast};
      }

      .source-title a:hover {
        color: ${tokens.color.aiGlow};
        text-decoration: underline;
      }

      .source-meta {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        flex-wrap: wrap;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .source-type {
        padding: 2px 6px;
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.sm};
        font-weight: ${tokens.fontWeight.medium};
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 0.5px;
      }

      .source-metrics {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: flex-end;
      }

      .metric {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: ${tokens.fontSize.xs};
      }

      .metric-label {
        color: ${tokens.color.gray500};
      }

      .metric-value {
        font-weight: ${tokens.fontWeight.semibold};
      }

      .metric-value.high {
        color: ${tokens.color.success};
      }

      .metric-value.medium {
        color: ${tokens.color.warning};
      }

      .metric-value.low {
        color: ${tokens.color.danger};
      }

      .excerpt {
        margin-top: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-left: 2px solid ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        line-height: ${tokens.lineHeight.relaxed};
      }

      .empty-state {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
      }

      .empty-icon {
        font-size: 48px;
        margin-bottom: ${tokens.spacing.sm};
      }

      :host([compact]) .excerpt {
        display: none;
      }

      :host([compact]) .source-item {
        padding: ${tokens.spacing.sm};
      }

      :host([compact]) .source-metrics {
        display: none;
      }
    `
  ];

  @property({ type: Array })
  sources: AISource[] = [];

  @property({ type: String })
  title = 'AI Sources';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: Boolean })
  showExcerpts = true;

  private getConfidenceLevel(value: number): string {
    if (value >= 0.8) return 'high';
    if (value >= 0.5) return 'medium';
    return 'low';
  }

  private handleSourceClick(source: AISource) {
    this.dispatchEvent(new CustomEvent('source-select', {
      detail: { source },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="source-list-container">
        <div class="header">
          <div class="title">
            <span class="ai-badge">AI</span>
            <span>${this.title}</span>
          </div>
          <span class="count">${this.sources.length} sources</span>
        </div>

        ${this.sources.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-icon">📚</div>
            <div>No sources available</div>
          </div>
        ` : html`
          <div class="source-items">
            ${this.sources.map(source => {
              const confidenceLevel = this.getConfidenceLevel(source.confidence);
              const relevanceLevel = source.relevance ? this.getConfidenceLevel(source.relevance) : null;

              return html`
                <div class="source-item" @click=${() => this.handleSourceClick(source)}>
                  <div class="source-header">
                    <div class="source-title-section">
                      <div class="source-title">
                        ${source.url ? html`
                          <a href="${source.url}" target="_blank" rel="noopener noreferrer" @click=${(e: Event) => e.stopPropagation()}>
                            ${source.title}
                          </a>
                        ` : source.title}
                      </div>
                      <div class="source-meta">
                        <span class="source-type">${source.type}</span>
                        ${source.timestamp ? html`<span>📅 ${source.timestamp}</span>` : ''}
                      </div>
                    </div>
                    ${!this.compact ? html`
                      <div class="source-metrics">
                        <div class="metric">
                          <span class="metric-label">Confidence:</span>
                          <span class="metric-value ${confidenceLevel}">
                            ${Math.round(source.confidence * 100)}%
                          </span>
                        </div>
                        ${source.relevance !== undefined ? html`
                          <div class="metric">
                            <span class="metric-label">Relevance:</span>
                            <span class="metric-value ${relevanceLevel}">
                              ${Math.round(source.relevance * 100)}%
                            </span>
                          </div>
                        ` : ''}
                      </div>
                    ` : ''}
                  </div>
                  ${source.excerpt && this.showExcerpts && !this.compact ? html`
                    <div class="excerpt">${source.excerpt}</div>
                  ` : ''}
                </div>
              `;
            })}
          </div>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-source-list': AiSourceList;
  }
}
