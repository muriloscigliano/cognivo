/**
 * <ai-data-preview> — Preview structured data before AI processing.
 *
 * Props: data, format, maxRows, title
 * Events: ai-data-confirm, ai-data-cancel
 * Features: Formatted display (JSON syntax colored, CSV as table, array as table), row count, size indicator, confirm/cancel buttons
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

@customElement('ai-data-preview')
export class AiDataPreview extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      background: var(--cg-color-surface-base, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      padding: var(--cg-spacing-16, 16px);
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      margin: 0;
    }

    .meta {
      display: flex;
      gap: var(--cg-spacing-12, 12px);
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .format-badge {
      padding: 2px 8px;
      background: rgba(223, 255, 97, 0.1);
      border-radius: var(--cg-radius-sm, 4px);
      font-size: 10px;
      color: var(--cg-color-accent, #dfff61);
      text-transform: uppercase;
      font-weight: var(--cg-font-weight-semibold, 600);
    }

    .preview-area {
      max-height: 320px;
      overflow: auto;
      background: var(--cg-color-surface-overlay, #27272a);
      border-radius: var(--cg-radius-md, 8px);
      padding: var(--cg-spacing-12, 12px);
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    pre {
      margin: 0;
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
      font-size: var(--cg-font-size-xs, 12px);
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fde68a; }
    .json-bool { color: #c4b5fd; }
    .json-null { color: #71717a; }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--cg-font-size-xs, 12px);
    }

    th {
      text-align: left;
      padding: 6px 8px;
      border-bottom: 1px solid var(--cg-color-border-default, #3f3f46);
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-weight: var(--cg-font-weight-semibold, 600);
      position: sticky;
      top: 0;
      background: var(--cg-color-surface-overlay, #27272a);
    }

    td {
      padding: 4px 8px;
      border-bottom: 1px solid var(--cg-color-border-default, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
    }

    tr:hover td {
      background: rgba(255, 255, 255, 0.03);
    }

    .truncated-msg {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-tertiary, #71717a);
      text-align: center;
      padding: 8px;
      font-style: italic;
    }

    .actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .btn {
      border: none;
      border-radius: var(--cg-radius-md, 8px);
      padding: 8px 16px;
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      cursor: pointer;
      font-family: inherit;
    }

    .btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .btn-cancel {
      background: transparent;
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      color: var(--cg-color-text-secondary, #a1a1aa);
    }

    .btn-cancel:hover {
      background: var(--cg-color-surface-hover, #27272a);
    }

    .btn-confirm {
      background: var(--cg-color-accent, #dfff61);
      color: #18181b;
    }
    }
  `];
  @property({ attribute: false }) data: unknown = null;
  @property({ type: String }) format: 'json' | 'csv' | 'table' = 'json';
  @property({ type: Number }) maxRows = 50;
  @property({ type: String }) title = 'Data Preview';

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
    const keys = Object.keys(rows[0]);
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
    const headers = lines[0].split(',').map(h => h.trim());
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
