import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import '../ai-action-button/ai-action-button.js';

/**
 * AI Action Group
 *
 * Groups multiple AI action buttons together with consistent spacing and layout.
 * Supports horizontal/vertical layouts and overflow handling.
 *
 * @element ai-action-group
 *
 * @attr {string} layout - Layout direction: 'horizontal' | 'vertical'
 * @attr {string} size - Button size: 'sm' | 'md' | 'lg'
 * @attr {string} variant - Button variant: 'primary' | 'secondary' | 'ghost'
 * @attr {boolean} wrap - Allow buttons to wrap
 *
 * @fires ai:action-selected - Fired when an action is triggered
 *
 * @example
 * ```html
 * <ai-action-group
 *   .actions=${['explain', 'forecast', 'detect_anomaly']}
 *   layout="horizontal"
 * ></ai-action-group>
 * ```
 */
@customElement('ai-action-group')
export class AiActionGroup extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .group {
        display: flex;
        gap: var(--group-gap, ${tokens.spacing.sm});
      }

      :host([layout='horizontal']) .group {
        flex-direction: row;
        align-items: center;
      }

      :host([layout='vertical']) .group {
        flex-direction: column;
        align-items: stretch;
      }

      :host([wrap]) .group {
        flex-wrap: wrap;
      }

      /* Size variants */
      :host([size='sm']) {
        --group-gap: 4px;
      }

      :host([size='md']) {
        --group-gap: ${tokens.spacing.sm};
      }

      :host([size='lg']) {
        --group-gap: ${tokens.spacing.md};
      }

      /* Label */
      .group-label {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
        margin-bottom: ${tokens.spacing.xs};
      }

      /* Overflow indicator */
      .overflow {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        background: ${tokens.color.gray50};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .overflow:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }

      /* Responsive */
      @media (max-width: 640px) {
        :host([layout='horizontal']) .group {
          flex-direction: column;
        }
      }

      /* Dark mode */
      @media (prefers-color-scheme: dark) {
        .group-label {
          color: #9ca3af;
        }

        .overflow {
          background: #374151;
          border-color: #4b5563;
          color: #d1d5db;
        }

        .overflow:hover {
          background: #4b5563;
          color: #f9fafb;
        }
      }
    `,
  ];

  /**
   * Array of AI action intents
   */
  @property({ type: Array })
  actions: string[] = [];

  /**
   * Layout direction
   */
  @property({ type: String, reflect: true })
  layout: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Button size
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Button variant
   */
  @property({ type: String })
  variant: 'primary' | 'secondary' | 'ghost' = 'secondary';

  /**
   * Allow wrapping
   */
  @property({ type: Boolean, reflect: true })
  wrap = false;

  /**
   * Group label
   */
  @property({ type: String })
  label = '';

  /**
   * Max actions to show (rest in overflow)
   */
  @property({ type: Number, attribute: 'max-actions' })
  maxActions = 8;

  /**
   * Handle action triggered
   */
  private handleAction(action: string) {
    this.dispatchEvent(
      new CustomEvent('ai:action-selected', {
        detail: {
          action,
          timestamp: Date.now(),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Get visible actions
   */
  private get visibleActions(): string[] {
    return this.actions.slice(0, this.maxActions);
  }

  /**
   * Get overflow count
   */
  private get overflowCount(): number {
    return Math.max(0, this.actions.length - this.maxActions);
  }

  /**
   * Get action label
   */
  private getActionLabel(action: string): string {
    const labelMap: Record<string, string> = {
      explain: 'Explain',
      summarize: 'Summarize',
      forecast: 'Forecast',
      detect_anomaly: 'Detect Anomaly',
      classify: 'Classify',
      optimize: 'Optimize',
      compare: 'Compare',
      cluster: 'Cluster',
    };
    return labelMap[action] || action;
  }

  override render() {
    return html`
      ${this.label ? html`<div class="group-label">${this.label}</div>` : null}

      <div class="group">
        ${repeat(
          this.visibleActions,
          (action) => action,
          (action) => html`
            <ai-action-button
              action=${action}
              size=${this.size}
              variant=${this.variant}
              @ai:action-triggered=${() => this.handleAction(action)}
            >
              ${this.getActionLabel(action)}
            </ai-action-button>
          `
        )}
        ${this.overflowCount > 0
          ? html`
              <div class="overflow" @click=${() => this.dispatchEvent(new CustomEvent('ai:overflow-clicked'))}>
                +${this.overflowCount} more
              </div>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-action-group': AiActionGroup;
  }
}
