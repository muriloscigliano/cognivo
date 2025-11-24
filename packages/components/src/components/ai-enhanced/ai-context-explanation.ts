import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ContextExplanationData {
  title: string;
  explanation: string;
  examples?: string[];
  relatedConcepts?: string[];
}

@customElement('ai-context-explanation')
export class AiContextExplanation extends LitElement {
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

      .explanation {
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        line-height: 1.7;
        margin-bottom: ${tokens.spacing.lg};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
      }

      .section {
        margin-bottom: ${tokens.spacing.md};
      }

      .section-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.sm};
      }

      .examples-list,
      .concepts-list {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .example-item,
      .concept-item {
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border-left: 3px solid ${tokens.color.primaryMain};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
      }

      .concept-item {
        display: inline-flex;
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryDark};
        border: 1px solid ${tokens.color.primaryMain};
        border-left: none;
        border-radius: ${tokens.radius.full};
        font-weight: ${tokens.fontWeight.medium};
      }

      .concepts-list {
        flex-direction: row;
        flex-wrap: wrap;
      }
    `
  ];

  @property({ type: Object }) data: ContextExplanationData | null = null;

  override render() {
    if (!this.data) {
      return html`<slot></slot>`;
    }

    return html`
      <div class="header">
        <div class="title">${this.data.title}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI Explain</span>
        </div>
      </div>

      <div class="explanation">${this.data.explanation}</div>

      ${this.data.examples && this.data.examples.length > 0 ? html`
        <div class="section">
          <div class="section-title">Examples</div>
          <div class="examples-list">
            ${this.data.examples.map(example => html`
              <div class="example-item">${example}</div>
            `)}
          </div>
        </div>
      ` : ''}

      ${this.data.relatedConcepts && this.data.relatedConcepts.length > 0 ? html`
        <div class="section">
          <div class="section-title">Related Concepts</div>
          <div class="concepts-list">
            ${this.data.relatedConcepts.map(concept => html`
              <div class="concept-item">${concept}</div>
            `)}
          </div>
        </div>
      ` : ''}

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-context-explanation': AiContextExplanation;
  }
}
