/**
 * @element ai-annotation
 * Text annotation layer with colored highlights, label toolbar, and editable selection mode.
 *
 * @example
 * ```html
 * <ai-annotation
 *   content="Claude is made by Anthropic in San Francisco."
 *   .annotations=${[{start:0, end:6, label:'Person', confidence:0.95}]}
 *   .labels=${[{name:'Person', color:'#60a5fa'},{name:'Organization', color:'#4ade80'}]}
 *   editable
 * ></ai-annotation>
 * ```
 *
 * @fires {CustomEvent<{annotation: Annotation}>} ai-annotation-select - Annotation span clicked
 * @fires {CustomEvent<{annotation: Annotation}>} ai-annotation-remove - Annotation removed
 * @fires {CustomEvent<{annotation: Annotation, text: string}>} ai-annotation-add - New annotation created via selection
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Focus ring color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface Annotation {
  start: number;
  end: number;
  label: string;
  confidence?: number;
}

interface LabelDef {
  name: string;
  color: string;
}

@customElement('ai-annotation')
export class AiAnnotation extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      overflow: hidden;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    /* Toolbar */
    .toolbar {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6, 6px);
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
      flex-wrap: wrap;
    }
    .toolbar-label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 700;
      color: var(--cg-gray-400, #a1a1aa);
      margin-right: 4px;
    }
    .label-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
      padding: 3px var(--cg-spacing-8, 8px);
      border-radius: var(--cg-border-radius-50, 4px);
      border: 1px solid transparent;
      background: none;
      font: inherit;
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms;
    }
    .label-btn:hover { border-color: currentColor; }
    .label-btn.selected { border-color: currentColor; }
    .label-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .stats {
      margin-left: auto;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
    }

    /* Content */
    .content {
      padding: var(--cg-spacing-16, 16px);
      font-size: var(--cg-font-size-sm, 14px);
      line-height: 1.8;
      color: var(--cg-color-surface-base-text, #fafafa);
      user-select: text;
      cursor: text;
    }

    .annotated-span {
      position: relative;
      padding: 1px 2px;
      border-radius: 3px;
      cursor: pointer;
      transition: opacity 150ms;
    }
    .annotated-span:hover { opacity: 0.85; }
    .annotated-span:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 1px;
    }

    .annotation-label {
      position: absolute;
      top: -18px;
      left: 0;
      font-size: 9px;
      font-weight: 700;
      padding: 0 4px;
      border-radius: 3px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 150ms;
    }
    .annotated-span:hover .annotation-label,
    .annotated-span:focus .annotation-label,
    .annotated-span:focus-within .annotation-label { opacity: 1; }

    /* Confidence overlay */
    .confidence-bar {
      position: absolute;
      bottom: -3px;
      left: 0;
      right: 0;
      height: 2px;
      border-radius: 1px;
    }

    /* Empty */
    .empty {
      padding: var(--cg-spacing-24, 24px);
      text-align: center;
      color: var(--cg-gray-500, #71717a);
      font-size: var(--cg-font-size-sm, 14px);
    }
    }
  `];
  /** Plain text content */
  @property({ type: String }) content: string = '';

  /** Existing annotations */
  @property({ type: Array }) annotations: Annotation[] = [];

  /** Available label definitions */
  @property({ type: Array }) labels: LabelDef[] = [
    { name: 'Person', color: '#60a5fa' },
    { name: 'Organization', color: '#4ade80' },
    { name: 'Location', color: '#fbbf24' },
    { name: 'Date', color: '#f87171' },
    { name: 'Concept', color: '#a78bfa' },
  ];

  /** Allow creating new annotations */
  @property({ type: Boolean }) editable: boolean = false;

  @state() private _selectedLabel: string = '';

  private _handleAnnotationClick(annotation: Annotation) {
    this.dispatchEvent(new CustomEvent('ai-annotation-select', {
      bubbles: true, composed: true,
      detail: { annotation },
    }));
  }

  private _handleRemove(annotation: Annotation, e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-annotation-remove', {
      bubbles: true, composed: true,
      detail: { annotation },
    }));
  }

  private _handleMouseUp() {
    if (!this.editable || !this._selectedLabel) return;
    // Shadow DOM doesn't support getSelection — use window
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;

    const text = sel.toString();
    if (!text.trim()) return;

    // Find the selected text position using range offset within our content div
    const range = sel.getRangeAt(0);
    const contentEl = this.shadowRoot?.querySelector('.content');
    if (!contentEl || !contentEl.contains(range.startContainer)) return;

    // Walk text nodes to find character offset
    const walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT);
    let charOffset = 0;
    let found = false;
    while (walker.nextNode()) {
      if (walker.currentNode === range.startContainer) {
        charOffset += range.startOffset;
        found = true;
        break;
      }
      charOffset += (walker.currentNode.textContent?.length || 0);
    }
    if (!found) return;

    const annotation: Annotation = {
      start: charOffset,
      end: charOffset + text.length,
      label: this._selectedLabel,
    };

    this.dispatchEvent(new CustomEvent('ai-annotation-add', {
      bubbles: true, composed: true,
      detail: { annotation, text },
    }));

    sel.removeAllRanges();
  }

  /** Sanitize color to prevent CSS injection — only allow hex, rgb, hsl, named colors */
  private _sanitizeColor(color: string): string {
    if (/^#[0-9a-fA-F]{3,8}$/.test(color)) return color;
    if (/^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/.test(color)) return color;
    if (/^[a-zA-Z]+$/.test(color)) return color; // named colors
    return '#a1a1aa'; // fallback
  }

  private _getLabelColor(name: string): string {
    const raw = this.labels.find(l => l.name === name)?.color || '#a1a1aa';
    return this._sanitizeColor(raw);
  }

  private _renderAnnotatedContent() {
    if (!this.content) return html`<div class="empty">No content to annotate</div>`;
    if (this.annotations.length === 0) return this.content;

    // Sort annotations by start position, handle overlaps by taking the first
    const sorted = [...this.annotations]
      .sort((a, b) => a.start - b.start || b.end - a.end);

    // Remove overlapping — keep first (earlier start or longer span)
    const nonOverlapping: Annotation[] = [];
    let lastEnd = -1;
    for (const ann of sorted) {
      if (ann.start >= lastEnd) {
        nonOverlapping.push(ann);
        lastEnd = ann.end;
      }
    }

    const fragments: (string | { text: string; annotation: Annotation })[] = [];
    let cursor = 0;

    for (const ann of nonOverlapping) {
      // Clamp to content bounds
      const start = Math.max(ann.start, cursor);
      const end = Math.min(ann.end, this.content.length);
      if (start >= end) continue;

      if (start > cursor) {
        fragments.push(this.content.slice(cursor, start));
      }
      fragments.push({
        text: this.content.slice(start, end),
        annotation: ann,
      });
      cursor = end;
    }
    if (cursor < this.content.length) {
      fragments.push(this.content.slice(cursor));
    }

    return fragments.map(f => {
      if (typeof f === 'string') return f;
      const color = this._getLabelColor(f.annotation.label);
      const opacity = f.annotation.confidence ?? 1;
      return html`
        <span class="annotated-span" tabindex="0" role="note"
          aria-label="${f.annotation.label}: ${f.text}"
          style="background: ${color}22; border-bottom: 2px solid ${color}; opacity: ${0.5 + opacity * 0.5}"
          @click=${() => this._handleAnnotationClick(f.annotation)}>
          <span class="annotation-label" style="background: ${color}; color: var(--cg-gray-black, #000000);">${f.annotation.label}</span>
          ${f.text}
          ${f.annotation.confidence !== undefined ? html`
            <span class="confidence-bar" style="background: ${color}; width: ${f.annotation.confidence * 100}%;"></span>
          ` : nothing}
        </span>
      `;
    });
  }

  override render() {
    return html`
      <div class="container" role="document" aria-label="Annotated text">
        ${this.editable || this.labels.length > 0 ? html`
          <div class="toolbar">
            <span class="toolbar-label">Labels:</span>
            ${this.labels.map(l => html`
              <button class="label-btn ${this._selectedLabel === l.name ? 'selected' : ''}"
                style="color: ${l.color}"
                @click=${() => { this._selectedLabel = this._selectedLabel === l.name ? '' : l.name; }}>
                <span class="label-dot" style="background: ${l.color}"></span>
                ${l.name}
              </button>
            `)}
            <span class="stats">${this.annotations.length} annotation${this.annotations.length !== 1 ? 's' : ''}</span>
          </div>
        ` : nothing}

        <div class="content" @mouseup=${this._handleMouseUp}>
          ${this._renderAnnotatedContent()}
        </div>
      </div>
    `;
  }
}
