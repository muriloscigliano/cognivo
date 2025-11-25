import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface DataHighlight {
  id: string;
  value: string | number;
  label?: string;
  type: 'increase' | 'decrease' | 'anomaly' | 'insight' | 'warning' | 'success';
  annotation?: string;
  confidence?: number;
  change?: number;
  changeLabel?: string;
}

/**
 * AI Data Highlighter
 *
 * Displays data values with AI-generated annotations and insights.
 * Shows trends, anomalies, and contextual information.
 *
 * @element ai-data-highlighter
 *
 * @fires ai:highlight-click - Fired when highlight is clicked
 * @fires ai:annotation-expand - Fired when annotation is expanded
 */
@customElement('ai-data-highlighter')
export class AiDataHighlighter extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        font-family: ${tokens.fontFamily.primary};
      }

      .highlighter {
        display: inline-flex;
        flex-direction: column;
        gap: 4px;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        position: relative;
        cursor: default;
        transition: all ${tokens.transition.fast};
      }

      :host([clickable]) .highlighter {
        cursor: pointer;
      }

      :host([clickable]) .highlighter:hover {
        border-color: ${tokens.color.aiAccent};
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
      }

      /* Type-based border accents */
      .highlighter.increase {
        border-left: 3px solid #22c55e;
      }

      .highlighter.decrease {
        border-left: 3px solid #ef4444;
      }

      .highlighter.anomaly {
        border-left: 3px solid #f59e0b;
        background: rgba(245, 158, 11, 0.05);
      }

      .highlighter.insight {
        border-left: 3px solid ${tokens.color.aiAccent};
        background: ${tokens.color.aiBackground};
      }

      .highlighter.warning {
        border-left: 3px solid #f59e0b;
      }

      .highlighter.success {
        border-left: 3px solid #22c55e;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
      }

      .label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 2px 6px;
        background: ${tokens.color.aiBackground};
        border-radius: ${tokens.radius.full};
        font-size: 9px;
        color: ${tokens.color.aiAccent};
      }

      .value-row {
        display: flex;
        align-items: baseline;
        gap: ${tokens.spacing.sm};
      }

      .value {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
      }

      .change {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
      }

      .change.positive {
        color: #22c55e;
      }

      .change.negative {
        color: #ef4444;
      }

      .change-icon {
        font-size: 12px;
      }

      /* Annotation tooltip */
      .annotation-trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        background: ${tokens.color.gray100};
        border-radius: 50%;
        font-size: 10px;
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        margin-left: auto;
      }

      .annotation-trigger:hover {
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
      }

      .annotation {
        display: none;
        margin-top: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray600};
        line-height: 1.5;
      }

      .annotation.expanded {
        display: block;
        animation: fadeIn 0.2s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .annotation-header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        margin-bottom: ${tokens.spacing.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
      }

      .confidence {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        margin-top: ${tokens.spacing.xs};
        font-size: 10px;
        color: ${tokens.color.gray500};
      }

      .confidence-bar {
        width: 40px;
        height: 3px;
        background: ${tokens.color.gray200};
        border-radius: 2px;
        overflow: hidden;
      }

      .confidence-fill {
        height: 100%;
        background: ${tokens.color.aiAccent};
        border-radius: 2px;
      }

      /* Type icons */
      .type-icon {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${tokens.color.grayWhite};
        border: 2px solid;
        border-radius: 50%;
        font-size: 10px;
      }

      .type-icon.increase { border-color: #22c55e; }
      .type-icon.decrease { border-color: #ef4444; }
      .type-icon.anomaly { border-color: #f59e0b; }
      .type-icon.insight { border-color: ${tokens.color.aiAccent}; }
      .type-icon.warning { border-color: #f59e0b; }
      .type-icon.success { border-color: #22c55e; }

      /* Size variants */
      :host([size="sm"]) .highlighter {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
      }

      :host([size="sm"]) .value {
        font-size: ${tokens.fontSize.lg};
      }

      :host([size="sm"]) .label {
        font-size: 10px;
      }

      :host([size="lg"]) .highlighter {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
      }

      :host([size="lg"]) .value {
        font-size: 2rem;
      }

      /* Compact mode - inline */
      :host([compact]) .highlighter {
        flex-direction: row;
        align-items: center;
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        gap: ${tokens.spacing.sm};
      }

      :host([compact]) .header {
        order: 2;
      }

      :host([compact]) .value-row {
        order: 1;
      }

      :host([compact]) .value {
        font-size: ${tokens.fontSize.md};
      }

      :host([compact]) .annotation {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        right: 0;
        z-index: 10;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      /* Pulsing animation for anomalies */
      .highlighter.anomaly::after {
        content: '';
        position: absolute;
        inset: -2px;
        border: 2px solid #f59e0b;
        border-radius: ${tokens.radius.lg};
        opacity: 0;
        animation: anomalyPulse 2s infinite;
      }

      @keyframes anomalyPulse {
        0%, 100% { opacity: 0; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.02); }
      }
    `
  ];

  @property({ type: Object }) highlight: DataHighlight = {
    id: '',
    value: '',
    type: 'insight'
  };
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property({ type: Boolean, attribute: 'show-type-icon' }) showTypeIcon = true;
  @property({ type: Boolean, attribute: 'show-ai-badge' }) showAiBadge = true;

  @state() private annotationExpanded = false;

  private getTypeIcon(): string {
    switch (this.highlight.type) {
      case 'increase': return '📈';
      case 'decrease': return '📉';
      case 'anomaly': return '⚠️';
      case 'insight': return '💡';
      case 'warning': return '⚡';
      case 'success': return '✅';
      default: return '📊';
    }
  }

  private formatValue(value: string | number): string {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  }

  private handleClick() {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('ai:highlight-click', {
        detail: { highlight: this.highlight },
        bubbles: true,
        composed: true
      }));
    }
  }

  private toggleAnnotation(e: Event) {
    e.stopPropagation();
    this.annotationExpanded = !this.annotationExpanded;

    if (this.annotationExpanded) {
      this.dispatchEvent(new CustomEvent('ai:annotation-expand', {
        detail: { highlight: this.highlight },
        bubbles: true,
        composed: true
      }));
    }
  }

  override render() {
    const { value, label, type, annotation, confidence, change, changeLabel } = this.highlight;

    return html`
      <div class="highlighter ${type}" @click=${this.handleClick}>
        ${this.showTypeIcon ? html`
          <div class="type-icon ${type}">${this.getTypeIcon()}</div>
        ` : null}

        <div class="header">
          ${label ? html`<div class="label">${label}</div>` : null}
          ${this.showAiBadge ? html`
            <div class="ai-badge">
              <span>✨</span>
              <span>AI</span>
            </div>
          ` : null}
        </div>

        <div class="value-row">
          <span class="value">${this.formatValue(value)}</span>

          ${change !== undefined ? html`
            <span class="change ${change >= 0 ? 'positive' : 'negative'}">
              <span class="change-icon">${change >= 0 ? '↑' : '↓'}</span>
              <span>${Math.abs(change)}%</span>
              ${changeLabel ? html`<span style="color: var(--cg-color-gray-500); font-weight: normal;">${changeLabel}</span>` : null}
            </span>
          ` : null}

          ${annotation ? html`
            <button class="annotation-trigger" @click=${this.toggleAnnotation}>
              ${this.annotationExpanded ? '−' : '?'}
            </button>
          ` : null}
        </div>

        ${annotation ? html`
          <div class="annotation ${this.annotationExpanded ? 'expanded' : ''}">
            <div class="annotation-header">
              <span>✨</span>
              <span>AI Insight</span>
            </div>
            <div>${annotation}</div>
            ${confidence ? html`
              <div class="confidence">
                <span>Confidence:</span>
                <div class="confidence-bar">
                  <div class="confidence-fill" style="width: ${confidence * 100}%"></div>
                </div>
                <span>${Math.round(confidence * 100)}%</span>
              </div>
            ` : null}
          </div>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-data-highlighter': AiDataHighlighter;
  }
}
