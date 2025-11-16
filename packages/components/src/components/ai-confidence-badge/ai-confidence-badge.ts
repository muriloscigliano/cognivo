import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * AI Confidence Badge
 *
 * Displays AI confidence score with visual indicator.
 * Color-coded based on confidence level.
 *
 * @element ai-confidence-badge
 *
 * @attr {number} score - Confidence score (0-1)
 * @attr {string} size - Size variant: 'sm' | 'md' | 'lg'
 * @attr {boolean} show-percentage - Show percentage text
 *
 * @example
 * ```html
 * <ai-confidence-badge score="0.95"></ai-confidence-badge>
 * <ai-confidence-badge score="0.65" size="lg" show-percentage></ai-confidence-badge>
 * ```
 */
@customElement('ai-confidence-badge')
export class AiConfidenceBadge extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: var(--badge-padding, 4px 8px);
        border-radius: ${tokens.radius.full};
        font-size: var(--badge-font-size, ${tokens.fontSize.xs});
        font-weight: ${tokens.fontWeight.medium};
        transition: all ${tokens.transition.default};
      }

      .badge.high {
        background: ${tokens.color.success};
        color: white;
      }

      .badge.medium {
        background: ${tokens.color.warning};
        color: white;
      }

      .badge.low {
        background: ${tokens.color.danger};
        color: white;
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: ${tokens.radius.full};
        background: currentColor;
      }

      /* Size variants */
      :host([size='sm']) {
        --badge-padding: 2px 6px;
        --badge-font-size: 10px;
      }

      :host([size='md']) {
        --badge-padding: 4px 8px;
        --badge-font-size: ${tokens.fontSize.xs};
      }

      :host([size='lg']) {
        --badge-padding: 6px 12px;
        --badge-font-size: ${tokens.fontSize.sm};
      }

      .percentage {
        font-variant-numeric: tabular-nums;
      }
    `,
  ];

  /**
   * Confidence score (0 to 1)
   */
  @property({ type: Number })
  score = 0;

  /**
   * Size variant
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Show percentage text
   */
  @property({ type: Boolean, attribute: 'show-percentage' })
  showPercentage = false;

  /**
   * Get confidence level based on score
   */
  private get level(): 'high' | 'medium' | 'low' {
    if (this.score >= 0.8) return 'high';
    if (this.score >= 0.5) return 'medium';
    return 'low';
  }

  /**
   * Get label text based on level
   */
  private get label(): string {
    switch (this.level) {
      case 'high':
        return 'High confidence';
      case 'medium':
        return 'Medium confidence';
      case 'low':
        return 'Low confidence';
    }
  }

  override render() {
    const percentage = Math.round(this.score * 100);

    const classes = {
      badge: true,
      [this.level]: true,
    };

    return html`
      <div class=${classMap(classes)} role="status" aria-label="${this.label}">
        <span class="dot"></span>
        ${this.showPercentage
          ? html`<span class="percentage">${percentage}%</span>`
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-confidence-badge': AiConfidenceBadge;
  }
}
