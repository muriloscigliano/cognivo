import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-slider> — Range slider with value tooltip.
 */
@customElement('cg-slider')
export class CgSlider extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .slider-wrapper { padding: var(--cg-spacing-8, 8px) 0; }

    .header {
      display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--cg-spacing-8, 8px);
    }
    .label { font-size: var(--cg-font-size-sm, 14px); font-weight: var(--cg-font-weight-medium, 500); color: var(--cg-color-surface-base-text, #fafafa); }
    .value-display { font-size: var(--cg-font-size-sm, 14px); font-weight: var(--cg-font-weight-semibold, 600); color: var(--cg-text-accent, #e5ff6b); }

    input[type="range"] {
      width: 100%; height: 6px; -webkit-appearance: none; appearance: none;
      background: var(--cg-color-slider-track-background, #d4d4d8); border-radius: 3px; outline: none;
      cursor: pointer;
    }
    input[type="range"]:disabled { opacity: 0.5; cursor: not-allowed; }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; width: 20px; height: 20px;
      background: var(--cg-color-slider-thumb-background, #dfff61);
      border-radius: var(--cg-border-radius-full, 99999px); border: 3px solid var(--cg-gray-white, #ffffff);
      box-shadow: 0 1px 4px var(--cg-overlay-dark-medium, rgba(0, 0, 0, 0.3));
      cursor: pointer; transition: transform var(--cg-motion-duration-normal, 150ms);
    }
    input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.15); }
    input[type="range"]::-webkit-slider-thumb:active { transform: scale(var(--cg-interaction-press-scale, 0.97)); }
    input[type="range"]:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25)); }

    input[type="range"]::-moz-range-thumb {
      width: 20px; height: 20px; background: var(--cg-color-slider-thumb-background, #dfff61);
      border-radius: var(--cg-border-radius-full, 99999px); border: 3px solid var(--cg-gray-white, #ffffff);
      box-shadow: 0 1px 4px var(--cg-overlay-dark-medium, rgba(0, 0, 0, 0.3)); cursor: pointer;
    }

    .range-labels { display: flex; justify-content: space-between; margin-top: var(--cg-spacing-4, 4px); }
    .range-label { font-size: var(--cg-font-size-xs, 12px); color: var(--cg-gray-500, #71717a); }

    /* Size variants */
    :host([size="sm"]) input[type="range"] { height: 4px; }
    :host([size="sm"]) input[type="range"]::-webkit-slider-thumb { width: 16px; height: 16px; }
    :host([size="sm"]) input[type="range"]::-moz-range-thumb { width: 16px; height: 16px; }

    :host([size="lg"]) input[type="range"] { height: 8px; }
    :host([size="lg"]) input[type="range"]::-webkit-slider-thumb { width: 24px; height: 24px; }
    :host([size="lg"]) input[type="range"]::-moz-range-thumb { width: 24px; height: 24px; }
  `];

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property() label = '';
  @property() name = '';
  @property({ type: Number }) value = 50;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) showValue = true;
  @property({ type: Boolean }) showRange = false;
  @property() unit = '';

  private _handleInput(e: Event) {
    this.value = Number((e.target as HTMLInputElement).value);
    this.dispatchEvent(new CustomEvent('cg-change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="slider-wrapper">
        ${this.label || this.showValue ? html`
          <div class="header">
            ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
            ${this.showValue ? html`<span class="value-display">${this.value}${this.unit}</span>` : nothing}
          </div>
        ` : nothing}
        <input
          type="range"
          .value=${String(this.value)}
          min=${this.min}
          max=${this.max}
          step=${this.step}
          ?disabled=${this.disabled}
          name=${this.name || nothing}
          @input=${this._handleInput}
        />
        ${this.showRange ? html`
          <div class="range-labels">
            <span class="range-label">${this.min}${this.unit}</span>
            <span class="range-label">${this.max}${this.unit}</span>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-slider': CgSlider; }
}
