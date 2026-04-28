import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { scan } from '../../observer';
import { classify } from '../../classifier';
import { defineRule } from '../../rules/define-rule';
import { RuleEngine } from '../../rules/engine';
import { computeLensScore } from '../../scorer';
import { definePersona } from '../../personas/define-persona';
import { FixVerifier } from '../../verifier';
import { startSpan } from '../../instrumentation/spans';

/**
 * Full-pipeline integration test (Spec §3.2 — verifies all six modules wire
 * together): Observer → Classifier → Rule Engine → Personas → Scorer → Verifier.
 *
 * Scenario: a Cognivo-style pricing page with three tiers. We define a tiny
 * rule pack with two rules:
 *   - cog/anchoring/weak-spread (strong, persuasive-integrity)
 *   - tokens/hardcoded-color (consider, system-health)
 *
 * The expected outcome:
 *   - classifier identifies the page as `pricing`
 *   - both rules fire, producing findings
 *   - scorer produces a sub-100 LensScore with breakdown
 *   - the same flow runs with a persona, producing a different score
 *   - the verifier validates a fix manifest cleanly
 */

describe('full pipeline — pricing page scenario', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('runs scan → classify → rules → score and produces a coherent LensScore', () => {
    document.body.innerHTML = `
      <main>
        <cg-pricing-card><h3>Basic</h3><p class="price">$9 per month</p></cg-pricing-card>
        <cg-pricing-card><h3>Pro</h3><p class="price">$11 per month</p></cg-pricing-card>
        <cg-pricing-card><h3>Team</h3><p class="price">$15 per month</p></cg-pricing-card>
      </main>
    `;

    const scanSpan = startSpan('scan');
    const graph = scan(document);
    const scanMs = scanSpan.end();
    expect(scanMs).toBeGreaterThanOrEqual(0);

    const classification = classify(graph);
    expect(classification.primary.intent).toBe('pricing');

    const anchoringRule = defineRule({
      id: 'cog/anchoring/weak-spread',
      title: 'Weak anchor on pricing',
      category: 'persuasive-integrity',
      severity: 'strong',
      intentScope: ['pricing'],
      cost: 'cheap',
      citations: ['anchoring-bias'],
      defaultEnabled: true,
      fixCategory: 'structural',
      applies: ({ scene, intent }) =>
        intent === 'pricing' && scene.find('cg-pricing-card').length >= 2,
      detect: ({ scene, helpers }) => {
        const cards = scene.find('cg-pricing-card');
        const prices = cards
          .map((card) => helpers.parsePrice(card.text))
          .filter((p): p is number => p !== null);
        if (prices.length < 2) return undefined;
        const ratio = Math.max(...prices) / Math.min(...prices);
        if (ratio < 1.8) {
          return [
            {
              targetNodeId: cards[0]!.id,
              confidence: 78,
              message: `Highest tier is ${ratio.toFixed(2)}× cheapest — anchor is weak.`,
              why: 'Industry benchmark for pricing anchoring is 2.5–4× spread.',
            },
          ];
        }
        return undefined;
      },
      fixtures: [{ name: 'flat-prices', expect: 'finding' }],
    });

    const tokenRule = defineRule({
      id: 'tokens/hardcoded-color',
      title: 'Hardcoded color',
      category: 'system-health',
      severity: 'consider',
      intentScope: [],
      cost: 'cheap',
      citations: [],
      defaultEnabled: true,
      fixCategory: 'codeable',
      applies: () => true,
      detect: ({ scene }) => [
        {
          targetNodeId: scene.raw.root.id,
          confidence: 60,
          message: 'Page-level token compliance check (synthetic).',
          why: 'Synthetic finding for the integration test.',
        },
      ],
      fixtures: [{ name: 'always', expect: 'finding' }],
    });

    const engine = new RuleEngine();
    engine.registerSync([anchoringRule, tokenRule]);

    const findings = engine.evaluate(graph, classification.primary.intent);
    expect(findings.length).toBeGreaterThanOrEqual(2);

    const ids = findings.map((f) => f.ruleId);
    expect(ids).toContain('cog/anchoring/weak-spread');
    expect(ids).toContain('tokens/hardcoded-color');

    // Severity sort: strong before consider
    expect(findings[0]!.severity).toBe('strong');

    const score = computeLensScore(findings, { engineVersion: '0.1.0-test' });
    expect(score.composite).toBeGreaterThan(0);
    expect(score.composite).toBeLessThan(100);

    expect(score.subScores['persuasive-integrity'].value).toBeLessThan(100);
    expect(score.subScores['system-health'].value).toBeLessThan(100);
    expect(score.engineVersion).toBe('0.1.0-test');
  });

  it('persona modulates the score', () => {
    document.body.innerHTML = `
      <main>
        <cg-pricing-card><p class="price">$9</p></cg-pricing-card>
        <cg-pricing-card><p class="price">$11</p></cg-pricing-card>
      </main>
    `;
    const graph = scan(document);
    const intent = classify(graph).primary.intent;

    const rule = defineRule({
      id: 'cog/anchoring/weak-spread',
      title: 'Weak anchor',
      category: 'persuasive-integrity',
      severity: 'strong',
      intentScope: ['pricing'],
      cost: 'cheap',
      citations: ['anchoring-bias'],
      defaultEnabled: true,
      fixCategory: 'structural',
      applies: ({ scene, intent: i }) =>
        i === 'pricing' && scene.find('cg-pricing-card').length >= 2,
      detect: ({ scene }) => {
        const card = scene.first('cg-pricing-card')!;
        return [
          {
            targetNodeId: card.id,
            confidence: 50,
            message: 'weak anchor',
            why: '',
          },
        ];
      },
      fixtures: [{ name: 'a', expect: 'finding' }],
    });

    const engine = new RuleEngine();
    engine.registerSync([rule]);
    const findings = engine.evaluate(graph, intent);

    const persona = definePersona({
      id: 'anxious-converter',
      title: 'Anxious converter',
      framing: 'A user under uncertainty is hyper-sensitive to weak anchoring.',
      evidenceLevel: 'directional',
      constraints: [],
      attention: { dwellSeconds: 30, scanPattern: 'spotlight', outOfFocusPenalty: 1.5 },
      ruleWeights: { 'cog/anchoring/weak-spread': 1.8 },
      activatesRules: [],
      citations: ['Cialdini 2006'],
    });

    const baseScore = computeLensScore(findings);
    const personaScore = computeLensScore(findings, { persona });

    // Persona amplifies the negative impact of the anchoring finding
    expect(personaScore.subScores['persuasive-integrity'].value).toBeLessThan(
      baseScore.subScores['persuasive-integrity'].value
    );
  });

  it('verifier accepts a clean fix manifest end-to-end', () => {
    const verifier = new FixVerifier();
    const verdict = verifier.verify({
      ruleId: 'tokens/hardcoded-color',
      findingId: 'finding-1',
      confidence: 90,
      origin: 'deterministic',
      changes: [
        {
          path: 'src/some.css',
          range: { startLine: 1, endLine: 1 },
          before: 'color: var(--cg-color-text-tertiary);',
          after: 'color: var(--cg-color-text-secondary);',
          rationale: 'Tier-2 semantic color is more stable.',
        },
      ],
      preview: {
        cssOverrides: ':host { color: var(--cg-color-text-secondary); }',
      },
      rollbackable: true,
      reviewRequired: false,
      citations: [],
    });

    expect(verdict.passed).toBe(true);
    const tokenCheck = verdict.results.find((r) => r.checkId === 'token-validity');
    expect(tokenCheck!.passed).toBe(true);
  });

  it('all data structures are structured-cloneable for postMessage', () => {
    document.body.innerHTML = `<main><cg-pricing-card><p>$9</p></cg-pricing-card></main>`;
    const graph = scan(document);
    const classification = classify(graph);

    expect(() => structuredClone(graph)).not.toThrow();
    expect(() => structuredClone(classification)).not.toThrow();
  });
});
