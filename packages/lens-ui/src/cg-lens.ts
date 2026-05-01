import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Finding, LensScore, RulePack, SceneGraph } from '@cognivo/lens-core';
import { ScanController, type ScanResult } from './internal/scan-controller.js';
import './components/cg-lens-toolbar.js';
import './components/cg-lens-overlay.js';
import './components/cg-lens-drawer.js';

export type LensFilter = 'all' | Finding['severity'];

/**
 * @element cg-lens
 *
 * Cognivo Lens v0.1 — visible product surface. Mounts as a Shadow-DOM
 * web component, runs the engine + core pack against the host page, and
 * renders an overlay (toolbar + pins + drawer).
 *
 * The element is non-blocking by default: the host container is
 * pointer-events: none. Only the chrome that needs interaction
 * (toolbar buttons, pins, drawer) opts back in via pointer-events: auto.
 *
 * @attr target — CSS selector of the element to audit. Defaults to the
 *   document body when not provided.
 * @attr disabled-rules — comma-separated rule IDs to disable for this lens
 *   (forwarded to the engine's ruleOverrides).
 * @attr paused — when present, defers the initial scan until rescan() is
 *   called manually.
 *
 * @fires cg-lens:scan-complete
 *   detail: { findings: Finding[]; score: LensScore; durationMs: number }
 * @fires cg-lens:finding-selected
 *   detail: { finding: Finding }
 * @fires cg-lens:dismiss
 */
@customElement('cg-lens')
export class CgLens extends LitElement {
  /** CSS selector for the audit target. Empty = document body. */
  @property({ type: String }) target = '';

  /** Comma-separated rule IDs to disable. */
  @property({ type: String, attribute: 'disabled-rules' }) disabledRules = '';

  /** When true, skip the initial scan in connectedCallback. */
  @property({ type: Boolean, reflect: true }) paused = false;

  /**
   * Rule packs to register. Set programmatically before connectedCallback
   * to override the default (`@cognivo/lens-pack-core` only).
   *
   *     const lens = document.querySelector('cg-lens');
   *     lens.packs = [corePack, ethicsPack];
   */
  @property({ attribute: false }) packs: RulePack[] | undefined;

  @state() private _findings: Finding[] = [];
  @state() private _graph: SceneGraph | null = null;
  @state() private _score: LensScore | null = null;
  @state() private _selectedFindingId: string | undefined;
  @state() private _drawerOpen = false;
  @state() private _filter: LensFilter = 'all';
  @state() private _scanInProgress = false;
  @state() private _lastScanMs = 0;
  @state() private _scanError: string | undefined;

  private _controller: ScanController | undefined;

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  get findings(): readonly Finding[] {
    return this._findings;
  }

  get score(): LensScore | null {
    return this._score;
  }

  get selectedFindingId(): string | undefined {
    return this._selectedFindingId;
  }

  get lastScanDurationMs(): number {
    return this._lastScanMs;
  }

  get drawerOpen(): boolean {
    return this._drawerOpen;
  }

  get filter(): LensFilter {
    return this._filter;
  }

  /** Re-run the audit. Resolves when complete; emits `cg-lens:scan-complete`. */
  async rescan(): Promise<ScanResult | undefined> {
    if (this._scanInProgress) return undefined;
    this._scanInProgress = true;
    this._scanError = undefined;
    try {
      const target = this._resolveTarget();
      if (!target) {
        this._scanError = `lens-ui: target "${this.target}" not found`;
        return undefined;
      }
      const ctrl = this._ensureController();
      const result = await ctrl.run(target);
      this._findings = result.findings;
      this._graph = result.graph;
      this._score = result.score;
      this._lastScanMs = result.durationMs;
      this.dispatchEvent(
        new CustomEvent('cg-lens:scan-complete', { detail: result, bubbles: true, composed: true })
      );
      return result;
    } finally {
      this._scanInProgress = false;
    }
  }

  /** Select a finding by id (also opens the drawer). */
  selectFinding(id: string | undefined): void {
    this._selectedFindingId = id;
    if (id !== undefined) {
      this._drawerOpen = true;
      const finding = this._findings.find((f) => f.id === id);
      if (finding) {
        this.dispatchEvent(
          new CustomEvent('cg-lens:finding-selected', {
            detail: { finding },
            bubbles: true,
            composed: true,
          })
        );
      }
    }
  }

  setDrawerOpen(open: boolean): void {
    this._drawerOpen = open;
    if (!open) this._selectedFindingId = undefined;
  }

  setFilter(filter: LensFilter): void {
    this._filter = filter;
  }

  /** Remove the lens from the page. Emits `cg-lens:dismiss` first. */
  dismiss(): void {
    this.dispatchEvent(new CustomEvent('cg-lens:dismiss', { bubbles: true, composed: true }));
    this.remove();
  }

  // ---------------------------------------------------------------------------
  // Lit lifecycle
  // ---------------------------------------------------------------------------

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.paused) {
      // Defer until layout has settled so the scan target exists & is visible.
      void Promise.resolve().then(() => void this.rescan());
    }
  }

  protected override updated(changed: PropertyValues): void {
    if (
      changed.has('disabledRules') ||
      changed.has('target') ||
      changed.has('packs')
    ) {
      // Engine config baked into the controller — recreate.
      this._controller = undefined;
    }
  }

  // ---------------------------------------------------------------------------
  // Internals
  // ---------------------------------------------------------------------------

  private _resolveTarget(): Element | null {
    if (this.target.trim() === '') {
      return this.ownerDocument?.body ?? null;
    }
    return this.ownerDocument?.querySelector(this.target) ?? null;
  }

  private _ensureController(): ScanController {
    if (!this._controller) {
      const disabled = this.disabledRules
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      this._controller = new ScanController({
        disabledRules: disabled,
        ...(this.packs !== undefined && { packs: this.packs }),
      });
    }
    return this._controller;
  }

  // ---------------------------------------------------------------------------
  // Render — placeholder until Phase C/D/E ship the children.
  // ---------------------------------------------------------------------------

  override render() {
    return html`
      <div class="root" role="region" aria-label="Lens audit overlay">
        <span class="sr-status" aria-live="polite" data-cg-lens-status>
          ${this._scanInProgress
            ? 'Scanning…'
            : this._scanError
              ? `Error: ${this._scanError}`
              : `${this._findings.length} findings, score ${this._score ? Math.round(this._score.composite) : 'pending'}`}
        </span>
        <cg-lens-overlay
          .findings=${this._findings}
          .graph=${this._graph}
          .selectedFindingId=${this._selectedFindingId}
          @cg-lens-pin:select=${this._onPinSelect}
        ></cg-lens-overlay>
        <cg-lens-toolbar
          .findings=${this._findings}
          .score=${this._score}
          .lastScanMs=${this._lastScanMs}
          .scanInProgress=${this._scanInProgress}
          @cg-lens-toolbar:rescan=${this._onRescan}
          @cg-lens-toolbar:open-drawer=${this._onOpenDrawer}
          @cg-lens-toolbar:dismiss=${this._onDismiss}
        ></cg-lens-toolbar>
        <cg-lens-drawer
          .findings=${this._findings as Finding[]}
          .selectedFindingId=${this._selectedFindingId}
          .open=${this._drawerOpen}
          .filter=${this._filter}
          @cg-lens-drawer:close=${this._onDrawerClose}
          @cg-lens-drawer:filter-change=${this._onFilterChange}
        ></cg-lens-drawer>
      </div>
    `;
  }

  private _onDrawerClose = (): void => {
    this.setDrawerOpen(false);
  };

  private _onFilterChange = (e: Event): void => {
    const detail = (e as CustomEvent<{ filter: LensFilter }>).detail;
    this._filter = detail.filter;
  };

  private _onPinSelect = (e: Event): void => {
    const detail = (e as CustomEvent<{ findingId: string }>).detail;
    this.selectFinding(detail.findingId);
  };

  private _onRescan = (): void => {
    void this.rescan();
  };

  private _onOpenDrawer = (): void => {
    this._drawerOpen = true;
  };

  private _onDismiss = (): void => {
    this.dismiss();
  };

  static override styles = css`
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2147483646;
      font-family: var(--cg-font-family-base, system-ui, sans-serif);
      color-scheme: dark;
    }
    .root {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .sr-status {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-lens': CgLens;
  }
}
