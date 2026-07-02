import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reducedMotion } from '../../styles/index.js';
import { FocusTrap } from '../../utils/focus-trap.js';

/**
 * @element cg-sheet
 * Mobile-first drawer variant with optional snap points and drag-to-dismiss.
 *
 * @slot - Default slot for sheet body content.
 *
 * @fires {CustomEvent} cg-sheet-open
 * @fires {CustomEvent} cg-sheet-close
 * @fires {CustomEvent<{index:number,value:number}>} cg-sheet-snap
 */
@customElement('cg-sheet')
export class CgSheet extends LitElement {
  static override styles = [reducedMotion, css`
    :host {
      display: contents;
      font-family: var(--cg-font-family-primary);
    }
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--cg-z-index-500);
      background: var(--cg-color-modal-overlay-background);
      backdrop-filter: blur(var(--cg-blur-backdrop)) saturate(150%);
      -webkit-backdrop-filter: blur(var(--cg-blur-backdrop)) saturate(150%);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    .panel {
      position: fixed;
      z-index: var(--cg-z-index-top);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      box-shadow: var(--cg-shadow-elevation-xl);
      transition: transform var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    :host([side="bottom"]) .panel {
      left: 0;
      right: 0;
      bottom: 0;
      border-top-left-radius: var(--cg-component-sheet-radius);
      border-top-right-radius: var(--cg-component-sheet-radius);
      transform: translateY(100%);
      max-height: 95vh;
    }
    :host([side="bottom"][open]) .panel { transform: translateY(0); }

    :host([side="top"]) .panel {
      left: 0; right: 0; top: 0;
      border-bottom-left-radius: var(--cg-component-sheet-radius);
      border-bottom-right-radius: var(--cg-component-sheet-radius);
      transform: translateY(-100%);
      max-height: 95vh;
    }
    :host([side="top"][open]) .panel { transform: translateY(0); }

    :host([side="right"]) .panel {
      top: 0; bottom: 0; right: 0;
      width: min(var(--cg-component-sheet-side-width), 90vw);
      border-top-left-radius: var(--cg-component-sheet-radius);
      border-bottom-left-radius: var(--cg-component-sheet-radius);
      transform: translateX(100%);
    }
    :host([side="right"][open]) .panel { transform: translateX(0); }

    :host([side="left"]) .panel {
      top: 0; bottom: 0; left: 0;
      width: min(var(--cg-component-sheet-side-width), 90vw);
      border-top-right-radius: var(--cg-component-sheet-radius);
      border-bottom-right-radius: var(--cg-component-sheet-radius);
      transform: translateX(-100%);
    }
    :host([side="left"][open]) .panel { transform: translateX(0); }

    .handle {
      display: flex;
      justify-content: center;
      padding: var(--cg-spacing-16) 0 var(--cg-spacing-6);
      cursor: grab;
      touch-action: none;
    }
    .handle:active { cursor: grabbing; }
    .handle-bar {
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-container-divider);
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .handle:hover .handle-bar { background: var(--cg-color-surface-cards-border-strong); }
    .handle:focus-visible {
      outline: none;
      box-shadow:
        inset 0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        inset 0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    .body {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-20) var(--cg-spacing-24) var(--cg-spacing-24);
      color: var(--cg-color-surface-container-text);
      font-size: var(--cg-font-size-sm);
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property() label = 'Sheet';
  @property({ reflect: true }) side: 'bottom' | 'right' | 'left' | 'top' = 'bottom';
  @property({ type: Array }) snapPoints: number[] = [];
  @property({ type: Number }) activeSnap = 0;
  @property({ type: Boolean }) dismissible = true;

  @state() private _dragOffset = 0;

  private _focusTrap = new FocusTrap();
  private _dragStart = 0;
  private _dragging = false;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    // An unmount while open must not leave the page scroll-locked.
    if (this.open) document.body.style.overflow = this._previousOverflow;
    this._focusTrap.deactivate();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      // First render with open=false is not a close — no spurious event,
      // no clobbering document.body.style.overflow on mount.
      if (changed.get('open') === undefined && !this.open) return;
      if (this.open) this._onOpen();
      else this._onClose();
    }
  }

  private _previousOverflow = '';

  private _onOpen(): void {
    this._previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.dispatchEvent(new CustomEvent('cg-sheet-open', { bubbles: true, composed: true }));
    requestAnimationFrame(() => {
      const panel = this.shadowRoot?.querySelector<HTMLElement>('.panel');
      if (panel) {
        const opts: { onEscape?: () => void } = {};
        if (this.dismissible) opts.onEscape = () => { this.open = false; };
        this._focusTrap.activate(panel, opts);
      }
    });
  }

  private _onClose(): void {
    document.body.style.overflow = this._previousOverflow;
    this.dispatchEvent(new CustomEvent('cg-sheet-close', { bubbles: true, composed: true }));
    this._focusTrap.deactivate();
    this._dragOffset = 0;
  }

  private _handleBackdrop(): void {
    if (this.dismissible) this.open = false;
  }

  private _onDragStart(e: PointerEvent): void {
    if (!this.dismissible && !this.snapPoints.length) return;
    this._dragging = true;
    this._dragStart = this.side === 'bottom' || this.side === 'top' ? e.clientY : e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  private _onDragMove(e: PointerEvent): void {
    if (!this._dragging) return;
    const pos = this.side === 'bottom' || this.side === 'top' ? e.clientY : e.clientX;
    let delta = pos - this._dragStart;
    if (this.side === 'top' || this.side === 'left') delta = -delta;
    // With snap points the user can drag toward LARGER snaps too — keep the
    // signed delta; dismiss-only sheets still clamp to the dismiss direction.
    this._dragOffset = this.snapPoints.length ? delta : Math.max(0, delta);
  }

  private _onDragEnd(): void {
    if (!this._dragging) return;
    this._dragging = false;
    if (this.snapPoints.length) {
      // Land on the snap nearest to the released position.
      const viewport = this.side === 'bottom' || this.side === 'top'
        ? window.innerHeight : window.innerWidth;
      const current = (this.snapPoints[this.activeSnap] ?? 0.95) - this._dragOffset / Math.max(1, viewport);
      let nearest = 0;
      for (let i = 1; i < this.snapPoints.length; i++) {
        if (Math.abs(this.snapPoints[i]! - current) < Math.abs(this.snapPoints[nearest]! - current)) nearest = i;
      }
      if (this.dismissible && current < Math.min(...this.snapPoints) - 0.1) {
        this.open = false;
      } else if (nearest !== this.activeSnap) {
        this.activeSnap = nearest;
        this._emitSnap();
      }
    } else if (this._dragOffset > 80 && this.dismissible) {
      this.open = false;
    }
    this._dragOffset = 0;
  }

  private _emitSnap(): void {
    this.dispatchEvent(new CustomEvent('cg-sheet-snap', {
      bubbles: true, composed: true,
      detail: { index: this.activeSnap, value: this.snapPoints[this.activeSnap] ?? 1 },
    }));
  }

  /** SHEET-5: keyboard path for snap resizing (slider pattern on the handle). */
  private _onHandleKeydown(e: KeyboardEvent): void {
    if (!this.snapPoints.length) return;
    let next = this.activeSnap;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') next = Math.min(this.snapPoints.length - 1, next + 1);
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') next = Math.max(0, next - 1);
    else return;
    e.preventDefault();
    if (next !== this.activeSnap) {
      this.activeSnap = next;
      this._emitSnap();
    }
  }

  override render() {
    const translateAxis = this.side === 'bottom' ? `translateY(${this._dragOffset}px)`
      : this.side === 'top' ? `translateY(${-this._dragOffset}px)`
      : this.side === 'right' ? `translateX(${this._dragOffset}px)`
      : `translateX(${-this._dragOffset}px)`;

    // Apply snap-point height when bottom sheet
    let panelStyle = '';
    if ((this.side === 'bottom' || this.side === 'top') && this.snapPoints.length) {
      const snap = this.snapPoints[this.activeSnap] ?? 0.95;
      panelStyle = `height: ${Math.round(snap * 100)}vh;`;
    }
    if (this._dragging || this._dragOffset) panelStyle += `transform: ${translateAxis};`;
    if (this._dragging) panelStyle += 'transition: none;';

    return html`
      <div class="backdrop" aria-hidden="true" @click=${this._handleBackdrop}></div>
      <div
        class="panel"
        role="dialog"
        aria-modal="true"
        aria-label=${this.label}
        aria-hidden=${this.open ? 'false' : 'true'}
        ?inert=${!this.open}
        style=${panelStyle}
      >
        ${this.side === 'bottom' || this.side === 'top' ? html`
          <div
            class="handle"
            role=${this.snapPoints.length ? 'slider' : nothing}
            tabindex=${this.snapPoints.length ? '0' : nothing}
            aria-label=${this.snapPoints.length ? 'Resize sheet' : nothing}
            aria-valuemin=${this.snapPoints.length ? '0' : nothing}
            aria-valuemax=${this.snapPoints.length ? String(this.snapPoints.length - 1) : nothing}
            aria-valuenow=${this.snapPoints.length ? String(this.activeSnap) : nothing}
            @keydown=${this._onHandleKeydown}
            @pointerdown=${this._onDragStart}
            @pointermove=${this._onDragMove}
            @pointerup=${this._onDragEnd}
            @pointercancel=${this._onDragEnd}
          >
            <span class="handle-bar"></span>
          </div>
        ` : nothing}
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-sheet': CgSheet;
  }
}
