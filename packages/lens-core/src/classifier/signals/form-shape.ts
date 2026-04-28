import type { ClassifierSignal } from '../../types/classifier.js';
import type { SceneGraph, SceneNode } from '../../types/scene-graph.js';
import { walkAll } from '../../helpers/walk.js';

/**
 * Form-shape heuristics — the strongest signal for signin/signup/checkout pages.
 *
 * Rules:
 *  - email + password (no name) → signin (0.7)
 *  - email + password + (name OR confirm-password) → signup (0.7)
 *  - billing-address + total → checkout (0.8)
 *  - generic form with no shape match → form (0.3)
 */
export function extractFormShapeSignals(scene: SceneGraph): ClassifierSignal[] {
  const inputs: SceneNode[] = [];
  let hasFormElement = false;
  for (const node of walkAll(scene)) {
    if (node.tag === 'form') hasFormElement = true;
    if (node.tag === 'input' || node.tag === 'cg-input') inputs.push(node);
  }

  const out: ClassifierSignal[] = [];

  const types = inputs.map((i) => i.attributes['type'] ?? 'text');
  const names = inputs
    .map((i) => (i.attributes['name'] ?? '').toLowerCase())
    .filter(Boolean);
  const placeholders = inputs
    .map((i) => (i.attributes['placeholder'] ?? '').toLowerCase())
    .filter(Boolean);

  const hasEmail = types.includes('email') || names.some((n) => n.includes('email'));
  const hasPassword =
    types.includes('password') || names.some((n) => n.includes('password'));
  const passwordCount =
    types.filter((t) => t === 'password').length ||
    names.filter((n) => n.includes('password')).length;
  const hasName =
    names.some((n) => n === 'name' || n.includes('first') || n.includes('last')) ||
    placeholders.some((p) => /\b(?:full ?name|first name|last name)\b/.test(p));

  if (hasEmail && hasPassword) {
    if (hasName || passwordCount >= 2) {
      out.push({
        source: 'form-shape',
        intent: 'signup',
        weight: 0.75,
        evidence: 'email + password + name/confirm fields',
      });
    } else {
      out.push({
        source: 'form-shape',
        intent: 'signin',
        weight: 0.75,
        evidence: 'email + password fields',
      });
    }
  }

  const hasBilling =
    names.some((n) => /(billing|address|postal|zip|card|cvv)/.test(n)) ||
    placeholders.some((p) => /(billing|address|card number|cvv)/.test(p));
  if (hasBilling) {
    out.push({
      source: 'form-shape',
      intent: 'checkout',
      weight: 0.7,
      evidence: 'billing/address fields detected',
    });
  }

  // Generic form fallback — only if no specific shape matched and we *do* have a form.
  if (out.length === 0 && hasFormElement && inputs.length >= 2) {
    out.push({
      source: 'form-shape',
      intent: 'form',
      weight: 0.4,
      evidence: `generic form with ${inputs.length} inputs`,
    });
  }

  return out;
}
