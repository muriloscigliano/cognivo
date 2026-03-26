import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-badge-group> — Container for a group of badges/tags.
 *
 * Features:
 * - Horizontal wrap layout with configurable gap
 * - Optional label above the group
 * - Max visible count with "+N more" overflow indicator
 * - Configurable size passed to children
 */
@customElement('cg-badge-group')
export class CgBadgeGroup extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-gray-500, #71717a);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: var(--cg-spacing-8, 8px);
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    :host([gap="xs"]) .badges { gap: var(--cg-spacing-4, 4px); }
    :host([gap="sm"]) .badges { gap: 6px; }
    :host([gap="md"]) .badges { gap: var(--cg-spacing-8, 8px); }
    :host([gap="lg"]) .badges { gap: var(--cg-spacing-12, 12px); }

    .overflow {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-gray-500, #71717a);
      padding: 2px 8px;
      background: var(--cg-gray-200, #e4e4e7);
      border-radius: var(--cg-border-radius-100, 8px);
      cursor: default;
    }
  `;

  /** Optional label displayed above the badge group. */
  @property() label = '';

  /** Gap between badges. */
  @property({ reflect: true }) gap: 'xs' | 'sm' | 'md' | 'lg' = 'sm';

  /** Max number of visible badges. 0 = show all. */
  @property({ type: Number }) max = 0;

  /** Total count (for overflow calculation when using max). */
  @property({ type: Number }) total = 0;

  override render() {
    const overflowCount = this.max > 0 && this.total > this.max ? this.total - this.max : 0;

    return html`
      ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
      <div class="badges" role="group" aria-label=${this.label || 'Badge group'}>
        <slot></slot>
        ${overflowCount > 0 ? html`<span class="overflow" title="${overflowCount} more items">+${overflowCount}</span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-badge-group': CgBadgeGroup; }
}
