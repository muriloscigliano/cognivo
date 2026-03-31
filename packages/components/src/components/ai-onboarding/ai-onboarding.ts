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
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface OnboardingStep {
  title: string;
  description: string;
  target?: string;
}

@customElement('ai-onboarding')
export class AiOnboarding extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host([hidden]) { display: none; }

    .card {
      background: var(--cg-color-bg-primary, #18181b);
      border: 1px solid var(--cg-color-border-primary, #27272a);
      border-radius: 16px;
      padding: 24px;
      position: relative;
      max-width: 420px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    .step-label {
      color: var(--cg-brand-ai-accent, #dfff61);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .dismiss-btn {
      background: none;
      border: none;
      color: var(--cg-color-text-secondary, #a1a1aa);
      cursor: pointer;
      padding: 4px;
      font-size: 18px;
      line-height: 1;
      border-radius: 4px;
    }
    .dismiss-btn:hover { color: var(--cg-color-text-primary, #fafafa); }
    .dismiss-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .title {
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 8px;
    }

    .description {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 14px;
      line-height: 1.5;
      margin: 0 0 20px;
    }

    .dots {
      display: flex;
      justify-content: center;
      gap: 6px;
      margin-bottom: 16px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--cg-color-border-primary, #3f3f46);
      transition: background 200ms ease, transform 200ms ease;
    }
    .dot.active {
      background: var(--cg-brand-ai-accent, #dfff61);
      transform: scale(1.3);
    }
    .dot.completed {
      background: var(--cg-brand-ai-accent, #dfff61);
      opacity: 0.5;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .nav-btn {
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: opacity 150ms ease;
    }
    .nav-btn:disabled {
      opacity: 0.3;
      cursor: default;
    }
    .nav-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .prev-btn {
      background: var(--cg-color-bg-secondary, #27272a);
      color: var(--cg-color-text-primary, #fafafa);
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
    }

    .next-btn {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #18181b;
    }
    .next-btn:hover:not(:disabled) { filter: brightness(1.1); }

  `];

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
            ? html`<button class="dismiss-btn" aria-label="Dismiss onboarding" @click=${this._dismiss}>✕</button>`
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
