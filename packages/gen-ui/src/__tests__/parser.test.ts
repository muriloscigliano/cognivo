import { describe, it, expect } from 'vitest';
import { parse, createParser, createStreamingParser } from '../parser/index.js';
import type { LibraryJSONSchema, ParseResult } from '../types.js';

// ─────────────────────────────────────────────────────────────────────────────
// Helper: a small schema for testing
// ─────────────────────────────────────────────────────────────────────────────

const testSchema: LibraryJSONSchema = {
  $defs: {
    Stack: {
      properties: { children: {}, direction: {}, gap: {} },
      required: ['children'],
    },
    TextContent: {
      properties: { text: {}, size: {} },
      required: ['text'],
    },
    Badge: {
      properties: { label: {}, variant: {} },
      required: ['label'],
    },
    Card: {
      properties: { children: {}, title: {} },
      required: ['children'],
    },
    Table: {
      properties: { columns: {}, rows: {} },
      required: ['columns', 'rows'],
    },
    MetricCard: {
      properties: { title: {}, value: {}, delta: {} },
      required: ['title', 'value'],
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Basic parsing (no schema)
// ─────────────────────────────────────────────────────────────────────────────

describe('parse() — no schema', () => {
  it('returns empty result for empty input', () => {
    const result = parse('');
    expect(result.root).toBeNull();
    expect(result.meta.incomplete).toBe(true);
  });

  it('parses a single component call', () => {
    const result = parse('root = Badge("Active", "success")');
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('Badge');
    expect(result.root!.props._args).toEqual(['Active', 'success']);
    expect(result.root!.partial).toBe(false);
  });

  it('parses string, number, boolean, null literals', () => {
    const result = parse('root = Card("hello", 42, true, false, null)');
    expect(result.root!.props._args).toEqual(['hello', 42, true, false, null]);
  });

  it('parses arrays', () => {
    const result = parse('root = Stack([Badge("A"), Badge("B")])');
    expect(result.root!.typeName).toBe('Stack');
    const args = result.root!.props._args as unknown[];
    expect(args).toHaveLength(1);
    expect(Array.isArray(args[0])).toBe(true);
  });

  it('parses objects', () => {
    const result = parse('root = Card({title: "Hello", count: 5})');
    expect(result.root!.props._args).toEqual([{ title: 'Hello', count: 5 }]);
  });

  it('parses negative numbers', () => {
    const result = parse('root = MetricCard("Revenue", -42.5)');
    expect(result.root!.props._args).toEqual(['Revenue', -42.5]);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Hoisting (references before definitions)
// ─────────────────────────────────────────────────────────────────────────────

describe('hoisting', () => {
  it('resolves forward references', () => {
    const input = `root = Stack([title, badge])
title = TextContent("Hello")
badge = Badge("Active")`;
    const result = parse(input);
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('Stack');
    expect(result.meta.unresolved).toEqual([]);
  });

  it('resolves backward references', () => {
    const input = `title = TextContent("Hello")
badge = Badge("Active")
root = Stack([title, badge])`;
    const result = parse(input);
    // First statement is used as root
    expect(result.root!.typeName).toBe('TextContent');
  });

  it('reports unresolved references', () => {
    const input = `root = Stack([missing_ref])`;
    const result = parse(input);
    expect(result.meta.unresolved).toContain('missing_ref');
  });

  it('handles circular references gracefully', () => {
    const input = `a = Stack([b])
b = Stack([a])`;
    const result = parse(input);
    // Should not infinite loop
    expect(result.meta.unresolved.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Schema-based parsing (positional → named props)
// ─────────────────────────────────────────────────────────────────────────────

describe('createParser() — with schema', () => {
  const parser = createParser(testSchema);

  it('maps positional args to named props', () => {
    const result = parser.parse('root = Badge("Active", "success")');
    expect(result.root).not.toBeNull();
    expect(result.root!.props.label).toBe('Active');
    expect(result.root!.props.variant).toBe('success');
  });

  it('validates required props', () => {
    const result = parser.parse('root = MetricCard("Revenue")');
    // MetricCard requires title AND value — only title provided
    expect(result.root).toBeNull();
    expect(result.meta.validationErrors.length).toBeGreaterThan(0);
    expect(result.meta.validationErrors[0]!.component).toBe('MetricCard');
  });

  it('handles complete component with all props', () => {
    const result = parser.parse('root = MetricCard("Revenue", "$1.2M", "+12%")');
    expect(result.root).not.toBeNull();
    expect(result.root!.props.title).toBe('Revenue');
    expect(result.root!.props.value).toBe('$1.2M');
    expect(result.root!.props.delta).toBe('+12%');
  });

  it('handles nested components with schema', () => {
    const input = `root = Stack([card1, card2])
card1 = MetricCard("Revenue", "$1.2M")
card2 = MetricCard("Users", "5,432")`;
    const result = parser.parse(input);
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('Stack');

    const children = result.root!.props.children as unknown[];
    expect(children).toHaveLength(2);
  });

  it('parses a realistic dashboard example', () => {
    const input = `root = Stack([header, kpis])
header = TextContent("Product Analytics", "large")
kpis = Stack([kpi1, kpi2, kpi3], "row")
kpi1 = MetricCard("Revenue", "$1.2M", "+12%")
kpi2 = MetricCard("Users", "5,432", "+8%")
kpi3 = MetricCard("Churn", "2.1%", "-0.3%")`;
    const result = parser.parse(input);
    expect(result.root).not.toBeNull();
    expect(result.meta.incomplete).toBe(false);
    expect(result.meta.validationErrors).toEqual([]);
    expect(result.meta.statementCount).toBe(6);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Auto-close (streaming incomplete input)
// ─────────────────────────────────────────────────────────────────────────────

describe('auto-close', () => {
  it('handles unclosed string', () => {
    const result = parse('root = TextContent("Hello worl');
    expect(result.root).not.toBeNull();
    expect(result.meta.incomplete).toBe(true);
  });

  it('handles unclosed brackets', () => {
    const result = parse('root = Stack([Badge("A"), Badge("B"');
    expect(result.root).not.toBeNull();
    expect(result.meta.incomplete).toBe(true);
  });

  it('handles complete input correctly', () => {
    const result = parse('root = Badge("Done")');
    expect(result.meta.incomplete).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Streaming parser
// ─────────────────────────────────────────────────────────────────────────────

describe('createStreamingParser()', () => {
  it('progressively builds the result', () => {
    const sp = createStreamingParser(testSchema);

    // First chunk: just the root reference
    let result = sp.push('root = Stack([title');
    expect(result.root).not.toBeNull();
    expect(result.meta.incomplete).toBe(true);

    // Complete the first statement
    result = sp.push('])\n');
    expect(result.root).not.toBeNull();

    // Add the referenced component
    result = sp.push('title = TextContent("Hello", "large")');
    expect(result.root).not.toBeNull();
    expect(result.meta.unresolved).toEqual([]);
  });

  it('caches completed statements', () => {
    const sp = createStreamingParser(testSchema);

    sp.push('root = Stack([kpi])\n');
    sp.push('kpi = MetricCard("Rev", "$1M")\n');

    const result = sp.getResult();
    expect(result.root).not.toBeNull();
    expect(result.meta.statementCount).toBe(2);
    expect(result.meta.incomplete).toBe(false);
  });

  it('handles multiple chunks building one statement', () => {
    const sp = createStreamingParser(testSchema);

    // "root = Metric" parses as reference to unresolved "Metric" → root is null
    let result = sp.push('root = Metric');
    expect(result.root).toBeNull();

    // Adding 'Card("Revenue"' re-parses as incomplete MetricCard call
    result = sp.push('Card("Revenue"');
    expect(result.meta.incomplete).toBe(true);

    // Completing the statement
    result = sp.push(', "$1.2M")');
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('MetricCard');
    expect(result.root!.props.title).toBe('Revenue');
    expect(result.root!.props.value).toBe('$1.2M');
  });

  it('simulates realistic streaming scenario', () => {
    const sp = createStreamingParser(testSchema);
    const chunks = [
      'root = Stack([header, ',
      'kpis])\n',
      'header = TextContent("Dashboard"',
      ', "large")\n',
      'kpis = Stack([kpi1, kpi2], "row")\n',
      'kpi1 = MetricCard("Revenue", "$1.2M", "+12%")\n',
      'kpi2 = MetricCard("Users", "5K", "+8%")',
    ];

    let result: ParseResult = { root: null, meta: { incomplete: true, unresolved: [], statementCount: 0, validationErrors: [], tokenViolations: [] } };
    for (const chunk of chunks) {
      result = sp.push(chunk);
    }

    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('Stack');
    expect(result.meta.statementCount).toBe(5);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Edge cases
// ─────────────────────────────────────────────────────────────────────────────

describe('edge cases', () => {
  it('handles escaped strings', () => {
    const result = parse('root = TextContent("Hello \\"world\\"")');
    expect(result.root).not.toBeNull();
    expect(result.root!.props._args).toEqual(['Hello "world"']);
  });

  it('handles newlines inside strings', () => {
    const result = parse('root = TextContent("line1\\nline2")');
    expect(result.root).not.toBeNull();
    expect(result.root!.props._args).toEqual(['line1\nline2']);
  });

  it('handles empty arrays', () => {
    const result = parse('root = Stack([])');
    expect(result.root!.props._args).toEqual([[]]);
  });

  it('handles empty objects', () => {
    const result = parse('root = Card({})');
    expect(result.root!.props._args).toEqual([{}]);
  });

  it('skips invalid lines gracefully', () => {
    const input = `root = Badge("OK")
this is garbage
valid = TextContent("Yes")`;
    const result = parse(input);
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('Badge');
  });

  it('handles PascalCase references (not calls)', () => {
    const input = `root = Stack([MyRef])
MyRef = Badge("Hello")`;
    const result = parse(input);
    expect(result.root).not.toBeNull();
  });
});
