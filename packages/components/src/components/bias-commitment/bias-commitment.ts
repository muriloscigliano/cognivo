import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element bias-commitment
 * Progressive multi-step reveal. Children carrying `[data-step="N"]` become
 * visible only when `step >= N`. Commitment / consistency bias — each
 * completed micro-step increases the user's felt obligation to finish.
 *
 * @example
 * ```html
 * <bias-commitment step="2" total="3" show-progress>
 *   <div data-step="1">Pick a plan</div>
 *   <div data-step="2">Enter email</div>
 *   <div data-step="3">Payment</div>
 * </bias-commitment>
 * ```
 *
 * @fires bias-commitment-advance - When advance() moves to a later step
 *
 * @cssprop --cg-component-bias-commitment-gap
 * @cssprop --cg-component-bias-commitment-radius
 */
@customElement('bias-commitment')
export class BiasCommitment extends LitElement {
  static biasId = 'commitment-bias' as const;

  static override styles = [hostBlock, reducedMotion, css`
    .flow {
      display: flex;
      flex-direction: column;
      gap: var(--cg-component-bias-commitment-gap);
    }

    .progress {
      display: flex;
      gap: var(--cg-spacing-6);
      align-items: center;
    }
    .progress-track {
      flex: 1;
      height: var(--cg-spacing-6);
      background: var(--cg-color-surface-container-background);
      border-radius: var(--cg-border-radius-full);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-full);
      transition: width var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .progress-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
      font-variant-numeric: tabular-nums;
      min-width: var(--cg-spacing-48);
      text-align: right;
    }

    ::slotted([data-step]) {
      animation: biasCommitmentReveal var(--cg-transition-duration-default) var(--cg-transition-easing-default) both;
    }

    @keyframes biasCommitmentReveal {
      from { opacity: 0; transform: translateY(var(--cg-spacing-8)); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `];

  @property({ type: Number, reflect: true }) step = 1;
  @property({ type: Number }) total = 1;
  @property({ type: Boolean, attribute: 'show-progress' }) showProgress = false;

  /** Advance to the next step and emit bias-commitment-advance. */
  advance() {
    if (this.step < this.total) {
      const prev = this.step;
      this.step = this.step + 1;
      this.dispatchEvent(new CustomEvent('bias-commitment-advance', {
        detail: { from: prev, to: this.step, total: this.total },
        bubbles: true,
        composed: true,
      }));
    }
  }

  override updated() {
    // Show/hide children based on data-step attribute.
    for (const child of Array.from(this.children)) {
      const ds = (child as HTMLElement).dataset.step;
      if (ds != null) {
        const n = Number(ds);
        const visible = Number.isFinite(n) && n <= this.step;
        (child as HTMLElement).style.display = visible ? '' : 'none';
      }
    }
  }

  private get _pct(): number {
    if (!this.total || this.total <= 0) return 0;
    return Math.max(0, Math.min(100, (this.step / this.total) * 100));
  }

  override render() {
    const progressNode = this.showProgress ? html`
      <div class="progress">
        <div class="progress-track" role="progressbar"
          aria-valuemin="0"
          aria-valuemax=${this.total}
          aria-valuenow=${this.step}
          aria-label="Step ${this.step} of ${this.total}">
          <div class="progress-fill" style="width:${this._pct}%"></div>
        </div>
        <span class="progress-label">Step ${this.step}/${this.total}</span>
      </div>
    ` : nothing;

    return html`
      <div class="flow">
        ${progressNode}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bias-commitment': BiasCommitment;
  }
}
