/**
 * Anthropic Prompt Cache Manager
 *
 * Anthropic has explicit prompt caching via `cache_control` breakpoints.
 * Unlike OpenAI's automatic prefix caching, Anthropic requires you to
 * mark system message blocks with `cache_control: { type: 'ephemeral' }`
 * to opt into caching.
 *
 * This manager structures system content blocks for optimal caching.
 */

export interface AnthropicCacheConfig {
  /** Static system prompt */
  systemPrompt: string;

  /** Optional static instructions appended to system prompt */
  staticInstructions?: string;

  /** Enable cache_control breakpoints (default: true) */
  enableCaching?: boolean;
}

export interface SystemBlock {
  type: 'text';
  text: string;
  cache_control?: { type: 'ephemeral' };
}

export class AnthropicPromptCacheManager {
  private config: AnthropicCacheConfig;
  private staticPrefix: string;

  constructor(config: AnthropicCacheConfig) {
    this.config = config;
    this.staticPrefix = config.staticInstructions
      ? `${config.systemPrompt}\n\n${config.staticInstructions}`
      : config.systemPrompt;
  }

  /**
   * Build system content blocks with optional cache_control.
   *
   * Returns an array of content blocks suitable for Anthropic's
   * `system` parameter (which accepts either a string or array of blocks).
   *
   * @param overrideText - Optional per-request system prompt that replaces
   *   the configured static prefix while keeping the cache breakpoint.
   */
  buildSystemBlocks(overrideText?: string): SystemBlock[] {
    const block: SystemBlock = {
      type: 'text' as const,
      text: overrideText ?? this.staticPrefix,
    };

    if (this.config.enableCaching !== false) {
      block.cache_control = { type: 'ephemeral' as const };
    }

    return [block];
  }

  /** Get the static prefix (useful for debugging/logging) */
  getStaticPrefix(): string {
    return this.staticPrefix;
  }

  /** Estimate cache savings: static prefix tokens vs total tokens */
  estimateCacheSavings(dynamicPrompt: string): {
    staticTokens: number;
    dynamicTokens: number;
    cacheRatio: number;
  } {
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
