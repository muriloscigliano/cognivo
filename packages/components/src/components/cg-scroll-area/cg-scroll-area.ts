import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-scroll-area
 * Custom-styled scroll container with themed scrollbars.
 * Uses native scrolling with styled thumbs.
 *
 * @example
 * ```html
 * <cg-scroll-area style="height: 300px;">
 *   <div>Long content...</div>
 * </cg-scroll-area>
 * ```
 *
 * @slot - Scrollable content
 */
@customElement('cg-scroll-area')
export class CgScrollArea extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }

    .viewport {
      width: 100%;
      height: 100%;
      overflow: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--cg-color-surface-cards-border) transparent;
    }

    .viewport::-webkit-scrollbar {
      width: var(--cg-component-scroll-area-scrollbar-size);
      height: var(--cg-component-scroll-area-scrollbar-size);
    }
    .viewport::-webkit-scrollbar-track {
      background: transparent;
    }
    .viewport::-webkit-scrollbar-thumb {
      background: var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-scroll-area-scrollbar-radius);
      border: var(--cg-border-width-100) solid transparent;
      background-clip: padding-box;
      transition: background-color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .viewport::-webkit-scrollbar-thumb:hover {
      background-color: var(--cg-color-input-border-hover);
      background-clip: padding-box;
    }
    .viewport::-webkit-scrollbar-corner {
      background: transparent;
    }

    /* Hide scrollbar until hover when type="hover" — fade in smoothly */
    :host([type="hover"]) .viewport::-webkit-scrollbar-thumb {
      background-color: transparent;
      transition: background-color var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    :host([type="hover"]:hover) .viewport::-webkit-scrollbar-thumb {
      background-color: var(--cg-color-surface-cards-border);
    }
    :host([type="hover"]:hover) .viewport::-webkit-scrollbar-thumb:hover {
      background-color: var(--cg-color-input-border-hover);
    }

    /* Horizontal only */
    :host([orientation="horizontal"]) .viewport {
      overflow-y: hidden;
      overflow-x: auto;
    }
    :host([orientation="vertical"]) .viewport {
      overflow-x: hidden;
      overflow-y: auto;
    }
  `];

  @property({ reflect: true }) orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';
  @property({ reflect: true }) type: 'auto' | 'always' | 'hover' = 'hover';

  override render() {
    return html`
      <div class="viewport" tabindex="0">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-scroll-area': CgScrollArea;
  }
}
