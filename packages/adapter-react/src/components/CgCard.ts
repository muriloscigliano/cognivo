import { createWrapper } from '../create-wrapper.js';

export interface CgCardProps {
  /** Card visual variant. */
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  /** Inner padding token. */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether the card is clickable. */
  clickable?: boolean;
  /** Fired when a clickable card is clicked. */
  onCardClick?: (e: CustomEvent) => void;
  className?: string;
}

export const CgCard = createWrapper<CgCardProps>(
  'cg-card',
  ['variant', 'padding', 'clickable'],
  { onCardClick: 'cg-card-click' }
);
