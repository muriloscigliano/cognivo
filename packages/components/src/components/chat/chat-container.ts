import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('chat-container')
export class ChatContainer extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        font-family: ${tokens.fontFamily.primary};
        background: white;
      }

      .chat-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
      }

      .chat-header-slot {
        flex-shrink: 0;
      }

      .chat-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
      }

      .chat-suggestions-slot {
        flex-shrink: 0;
      }

      .chat-messages-slot {
        flex: 1;
        overflow: hidden;
      }

      .chat-input-slot {
        flex-shrink: 0;
      }

      /* Sidebar layout */
      :host([layout='sidebar']) .chat-body {
        flex-direction: row;
      }

      :host([layout='sidebar']) .sidebar {
        width: 300px;
        border-right: 1px solid ${tokens.color.gray100};
        overflow-y: auto;
      }

      :host([layout='sidebar']) .main-chat {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      /* Split layout */
      :host([layout='split']) .chat-body {
        flex-direction: row;
      }

      :host([layout='split']) .split-left,
      :host([layout='split']) .split-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      :host([layout='split']) .split-divider {
        width: 1px;
        background: ${tokens.color.gray100};
      }

      /* Fullscreen */
      :host([fullscreen]) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
      }

      /* Theme variants */
      :host([theme='dark']) {
        background: #1a1a1a;
        color: white;
      }
    `
  ];

  @property({ type: String, reflect: true })
  layout: 'default' | 'sidebar' | 'split' = 'default';

  @property({ type: String, reflect: true })
  theme: 'light' | 'dark' = 'light';

  @property({ type: Boolean, reflect: true })
  fullscreen = false;

  override render() {
    return html`
      <div class="chat-layout">
        <div class="chat-header-slot">
          <slot name="header"></slot>
        </div>

        <div class="chat-body">
          ${this.layout === 'sidebar' ? html`
            <div class="sidebar">
              <slot name="sidebar"></slot>
            </div>
            <div class="main-chat">
              ${this.renderMainChat()}
            </div>
          ` : this.layout === 'split' ? html`
            <div class="split-left">
              ${this.renderMainChat()}
            </div>
            <div class="split-divider"></div>
            <div class="split-right">
              <slot name="split-right"></slot>
            </div>
          ` : this.renderMainChat()}
        </div>
      </div>
    `;
  }

  private renderMainChat() {
    return html`
      <div class="chat-suggestions-slot">
        <slot name="suggestions"></slot>
      </div>
      <div class="chat-messages-slot">
        <slot name="messages"></slot>
      </div>
      <div class="chat-input-slot">
        <slot name="input"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-container': ChatContainer;
  }
}
