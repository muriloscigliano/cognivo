/**
 * <ai-audio-player> — Audio Playback with Waveform Visualization
 *
 * Play/pause button, progress bar, time display.
 * Decorative waveform bars, speed control (1x/1.5x/2x).
 * Fully keyboard accessible.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

@customElement('ai-audio-player')
export class AiAudioPlayer extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([hidden]) { display: none; }

    .player {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--cg-color-bg-secondary, #27272a);
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
      border-radius: 12px;
    }

    .play-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #18181b;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 0;
      transition: transform 100ms ease;
    }
    .play-btn:hover { transform: scale(1.05); }
    .play-btn:active { transform: scale(0.95); }
    .play-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 13px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .time {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }

    .waveform {
      display: flex;
      align-items: center;
      gap: 2px;
      height: 24px;
    }

    .wave-bar {
      flex: 1;
      min-width: 2px;
      max-width: 4px;
      border-radius: 1px;
      transition: background 100ms ease;
    }
    .wave-bar.past {
      background: var(--cg-brand-ai-accent, #dfff61);
    }
    .wave-bar.future {
      background: var(--cg-color-border-primary, #3f3f46);
    }

    .progress-track {
      width: 100%;
      height: 4px;
      background: var(--cg-color-border-primary, #3f3f46);
      border-radius: 2px;
      cursor: pointer;
      position: relative;
    }
    .progress-fill {
      height: 100%;
      background: var(--cg-brand-ai-accent, #dfff61);
      border-radius: 2px;
      transition: width 100ms linear;
    }

    .speed-btn {
      background: none;
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 6px;
      cursor: pointer;
      flex-shrink: 0;
      font-family: inherit;
    }
    .speed-btn:hover { color: var(--cg-color-text-primary, #fafafa); }
    .speed-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      .play-btn { transition: none; }
      .wave-bar { transition: none; }
      .progress-fill { transition: none; }
    }
  `;

  @property({ type: String }) src = '';
  @property({ type: String }) title = 'Audio';
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

  private _cycleSpeed() {
    const idx = this._speeds.indexOf(this._speed);
    this._speed = this._speeds[(idx + 1) % this._speeds.length];
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
        >${this._playing ? '⏸' : '▶'}</button>

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
