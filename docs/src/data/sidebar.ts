/**
 * Sidebar navigation structure for docs site.
 * Component items are auto-generated from the showcase registry.
 */
import { registry, categories } from './components';

export interface SidebarLink {
  label: string;
  href: string;
}

export interface SidebarGroup {
  label: string;
  href?: string;
  collapsed?: boolean;
  items: (SidebarLink | SidebarGroup)[];
}

export type SidebarItem = SidebarLink | SidebarGroup;

// Build component groups from registry
const componentGroups: SidebarGroup[] = categories
  .map(cat => {
    const items = registry.filter(c => c.category === cat.id);
    if (items.length === 0) return null;
    return {
      label: cat.label,
      collapsed: true,
      items: items.map(c => ({ label: c.name, href: `/components/${c.tag}` })),
    };
  })
  .filter((g): g is SidebarGroup => g !== null);

export const sidebar: SidebarItem[] = [
  { label: 'Getting Started', href: '/getting-started' },
  {
    label: 'Components',
    href: '/components',
    items: componentGroups,
  },
  { label: 'Design Tokens', href: '/tokens' },
  { label: 'Core API', href: '/core' },
  { label: 'Patterns', href: '/patterns' },
  { label: 'Frameworks', href: '/frameworks' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Design Advisor', href: '/design-advisor' },
  { label: 'Biases', href: '/biases' },
];
