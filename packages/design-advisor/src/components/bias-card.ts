/**
 * Bias Card Component
 *
 * Displays comprehensive information about a cognitive bias
 * in an interactive, expandable card format.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { BiasCard } from '../biases/core/types.js';
import { ImpactLevel } from '../biases/core/types.js';

@customElement('bias-card')
export class BiasCardElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .card {
      border: var(--cg-Border-width-50, 1px) solid var(--cg-color-surface-container-border, #e0e0e0);
      border-radius: var(--cg-Border-radius-100, 8px);
      padding: var(--cg-spacing-24, 24px);
      background: var(--cg-color-surface-container-background, white);
      transition: box-shadow 0.2s;
    }

    .card:hover {
      box-shadow: var(--cg-shadow-sm-x, 0px) var(--cg-shadow-md-y, 8px) var(--cg-shadow-md-blur, 16px) var(--cg-shadow-sm-spread, 0px) var(--cg-shadow-sm-Color, rgba(0,0,0,0.1));
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: var(--cg-spacing-16, 16px);
    }

    .title {
      font-size: var(--cg-font-size-2xl, 24px);
      font-weight: var(--cg-font-weight-bold, 700);
      color: var(--cg-gray-900, #1a1a1a);
      margin: 0 0 var(--cg-spacing-8, 8px) 0;
    }

    .category {
      display: inline-block;
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px);
      border-radius: var(--cg-Border-radius-50, 4px);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .category.perception { background: var(--cg-blue-100, #e3f2fd); color: var(--cg-blue-500, #1976d2); }
    .category.decision-making { background: var(--cg-brand-primary-100, #f3e5f5); color: var(--cg-brand-primary-400, #7b1fa2); }
    .category.memory { background: var(--cg-green-100, #e8f5e9); color: var(--cg-green-500, #388e3c); }
    .category.social { background: var(--cg-yellow-100, #fff3e0); color: var(--cg-yellow-500, #f57c00); }
    .category.attribution { background: var(--cg-red-100, #fce4ec); color: var(--cg-red-500, #c2185b); }
    .category.emotional { background: var(--cg-red-100, #ffebee); color: var(--cg-red-500, #d32f2f); }
    .category.cognitive { background: var(--cg-green-100, #e0f2f1); color: var(--cg-green-500, #00796b); }

    .definition {
      margin-bottom: var(--cg-spacing-24, 24px);
    }

    .simple {
      font-size: var(--cg-font-size-base, 16px);
      color: var(--cg-gray-700, #424242);
      line-height: 1.6;
      margin-bottom: var(--cg-spacing-12, 12px);
      font-style: italic;
    }

    .detailed {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-gray-600, #616161);
      line-height: 1.7;
      margin-bottom: var(--cg-spacing-16, 16px);
    }

    .tags {
      display: flex;
      gap: var(--cg-spacing-8, 8px);
      flex-wrap: wrap;
      margin-bottom: var(--cg-spacing-24, 24px);
    }

    .tag {
      padding: var(--cg-spacing-4, 4px) 10px;
      background: var(--cg-color-surface-inset-background, #f5f5f5);
      border-radius: 12px;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #757575);
    }

    .section {
      margin-bottom: var(--cg-spacing-24, 24px);
    }

    .section-title {
      font-size: var(--cg-font-size-md, 18px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-gray-900, #1a1a1a);
      margin: 0 0 var(--cg-spacing-12, 12px) 0;
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
    }

    .section-content {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-gray-600, #616161);
      line-height: 1.7;
    }

    .impact-areas {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--cg-spacing-16, 16px);
    }

    .impact-area {
      padding: var(--cg-spacing-12, 12px);
      border: var(--cg-Border-width-50, 1px) solid var(--cg-color-surface-container-border, #e0e0e0);
      border-radius: var(--cg-Border-radius-100, 6px);
    }

    .impact-area-title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-gray-900, #1a1a1a);
      margin-bottom: var(--cg-spacing-8, 8px);
      text-transform: capitalize;
    }

    .impact-level {
      display: inline-block;
      padding: 2px var(--cg-spacing-8, 8px);
      border-radius: var(--cg-Border-radius-50, 4px);
      font-size: var(--cg-font-size-xs, 11px);
      font-weight: var(--cg-font-weight-semibold, 600);
      margin-bottom: var(--cg-spacing-8, 8px);
    }

    .impact-level.critical { background: var(--cg-ai-anomaly-critical-background, #ffebee); color: var(--cg-ai-anomaly-critical-color, #c62828); }
    .impact-level.high { background: var(--cg-ai-anomaly-high-background, #fff3e0); color: var(--cg-ai-anomaly-high-color, #ef6c00); }
    .impact-level.medium { background: var(--cg-ai-anomaly-medium-background, #fff9c4); color: var(--cg-ai-anomaly-medium-color, #f9a825); }
    .impact-level.low { background: var(--cg-ai-anomaly-low-background, #f1f8e9); color: var(--cg-ai-anomaly-low-color, #689f38); }

    .examples-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--cg-spacing-16, 16px);
    }

    .example {
      padding: var(--cg-spacing-16, 16px);
      border: var(--cg-Border-width-50, 1px) solid var(--cg-color-surface-container-border, #e0e0e0);
      border-radius: var(--cg-Border-radius-100, 6px);
      background: #fafafa;
    }

    .example-title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-gray-900, #1a1a1a);
      margin-bottom: var(--cg-spacing-8, 8px);
    }

    .example-description {
      font-size: var(--cg-font-size-xs, 13px);
      color: var(--cg-gray-600, #616161);
      line-height: 1.6;
      margin-bottom: var(--cg-spacing-8, 8px);
    }

    .expandable {
      cursor: pointer;
      user-select: none;
    }

    .expandable .section-title::before {
      content: '▶';
      font-size: var(--cg-font-size-sm, 14px);
      transition: transform 0.2s;
      display: inline-block;
      width: var(--cg-icon-size-150, 20px);
    }

    .expandable.open .section-title::before {
      transform: rotate(90deg);
    }

    .collapsible {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    .collapsible.open {
      max-height: 2000px;
    }

    .psychology {
      background: var(--cg-color-surface-inset-background, #f5f5f5);
      padding: var(--cg-spacing-16, 16px);
      border-radius: var(--cg-Border-radius-100, 6px);
      margin-top: var(--cg-spacing-12, 12px);
    }

    .psychology-item {
      margin-bottom: var(--cg-spacing-8, 8px);
    }

    .psychology-label {
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-gray-900, #1a1a1a);
      margin-right: var(--cg-spacing-8, 8px);
    }

    .psychology-value {
      color: var(--cg-gray-600, #616161);
    }

    button {
      background: var(--cg-brand-primary-400, #1976d2);
      color: white;
      border: none;
      padding: var(--cg-spacing-10, 10px) var(--cg-spacing-24, 20px);
      border-radius: var(--cg-Border-radius-100, 6px);
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover {
      background: var(--cg-brand-primary-500, #1565c0);
    }

    .compact .detailed,
    .compact .section,
    .compact .tags {
      display: none;
    }
  `;

  @property({ type: Object })
  bias?: BiasCard;

  @property({ type: Boolean })
  compact = false;

  @state()
  private expandedSections = new Set<string>();

  private handleCardClick(e: Event) {
    // Don't fire if clicking inside an expandable section
    const target = e.target as HTMLElement;
    if (target.closest('.expandable')) return;

    if (!this.bias) return;
    this.dispatchEvent(new CustomEvent('bias-selected', {
      bubbles: true,
      composed: true,
      detail: { biasId: this.bias.metadata.id, biasName: this.bias.metadata.name },
    }));
  }

  private toggleSection(section: string) {
    if (this.expandedSections.has(section)) {
      this.expandedSections.delete(section);
    } else {
      this.expandedSections.add(section);
    }
    this.requestUpdate();
  }

  private isExpanded(section: string): boolean {
    return this.expandedSections.has(section);
  }

  private renderImpactLevel(level: ImpactLevel) {
    const levelClass = level.toLowerCase().replace('_', '-');
    return html`<span class="impact-level ${levelClass}">${level}</span>`;
  }

  override render() {
    if (!this.bias) {
      return html`<div class="card">No bias data provided</div>`;
    }

    const { metadata, definition, designImpact, examples, detection } = this.bias;

    return html`
      <div class="card ${this.compact ? 'compact' : ''}" @click=${this.handleCardClick}>
        <div class="header">
          <div>
            <h2 class="title">${metadata.name}</h2>
            <span class="category ${metadata.category}">${metadata.category}</span>
          </div>
        </div>

        <div class="definition">
          <p class="simple">${definition.simple}</p>
          ${!this.compact ? html`<p class="detailed">${definition.detailed}</p>` : ''}
        </div>

        ${!this.compact ? html`
          <div class="tags">
            ${metadata.tags.map(tag => html`<span class="tag">${tag}</span>`)}
          </div>

          <!-- Psychology Basis -->
          <div class="section expandable ${this.isExpanded('psychology') ? 'open' : ''}"
               tabindex="0"
               role="button"
               aria-expanded="${this.isExpanded('psychology')}"
               @click=${() => this.toggleSection('psychology')}
               @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleSection('psychology'); } }}>
            <h3 class="section-title">Psychology Basis</h3>
            <div class="collapsible ${this.isExpanded('psychology') ? 'open' : ''}">
              <div class="psychology">
                <div class="psychology-item">
                  <span class="psychology-label">Discovered By:</span>
                  <span class="psychology-value">${definition.psychologyBasis.discoveredBy}</span>
                </div>
                <div class="psychology-item">
                  <span class="psychology-label">Year:</span>
                  <span class="psychology-value">${definition.psychologyBasis.year}</span>
                </div>
                <div class="psychology-item">
                  <span class="psychology-label">Theory:</span>
                  <span class="psychology-value">${definition.psychologyBasis.theory}</span>
                </div>
                <div class="psychology-item">
                  <span class="psychology-label">Mechanism:</span>
                  <span class="psychology-value">${definition.psychologyBasis.mechanism}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Design Impact -->
          <div class="section">
            <h3 class="section-title">Design Impact</h3>
            <div class="section-content">
              <p>${designImpact.description}</p>

              <div class="impact-areas" style="margin-top: var(--cg-spacing-16, 16px);">
                ${Object.entries(designImpact.impactAreas).map(([area, assessment]) => html`
                  <div class="impact-area">
                    <div class="impact-area-title">${area}</div>
                    ${this.renderImpactLevel(assessment.level)}
                    <p style="font-size: var(--cg-font-size-xs, 13px); color: var(--cg-gray-600, #616161); margin-top: var(--cg-spacing-8, 8px);">
                      ${assessment.description}
                    </p>
                  </div>
                `)}
              </div>
            </div>
          </div>

          <!-- Examples -->
          <div class="section expandable ${this.isExpanded('examples') ? 'open' : ''}"
               tabindex="0"
               role="button"
               aria-expanded="${this.isExpanded('examples')}"
               @click=${() => this.toggleSection('examples')}
               @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleSection('examples'); } }}>
            <h3 class="section-title">Examples</h3>
            <div class="collapsible ${this.isExpanded('examples') ? 'open' : ''}">
              <div class="examples-grid">
                ${examples.good.slice(0, 2).map(example => html`
                  <div class="example">
                    <div class="example-title">${example.title}</div>
                    <p class="example-description">${example.description}</p>
                    <p style="font-size: var(--cg-font-size-xs, 12px); color: var(--cg-gray-500, #757575); margin-top: var(--cg-spacing-8, 8px);">
                      ${example.explanation}
                    </p>
                  </div>
                `)}
              </div>
            </div>
          </div>

          <!-- Detection -->
          <div class="section expandable ${this.isExpanded('detection') ? 'open' : ''}"
               tabindex="0"
               role="button"
               aria-expanded="${this.isExpanded('detection')}"
               @click=${() => this.toggleSection('detection')}
               @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleSection('detection'); } }}>
            <h3 class="section-title">How to Detect</h3>
            <div class="collapsible ${this.isExpanded('detection') ? 'open' : ''}">
              <div class="section-content">
                <h4 style="font-size: var(--cg-font-size-sm, 14px); font-weight: var(--cg-font-weight-semibold, 600); margin-bottom: var(--cg-spacing-8, 8px);">Visual Cues:</h4>
                <ul style="margin: 0; padding-left: var(--cg-spacing-24, 20px);">
                  ${detection.visualCues.map(cue => html`
                    <li style="margin-bottom: var(--cg-spacing-8, 8px);">
                      <strong>${cue.name}:</strong> ${cue.description}
                    </li>
                  `)}
                </ul>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bias-card': BiasCardElement;
  }
}
