import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-markdown> — Lightweight markdown renderer (bold, italic, code, links, lists, headings).
 * No external dependency — simple regex-based parsing for LLM output.
 */
@customElement('cg-markdown')
export class CgMarkdown extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)); display: block; font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif); color: var(--cg-color-surface-base-text, #fafafa); line-height: var(--cg-line-height-relaxed, 1.625); font-size: var(--cg-font-size-sm, 14px); }
    .md h1 { font-size: 1.5rem; font-weight: 700; margin: 1em 0 0.5em; }
    .md h2 { font-size: 1.25rem; font-weight: 700; margin: 1em 0 0.5em; }
    .md h3 { font-size: 1.1rem; font-weight: 600; margin: 0.8em 0 0.4em; }
    .md p { margin: 0.5em 0; }
    .md strong { font-weight: 600; }
    .md em { font-style: italic; }
    .md code { background: var(--cg-overlay-accent-light, rgba(223, 255, 97, 0.12)); padding: 2px 5px; border-radius: var(--cg-border-radius-50, 4px); font-family: monospace; font-size: 0.85em; }
    .md pre { background: var(--cg-gray-900, #18181b); color: var(--cg-gray-200, #e4e4e7); padding: var(--cg-spacing-12, 12px); border-radius: var(--cg-border-radius-100, 8px); overflow-x: auto; font-family: monospace; font-size: 0.82rem; line-height: var(--cg-line-height-normal, 1.5); margin: 0.5em 0; }
    .md pre code { background: none; padding: 0; color: inherit; }
    .md a { color: var(--cg-text-accent, #e5ff6b); text-decoration: underline; text-underline-offset: 2px; }
    .md a:hover { opacity: 0.8; }
    .md ul, .md ol { margin: 0.5em 0; padding-left: 1.5em; }
    .md li { margin: 0.2em 0; }
    .md blockquote { border-left: 3px solid var(--cg-focus-ring-color, #c8e650); padding-left: var(--cg-spacing-12, 12px); color: var(--cg-gray-600, #52525b); margin: 0.5em 0; }
    .md hr { border: none; border-top: 1px solid var(--cg-color-surface-container-border, #27272a); margin: 1em 0; }
    .md table { width: 100%; border-collapse: collapse; margin: 0.5em 0; font-size: 0.85em; }
    .md th { text-align: left; padding: var(--cg-spacing-8, 8px); border-bottom: 2px solid var(--cg-color-surface-container-border, #27272a); font-weight: var(--cg-font-weight-semibold, 600); }
    .md td { padding: var(--cg-spacing-8, 8px); border-bottom: 1px solid var(--cg-gray-100, #f4f4f5); }
  `;

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
    return html`<div class="md" .innerHTML=${this._render(this.text)}></div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'cg-markdown': CgMarkdown; } }
