/**
 * @element ai-labeling-board
 * Data labeling board with label palette, assignable items, and per-label stats.
 * Supports list mode (dropdown per row) and click mode (select label then click items).
 *
 * @example
 * ```html
 * <ai-labeling-board
 *   mode="list"
 *   allowCustomLabels
 *   .items=${[{ id: '1', content: 'Sample text', label: 'positive' }]}
 *   .labels=${[{ id: 'positive', name: 'Positive', color: '#4ade80' }, { id: 'negative', name: 'Negative', color: '#f87171' }]}
 * ></ai-labeling-board>
 * ```
 *
 * @fires {CustomEvent<{itemId: string, labelId: string}>} ai-label-assign - Label assigned to item
 * @fires {CustomEvent<{itemId: string}>} ai-label-remove - Label removed from item
 * @fires {CustomEvent<{name: string, color: string}>} ai-label-create - New custom label created
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeInKeyframes } from '../../styles/index.js';

interface LabelItem {
  id: string;
  content: string;
  label?: string;
  metadata?: string;
}

interface LabelDef {
  id: string;
  name: string;
  color: string;
}

@customElement('ai-labeling-board')
export class AiLabelingBoard extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeInKeyframes, css`
    :host {
      animation: fadeIn var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }

    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-20) var(--cg-spacing-20) var(--cg-spacing-12);
    }
    .header-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .header-count {
      margin-left: auto;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    /* ── Label palette (click mode) ── */
    .palette {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-12) var(--cg-spacing-20);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .palette-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: var(--cg-color-surface-base-background);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
                  color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .palette-btn:hover {
      border-color: var(--cg-color-input-border-hover);
    }
    .palette-btn.active {
      border-color: var(--_label-color, var(--cg-color-surface-base-text));
      color: var(--_label-color, var(--cg-color-surface-base-text));
      background: color-mix(in srgb, var(--_label-color, var(--cg-color-surface-base-text)) 14%, transparent);
    }
    .palette-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-color-focus-ring);
    }
    .palette-dot {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
    }

    /* ── Add custom label ── */
    .add-label-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) dashed var(--cg-color-surface-cards-border);
      background: none;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      cursor: pointer;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
                  color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .add-label-btn:hover {
      border-color: var(--cg-color-input-border-hover);
      color: var(--cg-color-input-text-placeholder);
    }

    /* ── Items list (inset) ── */
    .items {
      display: flex;
      flex-direction: column;
      margin: 0 var(--cg-spacing-12);
      background: var(--cg-overlay-dark-subtle);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-125);
      overflow: hidden;
    }
    .item-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      cursor: default;
    }
    .item-row:last-child {
      border-bottom: none;
    }
    .item-row:hover {
      background: var(--cg-color-action-secondary-background-hover);
    }
    .item-row:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-color-focus-ring);
    }
    .item-row.clickable {
      cursor: pointer;
    }
    .item-row.unlabeled {
      opacity: 0.5;
    }
    .item-content {
      flex: 1;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-normal);
    }
    .item-meta {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-2);
    }

    /* ── Label pill on item ── */
    .item-label-pill {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .item-label-pill.unlabeled {
      background: var(--cg-overlay-dark-subtle);
      color: var(--cg-color-input-text-placeholder);
      border: var(--cg-border-width-50) dashed var(--cg-color-surface-cards-border);
    }
    .item-label-pill:hover { opacity: 0.8; }
    .item-label-dot {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
    }

    /* ── Dropdown select (list mode) ── */
    .label-select {
      background: var(--cg-color-input-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-50);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      cursor: pointer;
      flex-shrink: 0;
    }
    .label-select:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-color-focus-ring);
    }

    /* ── Remove label button ── */
    .remove-btn {
      background: none;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      padding: var(--cg-spacing-2);
      display: flex;
      align-items: center;
      border-radius: var(--cg-border-radius-full);
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .remove-btn:hover {
      color: var(--cg-color-status-error-text-default);
    }
    .remove-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-color-focus-ring);
    }
    .remove-btn svg {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
    }

    /* ── Stats bar ── */
    .stats {
      padding: var(--cg-spacing-12) var(--cg-spacing-20);
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-12);
    }
    .stat {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .stat-dot {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
    }
    .stat-count {
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
    }

    @media (prefers-reduced-motion: reduce) {
      :host { animation: none; }
    }
  `];

  @property({ type: Array }) items: LabelItem[] = [];
  @property({ type: Array }) labels: LabelDef[] = [];
  @property({ type: Boolean }) allowCustomLabels: boolean = false;
  @property({ type: String }) mode: 'click' | 'list' = 'list';

  @state() private _activeLabel: string = '';

  private _getLabel(id?: string): LabelDef | undefined {
    return this.labels.find(l => l.id === id);
  }

  private _assignLabel(itemId: string, labelId: string) {
    this.dispatchEvent(new CustomEvent('ai-label-assign', {
      bubbles: true, composed: true,
      detail: { itemId, labelId },
    }));
  }

  private _removeLabel(itemId: string, e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-label-remove', {
      bubbles: true, composed: true,
      detail: { itemId },
    }));
  }

  private _cycleLabel(itemId: string) {
    const item = this.items.find(i => i.id === itemId);
    if (!item) return;
    const currentIdx = this.labels.findIndex(l => l.id === item.label);
    const nextIdx = (currentIdx + 1) % (this.labels.length + 1);
    if (nextIdx === this.labels.length) {
      // Cycle back to unlabeled
      this.dispatchEvent(new CustomEvent('ai-label-remove', { bubbles: true, composed: true, detail: { itemId } }));
    } else {
      this._assignLabel(itemId, this.labels[nextIdx]!.id);
    }
  }

  private _handleSelectChange(itemId: string, e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    if (value) {
      this._assignLabel(itemId, value);
    }
  }

  private _createLabel() {
    const name = 'New Label';
    const colors = ['#60a5fa', '#c084fc', '#fb923c', '#4ade80', '#f87171', '#fbbf24'];
    const color = colors[this.labels.length % colors.length] ?? '#60a5fa';
    this.dispatchEvent(new CustomEvent('ai-label-create', {
      bubbles: true, composed: true,
      detail: { name, color },
    }));
  }

  override render() {
    const labeledCount = this.items.filter(i => i.label).length;
    const totalCount = this.items.length;

    // Stats: count per label
    const stats = this.labels.map(l => ({
      ...l,
      count: this.items.filter(i => i.label === l.id).length,
    }));
    const unlabeledCount = this.items.filter(i => !i.label).length;

    return html`
      <div class="panel">
        <div class="header">
          <span class="header-title">Labeling</span>
          <span class="header-count">${labeledCount}/${totalCount} labeled</span>
        </div>

        ${this.mode === 'click' ? html`
          <div class="palette">
            ${this.labels.map(l => html`
              <button class="palette-btn ${this._activeLabel === l.id ? 'active' : ''}"
                style="--_label-color: ${l.color}"
                @click=${() => { this._activeLabel = this._activeLabel === l.id ? '' : l.id; }}>
                <span class="palette-dot" style="background: ${l.color}"></span>
                ${l.name}
              </button>
            `)}
            ${this.allowCustomLabels ? html`
              <button class="add-label-btn" @click=${this._createLabel}>+ Add</button>
            ` : nothing}
          </div>
        ` : nothing}

        <div class="items" role=${this.mode === 'click' ? nothing : 'list'} aria-label="Items to label">
          ${this.items.map(item => {
            const label = this._getLabel(item.label);
            const isUnlabeled = !item.label;
            return html`
              <div class="item-row ${isUnlabeled ? 'unlabeled' : ''}"
                tabindex="-1"
                role="listitem">
                <div class="item-content">
                  ${item.content}
                  ${item.metadata ? html`<div class="item-meta">${item.metadata}</div>` : nothing}
                </div>

                ${label ? html`
                  <span class="item-label-pill" role="button" tabindex="0"
                    aria-label=${`Change label for: ${item.content}`}
                    style="background: color-mix(in srgb, ${label.color} 12%, transparent); color: ${label.color}; cursor: pointer;"
                    @click=${(e: Event) => { e.stopPropagation(); this._cycleLabel(item.id); }}
                    @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); this._cycleLabel(item.id); } }}>
                    <span class="item-label-dot" style="background: ${label.color}"></span>
                    ${label.name}
                  </span>
                ` : html`
                  <span class="item-label-pill unlabeled" role="button" tabindex="0"
                    aria-label=${`Assign label to: ${item.content}`}
                    @click=${(e: Event) => { e.stopPropagation(); this._cycleLabel(item.id); }}
                    @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); this._cycleLabel(item.id); } }}>
                    Assign
                  </span>
                `}
              </div>
            `;
          })}
        </div>

        <div class="stats">
          ${stats.map(s => html`
            <div class="stat">
              <span class="stat-dot" style="background: ${s.color}"></span>
              ${s.name}: <span class="stat-count">${s.count}</span>
            </div>
          `)}
          ${unlabeledCount > 0 ? html`
            <div class="stat">
              <span class="stat-dot" style="background: var(--cg-color-input-text-placeholder)"></span>
              Unlabeled: <span class="stat-count">${unlabeledCount}</span>
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }
}
