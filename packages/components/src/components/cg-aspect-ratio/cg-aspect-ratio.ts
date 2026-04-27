import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock } from '../../styles/index.js';

/**
 * @element cg-aspect-ratio
 * Layout primitive that constrains its slotted child to a fixed aspect ratio.
 * The slotted element is sized to fill the box — pick `fit` to control how it
 * fills (default `cover` crops to fill; `contain` letterboxes; `fill` stretches).
 *
 * @example
 * ```html
 * <cg-aspect-ratio ratio="16/9">
 *   <img src="hero.jpg" alt="Hero" />
 * </cg-aspect-ratio>
 *
 * <cg-aspect-ratio ratio="1/1" fit="contain">
 *   <img src="logo.svg" alt="Logo" />
 * </cg-aspect-ratio>
 * ```
 *
 * @slot - Content (usually an `<img>`, `<video>`, `<picture>`, or `<iframe>`).
 */
@customElement('cg-aspect-ratio')
export class CgAspectRatio extends LitElement {
  static override styles = [hostBlock, css`
    .wrap {
      width: 100%;
      aspect-ratio: var(--cg-component-aspect-ratio-value);
      overflow: hidden;
    }
    .wrap ::slotted(*) {
      width: 100%;
      height: 100%;
      object-fit: var(--cg-component-aspect-ratio-fit);
      display: block;
    }
  `];

  /** Aspect ratio expressed as `"W/H"` (e.g. `"16/9"`, `"1/1"`, `"4 / 3"`). */
  @property({ reflect: true }) ratio: string = '16/9';

  /** How the slotted element fills the box. Defaults to `cover` (cropped). */
  @property({ reflect: true }) fit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' = 'cover';

  override render() {
    // Accept "16/9" or "16 / 9" and normalize to CSS aspect-ratio syntax.
    const normalized = this.ratio.replace('/', ' / ');
    const styleVars = `--cg-component-aspect-ratio-value: ${normalized}; --cg-component-aspect-ratio-fit: ${this.fit};`;
    return html`
      <div class="wrap" style=${styleVars}>
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
