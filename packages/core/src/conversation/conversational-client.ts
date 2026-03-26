import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { ConversationHistory } from './history.js';

/**
 * ConversationalClient
 *
 * Decorator that wraps any AiClient to inject conversation history
 * into each request and record assistant responses automatically.
 *
 * Usage:
 * ```ts
 * const history = new ConversationHistory();
 * const client  = new ConversationalClient(innerClient, history);
 *
 * history.addUserMessage('Why did revenue drop?', AiIntent.EXPLAIN);
 * const result = await client.runIntent(AiIntent.EXPLAIN, context);
 * // result.explanation is also stored in history
 * ```
 */
export class ConversationalClient implements AiClient {
  private readonly inner: AiClient;
  private readonly history: ConversationHistory;

  /**
   * Optional streaming method — only present when the inner client supports it.
   */
  streamIntent?: <T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ) => AsyncGenerator<Partial<AiResult>>;

  constructor(inner: AiClient, history: ConversationHistory) {
    this.inner = inner;
    this.history = history;

    // Wire up streaming delegation only when the inner client supports it
    if (inner.streamIntent) {
      this.streamIntent = <T = unknown>(
        intent: AiIntent,
        context: AiContext<T>,
        options?: AiRequestOptions,
      ): AsyncGenerator<Partial<AiResult>> => {
        return inner.streamIntent!(intent, context, options);
      };
    }
  }

  /**
   * Run an intent with conversation history injected into context.meta
   */
  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): Promise<AiResult> {
    // Inject conversation history into a shallow copy of context
    const enrichedContext: AiContext<T> = {
      ...context,
      meta: {
        ...context.meta,
        conversationHistory: this.history.toPromptString(),
      },
    };

    const result = await this.inner.runIntent(intent, enrichedContext, options);

    // Record assistant response
    this.history.addAssistantMessage(
      result.explanation ?? '',
      result.metadata,
    );

    return result;
  }
}
