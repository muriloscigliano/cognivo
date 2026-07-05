import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Step definition for cg-steps. */
export interface StepItem {
  title: string;
  description?: string;
  status?: 'done' | 'active' | 'pending' | 'error';
}

/**
 * <cg-steps> — Step indicator with vertical/horizontal mode and clickable steps.
 *
 * @example
 * ```html
 * <cg-steps .items=${[{title:'Account',status:'done'},{title:'Profile',status:'active'},{title:'Review'}]}></cg-steps>
 * ```
 *
 * @fires {CustomEvent<{index, item}>} cg-step-click - When a clickable step is clicked
 *
 * @cssprop --cg-color-status-success-text-default - Done state color
 * @cssprop --cg-color-action-primary-background-default - Active state color
 */
@customElement('cg-steps')
export class CgSteps extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    /* Vertical layout (default) */
    .steps-vertical { display: flex; flex-direction: column; }

    .step-v {
      display: flex;
      gap: var(--cg-spacing-12);
    }

    /* Horizontal layout */
    .steps-horizontal {
      display: flex;
      align-items: flex-start;
    }

    .step-h {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    .indicator-v {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }

    .indicator-h {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: var(--cg-spacing-8);
    }

    /* ── Connecting lines ── */
    .h-line {
      flex: 1;
      height: var(--cg-spacing-2);
      background: var(--cg-color-surface-container-border);
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .h-line.done { background: var(--cg-color-status-success-text-default); }
    .step-h:first-child .h-line:first-child { visibility: hidden; }
    .step-h:last-child .h-line:last-child { visibility: hidden; }

    .v-line {
      width: var(--cg-spacing-2);
      flex: 1;
      min-height: var(--cg-spacing-24);
      background: var(--cg-color-surface-container-border);
      margin: var(--cg-spacing-4) 0;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .v-line.done { background: var(--cg-color-status-success-text-default); }

    /* ── Circle ── */
    .circle {
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border-radius: var(--cg-border-radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-container-border);
      color: var(--cg-color-surface-container-outlined);
      background: var(--cg-color-surface-container-background);
      flex-shrink: 0;
      position: relative;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    :host([compact]) .circle {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      font-size: var(--cg-font-size-xs);
    }

    .circle.done {
      background: var(--cg-color-status-success-text-default);
      border-color: var(--cg-color-status-success-text-default);
      color: var(--cg-color-status-success-text-inverse);
    }
    .circle.active {
      background: var(--cg-color-action-primary-background-default);
      border-color: var(--cg-color-action-primary-border-default);
      color: var(--cg-color-action-primary-text-default);
    }
    .circle.error {
      background: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-inverse);
    }

    /* Active pulse */
    .circle.active { animation: stepPulse 2s ease-in-out infinite; }
    @keyframes stepPulse {
      0%, 100% { box-shadow: 0 0 0 0 transparent; }
      50% { box-shadow: 0 0 0 var(--cg-spacing-4) var(--cg-overlay-accent-subtle); }
    }

    /* ── Clickable ── */
    :host([clickable]) .circle { cursor: pointer; }
    :host([clickable]) .circle:active { transform: scale(var(--cg-interaction-press-scale)); }
    /* Hover preview only for pending circles — done/error keep their
       status fill so hovering never repaints a completed/failed step. */
    :host([clickable]) .circle:hover:not(.active):not(.done):not(.error) {
      border-color: var(--cg-color-action-primary-border-default);
      color: var(--cg-color-accent-text);
    }
    /* Two-layer offset focus ring (button-family convention, matches
       cg-calendar .day / cg-pagination .page-btn). */
    :host([clickable]) .circle:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    /* ── Body text ── */
    .body {
      padding-bottom: var(--cg-spacing-24);
      min-width: 0;
    }
    /* The padding is inter-step spacing; the last vertical step has no
       following step, so drop the dead trailing space. */
    .step-v:last-child .body { padding-bottom: 0; }
    .step-h .body {
      text-align: center;
      padding: 0 var(--cg-spacing-4);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-snug);
    }
    :host([compact]) .title { font-size: var(--cg-font-size-xs); }

    .title.active { color: var(--cg-color-accent-text); }
    .title.done { color: var(--cg-color-status-success-text-default); }
    .title.error { color: var(--cg-color-status-error-text-default); }

    .desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      margin-top: var(--cg-spacing-2);
      line-height: var(--cg-line-height-snug);
    }

    /* Canonical W3C visually-hidden recipe (same as cg-phone-input) —
       values are functional, not design values. */
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .circle.active { animation: none; }
    }
  `];

  @property({ type: Array }) items: StepItem[] = [];
  @property({ reflect: true }) direction: 'vertical' | 'horizontal' = 'vertical';
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property({ type: Boolean, reflect: true }) compact = false;

  private _handleClick(index: number) {
    if (!this.clickable) return;
    this.dispatchEvent(new CustomEvent('cg-step-click', {
      detail: { index, item: this.items[index] },
      bubbles: true,
      composed: true,
    }));
  }

  private _statusSuffix(status: string): string {
    return status === 'done' ? ', completed' : status === 'error' ? ', error' : '';
  }

  /**
   * Screen-reader-only status text for non-clickable steps: done/error is
   * icon-only, invisible to AT. Clickable circles carry it in aria-label.
   */
  private _renderSrStatus(status: string) {
    if (this.clickable) return nothing;
    const suffix = this._statusSuffix(status);
    return suffix ? html`<span class="sr-only">${suffix}</span>` : nothing;
  }

  private _renderCircle(status: string, index: number) {
    const inner = status === 'done'
      ? html`<cg-icon name="check" size="xs"></cg-icon>`
      : status === 'error'
        ? html`<cg-icon name="x" size="xs"></cg-icon>`
        : `${index + 1}`;

    return html`
      <div
        class="circle ${status}"
        tabindex=${this.clickable ? '0' : nothing}
        role=${this.clickable ? 'button' : nothing}
        aria-current=${status === 'active' ? 'step' : nothing}
        aria-label=${this.clickable
          ? `Step ${index + 1} of ${this.items.length}: ${this.items[index]?.title}${this._statusSuffix(status)}`
          : nothing}
        @click=${() => this._handleClick(index)}
        @keydown=${(e: KeyboardEvent) => { if (this.clickable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this._handleClick(index); } }}
      >${inner}</div>
    `;
  }

  private _getStatus(item: StepItem, index: number): string {
    return item.status ?? (index === 0 ? 'active' : 'pending');
  }

  override render() {
    if (this.direction === 'horizontal') {
      return html`
        <div class="steps-horizontal" role="list" aria-label="Steps">
          ${this.items.map((item, i) => {
            const status = this._getStatus(item, i);
            return html`
              <div class="step-h" role="listitem">
                <div class="indicator-h">
                  <div class="h-line ${i > 0 && this._getStatus(this.items[i - 1]!, i - 1) === 'done' ? 'done' : ''}"></div>
                  ${this._renderCircle(status, i)}
                  <div class="h-line ${status === 'done' ? 'done' : ''}"></div>
                </div>
                <div class="body">
                  <div class="title ${status}">${item.title}${this._renderSrStatus(status)}</div>
                  ${item.description ? html`<div class="desc">${item.description}</div>` : nothing}
                </div>
              </div>
            `;
          })}
        </div>
      `;
    }

    return html`
      <div class="steps-vertical" role="list" aria-label="Steps">
        ${this.items.map((item, i) => {
          const status = this._getStatus(item, i);
          const isLast = i === this.items.length - 1;
          return html`
            <div class="step-v" role="listitem">
              <div class="indicator-v">
                ${this._renderCircle(status, i)}
                ${!isLast ? html`<div class="v-line ${status === 'done' ? 'done' : ''}"></div>` : nothing}
              </div>
              <div class="body">
                <div class="title ${status}">${item.title}${this._renderSrStatus(status)}</div>
                ${item.description ? html`<div class="desc">${item.description}</div>` : nothing}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-steps': CgSteps; }
}
