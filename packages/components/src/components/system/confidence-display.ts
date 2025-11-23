import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ConfidenceData {
  value: number;
  label?: string;
  source?: string;
}

@customElement('confidence-display')
export class ConfidenceDisplay extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .confidence-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
      }

      .label {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .ai-badge {
        font-size: 10px;
        padding: 2px 6px;
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.sm};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .percentage {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
      }

      .percentage.high {
        color: ${tokens.color.success};
      }

      .percentage.medium {
        color: ${tokens.color.warning};
      }

      .percentage.low {
        color: ${tokens.color.danger};
      }

      .progress-bar {
        width: 100%;
        height: 12px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        overflow: hidden;
        position: relative;
      }

      .progress-fill {
        height: 100%;
        border-radius: ${tokens.radius.full};
        transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .progress-fill::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        animation: shimmer 2s infinite;
      }

      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }

      .progress-fill.high {
        background: linear-gradient(90deg, ${tokens.color.success}, ${tokens.color.secondaryMain});
      }

      .progress-fill.medium {
        background: linear-gradient(90deg, ${tokens.color.warning}, #f59e0b);
      }

      .progress-fill.low {
        background: linear-gradient(90deg, ${tokens.color.danger}, #dc2626);
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .indicator-dots {
        display: flex;
        gap: 4px;
        align-items: center;
      }

      .indicator-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${tokens.color.gray100};
        transition: all ${tokens.transition.default};
      }

      .indicator-dot.active {
        background: currentColor;
        box-shadow: 0 0 8px currentColor;
      }

      :host([variant='compact']) .header {
        flex-direction: row;
      }

      :host([variant='compact']) .progress-bar {
        height: 6px;
      }

      :host([variant='compact']) .footer {
        display: none;
      }

      :host([variant='minimal']) .header {
        margin-bottom: 0;
      }

      :host([variant='minimal']) .footer {
        display: none;
      }

      .meter-container {
        position: relative;
        height: 80px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }

      .meter-arc {
        width: 120px;
        height: 60px;
      }

      .meter-value {
        position: absolute;
        bottom: 10px;
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
      }

      :host([type='meter']) .progress-bar {
        display: none;
      }

      :host([type='meter']) .meter-container {
        display: flex;
      }

      :host([type='bar']) .meter-container {
        display: none;
      }
    `
  ];

  @property({ type: Number })
  value = 0;

  @property({ type: String })
  label = 'Confidence';

  @property({ type: String })
  source = '';

  @property({ type: String, reflect: true })
  variant: 'default' | 'compact' | 'minimal' = 'default';

  @property({ type: String, reflect: true })
  type: 'bar' | 'meter' = 'bar';

  @property({ type: Boolean })
  showPercentage = true;

  @property({ type: Boolean })
  animated = true;

  private getConfidenceLevel(): string {
    if (this.value >= 0.8) return 'high';
    if (this.value >= 0.5) return 'medium';
    return 'low';
  }

  override render() {
    const percentage = Math.round(this.value * 100);
    const level = this.getConfidenceLevel();

    return html`
      <div class="confidence-container">
        <div class="header">
          <div class="label">
            <span class="ai-badge">AI</span>
            <span>${this.label}</span>
          </div>
          ${this.showPercentage ? html`
            <span class="percentage ${level}">${percentage}%</span>
          ` : ''}
        </div>

        ${this.type === 'bar' ? html`
          <div class="progress-bar">
            <div
              class="progress-fill ${level}"
              style="width: ${percentage}%"
            ></div>
          </div>
        ` : html`
          <div class="meter-container">
            <svg class="meter-arc" viewBox="0 0 120 60">
              <path
                d="M 10 50 A 50 50 0 0 1 110 50"
                fill="none"
                stroke="${tokens.color.gray100}"
                stroke-width="8"
              />
              <path
                d="M 10 50 A 50 50 0 0 1 110 50"
                fill="none"
                stroke="currentColor"
                stroke-width="8"
                stroke-dasharray="${(percentage / 100) * 157} 157"
                stroke-linecap="round"
                class="${level}"
              />
            </svg>
            <div class="meter-value ${level}">${percentage}%</div>
          </div>
        `}

        ${this.variant !== 'compact' && this.variant !== 'minimal' ? html`
          <div class="footer">
            ${this.source ? html`<span>Source: ${this.source}</span>` : html`<span></span>`}
            <div class="indicator-dots">
              <div class="indicator-dot ${this.value >= 0.25 ? 'active' : ''}" style="color: ${tokens.color.danger}"></div>
              <div class="indicator-dot ${this.value >= 0.5 ? 'active' : ''}" style="color: ${tokens.color.warning}"></div>
              <div class="indicator-dot ${this.value >= 0.75 ? 'active' : ''}" style="color: ${tokens.color.success}"></div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'confidence-display': ConfidenceDisplay;
  }
}
