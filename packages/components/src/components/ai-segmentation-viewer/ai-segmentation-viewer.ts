/**
 * @element ai-segmentation-viewer
 * Image segmentation viewer with colored mask overlays, legend, visibility toggles, and opacity control.
 *
 * @fires {CustomEvent<{id: string, label: string}>} ai-segment-select
 * @fires {CustomEvent<{id: string, visible: boolean}>} ai-segment-toggle
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface SegmentMask {
  id: string;
  label: string;
  color: string;
  visible?: boolean;
}

@customElement('ai-segmentation-viewer')
export class AiSegmentationViewer extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
    }

    .header {
      padding: var(--cg-spacing-16) var(--cg-spacing-24);
    }
    .header-title {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    /* ── Canvas ── */
    .canvas-wrap {
      position: relative; overflow: hidden;
      background: var(--cg-color-surface-base-background);
    }
    .canvas-wrap img { display: block; width: 100%; height: auto; }
    .mask-overlay {
      position: absolute; inset: 0; pointer-events: none;
      transition: opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .mask-overlay.selected {
      outline: var(--cg-border-width-100) solid var(--cg-color-action-primary-background-default);
      outline-offset: calc(-1 * var(--cg-spacing-2));
    }

    /* ── Opacity slider ── */
    .opacity-row {
      padding: var(--cg-spacing-4) var(--cg-spacing-16);
    }

    /* ── Legend ── */
    .legend {
      padding: var(--cg-spacing-16) var(--cg-spacing-24);
      display: flex; flex-direction: column; gap: var(--cg-spacing-12);
    }
    .legend-title {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
    }
    .legend-items { display: flex; flex-wrap: wrap; gap: var(--cg-spacing-8); }
    .legend-item {
      display: inline-flex; align-items: center; gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: transparent;
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), color var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .legend-item:hover { border-color: var(--cg-color-surface-cards-hover-border); color: var(--cg-color-surface-base-text); }
    .legend-item.selected { border-color: var(--cg-color-action-primary-background-default); color: var(--cg-color-surface-base-text); }
    .legend-item.hidden { opacity: 0.4; }
    .legend-item:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    .legend-swatch { width: var(--cg-spacing-8); height: var(--cg-spacing-8); border-radius: var(--cg-border-radius-full); flex-shrink: 0; }
    .legend-toggle {
      background: none; border: none; padding: 0; color: inherit; cursor: pointer;
      display: flex; align-items: center;
    }
    .legend-toggle svg { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }

    /* ── Rounded ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-150); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property() src = '';
  @property({ type: Array }) masks: SegmentMask[] = [];
  @property() selectedMask = '';
  @property({ type: Number }) opacity = 0.4;
  @property({ type: Boolean }) showLabels = false;
  @property({ type: Boolean }) showLegend = false;

  private _selectMask(mask: SegmentMask) {
    this.selectedMask = mask.id;
    this.dispatchEvent(new CustomEvent('ai-segment-select', { bubbles: true, composed: true, detail: { id: mask.id, label: mask.label } }));
  }

  private _toggleMask(mask: SegmentMask, e: Event) {
    e.stopPropagation();
    const newVisible = !(mask.visible !== false);
    this.masks = this.masks.map(m => m.id === mask.id ? { ...m, visible: newVisible } : m);
    this.dispatchEvent(new CustomEvent('ai-segment-toggle', { bubbles: true, composed: true, detail: { id: mask.id, visible: newVisible } }));
  }

  override render() {
    const visibleMasks = this.masks.filter(m => m.visible !== false);

    return html`
      <div class="panel">
        <div class="header">
          <span class="header-title">Segmentation</span>
        </div>

        <div class="canvas-wrap">
          ${this.src ? html`<img src=${this.src} alt="Segmentation source" />` : nothing}
          ${visibleMasks.map(m => html`
            <div class="mask-overlay ${m.id === this.selectedMask ? 'selected' : ''}"
              style="background: ${m.color}; opacity: ${this.opacity};"></div>
          `)}
        </div>

        <div class="opacity-row">
          <cg-slider
            label="Opacity"
            value="${Math.round(this.opacity * 100)}"
            min="0" max="100"
            unit="%"
            size="sm"
            showValue
            .showTooltip=${false}
            .showRange=${false}
            @cg-change=${(e: CustomEvent) => { this.opacity = e.detail.value / 100; }}
          ></cg-slider>
        </div>

        ${this.showLegend ? html`
          <div class="legend">
            <span class="legend-title">Masks</span>
            <div class="legend-items">
              ${this.masks.map(m => html`
                <div class="legend-item ${m.id === this.selectedMask ? 'selected' : ''} ${m.visible === false ? 'hidden' : ''}"
                  tabindex="0" role="button"
                  @click=${() => this._selectMask(m)}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._selectMask(m); } }}>
                  <span class="legend-swatch" style="background: ${m.color}"></span>
                  ${m.label}
                  <button class="legend-toggle" @click=${(e: Event) => this._toggleMask(m, e)}
                    aria-label="${m.visible !== false ? 'Hide' : 'Show'} ${m.label}">
                    ${m.visible !== false ? html`
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    ` : html`
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    `}
                  </button>
                </div>
              `)}
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
