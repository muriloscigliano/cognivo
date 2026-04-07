/**
 * @element ai-tool-card-resolver
 * Dynamic card renderer that maps tool call names to registered web
 * components via a registry. Shows a loading skeleton while resolving,
 * falls back to raw JSON display if no match, and includes an error
 * boundary if the resolved component throws.
 *
 * @example
 * ```html
 * <ai-tool-card-resolver
 *   toolName="invoice"
 *   .toolData=${{ id: 'INV-001', total: 250 }}
 *   .registry=${{ invoice: 'app-invoice-card', chart: 'app-chart-card' }}
 * ></ai-tool-card-resolver>
 * ```
 *
 * @prop {string} toolName - Tool call name to resolve (e.g. 'invoice')
 * @prop {unknown} toolData - Data passed to the resolved component
 * @prop {Record<string, string>} registry - Map of tool names to component tag names
 * @prop {boolean} loading - Force loading skeleton display
 *
 * @fires {CustomEvent<{toolName: string, action: string}>} ai-tool-card-action - Proxied from resolved component
 * @fires {CustomEvent<{toolName: string, error: string}>} ai-tool-card-error - When resolution fails
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, shimmerKeyframes, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-tool-card-resolver')
export class AiToolCardResolver extends LitElement {
  static override styles = [hostBlock, reducedMotion, shimmerKeyframes, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }

    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      overflow: hidden;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .card:hover {
      border-color: var(--cg-color-input-border-hover);
    }

    /* ── Loading skeleton ── */
    .skeleton {
      padding: var(--cg-spacing-16);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }
    .skeleton-line {
      height: var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      background: linear-gradient(
        90deg,
        var(--cg-color-surface-container-background) 25%,
        var(--cg-color-surface-cards-border) 50%,
        var(--cg-color-surface-container-background) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skeleton-line:nth-child(1) { width: 60%; }
    .skeleton-line:nth-child(2) { width: 90%; }
    .skeleton-line:nth-child(3) { width: 75%; }

    /* ── Fallback (raw JSON) ── */
    .fallback {
      padding: var(--cg-spacing-16);
    }
    .fallback-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-12);
    }
    .fallback-icon {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
    }
    .fallback-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .fallback-json {
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      line-height: 1.5;
      color: var(--cg-color-input-text-placeholder);
      background: var(--cg-color-surface-base-background);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-12);
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-all;
      max-height: var(300px);
      overflow-y: auto;
    }

    /* ── Error state ── */
    .error {
      padding: var(--cg-spacing-16);
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }
    .error-icon {
      color: var(--cg-color-status-error-text-default);
      font-size: var(--cg-font-size-base);
      flex-shrink: 0;
    }
    .error-text {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-status-error-text-default);
    }

    /* ── Resolved component host ── */
    .resolved {
      padding: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      :host { animation: none; }
      .skeleton-line { animation: none; }
    }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
  `];

  /** Tool call name, e.g. "invoice" or "search_results" */
  @property({ type: String }) toolName = '';

  /** The tool's output data (passed as property to resolved component) */
  @property({ attribute: false }) toolData: unknown = null;

  /** Registry mapping tool names to component tag names */
  @property({ attribute: false }) registry: Record<string, string> = {};

  /** Show loading skeleton */
  @property({ type: Boolean }) loading = false;

  @state() private _error = '';

  /** Cached resolved element keyed by toolName + tag */
  private _cachedEl: HTMLElement | null = null;
  private _cachedKey = '';

  private _dispatch(name: string, detail: unknown) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true, composed: true, detail,
    }));
  }

  private _abortController?: AbortController;

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._abortController?.abort();
  }

  private _resolveComponent(): HTMLElement | null {
    const tag = this.registry[this.toolName];
    if (!tag) return null;

    const cacheKey = `${this.toolName}::${tag}`;

    // Return cached element if key matches, just update data
    if (this._cachedEl && this._cachedKey === cacheKey) {
      (this._cachedEl as unknown as Record<string, unknown>)['data'] = this.toolData;
      (this._cachedEl as unknown as Record<string, unknown>)['toolData'] = this.toolData;
      return this._cachedEl;
    }

    // Clean up previous listeners
    this._abortController?.abort();
    this._abortController = new AbortController();

    try {
      const el = document.createElement(tag);
      (el as unknown as Record<string, unknown>)['data'] = this.toolData;
      (el as unknown as Record<string, unknown>)['toolData'] = this.toolData;
      el.addEventListener('ai-tool-card-action', ((e: CustomEvent) => {
        this._dispatch('ai-tool-card-action', {
          toolName: this.toolName, action: e.detail?.action, data: e.detail?.data,
        });
      }) as EventListener, { signal: this._abortController.signal });

      // Cache the element
      this._cachedEl = el;
      this._cachedKey = cacheKey;

      return el;
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Component failed to render';
      this._dispatch('ai-tool-card-error', {
        toolName: this.toolName, error: this._error,
      });
      return null;
    }
  }

  private _renderLoading() {
    return html`
      <div class="skeleton" role="status" aria-label="Loading tool card">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    `;
  }

  private _renderFallback() {
    let jsonStr = '';
    try {
      jsonStr = JSON.stringify(this.toolData, null, 2);
    } catch {
      jsonStr = String(this.toolData);
    }
    return html`
      <div class="fallback">
        <div class="fallback-header">
          <span class="fallback-icon" aria-hidden="true">&#9881;</span>
          <span class="fallback-title">${this.toolName || 'Tool Result'}</span>
        </div>
        <div class="fallback-json" role="log">${jsonStr}</div>
      </div>
    `;
  }

  private _renderError() {
    return html`
      <div class="error" role="alert">
        <span class="error-icon" aria-hidden="true">&#9888;</span>
        <span class="error-text">Error resolving "${this.toolName}": ${this._error}</span>
      </div>
    `;
  }

  override render() {
    return html`
      <div
        class="card"
        role="region"
        aria-label="Tool card: ${this.toolName || 'unknown'}"
        tabindex="0"
      >
        ${this.loading ? this._renderLoading()
          : this._error ? this._renderError()
          : this._renderResolved()}
      </div>
    `;
  }

  private _renderResolved() {
    if (!this.toolName) return this._renderFallback();

    const tag = this.registry[this.toolName];
    if (!tag) return this._renderFallback();

    const el = this._resolveComponent();
    if (!el) return this._error ? this._renderError() : this._renderFallback();

    return html`<div class="resolved">${el}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-tool-card-resolver': AiToolCardResolver;
  }
}
