import { describe, it, expect } from 'vitest';
import { PromptCacheManager } from '../prompt-cache.js';
import type { PromptCacheConfig } from '../prompt-cache.js';

describe('PromptCacheManager', () => {
  const baseSystemPrompt = 'You are a data analysis assistant.';
  const staticInstructions = 'Always respond in JSON format.';

  // ─── Constructor ───────────────────────────────────────────────────

  describe('constructor', () => {
    it('stores the system prompt as the static prefix', () => {
      const manager = new PromptCacheManager({ systemPrompt: baseSystemPrompt });
      expect(manager.getStaticPrefix()).toBe(baseSystemPrompt);
    });

    it('combines systemPrompt and staticInstructions with double newline', () => {
      const manager = new PromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions,
      });
      expect(manager.getStaticPrefix()).toBe(
        `${baseSystemPrompt}\n\n${staticInstructions}`
      );
    });

    it('ignores staticInstructions when undefined', () => {
      const config: PromptCacheConfig = {
        systemPrompt: baseSystemPrompt,
        staticInstructions: undefined,
      };
      const manager = new PromptCacheManager(config);
      expect(manager.getStaticPrefix()).toBe(baseSystemPrompt);
    });

    it('handles empty string staticInstructions as truthy', () => {
      // Empty string is falsy in JS, so it should NOT be appended
      const manager = new PromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions: '',
      });
      expect(manager.getStaticPrefix()).toBe(baseSystemPrompt);
    });
  });

  // ─── buildMessages ─────────────────────────────────────────────────

  describe('buildMessages', () => {
    it('returns system + user messages without conversation history', () => {
      const manager = new PromptCacheManager({ systemPrompt: baseSystemPrompt });
      const messages = manager.buildMessages('Analyze this data.');

      expect(messages).toHaveLength(2);
      expect(messages[0]).toEqual({ role: 'system', content: baseSystemPrompt });
      expect(messages[1]).toEqual({ role: 'user', content: 'Analyze this data.' });
    });

    it('returns 4 messages when conversation history is provided', () => {
      const manager = new PromptCacheManager({ systemPrompt: baseSystemPrompt });
      const history = 'User asked about revenue trends.';
      const messages = manager.buildMessages('Follow up question.', history);

      expect(messages).toHaveLength(4);
      expect(messages[0]).toEqual({ role: 'system', content: baseSystemPrompt });
      expect(messages[1]).toEqual({
        role: 'user',
        content: `Previous conversation:\n${history}`,
      });
      expect(messages[2]).toEqual({
        role: 'assistant',
        content: 'I understand the conversation context. Please proceed with your current request.',
      });
      expect(messages[3]).toEqual({ role: 'user', content: 'Follow up question.' });
    });

    it('does not include conversation history messages when history is empty string', () => {
      const manager = new PromptCacheManager({ systemPrompt: baseSystemPrompt });
      const messages = manager.buildMessages('Query.', '');

      // Empty string is falsy, so no history messages should be added
      expect(messages).toHaveLength(2);
    });

    it('does not include conversation history messages when history is undefined', () => {
      const manager = new PromptCacheManager({ systemPrompt: baseSystemPrompt });
      const messages = manager.buildMessages('Query.', undefined);

      expect(messages).toHaveLength(2);
    });

    it('uses combined prefix when staticInstructions are set', () => {
      const manager = new PromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions,
      });
      const messages = manager.buildMessages('Analyze.');

      const expectedPrefix = `${baseSystemPrompt}\n\n${staticInstructions}`;
      expect(messages[0].content).toBe(expectedPrefix);
    });

    it('places the dynamic prompt as the last user message', () => {
      const manager = new PromptCacheManager({ systemPrompt: baseSystemPrompt });
      const dynamicPrompt = 'What are the top trends?';
      const messages = manager.buildMessages(dynamicPrompt, 'Some history.');

      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.role).toBe('user');
      expect(lastMessage.content).toBe(dynamicPrompt);
    });
  });

  // ─── Cache consistency ─────────────────────────────────────────────

  describe('cache consistency', () => {
    it('system message content is identical across multiple buildMessages calls', () => {
      const manager = new PromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions,
      });

      const messages1 = manager.buildMessages('First query about revenue.');
      const messages2 = manager.buildMessages('Second query about costs.');
      const messages3 = manager.buildMessages('Third query.', 'With history.');

      // The system message (first element) must be identical for cache hits
      expect(messages1[0].content).toBe(messages2[0].content);
      expect(messages2[0].content).toBe(messages3[0].content);
    });

    it('system message is always the first message', () => {
      const manager = new PromptCacheManager({ systemPrompt: baseSystemPrompt });

      const withoutHistory = manager.buildMessages('Query.');
      const withHistory = manager.buildMessages('Query.', 'History.');

      expect(withoutHistory[0].role).toBe('system');
      expect(withHistory[0].role).toBe('system');
    });
  });

  // ─── getStaticPrefix ───────────────────────────────────────────────

  describe('getStaticPrefix', () => {
    it('returns system prompt only when no static instructions', () => {
      const manager = new PromptCacheManager({ systemPrompt: baseSystemPrompt });
      expect(manager.getStaticPrefix()).toBe(baseSystemPrompt);
    });

    it('returns combined string when static instructions are provided', () => {
      const manager = new PromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions,
      });
      expect(manager.getStaticPrefix()).toBe(
        `${baseSystemPrompt}\n\n${staticInstructions}`
      );
    });
  });

  // ─── estimateCacheSavings ──────────────────────────────────────────

  describe('estimateCacheSavings', () => {
    it('calculates correct token estimates using length/4 ceiling', () => {
      // "Hello" = 5 chars -> ceil(5/4) = 2 tokens
      const manager = new PromptCacheManager({ systemPrompt: 'Hello' });
      const savings = manager.estimateCacheSavings('World');

      expect(savings.staticTokens).toBe(2); // ceil(5/4) = 2
      expect(savings.dynamicTokens).toBe(2); // ceil(5/4) = 2
    });

    it('calculates correct cache ratio', () => {
      // System prompt: 20 chars -> ceil(20/4) = 5 tokens
      // Dynamic prompt: 20 chars -> ceil(20/4) = 5 tokens
      // Ratio = 5/10 = 0.5
      const systemPrompt = 'A'.repeat(20);
      const manager = new PromptCacheManager({ systemPrompt });
      const savings = manager.estimateCacheSavings('B'.repeat(20));

      expect(savings.staticTokens).toBe(5);
      expect(savings.dynamicTokens).toBe(5);
      expect(savings.cacheRatio).toBe(0.5);
    });

    it('returns higher cache ratio when system prompt dominates', () => {
      const systemPrompt = 'A'.repeat(400); // 100 tokens
      const manager = new PromptCacheManager({ systemPrompt });
      const savings = manager.estimateCacheSavings('B'.repeat(40)); // 10 tokens

      expect(savings.staticTokens).toBe(100);
      expect(savings.dynamicTokens).toBe(10);
      expect(savings.cacheRatio).toBeCloseTo(100 / 110, 5);
    });

    it('returns 0 cache ratio when both prompts are empty', () => {
      const manager = new PromptCacheManager({ systemPrompt: '' });
      const savings = manager.estimateCacheSavings('');

      expect(savings.staticTokens).toBe(0);
      expect(savings.dynamicTokens).toBe(0);
      expect(savings.cacheRatio).toBe(0);
    });

    it('includes static instructions in the static token count', () => {
      const manager = new PromptCacheManager({
        systemPrompt: 'A'.repeat(40), // 10 tokens
        staticInstructions: 'B'.repeat(40), // 10 tokens + 2 for "\n\n"
      });
      const savings = manager.estimateCacheSavings('C'.repeat(40));

      // Combined prefix: 40 + 2 (\n\n) + 40 = 82 chars -> ceil(82/4) = 21 tokens
      expect(savings.staticTokens).toBe(21);
      expect(savings.dynamicTokens).toBe(10);
    });
  });
});
