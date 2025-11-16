import OpenAI from 'openai';
import {
  BaseAiClient,
  type AiIntent,
  type AiContext,
  type AiResult,
  type AiRequestOptions,
} from '@cognivo/core';
import { schemas } from './schemas.js';
import { buildPrompt, SYSTEM_PROMPT } from './prompts.js';

/**
 * OpenAI Client Configuration
 */
export interface OpenAiClientConfig {
  /** OpenAI API key */
  apiKey: string;

  /** Default model to use */
  defaultModel?: string;

  /** Default temperature */
  defaultTemperature?: number;

  /** Default max tokens */
  defaultMaxTokens?: number;

  /** Organization ID (optional) */
  organization?: string;
}

/**
 * OpenAI Adapter for Cognivo
 *
 * Implements the AiClient interface for OpenAI's API.
 * Supports structured outputs via JSON schema.
 *
 * @example
 * ```typescript
 * const client = new OpenAiClient({
 *   apiKey: process.env.OPENAI_API_KEY,
 *   defaultModel: 'gpt-4o-mini',
 * });
 *
 * const result = await client.runIntent(AiIntent.EXPLAIN, {
 *   dataset: [{ month: 'Jan', spending: 1200 }],
 *   meta: { unit: 'USD' },
 * });
 * ```
 */
export class OpenAiClient extends BaseAiClient {
  private client: OpenAI;
  private config: Required<Omit<OpenAiClientConfig, 'apiKey' | 'organization'>>;

  constructor(config: OpenAiClientConfig) {
    super();

    this.client = new OpenAI({
      apiKey: config.apiKey,
      organization: config.organization,
    });

    this.config = {
      defaultModel: config.defaultModel || 'gpt-4o-mini',
      defaultTemperature: config.defaultTemperature ?? 0.3,
      defaultMaxTokens: config.defaultMaxTokens ?? 2000,
    };
  }

  /**
   * Execute an AI intent
   */
  protected async executeIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    // Build the prompt
    const userPrompt = buildPrompt(intent, context);

    // Get the schema for this intent
    const schema = schemas[intent];
    if (!schema) {
      throw new Error(`No schema defined for intent: ${intent}`);
    }

    // Prepare system prompt
    const systemPrompt = options?.systemPrompt || SYSTEM_PROMPT;

    try {
      // Call OpenAI with structured outputs
      const response = await this.client.chat.completions.create({
        model: options?.model || this.config.defaultModel,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: `${intent}_result`,
            strict: true,
            schema,
          },
        },
        temperature: options?.temperature ?? this.config.defaultTemperature,
        max_tokens: options?.maxTokens ?? this.config.defaultMaxTokens,
      });

      // Extract and parse the result
      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content in OpenAI response');
      }

      const result = JSON.parse(content) as AiResult;

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI API error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Stream an AI intent (for long operations)
   */
  async *streamIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): AsyncGenerator<Partial<AiResult>> {
    const userPrompt = buildPrompt(intent, context);
    const schema = schemas[intent];

    if (!schema) {
      throw new Error(`No schema defined for intent: ${intent}`);
    }

    const systemPrompt = options?.systemPrompt || SYSTEM_PROMPT;

    const stream = await this.client.chat.completions.create({
      model: options?.model || this.config.defaultModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      stream: true,
      temperature: options?.temperature ?? this.config.defaultTemperature,
      max_tokens: options?.maxTokens ?? this.config.defaultMaxTokens,
    });

    let buffer = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      buffer += content;

      // Try to parse partial JSON
      try {
        const partial = JSON.parse(buffer);
        yield partial as Partial<AiResult>;
      } catch {
        // Not yet valid JSON, keep buffering
        continue;
      }
    }

    // Final parse
    if (buffer) {
      try {
        const final = JSON.parse(buffer);
        yield final as AiResult;
      } catch (error) {
        console.error('Failed to parse final stream result:', error);
      }
    }
  }
}
