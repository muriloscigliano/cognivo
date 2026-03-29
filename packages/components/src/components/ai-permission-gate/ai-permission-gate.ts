/**
 * <ai-permission-gate> — Role-based access control display for AI features
 *
 * Props: permissions, currentRole
 * Events: ai-permission-request
 * Features: Feature list with allow/deny icons per role, request access button
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

interface Permission {
  feature: string;
  role: string;
  allowed: boolean;
  reason?: string;
}

@customElement('ai-permission-gate')
export class AiPermissionGate extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([hidden]) { display: none; }

    .container {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 20px;
      color: #fafafa;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
    }

    .role-badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: #27272a;
      color: #a1a1aa;
      padding: 4px 10px;
      border-radius: 6px;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .feature-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      background: #09090b;
      border: 1px solid #27272a;
      transition: border-color 120ms ease;
    }
    .feature-row:hover { border-color: #3f3f46; }

    .status-icon {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      flex-shrink: 0;
    }
    .status-icon.allowed {
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
    }
    .status-icon.denied {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    .feature-info { flex: 1; min-width: 0; }

    .feature-name {
      font-size: 13px;
      font-weight: 600;
      color: #fafafa;
    }

    .feature-role {
      font-size: 11px;
      color: #52525b;
      margin-top: 2px;
    }

    .feature-reason {
      font-size: 11px;
      color: #71717a;
      margin-top: 2px;
      font-style: italic;
    }

    .request-btn {
      background: transparent;
      border: 1px solid #27272a;
      color: #a1a1aa;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 150ms ease;
    }
    .request-btn:hover {
      border-color: #dfff61;
      color: #dfff61;
    }
    .request-btn:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }

    .summary {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #27272a;
      display: flex;
      gap: 16px;
      font-size: 11px;
      color: #71717a;
    }

    .summary-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .dot-green { color: #22c55e; }
    .dot-red { color: #ef4444; }

    .empty-state {
      text-align: center;
      color: #52525b;
      font-size: 13px;
      padding: 32px 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .feature-row, .request-btn { transition: none; }
    }
  `;

  @property({ type: Array }) permissions: Permission[] = [];
  @property({ type: String }) currentRole = '';

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
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    const perms = this._relevantPermissions;

    return html`
      <div class="container" role="region" aria-label="Permission gate">
        <div class="header">
          <span class="title">Feature Permissions</span>
          ${this.currentRole ? html`
            <span class="role-badge" aria-label="Current role: ${this.currentRole}">${this.currentRole}</span>
          ` : nothing}
        </div>

        ${perms.length === 0 ? html`
          <div class="empty-state" role="status">No permissions configured</div>
        ` : html`
          <div class="feature-list" role="list" aria-label="Feature permissions list">
            ${perms.map(p => html`
              <div class="feature-row" role="listitem">
                <div class="status-icon ${p.allowed ? 'allowed' : 'denied'}" aria-hidden="true">
                  ${p.allowed ? '\u2713' : '\u2717'}
                </div>
                <div class="feature-info">
                  <div class="feature-name">${p.feature}</div>
                  <div class="feature-role">Role: ${p.role}</div>
                  ${p.reason ? html`<div class="feature-reason">${p.reason}</div>` : nothing}
                </div>
                ${!p.allowed ? html`
                  <button
                    class="request-btn"
                    @click=${() => this._requestAccess(p)}
                    aria-label="Request access to ${p.feature}"
                    tabindex="0"
                  >Request Access</button>
                ` : nothing}
              </div>
            `)}
          </div>

          <div class="summary">
            <span class="summary-item">
              <span class="dot-green">\u25CF</span> ${this._allowedCount} allowed
            </span>
            <span class="summary-item">
              <span class="dot-red">\u25CF</span> ${this._deniedCount} denied
            </span>
          </div>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-permission-gate': AiPermissionGate;
  }
}
