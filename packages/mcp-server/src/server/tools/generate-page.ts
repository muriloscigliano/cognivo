/**
 * MCP Tool: cognivo_generate_page
 *
 * Deterministic, rule-based page generator: keyword-matches the description
 * to a template, clones the tree, serializes to HTML, and returns the HTML +
 * tree + component list + embedded biases.
 *
 * No LLM calls. No randomness. Same input -> same output.
 */
import { z } from 'zod';

import {
  PAGE_TEMPLATES,
  type ComponentNode,
  type PageTemplateName,
  treeToHtml,
  collectTags,
  collectBiases,
  KNOWN_COMPONENT_SET,
  REQUIRED_PROPS,
  filterTreeByAllowlist,
  clampDepth,
} from './_shared.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const generatePageSchema = z.object({
  description: z
    .string()
    .min(1)
    .describe('Free-form description of the page, e.g. "A pricing page with 3 tiers".'),
  layout: z
    .enum(['stack', 'grid', 'split', 'hero'])
    .optional()
    .describe('Hint for the outer layout shape.'),
  darkMode: z
    .boolean()
    .optional()
    .describe('Tag the root with data-theme="dark".'),
  components: z
    .array(z.string())
    .optional()
    .describe('Allowlist of component tags to restrict the output to.'),
  maxDepth: z
    .number()
    .int()
    .min(1)
    .max(10)
    .optional()
    .default(6)
    .describe('Maximum tree height (1 = root only). Deeper children are dropped.'),
});

export type GeneratePageInput = z.infer<typeof generatePageSchema>;

export const generatePageOutputSchema = z.object({
  html: z.string(),
  tree: z.any(),
  components: z.array(z.string()),
  biases: z.array(z.string()),
  template: z.string(),
});

export type GeneratePageOutput = z.infer<typeof generatePageOutputSchema>;

// ─── Template routing ──────────────────────────────────────────────────────

const TEMPLATE_KEYWORDS: Array<{ name: PageTemplateName; keywords: RegExp }> = [
  { name: 'pricing', keywords: /\b(pricing|plans?|tiers?|subscription|billing)\b/i },
  { name: 'landing', keywords: /\b(landing|marketing|home[- ]?page|hero)\b/i },
  { name: 'dashboard', keywords: /\b(dashboard|analytics|metrics|kpi|overview|reporting)\b/i },
  { name: 'settings', keywords: /\b(settings|preferences|profile|account|config)\b/i },
  { name: 'chat', keywords: /\b(chat|messaging|conversation|assistant)\b/i },
  { name: 'onboarding', keywords: /\b(onboarding|welcome|getting[- ]started|setup|wizard)\b/i },
];

function pickTemplate(description: string): { name: string; node: ComponentNode } {
  for (const entry of TEMPLATE_KEYWORDS) {
    if (entry.keywords.test(description)) {
      return { name: entry.name, node: cloneTree(PAGE_TEMPLATES[entry.name]!) };
    }
  }
  // Generic fallback
  return {
    name: 'generic',
    node: {
      tag: 'cg-stack',
      props: { direction: 'column', gap: 'lg' },
      children: [
        {
          tag: 'cg-card',
          props: { variant: 'outlined', padding: 'lg' },
          children: [
            { tag: 'cg-text', props: { text: description, as: 'h1', size: '2xl', weight: 'bold' } },
            { tag: 'cg-text', props: { text: 'Generated with Cognivo.', color: 'muted' } },
          ],
        },
      ],
    },
  };
}

function cloneTree(node: ComponentNode): ComponentNode {
  return {
    tag: node.tag,
    ...(node.props ? { props: { ...node.props } } : {}),
    ...(node.text !== undefined ? { text: node.text } : {}),
    ...(node.children ? { children: node.children.map(cloneTree) } : {}),
  };
}

// ─── Validation ────────────────────────────────────────────────────────────

function validateTree(node: ComponentNode): void {
  if (!KNOWN_COMPONENT_SET.has(node.tag)) {
    throw new Error(`Template produced unknown tag: <${node.tag}>`);
  }
  const required = REQUIRED_PROPS[node.tag];
  if (required && required.length > 0) {
    const props = node.props ?? {};
    for (const r of required) {
      if (!(r in props)) {
        throw new Error(`Required prop "${r}" missing on <${node.tag}>`);
      }
    }
  }
  if (node.children) {
    for (const c of node.children) validateTree(c);
  }
}

// ─── Implementation ────────────────────────────────────────────────────────

export function generatePage(input: GeneratePageInput): GeneratePageOutput {
  const { name, node } = pickTemplate(input.description);

  // Apply allowlist if provided
  let tree = node;
  if (input.components && input.components.length > 0) {
    const allowed = new Set(input.components);
    const filtered = filterTreeByAllowlist(tree, allowed);
    if (filtered) tree = filtered;
  }

  // Clamp depth
  const maxDepth = input.maxDepth ?? 6;
  tree = clampDepth(tree, maxDepth);

  // Apply layout hint at the root (only if it's a stack)
  if (input.layout && tree.tag === 'cg-stack' && tree.props) {
    if (input.layout === 'hero' || input.layout === 'stack') {
      tree.props['direction'] = 'column';
    } else if (input.layout === 'grid') {
      tree.props['direction'] = 'row';
      tree.props['wrap'] = true;
    } else if (input.layout === 'split') {
      tree.props['direction'] = 'row';
    }
  }

  // Dark mode marker
  if (input.darkMode) {
    tree.props = { ...(tree.props ?? {}), 'data-theme': 'dark' };
  }

  // Validate against the known set + required props
  validateTree(tree);

  const html = treeToHtml(tree);
  const tags = [...collectTags(tree)].sort();
  const biases = collectBiases(tree).sort();

  return {
    html,
    tree,
    components: tags,
    biases,
    template: name,
  };
}
