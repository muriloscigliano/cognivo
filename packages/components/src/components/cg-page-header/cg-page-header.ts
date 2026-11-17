import { LitElement, html, css, svg, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { isSafeHref } from '../../utils/safe-href.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-page-header
 * The one page header: an optional back link, the page title, a one-line
 * description and the page's actions on the title line.
 *
 * Measured to the dashboard direction: back link 13 px muted, 16 px above
 * the title (`--cg-component-page-header-back-gap`); title 24 px / 400,
 * near-black; description 13 px muted on one line (max 72 characters wide,
 * cut with an ellipsis, never two lines); actions aligned to the title's
 * baseline at the end of the line; 28 px below
 * (`--cg-component-page-header-gap-below`) to the toolbar or first card.
 *
 * The title is a heading (`level`, default 1).
 *
 * @example
 * ```html
 * <cg-page-header heading="Comeback" back-href="/sequences" back-label="Sequences"
 *   description="Starts after 30 days without an open or click.">
 *   <cg-button slot="actions" variant="secondary">Pause</cg-button>
 *   <cg-button slot="actions">Save</cg-button>
 * </cg-page-header>
 * ```
 *
 * @slot actions - Buttons on the title line (the page's primary action last)
 * @slot heading - Replaces the `heading` text (e.g. a title with a badge)
 *
 * @cssprop --cg-component-page-header-gap-below - Space below the header (28px)
 * @cssprop --cg-component-page-header-back-gap - Space between the back link and the title (16px)
 */
@customElement('cg-page-header')
export class CgPageHeader extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      margin-bottom: var(--cg-component-page-header-gap-below);
      color: var(--cg-color-state-text);
    }

    .back {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      margin-bottom: var(--cg-component-page-header-back-gap);
      font-size: var(--cg-font-size-13);
      line-height: var(--cg-line-height-normal);
      color: var(--cg-color-on-surface-container-default);
      text-decoration: none;
      border-radius: var(--cg-border-radius-50);
      transition: color var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
    }
    .back:hover { color: var(--cg-color-state-text); }
    .back:focus-visible {
      outline: none;
      text-decoration: underline;
      box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);
    }
    .back svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }
    .back-row { display: block; }

    .title-row {
      display: flex;
      align-items: baseline;
      gap: var(--cg-spacing-16);
      min-width: 0;
    }
    .title {
      flex: 1 1 auto;
      min-width: 0;
      margin: 0;
      font-size: var(--cg-font-size-xl);
      font-weight: var(--cg-font-weight-normal);
      line-height: var(--cg-line-height-tight);
      overflow-wrap: anywhere;
    }
    .actions {
      display: flex;
      align-items: baseline;
      gap: var(--cg-spacing-8);
      flex-shrink: 0;
      margin-inline-start: auto;
    }
    .actions[hidden] { display: none; }

    .description {
      max-width: 72ch;
      margin: var(--cg-spacing-4) 0 0;
      font-size: var(--cg-font-size-13);
      line-height: var(--cg-line-height-normal);
      color: var(--cg-color-on-surface-container-default);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `];

  /** The page title. */
  @property() heading = '';
  /** One line under the title (cut with an ellipsis; the full text is its `title`). */
  @property() description = '';
  /** Back link target; with `back-label`, a "‹ Label" link above the title. */
  @property({ attribute: 'back-href' }) backHref = '';
  /** Back link text (the parent page's name). */
  @property({ attribute: 'back-label' }) backLabel = '';
  /** Heading level of the title (1–6). */
  @property({ type: Number }) level = 1;

  private _hasActions = false;

  private _onActions(e: Event) {
    this._hasActions = (e.target as HTMLSlotElement).assignedElements().length > 0;
    this.renderRoot.querySelector('.actions')?.toggleAttribute('hidden', !this._hasActions);
  }

  override render() {
    const level = Math.min(6, Math.max(1, Math.round(this.level) || 1));
    return html`
      ${this.backHref && this.backLabel && isSafeHref(this.backHref) ? html`
        <div class="back-row"><a class="back" href=${this.backHref}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${svg`<path d="M15 18l-6-6 6-6"></path>`}</svg>
          ${this.backLabel}
        </a></div>` : nothing}
      <div class="title-row">
        <div class="title" role="heading" aria-level=${level}><slot name="heading">${this.heading}</slot></div>
        <div class="actions" ?hidden=${!this._hasActions}><slot name="actions" @slotchange=${this._onActions}></slot></div>
      </div>
      ${this.description ? html`<p class="description" title=${this.description}>${this.description}</p>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-page-header': CgPageHeader;
  }
}
