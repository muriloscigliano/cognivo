import type { ClassifierSignal, PageIntent } from '../../types/classifier.js';
import type { SceneGraph } from '../../types/scene-graph.js';
import { collectAllText } from '../../helpers/walk.js';

interface TextRule {
  patterns: RegExp[];
  intent: PageIntent;
  weight: number;
}

/**
 * N-gram-style text matching. Each rule has multiple patterns; matching ANY
 * pattern emits one signal per rule (capped — we don't double-count the same
 * intent from multiple patterns of the same rule).
 */
const TEXT_RULES: TextRule[] = [
  {
    patterns: [
      /\bper (?:month|year|user|seat)\b/i,
      /\/mo\b/,
      /\/yr\b/,
      /billed (?:monthly|annually)/i,
      /\bsave \d+%/i,
    ],
    intent: 'pricing',
    weight: 0.55,
  },
  {
    patterns: [
      /\bplace order\b/i,
      /\bcomplete (?:purchase|order)\b/i,
      /\bpay now\b/i,
      /\bshipping address\b/i,
      /\bbilling address\b/i,
      /\border total\b/i,
    ],
    intent: 'checkout',
    weight: 0.75,
  },
  {
    patterns: [
      /\bstep \d+\s*(?:of|\/)\s*\d+\b/i,
      /\blet'?s get started\b/i,
      /\bnext\s*(?:step|→|>)/i,
      /\bget started in\b/i,
    ],
    intent: 'onboarding',
    weight: 0.6,
  },
  {
    patterns: [
      /\bforgot password\b/i,
      /\bsign in\b/i,
      /\blog in\b/i,
      /\bremember me\b/i,
    ],
    intent: 'signin',
    weight: 0.5,
  },
  {
    patterns: [
      /\bcreate (?:an )?account\b/i,
      /\bsign up (?:free|today|now)\b/i,
      /\balready have an account\b/i,
    ],
    intent: 'signup',
    weight: 0.5,
  },
  {
    patterns: [
      /\bsomething went wrong\b/i,
      /\bpage not found\b/i,
      /\b404\b/,
      /\b500\b/,
      /\btry again\b/i,
      /\bthat's an error\b/i,
    ],
    intent: 'error',
    weight: 0.7,
  },
  {
    patterns: [
      /\bno results?\b/i,
      /\bnothing (?:here|found)\b/i,
      /\bget started by\b/i,
      /\bzero (?:items|results)\b/i,
    ],
    intent: 'empty-state',
    weight: 0.65,
  },
];

export function extractTextSignals(scene: SceneGraph): ClassifierSignal[] {
  const text = collectAllText(scene);
  if (!text) return [];

  const out: ClassifierSignal[] = [];
  for (const rule of TEXT_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(text)) {
        out.push({
          source: 'text-ngrams',
          intent: rule.intent,
          weight: rule.weight,
          evidence: `text matches ${pattern}`,
        });
        break; // one signal per rule
      }
    }
  }
  return out;
}
