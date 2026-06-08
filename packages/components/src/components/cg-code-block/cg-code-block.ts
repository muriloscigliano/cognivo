import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-code-block> — Code display with syntax highlighting, copy button, and line numbers.
 *
 * @example
 * ```html
 * <cg-code-block code="const x = 1;" language="javascript" line-numbers></cg-code-block>
 * ```
 *
 * @cssprop --cg-color-code-background - Block background
 * @cssprop --cg-color-code-text - Text color
 * @cssprop --cg-color-code-keyword - Keyword highlight color
 */

const KEYWORD_PATTERNS: Record<string, RegExp> = {
  keyword: /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|extends|new|this|async|await|try|catch|throw|switch|case|break|default|typeof|instanceof|interface|type|enum|public|private|protected|static|override|readonly|abstract|implements|def|lambda|print|self|True|False|None|SELECT|FROM|WHERE|JOIN|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|AND|OR|NOT|IN|IS|NULL|GROUP|ORDER|BY|HAVING|LIMIT|AS|ON|SET|INTO|VALUES)\b/g,
  string: /(["'`])(?:(?!\1|\\).|\\.)*?\1/g,
  comment: /\/\/.*$|\/\*[\s\S]*?\*\/|#.*$/gm,
  number: /\b\d+\.?\d*\b/g,
  function: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
};

function highlight(code: string): string {
  let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const tokens: string[] = [];
  const placeholder = (cls: string, text: string) => {
    tokens.push(`<span class="hl-${cls}">${text}</span>`);
    return `\x00${tokens.length - 1}\x00`;
  };

  escaped = escaped.replace(KEYWORD_PATTERNS.comment!, m => placeholder('comment', m));
  escaped = escaped.replace(KEYWORD_PATTERNS.string!, m => placeholder('string', m));
  escaped = escaped.replace(KEYWORD_PATTERNS.keyword!, m => placeholder('keyword', m));
  escaped = escaped.replace(KEYWORD_PATTERNS.function!, (_, name) => placeholder('function', name));
  escaped = escaped.replace(KEYWORD_PATTERNS.number!, m => placeholder('number', m));

  escaped = escaped.replace(/\x00(\d+)\x00/g, (_, idx) => tokens[Number(idx)]!);

  return escaped;
}

@customElement('cg-code-block')
export class CgCodeBlock extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .wrapper {
      background: var(--cg-color-code-background);
      border-radius: var(--cg-border-radius-200);
      overflow: hidden;
      border: var(--cg-border-width-50) solid var(--cg-color-code-border);
    }

    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--cg-spacing-16);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      min-height: var(--cg-spacing-48);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-code-border);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-16);
      min-width: 0;
      flex: 1;
    }

    .dots {
      display: flex;
      gap: var(--cg-spacing-6);
      flex-shrink: 0;
    }
    .dot {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
    }
    .dot-red { background: var(--cg-color-chart-8-background); }
    .dot-yellow { background: var(--cg-color-chart-7-background); }
    .dot-green { background: var(--cg-color-chart-3-background); }

    .filename {
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-code-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      flex-shrink: 0;
    }

    .language {
      display: inline-flex;
      align-items: center;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-code-muted);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wider);
    }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      height: var(--cg-spacing-32);
      padding: 0 var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-50);
      background: transparent;
      border: none;
      color: var(--cg-color-code-muted);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      font-family: inherit;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .copy-btn:hover {
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-code-text);
    }
    .copy-btn:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .copy-btn.copied {
      color: var(--cg-color-status-success-text-default);
    }
    .copy-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring);
    }

    /* ── Code area ── */
    .code-area {
      overflow-x: auto;
      overflow-y: auto;
    }
    .code-area.collapsed { max-height: var(--cg-spacing-256); }

    pre {
      margin: 0;
      padding: var(--cg-spacing-20) var(--cg-spacing-24);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
      color: var(--cg-color-code-text);
      tab-size: 2;
      counter-reset: line;
      font-variant-numeric: tabular-nums;
    }

    :host([wrap]) pre { white-space: pre-wrap; word-break: break-all; }

    /* ── Line numbers ── */
    .line {
      display: block;
    }
    :host([line-numbers]) .line::before {
      counter-increment: line;
      content: counter(line);
      display: inline-block;
      width: 3ch;
      padding-right: var(--cg-spacing-16);
      margin-right: var(--cg-spacing-16);
      border-right: var(--cg-border-width-50) solid var(--cg-color-code-border);
      color: var(--cg-color-code-muted);
      text-align: right;
      user-select: none;
      opacity: 0.6;
    }

    /* ── Syntax highlighting ── */
    .hl-keyword { color: var(--cg-color-code-keyword); font-weight: var(--cg-font-weight-medium); }
    .hl-string { color: var(--cg-color-code-string); }
    .hl-comment { color: var(--cg-color-code-comment); font-style: italic; }
    .hl-number { color: var(--cg-color-code-number); }
    .hl-function { color: var(--cg-color-code-function); }

    /* ── Expand button ── */
    .expand-bar {
      display: flex;
      justify-content: center;
      padding: var(--cg-spacing-16) var(--cg-spacing-12) var(--cg-spacing-12);
      background: linear-gradient(transparent, var(--cg-color-code-background) 60%);
      margin-top: calc(var(--cg-spacing-48) * -1);
      position: relative;
    }
    .expand-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      height: var(--cg-spacing-32);
      padding: 0 var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-code-muted);
      background: var(--cg-color-code-surface);
      border: var(--cg-border-width-50) solid var(--cg-color-code-border);
      border-radius: var(--cg-border-radius-full);
      cursor: pointer;
      font-family: inherit;
      font-weight: var(--cg-font-weight-medium);
      transition:
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .expand-btn:hover {
      color: var(--cg-color-code-text);
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .expand-btn:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .expand-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .wrapper { border-radius: 0; }
    :host([rounded="sm"]) .wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) .wrapper { border-radius: var(--cg-border-radius-150); }
    :host([rounded="lg"]) .wrapper { border-radius: var(--cg-border-radius-200); }
  `];

  @property() code = '';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
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
            <button class="copy-btn ${this._copied ? 'copied' : ''}" @click=${this._copy} aria-label=${this._copied ? 'Code copied' : 'Copy code'}>
              ${this._copied
                ? html`<cg-icon name="check" size="xs"></cg-icon> Copied`
                : html`<cg-icon name="copy" size="xs"></cg-icon> Copy`
              }
            </button>
            <span class="sr-only" role="status" aria-live="polite">${this._copied ? 'Copied!' : ''}</span>
          </div>
        </div>

        <div id="code-area" class="code-area ${isLong && this._collapsed ? 'collapsed' : ''}">
          <pre>${this.lineNumbers
            ? lines.map(l => html`<span class="line">${this._highlightLine(l)}\n</span>`)
            : html`${this._unsafeHTML(highlighted)}`
          }</pre>
        </div>

        ${isLong ? html`
          <div class="expand-bar">
            <button
              class="expand-btn"
              aria-expanded=${this._collapsed ? 'false' : 'true'}
              aria-controls="code-area"
              @click=${() => { this._collapsed = !this._collapsed; }}>
              <cg-icon name=${this._collapsed ? 'chevron-down' : 'chevron-up'} size="xs"></cg-icon>
              ${this._collapsed ? html`Show all ${lines.length} lines` : html`Show less`}
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
