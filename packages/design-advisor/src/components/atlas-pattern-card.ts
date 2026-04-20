/**
 * Atlas Pattern Card Component
 *
 * Displays a single Atlas interaction pattern in an interactive,
 * expandable card format. Dark theme, flat design, 16px radius.
 *
 * @module @cognivo/design-advisor/components/atlas-pattern-card
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { AtlasPatternCard } from '../atlas/types.js';

// ---------------------------------------------------------------------------
// Dimension color map
// ---------------------------------------------------------------------------

const DIMENSION_COLORS: Record<string, { bg: string; fg: string }> = {
  ai_tasks:       { bg: 'var(--cg-color-status-info-background-default, #e3f2fd)',   fg: 'var(--cg-color-status-info-text-default, #1976d2)' },
  human_tasks:    { bg: 'var(--cg-color-status-success-background-default, #e8f5e9)',   fg: 'var(--cg-color-status-success-text-default, #388e3c)' },
  system_tasks:   { bg: 'var(--cg-color-action-primary-background-default, #f3e5f5)', fg: 'var(--cg-color-action-primary-text-default, #7b1fa2)' },
  data_artifacts: { bg: 'var(--cg-color-status-warning-background-default, #fff3e0)',  fg: 'var(--cg-color-status-warning-text-default, #f57c00)' },
  constraints:    { bg: 'var(--cg-color-status-error-background-default, #fce4ec)',     fg: 'var(--cg-color-status-error-text-default, #c2185b)' },
  touchpoints:    { bg: 'var(--cg-color-status-success-background-default, #e0f2f1)',   fg: 'var(--cg-color-status-success-text-default, #00796b)' },
};

const LAYER_COLORS: Record<string, { bg: string; fg: string }> = {
  inbound:     { bg: 'var(--cg-color-status-info-background-default, #e3f2fd)',           fg: 'var(--cg-color-status-info-text-default, #1565c0)' },
  internal:    { bg: 'var(--cg-color-action-primary-background-default, #f3e5f5)',  fg: 'var(--cg-color-action-primary-text-default, #7b1fa2)' },
  outbound:    { bg: 'var(--cg-color-status-success-background-default, #e8f5e9)',          fg: 'var(--cg-color-status-success-text-default, #2e7d32)' },
  interactive: { bg: 'var(--cg-color-status-warning-background-default, #fff3e0)',         fg: 'var(--cg-color-status-warning-text-default, #e65100)' },
};

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  implemented:     { bg: 'var(--cg-color-status-success-background-default, #e8f5e9)',  fg: 'var(--cg-color-status-success-text-default, #2e7d32)' },
  partial:         { bg: 'var(--cg-color-status-warning-background-default, #fff3e0)', fg: 'var(--cg-color-status-warning-text-default, #ef6c00)' },
  planned:         { bg: 'var(--cg-color-status-info-background-default, #e3f2fd)',   fg: 'var(--cg-color-status-info-text-default, #1565c0)' },
  'not-applicable': { bg: 'var(--cg-color-surface-base-text, #f5f5f5)',  fg: 'var(--cg-color-surface-cards-disable-text, #757575)' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

@customElement('atlas-pattern-card')
export class AtlasPatternCardElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .card {
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #2a2a2a);
      border-radius: 16px;
      padding: var(--cg-spacing-24, 24px);
      background: var(--cg-color-surface-container-background, #1a1a1a);
      color: var(--cg-color-surface-base-text, #f5f5f5);
      transition: border-color var(--cg-transition-duration-default, 200ms);
    }

    .card:hover {
      border-color: var(--cg-color-action-primary-border-default, #7c4dff);
    }

    /* -- Header ----------------------------------------------------------- */

    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: var(--cg-spacing-12, 12px);
      margin-bottom: var(--cg-spacing-16, 16px);
    }

    .header-left {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-size: var(--cg-font-size-lg, 20px);
      font-weight: var(--cg-font-weight-bold, 700);
      color: var(--cg-color-surface-base-text, #fafafa);
      margin: 0 0 var(--cg-spacing-8, 8px) 0;
      line-height: 1.3;
    }

    .badges {
      display: flex;
      gap: var(--cg-spacing-8, 8px);
      flex-wrap: wrap;
    }

    .badge {
      display: inline-block;
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px);
      border-radius: 999px;
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      letter-spacing: 0.3px;
      white-space: nowrap;
    }

    .status-badge {
      display: inline-block;
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px);
      border-radius: 999px;
      font-size: var(--cg-font-size-xs, 11px);
      font-weight: var(--cg-font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* -- Elevator pitch --------------------------------------------------- */

    .elevator-pitch {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-cards-disable-text, #9e9e9e);
      line-height: 1.6;
      margin-bottom: var(--cg-spacing-16, 16px);
    }

    /* -- Expandable sections ---------------------------------------------- */

    .section {
      border-top: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #2a2a2a);
      padding-top: var(--cg-spacing-12, 12px);
      margin-top: var(--cg-spacing-12, 12px);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      cursor: pointer;
      user-select: none;
      padding: var(--cg-spacing-4, 4px) 0;
    }

    .section-header:focus-visible {
      outline: 2px solid var(--cg-color-action-primary-border-default, #7c4dff);
      outline-offset: 2px;
      border-radius: var(--cg-border-radius-50, 4px);
    }

    .section-arrow {
      font-size: var(--cg-font-size-xs, 12px);
      transition: transform 0.2s;
      display: inline-block;
      color: var(--cg-color-surface-cards-disable-text, #757575);
    }

    .section-arrow.open {
      transform: rotate(90deg);
    }

    .section-title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-surface-cards-disable-text, #bdbdbd);
    }

    .section-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    .section-body.open {
      max-height: 1000px;
    }

    .section-content {
      padding: var(--cg-spacing-12, 12px) 0 var(--cg-spacing-4, 4px) 0;
    }

    /* -- UX notes --------------------------------------------------------- */

    .ux-item {
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    .ux-label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-surface-cards-disable-text, #9e9e9e);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: var(--cg-spacing-4, 4px);
    }

    .ux-value {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-base-text, #e0e0e0);
      line-height: 1.6;
    }

    .anti-pattern {
      display: inline-block;
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-8, 8px);
      background: var(--cg-color-status-error-background-default, #fce4ec);
      color: var(--cg-color-status-error-text-default, #c2185b);
      border-radius: var(--cg-border-radius-50, 4px);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      margin: var(--cg-spacing-4, 4px) var(--cg-spacing-4, 4px) 0 0;
    }

    /* -- Pills ------------------------------------------------------------ */

    .pill-list {
      display: flex;
      gap: var(--cg-spacing-8, 8px);
      flex-wrap: wrap;
    }

    .pill {
      display: inline-block;
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px);
      background: var(--cg-color-surface-inset-background, #2a2a2a);
      border-radius: 999px;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-surface-cards-disable-text, #bdbdbd);
    }

    .pill.component {
      background: var(--cg-color-action-primary-background-default, #ede7f6);
      color: var(--cg-color-action-primary-text-default, #7b1fa2);
    }

    .pill.bias {
      background: var(--cg-color-status-warning-background-default, #fff3e0);
      color: var(--cg-color-status-warning-text-default, #e65100);
    }

    /* -- Implementation notes --------------------------------------------- */

    .impl-row {
      display: flex;
      gap: var(--cg-spacing-16, 16px);
      margin-bottom: var(--cg-spacing-8, 8px);
    }

    .impl-label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-surface-cards-disable-text, #757575);
      min-width: 120px;
    }

    .impl-value {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-base-text, #e0e0e0);
    }

    /* -- Empty ------------------------------------------------------------ */

    .empty-note {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-surface-cards-disable-text, #757575);
      font-style: italic;
    }
  `;

  @property({ type: Object })
  pattern?: AtlasPatternCard;

  @property({ type: Boolean })
  expanded = false;

  @state()
  private expandedSections = new Set<string>();

  override updated(changed: Map<string, unknown>) {
    if (changed.has('expanded') && this.expanded) {
      this.expandedSections = new Set(['ux', 'impl', 'components', 'biases']);
      this.requestUpdate();
    }
  }

  private toggleSection(section: string) {
    if (this.expandedSections.has(section)) {
      this.expandedSections.delete(section);
    } else {
      this.expandedSections.add(section);
    }
    this.requestUpdate();
  }

  private isOpen(section: string): boolean {
    return this.expandedSections.has(section);
  }

  private handleKeydown(section: string, e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggleSection(section);
    }
  }

  // -----------------------------------------------------------------------
  // Render helpers
  // -----------------------------------------------------------------------

  private renderBadge(text: string, colors: { bg: string; fg: string }) {
    return html`<span class="badge" style="background:${colors.bg};color:${colors.fg}">${text}</span>`;
  }

  private renderStatusBadge(status: string) {
    const fallback = { bg: 'var(--cg-color-surface-base-text, #f5f5f5)', fg: 'var(--cg-color-surface-cards-disable-text, #757575)' };
    const colors = STATUS_COLORS[status] ?? fallback;
    const label = status.replace(/-/g, ' ');
    return html`<span class="status-badge" style="background:${colors.bg};color:${colors.fg}">${label}</span>`;
  }

  private renderSection(id: string, title: string, content: unknown) {
    return html`
      <div class="section">
        <div
          class="section-header"
          tabindex="0"
          role="button"
          aria-expanded="${this.isOpen(id)}"
          @click=${() => this.toggleSection(id)}
          @keydown=${(e: KeyboardEvent) => this.handleKeydown(id, e)}
        >
          <span class="section-arrow ${this.isOpen(id) ? 'open' : ''}">&#9654;</span>
          <span class="section-title">${title}</span>
        </div>
        <div class="section-body ${this.isOpen(id) ? 'open' : ''}">
          <div class="section-content">${content}</div>
        </div>
      </div>
    `;
  }

  // -----------------------------------------------------------------------
  // Main render
  // -----------------------------------------------------------------------

  override render() {
    if (!this.pattern) {
      return html`<div class="card"><span class="empty-note">No pattern data provided</span></div>`;
    }

    const p = this.pattern;
    const defaultColor = { bg: 'var(--cg-color-surface-base-text, #f5f5f5)', fg: 'var(--cg-color-surface-cards-disable-text, #757575)' };
    const dimColors = DIMENSION_COLORS[p.dimension] ?? defaultColor;
    const layerColors = LAYER_COLORS[p.layer] ?? defaultColor;
    const dimLabel = p.dimension.replace(/_/g, ' ');

    return html`
      <div class="card">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <h3 class="title">${p.name}</h3>
            <div class="badges">
              ${this.renderBadge(dimLabel, dimColors)}
              ${this.renderBadge(p.layer, layerColors)}
              ${this.renderStatusBadge(p.status)}
            </div>
          </div>
        </div>

        <!-- Elevator pitch (always visible) -->
        <p class="elevator-pitch">${p.elevatorPitch}</p>

        <!-- UX Notes -->
        ${(p.uxNotes?.risk || p.uxNotes?.tip || p.uxNotes?.antiPatterns?.length)
          ? this.renderSection('ux', 'UX Notes', html`
              ${p.uxNotes?.risk ? html`
                <div class="ux-item">
                  <div class="ux-label">Risk</div>
                  <div class="ux-value">${p.uxNotes.risk}</div>
                </div>
              ` : nothing}
              ${p.uxNotes?.tip ? html`
                <div class="ux-item">
                  <div class="ux-label">Tip</div>
                  <div class="ux-value">${p.uxNotes.tip}</div>
                </div>
              ` : nothing}
              ${p.uxNotes?.antiPatterns?.length ? html`
                <div class="ux-item">
                  <div class="ux-label">Anti-Patterns</div>
                  <div>${p.uxNotes.antiPatterns.map(ap => html`<span class="anti-pattern">${ap}</span>`)}</div>
                </div>
              ` : nothing}
            `)
          : nothing
        }

        <!-- Implementation -->
        ${(p.implementationNotes?.maturity || p.implementationNotes?.humanOversight)
          ? this.renderSection('impl', 'Implementation', html`
              ${p.implementationNotes?.maturity ? html`
                <div class="impl-row">
                  <span class="impl-label">Maturity</span>
                  <span class="impl-value">${p.implementationNotes.maturity}</span>
                </div>
              ` : nothing}
              ${p.implementationNotes?.humanOversight ? html`
                <div class="impl-row">
                  <span class="impl-label">Human Oversight</span>
                  <span class="impl-value">${p.implementationNotes.humanOversight}</span>
                </div>
              ` : nothing}
            `)
          : nothing
        }

        <!-- Cognivo Components -->
        ${p.cognivoComponents.length
          ? this.renderSection('components', 'Cognivo Components', html`
              <div class="pill-list">
                ${p.cognivoComponents.map(c => html`<span class="pill component">&lt;${c}&gt;</span>`)}
              </div>
            `)
          : nothing
        }

        <!-- Related Biases -->
        ${p.relatedBiases.length
          ? this.renderSection('biases', 'Related Biases', html`
              <div class="pill-list">
                ${p.relatedBiases.map(b => html`<span class="pill bias">${b}</span>`)}
              </div>
            `)
          : nothing
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atlas-pattern-card': AtlasPatternCardElement;
  }
}
