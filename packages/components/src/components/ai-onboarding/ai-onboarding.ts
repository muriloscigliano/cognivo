/**
 * @element ai-onboarding
 * Step-by-step onboarding card with progress dots, navigation buttons,
 * and optional dismiss. Ideal for introducing AI features to new users.
 *
 * @example
 * ```html
 * <ai-onboarding
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
 *
 * @fires {CustomEvent<{step: number}>} ai-onboarding-next - When Next is clicked
 * @fires {CustomEvent<{step: number}>} ai-onboarding-prev - When Back is clicked
 * @fires ai-onboarding-complete - When Done is clicked on the last step
 * @fires {CustomEvent<{step: number}>} ai-onboarding-dismiss - When dismissed
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface OnboardingStep {
  title: string;
  description: string;
  target?: string;
}

@customElement('ai-onboarding')
export class AiOnboarding extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    :host([hidden]) { display: none; }

    .card {
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-24);
      position: relative;
      max-width: 420px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--cg-spacing-8);
    }

    .step-label {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    .dismiss-btn {
      background: none;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      padding: var(--cg-spacing-4);
      font-size: var(--cg-font-size-lg);
      line-height: 1;
      border-radius: var(--cg-border-radius-50);
    }
    .dismiss-btn:hover { color: var(--cg-color-surface-base-text); }
    .dismiss-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .title {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-bold);
      margin: 0 0 var(--cg-spacing-8);
    }

    .description {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
      line-height: 1.5;
      margin: 0 0 var(--cg-spacing-20);
    }

    .dots {
      display: flex;
      justify-content: center;
      gap: var(--cg-spacing-6);
      margin-bottom: var(--cg-spacing-16);
    }

    .dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: 50%;
      background: var(--cg-color-surface-cards-border);
      transition: background var(--cg-motion-duration-normal) var(--cg-motion-easing-color), transform var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
    }
    .dot.active {
      background: var(--cg-color-action-primary-background-default);
      transform: scale(1.3);
    }
    .dot.completed {
      background: var(--cg-color-action-primary-background-default);
      opacity: 0.5;
    }

    .actions {
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--cg-spacing-12);
    }

    .nav-btn {
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: opacity var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
    }
    .nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .nav-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .prev-btn {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .prev-btn:hover:not(:disabled) {
      background: var(--cg-color-surface-cards-border);
    }

    .next-btn {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
    }
    .next-btn:hover:not(:disabled) { filter: brightness(1.1); }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .card { border-radius: 0; }
    :host([rounded="sm"]) .card { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .card { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .card { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .card { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) steps: OnboardingStep[] = [];
  @property({ type: Number }) active = 0;
  @property({ type: Boolean }) dismissible = true;

  private _emit(name: string, detail: Record<string, unknown> = {}) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _next() {
    if (this.active < this.steps.length - 1) {
      this.active++;
      this._emit('ai-onboarding-next', { step: this.active });
    } else {
      this._emit('ai-onboarding-complete');
    }
  }

  private _prev() {
    if (this.active > 0) {
      this.active--;
      this._emit('ai-onboarding-prev', { step: this.active });
    }
  }

  private _dismiss() {
    this._emit('ai-onboarding-dismiss', { step: this.active });
  }

  override render() {
    const step = this.steps[this.active];
    if (!step) return nothing;

    const isLast = this.active === this.steps.length - 1;

    return html`
      <div class="card" role="dialog" aria-label="Onboarding step ${this.active + 1} of ${this.steps.length}">
        <div class="header">
          <span class="step-label">Step ${this.active + 1} of ${this.steps.length}</span>
          ${this.dismissible
            ? html`<button class="dismiss-btn" aria-label="Dismiss onboarding" @click=${this._dismiss}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>`
            : nothing}
        </div>
        <h3 class="title">${step.title}</h3>
        <p class="description">${step.description}</p>

        <div class="dots" aria-hidden="true">
          ${this.steps.map((_, i) => html`
            <span class="dot ${i === this.active ? 'active' : i < this.active ? 'completed' : ''}"></span>
          `)}
        </div>

        <div class="actions">
          <button
            class="nav-btn prev-btn"
            ?disabled=${this.active === 0}
            aria-label="Previous step"
            @click=${this._prev}
          >Back</button>
          <button
            class="nav-btn next-btn"
            aria-label=${isLast ? 'Complete onboarding' : 'Next step'}
            @click=${this._next}
          >${isLast ? 'Done' : 'Next'}</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-onboarding': AiOnboarding;
  }
}
