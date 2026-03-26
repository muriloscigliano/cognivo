import type { AiIntent } from '../intents/types.js';

/**
 * A single route that maps a set of intents to a specific model configuration.
 */
export interface ModelRoute {
  /** Intents handled by this route */
  intents: AiIntent[];

  /** Model identifier to use for these intents */
  model: string;

  /** Optional temperature override for these intents */
  temperature?: number;

  /** Optional max tokens override for these intents */
  maxTokens?: number;
}

/**
 * Configuration for the ModelRouterClient.
 *
 * Routes map intents to specific models. When no route matches,
 * the defaultModel is used. Large datasets can trigger automatic
 * model upgrades via the complexity settings.
 */
export interface ModelRouterConfig {
  /** Ordered list of routes — first match wins */
  routes: ModelRoute[];

  /** Fallback model when no route matches the intent */
  defaultModel: string;

  /** Default temperature when no route specifies one */
  defaultTemperature?: number;

  /** Default maxTokens when no route specifies one */
  defaultMaxTokens?: number;

  /** Dataset size above which to upgrade to complexityModel */
  complexityThreshold?: number;

  /** Model to use when the dataset exceeds complexityThreshold */
  complexityModel?: string;
}
