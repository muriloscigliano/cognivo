import { createWrapper } from '../create-wrapper.js';

export interface CgCalloutProps {
  /** Callout visual variant. */
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  /** Callout title. */
  title?: string;
  /** Callout description text. */
  description?: string;
  /** Whether the callout can be dismissed. */
  dismissible?: boolean;
  /** Fired when the callout is dismissed. */
  onDismiss?: (e: CustomEvent) => void;
  className?: string;
}

export const CgCallout = /* @__PURE__ */ createWrapper<CgCalloutProps, 'cg-callout'>(
  'cg-callout',
  ['variant', 'title', 'description', 'dismissible'],
  { onDismiss: 'cg-callout-dismiss' }
);
