/**
 * ExtendedThinkingClient — Decorator that adds chain-of-thought reasoning.
 *
 * For complex intents (configurable), runs a two-phase process:
 *   Phase 1 (Think): Ask the model to reason step-by-step about the task.
 *   Phase 2 (Execute): Run the original intent with the reasoning injected
 *     into the context so the model can leverage its own chain of thought.
 *
 * Intents not in the enabled list pass straight through to the inner client.
 */

import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import { AiIntent } from '../intents/types.js';
import type { ExtendedThinkingConfig } from './types.js';

/** Default system prompt used for the thinking phase. */
const DEFAULT_THINKING_PROMPT =
  'Think step-by-step about this data analysis task. Break down the problem, identify key factors, and reason through your approach before providing a final analysis. Focus on methodology and reasoning.';

/** Intents that benefit most from chain-of-thought reasoning by default. */
const DEFAULT_ENABLED_INTENTS: AiIntent[] = [
  AiIntent.FORECAST,
  AiIntent.DETECT_ANOMALY,
  AiIntent.OPTIMIZE,
];

export class ExtendedThinkingClient implements AiClient {
  private readonly inner: AiClient;
  private readonly enabledIntents: AiIntent[];
  private readonly thinkingSystemPrompt: string;
  private readonly includeThinkingInResult: boolean;

  constructor(inner: AiClient, config?: ExtendedThinkingConfig) {
    this.inner = inner;
    this.enabledIntents = config?.enabledIntents ?? DEFAULT_ENABLED_INTENTS;
    this.thinkingSystemPrompt =
      config?.thinkingSystemPrompt ?? DEFAULT_THINKING_PROMPT;
    this.includeThinkingInResult = config?.includeThinkingInResult ?? true;
  }

  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): Promise<AiResult> {
    // If the intent is not in the enabled list, pass through directly.
    if (!this.enabledIntents.includes(intent)) {
      return this.inner.runIntent(intent, context, options);
    }

    // --- Phase 1: Think ---------------------------------------------------
    const thinkingOptions: AiRequestOptions = {
      ...options,
      systemPrompt: this.thinkingSystemPrompt,
    };

    const thinkingResult = await this.inner.runIntent(
      AiIntent.EXPLAIN,
      context,
      thinkingOptions,
    );

    // --- Phase 2: Execute with chain-of-thought ---------------------------
    const enrichedContext: AiContext<T> = {
      ...context,
      meta: {
        ...context.meta,
        chainOfThought: thinkingResult.explanation,
      },
    };

    const finalResult = await this.inner.runIntent(
      intent,
      enrichedContext,
      options,
    );

    // Attach thinking artifacts to metadata when configured.
    if (this.includeThinkingInResult) {
      finalResult.metadata = {
        ...finalResult.metadata,
        thinking: thinkingResult.explanation,
        thinkingBullets: thinkingResult.bullets,
      };
    }

    return finalResult;
  }

  /**
   * Stream delegates directly to the inner client without a thinking step.
   *
   * Extended thinking is inherently a two-call process that doesn't map well
   * to streaming, so we pass through to the inner client unchanged.
   */
  async *streamIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): AsyncGenerator<Partial<AiResult>> {
    if (!this.inner.streamIntent) {
      throw new Error('Inner client does not support streaming');
    }
    yield* this.inner.streamIntent(intent, context, options);
  }
}
