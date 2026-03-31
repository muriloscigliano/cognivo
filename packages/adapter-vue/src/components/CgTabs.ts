import { createVueWrapper } from '../create-wrapper.js';

export interface CgTabItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: string;
}

export interface CgTabsProps {
  tabs?: CgTabItem[];
  value?: string;
  variant?: 'default' | 'pills' | 'underline';
}

export const CgTabs = createVueWrapper(
  'cg-tabs',
  {
    tabs: { type: Array, default: () => [] },
    value: { type: String, default: '' },
    variant: { type: String, default: 'underline' },
  },
  {
    'tab-change': 'cg-tab-change',
  }
);
