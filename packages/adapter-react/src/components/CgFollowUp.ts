import { createWrapper } from '../create-wrapper.js';

export interface CgFollowUpItem {
  label: string;
  value?: string;
  icon?: string;
}

export interface CgFollowUpProps {
  /** Follow-up suggestion items. */
  items?: CgFollowUpItem[];
  /** Label text above the suggestions. */
  label?: string;
  /** Whether the follow-up buttons are disabled. */
  disabled?: boolean;
  /** Whether to show a loading state. */
  loading?: boolean;
  /** Whether to hide the label. */
  hideLabel?: boolean;
  /** Fired when a follow-up item is clicked. */
  onFollowUpClick?: (e: CustomEvent<{ value: string; index: number }>) => void;
  className?: string;
}

export const CgFollowUp = createWrapper<CgFollowUpProps>(
  'cg-follow-up',
  ['items', 'label', 'disabled', 'loading', 'hideLabel'],
  { onFollowUpClick: 'cg-follow-up-click' }
);
