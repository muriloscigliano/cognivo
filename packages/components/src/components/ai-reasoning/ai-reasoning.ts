import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ReasoningStep {
  id: string;
  type: 'thought' | 'search' | 'tool' | 'analysis' | 'decision' | 'source';
  title: string;
  content: string;
  timestamp?: string;
  duration?: number;
  status?: 'pending' | 'active' | 'complete' | 'error';
  sources?: { title: string; url?: string }[];
  metadata?: Record<string, unknown>;
}

/**
 * AI Reasoning
 *
 * Shape of AI Pattern: Trust Marker > Stream of Thought / Footprints
 *
 * Reveals the AI's logic, thought process, tool use, and decisions
 * for oversight and auditability. Lets users trace steps from input to output.
 *
 * @element ai-reasoning
 *
 * @fires ai:step-click - Fired when a reasoning step is clicked
 * @fires ai:source-click - Fired when a source is clicked
 */
@customElement('ai-reasoning')
export class AiReasoning extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .container {
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.xl};
        overflow: hidden;
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border-bottom: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
        cursor: pointer;
      }

      .header:hover {
        background: ${tokens.color.gray100};
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray700};
      }

      .step-count {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .toggle-icon {
        font-size: 12px;
        color: ${tokens.color.gray400};
        transition: transform ${tokens.transition.fast};
      }

      .toggle-icon.expanded {
        transform: rotate(180deg);
      }

      /* Timeline */
      .timeline {
        padding: ${tokens.spacing.md};
        display: none;
      }

      .timeline.expanded {
        display: block;
      }

      .step {
        display: flex;
        gap: ${tokens.spacing.md};
        position: relative;
        padding-bottom: ${tokens.spacing.md};
      }

      .step:last-child {
        padding-bottom: 0;
      }

      /* Timeline line */
      .step::before {
        content: '';
        position: absolute;
        left: 15px;
        top: 32px;
        bottom: 0;
        width: 2px;
        background: ${tokens.color.gray200};
      }

      .step:last-child::before {
        display: none;
      }

      /* Step icon */
      .step-icon {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${tokens.color.gray100};
        border: 2px solid ${tokens.color.grayWhite};
        border-radius: 50%;
        font-size: 14px;
        flex-shrink: 0;
        z-index: 1;
        transition: all ${tokens.transition.fast};
      }

      .step.thought .step-icon { background: rgba(139, 92, 246, 0.15); }
      .step.search .step-icon { background: rgba(59, 130, 246, 0.15); }
      .step.tool .step-icon { background: rgba(16, 185, 129, 0.15); }
      .step.analysis .step-icon { background: rgba(245, 158, 11, 0.15); }
      .step.decision .step-icon { background: rgba(239, 68, 68, 0.15); }
      .step.source .step-icon { background: rgba(107, 114, 128, 0.15); }

      /* Active/pending states */
      .step.active .step-icon {
        animation: pulse-icon 2s infinite;
      }

      @keyframes pulse-icon {
        0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
        50% { box-shadow: 0 0 0 8px rgba(139, 92, 246, 0); }
      }

      .step.pending .step-icon {
        opacity: 0.5;
      }

      .step.error .step-icon {
        background: rgba(239, 68, 68, 0.2);
        border-color: #ef4444;
      }

      /* Step content */
      .step-content {
        flex: 1;
        min-width: 0;
      }

      .step-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.xs};
      }

      .step-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray800};
      }

      .step-meta {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .step-duration {
        display: inline-flex;
        align-items: center;
        gap: 2px;
      }

      .step-body {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray600};
        line-height: 1.6;
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        margin-top: ${tokens.spacing.xs};
      }

      .step.active .step-body {
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
      }

      /* Sources */
      .sources {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.xs};
        margin-top: ${tokens.spacing.sm};
      }

      .source-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray600};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        text-decoration: none;
      }

      .source-chip:hover {
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
      }

      /* Compact mode */
      :host([compact]) .step-body {
        display: none;
      }

      :host([compact]) .step {
        padding-bottom: ${tokens.spacing.sm};
      }

      /* Streaming animation */
      .streaming-text {
        display: inline;
      }

      .streaming-cursor {
        display: inline-block;
        width: 8px;
        height: 14px;
        background: ${tokens.color.aiAccent};
        margin-left: 2px;
        animation: blink 1s infinite;
        vertical-align: text-bottom;
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      /* Summary footer */
      .summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .summary-stats {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
      }

      .stat {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    `
  ];

  @property({ type: Array }) steps: ReasoningStep[] = [];
  @property({ type: String }) title = 'AI Reasoning';
  @property({ type: Boolean }) streaming = false;
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Boolean, attribute: 'default-expanded' }) defaultExpanded = false;

  @state() private expanded = false;

  override connectedCallback() {
    super.connectedCallback();
    this.expanded = this.defaultExpanded;
  }

  private getStepIcon(type: string): string {
    switch (type) {
      case 'thought': return '💭';
      case 'search': return '🔍';
      case 'tool': return '🔧';
      case 'analysis': return '📊';
      case 'decision': return '✅';
      case 'source': return '📚';
      default: return '💡';
    }
  }

  private handleToggle() {
    this.expanded = !this.expanded;
  }

  private handleStepClick(step: ReasoningStep) {
    this.dispatchEvent(new CustomEvent('ai:step-click', {
      detail: { step },
      bubbles: true,
      composed: true
    }));
  }

  private handleSourceClick(source: { title: string; url?: string }) {
    this.dispatchEvent(new CustomEvent('ai:source-click', {
      detail: { source },
      bubbles: true,
      composed: true
    }));

    if (source.url) {
      window.open(source.url, '_blank');
    }
  }

  private getTotalDuration(): number {
    return this.steps.reduce((acc, step) => acc + (step.duration || 0), 0);
  }

  private getSourceCount(): number {
    return this.steps.reduce((acc, step) => acc + (step.sources?.length || 0), 0);
  }

  override render() {
    return html`
      <div class="container">
        <div class="header" @click=${this.handleToggle}>
          <div class="header-left">
            <span class="title">🧠 ${this.title}</span>
            <span class="step-count">${this.steps.length} steps</span>
          </div>
          <span class="toggle-icon ${this.expanded ? 'expanded' : ''}">▼</span>
        </div>

        <div class="timeline ${this.expanded ? 'expanded' : ''}">
          ${this.steps.map((step, index) => html`
            <div
              class="step ${step.type} ${step.status || 'complete'}"
              @click=${() => this.handleStepClick(step)}
            >
              <div class="step-icon">${this.getStepIcon(step.type)}</div>
              <div class="step-content">
                <div class="step-header">
                  <span class="step-title">${step.title}</span>
                  <div class="step-meta">
                    ${step.duration ? html`
                      <span class="step-duration">
                        <span>⏱️</span>
                        <span>${step.duration}ms</span>
                      </span>
                    ` : null}
                    ${step.timestamp ? html`
                      <span>${step.timestamp}</span>
                    ` : null}
                  </div>
                </div>

                <div class="step-body">
                  <span class="streaming-text">${step.content}</span>
                  ${this.streaming && index === this.steps.length - 1 && step.status === 'active' ? html`
                    <span class="streaming-cursor"></span>
                  ` : null}
                </div>

                ${step.sources?.length ? html`
                  <div class="sources">
                    ${step.sources.map(source => html`
                      <a
                        class="source-chip"
                        href=${source.url || '#'}
                        @click=${(e: Event) => { e.preventDefault(); e.stopPropagation(); this.handleSourceClick(source); }}
                      >
                        <span>📄</span>
                        <span>${source.title}</span>
                      </a>
                    `)}
                  </div>
                ` : null}
              </div>
            </div>
          `)}
        </div>

        ${this.expanded && this.steps.length > 0 ? html`
          <div class="summary">
            <div class="summary-stats">
              <span class="stat">
                <span>📝</span>
                <span>${this.steps.length} steps</span>
              </span>
              ${this.getTotalDuration() > 0 ? html`
                <span class="stat">
                  <span>⏱️</span>
                  <span>${this.getTotalDuration()}ms total</span>
                </span>
              ` : null}
              ${this.getSourceCount() > 0 ? html`
                <span class="stat">
                  <span>📚</span>
                  <span>${this.getSourceCount()} sources</span>
                </span>
              ` : null}
            </div>
            <span>Powered by AI</span>
          </div>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-reasoning': AiReasoning;
  }
}
