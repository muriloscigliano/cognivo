/**
 * CachedClient — Decorator that adds result caching to any AiClient.
 *
 * Implements the Decorator pattern: wraps an inner AiClient and caches
 * results keyed by intent + context data. Cache hits are returned immediately
 * without calling the inner client.
 *
 * Usage:
 * ```ts
 * const cached = new CachedClient(inner, {
 *   ttl: 60_000,
 *   maxEntries: 50,
 *   cacheableIntents: [AiIntent.SUMMARIZE, AiIntent.EXPLAIN],
 * });
 * ```
 */

import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { CachedClientConfig, CacheStore } from './types.js';
import { InMemoryLruCache } from './cache-store.js';

/** Default TTL: 5 minutes */
const DEFAULT_TTL = 300_000;

/** Default max cache entries */
const DEFAULT_MAX_ENTRIES = 100;

export class CachedClient implements AiClient {
  private readonly inner: AiClient;
  private readonly store: CacheStore;
  private readonly ttl: number;
  private readonly cacheableIntents: AiIntent[] | undefined;

  constructor(inner: AiClient, config?: CachedClientConfig) {
    this.inner = inner;
    this.store = config?.store ?? new InMemoryLruCache(config?.maxEntries ?? DEFAULT_MAX_ENTRIES);
    this.ttl = config?.ttl ?? DEFAULT_TTL;
    this.cacheableIntents = config?.cacheableIntents;
  }

  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): Promise<AiResult> {
    // Skip cache when explicitly disabled
    if (options?.cache === false) {
      return this.inner.runIntent(intent, context, options);
    }

    // Skip cache for intents not in the allowed list
    if (this.cacheableIntents && !this.cacheableIntents.includes(intent)) {
      return this.inner.runIntent(intent, context, options);
    }

    const key = this.buildKey(intent, context, options);

    // Check cache for a valid entry
    const entry = this.store.get(key);
    if (entry && (Date.now() - entry.timestamp) < this.ttl) {
      entry.hits += 1;
      return {
        ...entry.result,
        metadata: {
          ...entry.result.metadata,
          fromCache: true,
          cacheHits: entry.hits,
        },
      };
    }

    // Cache miss or expired — call inner client
    const result = await this.inner.runIntent(intent, context, options);

    this.store.set(key, {
      result,
      timestamp: Date.now(),
      hits: 0,
    });

    return result;
  }

  /**
   * Stream an AI intent. Streaming bypasses the cache entirely
   * because partial results cannot be meaningfully cached.
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

  /**
   * Build a deterministic cache key from the intent, context, and the
   * result-affecting request options.
   *
   * The model, temperature, system prompt, and max-token budget all change
   * what the inner client returns, so they MUST be part of the key — without
   * them, two calls over the same dataset but different models/prompts would
   * collide and the second caller would silently get the first's result.
   * Operational options (`cache`, `timeout`) don't affect the result and are
   * deliberately excluded so they don't fragment the cache.
   */
  private buildKey<T>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): string {
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
}
