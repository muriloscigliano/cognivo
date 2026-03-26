/**
 * @cognivo/gen-ui — Framework-agnostic generative UI core.
 *
 * Streaming parser, component registry, prompt generation,
 * design token governance, and cognitive bias integration.
 * Zero framework dependencies.
 */

// ─── Types ───────────────────────────────────────────────────────────────────
export type {
  ElementNode,
  ValidationError,
  TokenViolation,
  ActionEvent,
  ParseResult,
  LibraryJSONSchema,
  ParamDef,
  ParamMap,
  Parser,
  StreamParser,
} from './types.js';

export { BuiltinActionType } from './types.js';

// ─── Parser ──────────────────────────────────────────────────────────────────
export { parse, createParser, createStreamingParser } from './parser/index.js';

// ─── Component Registry ─────────────────────────────────────────────────────
export {
  defineComponent,
  createLibrary,
} from './registry.js';

export type {
  ComponentDefinition,
  SubComponentOf,
  ComponentGroup,
  BiasPromptContext,
  PromptOptions,
  Library,
  LibraryDefinition,
} from './registry.js';

// ─── Prompt Generation ──────────────────────────────────────────────────────
export { generatePrompt } from './prompt/index.js';

// ─── Validation ─────────────────────────────────────────────────────────────
export { validateTokenUsage } from './validation/index.js';

// ─── AiClient Bridge ────────────────────────────────────────────────────────
export { GenerativeUiClient } from './bridge/index.js';
export type { GenUiAiClient, GenerativeUiClientOptions } from './bridge/index.js';

// ─── Bias Analysis (The Differentiator) ─────────────────────────────────────
export {
  suggestBiasesForTree,
  formatBiasReport,
  getManifest,
  getAllEngagedBiases,
  getComponentsByBias,
} from './bias/index.js';

export type {
  BiasTreeSuggestion,
  ComponentManifest,
} from './bias/index.js';

// ─── Pre-built Cognivo Library ──────────────────────────────────────────────
export {
  cognivoLibrary,
  cognivoChatLibrary,
  AiThinkingDef,
  AiBadgeDef,
  AiInsightCardDef,
  AiResultPanelDef,
  AiChartSummaryDef,
  AiChatDef,
  StackDef,
  TextContentDef,
  MetricCardDef,
} from './cognivo-library.js';
