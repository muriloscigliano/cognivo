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

// Export guardrails
export type { GuardrailRule, GuardrailResult, GuardrailViolation, GuardrailsConfig } from './guardrails/types';
export { maxLengthRule, noPromptInjectionRule, noPiiRule, confidenceRangeRule } from './guardrails/rules';
export { GuardedClient, GuardrailError } from './guardrails/guarded-client';

// Export resilience (fallback client)
export type { FallbackConfig, CircuitState, CircuitBreakerConfig } from './resilience/types';
export { FallbackClient } from './resilience/fallback-client';

// Export observability
export type { AiSpan, AiTracer, ObservableClientConfig } from './observability/types';
export { InMemoryTracer } from './observability/tracer';
export { ObservableClient } from './observability/observable-client';

// Export conversation types and classes
export type { ConversationMessage, ConversationConfig } from './conversation/types';
export { ConversationHistory } from './conversation/history';
export { ConversationalClient } from './conversation/conversational-client';

// Export routing
export type { ModelRoute, ModelRouterConfig } from './routing/types';
export { ModelRouterClient } from './routing/model-router';

// Export caching
export type { CacheEntry, CacheStore, CachedClientConfig } from './caching/types';
export { InMemoryLruCache } from './caching/cache-store';
export { CachedClient } from './caching/cached-client';

// Export semantic caching
export type { EmbeddingFunction, SemanticCacheEntry, SemanticCachedClientConfig } from './caching/semantic-types';
export { cosineSimilarity } from './caching/vector-utils';
export { SemanticCacheStore } from './caching/semantic-cache-store';
export { SemanticCachedClient } from './caching/semantic-cached-client';

// Export circuit breaker
export { CircuitBreaker } from './resilience/circuit-breaker';
export { CircuitBreakerClient, CircuitOpenError } from './resilience/circuit-breaker-client';

// Export patterns (self-refine, extended thinking)
export type { SelfRefineConfig, RefinementStep, RefinementTrace, ExtendedThinkingConfig } from './patterns/types';
export { SelfRefineClient } from './patterns/self-refine-client';
export { ExtendedThinkingClient } from './patterns/extended-thinking-client';

// Export optimization (DSPy-style prompt optimization)
export type { EvaluationMetric, TestCase, OptimizationConfig, OptimizationResult, EvaluationResult } from './optimization/types';
export { PromptEvaluator, confidenceMetric, completenessMetric, expectedFieldsMetric } from './optimization/evaluator';
export { PromptOptimizer } from './optimization/optimizer';
export { OptimizedClient } from './optimization/optimized-client';

// Export agents (coordinator)
export type { AgentTask, AgentTaskResult, AgentPlan, CoordinatorConfig } from './agents/types';
export { AgentCoordinator } from './agents/coordinator';

// Version
export const VERSION = '0.3.0';
