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
  onError?: (e: CustomEvent<{ error: string; timestamp: number }>) => void;
  className?: string;
}

export const AiChat = createWrapper<AiChatProps>(
  'ai-chat',
  ['aiClient', 'dataset'],
  {
    onMessageSent: 'ai-message-sent',
    onResponseReceived: 'ai-response-received',
    onError: 'ai-error',
  }
);
