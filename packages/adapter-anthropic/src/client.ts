import Anthropic from '@anthropic-ai/sdk';
import {
  BaseAiClient,
  type AiIntent,
  type AiContext,
  type AiResult,
  type AiRequestOptions,
} from '@cognivo/core';
import { tools } from './schemas.js';
import { buildPrompt, SYSTEM_PROMPT } from './prompts.js';
import { AnthropicPromptCacheManager } from './prompt-cache.js';

/**
 * Anthropic Client Configuration
 */
export interface AnthropicClientConfig {
  /** Anthropic API key */
  apiKey: string;

  /** Default model to use (default: 'claude-sonnet-4-20250514') */
  defaultModel?: string;

  /** Default temperature */
  defaultTemperature?: number;

  /** Default max tokens */
  defaultMaxTokens?: number;

  /** Enable prompt caching via cache_control breakpoints */
  enablePromptCache?: boolean;
}

/**
 * Anthropic Adapter for Cognivo
 *
 * Implements the AiClient interface for Anthropic's Messages API.
 * Uses tool_use for structured outputs.
 *
 * @example
 * ```typescript
 * const client = new AnthropicClient({
 *   apiKey: process.env.ANTHROPIC_API_KEY,
 *   defaultModel: 'claude-sonnet-4-20250514',
 * });
 *
 * const result = await client.runIntent(AiIntent.EXPLAIN, {
 *   dataset: [{ month: 'Jan', spending: 1200 }],
 *   meta: { unit: 'USD' },
 * });
 * ```
 */
export class AnthropicClient extends BaseAiClient {
  private client: Anthropic;
  private config: Required<Omit<AnthropicClientConfig, 'apiKey' | 'enablePromptCache'>>;
  private cacheManager?: AnthropicPromptCacheManager;

  constructor(config: AnthropicClientConfig) {
    super();

    this.client = new Anthropic({ apiKey: config.apiKey });

    this.config = {
      defaultModel: config.defaultModel || 'claude-sonnet-4-20250514',
      defaultTemperature: config.defaultTemperature ?? 0.3,
      defaultMaxTokens: config.defaultMaxTokens ?? 2000,
    };

    if (config.enablePromptCache) {
      this.cacheManager = new AnthropicPromptCacheManager({
        systemPrompt: SYSTEM_PROMPT,
        enableCaching: true,
      });
    }
  }

  /**
   * Execute an AI intent via Anthropic's Messages API with tool_use
   */
  protected async executeIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    const userPrompt = buildPrompt(intent, context);

    const tool = tools[intent];
    if (!tool) {
      throw new Error(`No tool defined for intent: ${intent}`);
    }

    const systemContent = options?.systemPrompt || SYSTEM_PROMPT;

    try {
      const response = await this.client.messages.create({
        model: options?.model || this.config.defaultModel,
        max_tokens: options?.maxTokens ?? this.config.defaultMaxTokens,
        system: systemContent,
        messages: [{ role: 'user', content: userPrompt }],
        tools: [{
          name: tool.name,
          description: tool.description,
          input_schema: tool.input_schema as Anthropic.Messages.Tool.InputSchema,
        }],
        tool_choice: { type: 'tool', name: tool.name },
      });

      // Extract tool_use block from response
      const toolUse = response.content.find(
        (block): block is Anthropic.Messages.ToolUseBlock => block.type === 'tool_use'
      );

      if (!toolUse) {
        throw new Error('No tool_use block in Anthropic response');
      }

      return toolUse.input as AiResult;
    } catch (error) {
      if (error instanceof Error) {
        // Don't double-wrap our own errors
        if (error.message.startsWith('No tool_use block')) {
          throw error;
        }
        throw new Error(`Anthropic API error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Stream an AI intent via Anthropic's Messages API
   */
  async *streamIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): AsyncGenerator<Partial<AiResult>> {
    const userPrompt = buildPrompt(intent, context);

    const tool = tools[intent];
    if (!tool) {
      throw new Error(`No tool defined for intent: ${intent}`);
    }

    const systemContent = options?.systemPrompt || SYSTEM_PROMPT;

    const stream = this.client.messages.stream({
      model: options?.model || this.config.defaultModel,
      max_tokens: options?.maxTokens ?? this.config.defaultMaxTokens,
      system: systemContent,
      messages: [{ role: 'user', content: userPrompt }],
      tools: [{
        name: tool.name,
        description: tool.description,
        input_schema: tool.input_schema as Anthropic.Messages.Tool.InputSchema,
      }],
      tool_choice: { type: 'tool', name: tool.name },
    });

    let buffer = '';

    for await (const event of stream) {
      if (event.type === 'content_block_delta') {
        const delta = event.delta;
        if ('partial_json' in delta) {
          buffer += (delta as { partial_json: string }).partial_json;
          try {
            const partial = JSON.parse(buffer);
            yield partial as Partial<AiResult>;
          } catch {
            // Not yet valid JSON, keep buffering
            continue;
          }
        }
      }
    }

    // Final parse
    if (buffer) {
      try {
        yield JSON.parse(buffer) as AiResult;
      } catch {
        // Ignore parse errors on final attempt
      }
    }
  }
}
