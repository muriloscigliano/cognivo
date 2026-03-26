import { describe, it, expect, vi } from 'vitest';
import { AgentCoordinator } from '../agents/coordinator';
import { AiIntent } from '../intents/types';
import type { AiClient } from '../client/types';
import type { AiResult } from '../results/types';
import type { AiContext } from '../context/types';
import type {
  AgentPlan,
  AgentTask,
  AgentTaskResult,
  CoordinatorConfig,
} from '../agents/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createMockClient(
  resultOrFn?: AiResult | ((...args: unknown[]) => Promise<AiResult>)
): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  const fn = vi.fn();
  if (typeof resultOrFn === 'function') {
    fn.mockImplementation(resultOrFn);
  } else {
    fn.mockResolvedValue(resultOrFn ?? { explanation: 'ok' });
  }
  return { runIntent: fn };
}

const sampleContext: AiContext<{ value: number }> = {
  dataset: [{ value: 1 }, { value: 2 }],
  meta: { dataType: 'test' },
};

function makeTask(overrides: Partial<AgentTask> & { id: string }): AgentTask {
  return {
    intent: AiIntent.EXPLAIN,
    context: sampleContext,
    ...overrides,
  };
}

function makePlan(overrides: Partial<AgentPlan> = {}): AgentPlan {
  return {
    tasks: [makeTask({ id: 'task-1' })],
    mergeStrategy: 'concatenate',
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Plan generator is called with correct args
// ---------------------------------------------------------------------------

describe('AgentCoordinator — plan generation', () => {
  it('calls planGenerator with the correct intent, context, and options', async () => {
    const planGenerator = vi.fn().mockReturnValue(makePlan());
    const inner = createMockClient({ explanation: 'result', confidence: 0.8 });
    const coordinator = new AgentCoordinator(inner, { planGenerator });

    const opts = { model: 'gpt-4', temperature: 0.5 };
    await coordinator.runIntent(AiIntent.SUMMARIZE, sampleContext, opts);

    expect(planGenerator).toHaveBeenCalledTimes(1);
    expect(planGenerator).toHaveBeenCalledWith(
      AiIntent.SUMMARIZE,
      sampleContext,
      opts
    );
  });
});

// ---------------------------------------------------------------------------
// Single task execution
// ---------------------------------------------------------------------------

describe('AgentCoordinator — single task', () => {
  it('executes a single task and returns its result', async () => {
    const inner = createMockClient({
      explanation: 'single result',
      confidence: 0.9,
      bullets: ['a', 'b'],
    });

    const planGenerator = vi.fn().mockReturnValue(makePlan());
    const coordinator = new AgentCoordinator(inner, { planGenerator });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(result.explanation).toBe('single result');
    expect(result.confidence).toBe(0.9);
    expect(result.bullets).toEqual(['a', 'b']);
    expect(inner.runIntent).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Multiple independent tasks execute in parallel
// ---------------------------------------------------------------------------

describe('AgentCoordinator — parallel execution', () => {
  it('executes independent tasks in parallel', async () => {
    const executionOrder: string[] = [];

    const inner = createMockClient(async (...args: unknown[]) => {
      const ctx = args[1] as AiContext;
      const taskId = (ctx.meta?.['taskLabel'] as string) ?? 'unknown';
      executionOrder.push(`start-${taskId}`);
      // Small delay to verify parallelism
      await new Promise((r) => setTimeout(r, 10));
      executionOrder.push(`end-${taskId}`);
      return { explanation: `result-${taskId}`, confidence: 0.8 };
    });

    const plan = makePlan({
      tasks: [
        makeTask({
          id: 'a',
          context: { dataset: [1], meta: { taskLabel: 'a' } },
        }),
        makeTask({
          id: 'b',
          context: { dataset: [2], meta: { taskLabel: 'b' } },
        }),
        makeTask({
          id: 'c',
          context: { dataset: [3], meta: { taskLabel: 'c' } },
        }),
      ],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
      maxConcurrency: 10,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    // All three tasks should have been called
    expect(inner.runIntent).toHaveBeenCalledTimes(3);
    // The merged explanation should contain all results
    expect(result.explanation).toContain('result-a');
    expect(result.explanation).toContain('result-b');
    expect(result.explanation).toContain('result-c');
  });
});

// ---------------------------------------------------------------------------
// Dependencies are respected
// ---------------------------------------------------------------------------

describe('AgentCoordinator — dependency ordering', () => {
  it('executes task B after task A when B depends on A', async () => {
    const executionOrder: string[] = [];

    const inner = createMockClient(async (...args: unknown[]) => {
      const ctx = args[1] as AiContext;
      const label = (ctx.meta?.['label'] as string) ?? 'unknown';
      executionOrder.push(label);
      return { explanation: label, confidence: 0.8 };
    });

    const plan = makePlan({
      tasks: [
        makeTask({
          id: 'a',
          context: { dataset: [1], meta: { label: 'A' } },
        }),
        makeTask({
          id: 'b',
          dependsOn: ['a'],
          context: { dataset: [2], meta: { label: 'B' } },
        }),
      ],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(executionOrder).toEqual(['A', 'B']);
  });

  it('executes a diamond dependency correctly (A -> B,C -> D)', async () => {
    const executionOrder: string[] = [];

    const inner = createMockClient(async (...args: unknown[]) => {
      const ctx = args[1] as AiContext;
      const label = (ctx.meta?.['label'] as string) ?? 'unknown';
      executionOrder.push(label);
      return { explanation: label, confidence: 0.7 };
    });

    const plan = makePlan({
      tasks: [
        makeTask({
          id: 'a',
          context: { dataset: [1], meta: { label: 'A' } },
        }),
        makeTask({
          id: 'b',
          dependsOn: ['a'],
          context: { dataset: [2], meta: { label: 'B' } },
        }),
        makeTask({
          id: 'c',
          dependsOn: ['a'],
          context: { dataset: [3], meta: { label: 'C' } },
        }),
        makeTask({
          id: 'd',
          dependsOn: ['b', 'c'],
          context: { dataset: [4], meta: { label: 'D' } },
        }),
      ],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
      maxConcurrency: 10,
    });

    await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    // A must come before B and C; B and C must come before D
    const indexA = executionOrder.indexOf('A');
    const indexB = executionOrder.indexOf('B');
    const indexC = executionOrder.indexOf('C');
    const indexD = executionOrder.indexOf('D');

    expect(indexA).toBeLessThan(indexB);
    expect(indexA).toBeLessThan(indexC);
    expect(indexB).toBeLessThan(indexD);
    expect(indexC).toBeLessThan(indexD);
  });
});

// ---------------------------------------------------------------------------
// maxConcurrency limits parallel execution
// ---------------------------------------------------------------------------

describe('AgentCoordinator — concurrency control', () => {
  it('limits parallel execution to maxConcurrency', async () => {
    let currentParallel = 0;
    let maxParallel = 0;

    const inner = createMockClient(async () => {
      currentParallel++;
      if (currentParallel > maxParallel) {
        maxParallel = currentParallel;
      }
      // Small delay so parallel tasks overlap
      await new Promise((r) => setTimeout(r, 20));
      currentParallel--;
      return { explanation: 'done', confidence: 0.8 };
    });

    const plan = makePlan({
      tasks: [
        makeTask({ id: '1' }),
        makeTask({ id: '2' }),
        makeTask({ id: '3' }),
        makeTask({ id: '4' }),
        makeTask({ id: '5' }),
      ],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
      maxConcurrency: 2,
    });

    await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(maxParallel).toBeLessThanOrEqual(2);
    expect(inner.runIntent).toHaveBeenCalledTimes(5);
  });
});

// ---------------------------------------------------------------------------
// Concatenate merge strategy
// ---------------------------------------------------------------------------

describe('AgentCoordinator — concatenate merge', () => {
  it('combines explanations with newlines', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      return { explanation: `explanation-${callCount}`, confidence: 0.8 };
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'concatenate',
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(result.explanation).toBe('explanation-1\nexplanation-2');
  });

  it('concatenates bullets from all tasks', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      return {
        bullets: [`bullet-${callCount}-a`, `bullet-${callCount}-b`],
        confidence: 0.7,
      };
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'concatenate',
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(result.bullets).toEqual([
      'bullet-1-a',
      'bullet-1-b',
      'bullet-2-a',
      'bullet-2-b',
    ]);
  });

  it('concatenates drivers from all tasks', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      return {
        drivers: [
          { factor: `factor-${callCount}`, impact: callCount * 10, confidence: 0.8 },
        ],
        confidence: 0.8,
      };
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'concatenate',
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(result.drivers).toHaveLength(2);
    expect(result.drivers![0]!.factor).toBe('factor-1');
    expect(result.drivers![1]!.factor).toBe('factor-2');
  });

  it('averages confidence across tasks', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      return {
        explanation: `r${callCount}`,
        confidence: callCount === 1 ? 0.6 : 0.8,
      };
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'concatenate',
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    // Average of 0.6 and 0.8 = 0.7
    expect(result.confidence).toBeCloseTo(0.7, 5);
  });
});

// ---------------------------------------------------------------------------
// Weighted merge strategy
// ---------------------------------------------------------------------------

describe('AgentCoordinator — weighted merge', () => {
  it('weights confidence by individual task confidence', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      // Task 1: confidence 0.4, Task 2: confidence 0.8
      return {
        explanation: `r${callCount}`,
        confidence: callCount === 1 ? 0.4 : 0.8,
      };
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'weighted',
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    // Weighted: (0.4*0.4 + 0.8*0.8) / (0.4 + 0.8) = (0.16 + 0.64) / 1.2 = 0.8 / 1.2 ≈ 0.6667
    expect(result.confidence).toBeCloseTo(0.6667, 3);
  });
});

// ---------------------------------------------------------------------------
// Custom merge strategy
// ---------------------------------------------------------------------------

describe('AgentCoordinator — custom merge', () => {
  it('uses the customMerge function', async () => {
    const inner = createMockClient({ explanation: 'raw', confidence: 0.5 });

    const customMerge = vi.fn().mockReturnValue({
      explanation: 'custom merged',
      confidence: 1.0,
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'custom',
      customMerge,
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(customMerge).toHaveBeenCalledTimes(1);
    expect(result.explanation).toBe('custom merged');
    expect(result.confidence).toBe(1.0);
  });

  it('passes all task results to customMerge', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      return { explanation: `result-${callCount}`, confidence: 0.5 };
    });

    const customMerge = vi.fn().mockReturnValue({ explanation: 'merged' });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'custom',
      customMerge,
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    const passedResults = customMerge.mock.calls[0]![0] as AgentTaskResult[];
    expect(passedResults).toHaveLength(2);
    expect(passedResults[0]!.taskId).toBe('a');
    expect(passedResults[1]!.taskId).toBe('b');
  });
});

// ---------------------------------------------------------------------------
// Task failure handling
// ---------------------------------------------------------------------------

describe('AgentCoordinator — error handling', () => {
  it('continues with other tasks when one task fails', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      if (callCount === 1) {
        throw new Error('Task 1 failed');
      }
      return { explanation: 'success', confidence: 0.9 };
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'fail-task' }), makeTask({ id: 'ok-task' })],
      mergeStrategy: 'concatenate',
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    // The successful task's result should be in the merged output
    expect(result.explanation).toBe('success');
    expect(result.confidence).toBe(0.9);

    // Check that the failed task is recorded
    const agentResults = result.metadata?.['agentResults'] as AgentTaskResult[];
    const failedResult = agentResults.find((r) => r.taskId === 'fail-task');
    expect(failedResult?.success).toBe(false);
    expect(failedResult?.error).toBe('Task 1 failed');
  });

  it('throws an error when ALL tasks fail', async () => {
    const inner = createMockClient(async () => {
      throw new Error('boom');
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'concatenate',
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    await expect(
      coordinator.runIntent(AiIntent.EXPLAIN, sampleContext)
    ).rejects.toThrow('All agent tasks failed');
  });

  it('includes all error messages when all tasks fail', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      throw new Error(`error-${callCount}`);
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'concatenate',
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    await expect(
      coordinator.runIntent(AiIntent.EXPLAIN, sampleContext)
    ).rejects.toThrow(/a: error-1/);
  });
});

// ---------------------------------------------------------------------------
// onTaskComplete callback
// ---------------------------------------------------------------------------

describe('AgentCoordinator — onTaskComplete callback', () => {
  it('fires for each completed task', async () => {
    const inner = createMockClient({ explanation: 'ok', confidence: 0.8 });
    const onTaskComplete = vi.fn();

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' }), makeTask({ id: 'c' })],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
      onTaskComplete,
    });

    await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(onTaskComplete).toHaveBeenCalledTimes(3);

    const taskIds = onTaskComplete.mock.calls.map(
      (call: unknown[]) => (call[0] as AgentTaskResult).taskId
    );
    expect(taskIds).toContain('a');
    expect(taskIds).toContain('b');
    expect(taskIds).toContain('c');
  });

  it('fires even when a task fails', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      if (callCount === 1) throw new Error('fail');
      return { explanation: 'ok', confidence: 0.8 };
    });

    const onTaskComplete = vi.fn();

    const plan = makePlan({
      tasks: [makeTask({ id: 'fail' }), makeTask({ id: 'ok' })],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
      onTaskComplete,
    });

    await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(onTaskComplete).toHaveBeenCalledTimes(2);

    const failedCall = onTaskComplete.mock.calls.find(
      (call: unknown[]) => (call[0] as AgentTaskResult).taskId === 'fail'
    ) as unknown[] | undefined;
    expect(failedCall).toBeDefined();
    expect((failedCall![0] as AgentTaskResult).success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// onPlanComplete callback
// ---------------------------------------------------------------------------

describe('AgentCoordinator — onPlanComplete callback', () => {
  it('fires after all tasks complete with all results', async () => {
    const inner = createMockClient({ explanation: 'ok', confidence: 0.8 });
    const onPlanComplete = vi.fn();

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
      onPlanComplete,
    });

    await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(onPlanComplete).toHaveBeenCalledTimes(1);

    const allResults = onPlanComplete.mock.calls[0]![0] as AgentTaskResult[];
    expect(allResults).toHaveLength(2);
    expect(allResults[0]!.taskId).toBe('a');
    expect(allResults[1]!.taskId).toBe('b');
  });
});

// ---------------------------------------------------------------------------
// metadata.agentResults
// ---------------------------------------------------------------------------

describe('AgentCoordinator — metadata.agentResults', () => {
  it('contains all task results in metadata', async () => {
    const inner = createMockClient({ explanation: 'ok', confidence: 0.8 });

    const plan = makePlan({
      tasks: [makeTask({ id: 'x' }), makeTask({ id: 'y' })],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    const agentResults = result.metadata?.['agentResults'] as AgentTaskResult[];
    expect(agentResults).toBeDefined();
    expect(agentResults).toHaveLength(2);
    expect(agentResults[0]!.taskId).toBe('x');
    expect(agentResults[1]!.taskId).toBe('y');
    expect(agentResults[0]!.success).toBe(true);
    expect(agentResults[1]!.success).toBe(true);
    expect(agentResults[0]!.durationMs).toBeGreaterThanOrEqual(0);
  });

  it('records durationMs for each task result', async () => {
    const inner = createMockClient(async () => {
      await new Promise((r) => setTimeout(r, 5));
      return { explanation: 'ok' };
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'timed' })],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);
    const agentResults = result.metadata?.['agentResults'] as AgentTaskResult[];

    expect(agentResults[0]!.durationMs).toBeGreaterThanOrEqual(4);
  });
});

// ---------------------------------------------------------------------------
// streamIntent throws
// ---------------------------------------------------------------------------

describe('AgentCoordinator — streamIntent', () => {
  it('throws an error because streaming is not supported', () => {
    const inner = createMockClient();
    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => makePlan(),
    });

    expect(() =>
      coordinator.streamIntent!(AiIntent.EXPLAIN, sampleContext)
    ).toThrow('AgentCoordinator does not support streaming');
  });
});

// ---------------------------------------------------------------------------
// Task uses its own context and options
// ---------------------------------------------------------------------------

describe('AgentCoordinator — task context and options', () => {
  it('passes each task its own context and options to the inner client', async () => {
    const inner = createMockClient({ explanation: 'ok', confidence: 0.8 });

    const taskContext1: AiContext = { dataset: [10, 20], meta: { label: 'ctx1' } };
    const taskContext2: AiContext = { dataset: [30, 40], meta: { label: 'ctx2' } };

    const plan = makePlan({
      tasks: [
        {
          id: 'a',
          intent: AiIntent.SUMMARIZE,
          context: taskContext1,
          options: { model: 'gpt-4' },
        },
        {
          id: 'b',
          intent: AiIntent.FORECAST,
          context: taskContext2,
          options: { model: 'claude-3' },
        },
      ],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(inner.runIntent).toHaveBeenCalledTimes(2);

    // First call uses task A's intent, context, and options
    expect(inner.runIntent.mock.calls[0]![0]).toBe(AiIntent.SUMMARIZE);
    expect(inner.runIntent.mock.calls[0]![1]).toBe(taskContext1);
    expect(inner.runIntent.mock.calls[0]![2]).toEqual({ model: 'gpt-4' });

    // Second call uses task B's intent, context, and options
    expect(inner.runIntent.mock.calls[1]![0]).toBe(AiIntent.FORECAST);
    expect(inner.runIntent.mock.calls[1]![1]).toBe(taskContext2);
    expect(inner.runIntent.mock.calls[1]![2]).toEqual({ model: 'claude-3' });
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('AgentCoordinator — edge cases', () => {
  it('handles an empty task list gracefully', async () => {
    const inner = createMockClient();

    const plan = makePlan({ tasks: [] });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(inner.runIntent).not.toHaveBeenCalled();
    const agentResults = result.metadata?.['agentResults'] as AgentTaskResult[];
    expect(agentResults).toEqual([]);
  });

  it('defaults maxConcurrency to 3 when not specified', async () => {
    let currentParallel = 0;
    let maxParallel = 0;

    const inner = createMockClient(async () => {
      currentParallel++;
      if (currentParallel > maxParallel) maxParallel = currentParallel;
      await new Promise((r) => setTimeout(r, 20));
      currentParallel--;
      return { explanation: 'ok' };
    });

    const plan = makePlan({
      tasks: [
        makeTask({ id: '1' }),
        makeTask({ id: '2' }),
        makeTask({ id: '3' }),
        makeTask({ id: '4' }),
        makeTask({ id: '5' }),
        makeTask({ id: '6' }),
      ],
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(maxParallel).toBeLessThanOrEqual(3);
  });

  it('handles tasks where some have no explanation or confidence', async () => {
    let callCount = 0;
    const inner = createMockClient(async () => {
      callCount++;
      if (callCount === 1) {
        return { bullets: ['insight'] };
      }
      return { explanation: 'only second', confidence: 0.8 };
    });

    const plan = makePlan({
      tasks: [makeTask({ id: 'a' }), makeTask({ id: 'b' })],
      mergeStrategy: 'concatenate',
    });

    const coordinator = new AgentCoordinator(inner, {
      planGenerator: () => plan,
    });

    const result = await coordinator.runIntent(AiIntent.EXPLAIN, sampleContext);

    // Only the second task had an explanation
    expect(result.explanation).toBe('only second');
    // Bullets from first task, none from second
    expect(result.bullets).toEqual(['insight']);
    // Only one confidence value
    expect(result.confidence).toBe(0.8);
  });
});
