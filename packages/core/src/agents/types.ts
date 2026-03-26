/**
 * Agent Delegation Types
 *
 * Types for the AgentCoordinator pattern, which decomposes complex
 * AI tasks into a DAG of smaller tasks executed in parallel where possible.
 */

import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { AiRequestOptions } from '../client/types.js';

/** A single task for an agent to execute */
export interface AgentTask {
  /** Unique identifier for this task */
  id: string;
  /** Intent to execute */
  intent: AiIntent;
  /** Context for this specific task */
  context: AiContext;
  /** Optional request options override */
  options?: AiRequestOptions;
  /** Task IDs that must complete before this one starts */
  dependsOn?: string[];
}

/** Result from a single agent task */
export interface AgentTaskResult {
  /** Task ID that produced this result */
  taskId: string;
  /** The AI result */
  result: AiResult;
  /** Duration in milliseconds */
  durationMs: number;
  /** Whether the task succeeded */
  success: boolean;
  /** Error message if failed */
  error?: string;
}

/** An execution plan for coordinated agent work */
export interface AgentPlan {
  /** Ordered list of tasks */
  tasks: AgentTask[];
  /** Merge strategy for combining results */
  mergeStrategy: 'concatenate' | 'weighted' | 'custom';
  /** Custom merge function (required when mergeStrategy is 'custom') */
  customMerge?: (results: AgentTaskResult[]) => AiResult;
}

/** Configuration for the AgentCoordinator */
export interface CoordinatorConfig {
  /** Maximum concurrent tasks (default: 3) */
  maxConcurrency?: number;
  /** Generate a plan from the intent and context */
  planGenerator: (
    intent: AiIntent,
    context: AiContext,
    options?: AiRequestOptions
  ) => AgentPlan;
  /** Called when a task completes */
  onTaskComplete?: (result: AgentTaskResult) => void;
  /** Called when all tasks complete */
  onPlanComplete?: (results: AgentTaskResult[]) => void;
}
