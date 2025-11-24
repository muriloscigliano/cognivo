import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AutoTagData {
  tag: string;
  confidence: number;
  source?: string;
}

@customElement('auto-tag-badge')
export class AutoTagBadge extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: 4px 10px;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.gray900};
        border: 1px solid ${tokens.color.aiBorder};
        transition: all ${tokens.transition.default};
      }

      :host(:hover) {
        background: ${tokens.color.aiHighlight};
        box-shadow: 0 2px 8px rgba(0, 100, 255, 0.15);
        transform: translateY(-1px);
      }

      .tag-content {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .ai-icon {
        width: 12px;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: ${tokens.color.aiAccent};
      }

      .confidence-indicator {
        width: 4px;
        height: 12px;
        border-radius: 2px;
        background: ${tokens.color.gray100};
        position: relative;
        overflow: hidden;
      }

      .confidence-fill {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: ${tokens.color.success};
        transition: height ${tokens.transition.default};
      }

      .confidence-fill.high {
        background: ${tokens.color.success};
      }

      .confidence-fill.medium {
        background: ${tokens.color.warning};
      }

      .confidence-fill.low {
        background: ${tokens.color.danger};
      }

      .remove-btn {
        margin-left: 2px;
        padding: 0;
        border: none;
        background: none;
        color: ${tokens.color.gray500};
        cursor: pointer;
        font-size: 12px;
        line-height: 1;
        transition: color ${tokens.transition.fast};
      }

      .remove-btn:hover {
        color: ${tokens.color.danger};
      }
    `
  ];

  @property({ type: String })
  tag = '';

  @property({ type: Number })
  confidence = 0;

  @property({ type: String })
  source = '';

  @property({ type: Boolean })
  removable = false;

  private getConfidenceLevel(): string {
    if (this.confidence >= 0.8) return 'high';
    if (this.confidence >= 0.5) return 'medium';
    return 'low';
  }

  private handleRemove(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('tag-remove', {
      detail: { tag: this.tag },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    const confidencePercent = Math.round(this.confidence * 100);
    const confidenceLevel = this.getConfidenceLevel();

    return html`
      <div class="tag-content">
        <span class="ai-icon" title="AI-generated tag">✨</span>
        <span>${this.tag}</span>
        <div class="confidence-indicator" title="Confidence: ${confidencePercent}%">
          <div
            class="confidence-fill ${confidenceLevel}"
            style="height: ${confidencePercent}%"
          ></div>
        </div>
        ${this.removable ? html`
          <button
            class="remove-btn"
            @click=${this.handleRemove}
            aria-label="Remove tag"
          >×</button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auto-tag-badge': AutoTagBadge;
  }
}
