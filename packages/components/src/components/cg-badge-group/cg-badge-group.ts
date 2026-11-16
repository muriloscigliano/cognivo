import { LitElement, html, css, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-badge-group', {
  label: 'Badge group',
  more: '{n} more items',
});

/**
 * <cg-badge-group> — Container for a group of badges/tags.
 *
 * Features:
 * - Horizontal wrap layout with configurable gap
 * - Optional label above the group
 * - Max visible count with "+N more" overflow indicator
 */
@customElement('cg-badge-group')
export class CgBadgeGroup extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary);
    }

    .label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: var(--cg-spacing-8);
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    :host([gap="xs"]) .badges { gap: var(--cg-spacing-4); }
    :host([gap="sm"]) .badges { gap: var(--cg-spacing-6); }
    :host([gap="md"]) .badges { gap: var(--cg-spacing-8); }
    :host([gap="lg"]) .badges { gap: var(--cg-spacing-12); }

    .overflow {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      /* Paired text token for the secondary surface — legible (gray-100 on
         gray-800) vs the placeholder gray-500 which failed AA here. */
      color: var(--cg-color-action-secondary-text-default);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      background: var(--cg-color-action-secondary-background-default);
      border-radius: var(--cg-border-radius-100);
      cursor: default;
    }
  `];

  /** Optional label displayed above the badge group. */
  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

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
      <div class="badges" role="group" aria-label=${this.label || this.i18n.t('label')}>
        <slot></slot>
        ${overflowCount > 0 ? html`<span class="overflow" aria-label=${this.i18n.t('more', { n: overflowCount })}>+${overflowCount}</span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-badge-group': CgBadgeGroup; }
}
