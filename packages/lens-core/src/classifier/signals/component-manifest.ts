import type { ClassifierSignal, PageIntent } from '../../types/classifier.js';
import type { SceneGraph } from '../../types/scene-graph.js';
import { walkAll } from '../../helpers/walk.js';

interface ComponentRule {
  intent: PageIntent;
  weight: number;
}

/**
 * Cognivo components map deterministically to intents — multiple `cg-pricing-card`
 * elements are an extremely strong pricing-page signal. Counts amplify the weight
 * up to a cap of 1.5× to avoid one component dominating.
 */
const COMPONENT_RULES: Record<string, ComponentRule> = {
  'cg-pricing-card': { intent: 'pricing', weight: 0.7 },
  'cg-stepper': { intent: 'onboarding', weight: 0.6 },
  'cg-onboarding': { intent: 'onboarding', weight: 0.7 },
  'ai-onboarding': { intent: 'onboarding', weight: 0.7 },
  'cg-data-table': { intent: 'dashboard', weight: 0.5 },
  'cg-toggle': { intent: 'settings', weight: 0.3 },
  'ai-empty-state': { intent: 'empty-state', weight: 0.7 },
  'cg-empty-state': { intent: 'empty-state', weight: 0.7 },
  'ai-error-boundary': { intent: 'error', weight: 0.6 },
};

export function extractComponentSignals(scene: SceneGraph): ClassifierSignal[] {
  const counts: Record<string, number> = {};
  for (const node of walkAll(scene)) {
    counts[node.tag] = (counts[node.tag] ?? 0) + 1;
  }

  const out: ClassifierSignal[] = [];
  for (const [tag, rule] of Object.entries(COMPONENT_RULES)) {
    const count = counts[tag] ?? 0;
    if (count > 0) {
      const amplifier = Math.min(count / 2, 1.5);
      out.push({
        source: 'component-manifest',
        intent: rule.intent,
        weight: rule.weight * Math.max(amplifier, 0.5),
        evidence: `${count}× <${tag}>`,
      });
    }
  }
  return out;
}
