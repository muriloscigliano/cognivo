import { createWrapper } from '../create-wrapper.js';

export interface CgIconProps {
  /** Icon name from the icon set. */
  name?: string;
  /** Icon size. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Icon color token. */
  color?: string;
  /** Accessible label for the icon. */
  label?: string;
  className?: string;
}

export const CgIcon = createWrapper<CgIconProps>(
  'cg-icon',
  ['name', 'size', 'color', 'label'],
  {}
);
