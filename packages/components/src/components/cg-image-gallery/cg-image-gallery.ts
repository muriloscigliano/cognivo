import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, shimmerKeyframes } from '../../styles/index.js';

/** Image entry for cg-image-gallery, with source URL, alt text, and optional caption. */
export interface GalleryImage { src: string; alt?: string; caption?: string; }

/**
 * <cg-image-gallery> — Responsive image grid with lightbox click and "show all" overflow.
 *
 * Features:
 * - Smart grid layout (adapts to image count: 1-5 different layouts)
 * - Max visible images with "+N more" badge
 * - Click to emit event (for lightbox integration)
 * - Loading skeleton per image
 * - Responsive column sizing
 */
@customElement('cg-image-gallery')
export class CgImageGallery extends LitElement {
  static override styles = [hostBlock, reducedMotion, shimmerKeyframes, css`
    .grid {
      display: grid;
      gap: var(--cg-spacing-8, 8px);
      border-radius: var(--cg-border-radius-200, 24px);
      overflow: hidden;
    }

    /* Smart layouts based on image count */
    .grid.count-1 { grid-template-columns: 1fr; }
    .grid.count-2 { grid-template-columns: 1fr 1fr; }
    .grid.count-3 { grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr; }
    .grid.count-3 .img-wrapper:first-child { grid-row: 1 / 3; }
    .grid.count-4 { grid-template-columns: 1fr 1fr; }
    .grid.count-many { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }

    .img-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 4px;
      background: var(--cg-color-surface-container-background, #18181b);
      cursor: pointer;
    }
    .img-wrapper::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0);
      transition: background var(--cg-motion-duration-normal, 150ms) ease;
    }
    .img-wrapper:hover::after {
      background: var(--cg-overlay-dark-subtle, rgba(0, 0, 0, 0.12));
    }

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      display: block;
      transition: transform var(--cg-motion-duration-slow, 250ms) ease;
    }
    .img-wrapper:hover img { transform: scale(1.03); }

    .grid.count-1 img { aspect-ratio: 16 / 9; }
    .grid.count-3 .img-wrapper:first-child img { aspect-ratio: auto; height: 100%; }

    /* Overflow badge */
    .overflow-wrapper {
      position: relative;
    }
    .overflow-badge {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--cg-overlay-dark-strong, rgba(0, 0, 0, 0.6));
      color: var(--cg-gray-white, #ffffff);
      font-size: 1.25rem;
      font-weight: var(--cg-font-weight-bold, 700);
      z-index: 1;
      pointer-events: none;
    }

    /* Skeleton */
    .skeleton {
      position: absolute; inset: 0;
      background: linear-gradient(90deg, var(--cg-gray-100, #f4f4f5) 25%, var(--cg-gray-200, #e4e4e7) 50%, var(--cg-gray-100, #f4f4f5) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    /* Rounded variants */
    :host([rounded="none"]) .grid { border-radius: 0; }
    :host([rounded="sm"]) .grid { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .grid { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .grid { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .grid { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ type: Array }) images: GalleryImage[] = [];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Number }) maxVisible = 5;

  @state() private _loadedSet = new Set<number>();

  private _handleImageLoad(idx: number) {
    this._loadedSet = new Set([...this._loadedSet, idx]);
  }

  private _handleClick(idx: number) {
    this.dispatchEvent(new CustomEvent('cg-gallery-click', {
      detail: { index: idx, image: this.images[idx] },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    const visible = this.images.slice(0, this.maxVisible);
    const overflow = this.images.length - this.maxVisible;
    const count = Math.min(visible.length, 5);
    const gridClass = count <= 4 ? `count-${count}` : 'count-many';

    return html`
      <div class="grid ${gridClass}">
        ${visible.map((img, i) => {
          const isLast = i === visible.length - 1 && overflow > 0;
          const loaded = this._loadedSet.has(i);
          return html`
            <div class="img-wrapper ${isLast ? 'overflow-wrapper' : ''}" @click=${() => this._handleClick(i)}>
              ${!loaded ? html`<div class="skeleton"></div>` : nothing}
              ${isLast && overflow > 0 ? html`<div class="overflow-badge">+${overflow}</div>` : nothing}
              <img
                src=${img.src}
                alt=${img.alt ?? ''}
                loading="lazy"
                @load=${() => this._handleImageLoad(i)}
              />
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-image-gallery': CgImageGallery; }
}
