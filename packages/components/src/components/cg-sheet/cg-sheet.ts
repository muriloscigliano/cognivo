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
      backdrop-filter: blur(var(--cg-blur-backdrop)) saturate(140%);
      -webkit-backdrop-filter: blur(var(--cg-blur-backdrop)) saturate(140%);
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
      background: var(--cg-color-surface-container-border);
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .handle:hover .handle-bar { background: var(--cg-color-surface-cards-border-strong); }

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
    this._focusTrap.deactivate();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) this._onOpen();
      else this._onClose();
    }
  }

  private _onOpen(): void {
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
    this.dispatchEvent(new CustomEvent('cg-sheet-close', { bubbles: true, composed: true }));
    this._focusTrap.deactivate();
    this._dragOffset = 0;
  }

  private _handleBackdrop(): void {
    if (this.dismissible) this.open = false;
  }

  private _onDragStart(e: PointerEvent): void {
    if (!this.dismissible) return;
    this._dragging = true;
    this._dragStart = this.side === 'bottom' || this.side === 'top' ? e.clientY : e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  private _onDragMove(e: PointerEvent): void {
    if (!this._dragging) return;
    const pos = this.side === 'bottom' || this.side === 'top' ? e.clientY : e.clientX;
    let delta = pos - this._dragStart;
    if (this.side === 'top' || this.side === 'left') delta = -delta;
    this._dragOffset = Math.max(0, delta);
  }

  private _onDragEnd(): void {
    if (!this._dragging) return;
    this._dragging = false;
    if (this._dragOffset > 80 && this.dismissible) {
      this.open = false;
    } else if (this.snapPoints.length) {
      this.dispatchEvent(new CustomEvent('cg-sheet-snap', {
        bubbles: true, composed: true,
        detail: { index: this.activeSnap, value: this.snapPoints[this.activeSnap] ?? 1 },
      }));
    }
    this._dragOffset = 0;
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
