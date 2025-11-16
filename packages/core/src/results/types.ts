/**
 * Key driver or factor in an analysis
 */
export interface AiDriver {
  /** Name of the factor */
  factor: string;

  /** Impact magnitude (-100 to 100) */
  impact: number;

  /** Confidence in this driver (0 to 1) */
  confidence: number;

  /** Optional description */
  description?: string;
}

/**
 * Detected anomaly in the data
 */
export interface AiAnomaly {
  /** Index in the dataset */
  index: number;

  /** The anomalous value */
  value: unknown;

  /** Why it's anomalous */
  reason: string;

  /** Severity level */
  severity: 'low' | 'medium' | 'high';

  /** Confidence (0 to 1) */
  confidence?: number;
}

/**
 * Forecast prediction
 */
export interface AiForecast {
  /** Timestamp or identifier */
  timestamp: string | number;

  /** Predicted value */
  value: number;

  /** Confidence in prediction (0 to 1) */
  confidence: number;

  /** Lower bound of prediction interval */
  lowerBound?: number;

  /** Upper bound of prediction interval */
  upperBound?: number;
}

/**
 * Classification result
 */
export interface AiClassification {
  /** Index of the item */
  itemIndex: number;

  /** Assigned category */
  category: string;

  /** Confidence (0 to 1) */
  confidence: number;

  /** Alternative categories */
  alternatives?: Array<{ category: string; confidence: number }>;
}

/**
 * Recommendation
 */
export interface AiRecommendation {
  /** Short title */
  title: string;

  /** Detailed description */
  description: string;

  /** Priority level */
  priority: 'low' | 'medium' | 'high';

  /** Expected impact if implemented */
  impact?: string;

  /** Effort required */
  effort?: 'low' | 'medium' | 'high';
}

/**
 * Source or citation
 */
export interface AiSource {
  /** Source title */
  title: string;

  /** URL (if applicable) */
  url?: string;

  /** Excerpt or quote */
  excerpt?: string;
}

/**
 * AI Result - Structured output from LLM
 *
 * This is the standardized format for AI responses.
 * Different intents populate different fields.
 */
export interface AiResult {
  /** Simple text explanation */
  explanation?: string;

  /** Bullet point insights */
  bullets?: string[];

  /** Key drivers/factors */
  drivers?: AiDriver[];

  /** Overall confidence (0 to 1) */
  confidence?: number;

  /** Detected anomalies */
  anomalies?: AiAnomaly[];

  /** Forecast predictions */
  forecast?: AiForecast[];

  /** Classifications/tags */
  classifications?: AiClassification[];

  /** Recommendations */
  recommendations?: AiRecommendation[];

  /** Sources/citations */
  sources?: AiSource[];

  /** Raw data for custom rendering */
  metadata?: Record<string, unknown>;
}
