/**
 * @element ai-confidence-slider
 * Gradient range slider for setting confidence thresholds with presets and distribution histogram.
 *
 * @example
 * ```html
 * <ai-confidence-slider
 *   value="70"
 *   resultCount="42" totalCount="100"
 *   .distribution=${[2,5,8,12,20,30,15,6,1,1]}
 * ></ai-confidence-slider>
 * ```
 *
 * @fires {CustomEvent<{value: number}>} ai-confidence-change - Slider value changed or preset clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Slider thumb border, value badge highlight, active preset
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-confidence-slider')
export class AiConfidenceSlider extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 10px;
      padding: 14px 16px;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .label {
      font-size: 11px; font-weight: 700; color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .count {
      font-size: 12px; color: var(--cg-color-surface-base-text, #fafafa);
    }
    .count-highlight {
      font-weight: 700; color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* Slider */
    .slider-row { position: relative; margin-bottom: 10px; }

    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(90deg, #f87171 0%, #fbbf24 50%, #4ade80 100%);
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--cg-color-surface-base-text, #fafafa);
      border: 2px solid var(--cg-brand-ai-accent, #dfff61);
      cursor: pointer;
      box-shadow: var(--cg-elevation-1, 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2));
    }
    input[type="range"]:focus-visible::-webkit-slider-thumb {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    /* Firefox */
    input[type="range"]::-moz-range-thumb {
      width: 18px; height: 18px; border-radius: 50%;
      background: var(--cg-color-surface-base-text, #fafafa);
      border: 2px solid var(--cg-brand-ai-accent, #dfff61);
      cursor: pointer;
    }
    input[type="range"]::-moz-range-track {
      height: 6px; border-radius: 3px;
      background: linear-gradient(90deg, #f87171 0%, #fbbf24 50%, #4ade80 100%);
    }

    .value-badge {
      position: absolute;
      top: -24px;
      left: var(--thumb-pos, 50%);
      transform: translateX(-50%);
      font-size: 11px; font-weight: 700;
      padding: 2px 8px; border-radius: 4px;
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
      pointer-events: none;
    }

    /* Presets */
    .presets {
      display: flex; gap: 6px; margin-bottom: 10px;
    }
    .preset-btn {
      flex: 1; padding: 5px 0; border-radius: 6px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none; color: var(--cg-gray-400, #a1a1aa);
      font: inherit; font-size: 11px; font-weight: 600;
      cursor: pointer; transition: all 150ms; text-align: center;
    }
    .preset-btn:hover { border-color: var(--cg-gray-600, #52525b); color: var(--cg-color-surface-base-text, #fafafa); }
    .preset-btn.active { border-color: var(--cg-brand-ai-accent, #dfff61); color: var(--cg-brand-ai-accent, #dfff61); background: rgba(223, 255, 97, 0.06); }

    /* Distribution */
    .distribution {
      display: flex; align-items: flex-end; gap: 1px; height: 32px;
      padding-top: 8px; border-top: 1px solid var(--cg-gray-800, #27272a);
    }
    .dist-bar {
      flex: 1; border-radius: 2px 2px 0 0; min-height: 2px;
      transition: opacity 150ms;
    }
    .dist-bar.below { opacity: 0.2; }
    }
  `];
  @property({ type: Number }) value: number = 50;
  @property({ type: Number }) min: number = 0;
  @property({ type: Number }) max: number = 100;
  @property({ type: Number }) resultCount: number = 0;
  @property({ type: Number }) totalCount: number = 0;
  @property({ type: Array }) distribution: number[] = [];

  private _presets = [
    { label: 'Low (30%)', value: 30 },
    { label: 'Medium (60%)', value: 60 },
    { label: 'High (80%)', value: 80 },
  ];

  private _handleChange(e: Event) {
    this.value = Number((e.target as HTMLInputElement).value);
    this.dispatchEvent(new CustomEvent('ai-confidence-change', {
      bubbles: true, composed: true,
      detail: { value: this.value },
    }));
  }

  private _setPreset(val: number) {
    this.value = val;
    this.dispatchEvent(new CustomEvent('ai-confidence-change', {
      bubbles: true, composed: true,
      detail: { value: this.value },
    }));
  }

  private _getBarColor(index: number, total: number): string {
    const pct = (index / total) * 100;
    if (pct < 30) return '#f87171';
    if (pct < 60) return '#fbbf24';
    return '#4ade80';
  }

  override render() {
    const thumbPos = ((this.value - this.min) / (this.max - this.min)) * 100;

    return html`
      <div class="container" role="group" aria-label="Confidence threshold">
        <div class="header">
          <span class="label">Confidence Threshold</span>
          ${this.totalCount > 0 ? html`
            <span class="count">
              Showing <span class="count-highlight">${this.resultCount}</span> of ${this.totalCount}
            </span>
          ` : nothing}
        </div>

        <div class="slider-row" style="--thumb-pos: ${thumbPos}%;">
          <div class="value-badge">${this.value}%</div>
          <input type="range" .value=${String(this.value)}
            min="${this.min}" max="${this.max}"
            @input=${this._handleChange}
            aria-label="Minimum confidence: ${this.value}%"
            aria-valuemin="${this.min}" aria-valuemax="${this.max}" aria-valuenow="${this.value}" />
        </div>

        <div class="presets">
          ${this._presets.map(p => html`
            <button class="preset-btn ${this.value === p.value ? 'active' : ''}"
              @click=${() => this._setPreset(p.value)}>${p.label}</button>
          `)}
        </div>

        ${this.distribution.length > 0 ? (() => {
          const maxVal = Math.max(...this.distribution, 1);
          return html`
          <div class="distribution" aria-hidden="true">
            ${this.distribution.map((v, i) => {
              const h = (v / maxVal) * 32;
              const pct = (i / this.distribution.length) * 100;
              const isBelow = pct < this.value;
              return html`<div class="dist-bar ${isBelow ? 'below' : ''}"
                style="height: ${Math.max(h, 2)}px; background: ${this._getBarColor(i, this.distribution.length)};"></div>`;
            })}
          </div>
        `;})() : nothing}
      </div>
    `;
  }
}
