import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Finding, PageRect, SceneGraph, SceneNode, Severity } from '@cognivo/lens-core';
import { severityRank } from '../internal/severity-style.js';
import { pageRectToViewportRect, type ViewportRect } from '../internal/viewport-rect.js';
import './cg-lens-pin.js';

interface PinGroup {
  /** Finding to display (the highest-severity / highest-confidence one in the group). */
  finding: Finding;
  rect: PageRect;
  count: number;
}

/**
 * Renders pins for the current findings, batching per-node groups so
 * stacked findings don't spawn overlapping pins. Subscribes to scroll +
 * resize on connect, batched via requestAnimationFrame, so pin positions
 * follow page scroll without jank.
 */
@customElement('cg-lens-overlay')
export class CgLensOverlay extends LitElement {
  @property({ attribute: false }) findings: Finding[] = [];
  /** SceneGraph the findings came from — used to resolve targetNodeId → rect. */
  @property({ attribute: false }) graph: SceneGraph | null = null;
  @property({ attribute: false }) selectedFindingId: string | undefined = undefined;

  @state() private _scrollX = 0;
  @state() private _scrollY = 0;

  private _rafHandle = 0;

  override connectedCallback(): void {
    super.connectedCallback();
    this._snapshotScroll();
    window.addEventListener('scroll', this._onScrollOrResize, { passive: true });
    window.addEventListener('resize', this._onScrollOrResize);
  }

  override disconnectedCallback(): void {
    window.removeEventListener('scroll', this._onScrollOrResize);
    window.removeEventListener('resize', this._onScrollOrResize);
    if (this._rafHandle !== 0) cancelAnimationFrame(this._rafHandle);
    super.disconnectedCallback();
  }

  override render() {
    if (!this.graph || this.findings.length === 0) return null;
    const groups = groupFindingsByNode(this.findings, this.graph);
    return html`<div class="pins">
      ${groups.map((g) => {
        const view: ViewportRect = pageRectToViewportRect(
          g.rect,
          this._scrollX,
          this._scrollY
        );
        return html`<cg-lens-pin
          .findingId=${g.finding.id}
          .severity=${g.finding.severity as Severity}
          .message=${g.finding.message}
          .viewportRect=${view}
          .groupCount=${g.count}
          .selected=${this.selectedFindingId === g.finding.id}
        ></cg-lens-pin>`;
      })}
    </div>`;
  }

  private _onScrollOrResize = (): void => {
    if (this._rafHandle !== 0) return;
    this._rafHandle = requestAnimationFrame(() => {
      this._rafHandle = 0;
      this._snapshotScroll();
    });
  };

  private _snapshotScroll(): void {
    this._scrollX = window.scrollX;
    this._scrollY = window.scrollY;
  }

  static override styles = css`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
  `;
}

/**
 * Group findings by `targetNodeId`, keeping the highest-severity (then
 * highest-confidence) finding as the group representative. Skips any finding
 * whose node has no rect in the graph (e.g. detached node).
 */
function groupFindingsByNode(
  findings: readonly Finding[],
  graph: SceneGraph
): PinGroup[] {
  const byId = new Map<string, SceneNode>();
  for (const node of graph.nodes) byId.set(node.id, node);

  const groups = new Map<string, PinGroup>();
  for (const f of findings) {
    const node = byId.get(f.targetNodeId);
    if (!node) continue;
    const existing = groups.get(f.targetNodeId);
    if (!existing) {
      groups.set(f.targetNodeId, { finding: f, rect: node.rect, count: 1 });
      continue;
    }
    existing.count += 1;
    if (isMoreImportant(f, existing.finding)) existing.finding = f;
  }
  return [...groups.values()];
}

function isMoreImportant(a: Finding, b: Finding): boolean {
  const sa = severityRank(a.severity);
  const sb = severityRank(b.severity);
  if (sa !== sb) return sa < sb; // lower rank = higher severity
  return a.confidence > b.confidence;
}
