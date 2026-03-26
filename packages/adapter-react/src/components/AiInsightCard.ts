import { createWrapper } from '../create-wrapper.js';

export interface AiInsightCardProps {
  /** Type of insight, determines icon and color. */
  type?: 'explanation' | 'forecast' | 'anomaly' | 'optimization' | 'classification';
  /** Insight text content. */
  text?: string;
  /** Confidence score between 0 and 1. */
  confidence?: number;
  /** Display timestamp string. */
  timestamp?: string;
  /** Fired when the card is clicked. Detail: { type, text, confidence }. */
  onInsightClick?: (e: CustomEvent<{ type: string; text: string; confidence: number }>) => void;
  className?: string;
}

export const AiInsightCard = createWrapper<AiInsightCardProps>(
  'ai-insight-card',
  ['type', 'text', 'confidence', 'timestamp'],
  { onInsightClick: 'ai-insight-click' }
);
