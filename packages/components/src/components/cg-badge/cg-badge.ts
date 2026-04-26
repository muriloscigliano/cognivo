import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion, entranceStagger, dotPulseKeyframes } from '../../styles/index.js';

/**
 * @element cg-badge
 * Static semantic status label — display only, no interaction.
 *
 * If you need a clickable / removable / selectable pill, use `cg-chip` instead.
 * If you need a toolbar press-state button, use `cg-toggle`.
 *
 * @example
 * ```html
 * <cg-badge variant="success" label="Active" dot></cg-badge>
 * <cg-badge variant="danger" label="Error"></cg-badge>
 * <cg-badge variant="accent" size="lg">Custom</cg-badge>
 * ```
 *
 * @slot - Additional content after the label text
 *
 * @cssprop --cg-color-badge-background-default - Neutral badge background
 * @cssprop --cg-color-badge-text-default - Neutral badge text color
 * @cssprop --cg-component-badge-radius-md - Badge border radius (md)
 * @cssprop --cg-font-size-xs - Badge font size (12px)
 */
@customElement('cg-badge')
export class CgBadge extends LitElement {
  static override styles = [hostBase, reducedMotion, entranceStagger, dotPulseKeyframes, css`
    :host {
      animation: staggerFadeIn var(--cg-transition-duration-fast) ease-out both;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      font-weight: var(--cg-font-weight-medium);
      white-space: nowrap;
      border: var(--cg-border-width-50) solid transparent;
      transition: background-color var(--cg-transition-duration-fast) ease, border-color var(--cg-transition-duration-fast) ease, opacity var(--cg-transition-duration-fast) ease;
    }

    /* Sizes */
    :host([size="sm"]) .badge {
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      border-radius: var(--cg-component-badge-radius-sm);
    }
    :host([size="md"]) .badge {
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      font-size: var(--cg-font-size-sm);
      border-radius: var(--cg-component-badge-radius-md);
    }
    :host([size="lg"]) .badge {
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      font-size: var(--cg-font-size-base);
      border-radius: var(--cg-component-badge-radius-lg);
    }

    /* Variants */
    :host([variant="neutral"]) .badge {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-container-text);
      border-color: var(--cg-color-surface-container-border);
    }
    :host([variant="info"]) .badge {
      background: var(--cg-color-badge-background-default);
      color: var(--cg-color-badge-text-default);
      border-color: var(--cg-color-status-info-border-default);
    }
    :host([variant="success"]) .badge {
      background: var(--cg-color-badge-background-success);
      color: var(--cg-color-badge-text-success);
      border-color: var(--cg-color-status-success-border-default);
    }
    :host([variant="warning"]) .badge {
      background: var(--cg-color-badge-background-warning);
      color: var(--cg-color-badge-text-warning);
      border-color: var(--cg-color-status-warning-border-default);
    }
    :host([variant="danger"]) .badge {
      background: var(--cg-color-badge-background-error);
      color: var(--cg-color-badge-text-error);
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([variant="accent"]) .badge {
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-action-primary-background-default);
      border-color: var(--cg-overlay-accent-strong);
    }

    /* Rounded variants */
    :host([rounded="none"]) .badge { border-radius: 0; }
    :host([rounded="sm"]) .badge { border-radius: var(--cg-component-badge-radius-sm); }
    :host([rounded="md"]) .badge { border-radius: var(--cg-component-badge-radius-md); }
    :host([rounded="lg"]) .badge { border-radius: var(--cg-component-badge-radius-lg); }
    :host([rounded="full"]) .badge { border-radius: var(--cg-border-radius-full); }

    /* Dot indicator */
    .dot {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      background: currentColor;
      flex-shrink: 0;
      animation: dotPulse 2s ease-in-out infinite;
    }

  `];

  @property({ reflect: true }) variant: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent' = 'neutral';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @property() label = '';
  @property({ type: Boolean }) dot = false;

  override render() {
    return html`
      <span class="badge" role=${this.dot ? 'status' : 'presentation'}>
        ${this.dot ? html`<span class="dot"></span>` : nothing}
        <span class="text">${this.label}<slot></slot></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-badge': CgBadge;
  }
}
