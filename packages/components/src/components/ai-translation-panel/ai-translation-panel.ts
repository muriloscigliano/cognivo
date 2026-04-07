/**
 * @element ai-translation-panel
 * Split-pane translation interface with language selectors, confidence badge,
 * alternative translations, and copy buttons.
 *
 * Uses cg-button for actions, cg-badge for confidence display.
 *
 * @example
 * ```html
 * <ai-translation-panel
 *   sourceText="Hello, how are you?"
 *   targetText="Hola, como estas?"
 *   sourceLang="en"
 *   targetLang="es"
 *   confidence="0.92"
 *   .alternatives=${[{ text: 'Hola, que tal?', confidence: 0.85 }]}
 * ></ai-translation-panel>
 * ```
 *
 * @fires {CustomEvent<{sourceText, sourceLang, targetLang}>} ai-translation-request - Translation requested
 * @fires {CustomEvent<{text, confidence}>} ai-translation-select-alt - Alternative selected
 * @fires {CustomEvent<{text, side}>} ai-translation-copy - Text copied
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeInKeyframes } from '../../styles/index.js';

interface TranslationAlternative {
  text: string;
  confidence: number;
}

@customElement('ai-translation-panel')
export class AiTranslationPanel extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeInKeyframes, css`
    :host {
      animation: fadeIn var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
    }

    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      overflow: hidden;
    }

    /* ── Header ── */
    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .header-icon {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      color: var(--cg-color-surface-base-text);
      flex-shrink: 0;
    }
    .header-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      flex: 1;
    }

    /* ── Split panes ── */
    .panes {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
    }
    .pane {
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-12);
    }
    .divider {
      width: var(--cg-border-width-50);
      background: var(--cg-color-surface-cards-divider);
    }

    .pane-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-8);
    }
    /* Lang selector sizing */
    .lang-select {
      min-width: var(--cg-spacing-96);
    }

    /* ── Text areas ── */
    .text-area {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-relaxed);
      min-height: var(--cg-spacing-80);
      word-break: break-word;
    }
    .text-area.muted {
      color: var(--cg-color-input-text-placeholder);
      font-style: italic;
    }

    /* ── Loading dots ── */
    .loading-dots {
      display: flex;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-8) 0;
    }
    .loading-dots span {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      opacity: 0.4;
      animation: dotPulse 1s ease infinite;
    }
    .loading-dots span:nth-child(2) { animation-delay: 0.15s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes dotPulse { 50% { opacity: 1; } }

    /* ── Alternatives ── */
    .alternatives {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      padding: var(--cg-spacing-12) var(--cg-spacing-20);
    }
    .alt-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      margin-bottom: var(--cg-spacing-8);
    }
    .alt-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-6);
    }
    .alt-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition:
        border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
        background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .alt-item:hover {
      border-color: var(--cg-color-input-border-hover);
      background: var(--cg-overlay-dark-subtle);
    }
    .alt-item:active { transform: scale(var(--cg-interaction-press-scale)); }
    .alt-item:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background),
        0 0 0 4px var(--cg-color-focus-ring);
    }
    .alt-text {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
    }
    .alt-conf {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      white-space: nowrap;
    }

    /* ── Translate bar ── */
    .translate-bar {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      padding: var(--cg-spacing-12) var(--cg-spacing-20);
      display: flex;
      justify-content: flex-end;
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-200); }

    @media (prefers-reduced-motion: reduce) {
      :host { animation: none; }
      .loading-dots span { animation: none; opacity: 0.6; }
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: String }) sourceText: string = '';
  @property({ type: String }) targetText: string = '';
  @property({ type: String }) sourceLang: string = 'en';
  @property({ type: String }) targetLang: string = 'es';
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: Number }) confidence: number = 0;
  @property({ type: Array }) alternatives: TranslationAlternative[] = [];

  @state() private _copiedSide: 'source' | 'target' | null = null;

  private _languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'pt', label: 'Portuguese' },
    { code: 'it', label: 'Italian' },
    { code: 'ja', label: 'Japanese' },
    { code: 'ko', label: 'Korean' },
    { code: 'zh', label: 'Chinese' },
  ];

  private _requestTranslation() {
    this.dispatchEvent(new CustomEvent('ai-translation-request', {
      bubbles: true, composed: true,
      detail: { sourceText: this.sourceText, sourceLang: this.sourceLang, targetLang: this.targetLang },
    }));
  }

  private _selectAlt(alt: TranslationAlternative) {
    this.dispatchEvent(new CustomEvent('ai-translation-select-alt', {
      bubbles: true, composed: true,
      detail: { text: alt.text, confidence: alt.confidence },
    }));
  }

  private _copy(text: string, side: 'source' | 'target') {
    navigator.clipboard?.writeText(text);
    this._copiedSide = side;
    setTimeout(() => { this._copiedSide = null; }, 2000);
    this.dispatchEvent(new CustomEvent('ai-translation-copy', {
      bubbles: true, composed: true,
      detail: { text, side },
    }));
  }

  override render() {
    const confPct = Math.round(this.confidence * 100);
    const isLow = this.confidence > 0 && this.confidence < 0.7;

    return html`
      <div class="panel" role="region" aria-label="Translation">
        <div class="header">
          <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 10"/><path d="M4 14h8"/><path d="M2 5h8"/><path d="M7 2v3"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>
          <span class="header-title">Translation</span>
          ${this.confidence > 0 ? html`
            <cg-badge
              variant=${isLow ? 'warning' : 'success'}
              label="${confPct}% confidence"
              size="sm"
              rounded="full"
            ></cg-badge>
          ` : nothing}
        </div>

        <div class="panes">
          <div class="pane">
            <div class="pane-header">
              <cg-select class="lang-select"
                size="sm"
                label="Source"
                .options=${this._languages.map(l => ({ value: l.code, label: l.label }))}
                .value=${this.sourceLang}
                @cg-change=${(e: CustomEvent) => { this.sourceLang = e.detail.value; }}
              ></cg-select>
              <cg-button variant="tertiary" size="sm"
                status=${this._copiedSide === 'source' ? 'success' : 'idle'}
                label="Copy source text"
                @click=${() => this._copy(this.sourceText, 'source')}>
                <cg-icon slot="prefix" name=${this._copiedSide === 'source' ? 'check' : 'copy'} size="xs"></cg-icon>
                ${this._copiedSide === 'source' ? 'Copied' : 'Copy'}
              </cg-button>
            </div>
            <div class="text-area ${!this.sourceText ? 'muted' : ''}">
              ${this.sourceText || 'Enter text to translate...'}
            </div>
          </div>

          <div class="divider" aria-hidden="true"></div>

          <div class="pane">
            <div class="pane-header">
              <cg-select class="lang-select"
                size="sm"
                label="Target"
                .options=${this._languages.map(l => ({ value: l.code, label: l.label }))}
                .value=${this.targetLang}
                @cg-change=${(e: CustomEvent) => { this.targetLang = e.detail.value; }}
              ></cg-select>
              <cg-button variant="tertiary" size="sm"
                status=${this._copiedSide === 'target' ? 'success' : 'idle'}
                label="Copy translation"
                @click=${() => this._copy(this.targetText, 'target')}>
                <cg-icon slot="prefix" name=${this._copiedSide === 'target' ? 'check' : 'copy'} size="xs"></cg-icon>
                ${this._copiedSide === 'target' ? 'Copied' : 'Copy'}
              </cg-button>
            </div>
            ${this.loading ? html`
              <div class="loading-dots" role="status" aria-label="Translating">
                <span></span><span></span><span></span>
              </div>
            ` : html`
              <div class="text-area ${!this.targetText ? 'muted' : ''}">
                ${this.targetText || 'Translation will appear here...'}
              </div>
            `}
          </div>
        </div>

        ${this.alternatives.length > 0 ? html`
          <div class="alternatives">
            <div class="alt-label">Alternative translations</div>
            <div class="alt-list" role="listbox" aria-label="Alternative translations">
              ${this.alternatives.map(alt => html`
                <div class="alt-item" tabindex="0" role="option"
                  @click=${() => this._selectAlt(alt)}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._selectAlt(alt); } }}>
                  <span class="alt-text">${alt.text}</span>
                  <span class="alt-conf">${Math.round(alt.confidence * 100)}%</span>
                </div>
              `)}
            </div>
          </div>
        ` : nothing}

        <div class="translate-bar">
          <cg-button variant="primary" size="sm"
            ?disabled=${this.loading || !this.sourceText}
            ?loading=${this.loading}
            @click=${this._requestTranslation}>
            ${this.loading ? 'Translating...' : 'Translate'}
          </cg-button>
        </div>
      </div>
    `;
  }
}
