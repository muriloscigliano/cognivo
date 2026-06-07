/**
 * @element ai-debug-console
 * Collapsible debug panel for inspecting AI requests, responses, and errors with expandable JSON.
 *
 * @example
 * ```html
 * <ai-debug-console
 *   .entries=${[{type:'request', timestamp:'12:34:05', content:'{"model":"gpt-4o"}'}]}
 *   open
 *   maxEntries="200"
 * ></ai-debug-console>
 * ```
 *
 * @fires {CustomEvent<{open: boolean}>} ai-debug-toggle - Panel toggled open/closed
 * @fires {CustomEvent} ai-debug-clear - Clear button clicked
 *
 * @cssprop [--cg-color-accent=#dfff61] - Focus ring and toggle highlight
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface DebugEntry {
  type: 'request' | 'response' | 'error' | 'info';
  timestamp: string;
  content: string;
  duration?: number;
}

@customElement('ai-debug-console')
export class AiDebugConsole extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      background: var(--cg-color-code-background);
      color: var(--cg-color-code-text);
      border: var(--cg-border-width-50) solid var(--cg-color-code-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .toggle-bar {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      cursor: pointer;
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      text-align: left;
    }

    .toggle-bar:hover {
      background: var(--cg-color-surface-cards-hover-background);
    }

    .toggle-bar:active { transform: scale(var(--cg-interaction-press-scale)); }
    .toggle-bar:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--cg-overlay-accent-strong);
    }

    .chevron {
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .chevron.open {
      transform: rotate(90deg);
    }

    .title-text {
      flex: 1;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      padding: 0 var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
    }

    .clear-btn {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-50);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      font-family: inherit;
    }

    .clear-btn:hover {
      background: var(--cg-color-surface-cards-hover-background);
      color: var(--cg-color-surface-base-text);
    }

    .clear-btn:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }

    .panel {
      border-top: var(--cg-border-width-50) solid var(--cg-color-code-border);
      max-height: var(--_ai-debug-panel-max-height, 400px);
      overflow-y: auto;
    }

    .entry-list {
      display: flex;
      flex-direction: column;
    }

    .entry {
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-code-border);
    }

    .entry:last-child {
      border-bottom: none;
    }

    .entry-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      cursor: pointer;
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      font-family: inherit;
      font-size: var(--cg-font-size-xs);
      text-align: left;
    }

    .entry-header:hover {
      background: var(--cg-overlay-dark-subtle);
    }

    .entry-header:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: -2px;
    }

    .type-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .type-request { background: var(--cg-color-status-info-text-default); }
    .type-response { background: var(--cg-color-status-success-text-default); }
    .type-error { background: var(--cg-color-status-error-text-default); }
    .type-info { background: var(--cg-color-input-text-placeholder); }

    .type-label {
      font-weight: var(--cg-font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      min-width: var(--cg-spacing-56);
    }

    .label-request { color: var(--cg-color-status-info-text-default); }
    .label-response { color: var(--cg-color-status-success-text-default); }
    .label-error { color: var(--cg-color-status-error-text-default); }
    .label-info { color: var(--cg-color-input-text-placeholder); }

    .entry-ts {
      color: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
    }

    .entry-preview {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--cg-color-input-text-placeholder);
      font-family: var(--cg-font-family-mono);
    }

    .entry-duration {
      color: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
    }

    .entry-content {
      padding: var(--cg-spacing-8) var(--cg-spacing-16) var(--cg-spacing-12) var(--cg-spacing-24);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
      color: var(--cg-color-code-text);
      background: var(--cg-color-code-background);
      max-height: var(--_ai-debug-entry-max-height, 200px);
      overflow-y: auto;
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) { border-radius: 0; }
    :host([rounded="sm"]) { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) { border-radius: var(--cg-border-radius-full); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) entries: DebugEntry[] = [];
  @property({ type: Boolean }) open = false;
  @property({ type: Number }) maxEntries = 100;

  @state() private _expanded = new Set<number>();

  private get _visibleEntries(): DebugEntry[] {
    return this.entries.slice(-this.maxEntries);
  }

  private _onToggle(): void {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('ai-debug-toggle', {
      bubbles: true, composed: true,
      detail: { open: this.open },
    }));
  }

  private _onClear(e: Event): void {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-debug-clear', {
      bubbles: true, composed: true,
    }));
  }

  private _toggleEntry(idx: number): void {
    const next = new Set(this._expanded);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    this._expanded = next;
  }

  private _formatContent(content: string): string {
    try {
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return content;
    }
  }

  override render() {
    const visible = this._visibleEntries;

    return html`
      <div class="toggle-bar" role="button" @click=${this._onToggle}
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._onToggle(); } }}
              aria-expanded=${this.open ? 'true' : 'false'}
              aria-label="Debug console"
              tabindex="0">
        <span class="chevron ${this.open ? 'open' : ''}">&#x25B6;</span>
        <span class="title-text">Debug Console</span>
        ${this.entries.length ? html`<span class="badge">${this.entries.length}</span>` : nothing}
        ${this.open && this.entries.length ? html`
          <button class="clear-btn" @click=${this._onClear}
                  aria-label="Clear entries" tabindex="0">Clear</button>
        ` : nothing}
      </div>
      ${this.open ? html`
        <div class="panel" role="log" aria-label="Debug entries">
          ${visible.length === 0 ? html`
            <div class="empty">No debug entries.</div>
          ` : html`
            <div class="entry-list">
              ${visible.map((entry, i) => html`
                <div class="entry">
                  <button class="entry-header"
                          @click=${() => this._toggleEntry(i)}
                          aria-expanded=${this._expanded.has(i) ? 'true' : 'false'}
                          tabindex="0">
                    <span class="type-dot type-${entry.type}"></span>
                    <span class="type-label label-${entry.type}">${entry.type}</span>
                    <span class="entry-ts">${entry.timestamp}</span>
                    <span class="entry-preview">${entry.content.substring(0, 60)}</span>
                    ${entry.duration != null ? html`
                      <span class="entry-duration">${entry.duration}ms</span>
                    ` : nothing}
                  </button>
                  ${this._expanded.has(i) ? html`
                    <div class="entry-content">${this._formatContent(entry.content)}</div>
                  ` : nothing}
                </div>
              `)}
            </div>
          `}
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-debug-console': AiDebugConsole;
  }
}
