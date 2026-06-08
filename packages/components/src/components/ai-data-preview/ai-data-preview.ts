/**
 * @element ai-data-preview
 * Structured data preview with JSON syntax coloring, CSV/table formatting, and confirm/cancel actions.
 *
 * @example
 * ```html
 * <ai-data-preview
 *   .data=${[{name:'Alice', score:92}, {name:'Bob', score:87}]}
 *   format="table"
 *   title="Training Data"
 *   maxRows="25"
 * ></ai-data-preview>
 * ```
 *
 * @fires {CustomEvent<{data: unknown, format: string}>} ai-data-confirm - Confirm button clicked
 * @fires {CustomEvent} ai-data-cancel - Cancel button clicked
 *
 * @cssprop [--cg-color-accent=#dfff61] - Confirm button and JSON key color
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-data-preview')
export class AiDataPreview extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      background: var(--cg-color-surface-base-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      margin-bottom: var(--cg-spacing-12);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin: 0;
    }

    .meta {
      display: flex;
      gap: var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .format-badge {
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      background: var(--cg-overlay-accent-subtle);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-base-text);
      text-transform: uppercase;
      font-weight: var(--cg-font-weight-semibold);
    }

    .preview-area {
      max-height: var(--cg-component-table-virtual-max-height);
      overflow: auto;
      background: var(--cg-color-surface-cards-background);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-12);
    }

    pre {
      margin: 0;
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      line-height: var(--cg-line-height-relaxed);
      white-space: pre-wrap;
      word-break: break-word;
    }

    .json-key { color: var(--cg-color-code-keyword); }
    .json-string { color: var(--cg-color-code-string); }
    .json-number { color: var(--cg-color-code-number); }
    .json-bool { color: var(--cg-color-status-success-text-default); }
    .json-null { color: var(--cg-color-input-text-placeholder); }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--cg-font-size-xs);
    }

    th {
      text-align: left;
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      font-weight: var(--cg-font-weight-semibold);
      position: sticky;
      top: 0;
      background: var(--cg-color-surface-cards-background);
    }

    td {
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
      font-family: var(--cg-font-family-mono);
    }

    tr:hover td {
      background: var(--cg-overlay-dark-subtle);
    }

    .truncated-msg {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      text-align: center;
      padding: var(--cg-spacing-8);
      font-style: italic;
    }

    .actions {
      display: flex;
      gap: var(--cg-spacing-8);
      justify-content: flex-end;
    }

    .btn {
      border: none;
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      font-family: inherit;
    }

    .btn:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }

    .btn-cancel {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
    }

    .btn-cancel:hover {
      background: var(--cg-color-surface-cards-border);
    }

    .btn-confirm {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
    }
    .btn-confirm:hover {
      filter: brightness(1.1);
    }

    .btn:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
  `];
  @property({ attribute: false }) data: unknown = null;
  @property({ type: String }) format: 'json' | 'csv' | 'table' = 'json';
  @property({ type: Number }) maxRows = 50;
  @property({ type: String }) override title = 'Data Preview';

  private _getRowCount(): number {
    if (Array.isArray(this.data)) return this.data.length;
    if (typeof this.data === 'string' && this.format === 'csv') {
      return this.data.split('\n').filter(Boolean).length - 1;
    }
    return 0;
  }

  private _getSize(): string {
    const json = typeof this.data === 'string' ? this.data : JSON.stringify(this.data);
    const bytes = new Blob([json]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private _syntaxHighlight(json: string): ReturnType<typeof html> {
    const parts: Array<ReturnType<typeof html>> = [];
    const regex = /("(\\u[\dA-Fa-f]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(json)) !== null) {
      if (match.index > lastIndex) {
        parts.push(html`${json.substring(lastIndex, match.index)}`);
      }
      const val = match[0];
      let cls = 'json-number';
      if (/^"/.test(val)) {
        cls = match[3] ? 'json-key' : 'json-string';
      } else if (/true|false/.test(val)) {
        cls = 'json-bool';
      } else if (/null/.test(val)) {
        cls = 'json-null';
      }
      parts.push(html`<span class=${cls}>${val}</span>`);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < json.length) {
      parts.push(html`${json.substring(lastIndex)}`);
    }
    return html`${parts}`;
  }

  private _renderJson() {
    try {
      const str = typeof this.data === 'string' ? this.data : JSON.stringify(this.data, null, 2);
      return html`<pre>${this._syntaxHighlight(str)}</pre>`;
    } catch {
      return html`<pre>${String(this.data)}</pre>`;
    }
  }

  private _renderTable(rows: Record<string, unknown>[], truncated: boolean) {
    if (rows.length === 0) return html`<div class="truncated-msg">No data</div>`;
    const keys = Object.keys(rows[0] as Record<string, unknown>);
    return html`
      <table role="table" aria-label="Data table">
        <thead><tr>${keys.map(k => html`<th scope="col">${k}</th>`)}</tr></thead>
        <tbody>
          ${rows.map(row => html`
            <tr>${keys.map(k => html`<td>${String(row[k] ?? '')}</td>`)}</tr>
          `)}
        </tbody>
      </table>
      ${truncated ? html`<div class="truncated-msg">Showing ${rows.length} of ${this._getRowCount()} rows</div>` : nothing}
    `;
  }

  private _renderCsv() {
    if (typeof this.data !== 'string') return this._renderJson();
    const lines = this.data.split('\n').filter(Boolean);
    if (lines.length === 0) return html`<pre>${this.data}</pre>`;
    const headers = lines[0]!.split(',').map(h => h.trim());
    const dataLines = lines.slice(1, this.maxRows + 1);
    const rows = dataLines.map(line => {
      const vals = line.split(',');
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = (vals[i] || '').trim(); });
      return obj;
    });
    return this._renderTable(rows, lines.length - 1 > this.maxRows);
  }

  private _renderContent() {
    if (this.format === 'csv') return this._renderCsv();
    if (this.format === 'table' || (Array.isArray(this.data) && typeof this.data[0] === 'object')) {
      const arr = Array.isArray(this.data) ? this.data : [this.data];
      const limited = arr.slice(0, this.maxRows);
      return this._renderTable(limited as Record<string, unknown>[], arr.length > this.maxRows);
    }
    return this._renderJson();
  }

  private _onConfirm(): void {
    this.dispatchEvent(new CustomEvent('ai-data-confirm', {
      bubbles: true, composed: true,
      detail: { data: this.data, format: this.format },
    }));
  }

  private _onCancel(): void {
    this.dispatchEvent(new CustomEvent('ai-data-cancel', {
      bubbles: true, composed: true,
    }));
  }

  override render() {
    const rowCount = this._getRowCount();

    return html`
      <div class="header">
        <div>
          <h3 class="title">${this.title}</h3>
          <div class="meta">
            <span class="format-badge">${this.format}</span>
            ${rowCount > 0 ? html`<span>${rowCount} rows</span>` : nothing}
            <span>${this._getSize()}</span>
          </div>
        </div>
      </div>
      <div class="preview-area" role="region" aria-label="Data preview" tabindex="0">
        ${this._renderContent()}
      </div>
      <div class="actions">
        <button class="btn btn-cancel" @click=${this._onCancel}
                aria-label="Cancel" tabindex="0">Cancel</button>
        <button class="btn btn-confirm" @click=${this._onConfirm}
                aria-label="Confirm data" tabindex="0">Confirm</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-data-preview': AiDataPreview;
  }
}
