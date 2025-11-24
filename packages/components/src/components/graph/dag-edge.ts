import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * DagEdge Component
 *
 * @element dag-edge
 */
@customElement('dag-edge')
export class DagEdge extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
    }
    svg {
      width: 100%;
      height: 100%;
    }`,
  ];

  @property({ type: Object })
  source = { x: 0, y: 0 };

  @property({ type: Object })
  target = { x: 100, y: 100 };

  override render() {
    return html`
      <svg viewBox="0 0 400 300">
        <path
          d="M ${this.source.x} ${this.source.y} L ${this.target.x} ${this.target.y}"
          fill="none"
          stroke="${tokens.color.gray400}"
          stroke-width="2"
        />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dag-edge': DagEdge;
  }
}
