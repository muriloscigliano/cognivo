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
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
    }

    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
    }

    /* Toolbar — compact, no label text */
    .toolbar {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12) var(--cg-spacing-20);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      flex-wrap: wrap;
    }
    .label-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid transparent;
      background: none;
      font: inherit;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .label-btn:hover { background: var(--cg-overlay-dark-subtle); }
    .label-btn.selected { border-color: currentColor; background: var(--cg-overlay-dark-subtle); }
    .label-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
    }

    .stats {
      margin-left: auto;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      font-family: var(--cg-font-family-mono);
    }

    /* Content */
    .content {
      padding: var(--cg-spacing-20) var(--cg-spacing-24);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
      color: var(--cg-color-surface-base-text);
      user-select: text;
      cursor: text;
    }

    .annotated-span {
      cursor: pointer;
      border-bottom: var(--cg-border-width-100) solid;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .annotated-span:hover { opacity: 0.7; }
    .annotated-span:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    /* Inline tag — shows on click */
    .annotation-tag {
      display: inline;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      padding: var(--cg-spacing-1) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      margin-left: var(--cg-spacing-2);
      vertical-align: middle;
      line-height: 1;
    }

    /* Empty */
    .empty {
      padding: var(--cg-spacing-24);
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    /* Reduced motion: disable entrance animation, show labels immediately */
    @media (prefers-reduced-motion: reduce) {
      :host {
        animation: none !important;
      }
      .annotation-label {
        opacity: 1;
        transition: none !important;
      }
      .annotated-span {
        transition: none !important;
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
    { name: 'Concept', color: '#dfff61' },
  ];

  /** Allow creating new annotations */
  @property({ type: Boolean }) editable: boolean = false;

  @state() private _selectedLabel: string = '';
  @state() private _activeAnnotation: Annotation | null = null;

  private _handleAnnotationClick(annotation: Annotation) {
    this._activeAnnotation = this._activeAnnotation === annotation ? null : annotation;
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
      const isActive = this._activeAnnotation === f.annotation;
      return html`<span class="annotated-span" tabindex="0" role="note"
          aria-label="${f.annotation.label}: ${f.text}"
          style="border-color: ${color}"
          @click=${() => this._handleAnnotationClick(f.annotation)}>${f.text}</span>${isActive ? html`<span class="annotation-tag" style="background: ${color}; color: var(--cg-overlay-dark-text);">${f.annotation.label}${f.annotation.confidence !== undefined ? html` · ${Math.round(f.annotation.confidence * 100)}%` : nothing}</span>` : nothing}`;
    });
  }

  override render() {
    return html`
      <div class="container" role="document" aria-label="Annotated text">
        ${this.editable || this.labels.length > 0 ? html`
          <div class="toolbar">
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
