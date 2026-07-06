/**
 * @element ai-diff-panel
 * Side-by-side or inline text diff view with additions, removals, and change statistics bar.
 *
 * @example
 * ```html
 * <ai-diff-panel
 *   beforeCode="The quick brown fox"
 *   afterCode="The fast brown fox jumps"
 *   mode="side-by-side"
 *   .labels=${['Original','Revised']}
 * ></ai-diff-panel>
 * ```
 *
 * @fires {CustomEvent<{line: DiffLine}>} ai-diff-select - Diff line clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface DiffLine {
  type: 'add' | 'remove' | 'unchanged';
  content: string;
  lineNum: { before?: number; after?: number };
}

@customElement('ai-diff-panel')
export class AiDiffPanel extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
    }

    .panel {
      background: var(--cg-color-code-background);
      border: var(--cg-border-width-50) solid var(--cg-color-code-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
      transition:
        border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .panel:hover {
      border-color: var(--cg-color-code-muted);
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-code-border);
    }
    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .mode-toggle {
      display: flex;
      gap: var(--cg-spacing-2);
      background: var(--cg-overlay-white-subtle);
      border: var(--cg-border-width-50) solid var(--cg-color-code-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-2);
    }
    .mode-btn {
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border: none;
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      background: none;
      color: var(--cg-color-input-text-placeholder);
      font-family: inherit;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .mode-btn:hover:not(.active) {
      color: var(--cg-color-code-text);
      background: var(--cg-overlay-white-subtle);
    }
    .mode-btn.active {
      background: var(--cg-overlay-white-medium);
      color: var(--cg-color-code-text);
    }

    /* Stats bar */
    .stats {
      display: flex;
      gap: var(--cg-spacing-16);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-code-border);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
    }
    .stat-add { color: var(--cg-color-status-success-text-default); }
    .stat-remove { color: var(--cg-color-status-error-text-default); }
    .stat-unchanged { color: var(--cg-color-code-muted); }
    .stats-bar {
      display: flex;
      height: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      overflow: hidden;
      margin-left: auto;
      width: var(--cg-spacing-80);
    }
    .stats-bar-add { background: var(--cg-color-status-success-text-default); }
    .stats-bar-remove { background: var(--cg-color-status-error-text-default); }
    .stats-bar-unchanged { background: var(--cg-color-code-border); }

    /* Labels */
    .labels {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-code-border);
    }
    .label-item {
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .label-item:first-child { border-right: var(--cg-border-width-50) solid var(--cg-color-code-border); }

    /* Side-by-side */
    .side-by-side {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-height: var(--cg-spacing-256);
      overflow-y: auto;
    }
    .side {
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      line-height: var(--cg-line-height-relaxed);
    }
    .side:first-child { border-right: var(--cg-border-width-50) solid var(--cg-color-code-border); }

    .diff-line {
      display: flex;
      padding: var(--cg-spacing-1) var(--cg-spacing-12);
      min-height: var(--cg-spacing-20);
    }
    .line-num {
      width: var(--cg-spacing-32);
      flex-shrink: 0;
      color: var(--cg-color-code-muted);
      text-align: right;
      padding-right: var(--cg-spacing-8);
      user-select: none;
    }
    .line-sign {
      width: var(--cg-spacing-16);
      flex-shrink: 0;
      text-align: center;
      font-weight: var(--cg-font-weight-bold);
      user-select: none;
    }
    .line-content {
      flex: 1;
      white-space: pre-wrap;
      word-break: break-all;
      color: var(--cg-color-code-text);
    }

    .diff-line.add { background: var(--cg-color-status-success-background-default); }
    .diff-line.add .line-sign { color: var(--cg-color-status-success-text-default); }
    .diff-line.add .line-content { color: var(--cg-color-status-success-text-default); }
    .diff-line.remove { background: var(--cg-color-status-error-background-default); }
    .diff-line.remove .line-sign { color: var(--cg-color-status-error-text-default); }
    .diff-line.remove .line-content { color: var(--cg-color-status-error-text-default); }
    .diff-line.unchanged .line-content { color: var(--cg-color-code-muted); }
    .diff-line.empty { background: var(--cg-color-code-background); }

    /* Inline mode */
    .inline-diff {
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      line-height: var(--cg-line-height-relaxed);
      max-height: var(--cg-spacing-256);
      overflow-y: auto;
    }
    .diff-line:hover {
      opacity: 0.85;
    }
    .inline-diff .diff-line .prefix {
      width: var(--cg-spacing-20);
      flex-shrink: 0;
      text-align: center;
      font-weight: var(--cg-font-weight-bold);
    }
    .inline-diff .add .prefix { color: var(--cg-color-status-success-text-default); }
    .inline-diff .remove .prefix { color: var(--cg-color-status-error-text-default); }

    /* Empty */
    .empty {
      padding: var(--cg-spacing-24);
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-overlay-accent-strong);
    }
  `];
  /** Text content before changes */
  @property({ type: String }) beforeCode: string = '';

  /** Text content after changes */
  @property({ type: String }) afterCode: string = '';

  /** Display mode */
  @property({ type: String }) mode: 'side-by-side' | 'inline' = 'side-by-side';

  /** Panel title */
  @property({ type: String }) override title: string = 'Comparison';

  /** Column labels [before, after] */
  @property({ type: Array }) labels: [string, string] = ['Before', 'After'];

  private _cachedDiff: DiffLine[] | null = null;
  private _cachedBeforeCode: string = '';
  private _cachedAfterCode: string = '';

  /**
   * Compute a line-level diff using the Longest Common Subsequence algorithm.
   * This correctly handles duplicate lines (Set-based classification misclassifies them).
   *
   * Complexity: O(n*m) time and memory where n, m are the line counts of before/after.
   * For realistic code diffs (< ~10k lines each side) this is fine. Pathological inputs
   * (very large files with no shared structure) will grow quadratically — callers should
   * chunk or pre-filter before reaching that regime.
   */
  private _computeDiff(): DiffLine[] {
    if (this._cachedDiff && this._cachedBeforeCode === this.beforeCode && this._cachedAfterCode === this.afterCode) {
      return this._cachedDiff;
    }
    this._cachedBeforeCode = this.beforeCode;
    this._cachedAfterCode = this.afterCode;

    // Empty-input fast paths — avoid allocating the LCS table when one side is empty.
    // Note: ''.split('\n') === [''], so we treat a truly empty string as zero lines,
    // matching what a user would expect from "no before / no after".
    const beforeLines = this.beforeCode === '' ? [] : this.beforeCode.split('\n');
    const afterLines = this.afterCode === '' ? [] : this.afterCode.split('\n');

    const n = beforeLines.length;
    const m = afterLines.length;

    if (n === 0 && m === 0) {
      this._cachedDiff = [];
      return this._cachedDiff;
    }
    if (n === 0) {
      const result: DiffLine[] = afterLines.map((line, i) => ({
        type: 'add', content: line, lineNum: { after: i + 1 },
      }));
      this._cachedDiff = result;
      return result;
    }
    if (m === 0) {
      const result: DiffLine[] = beforeLines.map((line, i) => ({
        type: 'remove', content: line, lineNum: { before: i + 1 },
      }));
      this._cachedDiff = result;
      return result;
    }

    // Build LCS table.
    const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (beforeLines[i - 1] === afterLines[j - 1]) {
          lcs[i]![j] = lcs[i - 1]![j - 1]! + 1;
        } else {
          lcs[i]![j] = Math.max(lcs[i - 1]![j]!, lcs[i]![j - 1]!);
        }
      }
    }

    // Backtrack to construct the diff.
    const diff: DiffLine[] = [];
    let i = n;
    let j = m;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && beforeLines[i - 1] === afterLines[j - 1]) {
        diff.unshift({ type: 'unchanged', content: beforeLines[i - 1]!, lineNum: { before: i, after: j } });
        i--; j--;
      } else if (j > 0 && (i === 0 || lcs[i]![j - 1]! >= lcs[i - 1]![j]!)) {
        diff.unshift({ type: 'add', content: afterLines[j - 1]!, lineNum: { after: j } });
        j--;
      } else {
        diff.unshift({ type: 'remove', content: beforeLines[i - 1]!, lineNum: { before: i } });
        i--;
      }
    }

    this._cachedDiff = diff;
    return diff;
  }

  private get _stats() {
    const diff = this._computeDiff();
    let additions = 0, removals = 0, unchanged = 0;
    for (const d of diff) {
      if (d.type === 'add') additions++;
      else if (d.type === 'remove') removals++;
      else unchanged++;
    }
    return { additions, removals, unchanged };
  }

  private _handleLineClick(line: DiffLine) {
    this.dispatchEvent(new CustomEvent('ai-diff-select', {
      bubbles: true, composed: true,
      detail: { type: line.type, content: line.content, lineNum: line.lineNum },
    }));
  }

  private _handleLineKey(e: KeyboardEvent, line: DiffLine) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleLineClick(line);
    }
  }

  private _lineAriaLabel(line: DiffLine): string {
    const prefix = line.type === 'add' ? 'Added' : line.type === 'remove' ? 'Removed' : 'Unchanged';
    const num = line.lineNum.before ?? line.lineNum.after ?? '';
    return `${prefix} line ${num}: ${line.content}`;
  }

  private _renderSideBySide() {
    const beforeLines = this.beforeCode.split('\n');
    const afterLines = this.afterCode.split('\n');
    const diff = this._computeDiff();

    // Build parallel arrays
    const left: (DiffLine | null)[] = [];
    const right: (DiffLine | null)[] = [];

    for (const d of diff) {
      if (d.type === 'unchanged') { left.push(d); right.push(d); }
      else if (d.type === 'remove') { left.push(d); right.push(null); }
      else if (d.type === 'add') { left.push(null); right.push(d); }
    }

    // Compact: merge consecutive null entries
    const maxLen = Math.max(left.length, right.length);

    return html`
      <div class="labels">
        <div class="label-item">${this.labels[0]}</div>
        <div class="label-item">${this.labels[1]}</div>
      </div>
      <div class="side-by-side">
        <div class="side" role="list" aria-label="${this.labels[0]}">
          ${left.map(l => {
            if (!l) return html`<div class="diff-line empty" aria-hidden="true"><span class="line-num"></span><span class="line-sign"></span><span class="line-content"></span></div>`;
            const interactive = l.type !== 'unchanged';
            return html`
            <div class="diff-line ${l.type}"
              role="listitem"
              tabindex=${interactive ? '0' : nothing}
              aria-label=${this._lineAriaLabel(l)}
              @click=${interactive ? () => this._handleLineClick(l) : nothing}
              @keydown=${interactive ? (e: KeyboardEvent) => this._handleLineKey(e, l) : nothing}>
              <span class="line-num" aria-hidden="true">${l.lineNum.before ?? ''}</span>
              <span class="line-sign" aria-hidden="true">${l.type === 'remove' ? '-' : ' '}</span>
              <span class="line-content">${l.content}</span>
            </div>
          `;
          })}
        </div>
        <div class="side" role="list" aria-label="${this.labels[1]}">
          ${right.map(r => {
            if (!r) return html`<div class="diff-line empty" aria-hidden="true"><span class="line-num"></span><span class="line-sign"></span><span class="line-content"></span></div>`;
            const interactive = r.type !== 'unchanged';
            return html`
            <div class="diff-line ${r.type}"
              role="listitem"
              tabindex=${interactive ? '0' : nothing}
              aria-label=${this._lineAriaLabel(r)}
              @click=${interactive ? () => this._handleLineClick(r) : nothing}
              @keydown=${interactive ? (e: KeyboardEvent) => this._handleLineKey(e, r) : nothing}>
              <span class="line-num" aria-hidden="true">${r.lineNum.after ?? ''}</span>
              <span class="line-sign" aria-hidden="true">${r.type === 'add' ? '+' : ' '}</span>
              <span class="line-content">${r.content}</span>
            </div>
          `;
          })}
        </div>
      </div>
    `;
  }

  private _renderInline() {
    const diff = this._computeDiff();
    return html`
      <div class="inline-diff" role="list" aria-label="${this.title}">
        ${diff.map(d => {
          const interactive = d.type !== 'unchanged';
          return html`
          <div class="diff-line ${d.type}"
            role="listitem"
            tabindex=${interactive ? '0' : nothing}
            aria-label=${this._lineAriaLabel(d)}
            @click=${interactive ? () => this._handleLineClick(d) : nothing}
            @keydown=${interactive ? (e: KeyboardEvent) => this._handleLineKey(e, d) : nothing}>
            <span class="prefix" aria-hidden="true">${d.type === 'add' ? '+' : d.type === 'remove' ? '-' : ' '}</span>
            <span class="line-num" aria-hidden="true">${d.lineNum.before ?? d.lineNum.after ?? ''}</span>
            <span class="line-content">${d.content}</span>
          </div>
        `;
        })}
      </div>
    `;
  }

  override render() {
    if (!this.beforeCode && !this.afterCode) {
      return html`<div class="panel"><div class="empty">No content to compare</div></div>`;
    }

    const stats = this._stats;

    return html`
      <div class="panel" role="group" aria-label="${this.title}">
        <div class="header">
          <span class="title">${this.title}</span>
          <div class="mode-toggle" role="group" aria-label="Diff view mode">
            <button class="mode-btn ${this.mode === 'side-by-side' ? 'active' : ''}"
              aria-pressed=${this.mode === 'side-by-side'}
              @click=${() => this.mode = 'side-by-side'}>Split</button>
            <button class="mode-btn ${this.mode === 'inline' ? 'active' : ''}"
              aria-pressed=${this.mode === 'inline'}
              @click=${() => this.mode = 'inline'}>Inline</button>
          </div>
        </div>
        <div class="stats">
          <span class="stat-add">+${stats.additions}</span>
          <span class="stat-remove">-${stats.removals}</span>
          <span class="stat-unchanged">${stats.unchanged} unchanged</span>
          <div class="stats-bar">
            <div class="stats-bar-add" style="flex:${stats.additions}"></div>
            <div class="stats-bar-remove" style="flex:${stats.removals}"></div>
            <div class="stats-bar-unchanged" style="flex:${stats.unchanged}"></div>
          </div>
        </div>
        ${this.mode === 'side-by-side' ? this._renderSideBySide() : this._renderInline()}
      </div>
    `;
  }
}
