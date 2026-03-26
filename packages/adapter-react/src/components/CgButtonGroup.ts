import { createWrapper } from '../create-wrapper.js';

export interface CgButtonGroupProps {
  /** Layout direction of the buttons. */
  direction?: 'row' | 'column';
  /** Gap between buttons. */
  gap?: string;
  /** Cross-axis alignment. */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Whether buttons are visually attached. */
  attached?: boolean;
  className?: string;
}

export const CgButtonGroup = createWrapper<CgButtonGroupProps>(
  'cg-button-group',
  ['direction', 'gap', 'align', 'attached'],
  {}
);
