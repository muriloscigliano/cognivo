/**
 * AiClient Bridge — Connects @cognivo/gen-ui to @cognivo/core.
 *
 * Wraps any AiClient (OpenAI, Anthropic, etc.) with the generative UI pipeline:
 * 1. Generates system prompt from component library
 * 2. Sends user prompt to LLM via AiClient
 * 3. Parses response with streaming parser
 * 4. Validates token compliance
 * 5. Returns ParseResult ready for rendering
 *
 * Note: This bridge uses generic interfaces to avoid a hard dependency
 * on @cognivo/core. Users pass in their AiClient instance.
 */

import type { Library, PromptOptions, BiasPromptContext } from '../registry.js';
import type { ParseResult, StreamParser } from '../types.js';
import { createParser, createStreamingParser } from '../parser/index.js';
import { validateTokenUsage } from '../validation/token-validator.js';

/**
 * Minimal AiClient interface — matches @cognivo/core's AiClient
 * without importing it (keeps gen-ui dependency-free from core).
 */
export interface GenUiAiClient {
  runIntent<T = unknown>(
    intent: string,
    context: { dataset: T[]; selection?: T[]; meta?: Record<string, unknown> },
    options?: { systemPrompt?: string; [key: string]: unknown },
  ): Promise<{ content: string; [key: string]: unknown }>;

  streamIntent?<T = unknown>(
    intent: string,
    context: { dataset: T[]; selection?: T[]; meta?: Record<string, unknown> },
    options?: { systemPrompt?: string; [key: string]: unknown },
  ): AsyncGenerator<{ content?: string; [key: string]: unknown }>;
}

export interface GenerativeUiClientOptions {
  /** Inject cognitive bias guidance into prompts. */
  biasContext?: BiasPromptContext;
  /** Enable design token governance (default: true). */
  tokenGovernance?: boolean;
  /** Additional prompt options. */
  promptOptions?: Omit<PromptOptions, 'biasContext' | 'tokenGovernance'>;
  /** AI request options (model, temperature, etc.). */
  requestOptions?: Record<string, unknown>;
}

/**
 * GenerativeUiClient — High-level API for generating UI via LLM.
 *
 * @example
 * ```ts
 * import { OpenAiClient } from '@cognivo/adapter-openai';
 * import { createLibrary, defineComponent, GenerativeUiClient } from '@cognivo/gen-ui';
 *
 * const library = createLibrary({ components: [...], root: 'Stack' });
 * const aiClient = new OpenAiClient({ model: 'gpt-4o' });
 * const genUi = new GenerativeUiClient(aiClient, library);
 *
 * // One-shot generation
 * const result = await genUi.generate('Show a dashboard with revenue metrics');
 *
 * // Streaming generation
 * for await (const result of genUi.stream('Show a pricing page')) {
 *   renderer.update(result);
 * }
 * ```
 */
export class GenerativeUiClient {
  private client: GenUiAiClient;
  private library: Library;
  private options: GenerativeUiClientOptions;
  private systemPrompt: string;

  constructor(
    client: GenUiAiClient,
    library: Library,
    options: GenerativeUiClientOptions = {},
  ) {
    this.client = client;
    this.library = library;
    this.options = options;

    // Pre-generate the system prompt
    const promptOpts: PromptOptions = {
      tokenGovernance: options.tokenGovernance ?? true,
      ...options.promptOptions,
    };
    if (options.biasContext) promptOpts.biasContext = options.biasContext;
    this.systemPrompt = library.prompt(promptOpts);
  }

  /**
   * Get the generated system prompt (for inspection/debugging).
   */
  getSystemPrompt(): string {
    return this.systemPrompt;
  }

  /**
   * One-shot UI generation.
   * Sends the prompt to the LLM and parses the complete response.
   */
  async generate(userPrompt: string): Promise<ParseResult> {
    const result = await this.client.runIntent(
      'generate_ui',
      { dataset: [{ prompt: userPrompt }] },
      {
        systemPrompt: this.systemPrompt,
        ...this.options.requestOptions,
      },
    );

    const parser = createParser(this.library.toJSONSchema());
    const parseResult = parser.parse(result.content);

    // Attach token violations
    parseResult.meta.tokenViolations = validateTokenUsage(parseResult.root);

    return parseResult;
  }

  /**
   * Streaming UI generation.
   * Yields ParseResult updates as chunks arrive from the LLM.
   */
  async *stream(userPrompt: string): AsyncGenerator<ParseResult> {
    if (!this.client.streamIntent) {
      // Fallback to one-shot if streaming not available
      yield await this.generate(userPrompt);
      return;
    }

    const streamParser = createStreamingParser(this.library.toJSONSchema());

    const stream = this.client.streamIntent(
      'generate_ui',
      { dataset: [{ prompt: userPrompt }] },
      {
        systemPrompt: this.systemPrompt,
        ...this.options.requestOptions,
      },
    );

    for await (const chunk of stream) {
      if (chunk.content) {
        const result = streamParser.push(chunk.content);
        result.meta.tokenViolations = validateTokenUsage(result.root);
        yield result;
      }
    }
  }
}
