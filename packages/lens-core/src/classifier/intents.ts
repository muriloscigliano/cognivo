import type { PageIntent } from '../types/classifier.js';

/**
 * Canonical intent list (Spec §5.1). Order matches the spec table.
 * `unknown` is the conservative-firing fallback (Spec §5.6).
 */
export const INTENT_LIST: readonly PageIntent[] = [
  'pricing',
  'checkout',
  'onboarding',
  'signup',
  'signin',
  'landing',
  'dashboard',
  'settings',
  'content',
  'form',
  'empty-state',
  'error',
  'unknown',
] as const;

export interface IntentMetadata {
  title: string;
  description: string;
}

/** Human-readable metadata; surfaced in the toolbar's classifier panel. */
export const INTENT_METADATA: Record<PageIntent, IntentMetadata> = {
  pricing: { title: 'Pricing', description: 'Tiers / plans / rates comparison.' },
  checkout: { title: 'Checkout', description: 'Purchase completion flow.' },
  onboarding: { title: 'Onboarding', description: 'First-run / multi-step setup.' },
  signup: { title: 'Sign up', description: 'Account creation form.' },
  signin: { title: 'Sign in', description: 'Authentication form.' },
  landing: { title: 'Landing', description: 'Marketing / homepage.' },
  dashboard: { title: 'Dashboard', description: 'Data-dense overview.' },
  settings: { title: 'Settings', description: 'Configuration / preferences.' },
  content: { title: 'Content', description: 'Article / blog / docs.' },
  form: { title: 'Form', description: 'Generic data entry.' },
  'empty-state': { title: 'Empty state', description: 'No data / get started.' },
  error: { title: 'Error', description: '4xx / 5xx / failure surface.' },
  unknown: { title: 'Unknown', description: 'Confidence below floor.' },
};

export function isValidIntent(value: string): value is PageIntent {
  return (INTENT_LIST as readonly string[]).includes(value);
}
