import type { AiClient } from '../client/types.js';
import type { AiResult } from '../results/types.js';
import type { EvaluationMetric, TestCase, EvaluationResult } from './types.js';

export class PromptEvaluator {
  constructor(
    private client: AiClient,
    private metrics: EvaluationMetric[]
  ) {}

  /** Run all test cases against the client with the given system prompt */
  async evaluate(testCases: TestCase[], systemPrompt?: string): Promise<EvaluationResult> {
    const testCaseScores: Array<{ description: string; score: number }> = [];
    const metricTotals = new Map<string, { total: number; count: number; weight: number }>();

    // Initialize metric totals
    for (const metric of this.metrics) {
      metricTotals.set(metric.name, { total: 0, count: 0, weight: metric.weight ?? 1 });
    }

    for (const testCase of testCases) {
      try {
        const result = await this.client.runIntent(
          testCase.intent,
          testCase.context,
          systemPrompt ? { systemPrompt } : undefined
        );

        let testScore = 0;
        let metricCount = 0;

        for (const metric of this.metrics) {
          const score = metric.evaluate(result, testCase);
          const totals = metricTotals.get(metric.name)!;
          totals.total += score;
          totals.count += 1;
          testScore += score * (metric.weight ?? 1);
          metricCount += (metric.weight ?? 1);
        }

        // Add custom validator score if present
        if (testCase.customValidator) {
          const customScore = testCase.customValidator(result);
          testScore += customScore;
          metricCount += 1;
        }

        const normalizedScore = metricCount > 0 ? testScore / metricCount : 0;
        testCaseScores.push({
          description: testCase.description ?? `Test ${testCaseScores.length + 1}`,
          score: normalizedScore,
        });
      } catch {
        testCaseScores.push({
          description: testCase.description ?? `Test ${testCaseScores.length + 1}`,
          score: 0,
        });
      }
    }

    // Calculate per-metric averages
    const metricScores = Array.from(metricTotals.entries()).map(([metric, data]) => ({
      metric,
      score: data.count > 0 ? data.total / data.count : 0,
      weight: data.weight,
    }));

    // Calculate overall weighted score
    const totalWeight = metricScores.reduce((sum, m) => sum + m.weight, 0);
    const overallScore = totalWeight > 0
      ? metricScores.reduce((sum, m) => sum + m.score * m.weight, 0) / totalWeight
      : 0;

    return { overallScore, metricScores, testCaseScores };
  }
}

// Built-in metrics

/** Checks if confidence is present and in valid range */
export const confidenceMetric: EvaluationMetric = {
  name: 'confidence',
  evaluate: (result: AiResult) => {
    if (result.confidence == null) return 0;
    if (result.confidence < 0 || result.confidence > 1) return 0;
    return 1;
  },
  weight: 1,
};

/** Checks if explanation is present and has minimum length */
export const completenessMetric: EvaluationMetric = {
  name: 'completeness',
  evaluate: (result: AiResult) => {
    let score = 0;
    let fields = 0;

    // Check explanation
    if (result.explanation && result.explanation.length > 20) {
      score += 1;
    }
    fields += 1;

    // Check bullets (at least 3)
    if (result.bullets && result.bullets.length >= 3) {
      score += 1;
    }
    fields += 1;

    // Check confidence
    if (result.confidence != null) {
      score += 1;
    }
    fields += 1;

    // Check drivers
    if (result.drivers && result.drivers.length > 0) {
      score += 1;
    }
    fields += 1;

    return fields > 0 ? score / fields : 0;
  },
  weight: 2,
};

/** Checks that expected fields are present in result */
export const expectedFieldsMetric: EvaluationMetric = {
  name: 'expectedFields',
  evaluate: (result: AiResult, testCase: TestCase) => {
    if (!testCase.expectedFields || testCase.expectedFields.length === 0) return 1;
    const present = testCase.expectedFields.filter(f => result[f] != null).length;
    return present / testCase.expectedFields.length;
  },
  weight: 1,
};
