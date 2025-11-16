/**
 * Metadata about the data being analyzed
 */
export interface AiContextMeta {
  /** Column names or data labels */
  labels?: string[];

  /** Time period (e.g., 'daily', 'monthly', 'Q1 2024') */
  timeframe?: string;

  /** Unit of measurement (e.g., 'USD', 'users', 'count') */
  unit?: string;

  /** Type of data (e.g., 'spending', 'revenue', 'pageviews') */
  dataType?: string;

  /** Category or domain (e.g., 'Marketing', 'Sales') */
  category?: string;

  /** Additional custom metadata */
  [key: string]: unknown;
}

/**
 * AI Context - Data sent to the LLM
 *
 * This is the standardized format for passing data to AI.
 * Components prepare this, and adapters convert it to LLM-specific formats.
 *
 * @template T - Type of data items in the dataset
 */
export interface AiContext<T = unknown> {
  /** All visible data */
  dataset: T[];

  /** User-selected items (optional) */
  selection?: T[];

  /** Metadata about the data */
  meta?: AiContextMeta;
}
