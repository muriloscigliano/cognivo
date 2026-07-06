/**
 * @element ai-prompt-editor
 * Prompt version editor with sidebar and 3 modes: view, edit (always-on), split (side-by-side).
 *
 * @fires {CustomEvent<{versionId: string, content: string}>} ai-prompt-save - When saved
 * @fires {CustomEvent<{versionId: string}>} ai-prompt-activate - When activated
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface PromptVersion {
  id: string;
  content: string;
  timestamp: number;
  author?: string;
  active?: boolean;
}

@customElement('ai-prompt-editor')
export class AiPromptEditor extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .editor {
      display: grid;
      grid-template-columns: 220px 1fr;
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
      min-height: 300px;
    }

    /* Split mode — two content columns */
    :host([mode="split"]) .editor {
      grid-template-columns: 220px 1fr 1fr;
    }

    /* ── Sidebar ── */
    .sidebar {
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      display: flex;
      flex-direction: column;
      background: var(--cg-color-surface-base-background);
    }
    .sidebar-header {
      padding: var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-text);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .version-list { flex: 1; overflow-y: auto; }
    .version-item {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      cursor: pointer;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .version-item:hover { background: var(--cg-overlay-dark-subtle); }
    .version-item.selected {
      background: var(--cg-overlay-accent-subtle);
      border-left: var(--cg-border-width-100) solid var(--cg-color-action-primary-background-default);
    }
    .version-item:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring);
    }

    .version-top { display: flex; justify-content: space-between; align-items: center; }
    .version-id { font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold); color: var(--cg-color-surface-base-text); }
    .active-badge {
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-1) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
      font-weight: var(--cg-font-weight-semibold);
    }
    .version-meta {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
      margin-top: var(--cg-spacing-2);
    }

    /* ── Main panel ── */
    .main { display: flex; flex-direction: column; }
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cg-spacing-12) var(--cg-spacing-20);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .main-title { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold); color: var(--cg-color-surface-base-text); }

    .action-btns { display: flex; gap: var(--cg-spacing-8); }
    .action-btn {
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: transparent;
      color: var(--cg-color-surface-container-text);
      font: inherit;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .action-btn:not(:disabled):active { transform: scale(var(--cg-interaction-press-scale)); }
    .action-btn:not(:disabled):hover { border-color: var(--cg-color-surface-cards-hover-border); color: var(--cg-color-surface-base-text); }
    .action-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring-offset), 0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
    }
    .action-btn:disabled {
      cursor: not-allowed;
      color: var(--cg-color-action-primary-text-disable);
      border-color: var(--cg-color-surface-cards-border);
    }
    .action-btn.primary {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: transparent;
    }
    .action-btn.primary:not(:disabled):hover { background: var(--cg-color-action-primary-background-hover); }
    .action-btn.primary:disabled {
      background: var(--cg-color-action-primary-background-disable);
      color: var(--cg-color-action-primary-text-disable);
      border-color: transparent;
    }

    /* ── Content ── */
    .content-area { flex: 1; overflow: auto; }

    .prompt-display {
      padding: var(--cg-spacing-20);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
      color: var(--cg-color-surface-base-text);
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    textarea {
      width: 100%;
      height: 100%;
      min-height: 200px;
      padding: var(--cg-spacing-20);
      background: transparent;
      color: var(--cg-color-surface-base-text);
      border: none;
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
      resize: none;
      outline: none;
      box-sizing: border-box;
    }
    textarea:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring);
    }

    /* ── Split mode ── */
    .split-pane {
      display: flex;
      flex-direction: column;
      border-left: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .split-header {
      padding: var(--cg-spacing-12) var(--cg-spacing-20);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-text);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }

    .empty {
      padding: var(--cg-spacing-48) var(--cg-spacing-24);
      text-align: center;
      color: var(--cg-color-surface-container-text);
      font-size: var(--cg-font-size-sm);
    }
  `];

  @property({ type: Array }) versions: PromptVersion[] = [];
  @property({ reflect: true }) mode: 'view' | 'edit' | 'split' = 'view';
  @property({ type: Boolean }) saving = false;

  @state() private _selectedId = '';
  @state() private _editContent = '';

  override updated(changed: Map<string, unknown>) {
    if (changed.has('versions') && this.versions.length > 0 && !this._selectedId) {
      const active = this.versions.find(v => v.active);
      this._selectedId = active?.id || this.versions[0]!.id;
    }
    if (changed.has('_selectedId') || changed.has('versions')) {
      const v = this.versions.find(ver => ver.id === this._selectedId);
      if (v) this._editContent = v.content;
    }
  }

  private get _selectedVersion(): PromptVersion | undefined {
    return this.versions.find(v => v.id === this._selectedId);
  }

  private _selectVersion(id: string) {
    this._selectedId = id;
  }

  private _handleOptionKeydown(e: KeyboardEvent, id: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._selectVersion(id);
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      const idx = this.versions.findIndex(v => v.id === this._selectedId);
      let next = idx;
      if (e.key === 'ArrowDown') next = Math.min(this.versions.length - 1, idx + 1);
      else if (e.key === 'ArrowUp') next = Math.max(0, idx - 1);
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = this.versions.length - 1;
      const target = this.versions[next];
      if (target) {
        this._selectVersion(target.id);
        void this.updateComplete.then(() => {
          const el = this.shadowRoot?.querySelector('.version-item.selected') as HTMLElement | null;
          el?.focus();
        });
      }
    }
  }

  private _handleSave() {
    if (this.saving) return;
    this.dispatchEvent(new CustomEvent('ai-prompt-save', {
      bubbles: true, composed: true,
      detail: { versionId: this._selectedId, content: this._editContent },
    }));
  }

  private _handleActivate() {
    this.dispatchEvent(new CustomEvent('ai-prompt-activate', {
      bubbles: true, composed: true,
      detail: { versionId: this._selectedId },
    }));
  }

  private _formatDate(ts: number): string {
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  private _renderSidebar() {
    return html`
      <div class="sidebar">
        <div class="sidebar-header">Versions (${this.versions.length})</div>
        <div class="version-list" role="listbox" aria-label="Prompt versions">
          ${this.versions.map(v => html`
            <div class="version-item ${v.id === this._selectedId ? 'selected' : ''}"
              role="option" tabindex="${v.id === this._selectedId ? '0' : '-1'}" aria-selected="${v.id === this._selectedId}"
              @click=${() => this._selectVersion(v.id)}
              @keydown=${(e: KeyboardEvent) => this._handleOptionKeydown(e, v.id)}>
              <div class="version-top">
                <span class="version-id">${v.id}</span>
                ${v.active ? html`<span class="active-badge">Active</span>` : nothing}
              </div>
              <div class="version-meta">${this._formatDate(v.timestamp)}${v.author ? ` · ${v.author}` : ''}</div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _renderActions() {
    const selected = this._selectedVersion;
    const hasChanges = this._editContent !== (selected?.content || '');

    return html`
      <div class="action-btns">
        ${this.mode !== 'view' ? html`
          <button class="action-btn" ?disabled=${!hasChanges || this.saving}
            @click=${() => { if (selected) this._editContent = selected.content; }}>Revert</button>
          <button class="action-btn primary" ?disabled=${!hasChanges || this.saving}
            @click=${this._handleSave}>${this.saving ? 'Saving…' : 'Save'}</button>
        ` : nothing}
        ${selected && !selected.active ? html`
          <button class="action-btn primary" @click=${this._handleActivate}>Activate</button>
        ` : nothing}
      </div>
    `;
  }

  override render() {
    if (this.versions.length === 0) {
      return html`<div class="editor" role="region" aria-label="Prompt editor"><div class="empty">No prompt versions yet</div></div>`;
    }

    const selected = this._selectedVersion;

    return html`
      <div class="editor" role="region" aria-label="Prompt editor">
        ${this._renderSidebar()}

        <div class="main">
          <div class="main-header">
            <span class="main-title">${selected?.id || 'Select a version'}${this.mode === 'edit' ? ' — Editing' : ''}</span>
            ${this._renderActions()}
          </div>
          <div class="content-area">
            ${this.mode === 'view' ? html`
              <div class="prompt-display">${selected?.content || 'Select a version'}</div>
            ` : html`
              <textarea
                .value=${this._editContent}
                @input=${(e: Event) => { this._editContent = (e.target as HTMLTextAreaElement).value; }}
                aria-label="Edit prompt"
              ></textarea>
            `}
          </div>
        </div>

        ${this.mode === 'split' ? html`
          <div class="split-pane">
            <div class="split-header">Preview</div>
            <div class="content-area">
              <div class="prompt-display">${this._editContent}</div>
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
