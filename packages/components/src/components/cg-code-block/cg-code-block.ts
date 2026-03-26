import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * <cg-code-block> — Code display with syntax highlighting, copy button, and line numbers.
 *
 * Features:
 * - Basic keyword highlighting (JS/TS, Python, HTML, CSS, JSON, SQL)
 * - Copy to clipboard with confirmation
 * - Line numbers (optional)
 * - Filename/title display
 * - Collapsible (for long code blocks)
 * - Wrap toggle for long lines
 */

const KEYWORD_PATTERNS: Record<string, RegExp> = {
  keyword: /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|extends|new|this|async|await|try|catch|throw|switch|case|break|default|typeof|instanceof|interface|type|enum|public|private|protected|static|override|readonly|abstract|implements|def|lambda|print|self|True|False|None|SELECT|FROM|WHERE|JOIN|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|AND|OR|NOT|IN|IS|NULL|GROUP|ORDER|BY|HAVING|LIMIT|AS|ON|SET|INTO|VALUES)\b/g,
  string: /(["'`])(?:(?!\1|\\).|\\.)*?\1/g,
  comment: /\/\/.*$|\/\*[\s\S]*?\*\/|#.*$/gm,
  number: /\b\d+\.?\d*\b/g,
  function: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
  tag: /(&lt;\/?[a-zA-Z][a-zA-Z0-9-]*)/g,
  attr: /\b([a-zA-Z-]+)(?==)/g,
  punctuation: /[{}()\[\];,.:]/g,
};

function highlight(code: string): string {
  // Escape HTML first
  let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Apply highlighting in order (comments → strings → keywords → rest)
  // Use placeholder tokens to avoid double-matching
  const tokens: string[] = [];
  const placeholder = (cls: string, text: string) => {
    tokens.push(`<span class="hl-${cls}">${text}</span>`);
    return `\x00${tokens.length - 1}\x00`;
  };

  // Comments first (highest priority)
  escaped = escaped.replace(KEYWORD_PATTERNS.comment!, m => placeholder('comment', m));
  // Strings
  escaped = escaped.replace(KEYWORD_PATTERNS.string!, m => placeholder('string', m));
  // Keywords
  escaped = escaped.replace(KEYWORD_PATTERNS.keyword!, m => placeholder('keyword', m));
  // Functions
  escaped = escaped.replace(KEYWORD_PATTERNS.function!, (_, name) => placeholder('function', name));
  // Numbers
  escaped = escaped.replace(KEYWORD_PATTERNS.number!, m => placeholder('number', m));

  // Restore tokens
  escaped = escaped.replace(/\x00(\d+)\x00/g, (_, idx) => tokens[Number(idx)]!);

  return escaped;
}

@customElement('cg-code-block')
export class CgCodeBlock extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .wrapper {
      background: var(--cg-color-code-background, #09090b);
      border-radius: var(--cg-border-radius-200, 24px);
      overflow: hidden;
      border: 1px solid var(--cg-color-code-border, #27272a);
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px);
      background: var(--cg-color-code-surface, #18181b);
      border-bottom: 1px solid var(--cg-color-code-border, #27272a);
      gap: var(--cg-spacing-8, 8px);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      min-width: 0;
    }

    .dots {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-red { background: var(--cg-color-chart-4, #fbbf24); }
    .dot-yellow { background: var(--cg-color-chart-3, #4ade80); }
    .dot-green { background: var(--cg-color-chart-2, #2dd4bf); }

    .filename {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-code-muted, #52525b);
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .language {
      font-size: 0.65rem;
      color: var(--cg-color-code-comment, #52525b);
      font-weight: var(--cg-font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--cg-color-code-border, #27272a);
      padding: 2px var(--cg-spacing-8, 8px);
      border-radius: 4px;
      flex-shrink: 0;
    }

    .actions {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 4px;
      background: none;
      border: 1px solid var(--cg-color-code-muted, #52525b);
      color: var(--cg-color-code-text, #e4e4e7);
      font-size: 0.7rem;
      font-weight: 500;
      cursor: pointer;
      font-family: inherit;
      transition: all var(--cg-motion-duration-normal, 150ms) ease;
    }
    .action-btn:hover { background: var(--cg-color-code-border, #27272a); color: var(--cg-color-code-text, #e4e4e7); }
    .action-btn.copied { color: var(--cg-color-chart-2, #2dd4bf); border-color: var(--cg-color-chart-2, #2dd4bf); }
    .action-btn:focus-visible { outline: 2px solid var(--cg-focus-ring-color, #c8e650); outline-offset: 1px; }
    .action-btn svg { width: 13px; height: 13px; }

    /* Code area */
    .code-area {
      overflow-x: auto;
      overflow-y: auto;
    }
    .code-area.collapsed { max-height: 300px; }

    pre {
      margin: 0;
      padding: var(--cg-spacing-16, 16px);
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', monospace;
      font-size: 0.82rem;
      line-height: 1.7;
      color: var(--cg-color-code-text, #e4e4e7);
      tab-size: 2;
      counter-reset: line;
    }

    :host([wrap]) pre { white-space: pre-wrap; word-break: break-all; }

    /* Line numbers */
    .line {
      display: block;
    }
    :host([line-numbers]) .line::before {
      counter-increment: line;
      content: counter(line);
      display: inline-block;
      width: 3.5ch;
      margin-right: var(--cg-spacing-16, 16px);
      color: var(--cg-color-code-muted, #52525b);
      text-align: right;
      user-select: none;
      border-right: 1px solid var(--cg-color-code-border, #27272a);
      padding-right: var(--cg-spacing-12, 12px);
    }

    /* Syntax highlighting colors */
    .hl-keyword { color: var(--cg-color-code-keyword, #8aad35); font-weight: 500; }
    .hl-string { color: var(--cg-color-code-string, #86efac); }
    .hl-comment { color: var(--cg-color-code-comment, #52525b); font-style: italic; }
    .hl-number { color: var(--cg-color-code-number, #fbbf24); }
    .hl-function { color: var(--cg-color-code-function, #93c5fd); }
    .hl-tag { color: var(--cg-color-code-keyword, #8aad35); }
    .hl-attr { color: var(--cg-color-code-number, #fbbf24); }

    /* Expand button */
    .expand-bar {
      display: flex;
      justify-content: center;
      padding: 6px;
      background: linear-gradient(transparent, var(--cg-color-code-background, #09090b));
      margin-top: -32px;
      position: relative;
    }
    .expand-btn {
      font-size: 0.7rem;
      color: var(--cg-color-code-text, #e4e4e7);
      background: var(--cg-color-code-border, #27272a);
      border: 1px solid var(--cg-color-code-muted, #52525b);
      padding: 4px var(--cg-spacing-12, 12px);
      border-radius: 4px;
      cursor: pointer;
      font-family: inherit;
    }
    .expand-btn:hover { color: var(--cg-color-code-text, #e4e4e7); }
  

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }
  `;

  @property() code = '';
  @property() language = '';
  @property() filename = '';
  @property({ type: Boolean, attribute: 'line-numbers', reflect: true }) lineNumbers = false;
  @property({ type: Boolean, reflect: true }) wrap = false;
  @property({ type: Boolean }) collapsible = false;

  @state() private _copied = false;
  @state() private _collapsed = true;

  private async _copy() {
    try {
      await navigator.clipboard.writeText(this.code);
      this._copied = true;
      setTimeout(() => { this._copied = false; }, 2000);
    } catch { /* noop */ }
  }

  override render() {
    const lines = this.code.split('\n');
    const isLong = this.collapsible && lines.length > 15;
    const highlighted = highlight(this.code);

    return html`
      <div class="wrapper">
        <div class="header">
          <div class="header-left">
            <div class="dots">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            ${this.filename ? html`<span class="filename">${this.filename}</span>` : nothing}
          </div>
          <div class="actions">
            ${this.language ? html`<span class="language">${this.language}</span>` : nothing}
            <button class="action-btn ${this._copied ? 'copied' : ''}" @click=${this._copy} aria-label="Copy code">
              ${this._copied
                ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"></path></svg> Copied`
                : html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg> Copy`
              }
            </button>
          </div>
        </div>

        <div class="code-area ${isLong && this._collapsed ? 'collapsed' : ''}">
          <pre>${this.lineNumbers
            ? lines.map(l => html`<span class="line">${this._highlightLine(l)}\n</span>`)
            : html`${this._unsafeHTML(highlighted)}`
          }</pre>
        </div>

        ${isLong && this._collapsed ? html`
          <div class="expand-bar">
            <button class="expand-btn" @click=${() => { this._collapsed = false; }}>
              Show all ${lines.length} lines
            </button>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _highlightLine(line: string): unknown {
    return this._unsafeHTML(highlight(line));
  }

  private _unsafeHTML(html: string): unknown {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.cloneNode(true);
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-code-block': CgCodeBlock; }
}
