/**
 * @element ai-model-selector
 * Card grid for picking AI models. Single or multi-select with capability filters.
 *
 * @fires {CustomEvent<{selected: string[], model: AIModel}>} ai-model-select
 * @fires {CustomEvent<{models: AIModel[]}>} ai-model-compare - When 2 models selected in multi mode
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  icon?: string;
  capabilities?: string[];
  costTier?: 'free' | 'low' | 'medium' | 'high';
  description?: string;
}

@customElement('ai-model-selector')
export class AiModelSelector extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host([hidden]) { display: none; }

    /* ── Filter chips ── */
    .filter-row {
      display: flex; gap: var(--cg-spacing-6);
      margin-bottom: var(--cg-spacing-12);
      padding-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      flex-wrap: wrap;
    }
    .filter-chip {
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: transparent; color: var(--cg-color-surface-container-outlined);
      font: inherit; font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      cursor: pointer; text-transform: capitalize;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .filter-chip:hover { border-color: var(--cg-color-surface-cards-hover-border); color: var(--cg-color-surface-base-text); }
    .filter-chip:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    .filter-chip.active { border-color: var(--cg-color-action-primary-background-default); color: var(--cg-color-action-primary-background-default); background: var(--cg-overlay-accent-subtle); }

    /* ── Grid ── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: var(--cg-spacing-12);
    }

    /* ── Model card ── */
    .model-card {
      padding: var(--cg-spacing-16);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      cursor: pointer;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), background var(--cg-motion-duration-fast) var(--cg-motion-easing-default), transform var(--cg-motion-duration-fast) var(--cg-motion-easing-bounce);
      position: relative;
    }
    .model-card:hover { border-color: var(--cg-color-surface-cards-hover-border); background: var(--cg-color-surface-cards-hover-background); }
    .model-card:active { transform: scale(var(--cg-interaction-press-scale)); }
    .model-card:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    .model-card.selected {
      border-color: var(--cg-color-action-primary-background-default);
      background: var(--cg-overlay-accent-subtle);
    }

    /* ── Check indicator ── */
    .check {
      position: absolute; top: var(--cg-spacing-8); right: var(--cg-spacing-8);
      width: var(--cg-spacing-20); height: var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      display: flex; align-items: center; justify-content: center;
    }
    .check svg { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }

    /* ── Card content ── */
    .model-header {
      display: flex; align-items: center; gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-8);
    }
    .model-icon { font-size: var(--cg-font-size-lg); }
    .model-info { flex: 1; }
    .model-name { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold); color: var(--cg-color-surface-base-text); }
    .model-provider { font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined); }

    .model-desc { font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined); line-height: var(--cg-line-height-snug); margin-bottom: var(--cg-spacing-8); }

    .model-footer { display: flex; justify-content: space-between; align-items: center; }
    .caps { display: flex; gap: var(--cg-spacing-4); flex-wrap: wrap; }
    .model-footer cg-badge { --cg-badge-font-size: var(--cg-font-size-xs); }

    .empty { text-align: center; padding: var(--cg-spacing-48); color: var(--cg-color-surface-container-outlined); font-size: var(--cg-font-size-sm); }

    /* ── Rounded ── */
    :host([rounded="none"]) .model-card { border-radius: 0; }
    :host([rounded="sm"]) .model-card { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .model-card { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .model-card { border-radius: var(--cg-border-radius-150); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Array }) models: AIModel[] = [];
  @property() selected = '';
  @property({ type: Boolean }) multi = false;

  @state() private _selectedIds = new Set<string>();
  @state() private _activeFilter = '';
  @state() private _focusedIndex = -1;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('selected') && this.selected) {
      this._selectedIds = new Set([this.selected]);
    }
  }

  private get _allCapabilities(): string[] {
    const caps = new Set<string>();
    for (const m of this.models) for (const c of m.capabilities || []) caps.add(c);
    return [...caps].sort();
  }

  private get _filteredModels(): AIModel[] {
    if (!this._activeFilter) return this.models;
    return this.models.filter(m => m.capabilities?.includes(this._activeFilter));
  }

  private _handleGridKeydown(e: KeyboardEvent) {
    const models = this._filteredModels;
    if (!models.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      this._focusedIndex = this._focusedIndex >= models.length - 1 ? 0 : this._focusedIndex + 1;
      this._focusCard();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      this._focusedIndex = this._focusedIndex <= 0 ? models.length - 1 : this._focusedIndex - 1;
      this._focusCard();
    } else if ((e.key === 'Enter' || e.key === ' ') && this._focusedIndex >= 0) {
      e.preventDefault();
      const model = models[this._focusedIndex];
      if (model) this._handleSelect(model);
    }
  }

  private _focusCard() {
    this.updateComplete.then(() => {
      const cards = this.shadowRoot?.querySelectorAll('.model-card') as NodeListOf<HTMLElement>;
      cards?.[this._focusedIndex]?.focus();
    });
  }

  private _handleSelect(model: AIModel) {
    if (this.multi) {
      if (this._selectedIds.has(model.id)) this._selectedIds.delete(model.id);
      else this._selectedIds.add(model.id);
      this._selectedIds = new Set(this._selectedIds);
    } else {
      this._selectedIds = new Set([model.id]);
    }
    this.dispatchEvent(new CustomEvent('ai-model-select', { bubbles: true, composed: true, detail: { selected: [...this._selectedIds], model } }));
    if (this.multi && this._selectedIds.size === 2) {
      this.dispatchEvent(new CustomEvent('ai-model-compare', { bubbles: true, composed: true, detail: { models: [...this._selectedIds].map(id => this.models.find(m => m.id === id)) } }));
    }
  }

  private _getCostLabel(tier?: string): string {
    if (tier === 'free') return 'Free';
    if (tier === 'low') return '$';
    if (tier === 'medium') return '$$';
    if (tier === 'high') return '$$$';
    return '';
  }

  override render() {
    if (!this.models.length) return html`<div class="empty">No models available</div>`;
    const caps = this._allCapabilities;
    const filtered = this._filteredModels;

    return html`
      ${caps.length > 0 ? html`
        <div class="filter-row" role="group" aria-label="Filter by capability">
          <button class="filter-chip ${!this._activeFilter ? 'active' : ''}" @click=${() => { this._activeFilter = ''; }}>All</button>
          ${caps.map(c => html`<button class="filter-chip ${this._activeFilter === c ? 'active' : ''}" @click=${() => { this._activeFilter = this._activeFilter === c ? '' : c; }}>${c}</button>`)}
        </div>
      ` : nothing}

      <div class="grid" role="listbox" aria-label="Select a model" aria-multiselectable="${this.multi}" @keydown=${this._handleGridKeydown}>
        ${filtered.map(m => html`
          <div class="model-card ${this._selectedIds.has(m.id) ? 'selected' : ''}"
            role="${this.multi ? 'checkbox' : 'radio'}" tabindex="0"
            aria-selected="${this._selectedIds.has(m.id)}"
            @click=${() => this._handleSelect(m)}>
            ${this._selectedIds.has(m.id) ? html`<div class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>` : nothing}
            <div class="model-header">
              ${m.icon ? html`<span class="model-icon">${m.icon}</span>` : nothing}
              <div class="model-info">
                <div class="model-name">${m.name}</div>
                <div class="model-provider">${m.provider}</div>
              </div>
            </div>
            ${m.description ? html`<div class="model-desc">${m.description}</div>` : nothing}
            <div class="model-footer">
              <div class="caps">${(m.capabilities || []).slice(0, 3).map(c => html`<cg-badge label="${c}" size="sm"></cg-badge>`)}</div>
              ${m.costTier ? html`<cg-badge label="${this._getCostLabel(m.costTier)}" variant="${m.costTier === 'high' ? 'error' : m.costTier === 'medium' ? 'warning' : 'success'}" size="sm"></cg-badge>` : nothing}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}
