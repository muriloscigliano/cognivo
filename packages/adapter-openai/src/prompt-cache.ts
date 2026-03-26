/**
 * Prompt Cache Manager
 *
 * Structures messages for optimal OpenAI automatic prefix caching.
 * Separates static system instructions from dynamic per-request content.
 *
 * OpenAI automatically caches message prefixes. By ensuring the system
 * message is always identical across requests, the static prefix gets
 * cached automatically, reducing latency and cost for repeated calls.
 */

export interface CacheableMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface PromptCacheConfig {
  /** Static system prompt (cached by OpenAI prefix matching) */
  systemPrompt: string;
  /** Optional static instructions appended to system prompt */
  staticInstructions?: string;
}

export class PromptCacheManager {
  private staticPrefix: string;

  constructor(private config: PromptCacheConfig) {
    this.staticPrefix = config.staticInstructions
      ? `${config.systemPrompt}\n\n${config.staticInstructions}`
      : config.systemPrompt;
  }

  /**
   * Build messages array with cached prefix + dynamic content.
   * The system message stays identical across requests for cache hits.
   */
  buildMessages(dynamicPrompt: string, conversationHistory?: string): CacheableMessage[] {
    const messages: CacheableMessage[] = [
      { role: 'system', content: this.staticPrefix },
    ];

    if (conversationHistory) {
      messages.push({ role: 'user', content: `Previous conversation:\n${conversationHistory}` });
      messages.push({ role: 'assistant', content: 'I understand the conversation context. Please proceed with your current request.' });
    }

    messages.push({ role: 'user', content: dynamicPrompt });

    return messages;
  }

  /** Get the static prefix (useful for debugging/logging) */
  getStaticPrefix(): string {
    return this.staticPrefix;
  }

  /** Estimate cache savings: static prefix tokens vs total tokens */
  estimateCacheSavings(dynamicPrompt: string): { staticTokens: number; dynamicTokens: number; cacheRatio: number } {
    const staticTokens = Math.ceil(this.staticPrefix.length / 4);
    const dynamicTokens = Math.ceil(dynamicPrompt.length / 4);
    const total = staticTokens + dynamicTokens;
    return {
      staticTokens,
      dynamicTokens,
      cacheRatio: total > 0 ? staticTokens / total : 0,
    };
  }
}
