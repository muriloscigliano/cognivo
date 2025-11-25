import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ApprovalAction {
  id: string;
  label: string;
  description: string;
  type: 'create' | 'update' | 'delete' | 'send' | 'execute' | 'other';
  target?: string;
  preview?: string;
  risk?: 'low' | 'medium' | 'high';
  reversible?: boolean;
}

/**
 * AI Approval Flow
 *
 * Shape of AI Pattern: Governor > Human-in-the-Loop
 *
 * Maintains user agency by showing actions the AI will take
 * before execution and requiring approval for important operations.
 *
 * @element ai-approval-flow
 *
 * @fires ai:approve - Fired when user approves actions
 * @fires ai:reject - Fired when user rejects actions
 * @fires ai:modify - Fired when user wants to modify before approval
 * @fires ai:action-toggle - Fired when individual action is toggled
 */
@customElement('ai-approval-flow')
export class AiApprovalFlow extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .container {
        background: ${tokens.color.grayWhite};
        border: 2px solid ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.xl};
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: linear-gradient(135deg, ${tokens.color.aiBackground}, rgba(6, 182, 212, 0.1));
        border-bottom: 1px solid ${tokens.color.aiBorder};
      }

      .header-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.lg};
        font-size: 20px;
      }

      .header-content {
        flex: 1;
      }

      .header-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: 2px;
      }

      .header-subtitle {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray600};
      }

      /* Actions list */
      .actions-list {
        padding: ${tokens.spacing.md};
      }

      .action-item {
        display: flex;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        margin-bottom: ${tokens.spacing.sm};
        transition: all ${tokens.transition.fast};
      }

      .action-item:last-child {
        margin-bottom: 0;
      }

      .action-item.deselected {
        opacity: 0.5;
      }

      .action-item:hover {
        border-color: ${tokens.color.gray200};
      }

      /* Checkbox */
      .action-checkbox {
        flex-shrink: 0;
        padding-top: 2px;
      }

      .checkbox {
        width: 20px;
        height: 20px;
        border: 2px solid ${tokens.color.gray300};
        border-radius: ${tokens.radius.sm};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        background: ${tokens.color.grayWhite};
      }

      .checkbox.checked {
        background: ${tokens.color.aiAccent};
        border-color: ${tokens.color.aiAccent};
      }

      .checkbox.checked::after {
        content: '✓';
        color: white;
        font-size: 12px;
        font-weight: bold;
      }

      /* Action icon */
      .action-icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        font-size: 16px;
        flex-shrink: 0;
      }

      .action-icon.create { background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.2); }
      .action-icon.update { background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.2); }
      .action-icon.delete { background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); }
      .action-icon.send { background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.2); }
      .action-icon.execute { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.2); }

      /* Action content */
      .action-content {
        flex: 1;
        min-width: 0;
      }

      .action-label {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: 2px;
      }

      .action-description {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        line-height: 1.4;
      }

      .action-target {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin-top: ${tokens.spacing.xs};
        padding: 2px 8px;
        background: ${tokens.color.gray200};
        border-radius: ${tokens.radius.full};
        font-size: 10px;
        color: ${tokens.color.gray600};
        font-family: monospace;
      }

      /* Preview */
      .action-preview {
        margin-top: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.grayWhite};
        border: 1px dashed ${tokens.color.gray200};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray600};
        line-height: 1.5;
        max-height: 80px;
        overflow: hidden;
      }

      /* Risk indicator */
      .risk-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: ${tokens.radius.full};
        font-size: 10px;
        font-weight: ${tokens.fontWeight.semibold};
        text-transform: uppercase;
      }

      .risk-badge.low {
        background: rgba(34, 197, 94, 0.1);
        color: #16a34a;
      }

      .risk-badge.medium {
        background: rgba(245, 158, 11, 0.1);
        color: #d97706;
      }

      .risk-badge.high {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
      }

      /* Action meta */
      .action-meta {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        margin-top: ${tokens.spacing.xs};
      }

      .reversible-badge {
        font-size: 10px;
        color: ${tokens.color.gray500};
      }

      /* Footer */
      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      .footer-info {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .selected-count {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
      }

      .footer-actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .btn-secondary {
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        color: ${tokens.color.gray700};
      }

      .btn-secondary:hover {
        background: ${tokens.color.gray50};
      }

      .btn-danger {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        color: #dc2626;
      }

      .btn-danger:hover {
        background: rgba(239, 68, 68, 0.2);
      }

      .btn-primary {
        background: ${tokens.color.aiAccent};
        color: white;
      }

      .btn-primary:hover {
        opacity: 0.9;
      }

      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Warning banner */
      .warning-banner {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: rgba(239, 68, 68, 0.08);
        border-bottom: 1px solid rgba(239, 68, 68, 0.2);
        font-size: ${tokens.fontSize.xs};
        color: #dc2626;
      }

      /* Select all */
      .select-all {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border-bottom: 1px solid ${tokens.color.gray100};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .select-all-btn {
        background: none;
        border: none;
        color: ${tokens.color.aiAccent};
        font-size: ${tokens.fontSize.xs};
        cursor: pointer;
        text-decoration: underline;
      }
    `
  ];

  @property({ type: Array }) actions: ApprovalAction[] = [];
  @property({ type: String }) title = 'Confirm AI Actions';
  @property({ type: String }) subtitle = 'Review the actions the AI will perform';
  @property({ type: Boolean, attribute: 'show-preview' }) showPreview = true;

  @state() private selectedActions: Set<string> = new Set();

  override connectedCallback() {
    super.connectedCallback();
    // Select all by default
    this.selectedActions = new Set(this.actions.map(a => a.id));
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('actions')) {
      this.selectedActions = new Set(this.actions.map(a => a.id));
    }
  }

  private getActionIcon(type: string): string {
    switch (type) {
      case 'create': return '➕';
      case 'update': return '✏️';
      case 'delete': return '🗑️';
      case 'send': return '📤';
      case 'execute': return '⚡';
      default: return '📋';
    }
  }

  private toggleAction(actionId: string) {
    const newSelected = new Set(this.selectedActions);
    if (newSelected.has(actionId)) {
      newSelected.delete(actionId);
    } else {
      newSelected.add(actionId);
    }
    this.selectedActions = newSelected;

    this.dispatchEvent(new CustomEvent('ai:action-toggle', {
      detail: { actionId, selected: this.selectedActions.has(actionId) },
      bubbles: true,
      composed: true
    }));
  }

  private selectAll() {
    this.selectedActions = new Set(this.actions.map(a => a.id));
  }

  private selectNone() {
    this.selectedActions = new Set();
  }

  private hasHighRiskActions(): boolean {
    return this.actions.some(a => a.risk === 'high' && this.selectedActions.has(a.id));
  }

  private handleApprove() {
    const selectedActions = this.actions.filter(a => this.selectedActions.has(a.id));
    this.dispatchEvent(new CustomEvent('ai:approve', {
      detail: { actions: selectedActions },
      bubbles: true,
      composed: true
    }));
  }

  private handleReject() {
    this.dispatchEvent(new CustomEvent('ai:reject', {
      detail: { actions: this.actions },
      bubbles: true,
      composed: true
    }));
  }

  private handleModify() {
    this.dispatchEvent(new CustomEvent('ai:modify', {
      detail: { actions: this.actions },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    const selectedCount = this.selectedActions.size;
    const hasHighRisk = this.hasHighRiskActions();

    return html`
      <div class="container">
        <div class="header">
          <div class="header-icon">🤖</div>
          <div class="header-content">
            <div class="header-title">${this.title}</div>
            <div class="header-subtitle">${this.subtitle}</div>
          </div>
        </div>

        ${hasHighRisk ? html`
          <div class="warning-banner">
            <span>⚠️</span>
            <span>This includes high-risk actions. Please review carefully.</span>
          </div>
        ` : null}

        <div class="select-all">
          <span>${selectedCount} of ${this.actions.length} actions selected</span>
          <button class="select-all-btn" @click=${this.selectAll}>Select all</button>
          <button class="select-all-btn" @click=${this.selectNone}>Select none</button>
        </div>

        <div class="actions-list">
          ${this.actions.map(action => html`
            <div class="action-item ${this.selectedActions.has(action.id) ? '' : 'deselected'}">
              <div class="action-checkbox">
                <div
                  class="checkbox ${this.selectedActions.has(action.id) ? 'checked' : ''}"
                  @click=${() => this.toggleAction(action.id)}
                ></div>
              </div>

              <div class="action-icon ${action.type}">
                ${this.getActionIcon(action.type)}
              </div>

              <div class="action-content">
                <div class="action-label">${action.label}</div>
                <div class="action-description">${action.description}</div>

                ${action.target ? html`
                  <span class="action-target">
                    <span>📁</span>
                    ${action.target}
                  </span>
                ` : null}

                ${this.showPreview && action.preview ? html`
                  <div class="action-preview">${action.preview}</div>
                ` : null}

                <div class="action-meta">
                  ${action.risk ? html`
                    <span class="risk-badge ${action.risk}">
                      ${action.risk === 'high' ? '⚠️' : action.risk === 'medium' ? '⚡' : '✓'}
                      ${action.risk} risk
                    </span>
                  ` : null}
                  ${action.reversible !== undefined ? html`
                    <span class="reversible-badge">
                      ${action.reversible ? '↩️ Reversible' : '⚠️ Irreversible'}
                    </span>
                  ` : null}
                </div>
              </div>
            </div>
          `)}
        </div>

        <div class="footer">
          <div class="footer-info">
            <span class="selected-count">${selectedCount}</span>
            <span>actions will be performed</span>
          </div>
          <div class="footer-actions">
            <button class="btn btn-danger" @click=${this.handleReject}>
              Cancel
            </button>
            <button class="btn btn-secondary" @click=${this.handleModify}>
              Modify
            </button>
            <button
              class="btn btn-primary"
              ?disabled=${selectedCount === 0}
              @click=${this.handleApprove}
            >
              <span>✓</span>
              Approve ${selectedCount > 0 ? `(${selectedCount})` : ''}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-approval-flow': AiApprovalFlow;
  }
}
