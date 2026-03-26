import { createWrapper } from '../create-wrapper.js';

export interface AiToolIndicatorProps {
  tools?: Array<{ name: string; status: 'loading' | 'complete' | 'error'; result?: string }>;
  compact?: boolean;
  className?: string;
}

export const AiToolIndicator = createWrapper<AiToolIndicatorProps>(
  'ai-tool-indicator',
  ['tools', 'compact'],
  {}
);
