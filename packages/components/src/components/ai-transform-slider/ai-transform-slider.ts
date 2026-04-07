/**
 * @element ai-transform-slider
 * Before/after image comparison slider with draggable divider using clip-path overlay.
 * Supports horizontal and vertical orientations, keyboard arrow keys, and pointer capture.
 *
 * @example
 * ```html
 * <ai-transform-slider
 *   beforeSrc="/img/before.jpg"
 *   afterSrc="/img/after.jpg"
 *   beforeLabel="Original"
 *   afterLabel="Enhanced"
 *   position="50"
 * ></ai-transform-slider>
 * ```
 *
 * @fires {CustomEvent<{position: number}>} ai-transform-change - Slider position changed
 *
 * @cssprop --cg-color-action-primary-background-default - Divider line and handle color
 */
import { LitElement, html, css } from 'lit';
import { property, state, customElement, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeInKeyframes } from '../../styles/index.js';

@customElement('ai-transform-slider')
export class AiTransformSlider extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeInKeyframes, css`
    :host {
      animation: fadeIn var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
    }

    .container {
      position: relative;
      overflow: hidden;
      border-radius: var(--cg-border-radius-200);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: var(--cg-color-surface-base-background);
      user-select: none;
      touch-action: none;
      cursor: ew-resize;
    }
    :host([orientation="vertical"]) .container {
      cursor: ns-resize;
    }

    .image-layer {
      display: block;
      width: 100%;
      height: auto;
      pointer-events: none;
    }

    .after-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .after-layer img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }

    /* ── Divider line ── */
    .divider {
      position: absolute;
      z-index: 2;
      transition: left var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
                  top var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .container.dragging .divider { transition: none; }

    .divider.horizontal {
      top: 0;
      bottom: 0;
      width: var(--cg-border-width-100);
      background: var(--cg-color-action-primary-background-default);
    }
    .divider.vertical {
      left: 0;
      right: 0;
      height: var(--cg-border-width-100);
      background: var(--cg-color-action-primary-background-default);
    }

    /* ── Handle grip ── */
    .handle {
      position: absolute;
      z-index: 3;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-base-background);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      transition:
        transform var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
        border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
        box-shadow var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
        left var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
        top var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .container.dragging .handle {
      transition: transform var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
                  border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
                  box-shadow var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .handle:hover {
      transform: translate(-50%, -50%) scale(1.1);
      border-color: var(--cg-color-surface-base-text);
    }
    .container.dragging .handle {
      transform: translate(-50%, -50%) scale(1.15);
      border-color: var(--cg-color-surface-base-text);
      box-shadow: 0 0 0 4px var(--cg-overlay-accent-light);
    }
    .handle:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background),
        0 0 0 4px var(--cg-color-focus-ring);
    }
    .handle svg {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      color: var(--cg-color-surface-base-background);
    }

    /* ── Labels ── */
    .label {
      position: absolute;
      z-index: 2;
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-overlay-dark-strong);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      pointer-events: none;
    }
    .label.before {
      bottom: var(--cg-spacing-12);
      left: var(--cg-spacing-12);
    }
    .label.after {
      bottom: var(--cg-spacing-12);
      right: var(--cg-spacing-12);
    }

    /* ── Placeholder ── */
    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--cg-spacing-96);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-200); }

    @media (prefers-reduced-motion: reduce) {
      .handle, .divider { transition: none !important; }
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: String }) beforeSrc: string = '';
  @property({ type: String }) afterSrc: string = '';
  @property({ type: String }) beforeLabel: string = 'Before';
  @property({ type: String }) afterLabel: string = 'After';
  @property({ type: Number }) position: number = 50;
  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  @state() private _dragging = false;
  @query('.container') private _container!: HTMLElement;

  private _getClipPath(): string {
    if (this.orientation === 'vertical') {
      return `inset(${this.position}% 0 0 0)`;
    }
    return `inset(0 ${100 - this.position}% 0 0)`;
  }

  private _onPointerDown(e: PointerEvent) {
    this._dragging = true;
    this._container?.setPointerCapture?.(e.pointerId);
    this._updatePosition(e);
  }

  private _onPointerMove(e: PointerEvent) {
    if (!this._dragging) return;
    this._updatePosition(e);
  }

  private _onPointerUp() {
    this._dragging = false;
  }

  private _updatePosition(e: PointerEvent) {
    if (!this._container) return;
    const rect = this._container.getBoundingClientRect();
    let pos: number;
    if (this.orientation === 'vertical') {
      pos = ((e.clientY - rect.top) / rect.height) * 100;
    } else {
      pos = ((e.clientX - rect.left) / rect.width) * 100;
    }
    pos = Math.max(0, Math.min(100, pos));
    this.position = Math.round(pos * 10) / 10;
    this.dispatchEvent(new CustomEvent('ai-transform-change', {
      bubbles: true, composed: true,
      detail: { position: this.position },
    }));
  }

  private _handleKeyDown(e: KeyboardEvent) {
    let delta = 0;
    if (this.orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') delta = -2;
      if (e.key === 'ArrowRight') delta = 2;
    } else {
      if (e.key === 'ArrowUp') delta = -2;
      if (e.key === 'ArrowDown') delta = 2;
    }
    if (delta) {
      e.preventDefault();
      this.position = Math.max(0, Math.min(100, this.position + delta));
      this.dispatchEvent(new CustomEvent('ai-transform-change', {
        bubbles: true, composed: true,
        detail: { position: this.position },
      }));
    }
  }

  override render() {
    if (!this.beforeSrc || !this.afterSrc) {
      return html`<div class="container"><div class="placeholder">Provide beforeSrc and afterSrc images</div></div>`;
    }

    const isH = this.orientation === 'horizontal';
    const dividerStyle = isH
      ? `left: ${this.position}%`
      : `top: ${this.position}%`;
    const handleStyle = isH
      ? `left: ${this.position}%; top: 50%`
      : `top: ${this.position}%; left: 50%`;

    return html`
      <div class="container ${this._dragging ? 'dragging' : ''}"
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerUp}>

        <!-- Before image (full) -->
        <img class="image-layer" src="${this.beforeSrc}" alt="${this.beforeLabel}" draggable="false" />

        <!-- After image (clipped) -->
        <div class="after-layer" style="clip-path: ${this._getClipPath()}">
          <img src="${this.afterSrc}" alt="${this.afterLabel}" draggable="false" />
        </div>

        <!-- Divider line -->
        <div class="divider ${this.orientation}" style="${dividerStyle}"></div>

        <!-- Drag handle -->
        <div class="handle" style="${handleStyle}"
          tabindex="0" role="slider"
          aria-label="Compare position"
          aria-valuemin="0" aria-valuemax="100"
          aria-valuenow="${this.position}"
          @keydown=${this._handleKeyDown}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            ${isH
              ? html`<path d="M8 6l-4 6 4 6"/><path d="M16 6l4 6-4 6"/>`
              : html`<path d="M6 8l6-4 6 4"/><path d="M6 16l6 4 6-4"/>`}
          </svg>
        </div>

        <!-- Labels -->
        <span class="label before">${this.beforeLabel}</span>
        <span class="label after">${this.afterLabel}</span>
      </div>
    `;
  }
}
