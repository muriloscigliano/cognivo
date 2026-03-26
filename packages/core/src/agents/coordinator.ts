/**
 * AgentCoordinator — Decomposes complex AI tasks into a DAG of subtasks.
 *
 * Implements the Agent Delegation pattern:
 * 1. Receives a runIntent call
 * 2. Generates an execution plan via the configured planGenerator
 * 3. Executes tasks respecting the dependency DAG with concurrency limits
 * 4. Merges results using the configured merge strategy
 * 5. Returns a unified AiResult with metadata.agentResults
 *
 * Usage:
 *   const coordinator = new AgentCoordinator(innerClient, {
 *     maxConcurrency: 3,
 *     planGenerator: (intent, context) => ({ tasks: [...], mergeStrategy: 'concatenate' }),
 *   });
 *   const result = await coordinator.runIntent(intent, context);
 */

import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type {
  AgentTask,
  AgentTaskResult,
  AgentPlan,
  CoordinatorConfig,
} from './types.js';

/**
 * Perform a topological sort on tasks based on dependsOn relationships.
 * Returns tasks grouped by dependency level (tasks at the same level
 * have all dependencies satisfied by previous levels).
 *
 * @throws Error if a circular dependency is detected
 */
function topologicalLevels(tasks: AgentTask[]): AgentTask[][] {
  const taskMap = new Map<string, AgentTask>();
  for (const task of tasks) {
    taskMap.set(task.id, task);
  }

  // Compute in-degree for each task (only counting deps within the plan)
  const inDegree = new Map<string, number>();
  for (const task of tasks) {
    inDegree.set(task.id, 0);
  }
  for (const task of tasks) {
    if (task.dependsOn) {
      for (const dep of task.dependsOn) {
        if (taskMap.has(dep)) {
          inDegree.set(task.id, (inDegree.get(task.id) ?? 0) + 1);
        }
      }
    }
  }

  const levels: AgentTask[][] = [];
  const remaining = new Set(tasks.map((t) => t.id));

  while (remaining.size > 0) {
    // Find all tasks with in-degree 0 among remaining
    const ready: AgentTask[] = [];
    for (const id of remaining) {
      if ((inDegree.get(id) ?? 0) === 0) {
        ready.push(taskMap.get(id)!);
      }
    }

    if (ready.length === 0) {
      throw new Error('Circular dependency detected in agent tasks');
    }

    levels.push(ready);

    // Remove ready tasks and decrement in-degree of dependents
    for (const task of ready) {
      remaining.delete(task.id);
    }
    for (const id of remaining) {
      const task = taskMap.get(id)!;
      if (task.dependsOn) {
        let newDeg = 0;
        for (const dep of task.dependsOn) {
          if (remaining.has(dep)) {
            newDeg++;
          }
        }
        inDegree.set(id, newDeg);
      }
    }
  }

  return levels;
}

/**
 * Execute a batch of promises with a concurrency limit.
 * Tasks are chunked into batches of `limit` and each batch
 * runs with Promise.all before the next batch starts.
 */
async function runWithConcurrency<T>(
  fns: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < fns.length; i += limit) {
    const batch = fns.slice(i, i + limit);
    const batchResults = await Promise.all(batch.map((fn) => fn()));
    results.push(...batchResults);
  }
  return results;
}

/**
 * Merge results using the 'concatenate' strategy.
 *
 * - explanation: joined with newlines
 * - bullets: concatenated into one array
 * - drivers: concatenated into one array
 * - confidence: arithmetic mean
 * - anomalies: concatenated
 * - forecast: concatenated
 * - classifications: concatenated
 * - recommendations: concatenated
 * - sources: concatenated
 */
function mergeConcatenate(taskResults: AgentTaskResult[]): AiResult {
  const successful = taskResults.filter((r) => r.success);
  const results = successful.map((r) => r.result);

  const explanations = results
    .map((r) => r.explanation)
    .filter((e): e is string => e != null);

  const bullets = results.flatMap((r) => r.bullets ?? []);
  const drivers = results.flatMap((r) => r.drivers ?? []);
  const anomalies = results.flatMap((r) => r.anomalies ?? []);
  const forecast = results.flatMap((r) => r.forecast ?? []);
  const classifications = results.flatMap((r) => r.classifications ?? []);
  const recommendations = results.flatMap((r) => r.recommendations ?? []);
  const sources = results.flatMap((r) => r.sources ?? []);

  const confidences = results
    .map((r) => r.confidence)
    .filter((c): c is number => c != null);
  const avgConfidence =
    confidences.length > 0
      ? confidences.reduce((sum, c) => sum + c, 0) / confidences.length
      : undefined;

  const merged: AiResult = {};

  if (explanations.length > 0) merged.explanation = explanations.join('\n');
  if (bullets.length > 0) merged.bullets = bullets;
  if (drivers.length > 0) merged.drivers = drivers;
  if (avgConfidence != null) merged.confidence = avgConfidence;
  if (anomalies.length > 0) merged.anomalies = anomalies;
  if (forecast.length > 0) merged.forecast = forecast;
  if (classifications.length > 0) merged.classifications = classifications;
  if (recommendations.length > 0) merged.recommendations = recommendations;
  if (sources.length > 0) merged.sources = sources;

  return merged;
}

/**
 * Merge results using the 'weighted' strategy.
 *
 * Same as concatenate, but confidence is a weighted average where
 * each task's confidence contributes proportionally to its own confidence value.
 * (Higher-confidence tasks contribute more to the final confidence.)
 */
function mergeWeighted(taskResults: AgentTaskResult[]): AiResult {
  const merged = mergeConcatenate(taskResults);

  const successful = taskResults.filter((r) => r.success);
  const results = successful.map((r) => r.result);

  const confidences = results
    .map((r) => r.confidence)
    .filter((c): c is number => c != null);

  if (confidences.length > 0) {
    const totalWeight = confidences.reduce((sum, c) => sum + c, 0);
    if (totalWeight > 0) {
      merged.confidence =
        confidences.reduce((sum, c) => sum + c * c, 0) / totalWeight;
    }
  }

  return merged;
}

/**
 * AgentCoordinator — Implements AiClient by decomposing intents into
 * a DAG of subtasks executed with concurrency control.
 */
export class AgentCoordinator implements AiClient {
  private readonly inner: AiClient;
  private readonly maxConcurrency: number;
  private readonly planGenerator: CoordinatorConfig['planGenerator'];
  private readonly onTaskComplete?: CoordinatorConfig['onTaskComplete'];
  private readonly onPlanComplete?: CoordinatorConfig['onPlanComplete'];

  constructor(inner: AiClient, config: CoordinatorConfig) {
    this.inner = inner;
    this.maxConcurrency = config.maxConcurrency ?? 3;
    this.planGenerator = config.planGenerator;
    this.onTaskComplete = config.onTaskComplete;
    this.onPlanComplete = config.onPlanComplete;
  }

  /**
   * Run an AI intent by decomposing it into a plan of subtasks.
   */
  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    // Generate the execution plan
    const plan = this.planGenerator(intent, context, options);

    // Execute the plan
    const taskResults = await this.executePlan(plan);

    // Fire onPlanComplete callback
    this.onPlanComplete?.(taskResults);

    // Check if all tasks failed
    const allFailed = taskResults.every((r) => !r.success);
    if (allFailed && taskResults.length > 0) {
      const errors = taskResults
        .map((r) => `${r.taskId}: ${r.error}`)
        .join('; ');
      throw new Error(`All agent tasks failed: ${errors}`);
    }

    // Merge results
    const merged = this.mergeResults(plan, taskResults);

    // Attach agent results as metadata
    return {
      ...merged,
      metadata: {
        ...merged.metadata,
        agentResults: taskResults,
      },
    };
  }

  /**
   * Streaming is not supported by the AgentCoordinator.
   */
  streamIntent?<T = unknown>(
    _intent: AiIntent,
    _context: AiContext<T>,
    _options?: AiRequestOptions
  ): AsyncGenerator<Partial<AiResult>> {
    throw new Error('AgentCoordinator does not support streaming');
  }

  /**
   * Execute a plan respecting the dependency DAG and concurrency limits.
   */
  private async executePlan(plan: AgentPlan): Promise<AgentTaskResult[]> {
    const levels = topologicalLevels(plan.tasks);
    const allResults: AgentTaskResult[] = [];
    const resultMap = new Map<string, AgentTaskResult>();

    for (const level of levels) {
      const taskFns = level.map((task) => () => this.executeTask(task));
      const levelResults = await runWithConcurrency(
        taskFns,
        this.maxConcurrency
      );

      for (const result of levelResults) {
        allResults.push(result);
        resultMap.set(result.taskId, result);
        this.onTaskComplete?.(result);
      }
    }

    return allResults;
  }

  /**
   * Execute a single task, catching errors gracefully.
   */
  private async executeTask(task: AgentTask): Promise<AgentTaskResult> {
    const start = Date.now();

    try {
      const result = await this.inner.runIntent(
        task.intent,
        task.context,
        task.options
      );
      return {
        taskId: task.id,
        result,
        durationMs: Date.now() - start,
        success: true,
      };
    } catch (err) {
      return {
        taskId: task.id,
        result: {},
        durationMs: Date.now() - start,
        success: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  /**
   * Merge task results based on the plan's merge strategy.
   */
  private mergeResults(
    plan: AgentPlan,
    taskResults: AgentTaskResult[]
  ): AiResult {
    switch (plan.mergeStrategy) {
      case 'concatenate':
        return mergeConcatenate(taskResults);
      case 'weighted':
        return mergeWeighted(taskResults);
      case 'custom':
        if (!plan.customMerge) {
          throw new Error(
            'Custom merge strategy requires a customMerge function'
          );
        }
        return plan.customMerge(taskResults);
      default:
        return mergeConcatenate(taskResults);
    }
  }
}
