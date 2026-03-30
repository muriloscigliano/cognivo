/**
 * <ai-progress-steps> — Multi-phase AI pipeline progress.
 *
 * Props: phases, compact
 * Events: ai-progress-phase-click
 * Features: Horizontal step bar with connecting lines, status icons,
 *           active phase pulse animation, duration display, compact mode
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface ProgressPhase {
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  duration?: string;
}

@customElement('ai-progress-steps')
export class AiProgressSteps extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
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
    .step:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
      border-radius: 4px;
    }

    .step-row {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .line {
      flex: 1;
      height: 2px;
      background: var(--cg-color-border, #27272a);
      transition: background 200ms ease;
    }
    .line.done {
      background: var(--cg-color-accent, #dfff61);
    }
    .line.hide { visibility: hidden; }

    .dot {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      border: 2px solid var(--cg-color-border, #27272a);
      background: var(--cg-color-surface, #18181b);
      color: var(--cg-color-text-tertiary, #71717a);
      transition: all 200ms ease;
    }

    .dot[data-status="complete"] {
      border-color: var(--cg-color-accent, #dfff61);
      background: var(--cg-color-accent, #dfff61);
      color: #18181b;
    }
    .dot[data-status="active"] {
      border-color: var(--cg-color-accent, #dfff61);
      color: var(--cg-color-accent, #dfff61);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .dot[data-status="error"] {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(223, 255, 97, 0.3); }
      50% { box-shadow: 0 0 0 6px rgba(223, 255, 97, 0); }
    }

    .info {
      margin-top: 6px;
      text-align: center;
    }

    .label {
      font-size: 12px;
      font-weight: 500;
      color: var(--cg-color-text-secondary, #a1a1aa);
      white-space: nowrap;
    }
    .step[data-status="active"] .label {
      color: var(--cg-color-text-primary, #fafafa);
    }
    .step[data-status="complete"] .label {
      color: var(--cg-color-accent, #dfff61);
    }
    .step[data-status="error"] .label {
      color: #ef4444;
    }

    .duration {
      font-size: 10px;
      color: var(--cg-color-text-tertiary, #71717a);
      margin-top: 2px;
    }

    /* Compact mode */
    :host([compact]) .dot { width: 22px; height: 22px; font-size: 11px; }
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
          const prevDone = i > 0 && (this.phases[i - 1].status === 'complete');
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
