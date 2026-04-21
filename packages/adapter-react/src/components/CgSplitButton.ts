import { createWrapper } from '../create-wrapper.js';
import type { SplitButtonItem } from '@cognivo/components/cg-split-button';

export type { SplitButtonItem };

export interface CgSplitButtonProps {
  /** Primary action button label. */
  label?: string;
  /** Visual variant shared with cg-button. */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Button size. */
  size?: 'sm' | 'md' | 'lg';
  /** Action type — `danger` switches the primary variant to destructive styling. */
  type?: 'normal' | 'danger';
  /** Disable both primary action and dropdown trigger. */
  disabled?: boolean;
  /** Show a loading spinner on the primary action. */
  loading?: boolean;
  /** Dropdown menu items. */
  items?: SplitButtonItem[];
  /** Whether the dropdown menu is open. */
  open?: boolean;
  /** Placement of the dropdown menu relative to the chevron. */
  menuPlacement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Primary action triggered. */
  onCgSplitButtonClick?: (e: CustomEvent) => void;
  /** A dropdown menu item was selected. */
  onCgSplitButtonSelect?: (e: CustomEvent<{ id: string; item: SplitButtonItem }>) => void;
  /** Dropdown menu opened. */
  onCgSplitButtonOpen?: (e: CustomEvent) => void;
  /** Dropdown menu closed. */
  onCgSplitButtonClose?: (e: CustomEvent) => void;
  className?: string;
}

export const CgSplitButton = createWrapper<CgSplitButtonProps>(
  'cg-split-button',
  ['label', 'variant', 'size', 'type', 'disabled', 'loading', 'items', 'open', 'menuPlacement'],
  {
    onCgSplitButtonClick: 'cg-split-button-click',
    onCgSplitButtonSelect: 'cg-split-button-select',
    onCgSplitButtonOpen: 'cg-split-button-open',
    onCgSplitButtonClose: 'cg-split-button-close',
  }
);
