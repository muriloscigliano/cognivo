/**
 * SelfRefineClient — Decorator that wraps an AiClient with a
 * generate → critique → refine loop.
 *
 * Implements the Self-Refine pattern (Madaan et al. 2023):
 * 1. Generate: run the intent normally to produce an initial result
 * 2. Critique: ask the LLM to evaluate the initial result
 * 3. Refine: ask the LLM to improve the result based on the critique
 * 4. Repeat until stopWhen returns true or maxIterations is reached
 *
 * Usage:
 *   const inner = new OpenAiAdapter({ apiKey: '...' });
 *   const refined = new SelfRefineClient(inner, { maxIterations: 3 });
 *   const result = await refined.runIntent(intent, context);
 *   // result.metadata.refinementTrace contains the full trace
 */

import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type {
  SelfRefineConfig,
  RefinementStep,
  RefinementTrace,
} from './types.js';

/** Default system prompt for the critique step */
const DEFAULT_CRITIQUE_PROMPT =
  'You are a critic reviewing an AI analysis. Evaluate the previous result for accuracy, completeness, and actionable insights. Identify weaknesses and suggest improvements. Return your critique as an explanation with specific improvement suggestions as bullets.';

/** Default system prompt for the refine step */
const DEFAULT_REFINE_PROMPT =
  'You are refining an AI analysis based on critique feedback. Improve the original result by addressing the critique. Return the improved analysis.';

/** Default confidence threshold — stop when confidence >= 0.9 */
const DEFAULT_STOP_WHEN = (result: AiResult): boolean =>
  (result.confidence ?? 0) >= 0.9;

/** Default maximum number of generate→critique→refine iterations */
const DEFAULT_MAX_ITERATIONS = 2;

/**
 * SelfRefineClient — Wraps any AiClient with iterative refinement.
 *
 * Implements the AiClient interface so it can be used as a drop-in replacement.
 * The decorator pattern means existing code doesn't need to change — just wrap
 * the client and refinement applies transparently.
 */
export class SelfRefineClient implements AiClient {
  private readonly inner: AiClient;
  private readonly maxIterations: number;
  private readonly stopWhen: (result: AiResult, iteration: number) => boolean;
  private readonly critiqueSystemPrompt: string;
  private readonly refineSystemPrompt: string;

  constructor(inner: AiClient, config?: SelfRefineConfig) {
    this.inner = inner;
    this.maxIterations = config?.maxIterations ?? DEFAULT_MAX_ITERATIONS;
    this.stopWhen = config?.stopWhen ?? DEFAULT_STOP_WHEN;
    this.critiqueSystemPrompt =
      config?.critiqueSystemPrompt ?? DEFAULT_CRITIQUE_PROMPT;
    this.refineSystemPrompt =
      config?.refineSystemPrompt ?? DEFAULT_REFINE_PROMPT;
  }

  /**
   * Run an AI intent with iterative self-refinement.
   *
   * 1. Generate initial result via inner client
   * 2. If stopWhen is satisfied, return immediately (no refinement needed)
   * 3. Otherwise, iterate: critique → refine → check stopWhen
   * 4. Attach the full RefinementTrace to the final result's metadata
   */
  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    const steps: RefinementStep[] = [];

    // --- Step 1: Generate initial result ---
    const initialResult = await this.inner.runIntent(intent, context, options);
    steps.push({ iteration: 0, phase: 'generate', result: initialResult });

    // Check if initial result already meets the quality bar
    if (this.stopWhen(initialResult, 0)) {
      const trace: RefinementTrace = {
        steps,
        totalIterations: 0,
        stoppedEarly: true,
      };
      return this.attachTrace(initialResult, trace);
    }

    // --- Step 2–N: Critique → Refine loop ---
    let currentResult = initialResult;

    for (let iteration = 1; iteration <= this.maxIterations; iteration++) {
      // --- Critique ---
      const critiqueContext: AiContext<T> = {
        ...context,
        meta: {
          ...context.meta,
          previousResult: JSON.stringify(currentResult),
        },
      };
      const critiqueOptions: AiRequestOptions = {
        ...options,
        systemPrompt: this.critiqueSystemPrompt,
      };
      const critiqueResult = await this.inner.runIntent(
        intent,
        critiqueContext,
        critiqueOptions
      );
      steps.push({ iteration, phase: 'critique', result: critiqueResult });

      // --- Refine ---
      const refineContext: AiContext<T> = {
        ...context,
        meta: {
          ...context.meta,
          previousResult: JSON.stringify(currentResult),
          critique: critiqueResult.explanation,
        },
      };
      const refineOptions: AiRequestOptions = {
        ...options,
        systemPrompt: this.refineSystemPrompt,
      };
      const refinedResult = await this.inner.runIntent(
        intent,
        refineContext,
        refineOptions
      );
      steps.push({ iteration, phase: 'refine', result: refinedResult });

      currentResult = refinedResult;

      // --- Check stop condition ---
      if (this.stopWhen(currentResult, iteration)) {
        const trace: RefinementTrace = {
          steps,
          totalIterations: iteration,
          stoppedEarly: iteration < this.maxIterations,
        };
        return this.attachTrace(currentResult, trace);
      }
    }

    // Max iterations reached without stopWhen returning true
    const trace: RefinementTrace = {
      steps,
      totalIterations: this.maxIterations,
      stoppedEarly: false,
    };
    return this.attachTrace(currentResult, trace);
  }

  /**
   * Stream an AI intent.
   *
   * Delegates directly to the inner client's streamIntent.
   * Self-refinement is not applied to streaming — streaming responses
   * are partial and the iterative loop requires complete results.
   */
  streamIntent?<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): AsyncGenerator<Partial<AiResult>> {
    if (!this.inner.streamIntent) {
      throw new Error('Inner client does not support streaming');
    }
    return this.inner.streamIntent(intent, context, options);
  }

  /**
   * Attach the refinement trace to a result's metadata.
   */
  private attachTrace(result: AiResult, trace: RefinementTrace): AiResult {
    return {
      ...result,
      metadata: {
        ...result.metadata,
        refinementTrace: trace,
      },
    };
  }
}
