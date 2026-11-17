import { createWrapper } from '../create-wrapper.js';

export interface AiChatProps {
  /** The AI client instance implementing the AiClient interface. */
  aiClient?: unknown;
  /** Dataset to provide to the AI for analysis. */
  dataset?: unknown[];
  /** Fired when the user sends a message. Detail: { message, timestamp }. */
  onMessageSent?: (e: CustomEvent<{ message: string; timestamp: number }>) => void;
  /** Fired when an AI response is received. Detail: { message, confidence?, timestamp }. */
  onResponseReceived?: (e: CustomEvent<{ message: string; confidence?: number; timestamp: number }>) => void;
  /** Fired when the AI encounters an error. Detail: { error, timestamp }. */
  onAiError?: (e: CustomEvent<{ error: string; timestamp: number }>) => void;
  className?: string;
  /** Fired as `ai-chat-stop`. */
  onStop?: (e: CustomEvent) => void;
  /** Fired as `ai-chat-copy`. */
  onChatCopy?: (e: CustomEvent) => void;
  /** Fired as `ai-chat-regenerate`. */
  onRegenerate?: (e: CustomEvent) => void;
  /** Fired as `ai-chat-rate`. */
  onRate?: (e: CustomEvent) => void;
}

export const AiChat = /* @__PURE__ */ createWrapper<AiChatProps, 'ai-chat'>(
  'ai-chat',
  ['aiClient', 'dataset'],
  {
    onMessageSent: 'ai-message-sent',
    onResponseReceived: 'ai-response-received',
    onAiError: 'ai-error',
    onStop: 'ai-chat-stop',
    onChatCopy: 'ai-chat-copy',
    onRegenerate: 'ai-chat-regenerate',
    onRate: 'ai-chat-rate',
  }
);
