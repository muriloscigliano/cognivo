/**
 * Fuzzy multi-field search utility.
 *
 * Splits a query into lowercase tokens and scores each token against
 * an array of text fields. Scoring: +3 exact, +2 prefix, +1 substring.
 */

/**
 * Score a query against multiple text fields.
 *
 * @param query  Space-separated search terms
 * @param fields Array of strings to match against (tag, description, className, etc.)
 * @returns Cumulative score (0 = no match)
 */
export function searchScore(query: string, fields: string[]): number {
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) return 0;

  const lowerFields = fields.map((f) => f.toLowerCase());

  let total = 0;

  for (const token of tokens) {
    let bestForToken = 0;

    for (const field of lowerFields) {
      // Exact match (the whole field equals the token)
      if (field === token) {
        bestForToken = Math.max(bestForToken, 3);
        continue;
      }

      // Prefix match (field starts with the token, or any word in the field starts with it)
      const words = field.split(/[\s\-_/]+/);
      if (field.startsWith(token) || words.some((w) => w.startsWith(token))) {
        bestForToken = Math.max(bestForToken, 2);
        continue;
      }

      // Substring match
      if (field.includes(token)) {
        bestForToken = Math.max(bestForToken, 1);
      }
    }

    total += bestForToken;
  }

  return total;
}

/**
 * Returns true if the query matches any of the provided fields.
 */
export function matchesSearch(query: string, fields: string[]): boolean {
  return searchScore(query, fields) > 0;
}
