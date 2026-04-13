/**
 * Sidebar navigation — contextual per section.
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

// ── Components sidebar ──
const componentGroups: SidebarGroup[] = categories
  .map(cat => {
    const items = registry.filter(c => c.category === cat.id);
    if (items.length === 0) return null;
    return {
      label: cat.label,
      items: items.map(c => ({ label: c.name, href: `/components/${c.tag}` })),
    };
  })
  .filter((g): g is SidebarGroup => g !== null);

// ── Per-section sidebars ──
export const sidebars: Record<string, SidebarItem[]> = {
  '/getting-started': [
    { label: 'What\'s Different', href: '/getting-started#different' },
    { label: 'Installation', href: '/getting-started#installation' },
    { label: 'Quick Start', href: '/getting-started#quickstart' },
    { label: 'Dark Mode', href: '/getting-started#darkmode' },
    { label: 'Explore', href: '/getting-started#explore' },
  ],
  '/components': componentGroups,
  '/tokens': [
    { label: 'Installation', href: '/tokens#installation' },
    { label: 'Dark Mode', href: '/tokens#darkmode' },
    { label: 'Token Breakdown', href: '/tokens#breakdown' },
    { label: '3-Tier Architecture', href: '/tokens#tiers' },
    { label: 'Spacing Scale', href: '/tokens#spacing' },
    { label: 'Typography', href: '/tokens#typography' },
    { label: 'Elevation', href: '/tokens#elevation' },
    { label: 'Motion', href: '/tokens#motion' },
    { label: 'AI State Tokens', href: '/tokens#ai-tokens' },
    { label: 'Color Palette', href: '/tokens#palette' },
    { label: 'New Tokens', href: '/tokens#new-tokens' },
    { label: 'Usage Example', href: '/tokens#usage' },
    { label: 'Naming Convention', href: '/tokens#naming' },
  ],
  '/core': [
    { label: 'Installation', href: '/core#installation' },
    { label: 'AiClient Interface', href: '/core#client' },
    { label: 'Intents', href: '/core#intents' },
    { label: 'Context Building', href: '/core#context' },
    { label: 'Result Types', href: '/core#results' },
    { label: 'Decorator Pattern', href: '/core#decorators' },
    { label: 'Key Exports', href: '/core#exports' },
  ],
  '/patterns': [
    { label: 'Overview', href: '/patterns' },
    { label: 'Guardrails', href: '/patterns#p0' },
    { label: 'Fallback', href: '/patterns#p1' },
    { label: 'Caching', href: '/patterns#p2' },
    { label: 'Semantic Cache', href: '/patterns#p3' },
    { label: 'Model Routing', href: '/patterns#p4' },
    { label: 'Conversation', href: '/patterns#p5' },
    { label: 'Circuit Breaker', href: '/patterns#p6' },
    { label: 'Self-Refine', href: '/patterns#p7' },
    { label: 'Extended Thinking', href: '/patterns#p8' },
    { label: 'Prompt Optimization', href: '/patterns#p9' },
    { label: 'Agent Coordination', href: '/patterns#p10' },
    { label: 'Observability', href: '/patterns#p11' },
  ],
  '/frameworks': [
    { label: 'Overview', href: '/frameworks' },
    { label: 'Vanilla HTML', href: '/frameworks#vanilla' },
    { label: 'React', href: '/frameworks#react' },
    { label: 'Vue', href: '/frameworks#vue' },
    { label: 'Svelte / Angular / Solid', href: '/frameworks#svelte' },
  ],
  '/accessibility': [
    { label: 'Overview', href: '/accessibility' },
  ],
  '/design-advisor': [
    { label: 'Why Psychology?', href: '/design-advisor#why' },
    { label: '7 Bias Categories', href: '/design-advisor#categories' },
    { label: 'How It Works', href: '/design-advisor#how' },
    { label: 'Bias Card Structure', href: '/design-advisor#structure' },
    { label: 'Real-World Examples', href: '/design-advisor#examples' },
    { label: 'Installation & API', href: '/design-advisor#api' },
    { label: 'Web Components', href: '/design-advisor#components' },
    { label: 'Ethical Framework', href: '/design-advisor#ethics' },
  ],
};

export const sidebar = componentGroups;
