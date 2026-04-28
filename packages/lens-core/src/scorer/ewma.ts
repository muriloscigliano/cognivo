/**
 * Exponentially-weighted moving average — used in Watch mode to keep the score
 * needle from jittering between rapid re-scans (Spec §6.4).
 *
 * `alpha = 0.7` matches the spec's 70/30 mix.
 */
export class ScoreEwma {
  private current: number | null = null;

  constructor(private readonly alpha: number = 0.7) {
    if (alpha < 0 || alpha > 1) {
      throw new Error('lens-core: ScoreEwma alpha must be in [0, 1].');
    }
  }

  /** Push a new score reading; returns the smoothed value. */
  push(value: number): number {
    if (this.current === null) {
      this.current = value;
    } else {
      this.current = this.alpha * value + (1 - this.alpha) * this.current;
    }
    return Math.round(this.current);
  }

  /** Reset the average — call when entering a new audit. */
  reset(): void {
    this.current = null;
  }

  /** Current smoothed value, or null if no readings yet. */
  peek(): number | null {
    return this.current === null ? null : Math.round(this.current);
  }
}
