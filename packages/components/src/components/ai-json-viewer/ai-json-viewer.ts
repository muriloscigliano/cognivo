/**
 * <ai-json-viewer> — Collapsible JSON tree with syntax coloring.
 *
 * Props: data, expanded, maxDepth
 * Events: ai-json-path-click
 * Features: Recursive tree with expand/collapse per node, syntax colors,
 *           copy path on click, line count
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ai-json-viewer')
export class AiJsonViewer extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', 'Fira Code', monospace);
      font-size: 13px;
      line-height: 1.6;
      color: var(--cg-color-text-primary, #fafafa);
    }
    :host([hidden]) { display: none; }

    .root {
      background: var(--cg-color-surface, #18181b);
      border: 1px solid var(--cg-color-border, #27272a);
      border-radius: 8px;
      padding: 12px 16px;
      overflow-x: auto;
    }

    .line {
      white-space: pre;
    }

    .key {
      color: #60a5fa;
      cursor: pointer;
    }
    .key:hover {
      text-decoration: underline;
    }

    .string { color: #4ade80; }
    .number { color: var(--cg-color-accent, #dfff61); }
    .boolean { color: #fb923c; }
    .null { color: #71717a; font-style: italic; }

    .toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: none;
      border: none;
      color: var(--cg-color-text-tertiary, #71717a);
      cursor: pointer;
      padding: 0;
      font-size: 10px;
      vertical-align: middle;
      border-radius: 3px;
      transition: color 100ms ease;
    }
    .toggle:hover {
      color: var(--cg-color-text-primary, #fafafa);
    }
    .toggle:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 1px;
    }

    .collapsed-hint {
      color: var(--cg-color-text-tertiary, #71717a);
      font-style: italic;
      font-size: 12px;
    }

    .line-count {
      display: inline;
      color: var(--cg-color-text-tertiary, #71717a);
      font-size: 11px;
      margin-left: 4px;
    }

    .bracket {
      color: var(--cg-color-text-secondary, #a1a1aa);
    }

    @media (prefers-reduced-motion: reduce) {
      .toggle { transition: none; }
    }
  `;

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

    // Circular reference detection
    if (val !== null && typeof val === 'object') {
      if (this._seen.has(val as object)) {
        return html`<span class="null">[Circular]</span>${comma}`;
      }
      this._seen.add(val as object);
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
      return html`<button class="toggle" tabindex="0" aria-label="Expand array" @click=${() => this._togglePath(path)}>\u25B6</button><span class="bracket">[</span><span class="collapsed-hint"> ${count} items </span><span class="bracket">]</span>${comma}`;
    }

    return html`<button class="toggle" tabindex="0" aria-label="Collapse array" @click=${() => this._togglePath(path)}>\u25BC</button><span class="bracket">[</span>
${arr.map((item, i) => html`<div class="line">${childIndent}${this._renderValue(item, `${path}[${i}]`, depth + 1, i === count - 1)}</div>`)}
<div class="line">${indent}<span class="bracket">]</span>${comma}<span class="line-count">// ${count} items</span></div>`;
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
      return html`<button class="toggle" tabindex="0" aria-label="Expand object" @click=${() => this._togglePath(path)}>\u25B6</button><span class="bracket">{</span><span class="collapsed-hint"> ${count} keys </span><span class="bracket">}</span>${comma}`;
    }

    return html`<button class="toggle" tabindex="0" aria-label="Collapse object" @click=${() => this._togglePath(path)}>\u25BC</button><span class="bracket">{</span>
${keys.map((key, i) => {
  const childPath = path ? `${path}.${key}` : key;
  return html`<div class="line">${childIndent}<span class="key" tabindex="0" role="button" aria-label="Copy path: ${childPath}" @click=${() => this._emitPathClick(childPath)} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._emitPathClick(childPath); }}>"${key}"</span>: ${this._renderValue(obj[key], childPath, depth + 1, i === count - 1)}</div>`;
})}
<div class="line">${indent}<span class="bracket">}</span>${comma}<span class="line-count">// ${count} keys</span></div>`;
  }

  override render() {
    this._seen = new WeakSet(); // Reset cycle detection each render
    return html`
      <div class="root" role="tree" aria-label="JSON viewer">
        <div class="line">${this._renderValue(this.data, '$', 0, true)}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-json-viewer': AiJsonViewer;
  }
}
