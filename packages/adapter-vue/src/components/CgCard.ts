import { createVueWrapper } from '../create-wrapper.js';

export interface CgCardProps {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  clickable?: boolean;
}

export const CgCard = createVueWrapper(
  'cg-card',
  {
    variant: { type: String, default: 'elevated' },
    padding: { type: String, default: 'md' },
    clickable: { type: Boolean, default: false },
  },
  {
    'card-click': 'cg-card-click',
  }
);
