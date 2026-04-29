/**
 * @element ai-audio-player
 * Audio player with decorative waveform visualization, progress seek bar, and speed control.
 *
 * @example
 * ```html
 * <ai-audio-player
 *   src="/audio/podcast-ep12.mp3"
 *   title="Episode 12: AI Safety"
 *   duration="1842"
 * ></ai-audio-player>
 * ```
 *
 * @fires {CustomEvent} ai-audio-play - Playback started
 * @fires {CustomEvent} ai-audio-pause - Playback paused
 * @fires {CustomEvent} ai-audio-end - Playback reached the end
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Play button, waveform progress, and seek fill color
 */
import { LitElement, html, css } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-audio-player')
export class AiAudioPlayer extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .player {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
    }

    .play-btn {
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      border-radius: var(--cg-border-radius-full);
      border: none;
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 0;
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .play-btn:hover { transform: scale(1.05); }
    .play-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .play-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring);
    }

    .content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-6);
    }

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .time {
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }

    .waveform {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-2);
      height: var(--cg-spacing-24);
    }

    .wave-bar {
      flex: 1;
      min-width: var(--cg-spacing-2);
      max-width: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .wave-bar.past {
      background: var(--cg-color-action-primary-background-default);
    }
    .wave-bar.future {
      background: var(--cg-color-surface-cards-border);
    }

    .progress-track {
      width: 100%;
      height: var(--cg-spacing-4);
      background: var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      cursor: pointer;
      position: relative;
    }
    .progress-fill {
      height: 100%;
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-full);
      transition: width var(--cg-transition-duration-fast) var(--cg-transition-easing-linear);
    }

    .speed-btn {
      background: none;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      flex-shrink: 0;
      font-family: inherit;
      transition:
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .speed-btn:hover {
      color: var(--cg-color-surface-base-text);
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .speed-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring);
    }
    @media (prefers-reduced-motion: reduce) {
      .wave-bar { transition: none; }
      .progress-fill { transition: none; }
    }
  `];
  @property({ type: String }) src = '';
  @property({ type: String }) override title = 'Audio';
  @property({ type: Number }) duration = 0;

  @state() private _playing = false;
  @state() private _currentTime = 0;
  @state() private _loaded = false;
  @state() private _speed = 1;
  @state() private _waveBars: number[] = [];

  private _audio: HTMLAudioElement | null = null;
  private _raf = 0;
  private _speeds = [1, 1.5, 2];

  override connectedCallback() {
    super.connectedCallback();
    this._waveBars = Array.from({ length: 40 }, () => 20 + Math.random() * 80);
    this._audio = new Audio();
    this._audio.addEventListener('loadedmetadata', () => {
      this._loaded = true;
      if (!this.duration) this.duration = this._audio!.duration;
    });
    this._audio.addEventListener('ended', () => {
      this._playing = false;
      this._currentTime = 0;
      cancelAnimationFrame(this._raf);
      this.dispatchEvent(new CustomEvent('ai-audio-end', { bubbles: true, composed: true }));
    });
    if (this.src) this._audio.src = this.src;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this._raf);
    this._audio?.pause();
    this._audio = null;
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('src') && this._audio && this.src) {
      this._audio.src = this.src;
      this._audio.load();
    }
  }

  private _tick = () => {
    if (this._audio && this._playing) {
      this._currentTime = this._audio.currentTime;
      this._raf = requestAnimationFrame(this._tick);
    }
  };

  private _togglePlay() {
    if (!this._audio) return;
    if (this._playing) {
      this._audio.pause();
      this._playing = false;
      cancelAnimationFrame(this._raf);
      this.dispatchEvent(new CustomEvent('ai-audio-pause', { bubbles: true, composed: true }));
    } else {
      this._audio.play().catch(() => {
        this._playing = false;
      });
      this._playing = true;
      this._raf = requestAnimationFrame(this._tick);
      this.dispatchEvent(new CustomEvent('ai-audio-play', { bubbles: true, composed: true }));
    }
  }

  private _seek(e: MouseEvent) {
    const track = e.currentTarget as HTMLElement;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const dur = this.duration || this._audio?.duration || 0;
    if (this._audio && dur) {
      this._audio.currentTime = pct * dur;
      this._currentTime = this._audio.currentTime;
    }
  }

  private _seekKeydown(e: KeyboardEvent) {
    const dur = this.duration || this._audio?.duration || 0;
    if (!this._audio || !dur) return;
    let handled = true;
    switch (e.key) {
      case 'ArrowRight': this._audio.currentTime = Math.min(dur, this._audio.currentTime + 5); break;
      case 'ArrowLeft': this._audio.currentTime = Math.max(0, this._audio.currentTime - 5); break;
      case 'Home': this._audio.currentTime = 0; break;
      case 'End': this._audio.currentTime = dur; break;
      default: handled = false;
    }
    if (handled) {
      e.preventDefault();
      this._currentTime = this._audio.currentTime;
    }
  }

  private _cycleSpeed() {
    const idx = this._speeds.indexOf(this._speed);
    this._speed = this._speeds[(idx + 1) % this._speeds.length] ?? 1;
    if (this._audio) this._audio.playbackRate = this._speed;
  }

  private _fmt(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  override render() {
    const dur = this.duration || this._audio?.duration || 0;
    const pct = dur > 0 ? (this._currentTime / dur) * 100 : 0;
    const barPct = dur > 0 ? this._currentTime / dur : 0;

    return html`
      <div class="player" role="region" aria-label="Audio player: ${this.title}">
        <button
          class="play-btn"
          aria-label=${this._playing ? 'Pause' : 'Play'}
          @click=${this._togglePlay}
        >
          <cg-icon name="${this._playing ? 'pause' : 'play'}" size="sm"></cg-icon>
        </button>

        <div class="content">
          <div class="title-row">
            <span class="title">${this.title}</span>
            <span class="time">${this._fmt(this._currentTime)} / ${this._fmt(dur)}</span>
          </div>
          <div class="waveform" aria-hidden="true">
            ${this._waveBars.map((h, i) => {
              const past = i / this._waveBars.length <= barPct;
              return html`<span class="wave-bar ${past ? 'past' : 'future'}" style="height: ${h}%"></span>`;
            })}
          </div>
          <div
            class="progress-track"
            role="slider"
            tabindex="0"
            aria-label="Seek"
            aria-valuemin="0"
            aria-valuemax=${Math.floor(dur)}
            aria-valuenow=${Math.floor(this._currentTime)}
            @click=${this._seek}
            @keydown=${this._seekKeydown}
          >
            <div class="progress-fill" style="width: ${pct}%"></div>
          </div>
        </div>

        <button class="speed-btn" aria-label="Playback speed" @click=${this._cycleSpeed}>
          ${this._speed}x
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-audio-player': AiAudioPlayer;
  }
}
