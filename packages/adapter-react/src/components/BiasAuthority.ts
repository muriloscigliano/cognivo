import { createWrapper } from '../create-wrapper.js';

export interface BiasAuthorityProps {
  /** Endorsing authority / source name. */
  source?: string;
  /** Endorsement kind — drives icon and accent color. */
  kind?: 'verified' | 'endorsed' | 'certified' | 'featured';
  /** Optional icon override. */
  icon?: string;
  /** When set, renders the badge as an anchor to this URL. */
  href?: string;
  className?: string;
}

export const BiasAuthority = createWrapper<BiasAuthorityProps>(
  'bias-authority',
  ['source', 'kind', 'icon', 'href'],
  {}
);
