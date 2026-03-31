import { createVueWrapper } from '../create-wrapper.js';

export interface CgAccordionItem {
  label: string;
  value: string;
  content?: string;
  disabled?: boolean;
}

export interface CgAccordionProps {
  items?: CgAccordionItem[];
  multiple?: boolean;
  variant?: 'default' | 'bordered' | 'separated';
  defaultOpen?: string[];
}

export const CgAccordion = createVueWrapper(
  'cg-accordion',
  {
    items: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: false },
    variant: { type: String, default: 'default' },
    defaultOpen: { type: Array, default: () => [] },
  },
  {
    'change': 'cg-accordion-change',
  }
);
