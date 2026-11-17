import { createWrapper } from '../create-wrapper.js';

export interface CgButtonProps {
  /** Button visual variant. */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Button size. */
  size?: 'sm' | 'md' | 'lg';
  /** `submit` / `reset` act on the owning form; `danger` is a visual intent. */
  type?: 'normal' | 'danger' | 'button' | 'submit' | 'reset';
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether to show a loading spinner. */
  loading?: boolean;
  /** Whether the button takes full width. */
  full?: boolean;
  /** Accessible label text. */
  label?: string;
  /** Link mode: renders an `<a href>` styled as the button. Disabled or
   *  loading, it is a disabled link (no href, not focusable). */
  href?: string;
  /** Link mode: the link's `target` (e.g. `_blank`). */
  target?: string;
  /** Link mode: the link's `rel` (e.g. `noopener noreferrer`). */
  rel?: string;
  /** Link mode: the link's `download` file name. */
  download?: string;
  /** Native click handler. */
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

export const CgButton = /* @__PURE__ */ createWrapper<CgButtonProps, 'cg-button'>(
  'cg-button',
  ['variant', 'size', 'type', 'disabled', 'loading', 'full', 'label'],
  {}
);
