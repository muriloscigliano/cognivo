import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-follow-up> — Suggestion chips for chat conversations.
 *
 * Fixes from audit:
 * - Removed 5-item animation limit (dynamic CSS custom property)
 * - Added variant prop: chips (default), cards, buttons
 * - Added icon per item support
 * - Added maxVisible with "+N more" overflow
 * - Added aria-label on each button
 * - Loading shimmer count matches maxVisible
 */

interface FollowUpItem {
  text: string;
  icon?: string;
}

@customElement('cg-follow-up')
export class CgFollowUp extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .header {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 10px;
    }
    .header-icon {
      width: 14px;
      height: 14px;
      color: var(--cg-brand-ai-accent, #dfff61);
    }
    .label {
      font-size: 11px;
      font-weight: 700;
      color: var(--cg-brand-ai-accent, #dfff61);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* ── Chip variant (default) ── */
    button {
      padding: 8px 16px;
      border-radius: 99999px;
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      background: var(--cg-color-surface-container-background, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 150ms ease;
      white-space: nowrap;
      line-height: 1.3;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      animation: fadeIn 0.25s ease both;
      /* Dynamic stagger delay via CSS custom property */
      animation-delay: calc(var(--item-index, 0) * 60ms);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    button:hover:not(:disabled) {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-brand-ai-accent, #dfff61);
      background: rgba(223, 255, 97, 0.06);
      box-shadow: 0 0 12px rgba(223, 255, 97, 0.08);
    }
    button:active:not(:disabled) { transform: scale(0.97); }
    button:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    button:disabled { opacity: 0.4; cursor: not-allowed; }

    .icon { font-size: 14px; line-height: 1; }

    /* ── Card variant ── */
    :host([variant="cards"]) button {
      border-radius: 10px;
      padding: 12px 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      white-space: normal;
      text-align: left;
      min-width: 140px;
    }
    :host([variant="cards"]) .icon { font-size: 18px; }

    /* ── Button variant ── */
    :host([variant="buttons"]) button {
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 600;
    }

    /* ── Overflow "+N more" ── */
    .more-badge {
      padding: 8px 14px;
      border-radius: 99999px;
      border: 1px dashed var(--cg-gray-700, #3f3f46);
      background: none;
      color: var(--cg-gray-500, #71717a);
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms;
    }
    .more-badge:hover {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Loading shimmer ── */
    .shimmer {
      height: 36px;
      border-radius: 99999px;
      background: linear-gradient(
        90deg,
        var(--cg-color-surface-container-background, #18181b) 25%,
        var(--cg-color-surface-container-border, #27272a) 50%,
        var(--cg-color-surface-container-background, #18181b) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      button { animation: none; transition: none; }
      .shimmer { animation: none; background: var(--cg-color-surface-container-border, #27272a); }
    }
  `;

  /** Suggestion items — strings or {text, icon} objects */
  @property({ type: Array }) items: (string | FollowUpItem)[] = [];

  /** Label displayed above chips */
  @property() label = 'Suggested';

  /** Disable all chips (e.g. during streaming) */
  @property({ type: Boolean }) disabled = false;

  /** Show loading shimmer instead of chips */
  @property({ type: Boolean }) loading = false;

  /** Hide the header label */
  @property({ type: Boolean }) hideLabel = false;

  /** Visual variant: chips (default), cards, buttons */
  @property({ type: String, reflect: true }) variant: 'chips' | 'cards' | 'buttons' = 'chips';

  /** Max visible items before "+N more" (0 = show all) */
  @property({ type: Number }) maxVisible: number = 0;

  private _showAll: boolean = false;

  private _getText(item: string | FollowUpItem): string {
    return typeof item === 'string' ? item : item.text;
  }

  private _getIcon(item: string | FollowUpItem): string | undefined {
    return typeof item === 'string' ? undefined : item.icon;
  }

  private _handleClick(item: string | FollowUpItem) {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('cg-follow-up-click', {
      detail: { text: this._getText(item) },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleShowAll() {
    this._showAll = true;
    this.requestUpdate();
  }

  override render() {
    const visibleItems = this.maxVisible > 0 && !this._showAll
      ? this.items.slice(0, this.maxVisible)
      : this.items;
    const remaining = this.maxVisible > 0 && !this._showAll
      ? this.items.length - this.maxVisible
      : 0;

    // Generate shimmer widths based on item count
    const shimmerWidths = [150, 190, 130, 170, 120];

    return html`
      ${!this.hideLabel ? html`
        <div class="header">
          <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"></path>
          </svg>
          <span class="label">${this.label}</span>
        </div>
      ` : nothing}

      <div class="chips" role="group" aria-label=${this.label}>
        ${this.loading
          ? shimmerWidths.slice(0, this.maxVisible || 3).map(w => html`
              <div class="shimmer" style="width: ${w}px"></div>
            `)
          : html`
              ${visibleItems.map((item, i) => {
                const text = this._getText(item);
                const icon = this._getIcon(item);
                return html`
                  <button
                    style="--item-index: ${i}"
                    ?disabled=${this.disabled}
                    aria-label="Suggestion: ${text}"
                    @click=${() => this._handleClick(item)}
                  >
                    ${icon ? html`<span class="icon" aria-hidden="true">${icon}</span>` : nothing}
                    ${text}
                  </button>
                `;
              })}
              ${remaining > 0 ? html`
                <button class="more-badge" @click=${this._handleShowAll} aria-label="Show ${remaining} more suggestions">
                  +${remaining} more
                </button>
              ` : nothing}
            `
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-follow-up': CgFollowUp; }
}
