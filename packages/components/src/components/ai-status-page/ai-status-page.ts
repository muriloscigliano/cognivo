/**
 * @element ai-status-page
 * System health dashboard showing AI service statuses with color-coded
 * dots (operational/degraded/down/maintenance), latency bars, uptime
 * percentages, and an overall system status badge.
 *
 * @example
 * ```html
 * <ai-status-page .services=${[
 *   { name: 'Chat API', status: 'operational', latency: 120, uptime: 99.98 },
 *   { name: 'Embedding Service', status: 'degraded', latency: 850, uptime: 99.5 }
 * ]}></ai-status-page>
 * ```
 *
 * @prop {StatusService[]} services - Array of service entries with name, status, latency, uptime
 *
 * @fires {CustomEvent<{service: StatusService}>} ai-status-service-click - When a service row is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface StatusService {
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  latency?: number;
  uptime?: number;
}

@customElement('ai-status-page')
export class AiStatusPage extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    :host([hidden]) { display: none; }

    .page {
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-24);
    }

    .overall {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-16);
      padding-bottom: var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    .overall-dot {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .overall-text {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-bold);
    }

    .overall-badge {
      margin-left: auto;
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-150);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    .status-operational  { background: var(--cg-color-status-success-background-default); color: var(--cg-color-status-success-text); }
    .status-degraded     { background: var(--cg-color-status-warning-background-default);  color: var(--cg-color-status-warning-text); }
    .status-down         { background: var(--cg-color-status-error-background-default);  color: var(--cg-color-status-error-text); }
    .status-maintenance  { background: var(--cg-color-status-info-background-default); color: var(--cg-color-status-info-text); }

    .dot-operational  { background: var(--cg-color-status-success-text); }
    .dot-degraded     { background: var(--cg-color-status-warning-text); }
    .dot-down         { background: var(--cg-color-status-error-text); }
    .dot-maintenance  { background: var(--cg-color-status-info-text); }

    .service-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
    }

    .service-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      font-family: inherit;
      transition: background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      color: inherit;
    }
    .service-item:active { transform: scale(var(--cg-interaction-press-scale)); }
    .service-item:hover {
      background: var(--cg-color-surface-cards-border);
    }
    .service-item:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
      border-radius: var(--cg-border-radius-100);
    }

    .service-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .service-name {
      flex: 1;
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
    }

    .service-meta {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-16);
      flex-shrink: 0;
    }

    .latency {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-variant-numeric: tabular-nums;
    }

    .latency-bar-track {
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-4);
      background: var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-25);
      overflow: hidden;
    }

    .latency-bar-fill {
      height: 100%;
      border-radius: var(--cg-border-radius-25);
      transition: width var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }
    .latency-bar-fill.fast { background: var(--cg-color-status-success-text); }
    .latency-bar-fill.mid  { background: var(--cg-color-status-warning-text); }
    .latency-bar-fill.slow { background: var(--cg-color-status-error-text); }

    .uptime {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-variant-numeric: tabular-nums;
      min-width: var(--cg-spacing-48);
      text-align: right;
    }

    .service-status-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      min-width: var(--cg-spacing-96);
      text-align: right;
    }

  `];

  @property({ type: Array }) services: StatusService[] = [];

  private _overallStatus(): StatusService['status'] {
    if (this.services.some(s => s.status === 'down')) return 'down';
    if (this.services.some(s => s.status === 'degraded')) return 'degraded';
    if (this.services.some(s => s.status === 'maintenance')) return 'maintenance';
    return 'operational';
  }

  private _statusLabel(s: string): string {
    return { operational: 'Operational', degraded: 'Degraded', down: 'Down', maintenance: 'Maintenance' }[s] || s;
  }

  private _latencyTier(ms: number): string {
    if (ms < 200) return 'fast';
    if (ms < 800) return 'mid';
    return 'slow';
  }

  private _handleClick(service: StatusService) {
    this.dispatchEvent(new CustomEvent('ai-status-service-click', {
      detail: { service },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    const overall = this._overallStatus();

    return html`
      <div class="page" role="region" aria-label="System status">
        <div class="overall">
          <span class="overall-dot dot-${overall}" aria-hidden="true"></span>
          <span class="overall-text">System Status</span>
          <span class="overall-badge status-${overall}">${this._statusLabel(overall)}</span>
        </div>

        <div class="service-list" role="list" aria-label="Service status list">
          ${this.services.map(svc => html`
            <button
              class="service-item"
              role="listitem"
              aria-label="${svc.name}: ${this._statusLabel(svc.status)}"
              @click=${() => this._handleClick(svc)}
            >
              <span class="service-dot dot-${svc.status}" aria-hidden="true"></span>
              <span class="service-name">${svc.name}</span>
              <div class="service-meta">
                ${svc.latency != null ? html`
                  <span class="latency">
                    <span class="latency-bar-track">
                      <span
                        class="latency-bar-fill ${this._latencyTier(svc.latency)}"
                        style="width: ${Math.min(100, (svc.latency / 1000) * 100)}%"
                      ></span>
                    </span>
                    ${svc.latency}ms
                  </span>
                ` : nothing}
                ${svc.uptime != null ? html`
                  <span class="uptime">${svc.uptime}%</span>
                ` : nothing}
                <span class="service-status-label status-${svc.status}">
                  ${this._statusLabel(svc.status)}
                </span>
              </div>
            </button>
          `)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-status-page': AiStatusPage;
  }
}
