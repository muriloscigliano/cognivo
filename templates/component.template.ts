/**
 * Component scaffold template — copy to packages/components/src/components/cg-{name}/cg-{name}.ts
 * and replace every occurrence of `cg-name` / `CgName` / `_name`.
 *
 * Conventions enforced by this template:
 *   - Lit 3 web component with Shadow DOM
 *   - Imports `hostBlock` + `reducedMotion` shared styles
 *   - Form-associated when the component is an input (delete if not)
 *   - JSDoc with @element / @example / @fires for the docs site
 *   - Reflected `size` and `variant` properties
 *   - Standard sections in CSS: :host → main → states → sizes → variants
 *   - Public method API surface defined before private handlers
 *   - declare global at the bottom for typed querySelector
 *
 * Read these before writing any CSS:
 *   - CLAUDE.token-guardrails.md
 *   - CLAUDE.semantic-rules.md
 *   - CLAUDE.known-bugs.md
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-name
 * Short purpose sentence (matches spec).
 *
 * @example
 * ```html
 * <cg-name></cg-name>
 * ```
 *
 * @fires {CustomEvent<{value: T}>} cg-name-change
 *
 * @slot - Default slot description.
 * @slot prefix - Prefix slot description.
 *
 * @cssprop [--cg-component-name-radius] - Component radius override
 */
@customElement('cg-name')
export class CgName extends LitElement {
  /** Delete this line + the constructor + _internals if NOT a form input */
  static formAssociated = true;
  private _internals?: ElementInternals;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  static override styles = [hostBlock, reducedMotion, css`
    /* ── Host ── */
    :host {
      display: inline-block;
      font-family: var(--cg-font-family-primary);
    }

    /* ── Main element ── */
    .root {
      /* Tier 3 first; Tier 2 for colors; Tier 1 for spacing/font/etc. */
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-name-radius);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      cursor: pointer;
      /* NEVER transition: all */
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    /* ── States ── */
    .root:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover);
    }
    .root:active:not(.disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .root:focus-visible {
      outline: none;
      /* Choose ONE focus-ring family per the rules in CLAUDE.semantic-rules.md:
       *   • Input-family (single layer, raw 3px): box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
       *   • Button/grid-family (2-layer offset/width):
       */
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .root.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ── Error / Success (delete if not applicable) ── */
    :host([error]) .root { border-color: var(--cg-color-status-error-border-default); }
    :host([error]) .root:focus-visible {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }
    :host([success]) .root { border-color: var(--cg-color-status-success-border-default); }
    :host([success]) .root:focus-visible {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-success);
    }

    /* ── Sizes ── */
    :host([size="sm"]) .root { /* tier-3 size tokens here */ }
    :host([size="md"]) .root { /* default already set above */ }
    :host([size="lg"]) .root { /* tier-3 size tokens here */ }

    /* ── Variants ── */
    :host([variant="primary"]) .root {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-border-default);
    }
    :host([variant="secondary"]) .root {
      background: var(--cg-color-action-secondary-background-default);
    }

    /* ── Visually-hidden live region for SR announcements (delete if not announcing state) ── */
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
    }
  `];

  // ─── Public API ─────────────────────────────────────────────────────────────

  @property() value = '';
  @property() name = '';
  @property() label = '';
  @property() helper = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) variant: 'primary' | 'secondary' = 'primary';

  // ─── Internal state ─────────────────────────────────────────────────────────

  @state() private _announcement = '';

  @query('.root') private _rootEl!: HTMLElement;

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) {
      this._internals?.setFormValue(this.value);
    }
  }

  // ─── Public methods ─────────────────────────────────────────────────────────

  /** Programmatic focus. */
  override focus(): void {
    this._rootEl?.focus();
  }

  // ─── Private handlers ───────────────────────────────────────────────────────

  private _announce(message: string): void {
    this._announcement = '';
    requestAnimationFrame(() => { this._announcement = message; });
  }

  private _onClick(_e: MouseEvent): void {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('cg-name-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _onKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._onClick(e as unknown as MouseEvent);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  override render() {
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <div
        class="root ${this.disabled ? 'disabled' : ''}"
        role="button"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-invalid=${this.error ? 'true' : nothing}
        @click=${this._onClick}
        @keydown=${this._onKeydown}
      >
        <slot></slot>
      </div>
      ${this.helper ? html`<div class="helper">${this.helper}</div>` : nothing}
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">${this._announcement}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-name': CgName;
  }
}
