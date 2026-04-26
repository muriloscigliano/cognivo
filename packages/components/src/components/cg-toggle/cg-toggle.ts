import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-toggle
 * Single press-state button. Uses aria-pressed for toggle semantics.
 * Different from cg-switch (on/off) and cg-button (action).
 *
 * @example
 * ```html
 * <cg-toggle pressed>Bold</cg-toggle>
 * <cg-toggle variant="outline">Italic</cg-toggle>
 * ```
 *
 * @slot - Toggle content (text, icon)
 *
 * @fires {CustomEvent<{pressed: boolean, value: string}>} cg-toggle-change
 */
@customElement('cg-toggle')
export class CgToggle extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-6);
      height: var(--cg-component-toggle-height-md);
      padding: 0 var(--cg-spacing-12);
      border: var(--cg-border-width-50) solid transparent;
      border-radius: var(--cg-component-toggle-radius);
      background: transparent;
      color: var(--cg-color-surface-base-text);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      user-select: none;
      transition:
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    /* Force slotted content to inherit the button's color. !important is
       required because page-level element rules on strong/em/u have higher
       specificity than ::slotted(asterisk) and would otherwise win the
       cascade, breaking pressed-state contrast. */
    ::slotted(*) {
      color: inherit !important;
    }

    /* Sizes */
    :host([size="sm"]) button {
      height: var(--cg-component-toggle-height-sm);
      padding: 0 var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
    }
    :host([size="lg"]) button {
      height: var(--cg-component-toggle-height-lg);
      padding: 0 var(--cg-spacing-16);
      font-size: var(--cg-font-size-base);
    }

    /* Variants */
    :host([variant="outline"]) button {
      border-color: var(--cg-color-surface-cards-border);
    }
    :host([variant="solid"]) button {
      background: var(--cg-color-action-secondary-background-default);
    }

    /* Hover — each variant hovers within its own surface family. */
    :host([variant="ghost"]) button:hover:not(:disabled),
    :host(:not([variant])) button:hover:not(:disabled) {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    :host([variant="outline"]) button:hover:not(:disabled) {
      background: var(--cg-color-action-tertiary-background-hover);
      border-color: var(--cg-color-input-border-hover);
    }
    :host([variant="solid"]) button:hover:not(:disabled) {
      background: var(--cg-color-action-secondary-background-hover);
    }

    /* Pressed — each variant has a *visually distinct* signature so the
       three press states aren't confusable:
         ghost   = BG-only marker (soft accent tint, no border)
         outline = BORDER-led marker (accent border + hairline tint)
         solid   = FILL-led marker (full brand bg + elevation) */

    /* Ghost pressed — BG TINT only. Text stays the normal body color so
       the signal is the fill, not a color shift. Subtle indicator. */
    :host([pressed]) button,
    :host([variant="ghost"][pressed]) button {
      background: var(--cg-overlay-accent-medium);
      color: var(--cg-color-surface-base-text);
      border-color: transparent;
      box-shadow: none;
    }
    :host([pressed]) button:hover:not(:disabled),
    :host([variant="ghost"][pressed]) button:hover:not(:disabled) {
      background: var(--cg-overlay-accent-strong);
    }

    /* Outline pressed — ACCENT BORDER + ACCENT TEXT. Border is the signal,
       text colour reinforces it. Visually distinct from ghost (which keeps
       normal text color). Border-width stays stable via inset shadow to
       avoid a 1px layout shift on press. */
    :host([variant="outline"][pressed]) button {
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-accent-text);
      border-color: var(--cg-color-action-primary-background-default);
      box-shadow: inset 0 0 0 var(--cg-border-width-50) var(--cg-color-action-primary-background-default);
    }
    :host([variant="outline"][pressed]) button:hover:not(:disabled) {
      background: var(--cg-overlay-accent-medium);
    }

    /* Solid pressed — full brand fill with elevation. */
    :host([variant="solid"][pressed]) button {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-border-default);
      box-shadow: var(--cg-shadow-elevation-sm);
    }
    :host([variant="solid"][pressed]) button:hover:not(:disabled) {
      background: var(--cg-color-action-primary-background-hover);
    }

    /* Press feedback */
    button:active:not(:disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }

    /* Focus */
    button:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    /* Disabled */
    :host([disabled]) button {
      opacity: 0.45;
      cursor: not-allowed;
    }

    /* Rounded variants */
    :host([rounded="none"]) button { border-radius: 0; }
    :host([rounded="sm"]) button { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) button { border-radius: var(--cg-component-toggle-radius); }
    :host([rounded="lg"]) button { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) button { border-radius: var(--cg-border-radius-full); }
  `];

  static formAssociated = true;
  private _internals?: ElementInternals;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  @property({ type: Boolean, reflect: true }) pressed = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) variant: 'ghost' | 'outline' | 'solid' = 'ghost';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @property() value = '';
  @property() name = '';

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('pressed') || changed.has('value')) {
      this._internals?.setFormValue(this.pressed ? this.value : null);
    }
  }

  private _toggle(): void {
    if (this.disabled) return;
    this.pressed = !this.pressed;
    this.dispatchEvent(new CustomEvent('cg-toggle-change', {
      detail: { pressed: this.pressed, value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <button
        type="button"
        aria-pressed=${this.pressed ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this._toggle}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-toggle': CgToggle;
  }
}
