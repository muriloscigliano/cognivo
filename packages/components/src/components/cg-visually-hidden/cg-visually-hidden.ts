import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * @element cg-visually-hidden
 * Accessibility helper — renders children for assistive technology but hides
 * them visually. Implements the W3C / a11y-project "visually-hidden" recipe.
 *
 * Use this when an element needs an accessible name or extended description
 * that shouldn't appear on screen — e.g. an icon-only button, a sortable
 * table header announcing "sorted ascending", or extra context for a link
 * whose visible text is ambiguous like "Read more".
 *
 * The CSS values here (1px box, -1px margin, clip / clip-path, nowrap) are
 * **functional**, not stylistic. Don't tokenize them — the recipe is
 * W3C-prescribed and changing any value can break screen-reader output.
 *
 * @example
 * ```html
 * <!-- Icon-only button with hidden accessible name -->
 * <cg-button>
 *   <cg-icon name="trash" aria-hidden="true"></cg-icon>
 *   <cg-visually-hidden>Delete item</cg-visually-hidden>
 * </cg-button>
 *
 * <!-- Extended context for a "Read more" link -->
 * <cg-link href="/articles/x">
 *   Read more
 *   <cg-visually-hidden>about cognitive bias in design</cg-visually-hidden>
 * </cg-link>
 * ```
 *
 * @slot - Content to be visually hidden but accessible to screen readers.
 */
@customElement('cg-visually-hidden')
export class CgVisuallyHidden extends LitElement {
  static override styles = css`
    :host {
      display: inline;
    }
    /* Canonical W3C / a11y-project visually-hidden recipe. Values are
       functional — see the JSDoc. clip-path is the modern equivalent of
       the deprecated clip property; both are kept for forward + backward
       compatibility across browsers. */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }
  `;

  override render() {
    return html`<span class="sr-only"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-visually-hidden': CgVisuallyHidden;
  }
}
