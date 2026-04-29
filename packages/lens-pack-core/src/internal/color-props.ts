/**
 * The CSS property names whose values represent colors. Token-tier rules
 * filter `node.tokenUsage` by this set, since tier-1 hits on `padding-top`
 * (a primitive spacing token) are NOT a tier-1 palette violation.
 *
 * Mirrors the color subset of `TOKENABLE_PROPERTIES` in
 * lens-core's observer/token-resolution.ts. Kept here as a frozen Set so
 * rules can do O(1) membership checks without re-importing from lens-core.
 */
export const COLOR_PROPERTIES: ReadonlySet<string> = new Set([
  'color',
  'background-color',
  'border-color',
  'outline-color',
  'fill',
  'stroke',
]);
