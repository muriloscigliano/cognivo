/**
 * Agent run session — the glue that turns the Plan 01–03 primitives into a
 * stream of AgentEvents. One session per run. All timestamps are
 * caller-supplied (ms); the engine never calls Date.now() itself.
 *
 * Correction #1 lives here: every executed action's blast radius is merged
 * into the run's cumulative context BEFORE action.executed is dispatched, so
 * a listener that reacts to an execution by proposing the next step gates
 * against the post-damage context — ten individually-cheap actions escalate
 * as a run, with no one-event-wide stale window.
 *
 * Trust accounting is guarded: a proposal must have been propose()d before it
 * can be resolve()d or executed(), a proposal can be resolved once per
 * emission (a double-click cannot double-count), and 'approved' only earns
 * ledger trust when a human actually stood at the gate (confirm /
 * confirm_typed). Edits and rejections always record — they only reduce trust.
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
  /** Human-readable goal, carried on the startedEvent. */
  goal: string;
  ledger: TrustLedger;
  /** Timestamp (ms) for run.started. */
  ts: number;
}

export interface AgentRun {
  readonly runId: string;
  readonly events: AgentEventStream;
  /**
   * The run.started event. The stream is live-only (no replay) and nothing
   * can subscribe before createAgentRun returns, so run.started is NOT
   * dispatched through the stream — serialize this property as the first
   * frame when bridging to a transport.
   */
  readonly startedEvent: RunStartedEvent;
  /** Snapshot (copy) of the run state accrued so far. */
  checkpoint(): RunContext;
  startStep(stepId: string, summary: string, ts: number): void;
  /** Gate the proposal against the CUMULATIVE run context, emit, return the gate. */
  propose(proposal: ActionProposal, ts: number): Gate;
  /**
   * Record the human decision and emit proposal.resolved. Throws on a
   * proposal that was never propose()d or was already resolved for its
   * current emission (fail closed on trust inflation).
   */
  resolve(proposal: ActionProposal, decision: Decision, ts: number, patch?: unknown): void;
  /**
   * Record an execution attempt: merges the proposal's blast radius into the
   * run (even on failure — fail closed: a failed action may still have caused
   * its effects), then emits action.executed and run.checkpoint. Throws on a
   * proposal that was never propose()d. The session does not verify the gate
   * outcome was honored — executing only what the gate/human allowed is the
   * executor's contract.
   */
  executed(proposal: ActionProposal, outcome: ActionOutcome): ActionReceipt;
  fail(error: string, recoverable: boolean, ts: number, extra?: { stepId?: string; partialRecovery?: string }): void;
  complete(ts: number): void;
}

interface ProposalState {
  gate: Gate;
  resolved: boolean;
}

export function createAgentRun(options: AgentRunOptions): AgentRun {
  const { runId, ledger } = options;
  const events = new AgentEventStream();
  let context = emptyRunContext(runId);
  const receipts: ActionReceipt[] = [];
  const proposals = new Map<string, ProposalState>();

  const startedEvent: RunStartedEvent = {
    type: 'run.started',
    runId,
    ts: options.ts,
    goal: options.goal,
  };

  function snapshot(): RunContext {
    return {
      runId,
      cumulativeBlastRadius: {
        scope: context.cumulativeBlastRadius.scope,
        entities: [...context.cumulativeBlastRadius.entities],
        irreversibleSideEffects: [...context.cumulativeBlastRadius.irreversibleSideEffects],
      },
    };
  }

  function stateOf(proposal: ActionProposal, verb: string): ProposalState {
    const state = proposals.get(proposal.id);
    if (!state) {
      throw new Error(`Cannot ${verb} proposal "${proposal.id}": it was never proposed on run "${runId}"`);
    }
    return state;
  }

  return {
    runId,
    events,
    startedEvent,

    checkpoint: snapshot,

    startStep(stepId: string, summary: string, ts: number): void {
      events.emit({ type: 'step.started', runId, ts, stepId, summary });
    },

    propose(proposal: ActionProposal, ts: number): Gate {
      const decision = gate(proposal, context, ledger);
      proposals.set(proposal.id, { gate: decision, resolved: false });
      events.emit({ type: 'proposal.emitted', runId, ts, proposal, gate: decision });
      return decision;
    },

    resolve(proposal: ActionProposal, decision: Decision, ts: number, patch?: unknown): void {
      const state = stateOf(proposal, 'resolve');
      if (state.resolved) {
        throw new Error(`Proposal "${proposal.id}" is already resolved for its current emission`);
      }
      state.resolved = true;
      // 'approved' earns trust only when a human actually decided at a
      // confirm gate; auto/notify approvals must not mint graduation credit.
      // Edits and rejections always record — they only ever reduce trust.
      const humanGated = state.gate === 'confirm' || state.gate === 'confirm_typed';
      if (decision !== 'approved' || humanGated) {
        ledger.record(proposal, decision);
      }
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
      stateOf(proposal, 'execute');
      const receipt = toReceipt(proposal, outcome);
      receipts.push(receipt);
      // Correction #1: merge BEFORE dispatching, so listeners reacting to
      // action.executed gate their next proposal against the new context.
      context = {
        runId,
        cumulativeBlastRadius: mergeBlastRadius(context.cumulativeBlastRadius, proposal.blastRadius),
      };
      events.emit({ type: 'action.executed', runId, ts: outcome.ts, receipt });
      events.emit({ type: 'run.checkpoint', runId, ts: outcome.ts, checkpoint: snapshot() });
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
