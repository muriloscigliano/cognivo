import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, pulseKeyframes } from '../../styles/index.js';

export interface StepItem {
  title: string;
  description?: string;
  status?: 'done' | 'active' | 'pending' | 'error';
}

/**
 * <cg-steps> — Step indicator with vertical/horizontal mode and clickable steps.
 *
 * Features:
 * - Vertical and horizontal layouts
 * - 4 status states: done (check), active (filled), pending (outline), error (x)
 * - Clickable steps (emit event)
 * - Connecting lines that change color with status
 * - Active step pulse animation
 * - Compact mode
 */
@customElement('cg-steps')
export class CgSteps extends LitElement {
  static override styles = [hostBlock, reducedMotion, pulseKeyframes, css`
    /* Vertical layout (default) */
    .steps-vertical { display: flex; flex-direction: column; }

    .step-v {
      display: flex;
      gap: var(--cg-spacing-12, 12px);
    }

    .indicator-v {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
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

    .indicator-h {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 8px;
    }

    .h-line {
      flex: 1;
      height: 2px;
      background: var(--cg-gray-200, #e4e4e7);
      transition: background 0.3s ease;
    }
    .h-line.done { background: var(--cg-color-status-success-text-default, #4ade80); }
    .h-line:first-child { visibility: hidden; }
    .step-h:first-child .h-line:first-child { visibility: hidden; }
    .step-h:last-child .h-line:last-child { visibility: hidden; }

    /* Circle */
    .circle {
      width: 32px;
      height: 32px;
      border-radius: var(--cg-border-radius-full, 99999px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: var(--cg-font-weight-bold, 700);
      border: 2px solid var(--cg-gray-300, #d4d4d8);
      color: var(--cg-gray-500, #71717a);
      background: var(--cg-color-surface-container-background, #18181b);
      flex-shrink: 0;
      position: relative;
      transition: all var(--cg-motion-duration-slow, 250ms) ease;
    }

    :host([compact]) .circle { width: 24px; height: 24px; font-size: 0.65rem; }

    .circle.done {
      background: var(--cg-color-status-success-text-default, #4ade80);
      border-color: var(--cg-color-status-success-text-default, #4ade80);
      color: var(--cg-gray-white, #ffffff);
    }
    .circle.active {
      background: var(--cg-focus-ring-color, #c8e650);
      border-color: var(--cg-focus-ring-color, #c8e650);
      color: var(--cg-gray-white, #ffffff);
      box-shadow: 0 0 0 4px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25));
    }
    .circle.error {
      background: var(--cg-text-danger, #ef4444);
      border-color: var(--cg-text-danger, #ef4444);
      color: var(--cg-gray-white, #ffffff);
    }

    .circle svg { width: 14px; height: 14px; }
    :host([compact]) .circle svg { width: 11px; height: 11px; }

    /* Active pulse */
    .circle.active { animation: pulse 2s ease-in-out infinite; }

    /* Clickable */
    :host([clickable]) .circle {
      cursor: pointer;
    }
    :host([clickable]) .circle:hover:not(.active) {
      border-color: var(--cg-focus-ring-color, #c8e650);
      color: var(--cg-text-accent, #e5ff6b);
    }
    :host([clickable]) .circle:focus-visible {
      outline: 2px solid var(--cg-focus-ring-color, #c8e650);
      outline-offset: 2px;
    }

    /* Vertical connecting line */
    .v-line {
      width: 2px;
      flex: 1;
      min-height: 24px;
      background: var(--cg-gray-200, #e4e4e7);
      margin: var(--cg-spacing-4, 4px) 0;
      transition: background 0.3s ease;
    }
    .v-line.done { background: var(--cg-color-status-success-text-default, #4ade80); }

    /* Body text */
    .body {
      padding-bottom: var(--cg-spacing-24, 24px);
      min-width: 0;
    }

    .step-h .body {
      text-align: center;
      padding: 0 4px;
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.3;
    }
    :host([compact]) .title { font-size: var(--cg-font-size-xs, 12px); }
    .title.active { color: var(--cg-text-accent, #e5ff6b); }
    .title.done { color: var(--cg-color-status-success-text-default, #4ade80); }
    .title.error { color: var(--cg-text-danger, #ef4444); }

    .desc {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      margin-top: 2px;
      line-height: 1.4;
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

  private _renderCircle(status: string, index: number) {
    const inner = status === 'done'
      ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"></path></svg>`
      : status === 'error'
        ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>`
        : `${index + 1}`;

    return html`
      <div
        class="circle ${status}"
        tabindex=${this.clickable ? '0' : nothing}
        role=${this.clickable ? 'button' : nothing}
        aria-label="Step ${index + 1}: ${this.items[index]?.title}"
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
        <div class="steps-horizontal">
          ${this.items.map((item, i) => {
            const status = this._getStatus(item, i);
            return html`
              <div class="step-h">
                <div class="indicator-h">
                  <div class="h-line ${i > 0 && this._getStatus(this.items[i - 1]!, i - 1) === 'done' ? 'done' : ''}"></div>
                  ${this._renderCircle(status, i)}
                  <div class="h-line ${status === 'done' ? 'done' : ''}"></div>
                </div>
                <div class="body">
                  <div class="title ${status}">${item.title}</div>
                  ${item.description ? html`<div class="desc">${item.description}</div>` : nothing}
                </div>
              </div>
            `;
          })}
        </div>
      `;
    }

    return html`
      <div class="steps-vertical">
        ${this.items.map((item, i) => {
          const status = this._getStatus(item, i);
          const isLast = i === this.items.length - 1;
          return html`
            <div class="step-v">
              <div class="indicator-v">
                ${this._renderCircle(status, i)}
                ${!isLast ? html`<div class="v-line ${status === 'done' ? 'done' : ''}"></div>` : nothing}
              </div>
              <div class="body">
                <div class="title ${status}">${item.title}</div>
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
