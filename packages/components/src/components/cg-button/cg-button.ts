import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { isSafeHref } from '../../utils/safe-href.js';
import { formInternals } from '../../utils/form-internals.js';
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
 * <cg-button href="/deals/new" variant="secondary">New deal</cg-button>
 * ```
 *
 * Link mode: with `href` it renders an `<a>` styled as the button (keeps
 * `target`, `rel`, `download` — a bare `download` too); disabled or loading,
 * it is a disabled link (`aria-disabled`, no `href`, out of the tab order).
 * A `javascript:`, `data:` or `vbscript:` href is refused: the link renders
 * disabled. `target="_blank"` gets `rel="noopener noreferrer"` unless `rel`
 * is set. A link-mode button is never a form's default (submit) button. Form types do nothing
 * in link mode.
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
    this._internals = formInternals(this);
    // On the host, not the inner <button>: a click on the inner button
    // bubbles here, and so does host.click() — which is how a form's
    // implicit submission (Enter in a field) activates its default button.
    this.addEventListener('click', this._handleClick);
  }

  static override styles = [hostBase, reducedMotion, spinKeyframes, css`
    .btn {
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
      /* Interaction states: colour only, 150ms ease-out; nothing moves. */
      transition-property: background-color, color, border-color, box-shadow;
      transition-duration: var(--cg-transition-duration-state);
      transition-timing-function: var(--cg-transition-easing-ease-out);
      -webkit-font-smoothing: antialiased;
      position: relative;
    }

    /* Hover / pressed: a neutral state overlay on the variant's own colour
       (never an accent); primary instead steps to its own hover / pressed
       tokens (--_p, read only by primary). Hover only where the device
       hovers; touch gets pressed. */
    @media (hover: hover) {
      .btn:not(:disabled, [aria-disabled="true"]):hover { --_s: var(--cg-color-state-hover); --_p: var(--cg-color-action-primary-background-hover); }
      :host([type="danger"]) .btn:not(:disabled, [aria-disabled="true"]):hover,
      :host([status="error"]) .btn:not(:disabled, [aria-disabled="true"]):hover {
        background-color: var(--cg-color-status-error-background-hover);
      }
      :host([type="danger"][variant="primary"]) .btn:not(:disabled, [aria-disabled="true"]):hover {
        background-color: var(--cg-color-status-error-background-hover-strong);
      }
      :host([status="success"]) .btn:not(:disabled, [aria-disabled="true"]):hover {
        background-color: var(--cg-color-status-success-background-hover);
      }
    }
    .btn:not(:disabled, [aria-disabled="true"]):active { --_s: var(--cg-color-state-pressed); --_p: var(--cg-color-action-primary-background-active); }
    /* Primary: no overlay, its own step (--_p) instead; danger / status keep the overlay. */
    :host([variant="primary"]:not([type="danger"], [status="error"], [status="success"])) .btn { --_s: initial; }
    /* No state set: var(--_s) is invalid, so the image computes to none. */
    .btn:not(:disabled, [aria-disabled="true"]) { background-image: linear-gradient(var(--_s), var(--_s)); }

    /* Focus ring — dual-layer */
    .btn:focus-visible {
      box-shadow:
        0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
      outline: none;
    }

    /* ── Sizes ── */
    :host([size="sm"]) .btn {
      padding: 0 var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      border-radius: var(--cg-component-button-radius-sm);
      height: var(--cg-component-button-height-sm);
    }
    :host([size="md"]) .btn {
      padding: 0 var(--cg-spacing-16);
      font-size: var(--cg-font-size-sm);
      border-radius: var(--cg-component-button-radius-md);
      height: var(--cg-component-button-height-md);
    }
    :host([size="lg"]) .btn {
      padding: 0 var(--cg-spacing-24);
      font-size: var(--cg-font-size-base);
      border-radius: var(--cg-component-button-radius-lg);
      height: var(--cg-component-button-height-lg);
    }

    /* ── Rounded overrides ── */
    :host([rounded="none"]) .btn { border-radius: 0; }
    :host([rounded="sm"]) .btn { border-radius: var(--cg-component-button-radius-sm); }
    :host([rounded="md"]) .btn { border-radius: var(--cg-component-button-radius-md); }
    :host([rounded="lg"]) .btn { border-radius: var(--cg-component-button-radius-lg); }
    :host([rounded="full"]) .btn { border-radius: var(--cg-border-radius-full); }

    /* ── Primary variant ── */
    :host([variant="primary"]) .btn {
      background-color: var(--_p, var(--cg-color-action-primary-background-default));
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-border-default);
    }

    /* ── Secondary variant ── */
    :host([variant="secondary"]) .btn {
      background-color: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-action-secondary-text-default);
      border-color: var(--cg-color-action-secondary-border-default);
    }

    /* ── Tertiary (ghost) variant ── */
    :host([variant="tertiary"]) .btn {
      background-color: transparent;
      color: var(--cg-color-action-tertiary-text-default);
      border-color: transparent;
    }

    /* ── Danger type and error state ── */
    :host([type="danger"]) .btn,
    :host([status="error"]) .btn {
      background-color: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([type="danger"][variant="primary"]) .btn {
      background-color: var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-inverse);
      border-color: transparent;
    }

    /* ── Disabled: the variant's own colours at 40% opacity, no hover, not-allowed. ── */
    .btn:is(:disabled, [aria-disabled="true"]) {
      opacity: var(--cg-opacity-40);
      cursor: not-allowed;
    }
    /* ── Loading ── */
    :host([loading]) .btn {
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
    :host([loading]) .spinner { color: var(--cg-color-action-primary-text-default); /* contrast: non-text on --cg-color-action-primary-background-default */ }
    :host([loading][variant="secondary"]) .spinner { color: var(--cg-color-action-secondary-text-default); /* contrast: non-text on --cg-color-action-secondary-background-default */ }
    :host([loading][variant="tertiary"]) .spinner { color: var(--cg-color-action-tertiary-text-default); }

    /* ── Error state (colours: with the danger type above) ── */
    :host([status="error"]) .spinner { color: var(--cg-color-status-error-text-default); }

    /* ── Success state ── */
    :host([status="success"]) .btn {
      background-color: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
      border-color: var(--cg-color-status-success-border-default);
    }
    :host([status="success"]) .spinner { color: var(--cg-color-status-success-text-default); }

    /* ── Full width ── */
    :host([full]) {
      display: block;
      width: 100%;
    }
    :host([full]) .btn {
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
  /** Link mode: renders an `<a href>` with the button's look (navigation,
   *  middle-click, "open in new tab" all work). Disabled or loading, it is a
   *  disabled link: no `href`, `aria-disabled="true"`, not focusable. */
  @property() href = '';
  /** Link mode: the `<a>`'s `target` (e.g. `_blank`). */
  @property() target = '';
  /** Link mode: the `<a>`'s `rel`. Default with `target="_blank"`: `noopener noreferrer`. */
  @property() rel = '';
  /** Link mode: the `<a>`'s `download`: a file name, or `''` (a bare
   *  `download` attribute) to let the browser name it; `null` for none. */
  @property() download: string | null = null;
  /** Menu button (set by cg-dropdown): `"true"` / `"false"` makes the inner
   *  button `aria-haspopup="menu"` with that `aria-expanded`; `""` for neither. */
  @property() expanded: '' | 'true' | 'false' = '';

  /** Disabled by an ancestor `<fieldset disabled>` (or the own attribute). */
  @state() private _formDisabled = false;

  formDisabledCallback(disabled: boolean) {
    this._formDisabled = disabled;
  }

  /** Focus the inner button / link (the host itself is not focusable). */
  override focus(options?: FocusOptions): void {
    const inner = this.renderRoot?.querySelector?.<HTMLElement>('[part="button"]');
    if (inner) inner.focus(options);
    else super.focus(options);
  }

  private _handleClick = () => {
    if (this.href || this.disabled || this._formDisabled || this.loading) return;
    if (this.type !== 'submit' && this.type !== 'reset') return;
    const form = this._internals?.form ?? this.closest('form');
    if (!form) return;
    // Call through the prototype: a control named/id'd "submit" or "reset"
    // shadows form.requestSubmit / form.reset (named-property access).
    if (this.type === 'submit') HTMLFormElement.prototype.requestSubmit.call(form);
    else HTMLFormElement.prototype.reset.call(form);
  };

  override render() {
    const content = html`${this.loading ? html`<span class="spinner"></span>` : nothing}<slot name="prefix"></slot><slot>${this.label}</slot><slot name="suffix"></slot>`;
    if (this.href) {
      // Disabled link: no href (so not focusable and not followable), still a
      // link. A script/data URL is refused the same way. target=_blank gets
      // rel="noopener noreferrer" unless a rel is given.
      const inactive = this.disabled || this._formDisabled || this.loading || !isSafeHref(this.href);
      return html`<a part="button" class="btn" href=${inactive ? nothing : this.href} role=${inactive ? 'link' : nothing} aria-disabled=${inactive ? 'true' : nothing} aria-busy=${this.loading ? 'true' : nothing} aria-label=${this.label || nothing} target=${this.target || nothing} rel=${this.rel || (this.target === '_blank' ? 'noopener noreferrer' : nothing)} download=${this.download ?? nothing}>${content}</a>`;
    }
    return html`<button part="button" class="btn" type="button" ?disabled=${this.disabled || this._formDisabled || this.loading} aria-busy=${this.loading ? 'true' : 'false'} aria-label=${this.label || nothing} aria-haspopup=${this.expanded ? 'menu' : nothing} aria-expanded=${this.expanded || nothing}>${content}</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-button': CgButton;
  }
}
// touch Mon Apr 13 18:29:50 AEST 2026
