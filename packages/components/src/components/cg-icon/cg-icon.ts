import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SOLAR_ICONS } from './solar-icons.js';
import { hostBase, reducedMotion, spinKeyframes } from '../../styles/index.js';

/**
 * <cg-icon> — Universal icon component with Solar icons (Iconify).
 *
 * 3 icon sources (checked in order):
 * 1. Built-in stroke icons (30 — chevrons, arrows, common UI)
 * 2. Bundled Solar icons (80 — curated for AI apps, offline)
 * 3. Iconify API fallback (7,000+ Solar icons, on-demand)
 *
 * Usage:
 *   <cg-icon name="check"></cg-icon>           <!-- built-in -->
 *   <cg-icon name="solar:brain-linear"></cg-icon>  <!-- bundled Solar -->
 *   <cg-icon name="solar:rocket-bold"></cg-icon>   <!-- API fallback -->
 *   <cg-icon name="home"></cg-icon>             <!-- alias → solar:home-2-linear -->
 */

// ── Built-in stroke icons (lightweight, no external dependency) ──
const BUILTIN: Record<string, string> = {
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
  'settings': 'M12 15a3 3 0 100-6 3 3 0 000 6z',
  'menu': 'M3 12h18M3 6h18M3 18h18',
  'close': 'M18 6L6 18M6 6l12 12',
  'filter': 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  'grip': 'M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01',
  'sparkle': 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z',
};

// ── Short aliases → Solar icon names ──
const ALIASES: Record<string, string> = {
  'home': 'home-2-linear',
  'trash': 'trash-bin-trash-linear',
  'edit': 'pen-new-square-linear',
  'download': 'download-minimalistic-linear',
  'upload': 'upload-minimalistic-linear',
  'share': 'share-linear',
  'send': 'plain-linear',
  'user': 'user-circle-linear',
  'users': 'users-group-two-rounded-linear',
  'chat': 'chat-round-linear',
  'mail': 'letter-linear',
  'bell': 'bell-linear',
  'document': 'document-text-linear',
  'folder': 'folder-open-linear',
  'image': 'gallery-minimalistic-linear',
  'code': 'code-linear',
  'file': 'file-text-linear',
  'play': 'play-linear',
  'pause': 'pause-linear',
  'mic': 'microphone-linear',
  'volume': 'volume-linear',
  'camera': 'camera-linear',
  'refresh': 'refresh-linear',
  'restart': 'restart-linear',
  'grid': 'widget-linear',
  'list': 'list-linear',
  'maximize': 'maximize-linear',
  'minimize': 'minimize-linear',
  'clipboard': 'clipboard-linear',
  'link': 'link-linear',
  'calendar': 'calendar-linear',
  'clock': 'clock-circle-linear',
  'shield': 'shield-check-linear',
  'key': 'key-linear',
  'database': 'database-linear',
  'server': 'server-linear',
  'cloud': 'cloud-linear',
  'bug': 'bug-linear',
  'command': 'command-linear',
  'chart': 'chart-2-linear',
  'trending-up': 'graph-up-linear',
  'trending-down': 'graph-down-linear',
  'sort': 'sort-from-top-to-bottom-linear',
  'lock': 'lock-linear',
  'notification': 'notification-unread-linear',
  'brain': 'cpu-linear', // closest AI icon
};

// ── Iconify API cache ──
const API_CACHE = new Map<string, string>();

@customElement('cg-icon')
export class CgIcon extends LitElement {
  static override styles = [hostBase, reducedMotion, spinKeyframes, css`
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
    :host([color="accent"]) { color: var(--cg-brand-ai-accent, #dfff61); }
    :host([color="success"]) { color: var(--cg-green-400, #4ade80); }
    :host([color="warning"]) { color: var(--cg-yellow-400, #fbbf24); }
    :host([color="danger"]) { color: var(--cg-red-400, #f87171); }
    :host([color="info"]) { color: var(--cg-blue-400, #60a5fa); }

    svg {
      width: 100%;
      height: 100%;
    }

    :host([name="loading"]) svg {
      animation: spin 1s linear infinite;
    }

    .placeholder {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background: var(--cg-gray-800, #27272a);
    }
  `];

  /** Icon name. Can be: built-in ("check"), alias ("home"), solar ("solar:brain-linear"), or full solar name ("home-2-bold") */
  @property({ reflect: true }) name = '';

  /** Size variant */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Color variant */
  @property({ reflect: true }) color: 'current' | 'muted' | 'accent' | 'success' | 'warning' | 'danger' | 'info' = 'current';

  /** Accessible label (adds role="img") */
  @property() label = '';

  @state() private _apiSvg: string | null = null;
  @state() private _loading = false;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('name')) {
      this._apiSvg = null;
      this._loading = false;
      // If not built-in or bundled, try API
      if (this.name && !this._getBuiltin() && !this._getSolar()) {
        this._fetchFromApi();
      }
    }
  }

  /** Check built-in stroke icons */
  private _getBuiltin(): string | null {
    return BUILTIN[this.name] || null;
  }

  /** Check bundled Solar icons (with alias resolution) */
  private _getSolar(): { body: string; width: number; height: number } | null {
    // Direct solar: prefix
    let solarName = this.name;
    if (solarName.startsWith('solar:')) {
      solarName = solarName.slice(6);
    } else if (ALIASES[solarName]) {
      solarName = ALIASES[solarName]!;
    }
    const icon = SOLAR_ICONS[solarName];
    if (icon) return { body: icon.body, width: icon.width || 24, height: icon.height || 24 };
    return null;
  }

  /** Fetch from Iconify API as fallback */
  private async _fetchFromApi() {
    let solarName = this.name;
    if (solarName.startsWith('solar:')) solarName = solarName.slice(6);
    else if (ALIASES[solarName]) solarName = ALIASES[solarName]!;

    // Check cache
    if (API_CACHE.has(solarName)) {
      this._apiSvg = API_CACHE.get(solarName)!;
      return;
    }

    this._loading = true;
    try {
      const res = await fetch(`https://api.iconify.design/solar/${solarName}.svg?height=24`);
      if (res.ok) {
        const svg = await res.text();
        API_CACHE.set(solarName, svg);
        this._apiSvg = svg;
      }
    } catch {
      // Silently fail — icon just won't render
    } finally {
      this._loading = false;
    }
  }

  override render() {
    if (!this.name) return nothing;

    const ariaRole = this.label ? 'img' : 'presentation';
    const ariaLabel = this.label || nothing;
    const ariaHidden = this.label ? 'false' : 'true';

    // 1. Built-in stroke icon
    const builtinPath = this._getBuiltin();
    if (builtinPath) {
      return html`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          role="${ariaRole}" aria-label="${ariaLabel}" aria-hidden="${ariaHidden}">
          ${builtinPath.split(' M').map((d, i) =>
            html`<path d="${i === 0 ? d : 'M' + d}"></path>`
          )}
        </svg>
      `;
    }

    // 2. Bundled Solar icon
    const solar = this._getSolar();
    if (solar) {
      return html`
        <svg viewBox="0 0 ${solar.width} ${solar.height}"
          role="${ariaRole}" aria-label="${ariaLabel}" aria-hidden="${ariaHidden}"
          .innerHTML=${solar.body}>
        </svg>
      `;
    }

    // 3. API-fetched SVG
    if (this._apiSvg) {
      return html`<span role="${ariaRole}" aria-label="${ariaLabel}" aria-hidden="${ariaHidden}"
        style="display:contents;" .innerHTML=${this._apiSvg}></span>`;
    }

    // 4. Loading placeholder
    if (this._loading) {
      return html`<div class="placeholder" aria-hidden="true"></div>`;
    }

    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-icon': CgIcon;
  }
}
