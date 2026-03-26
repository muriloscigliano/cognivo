/**
 * <ai-tool-card-resolver> — Dynamic card renderer for tool call outputs.
 *
 * Maps a tool call name to a registered component tag, creates
 * that element, and passes tool data as a property. Shows loading
 * skeleton while resolving. Falls back to raw JSON if no match.
 * Error boundary if the resolved component throws.
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ai-tool-card-resolver')
export class AiToolCardResolver extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .card {
      background: var(--cg-color-surface-cards-background, #18181b);
      border: 1px solid var(--cg-color-surface-cards-border, #27272a);
      border-radius: var(--cg-border-radius-200, 12px);
      overflow: hidden;
    }

    /* ── Loading skeleton ── */
    .skeleton {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .skeleton-line {
      height: 14px;
      border-radius: 6px;
      background: linear-gradient(
        90deg,
        var(--cg-gray-800, #27272a) 25%,
        var(--cg-gray-700, #3f3f46) 50%,
        var(--cg-gray-800, #27272a) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skeleton-line:nth-child(1) { width: 60%; }
    .skeleton-line:nth-child(2) { width: 90%; }
    .skeleton-line:nth-child(3) { width: 75%; }

    /* ── Fallback (raw JSON) ── */
    .fallback {
      padding: 16px;
    }
    .fallback-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .fallback-icon {
      font-size: 14px;
      color: var(--cg-brand-ai-accent, #dfff61);
    }
    .fallback-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .fallback-json {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 11px;
      line-height: 1.5;
      color: var(--cg-gray-400, #a1a1aa);
      background: var(--cg-gray-900, #09090b);
      border-radius: 8px;
      padding: 12px;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-all;
      max-height: 200px;
      overflow-y: auto;
    }

    /* ── Error state ── */
    .error {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .error-icon {
      color: var(--cg-red-400, #f87171);
      font-size: 16px;
      flex-shrink: 0;
    }
    .error-text {
      font-size: 13px;
      color: var(--cg-red-400, #f87171);
    }

    /* ── Resolved component host ── */
    .resolved {
      padding: 0;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton-line { animation: none; background: var(--cg-gray-800, #27272a); }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `;

  /** Tool call name, e.g. "invoice" or "search_results" */
  @property({ type: String }) toolName = '';

  /** The tool's output data (passed as property to resolved component) */
  @property({ attribute: false }) toolData: unknown = null;

  /** Registry mapping tool names to component tag names */
  @property({ attribute: false }) registry: Record<string, string> = {};

  /** Show loading skeleton */
  @property({ type: Boolean }) loading = false;

  @state() private _error = '';

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

    // Clean up previous listeners
    this._abortController?.abort();
    this._abortController = new AbortController();

    try {
      const el = document.createElement(tag);
      (el as Record<string, unknown>)['data'] = this.toolData;
      (el as Record<string, unknown>)['toolData'] = this.toolData;
      el.addEventListener('ai-tool-card-action', ((e: CustomEvent) => {
        this._dispatch('ai-tool-card-action', {
          toolName: this.toolName, action: e.detail?.action, data: e.detail?.data,
        });
      }) as EventListener, { signal: this._abortController.signal });
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
