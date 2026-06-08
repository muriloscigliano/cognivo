/**
 * @element ai-progress-steps
 * Horizontal step indicator for multi-phase AI pipelines. Shows connected
 * dots with status icons (pending/active/complete/error), pulse animation
 * on the active phase, and optional duration labels. Supports compact mode.
 *
 * @example
 * ```html
 * <ai-progress-steps .phases=${[
 *   { label: 'Retrieve', status: 'complete', duration: '0.3s' },
 *   { label: 'Analyze', status: 'active' },
 *   { label: 'Generate', status: 'pending' }
 * ]}></ai-progress-steps>
 * ```
 *
 * @prop {ProgressPhase[]} phases - Array of phase objects with label, status, duration
 * @prop {boolean} compact - Hide labels and shrink dots
 *
 * @fires {CustomEvent<{label: string, status: string, index: number}>} ai-progress-phase-click - When a phase is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface ProgressPhase {
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  duration?: string;
}

@customElement('ai-progress-steps')
export class AiProgressSteps extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([hidden]) { display: none; }

    .steps {
      display: flex;
      align-items: flex-start;
      gap: 0;
      width: 100%;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      position: relative;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font-family: inherit;
      color: inherit;
    }
    .step:hover .dot {
      border-color: var(--cg-color-input-border-hover);
    }
    .step:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .step:focus-visible {
      outline: var(--cg-outline-width-default) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
      border-radius: var(--cg-border-radius-50);
    }

    .step-row {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .line {
      flex: 1;
      height: var(--cg-border-width-100);
      background: var(--cg-color-surface-cards-border);
      transition: background var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .line.done {
      background: var(--cg-color-action-primary-background-default);
    }
    .line.hide { visibility: hidden; }

    .dot {
      flex-shrink: 0;
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-cards-border);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-input-text-placeholder);
      transition: opacity var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }

    .dot[data-status="complete"] {
      border-color: var(--cg-color-surface-base-text);
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
    }
    .dot[data-status="active"] {
      border-color: var(--cg-color-surface-base-text);
      color: var(--cg-color-surface-base-text);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .dot[data-status="error"] {
      border-color: var(--cg-color-status-error-text-default);
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    .info {
      margin-top: var(--cg-spacing-6);
      text-align: center;
    }

    .label {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      white-space: nowrap;
    }
    .step[data-status="active"] .label {
      color: var(--cg-color-surface-base-text);
    }
    .step[data-status="complete"] .label {
      color: var(--cg-color-surface-base-text);
    }
    .step[data-status="error"] .label {
      color: var(--cg-color-status-error-text-default);
    }

    .duration {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-2);
    }

    /* Compact mode */
    :host([compact]) .dot { width: var(--cg-spacing-20); height: var(--cg-spacing-20); font-size: var(--cg-font-size-xs); }
    :host([compact]) .info { display: none; }

  `];

  @property({ type: Array }) phases: ProgressPhase[] = [];
  @property({ type: Boolean, reflect: true }) compact = false;

  private _statusIcon(status: string): string {
    switch (status) {
      case 'complete': return '\u2713';
      case 'error': return '\u2717';
      case 'active': return '\u25CF';
      default: return '';
    }
  }

  private _handlePhaseClick(phase: ProgressPhase, index: number): void {
    this.dispatchEvent(new CustomEvent('ai-progress-phase-click', {
      detail: { label: phase.label, status: phase.status, index },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    const len = this.phases.length;
    return html`
      <div class="steps" role="list" aria-label="Progress steps">
        ${this.phases.map((phase, i) => {
          const prevDone = i > 0 && (this.phases[i - 1]!.status === 'complete');
          return html`
            <button
              class="step"
              role="listitem"
              tabindex="0"
              data-status=${phase.status}
              aria-label=${`${phase.label}: ${phase.status}`}
              @click=${() => this._handlePhaseClick(phase, i)}
            >
              <div class="step-row">
                <div class="line ${i === 0 ? 'hide' : ''} ${prevDone ? 'done' : ''}"></div>
                <div class="dot" data-status=${phase.status}>
                  ${this._statusIcon(phase.status) || html`${i + 1}`}
                </div>
                <div class="line ${i === len - 1 ? 'hide' : ''} ${phase.status === 'complete' ? 'done' : ''}"></div>
              </div>
              <div class="info">
                <div class="label">${phase.label}</div>
                ${phase.duration ? html`<div class="duration">${phase.duration}</div>` : nothing}
              </div>
            </button>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-progress-steps': AiProgressSteps;
  }
}
