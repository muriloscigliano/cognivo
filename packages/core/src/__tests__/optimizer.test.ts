import { describe, it, expect, vi } from 'vitest';
import { PromptEvaluator, confidenceMetric, completenessMetric, expectedFieldsMetric } from '../optimization/evaluator';
import { PromptOptimizer } from '../optimization/optimizer';
import { OptimizedClient } from '../optimization/optimized-client';
import { AiIntent } from '../intents/types';
import type { AiClient } from '../client/types';
import type { AiResult } from '../results/types';
import type { AiContext } from '../context/types';
import type { TestCase, EvaluationMetric } from '../optimization/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createMockClient(
  ...results: AiResult[]
): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  const fn = vi.fn();
  for (const result of results) {
    fn.mockResolvedValueOnce(result);
  }
  return { runIntent: fn };
}

const sampleContext: AiContext<{ value: number }> = {
  dataset: [{ value: 1 }, { value: 2 }, { value: 3 }],
  meta: { dataType: 'test' },
};

const sampleTestCase: TestCase = {
  intent: AiIntent.EXPLAIN,
  context: sampleContext,
  description: 'Explain test data',
};

/** Uses confidence value directly as the score (0-1). Useful for tests that need granular scoring. */
const confidenceValueMetric: EvaluationMetric = {
  name: 'confidenceValue',
  evaluate: (result) => result.confidence ?? 0,
  weight: 1,
};

// ---------------------------------------------------------------------------
// PromptEvaluator
// ---------------------------------------------------------------------------

describe('PromptEvaluator', () => {
  it('evaluates test cases and returns scores', async () => {
    const mockClient = createMockClient(
      { explanation: 'This is a detailed explanation of the data', confidence: 0.85, bullets: ['a', 'b', 'c'] }
    );

    const evaluator = new PromptEvaluator(mockClient, [confidenceMetric]);
    const result = await evaluator.evaluate([sampleTestCase], 'Test prompt');

    expect(result.overallScore).toBe(1);
    expect(result.testCaseScores).toHaveLength(1);
    expect(result.testCaseScores[0]!.description).toBe('Explain test data');
    expect(result.testCaseScores[0]!.score).toBe(1);
  });

  it('passes systemPrompt option when provided', async () => {
    const mockClient = createMockClient(
      { explanation: 'result', confidence: 0.5 }
    );

    const evaluator = new PromptEvaluator(mockClient, [confidenceMetric]);
    await evaluator.evaluate([sampleTestCase], 'My custom prompt');

    expect(mockClient.runIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      { systemPrompt: 'My custom prompt' }
    );
  });

  it('does not pass systemPrompt option when undefined', async () => {
    const mockClient = createMockClient(
      { explanation: 'result', confidence: 0.5 }
    );

    const evaluator = new PromptEvaluator(mockClient, [confidenceMetric]);
    await evaluator.evaluate([sampleTestCase]);

    expect(mockClient.runIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      undefined
    );
  });

  it('handles test case errors gracefully with score 0', async () => {
    const mockClient: AiClient & { runIntent: ReturnType<typeof vi.fn> } = {
      runIntent: vi.fn().mockRejectedValue(new Error('API failure')),
    };

    const evaluator = new PromptEvaluator(mockClient, [confidenceMetric]);
    const result = await evaluator.evaluate([sampleTestCase]);

    expect(result.testCaseScores).toHaveLength(1);
    expect(result.testCaseScores[0]!.score).toBe(0);
  });

  it('includes custom validator score in test case score', async () => {
    const mockClient = createMockClient(
      { explanation: 'result', confidence: 0.8 }
    );

    const testCaseWithValidator: TestCase = {
      ...sampleTestCase,
      customValidator: () => 0.5,
    };

    const evaluator = new PromptEvaluator(mockClient, [confidenceMetric]);
    const result = await evaluator.evaluate([testCaseWithValidator]);

    // confidenceMetric score = 1 (weight 1), custom validator = 0.5 (weight 1)
    // total = 1*1 + 0.5 = 1.5, count = 1 + 1 = 2, normalized = 0.75
    expect(result.testCaseScores[0]!.score).toBe(0.75);
  });

  it('calculates per-metric and overall scores correctly with multiple metrics', async () => {
    const mockClient = createMockClient(
      { explanation: 'This is a detailed explanation of the data', confidence: 0.85, bullets: ['a', 'b', 'c'], drivers: [{ factor: 'x', impact: 10, confidence: 0.9 }] },
      { explanation: 'Short', confidence: 0.5 }
    );

    const testCases: TestCase[] = [
      { ...sampleTestCase, description: 'Test 1' },
      { ...sampleTestCase, description: 'Test 2' },
    ];

    const evaluator = new PromptEvaluator(mockClient, [confidenceMetric, completenessMetric]);
    const result = await evaluator.evaluate(testCases);

    expect(result.metricScores).toHaveLength(2);

    // Both test cases have valid confidence -> confidence avg = 1
    const confMetric = result.metricScores.find(m => m.metric === 'confidence');
    expect(confMetric).toBeDefined();
    expect(confMetric!.score).toBe(1);

    // Completeness varies between test cases
    const compMetric = result.metricScores.find(m => m.metric === 'completeness');
    expect(compMetric).toBeDefined();

    // Overall score is weighted average
    expect(result.overallScore).toBeGreaterThan(0);
    expect(result.overallScore).toBeLessThanOrEqual(1);
  });

  it('uses default description when test case has no description', async () => {
    const mockClient = createMockClient(
      { explanation: 'result', confidence: 0.5 }
    );

    const testCaseNoDesc: TestCase = {
      intent: AiIntent.EXPLAIN,
      context: sampleContext,
    };

    const evaluator = new PromptEvaluator(mockClient, [confidenceMetric]);
    const result = await evaluator.evaluate([testCaseNoDesc]);

    expect(result.testCaseScores[0]!.description).toBe('Test 1');
  });

  it('returns zero overall score when no metrics provided', async () => {
    const mockClient = createMockClient(
      { explanation: 'result', confidence: 0.5 }
    );

    const evaluator = new PromptEvaluator(mockClient, []);
    const result = await evaluator.evaluate([sampleTestCase]);

    expect(result.overallScore).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Built-in Metrics
// ---------------------------------------------------------------------------

describe('confidenceMetric', () => {
  it('returns 1 for valid confidence', () => {
    expect(confidenceMetric.evaluate({ confidence: 0.5 }, sampleTestCase)).toBe(1);
    expect(confidenceMetric.evaluate({ confidence: 0 }, sampleTestCase)).toBe(1);
    expect(confidenceMetric.evaluate({ confidence: 1 }, sampleTestCase)).toBe(1);
  });

  it('returns 0 for missing confidence', () => {
    expect(confidenceMetric.evaluate({}, sampleTestCase)).toBe(0);
    expect(confidenceMetric.evaluate({ explanation: 'no confidence' }, sampleTestCase)).toBe(0);
  });

  it('returns 0 for out-of-range confidence', () => {
    expect(confidenceMetric.evaluate({ confidence: -0.1 }, sampleTestCase)).toBe(0);
    expect(confidenceMetric.evaluate({ confidence: 1.1 }, sampleTestCase)).toBe(0);
  });
});

describe('completenessMetric', () => {
  it('scores explanation, bullets, confidence, drivers', () => {
    const fullResult: AiResult = {
      explanation: 'This is a sufficiently long explanation for scoring',
      bullets: ['point 1', 'point 2', 'point 3'],
      confidence: 0.9,
      drivers: [{ factor: 'x', impact: 10, confidence: 0.8 }],
    };

    expect(completenessMetric.evaluate(fullResult, sampleTestCase)).toBe(1);
  });

  it('gives partial score for incomplete results', () => {
    const partialResult: AiResult = {
      explanation: 'This is a sufficiently long explanation for scoring',
      confidence: 0.9,
    };

    // explanation (long enough) = 1, bullets (missing) = 0, confidence = 1, drivers (missing) = 0
    // score = 2/4 = 0.5
    expect(completenessMetric.evaluate(partialResult, sampleTestCase)).toBe(0.5);
  });

  it('gives 0 for empty result', () => {
    expect(completenessMetric.evaluate({}, sampleTestCase)).toBe(0);
  });

  it('requires explanation to be longer than 20 chars', () => {
    const shortExplanation: AiResult = { explanation: 'Short' };
    // explanation too short = 0, bullets missing = 0, confidence missing = 0, drivers missing = 0
    expect(completenessMetric.evaluate(shortExplanation, sampleTestCase)).toBe(0);
  });

  it('requires at least 3 bullets', () => {
    const twoBullets: AiResult = { bullets: ['a', 'b'] };
    // explanation missing = 0, bullets < 3 = 0, confidence missing = 0, drivers missing = 0
    expect(completenessMetric.evaluate(twoBullets, sampleTestCase)).toBe(0);
  });
});

describe('expectedFieldsMetric', () => {
  it('returns 1 when no expected fields specified', () => {
    expect(expectedFieldsMetric.evaluate({}, sampleTestCase)).toBe(1);
  });

  it('checks required fields', () => {
    const testCase: TestCase = {
      ...sampleTestCase,
      expectedFields: ['explanation', 'confidence', 'bullets'],
    };

    const fullResult: AiResult = {
      explanation: 'test',
      confidence: 0.5,
      bullets: ['a'],
    };
    expect(expectedFieldsMetric.evaluate(fullResult, testCase)).toBe(1);
  });

  it('gives partial score for missing fields', () => {
    const testCase: TestCase = {
      ...sampleTestCase,
      expectedFields: ['explanation', 'confidence', 'bullets'],
    };

    const partialResult: AiResult = {
      explanation: 'test',
    };
    // 1 out of 3 fields present
    expect(expectedFieldsMetric.evaluate(partialResult, testCase)).toBeCloseTo(1 / 3);
  });

  it('returns 0 when no expected fields are present', () => {
    const testCase: TestCase = {
      ...sampleTestCase,
      expectedFields: ['anomalies', 'forecast'],
    };

    expect(expectedFieldsMetric.evaluate({}, testCase)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// PromptOptimizer
// ---------------------------------------------------------------------------

describe('PromptOptimizer', () => {
  it('returns base prompt if it meets target score', async () => {
    const mockClient = createMockClient(
      // Base prompt evaluation: returns perfect result
      { explanation: 'Great detailed explanation of the data', confidence: 0.95 }
    );

    const config = {
      testCases: [sampleTestCase],
      metrics: [confidenceMetric],
      targetScore: 0.85,
      maxIterations: 3,
    };

    const optimizer = new PromptOptimizer(mockClient, config);
    const result = await optimizer.optimize('Base prompt');

    expect(result.bestPrompt).toBe('Base prompt');
    expect(result.bestScore).toBe(1);
    expect(result.history).toHaveLength(1);
    expect(result.history[0]!.iteration).toBe(0);
    expect(result.totalEvaluations).toBe(1);
  });

  it('iterates and picks best prompt', async () => {
    const mockClient: AiClient & { runIntent: ReturnType<typeof vi.fn> } = {
      runIntent: vi.fn(),
    };

    // Call 1: Base prompt evaluation -> low score (0.3)
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.3 });
    // Call 2: Generate variations (returns bullets)
    mockClient.runIntent.mockResolvedValueOnce({
      bullets: ['Improved prompt A', 'Improved prompt B', 'Improved prompt C'],
    });
    // Call 3: Evaluate variation A -> medium score (0.6)
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.6 });
    // Call 4: Evaluate variation B -> high score (0.9)
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.9 });
    // Call 5: Evaluate variation C -> medium score (0.7)
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.7 });

    const config = {
      testCases: [sampleTestCase],
      metrics: [confidenceValueMetric],
      targetScore: 0.85,
      maxIterations: 1,
    };

    const optimizer = new PromptOptimizer(mockClient, config);
    const result = await optimizer.optimize('Base prompt');

    expect(result.bestPrompt).toBe('Improved prompt B');
    expect(result.bestScore).toBe(0.9);
  });

  it('stops when target score is reached', async () => {
    const mockClient: AiClient & { runIntent: ReturnType<typeof vi.fn> } = {
      runIntent: vi.fn(),
    };

    // Call 1: Base prompt evaluation -> low score (0.3)
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.3 });
    // Call 2: Generate variations
    mockClient.runIntent.mockResolvedValueOnce({
      bullets: ['Better prompt'],
    });
    // Call 3: Evaluate variation -> high score (0.95, meets target)
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.95 });

    const config = {
      testCases: [sampleTestCase],
      metrics: [confidenceValueMetric],
      targetScore: 0.85,
      maxIterations: 5,
    };

    const optimizer = new PromptOptimizer(mockClient, config);
    const result = await optimizer.optimize('Base prompt');

    expect(result.bestScore).toBe(0.95);
    // Should not have continued to iteration 2+
    expect(result.history.filter(h => h.iteration > 1)).toHaveLength(0);
  });

  it('records all iterations in history', async () => {
    const mockClient: AiClient & { runIntent: ReturnType<typeof vi.fn> } = {
      runIntent: vi.fn(),
    };

    // Base eval -> score 0.3
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.3 });
    // Iteration 1: generate variations
    mockClient.runIntent.mockResolvedValueOnce({ bullets: ['V1'] });
    // Iteration 1: evaluate V1 -> score 0.5
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.5 });
    // Iteration 2: generate variations
    mockClient.runIntent.mockResolvedValueOnce({ bullets: ['V2'] });
    // Iteration 2: evaluate V2 -> score 0.7
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.7 });

    const config = {
      testCases: [sampleTestCase],
      metrics: [confidenceValueMetric],
      targetScore: 0.99, // never reached
      maxIterations: 2,
      variationsPerIteration: 1,
    };

    const optimizer = new PromptOptimizer(mockClient, config);
    const result = await optimizer.optimize('Base');

    // Base (iter 0) + V1 (iter 1) + V2 (iter 2)
    expect(result.history).toHaveLength(3);
    expect(result.history[0]!.iteration).toBe(0);
    expect(result.history[0]!.prompt).toBe('Base');
    expect(result.history[1]!.iteration).toBe(1);
    expect(result.history[1]!.prompt).toBe('V1');
    expect(result.history[2]!.iteration).toBe(2);
    expect(result.history[2]!.prompt).toBe('V2');
  });

  it('totalEvaluations count is correct', async () => {
    const mockClient: AiClient & { runIntent: ReturnType<typeof vi.fn> } = {
      runIntent: vi.fn(),
    };

    const testCases: TestCase[] = [
      { ...sampleTestCase, description: 'Test 1' },
      { ...sampleTestCase, description: 'Test 2' },
    ];

    // Base eval (2 test cases) -> score 0.3
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.3 });
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.3 });
    // Generate variations
    mockClient.runIntent.mockResolvedValueOnce({ bullets: ['V1'] });
    // Evaluate V1 (2 test cases) -> score 0.95
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.95 });
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.95 });

    const config = {
      testCases,
      metrics: [confidenceValueMetric],
      targetScore: 0.85,
      maxIterations: 1,
      variationsPerIteration: 1,
    };

    const optimizer = new PromptOptimizer(mockClient, config);
    const result = await optimizer.optimize('Base');

    // 2 (base) + 2 (V1) = 4
    expect(result.totalEvaluations).toBe(4);
  });

  it('falls back to simple variations if AI generation fails', async () => {
    const mockClient: AiClient & { runIntent: ReturnType<typeof vi.fn> } = {
      runIntent: vi.fn(),
    };

    // Base eval -> score 0.3
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.3 });
    // Generate variations -> fails
    mockClient.runIntent.mockRejectedValueOnce(new Error('API error'));
    // Evaluate fallback variation 1 -> score 0.95
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.95 });

    const config = {
      testCases: [sampleTestCase],
      metrics: [confidenceValueMetric],
      targetScore: 0.85,
      maxIterations: 1,
      variationsPerIteration: 1,
    };

    const optimizer = new PromptOptimizer(mockClient, config);
    const result = await optimizer.optimize('Base');

    // The fallback variation should contain the base prompt
    expect(result.bestPrompt).toContain('Base');
    expect(result.bestPrompt).toContain('Always include confidence scores');
  });

  it('uses default config values when not specified', async () => {
    const mockClient: AiClient & { runIntent: ReturnType<typeof vi.fn> } = {
      runIntent: vi.fn(),
    };

    // Base eval -> meets default target (0.85)
    mockClient.runIntent.mockResolvedValueOnce({ confidence: 0.9 });

    const config = {
      testCases: [sampleTestCase],
      metrics: [confidenceMetric],
      // no maxIterations, targetScore, or variationsPerIteration
    };

    const optimizer = new PromptOptimizer(mockClient, config);
    const result = await optimizer.optimize('Base prompt');

    // Score = 1 (confidence present and valid) >= 0.85 (default target)
    expect(result.bestPrompt).toBe('Base prompt');
    expect(result.history).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// OptimizedClient
// ---------------------------------------------------------------------------

describe('OptimizedClient', () => {
  it('injects system prompt for matching intent', async () => {
    const inner = createMockClient({ explanation: 'result' });
    const prompts = new Map<AiIntent, string>([
      [AiIntent.EXPLAIN, 'Optimized explain prompt'],
    ]);

    const client = new OptimizedClient(inner, prompts);
    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(inner.runIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      { systemPrompt: 'Optimized explain prompt' }
    );
  });

  it('passes through if no optimized prompt for intent', async () => {
    const inner = createMockClient({ explanation: 'result' });
    const prompts = new Map<AiIntent, string>([
      [AiIntent.EXPLAIN, 'Optimized explain prompt'],
    ]);

    const client = new OptimizedClient(inner, prompts);
    await client.runIntent(AiIntent.SUMMARIZE, sampleContext);

    expect(inner.runIntent).toHaveBeenCalledWith(
      AiIntent.SUMMARIZE,
      sampleContext,
      {}
    );
  });

  it('per-request systemPrompt overrides optimized prompt', async () => {
    const inner = createMockClient({ explanation: 'result' });
    const prompts = new Map<AiIntent, string>([
      [AiIntent.EXPLAIN, 'Optimized explain prompt'],
    ]);

    const client = new OptimizedClient(inner, prompts);
    await client.runIntent(AiIntent.EXPLAIN, sampleContext, {
      systemPrompt: 'Custom override prompt',
    });

    expect(inner.runIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      { systemPrompt: 'Custom override prompt' }
    );
  });

  it('setPrompt/getPrompt/hasPrompt work correctly', () => {
    const inner = createMockClient();
    const client = new OptimizedClient(inner);

    expect(client.hasPrompt(AiIntent.EXPLAIN)).toBe(false);
    expect(client.getPrompt(AiIntent.EXPLAIN)).toBeUndefined();

    client.setPrompt(AiIntent.EXPLAIN, 'New prompt');

    expect(client.hasPrompt(AiIntent.EXPLAIN)).toBe(true);
    expect(client.getPrompt(AiIntent.EXPLAIN)).toBe('New prompt');
  });

  it('constructor accepts Record', async () => {
    const inner = createMockClient({ explanation: 'result' });
    const client = new OptimizedClient(inner, {
      [AiIntent.EXPLAIN]: 'Record-based prompt',
    });

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(inner.runIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      { systemPrompt: 'Record-based prompt' }
    );
  });

  it('constructor with no prompts creates empty map', async () => {
    const inner = createMockClient({ explanation: 'result' });
    const client = new OptimizedClient(inner);

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(inner.runIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      {}
    );
  });

  it('preserves other options when injecting optimized prompt', async () => {
    const inner = createMockClient({ explanation: 'result' });
    const prompts = new Map<AiIntent, string>([
      [AiIntent.EXPLAIN, 'Optimized prompt'],
    ]);

    const client = new OptimizedClient(inner, prompts);
    await client.runIntent(AiIntent.EXPLAIN, sampleContext, {
      model: 'gpt-4',
      temperature: 0.3,
    });

    expect(inner.runIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      { model: 'gpt-4', temperature: 0.3, systemPrompt: 'Optimized prompt' }
    );
  });
});

// ---------------------------------------------------------------------------
// OptimizedClient — streamIntent
// ---------------------------------------------------------------------------

describe('OptimizedClient — streamIntent', () => {
  it('delegates with optimized prompt', async () => {
    async function* mockStream(): AsyncGenerator<Partial<AiResult>> {
      yield { explanation: 'partial' };
    }

    const inner: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'ok' }),
      streamIntent: vi.fn().mockReturnValue(mockStream()),
    };

    const prompts = new Map<AiIntent, string>([
      [AiIntent.EXPLAIN, 'Stream optimized prompt'],
    ]);

    const client = new OptimizedClient(inner, prompts);
    const stream = client.streamIntent(AiIntent.EXPLAIN, sampleContext);

    // Consume the stream to trigger the generator
    const chunks: Partial<AiResult>[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    expect(inner.streamIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      { systemPrompt: 'Stream optimized prompt' }
    );
    expect(chunks).toHaveLength(1);
    expect(chunks[0]!.explanation).toBe('partial');
  });

  it('throws when inner client does not support streaming', async () => {
    const inner: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'ok' }),
    };

    const client = new OptimizedClient(inner);
    const stream = client.streamIntent(AiIntent.EXPLAIN, sampleContext);

    await expect(stream.next()).rejects.toThrow('Inner client does not support streaming');
  });

  it('passes through without optimized prompt for unmatched intent', async () => {
    async function* mockStream(): AsyncGenerator<Partial<AiResult>> {
      yield { explanation: 'data' };
    }

    const inner: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'ok' }),
      streamIntent: vi.fn().mockReturnValue(mockStream()),
    };

    const prompts = new Map<AiIntent, string>([
      [AiIntent.EXPLAIN, 'Only for explain'],
    ]);

    const client = new OptimizedClient(inner, prompts);
    const stream = client.streamIntent(AiIntent.SUMMARIZE, sampleContext);

    for await (const _chunk of stream) {
      // consume
    }

    expect(inner.streamIntent).toHaveBeenCalledWith(
      AiIntent.SUMMARIZE,
      sampleContext,
      {}
    );
  });
});
