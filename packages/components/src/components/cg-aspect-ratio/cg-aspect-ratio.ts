import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock } from '../../styles/index.js';

/**
 * @element cg-aspect-ratio
 * Wrapper that maintains an aspect ratio for its child content.
 *
 * @example
 * ```html
 * <cg-aspect-ratio ratio="16/9">
 *   <img src="..." />
 * </cg-aspect-ratio>
 * ```
 *
 * @slot - Content (usually an image or video)
 */
@customElement('cg-aspect-ratio')
export class CgAspectRatio extends LitElement {
  static override styles = [hostBlock, css`
    :host { display: block; }
    .wrap {
      width: 100%;
      aspect-ratio: var(--ratio, 16 / 9);
      overflow: hidden;
    }
    .wrap ::slotted(*) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  `];

  @property() ratio: string = '16/9';

  override render() {
    // Accept "16/9" or "16 / 9" and normalize to CSS syntax
    const normalized = this.ratio.replace('/', ' / ');
    return html`
      <div class="wrap" style=${`--ratio: ${normalized};`}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-aspect-ratio': CgAspectRatio;
  }
}
