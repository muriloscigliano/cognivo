/**
 * @element ai-context-window
 * Token budget bar showing context window usage with color segments and cache indicator.
 *
 * @fires {CustomEvent<{label: string, tokens: number}>} ai-context-segment-click
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface ContextSegment {
  label: string;
  tokens: number;
  color?: string;
}

@customElement('ai-context-window')
export class AiContextWindow extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-24);
    }

    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--cg-spacing-12);
    }
    .title {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
    }
    .total {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-surface-container-outlined);
    }
    .total.warning { color: var(--cg-color-status-warning-text-default); }
    .total.danger { color: var(--cg-color-status-error-text-default); }

    /* ── Segmented bar ── */
    .bar {
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-border);
      display: flex;
      overflow: hidden;
      margin-bottom: var(--cg-spacing-16);
    }
    .segment {
      height: 100%;
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
      cursor: pointer;
      position: relative;
    }
    .segment:first-child { border-radius: var(--cg-border-radius-full) 0 0 var(--cg-border-radius-full); }
    .segment:last-child { border-radius: 0 var(--cg-border-radius-full) var(--cg-border-radius-full) 0; }
    .segment:hover { opacity: 0.8; }

    /* Tooltip */
    .segment:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: calc(100% + var(--cg-spacing-6));
      left: 50%;
      transform: translateX(-50%);
      background: var(--cg-color-tooltip-background);
      color: var(--cg-color-tooltip-text);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-xs);
      white-space: nowrap;
      z-index: 10;
      pointer-events: none;
    }

    /* ── Legend ── */
    .legend {
      display: flex; gap: var(--cg-spacing-20); flex-wrap: wrap;
    }
    .legend-item {
      display: flex; align-items: center; gap: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined);
    }
    .legend-dot {
      width: var(--cg-spacing-8); height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full); flex-shrink: 0;
    }
    .legend-tokens {
      font-family: var(--cg-font-family-mono);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    /* ── Cache ── */
    .cache-row {
      display: flex; align-items: center; gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-12); padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined);
    }
    .cache-icon {
      color: var(--cg-color-ai-cached-text);
      width: var(--cg-spacing-12); height: var(--cg-spacing-12);
      display: flex;
    }
    .cache-icon svg { width: 100%; height: 100%; }

    /* ── Rounded ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Number }) total = 128000;
  @property({ type: Array }) segments: ContextSegment[] = [];
  @property({ type: Number }) cached = 0;

  private _defaultColors = [
    'var(--cg-color-action-primary-background-default)',
    'var(--cg-color-status-info-text-default)',
    'var(--cg-color-status-warning-text-default)',
    'var(--cg-color-status-success-text-default)',
    'var(--cg-color-status-error-text-default)',
  ];

  private get _usedTokens(): number {
    return this.segments.reduce((sum, s) => sum + s.tokens, 0);
  }

  private get _usagePercent(): number {
    return this.total > 0 ? (this._usedTokens / this.total) * 100 : 0;
  }

  private get _statusClass(): string {
    if (this._usagePercent >= 95) return 'danger';
    if (this._usagePercent >= 80) return 'warning';
    return '';
  }

  private _formatTokens(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
  }

  override render() {
    if (this.total <= 0) return nothing;
    const remaining = Math.max(0, this.total - this._usedTokens);

    return html`
      <div class="container" role="figure" aria-label="Context window: ${this._formatTokens(this._usedTokens)} of ${this._formatTokens(this.total)} tokens">
        <div class="header">
          <span class="title">Context Window</span>
          <span class="total ${this._statusClass}">
            ${this._formatTokens(this._usedTokens)} / ${this._formatTokens(this.total)}
            (${Math.round(this._usagePercent)}%)
          </span>
        </div>

        <div class="bar">
          ${this.segments.map((seg, i) => {
            const pct = (seg.tokens / this.total) * 100;
            const color = seg.color || this._defaultColors[i % this._defaultColors.length];
            return html`
              <div class="segment"
                style="width: ${pct}%; background: ${color};"
                data-tooltip="${seg.label}: ${this._formatTokens(seg.tokens)}"
                @click=${() => this.dispatchEvent(new CustomEvent('ai-context-segment-click', { bubbles: true, composed: true, detail: { label: seg.label, tokens: seg.tokens } }))}></div>
            `;
          })}
        </div>

        <div class="legend">
          ${this.segments.map((seg, i) => {
            const color = seg.color || this._defaultColors[i % this._defaultColors.length];
            return html`
              <div class="legend-item">
                <div class="legend-dot" style="background: ${color};"></div>
                <span>${seg.label}</span>
                <span class="legend-tokens">${this._formatTokens(seg.tokens)}</span>
              </div>
            `;
          })}
          <div class="legend-item">
            <div class="legend-dot" style="background: var(--cg-color-surface-cards-border);"></div>
            <span>Free</span>
            <span class="legend-tokens">${this._formatTokens(remaining)}</span>
          </div>
        </div>

        ${this.cached > 0 ? html`
          <div class="cache-row">
            <span class="cache-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
            <span>${this._formatTokens(this.cached)} cached</span>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
