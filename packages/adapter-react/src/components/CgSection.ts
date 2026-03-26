import { createWrapper } from '../create-wrapper.js';

export interface CgSectionProps {
  /** Section title. */
  title?: string;
  /** Optional description below the title. */
  description?: string;
  /** Whether the section can be folded/collapsed. */
  foldable?: boolean;
  /** Whether the section is currently open. */
  open?: boolean;
  /** Whether to show a border around the section. */
  bordered?: boolean;
  /** Optional count badge displayed next to the title. */
  count?: number;
  /** Fired when the section is toggled open/closed. */
  onToggle?: (e: CustomEvent<{ open: boolean }>) => void;
  className?: string;
}

export const CgSection = createWrapper<CgSectionProps>(
  'cg-section',
  ['title', 'description', 'foldable', 'open', 'bordered', 'count'],
  { onToggle: 'cg-section-toggle' }
);
