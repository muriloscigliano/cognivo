/**
 * Atlas Library Component
 *
 * Browsable, filterable view of all Atlas interaction patterns.
 * Provides dimension/layer/status filtering, text search, and
 * a stats bar summarising coverage.
 *
 * @module @cognivo/design-advisor/components/atlas-library
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { AtlasPatternCard, AtlasDimension, AtlasLayer, ImplementationStatus } from '../atlas/types.js';
import { atlasRegistry } from '../atlas/atlas-registry.js';
import './atlas-pattern-card.js';

// ---------------------------------------------------------------------------
// Filter option definitions
// ---------------------------------------------------------------------------

const DIMENSIONS: { value: AtlasDimension | 'all'; label: string }[] = [
  { value: 'all',            label: 'All Dimensions' },
  { value: 'ai_tasks',       label: 'AI Tasks' },
  { value: 'human_tasks',    label: 'Human Tasks' },
  { value: 'system_tasks',   label: 'System Tasks' },
  { value: 'data_artifacts', label: 'Data Artifacts' },
  { value: 'constraints',    label: 'Constraints' },
  { value: 'touchpoints',    label: 'Touchpoints' },
];

const LAYERS: { value: AtlasLayer | 'all'; label: string }[] = [
  { value: 'all',         label: 'All Layers' },
  { value: 'inbound',     label: 'Inbound' },
  { value: 'internal',    label: 'Internal' },
  { value: 'outbound',    label: 'Outbound' },
  { value: 'interactive', label: 'Interactive' },
];

const STATUSES: { value: ImplementationStatus | 'all'; label: string }[] = [
  { value: 'all',         label: 'All Statuses' },
  { value: 'implemented', label: 'Implemented' },
  { value: 'partial',     label: 'Partial' },
  { value: 'planned',     label: 'Planned' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

@customElement('atlas-library')
export class AtlasLibraryElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      padding: var(--cg-spacing-24, 24px);
      color: var(--cg-gray-100, #f5f5f5);
    }

    .library {
      max-width: 1400px;
      margin: 0 auto;
    }

    /* -- Header ----------------------------------------------------------- */

    .header {
      margin-bottom: var(--cg-spacing-32, 32px);
    }

    .title {
      font-size: var(--cg-font-size-3xl, 32px);
      font-weight: var(--cg-font-weight-bold, 700);
      color: var(--cg-gray-50, #fafafa);
      margin: 0 0 var(--cg-spacing-8, 8px) 0;
    }

    .subtitle {
      font-size: var(--cg-font-size-base, 16px);
      color: var(--cg-gray-400, #9e9e9e);
      margin: 0 0 var(--cg-spacing-24, 24px) 0;
    }

    /* -- Stats bar -------------------------------------------------------- */

    .stats {
      display: flex;
      gap: var(--cg-spacing-16, 16px);
      flex-wrap: wrap;
      margin-bottom: var(--cg-spacing-24, 24px);
    }

    .stat {
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-24, 20px);
      background: var(--cg-color-surface-inset-background, #242424);
      border-radius: 16px;
      min-width: 120px;
    }

    .stat-value {
      font-size: var(--cg-font-size-2xl, 24px);
      font-weight: var(--cg-font-weight-bold, 700);
      color: var(--cg-brand-primary-400, #7c4dff);
    }

    .stat-label {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #757575);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: var(--cg-spacing-4, 4px);
    }

    /* -- Controls --------------------------------------------------------- */

    .controls {
      display: flex;
      gap: var(--cg-spacing-16, 16px);
      flex-wrap: wrap;
      margin-bottom: var(--cg-spacing-24, 24px);
      padding: var(--cg-spacing-24, 20px);
      background: var(--cg-color-surface-container-background, #1e1e1e);
      border: var(--cg-Border-width-50, 1px) solid var(--cg-color-surface-container-border, #2a2a2a);
      border-radius: 16px;
    }

    .search {
      flex: 1;
      min-width: 250px;
    }

    .search input {
      width: 100%;
      box-sizing: border-box;
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      border: var(--cg-Border-width-50, 1px) solid var(--cg-color-surface-field-border, #333);
      border-radius: 16px;
      font-size: var(--cg-font-size-sm, 14px);
      font-family: inherit;
      background: var(--cg-color-surface-inset-background, #242424);
      color: var(--cg-gray-100, #f5f5f5);
    }

    .search input::placeholder {
      color: var(--cg-gray-500, #757575);
    }

    .search input:focus {
      outline: none;
      border-color: var(--cg-brand-primary-400, #7c4dff);
    }

    /* -- Filter pills ----------------------------------------------------- */

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8, 8px);
    }

    .filter-label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-gray-500, #757575);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .pill-row {
      display: flex;
      gap: var(--cg-spacing-4, 4px);
      flex-wrap: wrap;
    }

    .filter-pill {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px);
      border: var(--cg-Border-width-50, 1px) solid var(--cg-color-surface-container-border, #333);
      background: transparent;
      border-radius: 999px;
      font-size: var(--cg-font-size-xs, 12px);
      font-family: inherit;
      color: var(--cg-gray-300, #bdbdbd);
      cursor: pointer;
      transition: all var(--cg-transition-duration-default, 200ms);
    }

    .filter-pill:hover {
      background: var(--cg-color-surface-inset-background, #2a2a2a);
    }

    .filter-pill.active {
      background: var(--cg-brand-primary-400, #7c4dff);
      color: var(--cg-gray-50, #fafafa);
      border-color: var(--cg-brand-primary-400, #7c4dff);
    }

    /* -- Results header --------------------------------------------------- */

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cg-spacing-16, 16px);
    }

    .results-count {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-gray-500, #757575);
    }

    /* -- Grid ------------------------------------------------------------- */

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: var(--cg-spacing-24, 24px);
    }

    /* -- Empty state ------------------------------------------------------ */

    .empty {
      text-align: center;
      padding: var(--cg-spacing-64, 64px) var(--cg-spacing-24, 24px);
      color: var(--cg-gray-500, #757575);
    }

    .empty-text {
      font-size: var(--cg-font-size-md, 18px);
      margin-bottom: var(--cg-spacing-8, 8px);
    }

    .empty-hint {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-gray-600, #616161);
    }
  `;

  /** Supply patterns externally; defaults to all patterns from the registry. */
  @property({ type: Array })
  patterns?: AtlasPatternCard[];

  @state() private searchQuery = '';
  @state() private selectedDimension: AtlasDimension | 'all' = 'all';
  @state() private selectedLayer: AtlasLayer | 'all' = 'all';
  @state() private selectedStatus: ImplementationStatus | 'all' = 'all';

  // -----------------------------------------------------------------------
  // Derived data
  // -----------------------------------------------------------------------

  private get allPatterns(): AtlasPatternCard[] {
    return this.patterns ?? atlasRegistry.getAll();
  }

  private get filteredPatterns(): AtlasPatternCard[] {
    let results = this.allPatterns;

    if (this.selectedDimension !== 'all') {
      results = results.filter(p => p.dimension === this.selectedDimension);
    }
    if (this.selectedLayer !== 'all') {
      results = results.filter(p => p.layer === this.selectedLayer);
    }
    if (this.selectedStatus !== 'all') {
      results = results.filter(p => p.status === this.selectedStatus);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.elevatorPitch.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q),
      );
    }

    return results;
  }

  private get stats() {
    const all = this.allPatterns;
    return {
      total: all.length,
      implemented: all.filter(p => p.status === 'implemented').length,
      partial: all.filter(p => p.status === 'partial').length,
      planned: all.filter(p => p.status === 'planned').length,
    };
  }

  // -----------------------------------------------------------------------
  // Event handlers
  // -----------------------------------------------------------------------

  private handleSearch(e: Event) {
    this.searchQuery = (e.target as HTMLInputElement).value;
  }

  private setDimension(value: AtlasDimension | 'all') {
    this.selectedDimension = value;
  }

  private setLayer(value: AtlasLayer | 'all') {
    this.selectedLayer = value;
  }

  private setStatus(value: ImplementationStatus | 'all') {
    this.selectedStatus = value;
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  override render() {
    const s = this.stats;
    const filtered = this.filteredPatterns;

    return html`
      <div class="library">
        <div class="header">
          <h1 class="title">Atlas Pattern Library</h1>
          <p class="subtitle">AI Interaction Atlas — patterns, components, and cognitive bias mappings</p>

          <div class="stats">
            <div class="stat">
              <div class="stat-value">${s.total}</div>
              <div class="stat-label">Patterns</div>
            </div>
            <div class="stat">
              <div class="stat-value">${s.implemented}</div>
              <div class="stat-label">Implemented</div>
            </div>
            <div class="stat">
              <div class="stat-value">${s.partial}</div>
              <div class="stat-label">Partial</div>
            </div>
            <div class="stat">
              <div class="stat-value">${s.planned}</div>
              <div class="stat-label">Planned</div>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="search">
            <input
              type="search"
              placeholder="Search patterns by name or description..."
              .value=${this.searchQuery}
              @input=${this.handleSearch}
            />
          </div>

          <div class="filter-group">
            <span class="filter-label">Dimension</span>
            <div class="pill-row">
              ${DIMENSIONS.map(d => html`
                <button
                  class="filter-pill ${this.selectedDimension === d.value ? 'active' : ''}"
                  @click=${() => this.setDimension(d.value)}
                >${d.label}</button>
              `)}
            </div>
          </div>

          <div class="filter-group">
            <span class="filter-label">Layer</span>
            <div class="pill-row">
              ${LAYERS.map(l => html`
                <button
                  class="filter-pill ${this.selectedLayer === l.value ? 'active' : ''}"
                  @click=${() => this.setLayer(l.value)}
                >${l.label}</button>
              `)}
            </div>
          </div>

          <div class="filter-group">
            <span class="filter-label">Status</span>
            <div class="pill-row">
              ${STATUSES.map(s => html`
                <button
                  class="filter-pill ${this.selectedStatus === s.value ? 'active' : ''}"
                  @click=${() => this.setStatus(s.value)}
                >${s.label}</button>
              `)}
            </div>
          </div>
        </div>

        <div class="results-header">
          <span class="results-count">
            ${filtered.length} ${filtered.length === 1 ? 'pattern' : 'patterns'} found
          </span>
        </div>

        ${filtered.length === 0 ? html`
          <div class="empty">
            <div class="empty-text">No patterns match your filters</div>
            <div class="empty-hint">Try broadening your search or adjusting filters</div>
          </div>
        ` : html`
          <div class="grid">
            ${filtered.map(p => html`
              <atlas-pattern-card .pattern=${p}></atlas-pattern-card>
            `)}
          </div>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atlas-library': AtlasLibraryElement;
  }
}
