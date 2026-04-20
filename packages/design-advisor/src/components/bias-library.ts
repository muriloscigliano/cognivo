/**
 * Bias Library Component
 *
 * Browse and search the cognitive bias library.
 * Provides filtering, sorting, and searching capabilities.
 */

import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { registry } from '../utils/bias-registry.js';
import type { BiasCard } from '../biases/core/types.js';
import { BiasCategory, ImpactLevel } from '../biases/core/types.js';
import './bias-card.js';

@customElement('bias-library')
export class BiasLibraryElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      padding: var(--cg-spacing-24, 24px);
    }

    .library {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      margin-bottom: var(--cg-spacing-32, 32px);
    }

    .title {
      font-size: var(--cg-font-size-3xl, 32px);
      font-weight: var(--cg-font-weight-bold, 700);
      color: var(--cg-color-surface-base-text, #1a1a1a);
      margin: 0 0 var(--cg-spacing-8, 8px) 0;
    }

    .subtitle {
      font-size: var(--cg-font-size-base, 16px);
      color: var(--cg-color-surface-cards-disable-text, #616161);
      margin: 0 0 var(--cg-spacing-24, 24px) 0;
    }

    .stats {
      display: flex;
      gap: var(--cg-spacing-16, 16px);
      flex-wrap: wrap;
      margin-bottom: var(--cg-spacing-24, 24px);
    }

    .stat {
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-24, 20px);
      background: var(--cg-color-surface-inset-background, #f5f5f5);
      border-radius: var(--cg-border-radius-100, 8px);
      min-width: 120px;
    }

    .stat-value {
      font-size: var(--cg-font-size-2xl, 24px);
      font-weight: var(--cg-font-weight-bold, 700);
      color: var(--cg-color-action-primary-background-default, #1976d2);
    }

    .stat-label {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-surface-cards-disable-text, #757575);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: var(--cg-spacing-4, 4px);
    }

    .controls {
      display: flex;
      gap: var(--cg-spacing-16, 16px);
      flex-wrap: wrap;
      margin-bottom: var(--cg-spacing-32, 32px);
      padding: var(--cg-spacing-24, 20px);
      background: var(--cg-color-surface-container-background, white);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #e0e0e0);
      border-radius: var(--cg-border-radius-100, 8px);
    }

    .search {
      flex: 1;
      min-width: 250px;
    }

    .search input {
      width: 100%;
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, #e0e0e0);
      border-radius: var(--cg-border-radius-100, 6px);
      font-size: var(--cg-font-size-sm, 14px);
      font-family: inherit;
    }

    .search input:focus {
      outline: none;
      border-color: var(--cg-color-action-primary-border-focus, #1976d2);
    }

    .filter {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8, 8px);
    }

    .filter-label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      color: var(--cg-color-surface-cards-disable-text, #757575);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    select {
      padding: var(--cg-spacing-10, 10px) var(--cg-spacing-12, 12px);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, #e0e0e0);
      border-radius: var(--cg-border-radius-100, 6px);
      font-size: var(--cg-font-size-sm, 14px);
      font-family: inherit;
      background: var(--cg-color-surface-container-background, white);
      cursor: pointer;
    }

    select:focus {
      outline: none;
      border-color: var(--cg-color-action-primary-border-focus, #1976d2);
    }

    .view-toggle {
      display: flex;
      gap: var(--cg-spacing-8, 8px);
      align-items: flex-end;
    }

    .view-button {
      padding: var(--cg-spacing-10, 10px) var(--cg-spacing-16, 16px);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #e0e0e0);
      background: var(--cg-color-surface-container-background, white);
      border-radius: var(--cg-border-radius-100, 6px);
      font-size: var(--cg-font-size-sm, 14px);
      cursor: pointer;
      transition: all var(--cg-transition-duration-default, 200ms);
    }

    .view-button:hover {
      background: var(--cg-color-surface-inset-background, #f5f5f5);
    }

    .view-button.active {
      background: var(--cg-color-action-primary-background-default, #1976d2);
      color: var(--cg-color-action-primary-text-default, white);
      border-color: var(--cg-color-action-primary-border-default, #1976d2);
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cg-spacing-16, 16px);
    }

    .results-count {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-cards-disable-text, #757575);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: var(--cg-spacing-24, 24px);
    }

    .grid.compact {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--cg-spacing-16, 16px);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-16, 16px);
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-64, 64px) var(--cg-spacing-24, 24px);
      color: var(--cg-color-surface-cards-disable-text, #9e9e9e);
    }

    .empty-icon {
      font-size: var(--cg-font-size-4xl, 48px);
      margin-bottom: var(--cg-spacing-16, 16px);
    }

    .empty-text {
      font-size: var(--cg-font-size-md, 18px);
      margin-bottom: var(--cg-spacing-8, 8px);
    }

    .empty-hint {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-cards-disable-text, #bdbdbd);
    }
  `;

  @state()
  private searchQuery = '';

  @state()
  private selectedCategory: BiasCategory | 'all' = 'all';

  @state()
  private selectedImpact: ImpactLevel | 'all' = 'all';

  @state()
  private viewMode: 'grid' | 'compact' | 'list' = 'grid';

  @state()
  private filteredBiases: BiasCard[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this.updateFilteredBiases();
  }

  private updateFilteredBiases() {
    let biases = registry.getAll();

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      biases = biases.filter(bias =>
        bias.metadata.name.toLowerCase().includes(query) ||
        bias.metadata.aliases.some(alias => alias.toLowerCase().includes(query)) ||
        bias.metadata.tags.some(tag => tag.toLowerCase().includes(query)) ||
        bias.definition.simple.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (this.selectedCategory !== 'all') {
      biases = biases.filter(bias =>
        bias.metadata.category === this.selectedCategory ||
        bias.metadata.relatedCategories.includes(this.selectedCategory as BiasCategory)
      );
    }

    // Filter by impact level
    if (this.selectedImpact !== 'all') {
      biases = biases.filter(bias => {
        const levels = Object.values(bias.designImpact.impactAreas)
          .map(area => area.level);
        return levels.includes(this.selectedImpact as ImpactLevel);
      });
    }

    this.filteredBiases = biases;

    this.dispatchEvent(new CustomEvent('bias-browse', {
      bubbles: true,
      composed: true,
      detail: {
        query: this.searchQuery,
        category: this.selectedCategory,
        impact: this.selectedImpact,
        resultCount: this.filteredBiases.length,
      },
    }));
  }

  private handleSearch(e: Event) {
    this.searchQuery = (e.target as HTMLInputElement).value;
    this.updateFilteredBiases();
  }

  private handleCategoryChange(e: Event) {
    this.selectedCategory = (e.target as HTMLSelectElement).value as BiasCategory | 'all';
    this.updateFilteredBiases();
  }

  private handleImpactChange(e: Event) {
    this.selectedImpact = (e.target as HTMLSelectElement).value as ImpactLevel | 'all';
    this.updateFilteredBiases();
  }

  private setViewMode(mode: 'grid' | 'compact' | 'list') {
    this.viewMode = mode;
  }

  override render() {
    const stats = registry.getStatistics();

    return html`
      <div class="library">
        <div class="header">
          <h1 class="title">Cognitive Bias Library</h1>
          <p class="subtitle">
            Comprehensive collection of cognitive biases for design analysis
          </p>

          <div class="stats">
            <div class="stat">
              <div class="stat-value">${stats.total}</div>
              <div class="stat-label">Total Biases</div>
            </div>
            <div class="stat">
              <div class="stat-value">${stats.phase1Complete}</div>
              <div class="stat-label">Phase 1</div>
            </div>
            <div class="stat">
              <div class="stat-value">${stats.percentComplete}</div>
              <div class="stat-label">Complete</div>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="search">
            <input
              type="search"
              placeholder="Search biases..."
              .value=${this.searchQuery}
              @input=${this.handleSearch}
            />
          </div>

          <div class="filter">
            <span class="filter-label">Category</span>
            <select @change=${this.handleCategoryChange}>
              <option value="all">All Categories</option>
              <option value="${BiasCategory.PERCEPTION}">Perception</option>
              <option value="${BiasCategory.DECISION_MAKING}">Decision Making</option>
              <option value="${BiasCategory.MEMORY}">Memory</option>
              <option value="${BiasCategory.SOCIAL}">Social</option>
              <option value="${BiasCategory.ATTRIBUTION}">Attribution</option>
              <option value="${BiasCategory.EMOTIONAL}">Emotional</option>
              <option value="${BiasCategory.COGNITIVE}">Cognitive</option>
            </select>
          </div>

          <div class="filter">
            <span class="filter-label">Impact Level</span>
            <select @change=${this.handleImpactChange}>
              <option value="all">All Levels</option>
              <option value="${ImpactLevel.CRITICAL}">Critical</option>
              <option value="${ImpactLevel.HIGH}">High</option>
              <option value="${ImpactLevel.MEDIUM}">Medium</option>
              <option value="${ImpactLevel.LOW}">Low</option>
            </select>
          </div>

          <div class="view-toggle">
            <span class="filter-label">View</span>
            <div style="display: flex; gap: var(--cg-spacing-4, 4px);">
              <button
                class="view-button ${this.viewMode === 'grid' ? 'active' : ''}"
                @click=${() => this.setViewMode('grid')}
              >
                Grid
              </button>
              <button
                class="view-button ${this.viewMode === 'compact' ? 'active' : ''}"
                @click=${() => this.setViewMode('compact')}
              >
                Compact
              </button>
              <button
                class="view-button ${this.viewMode === 'list' ? 'active' : ''}"
                @click=${() => this.setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>

        <div class="results-header">
          <span class="results-count">
            ${this.filteredBiases.length} ${this.filteredBiases.length === 1 ? 'bias' : 'biases'} found
          </span>
        </div>

        ${this.filteredBiases.length === 0 ? html`
          <div class="empty">
            <div class="empty-icon">🔍</div>
            <div class="empty-text">No biases found</div>
            <div class="empty-hint">Try adjusting your search or filters</div>
          </div>
        ` : html`
          <div class="${this.viewMode === 'list' ? 'list' : 'grid'} ${this.viewMode === 'compact' ? 'compact' : ''}">
            ${this.filteredBiases.map(bias => html`
              <bias-card
                .bias=${bias}
                .compact=${this.viewMode === 'compact'}
              ></bias-card>
            `)}
          </div>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bias-library': BiasLibraryElement;
  }
}
