/**
 * ModelRouterClient — Decorator that routes intents to specific models.
 *
 * Implements the Decorator pattern: wraps an inner AiClient and injects
 * model/temperature/maxTokens into the request options based on the intent
 * and dataset size.
 *
 * Usage:
 * ```ts
 * const router = new ModelRouterClient(inner, {
 *   routes: [
 *     { intents: [AiIntent.SUMMARIZE], model: 'gpt-4o-mini' },
 *     { intents: [AiIntent.FORECAST, AiIntent.DETECT_ANOMALY], model: 'gpt-4o' },
 *   ],
 *   defaultModel: 'gpt-4o-mini',
 *   complexityThreshold: 1000,
 *   complexityModel: 'gpt-4o',
 * });
 * ```
 */

import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { ModelRouterConfig, ModelRoute } from './types.js';

export class ModelRouterClient implements AiClient {
  private readonly inner: AiClient;
  private readonly config: ModelRouterConfig;

  constructor(inner: AiClient, config: ModelRouterConfig) {
    this.inner = inner;
    this.config = config;
  }

  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): Promise<AiResult> {
    const resolved = this.resolveOptions(intent, context, options);
    return this.inner.runIntent(intent, context, resolved);
  }

  async *streamIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): AsyncGenerator<Partial<AiResult>> {
    if (!this.inner.streamIntent) {
      throw new Error('Inner client does not support streaming');
    }

    const resolved = this.resolveOptions(intent, context, options);
    yield* this.inner.streamIntent(intent, context, resolved);
  }

  /**
   * Resolve the final request options by matching route, applying complexity
   * upgrades, and merging with per-request overrides.
   *
   * Priority (highest to lowest):
   * 1. Per-request options.model / options.temperature / options.maxTokens
   * 2. Complexity model (if dataset exceeds threshold)
   * 3. Route-specific model/temperature/maxTokens
   * 4. Config defaults
   */
  private resolveOptions<T>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): AiRequestOptions {
    const route: ModelRoute | undefined = this.config.routes.find((r) =>
      r.intents.includes(intent),
    );

    // Start with route or default values
    let model = route?.model ?? this.config.defaultModel;
    let temperature = route?.temperature ?? this.config.defaultTemperature;
    let maxTokens = route?.maxTokens ?? this.config.defaultMaxTokens;

    // Complexity upgrade: if dataset is large, use the complexity model
    if (
      this.config.complexityThreshold != null &&
      this.config.complexityModel != null &&
      context.dataset.length > this.config.complexityThreshold
    ) {
      model = this.config.complexityModel;
    }

    // Per-request options take highest precedence
    if (options?.model != null) {
      model = options.model;
    }
    if (options?.temperature != null) {
      temperature = options.temperature;
    }
    if (options?.maxTokens != null) {
      maxTokens = options.maxTokens;
    }

    return {
      ...options,
      model,
      ...(temperature != null ? { temperature } : {}),
      ...(maxTokens != null ? { maxTokens } : {}),
    };
  }
}
