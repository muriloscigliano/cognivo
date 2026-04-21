import { createVueWrapper } from '../create-wrapper.js';

export interface BiasAuthorityProps {
  source?: string;
  kind?: 'verified' | 'endorsed' | 'certified' | 'featured';
  icon?: string;
  href?: string;
}

export const BiasAuthority = createVueWrapper(
  'bias-authority',
  {
    source: { type: String, default: '' },
    kind: { type: String, default: 'verified' },
    icon: { type: String, default: '' },
    href: { type: String, default: '' },
  },
  {}
);
