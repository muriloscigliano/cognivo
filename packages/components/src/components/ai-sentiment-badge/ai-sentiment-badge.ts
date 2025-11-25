import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export type SentimentType = 'positive' | 'negative' | 'neutral' | 'mixed';

export interface SentimentData {
  type: SentimentType;
  score: number;
  label?: string;
}

/**
 * AI Sentiment Badge
 *
 * Visual indicator for AI-detected sentiment in text or data.
 * Shows sentiment type with optional confidence score.
 *
 * @element ai-sentiment-badge
 *
 * @fires ai:sentiment-click - Fired when badge is clicked
 */
@customElement('ai-sentiment-badge')
export class AiSentimentBadge extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        font-family: ${tokens.fontFamily.primary};
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        cursor: default;
        transition: all ${tokens.transition.fast};
        border: 1px solid transparent;
      }

      :host([clickable]) .badge {
        cursor: pointer;
      }

      :host([clickable]) .badge:hover {
        transform: scale(1.05);
      }

      /* Sentiment colors */
      .badge.positive {
        background: rgba(34, 197, 94, 0.1);
        color: #16a34a;
        border-color: rgba(34, 197, 94, 0.2);
      }

      .badge.negative {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
        border-color: rgba(239, 68, 68, 0.2);
      }

      .badge.neutral {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray600};
        border-color: ${tokens.color.gray200};
      }

      .badge.mixed {
        background: rgba(234, 179, 8, 0.1);
        color: #ca8a04;
        border-color: rgba(234, 179, 8, 0.2);
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }

      .label {
        text-transform: capitalize;
      }

      .score {
        display: inline-flex;
        align-items: center;
        padding: 2px 6px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: ${tokens.radius.full};
        font-size: 10px;
        font-weight: ${tokens.fontWeight.bold};
      }

      .badge.positive .score { background: rgba(34, 197, 94, 0.2); }
      .badge.negative .score { background: rgba(239, 68, 68, 0.2); }
      .badge.neutral .score { background: ${tokens.color.gray200}; }
      .badge.mixed .score { background: rgba(234, 179, 8, 0.2); }

      /* Size variants */
      :host([size="sm"]) .badge {
        padding: 2px 8px;
        font-size: 10px;
        gap: 4px;
      }

      :host([size="sm"]) .icon {
        font-size: 10px;
      }

      :host([size="sm"]) .score {
        padding: 1px 4px;
        font-size: 9px;
      }

      :host([size="lg"]) .badge {
        padding: 6px 14px;
        font-size: ${tokens.fontSize.sm};
        gap: 8px;
      }

      :host([size="lg"]) .icon {
        font-size: 16px;
      }

      :host([size="lg"]) .score {
        padding: 3px 8px;
        font-size: 11px;
      }

      /* Expanded variant shows more detail */
      :host([expanded]) .badge {
        flex-direction: column;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border-radius: ${tokens.radius.md};
        gap: ${tokens.spacing.xs};
        min-width: 80px;
        text-align: center;
      }

      :host([expanded]) .icon {
        font-size: 24px;
      }

      :host([expanded]) .score {
        margin-top: 2px;
      }

      /* AI indicator */
      .ai-dot {
        width: 6px;
        height: 6px;
        background: ${tokens.color.aiAccent};
        border-radius: 50%;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      /* Tooltip */
      .tooltip {
        position: relative;
      }

      .tooltip-text {
        visibility: hidden;
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        padding: 6px 10px;
        background: ${tokens.color.gray900};
        color: white;
        font-size: 11px;
        font-weight: ${tokens.fontWeight.normal};
        border-radius: ${tokens.radius.sm};
        white-space: nowrap;
        opacity: 0;
        transition: all ${tokens.transition.fast};
        z-index: 100;
      }

      .tooltip-text::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: ${tokens.color.gray900};
      }

      .tooltip:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
    `
  ];

  @property({ type: String, reflect: true }) sentiment: SentimentType = 'neutral';
  @property({ type: Number }) score = 0;
  @property({ type: String }) label = '';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property({ type: Boolean, attribute: 'show-score' }) showScore = true;
  @property({ type: Boolean, attribute: 'show-icon' }) showIcon = true;
  @property({ type: Boolean, attribute: 'show-ai-indicator' }) showAiIndicator = false;
  @property({ type: String }) tooltip = '';

  private getSentimentIcon(): string {
    switch (this.sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😔';
      case 'neutral': return '😐';
      case 'mixed': return '🤔';
      default: return '❓';
    }
  }

  private getSentimentLabel(): string {
    if (this.label) return this.label;
    return this.sentiment;
  }

  private handleClick() {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('ai:sentiment-click', {
        detail: {
          sentiment: this.sentiment,
          score: this.score,
          label: this.getSentimentLabel()
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  override render() {
    const badgeContent = html`
      <div class="badge ${this.sentiment}" @click=${this.handleClick}>
        ${this.showIcon ? html`
          <span class="icon">${this.getSentimentIcon()}</span>
        ` : null}

        <span class="label">${this.getSentimentLabel()}</span>

        ${this.showScore && this.score > 0 ? html`
          <span class="score">${Math.round(this.score * 100)}%</span>
        ` : null}

        ${this.showAiIndicator ? html`
          <span class="ai-dot"></span>
        ` : null}
      </div>
    `;

    if (this.tooltip) {
      return html`
        <div class="tooltip">
          ${badgeContent}
          <span class="tooltip-text">${this.tooltip}</span>
        </div>
      `;
    }

    return badgeContent;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-sentiment-badge': AiSentimentBadge;
  }
}
