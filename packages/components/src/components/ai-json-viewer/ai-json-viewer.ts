/**
 * @element ai-json-viewer
 * Interactive JSON tree viewer with collapsible nodes, syntax highlighting,
 * and circular reference detection. Supports nested objects and arrays
 * with expand/collapse per node and item counts.
 *
 * @example
 * ```html
 * <ai-json-viewer .data=${{ name: 'Claude', version: 3 }} expanded max-depth="4"></ai-json-viewer>
 * ```
 *
 * @prop {unknown} data - JSON-serializable data to display
 * @prop {boolean} expanded - Whether nodes start expanded (default true)
 * @prop {number} maxDepth - Maximum nesting depth before auto-collapse (default 5)
 *
 * @fires {CustomEvent<{path: string}>} ai-json-path-click - When a key label is clicked
 *
 * @cssprop [--cg-font-family-mono] - Monospace font for the viewer
 * @cssprop [--cg-color-surface] - Background color of the root container
 * @cssprop [--cg-color-accent] - Accent color for number values
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-json-viewer')
export class AiJsonViewer extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
      color: var(--cg-color-surface-base-text);
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .root {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      overflow-x: auto;
    }

    .line {
      white-space: pre;
    }

    .key {
      color: var(--cg-color-status-info-text-default);
      cursor: pointer;
    }
    .key:hover {
      text-decoration: underline;
    }
    .key:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
      border-radius: var(--cg-border-radius-50);
    }

    .string { color: var(--cg-color-status-success-text-default); }
    .number { color: var(--cg-color-surface-base-text); }
    .boolean { color: var(--cg-color-status-warning-text-default); }
    .null { color: var(--cg-color-input-text-placeholder); font-style: italic; }

    .toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      background: none;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      padding: 0;
      font-size: var(--cg-font-size-xs);
      vertical-align: middle;
      border-radius: var(--cg-border-radius-50);
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .toggle:hover {
      color: var(--cg-color-surface-base-text);
    }
    .toggle:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
    }

    .collapsed-hint {
      color: var(--cg-color-input-text-placeholder);
      font-style: italic;
      font-size: var(--cg-font-size-xs);
    }

    .line-count {
      display: inline;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      margin-left: var(--cg-spacing-4);
    }

    .bracket {
      color: var(--cg-color-input-text-placeholder);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .root { border-radius: 0; }
    :host([rounded="sm"]) .root { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .root { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .root { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .root { border-radius: var(--cg-border-radius-full); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ attribute: false }) data: unknown = null;
  @property({ type: Boolean }) expanded = true;
  @property({ type: Number, attribute: 'max-depth' }) maxDepth = 5;

  @state() private _collapsed: Set<string> = new Set();

  private _isCollapsed(path: string): boolean {
    if (this.expanded) {
      return this._collapsed.has(path);
    }
    return !this._collapsed.has(path);
  }

  private _togglePath(path: string): void {
    const next = new Set(this._collapsed);
    if (next.has(path)) {
      next.delete(path);
    } else {
      next.add(path);
    }
    this._collapsed = next;
  }

  private _emitPathClick(path: string): void {
    this.dispatchEvent(new CustomEvent('ai-json-path-click', {
      detail: { path },
      bubbles: true,
      composed: true,
    }));
  }

  private _countItems(val: unknown): number {
    if (Array.isArray(val)) return val.length;
    if (val && typeof val === 'object') return Object.keys(val).length;
    return 0;
  }

  private _seen = new WeakSet();

  private _renderValue(val: unknown, path: string, depth: number, isLast: boolean): unknown {
    const comma = isLast ? '' : ',';

    // Circular reference detection (path-scoped: only true ancestors count)
    if (val !== null && typeof val === 'object') {
      if (this._seen.has(val as object)) {
        return html`<span class="null">[Circular]</span>${comma}`;
      }
    }

    if (val === null) {
      return html`<span class="null">null</span>${comma}`;
    }
    if (typeof val === 'string') {
      return html`<span class="string">"${val}"</span>${comma}`;
    }
    if (typeof val === 'number') {
      return html`<span class="number">${val}</span>${comma}`;
    }
    if (typeof val === 'boolean') {
      return html`<span class="boolean">${val}</span>${comma}`;
    }

    if (Array.isArray(val)) {
      return this._renderArray(val, path, depth, comma);
    }
    if (typeof val === 'object') {
      return this._renderObject(val as Record<string, unknown>, path, depth, comma);
    }

    return html`<span class="string">${String(val)}</span>${comma}`;
  }

  private _renderArray(arr: unknown[], path: string, depth: number, comma: string): unknown {
    const collapsed = this._isCollapsed(path);
    const count = arr.length;
    const indent = '  '.repeat(depth);
    const childIndent = '  '.repeat(depth + 1);

    if (count === 0) {
      return html`<span class="bracket">[]</span>${comma}`;
    }

    if (collapsed || depth >= this.maxDepth) {
      return html`<button class="toggle" tabindex="0" aria-expanded="false" aria-label="Toggle array" @click=${() => this._togglePath(path)}>\u25B6</button><span class="bracket">[</span><span class="collapsed-hint"> ${count} items </span><span class="bracket">]</span>${comma}`;
    }

    this._seen.add(arr);
    const body = html`<button class="toggle" tabindex="0" aria-expanded="true" aria-label="Toggle array" @click=${() => this._togglePath(path)}>\u25BC</button><span class="bracket">[</span>
${arr.map((item, i) => html`<div class="line">${childIndent}${this._renderValue(item, `${path}[${i}]`, depth + 1, i === count - 1)}</div>`)}
<div class="line">${indent}<span class="bracket">]</span>${comma}<span class="line-count">// ${count} items</span></div>`;
    this._seen.delete(arr);
    return body;
  }

  private _renderObject(obj: Record<string, unknown>, path: string, depth: number, comma: string): unknown {
    const collapsed = this._isCollapsed(path);
    const keys = Object.keys(obj);
    const count = keys.length;
    const indent = '  '.repeat(depth);
    const childIndent = '  '.repeat(depth + 1);

    if (count === 0) {
      return html`<span class="bracket">{}</span>${comma}`;
    }

    if (collapsed || depth >= this.maxDepth) {
      return html`<button class="toggle" tabindex="0" aria-expanded="false" aria-label="Toggle object" @click=${() => this._togglePath(path)}>\u25B6</button><span class="bracket">{</span><span class="collapsed-hint"> ${count} keys </span><span class="bracket">}</span>${comma}`;
    }

    this._seen.add(obj);
    const body = html`<button class="toggle" tabindex="0" aria-expanded="true" aria-label="Toggle object" @click=${() => this._togglePath(path)}>\u25BC</button><span class="bracket">{</span>
${keys.map((key, i) => {
  const childPath = path ? `${path}.${key}` : key;
  return html`<div class="line">${childIndent}<span class="key" tabindex="0" role="button" aria-label="Select path: ${childPath}" @click=${() => this._emitPathClick(childPath)} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._emitPathClick(childPath); } }}>"${key}"</span>: ${this._renderValue(obj[key], childPath, depth + 1, i === count - 1)}</div>`;
})}
<div class="line">${indent}<span class="bracket">}</span>${comma}<span class="line-count">// ${count} keys</span></div>`;
    this._seen.delete(obj);
    return body;
  }

  override render() {
    this._seen = new WeakSet(); // Reset cycle detection each render
    return html`
      <div class="root" role="group" aria-label="JSON viewer">
        ${this.data === null || this.data === undefined
          ? html`<div class="line"><span class="collapsed-hint">No data</span></div>`
          : html`<div class="line">${this._renderValue(this.data, '$', 0, true)}</div>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-json-viewer': AiJsonViewer;
  }
}
