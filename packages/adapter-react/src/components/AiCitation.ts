import { createWrapper } from '../create-wrapper.js';

export interface AiCitationProps {
  sources?: Array<{ title: string; url?: string; excerpt?: string; relevance?: number }>;
  mode?: 'inline' | 'list';
  maxVisible?: number;
  className?: string;
  /** Fired as `ai-citation-click`. */
  onCitationClick?: (e: CustomEvent) => void;
}

export const AiCitation = /* @__PURE__ */ createWrapper<AiCitationProps, 'ai-citation'>(
  'ai-citation',
  ['sources', 'mode', 'maxVisible'],
  {
    onCitationClick: 'ai-citation-click',
  }
);
