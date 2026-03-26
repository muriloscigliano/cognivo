import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';

/** A metric for evaluating prompt quality */
export interface EvaluationMetric {
  /** Name of the metric */
  name: string;
  /** Evaluate a result against expected output. Returns 0-1 score. */
  evaluate: (result: AiResult, testCase: TestCase) => number;
  /** Weight for this metric in overall score (default: 1) */
  weight?: number;
}

/** A test case for prompt evaluation */
export interface TestCase {
  /** The intent to test */
  intent: AiIntent;
  /** The context to test with */
  context: AiContext;
  /** Expected fields that should be present */
  expectedFields?: (keyof AiResult)[];
  /** Custom validator (returns 0-1 score) */
  customValidator?: (result: AiResult) => number;
  /** Human-readable description */
  description?: string;
}

/** Configuration for the optimizer */
export interface OptimizationConfig {
  /** Test cases to evaluate against */
  testCases: TestCase[];
  /** Metrics to measure quality */
  metrics: EvaluationMetric[];
  /** Max optimization iterations (default: 3) */
  maxIterations?: number;
  /** Target score to stop early (0-1, default: 0.85) */
  targetScore?: number;
  /** Number of prompt variations to generate per iteration (default: 3) */
  variationsPerIteration?: number;
}

/** Result of optimization */
export interface OptimizationResult {
  /** Best system prompt found */
  bestPrompt: string;
  /** Score of the best prompt */
  bestScore: number;
  /** All iterations with scores */
  history: Array<{
    iteration: number;
    prompt: string;
    score: number;
  }>;
  /** Total test cases evaluated */
  totalEvaluations: number;
}

/** Evaluation result for a single run */
export interface EvaluationResult {
  /** Overall weighted score (0-1) */
  overallScore: number;
  /** Per-metric scores */
  metricScores: Array<{ metric: string; score: number; weight: number }>;
  /** Per-test-case scores */
  testCaseScores: Array<{ description: string; score: number }>;
}
