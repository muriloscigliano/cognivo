import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles, animations } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import '../ai-confidence-badge/ai-confidence-badge.js';

/**
 * AI Result Panel
 *
 * Displays AI analysis results with confidence scores, timestamps, and collapsible sections.
 * Supports progressive disclosure for complex results.
 *
 * @element ai-result-panel
 *
 * @attr {number} confidence - Confidence score (0-1)
 * @attr {boolean} dismissible - Show close button
 * @attr {boolean} collapsed - Start collapsed
 * @attr {string} timestamp - Result timestamp
 * @attr {string} title - Panel title
 * @attr {string} variant - Visual variant: 'default' | 'success' | 'warning' | 'error'
 *
 * @fires ai:panel-dismissed - Fired when panel is dismissed
 * @fires ai:panel-toggled - Fired when panel is expanded/collapsed
 *
 * @slot - Main content
 * @slot header - Custom header content
 * @slot footer - Custom footer content
 *
 * @example
 * ```html
 * <ai-result-panel confidence="0.92" title="Analysis Results">
 *   <p>Spending increased 93% in March due to campaign launch.</p>
 * </ai-result-panel>
 * ```
 */
@customElement('ai-result-panel')
export class AiResultPanel extends LitElement {
  static override styles = [
    baseStyles,
    animations,
    css`
      :host {
        display: block;
        background: var(--panel-background, ${tokens.color.grayWhite});
        border: 1px solid var(--panel-border, ${tokens.color.gray100});
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
        transition: all ${tokens.transition.default};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }

      :host([variant='success']) {
        border-color: ${tokens.color.success};
        background: var(--success-bg, #f0fdf4);
      }

      :host([variant='warning']) {
        border-color: ${tokens.color.warning};
        background: var(--warning-bg, #fffbeb);
      }

      :host([variant='error']) {
        border-color: ${tokens.color.danger};
        background: var(--error-bg, #fef2f2);
      }

      :host([collapsed]) .panel-content {
        display: none;
      }

      /* Header */
      .panel-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        gap: ${tokens.spacing.md};
        border-bottom: 1px solid var(--panel-border, ${tokens.color.gray100});
        background: var(--header-bg, transparent);
      }

      :host([collapsed]) .panel-header {
        border-bottom: none;
      }

      .header-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .header-title {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-family: ${tokens.fontFamily.display};
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin: 0;
      }

      .header-meta {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .timestamp {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        flex-shrink: 0;
      }

      /* Action buttons */
      .action-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: 1px solid ${tokens.color.gray100};
        background: transparent;
        border-radius: ${tokens.radius.md};
        cursor: pointer;
        transition: all ${tokens.transition.default};
        color: ${tokens.color.gray500};
        font-size: 16px;
        padding: 0;
      }

      .action-button:hover {
        background: ${tokens.color.gray50};
        border-color: ${tokens.color.gray500};
        color: ${tokens.color.gray900};
      }

      .action-button:active {
        transform: translateY(1px);
      }

      .action-button.dismiss {
        color: ${tokens.color.danger};
      }

      .action-button.dismiss:hover {
        background: #fef2f2;
        border-color: ${tokens.color.danger};
      }

      /* Content */
      .panel-content {
        padding: ${tokens.spacing.lg};
        animation: fadeIn 0.2s ease-in-out;
      }

      .panel-content ::slotted(*) {
        margin: 0;
      }

      .panel-content ::slotted(* + *) {
        margin-top: ${tokens.spacing.md};
      }

      .panel-content ::slotted(h3) {
        font-family: ${tokens.fontFamily.display};
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.sm};
      }

      .panel-content ::slotted(p) {
        font-size: ${tokens.fontSize.sm};
        line-height: ${tokens.lineHeight.relaxed};
        color: ${tokens.color.gray500};
      }

      .panel-content ::slotted(ul),
      .panel-content ::slotted(ol) {
        padding-left: 20px;
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .panel-content ::slotted(li) {
        line-height: ${tokens.lineHeight.relaxed};
        margin-top: ${tokens.spacing.xs};
      }

      /* Footer */
      .panel-footer {
        border-top: 1px solid var(--panel-border, ${tokens.color.gray100});
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: var(--footer-bg, ${tokens.color.gray50});
      }

      .panel-footer ::slotted(*) {
        margin: 0;
      }

      /* Collapsible section */
      details {
        margin-top: ${tokens.spacing.md};
      }

      summary {
        cursor: pointer;
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.aiAccent};
        list-style: none;
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.sm};
        border-radius: ${tokens.radius.sm};
        transition: all ${tokens.transition.default};
      }

      summary:hover {
        background: ${tokens.color.gray50};
      }

      summary::before {
        content: '▶';
        display: inline-block;
        transition: transform ${tokens.transition.default};
      }

      details[open] summary::before {
        transform: rotate(90deg);
      }

      /* Responsive */
      @media (max-width: 640px) {
        .panel-header,
        .panel-content,
        .panel-footer {
          padding: ${tokens.spacing.md};
        }

        .header-title {
          font-size: ${tokens.fontSize.base};
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        :host {
          background: #1f2937;
          border-color: #374151;
        }

        .panel-header {
          border-color: #374151;
        }

        .header-title {
          color: #f9fafb;
        }

        .header-meta,
        .panel-content ::slotted(p),
        .panel-content ::slotted(li) {
          color: #d1d5db;
        }

        .action-button {
          border-color: #374151;
          color: #9ca3af;
        }

        .action-button:hover {
          background: #374151;
          color: #f9fafb;
        }

        .panel-footer {
          background: #111827;
          border-color: #374151;
        }
      }
    `,
  ];

  /**
   * Confidence score (0 to 1)
   */
  @property({ type: Number })
  confidence = 0;

  /**
   * Show dismiss button
   */
  @property({ type: Boolean })
  dismissible = false;

  /**
   * Start collapsed
   */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /**
   * Panel title
   */
  @property({ type: String })
  title = '';

  /**
   * Timestamp text
   */
  @property({ type: String })
  timestamp = '';

  /**
   * Visual variant
   */
  @property({ type: String, reflect: true })
  variant: 'default' | 'success' | 'warning' | 'error' = 'default';

  /**
   * Internal state for expanded/collapsed
   */
  @state()
  private isExpanded = true;

  override connectedCallback() {
    super.connectedCallback();
    this.isExpanded = !this.collapsed;
  }

  /**
   * Toggle panel expanded/collapsed
   */
  private togglePanel() {
    this.isExpanded = !this.isExpanded;
    this.collapsed = !this.isExpanded;

    this.dispatchEvent(
      new CustomEvent('ai:panel-toggled', {
        detail: {
          expanded: this.isExpanded,
          timestamp: Date.now(),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Dismiss panel
   */
  private dismissPanel() {
    this.dispatchEvent(
      new CustomEvent('ai:panel-dismissed', {
        detail: {
          timestamp: Date.now(),
        },
        bubbles: true,
        composed: true,
      })
    );

    // Optionally hide the panel
    this.style.display = 'none';
  }

  /**
   * Get relative time string
   */
  private getRelativeTime(): string {
    if (!this.timestamp) return '';

    const now = Date.now();
    const time = new Date(this.timestamp).getTime();
    const diff = now - time;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    if (seconds > 0) return `${seconds}s ago`;
    return 'just now';
  }

  override render() {
    const showConfidence = this.confidence > 0;
    const showTimestamp = this.timestamp !== '';

    return html`
      <div class="panel">
        <!-- Header -->
        <div class="panel-header">
          <div class="header-left">
            ${this.title
              ? html`
                  <h3 class="header-title">
                    ${this.title}
                    ${showConfidence
                      ? html`
                          <ai-confidence-badge
                            score=${this.confidence}
                            size="sm"
                            show-percentage
                          ></ai-confidence-badge>
                        `
                      : null}
                  </h3>
                `
              : null}
            ${showTimestamp || showConfidence
              ? html`
                  <div class="header-meta">
                    ${showTimestamp
                      ? html`
                          <span class="timestamp">
                            <span>🕐</span>
                            <span>${this.getRelativeTime()}</span>
                          </span>
                        `
                      : null}
                    <slot name="header"></slot>
                  </div>
                `
              : null}
          </div>

          <div class="header-actions">
            <button
              class="action-button toggle"
              @click=${this.togglePanel}
              title=${this.isExpanded ? 'Collapse' : 'Expand'}
              aria-label=${this.isExpanded ? 'Collapse panel' : 'Expand panel'}
            >
              ${this.isExpanded ? '−' : '+'}
            </button>

            ${this.dismissible
              ? html`
                  <button
                    class="action-button dismiss"
                    @click=${this.dismissPanel}
                    title="Dismiss"
                    aria-label="Dismiss panel"
                  >
                    ×
                  </button>
                `
              : null}
          </div>
        </div>

        <!-- Content -->
        ${this.isExpanded
          ? html`
              <div class="panel-content">
                <slot></slot>
              </div>

              ${this.querySelector('[slot="footer"]')
                ? html`
                    <div class="panel-footer">
                      <slot name="footer"></slot>
                    </div>
                  `
                : null}
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-result-panel': AiResultPanel;
  }
}
