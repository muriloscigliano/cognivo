/**
 * @element ai-status-page
 * Service health dashboard built from design-system primitives (cg-card, cg-text, cg-stack).
 * Vercel/Linear-style minimal aesthetic: muted history bars, text-only status pills,
 * no colored blocks fighting for attention. The dot + history strip carry the color.
 *
 * @example
 * ```html
 * <ai-status-page .services=${[
 *   { name: 'Chat API', status: 'operational', latency: 120, uptime: 99.98,
 *     history: [{ date: '2026-04-01', status: 'operational' }, ...] }
 * ]} last-updated=${Date.now()}></ai-status-page>
 * ```
 *
 * @prop {StatusService[]} services - Service entries with name, status, latency, uptime, history
 * @prop {Date|number|string} lastUpdated - Timestamp; rendered as relative time
 *
 * @slot active-incident - Banner shown above the overall row when an incident is active
 *
 * @fires {CustomEvent<{service: StatusService}>} ai-status-service-click - Service row clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-card/cg-card.js';
import '../cg-text/cg-text.js';
import '../cg-stack/cg-stack.js';

export interface StatusHistoryDay {
  date: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  incidents?: number;
}

export interface StatusService {
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  latency?: number;
  uptime?: number;
  history?: StatusHistoryDay[];
}

@customElement('ai-status-page')
export class AiStatusPage extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      display: block;
    }
    :host([hidden]) { display: none; }

    cg-card { display: block; }

    /* ── Header (title + last-updated) ── */
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-12);
      width: 100%;
    }

    /* ── Active-incident banner: only rendered when slotted ── */
    .incident-banner {
      display: none;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-status-error-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default);
      color: var(--cg-color-status-error-text-default);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin-bottom: var(--cg-spacing-16);
    }
    .incident-banner.has-content { display: block; }

    /* ── Overall row: minimal — dot + text + outlined pill, no colored fill ── */
    .overall {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) 0;
      margin-bottom: var(--cg-spacing-8);
    }

    .overall-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      flex-shrink: 0;
    }

    .overall-text { flex: 1; }

    /* ── Status dots (small, no animation, color-only) ── */
    .dot-operational  { background: var(--cg-color-status-success-text-default); }
    .dot-degraded     { background: var(--cg-color-status-warning-text-default); }
    .dot-down         { background: var(--cg-color-status-error-text-default); }
    .dot-maintenance  { background: var(--cg-color-status-info-text-default); }

    /* ── Status pills: outlined, text-color only — quiet ── */
    .pill {
      display: inline-flex;
      align-items: center;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      font-size: 10px;
      font-weight: var(--cg-font-weight-bold);
      letter-spacing: var(--cg-letter-spacing-wide);
      text-transform: uppercase;
      background: transparent;
      border: var(--cg-border-width-50) solid currentColor;
      flex-shrink: 0;
    }
    .pill-operational  { color: var(--cg-color-status-success-text-default); }
    .pill-degraded     { color: var(--cg-color-status-warning-text-default); }
    .pill-down         { color: var(--cg-color-status-error-text-default); }
    .pill-maintenance  { color: var(--cg-color-status-info-text-default); }

    /* ── Service rows: subtle hairline dividers, no heavy gaps ── */
    .service-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .service-item + .service-item {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    .service-item {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
      min-height: var(--cg-spacing-48);
      padding: var(--cg-spacing-12) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      font-family: inherit;
      color: inherit;
      transition:
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .service-item:hover {
      background: var(--cg-color-action-secondary-background-hover);
    }
    .service-item:active { transform: scale(var(--cg-interaction-press-scale)); }
    .service-item:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .service-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      width: 100%;
    }

    .service-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      flex-shrink: 0;
    }

    .service-name {
      flex: 1;
      min-width: 0;
    }

    .service-meta {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      flex-shrink: 0;
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
      font-variant-numeric: tabular-nums;
    }

    .service-meta .latency,
    .service-meta .uptime { white-space: nowrap; }

    /* ── 90-day uptime history bars: muted by default, vivid only on incident days ── */
    .history {
      display: flex;
      gap: 1px;
      align-items: stretch;
      height: var(--cg-spacing-12);
      padding-left: var(--cg-spacing-20);
    }
    .history-day {
      flex: 1;
      min-width: 2px;
      max-width: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-surface-cards-border);
      opacity: 0.7;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .history-day:hover { opacity: 1; transform: scaleY(1.2); }
    /* Operational days: muted, recede into background */
    .history-day.day-operational  {
      background: var(--cg-color-status-success-text-default);
      opacity: 0.35;
    }
    .history-day.day-operational:hover { opacity: 0.6; }
    /* Incident days: full opacity, eye locks on */
    .history-day.day-degraded     { background: var(--cg-color-status-warning-text-default); opacity: 1; }
    .history-day.day-down         { background: var(--cg-color-status-error-text-default); opacity: 1; }
    .history-day.day-maintenance  { background: var(--cg-color-status-info-text-default); opacity: 0.7; }

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

  @property({ type: Array }) services: StatusService[] = [];
  @property({ attribute: 'last-updated' }) lastUpdated?: string | number | Date;

  @state() private _hasIncident = false;

  private _onIncidentSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIncident = slot.assignedNodes({ flatten: true }).some(n => {
      if (n.nodeType === Node.TEXT_NODE) return (n.textContent ?? '').trim().length > 0;
      return n.nodeType === Node.ELEMENT_NODE;
    });
  }

  private _overallStatus(): StatusService['status'] {
    if (this.services.some(s => s.status === 'down')) return 'down';
    if (this.services.some(s => s.status === 'degraded')) return 'degraded';
    if (this.services.some(s => s.status === 'maintenance')) return 'maintenance';
    return 'operational';
  }

  private _overallText(status: StatusService['status']): string {
    return ({
      operational: 'All systems operational',
      degraded: 'Partial system degradation',
      down: 'Major outage in progress',
      maintenance: 'Scheduled maintenance',
    } as Record<string, string>)[status]!;
  }

  private _statusLabel(s: string): string {
    return ({ operational: 'Operational', degraded: 'Degraded', down: 'Down', maintenance: 'Maintenance' } as Record<string, string>)[s] ?? s;
  }

  private _relativeTime(ts: string | number | Date | undefined): string {
    if (!ts) return '';
    const d = ts instanceof Date ? ts : new Date(ts);
    const diff = Math.max(0, Date.now() - d.getTime());
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `Updated ${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `Updated ${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `Updated ${hr}h ago`;
    return `Updated ${Math.floor(hr / 24)}d ago`;
  }

  private _handleClick(service: StatusService) {
    this.dispatchEvent(new CustomEvent('ai-status-service-click', {
      detail: { service },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    const overall = this._overallStatus();
    const overallText = this._overallText(overall);
    const updated = this._relativeTime(this.lastUpdated);

    return html`
      <cg-card variant="outlined" padding="lg" rounded="lg" role="region" aria-label="System status">
        <div class="sr-only" aria-live="polite" aria-atomic="true">${overallText}</div>

        <div slot="header" class="header-row">
          <cg-text as="h3" size="md" weight="bold">System Status</cg-text>
          ${updated ? html`<cg-text size="xs" color="muted">${updated}</cg-text>` : nothing}
        </div>

        <div class="incident-banner ${this._hasIncident ? 'has-content' : ''}">
          <slot name="active-incident" @slotchange=${this._onIncidentSlotChange}></slot>
        </div>

        <div class="overall">
          <span class="overall-dot dot-${overall}" aria-hidden="true"></span>
          <cg-text class="overall-text" size="md" weight="bold">${overallText}</cg-text>
          ${overall !== 'operational'
            ? html`<span class="pill pill-${overall}">${this._statusLabel(overall)}</span>`
            : nothing}
        </div>

        <div class="service-list" role="list" aria-label="Service status list">
          ${this.services.map(svc => html`
            <button
              class="service-item"
              role="listitem"
              aria-label="${svc.name}: ${this._statusLabel(svc.status)}"
              @click=${() => this._handleClick(svc)}
            >
              <div class="service-row">
                <span class="service-dot dot-${svc.status}" aria-hidden="true"></span>
                <cg-text class="service-name" size="sm" weight="medium">${svc.name}</cg-text>
                <div class="service-meta">
                  ${svc.latency != null ? html`<span class="latency">${svc.latency}ms</span>` : nothing}
                  ${svc.uptime != null ? html`<span class="uptime">${svc.uptime}%</span>` : nothing}
                  ${svc.status !== 'operational'
                    ? html`<span class="pill pill-${svc.status}">${this._statusLabel(svc.status)}</span>`
                    : nothing}
                </div>
              </div>
              ${svc.history && svc.history.length > 0 ? html`
                <div class="history" aria-label="${svc.history.length}-day uptime history">
                  ${svc.history.map(d => html`
                    <span class="history-day day-${d.status}" title="${d.date}: ${this._statusLabel(d.status)}${d.incidents ? ` (${d.incidents} incidents)` : ''}"></span>
                  `)}
                </div>
              ` : nothing}
            </button>
          `)}
        </div>
      </cg-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-status-page': AiStatusPage;
  }
}
