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
  'button',
]);

/** Allowed attributes per tag — anything not listed is stripped */
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  // Heading anchors get an id derived from slugified heading text.
  h1: new Set(['id']), h2: new Set(['id']), h3: new Set(['id']),
  h4: new Set(['id']), h5: new Set(['id']), h6: new Set(['id']),
  a: new Set(['href', 'target', 'rel', 'class', 'aria-label']),
  img: new Set(['src', 'alt', 'width', 'height']),
  td: new Set(['colspan', 'rowspan']),
  th: new Set(['colspan', 'rowspan']),
  code: new Set(['class']),
  // Class-based variants (alert types, task lists, code-block chrome).
  blockquote: new Set(['class']),
  div: new Set(['class']),
  ul: new Set(['class']),
  li: new Set(['class']),
  span: new Set(['class', 'aria-hidden']),
  button: new Set(['class', 'type', 'aria-label']),
};

/** Safe URL protocols for href/src attributes */
const SAFE_PROTOCOLS = /^(https?:|mailto:|#|\/)/i;

/** GitHub-style alert variants — case-insensitive markers as the first line of a blockquote. */
const ALERT_TYPES = new Set(['note', 'tip', 'important', 'warning', 'caution']);

/** Slugify heading text into a URL-safe id. Only emits [a-z0-9-]; safe to interpolate. */
function slugify(text: string): string {
  return text
    .replace(/[`*_~]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

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
    /^\d+\. /.test(line) ||
    /^\|.+\|\s*$/.test(line)
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
      /* Prose body — 16px is the document-typography norm (Tailwind Typography,
         GitHub, Vercel docs). 14px is for UI density, not reading. */
      font-size: var(--cg-font-size-base);
      line-height: var(--cg-line-height-loose);
    }

    /* Headings — asymmetric margins (bigger top than bottom) create clear
       section breaks, the document-typography pattern from Tailwind Typography. */
    .md h1 {
      font-size: var(--cg-font-size-2xl);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      margin: var(--cg-spacing-32) 0 var(--cg-spacing-12);
      line-height: var(--cg-line-height-tight);
      letter-spacing: var(--cg-letter-spacing-tight);
      text-wrap: balance;
    }
    .md h2 {
      font-size: var(--cg-font-size-xl);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      margin: var(--cg-spacing-24) 0 var(--cg-spacing-8);
      line-height: var(--cg-line-height-tight);
      letter-spacing: var(--cg-letter-spacing-tight);
      text-wrap: balance;
    }
    .md h3 {
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      margin: var(--cg-spacing-20) 0 var(--cg-spacing-6);
      line-height: var(--cg-line-height-snug);
    }

    /* Anchored headings — when consumers add ids, deep-links should clear any
       sticky header by default. Caller can override with the css-prop. */
    .md :is(h1, h2, h3, h4, h5, h6) {
      scroll-margin-top: var(--cg-component-markdown-scroll-margin);
    }

    .md p {
      margin: var(--cg-spacing-16) 0;
      text-wrap: pretty;
    }

    .md strong { font-weight: var(--cg-font-weight-semibold); }
    .md em { font-style: italic; }

    /* ── Inline code ── em-relative size so it scales with the body. */
    .md code {
      background: var(--cg-overlay-dark-subtle);
      padding: 0.15em 0.35em;
      border-radius: var(--cg-border-radius-50);
      font-family: var(--cg-font-family-mono);
      font-size: 0.875em;
    }

    /* ── Code block — wrapped with header chrome (lang label + copy button).
       12px radius reads as "code", not "card" (was 20px).
       Matches GitHub / Vercel / Linear / Tailwind Typography. */
    .md .code-block {
      margin: var(--cg-spacing-16) 0;
      background: var(--cg-color-code-background);
      border: var(--cg-border-width-50) solid var(--cg-color-code-border);
      border-radius: var(--cg-border-radius-100);
      overflow: hidden;
    }
    .md .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      background: var(--cg-overlay-dark-subtle);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-code-border);
    }
    .md .code-lang {
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      text-transform: lowercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .md .code-copy {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-code-border);
      color: var(--cg-color-surface-container-outlined);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      font-family: var(--cg-font-family-primary);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      transition:
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .md .code-copy:hover {
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-base-text);
    }
    .md .code-copy:active { transform: scale(var(--cg-interaction-press-scale)); }
    .md .code-copy:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .md pre {
      background: transparent;
      color: var(--cg-color-code-text);
      padding: var(--cg-spacing-16);
      border: 0;
      border-radius: 0;
      overflow-x: auto;
      font-family: var(--cg-font-family-mono);
      font-size: 0.875em;
      line-height: var(--cg-line-height-relaxed);
      margin: 0;
    }
    .md pre code {
      background: none;
      padding: 0;
      color: inherit;
      font-size: inherit;
      border-radius: 0;
    }

    /* ── GitHub-style alerts — 5 semantic variants (note, tip, important, warning, caution). */
    .md .alert {
      border-left: var(--cg-border-width-300) solid;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      margin: var(--cg-spacing-16) 0;
      border-radius: 0 var(--cg-border-radius-50) var(--cg-border-radius-50) 0;
      font-style: normal;
      color: var(--cg-color-surface-base-text);
    }
    .md .alert-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      margin-bottom: var(--cg-spacing-6);
    }
    .md .alert-label {
      font-weight: var(--cg-font-weight-semibold);
      font-size: var(--cg-font-size-sm);
      letter-spacing: var(--cg-letter-spacing-normal);
    }
    .md .alert-body { font-style: normal; }
    .md .alert-body :is(p, ul, ol):first-child { margin-top: 0; }
    .md .alert-body :is(p, ul, ol):last-child { margin-bottom: 0; }

    .md .alert-note {
      border-left-color: var(--cg-color-status-info-text-default);
      background: var(--cg-color-status-info-background-default);
    }
    .md .alert-note .alert-label { color: var(--cg-color-status-info-text-default); }

    .md .alert-tip {
      border-left-color: var(--cg-color-status-success-text-default);
      background: var(--cg-color-status-success-background-default);
    }
    .md .alert-tip .alert-label { color: var(--cg-color-status-success-text-default); }

    .md .alert-important {
      border-left-color: var(--cg-color-accent-text);
      background: var(--cg-overlay-accent-light);
    }
    .md .alert-important .alert-label { color: var(--cg-color-accent-text); }

    .md .alert-warning {
      border-left-color: var(--cg-color-status-warning-text-default);
      background: var(--cg-color-status-warning-background-default);
    }
    .md .alert-warning .alert-label { color: var(--cg-color-status-warning-text-default); }

    .md .alert-caution {
      border-left-color: var(--cg-color-status-error-text-default);
      background: var(--cg-color-status-error-background-default);
    }
    .md .alert-caution .alert-label { color: var(--cg-color-status-error-text-default); }

    /* ── Task lists — checkbox-prefixed list items. */
    .md .task-list { padding-left: 0; list-style: none; }
    .md .task-list .task {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }
    .md .task-check {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      flex-shrink: 0;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-50);
      background: transparent;
    }
    .md .task-check-on {
      background: var(--cg-color-action-primary-background-default);
      border-color: var(--cg-color-action-primary-border-default);
      position: relative;
    }
    .md .task-check-on::after {
      content: '✓';
      color: var(--cg-color-action-primary-text-default);
      font-size: 0.75em;
      font-weight: var(--cg-font-weight-bold);
      line-height: 1;
    }

    /* Rule 10 — visually hidden, screen-reader-only state text. */
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

    /* ── Heading anchors — visible on heading hover, "#" link to the slugged id. */
    .md :is(h1, h2, h3, h4, h5, h6) .anchor {
      display: inline-block;
      margin-left: var(--cg-spacing-6);
      color: var(--cg-color-surface-container-outlined);
      text-decoration: none;
      opacity: 0;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .md :is(h1, h2, h3, h4, h5, h6):hover .anchor,
    .md :is(h1, h2, h3, h4, h5, h6) .anchor:focus-visible { opacity: 1; }
    .md .anchor:hover { color: var(--cg-color-accent-text); }

    /* ── Links ── 4px underline-offset reads as polished prose (not UI). */
    .md a {
      color: var(--cg-color-accent-text);
      text-decoration: underline;
      text-decoration-thickness: var(--cg-border-width-50);
      text-underline-offset: var(--cg-spacing-4);
      text-decoration-color: color-mix(in oklch, currentColor 40%, transparent);
      transition: text-decoration-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .md a:hover { text-decoration-color: currentColor; }

    /* ── Lists ── more breathable item spacing for readable prose. */
    .md ul, .md ol {
      margin: var(--cg-spacing-16) 0;
      padding-left: var(--cg-spacing-24);
    }
    .md li { margin: var(--cg-spacing-6) 0; }

    /* ── Blockquote ── */
    .md blockquote {
      border-left: var(--cg-border-width-300) solid var(--cg-color-action-primary-border-default);
      padding-left: var(--cg-spacing-16);
      color: var(--cg-color-surface-container-outlined);
      margin: var(--cg-spacing-16) 0;
      font-style: italic;
    }

    /* ── HR ── premium gradient rule (Stripe / Vercel pattern). */
    .md hr {
      border: 0;
      height: var(--cg-border-width-50);
      background: linear-gradient(
        to right,
        transparent,
        var(--cg-color-surface-container-border),
        transparent
      );
      margin: var(--cg-spacing-32) 0;
    }

    /* ── Selection highlight ── matches the brand accent. */
    .md ::selection {
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-surface-base-text);
    }

    /* ── Images ── contained to the prose column. */
    .md img {
      max-width: 100%;
      height: auto;
      border-radius: var(--cg-border-radius-100);
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

      // Fenced code block — wrapped with header chrome (lang label + copy button)
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
        const langClean = /^\w+$/.test(lang) ? lang : '';
        const langClass = langClean ? ` class="language-${langClean}"` : '';
        const langLabel = `<span class="code-lang">${langClean}</span>`;
        blocks.push(
          `<div class="code-block">` +
            `<div class="code-header">${langLabel}` +
              `<button class="code-copy" type="button" aria-label="Copy code">Copy</button>` +
            `</div>` +
            `<pre><code${langClass}>${code}</code></pre>` +
          `</div>`,
        );
        continue;
      }

      // Heading (# through ######) — auto-anchored with id + hover-visible "#" link
      const headingMatch = /^(#{1,6}) (.+)$/.exec(line);
      if (headingMatch) {
        const level = headingMatch[1]!.length;
        const text = headingMatch[2]!;
        const slug = slugify(text);
        const inline = this._inline(text);
        const anchor = slug
          ? ` <a class="anchor" href="#${slug}" aria-label="Permalink to this heading">#</a>`
          : '';
        const idAttr = slug ? ` id="${slug}"` : '';
        blocks.push(`<h${level}${idAttr}>${inline}${anchor}</h${level}>`);
        i++;
        continue;
      }

      // Horizontal rule
      if (/^-{3,}$/.test(line.trim())) {
        blocks.push('<hr/>');
        i++;
        continue;
      }

      // Blockquote (consecutive > lines) — first line may be an alert marker
      // `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`.
      if (line.startsWith('> ') || line === '>') {
        const quoteLines: string[] = [];
        while (i < lines.length && (lines[i]!.startsWith('> ') || lines[i] === '>')) {
          quoteLines.push(lines[i]!.replace(/^> ?/, ''));
          i++;
        }
        const alertMatch = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/i.exec(quoteLines[0] ?? '');
        if (alertMatch && ALERT_TYPES.has(alertMatch[1]!.toLowerCase())) {
          const type = alertMatch[1]!.toLowerCase();
          const label = type.charAt(0).toUpperCase() + type.slice(1);
          // Run the body through the block parser so lists and paragraphs
          // inside alerts render as real blocks, not flattened inline text.
          const body = this._render(quoteLines.slice(1).join('\n'));
          blocks.push(
            `<blockquote class="alert alert-${type}">` +
              `<div class="alert-header"><span class="alert-label">${label}</span></div>` +
              `<div class="alert-body">${body}</div>` +
            `</blockquote>`,
          );
        } else {
          blocks.push(`<blockquote>${this._inline(quoteLines.join(' '))}</blockquote>`);
        }
        continue;
      }

      // Unordered list (consecutive - items) — items can be plain or task `- [ ]` / `- [x]`
      if (/^[-*] /.test(line)) {
        const items: string[] = [];
        let isTaskList = false;
        while (i < lines.length && /^[-*] /.test(lines[i]!)) {
          const itemContent = lines[i]!.slice(2);
          const taskMatch = /^\[([ xX])\]\s+(.*)$/.exec(itemContent);
          if (taskMatch) {
            isTaskList = true;
            const checked = taskMatch[1]!.toLowerCase() === 'x';
            const checkClass = checked ? 'task-check task-check-on' : 'task-check';
            items.push(
              `<li class="task">` +
                `<span class="${checkClass}" aria-hidden="true"></span>` +
                `<span class="sr-only">${checked ? 'Done: ' : 'To do: '}</span>` +
                this._inline(taskMatch[2]!) +
              `</li>`,
            );
          } else {
            items.push(`<li>${this._inline(itemContent)}</li>`);
          }
          i++;
        }
        const listClass = isTaskList ? ' class="task-list"' : '';
        blocks.push(`<ul${listClass}>${items.join('')}</ul>`);
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

      // GFM pipe table — header row, then a |---|---| separator row, then body rows
      if (/^\|.+\|\s*$/.test(line) && i + 1 < lines.length && /^\|(\s*:?-+:?\s*\|)+\s*$/.test(lines[i + 1]!)) {
        const splitRow = (row: string): string[] =>
          row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => this._inline(cell.trim()));
        const headers = splitRow(line);
        i += 2; // consume header + separator
        const bodyRows: string[][] = [];
        while (i < lines.length && /^\|.+\|\s*$/.test(lines[i]!)) {
          bodyRows.push(splitRow(lines[i]!));
          i++;
        }
        const thead = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;
        const tbody = bodyRows.length
          ? `<tbody>${bodyRows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`
          : '';
        blocks.push(`<table>${thead}${tbody}</table>`);
        continue;
      }

      // Blank line — paragraph separator
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Paragraph — consecutive non-blank, non-block lines joined with spaces.
      // The first line is consumed unconditionally: a pipe row without a
      // separator line is a block start that no branch above claims, and
      // skipping the consume would loop forever.
      const paraLines: string[] = [line];
      i++;
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

    // Images — must run BEFORE links so ![alt](src) isn't half-eaten by the
    // link rule. Unsafe protocols degrade to the alt text; the DOM sanitizer
    // re-validates src as a backstop.
    working = working.replace(
      /!\[([^\]]*)\]\(((?:[^()\s]|\([^)]*\))+)\)/g,
      (_m, alt: string, url: string) => {
        const trimmed = url.trim();
        return SAFE_PROTOCOLS.test(trimmed) ? `<img src="${trimmed}" alt="${alt}">` : alt;
      },
    );

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

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('text')) {
      // Bind copy-button click handlers AFTER Lit has applied innerHTML.
      // The buttons come from sanitized HTML so they have no inline handlers.
      requestAnimationFrame(() => {
        const buttons = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.code-copy');
        buttons?.forEach(btn => this._bindCopyButton(btn));
        this.shadowRoot?.querySelectorAll<HTMLAnchorElement>('.anchor').forEach(a => this._bindAnchor(a));
      });
    }
  }

  override firstUpdated(): void {
    // Deep-link support: fragment navigation can't reach shadow-root ids, so
    // resolve the initial location.hash ourselves once content is rendered.
    requestAnimationFrame(() => {
      const slug = location.hash.slice(1);
      if (!slug) return;
      this.shadowRoot?.getElementById(slug)?.scrollIntoView({ block: 'start' });
    });
  }

  private _bindAnchor(a: HTMLAnchorElement): void {
    if (a.dataset['cgBound']) return;
    a.dataset['cgBound'] = '1';
    a.addEventListener('click', (e) => {
      // Browsers can't fragment-navigate into a shadow root — scroll manually
      // (scroll-margin-top's tier-3 token applies to scrollIntoView).
      e.preventDefault();
      const slug = a.getAttribute('href')?.slice(1);
      if (!slug) return;
      history.replaceState(null, '', `#${slug}`);
      this.shadowRoot?.getElementById(slug)?.scrollIntoView({ block: 'start' });
    });
  }

  private _bindCopyButton(btn: HTMLButtonElement): void {
    if (btn.dataset['cgBound']) return;
    btn.dataset['cgBound'] = '1';
    // Announce the Copy -> Copied swap to screen readers (set post-sanitize
    // via JS so the sanitizer allowlist stays unchanged).
    btn.setAttribute('aria-live', 'polite');
    btn.addEventListener('click', async () => {
      const block = btn.closest('.code-block');
      const pre = block?.querySelector('pre');
      const codeText = pre?.textContent ?? '';
      try {
        await navigator.clipboard?.writeText(codeText);
        const original = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => {
          if (btn.textContent === 'Copied') btn.textContent = original;
        }, 1200);
      } catch {
        // Clipboard API may be blocked (insecure context, permission denied);
        // silently fail — the code is still selectable.
      }
    });
  }

  override render() {
    // SSR has no DOMParser/document — emit an empty prose container and let
    // the client fill it on hydration.
    if (typeof DOMParser === 'undefined') {
      return html`<div class="md"></div>`;
    }
    return html`<div class="md" .innerHTML=${sanitizeHtml(this._render(this.text))}></div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'cg-markdown': CgMarkdown; } }
