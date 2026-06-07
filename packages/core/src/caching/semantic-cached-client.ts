import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { SemanticCachedClientConfig, EmbeddingFunction } from './semantic-types.js';
import { SemanticCacheStore } from './semantic-cache-store.js';

/**
 * Semantic Cached Client
 *
 * Two-tier caching decorator:
 * 1. Exact match (fast, synchronous key lookup)
 * 2. Semantic similarity (async, embedding comparison)
 *
 * Consumer provides embedFn for generating embeddings.
 * Results include metadata: fromCache, semantic, similarity.
 */
export class SemanticCachedClient implements AiClient {
  private store: SemanticCacheStore;
  private embedFn: EmbeddingFunction;
  private similarityThreshold: number;

  constructor(
    private inner: AiClient,
    config: SemanticCachedClientConfig,
  ) {
    this.embedFn = config.embedFn;
    this.similarityThreshold = config.similarityThreshold ?? 0.95;
    this.store = new SemanticCacheStore(
      config.maxEntries ?? 100,
      config.ttlMs ?? 300000,
    );
  }

  private buildCacheKey(
    intent: AiIntent,
    context: AiContext,
    options?: AiRequestOptions,
  ): string {
    // Result-affecting options must be part of the exact-match key, else a
    // call with the same data but a different model/prompt collides with a
    // prior result. (Operational options like cache/timeout are excluded.)
    return JSON.stringify({
      intent,
      dataset: context.dataset,
      meta: context.meta,
      options: {
        model: options?.model,
        temperature: options?.temperature,
        maxTokens: options?.maxTokens,
        systemPrompt: options?.systemPrompt,
      },
    });
  }

  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): Promise<AiResult> {
    const key = this.buildCacheKey(intent, context as AiContext, options);

    // Tier 1: Exact match
    const exact = this.store.getExact(key);
    if (exact !== undefined) {
      return {
        ...exact,
        metadata: { ...(exact.metadata ?? {}), fromCache: true, semantic: false },
      };
    }

    // Tier 2: Semantic match
    const queryText = `${intent} ${JSON.stringify(context.dataset)}`;
    const embedding = await this.embedFn(queryText);
    const semantic = this.store.getSemantic(embedding, this.similarityThreshold);
    if (semantic !== undefined) {
      return {
        ...semantic.result,
        metadata: {
          ...(semantic.result.metadata ?? {}),
          fromCache: true,
          semantic: true,
          similarity: semantic.similarity,
        },
      };
    }

    // Cache miss — call inner client
    const result = await this.inner.runIntent(intent, context, options);

    // Store with embedding
    this.store.set(key, result, embedding);

    return result;
  }

  async *streamIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): AsyncGenerator<Partial<AiResult>> {
    // Streaming bypasses cache
    if (!this.inner.streamIntent) {
      throw new Error('Inner client does not support streaming');
    }
    yield* this.inner.streamIntent(intent, context, options);
  }

  /** Get the underlying cache store for inspection */
  get cache(): SemanticCacheStore {
    return this.store;
  }
}
