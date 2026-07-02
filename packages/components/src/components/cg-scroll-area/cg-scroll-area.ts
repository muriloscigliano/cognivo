import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
      background-color: var(--cg-color-surface-cards-border-strong);
      background-clip: padding-box;
    }
    .viewport::-webkit-scrollbar-thumb:active {
      background-color: var(--cg-color-surface-cards-selected-border);
      background-clip: padding-box;
    }
    .viewport::-webkit-scrollbar-corner {
      background: transparent;
    }
    .viewport:focus-visible {
      outline: none;
      box-shadow:
        inset 0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        inset 0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
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
      background-color: var(--cg-color-surface-cards-border-strong);
    }
    :host([type="hover"]:hover) .viewport::-webkit-scrollbar-thumb:active {
      background-color: var(--cg-color-surface-cards-selected-border);
    }
    /* Keyboard users need the position indicator too, not just mouse hover */
    :host([type="hover"]) .viewport:focus-visible::-webkit-scrollbar-thumb {
      background-color: var(--cg-color-surface-cards-border);
    }
    /* Firefox: scrollbar-color is the only channel — mirror the hover reveal */
    :host([type="hover"]) .viewport {
      scrollbar-color: transparent transparent;
    }
    :host([type="hover"]:hover) .viewport,
    :host([type="hover"]) .viewport:focus-visible {
      scrollbar-color: var(--cg-color-surface-cards-border) transparent;
    }

    /* Always-visible scrollbar (forces overflow even when content fits) */
    :host([type="always"]) .viewport {
      overflow: scroll;
    }
    :host([type="always"][orientation="vertical"]) .viewport {
      overflow-x: hidden;
      overflow-y: scroll;
    }
    :host([type="always"][orientation="horizontal"]) .viewport {
      overflow-y: hidden;
      overflow-x: scroll;
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
  /** Accessible name for the scroll region (role="region" is only emitted
   *  when named — an anonymous focusable container is an AT dead stop). */
  @property() label = '';

  @state() private _scrollable = false;

  private _resizeObserver: ResizeObserver | undefined;

  override firstUpdated(): void {
    const viewport = this.shadowRoot?.querySelector<HTMLElement>('.viewport');
    if (!viewport) return;
    this._resizeObserver = new ResizeObserver(() => this._updateScrollable(viewport));
    this._resizeObserver.observe(viewport);
    this._updateScrollable(viewport);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  private _updateScrollable(viewport: HTMLElement): void {
    this._scrollable =
      viewport.scrollHeight > viewport.clientHeight ||
      viewport.scrollWidth > viewport.clientWidth;
  }

  override render() {
    return html`
      <div
        class="viewport"
        tabindex=${this._scrollable ? '0' : '-1'}
        role=${this.label ? 'region' : nothing}
        aria-label=${this.label || nothing}
      >
        <slot @slotchange=${() => {
          const viewport = this.shadowRoot?.querySelector<HTMLElement>('.viewport');
          if (viewport) this._updateScrollable(viewport);
        }}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-scroll-area': CgScrollArea;
  }
}
