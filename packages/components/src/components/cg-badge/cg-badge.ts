import { LitElement, html, css, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
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
 * One size: 28 px tall (`--cg-component-badge-height`), 12 px / 500, a full
 * pill (`rounded` still overrides the corner), a ~8 % tint and no border.
 * `size` is accepted for compatibility and changes nothing.
 *
 * @cssprop --cg-component-badge-height - Badge height (28px)
 * @cssprop --cg-font-size-xs - Badge font size (12px)
 */
@customElement('cg-badge')
export class CgBadge extends LitElement {
  static override styles = [hostBase, reducedMotion, entranceStagger, dotPulseKeyframes, css`
    :host {
      animation: staggerFadeIn var(--cg-transition-duration-fast) ease-out both;
    }
    /* Collapse a truly-empty badge (no label, no dot, no slotted text) so it
       doesn't render as a stray padded/bordered pill. Slot-only usage still
       renders because .text:empty is false when slotted text is present. */
    :host(:not([dot])) .badge:has(.text:empty) {
      display: none;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      font-weight: var(--cg-font-weight-medium);
      white-space: nowrap;
      /* One size (sm / md / lg all render it): a 28 px soft pill, no border. */
      box-sizing: border-box;
      height: var(--cg-component-badge-height);
      padding: 0 var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      border-radius: var(--cg-border-radius-full);
      transition: background-color var(--cg-transition-duration-fast) ease, border-color var(--cg-transition-duration-fast) ease, opacity var(--cg-transition-duration-fast) ease;
    }

    /* Variants: a ~8 % tint of the status hue (colour is rare), no border. */
    :host([variant="neutral"]) .badge {
      background: var(--cg-color-badge-background-neutral);
      color: var(--cg-color-badge-text-neutral);
    }
    :host([variant="info"]) .badge {
      background: var(--cg-color-badge-background-default);
      color: var(--cg-color-badge-text-default);
    }
    :host([variant="success"]) .badge {
      background: var(--cg-color-badge-background-success);
      color: var(--cg-color-badge-text-success);
    }
    :host([variant="warning"]) .badge {
      background: var(--cg-color-badge-background-warning);
      color: var(--cg-color-badge-text-warning);
    }
    :host([variant="danger"]) .badge {
      background: var(--cg-color-badge-background-error);
      color: var(--cg-color-badge-text-error);
    }
    :host([variant="accent"]) .badge {
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-accent-text);
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
  /** Kept for compatibility: every size renders the one 28 px badge. */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'full';
  @property() label = '';
  @property({ type: Boolean }) dot = false;

  override render() {
    // No role override: a badge is a styled inline label whose text is read
    // natively. role="status" made every dotted badge a polite live region
    // (spurious announcements on mount); role="presentation" hid its own
    // semantics. A plain <span> is correct for a static label.
    return html`
      <span class="badge">
        ${this.dot ? html`<span class="dot" aria-hidden="true"></span>` : nothing}
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
