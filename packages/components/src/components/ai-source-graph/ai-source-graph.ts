/**
 * @element ai-source-graph
 * SVG radial graph visualizing which knowledge sources contributed to an
 * AI response. Line thickness indicates attribution weight. Click a node
 * to expand source details with type badge and excerpt.
 *
 * @example
 * ```html
 * <ai-source-graph
 *   responseId="resp-42"
 *   .sources=${[
 *     { id: 's1', title: 'API Docs', type: 'doc', weight: 0.8, excerpt: 'Rate limits apply...' },
 *     { id: 's2', title: 'Stack Overflow', type: 'web', weight: 0.4 }
 *   ]}
 * ></ai-source-graph>
 * ```
 *
 * @prop {SourceNode[]} sources - Array of source nodes with id, title, type, weight, excerpt
 * @prop {string} responseId - Label for the center node (default 'Response')
 *
 * @fires {CustomEvent<{id: string, title: string, type: string, weight: number}>} ai-source-click - When a source node is clicked
 */
import { LitElement, html, css, svg, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface SourceNode {
  id: string;
  title: string;
  type: 'doc' | 'web' | 'database' | 'api';
  weight: number; // 0-1
  excerpt?: string;
}

@customElement('ai-source-graph')
export class AiSourceGraph extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      padding: var(--cg-spacing-16, 16px);
      position: relative;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    .title {
      font-size: 12px; font-weight: 700; color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--cg-spacing-12, 12px);
    }

    svg { display: block; margin: 0 auto; }

    .edge { fill: none; stroke-linecap: round; }
    .node-circle { cursor: pointer; transition: opacity 150ms; }
    .node-circle:hover { opacity: 0.8; }
    .node-label {
      font-size: 10px;
      fill: var(--cg-gray-400, #a1a1aa);
      text-anchor: middle;
      pointer-events: none;
    }
    .center-label {
      font-size: var(--cg-font-size-xs, 12px); font-weight: 700;
      fill: var(--cg-brand-ai-accent, #dfff61);
      text-anchor: middle;
    }
    .node-icon {
      font-size: var(--cg-font-size-xs, 12px); text-anchor: middle; dominant-baseline: central;
      pointer-events: none;
    }

    /* Detail panel */
    .detail {
      margin-top: var(--cg-spacing-12, 12px);
      padding: var(--cg-spacing-12, 12px);
      background: var(--cg-color-surface-base-background, #09090b);
      border-radius: var(--cg-border-radius-100, 8px);
      animation: fadeIn 200ms ease;
    }
    .detail-header { display: flex; align-items: center; gap: var(--cg-spacing-8, 8px); margin-bottom: var(--cg-spacing-6, 6px); }
    .detail-type {
      font-size: 9px; font-weight: 700; padding: 2px var(--cg-spacing-6, 6px); border-radius: 3px;
      text-transform: uppercase;
    }
    .detail-type.doc { background: rgba(139, 92, 246, 0.12); color: #a78bfa; }
    .detail-type.web { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
    .detail-type.database { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
    .detail-type.api { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .detail-title { font-size: 13px; font-weight: 600; color: var(--cg-color-surface-base-text, #fafafa); }
    .detail-weight {
      font-size: var(--cg-font-size-xs, 12px); font-weight: 700; margin-left: auto;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      color: var(--cg-brand-ai-accent, #dfff61);
    }
    .detail-excerpt {
      font-size: 12px; color: var(--cg-gray-400, #a1a1aa); line-height: 1.4;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .empty { text-align: center; padding: 32px; color: var(--cg-gray-500, #71717a); font-size: 13px; }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `];

  @property({ type: Array }) sources: SourceNode[] = [];
  @property({ type: String }) responseId: string = 'Response';

  @state() private _selectedId: string = '';

  private _typeColors: Record<string, string> = {
    doc: '#a78bfa', web: '#60a5fa', database: '#4ade80', api: '#fbbf24',
  };

  private _typeIcons: Record<string, string> = {
    doc: 'DOC', web: 'WEB', database: 'DB', api: 'API',
  };

  private _handleSourceClick(source: SourceNode) {
    this._selectedId = this._selectedId === source.id ? '' : source.id;
    this.dispatchEvent(new CustomEvent('ai-source-click', {
      bubbles: true, composed: true,
      detail: { id: source.id, title: source.title, type: source.type, weight: source.weight },
    }));
  }

  override render() {
    if (this.sources.length === 0) {
      return html`<div class="container"><div class="empty">No source data</div></div>`;
    }

    const cx = 160, cy = 120, radius = 80;
    const svgW = 320, svgH = 240;
    const n = this.sources.length;

    const selected = this.sources.find(s => s.id === this._selectedId);

    return html`
      <div class="container" role="figure" aria-label="Source attribution graph">
        <div class="title">Source Attribution</div>

        <svg width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}">
          <!-- Edges -->
          ${this.sources.map((s, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            const sx = cx + Math.cos(angle) * radius;
            const sy = cy + Math.sin(angle) * radius;
            const strokeW = 1 + s.weight * 4;
            const color = this._typeColors[s.type] || '#71717a';
            return svg`<line class="edge" x1="${cx}" y1="${cy}" x2="${sx}" y2="${sy}"
              stroke="${color}" stroke-width="${strokeW}" opacity="${0.3 + s.weight * 0.5}" />`;
          })}

          <!-- Center node -->
          ${svg`
            <circle cx="${cx}" cy="${cy}" r="20" fill="rgba(223, 255, 97, 0.12)" stroke="var(--cg-brand-ai-accent, #dfff61)" stroke-width="1.5" />
            <text class="center-label" x="${cx}" y="${cy + 4}">AI</text>
          `}

          <!-- Source nodes -->
          ${this.sources.map((s, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            const sx = cx + Math.cos(angle) * radius;
            const sy = cy + Math.sin(angle) * radius;
            const color = this._typeColors[s.type] || '#71717a';
            const nodeR = 14 + s.weight * 8;
            const isSelected = s.id === this._selectedId;

            return svg`
              <circle class="node-circle" cx="${sx}" cy="${sy}" r="${nodeR}"
                fill="${color}22" stroke="${color}" stroke-width="${isSelected ? 2 : 1}"
                @click=${() => this._handleSourceClick(s)}
                tabindex="0" role="button" aria-label="${s.title} (${Math.round(s.weight * 100)}% weight)" />
              <text class="node-icon" x="${sx}" y="${sy}">${this._typeIcons[s.type] || '•'}</text>
              <text class="node-label" x="${sx}" y="${sy + nodeR + 12}">${s.title.length > 15 ? s.title.slice(0, 14) + '…' : s.title}</text>
            `;
          })}
        </svg>

        ${selected ? html`
          <div class="detail">
            <div class="detail-header">
              <span class="detail-type ${selected.type}">${selected.type}</span>
              <span class="detail-title">${selected.title}</span>
              <span class="detail-weight">${Math.round(selected.weight * 100)}%</span>
            </div>
            ${selected.excerpt ? html`<div class="detail-excerpt">${selected.excerpt}</div>` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
