import type { CgTextarea as CgTextareaElementClass } from '@cognivo/components/cg-textarea';
import { createWrapper } from '../create-wrapper.js';

/** The `<cg-textarea>` element, for a typed `ref`: `useRef<CgTextareaElement>(null)`.
 *  Has the selection API (`selectionStart`, `selectionEnd`, `setSelectionRange`,
 *  `setRangeText`, `select`, `focus`), e.g. to insert a variable at the cursor. */
export type CgTextareaElement = CgTextareaElementClass;

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
  onCgInput?: (e: CustomEvent<{ value: string }>) => void;
  className?: string;
}

export const CgTextarea = createWrapper<CgTextareaProps, 'cg-textarea'>(
  'cg-textarea',
  ['value', 'placeholder', 'name', 'rows', 'maxlength', 'disabled', 'readonly', 'error', 'autoresize'],
  {
    onCgInput: 'cg-input',
  }
);
