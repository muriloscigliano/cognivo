/**
 * <ai-status-page> — System Health Dashboard for AI Services
 *
 * Service list with status dots, overall status badge.
 * Latency bars, uptime percentages.
 * Click on service for details.
 * Keyboard accessible with proper list semantics.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

export interface StatusService {
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  latency?: number;
  uptime?: number;
}

@customElement('ai-status-page')
export class AiStatusPage extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([hidden]) { display: none; }

    .page {
      background: var(--cg-color-bg-primary, #18181b);
      border: 1px solid var(--cg-color-border-primary, #27272a);
      border-radius: 16px;
      padding: 24px;
    }

    .overall {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--cg-color-border-primary, #27272a);
    }

    .overall-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .overall-text {
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 16px;
      font-weight: 700;
    }

    .overall-badge {
      margin-left: auto;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .status-operational  { background: rgba(34,197,94,0.15); color: #22c55e; }
    .status-degraded     { background: rgba(234,179,8,0.15);  color: #eab308; }
    .status-down         { background: rgba(239,68,68,0.15);  color: #ef4444; }
    .status-maintenance  { background: rgba(59,130,246,0.15); color: #3b82f6; }

    .dot-operational  { background: #22c55e; }
    .dot-degraded     { background: #eab308; }
    .dot-down         { background: #ef4444; }
    .dot-maintenance  { background: #3b82f6; }

    .service-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .service-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      font-family: inherit;
      transition: background 150ms ease;
      color: inherit;
    }
    .service-item:hover {
      background: var(--cg-color-bg-secondary, #27272a);
    }
    .service-item:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: -2px;
      border-radius: 8px;
    }

    .service-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .service-name {
      flex: 1;
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 14px;
      font-weight: 500;
    }

    .service-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-shrink: 0;
    }

    .latency {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
    }

    .latency-bar-track {
      width: 40px;
      height: 4px;
      background: var(--cg-color-border-primary, #3f3f46);
      border-radius: 2px;
      overflow: hidden;
    }

    .latency-bar-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 300ms ease;
    }
    .latency-bar-fill.fast { background: #22c55e; }
    .latency-bar-fill.mid  { background: #eab308; }
    .latency-bar-fill.slow { background: #ef4444; }

    .uptime {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      min-width: 52px;
      text-align: right;
    }

    .service-status-label {
      font-size: 11px;
      font-weight: 600;
      min-width: 90px;
      text-align: right;
    }

    @media (prefers-reduced-motion: reduce) {
      .service-item { transition: none; }
      .latency-bar-fill { transition: none; }
    }
  `;

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
