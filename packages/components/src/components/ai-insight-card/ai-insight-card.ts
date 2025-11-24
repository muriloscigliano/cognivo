import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles, animations } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import { AiInvokeEvent, AiResultEvent, AiErrorEvent } from '../../types/events.js';

// Type definitions (previously from @cognivo/core)
type AiIntent = string;

interface AiResult {
  data?: unknown;
  confidence?: number;
  explanation?: string;
  bullets?: Array<{ text: string; impact?: number }>;
  drivers?: Array<{ name: string; impact: number }>;
}

interface AiClient {
  runIntent: (intent: string, context?: unknown) => Promise<AiResult>;
}
import '../ai-thinking-indicator/ai-thinking-indicator.js';
import '../ai-confidence-badge/ai-confidence-badge.js';

/**
 * AI Insight Card
 *
 * The flagship component of Cognivo. Displays data with AI-powered insights.
 * Supports multiple AI actions (explain, forecast, detect anomalies, etc.)
 *
 * @element ai-insight-card
 *
 * @attr {string} title - Card title
 * @attr {array} ai-actions - Enabled AI actions: ['explain', 'forecast', 'detect_anomaly']
 *
 * @fires ai:invoke - Fired when an AI action is triggered
 * @fires ai:result - Fired when AI returns a result
 * @fires ai:error - Fired when AI encounters an error
 *
 * @slot - Default slot for data content
 * @slot actions - Custom action buttons
 * @slot ai-result - Custom AI result rendering
 *
 * @example
 * ```html
 * <ai-insight-card
 *   title="Monthly Spending"
 *   ai-actions='["explain", "forecast"]'
 * >
 *   <div>Your data visualization here</div>
 * </ai-insight-card>
 * ```
 */
@customElement('ai-insight-card')
export class AiInsightCard extends LitElement {
  static override styles = [
    baseStyles,
    animations,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.lg};
        border-left: 4px solid ${tokens.color.aiAccent};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: box-shadow ${tokens.transition.default};
      }

      :host(:hover) {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .card-header {
        padding: ${tokens.spacing.md};
        border-bottom: 1px solid ${tokens.color.gray100};
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: ${tokens.spacing.md};
      }

      .card-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin: 0;
      }

      .card-content {
        padding: ${tokens.spacing.md};
      }

      .ai-actions {
        display: flex;
        gap: ${tokens.spacing.sm};
        flex-wrap: wrap;
      }

      .ai-button {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.md};
        color: ${tokens.color.aiAccent};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .ai-button:hover {
        background: ${tokens.color.aiHighlight};
        color: white;
        transform: translateY(-1px);
      }

      .ai-button:active {
        transform: translateY(0);
      }

      .ai-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .ai-result {
        margin-top: ${tokens.spacing.md};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.md};
        animation: fadeIn 0.3s ease-in-out;
      }

      .ai-result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${tokens.spacing.sm};
      }

      .ai-result-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .ai-explanation {
        margin: ${tokens.spacing.sm} 0;
        color: ${tokens.color.gray900};
        line-height: 1.6;
      }

      .ai-bullets {
        list-style: none;
        padding: 0;
        margin: ${tokens.spacing.sm} 0;
      }

      .ai-bullets li {
        padding: ${tokens.spacing.xs} 0;
        padding-left: ${tokens.spacing.md};
        position: relative;
      }

      .ai-bullets li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: ${tokens.color.aiAccent};
        font-weight: bold;
      }

      .ai-drivers {
        margin-top: ${tokens.spacing.md};
      }

      .driver {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${tokens.spacing.xs};
        margin: ${tokens.spacing.xs} 0;
        background: white;
        border-radius: ${tokens.radius.sm};
      }

      .driver-factor {
        font-weight: ${tokens.fontWeight.medium};
      }

      .driver-impact {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .loading-state {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.md};
        color: ${tokens.color.gray500};
      }

      .error-state {
        padding: ${tokens.spacing.md};
        background: ${tokens.color.danger};
        color: white;
        border-radius: ${tokens.radius.md};
        margin-top: ${tokens.spacing.md};
      }

      /* Dark theme support */
      :host([data-theme='dark']) {
        background: ${tokens.color.gray900};
      }

      :host([data-theme='dark']) .card-title,
      :host([data-theme='dark']) .ai-result-title,
      :host([data-theme='dark']) .ai-explanation {
        color: ${tokens.color.grayWhite};
      }
    `,
  ];

  /**
   * Card title
   */
  @property({ type: String })
  override title = '';

  /**
   * Static insight text (for demos without AI client)
   */
  @property({ type: String })
  insight = '';

  /**
   * Static confidence score (for demos without AI client)
   */
  @property({ type: Number })
  confidence = 0;

  /**
   * Enabled AI actions
   */
  @property({ type: Array, attribute: 'ai-actions' })
  aiActions: string[] = [];

  /**
   * Data to analyze (passed as property, not attribute)
   */
  @property({ type: Array })
  data: unknown[] = [];

  /**
   * Metadata for AI context
   */
  @property({ type: Object })
  meta: Record<string, unknown> = {};

  /**
   * AI client instance (injected via property or context)
   */
  @property({ attribute: false })
  aiClient?: any;

  /**
   * Current AI result
   */
  @state()
  private result: AiResult | null = null;

  /**
   * Loading state
   */
  @state()
  private loading = false;

  /**
   * Error state
   */
  @state()
  private error: Error | null = null;

  /**
   * Current active intent
   */
  @state()
  private activeIntent: AiIntent | null = null;

  /**
   * Run an AI intent
   */
  private async runIntent(intent: AiIntent) {
    if (!this.aiClient) {
      this.error = new Error('No AI client provided. Set the aiClient property.');
      return;
    }

    if (this.loading) {
      return; // Already running
    }

    this.loading = true;
    this.error = null;
    this.activeIntent = intent;

    // Dispatch invoke event
    this.dispatchEvent(
      new AiInvokeEvent({
        intent,
        context: { dataset: this.data, meta: this.meta },
      })
    );

    try {
      const result = await this.aiClient.runIntent(intent, {
        dataset: this.data,
        meta: this.meta,
      });

      this.result = result;

      // Dispatch result event
      this.dispatchEvent(
        new AiResultEvent({
          intent,
          result,
        })
      );
    } catch (err) {
      this.error = err as Error;

      // Dispatch error event
      this.dispatchEvent(
        new AiErrorEvent({
          intent,
          error: err as Error,
        })
      );
    } finally {
      this.loading = false;
    }
  }

  /**
   * Get label for intent
   */
  private getIntentLabel(intent: string): string {
    const labels: Record<string, string> = {
      explain: 'Explain',
      forecast: 'Forecast',
      detect_anomaly: 'Detect Anomalies',
      summarize: 'Summarize',
      classify: 'Classify',
      optimize: 'Optimize',
      compare: 'Compare',
      cluster: 'Cluster',
    };
    return labels[intent] || intent;
  }

  override render() {
    return html`
      <div class="card">
        ${this.title
          ? html`
              <div class="card-header">
                <h3 class="card-title">${this.title}</h3>
              </div>
            `
          : null}

        <div class="card-content">
          <!-- Data content slot -->
          <slot></slot>

          <!-- AI Actions -->
          ${this.aiActions.length > 0
            ? html`
                <div class="ai-actions">
                  ${this.aiActions.map(
                    (action) => html`
                      <button
                        class="ai-button"
                        @click=${() => this.runIntent(action as AiIntent)}
                        ?disabled=${this.loading}
                      >
                        ✨ ${this.getIntentLabel(action)}
                      </button>
                    `
                  )}
                </div>
              `
            : null}

          <!-- Loading State -->
          ${this.loading
            ? html`
                <div class="loading-state">
                  <ai-thinking-indicator size="md"></ai-thinking-indicator>
                  <span>AI is analyzing...</span>
                </div>
              `
            : null}

          <!-- Error State -->
          ${this.error
            ? html`
                <div class="error-state">
                  <strong>Error:</strong> ${this.error.message}
                </div>
              `
            : null}

          <!-- Static Insight (for demos) -->
          ${this.insight && !this.result && !this.loading
            ? html`
                <div class="ai-result">
                  <div class="ai-result-header">
                    <span class="ai-result-title">AI Insights</span>
                    ${this.confidence
                      ? html`
                          <ai-confidence-badge
                            score=${this.confidence}
                            show-percentage
                          ></ai-confidence-badge>
                        `
                      : null}
                  </div>
                  <p class="ai-explanation">${this.insight}</p>
                </div>
              `
            : null}

          <!-- AI Result (dynamic) -->
          ${this.result && !this.loading
            ? html`
                <div class="ai-result">
                  <slot name="ai-result" .result=${this.result}>
                    <div class="ai-result-header">
                      <span class="ai-result-title">AI Insights</span>
                      ${this.result.confidence
                        ? html`
                            <ai-confidence-badge
                              score=${this.result.confidence}
                              show-percentage
                            ></ai-confidence-badge>
                          `
                        : null}
                    </div>

                    ${this.result.explanation
                      ? html`<p class="ai-explanation">${this.result.explanation}</p>`
                      : null}

                    ${this.result.bullets && this.result.bullets.length > 0
                      ? html`
                          <ul class="ai-bullets">
                            ${this.result.bullets.map((bullet: any) => html`<li>${bullet}</li>`)}
                          </ul>
                        `
                      : null}

                    ${this.result.drivers && this.result.drivers.length > 0
                      ? html`
                          <div class="ai-drivers">
                            <strong>Key Drivers:</strong>
                            ${this.result.drivers.map(
                              (driver: any) => html`
                                <div class="driver">
                                  <span class="driver-factor">${driver.factor}</span>
                                  <span class="driver-impact">
                                    ${driver.impact > 0 ? '+' : ''}${driver.impact}% impact
                                  </span>
                                </div>
                              `
                            )}
                          </div>
                        `
                      : null}
                  </slot>
                </div>
              `
            : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-insight-card': AiInsightCard;
  }
}
