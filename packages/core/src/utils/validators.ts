import { AiIntent, isAiIntent } from '../intents/types';

/**
 * Validate an AI intent
 */
export function validateIntent(intent: unknown): intent is AiIntent {
  return isAiIntent(intent);
}

/**
 * Validate confidence score (0-1)
 */
export function validateConfidence(confidence: unknown): boolean {
  return typeof confidence === 'number' && confidence >= 0 && confidence <= 1;
}
