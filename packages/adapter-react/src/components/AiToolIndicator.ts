import { createWrapper } from '../create-wrapper.js';

export interface AiToolIndicatorProps {
  tools?: Array<{ name: string; status: 'loading' | 'complete' | 'error'; result?: string }>;
  compact?: boolean;
  className?: string;
  /** Fired as `ai-tool-click`. */
  onToolClick?: (e: CustomEvent) => void;
}

export const AiToolIndicator = createWrapper<AiToolIndicatorProps, 'ai-tool-indicator'>(
  'ai-tool-indicator',
  ['tools', 'compact'],
  {
    onToolClick: 'ai-tool-click',
  }
);
