import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { defineComponent, createLibrary } from '../registry.js';
import { createParser } from '../parser/index.js';
import { validateTokenUsage } from '../validation/token-validator.js';

// ─────────────────────────────────────────────────────────────────────────────
// Define test components (Web Component-native)
// ─────────────────────────────────────────────────────────────────────────────

const Badge = defineComponent({
  name: 'Badge',
  tagName: 'ai-badge',
  props: z.object({
    label: z.string(),
    variant: z.enum(['success', 'warning', 'danger', 'neutral']).optional(),
  }),
  description: 'Displays a status badge with semantic variants',
});

const InsightCard = defineComponent({
  name: 'InsightCard',
  tagName: 'ai-insight-card',
  props: z.object({
    title: z.string(),
    description: z.string(),
    confidence: z.number().optional(),
    variant: z.enum(['positive', 'negative', 'neutral']).optional(),
  }),
  description: 'Displays an AI-generated insight with confidence level',
  biasHints: ['anchoring-bias', 'framing-effect'],
});

const Stack = defineComponent({
  name: 'Stack',
  tagName: 'cg-stack',
  props: z.object({
    children: z.array(z.any()),
    direction: z.enum(['row', 'column']).optional(),
    gap: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  }),
  description: 'Flex container for layout composition',
});

const MetricCard = defineComponent({
  name: 'MetricCard',
  tagName: 'cg-metric-card',
  props: z.object({
    title: z.string(),
    value: z.string(),
    delta: z.string().optional(),
  }),
  description: 'Displays a KPI metric with optional delta indicator',
  biasHints: ['anchoring-bias'],
});

// ─────────────────────────────────────────────────────────────────────────────
// defineComponent
// ─────────────────────────────────────────────────────────────────────────────

describe('defineComponent()', () => {
  it('returns a ComponentDefinition with name and tagName', () => {
    expect(Badge.name).toBe('Badge');
    expect(Badge.tagName).toBe('ai-badge');
  });

  it('provides a .ref for parent schemas', () => {
    expect(Badge.ref).toBeDefined();
  });

  it('preserves biasHints', () => {
    expect(InsightCard.biasHints).toEqual(['anchoring-bias', 'framing-effect']);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// createLibrary
// ─────────────────────────────────────────────────────────────────────────────

describe('createLibrary()', () => {
  const library = createLibrary({
    components: [Badge, InsightCard, Stack, MetricCard],
    root: 'Stack',
    componentGroups: [
      { name: 'Layout', components: ['Stack'] },
      { name: 'Display', components: ['Badge', 'InsightCard', 'MetricCard'] },
    ],
  });

  it('creates a library with all components', () => {
    expect(Object.keys(library.components)).toHaveLength(4);
    expect(library.components['Badge']).toBeDefined();
    expect(library.components['InsightCard']).toBeDefined();
  });

  it('sets the root component', () => {
    expect(library.root).toBe('Stack');
  });

  it('throws on invalid root', () => {
    expect(() =>
      createLibrary({ components: [Badge], root: 'NonExistent' }),
    ).toThrow('Root component "NonExistent" was not found');
  });

  it('generates a JSON Schema with $defs', () => {
    const schema = library.toJSONSchema();
    expect(schema.$defs).toBeDefined();
    expect(Object.keys(schema.$defs!).length).toBeGreaterThan(0);
  });

  it('getTagName returns the custom element tag', () => {
    expect(library.getTagName('Badge')).toBe('ai-badge');
    expect(library.getTagName('InsightCard')).toBe('ai-insight-card');
    expect(library.getTagName('Unknown')).toBeUndefined();
  });

  // ─── Prompt generation ─────────────────────────────────────────────────────

  describe('prompt()', () => {
    it('generates a prompt with component signatures', () => {
      const prompt = library.prompt();
      expect(prompt).toContain('Badge(');
      expect(prompt).toContain('InsightCard(');
      expect(prompt).toContain('Stack(');
      expect(prompt).toContain('MetricCard(');
    });

    it('includes syntax rules', () => {
      const prompt = library.prompt();
      expect(prompt).toContain('Syntax Rules');
      expect(prompt).toContain('root = Stack(');
    });

    it('includes streaming rules', () => {
      const prompt = library.prompt();
      expect(prompt).toContain('Hoisting & Streaming');
    });

    it('includes design token governance by default', () => {
      const prompt = library.prompt();
      expect(prompt).toContain('Design Token Rules');
      expect(prompt).toContain('--cg-');
    });

    it('can disable token governance', () => {
      const prompt = library.prompt({ tokenGovernance: false });
      expect(prompt).not.toContain('Design Token Rules');
    });

    it('includes cognitive bias guidance when components have biasHints', () => {
      const prompt = library.prompt();
      expect(prompt).toContain('Cognitive Design Principles');
      expect(prompt).toContain('Anchoring Bias');
      expect(prompt).toContain('Framing Effect');
    });

    it('includes component groups', () => {
      const prompt = library.prompt();
      expect(prompt).toContain('### Layout');
      expect(prompt).toContain('### Display');
    });

    it('includes descriptions', () => {
      const prompt = library.prompt();
      expect(prompt).toContain('Displays a status badge');
      expect(prompt).toContain('AI-generated insight');
    });

    it('includes type annotations', () => {
      const prompt = library.prompt();
      // Badge variant should show enum values
      expect(prompt).toMatch(/"success"\s*\|\s*"warning"/);
    });

    it('supports custom preamble', () => {
      const prompt = library.prompt({ preamble: 'Custom preamble here' });
      expect(prompt).toContain('Custom preamble here');
    });

    it('supports additional rules', () => {
      const prompt = library.prompt({ additionalRules: ['Always use dark mode'] });
      expect(prompt).toContain('Always use dark mode');
    });

    it('supports examples', () => {
      const prompt = library.prompt({
        examples: ['root = Stack([Badge("Active", "success")])'],
      });
      expect(prompt).toContain('root = Stack([Badge("Active", "success")])');
    });
  });

  // ─── End-to-end: schema → parser → parsed result ──────────────────────────

  describe('end-to-end: library schema → parser', () => {
    const parser = createParser(library.toJSONSchema());

    it('parses generated output with correct prop mapping', () => {
      const result = parser.parse(`root = Stack([card1, card2])
card1 = MetricCard("Revenue", "$1.2M", "+12%")
card2 = MetricCard("Users", "5,432", "+8%")`);

      expect(result.root).not.toBeNull();
      expect(result.root!.typeName).toBe('Stack');

      const children = result.root!.props.children as unknown[];
      expect(children).toHaveLength(2);
    });

    it('maps badge props correctly', () => {
      const result = parser.parse('root = Badge("Active", "success")');
      expect(result.root!.props.label).toBe('Active');
      expect(result.root!.props.variant).toBe('success');
    });

    it('maps insight card props correctly', () => {
      const result = parser.parse('root = InsightCard("Revenue Up", "Revenue increased by 12%", 0.95, "positive")');
      expect(result.root!.props.title).toBe('Revenue Up');
      expect(result.root!.props.description).toBe('Revenue increased by 12%');
      expect(result.root!.props.confidence).toBe(0.95);
      expect(result.root!.props.variant).toBe('positive');
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Token validation
// ─────────────────────────────────────────────────────────────────────────────

describe('validateTokenUsage()', () => {
  it('returns empty for null root', () => {
    expect(validateTokenUsage(null)).toEqual([]);
  });

  it('detects hex color violations', () => {
    const violations = validateTokenUsage({
      type: 'element',
      typeName: 'Card',
      props: { backgroundColor: '#ff0000' },
      partial: false,
    });
    expect(violations).toHaveLength(1);
    expect(violations[0]!.prop).toBe('backgroundColor');
    expect(violations[0]!.suggestion).toContain('--cg-');
  });

  it('detects pixel value violations', () => {
    const violations = validateTokenUsage({
      type: 'element',
      typeName: 'Box',
      props: { padding: '16px' },
      partial: false,
    });
    expect(violations).toHaveLength(1);
    expect(violations[0]!.suggestion).toContain('--cg-spacing');
  });

  it('detects raw font violations', () => {
    const violations = validateTokenUsage({
      type: 'element',
      typeName: 'Text',
      props: { fontFamily: 'Arial, sans-serif' },
      partial: false,
    });
    expect(violations).toHaveLength(1);
    expect(violations[0]!.suggestion).toContain('--cg-font');
  });

  it('allows non-visual props with any value', () => {
    const violations = validateTokenUsage({
      type: 'element',
      typeName: 'Card',
      props: { title: '#ff0000', description: '16px matters' },
      partial: false,
    });
    expect(violations).toEqual([]);
  });

  it('allows semantic variant strings', () => {
    const violations = validateTokenUsage({
      type: 'element',
      typeName: 'Badge',
      props: { color: 'primary' },
      partial: false,
    });
    expect(violations).toEqual([]);
  });
});
