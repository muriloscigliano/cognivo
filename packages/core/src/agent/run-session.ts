/**
 * Agent run session — the glue that turns the Plan 01–03 primitives into a
 * stream of AgentEvents. One session per run. All timestamps are
 * caller-supplied (ms); the engine never calls Date.now() itself.
 *
 * Correction #1 lives here: every executed action's blast radius is merged
 * into the run's cumulative context, and every subsequent gate() call reads
 * that context — ten individually-cheap actions escalate as a run.
 */
import { AgentEventStream } from './event-stream.js';
import type { RunStartedEvent } from './events.js';
import { gate, emptyRunContext, type Gate, type RunContext } from './gate.js';
import type { ActionProposal } from './proposal.js';
import { toReceipt, type ActionOutcome, type ActionReceipt } from './receipt.js';
import { mergeBlastRadius } from './reversibility.js';
import type { Decision, TrustLedger } from './trust-ledger.js';

export interface AgentRunOptions {
  runId: string;
  /** Human-readable goal, carried on run.started. */
  goal: string;
  ledger: TrustLedger;
  /** Timestamp (ms) for run.started. */
  ts: number;
}

export interface AgentRun {
  readonly runId: string;
  readonly events: AgentEventStream;
  /**
   * The run.started event, kept for consumers that subscribe after creation
   * (the stream itself is live-only and does not replay).
   */
  readonly startedEvent: RunStartedEvent;
  /** Snapshot of the run state accrued so far. */
  checkpoint(): RunContext;
  startStep(stepId: string, summary: string, ts: number): void;
  /** Gate the proposal against the CUMULATIVE run context, emit, return the gate. */
  propose(proposal: ActionProposal, ts: number): Gate;
  /** Record the human decision into the ledger and emit proposal.resolved. */
  resolve(proposal: ActionProposal, decision: Decision, ts: number, patch?: unknown): void;
  /**
   * Record an execution attempt: emits action.executed with the receipt,
   * merges the proposal's blast radius into the run (even on failure —
   * fail closed: a failed action may still have caused its effects), and
   * emits run.checkpoint.
   */
  executed(proposal: ActionProposal, outcome: ActionOutcome): ActionReceipt;
  fail(error: string, recoverable: boolean, ts: number, extra?: { stepId?: string; partialRecovery?: string }): void;
  complete(ts: number): void;
}

export function createAgentRun(options: AgentRunOptions): AgentRun {
  const { runId, ledger } = options;
  const events = new AgentEventStream();
  let context = emptyRunContext(runId);
  const receipts: ActionReceipt[] = [];

  const startedEvent: RunStartedEvent = {
    type: 'run.started',
    runId,
    ts: options.ts,
    goal: options.goal,
  };
  events.emit(startedEvent);

  return {
    runId,
    events,
    startedEvent,

    checkpoint(): RunContext {
      return {
        runId,
        cumulativeBlastRadius: {
          scope: context.cumulativeBlastRadius.scope,
          entities: [...context.cumulativeBlastRadius.entities],
          irreversibleSideEffects: [...context.cumulativeBlastRadius.irreversibleSideEffects],
        },
      };
    },

    startStep(stepId: string, summary: string, ts: number): void {
      events.emit({ type: 'step.started', runId, ts, stepId, summary });
    },

    propose(proposal: ActionProposal, ts: number): Gate {
      const decision = gate(proposal, context, ledger);
      events.emit({ type: 'proposal.emitted', runId, ts, proposal, gate: decision });
      return decision;
    },

    resolve(proposal: ActionProposal, decision: Decision, ts: number, patch?: unknown): void {
      ledger.record(proposal, decision);
      events.emit({
        type: 'proposal.resolved',
        runId,
        ts,
        proposalId: proposal.id,
        decision,
        ...(patch !== undefined ? { patch } : {}),
      });
    },

    executed(proposal: ActionProposal, outcome: ActionOutcome): ActionReceipt {
      const receipt = toReceipt(proposal, outcome);
      receipts.push(receipt);
      events.emit({ type: 'action.executed', runId, ts: outcome.ts, receipt });
      context = {
        runId,
        cumulativeBlastRadius: mergeBlastRadius(context.cumulativeBlastRadius, proposal.blastRadius),
      };
      events.emit({ type: 'run.checkpoint', runId, ts: outcome.ts, checkpoint: this.checkpoint() });
      return receipt;
    },

    fail(error: string, recoverable: boolean, ts: number, extra?: { stepId?: string; partialRecovery?: string }): void {
      events.emit({
        type: 'run.failed',
        runId,
        ts,
        error,
        recoverable,
        ...(extra?.stepId !== undefined ? { stepId: extra.stepId } : {}),
        ...(extra?.partialRecovery !== undefined ? { partialRecovery: extra.partialRecovery } : {}),
      });
      events.close();
    },

    complete(ts: number): void {
      events.emit({ type: 'run.completed', runId, ts, receipts: [...receipts] });
      events.close();
    },
  };
}
