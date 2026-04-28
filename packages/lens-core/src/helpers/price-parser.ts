/**
 * Extract a numeric price from a free-text string.
 *
 * Supports:
 *  - Common currency symbols ($, €, £, ¥, ₹, ₽) — stripped
 *  - Comma thousands separators (US-style only in v1: "1,299.99" → 1299.99)
 *  - Period decimal point
 *  - Suffixes like "/mo", "USD", "per user" — ignored
 *  - Returns the *first* number found; "from $9" → 9
 *
 * Returns null when no number can be extracted ("Free", "Contact us", "").
 *
 * Limitations (intentional for v1):
 *  - Does not parse EU-style "1.299,99" → 1299.99 — that ambiguity (period as
 *    thousands vs decimal) requires locale awareness. Rule packs targeting EU
 *    pricing should normalize before calling.
 */
export function parsePrice(text: string | undefined): number | null {
  if (!text) return null;
  const stripped = text.replace(/[$€£¥₹₽]/g, '').trim();
  // Greedy digit run + optional ,NNN groups + optional decimal. `\d+` consumes
  // all leading digits before a comma can appear, so "1000" matches "1000" not "100".
  const match = stripped.match(/-?\d+(?:,\d{3})*(?:\.\d+)?/);
  if (!match) return null;
  const numeric = match[0].replace(/,/g, '');
  const num = parseFloat(numeric);
  return Number.isNaN(num) ? null : num;
}
