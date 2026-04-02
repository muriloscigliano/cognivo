/**
 * @element ai-permission-gate
 * Role-based access control panel showing which AI features are allowed
 * or denied for the current role. Denied features show a "Request Access"
 * button. Includes an allowed/denied summary footer.
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
 * @prop {Permission[]} permissions - Array of permission entries
 * @prop {string} currentRole - Active role to filter permissions by
 *
 * @fires {CustomEvent<{feature: string, role: string}>} ai-permission-request - When "Request Access" is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

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
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      padding: var(--cg-spacing-16, 16px);
      color: var(--cg-color-surface-base-text, #fafafa);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-16, 16px);
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: 600;
    }

    .role-badge {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--cg-color-surface-container-border, #27272a);
      color: var(--cg-gray-400, #a1a1aa);
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-8, 8px);
      border-radius: var(--cg-border-radius-100, 8px);
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-4, 4px);
    }

    .feature-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      border-radius: var(--cg-border-radius-100, 8px);
      background: #09090b;
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      transition: border-color 120ms ease;
    }
    .feature-row:hover { border-color: var(--cg-gray-700, #3f3f46); }

    .status-icon {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-xs, 12px);
      flex-shrink: 0;
    }
    .status-icon.allowed {
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
    }
    .status-icon.denied {
      background: rgba(239, 68, 68, 0.15);
      color: var(--cg-color-status-error-text-default, #ef4444);
    }

    .feature-info { flex: 1; min-width: 0; }

    .feature-name {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
    }

    .feature-role {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-600, #52525b);
      margin-top: 2px;
    }

    .feature-reason {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      margin-top: 2px;
      font-style: italic;
    }

    .request-btn {
      background: transparent;
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      color: var(--cg-gray-400, #a1a1aa);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      padding: var(--cg-spacing-6, 6px) var(--cg-spacing-12, 12px);
      border-radius: var(--cg-border-radius-100, 8px);
      cursor: pointer;
      flex-shrink: 0;
      transition: all 150ms ease;
    }
    .request-btn:hover {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-brand-ai-accent, #dfff61);
    }
    .request-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .summary {
      margin-top: var(--cg-spacing-12, 12px);
      padding-top: 12px;
      border-top: 1px solid var(--cg-color-surface-container-border, #27272a);
      display: flex;
      gap: var(--cg-spacing-16, 16px);
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
    }

    .summary-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
    }

    .dot-green { color: #22c55e; }
    .dot-red { color: var(--cg-color-status-error-text-default, #ef4444); }

    .empty-state {
      text-align: center;
      color: var(--cg-gray-600, #52525b);
      font-size: var(--cg-font-size-sm, 14px);
      padding: var(--cg-spacing-24, 24px) 0;
    }

  `];

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
