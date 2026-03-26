/**
 * @cognivo/adapter-anthropic
 *
 * Anthropic Claude adapter for Cognivo AI components.
 * Supports Claude models, structured outputs via tool_use, and streaming.
 */

export { AnthropicClient } from './client.js';
export type { AnthropicClientConfig } from './client.js';
export { tools } from './schemas.js';
export type { ToolDefinition } from './schemas.js';
export { buildPrompt, SYSTEM_PROMPT } from './prompts.js';
export { AnthropicPromptCacheManager } from './prompt-cache.js';
export type { AnthropicCacheConfig, SystemBlock } from './prompt-cache.js';
