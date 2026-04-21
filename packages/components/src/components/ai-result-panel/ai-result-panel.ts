/**
 * @element ai-result-panel
 * Collapsible AI analysis panel with tabbed views (Summary, Data, Sources).
 *
 * @fires {CustomEvent<{format: string}>} ai-result-export
 * @fires {CustomEvent<{content: string}>} ai-result-copy
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface Driver { factor: string; impact: number; }
interface Source { title: string; url?: string; excerpt?: string; }

@customElement('ai-result-panel')
export class AiResultPanel extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
    }

    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      cursor: pointer;
    }
    .header-left { display: flex; align-items: center; gap: var(--cg-spacing-8); }
    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .confidence {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      font-weight: var(--cg-font-weight-medium);
    }
    .collapse-icon {
      color: var(--cg-color-input-text-placeholder);
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .collapse-icon svg { width: var(--cg-spacing-12); height: var(--cg-spacing-12); display: block; }
    .panel.collapsed .collapse-icon { transform: rotate(-90deg); }

    .header-actions { display: flex; gap: var(--cg-spacing-4); }
    .header-btn {
      background: none;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      border-radius: var(--cg-border-radius-50);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      font-family: inherit;
      transition:
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .header-btn:hover { color: var(--cg-color-surface-base-text); border-color: var(--cg-color-input-border-hover); }
    .header-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .header-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }

    /* ── Body ── */
    .body { padding: 0 var(--cg-spacing-20) var(--cg-spacing-20); }
    .panel.collapsed .body { display: none; }

    /* ── Tabs ── */
    .tabs {
      display: flex;
      margin-bottom: var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .tab {
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      background: none;
      border: none;
      border-bottom: var(--cg-border-width-100) solid transparent;
      cursor: pointer;
      font-family: inherit;
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .tab:hover { color: var(--cg-color-surface-base-text); }
    .tab.active {
      color: var(--cg-color-surface-base-text);
      border-bottom-color: var(--cg-color-action-primary-background-default);
    }
    .tab:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }

    /* ── Explanation ── */
    .explanation {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-normal);
      margin-bottom: var(--cg-spacing-16);
      padding-bottom: var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    /* ── Bullets ── */
    .bullets {
      list-style: none;
      padding: 0;
      margin: 0 0 var(--cg-spacing-16);
      padding-bottom: var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }
    .bullet {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-8);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-normal);
    }
    .bullet-dot {
      width: var(--cg-spacing-4);
      height: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      flex-shrink: 0;
      margin-top: var(--cg-spacing-8);
    }

    /* ── Drivers ── */
    .drivers-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cg-spacing-12);
    }
    .drivers-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .sort-btn {
      background: none;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      cursor: pointer;
      font-family: inherit;
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
    }
    .sort-btn:hover { color: var(--cg-color-surface-base-text); }
    .sort-btn svg { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }

    .drivers {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }
    .driver {
      padding: var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-overlay-dark-subtle);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .driver-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-8);
    }
    .driver-name {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      font-weight: var(--cg-font-weight-medium);
    }
    .driver-value {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
    }
    .driver-value.positive { color: var(--cg-color-status-success-text-default); }
    .driver-value.negative { color: var(--cg-color-status-error-text-default); }

    .driver-bar {
      height: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-container-background);
      overflow: hidden;
    }
    .driver-fill {
      height: 100%;
      border-radius: var(--cg-border-radius-full);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    .driver-fill.positive { background: var(--cg-color-status-success-text-default); }
    .driver-fill.negative { background: var(--cg-color-status-error-text-default); }

    /* ── Sources ── */
    .source-item {
      padding: var(--cg-spacing-12) 0;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .source-item:last-child { border-bottom: none; }
    .source-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      text-decoration: none;
    }
    .source-title:hover { text-decoration: underline; }
    .source-excerpt {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-4);
      line-height: var(--cg-line-height-normal);
    }

    /* ── Data table ── */
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--cg-font-size-xs);
    }
    .data-table th {
      text-align: left;
      padding: var(--cg-spacing-8);
      color: var(--cg-color-input-text-placeholder);
      font-weight: var(--cg-font-weight-medium);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .data-table td {
      padding: var(--cg-spacing-8);
      color: var(--cg-color-surface-base-text);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    /* ── Streaming ── */
    .streaming-indicator { padding: var(--cg-spacing-12) 0; }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }
  `];

  @property() override title = 'AI Analysis';
  @property() explanation = '';
  @property({ type: Array }) bullets: string[] = [];
  @property({ type: Array }) drivers: Driver[] = [];
  @property({ type: Number }) confidence = 0;
  @property({ type: Boolean }) collapsible = false;
  @property({ type: Array }) sources: Source[] = [];
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ type: Boolean }) streaming = false;

  @state() private _collapsed = false;
  @state() private _activeTab: 'summary' | 'data' | 'sources' = 'summary';
  @state() private _sortAsc = false;

  private get _sortedDrivers(): Driver[] {
    return [...this.drivers].sort((a, b) => this._sortAsc ? a.impact - b.impact : b.impact - a.impact);
  }

  private _toggleCollapse() { if (this.collapsible) this._collapsed = !this._collapsed; }

  private _handleExport(format: string) {
    this.dispatchEvent(new CustomEvent('ai-result-export', { bubbles: true, composed: true, detail: { format, title: this.title, explanation: this.explanation, bullets: this.bullets, drivers: this.drivers } }));
  }

  private _handleCopy() {
    const text = `${this.title}\n\n${this.explanation}\n\n${this.bullets.map(b => `• ${b}`).join('\n')}`;
    navigator.clipboard?.writeText(text);
    this.dispatchEvent(new CustomEvent('ai-result-copy', { bubbles: true, composed: true, detail: { content: text } }));
  }

  private _renderSummary() {
    return html`
      ${this.explanation ? html`<div class="explanation">${this.explanation}</div>` : nothing}

      ${this.bullets.length > 0 ? html`
        <ul class="bullets" role="list">
          ${this.bullets.map(b => html`<li class="bullet"><span class="bullet-dot"></span>${b}</li>`)}
        </ul>
      ` : nothing}

      ${this.drivers.length > 0 ? html`
        <div class="drivers-header">
          <span class="drivers-label">Impact Drivers</span>
          <button class="sort-btn" @click=${() => { this._sortAsc = !this._sortAsc; }}>
            Sort
            ${this._sortAsc
              ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>`
              : html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14m7-7l-7 7-7-7"/></svg>`}
          </button>
        </div>
        <div class="drivers">
          ${this._sortedDrivers.map(d => html`
            <div class="driver">
              <div class="driver-top">
                <span class="driver-name">${d.factor}</span>
                <span class="driver-value ${d.impact >= 0 ? 'positive' : 'negative'}">${d.impact >= 0 ? '+' : ''}${d.impact}%</span>
              </div>
              <div class="driver-bar">
                <div class="driver-fill ${d.impact >= 0 ? 'positive' : 'negative'}" style="width:${Math.min(Math.abs(d.impact), 100)}%"></div>
              </div>
            </div>
          `)}
        </div>
      ` : nothing}
    `;
  }

  private _renderData() {
    if (!this.data.length || !this.data[0]) return html`<div class="empty">No data available</div>`;
    const keys = Object.keys(this.data[0]);
    return html`
      <table class="data-table">
        <thead><tr>${keys.map(k => html`<th>${k}</th>`)}</tr></thead>
        <tbody>${this.data.map(row => html`<tr>${keys.map(k => html`<td>${String(row[k] ?? '')}</td>`)}</tr>`)}</tbody>
      </table>
    `;
  }

  private _renderSources() {
    if (!this.sources.length) return html`<div class="empty">No sources available</div>`;
    return html`${this.sources.map(s => html`
      <div class="source-item">
        ${s.url ? html`<a class="source-title" href="${s.url}" target="_blank" rel="noopener">${s.title}</a>` : html`<span class="source-title">${s.title}</span>`}
        ${s.excerpt ? html`<div class="source-excerpt">${s.excerpt}</div>` : nothing}
      </div>
    `)}`;
  }

  override render() {
    if (!this.explanation && !this.streaming) {
      return html`<div class="panel"><div class="empty">No results yet.</div></div>`;
    }

    const hasTabs = this.data.length > 0 || this.sources.length > 0;

    return html`
      <div class="panel ${this._collapsed ? 'collapsed' : ''}" role="region" aria-label="${this.title}">
        <div class="header"
          role=${this.collapsible ? 'button' : 'heading'}
          tabindex=${this.collapsible ? '0' : '-1'}
          aria-expanded=${this.collapsible ? String(!this._collapsed) : nothing}
          @click=${this._toggleCollapse}
          @keydown=${(e: KeyboardEvent) => { if (this.collapsible && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this._toggleCollapse(); } }}>
          <div class="header-left">
            ${this.collapsible ? html`<span class="collapse-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></span>` : nothing}
            <span class="title">${this.title}</span>
            ${this.confidence > 0 ? html`<span class="confidence">${this.confidence}%</span>` : nothing}
          </div>
          <div class="header-actions" @click=${(e: Event) => e.stopPropagation()}>
            <button class="header-btn" @click=${this._handleCopy}>Copy</button>
            <button class="header-btn" @click=${() => this._handleExport('json')}>Export</button>
          </div>
        </div>

        <div class="body">
          ${this.streaming ? html`<div class="streaming-indicator"><ai-thinking text="Analyzing" shimmer delay="0"></ai-thinking></div>` : nothing}

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
