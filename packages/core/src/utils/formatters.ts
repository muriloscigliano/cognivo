/**
 * Format dataset for LLM consumption
 */
export function formatDataset<T>(dataset: T[], maxItems = 100): string {
  const limited = dataset.slice(0, maxItems);
  return JSON.stringify(limited, null, 2);
}

/**
 * Truncate text to max length
 */
export function truncateText(text: string, maxLength = 500): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
