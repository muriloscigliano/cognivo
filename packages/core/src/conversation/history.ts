import type { AiIntent } from '../intents/types.js';
import type { ConversationMessage, ConversationConfig } from './types.js';

const DEFAULT_MAX_TURNS = 20;
const DEFAULT_MAX_TOKEN_ESTIMATE = 8000;

/**
 * ConversationHistory
 *
 * Manages an ordered list of conversation messages and provides
 * prompt-ready serialization with turn and token-budget truncation.
 */
export class ConversationHistory {
  private messages: ConversationMessage[] = [];
  private config: Required<ConversationConfig>;

  constructor(config?: ConversationConfig) {
    this.config = {
      maxTurns: config?.maxTurns ?? DEFAULT_MAX_TURNS,
      maxTokenEstimate: config?.maxTokenEstimate ?? DEFAULT_MAX_TOKEN_ESTIMATE,
    };
  }

  /**
   * Append a user message to the history
   */
  addUserMessage(content: string, intent?: AiIntent): void {
    const msg: ConversationMessage = {
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    if (intent !== undefined) {
      msg.intent = intent;
    }
    this.messages.push(msg);
  }

  /**
   * Append an assistant message to the history
   */
  addAssistantMessage(content: string, metadata?: Record<string, unknown>): void {
    const msg: ConversationMessage = {
      role: 'assistant',
      content,
      timestamp: Date.now(),
    };
    if (metadata !== undefined) {
      msg.metadata = metadata;
    }
    this.messages.push(msg);
  }

  /**
   * Return a readonly snapshot of all messages
   */
  getMessages(): readonly ConversationMessage[] {
    return this.messages;
  }

  /**
   * Serialize the conversation into a prompt-friendly string.
   *
   * The output is truncated in two passes:
   *   1. Only the most recent `maxTurns` messages are considered.
   *   2. Messages are included from most-recent to oldest until the
   *      cumulative character length would exceed `maxTokenEstimate`.
   *
   * Format:
   *   User: <content>\n
   *   Assistant: <content>\n
   *   System: <content>\n
   */
  toPromptString(): string {
    if (this.messages.length === 0) {
      return '';
    }

    // Step 1 — take the most recent maxTurns messages
    const recentMessages = this.messages.slice(-this.config.maxTurns);

    // Step 2 — walk backwards to fit within the token-estimate budget
    const lines: string[] = [];
    let charCount = 0;

    for (let i = recentMessages.length - 1; i >= 0; i--) {
      const msg = recentMessages[i]!;
      const roleLabel = msg.role.charAt(0).toUpperCase() + msg.role.slice(1);
      const line = `${roleLabel}: ${msg.content}`;

      // +1 accounts for the newline character that will join lines
      if (charCount + line.length + (lines.length > 0 ? 1 : 0) > this.config.maxTokenEstimate) {
        break;
      }

      lines.unshift(line);
      charCount += line.length + (lines.length > 1 ? 1 : 0);
    }

    return lines.join('\n');
  }

  /**
   * Remove all messages from the history
   */
  clear(): void {
    this.messages = [];
  }

  /**
   * Number of messages currently stored
   */
  get length(): number {
    return this.messages.length;
  }
}
