/**
 * @element ai-model-selector
 * Card grid for picking AI models. Shows name, provider, capabilities,
 * and cost tier. Supports single or multi-select with capability filtering.
 * Multi-select triggers a comparison event when two models are chosen.
 *
 * @example
 * ```html
 * <ai-model-selector
 *   .models=${[{ id: 'gpt4', name: 'GPT-4', provider: 'OpenAI', capabilities: ['vision', 'code'], costTier: 'high' }]}
 *   selected="gpt4"
 *   multi
 * ></ai-model-selector>
 * ```
 *
 * @prop {AIModel[]} models - Available models array
 * @prop {string} selected - Initially selected model ID
 * @prop {boolean} multi - Enable multi-select mode
 *
 * @fires {CustomEvent<{selected: string[], model: AIModel}>} ai-model-select - When a model is selected
 * @fires {CustomEvent<{models: AIModel[]}>} ai-model-compare - When exactly 2 models are selected (multi mode)
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface AIModel {
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
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    .filter-row {
      display: flex;
      gap: var(--cg-spacing-6, 6px);
      margin-bottom: var(--cg-spacing-12, 12px);
      padding-bottom: var(--cg-spacing-12, 12px);
      border-bottom: 1px solid var(--cg-color-surface-container-border, #27272a);
      flex-wrap: wrap;
    }
    .filter-chip {
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px);
      border-radius: var(--cg-border-radius-100, 8px);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none;
      color: var(--cg-gray-400, #a1a1aa);
      font: inherit;
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms;
    }
    .filter-chip:hover { border-color: var(--cg-gray-600, #52525b); color: var(--cg-color-surface-base-text, #fafafa); }
    .filter-chip.active { border-color: var(--cg-brand-ai-accent, #dfff61); color: var(--cg-brand-ai-accent, #dfff61); background: rgba(223, 255, 97, 0.06); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: var(--cg-spacing-12, 12px);
    }

    .model-card {
      padding: var(--cg-spacing-14, 14px) var(--cg-spacing-16, 16px);
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-100, 8px);
      cursor: pointer;
      transition: all 150ms;
      position: relative;
      box-shadow: var(--cg-elevation-1, 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }
    .model-card:hover { border-color: var(--cg-gray-600, #52525b); }
    .model-card:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 2px; }
    .model-card.selected {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      background: rgba(223, 255, 97, 0.04);
    }

    .check {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #000;
      font-size: 10px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .model-header {
      display: flex; align-items: center; gap: var(--cg-spacing-8, 8px);
      padding-bottom: var(--cg-spacing-8, 8px); margin-bottom: var(--cg-spacing-8, 8px);
      border-bottom: 1px solid var(--cg-color-surface-container-border, #27272a);
    }
    .model-icon { font-size: var(--cg-font-size-xl, 20px); }
    .model-info { flex: 1; }
    .model-name { font-size: var(--cg-font-size-sm, 14px); font-weight: 600; color: var(--cg-color-surface-base-text, #fafafa); }
    .model-provider { font-size: var(--cg-font-size-xs, 12px); color: var(--cg-gray-500, #71717a); }

    .model-desc { font-size: var(--cg-font-size-xs, 12px); color: var(--cg-gray-400, #a1a1aa); line-height: 1.4; margin-bottom: var(--cg-spacing-8, 8px); }

    .model-footer { display: flex; justify-content: space-between; align-items: center; }
    .caps { display: flex; gap: var(--cg-spacing-4, 4px); flex-wrap: wrap; }
    .cap {
      font-size: 9px;
      padding: 1px 6px;
      border-radius: 3px;
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-gray-400, #a1a1aa);
      font-weight: 600;
      text-transform: uppercase;
    }
    .cost {
      font-size: 10px;
      font-weight: 700;
      padding: 2px var(--cg-spacing-8, 8px);
      border-radius: var(--cg-border-radius-50, 4px);
    }
    .cost.free { background: rgba(34, 197, 94, 0.1); color: var(--cg-green-400, #4ade80); }
    .cost.low { background: rgba(34, 197, 94, 0.1); color: var(--cg-green-400, #4ade80); }
    .cost.medium { background: rgba(245, 158, 11, 0.1); color: var(--cg-yellow-400, #fbbf24); }
    .cost.high { background: rgba(239, 68, 68, 0.1); color: var(--cg-red-400, #f87171); }

    .empty { text-align: center; padding: 32px; color: var(--cg-gray-500, #71717a); font-size: 13px; }
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .model-card { border-radius: 0; }
    :host([rounded="sm"]) .model-card { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .model-card { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .model-card { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .model-card { border-radius: var(--cg-border-radius-full, 99999px); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) models: AIModel[] = [];
  @property({ type: String }) selected: string = '';
  @property({ type: Boolean }) multi: boolean = false;

  @state() private _selectedIds: Set<string> = new Set();
  @state() private _activeFilter: string = '';

  override updated(changed: Map<string, unknown>) {
    if (changed.has('selected') && this.selected) {
      this._selectedIds = new Set([this.selected]);
    }
  }

  private get _allCapabilities(): string[] {
    const caps = new Set<string>();
    for (const m of this.models) {
      for (const c of m.capabilities || []) caps.add(c);
    }
    return [...caps].sort();
  }

  private get _filteredModels(): AIModel[] {
    if (!this._activeFilter) return this.models;
    return this.models.filter(m => m.capabilities?.includes(this._activeFilter));
  }

  private _handleSelect(model: AIModel) {
    if (this.multi) {
      if (this._selectedIds.has(model.id)) this._selectedIds.delete(model.id);
      else this._selectedIds.add(model.id);
      this._selectedIds = new Set(this._selectedIds);
    } else {
      this._selectedIds = new Set([model.id]);
    }

    this.dispatchEvent(new CustomEvent('ai-model-select', {
      bubbles: true, composed: true,
      detail: { selected: [...this._selectedIds], model },
    }));

    if (this.multi && this._selectedIds.size === 2) {
      const ids = [...this._selectedIds];
      this.dispatchEvent(new CustomEvent('ai-model-compare', {
        bubbles: true, composed: true,
        detail: { models: ids.map(id => this.models.find(m => m.id === id)) },
      }));
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
    if (this.models.length === 0) {
      return html`<div class="empty">No models available</div>`;
    }

    const caps = this._allCapabilities;
    const filtered = this._filteredModels;

    return html`
      ${caps.length > 0 ? html`
        <div class="filter-row" role="group" aria-label="Filter by capability">
          <button class="filter-chip ${!this._activeFilter ? 'active' : ''}"
            @click=${() => { this._activeFilter = ''; }}>All</button>
          ${caps.map(c => html`
            <button class="filter-chip ${this._activeFilter === c ? 'active' : ''}"
              @click=${() => { this._activeFilter = this._activeFilter === c ? '' : c; }}>${c}</button>
          `)}
        </div>
      ` : nothing}

      <div class="grid" role="listbox" aria-label="Select a model" aria-multiselectable="${this.multi}">
        ${filtered.map(m => html`
          <div class="model-card ${this._selectedIds.has(m.id) ? 'selected' : ''}"
            role="${this.multi ? 'checkbox' : 'radio'}" tabindex="0"
            aria-selected="${this._selectedIds.has(m.id)}"
            @click=${() => this._handleSelect(m)}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleSelect(m); } }}>

            ${this._selectedIds.has(m.id) ? html`<div class="check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>` : nothing}

            <div class="model-header">
              ${m.icon ? html`<span class="model-icon">${m.icon}</span>` : nothing}
              <div class="model-info">
                <div class="model-name">${m.name}</div>
                <div class="model-provider">${m.provider}</div>
              </div>
            </div>

            ${m.description ? html`<div class="model-desc">${m.description}</div>` : nothing}

            <div class="model-footer">
              <div class="caps">
                ${(m.capabilities || []).slice(0, 3).map(c => html`<span class="cap">${c}</span>`)}
              </div>
              ${m.costTier ? html`<span class="cost ${m.costTier}">${this._getCostLabel(m.costTier)}</span>` : nothing}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}
