import type { AiIntent } from '../intents/types.js';

/**
 * A single message in a conversation history
 */
export interface ConversationMessage {
  /** Role of the message author */
  role: 'user' | 'assistant' | 'system';

  /** Text content of the message */
  content: string;

  /** Unix timestamp (ms) when the message was created */
  timestamp: number;

  /** The AI intent associated with this message, if any */
  intent?: AiIntent;

  /** Arbitrary metadata attached to the message */
  metadata?: Record<string, unknown>;
}

/**
 * Configuration for conversation history management
 */
export interface ConversationConfig {
  /** Maximum number of conversation turns to retain (default: 20) */
  maxTurns?: number;

  /** Maximum estimated character budget for prompt injection (default: 8000, ~2000 tokens) */
  maxTokenEstimate?: number;
}
