import { createWrapper } from '../create-wrapper.js';

export interface AiThinkingProps {
  /** Text to display while thinking. Defaults to 'Thinking'. */
  text?: string;
  /** Whether to apply the shimmer text effect. */
  shimmer?: boolean;
  className?: string;
}

export const AiThinking = createWrapper<AiThinkingProps>(
  'ai-thinking',
  ['text', 'shimmer'],
  {}
);
