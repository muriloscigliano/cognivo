/**
 * @element ai-result-panel
 * Collapsible AI analysis dashboard with tabbed views (Summary, Data, Sources).
 * Shows explanation text, bullet points, sortable impact driver bars, confidence
 * badge, copy/export actions, and optional streaming indicator.
 *
 * @example
 * ```html
 * <ai-result-panel
 *   title="Market Analysis"
 *   explanation="Revenue grew 12% driven by enterprise adoption."
 *   .bullets=${['Enterprise ARR up 18%', 'Churn reduced to 3.2%']}
 *   .drivers=${[{ factor: 'Enterprise', impact: 42 }, { factor: 'Churn', impact: -8 }]}
 *   confidence="87"
 *   collapsible
 * ></ai-result-panel>
 * ```
 *
 * @prop {string} title - Panel header title
 * @prop {string} explanation - Summary paragraph text
 * @prop {string[]} bullets - Key takeaway bullet points
 * @prop {Driver[]} drivers - Impact driver bars with factor and impact percentage
 * @prop {number} confidence - Confidence score (0-100)
 * @prop {boolean} collapsible - Allow collapsing the panel
 * @prop {boolean} streaming - Show streaming/loading indicator
 *
 * @fires {CustomEvent<{format: string}>} ai-result-export - When export is clicked
 * @fires {CustomEvent<{content: string}>} ai-result-copy - When copy is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface Driver { factor: string; impact: number; }
interface Source { title: string; url?: string; excerpt?: string; }

@customElement('ai-result-panel')
export class AiResultPanel extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .panel {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid rgba(223, 255, 97, 0.12);
      border-radius: var(--cg-border-radius-150, 12px);
      overflow: hidden;
      box-shadow: var(--cg-elevation-1, 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      cursor: pointer;
    }
    .header-left { display: flex; align-items: center; gap: var(--cg-spacing-10, 10px); }
    .title {
      font-size: var(--cg-font-size-base, 16px);
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .collapse-icon {
      color: var(--cg-gray-500, #71717a);
      font-size: var(--cg-font-size-xs, 12px);
      transition: transform 200ms;
    }
    .panel.collapsed .collapse-icon { transform: rotate(-90deg); }

    .header-actions { display: flex; gap: var(--cg-spacing-4, 4px); }
    .header-btn {
      background: none;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-400, #a1a1aa);
      border-radius: var(--cg-border-radius-100, 8px);
      padding: 3px var(--cg-spacing-8, 8px);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms;
      font-family: inherit;
    }
    .header-btn:hover {
      color: var(--cg-color-surface-base-text, #fafafa);
      border-color: var(--cg-gray-600, #52525b);
    }

    /* ── Body ── */
    .body {
      padding: 0 18px 18px;
    }
    .panel.collapsed .body { display: none; }

    /* ── Tabs ── */
    .tabs {
      display: flex;
      gap: 0;
      margin-bottom: var(--cg-spacing-12, 12px);
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .tab {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      color: var(--cg-gray-500, #71717a);
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 150ms;
      font-family: inherit;
    }
    .tab:hover { color: var(--cg-gray-300, #d4d4d8); }
    .tab.active {
      color: var(--cg-brand-ai-accent, #dfff61);
      border-bottom-color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Summary tab ── */
    .explanation {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.6;
      padding-bottom: var(--cg-spacing-14, 14px);
      margin-bottom: var(--cg-spacing-14, 14px);
      border-bottom: 1px solid var(--cg-color-surface-container-border, #27272a);
    }

    .bullets {
      list-style: none;
      padding: 0;
      margin: 0;
      padding-bottom: var(--cg-spacing-14, 14px);
      margin-bottom: var(--cg-spacing-14, 14px);
      border-bottom: 1px solid var(--cg-color-surface-container-border, #27272a);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-6, 6px);
    }
    .bullet {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-8, 8px);
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.5;
    }
    .bullet::before {
      content: '\u2192';
      color: var(--cg-brand-ai-accent, #dfff61);
      font-weight: 700;
      flex-shrink: 0;
    }

    /* ── Drivers ── */
    .drivers-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cg-spacing-8, 8px);
    }
    .drivers-label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 700;
      color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .sort-btn {
      background: none;
      border: none;
      color: var(--cg-gray-500, #71717a);
      font-size: var(--cg-font-size-xs, 12px);
      cursor: pointer;
      font-family: inherit;
    }
    .sort-btn:hover { color: var(--cg-brand-ai-accent, #dfff61); }

    .drivers {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-10, 10px);
    }
    .driver {
      background: var(--cg-color-surface-base-background, #09090b);
      border: 1px solid var(--cg-gray-800, #27272a);
      border-radius: var(--cg-border-radius-100, 8px);
      padding: var(--cg-spacing-10, 10px) var(--cg-spacing-12, 12px);
    }
    .driver-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-6, 6px);
    }
    .driver-name { font-size: 12px; color: var(--cg-gray-400, #a1a1aa); }
    .driver-value {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 700;
    }
    .driver-value.positive { color: var(--cg-green-400, #4ade80); }
    .driver-value.negative { color: var(--cg-red-400, #f87171); }

    .driver-bar {
      height: 4px;
      border-radius: 2px;
      background: var(--cg-gray-800, #27272a);
      overflow: hidden;
    }
    .driver-fill {
      height: 100%;
      border-radius: 2px;
      transition: width var(--cg-motion-duration-slow, 600ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }
    .driver-fill.positive { background: var(--cg-green-400, #4ade80); }
    .driver-fill.negative { background: var(--cg-red-400, #f87171); }

    /* ── Sources tab ── */
    .source-item {
      padding: var(--cg-spacing-8, 8px) 0;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .source-item:last-child { border-bottom: none; }
    .source-title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: 600;
      color: var(--cg-brand-ai-accent, #dfff61);
      text-decoration: none;
    }
    .source-title:hover { text-decoration: underline; }
    .source-excerpt {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      margin-top: var(--cg-spacing-4, 4px);
      line-height: 1.4;
    }

    /* ── Data tab ── */
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--cg-font-size-xs, 12px);
    }
    .data-table th {
      text-align: left;
      padding: var(--cg-spacing-6, 6px) var(--cg-spacing-8, 8px);
      color: var(--cg-gray-400, #a1a1aa);
      font-weight: 600;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .data-table td {
      padding: var(--cg-spacing-6, 6px) var(--cg-spacing-8, 8px);
      color: var(--cg-color-surface-base-text, #fafafa);
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }

    /* ── Streaming ── */
    .streaming-indicator {
      padding: var(--cg-spacing-12, 12px) 0;
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24, 24px);
      color: var(--cg-gray-500, #71717a);
      font-size: var(--cg-font-size-sm, 14px);
    }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .panel { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: String }) override title: string = 'AI Analysis';
  @property({ type: String }) explanation: string = '';
  @property({ type: Array }) bullets: string[] = [];
  @property({ type: Array }) drivers: Driver[] = [];
  @property({ type: Number }) confidence: number = 0;
  @property({ type: Boolean }) collapsible: boolean = false;
  @property({ type: Array }) sources: Source[] = [];
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ type: Boolean }) streaming: boolean = false;

  @state() private _collapsed: boolean = false;
  @state() private _activeTab: 'summary' | 'data' | 'sources' = 'summary';
  @state() private _sortAsc: boolean = false;

  private get _sortedDrivers(): Driver[] {
    const sorted = [...this.drivers].sort((a, b) =>
      this._sortAsc ? a.impact - b.impact : b.impact - a.impact
    );
    return sorted;
  }

  private _toggleCollapse() {
    if (!this.collapsible) return;
    this._collapsed = !this._collapsed;
  }

  private _handleExport(format: string) {
    this.dispatchEvent(new CustomEvent('ai-result-export', {
      bubbles: true, composed: true,
      detail: { format, title: this.title, explanation: this.explanation, bullets: this.bullets, drivers: this.drivers },
    }));
  }

  private _handleCopy() {
    const text = `${this.title}\n\n${this.explanation}\n\n${this.bullets.map(b => `→ ${b}`).join('\n')}`;
    navigator.clipboard?.writeText(text);
    this.dispatchEvent(new CustomEvent('ai-result-copy', { bubbles: true, composed: true, detail: { content: text } }));
  }

  private _renderSummary() {
    return html`
      ${this.explanation ? html`<div class="explanation">${this.explanation}</div>` : nothing}

      ${this.bullets.length > 0 ? html`
        <ul class="bullets" role="list">
          ${this.bullets.map(b => html`<li class="bullet">${b}</li>`)}
        </ul>
      ` : nothing}

      ${this.drivers.length > 0 ? html`
        <div class="drivers-header">
          <span class="drivers-label">Impact Drivers</span>
          <button class="sort-btn" @click=${() => { this._sortAsc = !this._sortAsc; }}>
            Sort ${this._sortAsc ? html`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>` : html`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m7-7l-7 7-7-7"/></svg>`}
          </button>
        </div>
        <div class="drivers">
          ${this._sortedDrivers.map(d => html`
            <div class="driver">
              <div class="driver-top">
                <span class="driver-name">${d.factor}</span>
                <span class="driver-value ${d.impact >= 0 ? 'positive' : 'negative'}">
                  ${d.impact >= 0 ? '+' : ''}${d.impact}%
                </span>
              </div>
              <div class="driver-bar">
                <div class="driver-fill ${d.impact >= 0 ? 'positive' : 'negative'}"
                  style="width: ${Math.min(Math.abs(d.impact), 100)}%"></div>
              </div>
            </div>
          `)}
        </div>
      ` : nothing}
    `;
  }

  private _renderData() {
    if (this.data.length === 0 || !this.data[0]) return html`<div class="empty">No data available</div>`;
    const keys = Object.keys(this.data[0]);
    return html`
      <table class="data-table">
        <thead><tr>${keys.map(k => html`<th>${k}</th>`)}</tr></thead>
        <tbody>${this.data.map(row => html`
          <tr>${keys.map(k => html`<td>${String(row[k] ?? '')}</td>`)}</tr>
        `)}</tbody>
      </table>
    `;
  }

  private _renderSources() {
    if (this.sources.length === 0) return html`<div class="empty">No sources available</div>`;
    return html`
      ${this.sources.map(s => html`
        <div class="source-item">
          ${s.url
            ? html`<a class="source-title" href="${s.url}" target="_blank" rel="noopener">${s.title}</a>`
            : html`<span class="source-title">${s.title}</span>`}
          ${s.excerpt ? html`<div class="source-excerpt">${s.excerpt}</div>` : nothing}
        </div>
      `)}
    `;
  }

  override render() {
    if (!this.explanation && !this.streaming) {
      return html`<div class="panel"><div class="empty">No results yet. Run an AI analysis to see results here.</div></div>`;
    }

    const hasTabs = this.data.length > 0 || this.sources.length > 0;

    return html`
      <div class="panel ${this._collapsed ? 'collapsed' : ''}" role="region" aria-label="${this.title}">
        <div class="header" @click=${this._toggleCollapse}>
          <div class="header-left">
            ${this.collapsible ? html`<span class="collapse-icon" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>` : nothing}
            <span class="title">${this.title}</span>
            ${this.confidence > 0 ? html`<ai-badge score="${this.confidence}" size="sm"></ai-badge>` : nothing}
          </div>
          <div class="header-actions" @click=${(e: Event) => e.stopPropagation()}>
            <button class="header-btn" @click=${this._handleCopy}>Copy</button>
            <button class="header-btn" @click=${() => this._handleExport('json')}>Export</button>
          </div>
        </div>

        <div class="body">
          ${this.streaming ? html`
            <div class="streaming-indicator">
              <ai-thinking text="Analyzing" shimmer delay="0"></ai-thinking>
            </div>
          ` : nothing}

          ${hasTabs ? html`
            <div class="tabs">
              <button class="tab ${this._activeTab === 'summary' ? 'active' : ''}" @click=${() => this._activeTab = 'summary'}>Summary</button>
              ${this.data.length > 0 ? html`<button class="tab ${this._activeTab === 'data' ? 'active' : ''}" @click=${() => this._activeTab = 'data'}>Data</button>` : nothing}
              ${this.sources.length > 0 ? html`<button class="tab ${this._activeTab === 'sources' ? 'active' : ''}" @click=${() => this._activeTab = 'sources'}>Sources</button>` : nothing}
            </div>
          ` : nothing}

          ${this._activeTab === 'summary' ? this._renderSummary() : nothing}
          ${this._activeTab === 'data' ? this._renderData() : nothing}
          ${this._activeTab === 'sources' ? this._renderSources() : nothing}
        </div>
      </div>
    `;
  }
}
