import { LitElement, html, css, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, focusRingDual } from '../../styles/index.js';

/**
 * @element cg-thumbnail
 * A small, fixed-size preview image with optional selectable/clickable
 * affordances. For large content images use `cg-image`.
 *
 * @example
 * ```html
 * <cg-thumbnail src="/preview.jpg" alt="Preview" size="md"></cg-thumbnail>
 * ```
 *
 * @example Selectable tile
 * ```html
 * <cg-thumbnail src="/a.jpg" alt="Option A" selectable></cg-thumbnail>
 * ```
 *
 * @fires {CustomEvent<{selected: boolean}>} cg-thumbnail-select
 */
@customElement('cg-thumbnail')
export class CgThumbnail extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: inline-block; }

    .tile {
      display: block;
      overflow: hidden;
      width: var(--_cg-thumb-size, 48px);
      height: var(--_cg-thumb-size, 48px);
      border-radius: var(--_cg-thumb-radius, var(--cg-border-radius-100));
      background: var(--cg-color-surface-inset-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      position: relative;
      padding: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Sizes */
    :host([size="sm"]) .tile { --_cg-thumb-size: var(--cg-spacing-32); }
    :host([size="md"]) .tile { --_cg-thumb-size: var(--cg-spacing-48); }
    :host([size="lg"]) .tile { --_cg-thumb-size: var(--cg-spacing-80); }

    /* Rounded */
    :host([rounded="none"]) .tile { --_cg-thumb-radius: 0; }
    :host([rounded="sm"]) .tile { --_cg-thumb-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) .tile { --_cg-thumb-radius: var(--cg-border-radius-150); }
    :host([rounded="lg"]) .tile { --_cg-thumb-radius: var(--cg-border-radius-200); }
    :host([rounded="full"]) .tile { --_cg-thumb-radius: var(--cg-border-radius-full); }

    /* Placeholder */
    .placeholder {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      color: var(--cg-color-surface-container-outlined);
    }
    .placeholder svg { width: 40%; height: 40%; }

    /* Selectable interactivity */
    button.tile {
      cursor: pointer;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    button.tile:hover:not(:disabled) { border-color: var(--cg-color-action-primary-border-default); }
    button.tile:active:not(:disabled) { transform: scale(var(--cg-interaction-press-scale)); }
    button.tile:focus-visible { ${focusRingDual} }

    :host([selected]) button.tile {
      border-color: var(--cg-color-action-primary-border-default);
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-action-primary-border-default) inset;
    }

    :host([disabled]) .tile { opacity: 0.5; cursor: not-allowed; }
  `];

  @property() src = '';
  @property() alt = '';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @property({ type: Boolean, reflect: true }) selectable = false;
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _placeholder() {
    return html`<span class="placeholder">${svg`
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v13.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25Zm2.25-.75a.75.75 0 0 0-.75.75v9.44l3.22-3.22a.75.75 0 0 1 1.06 0l3.19 3.19 2.19-2.19a.75.75 0 0 1 1.06 0l3.22 3.22V5.25a.75.75 0 0 0-.75-.75H5.25ZM9 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="currentColor"/>
      </svg>`}</span>`;
  }

  private _inner() {
    return this.src
      ? html`<img src=${this.src} alt=${this.alt} loading="lazy" />`
      : this._placeholder();
  }

  private _toggle(): void {
    if (this.disabled) return;
    this.selected = !this.selected;
    this.dispatchEvent(new CustomEvent('cg-thumbnail-select', {
      detail: { selected: this.selected },
      bubbles: true,
      composed: true,
    }));
  }

  private _onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggle();
    }
  }

  override render() {
    if (!this.selectable) {
      return html`<span class="tile">${this._inner()}</span>`;
    }
    return html`
      <button
        class="tile"
        type="button"
        role="checkbox"
        aria-checked=${this.selected ? 'true' : 'false'}
        aria-label=${this.alt || nothing}
        ?disabled=${this.disabled}
        @click=${this._toggle}
        @keydown=${this._onKeydown}
      >${this._inner()}</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-thumbnail': CgThumbnail;
  }
}
