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
      font-family: var(--cg-font-family-primary);
    }
    :host([direction="vertical"]) { flex-direction: column; }

    .pane {
      overflow: auto;
      position: relative;
    }

    .handle {
      flex-shrink: 0;
      position: relative;
      background: var(--cg-color-surface-container-border);
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
    .handle::after {
      content: '';
      position: absolute;
      inset: 0;
    }
    :host([direction="horizontal"]) .handle::after {
      left: calc(var(--cg-spacing-4) * -1);
      right: calc(var(--cg-spacing-4) * -1);
    }
    :host([direction="vertical"]) .handle::after {
      top: calc(var(--cg-spacing-4) * -1);
      bottom: calc(var(--cg-spacing-4) * -1);
    }
    :host([direction="horizontal"]) .handle:hover,
    :host([direction="horizontal"]) .handle:focus-visible {
      border-left-color: var(--cg-color-action-primary-background-default);
      border-right-color: var(--cg-color-action-primary-background-default);
      background: color-mix(in srgb, var(--cg-color-action-primary-background-default) 20%, transparent);
      outline: none;
    }
    :host([direction="vertical"]) .handle:hover,
    :host([direction="vertical"]) .handle:focus-visible {
      border-top-color: var(--cg-color-action-primary-background-default);
      border-bottom-color: var(--cg-color-action-primary-background-default);
      background: color-mix(in srgb, var(--cg-color-action-primary-background-default) 20%, transparent);
      outline: none;
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
    const step = 0.05;
    const horizontal = this.direction === 'horizontal';
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if ((horizontal && e.key === 'ArrowLeft') || (!horizontal && e.key === 'ArrowUp')) {
          e.preventDefault();
          this._setSize(this._size - step);
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        if ((horizontal && e.key === 'ArrowRight') || (!horizontal && e.key === 'ArrowDown')) {
          e.preventDefault();
          this._setSize(this._size + step);
        }
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
