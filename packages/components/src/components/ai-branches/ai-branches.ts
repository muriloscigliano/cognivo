import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface BranchVariation {
  id: string;
  content: string;
  label?: string;
  tone?: string;
  confidence?: number;
  metadata?: Record<string, unknown>;
}

/**
 * AI Branches
 *
 * Shape of AI Pattern: Tuner > Branches
 *
 * Shows alternative AI outputs allowing users to explore variations.
 * Enables comparing and selecting the best option.
 *
 * @element ai-branches
 *
 * @fires ai:branch-select - Fired when a branch is selected
 * @fires ai:branch-regenerate - Fired when regenerate is requested
 * @fires ai:branch-expand - Fired when more variations requested
 */
@customElement('ai-branches')
export class AiBranches extends LitElement {
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
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .branch-count {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .action-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        background: none;
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray600};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .action-btn:hover {
        background: ${tokens.color.gray100};
        border-color: ${tokens.color.gray300};
      }

      .action-btn.loading {
        opacity: 0.6;
        pointer-events: none;
      }

      /* Branch navigation */
      .branch-nav {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border-bottom: 1px solid ${tokens.color.gray100};
        overflow-x: auto;
      }

      .branch-tab {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 6px 12px;
        background: none;
        border: 1px solid transparent;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        white-space: nowrap;
      }

      .branch-tab:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray700};
      }

      .branch-tab.active {
        background: ${tokens.color.aiBackground};
        border-color: ${tokens.color.aiBorder};
        color: ${tokens.color.aiAccent};
      }

      .branch-tab .branch-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        font-size: 10px;
      }

      .branch-tab.active .branch-number {
        background: ${tokens.color.aiAccent};
        color: white;
      }

      /* Content area */
      .content-area {
        padding: ${tokens.spacing.md};
        min-height: 120px;
      }

      .branch-content {
        font-size: ${tokens.fontSize.sm};
        line-height: 1.7;
        color: ${tokens.color.gray700};
      }

      /* Comparison view */
      .comparison-view {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md};
      }

      .comparison-card {
        background: ${tokens.color.gray50};
        border: 2px solid transparent;
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.md};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        position: relative;
      }

      .comparison-card:hover {
        border-color: ${tokens.color.gray200};
      }

      .comparison-card.selected {
        border-color: ${tokens.color.aiAccent};
        background: ${tokens.color.aiBackground};
      }

      .comparison-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.sm};
      }

      .comparison-label {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray700};
      }

      .comparison-badge {
        padding: 2px 6px;
        background: ${tokens.color.gray200};
        border-radius: ${tokens.radius.full};
        font-size: 10px;
        color: ${tokens.color.gray600};
      }

      .comparison-card.selected .comparison-badge {
        background: ${tokens.color.aiAccent};
        color: white;
      }

      .comparison-content {
        font-size: ${tokens.fontSize.sm};
        line-height: 1.6;
        color: ${tokens.color.gray600};
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .confidence-bar {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        margin-top: ${tokens.spacing.sm};
        font-size: 10px;
        color: ${tokens.color.gray500};
      }

      .confidence-track {
        flex: 1;
        height: 4px;
        background: ${tokens.color.gray200};
        border-radius: 2px;
        overflow: hidden;
      }

      .confidence-fill {
        height: 100%;
        background: ${tokens.color.aiAccent};
        border-radius: 2px;
        transition: width ${tokens.transition.default};
      }

      /* Footer */
      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      .select-btn {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        background: ${tokens.color.aiAccent};
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: white;
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .select-btn:hover {
        opacity: 0.9;
      }

      .select-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* View toggle */
      .view-toggle {
        display: flex;
        align-items: center;
        gap: 2px;
        padding: 2px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
      }

      .view-btn {
        padding: 4px 10px;
        background: none;
        border: none;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .view-btn.active {
        background: ${tokens.color.grayWhite};
        color: ${tokens.color.gray700};
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      /* Loading state */
      .loading-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${tokens.spacing.xl};
        gap: ${tokens.spacing.sm};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
      }

      /* Empty state */
      .empty-state {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
      }
    `
  ];

  @property({ type: Array }) variations: BranchVariation[] = [];
  @property({ type: String }) title = 'Variations';
  @property({ type: Boolean }) loading = false;
  @property({ type: String, attribute: 'view-mode' }) viewMode: 'tabs' | 'comparison' = 'tabs';
  @property({ type: Boolean, attribute: 'show-confidence' }) showConfidence = true;

  @state() private selectedIndex = 0;

  private handleTabSelect(index: number) {
    this.selectedIndex = index;
  }

  private handleCardSelect(index: number) {
    this.selectedIndex = index;
  }

  private handleRegenerate() {
    this.dispatchEvent(new CustomEvent('ai:branch-regenerate', {
      detail: { currentIndex: this.selectedIndex },
      bubbles: true,
      composed: true
    }));
  }

  private handleExpand() {
    this.dispatchEvent(new CustomEvent('ai:branch-expand', {
      detail: { currentCount: this.variations.length },
      bubbles: true,
      composed: true
    }));
  }

  private handleSelect() {
    const selected = this.variations[this.selectedIndex];
    if (selected) {
      this.dispatchEvent(new CustomEvent('ai:branch-select', {
        detail: { variation: selected, index: this.selectedIndex },
        bubbles: true,
        composed: true
      }));
    }
  }

  override render() {
    const currentVariation = this.variations[this.selectedIndex];

    return html`
      <div class="container">
        <div class="header">
          <div class="header-left">
            <span class="title">${this.title}</span>
            <span class="branch-count">${this.variations.length} options</span>
          </div>
          <div class="header-actions">
            <div class="view-toggle">
              <button
                class="view-btn ${this.viewMode === 'tabs' ? 'active' : ''}"
                @click=${() => this.viewMode = 'tabs'}
              >Single</button>
              <button
                class="view-btn ${this.viewMode === 'comparison' ? 'active' : ''}"
                @click=${() => this.viewMode = 'comparison'}
              >Compare</button>
            </div>
            <button class="action-btn ${this.loading ? 'loading' : ''}" @click=${this.handleRegenerate}>
              🔄 Regenerate
            </button>
            <button class="action-btn" @click=${this.handleExpand}>
              + More
            </button>
          </div>
        </div>

        ${this.loading ? html`
          <div class="loading-overlay">
            <ai-thinking-indicator size="sm"></ai-thinking-indicator>
            <span>Generating variations...</span>
          </div>
        ` : this.viewMode === 'tabs' ? html`
          ${this.variations.length > 0 ? html`
            <div class="branch-nav">
              ${this.variations.map((v, i) => html`
                <button
                  class="branch-tab ${i === this.selectedIndex ? 'active' : ''}"
                  @click=${() => this.handleTabSelect(i)}
                >
                  <span class="branch-number">${i + 1}</span>
                  <span>${v.label || v.tone || `Option ${i + 1}`}</span>
                </button>
              `)}
            </div>

            <div class="content-area">
              ${currentVariation ? html`
                <div class="branch-content">${currentVariation.content}</div>
                ${this.showConfidence && currentVariation.confidence ? html`
                  <div class="confidence-bar">
                    <span>Confidence:</span>
                    <div class="confidence-track">
                      <div class="confidence-fill" style="width: ${currentVariation.confidence * 100}%"></div>
                    </div>
                    <span>${Math.round(currentVariation.confidence * 100)}%</span>
                  </div>
                ` : null}
              ` : null}
            </div>
          ` : html`
            <div class="empty-state">No variations available</div>
          `}
        ` : html`
          <div class="comparison-view">
            ${this.variations.map((v, i) => html`
              <div
                class="comparison-card ${i === this.selectedIndex ? 'selected' : ''}"
                @click=${() => this.handleCardSelect(i)}
              >
                <div class="comparison-header">
                  <div class="comparison-label">
                    <span>${v.label || v.tone || `Option ${i + 1}`}</span>
                  </div>
                  <span class="comparison-badge">${i + 1}</span>
                </div>
                <div class="comparison-content">${v.content}</div>
                ${this.showConfidence && v.confidence ? html`
                  <div class="confidence-bar">
                    <span>Confidence:</span>
                    <div class="confidence-track">
                      <div class="confidence-fill" style="width: ${v.confidence * 100}%"></div>
                    </div>
                    <span>${Math.round(v.confidence * 100)}%</span>
                  </div>
                ` : null}
              </div>
            `)}
          </div>
        `}

        <div class="footer">
          <span style="font-size: 12px; color: var(--cg-color-gray-500);">
            ${this.selectedIndex + 1} of ${this.variations.length} selected
          </span>
          <button class="select-btn" @click=${this.handleSelect} ?disabled=${!currentVariation}>
            <span>✓</span>
            Use this version
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-branches': AiBranches;
  }
}
