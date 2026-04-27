import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-resizable
 * Two-pane split container with a draggable handle.
 *
 * @slot start - First pane (left or top).
 * @slot end - Second pane (right or bottom).
 *
 * @fires {CustomEvent<{size:number}>} cg-resize - When the split ratio changes.
 */
@customElement('cg-resizable')
export class CgResizable extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      min-height: var(--cg-spacing-160);
      overflow: hidden;
    }
    :host([direction="vertical"]) { flex-direction: column; }

    .pane {
      overflow: auto;
      position: relative;
    }

    .handle {
      flex-shrink: 0;
      position: relative;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([direction="horizontal"]) .handle {
      width: var(--cg-spacing-6);
      cursor: col-resize;
      background: transparent;
      border-left: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }
    :host([direction="vertical"]) .handle {
      height: var(--cg-spacing-6);
      cursor: row-resize;
      background: transparent;
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }

    /* Invisible hit area — extends the handle on the perpendicular axis to
       hit the WCAG 2.5.5 / Cognivo 44px minimum touch-target requirement. */
    .handle::after {
      content: '';
      position: absolute;
      inset: 0;
    }
    :host([direction="horizontal"]) .handle::after {
      left: calc(var(--cg-spacing-20) * -1);
      right: calc(var(--cg-spacing-20) * -1);
    }
    :host([direction="vertical"]) .handle::after {
      top: calc(var(--cg-spacing-20) * -1);
      bottom: calc(var(--cg-spacing-20) * -1);
    }

    /* Visible grip glyph — three small bars centered on the handle so users
       see it's draggable. */
    .handle::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background:
        var(--cg-color-surface-container-outlined),
        var(--cg-color-surface-container-outlined),
        var(--cg-color-surface-container-outlined);
      pointer-events: none;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([direction="horizontal"]) .handle::before {
      width: var(--cg-border-width-50);
      height: var(--cg-spacing-24);
      background: var(--cg-color-surface-container-outlined);
      box-shadow:
        calc(var(--cg-spacing-4) * -1) 0 0 0 var(--cg-color-surface-container-outlined),
        var(--cg-spacing-4) 0 0 0 var(--cg-color-surface-container-outlined);
    }
    :host([direction="vertical"]) .handle::before {
      width: var(--cg-spacing-24);
      height: var(--cg-border-width-50);
      background: var(--cg-color-surface-container-outlined);
      box-shadow:
        0 calc(var(--cg-spacing-4) * -1) 0 0 var(--cg-color-surface-container-outlined),
        0 var(--cg-spacing-4) 0 0 var(--cg-color-surface-container-outlined);
    }

    /* Hover + focus-visible — brand-accent borders + tinted fill. */
    :host([direction="horizontal"]) .handle:hover,
    :host([direction="horizontal"]) .handle:focus-visible {
      border-left-color: var(--cg-color-action-primary-border-default);
      border-right-color: var(--cg-color-action-primary-border-default);
      background: color-mix(in srgb, var(--cg-color-action-primary-background-default) 20%, transparent);
      outline: none;
    }
    :host([direction="vertical"]) .handle:hover,
    :host([direction="vertical"]) .handle:focus-visible {
      border-top-color: var(--cg-color-action-primary-border-default);
      border-bottom-color: var(--cg-color-action-primary-border-default);
      background: color-mix(in srgb, var(--cg-color-action-primary-background-default) 20%, transparent);
      outline: none;
    }
    .handle:hover::before,
    .handle:focus-visible::before {
      background: var(--cg-color-action-primary-text-default);
    }
    :host([direction="horizontal"]) .handle:hover::before,
    :host([direction="horizontal"]) .handle:focus-visible::before {
      box-shadow:
        calc(var(--cg-spacing-4) * -1) 0 0 0 var(--cg-color-action-primary-text-default),
        var(--cg-spacing-4) 0 0 0 var(--cg-color-action-primary-text-default);
    }
    :host([direction="vertical"]) .handle:hover::before,
    :host([direction="vertical"]) .handle:focus-visible::before {
      box-shadow:
        0 calc(var(--cg-spacing-4) * -1) 0 0 var(--cg-color-action-primary-text-default),
        0 var(--cg-spacing-4) 0 0 var(--cg-color-action-primary-text-default);
    }

    /* Active drag — stronger tint while pointer is down. */
    .handle[data-dragging] {
      background: color-mix(in srgb, var(--cg-color-action-primary-background-default) 35%, transparent);
    }

    .handle:focus-visible {
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
  `];

  @property({ reflect: true }) direction: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Number }) defaultSize = 0.5;
  @property({ type: Number }) min = 0.1;
  @property({ type: Number }) max = 0.9;

  @state() private _size = 0.5;

  private _activeMove: ((ev: PointerEvent) => void) | null = null;
  private _activeUp: (() => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this._size = this._clamp(this.defaultSize);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    // Drop any in-progress drag listeners so an unmount mid-drag doesn't leak.
    if (this._activeMove) window.removeEventListener('pointermove', this._activeMove);
    if (this._activeUp) window.removeEventListener('pointerup', this._activeUp);
    this._activeMove = null;
    this._activeUp = null;
  }

  private _clamp(v: number): number {
    return Math.max(this.min, Math.min(this.max, v));
  }

  private _setSize(v: number): void {
    const next = this._clamp(v);
    if (next === this._size) return;
    this._size = next;
    this.dispatchEvent(new CustomEvent('cg-resize', {
      bubbles: true,
      composed: true,
      detail: { size: next },
    }));
  }

  private _onPointerDown(e: PointerEvent): void {
    e.preventDefault();
    const handle = e.currentTarget as HTMLElement;
    const pointerId = e.pointerId;
    handle.setPointerCapture?.(pointerId);
    handle.setAttribute('data-dragging', '');
    const rect = this.getBoundingClientRect();
    const move = (ev: PointerEvent) => {
      const fraction =
        this.direction === 'horizontal'
          ? (ev.clientX - rect.left) / rect.width
          : (ev.clientY - rect.top) / rect.height;
      this._setSize(fraction);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      try { handle.releasePointerCapture?.(pointerId); } catch { /* already released */ }
      handle.removeAttribute('data-dragging');
      this._activeMove = null;
      this._activeUp = null;
    };
    this._activeMove = move;
    this._activeUp = up;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  }

  private _onKeydown(e: KeyboardEvent): void {
    // 5% per arrow press, 10% with Shift, 10% on PageUp/PageDown.
    const baseStep = 0.05;
    const step = e.shiftKey ? baseStep * 2 : baseStep;
    const horizontal = this.direction === 'horizontal';
    const decreaseKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
    const increaseKey = horizontal ? 'ArrowRight' : 'ArrowDown';
    switch (e.key) {
      case decreaseKey:
        e.preventDefault();
        this._setSize(this._size - step);
        break;
      case increaseKey:
        e.preventDefault();
        this._setSize(this._size + step);
        break;
      case 'PageUp':
        e.preventDefault();
        this._setSize(this._size - 0.1);
        break;
      case 'PageDown':
        e.preventDefault();
        this._setSize(this._size + 0.1);
        break;
      case 'Home':
        e.preventDefault();
        this._setSize(this.min);
        break;
      case 'End':
        e.preventDefault();
        this._setSize(this.max);
        break;
    }
  }

  override render() {
    const horizontal = this.direction === 'horizontal';
    const startStyle = horizontal
      ? `width: ${this._size * 100}%; height: 100%;`
      : `height: ${this._size * 100}%; width: 100%;`;
    const endStyle = horizontal
      ? `width: ${(1 - this._size) * 100}%; height: 100%;`
      : `height: ${(1 - this._size) * 100}%; width: 100%;`;

    return html`
      <div class="pane" style=${startStyle}><slot name="start"></slot></div>
      <div
        class="handle"
        role="separator"
        tabindex="0"
        aria-orientation=${horizontal ? 'vertical' : 'horizontal'}
        aria-valuenow=${Math.round(this._size * 100)}
        aria-valuemin=${Math.round(this.min * 100)}
        aria-valuemax=${Math.round(this.max * 100)}
        @pointerdown=${this._onPointerDown}
        @keydown=${this._onKeydown}
      ></div>
      <div class="pane" style=${endStyle}><slot name="end"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-resizable': CgResizable;
  }
}
