import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiIntent } from '@cognivo/core';
import type { AiContext } from '@cognivo/core';

// Mock Anthropic SDK before importing client
const mockCreate = vi.fn();
const mockStream = vi.fn();

vi.mock('@anthropic-ai/sdk', () => {
  const MockAnthropic = vi.fn().mockImplementation(() => ({
    messages: {
      create: mockCreate,
      stream: mockStream,
    },
  }));
  return { default: MockAnthropic };
});

import Anthropic from '@anthropic-ai/sdk';
import { AnthropicClient } from '../client.js';

describe('AnthropicClient', () => {
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

  // --- Constructor ---

  describe('constructor', () => {
    it('creates client with the provided API key', () => {
      new AnthropicClient({ apiKey: 'my-key' });

      expect(Anthropic).toHaveBeenCalledWith({
        apiKey: 'my-key',
      });
    });

    it('uses default values for optional fields', () => {
      const client = new AnthropicClient({ apiKey: 'my-key' });
      expect(client).toBeInstanceOf(AnthropicClient);
    });

    it('default model is claude-sonnet-4-20250514', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'tool_use',
            id: 'toolu_123',
            name: 'explain_result',
            input: mockExplainResult,
          },
        ],
      });

      const client = new AnthropicClient(defaultConfig);
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      const callArgs = mockCreate.mock.calls[0]![0];
      expect(callArgs.model).toBe('claude-sonnet-4-20250514');
    });
  });

  // --- runIntent success ---

  describe('runIntent success', () => {
    it('returns parsed result from tool_use block', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'tool_use',
            id: 'toolu_123',
            name: 'explain_result',
            input: mockExplainResult,
          },
        ],
      });

      const client = new AnthropicClient(defaultConfig);
      const result = await client.runIntent(AiIntent.EXPLAIN, validContext);

      expect(result).toEqual(mockExplainResult);
    });

    it('passes correct messages and tools to Anthropic', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'tool_use',
            id: 'toolu_123',
            name: 'explain_result',
            input: mockExplainResult,
          },
        ],
      });

      const client = new AnthropicClient(defaultConfig);
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      expect(mockCreate).toHaveBeenCalledOnce();
      const callArgs = mockCreate.mock.calls[0]![0];

      // Should have a user message
      expect(callArgs.messages).toHaveLength(1);
      expect(callArgs.messages[0].role).toBe('user');

      // Should include system prompt
      expect(callArgs.system).toBeDefined();

      // Should include tools array
      expect(callArgs.tools).toHaveLength(1);
      expect(callArgs.tools[0].name).toBe('explain_result');

      // Should use tool_choice to force the specific tool
      expect(callArgs.tool_choice).toEqual({ type: 'tool', name: 'explain_result' });
    });

    it('handles response with text block before tool_use', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          { type: 'text', text: 'Here is my analysis:' },
          {
            type: 'tool_use',
            id: 'toolu_456',
            name: 'explain_result',
            input: mockExplainResult,
          },
        ],
      });

      const client = new AnthropicClient(defaultConfig);
      const result = await client.runIntent(AiIntent.EXPLAIN, validContext);

      expect(result).toEqual(mockExplainResult);
    });
  });

  // --- runIntent with custom options ---

  describe('runIntent with custom options', () => {
    it('uses default model, temperature, and maxTokens when no options are provided', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          { type: 'tool_use', id: 'toolu_123', name: 'explain_result', input: mockExplainResult },
        ],
      });

      const client = new AnthropicClient(defaultConfig);
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      const callArgs = mockCreate.mock.calls[0]![0];
      expect(callArgs.model).toBe('claude-sonnet-4-20250514');
      expect(callArgs.max_tokens).toBe(2000);
    });

    it('uses custom defaults from config', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          { type: 'tool_use', id: 'toolu_123', name: 'explain_result', input: mockExplainResult },
        ],
      });

      const client = new AnthropicClient({
        apiKey: 'test-key',
        defaultModel: 'claude-opus-4-20250514',
        defaultTemperature: 0.7,
        defaultMaxTokens: 4000,
      });
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      const callArgs = mockCreate.mock.calls[0]![0];
      expect(callArgs.model).toBe('claude-opus-4-20250514');
      expect(callArgs.max_tokens).toBe(4000);
    });

    it('overrides config defaults with per-request options', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          { type: 'tool_use', id: 'toolu_123', name: 'explain_result', input: mockExplainResult },
        ],
      });

      const client = new AnthropicClient({
        apiKey: 'test-key',
        defaultModel: 'claude-sonnet-4-20250514',
        defaultMaxTokens: 2000,
      });
      await client.runIntent(AiIntent.EXPLAIN, validContext, {
        model: 'claude-opus-4-20250514',
        maxTokens: 8000,
      });

      const callArgs = mockCreate.mock.calls[0]![0];
      expect(callArgs.model).toBe('claude-opus-4-20250514');
      expect(callArgs.max_tokens).toBe(8000);
    });

    it('passes custom systemPrompt when provided', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          { type: 'tool_use', id: 'toolu_123', name: 'explain_result', input: mockExplainResult },
        ],
      });

      const client = new AnthropicClient(defaultConfig);
      await client.runIntent(AiIntent.EXPLAIN, validContext, {
        systemPrompt: 'You are a custom assistant.',
      });

      const callArgs = mockCreate.mock.calls[0]![0];
      expect(callArgs.system).toBe('You are a custom assistant.');
    });
  });

  // --- prompt caching ---

  describe('prompt caching', () => {
    const mockToolUseResponse = {
      content: [
        { type: 'tool_use', id: 'toolu_123', name: 'explain_result', input: mockExplainResult },
      ],
    };

    it('sets cache_control on the system block when enablePromptCache is true', async () => {
      mockCreate.mockResolvedValueOnce(mockToolUseResponse);

      const client = new AnthropicClient({ apiKey: 'test-key', enablePromptCache: true });
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      const callArgs = mockCreate.mock.calls[0]![0];
      expect(Array.isArray(callArgs.system)).toBe(true);
      expect(callArgs.system).toHaveLength(1);
      expect(callArgs.system[0].type).toBe('text');
      expect(typeof callArgs.system[0].text).toBe('string');
      expect(callArgs.system[0].text.length).toBeGreaterThan(0);
      expect(callArgs.system[0].cache_control).toEqual({ type: 'ephemeral' });
    });

    it('does not set cache_control when enablePromptCache is omitted', async () => {
      mockCreate.mockResolvedValueOnce(mockToolUseResponse);

      const client = new AnthropicClient({ apiKey: 'test-key' });
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      const callArgs = mockCreate.mock.calls[0]![0];
      expect(typeof callArgs.system).toBe('string');
      expect(JSON.stringify(callArgs)).not.toContain('cache_control');
    });

    it('does not set cache_control when enablePromptCache is false', async () => {
      mockCreate.mockResolvedValueOnce(mockToolUseResponse);

      const client = new AnthropicClient({ apiKey: 'test-key', enablePromptCache: false });
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      const callArgs = mockCreate.mock.calls[0]![0];
      expect(typeof callArgs.system).toBe('string');
      expect(JSON.stringify(callArgs)).not.toContain('cache_control');
    });

    it('keeps cache_control on a custom systemPrompt override when caching is enabled', async () => {
      mockCreate.mockResolvedValueOnce(mockToolUseResponse);

      const client = new AnthropicClient({ apiKey: 'test-key', enablePromptCache: true });
      await client.runIntent(AiIntent.EXPLAIN, validContext, {
        systemPrompt: 'You are a custom assistant.',
      });

      const callArgs = mockCreate.mock.calls[0]![0];
      expect(Array.isArray(callArgs.system)).toBe(true);
      expect(callArgs.system[0].text).toBe('You are a custom assistant.');
      expect(callArgs.system[0].cache_control).toEqual({ type: 'ephemeral' });
    });

    it('sends identical system blocks across requests (stable cache prefix)', async () => {
      mockCreate.mockResolvedValue(mockToolUseResponse);

      const client = new AnthropicClient({ apiKey: 'test-key', enablePromptCache: true });
      await client.runIntent(AiIntent.EXPLAIN, validContext);
      await client.runIntent(AiIntent.EXPLAIN, validContext);

      const first = mockCreate.mock.calls[0]![0];
      const second = mockCreate.mock.calls[1]![0];
      expect(JSON.stringify(first.system)).toBe(JSON.stringify(second.system));
    });

    it('sets cache_control on streaming requests when caching is enabled', async () => {
      const mockAsyncIterator = {
        [Symbol.asyncIterator]: async function* () {
          yield {
            type: 'content_block_delta',
            delta: { type: 'input_json_delta', partial_json: '{}' },
          };
        },
      };
      mockStream.mockReturnValueOnce(mockAsyncIterator);

      const client = new AnthropicClient({ apiKey: 'test-key', enablePromptCache: true });
      for await (const _ of client.streamIntent(AiIntent.EXPLAIN, validContext)) {
        // drain
      }

      const callArgs = mockStream.mock.calls[0]![0];
      expect(Array.isArray(callArgs.system)).toBe(true);
      expect(callArgs.system[0].cache_control).toEqual({ type: 'ephemeral' });
    });

    it('does not set cache_control on streaming requests when caching is disabled', async () => {
      const mockAsyncIterator = {
        [Symbol.asyncIterator]: async function* () {
          yield {
            type: 'content_block_delta',
            delta: { type: 'input_json_delta', partial_json: '{}' },
          };
        },
      };
      mockStream.mockReturnValueOnce(mockAsyncIterator);

      const client = new AnthropicClient({ apiKey: 'test-key' });
      for await (const _ of client.streamIntent(AiIntent.EXPLAIN, validContext)) {
        // drain
      }

      const callArgs = mockStream.mock.calls[0]![0];
      expect(typeof callArgs.system).toBe('string');
      expect(JSON.stringify(callArgs)).not.toContain('cache_control');
    });
  });

  // --- runIntent error handling ---

  describe('runIntent error handling', () => {
    it('throws when no tool_use block is present', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          { type: 'text', text: 'I cannot analyze this data.' },
        ],
      });

      const client = new AnthropicClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, validContext)
      ).rejects.toThrow('No tool_use block in Anthropic response');
    });

    it('throws when content array is empty', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [],
      });

      const client = new AnthropicClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, validContext)
      ).rejects.toThrow('No tool_use block in Anthropic response');
    });

    it('wraps Anthropic API errors with "Anthropic API error:" prefix', async () => {
      mockCreate.mockRejectedValueOnce(new Error('Rate limit exceeded'));

      const client = new AnthropicClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, validContext)
      ).rejects.toThrow('Anthropic API error: Rate limit exceeded');
    });

    it('re-throws non-Error objects as-is', async () => {
      mockCreate.mockRejectedValueOnce('string error');

      const client = new AnthropicClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, validContext)
      ).rejects.toBe('string error');
    });
  });

  // --- runIntent validates intent ---

  describe('runIntent validates intent', () => {
    it('throws for an invalid intent string', async () => {
      const client = new AnthropicClient(defaultConfig);

      await expect(
        client.runIntent('not_a_real_intent' as AiIntent, validContext)
      ).rejects.toThrow('Invalid intent: not_a_real_intent');
    });

    it('does not call Anthropic API when intent is invalid', async () => {
      const client = new AnthropicClient(defaultConfig);

      try {
        await client.runIntent('bogus' as AiIntent, validContext);
      } catch {
        // expected
      }

      expect(mockCreate).not.toHaveBeenCalled();
    });
  });

  // --- runIntent validates empty dataset ---

  describe('runIntent validates empty dataset', () => {
    it('throws when dataset is an empty array', async () => {
      const client = new AnthropicClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, { dataset: [] })
      ).rejects.toThrow('Dataset cannot be empty');
    });

    it('throws when dataset is missing', async () => {
      const client = new AnthropicClient(defaultConfig);

      await expect(
        client.runIntent(AiIntent.EXPLAIN, {} as AiContext)
      ).rejects.toThrow('Context must include a dataset array');
    });

    it('does not call Anthropic API when dataset is invalid', async () => {
      const client = new AnthropicClient(defaultConfig);

      try {
        await client.runIntent(AiIntent.EXPLAIN, { dataset: [] });
      } catch {
        // expected
      }

      expect(mockCreate).not.toHaveBeenCalled();
    });
  });

  // --- streamIntent ---

  describe('streamIntent', () => {
    it('yields parsed chunks from the streaming response', async () => {
      const mockAsyncIterator = {
        [Symbol.asyncIterator]: async function* () {
          yield {
            type: 'content_block_delta',
            delta: { type: 'input_json_delta', partial_json: '{"explanation":"test",' },
          };
          yield {
            type: 'content_block_delta',
            delta: { type: 'input_json_delta', partial_json: '"confidence":0.9}' },
          };
        },
      };

      mockStream.mockReturnValueOnce(mockAsyncIterator);

      const client = new AnthropicClient(defaultConfig);
      const chunks: Partial<Record<string, unknown>>[] = [];

      for await (const chunk of client.streamIntent(AiIntent.EXPLAIN, validContext)) {
        chunks.push(chunk);
      }

      expect(chunks.length).toBeGreaterThanOrEqual(1);

      // The last chunk should contain the fully parsed result
      const lastChunk = chunks[chunks.length - 1];
      expect(lastChunk).toEqual({ explanation: 'test', confidence: 0.9 });
    });

    it('calls messages.stream with tool configuration', async () => {
      const mockAsyncIterator = {
        [Symbol.asyncIterator]: async function* () {
          yield {
            type: 'content_block_delta',
            delta: { type: 'input_json_delta', partial_json: '{}' },
          };
        },
      };

      mockStream.mockReturnValueOnce(mockAsyncIterator);

      const client = new AnthropicClient(defaultConfig);

      for await (const _ of client.streamIntent(AiIntent.EXPLAIN, validContext)) {
        // drain
      }

      expect(mockStream).toHaveBeenCalledOnce();
      const callArgs = mockStream.mock.calls[0]![0];
      expect(callArgs.tools).toBeDefined();
      expect(callArgs.tools[0].name).toBe('explain_result');
      expect(callArgs.tool_choice).toEqual({ type: 'tool', name: 'explain_result' });
    });

    it('throws for an invalid intent', async () => {
      const client = new AnthropicClient(defaultConfig);

      const generator = client.streamIntent(
        'nonexistent_intent' as AiIntent,
        validContext
      );

      // BaseAiClient doesn't validate on streamIntent (it's not abstract),
      // but our implementation checks for the tool definition
      await expect(generator.next()).rejects.toThrow('nonexistent_intent');
    });

    it('applies custom options to the streaming request', async () => {
      const mockAsyncIterator = {
        [Symbol.asyncIterator]: async function* () {
          yield {
            type: 'content_block_delta',
            delta: { type: 'input_json_delta', partial_json: '{}' },
          };
        },
      };

      mockStream.mockReturnValueOnce(mockAsyncIterator);

      const client = new AnthropicClient(defaultConfig);

      for await (const _ of client.streamIntent(AiIntent.EXPLAIN, validContext, {
        model: 'claude-opus-4-20250514',
        maxTokens: 3000,
      })) {
        // drain
      }

      const callArgs = mockStream.mock.calls[0]![0];
      expect(callArgs.model).toBe('claude-opus-4-20250514');
      expect(callArgs.max_tokens).toBe(3000);
    });

    it('skips non-content_block_delta events', async () => {
      const mockAsyncIterator = {
        [Symbol.asyncIterator]: async function* () {
          yield { type: 'message_start', message: {} };
          yield {
            type: 'content_block_delta',
            delta: { type: 'input_json_delta', partial_json: '{"explanation":"test","confidence":0.9}' },
          };
          yield { type: 'message_stop' };
        },
      };

      mockStream.mockReturnValueOnce(mockAsyncIterator);

      const client = new AnthropicClient(defaultConfig);
      const chunks: Partial<Record<string, unknown>>[] = [];

      for await (const chunk of client.streamIntent(AiIntent.EXPLAIN, validContext)) {
        chunks.push(chunk);
      }

      expect(chunks.length).toBeGreaterThanOrEqual(1);
      const lastChunk = chunks[chunks.length - 1];
      expect(lastChunk).toEqual({ explanation: 'test', confidence: 0.9 });
    });
  });
});
