import { describe, it, expect } from 'vitest';
import { AnthropicPromptCacheManager } from '../prompt-cache.js';
import type { AnthropicCacheConfig } from '../prompt-cache.js';

describe('AnthropicPromptCacheManager', () => {
  const baseSystemPrompt = 'You are a data analysis assistant.';
  const staticInstructions = 'Always respond in JSON format.';

  // --- Constructor ---

  describe('constructor', () => {
    it('stores the system prompt as the static prefix', () => {
      const manager = new AnthropicPromptCacheManager({ systemPrompt: baseSystemPrompt });
      expect(manager.getStaticPrefix()).toBe(baseSystemPrompt);
    });

    it('combines systemPrompt and staticInstructions with double newline', () => {
      const manager = new AnthropicPromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions,
      });
      expect(manager.getStaticPrefix()).toBe(
        `${baseSystemPrompt}\n\n${staticInstructions}`
      );
    });

    it('ignores staticInstructions when undefined', () => {
      const config: AnthropicCacheConfig = {
        systemPrompt: baseSystemPrompt,
        staticInstructions: undefined,
      };
      const manager = new AnthropicPromptCacheManager(config);
      expect(manager.getStaticPrefix()).toBe(baseSystemPrompt);
    });

    it('handles empty string staticInstructions as falsy', () => {
      const manager = new AnthropicPromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions: '',
      });
      expect(manager.getStaticPrefix()).toBe(baseSystemPrompt);
    });
  });

  // --- buildSystemBlocks ---

  describe('buildSystemBlocks', () => {
    it('returns blocks with cache_control when caching is enabled', () => {
      const manager = new AnthropicPromptCacheManager({
        systemPrompt: baseSystemPrompt,
        enableCaching: true,
      });

      const blocks = manager.buildSystemBlocks();

      expect(blocks).toHaveLength(1);
      expect(blocks[0]!.type).toBe('text');
      expect(blocks[0]!.text).toBe(baseSystemPrompt);
      expect(blocks[0]!.cache_control).toEqual({ type: 'ephemeral' });
    });

    it('returns blocks with cache_control by default (enableCaching not specified)', () => {
      const manager = new AnthropicPromptCacheManager({
        systemPrompt: baseSystemPrompt,
      });

      const blocks = manager.buildSystemBlocks();

      expect(blocks[0]!.cache_control).toEqual({ type: 'ephemeral' });
    });

    it('returns blocks without cache_control when caching is explicitly disabled', () => {
      const manager = new AnthropicPromptCacheManager({
        systemPrompt: baseSystemPrompt,
        enableCaching: false,
      });

      const blocks = manager.buildSystemBlocks();

      expect(blocks).toHaveLength(1);
      expect(blocks[0]!.type).toBe('text');
      expect(blocks[0]!.text).toBe(baseSystemPrompt);
      expect(blocks[0]!.cache_control).toBeUndefined();
    });

    it('uses combined prefix when staticInstructions are set', () => {
      const manager = new AnthropicPromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions,
        enableCaching: true,
      });

      const blocks = manager.buildSystemBlocks();

      const expectedPrefix = `${baseSystemPrompt}\n\n${staticInstructions}`;
      expect(blocks[0]!.text).toBe(expectedPrefix);
    });
  });

  // --- getStaticPrefix ---

  describe('getStaticPrefix', () => {
    it('returns system prompt only when no static instructions', () => {
      const manager = new AnthropicPromptCacheManager({ systemPrompt: baseSystemPrompt });
      expect(manager.getStaticPrefix()).toBe(baseSystemPrompt);
    });

    it('returns combined string when static instructions are provided', () => {
      const manager = new AnthropicPromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions,
      });
      expect(manager.getStaticPrefix()).toBe(
        `${baseSystemPrompt}\n\n${staticInstructions}`
      );
    });
  });

  // --- estimateCacheSavings ---

  describe('estimateCacheSavings', () => {
    it('calculates correct token estimates using length/4 ceiling', () => {
      const manager = new AnthropicPromptCacheManager({ systemPrompt: 'Hello' });
      const savings = manager.estimateCacheSavings('World');

      expect(savings.staticTokens).toBe(2); // ceil(5/4) = 2
      expect(savings.dynamicTokens).toBe(2); // ceil(5/4) = 2
    });

    it('calculates correct cache ratio', () => {
      const systemPrompt = 'A'.repeat(20);
      const manager = new AnthropicPromptCacheManager({ systemPrompt });
      const savings = manager.estimateCacheSavings('B'.repeat(20));

      expect(savings.staticTokens).toBe(5);
      expect(savings.dynamicTokens).toBe(5);
      expect(savings.cacheRatio).toBe(0.5);
    });

    it('returns higher cache ratio when system prompt dominates', () => {
      const systemPrompt = 'A'.repeat(400); // 100 tokens
      const manager = new AnthropicPromptCacheManager({ systemPrompt });
      const savings = manager.estimateCacheSavings('B'.repeat(40)); // 10 tokens

      expect(savings.staticTokens).toBe(100);
      expect(savings.dynamicTokens).toBe(10);
      expect(savings.cacheRatio).toBeCloseTo(100 / 110, 5);
    });

    it('returns 0 cache ratio when both prompts are empty', () => {
      const manager = new AnthropicPromptCacheManager({ systemPrompt: '' });
      const savings = manager.estimateCacheSavings('');

      expect(savings.staticTokens).toBe(0);
      expect(savings.dynamicTokens).toBe(0);
      expect(savings.cacheRatio).toBe(0);
    });

    it('includes static instructions in the static token count', () => {
      const manager = new AnthropicPromptCacheManager({
        systemPrompt: 'A'.repeat(40), // 10 tokens
        staticInstructions: 'B'.repeat(40), // 10 tokens + 2 for "\n\n"
      });
      const savings = manager.estimateCacheSavings('C'.repeat(40));

      // Combined prefix: 40 + 2 (\n\n) + 40 = 82 chars -> ceil(82/4) = 21 tokens
      expect(savings.staticTokens).toBe(21);
      expect(savings.dynamicTokens).toBe(10);
    });
  });

  // --- Cache consistency ---

  describe('cache consistency', () => {
    it('system blocks are identical across multiple buildSystemBlocks calls', () => {
      const manager = new AnthropicPromptCacheManager({
        systemPrompt: baseSystemPrompt,
        staticInstructions,
        enableCaching: true,
      });

      const blocks1 = manager.buildSystemBlocks();
      const blocks2 = manager.buildSystemBlocks();
      const blocks3 = manager.buildSystemBlocks();

      expect(blocks1[0]!.text).toBe(blocks2[0]!.text);
      expect(blocks2[0]!.text).toBe(blocks3[0]!.text);
    });
  });
});
