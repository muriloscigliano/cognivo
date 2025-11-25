import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export type CaveatType = 'info' | 'warning' | 'accuracy' | 'bias' | 'limitation' | 'experimental';

/**
 * AI Caveat
 *
 * Shape of AI Pattern: Trust Marker > Caveat
 *
 * Reminds users that AI systems may be wrong, incomplete, or biased.
 * Builds habits of skepticism and critical thinking.
 *
 * @element ai-caveat
 *
 * @fires ai:caveat-dismiss - Fired when caveat is dismissed
 * @fires ai:caveat-learn-more - Fired when learn more is clicked
 */
@customElement('ai-caveat')
export class AiCaveat extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .caveat {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md};
        border-radius: ${tokens.radius.lg};
        transition: all ${tokens.transition.fast};
      }

      /* Type variants */
      .caveat.info {
        background: rgba(59, 130, 246, 0.08);
        border: 1px solid rgba(59, 130, 246, 0.2);
      }

      .caveat.warning {
        background: rgba(245, 158, 11, 0.08);
        border: 1px solid rgba(245, 158, 11, 0.2);
      }

      .caveat.accuracy {
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
      }

      .caveat.bias {
        background: rgba(239, 68, 68, 0.08);
        border: 1px solid rgba(239, 68, 68, 0.2);
      }

      .caveat.limitation {
        background: ${tokens.color.gray100};
        border: 1px solid ${tokens.color.gray200};
      }

      .caveat.experimental {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(6, 182, 212, 0.08));
        border: 1px solid rgba(139, 92, 246, 0.2);
      }

      /* Icon */
      .icon-wrapper {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: ${tokens.radius.md};
        flex-shrink: 0;
        font-size: 16px;
      }

      .caveat.info .icon-wrapper { background: rgba(59, 130, 246, 0.15); }
      .caveat.warning .icon-wrapper { background: rgba(245, 158, 11, 0.15); }
      .caveat.accuracy .icon-wrapper { background: rgba(139, 92, 246, 0.15); }
      .caveat.bias .icon-wrapper { background: rgba(239, 68, 68, 0.15); }
      .caveat.limitation .icon-wrapper { background: ${tokens.color.gray200}; }
      .caveat.experimental .icon-wrapper { background: rgba(139, 92, 246, 0.15); }

      /* Content */
      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        margin-bottom: 4px;
      }

      .caveat.info .title { color: #2563eb; }
      .caveat.warning .title { color: #d97706; }
      .caveat.accuracy .title { color: ${tokens.color.aiAccent}; }
      .caveat.bias .title { color: #dc2626; }
      .caveat.limitation .title { color: ${tokens.color.gray700}; }
      .caveat.experimental .title { color: ${tokens.color.aiAccent}; }

      .message {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray600};
        line-height: 1.5;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        margin-top: ${tokens.spacing.sm};
      }

      .action-link {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        text-decoration: none;
        cursor: pointer;
        transition: color ${tokens.transition.fast};
      }

      .action-link:hover {
        color: ${tokens.color.gray700};
        text-decoration: underline;
      }

      .caveat.accuracy .action-link:hover { color: ${tokens.color.aiAccent}; }

      /* Dismiss button */
      .dismiss-btn {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        border-radius: ${tokens.radius.sm};
        color: ${tokens.color.gray400};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        flex-shrink: 0;
      }

      .dismiss-btn:hover {
        background: rgba(0, 0, 0, 0.05);
        color: ${tokens.color.gray600};
      }

      /* Compact variant */
      :host([compact]) .caveat {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        gap: ${tokens.spacing.sm};
      }

      :host([compact]) .icon-wrapper {
        width: 24px;
        height: 24px;
        font-size: 12px;
      }

      :host([compact]) .title {
        font-size: ${tokens.fontSize.xs};
        margin-bottom: 0;
      }

      :host([compact]) .message {
        font-size: ${tokens.fontSize.xs};
      }

      :host([compact]) .content {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        flex-wrap: wrap;
      }

      /* Inline variant */
      :host([inline]) .caveat {
        display: inline-flex;
        padding: 4px 10px;
        border-radius: ${tokens.radius.full};
        gap: ${tokens.spacing.xs};
      }

      :host([inline]) .icon-wrapper {
        width: 16px;
        height: 16px;
        font-size: 10px;
        background: none;
      }

      :host([inline]) .title,
      :host([inline]) .actions {
        display: none;
      }

      :host([inline]) .message {
        font-size: ${tokens.fontSize.xs};
      }

      /* Banner variant */
      :host([banner]) .caveat {
        border-radius: 0;
        border-left: none;
        border-right: none;
      }

      /* Animation for dismissal */
      .caveat.dismissing {
        opacity: 0;
        transform: translateY(-10px);
      }

      /* Expandable details */
      .details {
        margin-top: ${tokens.spacing.sm};
        padding-top: ${tokens.spacing.sm};
        border-top: 1px dashed currentColor;
        opacity: 0.3;
      }

      .details-content {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        line-height: 1.6;
      }

      .expand-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: color ${tokens.transition.fast};
      }

      .expand-btn:hover {
        color: ${tokens.color.gray700};
      }

      .expand-icon {
        transition: transform ${tokens.transition.fast};
      }

      .expand-icon.expanded {
        transform: rotate(180deg);
      }
    `
  ];

  @property({ type: String, reflect: true }) type: CaveatType = 'accuracy';
  @property({ type: String }) title = '';
  @property({ type: String }) message = '';
  @property({ type: String }) details = '';
  @property({ type: String, attribute: 'learn-more-url' }) learnMoreUrl = '';
  @property({ type: Boolean }) dismissible = false;
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Boolean, reflect: true }) inline = false;
  @property({ type: Boolean, reflect: true }) banner = false;

  @state() private expanded = false;
  @state() private dismissed = false;

  private getDefaultTitle(): string {
    switch (this.type) {
      case 'info': return 'Information';
      case 'warning': return 'Please Note';
      case 'accuracy': return 'AI-Generated Content';
      case 'bias': return 'Potential Bias';
      case 'limitation': return 'Limitation';
      case 'experimental': return 'Experimental Feature';
      default: return 'Notice';
    }
  }

  private getDefaultMessage(): string {
    switch (this.type) {
      case 'accuracy':
        return 'This content was generated by AI and may contain inaccuracies. Please verify important information.';
      case 'bias':
        return 'AI systems may reflect biases present in training data. Results should be reviewed critically.';
      case 'limitation':
        return 'This AI has limitations and may not fully understand context or nuance.';
      case 'experimental':
        return 'This is an experimental AI feature. Results may vary and improve over time.';
      case 'warning':
        return 'Please review this AI-generated content carefully before taking action.';
      default:
        return 'AI-assisted content. Review before use.';
    }
  }

  private getIcon(): string {
    switch (this.type) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'accuracy': return '✨';
      case 'bias': return '⚖️';
      case 'limitation': return '🔒';
      case 'experimental': return '🧪';
      default: return '💡';
    }
  }

  private handleDismiss() {
    this.dismissed = true;
    this.dispatchEvent(new CustomEvent('ai:caveat-dismiss', {
      detail: { type: this.type },
      bubbles: true,
      composed: true
    }));
  }

  private handleLearnMore() {
    this.dispatchEvent(new CustomEvent('ai:caveat-learn-more', {
      detail: { type: this.type, url: this.learnMoreUrl },
      bubbles: true,
      composed: true
    }));

    if (this.learnMoreUrl) {
      window.open(this.learnMoreUrl, '_blank');
    }
  }

  override render() {
    if (this.dismissed) return null;

    const displayTitle = this.title || this.getDefaultTitle();
    const displayMessage = this.message || this.getDefaultMessage();

    return html`
      <div class="caveat ${this.type}">
        <div class="icon-wrapper">
          ${this.getIcon()}
        </div>

        <div class="content">
          <div class="title">${displayTitle}</div>
          <div class="message">${displayMessage}</div>

          ${this.details ? html`
            <button class="expand-btn" @click=${() => this.expanded = !this.expanded}>
              <span>${this.expanded ? 'Show less' : 'Learn more'}</span>
              <span class="expand-icon ${this.expanded ? 'expanded' : ''}">▼</span>
            </button>

            ${this.expanded ? html`
              <div class="details">
                <div class="details-content">${this.details}</div>
              </div>
            ` : null}
          ` : null}

          ${!this.inline && (this.learnMoreUrl || this.details) ? html`
            <div class="actions">
              ${this.learnMoreUrl && !this.details ? html`
                <a class="action-link" @click=${this.handleLearnMore}>Learn more →</a>
              ` : null}
            </div>
          ` : null}
        </div>

        ${this.dismissible ? html`
          <button class="dismiss-btn" @click=${this.handleDismiss} aria-label="Dismiss">
            ×
          </button>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-caveat': AiCaveat;
  }
}
