/**
 * Pure name-based predicates for token classification at rule-evaluation time.
 *
 * These mirror (a subset of) the tier classifier in @cognivo/tokens'
 * scripts/manifest-lib.mjs but live here to avoid pulling the manifest
 * builder into runtime. The shape patterns are unlikely to drift — adding a
 * new color palette name would be a breaking change to the token system.
 */

const PALETTE_PREFIX_RE =
  /^--cg-(gray|red|orange|amber|yellow|lime|green|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|brown|stone|neutral|zinc|slate)-/;

const BRAND_PREFIX_RE = /^--cg-brand-/;

/** True if the token name is a tier-1 palette primitive (e.g. --cg-gray-500). */
export function isPaletteToken(name: string): boolean {
  return PALETTE_PREFIX_RE.test(name);
}

/** True if the token name is a tier-1 brand primitive (e.g. --cg-brand-primary-500). */
export function isBrandToken(name: string): boolean {
  return BRAND_PREFIX_RE.test(name);
}

/**
 * True iff every candidate is a tier-1 color (palette OR brand). Used by
 * tier-1 rules to suppress fires when a tier-2+ alternative resolves to the
 * same value (ambiguous case → benefit of the doubt).
 *
 * Note: only tier-1 *color* primitives match; numeric primitives like
 * `--cg-spacing-8` would never appear in a color-property's candidates list,
 * so they don't pollute the check.
 */
export function allTier1Color(candidates: readonly string[]): boolean {
  if (candidates.length === 0) return false;
  return candidates.every((c) => isPaletteToken(c) || isBrandToken(c));
}

/** True if the token name is a tier-2 semantic background token (CLAUDE Semantic Rule 1). */
export function isBackgroundToken(name: string): boolean {
  return name.includes('-background-') || name.endsWith('-background');
}
