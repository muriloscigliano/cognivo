import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-text> — Semantic typography component.
 *
 * Features beyond OpenUI's TextContent:
 * - Renders proper semantic HTML (h1-h6, p, span) based on `as` prop
 * - Truncation with ellipsis
 * - Line clamping
 * - All weights and colors via tokens
 */
@customElement('cg-text')
export class CgText extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      line-height: var(--cg-line-height-normal, 1.5);
      color: var(--cg-color-surface-base-text, #fafafa);
      margin: 0;
    }

    :host([inline]) { display: inline; }

    /* Sizes */
    :host([size="xs"]) { font-size: var(--cg-font-size-xs, 12px); line-height: 1.4; }
    :host([size="sm"]) { font-size: var(--cg-font-size-sm, 14px); line-height: 1.45; }
    :host([size="md"]) { font-size: var(--cg-font-size-md, 18px); }
    :host([size="lg"]) { font-size: var(--cg-font-size-lg, 20px); }
    :host([size="xl"]) { font-size: var(--cg-font-size-xl, 24px); line-height: 1.4; }
    :host([size="2xl"]) { font-size: var(--cg-font-size-2xl, 30px); line-height: 1.35; }
    :host([size="3xl"]) { font-size: var(--cg-font-size-3xl, 36px); line-height: 1.3; }
    :host([size="4xl"]) { font-size: var(--cg-font-size-4xl, 48px); line-height: var(--cg-line-height-tight, 1.2); letter-spacing: -0.02em; }

    /* Weights */
    :host([weight="normal"]) { font-weight: 400; }
    :host([weight="medium"]) { font-weight: var(--cg-font-weight-medium, 500); }
    :host([weight="semibold"]) { font-weight: var(--cg-font-weight-semibold, 600); }
    :host([weight="bold"]) { font-weight: var(--cg-font-weight-bold, 700); }

    /* Colors */
    :host([color="default"]) { color: var(--cg-color-surface-base-text, #fafafa); }
    :host([color="muted"]) { color: var(--cg-gray-500, #71717a); }
    :host([color="accent"]) { color: var(--cg-text-accent, #e5ff6b); }
    :host([color="success"]) { color: var(--cg-color-status-success-text-default, #4ade80); }
    :host([color="warning"]) { color: var(--cg-text-warning, #f59e0b); }
    :host([color="danger"]) { color: var(--cg-text-danger, #ef4444); }
    :host([color="inherit"]) { color: inherit; }

    /* Alignment */
    :host([align="left"]) { text-align: left; }
    :host([align="center"]) { text-align: center; }
    :host([align="right"]) { text-align: right; }

    /* Truncation */
    :host([truncate]) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Inner element resets */
    h1, h2, h3, h4, h5, h6, p, span {
      margin: 0;
      padding: 0;
      font: inherit;
      color: inherit;
    }
  `;

  @property() text = '';
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' = 'md';
  @property({ reflect: true }) weight: 'normal' | 'medium' | 'semibold' | 'bold' = 'normal';
  @property({ reflect: true }) color: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'danger' | 'inherit' = 'default';
  @property({ reflect: true }) align: 'left' | 'center' | 'right' = 'left';
  @property({ reflect: true }) as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' = 'p';
  @property({ type: Boolean, reflect: true }) truncate = false;
  @property({ type: Boolean, reflect: true }) inline = false;
  @property({ type: Number }) clamp = 0;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('clamp')) {
      if (this.clamp > 0) {
        this.style.display = '-webkit-box';
        this.style.setProperty('-webkit-line-clamp', String(this.clamp));
        this.style.setProperty('-webkit-box-orient', 'vertical');
        this.style.overflow = 'hidden';
      } else {
        this.style.display = '';
        this.style.removeProperty('-webkit-line-clamp');
        this.style.removeProperty('-webkit-box-orient');
        this.style.overflow = '';
      }
    }
  }

  override render() {
    const content = this.text || html`<slot></slot>`;
    switch (this.as) {
      case 'h1': return html`<h1>${content}</h1>`;
      case 'h2': return html`<h2>${content}</h2>`;
      case 'h3': return html`<h3>${content}</h3>`;
      case 'h4': return html`<h4>${content}</h4>`;
      case 'h5': return html`<h5>${content}</h5>`;
      case 'h6': return html`<h6>${content}</h6>`;
      case 'span': return html`<span>${content}</span>`;
      default: return html`<p>${content}</p>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-text': CgText;
  }
}
