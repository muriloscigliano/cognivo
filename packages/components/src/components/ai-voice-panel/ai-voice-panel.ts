/**
 * @element ai-voice-panel
 * Voice command panel with built-in Web Speech API integration, mic button with pulse
 * animations, real-time transcript, push-to-talk, browser detection, and permission handling.
 *
 * Self-managing by default — click the mic and it records. Also supports external control
 * via `startRecognition()` / `stopRecognition()` methods.
 *
 * @example
 * ```html
 * <ai-voice-panel language="en-US"></ai-voice-panel>
 *
 * <ai-voice-panel pushToTalk language="pt-BR"></ai-voice-panel>
 *
 * <ai-voice-panel continuous language="en-US"></ai-voice-panel>
 * ```
 *
 * @fires {CustomEvent<{}>} ai-voice-start - Recording started
 * @fires {CustomEvent<{}>} ai-voice-stop - Recording stopped
 * @fires {CustomEvent<{transcript: string, isFinal: boolean}>} ai-voice-result - Speech result
 * @fires {CustomEvent<{error: string}>} ai-voice-error - Error occurred
 *
 * @cssprop --cg-color-action-primary-background-default - Listening pulse ring color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeInKeyframes } from '../../styles/index.js';

// Browser-compat SpeechRecognition
const SpeechRecognitionImpl: SpeechRecognitionCtor | undefined =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : undefined;

type VoiceState = 'idle' | 'listening' | 'processing' | 'error' | 'unsupported';

@customElement('ai-voice-panel')
export class AiVoicePanel extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeInKeyframes, css`
    :host {
      animation: fadeIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }

    .panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--cg-spacing-20);
      padding: var(--cg-spacing-32) var(--cg-spacing-24);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
    }

    /* ── State label ── */
    .state-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      color: var(--cg-color-input-text-placeholder);
    }
    .state-label.listening { color: var(--cg-color-surface-base-text); }
    .state-label.processing { color: var(--cg-color-status-warning-text-default); }
    .state-label.error { color: var(--cg-color-status-error-text-default); }

    /* ── Mic button area ── */
    .mic-area {
      position: relative;
      width: var(--cg-spacing-80);
      height: var(--cg-spacing-80);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Pulse rings */
    .pulse-ring {
      position: absolute;
      inset: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-100) solid var(--cg-color-action-primary-background-default);
      opacity: 0;
      pointer-events: none;
    }
    .listening .pulse-ring {
      animation: voicePulse 2s var(--cg-transition-easing-default) infinite;
    }
    .listening .pulse-ring:nth-child(2) { animation-delay: 0.6s; }
    .listening .pulse-ring:nth-child(3) { animation-delay: 1.2s; }

    @keyframes voicePulse {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.8); opacity: 0; }
    }

    /* ── Mic button ── */
    .mic-btn {
      width: var(--cg-spacing-64);
      height: var(--cg-spacing-64);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-cards-border);
      background: var(--cg-color-surface-base-background);
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      z-index: 1;
      position: relative;
    }
    .mic-btn:hover {
      border-color: var(--cg-color-input-border-hover);
      color: var(--cg-color-surface-base-text);
    }
    .mic-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .mic-btn:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background),
        0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .mic-btn.listening {
      border-color: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-base-text);
      background: var(--cg-overlay-accent-subtle);
    }
    .mic-btn.processing {
      border-color: var(--cg-color-status-warning-text-default);
      color: var(--cg-color-status-warning-text-default);
      cursor: wait;
    }
    .mic-btn.error {
      border-color: var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-default);
    }
    .mic-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .mic-btn svg {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
    }

    /* Spinner */
    .spinner { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Transcript area ── */
    .transcript-area {
      text-align: center;
      width: 100%;
      min-height: var(--cg-spacing-40);
    }
    .transcript {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-relaxed);
    }
    .interim {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      font-style: italic;
      line-height: var(--cg-line-height-relaxed);
    }
    .error-msg {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-status-error-text-default);
      line-height: var(--cg-line-height-normal);
    }
    .unsupported-msg {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      line-height: var(--cg-line-height-normal);
    }

    /* ── Push-to-talk hint ── */
    .ptt-hint {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-200); }

    @media (prefers-reduced-motion: reduce) {
      .listening .pulse-ring { animation: none; }
      .spinner { animation: none; }
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  /** BCP-47 language tag */
  @property({ type: String }) language: string = 'en-US';
  /** Hold mic to talk instead of click toggle */
  @property({ type: Boolean }) pushToTalk: boolean = false;
  /** Keep listening after each result (multi-sentence) */
  @property({ type: Boolean }) continuous: boolean = false;
  /** Auto-stop after N seconds of silence (0 = no timeout) */
  @property({ type: Number }) timeout: number = 10;

  @state() private _state: VoiceState = 'idle';
  @state() private _transcript: string = '';
  @state() private _interimTranscript: string = '';
  @state() private _errorMessage: string = '';

  private _recognition: SpeechRecognition | null = null;
  private _timeoutId: number = 0;

  override connectedCallback() {
    super.connectedCallback();
    if (!SpeechRecognitionImpl) {
      this._state = 'unsupported';
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanup();
  }

  /** Public API: start recognition */
  startRecognition() {
    if (!SpeechRecognitionImpl || this._state === 'listening') return;

    this._cleanup();
    const recognition = new SpeechRecognitionImpl();
    recognition.lang = this.language;
    recognition.continuous = this.continuous;
    recognition.interimResults = true;

    recognition.onstart = () => {
      this._state = 'listening';
      this._interimTranscript = '';
      this._errorMessage = '';
      this._startTimeout();
      this.dispatchEvent(new CustomEvent('ai-voice-start', { bubbles: true, composed: true }));
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      this._resetTimeout();
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (!result) continue;
        if (result.isFinal) {
          final += result[0]?.transcript ?? '';
        } else {
          interim += result[0]?.transcript ?? '';
        }
      }
      if (final) {
        this._transcript = (this._transcript ? this._transcript + ' ' : '') + final.trim();
        this._interimTranscript = '';
        this.dispatchEvent(new CustomEvent('ai-voice-result', {
          bubbles: true, composed: true,
          detail: { transcript: this._transcript, isFinal: true },
        }));
      }
      if (interim) {
        this._interimTranscript = interim;
        this.dispatchEvent(new CustomEvent('ai-voice-result', {
          bubbles: true, composed: true,
          detail: { transcript: interim, isFinal: false },
        }));
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const msg = event.error === 'not-allowed'
        ? 'Microphone access denied. Check browser permissions.'
        : event.error === 'no-speech'
          ? 'No speech detected. Try again.'
          : event.error === 'network'
            ? 'Network error. Speech recognition requires an internet connection.'
            : `Speech error: ${event.error}`;
      this._errorMessage = msg;
      this._state = 'error';
      this._clearTimeout();
      this.dispatchEvent(new CustomEvent('ai-voice-error', {
        bubbles: true, composed: true,
        detail: { error: event.error, message: msg },
      }));
    };

    recognition.onend = () => {
      this._clearTimeout();
      if (this._state === 'listening') {
        this._state = this._transcript ? 'idle' : 'idle';
      }
      this.dispatchEvent(new CustomEvent('ai-voice-stop', { bubbles: true, composed: true }));
      this._recognition = null;
    };

    this._recognition = recognition;
    try {
      recognition.start();
    } catch {
      this._errorMessage = 'Could not start speech recognition.';
      this._state = 'error';
    }
  }

  /** Public API: stop recognition */
  stopRecognition() {
    if (this._recognition) {
      this._recognition.stop();
    }
    this._clearTimeout();
  }

  /** Public API: clear transcript */
  clearTranscript() {
    this._transcript = '';
    this._interimTranscript = '';
  }

  /** Read-only access to current transcript */
  get transcript(): string { return this._transcript; }
  get interimTranscript(): string { return this._interimTranscript; }
  get voiceState(): VoiceState { return this._state; }

  private _cleanup() {
    if (this._recognition) {
      try { this._recognition.abort(); } catch { /* ignore */ }
      this._recognition = null;
    }
    this._clearTimeout();
  }

  private _startTimeout() {
    if (this.timeout <= 0) return;
    this._clearTimeout();
    this._timeoutId = window.setTimeout(() => {
      if (this._state === 'listening') {
        this.stopRecognition();
      }
    }, this.timeout * 1000);
  }

  private _resetTimeout() {
    if (this.timeout > 0 && this._state === 'listening') {
      this._startTimeout();
    }
  }

  private _clearTimeout() {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = 0;
    }
  }

  private _handleMicClick() {
    if (this._state === 'processing' || this._state === 'unsupported') return;
    if (this._state === 'listening') {
      this.stopRecognition();
    } else {
      this.startRecognition();
    }
  }

  private _handlePointerDown() {
    if (!this.pushToTalk || this._state === 'unsupported') return;
    this.startRecognition();
  }

  private _handlePointerUp() {
    if (!this.pushToTalk) return;
    this.stopRecognition();
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this.pushToTalk) {
        this.startRecognition();
      } else {
        this._handleMicClick();
      }
    }
  }

  private _handleKeyUp(e: KeyboardEvent) {
    if (this.pushToTalk && (e.key === 'Enter' || e.key === ' ')) {
      this.stopRecognition();
    }
  }

  private _getStateLabel(): string {
    switch (this._state) {
      case 'listening': return 'Listening...';
      case 'processing': return 'Processing...';
      case 'error': return 'Error';
      case 'unsupported': return 'Not supported';
      default: return this.pushToTalk ? 'Hold to talk' : 'Tap to speak';
    }
  }

  private _getMicIcon() {
    if (this._state === 'processing') {
      return html`<svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>`;
    }
    if (this._state === 'error') {
      return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    }
    if (this._state === 'unsupported') {
      return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="1" width="6" height="11" rx="3"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
    }
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="1" width="6" height="11" rx="3"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
  }

  override render() {
    const isUnsupported = this._state === 'unsupported';

    return html`
      <div class="panel" role="region" aria-label="Voice input">
        <span class="state-label ${this._state}">${this._getStateLabel()}</span>

        <div class="mic-area ${this._state}">
          <div class="pulse-ring" aria-hidden="true"></div>
          <div class="pulse-ring" aria-hidden="true"></div>
          <div class="pulse-ring" aria-hidden="true"></div>
          <button class="mic-btn ${this._state}"
            ?disabled=${isUnsupported}
            aria-label="${this._state === 'listening' ? 'Stop recording' : 'Start recording'}"
            aria-pressed="${this._state === 'listening' ? 'true' : 'false'}"
            @click=${this.pushToTalk ? undefined : this._handleMicClick}
            @pointerdown=${this._handlePointerDown}
            @pointerup=${this._handlePointerUp}
            @pointercancel=${this._handlePointerUp}
            @pointerleave=${this._handlePointerUp}
            @keydown=${this._handleKeyDown}
            @keyup=${this._handleKeyUp}>
            ${this._getMicIcon()}
          </button>
        </div>

        <div class="transcript-area">
          ${this._state === 'error' && this._errorMessage
            ? html`<div class="error-msg" role="alert">${this._errorMessage}</div>`
            : nothing}
          ${isUnsupported
            ? html`<div class="unsupported-msg">Speech recognition is not supported in this browser. Try Chrome or Edge.</div>`
            : nothing}
          ${this._transcript
            ? html`<div class="transcript">${this._transcript}</div>`
            : nothing}
          ${this._interimTranscript
            ? html`<div class="interim" aria-live="polite">${this._interimTranscript}</div>`
            : nothing}
        </div>

        ${this.language && !isUnsupported
          ? html`<cg-badge variant="neutral" label=${this.language} size="sm" rounded="full"></cg-badge>`
          : nothing}

        ${this.pushToTalk && !isUnsupported
          ? html`<span class="ptt-hint" id="ptt-hint">Hold spacebar or mic button to talk</span>`
          : nothing}
      </div>
    `;
  }
}
