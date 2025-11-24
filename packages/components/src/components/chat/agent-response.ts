import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AgentMetadata {
  agentId: string;
  agentName: string;
  model?: string;
  processingTime?: number;
  confidence?: number;
  sources?: string[];
}

@customElement('agent-response')
export class AgentResponse extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .response-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border-left: 3px solid ${tokens.color.aiAccent};
      }

      .response-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
      }

      .agent-info {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .agent-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.bold};
      }

      .agent-name {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .metadata {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .metadata-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .confidence-badge {
        padding: 2px 8px;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .confidence-high {
        background: ${tokens.color.success};
        color: white;
      }

      .confidence-medium {
        background: ${tokens.color.warning};
        color: white;
      }

      .confidence-low {
        background: ${tokens.color.gray500};
        color: white;
      }

      .response-content {
        font-size: ${tokens.fontSize.base};
        line-height: ${tokens.lineHeight.normal};
        color: ${tokens.color.gray900};
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      .response-footer {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
        padding-top: ${tokens.spacing.sm};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .sources {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .sources-label {
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .source-list {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.xs};
      }

      .source-link {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.aiAccent};
        text-decoration: none;
        padding: 4px 8px;
        background: ${tokens.color.aiBackground};
        border-radius: ${tokens.radius.sm};
        transition: all ${tokens.transition.fast};
      }

      .source-link:hover {
        background: ${tokens.color.aiHighlight};
        text-decoration: underline;
      }

      .actions {
        display: flex;
        gap: ${tokens.spacing.xs};
        margin-top: ${tokens.spacing.xs};
      }

      .action-button {
        padding: 6px 12px;
        border: 1px solid ${tokens.color.gray100};
        background: white;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .action-button:hover {
        background: ${tokens.color.gray50};
        color: ${tokens.color.gray900};
        border-color: ${tokens.color.gray500};
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      :host([animated]) .response-container {
        animation: slideIn 0.3s ease-out;
      }
    `
  ];

  @property({ type: String })
  content = '';

  @property({ type: Object })
  metadata: AgentMetadata | null = null;

  @property({ type: Boolean, reflect: true })
  animated = false;

  @property({ type: Boolean })
  showActions = true;

  private getConfidenceClass(confidence?: number): string {
    if (!confidence) return 'confidence-medium';
    if (confidence >= 0.8) return 'confidence-high';
    if (confidence >= 0.5) return 'confidence-medium';
    return 'confidence-low';
  }

  private getConfidenceLabel(confidence?: number): string {
    if (!confidence) return 'Medium';
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.5) return 'Medium';
    return 'Low';
  }

  private handleCopy() {
    navigator.clipboard.writeText(this.content);
    this.dispatchEvent(new CustomEvent('copy', { detail: { content: this.content } }));
  }

  private handleLike() {
    this.dispatchEvent(new CustomEvent('like', { detail: { metadata: this.metadata } }));
  }

  private handleDislike() {
    this.dispatchEvent(new CustomEvent('dislike', { detail: { metadata: this.metadata } }));
  }

  override render() {
    return html`
      <div class="response-container">
        ${this.metadata ? html`
          <div class="response-header">
            <div class="agent-info">
              <div class="agent-icon">${this.metadata.agentName.charAt(0).toUpperCase()}</div>
              <span class="agent-name">${this.metadata.agentName}</span>
            </div>
            <div class="metadata">
              ${this.metadata.model ? html`
                <span class="metadata-item">
                  <span>Model:</span>
                  <span>${this.metadata.model}</span>
                </span>
              ` : ''}
              ${this.metadata.processingTime ? html`
                <span class="metadata-item">
                  <span>${this.metadata.processingTime}ms</span>
                </span>
              ` : ''}
              ${this.metadata.confidence !== undefined ? html`
                <span class="confidence-badge ${this.getConfidenceClass(this.metadata.confidence)}">
                  ${this.getConfidenceLabel(this.metadata.confidence)}
                </span>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <div class="response-content">${this.content}</div>

        ${this.metadata?.sources && this.metadata.sources.length > 0 ? html`
          <div class="response-footer">
            <div class="sources">
              <div class="sources-label">Sources</div>
              <div class="source-list">
                ${this.metadata.sources.map((source, index) => html`
                  <a href="${source}" class="source-link" target="_blank" rel="noopener">
                    Source ${index + 1}
                  </a>
                `)}
              </div>
            </div>
          </div>
        ` : ''}

        ${this.showActions ? html`
          <div class="actions">
            <button class="action-button" @click=${this.handleCopy}>
              Copy
            </button>
            <button class="action-button" @click=${this.handleLike}>
              👍 Helpful
            </button>
            <button class="action-button" @click=${this.handleDislike}>
              👎 Not helpful
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'agent-response': AgentResponse;
  }
}
