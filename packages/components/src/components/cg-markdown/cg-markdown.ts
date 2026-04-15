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

/** Escape HTML-special characters in text content. */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Returns true if the line starts a block-level markdown element. */
function isBlockStart(line: string): boolean {
  return (
    line.startsWith('```') ||
    /^#{1,6} /.test(line) ||
    /^-{3,}$/.test(line.trim()) ||
    line.startsWith('> ') ||
    line === '>' ||
    /^[-*] /.test(line) ||
    /^\d+\. /.test(line)
  );
}

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

  /**
   * Line-based markdown parser. Classifies each line into a block type,
   * groups consecutive same-type lines, and renders each block with
   * inline formatting applied to text content.
   *
   * Handles: headings (#), code fences (```), blockquotes (>), horizontal
   * rules (---), unordered lists (-), ordered lists (1.), and paragraphs.
   * Inline: bold (**), italic (*), inline code (`), links ([text](url)).
   */
  private _render(md: string): string {
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    const blocks: string[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i]!;

      // Fenced code block
      if (line.startsWith('```')) {
        const lang = line.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i]!.startsWith('```')) {
          codeLines.push(lines[i]!);
          i++;
        }
        if (i < lines.length) i++; // skip closing fence
        const code = escapeHtml(codeLines.join('\n'));
        const langAttr = /^\w+$/.test(lang) ? ` class="language-${lang}"` : '';
        blocks.push(`<pre><code${langAttr}>${code}</code></pre>`);
        continue;
      }

      // Heading (# through ######)
      const headingMatch = /^(#{1,6}) (.+)$/.exec(line);
      if (headingMatch) {
        const level = headingMatch[1]!.length;
        blocks.push(`<h${level}>${this._inline(headingMatch[2]!)}</h${level}>`);
        i++;
        continue;
      }

      // Horizontal rule
      if (/^-{3,}$/.test(line.trim())) {
        blocks.push('<hr/>');
        i++;
        continue;
      }

      // Blockquote (consecutive > lines)
      if (line.startsWith('> ') || line === '>') {
        const quoteLines: string[] = [];
        while (i < lines.length && (lines[i]!.startsWith('> ') || lines[i] === '>')) {
          quoteLines.push(lines[i]!.replace(/^> ?/, ''));
          i++;
        }
        blocks.push(`<blockquote>${this._inline(quoteLines.join(' '))}</blockquote>`);
        continue;
      }

      // Unordered list (consecutive - items)
      if (/^[-*] /.test(line)) {
        const items: string[] = [];
        while (i < lines.length && /^[-*] /.test(lines[i]!)) {
          items.push(`<li>${this._inline(lines[i]!.slice(2))}</li>`);
          i++;
        }
        blocks.push(`<ul>${items.join('')}</ul>`);
        continue;
      }

      // Ordered list (consecutive 1. 2. 3. items)
      if (/^\d+\. /.test(line)) {
        const items: string[] = [];
        while (i < lines.length && /^\d+\. /.test(lines[i]!)) {
          items.push(`<li>${this._inline(lines[i]!.replace(/^\d+\. /, ''))}</li>`);
          i++;
        }
        blocks.push(`<ol>${items.join('')}</ol>`);
        continue;
      }

      // Blank line — paragraph separator
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Paragraph — consecutive non-blank, non-block lines joined with spaces
      const paraLines: string[] = [];
      while (i < lines.length && lines[i]!.trim() !== '' && !isBlockStart(lines[i]!)) {
        paraLines.push(lines[i]!);
        i++;
      }
      blocks.push(`<p>${this._inline(paraLines.join(' '))}</p>`);
    }

    return blocks.join('');
  }

  /**
   * Applies inline formatting. Escapes HTML first, then processes
   * inline code (via placeholder to avoid interference), bold, italic,
   * and links with URL safety checks.
   */
  private _inline(text: string): string {
    // Extract inline code as placeholders so bold/italic regex don't touch it
    const codeStash: string[] = [];
    let working = text.replace(/`([^`]+)`/g, (_, code: string) => {
      codeStash.push(escapeHtml(code));
      return `\x00CODE${codeStash.length - 1}\x00`;
    });

    // Escape remaining HTML
    working = escapeHtml(working);

    // Bold before italic so ** doesn't get half-eaten by *
    working = working
      .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

    // Links — handle URLs with balanced single-level parens
    working = working.replace(
      /\[([^\]]+)\]\(((?:[^()\s]|\([^)]*\))+)\)/g,
      (_m, label: string, url: string) => {
        const trimmed = url.trim();
        const safe = SAFE_PROTOCOLS.test(trimmed) ? trimmed : 'about:blank';
        return `<a href="${safe}" target="_blank" rel="noopener">${label}</a>`;
      },
    );

    // Restore inline code
    working = working.replace(/\x00CODE(\d+)\x00/g, (_m, idx: string) => {
      return `<code>${codeStash[Number(idx)]}</code>`;
    });

    return working;
  }

  override render() {
    return html`<div class="md" .innerHTML=${sanitizeHtml(this._render(this.text))}></div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'cg-markdown': CgMarkdown; } }
