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
// Two separate sidebars: /components lists foundation components only,
// /ai lists AI-native components only. Each has its own routing so the
// page splits are clean and sidebars stay focused.
// Categories and items within are sorted alphabetically.
const byLabel = (a: { label: string }, b: { label: string }) =>
  a.label.localeCompare(b.label);

const isAiCategory = (id: string) => id.startsWith('ai-');
const isBiasCategory = (id: string) => id === 'bias';

function buildGroups(basePath: string, filter: (id: string) => boolean, stripTagPrefix?: string): SidebarGroup[] {
  return [...categories]
    .filter(cat => filter(cat.id))
    .sort(byLabel)
    .map(cat => {
      const items = registry
        .filter(c => c.category === cat.id)
        .map(c => {
          const slug = stripTagPrefix && c.tag.startsWith(stripTagPrefix)
            ? c.tag.slice(stripTagPrefix.length)
            : c.tag;
          return { label: c.name, href: `${basePath}/${slug}` };
        })
        .sort(byLabel);
      if (items.length === 0) return null;
      return { label: cat.label, items } as SidebarGroup;
    })
    .filter((g): g is SidebarGroup => g !== null);
}

const foundationGroups: SidebarGroup[] = buildGroups('/components', id => !isAiCategory(id) && !isBiasCategory(id));
const aiGroups: SidebarGroup[] = buildGroups('/ai', isAiCategory);
const biasGroups: SidebarGroup[] = buildGroups('/biases', isBiasCategory, 'bias-');

// ── Per-section sidebars ──
export const sidebars: Record<string, SidebarItem[]> = {
  '/getting-started': [
    { label: 'What\'s Different', href: '/getting-started#different' },
    { label: 'Installation', href: '/getting-started#installation' },
    { label: 'Quick Start', href: '/getting-started#quickstart' },
    { label: 'Dark Mode', href: '/getting-started#darkmode' },
    { label: 'Explore', href: '/getting-started#explore' },
  ],
  '/components': foundationGroups,
  '/ai': aiGroups,
  '/biases': biasGroups,
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
    { label: 'Color Palette', href: '/tokens/palette' },
    { label: 'New Tokens', href: '/tokens#new-tokens' },
    { label: 'Usage Example', href: '/tokens#usage' },
    { label: 'Naming Convention', href: '/tokens#naming' },
    { label: 'Enforcement', href: '/tokens#enforcement' },
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
  '/packages': [
    { label: 'Overview', href: '/packages' },
    {
      label: 'Packages',
      items: [
        { label: '@cognivo/ssr', href: '/packages/ssr' },
        { label: '@cognivo/theme-generator', href: '/packages/theme-generator' },
        { label: '@cognivo/analytics', href: '/packages/analytics' },
        { label: '@cognivo/mcp-server', href: '/packages/mcp-server' },
        { label: '@cognivo/eslint-plugin', href: '/packages/eslint-plugin' },
        { label: '@cognivo/claude-code-skill', href: '/packages/claude-code-skill' },
      ],
    },
  ],
  '/patterns': [
    { label: 'Overview', href: '/patterns' },
    { label: 'Social Proof & Trust', href: '/patterns/social-proof' },
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
    { label: 'SSR', href: '/frameworks#ssr' },
  ],
  '/accessibility': [
    { label: 'Principles', href: '/accessibility#principles' },
    { label: 'Built-in Features', href: '/accessibility#features' },
    { label: 'Keyboard Patterns', href: '/accessibility#keyboard' },
    { label: 'Focus Ring System', href: '/accessibility#focus' },
    { label: 'Reduced Motion', href: '/accessibility#motion' },
    { label: 'Dark Mode', href: '/accessibility#darkmode' },
    { label: 'Test Coverage', href: '/accessibility#coverage' },
    { label: 'Testing', href: '/accessibility#testing' },
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

export const sidebar = foundationGroups;
