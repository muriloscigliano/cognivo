import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, shimmerKeyframes } from '../../styles/index.js';

/**
 * <cg-follow-up> — Suggestion chips for chat conversations.
 *
 * @fires {CustomEvent<{text: string}>} cg-follow-up-click - When a suggestion is clicked
 */

export interface FollowUpItem {
  text: string;
  icon?: string;
}

@customElement('cg-follow-up')
export class CgFollowUp extends LitElement {
  static override styles = [hostBlock, reducedMotion, shimmerKeyframes, css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary);
    }

    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      margin-bottom: var(--cg-spacing-8);
    }
    .header-icon {
      color: var(--cg-color-action-primary-background-default);
    }
    .label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-action-primary-background-default);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-8);
    }

    /* ── Chip variant (default) ── */
    button {
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      font: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      white-space: nowrap;
      line-height: var(--cg-line-height-snug);
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      animation: fadeIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
      animation-delay: calc(var(--item-index, 0) * 60ms);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(var(--cg-spacing-6)); }
      to { opacity: 1; transform: translateY(0); }
    }

    button:hover:not(:disabled) {
      border-color: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-background-default);
      background: var(--cg-color-action-tertiary-background-hover);
    }
    button:active:not(:disabled) { transform: scale(var(--cg-interaction-press-scale)); }
    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    button:disabled { opacity: 0.4; cursor: not-allowed; }

    .icon {
      color: var(--cg-color-surface-container-outlined);
    }
    button:hover:not(:disabled) .icon {
      color: var(--cg-color-action-primary-background-default);
    }

    /* ── Card variant ── */
    :host([variant="cards"]) button {
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      flex-direction: column;
      align-items: flex-start;
      gap: var(--cg-spacing-4);
      white-space: normal;
      text-align: left;
      min-width: 140px;
    }
    :host([variant="cards"]) .icon {
      color: var(--cg-color-action-primary-background-default);
      opacity: 0.7;
    }

    /* ── Button variant ── */
    :host([variant="buttons"]) button {
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
    }

    /* ── Overflow "+N more" ── */
    .more-badge {
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) dashed var(--cg-color-surface-container-border);
      background: transparent;
      color: var(--cg-color-surface-container-outlined);
      font: inherit;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .more-badge:hover {
      border-color: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-background-default);
    }

    /* ── Loading shimmer ── */
    .shimmer {
      height: var(--cg-spacing-40);
      border-radius: var(--cg-border-radius-full);
      background: linear-gradient(
        90deg,
        var(--cg-color-surface-container-background) 25%,
        var(--cg-color-surface-container-border) 50%,
        var(--cg-color-surface-container-background) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
  `];

  @property({ type: Array }) items: (string | FollowUpItem)[] = [];
  @property() label = 'Suggested';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) hideLabel = false;
  @property({ type: String, reflect: true }) variant: 'chips' | 'cards' | 'buttons' = 'chips';
  @property({ type: Number }) maxVisible: number = 0;

  @state() private _showAll = false;

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
  }

  override render() {
    const visibleItems = this.maxVisible > 0 && !this._showAll
      ? this.items.slice(0, this.maxVisible)
      : this.items;
    const remaining = this.maxVisible > 0 && !this._showAll
      ? this.items.length - this.maxVisible
      : 0;

    const shimmerWidths = [150, 190, 130, 170, 120];

    return html`
      ${!this.hideLabel ? html`
        <div class="header">
          <cg-icon class="header-icon" name="sparkle" size="sm"></cg-icon>
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
                    ${icon ? html`<cg-icon class="icon" name="${icon}" size="sm" aria-hidden="true"></cg-icon>` : nothing}
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
