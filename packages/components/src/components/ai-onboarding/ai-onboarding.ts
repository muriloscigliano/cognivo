/**
 * @element ai-onboarding
 * Step-by-step onboarding card built entirely from design-system primitives
 * (cg-card, cg-text, cg-button, cg-stack). Progress affordance is configurable
 * via the `progress` attribute: numbered | dots | bar | stepper.
 *
 * @example
 * ```html
 * <ai-onboarding
 *   progress="bar"
 *   .steps=${[
 *     { title: 'Welcome', description: 'Let us show you around.' },
 *     { title: 'Ask anything', description: 'Type a question to get started.' }
 *   ]}
 *   active="0"
 *   dismissible
 * ></ai-onboarding>
 * ```
 *
 * @prop {OnboardingStep[]} steps - Array of step objects with title and description
 * @prop {number} active - Index of the current step (default 0)
 * @prop {boolean} dismissible - Show dismiss button (default true)
 * @prop {'numbered'|'dots'|'bar'|'stepper'} progress - Progress style (default auto-picks by step count)
 *
 * @slot media - Optional media (illustration, Lottie, video) shown above the title
 * @slot step-action - Optional per-step CTA (e.g., "Try it") rendered below description
 *
 * @fires {CustomEvent<{step: number}>} ai-onboarding-next - When Next is clicked
 * @fires {CustomEvent<{step: number}>} ai-onboarding-prev - When Back is clicked
 * @fires {CustomEvent<{from: number, to: number}>} ai-onboarding-step-change - Any step change
 * @fires ai-onboarding-complete - When Done is clicked on the last step
 * @fires {CustomEvent<{step: number}>} ai-onboarding-dismiss - When dismissed
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-card/cg-card.js';
import '../cg-text/cg-text.js';
import '../cg-button/cg-button.js';
import '../cg-stack/cg-stack.js';

export interface OnboardingStep {
  title: string;
  description: string;
  target?: string;
}

type ProgressVariant = 'numbered' | 'dots' | 'bar' | 'stepper';

@customElement('ai-onboarding')
export class AiOnboarding extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      display: block;
      max-width: 440px;
    }
    :host([hidden]) { display: none; }

    cg-card { display: block; }

    /* ── Header row (progress + dismiss) ── */
    .header-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      width: 100%;
    }
    .header-progress { flex: 1; min-width: 0; }

    .dismiss-btn {
      flex-shrink: 0;
      background: none;
      border: none;
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      padding: var(--cg-spacing-4);
      line-height: 1;
      border-radius: var(--cg-border-radius-50);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition:
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .dismiss-btn:hover {
      color: var(--cg-color-surface-base-text);
      background: var(--cg-color-action-secondary-background-hover);
    }
    .dismiss-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .dismiss-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-color-focus-ring);
    }

    /* ── Progress: numbered ── */
    .progress-numbered {
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    /* ── Progress: dots ── */
    .progress-dots {
      display: flex;
      gap: var(--cg-spacing-6);
      align-items: center;
    }
    .dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-border);
      border: none;
      padding: 0;
      cursor: not-allowed;
      transition:
        background var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        opacity var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .dot.completed {
      background: var(--cg-color-action-primary-background-default);
      opacity: var(--cg-opacity-50);
      cursor: pointer;
    }
    .dot.completed:hover { opacity: 0.85; }
    .dot.active {
      background: var(--cg-color-action-primary-background-default);
      transform: scale(1.3);
      cursor: default;
    }
    .dot:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-color-focus-ring);
    }

    /* ── Progress: bar ── */
    .progress-bar {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-6);
      width: 100%;
    }
    .progress-bar-track {
      width: 100%;
      height: var(--cg-spacing-4);
      background: var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-full);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out);
    }

    /* ── Progress: stepper ── */
    .progress-stepper {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      flex-wrap: nowrap;
      overflow: hidden;
    }
    .stepper-node {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      flex-shrink: 0;
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      border: none;
      padding: 0;
      cursor: not-allowed;
      transition:
        background var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .stepper-node.completed {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      cursor: pointer;
    }
    .stepper-node.active {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      cursor: default;
    }
    .stepper-node:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-color-focus-ring);
    }
    .stepper-line {
      flex: 1;
      min-width: var(--cg-spacing-8);
      height: var(--cg-border-width-100);
      background: var(--cg-color-surface-cards-border);
      transition: background var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .stepper-line.completed {
      background: var(--cg-color-action-primary-background-default);
    }

    /* ── Step content (animated on change) ── */
    .step-content {
      animation: stepIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    @keyframes stepIn {
      from { opacity: 0; transform: translateX(8px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .step-content[data-direction="back"] { animation-name: stepInBack; }
    @keyframes stepInBack {
      from { opacity: 0; transform: translateX(-8px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .step-content { animation: none; }
    }

    .media-slot { margin-bottom: var(--cg-spacing-16); }
    .media-slot:empty { display: none; }

    .step-action-slot { margin-top: var(--cg-spacing-16); }
    .step-action-slot:empty { display: none; }

    /* ── Footer (actions) ── */
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--cg-spacing-8);
      width: 100%;
    }
    .footer-right {
      display: inline-flex;
      gap: var(--cg-spacing-8);
      align-items: center;
    }

    /* sr-only live region */
    .sr-only {
      position: absolute;
      width: 1px; height: 1px;
      padding: 0; margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) steps: OnboardingStep[] = [];
  @property({ type: Number }) active = 0;
  @property({ type: Boolean }) dismissible = true;
  @property({ type: Boolean, attribute: 'show-skip' }) showSkip = true;
  @property({ reflect: true }) progress: ProgressVariant | 'auto' = 'auto';

  @state() private _direction: 'forward' | 'back' = 'forward';

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._onKeydown);
    if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeydown);
  }

  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); this._next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); this._prev(); }
    else if (e.key === 'Escape' && this.dismissible) { e.preventDefault(); this._dismiss(); }
  };

  private _emit(name: string, detail: Record<string, unknown> = {}) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _goTo(target: number) {
    if (target < 0 || target >= this.steps.length || target === this.active) return;
    const from = this.active;
    this._direction = target > from ? 'forward' : 'back';
    this.active = target;
    this._emit('ai-onboarding-step-change', { from, to: target });
  }

  private _next() {
    if (this.active < this.steps.length - 1) {
      this._direction = 'forward';
      this.active++;
      this._emit('ai-onboarding-next', { step: this.active });
      this._emit('ai-onboarding-step-change', { from: this.active - 1, to: this.active });
    } else {
      this._emit('ai-onboarding-complete');
    }
  }

  private _prev() {
    if (this.active > 0) {
      this._direction = 'back';
      this.active--;
      this._emit('ai-onboarding-prev', { step: this.active });
      this._emit('ai-onboarding-step-change', { from: this.active + 1, to: this.active });
    }
  }

  private _dismiss() {
    this._emit('ai-onboarding-dismiss', { step: this.active });
  }

  private _resolvedProgress(): ProgressVariant {
    if (this.progress !== 'auto') return this.progress;
    const n = this.steps.length;
    if (n <= 1) return 'numbered';
    if (n <= 4) return 'dots';
    return 'bar';
  }

  private _renderProgress() {
    const variant = this._resolvedProgress();
    const total = this.steps.length;
    const stepLabel = `Step ${this.active + 1} of ${total}`;

    if (variant === 'numbered') {
      return html`<cg-text class="progress-numbered" size="xs" weight="bold" color="muted">${stepLabel}</cg-text>`;
    }

    if (variant === 'dots') {
      return html`
        <div class="progress-dots" role="tablist" aria-label="Onboarding progress">
          ${this.steps.map((s, i) => {
            const completed = i < this.active;
            const current = i === this.active;
            const cls = current ? 'active' : completed ? 'completed' : '';
            return html`<button
              class="dot ${cls}"
              role="tab"
              aria-selected=${current}
              aria-label="Go to step ${i + 1}: ${s.title}"
              ?disabled=${!completed && !current}
              @click=${() => completed && this._goTo(i)}
            ></button>`;
          })}
        </div>
      `;
    }

    if (variant === 'bar') {
      const pct = total > 1 ? Math.round(((this.active + 1) / total) * 100) : 100;
      return html`
        <div class="progress-bar">
          <div class="progress-bar-track" role="progressbar" aria-valuenow=${this.active + 1} aria-valuemin="1" aria-valuemax=${total} aria-label=${stepLabel}>
            <div class="progress-bar-fill" style="width: ${pct}%"></div>
          </div>
          <cg-text size="xs" weight="bold" color="muted">${stepLabel}</cg-text>
        </div>
      `;
    }

    // stepper
    return html`
      <div class="progress-stepper" role="tablist" aria-label="Onboarding progress">
        ${this.steps.map((s, i) => {
          const completed = i < this.active;
          const current = i === this.active;
          const cls = current ? 'active' : completed ? 'completed' : '';
          const label = completed
            ? html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
            : html`${i + 1}`;
          return html`
            ${i > 0 ? html`<span class="stepper-line ${i <= this.active ? 'completed' : ''}"></span>` : nothing}
            <button
              class="stepper-node ${cls}"
              role="tab"
              aria-selected=${current}
              aria-label="Go to step ${i + 1}: ${s.title}"
              ?disabled=${!completed && !current}
              @click=${() => completed && this._goTo(i)}
            >${label}</button>
          `;
        })}
      </div>
    `;
  }

  override render() {
    const step = this.steps[this.active];
    if (!step) return nothing;

    const isLast = this.active === this.steps.length - 1;
    const total = this.steps.length;

    return html`
      <cg-card variant="elevated" padding="lg" rounded=${this.rounded} role="dialog" aria-modal="true" aria-label="Onboarding step ${this.active + 1} of ${total}">
        <div class="sr-only" aria-live="polite" aria-atomic="true">Step ${this.active + 1} of ${total}: ${step.title}</div>

        <div slot="header" class="header-row">
          <div class="header-progress">${this._renderProgress()}</div>
          ${this.dismissible
            ? html`<button class="dismiss-btn" aria-label="Dismiss onboarding" @click=${this._dismiss}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>`
            : nothing}
        </div>

        <div class="step-content" data-direction=${this._direction} .key=${this.active}>
          <div class="media-slot"><slot name="media"></slot></div>
          <cg-stack direction="column" gap="sm">
            <cg-text as="h3" size="lg" weight="bold">${step.title}</cg-text>
            <cg-text size="sm" color="muted">${step.description}</cg-text>
          </cg-stack>
          <div class="step-action-slot"><slot name="step-action"></slot></div>
        </div>

        <div slot="footer" class="footer-row">
          <cg-button
            variant="secondary"
            size="md"
            ?disabled=${this.active === 0}
            label="Previous step"
            @click=${this._prev}
          >Back</cg-button>
          <div class="footer-right">
            ${this.showSkip && !isLast
              ? html`<cg-button variant="tertiary" size="sm" label="Skip onboarding" @click=${this._dismiss}>Skip tour</cg-button>`
              : nothing}
            <cg-button
              variant="primary"
              size="md"
              label=${isLast ? 'Complete onboarding' : 'Next step'}
              @click=${this._next}
            >${isLast ? 'Done' : 'Next'}</cg-button>
          </div>
        </div>
      </cg-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-onboarding': AiOnboarding;
  }
}
