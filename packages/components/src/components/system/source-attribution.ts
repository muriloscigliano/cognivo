import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface SourceData {
  title: string;
  url?: string;
  author?: string;
  date?: string;
  confidence?: number;
  type?: 'document' | 'web' | 'database' | 'api';
}

@customElement('source-attribution')
export class SourceAttribution extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-left: 3px solid ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
        transition: all ${tokens.transition.default};
      }

      :host(:hover) {
        background: ${tokens.color.aiBackground};
        box-shadow: 0 2px 8px rgba(0, 100, 255, 0.1);
      }

      .attribution-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        justify-content: space-between;
      }

      .title-section {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        flex: 1;
        min-width: 0;
      }

      .source-icon {
        font-size: 16px;
        flex-shrink: 0;
      }

      .title {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .title-link {
        color: ${tokens.color.aiAccent};
        text-decoration: none;
        transition: color ${tokens.transition.fast};
      }

      .title-link:hover {
        color: ${tokens.color.aiGlow};
        text-decoration: underline;
      }

      .metadata {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.sm};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.xs};
      }

      .metadata-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .metadata-icon {
        font-size: 12px;
      }

      .confidence-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        background: ${tokens.color.gray100};
      }

      .confidence-badge.high {
        background: rgba(34, 197, 94, 0.1);
        color: ${tokens.color.success};
      }

      .confidence-badge.medium {
        background: rgba(234, 179, 8, 0.1);
        color: ${tokens.color.warning};
      }

      .confidence-badge.low {
        background: rgba(239, 68, 68, 0.1);
        color: ${tokens.color.danger};
      }

      .type-badge {
        padding: 2px 6px;
        border-radius: ${tokens.radius.sm};
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      :host([compact]) {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
      }

      :host([compact]) .metadata {
        display: none;
      }

      :host([compact]) .attribution-container {
        gap: 0;
      }
    `
  ];

  @property({ type: String })
  override title: string = '';

  @property({ type: String })
  url = '';

  @property({ type: String })
  author = '';

  @property({ type: String })
  date = '';

  @property({ type: Number })
  confidence = 0;

  @property({ type: String })
  type: 'document' | 'web' | 'database' | 'api' = 'web';

  @property({ type: Boolean, reflect: true })
  compact = false;

  private getSourceIcon(): string {
    switch (this.type) {
      case 'document':
        return '📄';
      case 'web':
        return '🌐';
      case 'database':
        return '💾';
      case 'api':
        return '🔌';
      default:
        return '📎';
    }
  }

  private getConfidenceLevel(): string {
    if (this.confidence >= 0.8) return 'high';
    if (this.confidence >= 0.5) return 'medium';
    return 'low';
  }

  private handleClick() {
    if (this.url) {
      this.dispatchEvent(new CustomEvent('source-click', {
        detail: { url: this.url, title: this.title },
        bubbles: true,
        composed: true
      }));
    }
  }

  override render() {
    const confidenceLevel = this.confidence > 0 ? this.getConfidenceLevel() : null;

    return html`
      <div class="attribution-container" @click=${this.handleClick}>
        <div class="header">
          <div class="title-section">
            <span class="source-icon">${this.getSourceIcon()}</span>
            ${this.url ? html`
              <a href="${this.url}" class="title-link" target="_blank" rel="noopener noreferrer">
                ${this.title}
              </a>
            ` : html`
              <span class="title">${this.title}</span>
            `}
          </div>
          ${this.type ? html`<span class="type-badge">${this.type}</span>` : ''}
        </div>

        ${!this.compact ? html`
          <div class="metadata">
            ${this.author ? html`
              <span class="metadata-item">
                <span class="metadata-icon">👤</span>
                <span>${this.author}</span>
              </span>
            ` : ''}
            ${this.date ? html`
              <span class="metadata-item">
                <span class="metadata-icon">📅</span>
                <span>${this.date}</span>
              </span>
            ` : ''}
            ${confidenceLevel ? html`
              <span class="confidence-badge ${confidenceLevel}">
                <span>${Math.round(this.confidence * 100)}% confidence</span>
              </span>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'source-attribution': SourceAttribution;
  }
}
