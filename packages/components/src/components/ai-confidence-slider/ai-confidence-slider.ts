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
      animation: fadeSlideIn var(--cg-motion-duration-normal) var(--cg-motion-easing-enter) both;
    }

    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-spacing-20) var(--cg-spacing-24);
    }

    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--cg-spacing-8);
    }
    .label {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-bold); color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
    }
    .count {
      font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-base-text);
    }
    .count-highlight {
      font-weight: var(--cg-font-weight-bold); color: var(--cg-color-surface-base-text);
    }

    /* Slider */
    .slider-row { position: relative; margin-bottom: var(--cg-spacing-8); }

    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-50);
      background: linear-gradient(90deg, var(--cg-color-status-error-text-default) 0%, var(--cg-color-status-warning-text-default) 50%, var(--cg-color-status-success-text-default) 100%);
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-base-text);
      border: var(--cg-spacing-2) solid var(--cg-color-surface-cards-background);
      cursor: pointer;
    }
    input[type="range"]:focus-visible::-webkit-slider-thumb {
      outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    /* Firefox */
    input[type="range"]::-moz-range-thumb {
      width: var(--cg-spacing-16); height: var(--cg-spacing-16); border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-base-text);
      border: var(--cg-spacing-2) solid var(--cg-color-surface-cards-background);
      cursor: pointer;
    }
    input[type="range"]:focus-visible::-moz-range-thumb {
      outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    input[type="range"]::-moz-range-track {
      height: var(--cg-spacing-6); border-radius: var(--cg-border-radius-50);
      background: linear-gradient(90deg, var(--cg-color-status-error-text-default) 0%, var(--cg-color-status-warning-text-default) 50%, var(--cg-color-status-success-text-default) 100%);
    }

    .value-badge {
      position: absolute;
      top: calc(-1 * var(--cg-spacing-24));
      left: var(--thumb-pos, 50%);
      transform: translateX(-50%);
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-bold);
      padding: var(--cg-spacing-2) var(--cg-spacing-8); border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-surface-cards-background);
      color: var(--cg-color-surface-base-text);
      pointer-events: none;
      z-index: 1;
    }

    /* Presets */
    .presets {
      display: flex; gap: var(--cg-spacing-6); margin-bottom: var(--cg-spacing-8);
    }
    .preset-btn {
      flex: 1; padding: var(--cg-spacing-4) 0; border-radius: var(--cg-component-card-radius);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: none; color: var(--cg-color-input-text-placeholder);
      font: inherit; font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      cursor: pointer; transition: opacity var(--cg-motion-duration-fast); text-align: center;
    }
    .preset-btn:hover { border-color: var(--cg-color-input-border-hover); color: var(--cg-color-surface-base-text); }
    .preset-btn:focus-visible {
      outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .preset-btn.active { border-color: var(--cg-color-surface-base-text); color: var(--cg-color-surface-base-text); background: var(--cg-overlay-accent-subtle); }

    /* Distribution */
    .distribution {
      display: flex; align-items: flex-end; gap: var(--cg-spacing-1); height: var(--cg-spacing-32);
      padding-top: var(--cg-spacing-8); border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .dist-bar {
      flex: 1; border-radius: var(--cg-spacing-2) var(--cg-spacing-2) 0 0; min-height: var(--cg-spacing-2);
      transition: opacity var(--cg-motion-duration-fast);
    }
    .dist-bar.below { opacity: 0.2; }
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
    if (pct < 30) return 'var(--cg-color-status-error-text-default)';
    if (pct < 60) return 'var(--cg-color-status-warning-text-default)';
    return 'var(--cg-color-status-success-text-default)';
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
