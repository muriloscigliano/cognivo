import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface SuggestionChip {
  id: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * AI Suggestion Chips
 *
 * Displays a row of clickable AI-generated suggestions.
 * Perfect for quick actions, auto-complete, or recommendations.
 *
 * @element ai-suggestion-chips
 *
 * @fires ai:chip-select - Fired when a chip is selected
 * @fires ai:chip-dismiss - Fired when a chip is dismissed
 * @fires ai:refresh - Fired when refresh is clicked
 */
@customElement('ai-suggestion-chips')
export class AiSuggestionChips extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
      }

      .label {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

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

      .refresh-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: none;
        border: none;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .refresh-btn:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray700};
      }

      .refresh-btn.loading {
        pointer-events: none;
      }

      .refresh-btn.loading .refresh-icon {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .chips-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.xs};
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: ${tokens.color.gray100};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray700};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        position: relative;
        overflow: hidden;
      }

      .chip::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.1) 100%);
        opacity: 0;
        transition: opacity ${tokens.transition.fast};
      }

      .chip:hover::before {
        opacity: 1;
      }

      .chip:hover {
        border-color: ${tokens.color.aiAccent};
        transform: translateY(-1px);
      }

      .chip:active {
        transform: translateY(0);
      }

      .chip.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Variants */
      .chip.primary {
        background: ${tokens.color.aiBackground};
        border-color: ${tokens.color.aiBorder};
        color: ${tokens.color.aiAccent};
      }

      .chip.primary:hover {
        background: ${tokens.color.aiAccent};
        color: white;
      }

      .chip.success {
        background: rgba(34, 197, 94, 0.1);
        border-color: rgba(34, 197, 94, 0.3);
        color: #16a34a;
      }

      .chip.success:hover {
        background: #22c55e;
        color: white;
      }

      .chip.warning {
        background: rgba(234, 179, 8, 0.1);
        border-color: rgba(234, 179, 8, 0.3);
        color: #ca8a04;
      }

      .chip.warning:hover {
        background: #eab308;
        color: white;
      }

      .chip.danger {
        background: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.3);
        color: #dc2626;
      }

      .chip.danger:hover {
        background: #ef4444;
        color: white;
      }

      .chip-icon {
        font-size: 14px;
        flex-shrink: 0;
      }

      .chip-label {
        position: relative;
        z-index: 1;
      }

      .chip-dismiss {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        font-size: 10px;
        margin-left: 2px;
        margin-right: -4px;
        opacity: 0;
        transition: opacity ${tokens.transition.fast};
      }

      .chip:hover .chip-dismiss {
        opacity: 1;
      }

      .chip-dismiss:hover {
        background: rgba(0, 0, 0, 0.2);
      }

      /* Stacked layout */
      :host([layout="stacked"]) .chips-wrapper {
        flex-direction: column;
        align-items: stretch;
      }

      :host([layout="stacked"]) .chip {
        border-radius: ${tokens.radius.md};
        justify-content: flex-start;
      }

      /* Compact variant */
      :host([compact]) .chip {
        padding: 4px 10px;
        font-size: ${tokens.fontSize.xs};
        gap: 4px;
      }

      :host([compact]) .chip-icon {
        font-size: 12px;
      }

      /* Loading skeleton */
      .skeleton-chip {
        height: 32px;
        width: 100px;
        background: linear-gradient(
          90deg,
          ${tokens.color.gray100} 0%,
          ${tokens.color.gray200} 50%,
          ${tokens.color.gray100} 100%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: ${tokens.radius.full};
      }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* Empty state */
      .empty-state {
        padding: ${tokens.spacing.md};
        text-align: center;
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
      }
    `
  ];

  @property({ type: Array }) chips: SuggestionChip[] = [];
  @property({ type: String }) label = 'AI Suggestions';
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) dismissible = false;
  @property({ type: Boolean, attribute: 'show-refresh' }) showRefresh = true;
  @property({ type: Boolean, attribute: 'show-label' }) showLabel = true;
  @property({ type: String, reflect: true }) layout: 'inline' | 'stacked' = 'inline';
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Number, attribute: 'skeleton-count' }) skeletonCount = 3;

  private handleChipClick(chip: SuggestionChip) {
    if (chip.disabled) return;

    this.dispatchEvent(new CustomEvent('ai:chip-select', {
      detail: { chip },
      bubbles: true,
      composed: true
    }));
  }

  private handleDismiss(e: Event, chip: SuggestionChip) {
    e.stopPropagation();

    this.dispatchEvent(new CustomEvent('ai:chip-dismiss', {
      detail: { chip },
      bubbles: true,
      composed: true
    }));
  }

  private handleRefresh() {
    this.dispatchEvent(new CustomEvent('ai:refresh', {
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="container">
        ${this.showLabel || this.showRefresh ? html`
          <div class="header">
            ${this.showLabel ? html`
              <div class="label">
                <span class="ai-dot"></span>
                <span>${this.label}</span>
              </div>
            ` : html`<div></div>`}

            ${this.showRefresh ? html`
              <button
                class="refresh-btn ${this.loading ? 'loading' : ''}"
                @click=${this.handleRefresh}
                ?disabled=${this.loading}
              >
                <svg class="refresh-icon" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>Refresh</span>
              </button>
            ` : null}
          </div>
        ` : null}

        <div class="chips-wrapper">
          ${this.loading ? html`
            ${Array(this.skeletonCount).fill(0).map(() => html`
              <div class="skeleton-chip"></div>
            `)}
          ` : this.chips.length > 0 ? this.chips.map(chip => html`
            <button
              class="chip ${chip.variant || 'default'} ${chip.disabled ? 'disabled' : ''}"
              @click=${() => this.handleChipClick(chip)}
            >
              ${chip.icon ? html`
                <span class="chip-icon">${chip.icon}</span>
              ` : null}
              <span class="chip-label">${chip.label}</span>
              ${this.dismissible ? html`
                <span class="chip-dismiss" @click=${(e: Event) => this.handleDismiss(e, chip)}>×</span>
              ` : null}
            </button>
          `) : html`
            <div class="empty-state">No suggestions available</div>
          `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-suggestion-chips': AiSuggestionChips;
  }
}
