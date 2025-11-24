import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ExplanationData {
  title?: string;
  content: string;
  confidence?: number;
  source?: string;
}

@customElement('explain-tooltip')
export class ExplainTooltip extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        position: relative;
        display: inline-flex;
        align-items: center;
      }

      .trigger {
        cursor: help;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .help-icon {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: ${tokens.fontWeight.bold};
        transition: all ${tokens.transition.fast};
      }

      .help-icon:hover {
        background: ${tokens.color.aiGlow};
        transform: scale(1.1);
        box-shadow: 0 0 8px ${tokens.color.aiGlow};
      }

      .tooltip {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background: white;
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.md};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 200px;
        max-width: 320px;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity ${tokens.transition.default}, transform ${tokens.transition.default};
      }

      :host([position='top']) .tooltip {
        bottom: calc(100% + 8px);
        top: auto;
      }

      :host([position='bottom']) .tooltip {
        bottom: auto;
        top: calc(100% + 8px);
      }

      :host([position='left']) .tooltip {
        bottom: auto;
        left: auto;
        right: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      }

      :host([position='right']) .tooltip {
        bottom: auto;
        left: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip.visible {
        opacity: 1;
        pointer-events: auto;
      }

      .tooltip::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: white;
      }

      :host([position='bottom']) .tooltip::before {
        top: auto;
        bottom: 100%;
        border-top-color: transparent;
        border-bottom-color: white;
      }

      .tooltip-header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        margin-bottom: ${tokens.spacing.sm};
        padding-bottom: ${tokens.spacing.xs};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .ai-badge {
        font-size: 10px;
        padding: 2px 6px;
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.sm};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .tooltip-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        flex: 1;
      }

      .tooltip-content {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        line-height: ${tokens.lineHeight.relaxed};
      }

      .tooltip-footer {
        margin-top: ${tokens.spacing.sm};
        padding-top: ${tokens.spacing.sm};
        border-top: 1px solid ${tokens.color.gray100};
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .confidence-badge {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .confidence-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      .confidence-dot.high {
        background: ${tokens.color.success};
      }

      .confidence-dot.medium {
        background: ${tokens.color.warning};
      }

      .confidence-dot.low {
        background: ${tokens.color.danger};
      }
    `
  ];

  @property({ type: String })
  explanation = '';

  @property({ type: String })
  override title: string = '';

  @property({ type: Number })
  confidence = 0;

  @property({ type: String })
  source = '';

  @property({ type: String, reflect: true })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @state()
  private isVisible = false;

  private showTooltip() {
    this.isVisible = true;
  }

  private hideTooltip() {
    this.isVisible = false;
  }

  private getConfidenceLevel(): string {
    if (this.confidence >= 0.8) return 'high';
    if (this.confidence >= 0.5) return 'medium';
    return 'low';
  }

  override render() {
    const confidenceLevel = this.confidence > 0 ? this.getConfidenceLevel() : null;

    return html`
      <div class="trigger" @mouseenter=${this.showTooltip} @mouseleave=${this.hideTooltip}>
        <slot></slot>
        <div class="help-icon">?</div>
      </div>

      <div class="tooltip ${this.isVisible ? 'visible' : ''}">
        ${this.title ? html`
          <div class="tooltip-header">
            <span class="ai-badge">AI</span>
            <span class="tooltip-title">${this.title}</span>
          </div>
        ` : ''}

        <div class="tooltip-content">
          ${this.explanation}
        </div>

        ${this.confidence > 0 || this.source ? html`
          <div class="tooltip-footer">
            ${this.source ? html`<span>Source: ${this.source}</span>` : html`<span></span>`}
            ${confidenceLevel ? html`
              <div class="confidence-badge">
                <div class="confidence-dot ${confidenceLevel}"></div>
                <span>${Math.round(this.confidence * 100)}%</span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'explain-tooltip': ExplainTooltip;
  }
}
