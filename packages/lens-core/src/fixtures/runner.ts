import type { Rule } from '../types/rule.js';
import type { Finding } from '../types/findings.js';
import { scan } from '../observer/scan.js';
import { RuleEngine } from '../rules/engine.js';
import type { FixtureSpec } from './fixture-dsl.js';

export interface FixtureRunResult {
  fixture: FixtureSpec;
  passed: boolean;
  reason?: string;
  findings: Finding[];
}

/**
 * Run a single rule against a fixture and verify the expectation.
 *
 * Implementation note: assumes `document.body` is writable (browser test env
 * via vitest+happy-dom, or jsdom). For Node-only callers, wrap in a DOM env.
 */
export function runFixture(rule: Rule, spec: FixtureSpec): FixtureRunResult {
  const previous = document.body.innerHTML;
  let findings;
  try {
    document.body.innerHTML = spec.html;
    const root =
      document.body.firstElementChild instanceof Element
        ? document.body.firstElementChild
        : document.body;

    const graph = scan(root);
    const engine = new RuleEngine();
    engine.registerSync([rule]);
    findings = engine.evaluate(graph, spec.intent);
  } finally {
    document.body.innerHTML = previous;
  }

  const matching = findings.filter((f) => f.ruleId === spec.expectation.ruleId);

  if (spec.expectation.kind === 'no-finding') {
    if (matching.length === 0) return { fixture: spec, passed: true, findings };
    return {
      fixture: spec,
      passed: false,
      reason: `Expected no Finding from rule "${spec.expectation.ruleId}" but got ${matching.length}.`,
      findings,
    };
  }

  // expectation.kind === 'finding'
  if (matching.length === 0) {
    return {
      fixture: spec,
      passed: false,
      reason: `Expected a Finding from rule "${spec.expectation.ruleId}" but got 0.`,
      findings,
    };
  }

  if (spec.expectation.confidenceRange) {
    const range = spec.expectation.confidenceRange;
    const conf = matching[0]!.confidence;
    if (range.gte !== undefined && conf < range.gte) {
      return {
        fixture: spec,
        passed: false,
        reason: `Confidence ${conf} below minimum ${range.gte}.`,
        findings,
      };
    }
    if (range.lte !== undefined && conf > range.lte) {
      return {
        fixture: spec,
        passed: false,
        reason: `Confidence ${conf} above maximum ${range.lte}.`,
        findings,
      };
    }
  }

  return { fixture: spec, passed: true, findings };
}
