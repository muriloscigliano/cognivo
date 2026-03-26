import { createWrapper } from '../create-wrapper.js';

export interface CgButtonProps {
  /** Button visual variant. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  /** Button size. */
  size?: 'sm' | 'md' | 'lg';
  /** HTML button type. */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether to show a loading spinner. */
  loading?: boolean;
  /** Whether the button takes full width. */
  full?: boolean;
  /** Accessible label text. */
  label?: string;
  /** Native click handler. */
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

export const CgButton = createWrapper<CgButtonProps>(
  'cg-button',
  ['variant', 'size', 'type', 'disabled', 'loading', 'full', 'label'],
  {}
);
