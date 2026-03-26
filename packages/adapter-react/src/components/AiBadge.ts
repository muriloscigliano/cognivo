import { createWrapper } from '../create-wrapper.js';

export interface AiBadgeProps {
  /** AI confidence score between 0 and 1. */
  score?: number;
  /** Whether to display the score as a percentage. */
  showPercentage?: boolean;
  /** Fired when the badge is clicked. Detail: { score, level }. */
  onBadgeClick?: (e: CustomEvent<{ score: number; level: 'high' | 'medium' | 'low' }>) => void;
  className?: string;
}

export const AiBadge = createWrapper<AiBadgeProps>(
  'ai-badge',
  ['score', 'showPercentage'],
  { onBadgeClick: 'ai-badge-click' }
);
