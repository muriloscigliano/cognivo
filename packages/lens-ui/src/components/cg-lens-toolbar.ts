import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Finding, LensScore, Severity } from '@cognivo/lens-core';
import { severityColor, severityLabel } from '../internal/severity-style.js';

const SEVERITIES: readonly Severity[] = ['blocker', 'strong', 'consider', 'positive'];

/**
 * Bottom-right floating toolbar — the lens's persistent surface.
 *
 * Surface contract:
 *  - Score badge (composite 0–100). Shown as `—` until the first scan.
 *  - Per-severity count chips, ordered blocker → positive.
 *  - Scan duration in ms (last successful scan).
 *  - Re-scan / open-drawer / dismiss buttons.
 *
 * All chrome routes through Cognivo tier-2 surface tokens. The toolbar
 * dogfoods its own design system: it should pass `text-contrast-below-AA`,
 * `landmark-without-name`, and `button-without-name` against the meta-test
 * in Phase F.
 */
@customElement('cg-lens-toolbar')
export class CgLensToolbar extends LitElement {
  @property({ attribute: false }) findings: readonly Finding[] = [];
  @property({ attribute: false }) score: LensScore | null = null;
  @property({ attribute: false }) lastScanMs = 0;
  @property({ type: Boolean }) scanInProgress = false;

  override render() {
    const counts = this._countBySeverity();
    return html`
      <div class="bar" role="region" aria-label="Lens audit toolbar">
        <span class="score" aria-label="Lens score">
          <span class="label">Lens</span>
          <span class="value">${this.score ? Math.round(this.score.composite) : '—'}</span>
        </span>
        <span class="counts" role="list" aria-label="Findings by severity">
          ${SEVERITIES.map((s) =>
            counts[s] === 0
              ? null
              : html`
                  <span
                    class="chip"
                    role="listitem"
                    aria-label=${`${counts[s]} ${severityLabel(s)} findings`}
                    style=${`--chip-color: ${severityColor(s)};`}
                  >
                    <span class="dot"></span>
                    <span class="num">${counts[s]}</span>
                  </span>
                `
          )}
          ${this.findings.length === 0
            ? html`<span class="chip chip-clean" role="listitem">no findings</span>`
            : null}
        </span>
        <span class="time" aria-label="Last scan duration">
          ${this.lastScanMs.toFixed(1)}ms
        </span>
        <button
          class="icon-btn"
          type="button"
          aria-label="Re-scan"
          ?disabled=${this.scanInProgress}
          @click=${this._emitRescan}
        >
          ${iconRescan()}
        </button>
        <button
          class="icon-btn"
          type="button"
          aria-label="Open findings"
          @click=${this._emitOpenDrawer}
        >
          ${iconList()}
        </button>
        <button
          class="icon-btn"
          type="button"
          aria-label="Dismiss lens"
          @click=${this._emitDismiss}
        >
          ${iconClose()}
        </button>
      </div>
    `;
  }

  private _countBySeverity(): Record<Severity, number> {
    const out: Record<Severity, number> = { blocker: 0, strong: 0, consider: 0, positive: 0 };
    for (const f of this.findings) out[f.severity]++;
    return out;
  }

  private _emitRescan = (): void => {
    this.dispatchEvent(new CustomEvent('cg-lens-toolbar:rescan', { bubbles: true, composed: true }));
  };

  private _emitOpenDrawer = (): void => {
    this.dispatchEvent(
      new CustomEvent('cg-lens-toolbar:open-drawer', { bubbles: true, composed: true })
    );
  };

  private _emitDismiss = (): void => {
    this.dispatchEvent(
      new CustomEvent('cg-lens-toolbar:dismiss', { bubbles: true, composed: true })
    );
  };

  static override styles = css`
    :host {
      position: absolute;
      bottom: var(--cg-spacing-16, 16px);
      right: var(--cg-spacing-16, 16px);
      pointer-events: auto;
      display: block;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12, 12px);
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      background: var(--cg-color-surface-container-background, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-100, 8px);
      font-size: var(--cg-font-size-sm, 14px);
      font-variant-numeric: tabular-nums;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.3),
        0 2px 4px -2px rgba(0, 0, 0, 0.2);
    }
    .score {
      display: inline-flex;
      align-items: baseline;
      gap: var(--cg-spacing-4, 4px);
    }
    .score .label {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-surface-base-text-muted, #a1a1aa);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .score .value {
      font-weight: var(--cg-font-weight-semibold, 600);
    }
    .counts {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
      font-size: var(--cg-font-size-xs, 12px);
    }
    .chip .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--chip-color);
    }
    .chip-clean {
      color: var(--cg-color-status-success-text-default, #22c55e);
    }
    .time {
      color: var(--cg-color-surface-base-text-muted, #a1a1aa);
      font-size: var(--cg-font-size-xs, 12px);
    }
    .icon-btn {
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
      transition: background-color var(--cg-transition-duration-fast, 100ms) ease;
    }
    .icon-btn:hover:not([disabled]) {
      background: var(--cg-color-action-secondary-background-hover, #27272a);
    }
    .icon-btn[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .icon-btn:focus-visible {
      outline: var(--cg-border-width-100, 2px) solid var(--cg-color-focus-ring, #3b82f6);
      outline-offset: 1px;
    }
    @media (prefers-reduced-motion: reduce) {
      .icon-btn {
        transition: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-lens-toolbar': CgLensToolbar;
  }
}

// SVG icons rendered via Lit's `svg` template (NOT html — wrong namespace = invisible icon)
function iconRescan() {
  return svg`
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
      <path d="M2 7a5 5 0 0 1 9-3"/>
      <path d="M11 1.5v3h-3"/>
      <path d="M12 7a5 5 0 0 1-9 3"/>
      <path d="M3 12.5v-3h3"/>
    </svg>
  `;
}

function iconList() {
  return svg`
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
      <line x1="3" y1="4" x2="11" y2="4"/>
      <line x1="3" y1="7" x2="11" y2="7"/>
      <line x1="3" y1="10" x2="11" y2="10"/>
    </svg>
  `;
}

function iconClose() {
  return svg`
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
      <line x1="3" y1="3" x2="11" y2="11"/>
      <line x1="11" y1="3" x2="3" y2="11"/>
    </svg>
  `;
}
