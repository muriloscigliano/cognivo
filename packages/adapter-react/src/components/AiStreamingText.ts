import { createWrapper } from '../create-wrapper.js';

export interface AiStreamingTextProps {
  content?: string;
  streaming?: boolean;
  showCursor?: boolean;
  markdown?: boolean;
  className?: string;
  /** Fired as `ai-streaming-chunk`. */
  onStreamingChunk?: (e: CustomEvent) => void;
  /** Fired as `ai-streaming-complete`. */
  onStreamingComplete?: (e: CustomEvent) => void;
}

export const AiStreamingText = createWrapper<AiStreamingTextProps, 'ai-streaming-text'>(
  'ai-streaming-text',
  ['content', 'streaming', 'showCursor', 'markdown'],
  {
    onStreamingChunk: 'ai-streaming-chunk',
    onStreamingComplete: 'ai-streaming-complete',
  }
);
