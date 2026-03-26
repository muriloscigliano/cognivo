import { createWrapper } from '../create-wrapper.js';

export interface CgLabelProps {
  /** Label text. */
  text?: string;
  /** Hint text shown below the label. */
  hint?: string;
  /** Error message text. */
  error?: string;
  /** The ID of the associated form element. */
  htmlFor?: string;
  /** Whether the associated field is required. */
  required?: boolean;
  /** Whether the label appears disabled. */
  disabled?: boolean;
  className?: string;
}

export const CgLabel = createWrapper<CgLabelProps>(
  'cg-label',
  ['text', 'hint', 'error', 'htmlFor', 'required', 'disabled'],
  {}
);
