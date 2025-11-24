import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Snap Grid Component
 *
 * Grid overlay for snapping nodes to grid positions
 *
 * @element snap-grid
 *
 * @attr {number} size - Grid cell size
 * @attr {string} pattern - Grid pattern: 'dots' or 'lines'
 * @attr {boolean} visible - Show/hide grid
 *
 * @example
 * ```html
 * <snap-grid size="20" pattern="dots" visible></snap-grid>
 * ```
 */
@customElement('snap-grid')
export class SnapGrid extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
      }

      :host([visible]) {
        opacity: 1;
      }

      :host(:not([visible])) {
        opacity: 0;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      .grid-line {
        stroke: ${tokens.color.gray100};
        stroke-width: 1;
      }

      .grid-line-major {
        stroke: ${tokens.color.gray100};
        stroke-width: 1.5;
      }

      .grid-dot {
        fill: ${tokens.color.gray100};
      }
    `,
  ];

  @property({ type: Number })
  size = 20;

  @property({ type: String })
  pattern: 'dots' | 'lines' = 'dots';

  @property({ type: Boolean, reflect: true })
  visible = true;

  @property({ type: Number })
  width = 800;

  @property({ type: Number })
  height = 600;

  private renderDots() {
    const dots = [];
    for (let x = 0; x <= this.width; x += this.size) {
      for (let y = 0; y <= this.height; y += this.size) {
        const isMajor = x % (this.size * 5) === 0 && y % (this.size * 5) === 0;
        dots.push(svg`
          <circle
            class="grid-dot"
            cx="${x}"
            cy="${y}"
            r="${isMajor ? 2 : 1}"
          />
        `);
      }
    }
    return dots;
  }

  private renderLines() {
    const lines = [];

    // Vertical lines
    for (let x = 0; x <= this.width; x += this.size) {
      const isMajor = x % (this.size * 5) === 0;
      lines.push(svg`
        <line
          class="${isMajor ? 'grid-line-major' : 'grid-line'}"
          x1="${x}"
          y1="0"
          x2="${x}"
          y2="${this.height}"
        />
      `);
    }

    // Horizontal lines
    for (let y = 0; y <= this.height; y += this.size) {
      const isMajor = y % (this.size * 5) === 0;
      lines.push(svg`
        <line
          class="${isMajor ? 'grid-line-major' : 'grid-line'}"
          x1="0"
          y1="${y}"
          x2="${this.width}"
          y2="${y}"
        />
      `);
    }

    return lines;
  }

  /**
   * Snap a coordinate to the nearest grid point
   */
  snap(value: number): number {
    return Math.round(value / this.size) * this.size;
  }

  /**
   * Snap a point {x, y} to the nearest grid point
   */
  snapPoint(point: { x: number; y: number }): { x: number; y: number } {
    return {
      x: this.snap(point.x),
      y: this.snap(point.y),
    };
  }

  override render() {
    return html`
      <svg viewBox="0 0 ${this.width} ${this.height}" preserveAspectRatio="xMidYMid meet">
        ${this.pattern === 'dots' ? this.renderDots() : this.renderLines()}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'snap-grid': SnapGrid;
  }
}
