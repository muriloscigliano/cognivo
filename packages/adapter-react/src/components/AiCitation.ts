import { createWrapper } from '../create-wrapper.js';

export interface AiCitationProps {
  sources?: Array<{ title: string; url?: string; excerpt?: string; relevance?: number }>;
  mode?: 'inline' | 'list';
  maxVisible?: number;
  className?: string;
}

export const AiCitation = createWrapper<AiCitationProps>(
  'ai-citation',
  ['sources', 'mode', 'maxVisible'],
  {}
);
