import { createWrapper } from '../create-wrapper.js';

export interface CgAccordionItem {
  label: string;
  value: string;
  content?: string;
  disabled?: boolean;
}

export interface CgAccordionProps {
  /** Accordion item definitions. */
  items?: CgAccordionItem[];
  /** Whether multiple items can be open simultaneously. */
  multiple?: boolean;
  /** Accordion visual variant. */
  variant?: 'default' | 'bordered' | 'separated';
  /** Values of items that should be open by default. */
  defaultOpen?: string[];
  /** Fired when an accordion item is toggled. */
  onChange?: (e: CustomEvent<{ value: string; open: boolean }>) => void;
  className?: string;
}

export const CgAccordion = createWrapper<CgAccordionProps>(
  'cg-accordion',
  ['items', 'multiple', 'variant', 'defaultOpen'],
  { onChange: 'cg-accordion-change' }
);
