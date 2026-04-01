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
      background: var(--cg-color-surface-base, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      overflow: hidden;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .toggle-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      cursor: pointer;
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      font-family: inherit;
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      text-align: left;
    }

    .toggle-bar:hover {
      background: var(--cg-color-surface-hover, #27272a);
    }

    .toggle-bar:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: -2px;
    }

    .chevron {
      transition: transform 0.15s ease;
      font-size: 12px;
      color: var(--cg-color-text-tertiary, #71717a);
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
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: var(--cg-radius-full, 9999px);
      background: rgba(223, 255, 97, 0.15);
      color: var(--cg-color-accent, #dfff61);
      font-size: 10px;
      font-weight: var(--cg-font-weight-semibold, 600);
    }

    .clear-btn {
      background: transparent;
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      border-radius: var(--cg-radius-sm, 4px);
      padding: 2px 8px;
      font-size: 10px;
      color: var(--cg-color-text-secondary, #a1a1aa);
      cursor: pointer;
      font-family: inherit;
    }

    .clear-btn:hover {
      background: var(--cg-color-surface-hover, #3f3f46);
      color: var(--cg-color-surface-base-text, #fafafa);
    }

    .clear-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .panel {
      border-top: 1px solid var(--cg-color-border-default, #27272a);
      max-height: 400px;
      overflow-y: auto;
    }

    .entry-list {
      display: flex;
      flex-direction: column;
    }

    .entry {
      border-bottom: 1px solid var(--cg-color-border-default, #27272a);
    }

    .entry:last-child {
      border-bottom: none;
    }

    .entry-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      cursor: pointer;
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      font-family: inherit;
      font-size: var(--cg-font-size-xs, 12px);
      text-align: left;
    }

    .entry-header:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    .entry-header:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: -2px;
    }

    .type-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .type-request { background: #60a5fa; }
    .type-response { background: #4ade80; }
    .type-error { background: #f87171; }
    .type-info { background: #a1a1aa; }

    .type-label {
      font-weight: var(--cg-font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      min-width: 56px;
    }

    .label-request { color: #60a5fa; }
    .label-response { color: #4ade80; }
    .label-error { color: #f87171; }
    .label-info { color: #a1a1aa; }

    .entry-ts {
      color: var(--cg-color-text-tertiary, #71717a);
      flex-shrink: 0;
    }

    .entry-preview {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
    }

    .entry-duration {
      color: var(--cg-color-text-tertiary, #71717a);
      flex-shrink: 0;
    }

    .entry-content {
      padding: 8px 16px 12px 32px;
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
      font-size: 11px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
      color: var(--cg-color-text-secondary, #a1a1aa);
      background: rgba(0, 0, 0, 0.2);
      max-height: 200px;
      overflow-y: auto;
    }

    .empty {
      text-align: center;
      padding: 24px;
      color: var(--cg-color-text-tertiary, #71717a);
      font-size: var(--cg-font-size-xs, 12px);
    }
    }
  `];
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
      <button class="toggle-bar" @click=${this._onToggle}
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
      </button>
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
