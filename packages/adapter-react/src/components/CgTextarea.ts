import { createWrapper } from '../create-wrapper.js';

export interface CgTextareaProps {
  /** Current textarea value. */
  value?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Form field name. */
  name?: string;
  /** Number of visible text rows. */
  rows?: number;
  /** Maximum character length. */
  maxlength?: number;
  /** Whether the textarea is disabled. */
  disabled?: boolean;
  /** Whether the textarea is read-only. */
  readonly?: boolean;
  /** Error message or boolean. */
  error?: string | boolean;
  /** Whether to auto-resize based on content. */
  autoresize?: boolean;
  /** Fired on input change. */
  onInput?: (e: CustomEvent<{ value: string }>) => void;
  className?: string;
}

export const CgTextarea = createWrapper<CgTextareaProps>(
  'cg-textarea',
  ['value', 'placeholder', 'name', 'rows', 'maxlength', 'disabled', 'readonly', 'error', 'autoresize'],
  { onInput: 'cg-input' }
);
