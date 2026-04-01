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
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Focus ring color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
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
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    .panel {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .panel:hover {
      border-color: var(--cg-gray-600, #52525b);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05), var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2));
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .mode-toggle {
      display: flex;
      gap: 2px;
      background: var(--cg-color-surface-base-background, #09090b);
      border-radius: 6px;
      padding: 2px;
    }
    .mode-btn {
      padding: 4px 12px;
      border: none;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      background: none;
      color: var(--cg-gray-500, #71717a);
      font-family: inherit;
      transition: all 150ms;
    }
    .mode-btn.active {
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
    }

    /* Stats bar */
    .stats {
      display: flex;
      gap: 16px;
      padding: 8px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
      font-size: 11px;
      font-weight: 600;
    }
    .stat-add { color: var(--cg-green-400, #4ade80); }
    .stat-remove { color: var(--cg-red-400, #f87171); }
    .stat-unchanged { color: var(--cg-gray-500, #71717a); }

    /* Labels */
    .labels {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .label-item {
      padding: 6px 16px;
      font-size: 11px;
      font-weight: 700;
      color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .label-item:first-child { border-right: 1px solid var(--cg-gray-800, #27272a); }

    /* Side-by-side */
    .side-by-side {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-height: 400px;
      overflow-y: auto;
    }
    .side {
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-size: 12px;
      line-height: 1.6;
    }
    .side:first-child { border-right: 1px solid var(--cg-gray-800, #27272a); }

    .diff-line {
      display: flex;
      padding: 1px 12px;
      min-height: 20px;
    }
    .line-num {
      width: 32px;
      flex-shrink: 0;
      color: var(--cg-gray-600, #52525b);
      text-align: right;
      padding-right: 8px;
      user-select: none;
    }
    .line-content {
      flex: 1;
      white-space: pre-wrap;
      word-break: break-all;
      color: var(--cg-color-surface-base-text, #fafafa);
    }

    .diff-line.add { background: rgba(34, 197, 94, 0.08); }
    .diff-line.add .line-content { color: var(--cg-green-400, #4ade80); }
    .diff-line.remove { background: rgba(239, 68, 68, 0.08); }
    .diff-line.remove .line-content { color: var(--cg-red-400, #f87171); }
    .diff-line.unchanged .line-content { color: var(--cg-gray-500, #71717a); }
    .diff-line.empty { background: var(--cg-color-surface-base-background, #09090b); }

    /* Inline mode */
    .inline-diff {
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-size: 12px;
      line-height: 1.6;
      max-height: 400px;
      overflow-y: auto;
    }
    .inline-diff .diff-line .prefix {
      width: 20px;
      flex-shrink: 0;
      text-align: center;
      font-weight: 700;
    }
    .inline-diff .add .prefix { color: var(--cg-green-400, #4ade80); }
    .inline-diff .remove .prefix { color: var(--cg-red-400, #f87171); }

    /* Empty */
    .empty {
      padding: 32px;
      text-align: center;
      color: var(--cg-gray-500, #71717a);
      font-size: 13px;
    }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
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

  private _computeDiff(): DiffLine[] {
    const beforeLines = this.beforeCode.split('\n');
    const afterLines = this.afterCode.split('\n');
    const result: DiffLine[] = [];
    const max = Math.max(beforeLines.length, afterLines.length);

    // Simple line-by-line diff (not LCS — good enough for most cases)
    const afterSet = new Set(afterLines);
    const beforeSet = new Set(beforeLines);

    let bi = 0, ai = 0;
    while (bi < beforeLines.length || ai < afterLines.length) {
      const bLine = bi < beforeLines.length ? beforeLines[bi] : undefined;
      const aLine = ai < afterLines.length ? afterLines[ai] : undefined;

      if (bLine !== undefined && aLine !== undefined && bLine === aLine) {
        result.push({ type: 'unchanged', content: bLine, lineNum: { before: bi + 1, after: ai + 1 } });
        bi++; ai++;
      } else if (bLine !== undefined && !afterSet.has(bLine)) {
        result.push({ type: 'remove', content: bLine, lineNum: { before: bi + 1 } });
        bi++;
      } else if (aLine !== undefined && !beforeSet.has(aLine)) {
        result.push({ type: 'add', content: aLine, lineNum: { after: ai + 1 } });
        ai++;
      } else {
        // Changed line — show as remove + add
        if (bLine !== undefined) {
          result.push({ type: 'remove', content: bLine, lineNum: { before: bi + 1 } });
          bi++;
        }
        if (aLine !== undefined) {
          result.push({ type: 'add', content: aLine, lineNum: { after: ai + 1 } });
          ai++;
        }
      }
    }
    return result;
  }

  private get _stats() {
    const diff = this._computeDiff();
    return {
      additions: diff.filter(d => d.type === 'add').length,
      removals: diff.filter(d => d.type === 'remove').length,
      unchanged: diff.filter(d => d.type === 'unchanged').length,
    };
  }

  private _handleLineClick(line: DiffLine) {
    this.dispatchEvent(new CustomEvent('ai-diff-select', {
      bubbles: true, composed: true,
      detail: { type: line.type, content: line.content, lineNum: line.lineNum },
    }));
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
        <div class="side">
          ${left.map(l => l ? html`
            <div class="diff-line ${l.type}" @click=${() => this._handleLineClick(l)}>
              <span class="line-num">${l.lineNum.before ?? ''}</span>
              <span class="line-content">${l.content}</span>
            </div>
          ` : html`<div class="diff-line empty"><span class="line-num"></span><span class="line-content"></span></div>`)}
        </div>
        <div class="side">
          ${right.map(r => r ? html`
            <div class="diff-line ${r.type}" @click=${() => this._handleLineClick(r)}>
              <span class="line-num">${r.lineNum.after ?? ''}</span>
              <span class="line-content">${r.content}</span>
            </div>
          ` : html`<div class="diff-line empty"><span class="line-num"></span><span class="line-content"></span></div>`)}
        </div>
      </div>
    `;
  }

  private _renderInline() {
    const diff = this._computeDiff();
    return html`
      <div class="inline-diff">
        ${diff.map(d => html`
          <div class="diff-line ${d.type}" @click=${() => this._handleLineClick(d)}>
            <span class="prefix">${d.type === 'add' ? '+' : d.type === 'remove' ? '-' : ' '}</span>
            <span class="line-num">${d.lineNum.before ?? d.lineNum.after ?? ''}</span>
            <span class="line-content">${d.content}</span>
          </div>
        `)}
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
          <div class="mode-toggle">
            <button class="mode-btn ${this.mode === 'side-by-side' ? 'active' : ''}"
              @click=${() => this.mode = 'side-by-side'}>Split</button>
            <button class="mode-btn ${this.mode === 'inline' ? 'active' : ''}"
              @click=${() => this.mode = 'inline'}>Inline</button>
          </div>
        </div>
        <div class="stats">
          <span class="stat-add">+${stats.additions} added</span>
          <span class="stat-remove">-${stats.removals} removed</span>
          <span class="stat-unchanged">${stats.unchanged} unchanged</span>
        </div>
        ${this.mode === 'side-by-side' ? this._renderSideBySide() : this._renderInline()}
      </div>
    `;
  }
}
