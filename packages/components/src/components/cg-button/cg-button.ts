import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBase, reducedMotion, spinKeyframes } from '../../styles/index.js';

/**
 * @element cg-button
 * A button with variants, sizes, loading state, and press feedback.
 *
 * @example
 * ```html
 * <cg-button variant="primary" size="md">Click me</cg-button>
 * <cg-button variant="secondary" loading>Saving...</cg-button>
 * <cg-button type="danger"><span slot="prefix">[trash icon]</span>Delete</cg-button>
 * <form><cg-input name="email"></cg-input><cg-button type="submit">Send</cg-button></form>
 * ```
 *
 * Form behaviour: `type="submit"` calls `requestSubmit()` on the owning form
 * (runs constraint validation and fires `submit`), `type="reset"` resets it.
 * Any other type (default `normal`, `danger`, `button`) never submits.
 * Disabled, loading, or inside a `<fieldset disabled>`: never submits, and
 * Enter in a field does not submit when this is the form's default button.
 *
 * @slot - Default slot for button text/content
 * @slot prefix - Icon or content before the label
 * @slot suffix - Icon or content after the label
 *
 * @cssprop --cg-color-action-primary-background-default - Primary button background color
 * @cssprop --cg-component-button-height-md - Button height (md size, 48px)
 * @cssprop --cg-interaction-press-scale - Scale on press/active (0.97)
 * @cssprop --cg-transition-duration-fast - Color transition speed
 */
@customElement('cg-button')
export class CgButton extends LitElement {
  /** Form-associated so `type="submit"` / `"reset"` find their owning form
   *  (ElementInternals.form works across shadow boundaries). */
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
    // On the host, not the inner <button>: a click on the inner button
    // bubbles here, and so does host.click() — which is how a form's
    // implicit submission (Enter in a field) activates its default button.
    this.addEventListener('click', this._handleClick);
  }

  static override styles = [hostBase, reducedMotion, spinKeyframes, css`
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-8);
      border: var(--cg-border-width-50) solid transparent;
      cursor: pointer;
      font-family: inherit;
      font-weight: var(--cg-font-weight-medium);
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      -webkit-font-smoothing: antialiased;
      position: relative;
    }

    /* Press scale */
    button:active:not(:disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }

    /* Focus ring — dual-layer */
    button:focus-visible {
      box-shadow:
        0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
      outline: none;
    }

    /* ── Sizes ── */
    :host([size="sm"]) button {
      padding: 0 var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      border-radius: var(--cg-component-button-radius-sm);
      height: var(--cg-component-button-height-sm);
    }
    :host([size="md"]) button {
      padding: 0 var(--cg-spacing-16);
      font-size: var(--cg-font-size-sm);
      border-radius: var(--cg-component-button-radius-md);
      height: var(--cg-component-button-height-md);
    }
    :host([size="lg"]) button {
      padding: 0 var(--cg-spacing-24);
      font-size: var(--cg-font-size-base);
      border-radius: var(--cg-component-button-radius-lg);
      height: var(--cg-component-button-height-lg);
    }

    /* ── Rounded overrides ── */
    :host([rounded="none"]) button { border-radius: 0; }
    :host([rounded="sm"]) button { border-radius: var(--cg-component-button-radius-sm); }
    :host([rounded="md"]) button { border-radius: var(--cg-component-button-radius-md); }
    :host([rounded="lg"]) button { border-radius: var(--cg-component-button-radius-lg); }
    :host([rounded="full"]) button { border-radius: var(--cg-border-radius-full); }

    /* ── Primary variant ── */
    :host([variant="primary"]) button {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-border-default);
    }
    :host([variant="primary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-primary-background-hover);
    }

    /* ── Secondary variant ── */
    :host([variant="secondary"]) button {
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-action-secondary-text-default);
      border-color: var(--cg-color-action-secondary-border-default);
    }
    :host([variant="secondary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-secondary-background-hover);
    }

    /* ── Tertiary (ghost) variant ── */
    :host([variant="tertiary"]) button {
      background: transparent;
      color: var(--cg-color-action-tertiary-text-default);
      border-color: transparent;
    }
    :host([variant="tertiary"]) button:not(:disabled):hover {
      background: var(--cg-color-action-tertiary-background-hover);
    }

    /* ── Danger type ── */
    :host([type="danger"]) button {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([type="danger"][variant="primary"]) button {
      background: var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-inverse);
      border-color: transparent;
    }
    :host([type="danger"]) button:not(:disabled):hover {
      background: var(--cg-color-status-error-background-hover);
    }
    :host([type="danger"][variant="primary"]) button:not(:disabled):hover {
      background: var(--cg-color-status-error-background-hover-strong);
    }

    /* ── Disabled ──
       Themeable per-variant disabled colors (no opacity smudge on re-pointed brands).
       Scoped with :host so these win over the variant/type/status background rules. */
    button:disabled {
      pointer-events: none;
    }
    :host([variant="primary"]) button:disabled,
    :host([type="danger"][variant="primary"]) button:disabled,
    :host([status="error"]) button:disabled,
    :host([status="success"]) button:disabled {
      background: var(--cg-color-action-primary-background-disable);
      color: var(--cg-color-action-primary-text-disable);
      border-color: var(--cg-color-action-primary-border-disable);
    }
    :host([variant="secondary"]) button:disabled {
      background: var(--cg-color-action-secondary-background-disable);
      color: var(--cg-color-action-secondary-text-disable);
      border-color: var(--cg-color-action-secondary-border-disable);
    }
    :host([variant="tertiary"]) button:disabled {
      background: var(--cg-color-action-tertiary-background-disable);
      color: var(--cg-color-action-tertiary-text-disable);
      border-color: var(--cg-color-action-tertiary-border-disable);
    }

    /* ── Loading ── */
    :host([loading]) button {
      color: transparent;
      pointer-events: none;
    }
    .spinner {
      position: absolute;
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      border: var(--cg-border-width-100) solid currentColor;
      border-right-color: transparent;
      border-radius: var(--cg-border-radius-full);
      animation: spin var(--cg-transition-duration-slow) linear infinite;
    }
    :host([loading]) .spinner { color: var(--cg-color-action-primary-text-default); }
    :host([loading][variant="secondary"]) .spinner { color: var(--cg-color-action-secondary-text-default); }
    :host([loading][variant="tertiary"]) .spinner { color: var(--cg-color-action-tertiary-text-default); }

    /* ── Error state ── */
    :host([status="error"]) button {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([status="error"]) button:not(:disabled):hover {
      background: var(--cg-color-status-error-background-hover);
    }
    :host([status="error"]) .spinner { color: var(--cg-color-status-error-text-default); }

    /* ── Success state ── */
    :host([status="success"]) button {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
      border-color: var(--cg-color-status-success-border-default);
    }
    :host([status="success"]) button:not(:disabled):hover {
      background: var(--cg-color-status-success-background-hover);
    }
    :host([status="success"]) .spinner { color: var(--cg-color-status-success-text-default); }

    /* ── Full width ── */
    :host([full]) {
      display: block;
      width: 100%;
    }
    :host([full]) button {
      width: 100%;
    }
  `];

  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  /** `danger` is a visual intent; `submit` / `reset` are form actions. */
  @property({ reflect: true }) type: 'normal' | 'danger' | 'submit' | 'reset' | 'button' = 'normal';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) full = false;
  @property({ reflect: true }) status: 'idle' | 'error' | 'success' = 'idle';
  @property() label = '';

  /** Disabled by an ancestor `<fieldset disabled>` (or the own attribute). */
  @state() private _formDisabled = false;

  formDisabledCallback(disabled: boolean) {
    this._formDisabled = disabled;
  }

  private _handleClick = () => {
    if (this.disabled || this._formDisabled || this.loading) return;
    if (this.type !== 'submit' && this.type !== 'reset') return;
    const form = this._internals?.form ?? this.closest('form');
    if (!form) return;
    // Call through the prototype: a control named/id'd "submit" or "reset"
    // shadows form.requestSubmit / form.reset (named-property access).
    if (this.type === 'submit') HTMLFormElement.prototype.requestSubmit.call(form);
    else HTMLFormElement.prototype.reset.call(form);
  };

  override render() {
    return html`
      <button
        part="button"
        type="button"
        ?disabled=${this.disabled || this._formDisabled || this.loading}
        aria-busy=${this.loading ? 'true' : 'false'}
        aria-label=${this.label || nothing}
      >
        ${this.loading ? html`<span class="spinner"></span>` : nothing}
        <slot name="prefix"></slot>
        <slot>${this.label}</slot>
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-button': CgButton;
  }
}
// touch Mon Apr 13 18:29:50 AEST 2026
