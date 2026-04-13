/**
 * Smart response truncation utilities for MCP tool output.
 *
 * Keeps LLM responses within context-friendly sizes while
 * preserving readability (sentence boundaries, helpful messages).
 */

/**
 * Truncate text at the last sentence boundary before `maxChars`.
 * Appends "..." when truncation occurs.
 */
export function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;

  const slice = text.slice(0, maxChars);

  // Look for the last sentence-ending punctuation followed by a space or end
  const sentenceEnd = slice.search(/[.!?]\s[^.!?]*$/);

  if (sentenceEnd !== -1) {
    // Include the punctuation mark itself
    return slice.slice(0, sentenceEnd + 1) + '...';
  }

  // Fall back to last whitespace boundary
  const lastSpace = slice.lastIndexOf(' ');
  if (lastSpace > maxChars * 0.5) {
    return slice.slice(0, lastSpace) + '...';
  }

  // Hard cut as last resort
  return slice + '...';
}

/**
 * Truncate a list of items, returning a message about how many are shown.
 *
 * @param items      Full array of items
 * @param limit      Maximum number of items to return
 * @param totalCount Total count (may differ from items.length if pre-filtered)
 * @returns Object with the truncated items, a boolean flag, and a human-readable message
 */
export function truncateList<T>(
  items: T[],
  limit: number,
  totalCount: number,
): { items: T[]; truncated: boolean; message: string } {
  const truncated = items.length > limit;
  const sliced = truncated ? items.slice(0, limit) : items;

  const message = truncated
    ? `Showing ${limit} of ${totalCount}. Use 'search' to narrow results.`
    : `Showing all ${sliced.length} result${sliced.length === 1 ? '' : 's'}.`;

  return { items: sliced, truncated, message };
}
