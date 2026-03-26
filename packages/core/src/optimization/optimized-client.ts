import type { AiClient } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { AiRequestOptions } from '../client/types.js';

/**
 * Optimized Client
 *
 * Decorator that stores optimized system prompts per intent
 * and injects them automatically into requests.
 */
export class OptimizedClient implements AiClient {
  private promptMap: Map<AiIntent, string>;

  constructor(
    private inner: AiClient,
    optimizedPrompts?: Map<AiIntent, string> | Record<string, string>
  ) {
    if (optimizedPrompts instanceof Map) {
      this.promptMap = new Map(optimizedPrompts);
    } else if (optimizedPrompts) {
      this.promptMap = new Map(Object.entries(optimizedPrompts) as [AiIntent, string][]);
    } else {
      this.promptMap = new Map();
    }
  }

  /** Set an optimized prompt for an intent */
  setPrompt(intent: AiIntent, prompt: string): void {
    this.promptMap.set(intent, prompt);
  }

  /** Get the optimized prompt for an intent */
  getPrompt(intent: AiIntent): string | undefined {
    return this.promptMap.get(intent);
  }

  /** Check if an intent has an optimized prompt */
  hasPrompt(intent: AiIntent): boolean {
    return this.promptMap.has(intent);
  }

  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    // Per-request systemPrompt takes priority over optimized prompt
    const optimizedOptions = { ...options };
    if (!optimizedOptions.systemPrompt && this.promptMap.has(intent)) {
      optimizedOptions.systemPrompt = this.promptMap.get(intent)!;
    }

    return this.inner.runIntent(intent, context, optimizedOptions);
  }

  async *streamIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): AsyncGenerator<Partial<AiResult>> {
    if (!this.inner.streamIntent) {
      throw new Error('Inner client does not support streaming');
    }

    const optimizedOptions = { ...options };
    if (!optimizedOptions.systemPrompt && this.promptMap.has(intent)) {
      optimizedOptions.systemPrompt = this.promptMap.get(intent)!;
    }

    yield* this.inner.streamIntent(intent, context, optimizedOptions);
  }
}
