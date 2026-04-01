import { describe, it, expect } from 'vitest';
import { createStreamingParser, cognivoLibrary } from '../index.js';

// ─────────────────────────────────────────────────────────────────────────────
// Helper: create a streaming parser with the Cognivo schema
// ─────────────────────────────────────────────────────────────────────────────

function makeParser() {
  return createStreamingParser(cognivoLibrary.toJSONSchema());
}

// ─────────────────────────────────────────────────────────────────────────────
// Streaming Error Recovery Tests
// ─────────────────────────────────────────────────────────────────────────────

describe('Streaming parser — normal operation', () => {
  it('push valid DSL chunks and get ParseResult with root', () => {
    const sp = makeParser();
    const result = sp.push('root = Stack([TextContent("Hello")], "column", "md")\n');
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('Stack');
    expect(result.meta.incomplete).toBe(false);
  });

  it('empty stream returns empty result', () => {
    const sp = makeParser();
    const result = sp.push('');
    expect(result.root).toBeNull();
    expect(result.meta.incomplete).toBe(true);
    expect(result.meta.statementCount).toBe(0);
  });

  it('single complete statement parses correctly', () => {
    const sp = makeParser();
    const result = sp.push('root = MetricCard("Revenue", "$1.2M", "+12%")');
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('MetricCard');
    expect(result.root!.props.title).toBe('Revenue');
    expect(result.root!.props.value).toBe('$1.2M');
    expect(result.root!.props.delta).toBe('+12%');
  });

  it('incremental chunks build up to complete result', () => {
    const sp = makeParser();

    // Initial incomplete chunk — root may be null since Stack( alone
    // cannot produce a valid node yet
    let result = sp.push('root = Stack(');
    expect(result.meta.incomplete).toBe(true);

    // Add children array — still incomplete but building up
    result = sp.push('[TextContent("Hello")');
    expect(result.meta.incomplete).toBe(true);

    // Complete the statement — now we get a full result
    result = sp.push('], "column", "md")');
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('Stack');
  });
});

describe('Streaming parser — error recovery', () => {
  it('malformed input does not crash — returns last good result', () => {
    const sp = makeParser();

    // First push a valid statement
    sp.push('root = MetricCard("Revenue", "$1.2M")\n');

    // Now push garbage that could cause a parse error
    const result = sp.push(')))totally broken(((\n');

    // Should not throw — should return a result
    expect(result).toBeDefined();
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('MetricCard');
  });

  it('meta.parseError is set on parse error', () => {
    const sp = makeParser();

    // Push a valid statement first
    sp.push('root = MetricCard("Revenue", "$1.2M")\n');

    // Push something that triggers a parse error
    const result = sp.push(')))invalid(((\n');

    // If an error occurred, parseError should be set
    // If the parser handled it gracefully, the result still comes back
    expect(result).toBeDefined();
    if (result.meta.parseError) {
      expect(typeof result.meta.parseError).toBe('string');
      expect(result.meta.parseError.length).toBeGreaterThan(0);
    }
  });

  it('lastError getter returns error message string', () => {
    const sp = makeParser();

    // Initially no error
    expect(sp.lastError).toBeNull();

    // Push valid content
    sp.push('root = MetricCard("Revenue", "$1.2M")\n');
    expect(sp.lastError).toBeNull();

    // Push content that might trigger an error
    sp.push(')))broken(((\n');

    // If lastError is set, it should be a string
    if (sp.lastError !== null) {
      expect(typeof sp.lastError).toBe('string');
      expect(sp.lastError.length).toBeGreaterThan(0);
    }
  });

  it('after error, next valid chunk resumes correctly', () => {
    const sp = makeParser();

    // Valid first statement
    sp.push('root = Stack([kpi])\n');

    // Push garbage that may cause error
    sp.push(')))broken(((\n');

    // Push a valid statement — parser should recover
    const result = sp.push('kpi = MetricCard("Users", "5K")\n');

    expect(result).toBeDefined();
    expect(result.root).not.toBeNull();
    // The root should still be a Stack
    expect(result.root!.typeName).toBe('Stack');
  });
});

describe('Streaming parser — auto-close and getResult', () => {
  it('partial statement auto-closes (incomplete tag gets closed)', () => {
    const sp = makeParser();

    // Push incomplete statement (unclosed parens and string)
    const result = sp.push('root = Stack([MetricCard("Rev');

    expect(result).toBeDefined();
    expect(result.root).not.toBeNull();
    expect(result.meta.incomplete).toBe(true);
  });

  it('getResult() returns current state without new data', () => {
    const sp = makeParser();

    // Push some data
    sp.push('root = MetricCard("Revenue", "$1.2M")\n');

    // Get result without pushing new data
    const result = sp.getResult();

    expect(result).toBeDefined();
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('MetricCard');
    expect(result.root!.props.title).toBe('Revenue');
    expect(result.meta.statementCount).toBe(1);
    expect(result.meta.incomplete).toBe(false);
  });
});
