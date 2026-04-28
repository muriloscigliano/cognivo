import type { Rule } from '../types/rule.js';

/**
 * Author a Rule. Currently identity (returns the manifest as-is) but reserves
 * a place for runtime schema validation later (Spec §4.1 — `defineRule()`
 * helper enforces fixture presence at type level via TS, and at runtime here
 * if needed).
 */
export function defineRule(rule: Rule): Rule {
  if (!rule.id || typeof rule.id !== 'string') {
    throw new Error('lens-core: defineRule() requires a non-empty string id.');
  }
  if (!Array.isArray(rule.fixtures) || rule.fixtures.length === 0) {
    throw new Error(
      `lens-core: defineRule(${rule.id}) requires at least one fixture (Spec §4.1).`
    );
  }
  if (!Array.isArray(rule.intentScope)) {
    throw new Error(
      `lens-core: defineRule(${rule.id}) requires an intentScope array.`
    );
  }
  if (typeof rule.applies !== 'function' || typeof rule.detect !== 'function') {
    throw new Error(
      `lens-core: defineRule(${rule.id}) requires applies() and detect() functions.`
    );
  }
  return rule;
}
