/**
 * @cognivo/compose-lit — Anthropic raw-text TextCompletion.
 *
 * Wires a real Claude model into `createLlmComposeClient`. The existing tool-use
 * `AnthropicClient` in @cognivo/adapter-anthropic can't be reused (it forces
 * tool-use and returns a fixed AiResult with no text), so this calls the SDK's
 * `messages.create` WITHOUT tools and reads the text block — the raw component-lang
 * the composer needs.
 *
 * The SDK is loaded dynamically so @cognivo/compose-lit has no hard dependency on
 * `@anthropic-ai/sdk`; callers that never touch this function never load it.
 */

import type { TextCompletion } from '@cognivo/compose';

export interface AnthropicCompletionOptions {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  /**
   * Browser use requires opting into direct calls. Set true only for demos /
   * playgrounds where exposing the key to the client is acceptable — never ship
   * a production key this way.
   */
  dangerouslyAllowBrowser?: boolean;
}

/**
 * Build a `TextCompletion` backed by Claude. Strips any accidental markdown
 * fences the model wraps around the component-lang so the parser sees clean DSL.
 */
export function createAnthropicCompletion(options: AnthropicCompletionOptions): TextCompletion {
  const model = options.model ?? 'claude-sonnet-4-20250514';
  const maxTokens = options.maxTokens ?? 2000;
  const temperature = options.temperature ?? 0.2;

  return async ({ system, user }) => {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({
      apiKey: options.apiKey,
      dangerouslyAllowBrowser: options.dangerouslyAllowBrowser ?? false,
    });

    const response = await client.messages.create({
      model,
      max_tokens: maxTokens,
      temperature,
      system,
      messages: [{ role: 'user', content: user }],
    });

    const text = response.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('');

    return stripFences(text);
  };
}

/** Remove ```-fenced wrapping if the model added it despite the prompt. */
function stripFences(text: string): string {
  const trimmed = text.trim();
  const fence = /^```(?:[a-zA-Z-]*)?\n([\s\S]*?)\n```$/.exec(trimmed);
  return fence?.[1] ? fence[1].trim() : trimmed;
}
