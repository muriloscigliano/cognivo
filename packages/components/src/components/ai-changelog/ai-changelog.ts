/**
 * <ai-changelog> — Version history feed for AI model/prompt changes
 *
 * Props: entries (array of {version, date, author?, changes, type})
 * Events: ai-changelog-entry-click, ai-changelog-rollback
 * Features: Timeline feed with type badges, expandable details, rollback button
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

interface ChangelogEntry {
  version: string;
  date: string;
  author?: string;
  changes: string;
  type: 'model' | 'prompt' | 'config' | 'data';
}

const TYPE_COLORS: Record<string, { bg: string; fg: string }> = {
  model:  { bg: 'rgba(59, 130, 246, 0.15)', fg: '#3b82f6' },
  prompt: { bg: 'rgba(223, 255, 97, 0.15)',  fg: '#dfff61' },
  config: { bg: 'rgba(168, 85, 247, 0.15)',  fg: '#a855f7' },
  data:   { bg: 'rgba(34, 197, 94, 0.15)',   fg: '#22c55e' },
};

@customElement('ai-changelog')
export class AiChangelog extends LitElement {
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
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .timeline {
      position: relative;
      padding-left: 20px;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 6px;
      top: 4px;
      bottom: 4px;
      width: 2px;
      background: #27272a;
    }

    .entry {
      position: relative;
      margin-bottom: 12px;
    }

    .entry-dot {
      position: absolute;
      left: -20px;
      top: 6px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #3f3f46;
      border: 2px solid #18181b;
      z-index: 1;
    }

    .entry-card {
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 8px;
      padding: 12px 14px;
      cursor: pointer;
      transition: border-color 120ms ease;
    }
    .entry-card:hover { border-color: #3f3f46; }
    .entry-card:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: -2px;
    }

    .entry-top {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .version {
      font-size: 13px;
      font-weight: 700;
      color: #fafafa;
    }

    .type-badge {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .entry-meta {
      display: flex;
      gap: 10px;
      font-size: 11px;
      color: #52525b;
      margin-top: 4px;
    }

    .changes-preview {
      font-size: 12px;
      color: #a1a1aa;
      margin-top: 6px;
      line-height: 1.5;
      overflow: hidden;
      max-height: 40px;
      transition: max-height 200ms ease;
    }
    .changes-preview.expanded {
      max-height: 500px;
    }

    .expand-toggle {
      background: transparent;
      border: none;
      color: #71717a;
      font-size: 11px;
      cursor: pointer;
      padding: 4px 0;
      margin-top: 4px;
      transition: color 120ms ease;
    }
    .expand-toggle:hover { color: #dfff61; }
    .expand-toggle:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }

    .entry-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }

    .rollback-btn {
      background: transparent;
      border: 1px solid #27272a;
      color: #a1a1aa;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .rollback-btn:hover {
      border-color: #eab308;
      color: #eab308;
    }
    .rollback-btn:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }

    .empty-state {
      text-align: center;
      color: #52525b;
      font-size: 13px;
      padding: 32px 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .entry-card, .changes-preview, .rollback-btn, .expand-toggle { transition: none; }
    }
  `;

  @property({ type: Array }) entries: ChangelogEntry[] = [];

  @state() private _expandedSet = new Set<string>();

  private _toggle(id: string) {
    if (this._expandedSet.has(id)) {
      this._expandedSet.delete(id);
    } else {
      this._expandedSet.add(id);
    }
    this.requestUpdate();
  }

  private _handleClick(entry: ChangelogEntry) {
    this.dispatchEvent(new CustomEvent('ai-changelog-entry-click', {
      detail: { version: entry.version, type: entry.type, date: entry.date },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleRollback(e: Event, entry: ChangelogEntry) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-changelog-rollback', {
      detail: { version: entry.version, type: entry.type },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    if (!this.entries.length) {
      return html`<div class="container"><div class="empty-state" role="status">No changelog entries</div></div>`;
    }

    return html`
      <div class="container" role="region" aria-label="Changelog">
        <div class="header">Changelog</div>

        <div class="timeline" role="list" aria-label="Version history">
          ${this.entries.map((entry, i) => {
            const id = `${entry.version}-${i}`;
            const expanded = this._expandedSet.has(id);
            const colors = TYPE_COLORS[entry.type] || TYPE_COLORS.config;

            return html`
              <div class="entry" role="listitem">
                <div class="entry-dot" style="background:${colors.fg}" aria-hidden="true"></div>
                <div
                  class="entry-card"
                  tabindex="0"
                  aria-label="Version ${entry.version}, ${entry.type} change on ${entry.date}"
                  @click=${() => this._handleClick(entry)}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleClick(entry); } }}
                >
                  <div class="entry-top">
                    <span class="version">${entry.version}</span>
                    <span
                      class="type-badge"
                      style="background:${colors.bg};color:${colors.fg}"
                    >${entry.type}</span>
                  </div>

                  <div class="entry-meta">
                    <span>${entry.date}</span>
                    ${entry.author ? html`<span>${entry.author}</span>` : nothing}
                  </div>

                  <div class="changes-preview ${expanded ? 'expanded' : ''}">
                    ${entry.changes}
                  </div>

                  <button
                    class="expand-toggle"
                    @click=${(e: Event) => { e.stopPropagation(); this._toggle(id); }}
                    aria-expanded=${expanded ? 'true' : 'false'}
                    aria-label=${expanded ? 'Collapse details' : 'Expand details'}
                    tabindex="0"
                  >${expanded ? 'Show less' : 'Show more'}</button>

                  <div class="entry-actions">
                    <button
                      class="rollback-btn"
                      @click=${(e: Event) => this._handleRollback(e, entry)}
                      aria-label="Rollback to version ${entry.version}"
                      tabindex="0"
                    >Rollback</button>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-changelog': AiChangelog;
  }
}
