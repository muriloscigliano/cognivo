import type { AiClient, AiRequestOptions } from './types';
import type { AiIntent } from '../intents/types';
import type { AiContext } from '../context/types';
import type { AiResult } from '../results/types';
import { isAiIntent } from '../intents/types';

/**
 * Base AI Client
 *
 * Provides common validation and structure.
 * Adapters extend this class.
 */
export abstract class BaseAiClient implements AiClient {
  /**
   * Run an AI intent (public interface)
   */
  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    // Validate intent
    if (!isAiIntent(intent)) {
      throw new Error(`Invalid intent: ${intent}`);
    }

    // Validate context
    if (!context.dataset || !Array.isArray(context.dataset)) {
      throw new Error('Context must include a dataset array');
    }

    if (context.dataset.length === 0) {
      throw new Error('Dataset cannot be empty');
    }

    // Call implementation
    return this.executeIntent(intent, context, options);
  }

  /**
   * Execute the intent (implementation in adapters)
   *
   * @protected - Only adapters should call this
   */
  protected abstract executeIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult>;
}
