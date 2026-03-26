import { LitElement, html, css, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-icon> — SVG icon component with built-in common icons.
 *
 * OpenUI has no icon component — they use Lucide React imports.
 * We provide a universal icon system that works in any framework.
 *
 * Usage:
 *   <cg-icon name="chevron-down"></cg-icon>
 *   <cg-icon name="check" size="lg" color="success"></cg-icon>
 */

const ICONS: Record<string, string> = {
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-up': 'M18 15l-6-6-6 6',
  'chevron-left': 'M15 18l-6-6 6-6',
  'chevron-right': 'M9 18l6-6-6-6',
  'check': 'M20 6L9 17l-5-5',
  'x': 'M18 6L6 18M6 6l12 12',
  'plus': 'M12 5v14M5 12h14',
  'minus': 'M5 12h14',
  'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  'info': 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 5v2m0 4h.01',
  'warning': 'M12 2L2 22h20L12 2zm0 7v4m0 4h.01',
  'error': 'M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v6h-2zm0 8h2v2h-2z',
  'success': 'M12 2a10 10 0 100 20 10 10 0 000-20zm-2 10l2 2 4-4',
  'arrow-up': 'M12 19V5m-7 7l7-7 7 7',
  'arrow-down': 'M12 5v14m7-7l-7 7-7-7',
  'arrow-left': 'M19 12H5m7-7l-7 7 7 7',
  'arrow-right': 'M5 12h14m-7-7l7 7-7 7',
  'eye': 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z',
  'copy': 'M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2 M16 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-8a2 2 0 01-2-2V6a2 2 0 012-2',
  'external': 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6 M15 3h6v6 M10 14L21 3',
  'loading': 'M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-5.07l-2.83 2.83M9.76 14.24l-2.83 2.83m0-10.14l2.83 2.83m4.48 4.48l2.83 2.83',
  'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  'heart': 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  'settings': 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  'menu': 'M3 12h18M3 6h18M3 18h18',
  'close': 'M18 6L6 18M6 6l12 12',
  'filter': 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  'sort-asc': 'M3 8l4-4 4 4M7 4v16 M14 16l3 3 3-3 M17 20V12',
  'sort-desc': 'M3 16l4 4 4-4M7 20V4 M14 8l3-3 3 3 M17 5v8',
  'grip': 'M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01',
  'sparkle': 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z',
};

@customElement('cg-icon')
export class CgIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
      font-size: var(--cg-icon-size-150, 20px);
      color: currentColor;
      flex-shrink: 0;
    }

    :host([size="xs"]) { font-size: 12px; }
    :host([size="sm"]) { font-size: 16px; }
    :host([size="md"]) { font-size: 20px; }
    :host([size="lg"]) { font-size: 24px; }
    :host([size="xl"]) { font-size: 32px; }

    :host([color="muted"]) { color: var(--cg-gray-500, #71717a); }
    :host([color="accent"]) { color: var(--cg-text-accent, #e5ff6b); }
    :host([color="success"]) { color: var(--cg-color-status-success-text-default, #4ade80); }
    :host([color="warning"]) { color: var(--cg-text-warning, #f59e0b); }
    :host([color="danger"]) { color: var(--cg-text-danger, #ef4444); }

    svg {
      width: 100%;
      height: 100%;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    :host([name="loading"]) svg {
      animation: spin 1s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      :host([name="loading"]) svg { animation: none; }
    }
  `;

  @property({ reflect: true }) name = '';
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ reflect: true }) color: 'current' | 'muted' | 'accent' | 'success' | 'warning' | 'danger' = 'current';
  @property() label = '';

  override render() {
    const path = ICONS[this.name];
    if (!path) return nothing;

    return html`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        role="${this.label ? 'img' : 'presentation'}"
        aria-label="${this.label || nothing}"
        aria-hidden="${this.label ? 'false' : 'true'}"
      >
        ${path.split(' M').map((d, i) =>
          html`<path d="${i === 0 ? d : 'M' + d}"></path>`
        )}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-icon': CgIcon;
  }
}
