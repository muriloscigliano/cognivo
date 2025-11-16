/**
 * AI Intent - What the user wants the AI to do
 *
 * These are standardized actions that components can request from the AI.
 * Each intent has a specific purpose and expected output structure.
 */
export enum AiIntent {
  /** Explain why something happened or identify patterns */
  EXPLAIN = 'explain',

  /** Summarize data into key points */
  SUMMARIZE = 'summarize',

  /** Predict future values based on historical data */
  FORECAST = 'forecast',

  /** Find unusual patterns or outliers */
  DETECT_ANOMALY = 'detect_anomaly',

  /** Auto-categorize or label items */
  CLASSIFY = 'classify',

  /** Suggest improvements or optimizations */
  OPTIMIZE = 'optimize',

  /** Compare two datasets or time periods */
  COMPARE = 'compare',

  /** Group similar items together */
  CLUSTER = 'cluster',
}

/**
 * Check if a string is a valid AiIntent
 */
export function isAiIntent(value: unknown): value is AiIntent {
  return typeof value === 'string' && Object.values(AiIntent).includes(value as AiIntent);
}
