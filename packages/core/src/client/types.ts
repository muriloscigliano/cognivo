import type { AiIntent } from '../intents/types';
import type { AiContext } from '../context/types';
import type { AiResult } from '../results/types';

/**
 * Options for AI requests
 */
export interface AiRequestOptions {
  /** Model to use (provider-specific, e.g., 'gpt-4', 'claude-3-opus') */
  model?: string;

  /** Temperature (0-1, lower = more deterministic) */
  temperature?: number;

  /** Maximum tokens to generate */
  maxTokens?: number;

  /** Custom system prompt override */
  systemPrompt?: string;

  /** Enable caching (if supported by provider) */
  cache?: boolean;

  /** Request timeout in milliseconds */
  timeout?: number;

  /** Additional provider-specific options */
  [key: string]: unknown;
}

/**
 * AI Client Interface - LLM-agnostic
 *
 * Every adapter must implement this interface.
 * This is the contract between components and AI providers.
 */
export interface AiClient {
  /**
   * Run an AI intent with given context
   *
   * @param intent - What AI should do
   * @param context - Data and metadata
   * @param options - Optional configuration
   * @returns Structured AI result
   */
  runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult>;

  /**
   * Stream an AI intent (optional, for long operations)
   *
   * @param intent - What AI should do
   * @param context - Data and metadata
   * @param options - Optional configuration
   * @yields Partial results as they arrive
   */
  streamIntent?<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): AsyncGenerator<Partial<AiResult>>;
}
