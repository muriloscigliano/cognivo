import { createWrapper } from '../create-wrapper.js';

export interface CgFormProps {
  /** Form name. */
  name?: string;
  /** Gap between form fields. */
  gap?: string;
  /** Whether the form is in a loading state. */
  loading?: boolean;
  /** Map of field names to error messages. */
  errors?: Record<string, string>;
  /** Fired when the form is submitted. */
  onSubmit?: (e: CustomEvent<{ values: Record<string, unknown> }>) => void;
  /** Fired when the form is reset. */
  onReset?: (e: CustomEvent) => void;
  className?: string;
}

export const CgForm = createWrapper<CgFormProps>(
  'cg-form',
  ['name', 'gap', 'loading', 'errors'],
  { onSubmit: 'cg-submit', onReset: 'cg-reset' }
);
