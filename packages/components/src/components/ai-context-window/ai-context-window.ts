/**
 * @element ai-context-window
 * Segmented token budget bar showing context window usage with color-coded segments and cache indicator.
 *
 * @example
 * ```html
 * <ai-context-window
 *   total="128000"
 *   .segments=${[
 *     {label:'System prompt', tokens:2400},
 *     {label:'Conversation', tokens:45000, color:'#60a5fa'},
 *     {label:'Tools', tokens:8000}
 *   ]}
 *   cached="12000"
 * ></ai-context-window>
 * ```
 *
 * @fires {CustomEvent<{label: string, tokens: number}>} ai-context-segment-click - Segment clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Cache indicator icon color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface ContextSegment {
  label: string;
  tokens: number;
  color?: string;
}

@customElement('ai-context-window')
export class AiContextWindow extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 10px;
      padding: 14px 16px;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .title {
      font-size: 11px; font-weight: 700; color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .total {
      font-size: 12px; font-weight: 600;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
    }
    .total.ok { color: var(--cg-gray-400, #a1a1aa); }
    .total.warning { color: var(--cg-yellow-400, #fbbf24); }
    .total.danger { color: var(--cg-red-400, #f87171); }

    /* Segmented bar */
    .bar {
      height: 12px;
      border-radius: 6px;
      background: var(--cg-gray-800, #27272a);
      display: flex;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .segment {
      height: 100%;
      transition: width 300ms ease;
      position: relative;
    }
    .segment:first-child { border-radius: 6px 0 0 6px; }
    .segment:last-child { border-radius: 0 6px 6px 0; }

    /* Tooltip on hover */
    .segment:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: var(--cg-gray-800, #27272a);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-color-surface-base-text, #fafafa);
      padding: 3px 8px;
      border-radius: 5px;
      font-size: 10px;
      white-space: nowrap;
      z-index: 10;
      pointer-events: none;
    }

    /* Legend */
    .legend {
      display: flex; gap: 14px; flex-wrap: wrap;
    }
    .legend-item {
      display: flex; align-items: center; gap: 5px;
      font-size: 11px; color: var(--cg-gray-400, #a1a1aa);
      cursor: pointer;
    }
    .legend-dot {
      width: 8px; height: 8px; border-radius: 3px; flex-shrink: 0;
    }
    .legend-tokens {
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-weight: 600; color: var(--cg-color-surface-base-text, #fafafa);
    }

    /* Cache indicator */
    .cache-row {
      display: flex; align-items: center; gap: 6px;
      margin-top: 8px; padding-top: 8px;
      border-top: 1px solid var(--cg-gray-800, #27272a);
      font-size: 11px; color: var(--cg-gray-500, #71717a);
    }
    .cache-icon { color: var(--cg-brand-ai-accent, #dfff61); }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `];
  @property({ type: Number }) total: number = 128000;
  @property({ type: Array }) segments: ContextSegment[] = [];
  @property({ type: Number }) cached: number = 0;

  private _defaultColors = ['#a78bfa', '#60a5fa', '#14b8a6', '#fbbf24', '#f87171'];

  private get _usedTokens(): number {
    return this.segments.reduce((sum, s) => sum + s.tokens, 0);
  }

  private get _usagePercent(): number {
    return this.total > 0 ? (this._usedTokens / this.total) * 100 : 0;
  }

  private get _statusClass(): string {
    if (this._usagePercent >= 95) return 'danger';
    if (this._usagePercent >= 80) return 'warning';
    return 'ok';
  }

  private _handleSegmentClick(segment: ContextSegment) {
    this.dispatchEvent(new CustomEvent('ai-context-segment-click', {
      bubbles: true, composed: true,
      detail: { label: segment.label, tokens: segment.tokens },
    }));
  }

  override render() {
    if (this.total <= 0) return nothing;

    const remaining = Math.max(0, this.total - this._usedTokens);

    return html`
      <div class="container" role="figure" aria-label="Context window: ${this._usedTokens.toLocaleString()} of ${this.total.toLocaleString()} tokens used">
        <div class="header">
          <span class="title">Context Window</span>
          <span class="total ${this._statusClass}">
            ${this._usedTokens.toLocaleString()} / ${this.total.toLocaleString()}
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
                data-tooltip="${seg.label}: ${seg.tokens.toLocaleString()} tokens"
                @click=${() => this._handleSegmentClick(seg)}></div>
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
                <span class="legend-tokens">${seg.tokens.toLocaleString()}</span>
              </div>
            `;
          })}
          <div class="legend-item">
            <div class="legend-dot" style="background: var(--cg-gray-700, #3f3f46);"></div>
            <span>Remaining</span>
            <span class="legend-tokens">${remaining.toLocaleString()}</span>
          </div>
        </div>

        ${this.cached > 0 ? html`
          <div class="cache-row">
            <span class="cache-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
            <span>${this.cached.toLocaleString()} tokens cached (prompt caching)</span>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
