/**
 * Parse a tabindex attribute value into a number.
 * Returns NaN for missing/garbage values, which short-circuits range checks
 * (NaN compares false against any range).
 */
export function parseTabindex(raw: string | undefined): number {
  if (raw === undefined) return Number.NaN;
  return Number.parseInt(raw, 10);
}
