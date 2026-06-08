import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4',
  '#3b82f6', '#8b5cf6', '#d946ef', '#ec4899', '#ffffff', '#18181b',
];

interface HSV { h: number; s: number; v: number; a: number; }

function hsvToHex(hsv: HSV): string {
  const { h, s, v } = hsv;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToHsv(hex: string): HSV {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let hue = 0;
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d + 6) % 6 * 60;
    else if (max === g) hue = ((b - r) / d + 2) * 60;
    else hue = ((r - g) / d + 4) * 60;
  }
  return { h: hue, s: max === 0 ? 0 : d / max, v: max, a: 1 };
}

function hsvToRgb(hsv: HSV): { r: number; g: number; b: number } {
  const { h, s, v } = hsv;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

/**
 * @element cg-color-picker
 * Color picker with trigger swatch + dropdown panel containing spectrum area,
 * hue slider, hex/RGB inputs, and preset swatches.
 *
 * @fires {CustomEvent<{color: string, hex: string}>} cg-color-change - When color changes
 */
@customElement('cg-color-picker')
export class CgColorPicker extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { position: relative; display: inline-block; }

    /* ── Label ── */
    .label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
      margin-bottom: var(--cg-spacing-4);
      font-weight: var(--cg-font-weight-medium);
      display: block;
    }

    /* ── Trigger ── */
    .trigger {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: 0 var(--cg-spacing-12);
      height: var(--cg-component-input-height-md);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-color-input-background-default);
      color: var(--cg-color-input-text-default);
      font: inherit;
      font-size: var(--cg-font-size-sm);
      cursor: pointer;
      outline: none;
      min-width: 180px;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .trigger:hover:not(.disabled) { border-color: var(--cg-color-input-border-hover); }
    .trigger:focus-visible { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    .trigger.open { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    .trigger.disabled { opacity: 0.5; pointer-events: none; background: var(--cg-color-input-background-disabled); border-color: var(--cg-color-input-border-disabled); }

    .trigger-swatch {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      flex-shrink: 0;
    }
    .trigger-text {
      flex: 1;
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-sm);
    }
    .trigger-chevron {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      color: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .trigger.open .trigger-chevron { transform: rotate(180deg); }

    /* ── Dropdown ── */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--cg-z-index-200);
      width: 272px;
      margin-top: var(--cg-spacing-4);
      padding: var(--cg-spacing-16);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      opacity: 0;
      transform: translateY(calc(-1 * var(--cg-spacing-4))) scale(0.98);
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .dropdown.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

    /* ── Color area ── */
    .color-area {
      position: relative;
      width: 100%;
      height: 150px;
      border-radius: var(--cg-border-radius-50);
      cursor: crosshair;
      overflow: hidden;
      touch-action: none;
    }
    .color-area-bg, .color-area-white, .color-area-black {
      position: absolute;
      inset: 0;
      border-radius: var(--cg-border-radius-50);
    }
    .color-area-white { background: linear-gradient(to right, var(--cg-component-color-picker-spectrum-white), transparent); }
    .color-area-black { background: linear-gradient(to top, var(--cg-component-color-picker-spectrum-black), transparent); }
    .color-area-thumb {
      position: absolute;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-component-color-picker-thumb-border);
      border-radius: var(--cg-border-radius-full);
      transform: translate(-50%, -50%);
      pointer-events: none;
      box-shadow: 0 0 0 1px var(--cg-overlay-dark-medium), inset 0 0 0 1px var(--cg-overlay-dark-light);
    }

    /* ── Sliders ── */
    .slider-row { display: flex; align-items: center; margin-top: var(--cg-spacing-12); }
    .slider-track {
      flex: 1;
      height: var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
      position: relative;
      cursor: pointer;
      touch-action: none;
    }
    .hue-track {
      background: linear-gradient(
        to right,
        var(--cg-component-color-picker-hue-stop-0),
        var(--cg-component-color-picker-hue-stop-60),
        var(--cg-component-color-picker-hue-stop-120),
        var(--cg-component-color-picker-hue-stop-180),
        var(--cg-component-color-picker-hue-stop-240),
        var(--cg-component-color-picker-hue-stop-300),
        var(--cg-component-color-picker-hue-stop-0)
      );
    }
    .alpha-track {
      background: repeating-conic-gradient(var(--cg-component-color-picker-checker-color) 0% 25%, transparent 0% 50%) 50% / 8px 8px;
      overflow: hidden;
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
    }
    .alpha-gradient { position: absolute; inset: 0; border-radius: var(--cg-border-radius-full); }
    .slider-thumb {
      position: absolute;
      top: 50%;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-component-color-picker-thumb-border);
      border-radius: var(--cg-border-radius-full);
      transform: translate(-50%, -50%);
      pointer-events: none;
      box-shadow: 0 0 0 1px var(--cg-overlay-dark-medium);
    }

    /* ── Hex + copy row ── */
    .inputs-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-12);
    }
    .preview-dot {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      flex-shrink: 0;
    }
    .hex-input {
      flex: 1; min-width: 0;
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-input-background-default);
      color: var(--cg-color-input-text-default);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      outline: none;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .hex-input:focus { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    .copy-btn {
      display: flex; align-items: center; justify-content: center;
      width: var(--cg-spacing-32); height: var(--cg-spacing-32);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-border-radius-50);
      background: transparent; color: var(--cg-color-surface-container-text);
      cursor: pointer; flex-shrink: 0;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .copy-btn:hover { background: var(--cg-color-action-secondary-background-hover); }
    .copy-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .copy-btn svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }

    /* ── RGB inputs ── */
    .rgb-row { display: flex; gap: var(--cg-spacing-4); margin-top: var(--cg-spacing-8); }
    .rgb-field { flex: 1; display: flex; flex-direction: column; gap: var(--cg-spacing-2); }
    .rgb-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      text-align: center; text-transform: uppercase;
      font-weight: var(--cg-font-weight-medium);
    }
    .rgb-input {
      width: 100%; text-align: center;
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-input-background-default);
      color: var(--cg-color-input-text-default);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-4) var(--cg-spacing-2);
      outline: none;
    }
    .rgb-input:focus { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }

    /* ── Presets ── */
    .presets {
      display: flex; flex-wrap: wrap; gap: var(--cg-spacing-4);
      margin-top: var(--cg-spacing-12); padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
    }
    .preset {
      width: var(--cg-spacing-20); height: var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-50);
      border: var(--cg-border-width-50) solid var(--cg-overlay-dark-subtle);
      cursor: pointer; padding: 0;
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .preset:hover { transform: scale(1.2); }
    .preset:active { transform: scale(var(--cg-interaction-press-scale)); }
    .preset.active { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 2px var(--cg-overlay-accent-strong); }
    .preset:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--cg-overlay-accent-strong); }
  `];

  @property() value = '#3b82f6';
  @property() label = '';
  @property({ type: Array }) colors: string[] = PRESET_COLORS;
  @property({ type: Boolean }) showAlpha = false;
  @property({ type: Boolean }) showRgb = true;
  @property({ type: Boolean }) showPresets = true;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _open = false;
  @state() private _hsv: HSV = { h: 217, s: 0.77, v: 0.96, a: 1 };
  @state() private _hexInput = '#3b82f6';
  @state() private _copied = false;
  private _dragging = false;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('value') && !this._dragging) {
      if (/^#([0-9a-fA-F]{3}){1,2}$/.test(this.value)) {
        const full = this.value.length === 4
          ? '#' + this.value[1]! + this.value[1]! + this.value[2]! + this.value[2]! + this.value[3]! + this.value[3]!
          : this.value;
        this._hsv = hexToHsv(full);
        this._hexInput = full;
      }
    }
  }

  private _toggle() { if (!this.disabled) this._open = !this._open; }
  private _close() { this._open = false; }

  private _emit() {
    const hex = hsvToHex(this._hsv);
    this.value = hex;
    this._hexInput = hex;
    this.dispatchEvent(new CustomEvent('cg-color-change', { detail: { color: hex, hex }, bubbles: true, composed: true }));
  }

  // ── Color area ──
  private _onAreaPointerDown(e: PointerEvent) {
    this._dragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this._updateArea(e, e.currentTarget as HTMLElement);
  }
  private _onAreaPointerMove(e: PointerEvent) { if (this._dragging) this._updateArea(e, e.currentTarget as HTMLElement); }
  private _onPointerUp() { this._dragging = false; }
  private _updateArea(e: PointerEvent, el: HTMLElement) {
    const r = el.getBoundingClientRect();
    this._hsv = { ...this._hsv, s: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), v: Math.max(0, Math.min(1, 1 - (e.clientY - r.top) / r.height)) };
    this._emit();
  }

  // ── Hue ──
  private _onHuePointerDown(e: PointerEvent) {
    this._dragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this._updateHue(e, e.currentTarget as HTMLElement);
  }
  private _onHuePointerMove(e: PointerEvent) { if (this._dragging) this._updateHue(e, e.currentTarget as HTMLElement); }
  private _updateHue(e: PointerEvent, el: HTMLElement) {
    const r = el.getBoundingClientRect();
    this._hsv = { ...this._hsv, h: Math.max(0, Math.min(360, ((e.clientX - r.left) / r.width) * 360)) };
    this._emit();
  }

  // ── Alpha ──
  private _onAlphaPointerDown(e: PointerEvent) {
    this._dragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this._updateAlpha(e, e.currentTarget as HTMLElement);
  }
  private _onAlphaPointerMove(e: PointerEvent) { if (this._dragging) this._updateAlpha(e, e.currentTarget as HTMLElement); }
  private _updateAlpha(e: PointerEvent, el: HTMLElement) {
    const r = el.getBoundingClientRect();
    this._hsv = { ...this._hsv, a: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) };
    this._emit();
  }

  // ── Keyboard (mirrors the pointer handlers so the spectrum + sliders are
  //    fully operable without a mouse — they were pointer-only before). ──
  private _onAreaKeydown(e: KeyboardEvent) {
    const step = e.shiftKey ? 0.1 : 0.01;
    let { s, v } = this._hsv;
    switch (e.key) {
      case 'ArrowLeft': s -= step; break;
      case 'ArrowRight': s += step; break;
      case 'ArrowUp': v += step; break;
      case 'ArrowDown': v -= step; break;
      default: return;
    }
    e.preventDefault();
    this._hsv = { ...this._hsv, s: Math.max(0, Math.min(1, s)), v: Math.max(0, Math.min(1, v)) };
    this._emit();
  }

  private _onHueKeydown(e: KeyboardEvent) {
    let h = this._hsv.h;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowUp': h += 1; break;
      case 'ArrowLeft': case 'ArrowDown': h -= 1; break;
      case 'PageUp': h += 10; break;
      case 'PageDown': h -= 10; break;
      case 'Home': h = 0; break;
      case 'End': h = 360; break;
      default: return;
    }
    e.preventDefault();
    this._hsv = { ...this._hsv, h: Math.max(0, Math.min(360, h)) };
    this._emit();
  }

  private _onAlphaKeydown(e: KeyboardEvent) {
    let a = this._hsv.a;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowUp': a += 0.01; break;
      case 'ArrowLeft': case 'ArrowDown': a -= 0.01; break;
      case 'PageUp': a += 0.1; break;
      case 'PageDown': a -= 0.1; break;
      case 'Home': a = 0; break;
      case 'End': a = 1; break;
      default: return;
    }
    e.preventDefault();
    this._hsv = { ...this._hsv, a: Math.max(0, Math.min(1, a)) };
    this._emit();
  }

  // ── Inputs ──
  private _onHexInput(e: Event) {
    let val = (e.target as HTMLInputElement).value.trim();
    this._hexInput = val;
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#([0-9a-fA-F]{3}){1,2}$/.test(val)) {
      const full = val.length === 4 ? '#' + val[1]! + val[1]! + val[2]! + val[2]! + val[3]! + val[3]! : val;
      this._hsv = hexToHsv(full);
      this._emit();
    }
  }
  private _onRgbInput(ch: 'r' | 'g' | 'b', e: Event) {
    const v = Math.max(0, Math.min(255, parseInt((e.target as HTMLInputElement).value) || 0));
    const rgb = hsvToRgb(this._hsv);
    rgb[ch] = v;
    const hex = `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
    this._hsv = hexToHsv(hex);
    this._emit();
  }

  private async _copy() {
    await navigator.clipboard.writeText(this.value);
    this._copied = true;
    setTimeout(() => { this._copied = false; this.requestUpdate(); }, 1500);
  }

  private _handleClickOutside = (e: Event) => { if (!e.composedPath().includes(this)) this._close(); };
  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { this._close(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && !this._open) { e.preventDefault(); this._toggle(); }
  }

  override connectedCallback() { super.connectedCallback(); document.removeEventListener('click', this._handleClickOutside); document.addEventListener('click', this._handleClickOutside); }
  override disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener('click', this._handleClickOutside); }

  override render() {
    const hueColor = hsvToHex({ h: this._hsv.h, s: 1, v: 1, a: 1 });
    const currentHex = hsvToHex(this._hsv);
    const rgb = hsvToRgb(this._hsv);

    return html`
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}

      <div class="trigger ${this._open ? 'open' : ''} ${this.disabled ? 'disabled' : ''}"
        tabindex=${this.disabled ? '-1' : '0'}
        role="combobox" aria-expanded=${this._open} aria-haspopup="dialog"
        aria-label=${this.label || 'Color picker'}
        @click=${this._toggle} @keydown=${this._handleKeydown}
      >
        <div class="trigger-swatch" style="background:${currentHex}"></div>
        <span class="trigger-text">${currentHex}</span>
        <svg class="trigger-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 9l6 6 6-6"></path></svg>
      </div>

      <div class="dropdown ${this._open ? 'open' : ''}" role="dialog" aria-label="Color picker">
        <!-- Spectrum -->
        <div class="color-area"
          tabindex="0"
          role="slider"
          aria-label="Saturation and brightness"
          aria-valuetext=${`Saturation ${Math.round(this._hsv.s * 100)}%, brightness ${Math.round(this._hsv.v * 100)}%, ${currentHex}`}
          @pointerdown=${this._onAreaPointerDown}
          @pointermove=${this._onAreaPointerMove}
          @pointerup=${this._onPointerUp}
          @keydown=${this._onAreaKeydown}
        >
          <div class="color-area-bg" style="background:${hueColor}"></div>
          <div class="color-area-white"></div>
          <div class="color-area-black"></div>
          <div class="color-area-thumb" style="left:${this._hsv.s * 100}%;top:${(1 - this._hsv.v) * 100}%;background:${currentHex}"></div>
        </div>

        <!-- Hue -->
        <div class="slider-row">
          <div class="slider-track hue-track"
            tabindex="0"
            role="slider"
            aria-label="Hue"
            aria-valuemin="0"
            aria-valuemax="360"
            aria-valuenow=${Math.round(this._hsv.h)}
            @pointerdown=${this._onHuePointerDown}
            @pointermove=${this._onHuePointerMove}
            @pointerup=${this._onPointerUp}
            @keydown=${this._onHueKeydown}
          ><div class="slider-thumb" style="left:${(this._hsv.h / 360) * 100}%;background:${hueColor}"></div></div>
        </div>

        <!-- Alpha -->
        ${this.showAlpha ? html`
          <div class="slider-row">
            <div class="slider-track alpha-track"
              tabindex="0"
              role="slider"
              aria-label="Opacity"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow=${Math.round(this._hsv.a * 100)}
              @pointerdown=${this._onAlphaPointerDown}
              @pointermove=${this._onAlphaPointerMove}
              @pointerup=${this._onPointerUp}
              @keydown=${this._onAlphaKeydown}
            ><div class="alpha-gradient" style="background:linear-gradient(to right,transparent,${currentHex})"></div>
            <div class="slider-thumb" style="left:${this._hsv.a * 100}%;background:${currentHex}"></div></div>
          </div>
        ` : nothing}

        <!-- Hex + copy -->
        <div class="inputs-row">
          <div class="preview-dot" style="background:${currentHex}"></div>
          <input class="hex-input" type="text" .value=${this._hexInput} aria-label="Hex color" @input=${this._onHexInput} />
          <button class="copy-btn" @click=${this._copy} aria-label="Copy color">
            ${this._copied ? html`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"></path></svg>
            ` : html`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
            `}
          </button>
        </div>

        <!-- RGB -->
        ${this.showRgb ? html`
          <div class="rgb-row">
            ${(['r', 'g', 'b'] as const).map(ch => html`
              <div class="rgb-field">
                <input class="rgb-input" type="number" min="0" max="255" .value=${String(rgb[ch])} @input=${(e: Event) => this._onRgbInput(ch, e)} aria-label=${ch.toUpperCase()} />
                <span class="rgb-label">${ch.toUpperCase()}</span>
              </div>
            `)}
          </div>
        ` : nothing}

        <!-- Presets -->
        ${this.showPresets && this.colors.length > 0 ? html`
          <div class="presets" role="radiogroup" aria-label="Preset colors">
            ${this.colors.map(c => html`
              <button class="preset ${this.value === c ? 'active' : ''}" style="background:${c}"
                role="radio" aria-checked=${this.value === c} aria-label=${c}
                @click=${() => { this._hsv = hexToHsv(c); this._emit(); }}
              ></button>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-color-picker': CgColorPicker; }
}
