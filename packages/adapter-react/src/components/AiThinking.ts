import { createWrapper } from '../create-wrapper.js';

export interface AiThinkingProps {
  /** Text to display while thinking. Defaults to 'Thinking'. */
  text?: string;
  /** Whether to apply the shimmer text effect. */
  shimmer?: boolean;
  className?: string;
  /** Fired as `ai-thinking-stage-change`. */
  onStageChange?: (e: CustomEvent) => void;
  /** Fired as `ai-thinking-cancel`. */
  onCancel?: (e: CustomEvent) => void;
}

export const AiThinking = createWrapper<AiThinkingProps, 'ai-thinking'>(
  'ai-thinking',
  ['text', 'shimmer'],
  {
    onStageChange: 'ai-thinking-stage-change',
    onCancel: 'ai-thinking-cancel',
  }
);
