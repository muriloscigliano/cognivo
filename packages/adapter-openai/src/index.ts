/**
 * @cognivo/adapter-openai
 *
 * OpenAI adapter for Cognivo AI components.
 * Supports GPT-4, structured outputs, and streaming.
 */

export { OpenAiClient } from './client.js';
export type { OpenAiClientConfig } from './client.js';
export { schemas } from './schemas.js';
export { buildPrompt, SYSTEM_PROMPT } from './prompts.js';
