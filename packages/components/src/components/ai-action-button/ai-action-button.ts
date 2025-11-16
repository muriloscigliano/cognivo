import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';


/**
 * AI Action Button
 *
 * Interactive button for triggering AI intents.
 * Supports all 8 AI intents with visual states and loading indicators.
 *
 * @element ai-action-button
 *
 * @attr {string} action - AI intent to trigger (explain, forecast, etc.)
 * @attr {string} size - Size variant: 'sm' | 'md' | 'lg'
 * @attr {string} variant - Visual variant: 'primary' | 'secondary' | 'ghost'
 * @attr {boolean} disabled - Disable the button
 * @attr {boolean} loading - Show loading state
 * @attr {string} icon - Icon name to display (optional)
 * @attr {string} tooltip - Tooltip text explaining the action
 *
 * @fires ai:action-triggered - Fired when button is clicked
 *
 * @example
 * ```html
 * <ai-action-button action="explain">Explain</ai-action-button>
 * <ai-action-button action="forecast" size="lg" icon="📊">Forecast</ai-action-button>
 * <ai-action-button action="detect_anomaly" loading>Detecting...</ai-action-button>
 * ```
 */
@customElement('ai-action-button')
export class AiActionButton extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: ${tokens.spacing.xs};
        padding: var(--button-padding, 8px 16px);
        font-family: ${tokens.fontFamily.primary};
        font-size: var(--button-font-size, ${tokens.fontSize.sm});
        font-weight: ${tokens.fontWeight.medium};
        line-height: 1.5;
        border: 1px solid transparent;
        border-radius: ${tokens.radius.md};
        cursor: pointer;
        transition: all ${tokens.transition.default};
        user-select: none;
        position: relative;
        overflow: hidden;
      }

      /* Focus styles for accessibility */
      button:focus-visible {
        outline: 2px solid ${tokens.color.aiAccent};
        outline-offset: 2px;
      }

      /* Primary variant (default) */
      .primary {
        background: ${tokens.color.aiAccent};
        color: white;
        border-color: ${tokens.color.aiAccent};
      }

      .primary:hover:not(:disabled) {
        background: ${tokens.color.aiAccent};
        filter: brightness(1.1);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
      }

      .primary:active:not(:disabled) {
        transform: translateY(1px);
      }

      /* Secondary variant */
      .secondary {
        background: transparent;
        color: ${tokens.color.aiAccent};
        border-color: ${tokens.color.aiAccent};
      }

      .secondary:hover:not(:disabled) {
        background: ${tokens.color.aiAccent}10;
        border-color: ${tokens.color.aiAccent};
      }

      .secondary:active:not(:disabled) {
        background: ${tokens.color.aiAccent}20;
      }

      /* Ghost variant */
      .ghost {
        background: transparent;
        color: ${tokens.color.aiAccent};
        border-color: transparent;
      }

      .ghost:hover:not(:disabled) {
        background: ${tokens.color.aiAccent}10;
      }

      .ghost:active:not(:disabled) {
        background: ${tokens.color.aiAccent}20;
      }

      /* Disabled state */
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        filter: grayscale(0.3);
      }

      /* Loading state */
      .loading {
        position: relative;
        color: transparent;
        pointer-events: none;
      }

      .loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        border: 2px solid currentColor;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 0.6s linear infinite;
        color: white;
      }

      .secondary.loading::after,
      .ghost.loading::after {
        color: ${tokens.color.aiAccent};
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Size variants */
      :host([size='sm']) {
        --button-padding: 6px 12px;
        --button-font-size: ${tokens.fontSize.xs};
      }

      :host([size='md']) {
        --button-padding: 8px 16px;
        --button-font-size: ${tokens.fontSize.sm};
      }

      :host([size='lg']) {
        --button-padding: 12px 24px;
        --button-font-size: ${tokens.fontSize.base};
      }

      /* Icon */
      .icon {
        display: inline-flex;
        align-items: center;
        font-size: 1.2em;
      }

      /* Tooltip (native title attribute used for now) */
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
   * AI intent to trigger when clicked
   */
  @property({ type: String })
  action: string = 'explain';

  /**
   * Size variant
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Visual variant
   */
  @property({ type: String, reflect: true })
  variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Icon to display (emoji or icon name)
   */
  @property({ type: String })
  icon = '';

  /**
   * Tooltip text
   */
  @property({ type: String })
  tooltip = '';

  /**
   * Get default icon for intent
   */
  private getDefaultIcon(): string {
    const iconMap: Record<string, string> = {
      explain: '💡',
      summarize: '📝',
      forecast: '📊',
      detect_anomaly: '🔍',
      classify: '🏷️',
      optimize: '⚡',
      compare: '⚖️',
      cluster: '🗂️',
    };
    return iconMap[this.action] || '✨';
  }

  /**
   * Get default tooltip for intent
   */
  private getDefaultTooltip(): string {
    const tooltipMap: Record<string, string> = {
      explain: 'Get AI explanation of data trends',
      summarize: 'Summarize data into key points',
      forecast: 'Predict future values',
      detect_anomaly: 'Find unusual patterns or outliers',
      classify: 'Auto-categorize or label items',
      optimize: 'Suggest improvements or optimizations',
      compare: 'Compare datasets or time periods',
      cluster: 'Group similar items together',
    };
    return tooltipMap[this.action] || 'Trigger AI action';
  }

  /**
   * Handle button click
   */
  private handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      return;
    }

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('ai:action-triggered', {
        detail: {
          action: this.action,
          timestamp: Date.now(),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle keyboard events
   */
  private handleKeyDown(e: KeyboardEvent) {
    // Enter and Space trigger the button
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleClick(e);
    }
  }

  override render() {
    const displayIcon = this.icon || this.getDefaultIcon();
    const displayTooltip = this.tooltip || this.getDefaultTooltip();

    const classes = {
      [this.variant]: true,
      loading: this.loading,
    };

    return html`
      <button
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        title=${displayTooltip}
        aria-label=${displayTooltip}
        aria-busy=${this.loading}
        type="button"
      >
        ${displayIcon ? html`<span class="icon">${displayIcon}</span>` : null}
        <span class="label"><slot></slot></span>
        ${this.loading
          ? html`<span class="sr-only">Processing...</span>`
          : null}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-action-button': AiActionButton;
  }
}
