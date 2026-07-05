import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

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
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      line-height: var(--cg-line-height-normal);
      color: var(--cg-color-surface-base-text);
      margin: 0;
    }

    :host([inline]) { display: inline; }

    /* Sizes */
    :host([size="xs"]) { font-size: var(--cg-font-size-xs); line-height: var(--cg-line-height-snug); }
    :host([size="sm"]) { font-size: var(--cg-font-size-sm); line-height: var(--cg-line-height-snug); }
    :host([size="md"]) { font-size: var(--cg-font-size-md); }
    :host([size="lg"]) { font-size: var(--cg-font-size-lg); }
    :host([size="xl"]) { font-size: var(--cg-font-size-xl); line-height: var(--cg-line-height-snug); }
    :host([size="2xl"]) { font-size: var(--cg-font-size-2xl); line-height: var(--cg-line-height-tight); }
    :host([size="3xl"]) { font-size: var(--cg-font-size-3xl); line-height: var(--cg-line-height-tight); }
    :host([size="4xl"]) { font-size: var(--cg-font-size-4xl); line-height: var(--cg-line-height-tight); letter-spacing: var(--cg-letter-spacing-tight); }

    /* Weights */
    :host([weight="normal"]) { font-weight: var(--cg-font-weight-normal); }
    :host([weight="medium"]) { font-weight: var(--cg-font-weight-medium); }
    :host([weight="semibold"]) { font-weight: var(--cg-font-weight-semibold); }
    :host([weight="bold"]) { font-weight: var(--cg-font-weight-bold); }

    /* Colors — 3-level text hierarchy: default → secondary → muted */
    :host([color="default"]) { color: var(--cg-color-surface-base-text); }
    :host([color="secondary"]) { color: var(--cg-color-surface-container-text); }
    :host([color="muted"]) { color: var(--cg-color-surface-container-outlined); }
    :host([color="accent"]) { color: var(--cg-color-accent-text); }
    :host([color="success"]) { color: var(--cg-color-status-success-text-default); }
    :host([color="warning"]) { color: var(--cg-color-status-warning-text-default); }
    :host([color="danger"]) { color: var(--cg-color-status-error-text-default); }
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
  `];

  @property() text = '';
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' = 'md';
  @property({ reflect: true }) weight: 'normal' | 'medium' | 'semibold' | 'bold' = 'normal';
  @property({ reflect: true }) color: 'default' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'danger' | 'inherit' = 'default';
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
        // clamp needs wrapping — override the truncate nowrap if both are set
        this.style.setProperty('white-space', 'normal');
        this.style.overflow = 'hidden';
      } else {
        // Give control back to the stylesheet (hostBlock block display,
        // :host([inline]) inline) instead of pinning an inline style.
        this.style.removeProperty('display');
        this.style.removeProperty('-webkit-line-clamp');
        this.style.removeProperty('-webkit-box-orient');
        this.style.removeProperty('white-space');
        this.style.overflow = '';
      }
    }
  }

  override render() {
    const content = this.text || html`<slot></slot>`;
    // Truncated/clamped text is unreadable — surface the full text on hover
    const title = (this.truncate || this.clamp > 0) && this.text ? this.text : undefined;
    switch (this.as) {
      case 'h1': return html`<h1 title=${ifDefined(title)}>${content}</h1>`;
      case 'h2': return html`<h2 title=${ifDefined(title)}>${content}</h2>`;
      case 'h3': return html`<h3 title=${ifDefined(title)}>${content}</h3>`;
      case 'h4': return html`<h4 title=${ifDefined(title)}>${content}</h4>`;
      case 'h5': return html`<h5 title=${ifDefined(title)}>${content}</h5>`;
      case 'h6': return html`<h6 title=${ifDefined(title)}>${content}</h6>`;
      case 'span': return html`<span title=${ifDefined(title)}>${content}</span>`;
      default: return html`<p title=${ifDefined(title)}>${content}</p>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-text': CgText;
  }
}
