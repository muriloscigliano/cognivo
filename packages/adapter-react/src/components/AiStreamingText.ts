import { createWrapper } from '../create-wrapper.js';

export interface AiStreamingTextProps {
  content?: string;
  streaming?: boolean;
  showCursor?: boolean;
  markdown?: boolean;
  className?: string;
}

export const AiStreamingText = createWrapper<AiStreamingTextProps>(
  'ai-streaming-text',
  ['content', 'streaming', 'showCursor', 'markdown'],
  {}
);
