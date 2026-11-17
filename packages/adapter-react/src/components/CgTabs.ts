import { createWrapper } from '../create-wrapper.js';

export interface CgTabItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: string;
}

export interface CgTabsProps {
  /** Tab definitions. */
  tabs?: CgTabItem[];
  /** Currently active tab value. */
  value?: string;
  /** Tabs visual variant. */
  variant?: 'default' | 'pills' | 'underline';
  /** Fired when the active tab changes. */
  onTabChange?: (e: CustomEvent<{ value: string }>) => void;
  className?: string;
}

export const CgTabs = /* @__PURE__ */ createWrapper<CgTabsProps, 'cg-tabs'>(
  'cg-tabs',
  ['tabs', 'value', 'variant'],
  { onTabChange: 'cg-tab-change' }
);
