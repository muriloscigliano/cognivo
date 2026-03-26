import { createWrapper } from '../create-wrapper.js';

export interface CgStepItem {
  label: string;
  description?: string;
  status?: 'pending' | 'active' | 'completed' | 'error';
}

export interface CgStepsProps {
  /** Step definitions. */
  items?: CgStepItem[];
  /** Layout direction. */
  direction?: 'horizontal' | 'vertical';
  /** Whether steps are clickable for navigation. */
  clickable?: boolean;
  /** Whether to use compact step display. */
  compact?: boolean;
  /** Fired when a step is clicked. */
  onStepClick?: (e: CustomEvent<{ index: number }>) => void;
  className?: string;
}

export const CgSteps = createWrapper<CgStepsProps>(
  'cg-steps',
  ['items', 'direction', 'clickable', 'compact'],
  { onStepClick: 'cg-step-click' }
);
