/**
 * Clamp a number to [0, 100] and round to integer. NaN normalizes to 0.
 * Used wherever the engine produces a 0–100 confidence/score value.
 */
export function clamp01to100(n: number): number {
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return Math.round(n);
}

/** Generic numeric clamp (no rounding). */
export function clamp(n: number, lo: number, hi: number): number {
  if (Number.isNaN(n)) return lo;
  if (n < lo) return lo;
  if (n > hi) return hi;
  return n;
}

/**
 * Softmax over a numeric vector. Returns probabilities summing to 1.
 * Single-element input returns [1]. Empty input returns [].
 */
export function softmax(values: readonly number[]): number[] {
  if (values.length === 0) return [];
  const exps = values.map((v) => Math.exp(v));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((v) => v / sum);
}
