import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Canvas Zoom Component
 *
 * Zoom controls for canvas - provides zoom in/out/reset buttons
 *
 * @element canvas-zoom
 *
 * @attr {number} zoom - Current zoom level
 * @attr {number} min - Minimum zoom level
 * @attr {number} max - Maximum zoom level
 * @attr {number} step - Zoom step amount
 *
 * @fires zoom-change - Fired when zoom changes
 *
 * @example
 * ```html
 * <canvas-zoom
 *   zoom="1"
 *   min="0.1"
 *   max="4"
 *   step="0.2"
 *   @zoom-change="${handleZoom}"
 * ></canvas-zoom>
 * ```
 */
@customElement('canvas-zoom')
export class CanvasZoom extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.xs};
        box-shadow: ${tokens.shadow.md};
      }

      .zoom-button {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        transition: all ${tokens.transition.default};
      }

      .zoom-button:hover {
        background: ${tokens.color.gray50};
        color: ${tokens.color.primaryMain};
      }

      .zoom-button:active {
        transform: scale(0.95);
      }

      .zoom-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .zoom-level {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray900};
        text-align: center;
        padding: ${tokens.spacing.xs} 0;
        user-select: none;
      }

      .divider {
        height: 1px;
        background: ${tokens.color.gray100};
        margin: ${tokens.spacing.xs} 0;
      }
    `,
  ];

  @property({ type: Number })
  zoom = 1;

  @property({ type: Number })
  min = 0.1;

  @property({ type: Number })
  max = 4;

  @property({ type: Number })
  step = 0.2;

  private handleZoomIn() {
    const newZoom = Math.min(this.max, this.zoom + this.step);
    this.dispatchZoomChange(newZoom);
  }

  private handleZoomOut() {
    const newZoom = Math.max(this.min, this.zoom - this.step);
    this.dispatchZoomChange(newZoom);
  }

  private handleZoomReset() {
    this.dispatchZoomChange(1);
  }

  private handleZoomFit() {
    this.dispatchEvent(new CustomEvent('zoom-fit'));
  }

  private dispatchZoomChange(newZoom: number) {
    this.dispatchEvent(
      new CustomEvent('zoom-change', {
        detail: { zoom: newZoom },
      })
    );
  }

  override render() {
    return html`
      <button
        class="zoom-button"
        @click="${this.handleZoomIn}"
        ?disabled="${this.zoom >= this.max}"
        title="Zoom In"
      >
        +
      </button>
      <div class="zoom-level">${Math.round(this.zoom * 100)}%</div>
      <button
        class="zoom-button"
        @click="${this.handleZoomOut}"
        ?disabled="${this.zoom <= this.min}"
        title="Zoom Out"
      >
        −
      </button>
      <div class="divider"></div>
      <button
        class="zoom-button"
        @click="${this.handleZoomReset}"
        title="Reset Zoom"
      >
        ⊙
      </button>
      <button
        class="zoom-button"
        @click="${this.handleZoomFit}"
        title="Fit to View"
      >
        ⊡
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'canvas-zoom': CanvasZoom;
  }
}
