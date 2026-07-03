import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase } from '../../styles/index.js';

export type CgTimestampFormat = 'relative' | 'datetime' | 'date' | 'time';

/**
 * @element cg-timestamp
 * Renders a point in time as relative ("2h ago") or absolute text inside a
 * semantic `<time>` element, auto-refreshing relative values when `live`.
 *
 * @example
 * ```html
 * <cg-timestamp datetime="2026-07-03T09:00:00Z" live></cg-timestamp>
 * ```
 *
 * @example Absolute
 * ```html
 * <cg-timestamp datetime="2026-07-03T09:00:00Z" format="datetime"></cg-timestamp>
 * ```
 */
@customElement('cg-timestamp')
export class CgTimestamp extends LitElement {
  static override styles = [hostBase, css`
    :host { display: inline; font-family: var(--cg-font-family-primary); }
    time { color: inherit; white-space: nowrap; }
    :host([muted]) time { color: var(--cg-color-surface-base-icon); }
  `];

  @property({ reflect: true }) datetime = '';
  @property({ reflect: true }) format: CgTimestampFormat = 'relative';
  @property({ type: Boolean, reflect: true }) live = false;

  /** Tick counter forcing re-render on the live interval. */
  @state() private _tick = 0;

  private _timer: ReturnType<typeof setInterval> | undefined;

  override connectedCallback(): void {
    super.connectedCallback();
    this._startTimer();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopTimer();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('live') || changed.has('format')) {
      this._stopTimer();
      this._startTimer();
    }
  }

  private _startTimer(): void {
    if (this.live && this.format === 'relative' && !this._timer) {
      this._timer = setInterval(() => { this._tick++; }, 60_000);
    }
  }

  private _stopTimer(): void {
    if (this._timer) { clearInterval(this._timer); this._timer = undefined; }
  }

  private _parse(): Date | null {
    if (!this.datetime) return null;
    // Support epoch ms as a numeric string, otherwise defer to Date parsing.
    const asNumber = Number(this.datetime);
    const d = Number.isFinite(asNumber) && this.datetime.trim() !== ''
      ? new Date(asNumber)
      : new Date(this.datetime);
    return isNaN(d.getTime()) ? null : d;
  }

  private _relative(d: Date): string {
    const diffMs = d.getTime() - Date.now();
    const future = diffMs > 0;
    const abs = Math.abs(diffMs);
    const sec = Math.round(abs / 1000);
    const min = Math.round(sec / 60);
    const hr = Math.round(min / 60);
    const day = Math.round(hr / 24);

    if (sec < 60) return future ? 'in a moment' : 'just now';
    if (min < 60) return future ? `in ${min}m` : `${min}m ago`;
    if (hr < 24) return future ? `in ${hr}h` : `${hr}h ago`;
    if (day < 7) return future ? `in ${day}d` : `${day}d ago`;
    // Older than a week → short absolute date.
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  private _absolute(d: Date): string {
    switch (this.format) {
      case 'date': return d.toLocaleDateString();
      case 'time': return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
      case 'datetime':
      default: return d.toLocaleString();
    }
  }

  override render() {
    void this._tick; // establish reactive dependency
    const d = this._parse();
    if (!d) return html`<span aria-hidden="true">—</span>`;

    const display = this.format === 'relative' ? this._relative(d) : this._absolute(d);
    return html`<time datetime=${d.toISOString()} title=${d.toLocaleString()}>${display}</time>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-timestamp': CgTimestamp;
  }
}
