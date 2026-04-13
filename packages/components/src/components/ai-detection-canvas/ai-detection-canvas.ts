/**
 * @element ai-detection-canvas
 * Object detection overlay on an image with positioned bounding boxes, labels, and confidence scores.
 *
 * @fires {CustomEvent<{id: string, label: string}>} ai-detection-select
 * @fires {CustomEvent<{id: string, label: string}>} ai-detection-hover
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface Detection {
  id: string;
  label: string;
  confidence: number;
  bbox: [number, number, number, number];
  color?: string;
}

@customElement('ai-detection-canvas')
export class AiDetectionCanvas extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .canvas {
      position: relative;
      display: inline-block;
      border-radius: var(--cg-border-radius-150);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      overflow: hidden;
      background: var(--cg-color-surface-base-background);
      line-height: 0;
    }
    .canvas img {
      display: block;
      width: 100%;
      height: auto;
      pointer-events: none;
    }

    /* ── Bounding box ── */
    .bbox {
      position: absolute;
      border: var(--cg-border-width-100) solid var(--det-color, var(--cg-color-surface-base-text));
      border-radius: var(--cg-border-radius-50);
      cursor: pointer;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      box-sizing: border-box;
    }
    .bbox:hover {
      background: var(--det-bg-hover, var(--cg-overlay-dark-subtle));
    }
    .bbox:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .bbox.selected {
      border-width: var(--cg-border-width-100);
      border-color: var(--cg-color-action-primary-background-default);
      background: var(--cg-overlay-accent-subtle);
    }

    /* ── Label ── */
    .bbox-label {
      position: absolute;
      top: calc(-1 * var(--cg-spacing-1));
      left: calc(-1 * var(--cg-spacing-1));
      transform: translateY(-100%);
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50) var(--cg-border-radius-50) var(--cg-border-radius-50) 0;
      color: var(--cg-color-action-primary-text-default);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      white-space: nowrap;
      pointer-events: none;
      line-height: var(--cg-line-height-snug);
    }
    .bbox-confidence {
      opacity: 0.7;
      font-family: var(--cg-font-family-mono);
    }

    /* ── Tooltip ── */
    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(calc(-1 * var(--cg-spacing-8)));
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-tooltip-background);
      color: var(--cg-color-tooltip-text);
      font-size: var(--cg-font-size-xs);
      white-space: nowrap;
      pointer-events: none;
      z-index: 10;
      line-height: var(--cg-line-height-snug);
    }
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: var(--cg-spacing-4) solid transparent;
      border-top-color: var(--cg-color-tooltip-background);
    }

    /* ── Placeholder ── */
    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--cg-spacing-96);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
    }

    /* ── Count badge ── */
    .count-badge {
      position: absolute;
      top: var(--cg-spacing-12);
      right: var(--cg-spacing-12);
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-overlay-dark-strong);
      color: var(--cg-gray-white);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      pointer-events: none;
      z-index: 5;
    }

    /* ── Rounded ── */
    :host([rounded="none"]) .canvas { border-radius: 0; }
    :host([rounded="sm"]) .canvas { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .canvas { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .canvas { border-radius: var(--cg-border-radius-150); }

    @media (prefers-reduced-motion: reduce) {
      .bbox { transition: none; }
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property() src = '';
  @property({ type: Array }) detections: Detection[] = [];
  @property({ type: Boolean }) showLabels = true;
  @property({ type: Boolean }) showConfidence = true;
  @property() selectedId = '';
  @property({ type: Boolean }) interactive = true;

  @state() private _hoveredId = '';
  @state() private _imgNatW = 0;
  @state() private _imgNatH = 0;

  private _onImgLoad(e: Event) {
    const img = e.target as HTMLImageElement;
    this._imgNatW = img.naturalWidth;
    this._imgNatH = img.naturalHeight;
  }

  private _selectDetection(det: Detection) {
    if (!this.interactive) return;
    this.selectedId = det.id;
    this.dispatchEvent(new CustomEvent('ai-detection-select', { bubbles: true, composed: true, detail: { id: det.id, label: det.label } }));
  }

  private _getDefaultColor(index: number): string {
    const palette = [
      'var(--cg-color-action-primary-background-default)',
      'var(--cg-color-status-info-text-default)',
      'var(--cg-color-status-success-text-default)',
      'var(--cg-color-status-warning-text-default)',
      'var(--cg-color-status-error-text-default)',
    ];
    return palette[index % palette.length]!;
  }

  override render() {
    if (!this.src) return html`<div class="canvas"><div class="placeholder">No image source</div></div>`;

    return html`
      <div class="canvas">
        <img src="${this.src}" alt="Detection source" @load=${this._onImgLoad} draggable="false" />

        ${this.detections.length > 0 ? html`
          <span class="count-badge">${this.detections.length} detection${this.detections.length > 1 ? 's' : ''}</span>
        ` : nothing}

        ${this._imgNatW > 0 ? this.detections.map((det, i) => {
          const [x, y, w, h] = det.bbox;
          const color = det.color || this._getDefaultColor(i);
          const pctL = (x / this._imgNatW) * 100;
          const pctT = (y / this._imgNatH) * 100;
          const pctW = (w / this._imgNatW) * 100;
          const pctH = (h / this._imgNatH) * 100;
          const isSelected = det.id === this.selectedId;
          const isHovered = det.id === this._hoveredId;

          return html`
            <div class="bbox ${isSelected ? 'selected' : ''}"
              style="left:${pctL}%;top:${pctT}%;width:${pctW}%;height:${pctH}%;--det-color:${color}"
              tabindex="${this.interactive ? '0' : '-1'}"
              role="button" aria-label="${det.label} ${Math.round(det.confidence * 100)}%"
              @click=${() => this._selectDetection(det)}
              @mouseenter=${() => { this._hoveredId = det.id; this.dispatchEvent(new CustomEvent('ai-detection-hover', { bubbles: true, composed: true, detail: { id: det.id, label: det.label } })); }}
              @mouseleave=${() => { this._hoveredId = ''; }}
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._selectDetection(det); } }}>

              ${this.showLabels ? html`
                <span class="bbox-label" style="background:${color}">
                  ${det.label}
                  ${this.showConfidence ? html`<span class="bbox-confidence">${Math.round(det.confidence * 100)}%</span>` : nothing}
                </span>
              ` : nothing}

              ${isHovered && this.interactive ? html`
                <div class="tooltip">${det.label} — ${Math.round(det.confidence * 100)}%</div>
              ` : nothing}
            </div>
          `;
        }) : nothing}
      </div>
    `;
  }
}
