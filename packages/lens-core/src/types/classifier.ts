/**
 * The 12 intents we classify pages into, plus `unknown` as the conservative-firing fallback.
 * (Spec §5.1, Spec §5.6.)
 */
export type PageIntent =
  | 'pricing'
  | 'checkout'
  | 'onboarding'
  | 'signup'
  | 'signin'
  | 'landing'
  | 'dashboard'
  | 'settings'
  | 'content'
  | 'form'
  | 'empty-state'
  | 'error'
  | 'unknown';

/**
 * A signal contributed by a single feature extractor (URL pattern, ARIA landmarks, etc.).
 * The classifier sums signals into a softmax over PageIntent.
 */
export interface ClassifierSignal {
  /** Which extractor produced this signal. */
  source: string;
  /** Which intent the signal points to. */
  intent: PageIntent;
  /** Signal weight (>0; higher = stronger). */
  weight: number;
  /** Human-readable evidence shown in the explainer. */
  evidence: string;
}

/**
 * The full classification output. Multi-intent (Spec §5.3).
 */
export interface IntentClassification {
  /** Page-level primary intent + confidence 0–100. */
  primary: { intent: PageIntent; confidence: number };
  /** Region-level secondary intents. */
  secondary: Array<{
    intent: PageIntent;
    nodeIds: string[];
    confidence: number;
  }>;
  /** All raw signals, retained for the explainer. */
  signals: ClassifierSignal[];
  /** Which stage produced the verdict (Spec §5.2). */
  stage: 'override' | 'heuristic' | 'llm';
}

/**
 * Helper type used by the engine to look up which rules fire under which intents.
 */
export interface IntentScopedRules {
  intent: PageIntent;
  /** Rule IDs that opt in to this intent. */
  ruleIds: string[];
}
