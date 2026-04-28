import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { defineRule } from '../../rules/define-rule';
import { definePack } from '../../rules/define-pack';
import { RuleEngine } from '../../rules/engine';
import { scan } from '../../observer/scan';

/**
 * Engine tests use minimal real rules (defined inline) over real DOM. This
 * exercises the full pipeline: register → applies → detect → hash → sort.
 */

describe('defineRule()', () => {
  it('returns the rule manifest as-is for valid input', () => {
    const rule = defineRule({
      id: 'test/example',
      title: 'Example',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: () => undefined,
      fixtures: [{ name: 'a', expect: 'no-finding' }],
    });
    expect(rule.id).toBe('test/example');
  });

  it('throws on missing id', () => {
    expect(() =>
      defineRule({
        // @ts-expect-error testing invalid input
        id: '',
        title: 'x',
        category: 'system-health',
        severity: 'consider',
        intentScope: [],
        cost: 'cheap',
        citations: [],
        defaultEnabled: true,
        fixCategory: 'codeable',
        applies: () => true,
        detect: () => undefined,
        fixtures: [{ name: 'a', expect: 'no-finding' }],
      })
    ).toThrow(/id/);
  });

  it('throws on empty fixtures array', () => {
    expect(() =>
      defineRule({
        id: 'test/x',
        title: 'x',
        category: 'system-health',
        severity: 'consider',
        intentScope: [],
        cost: 'cheap',
        citations: [],
        defaultEnabled: true,
        fixCategory: 'codeable',
        applies: () => true,
        detect: () => undefined,
        fixtures: [],
      })
    ).toThrow(/fixture/);
  });
});

describe('definePack()', () => {
  it('returns the pack as-is for valid input', () => {
    const pack = definePack({
      id: 'test-pack',
      version: '1.0.0',
      title: 'Test',
      intents: [],
      rules: [],
    });
    expect(pack.id).toBe('test-pack');
  });

  it('throws on missing version', () => {
    expect(() =>
      // @ts-expect-error testing invalid input
      definePack({ id: 'x', title: 'x', intents: [], rules: [] })
    ).toThrow(/version/);
  });
});

describe('RuleEngine', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('runs a simple rule and produces a Finding', () => {
    const rule = defineRule({
      id: 'test/has-button',
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
        const buttons = scene.find('button');
        return buttons.map((b) => ({
          targetNodeId: b.id,
          confidence: 90,
          message: `button found: ${b.text ?? ''}`,
          why: 'There is at least one button on the page.',
        }));
      },
      fixtures: [{ name: 'with-button', expect: 'finding' }],
    });

    const engine = new RuleEngine();
    engine.registerSync([rule]);

    document.body.innerHTML = '<button>Click me</button>';
    const graph = scan(document);
    const findings = engine.evaluate(graph, 'unknown');

    expect(findings).toHaveLength(1);
    expect(findings[0]!.ruleId).toBe('test/has-button');
    expect(findings[0]!.confidence).toBe(90);
    expect(findings[0]!.severity).toBe('consider');
  });

  it('skips rules whose applies() returns false', () => {
    const rule = defineRule({
      id: 'test/never-fires',
      title: 'Never',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => false,
      detect: () => [
        { targetNodeId: 'x', confidence: 100, message: 'should not appear', why: '' },
      ],
      fixtures: [{ name: 'a', expect: 'no-finding' }],
    });

    const engine = new RuleEngine();
    engine.registerSync([rule]);

    document.body.innerHTML = '<div></div>';
    const findings = engine.evaluate(scan(document), 'unknown');
    expect(findings).toHaveLength(0);
  });

  it('respects intentScope', () => {
    const pricingOnly = defineRule({
      id: 'test/pricing-only',
      title: 'Pricing only',
      category: 'persuasive-integrity',
      severity: 'consider',
      intentScope: ['pricing'],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: ({ scene }) => {
        const root = scene.raw.root;
        return [{ targetNodeId: root.id, confidence: 80, message: 'pricing rule fired', why: '' }];
      },
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const engine = new RuleEngine();
    engine.registerSync([pricingOnly]);

    document.body.innerHTML = '<div></div>';
    const graph = scan(document);

    expect(engine.evaluate(graph, 'pricing')).toHaveLength(1);
    expect(engine.evaluate(graph, 'checkout')).toHaveLength(0);
    expect(engine.evaluate(graph, 'unknown')).toHaveLength(0);
  });

  it('catches rule errors and continues evaluating other rules', () => {
    const broken = defineRule({
      id: 'test/broken',
      title: 'Broken',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => {
        throw new Error('boom');
      },
      detect: () => undefined,
      fixtures: [{ name: 'a', expect: 'no-finding' }],
    });

    const fine = defineRule({
      id: 'test/fine',
      title: 'Fine',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: ({ scene }) => scene.find('div').length > 0,
      detect: ({ scene }) => {
        const div = scene.first('div')!;
        return [{ targetNodeId: div.id, confidence: 70, message: 'div present', why: '' }];
      },
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const engine = new RuleEngine();
    engine.registerSync([broken, fine]);

    document.body.innerHTML = '<div></div>';
    const findings = engine.evaluate(scan(document), 'unknown');

    expect(findings).toHaveLength(1);
    expect(findings[0]!.ruleId).toBe('test/fine');
  });

  it('sorts findings: blockers first, then by confidence', () => {
    const blockerRule = defineRule({
      id: 'test/blocker',
      title: 'B',
      category: 'accessibility',
      severity: 'blocker',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: ({ scene }) => [
        { targetNodeId: scene.raw.root.id, confidence: 50, message: 'blocker', why: '' },
      ],
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const considerRule = defineRule({
      id: 'test/consider',
      title: 'C',
      category: 'accessibility',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: ({ scene }) => [
        { targetNodeId: scene.raw.root.id, confidence: 95, message: 'consider', why: '' },
      ],
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const engine = new RuleEngine();
    engine.registerSync([considerRule, blockerRule]);

    document.body.innerHTML = '<div></div>';
    const findings = engine.evaluate(scan(document), 'unknown');

    expect(findings[0]!.severity).toBe('blocker');
    expect(findings[1]!.severity).toBe('consider');
  });

  it('can disable rules via config overrides', () => {
    const rule = defineRule({
      id: 'test/disabled',
      title: 'D',
      category: 'system-health',
      severity: 'strong',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: ({ scene }) => [
        { targetNodeId: scene.raw.root.id, confidence: 80, message: 'fired', why: '' },
      ],
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const engine = new RuleEngine({
      ruleOverrides: { 'test/disabled': { enabled: false } },
    });
    engine.registerSync([rule]);

    document.body.innerHTML = '<div></div>';
    const findings = engine.evaluate(scan(document), 'unknown');
    expect(findings).toHaveLength(0);
  });

  it('costAllowlist filters out llm rules when not allowed', () => {
    const llmRule = defineRule({
      id: 'test/llm-rule',
      title: 'LLM',
      category: 'system-health',
      severity: 'strong',
      intentScope: [],
      cost: 'llm',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: ({ scene }) => [
        { targetNodeId: scene.raw.root.id, confidence: 80, message: 'expensive', why: '' },
      ],
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const engine = new RuleEngine({ costAllowlist: new Set(['cheap', 'medium']) });
    engine.registerSync([llmRule]);

    document.body.innerHTML = '<div></div>';
    const findings = engine.evaluate(scan(document), 'unknown');
    expect(findings).toHaveLength(0);
  });

  it('produces stable Finding ids across re-runs', () => {
    const rule = defineRule({
      id: 'test/stable',
      title: 'Stable',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: ({ scene }) => [
        { targetNodeId: scene.raw.root.id, confidence: 80, message: 'same message', why: '' },
      ],
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const engine = new RuleEngine();
    engine.registerSync([rule]);

    document.body.innerHTML = '<div></div>';
    const a = engine.evaluate(scan(document), 'unknown');
    const b = engine.evaluate(scan(document), 'unknown');

    expect(a[0]!.id).toBe(b[0]!.id);
  });
});
