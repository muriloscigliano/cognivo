import { createWrapper } from '../create-wrapper.js';

export interface AiResultPanelProps {
  /** Panel title. Defaults to 'AI Analysis'. */
  title?: string;
  /** AI-generated explanation text. */
  explanation?: string;
  /** List of bullet-point insights. */
  bullets?: string[];
  /** Impact drivers with factor name and impact percentage. */
  drivers?: Array<{ factor: string; impact: number }>;
  /** Confidence score between 0 and 1. */
  confidence?: number;
  className?: string;
  /** Fired as `ai-result-export`. */
  onResultExport?: (e: CustomEvent) => void;
  /** Fired as `ai-result-copy`. */
  onResultCopy?: (e: CustomEvent) => void;
}

export const AiResultPanel = createWrapper<AiResultPanelProps, 'ai-result-panel'>(
  'ai-result-panel',
  ['title', 'explanation', 'bullets', 'drivers', 'confidence'],
  {
    onResultExport: 'ai-result-export',
    onResultCopy: 'ai-result-copy',
  }
);
