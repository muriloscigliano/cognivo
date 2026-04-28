import type { PageIntent } from '../types/classifier.js';

/**
 * Confidence floors per intent (Spec §5.6). When the classifier's confidence
 * for the predicted intent falls below the floor, we *silently fall back to
 * 'unknown'* and only run intent-agnostic rules. Better to under-fire than
 * mis-fire on a high-stakes page.
 */
export const INTENT_FLOORS: Record<PageIntent, number> = {
  // High-stakes intents — strict floors
  pricing: 75,
  checkout: 75,
  signup: 75,
  signin: 75,

  // Mid-stakes intents
  onboarding: 70,
  landing: 70,
  dashboard: 70,
  error: 70,

  // Low-stakes intents — relaxed floors
  settings: 65,
  form: 65,
  content: 65,
  'empty-state': 65,

  // Unknown bypasses floor (already the fallback)
  unknown: 0,
};

export function getFloor(intent: PageIntent): number {
  return INTENT_FLOORS[intent];
}
