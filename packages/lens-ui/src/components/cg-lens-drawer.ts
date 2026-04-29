import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Finding, Severity } from '@cognivo/lens-core';
import { severityRank } from '../internal/severity-style.js';
import './cg-lens-finding-card.js';

export type DrawerFilter = 'all' | Severity;

const FILTER_CHIPS: ReadonlyArray<{ value: DrawerFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'blocker', label: 'Blocker' },
  { value: 'strong', label: 'Strong' },
  { value: 'consider', label: 'Consider' },
  { value: 'positive', label: 'Positive' },
];

/**
 * Right-edge slide-in panel listing findings as cards.
 *
 * Hidden by default (open === false). When open, renders the filter chips +
 * filtered finding list. Esc key emits `cg-lens-drawer:close`. Filter chip
 * clicks emit `cg-lens-drawer:filter-change`.
 *
 * Findings are sorted blocker-first then by confidence-desc inside the
 * filtered list, mirroring lens-core's engine sort order.
 */
@customElement('cg-lens-drawer')
export class CgLensDrawer extends LitElement {
  @property({ attribute: false }) findings: Finding[] = [];
  @property({ attribute: false }) selectedFindingId: string | undefined = undefined;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ attribute: false }) filter: DrawerFilter = 'all';

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKeyDown);
  }

  override disconnectedCallback(): void {
    document.removeEventListener('keydown', this._onKeyDown);
    super.disconnectedCallback();
  }

  override render() {
    const visible = this._sortedVisibleFindings();
    return html`<aside
      class="drawer"
      role="dialog"
      aria-label="Lens findings"
      aria-hidden=${this.open ? 'false' : 'true'}
    >
      <header class="head">
        <h2 class="title">Findings</h2>
        <button
          type="button"
          class="close"
          @click=${this._emitClose}
          aria-label="Close findings drawer"
        >
          ${closeIcon()}
        </button>
      </header>
      <nav class="filters" role="tablist" aria-label="Filter findings by severity">
        ${FILTER_CHIPS.map(
          (c) => html`<button
            type="button"
            role="tab"
            class=${this.filter === c.value ? 'chip chip-active' : 'chip'}
            aria-selected=${this.filter === c.value ? 'true' : 'false'}
            @click=${() => this._emitFilter(c.value)}
          >
            ${c.label}
            ${c.value !== 'all'
              ? html`<span class="chip-count">${this._countFor(c.value as Severity)}</span>`
              : null}
          </button>`
        )}
      </nav>
      <div class="list" role="list">
        ${visible.length === 0
          ? html`<p class="empty">No findings for this filter.</p>`
          : visible.map(
              (f) => html`<cg-lens-finding-card
                .finding=${f}
                .selected=${f.id === this.selectedFindingId}
                role="listitem"
              ></cg-lens-finding-card>`
            )}
      </div>
    </aside>`;
  }

  private _onKeyDown = (e: KeyboardEvent): void => {
    if (this.open && e.key === 'Escape') {
      e.preventDefault();
      this._emitClose();
    }
  };

  private _emitClose = (): void => {
    this.dispatchEvent(
      new CustomEvent('cg-lens-drawer:close', { bubbles: true, composed: true })
    );
  };

  private _emitFilter = (filter: DrawerFilter): void => {
    this.dispatchEvent(
      new CustomEvent('cg-lens-drawer:filter-change', {
        detail: { filter },
        bubbles: true,
        composed: true,
      })
    );
  };

  private _countFor(s: Severity): number {
    let n = 0;
    for (const f of this.findings) if (f.severity === s) n++;
    return n;
  }

  private _sortedVisibleFindings(): Finding[] {
    const filtered =
      this.filter === 'all' ? [...this.findings] : this.findings.filter((f) => f.severity === this.filter);
    return filtered.sort((a, b) => {
      const sd = severityRank(a.severity) - severityRank(b.severity);
      if (sd !== 0) return sd;
      return b.confidence - a.confidence;
    });
  }

  static override styles = css`
    :host {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
    .drawer {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(360px, 90vw);
      pointer-events: auto;
      transform: translateX(100%);
      transition: transform 200ms ease;
      background: var(--cg-color-surface-container-background, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border-left: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #27272a);
      display: flex;
      flex-direction: column;
      box-shadow: -8px 0 24px rgba(0, 0, 0, 0.3);
      visibility: hidden;
    }
    :host([open]) .drawer {
      transform: translateX(0);
      visibility: visible;
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      border-bottom: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #27272a);
    }
    .title {
      margin: 0;
      font-size: var(--cg-font-size-md, 16px);
      font-weight: var(--cg-font-weight-semibold, 600);
    }
    .close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-component-button-height-sm, 28px);
      height: var(--cg-component-button-height-sm, 28px);
      padding: 0;
      background: transparent;
      color: var(--cg-color-surface-base-text, #fafafa);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-component-button-radius-sm, 6px);
      cursor: pointer;
    }
    .close:hover {
      background: var(--cg-color-action-secondary-background-hover, #27272a);
    }
    .close:focus-visible {
      outline: var(--cg-border-width-100, 2px) solid var(--cg-color-focus-ring, #3b82f6);
      outline-offset: 1px;
    }
    .filters {
      display: flex;
      gap: var(--cg-spacing-4, 4px);
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px);
      flex-wrap: wrap;
      border-bottom: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #27272a);
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-8, 8px);
      background: transparent;
      color: var(--cg-color-surface-base-text-muted, #a1a1aa);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-50, 4px);
      font-size: var(--cg-font-size-xs, 12px);
      cursor: pointer;
    }
    .chip:hover {
      background: var(--cg-color-action-secondary-background-hover, #27272a);
    }
    .chip-active {
      background: var(--cg-color-action-secondary-background-default, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .chip:focus-visible {
      outline: var(--cg-border-width-100, 2px) solid var(--cg-color-focus-ring, #3b82f6);
      outline-offset: 1px;
    }
    .chip-count {
      font-variant-numeric: tabular-nums;
      color: var(--cg-color-surface-base-text-muted, #a1a1aa);
    }
    .list {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8, 8px);
    }
    .empty {
      color: var(--cg-color-surface-base-text-muted, #a1a1aa);
      font-size: var(--cg-font-size-sm, 14px);
      text-align: center;
      margin: var(--cg-spacing-24, 24px) 0;
    }
    @media (prefers-reduced-motion: reduce) {
      .drawer {
        transition: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-lens-drawer': CgLensDrawer;
  }
}

function closeIcon() {
  return svg`
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
      <line x1="3" y1="3" x2="11" y2="11"/>
      <line x1="11" y1="3" x2="3" y2="11"/>
    </svg>
  `;
}
