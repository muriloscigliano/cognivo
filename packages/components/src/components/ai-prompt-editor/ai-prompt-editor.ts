/**
 * @element ai-prompt-editor
 * Split-pane prompt version editor with a sidebar listing versions and
 * a main content area for viewing or editing prompts. Supports version
 * selection, inline editing, save, and activate actions.
 *
 * @example
 * ```html
 * <ai-prompt-editor
 *   .versions=${[
 *     { id: 'v2', content: 'You are a helpful assistant...', timestamp: Date.now(), active: true },
 *     { id: 'v1', content: 'You are an AI...', timestamp: Date.now() - 86400000, author: 'Alice' }
 *   ]}
 *   editable
 * ></ai-prompt-editor>
 * ```
 *
 * @prop {PromptVersion[]} versions - Array of prompt version objects
 * @prop {boolean} editable - Enable edit mode
 *
 * @fires {CustomEvent<{versionId: string, content: string}>} ai-prompt-save - When a version is saved
 * @fires {CustomEvent<{versionId: string}>} ai-prompt-activate - When a version is activated
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface PromptVersion {
  id: string;
  content: string;
  timestamp: number;
  author?: string;
  active?: boolean;
}

@customElement('ai-prompt-editor')
export class AiPromptEditor extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .editor {
      display: grid;
      grid-template-columns: 220px 1fr;
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      overflow: hidden;
      min-height: 300px;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    /* Sidebar */
    .sidebar {
      border-right: 1px solid var(--cg-gray-800, #27272a);
      display: flex;
      flex-direction: column;
    }
    .sidebar-header {
      padding: 12px 14px;
      font-size: 11px;
      font-weight: 700;
      color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .version-list {
      flex: 1;
      overflow-y: auto;
    }
    .version-item {
      padding: 10px 14px;
      cursor: pointer;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
      transition: background 150ms;
    }
    .version-item:hover { background: rgba(255, 255, 255, 0.03); }
    .version-item.selected { background: rgba(223, 255, 97, 0.06); border-left: 2px solid var(--cg-brand-ai-accent, #dfff61); }
    .version-item:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: -2px; }

    .version-top { display: flex; justify-content: space-between; align-items: center; }
    .version-id { font-size: 12px; font-weight: 600; color: var(--cg-color-surface-base-text, #fafafa); }
    .active-badge {
      font-size: 9px;
      padding: 1px 6px;
      border-radius: 4px;
      background: rgba(34, 197, 94, 0.12);
      color: var(--cg-green-400, #4ade80);
      font-weight: 700;
    }
    .version-meta {
      font-size: 10px;
      color: var(--cg-gray-500, #71717a);
      margin-top: 2px;
    }

    /* Main content */
    .main {
      display: flex;
      flex-direction: column;
    }
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .main-title { font-size: 13px; font-weight: 600; color: var(--cg-color-surface-base-text, #fafafa); }

    .action-btns { display: flex; gap: 6px; }
    .action-btn {
      padding: 4px 12px;
      border-radius: 6px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none;
      color: var(--cg-gray-400, #a1a1aa);
      font: inherit;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms;
    }
    .action-btn:hover { border-color: var(--cg-gray-600, #52525b); color: var(--cg-color-surface-base-text, #fafafa); }
    .action-btn.primary {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #000;
      border-color: transparent;
    }
    .action-btn.primary:hover { filter: brightness(1.1); }

    /* Content area */
    .content-area {
      flex: 1;
      overflow: auto;
    }
    .prompt-display {
      padding: 16px;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-size: 13px;
      line-height: 1.6;
      color: var(--cg-color-surface-base-text, #fafafa);
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    textarea {
      width: 100%;
      height: 100%;
      min-height: 200px;
      padding: 16px;
      background: var(--cg-color-surface-base-background, #09090b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: none;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-size: 13px;
      line-height: 1.6;
      resize: none;
      outline: none;
    }

    .empty {
      padding: 32px;
      text-align: center;
      color: var(--cg-gray-500, #71717a);
      font-size: 13px;
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .editor { border-radius: 0; }
    :host([rounded="sm"]) .editor { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .editor { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .editor { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .editor { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) versions: PromptVersion[] = [];
  @property({ type: Boolean }) editable: boolean = false;

  @state() private _selectedId: string = '';
  @state() private _editing: boolean = false;
  @state() private _editContent: string = '';

  override updated(changed: Map<string, unknown>) {
    if (changed.has('versions') && this.versions.length > 0 && !this._selectedId) {
      const active = this.versions.find(v => v.active);
      this._selectedId = active?.id || this.versions[0]!.id;
    }
  }

  private get _selectedVersion(): PromptVersion | undefined {
    return this.versions.find(v => v.id === this._selectedId);
  }

  private _selectVersion(id: string) {
    this._selectedId = id;
    this._editing = false;
  }

  private _startEdit() {
    const v = this._selectedVersion;
    if (!v) return;
    this._editContent = v.content;
    this._editing = true;
  }

  private _handleSave() {
    this.dispatchEvent(new CustomEvent('ai-prompt-save', {
      bubbles: true, composed: true,
      detail: { versionId: this._selectedId, content: this._editContent },
    }));
    this._editing = false;
  }

  private _handleActivate() {
    this.dispatchEvent(new CustomEvent('ai-prompt-activate', {
      bubbles: true, composed: true,
      detail: { versionId: this._selectedId },
    }));
  }

  private _formatDate(ts: number): string {
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  override render() {
    if (this.versions.length === 0) {
      return html`<div class="editor"><div class="empty">No prompt versions yet</div></div>`;
    }

    const selected = this._selectedVersion;

    return html`
      <div class="editor" role="region" aria-label="Prompt editor">
        <div class="sidebar">
          <div class="sidebar-header">Versions (${this.versions.length})</div>
          <div class="version-list" role="listbox" aria-label="Prompt versions">
            ${this.versions.map(v => html`
              <div class="version-item ${v.id === this._selectedId ? 'selected' : ''}"
                role="option" tabindex="0"
                aria-selected="${v.id === this._selectedId}"
                @click=${() => this._selectVersion(v.id)}
                @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._selectVersion(v.id); }}>
                <div class="version-top">
                  <span class="version-id">${v.id}</span>
                  ${v.active ? html`<span class="active-badge">Active</span>` : nothing}
                </div>
                <div class="version-meta">
                  ${this._formatDate(v.timestamp)}${v.author ? ` · ${v.author}` : ''}
                </div>
              </div>
            `)}
          </div>
        </div>

        <div class="main">
          <div class="main-header">
            <span class="main-title">${selected?.id || 'Select a version'}</span>
            <div class="action-btns">
              ${this.editable && !this._editing ? html`
                <button class="action-btn" @click=${this._startEdit}>Edit</button>
              ` : nothing}
              ${this._editing ? html`
                <button class="action-btn" @click=${() => { this._editing = false; }}>Cancel</button>
                <button class="action-btn primary" @click=${this._handleSave}>Save</button>
              ` : nothing}
              ${!this._editing && selected && !selected.active ? html`
                <button class="action-btn primary" @click=${this._handleActivate}>Activate</button>
              ` : nothing}
            </div>
          </div>

          <div class="content-area">
            ${this._editing ? html`
              <textarea .value=${this._editContent}
                @input=${(e: Event) => { this._editContent = (e.target as HTMLTextAreaElement).value; }}
                aria-label="Edit prompt"></textarea>
            ` : html`
              <div class="prompt-display">${selected?.content || 'Select a version to view'}</div>
            `}
          </div>
        </div>
      </div>
    `;
  }
}
