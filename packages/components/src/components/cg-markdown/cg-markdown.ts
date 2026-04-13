import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Allowed HTML tags after markdown parsing */
const ALLOWED_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
  'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins',
  'code', 'pre', 'blockquote',
  'ul', 'ol', 'li',
  'a', 'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span', 'sub', 'sup', 'mark', 'abbr',
]);

/** Allowed attributes per tag — anything not listed is stripped */
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'target', 'rel']),
  img: new Set(['src', 'alt', 'width', 'height']),
  td: new Set(['colspan', 'rowspan']),
  th: new Set(['colspan', 'rowspan']),
  code: new Set(['class']),
};

/** Safe URL protocols for href/src attributes */
const SAFE_PROTOCOLS = /^(https?:|mailto:|#|\/)/i;

/**
 * DOM-based HTML sanitizer. Parses with the browser's HTML parser,
 * walks the tree, and strips anything not explicitly allowed.
 * Immune to encoding tricks, nested contexts, and regex bypasses.
 */
function sanitizeHtml(raw: string): string {
  const doc = new DOMParser().parseFromString(raw, 'text/html');
  const fragment = document.createDocumentFragment();

  function walk(source: Node, target: Node) {
    for (const child of Array.from(source.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        target.appendChild(document.createTextNode(child.textContent ?? ''));
        continue;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) continue;
      const el = child as Element;
      const tag = el.tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) {
        // Skip the element but keep its text children
        walk(el, target);
        continue;
      }
      const clean = document.createElement(tag);
      const allowed = ALLOWED_ATTRS[tag];
      if (allowed) {
        for (const attr of Array.from(el.attributes)) {
          if (!allowed.has(attr.name.toLowerCase())) continue;
          const val = attr.value.trim().toLowerCase();
          if ((attr.name === 'href' || attr.name === 'src') && !SAFE_PROTOCOLS.test(val)) continue;
          clean.setAttribute(attr.name, attr.value);
        }
      }
      target.appendChild(clean);
      walk(el, clean);
    }
  }

  walk(doc.body, fragment);
  const container = document.createElement('div');
  container.appendChild(fragment);
  return container.innerHTML;
}

/**
 * <cg-markdown> — Lightweight markdown renderer for LLM output.
 *
 * @example
 * ```html
 * <cg-markdown text="## Hello\n\nThis is **bold**."></cg-markdown>
 * ```
 *
 * @cssprop --cg-color-surface-base-text - Body text color
 * @cssprop --cg-font-size-sm - Body font size (14px)
 */
@customElement('cg-markdown')
export class CgMarkdown extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-relaxed);
      font-size: var(--cg-font-size-sm);
    }

    .md h1 {
      font-size: var(--cg-font-size-2xl);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      margin: var(--cg-spacing-24) 0 var(--cg-spacing-12);
      line-height: var(--cg-line-height-tight);
    }
    .md h2 {
      font-size: var(--cg-font-size-xl);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      margin: var(--cg-spacing-20) 0 var(--cg-spacing-8);
      line-height: var(--cg-line-height-tight);
    }
    .md h3 {
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      margin: var(--cg-spacing-16) 0 var(--cg-spacing-8);
      line-height: var(--cg-line-height-snug);
    }

    .md p {
      margin: var(--cg-spacing-12) 0;
    }

    .md strong { font-weight: var(--cg-font-weight-semibold); }
    .md em { font-style: italic; }

    /* ── Inline code ── */
    .md code {
      background: var(--cg-overlay-dark-subtle);
      padding: var(--cg-spacing-2) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-50);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
    }

    /* ── Code block ── */
    .md pre {
      background: var(--cg-color-code-background);
      color: var(--cg-color-code-text);
      padding: var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-150);
      border: var(--cg-border-width-50) solid var(--cg-color-code-border);
      overflow-x: auto;
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      line-height: var(--cg-line-height-relaxed);
      margin: var(--cg-spacing-12) 0;
    }
    .md pre code {
      background: none;
      padding: 0;
      color: inherit;
      font-size: inherit;
      border-radius: 0;
    }

    /* ── Links ── */
    .md a {
      color: var(--cg-color-action-primary-background-default);
      text-decoration: underline;
      text-underline-offset: var(--cg-spacing-2);
    }
    .md a:hover { opacity: 0.8; }

    /* ── Lists ── */
    .md ul, .md ol {
      margin: var(--cg-spacing-12) 0;
      padding-left: var(--cg-spacing-24);
    }
    .md li { margin: var(--cg-spacing-4) 0; }

    /* ── Blockquote ── */
    .md blockquote {
      border-left: var(--cg-border-width-300) solid var(--cg-color-action-primary-background-default);
      padding-left: var(--cg-spacing-16);
      color: var(--cg-color-surface-container-outlined);
      margin: var(--cg-spacing-12) 0;
      font-style: italic;
    }

    /* ── HR ── */
    .md hr {
      border: none;
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      margin: var(--cg-spacing-24) 0;
    }

    /* ── Table ── */
    .md table {
      width: 100%;
      border-collapse: collapse;
      margin: var(--cg-spacing-12) 0;
      font-size: var(--cg-font-size-sm);
    }
    .md th {
      text-align: left;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-100) solid var(--cg-color-surface-container-border);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
    }
    .md td {
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }
  `];

  @property() text = '';

  private _render(md: string): string {
    let h = md
      .replace(/```[\s\S]*?```/g, m => `<pre><code>${m.slice(3, -3).replace(/^\w+\n/, '').replace(/</g, '&lt;')}</code></pre>`)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^---$/gm, '<hr/>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, m => m.includes('1.') ? `<ol>${m}</ol>` : `<ul>${m}</ul>`)
      .replace(/^(?!<[hupob]|<li|<hr|<blockquote|<pre|<ul|<ol)(.+)$/gm, '<p>$1</p>');
    return h;
  }

  override render() {
    return html`<div class="md" .innerHTML=${sanitizeHtml(this._render(this.text))}></div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'cg-markdown': CgMarkdown; } }
