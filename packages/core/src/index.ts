/**
 * @cognivo/core
 * Framework-agnostic AI integration logic
 */

// Export intents
export { AiIntent } from './intents/types';

// Export context types
export type { AiContext, AiContextMeta } from './context/types';
export { ContextBuilder } from './context/builder';

// Export result types
export type { AiResult, AiDriver, AiAnomaly, AiForecast, AiClassification, AiRecommendation } from './results/types';

// Export client interfaces
export type { AiClient, AiRequestOptions } from './client/types';
export { BaseAiClient } from './client/base';

// Export utilities
export { validateIntent } from './utils/validators';
export { formatDataset } from './utils/formatters';

// Version
export const VERSION = '0.0.0';
