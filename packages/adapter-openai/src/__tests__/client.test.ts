import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiIntent } from '@cognivo/core';
import type { AiContext } from '@cognivo/core';

// Mock OpenAI before importing client
const mockCreate = vi.fn();

vi.mock('openai', () => {
  const MockOpenAI = vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  }));
  return { default: MockOpenAI };
});

import OpenAI from 'openai';
import { OpenAiClient } from '../client.js';

describe('OpenAiClient', () => {
  const defaultConfig = {
    apiKey: 'test-api-key',
  };

  const validContext: AiContext = {
    dataset: [
      { month: 'Jan', spending: 1200 },
      { month: 'Feb', spending: 1400 },
    ],
    meta: { unit: 'USD', timeframe: 'monthly' },
  };

  const mockExplainResult = {
    explanation: 'Spending increased by 16.7% from January to February.',
    bullets: ['Spending rose from $1,200 to $1,400', 'Consistent upward trend'],
    confidence: 0.85,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Constructor ───────────────────────────────────────────────────

  describe('constructor', () => {
    it('creates client with the provided API key', () => {
      new OpenAiClient({ apiKey: 'my-key' });

      expect(OpenAI).toHaveBeenCalledWith({
        apiKey: 'my-key',
        organization: undefined,
      });
    });

    it('passes organization to the OpenAI constructor', () => {
      new OpenAiClient({ apiKey: 'my-key', organization: 'org-123' });

      expect(OpenAI).toHaveBeenCalledWith({
        apiKey: 'my-key',
        organization: 'org-123',
      });
    });

    it('uses default values for optional fields', () => {
      const client = new OpenAiClient({ apiKey: 'my-key' });

      // Verify defaults are applied by making a request and checking what
      // gets passed to create(). We do this in the runIntent tests below,
      // but we can also verify the client was instantiated without error.
      expect(client).toBeInstanceOf(OpenAiClient);
    });
  });

  // ─── runIntent success ─────────────────────────────────────────────

  describe('runIntent success', () => {
    it('returns parsed result for a valid EXPLAIN intent', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [
          {
            message: {
              content: JSON.stringify(mockExplainResult),
            },
          },
        ],
      });

      const client = new OpenAiClient(defaultConfig);
      const result = await client.runIntent(AiIntent.EXPLAIN, validContext);

      expect(result).toEqual(mockExplainResult);
    });

    it('passes correct messages and schema to OpenAI', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [
          {
            message: {
              content: JSON.stringify(mockExplainResult),
            },
          },
        ],
      });

      const client = new OpenAiClient(defaultConfig);
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      expect(mockCreate).toHaveBeenCalledOnce();
      const callArgs = mockCreate.mock.calls[0][0];

      // Should have system and user messages
      expect(callArgs.messages).toHaveLength(2);
      expect(callArgs.messages[0].role).toBe('system');
      expect(callArgs.messages[1].role).toBe('user');

      // Should include response_format with json_schema
      expect(callArgs.response_format.type).toBe('json_schema');
      expect(callArgs.response_format.json_schema.name).toBe('explain_result');
      expect(callArgs.response_format.json_schema.strict).toBe(true);
    });
  });

  // ─── runIntent with custom options ─────────────────────────────────

  describe('runIntent with custom options', () => {
    it('uses default model, temperature, and maxTokens when no options are provided', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(mockExplainResult) } }],
      });

      const client = new OpenAiClient(defaultConfig);
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.model).toBe('gpt-4o-mini');
      expect(callArgs.temperature).toBe(0.3);
      expect(callArgs.max_tokens).toBe(2000);
    });

    it('uses custom defaults from config', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(mockExplainResult) } }],
      });

      const client = new OpenAiClient({
        apiKey: 'test-key',
        defaultModel: 'gpt-4o',
        defaultTemperature: 0.7,
        defaultMaxTokens: 4000,
      });
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.model).toBe('gpt-4o');
      expect(callArgs.temperature).toBe(0.7);
      expect(callArgs.max_tokens).toBe(4000);
    });

    it('overrides config defaults with per-request options', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(mockExplainResult) } }],
      });

      const client = new OpenAiClient({
        apiKey: 'test-key',
        defaultModel: 'gpt-4o-mini',
        defaultTemperature: 0.3,
        defaultMaxTokens: 2000,
      });
      await client.runIntent(AiIntent.EXPLAIN, validContext, {
        model: 'gpt-4-turbo',
        temperature: 0.9,
        maxTokens: 8000,
      });

      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.model).toBe('gpt-4-turbo');
      expect(callArgs.temperature).toBe(0.9);
      expect(callArgs.max_tokens).toBe(8000);
    });

    it('passes custom systemPrompt when provided', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(mockExplainResult) } }],
      });

      const client = new OpenAiClient(defaultConfig);
      await client.runIntent(AiIntent.EXPLAIN, validContext, {
        systemPrompt: 'You are a custom assistant.',
      });

      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.messages[0].content).toBe('You are a custom assistant.');
    });
  });

  // ─── runIntent error handling ──────────────────────────────────────

  describe('runIntent error handling', () => {
    it('wraps OpenAI API errors with "OpenAI API error:" prefix', async () => {
      mockCreate.mockRejectedValueOnce(new Error('Rate limit exceeded'));

      const client = new OpenAiClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, validContext)
      ).rejects.toThrow('OpenAI API error: Rate limit exceeded');
    });

    it('re-throws non-Error objects as-is', async () => {
      mockCreate.mockRejectedValueOnce('string error');

      const client = new OpenAiClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, validContext)
      ).rejects.toBe('string error');
    });
  });

  // ─── runIntent with no content ─────────────────────────────────────

  describe('runIntent with no content', () => {
    it('throws when choices[0].message.content is null', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: null } }],
      });

      const client = new OpenAiClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, validContext)
      ).rejects.toThrow('OpenAI API error: No content in OpenAI response');
    });

    it('throws when choices array is empty', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [],
      });

      const client = new OpenAiClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, validContext)
      ).rejects.toThrow('OpenAI API error: No content in OpenAI response');
    });
  });

  // ─── runIntent validates intent ────────────────────────────────────

  describe('runIntent validates intent', () => {
    it('throws for an invalid intent string', async () => {
      const client = new OpenAiClient(defaultConfig);

      await expect(
        client.runIntent('not_a_real_intent' as AiIntent, validContext)
      ).rejects.toThrow('Invalid intent: not_a_real_intent');
    });

    it('does not call OpenAI API when intent is invalid', async () => {
      const client = new OpenAiClient(defaultConfig);

      try {
        await client.runIntent('bogus' as AiIntent, validContext);
      } catch {
        // expected
      }

      expect(mockCreate).not.toHaveBeenCalled();
    });
  });

  // ─── runIntent validates empty dataset ─────────────────────────────

  describe('runIntent validates empty dataset', () => {
    it('throws when dataset is an empty array', async () => {
      const client = new OpenAiClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, { dataset: [] })
      ).rejects.toThrow('Dataset cannot be empty');
    });

    it('throws when dataset is missing', async () => {
      const client = new OpenAiClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, {} as AiContext)
      ).rejects.toThrow('Context must include a dataset array');
    });

    it('does not call OpenAI API when dataset is invalid', async () => {
      const client = new OpenAiClient(defaultConfig);

      try {
        await client.runIntent(AiIntent.EXPLAIN, { dataset: [] });
      } catch {
        // expected
      }

      expect(mockCreate).not.toHaveBeenCalled();
    });
  });

  // ─── streamIntent ─────────────────────────────────────────────────

  describe('streamIntent', () => {
    it('yields parsed chunks from the streaming response', async () => {
      const mockStream = {
        [Symbol.asyncIterator]: async function* () {
          yield { choices: [{ delta: { content: '{"explanation":"test",' } }] };
          yield { choices: [{ delta: { content: '"confidence":0.9}' } }] };
        },
      };

      mockCreate.mockResolvedValueOnce(mockStream);

      const client = new OpenAiClient(defaultConfig);
      const chunks: Partial<Record<string, unknown>>[] = [];

      for await (const chunk of client.streamIntent(AiIntent.EXPLAIN, validContext)) {
        chunks.push(chunk);
      }

      // The first chunk is not valid JSON on its own, so it should be skipped.
      // After the second chunk the buffer is valid JSON, so we get one yield
      // from the for-await loop and then the final parse yields the same result again.
      expect(chunks.length).toBeGreaterThanOrEqual(1);

      // The last chunk should contain the fully parsed result
      const lastChunk = chunks[chunks.length - 1];
      expect(lastChunk).toEqual({ explanation: 'test', confidence: 0.9 });
    });

    it('passes stream: true to OpenAI', async () => {
      const mockStream = {
        [Symbol.asyncIterator]: async function* () {
          yield { choices: [{ delta: { content: '{}' } }] };
        },
      };

      mockCreate.mockResolvedValueOnce(mockStream);

      const client = new OpenAiClient(defaultConfig);

      // Consume the generator
      for await (const _ of client.streamIntent(AiIntent.EXPLAIN, validContext)) {
        // drain
      }

      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.stream).toBe(true);
    });

    it('includes the json_schema response_format in the streaming request', async () => {
      const mockStream = {
        [Symbol.asyncIterator]: async function* () {
          yield { choices: [{ delta: { content: '{}' } }] };
        },
      };

      mockCreate.mockResolvedValueOnce(mockStream);

      const client = new OpenAiClient(defaultConfig);

      for await (const _ of client.streamIntent(AiIntent.EXPLAIN, validContext)) {
        // drain
      }

      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.response_format.type).toBe('json_schema');
      expect(callArgs.response_format.json_schema.name).toBe('explain_result');
      expect(callArgs.response_format.json_schema.strict).toBe(true);
      expect(callArgs.response_format.json_schema.schema).toBeDefined();
    });

    it('sends the same response_format as the non-streaming path', async () => {
      // Non-streaming call
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(mockExplainResult) } }],
      });

      const client = new OpenAiClient(defaultConfig);
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      // Streaming call
      const mockStream = {
        [Symbol.asyncIterator]: async function* () {
          yield { choices: [{ delta: { content: '{}' } }] };
        },
      };
      mockCreate.mockResolvedValueOnce(mockStream);

      for await (const _ of client.streamIntent(AiIntent.EXPLAIN, validContext)) {
        // drain
      }

      const nonStreamingArgs = mockCreate.mock.calls[0][0];
      const streamingArgs = mockCreate.mock.calls[1][0];

      expect(streamingArgs.response_format).toEqual(
        nonStreamingArgs.response_format
      );
    });

    it('throws for an invalid intent', async () => {
      const client = new OpenAiClient(defaultConfig);

      const generator = client.streamIntent(
        'nonexistent_intent' as AiIntent,
        validContext
      );

      await expect(generator.next()).rejects.toThrow('nonexistent_intent');
    });

    it('applies custom options to the streaming request', async () => {
      const mockStream = {
        [Symbol.asyncIterator]: async function* () {
          yield { choices: [{ delta: { content: '{}' } }] };
        },
      };

      mockCreate.mockResolvedValueOnce(mockStream);

      const client = new OpenAiClient(defaultConfig);

      for await (const _ of client.streamIntent(AiIntent.EXPLAIN, validContext, {
        model: 'gpt-4-turbo',
        temperature: 0.5,
        maxTokens: 3000,
      })) {
        // drain
      }

      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.model).toBe('gpt-4-turbo');
      expect(callArgs.temperature).toBe(0.5);
      expect(callArgs.max_tokens).toBe(3000);
    });
  });
});
