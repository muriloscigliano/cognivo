import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Canvas Pan Component
 *
 * Provides pan/drag controls for canvas navigation
 *
 * @element canvas-pan
 *
 * @attr {boolean} enabled - Enable/disable panning
 * @attr {number} x - Current X offset
 * @attr {number} y - Current Y offset
 *
 * @fires pan-change - Fired when pan position changes
 *
 * @example
 * ```html
 * <canvas-pan
 *   enabled
 *   x="0"
 *   y="0"
 *   @pan-change="${handlePan}"
 * >
 *   <div>Content to pan</div>
 * </canvas-pan>
 * ```
 */
@customElement('canvas-pan')
export class CanvasPan extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        cursor: grab;
      }

      :host([enabled]) {
        cursor: grab;
      }

      :host(.panning) {
        cursor: grabbing;
      }

      .content {
        width: 100%;
        height: 100%;
        transform-origin: 0 0;
        transition: transform 0.1s ease-out;
      }

      .pan-controls {
        position: absolute;
        bottom: ${tokens.spacing.md};
        left: ${tokens.spacing.md};
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.xs};
        box-shadow: ${tokens.shadow.md};
        z-index: 10;
      }

      .pan-button {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        transition: all ${tokens.transition.default};
      }

      .pan-button:hover {
        background: ${tokens.color.gray50};
        color: ${tokens.color.primaryMain};
      }

      .pan-button:active {
        transform: scale(0.95);
      }

      .pan-grid {
        display: grid;
        grid-template-columns: repeat(3, 32px);
        gap: 2px;
      }

      .pan-center {
        grid-column: 2;
        grid-row: 2;
      }
    `,
  ];

  @property({ type: Boolean })
  enabled = true;

  @property({ type: Number })
  x = 0;

  @property({ type: Number })
  y = 0;

  @property({ type: Boolean, attribute: 'show-controls' })
  showControls = false;

  @state()
  private isPanning = false;

  @state()
  private panStart = { x: 0, y: 0 };

  @query('.content')
  private content!: HTMLElement;

  private handleMouseDown = (e: MouseEvent) => {
    if (!this.enabled) return;
    this.isPanning = true;
    this.panStart = { x: e.clientX - this.x, y: e.clientY - this.y };
    this.classList.add('panning');
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isPanning) return;
    const newX = e.clientX - this.panStart.x;
    const newY = e.clientY - this.panStart.y;
    this.dispatchPanChange(newX, newY);
  };

  private handleMouseUp = () => {
    this.isPanning = false;
    this.classList.remove('panning');
  };

  private handlePan(direction: 'up' | 'down' | 'left' | 'right') {
    const step = 50;
    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case 'up':
        newY += step;
        break;
      case 'down':
        newY -= step;
        break;
      case 'left':
        newX += step;
        break;
      case 'right':
        newX -= step;
        break;
    }

    this.dispatchPanChange(newX, newY);
  }

  private handleCenter() {
    this.dispatchPanChange(0, 0);
  }

  private dispatchPanChange(newX: number, newY: number) {
    this.dispatchEvent(
      new CustomEvent('pan-change', {
        detail: { x: newX, y: newY },
      })
    );
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  override render() {
    const transform = `translate(${this.x}px, ${this.y}px)`;

    return html`
      <div class="content" style="transform: ${transform}" @mousedown="${this.handleMouseDown}">
        <slot></slot>
      </div>
      ${this.showControls ? html`
        <div class="pan-controls">
          <div class="pan-grid">
            <button class="pan-button" @click="${() => this.handlePan('up')}" title="Pan Up">↑</button>
            <button class="pan-button" @click="${() => this.handlePan('left')}" title="Pan Left">←</button>
            <button class="pan-button pan-center" @click="${this.handleCenter}" title="Center">⊙</button>
            <button class="pan-button" @click="${() => this.handlePan('right')}" title="Pan Right">→</button>
            <button class="pan-button" @click="${() => this.handlePan('down')}" title="Pan Down">↓</button>
          </div>
        </div>
      ` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'canvas-pan': CanvasPan;
  }
}
