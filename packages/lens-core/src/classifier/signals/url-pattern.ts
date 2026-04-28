import type { ClassifierSignal, PageIntent } from '../../types/classifier.js';
import type { SceneGraph } from '../../types/scene-graph.js';

interface UrlRule {
  pattern: RegExp;
  intent: PageIntent;
  weight: number;
}

const URL_RULES: UrlRule[] = [
  { pattern: /\/pricing(?:[/?]|$)/i, intent: 'pricing', weight: 0.85 },
  { pattern: /\/plans?(?:[/?]|$)/i, intent: 'pricing', weight: 0.5 },
  { pattern: /\/checkout(?:[/?]|$)/i, intent: 'checkout', weight: 0.9 },
  { pattern: /\/cart(?:[/?]|$)/i, intent: 'checkout', weight: 0.6 },
  { pattern: /\/onboard(?:ing)?(?:[/?]|$)/i, intent: 'onboarding', weight: 0.8 },
  { pattern: /\/welcome(?:[/?]|$)/i, intent: 'onboarding', weight: 0.5 },
  { pattern: /\/sign[-_]?up(?:[/?]|$)/i, intent: 'signup', weight: 0.9 },
  { pattern: /\/register(?:[/?]|$)/i, intent: 'signup', weight: 0.7 },
  { pattern: /\/sign[-_]?in(?:[/?]|$)/i, intent: 'signin', weight: 0.9 },
  { pattern: /\/log[-_]?in(?:[/?]|$)/i, intent: 'signin', weight: 0.85 },
  { pattern: /\/settings(?:[/?]|$)/i, intent: 'settings', weight: 0.8 },
  { pattern: /\/preferences(?:[/?]|$)/i, intent: 'settings', weight: 0.7 },
  { pattern: /\/account(?:[/?]|$)/i, intent: 'settings', weight: 0.5 },
  { pattern: /\/dashboard(?:[/?]|$)/i, intent: 'dashboard', weight: 0.8 },
  { pattern: /\/(?:404|not-?found|error|500)(?:[/?]|$)/i, intent: 'error', weight: 0.9 },
  { pattern: /\/blog(?:[/?]|$)/i, intent: 'content', weight: 0.6 },
  { pattern: /\/docs?(?:[/?]|$)/i, intent: 'content', weight: 0.6 },
  // Landing-from-URL is intentionally NOT inferred: a bare `/` is too noisy
  // (every test env, every default page hits it). Landing is detected from
  // positive page content — hero blocks, feature stacks — in dedicated signals.
];

export function extractUrlSignals(scene: SceneGraph): ClassifierSignal[] {
  if (!scene.url) return [];
  const out: ClassifierSignal[] = [];
  for (const rule of URL_RULES) {
    if (rule.pattern.test(scene.url)) {
      out.push({
        source: 'url-pattern',
        intent: rule.intent,
        weight: rule.weight,
        evidence: `URL matches ${rule.pattern}`,
      });
    }
  }
  return out;
}
