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
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      color: var(--cg-color-surface-base-text);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-16);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
    }

    .role-badge {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-4);
    }

    .feature-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .feature-row:hover { border-color: var(--cg-color-surface-cards-border); }

    .status-icon {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-xs);
      flex-shrink: 0;
    }
    .status-icon.allowed {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text);
    }
    .status-icon.denied {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }

    .feature-info { flex: 1; min-width: 0; }

    .feature-name {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    .feature-role {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-2);
    }

    .feature-reason {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-2);
      font-style: italic;
    }

    .request-btn {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      flex-shrink: 0;
      transition: opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .request-btn:hover {
      border-color: var(--cg-color-surface-base-text);
      color: var(--cg-color-surface-base-text);
    }
    .request-btn:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .request-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .summary {
      margin-top: var(--cg-spacing-12);
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      display: flex;
      gap: var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .summary-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
    }

    .dot-green { color: var(--cg-color-status-success-text); }
    .dot-red { color: var(--cg-color-status-error-text-default); }

    .empty-state {
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
      padding: var(--cg-spacing-24) 0;
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .container { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
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
