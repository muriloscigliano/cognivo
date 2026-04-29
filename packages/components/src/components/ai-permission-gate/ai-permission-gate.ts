/**
 * @element ai-permission-gate
 * RBAC permission panel built from design-system primitives (cg-card, cg-text, cg-button, cg-badge).
 * Shows allowed/denied features for a role, with a "Request Access" CTA on denied items
 * and an allowed/denied summary footer.
 *
 * @example
 * ```html
 * <ai-permission-gate
 *   currentRole="editor"
 *   .permissions=${[
 *     { feature: 'Code Generation', role: 'editor', allowed: true },
 *     { feature: 'Fine-tuning', role: 'editor', allowed: false, reason: 'Admin only' }
 *   ]}
 * ></ai-permission-gate>
 * ```
 *
 * @prop {Permission[]} permissions - Permission entries
 * @prop {string} currentRole - Active role to filter by
 *
 * @fires {CustomEvent<{feature: string, role: string}>} ai-permission-request - Request Access clicked
 */
import { LitElement, html, css, nothing, svg } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-card/cg-card.js';
import '../cg-text/cg-text.js';
import '../cg-button/cg-button.js';
import '../cg-badge/cg-badge.js';

interface Permission {
  feature: string;
  role: string;
  allowed: boolean;
  reason?: string;
}

@customElement('ai-permission-gate')
export class AiPermissionGate extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      display: block;
    }
    :host([hidden]) { display: none; }

    cg-card { display: block; }

    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-12);
      width: 100%;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .feature-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-8);
      min-height: var(--cg-spacing-48);
    }
    .feature-row + .feature-row {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    .status-icon {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-full);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .status-icon svg { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }
    .status-icon.allowed {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
    }
    .status-icon.denied {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }

    .feature-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
    }

    .summary {
      margin-top: var(--cg-spacing-12);
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      display: flex;
      gap: var(--cg-spacing-16);
    }
    .summary-item {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
    }
    .dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      flex-shrink: 0;
    }
    .dot-green { background: var(--cg-color-status-success-text-default); }
    .dot-red { background: var(--cg-color-status-error-text-default); }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24) 0;
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) permissions: Permission[] = [];
  @property({ type: String, attribute: 'current-role' }) currentRole = '';

  private get _relevantPermissions(): Permission[] {
    if (!this.currentRole) return this.permissions;
    return this.permissions.filter(p => p.role === this.currentRole);
  }

  private get _allowedCount(): number {
    return this._relevantPermissions.filter(p => p.allowed).length;
  }

  private get _deniedCount(): number {
    return this._relevantPermissions.filter(p => !p.allowed).length;
  }

  private _requestAccess(permission: Permission) {
    this.dispatchEvent(new CustomEvent('ai-permission-request', {
      detail: { feature: permission.feature, role: permission.role },
      bubbles: true, composed: true,
    }));
  }

  private _checkIcon() {
    return svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  }
  private _xIcon() {
    return svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
  }

  override render() {
    const perms = this._relevantPermissions;

    return html`
      <cg-card variant="outlined" padding="md" rounded=${this.rounded} role="region" aria-label="Permission gate">
        <div slot="header" class="header-row">
          <cg-text size="sm" weight="semibold">Feature Permissions</cg-text>
          ${this.currentRole
            ? html`<cg-badge variant="neutral" size="sm" rounded="full">${this.currentRole}</cg-badge>`
            : nothing}
        </div>

        ${perms.length === 0 ? html`
          <div class="empty">
            <cg-text size="sm" color="muted">No permissions configured</cg-text>
          </div>
        ` : html`
          <div class="feature-list" role="list" aria-label="Feature permissions list">
            ${perms.map(p => html`
              <div class="feature-row" role="listitem">
                <span class="status-icon ${p.allowed ? 'allowed' : 'denied'}" aria-hidden="true">
                  ${p.allowed ? this._checkIcon() : this._xIcon()}
                </span>
                <div class="feature-info">
                  <cg-text size="sm" weight="semibold">${p.feature}</cg-text>
                  <cg-text size="xs" color="muted">Role: ${p.role}</cg-text>
                  ${p.reason ? html`<cg-text size="xs" color="muted" style="font-style:italic;">${p.reason}</cg-text>` : nothing}
                </div>
                ${!p.allowed ? html`
                  <cg-button
                    variant="secondary"
                    size="sm"
                    aria-label="Request access to ${p.feature}"
                    @click=${() => this._requestAccess(p)}
                  >Request Access</cg-button>
                ` : nothing}
              </div>
            `)}
          </div>

          <div class="summary">
            <span class="summary-item">
              <span class="dot dot-green" aria-hidden="true"></span>
              <cg-text size="xs" color="muted">${this._allowedCount} allowed</cg-text>
            </span>
            <span class="summary-item">
              <span class="dot dot-red" aria-hidden="true"></span>
              <cg-text size="xs" color="muted">${this._deniedCount} denied</cg-text>
            </span>
          </div>
        `}
      </cg-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-permission-gate': AiPermissionGate;
  }
}
