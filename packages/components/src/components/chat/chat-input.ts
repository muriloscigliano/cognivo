import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('chat-input')
export class ChatInput extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .input-container {
        display: flex;
        align-items: flex-end;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.md};
        background: white;
        border-top: 1px solid ${tokens.color.gray100};
      }

      .input-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .input-actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .textarea-container {
        position: relative;
        display: flex;
        align-items: flex-end;
        background: ${tokens.color.gray50};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        transition: all ${tokens.transition.fast};
      }

      .textarea-container:focus-within {
        border-color: ${tokens.color.aiAccent};
        background: white;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      textarea {
        flex: 1;
        min-height: 44px;
        max-height: 200px;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: none;
        background: transparent;
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.base};
        line-height: ${tokens.lineHeight.normal};
        color: ${tokens.color.gray900};
        resize: none;
        outline: none;
      }

      textarea::placeholder {
        color: ${tokens.color.gray500};
      }

      .action-button {
        padding: ${tokens.spacing.sm};
        background: transparent;
        border: none;
        color: ${tokens.color.gray500};
        cursor: pointer;
        border-radius: ${tokens.radius.sm};
        transition: all ${tokens.transition.fast};
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
      }

      .action-button:hover {
        background: ${tokens.color.gray50};
        color: ${tokens.color.gray900};
      }

      .action-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .send-button {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.aiAccent};
        color: white;
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        min-width: 80px;
        justify-content: center;
      }

      .send-button:hover:not(:disabled) {
        background: ${tokens.color.primaryDark};
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
      }

      .send-button:active:not(:disabled) {
        transform: translateY(0);
      }

      .send-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .send-icon {
        font-size: 18px;
      }

      /* Attachment preview */
      .attachments {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} 0;
      }

      .attachment-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: 4px ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
      }

      .attachment-name {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .remove-attachment {
        background: none;
        border: none;
        color: ${tokens.color.gray500};
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        font-size: 16px;
      }

      .remove-attachment:hover {
        color: ${tokens.color.danger};
      }

      /* Character counter */
      .char-counter {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        text-align: right;
        padding: 0 ${tokens.spacing.xs};
      }

      .char-counter.warning {
        color: ${tokens.color.warning};
      }

      .char-counter.error {
        color: ${tokens.color.danger};
      }

      /* File input hidden */
      input[type="file"] {
        display: none;
      }

      /* Loading state */
      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: ${tokens.radius.md};
      }
    `
  ];

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = 'Type a message...';

  @property({ type: Number })
  maxLength = 5000;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  showAttachments = true;

  @property({ type: Boolean })
  showEmoji = true;

  @property({ type: Boolean })
  showCharCounter = false;

  @state()
  private attachments: File[] = [];

  private textareaRef?: HTMLTextAreaElement;
  private fileInputRef?: HTMLInputElement;

  private handleInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.value = textarea.value;

    // Auto-resize textarea
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    this.dispatchEvent(new CustomEvent('input-change', {
      detail: { value: this.value }
    }));
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSend();
    }
  }

  private handleSend() {
    if (!this.value.trim() && this.attachments.length === 0) return;
    if (this.disabled || this.loading) return;

    this.dispatchEvent(new CustomEvent('message-send', {
      detail: {
        content: this.value,
        attachments: this.attachments
      },
      bubbles: true,
      composed: true
    }));

    this.value = '';
    this.attachments = [];
    if (this.textareaRef) {
      this.textareaRef.style.height = 'auto';
      this.textareaRef.focus();
    }
  }

  private handleAttachmentClick() {
    this.fileInputRef?.click();
  }

  private handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.attachments = [...this.attachments, ...Array.from(input.files)];
      input.value = '';
      this.requestUpdate();
    }
  }

  private removeAttachment(index: number) {
    this.attachments = this.attachments.filter((_, i) => i !== index);
    this.requestUpdate();
  }

  override firstUpdated() {
    this.textareaRef = this.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
    this.fileInputRef = this.shadowRoot?.querySelector('input[type="file"]') as HTMLInputElement;
  }

  private get charCount() {
    return this.value.length;
  }

  private get charCounterClass() {
    const ratio = this.charCount / this.maxLength;
    if (ratio >= 1) return 'error';
    if (ratio >= 0.9) return 'warning';
    return '';
  }

  override render() {
    return html`
      <div class="input-container">
        <div class="input-wrapper">
          ${this.attachments.length > 0 ? html`
            <div class="attachments">
              ${this.attachments.map((file, index) => html`
                <div class="attachment-item">
                  <span class="attachment-name">${file.name}</span>
                  <button
                    class="remove-attachment"
                    @click=${() => this.removeAttachment(index)}
                    aria-label="Remove attachment"
                  >×</button>
                </div>
              `)}
            </div>
          ` : ''}

          <div class="textarea-container">
            <div class="input-actions">
              ${this.showAttachments ? html`
                <button
                  class="action-button"
                  @click=${this.handleAttachmentClick}
                  ?disabled=${this.disabled}
                  aria-label="Attach file"
                  title="Attach file"
                >
                  📎
                </button>
              ` : ''}

              ${this.showEmoji ? html`
                <button
                  class="action-button"
                  ?disabled=${this.disabled}
                  aria-label="Insert emoji"
                  title="Insert emoji"
                >
                  😊
                </button>
              ` : ''}
            </div>

            <textarea
              .value=${this.value}
              placeholder="${this.placeholder}"
              maxlength="${this.maxLength}"
              ?disabled=${this.disabled}
              @input=${this.handleInput}
              @keydown=${this.handleKeyDown}
              rows="1"
            ></textarea>

            ${this.loading ? html`
              <div class="loading-overlay">
                <typing-indicator minimal></typing-indicator>
              </div>
            ` : ''}
          </div>

          ${this.showCharCounter ? html`
            <div class="char-counter ${this.charCounterClass}">
              ${this.charCount} / ${this.maxLength}
            </div>
          ` : ''}
        </div>

        <button
          class="send-button"
          @click=${this.handleSend}
          ?disabled=${this.disabled || this.loading || (!this.value.trim() && this.attachments.length === 0)}
        >
          <span>Send</span>
          <span class="send-icon">➤</span>
        </button>

        <input
          type="file"
          multiple
          @change=${this.handleFileSelect}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-input': ChatInput;
  }
}
