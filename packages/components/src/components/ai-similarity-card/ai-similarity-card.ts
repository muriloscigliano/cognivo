/**
 * @element ai-similarity-card
 * Side-by-side item comparison with similarity score, feature bars, and accept/reject.
 *
 * @fires {CustomEvent<{score: number}>} ai-similarity-accept
 * @fires {CustomEvent<{score: number}>} ai-similarity-reject
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface SimilarityItem {
  label: string;
  image?: string;
  description?: string;
}

export interface SimilarityFeature {
  name: string;
  scoreA: number;
  scoreB: number;
}

@customElement('ai-similarity-card')
export class AiSimilarityCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
    }

    /* ── Header ── */
    .header {
      padding: var(--cg-spacing-16) var(--cg-spacing-24);
    }
    .header-title {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    /* ── Items comparison ── */
    .items {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      padding: var(--cg-spacing-8) var(--cg-spacing-24) var(--cg-spacing-20);
      gap: var(--cg-spacing-16);
      align-items: center;
    }
    .items.stacked {
      grid-template-columns: 1fr;
      gap: var(--cg-spacing-12);
    }

    .item-card {
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-16);
      display: flex; flex-direction: column; gap: var(--cg-spacing-8);
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .item-card:hover { border-color: var(--cg-color-surface-cards-hover-border); }

    .item-image {
      width: 100%; aspect-ratio: 16/10; object-fit: cover;
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-surface-cards-border);
    }
    .item-label {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .item-desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-snug);
    }

    /* ── Score bridge ── */
    .score-bridge {
      display: flex; flex-direction: column; align-items: center;
      gap: var(--cg-spacing-4);
    }
    .score-circle {
      width: var(--cg-spacing-48); height: var(--cg-spacing-48);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-100) solid var(--cg-color-action-primary-background-default);
      display: flex; align-items: center; justify-content: center;
      background: var(--cg-overlay-accent-subtle);
    }
    .score-value {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-bold);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-surface-base-text);
    }
    .score-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    .score-bridge.stacked {
      flex-direction: row; gap: var(--cg-spacing-12); padding: var(--cg-spacing-4) 0;
    }
    .score-bridge.stacked .score-circle { width: var(--cg-spacing-32); height: var(--cg-spacing-32); }

    /* ── Features ── */
    .features {
      padding: var(--cg-spacing-16) var(--cg-spacing-24);
      display: flex; flex-direction: column; gap: var(--cg-spacing-12);
    }
    .features-title {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
    }
    .feature-row { display: flex; flex-direction: column; gap: var(--cg-spacing-4); }
    .feature-name {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }
    .feature-bars { display: flex; gap: var(--cg-spacing-8); align-items: center; }
    .feature-bar-wrap {
      flex: 1; height: var(--cg-spacing-4);
      background: var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full); overflow: hidden;
    }
    .feature-bar-a {
      height: 100%; border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      transition: width var(--cg-motion-duration-normal) var(--cg-motion-easing-default);
    }
    .feature-bar-b {
      height: 100%; border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-container-outlined);
      transition: width var(--cg-motion-duration-normal) var(--cg-motion-easing-default);
    }
    .feature-vs {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      min-width: var(--cg-spacing-20); text-align: center;
    }

    /* ── Actions ── */
    .actions {
      padding: var(--cg-spacing-16) var(--cg-spacing-24);
      display: flex; gap: var(--cg-spacing-8);
      justify-content: flex-end;
    }

    /* ── Rounded ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-150); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Object }) itemA: SimilarityItem = { label: '' };
  @property({ type: Object }) itemB: SimilarityItem = { label: '' };
  @property({ type: Number }) score = 0;
  @property({ type: Array }) features: SimilarityFeature[] = [];
  @property() layout: 'side-by-side' | 'stacked' = 'side-by-side';

  private _renderItem(item: SimilarityItem) {
    return html`
      <div class="item-card">
        ${item.image ? html`<img class="item-image" src=${item.image} alt=${item.label} />` : nothing}
        <span class="item-label">${item.label}</span>
        ${item.description ? html`<span class="item-desc">${item.description}</span>` : nothing}
      </div>
    `;
  }

  override render() {
    const pct = Math.round(this.score * 100);
    const isStacked = this.layout === 'stacked';

    return html`
      <div class="panel">
        <div class="header">
          <span class="header-title">Similarity Match</span>
        </div>

        <div class="items ${isStacked ? 'stacked' : ''}">
          ${this._renderItem(this.itemA)}
          <div class="score-bridge ${isStacked ? 'stacked' : ''}">
            <div class="score-circle">
              <span class="score-value">${pct}%</span>
            </div>
            ${!isStacked ? html`<span class="score-label">match</span>` : nothing}
          </div>
          ${this._renderItem(this.itemB)}
        </div>

        ${this.features.length > 0 ? html`
          <div class="features">
            <span class="features-title">Feature Comparison</span>
            ${this.features.map(f => html`
              <div class="feature-row">
                <span class="feature-name">${f.name}</span>
                <div class="feature-bars">
                  <div class="feature-bar-wrap">
                    <div class="feature-bar-a" style="width:${Math.round(f.scoreA * 100)}%"></div>
                  </div>
                  <span class="feature-vs">vs</span>
                  <div class="feature-bar-wrap">
                    <div class="feature-bar-b" style="width:${Math.round(f.scoreB * 100)}%"></div>
                  </div>
                </div>
              </div>
            `)}
          </div>
        ` : nothing}

        <div class="actions">
          <cg-button variant="secondary" size="sm" @click=${() => this.dispatchEvent(new CustomEvent('ai-similarity-reject', { bubbles: true, composed: true, detail: { score: this.score } }))}>Reject</cg-button>
          <cg-button variant="primary" size="sm" @click=${() => this.dispatchEvent(new CustomEvent('ai-similarity-accept', { bubbles: true, composed: true, detail: { score: this.score } }))}>Accept Match</cg-button>
        </div>
      </div>
    `;
  }
}
