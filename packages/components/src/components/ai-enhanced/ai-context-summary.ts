import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ContextSummaryData {
  title: string;
  summary: string;
  keyPoints: string[];
  confidence?: number;
}

@customElement('ai-context-summary')
export class AiContextSummary extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.md};
      }

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: linear-gradient(135deg, ${tokens.color.primaryMain} 0%, ${tokens.color.primaryDark} 100%);
        color: white;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .summary {
        padding: ${tokens.spacing.md};
        background: linear-gradient(135deg, ${tokens.color.primaryLight}20 0%, ${tokens.color.gray50} 100%);
        border-radius: ${tokens.radius.md};
        border-left: 4px solid ${tokens.color.primaryMain};
        margin-bottom: ${tokens.spacing.md};
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        line-height: 1.6;
      }

      .key-points {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.md};
      }

      .key-point {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        line-height: 1.5;
      }

      .point-icon {
        color: ${tokens.color.primaryMain};
      }

      .confidence-section {
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .confidence-label {
        display: flex;
        justify-content: space-between;
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin-bottom: ${tokens.spacing.xs};
      }

      .confidence-track {
        height: 6px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        overflow: hidden;
      }

      .confidence-fill {
        height: 100%;
        background: ${tokens.color.primaryMain};
        border-radius: ${tokens.radius.full};
      }
    `
  ];

  @property({ type: Object }) data: ContextSummaryData | null = null;

  override render() {
    if (!this.data) {
      return html`<slot></slot>`;
    }

    return html`
      <div class="header">
        <div class="title">${this.data.title}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI Summary</span>
        </div>
      </div>

      <div class="summary">${this.data.summary}</div>

      <div class="key-points">
        ${this.data.keyPoints.map(point => html`
          <div class="key-point">
            <span class="point-icon">→</span>
            <span>${point}</span>
          </div>
        `)}
      </div>

      ${this.data.confidence ? html`
        <div class="confidence-section">
          <div class="confidence-label">
            <span>Summary Confidence</span>
            <span>${Math.round(this.data.confidence * 100)}%</span>
          </div>
          <div class="confidence-track">
            <div class="confidence-fill" style="width: ${this.data.confidence * 100}%"></div>
          </div>
        </div>
      ` : ''}

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-context-summary': AiContextSummary;
  }
}
