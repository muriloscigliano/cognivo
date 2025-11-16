import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles, animations } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * AI Thinking Indicator
 *
 * Animated dots indicator for AI processing states.
 * Shows pulsing animation in AI accent color.
 *
 * @element ai-thinking-indicator
 *
 * @attr {string} size - Size variant: 'sm' | 'md' | 'lg'
 * @attr {string} label - Accessible label for screen readers
 *
 * @example
 * ```html
 * <ai-thinking-indicator size="md"></ai-thinking-indicator>
 * <ai-thinking-indicator size="lg" label="AI is analyzing your data"></ai-thinking-indicator>
 * ```
 */
@customElement('ai-thinking-indicator')
export class AiThinkingIndicator extends LitElement {
  static override styles = [
    baseStyles,
    animations,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--gap, ${tokens.spacing.xs});
      }

      .container {
        display: inline-flex;
        align-items: center;
        gap: inherit;
        padding: ${tokens.spacing.xs};
      }

      .dot {
        background: ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.full};
        width: var(--dot-size, 8px);
        height: var(--dot-size, 8px);
        animation: pulse 1.4s ease-in-out infinite;
      }

      .dot:nth-child(1) {
        animation-delay: 0s;
      }

      .dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      /* Size variants */
      :host([size='sm']) {
        --dot-size: 6px;
        --gap: 4px;
      }

      :host([size='md']) {
        --dot-size: 8px;
        --gap: 6px;
      }

      :host([size='lg']) {
        --dot-size: 10px;
        --gap: 8px;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `,
  ];

  /**
   * Size of the indicator
   * @type {'sm' | 'md' | 'lg'}
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Accessible label for screen readers
   */
  @property({ type: String })
  label = 'AI is thinking';

  override render() {
    return html`
      <div class="container" role="status" aria-live="polite">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <span class="sr-only">${this.label}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-thinking-indicator': AiThinkingIndicator;
  }
}
