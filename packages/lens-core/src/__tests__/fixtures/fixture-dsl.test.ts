import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, runFixture } from '../../fixtures';
import { defineRule } from '../../rules/define-rule';

describe('fixture() builder', () => {
  it('builds a no-finding spec', () => {
    const spec = fixture('a')
      .render('<div></div>')
      .withIntent('pricing')
      .expectNoFinding('rule/x');

    expect(spec.name).toBe('a');
    expect(spec.html).toBe('<div></div>');
    expect(spec.intent).toBe('pricing');
    expect(spec.expectation.kind).toBe('no-finding');
  });

  it('builds a finding spec with confidence range', () => {
    const spec = fixture('b')
      .render('<button></button>')
      .withIntent('pricing')
      .expectFinding({ ruleId: 'rule/y', confidenceRange: { gte: 60, lte: 90 } });

    expect(spec.expectation.kind).toBe('finding');
    if (spec.expectation.kind === 'finding') {
      expect(spec.expectation.confidenceRange).toEqual({ gte: 60, lte: 90 });
    }
  });

  it('throws on empty name', () => {
    expect(() => fixture('')).toThrow();
    expect(() => fixture('   ')).toThrow();
  });
});

describe('runFixture()', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('reports passed when expectation matches', () => {
    const rule = defineRule({
      id: 'test/needs-button',
      title: 'Has button',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: ({ scene }) => scene.find('button').length > 0,
      detect: ({ scene }) => {
        const b = scene.first('button')!;
        return [{ targetNodeId: b.id, confidence: 80, message: 'has button', why: '' }];
      },
      fixtures: [{ name: 'with-button', expect: 'finding' }],
    });

    const spec = fixture('with-button')
      .render('<button>x</button>')
      .withIntent('unknown')
      .expectFinding({ ruleId: 'test/needs-button' });

    const result = runFixture(rule, spec);
    expect(result.passed).toBe(true);
  });

  it('reports failed when expecting a finding but none produced', () => {
    const rule = defineRule({
      id: 'test/never',
      title: 'Never fires',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => false,
      detect: () => undefined,
      fixtures: [{ name: 'a', expect: 'no-finding' }],
    });

    const spec = fixture('expects-but-none')
      .render('<div></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: 'test/never' });

    const result = runFixture(rule, spec);
    expect(result.passed).toBe(false);
    expect(result.reason).toMatch(/Expected a Finding/);
  });

  it('reports failed when expecting no finding but one fired', () => {
    const rule = defineRule({
      id: 'test/always',
      title: 'Always fires',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: ({ scene }) => [
        { targetNodeId: scene.raw.root.id, confidence: 90, message: 'fired', why: '' },
      ],
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const spec = fixture('expects-none-but-fires')
      .render('<div></div>')
      .withIntent('unknown')
      .expectNoFinding('test/always');

    const result = runFixture(rule, spec);
    expect(result.passed).toBe(false);
    expect(result.reason).toMatch(/Expected no Finding/);
  });

  it('verifies confidence range', () => {
    const rule = defineRule({
      id: 'test/conf',
      title: 'Conf',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: ({ scene }) => [
        { targetNodeId: scene.raw.root.id, confidence: 50, message: 'x', why: '' },
      ],
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const spec = fixture('range-too-low')
      .render('<div></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: 'test/conf', confidenceRange: { gte: 80 } });

    const result = runFixture(rule, spec);
    expect(result.passed).toBe(false);
    expect(result.reason).toMatch(/Confidence/);
  });
});
